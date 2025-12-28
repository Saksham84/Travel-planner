import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    city: String,
    date: String,
    description: String,

    image: {
      url: String,
      publicId: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trip ||
  mongoose.model("Trip", TripSchema);
