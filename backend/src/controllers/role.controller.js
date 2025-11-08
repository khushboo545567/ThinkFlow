import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";

const createRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  // check if the role is already exists
  const existingRole = await Role.findOne({ name: role });
  if (existingRole) {
    throw new ApiError(409, "this role is already exists");
  }

  const createdRoleByAdmin = await Role.create({ name: role });
  return res
    .status(201)
    .json(
      new ApiResponse(201, createdRoleByAdmin, "role created successfully !")
    );
});

export { createRole };
