import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { Permission } from "../models/permission.model.js";
import { RolePermission } from "../models/rolePermission.model.js";

const assignPermissionToRole = asyncHandler(async (req, res) => {
  const { roleName, resource, action } = req.body;

  //   prevents form case sencitive
  const roleNameLower = roleName.trim().toLowerCase();
  const resourceLower = resource.trim().toLowerCase();
  const actionLower = action.trim().toLowerCase();

  //   check if role exists
  const existingRole = await Role.findOne({ roleName: roleNameLower });
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

export { assignPermissionToRole };
