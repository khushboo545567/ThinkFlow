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

const loginUserValidator = () => {
  return [
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("passowrd should be of min 6 char"),
  ];
};
export { registerUserValidator, loginUserValidator };
