import express from "express";
import {
  fetchContact,
  createContact,
  updateContact,
  deletedContact,
} from "../controllers/contactController.js";
import { protectRoutes, adminRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Define routes
router.get("/", protectRoutes, adminRoute, fetchContact); // Fetch all contacts
router.post("/", createContact); // Create a new contact
router.put("/:id", protectRoutes, adminRoute, updateContact); // Update a contact
router.delete("/:id", protectRoutes, adminRoute, deletedContact); // Delete a contact

export default router;
