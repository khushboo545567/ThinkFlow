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

// delete permission
const deletePermission = asyncHandler(async (req, res) => {
  const { permissionId } = req.params;
  console.log(permissionId);

  const existsPermisson = await Permission.find({ _id: permissionId });

  if (!existsPermisson) {
    throw new ApiError(404, "permission not found");
  }
  await Permission.findByIdAndDelete(permissionId);
  return res
    .status(200)
    .json(new ApiResponse(200, "permission deleted successfully"));
});

export { createPermission, deletePermission };
