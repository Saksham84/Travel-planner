import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/Trip";

/* ============================
   CREATE TRIP (LOGIN REQUIRED)
   ============================ */
export async function POST(req: Request) {
  try {
    await connectDB();

    // 🍪 Read cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // ❌ Not logged in
    if (!token) {
      return NextResponse.json(
        { error: "User is not logged in" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 🔐 Verify JWT
    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, secret) as {
        userId: string;
      };
    } catch {
      return NextResponse.json(
        { error: "User is not logged in" },
        { status: 401 }
      );
    }

    // 📦 Parse body
    const body = await req.json();
    const { title, location, city, date, description, image } = body;

    // ✅ Validation
    if (!title || !location || !city || !date || !description) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // 📝 Create trip
    const trip = await Trip.create({
      title,
      location,
      city,
      date,
      description,
      image,
      userId: decoded.userId,
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("Create Trip Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ============================
   GET TRIPS (PUBLIC)
   ============================ */
export async function GET() {
  try {
    await connectDB();

    const trips = await Trip.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(trips);
  } catch (error) {
    console.error("Get Trips Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
