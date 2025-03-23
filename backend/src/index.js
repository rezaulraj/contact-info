import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.FONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/employees", employeeRoutes);
// server connection
app.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
  connectDB();
});
