import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Permission } from "../models/permission.model.js";

const createPermission = asyncHandler(async (req, res) => {
  const { resource, action } = req.body;

  const resourceName = resource.trim().toLowerCase();
  const actionName = action.trim().toLowerCase();
  // check if there is same permission exist in the db
  const existingPermission = await Permission.findOne({
    resource: resourceName,
    action: actionName,
  });

  if (existingPermission) {
    throw new ApiError(409, "this permission is already exits");
  }

  //   create permission
  const creatingPermission = await Permission.create({
    resource: resourceName,
    action: actionName,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        creatingPermission,
        "permission created successfully !"
      )
    );
});

const deltePermission = asyncHandler(async (req, res) => {});
export { createPermission, deltePermission };
