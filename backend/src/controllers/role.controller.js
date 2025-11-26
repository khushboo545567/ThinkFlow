import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { User } from "../models/user.model.js";

const createRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const roleName = role.trim().toLowerCase();
  // check if the role is already exists
  const existingRole = await Role.findOne({ name: roleName });
  if (existingRole) {
    throw new ApiError(409, "this role is already exists");
  }

  const createdRoleByAdmin = await Role.create({ name: roleName });

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdRoleByAdmin, "role created successfully !")
    );
});

const deleteRole = asyncHandler(async (req, res, next) => {
  const { roleId } = req.params;

  const existedRole = await Role.findOne({ _id: roleId });
  if (!existedRole) {
    throw new ApiError(404, "role not found !");
  }
  // prevent delete the role if any user has this role
  const assignedCount = await User.countDocuments({ role: roleId });
  console.log(assignedCount);

  if (assignedCount > 0) {
    const sampleUser = await User.find({ role: roleId })
      .limit(10)
      .select("userName email");

    // Return structured response (not an error string)
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { assignedCount, sampleUser },
          `Cannot delete role '${existedRole.name}': assigned to ${assignedCount} user(s). Unassign first.`
        )
      );
  }
  const deletedRole = await Role.findByIdAndUpdate(roleId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedRole, "role deleted successfully !"));
});

const getRoles = asyncHandler(async (req, res, next) => {
  const roles = await Role.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, roles, "All roles get successfully !"));
});

export { createRole, getRoles, deleteRole };
