import React from "react";
import AdminCommentCard from "../../components/AdminCommentCard";

const ManageComment = () => {
  return (
    <div className="p-10 ">
      <h2 className="text-lg font-semibold mb-10 text-gray-800">
        Manage Comment
      </h2>
      <AdminCommentCard />
      <AdminCommentCard />
      <AdminCommentCard />
    </div>
  );
};

export default ManageComment;
