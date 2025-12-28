import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/Trip";
import cloudinary from "@/lib/cloudinary";

/* ============================
   CREATE TRIP (LOGIN REQUIRED)
   ============================ */
export async function POST(req: Request) {
  try {
    await connectDB();

    /* ----------------------------
       AUTH CHECK
    ----------------------------- */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

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

    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, secret) as { userId: string };
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    /* ----------------------------
       READ FORM DATA
    ----------------------------- */
    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const location = formData.get("location")?.toString();
    const city = formData.get("city")?.toString();
    const date = formData.get("date")?.toString();
    const description = formData.get("description")?.toString();
    const imageFile = formData.get("image") as File | null;

    if (!title || !location || !city || !date || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    /* ----------------------------
       CLOUDINARY IMAGE UPLOAD
    ----------------------------- */
    let image:
      | { url: string; publicId: string }
      | undefined = undefined;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "trips" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      image = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    /* ----------------------------
       CREATE TRIP
    ----------------------------- */
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
