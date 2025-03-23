import express from "express";
import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { protectRoutes, adminRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Define routes
router.post("/", protectRoutes, adminRoute, createEmployee); // Create a new employee
router.get("/", protectRoutes, adminRoute, getAllEmployees); // Get all employees
router.put("/:id", protectRoutes, adminRoute, updateEmployee); // Update an employee
router.delete("/:id", protectRoutes, adminRoute, deleteEmployee); // Delete an employee

export default router;
