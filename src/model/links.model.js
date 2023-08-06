import mongoose, { Schema } from "mongoose";

const LinkSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Link = mongoose.model("link", LinkSchema);
