import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Fixed typo
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ], // Email validation
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
