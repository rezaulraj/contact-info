import Employee from "../models/Employee.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().lean().exec();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, employeeId, department, designation } = req.body;

    // Validate input
    if (!name || !email || !employeeId || !department || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if employee with the same email or ID already exists
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Create new employee
    const newEmployee = await Employee.create({
      name,
      email,
      employeeId,
      department,
      designation,
    });

    res
      .status(201)
      .json({
        message: "Employee created successfully",
        employee: newEmployee,
      });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, employeeId, department, designation } = req.body;
  
      // Validate input
      if (!name || !email || !employeeId || !department || !designation) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Update employee
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { name, email, employeeId, department, designation },
        { new: true } // Return the updated document
      );
  
      res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Delete employee
      await Employee.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };