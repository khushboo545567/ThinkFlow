import React from "react";

const AssignPermissionCard = () => {
  const user = {
    username: "Khushboo",
    role: "Admin",
    permissions: [
      { _id: "1", action: "create", resource: "post" },
      { _id: "2", action: "edit", resource: "post" },
      { _id: "3", action: "delete", resource: "comment" },
    ],
  };

  return (
    <div className="w-full  p-4 border-b border-gray-300  bg-white flex flex-col gap-3">
      {/* Header */}
      <div className="flex gap-8 items-center pb-2">
        <span className="text-lg font-semibold text-gray-800">
          {user.username}
        </span>
        <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          Role: {user.role}
        </span>
      </div>

      {/* Permissions */}
      <ul className="flex gap-4 flex-wrap">
        {user.permissions.map((perm) => (
          <li
            key={perm._id}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
          >
            <span className="text-sm text-gray-700">
              <strong>{perm.action}</strong> | {perm.resource}
            </span>

            <button className="text-red-500 hover:text-red-700 text-sm pl-10">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignPermissionCard;
