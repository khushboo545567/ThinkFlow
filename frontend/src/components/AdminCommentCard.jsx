import React from "react";

const AdminCommentCard = () => {
  return (
    <div className="w-full border border-gray-300 rounded-lg px-6 py-4 mb-3 bg-white">
      <div className="flex justify-between items-start gap-6">
        {/* Content (Left) */}
        <div className="flex-1">
          <span className="text-xs text-gray-500 block mb-1">
            Title: How React Works
          </span>

          <span className="text-sm font-semibold text-gray-800 block mb-2">
            @username
          </span>

          <p className="text-sm text-gray-700 leading-relaxed">
            This is a sample comment text. It explains the user’s thoughts about
            the post in a clear and readable way.
          </p>
        </div>

        {/* Action Buttons (Right) */}
        <div className="flex gap-3">
          <button className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
            Edit
          </button>
          <button className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminCommentCard;
