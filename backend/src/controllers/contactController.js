import Contact from "../models/Contact.js";
import { sendEmailWithPDF } from "../utils/email.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
// Fetch all contacts
export const fetchContact = async (req, res) => {
  try {
    const contacts = await Contact.find().lean().exec();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save contact to the database
    const newContact = await Contact.create({ name, email, message });

    // Generate PDF
    const doc = new PDFDocument();
    const pdfPath = `./contact_${newContact._id}.pdf`;
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(16).text("Contact Details", { align: "center" });
    doc.fontSize(12).text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Message: ${message}`);
    doc.end();

    // Send email with PDF attachment
    await sendEmailWithPDF(
      "md@nusaiba.com.bd",
      "New Contact Submission",
      "Please find the contact details attached.",
      pdfPath
    );

    // Delete the PDF file after sending the email
    fs.unlinkSync(pdfPath);

    res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a contact
export const deletedContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
