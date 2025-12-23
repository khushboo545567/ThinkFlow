import React from "react";
import PermissionCard from "../../components/PermissionCard";

const Permission = () => {
  return (
    <div className="  p-6">
      {/* Create Permission Section */}
      <div className="bg-white p-5 border-b border-gray-300 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Permission</h2>

        <div className="flex gap-4">
          <select className="border rounded-md px-3 py-2 w-40">
            <option>Resource</option>
            <option>Post</option>
            <option>Comment</option>
          </select>

          <select className="border rounded-md px-3 py-2 w-40">
            <option>Action</option>
            <option>Create</option>
            <option>Read</option>
            <option>Update</option>
            <option>Delete</option>
          </select>
        </div>
      </div>

      {/* Permission Card */}

      <div>
        <h3 className="text-lg font-semibold mb-3"> Permissions</h3>

        <ul>
          <li>
            <PermissionCard />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Permission;
