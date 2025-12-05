import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Catogery } from "../models/catogery.model.js";

const createCatogery = asyncHandler(async (req, res) => {
  const { catogery } = req.body;

  //   check if the catogery is already exists
  const existingCategory = await Catogery.findOne({ catogeryName: catogery });
  if (existingCategory) {
    throw new ApiError(
      409,
      "this catogery is already exists , create the new one "
    );
  }

  //   createing the catogery
  const newCatogery = await Catogery.create({ catogeryName: catogery });

  return res
    .status(200)
    .json(
      new ApiResponse(200, newCatogery, "catogery is created successfully !")
    );
});

// get the catogery so that user can see all the catogery
const getCatogery = asyncHandler(async (req, res) => {});

// delete the catogery
const deleteCatogery = asyncHandler(async (req, res) => {});

export { createCatogery, getCatogery, deleteCatogery };
