import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { emailVerificationContent, sendMail } from "../utils/mail.js";

// GENERATE ACCESS AND REFRESH TOKEN
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    // / Call the methods to generate tokens
    const AccessToken = user.generateAccessToken();
    const RefreshToken = user.generateRefershToken();
    await user.save({ validateBeforeSave: false });

    // // Store refresh token in DB (if you want)
    user.refreshToken = RefreshToken;
    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generate the refresh token"
    );
  }
};

// ✅ REGISTER USER CONTROLLER
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, bio } = req.body;

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //  Assign role (find from Role collection)
  const userRole = await Role.findOne({ name: "user" });
  if (!userRole) {
    throw new ApiError(500, "Default role 'user' not found in database");
  }

  // Create user object
  const user = new User({
    userName,
    email,
    password,
    bio,
    role: userRole._id,
  });

  // Upload avatar to Cloudinary if provided
  if (req.file?.path) {
    const avatarUrl = await uploadOnCloudnary(req.file.path);
    if (avatarUrl) user.avatar = avatarUrl;
  }

  // Generate email verification token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailExpiryVerificationToken = tokenExpiry;

  // save user before sending email
  await user.save({ validateBeforeSave: false });

  // Generate verification link (frontend or backend endpoint)
  const verificationUrl = `http://localhost:3000/api/v1/users/verify-email?token=${unHashedToken}`;

  // Send verification email
  const mailgenContent = emailVerificationContent(userName, verificationUrl);
  await sendMail({
    email,
    subject: "Verify your email address",
    mailgenContent,
  });

  // Send success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered successfully! Verification email sent.",
        user
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // check the password is correct or not
  const iscorrect = await user.isPasswordCorrect(password);
  if (!iscorrect) {
    throw new ApiError(400, "invalid creadientials");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(400, "your email is not verified yet ");
  }

  // generate token
  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const Options = { httpOnly: true, secure: true };
  const userData = {
    userName: user.userName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return res
    .status(200)
    .cookie("accessToken", AccessToken, Options)
    .cookie("refreshToken", RefreshToken, Options)
    .json(
      new ApiResponse(
        200,
        { user: userData, AccessToken, RefreshToken },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {});

const getCurrentUser = asyncHandler(async (req, res) => {});

const fogetPasswrod = asyncHandler(async (req, res) => {});

const changePasswrod = asyncHandler(async (req, res) => {});

const generateRefreshToken = asyncHandler(async (req, res) => {});

const resendEmail = asyncHandler(async (req, res) => {});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  fogetPasswrod,
  changePasswrod,
  generateRefreshToken,
  resendEmail,
};
