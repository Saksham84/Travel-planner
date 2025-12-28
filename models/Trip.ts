import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    city: String,
    date: String,
    description: String,
    image: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trip ||
  mongoose.model("Trip", TripSchema);
