import { AlignJustify, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout, user } = useUserStore();
  const handleLogout = () => {
    logout();
    console.log("User logged out");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex items-center justify-between">
        <button onClick={toggleSidebar} className="lg:hidden cursor-pointer">
          <AlignJustify className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Search
          </button>

          {/* User Profile Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center focus:outline-none"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-4">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <hr className="border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
