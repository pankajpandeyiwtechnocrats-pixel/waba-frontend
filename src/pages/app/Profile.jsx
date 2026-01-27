import { useState } from "react";
import { Camera } from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("Admin User");
  const [mobile, setMobile] = useState("+91 9876543210");

  const email = "admin@company.com";
  const role = "Admin";

  const updateProfile = () => {
    alert("Profile updated (backend later)");
  };

  const changePassword = () => {
    alert("Change password flow later");
  };

  return (
    <div className="bg-white rounded-xl border h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold">Profile</h1>
        <p className="text-sm text-gray-500">
          Manage your personal information
        </p>
      </div>

      <div className="p-6 max-w-3xl">
        {/* Profile Photo */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
              {name.charAt(0)}
            </div>

            <button
              title="Change photo"
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full border hover:bg-gray-50"
            >
              <Camera size={16} />
            </button>
          </div>

          <div>
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
            <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
              {role}
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-gray-500">
              Full Name
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Mobile Number
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Email
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50"
              value={email}
              disabled
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Role
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50"
              value={role}
              disabled
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={updateProfile}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm"
          >
            Update Profile
          </button>

          <button
            onClick={changePassword}
            className="border px-6 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
