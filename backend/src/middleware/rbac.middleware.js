// do only authorize role and the ower check do not need of permission check

import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Role } from "../models/roles.model.js";

// RESOLVE USER ROLE AND CASH IT IN REQ.USER.ROLENAME SO THAT WE DONT HAVE TO CALL DB FREQUENTLY
// accept the object of user
// return the array of roleName
const resolveRoleName = async (user) => {
  if (!user) return [];

  // return cached if present
  if (Array.isArray(user._roleNames) && user._roleNames.length) {
    return user._roleNames;
  }

  // user.role should be an array of role ids (ObjectId) or a single id
  const roleIds = Array.isArray(user.role)
    ? user.role
    : user.role
    ? [user.role]
    : [];

  if (roleIds.length === 0) {
    user._roleNames = [];
    return [];
  }

  const roles = await Role.find({ _id: { $in: roleIds } })
    .select("name")
    .lean()
    .exec();
  const names = roles.map((r) => String(r.name).trim().toLowerCase());
  user._roleNames = names;
  return names;
};

// AUTHORIZE ROLES
const authorizeRoles = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthenticated");

    console.log("allowed roles", allowedRoles);
    const allowed = allowedRoles.map((r) => String(r).trim().toLowerCase());

    // resolveRoleName now returns an array
    const userRoleNames = await resolveRoleName(user);
    console.log("userroles name", userRoleNames);

    // Defensive: ensure it's an array before using .some
    if (!Array.isArray(userRoleNames) || userRoleNames.length === 0) {
      // If no roles, treat as unauthorized
      throw new ApiError(403, "Forbidden — no roles assigned");
    }

    const ok = userRoleNames.some((rn) =>
      allowed.includes(String(rn).trim().toLowerCase())
    );
    if (!ok) throw new ApiError(403, "Forbidden");
    return next();
  });
};

const allowRoleOrOwner = (resourceModel, options = {}) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthenticated");

    const {
      idParam = "id", // req.params[idParam] -> resource id (post/comment id)
      ownerField = "author", // field on the resource that stores owner id
      allowedRoles = ["admin", "editor"],
    } = options;

    // 1) If user has an allowed role -> allow immediately
    const userRoleNames = await resolveRoleName(user); // must return array of role names (strings)
    const allowedLower = allowedRoles.map((r) =>
      String(r).trim().toLowerCase()
    );

    if (
      Array.isArray(userRoleNames) &&
      userRoleNames.some((rn) =>
        allowedLower.includes(String(rn).trim().toLowerCase())
      )
    ) {
      return next();
    }

    // 2) Otherwise check ownership
    const resourceId = req.params[idParam];
    if (!resourceId)
      throw new ApiError(400, "Missing resource id for ownership check");

    // select only the owner field for efficiency
    const resource = await resourceModel
      .findById(resourceId)
      .select(ownerField)
      .lean()
      .exec();

    if (!resource) throw new ApiError(404, "Resource not found");

    const ownerVal = resource[ownerField];
    if (ownerVal == null)
      throw new ApiError(500, "Resource owner field not found");

    // Compare owner and user ids robustly:
    // If ownerVal is a Mongoose ObjectId it may have .equals; otherwise compare string forms.
    const userId = user.id ?? user._id; // allow either
    if (!userId) throw new ApiError(500, "User id not available on request");

    const isOwner =
      (typeof ownerVal === "object" &&
        typeof ownerVal.equals === "function" &&
        ownerVal.equals(userId)) ||
      String(ownerVal) === String(userId);

    if (isOwner) return next();

    throw new ApiError(403, "Forbidden — not owner");
  });

export { resolveRoleName, authorizeRoles, allowRoleOrOwner };
