import { body } from "express-validator";
const registerUserValidator = () => {
  return [
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("Email is invalid")
      .isLength({ min: 3 })
      .withMessage("user name must be atleast of 3 character"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("passowrd should be of min 6 char"),

    body("bio")
      .isLength({ min: 5 })
      .withMessage("bio should be of minimum 5 character long "),
  ];
};

// const loginUserValidator = () => {
//   return [
//     body("password")
//       .notEmpty()
//       .withMessage("password is required")
//       .isLength({ min: 6 })
//       .withMessage("passowrd should be of min 6 char"),
//   ];
// };

const loginUserValidator = () => {
  return [
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password should be at least 6 characters"),

    body().custom((value) => {
      if (!value.userName && !value.email) {
        throw new Error("Either username or email is required");
      }
      return true;
    }),
  ];
};

const changePasswrodValidator = () => {
  return [
    body("oldPasswrod")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("passowrd should be of min 6 char"),
    body("newPassword")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("password should be of minimum 6 char"),
  ];
};

const forgetPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};
export {
  registerUserValidator,
  loginUserValidator,
  changePasswrodValidator,
  forgetPasswordValidator,
};
