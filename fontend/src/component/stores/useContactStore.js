import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useCotactStore = create((set) => ({
  contacts: [],
  employees: [],
  loading: false,

  // Fetch all contacts
  fetchContacts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/contacts");
      set({ contacts: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ loading: false });
    }
  },

  // Create a new contact
  createContact: async (contactData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/contacts", contactData);
      set((state) => ({ contacts: [...state.contacts, response.data] }));
      toast.success("Contact created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create contact");
    } finally {
      set({ loading: false });
    }
  },

  // Update a contact
  updateContact: async (id, updatedData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/contacts/${id}`, updatedData);
      set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact._id === id ? response.data : contact
        ),
      }));
      toast.success("Contact updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update contact");
    } finally {
      set({ loading: false });
    }
  },

  // Delete a contact
  deleteContact: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact._id !== id),
      }));
      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete contact");
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all employees
  fetchEmployees: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/employees");
      set({ employees: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch employees");
    } finally {
      set({ loading: false });
    }
  },

  // Create a new employee
  createEmployee: async (employeeData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/employees", employeeData);
      set((state) => ({
        employees: [...state.employees, response?.data],
      }));
      toast.success("Employee created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      set({ loading: false });
    }
  },

  // Update an employee
  updateEmployee: async (id, updatedData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/employees/${id}`, updatedData);
      set((state) => ({
        employees: state.employees.map((employee) =>
          employee._id === id ? response.data : employee
        ),
      }));
      toast.success("Employee updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update employee");
    } finally {
      set({ loading: false });
    }
  },

  // Delete an employee
  deleteEmployee: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/employees/${id}`);
      set((state) => ({
        employees: state.employees.filter((employee) => employee._id !== id),
      }));
      toast.success("Employee deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete employee");
    } finally {
      set({ loading: false });
    }
  },
}));
