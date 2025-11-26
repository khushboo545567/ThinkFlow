import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { User } from "../models/user.model.js";

// add a role to the user
const addRoleToUser = asyncHandler(async (req, res, next) => {
  const { userName, role } = req.body;
  console.log(userName, role);
  // check if the username and role already exits
  const existUserName = await User.findOne({ userName });
  console.log("existUserName", existUserName);

  if (!existUserName) throw new ApiError(404, "User not found");
  const existsRole = await Role.findOne({ name: role });
  if (!existsRole) throw new ApiError(404, "Role not found");

  //check if the user have alredy that role
  if (
    existUserName.role.some((r) => r.toString() === existsRole._id.toString())
  ) {
    throw new ApiError(409, "User already has this role");
  }

  existUserName.role.push(existsRole._id);
  await existUserName.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        existUserName.role,
        `${role} is assigned to ${userName}`
      )
    );
});

// GET assigned role-> username show, rolename (find by populate)
const getAssignedRole = asyncHandler(async (req, res, next) => {
  const assignedRoles = await User.find({})
    .select("userName email role")
    .populate("role", "name")
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        assignedRoles,
        "user with roles fetched successfully !"
      )
    );
});

// REMOVE ROLE FROM THE USER
// take id from the param
const removeRoleToUser = asyncHandler(async (req, res, next) => {
  const { userId, roleId } = req.params;

  // verify user exists or not
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ApiError(404, "User not found !");
  }
  // verify role exists or not
  const role = await Role.findOne({ _id: roleId });
  if (!role) {
    throw new ApiError(404, "role not found !");
  }

  const stillHasRole = removeRole.role.some(
    (r) => r._id.toString() === roleId.toString()
  );

  if (stillHasRole) {
    throw new ApiError(500, "failed to remove role !");
  }

  // remove role form the user
  const removeRole = await User.findByIdAndUpdate(
    userId,
    { $pull: { role: roleId } },
    { new: true }
  ).populate("role", "name");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        removeRole.role,
        `Role '${role.name}' removed from user`
      )
    );
});

export { addRoleToUser, getAssignedRole, removeRoleToUser };
