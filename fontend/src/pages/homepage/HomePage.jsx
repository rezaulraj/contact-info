import React, { useState } from "react";
import logo from "../../assets/logo.png";
import contact from "../../assets/contact.svg";
import { useCotactStore } from "../../component/stores/useContactStore";
const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { createContact } = useCotactStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createContact(formData);
  };
  return (
    <div className="max-w-[1280px] mx-auto bg-blue-100 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center relative overflow-hidden">
        {/* form */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-blue-400 transform -rotate-45 origin-top"></div>
        <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md px-6 py-6  relative z">
          <div className="flex items-center justify-center">
            <img src={logo} alt="" className="h-18" />
          </div>
          <div className="text-center mb-8">
            <p className="text-gray-700">
              Welcome back to CyberCraft Bangladesh, where your creativity
              thrives.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Full name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <img src={contact} alt="" className="h-[60%] w-[60%]" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
