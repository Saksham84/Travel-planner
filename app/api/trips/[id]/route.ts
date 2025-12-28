import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/Trip";
import cloudinary from "@/lib/cloudinary";

/* ============================
   Helper: Get Auth User
   ============================ */
async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };

    return decoded;
  } catch {
    return null;
  }
}

/* ============================
   GET SINGLE TRIP (PUBLIC)
   ============================ */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid trip id" }, { status: 400 });
  }

  const trip = await Trip.findById(id).populate("userId", "name email");

  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  return NextResponse.json(trip);
}

/* ============================
   UPDATE TRIP (OWNER ONLY)
   ============================ */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid trip id" }, { status: 400 });
  }

  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trip = await Trip.findById(id);
  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  if (trip.userId.toString() !== authUser.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();

  trip.title = formData.get("title")?.toString();
  trip.location = formData.get("location")?.toString();
  trip.city = formData.get("city")?.toString();
  trip.date = formData.get("date")?.toString();
  trip.description = formData.get("description")?.toString();

  const imageFile = formData.get("image") as File | null;

  /* ===== CLOUDINARY IMAGE UPDATE ===== */
  if (imageFile && imageFile.size > 0) {
    // Delete old image
    if (trip.image?.publicId) {
      await cloudinary.uploader.destroy(trip.image.publicId);
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "trips" },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      ).end(buffer);
    });

    trip.image = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  await trip.save();
  return NextResponse.json(trip);
}

/* ============================
   DELETE TRIP (OWNER ONLY)
   ============================ */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid trip id" }, { status: 400 });
  }

  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trip = await Trip.findById(id);
  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  if (trip.userId.toString() !== authUser.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 🧹 Delete image from Cloudinary
  if (trip.image?.publicId) {
    await cloudinary.uploader.destroy(trip.image.publicId);
  }

  await Trip.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
