import React, { useState, useEffect } from "react";
import {
  Download,
  DownloadCloud,
  Eye,
  LayoutGrid,
  Plus,
  Send,
  Trash,
} from "lucide-react";
import { useCotactStore } from "../../../component/stores/useContactStore";

const Employee = () => {
  const {
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    employees,
    loading,
  } = useCotactStore(); // Corrected store name

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    department: "",
    designation: "",
  });

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedEmployee) {
      // Update existing employee
      await updateEmployee(selectedEmployee.id, formData);
    } else {
      // Add new employee
      await createEmployee(formData);
    }

    // Reset form and close modal
    setFormData({
      employeeId: "",
      name: "",
      email: "",
      department: "",
      designation: "",
    });
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  // Delete Employee
  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id);
  };

  // Open modal for adding or editing
  const openModal = (employee = null) => {
    if (employee) {
      setSelectedEmployee(employee);
      setFormData(employee);
    } else {
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        department: "",
        designation: "",
      });
    }
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <div className="flex items-center gap-x-2">
          <button className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500">
            <Send />
          </button>
          <button className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500">
            <LayoutGrid />
          </button>
          <button className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500">
            <Download />
          </button>
          <button
            onClick={() => openModal()}
            className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500"
          >
            <Plus />
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Designation
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees?.employees?.map((employee, index) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-x-2">
                  <button className="text-indigo-300 hover:text-indigo-400 cursor-pointer ">
                    <Download size={15} />
                  </button>
                  <button
                    className="text-green-300 hover:text-green-400 cursor-pointer"
                    onClick={() => openModal(employee)}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    className="text-red-300 hover:text-red-400 cursor-pointer"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <Trash size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-300/20 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedEmployee ? "Edit Employee" : "Add Employee"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-md"
                >
                  {selectedEmployee ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
