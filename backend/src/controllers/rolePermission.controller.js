import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { Permission } from "../models/permission.model.js";
import { RolePermission } from "../models/rolePermission.model.js";

const assignPermissionToRole = asyncHandler(async (req, res) => {
  const { roleName, resource, action } = req.body;
  console.log("roleName", roleName);
  //   prevents form case sencitive
  const roleNameLower = roleName.trim().toLowerCase();
  const resourceLower = resource.trim().toLowerCase();
  const actionLower = action.trim().toLowerCase();

  //   check if role exists
  const existingRole = await Role.findOne({ name: roleNameLower });
  if (!existingRole) {
    throw new ApiError(404, "Role does not exists");
  }

  // check if the permssion is exsits
  const existingPermission = await Permission.findOne({
    resource: resourceLower,
    action: actionLower,
  });
  if (!existingPermission) {
    throw new ApiError(404, "Permssion do not exits");
  }

  //   check if role already have a permission
  const havePemission = await RolePermission.findOne({
    role: existingRole._id,
    permission: existingPermission._id,
  });

  if (havePemission) {
    throw new ApiError(
      409,
      `Role '${roleName}' already has '${action}' permission on '${resource}'`
    );
  }

  //   assign role to permissoin
  const newRolePermission = await RolePermission.create({
    role: existingRole._id,
    permission: existingPermission._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newRolePermission,
        `Permission '${action}' on '${resource}' assigned to role '${roleName}' successfully`
      )
    );
});

// delete
const deletePermissionToRole = asyncHandler(async (req, res) => {
  const { roleId, permissionId } = req.params;

  // validate ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(roleId) ||
    !mongoose.Types.ObjectId.isValid(permissionId)
  ) {
    throw new ApiError(400, "invalid roleId or permissionId");
  }

  const existRolePermissoin = await RolePermission.find({
    role: roleId,
    permission: permissionId,
  });

  if (!existRolePermissoin) {
    throw new ApiError("the permission for the role does not exists");
  }

  // find & delete in a single call
  const deleted = await RolePermission.findOneAndDelete({
    role: roleId,
    permission: permissionId,
  });

  if (!deleted) {
    // not found
    throw new ApiError(404, "permission mapping for the role does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "permission removed from role successfully"));
});

export { assignPermissionToRole, deletePermissionToRole };
