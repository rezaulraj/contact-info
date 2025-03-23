import { useEffect, useState } from "react";
import { Download, Eye, LayoutGrid, Plus, Send, Trash } from "lucide-react";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf"; // Replace pdfkit with jspdf
import { useCotactStore } from "../../../component/stores/useContactStore";

const Contact = () => {
  const { fetchContacts, loading, contacts, updateContact, deleteContact } =
    useCotactStore();
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  if (loading) return <div>Loading...</div>;
  console.log(contacts);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Contact List</h1>
        <div className="flex items-center gap-x-2">
          <button className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500">
            <Send />
          </button>
          <button className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500">
            <LayoutGrid />
          </button>
          <button
            onClick={() => downloadExcel(contacts)}
            className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500"
          >
            <Download />
          </button>
          <button className="border border-gray-400 p-1 rounded-md cursor-pointer hover:translate-y-1 transition-transform duration-500">
            <Plus />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts?.contacts?.map((contact, index) => (
              <tr key={contact._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-x-2">
                  <button
                    onClick={() => downloadPDF([contact])} // Pass a single contact as an array
                    className="text-indigo-300 hover:text-indigo-400 cursor-pointer"
                  >
                    <Download size={15} />
                  </button>
                  <button
                    className="text-green-300 hover:text-green-400 cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <Eye size={15} />
                  </button>

                  {selectedContact && (
                    <UpdateContactModal
                      contact={selectedContact}
                      onClose={() => setSelectedContact(null)}
                      onUpdate={updateContact}
                    />
                  )}
                  <button
                    className="text-red-300 hover:text-red-400 cursor-pointer"
                    onClick={() => deleteContact(contact._id)}
                  >
                    <Trash size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;

const UpdateContactModal = ({ contact, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    message: contact.message,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(contact._id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-400/20 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Update Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//download pdf
const downloadPDF = (contacts) => {
  const doc = new jsPDF();

  // Add a title
  doc.setFontSize(16);
  doc.text("Contact List", 10, 10);

  // Add contact details
  let y = 20; // Starting Y position
  contacts.forEach((contact, index) => {
    doc.setFontSize(12);
    doc.text(`Contact ${index + 1}`, 10, y);
    doc.text(`Name: ${contact.name}`, 10, y + 10);
    doc.text(`Email: ${contact.email}`, 10, y + 20);
    doc.text(`Message: ${contact.message}`, 10, y + 30);
    y += 40; // Move down for the next contact
  });

  // Save the PDF
  doc.save("contacts.pdf");
};

// Download Excel
const downloadExcel = async (contacts) => {
  if (!Array.isArray(contacts?.contacts)) {
    console.error("Contacts is not an array:", contacts?.contacts);
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Contacts");

  worksheet.columns = [
    { header: "Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 30 },
    { header: "Message", key: "message", width: 50 },
  ];

  contacts?.contacts?.forEach((contact) => {
    worksheet.addRow({
      name: contact.name,
      email: contact.email,
      message: contact.message,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "contacts.xlsx");
  document.body.appendChild(link);
  link.click();
};
