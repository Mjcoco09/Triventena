

const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required",),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
    check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const err= new Error
  const existingUser = await User.findOne({
    where:{
      email,
    },
  })
  const existingUsername = await User.findOne({
    where:{
      username
    },
  })
  if (existingUser){
    const err= new Error("User already exists")
    err.status= 500
    err.errors = {
      email:"User with that email already exists"
    }
    return next(err);
  }
  if (existingUsername){
    const err= new Error
    err.message = "User already exists"
    err.status= 500
    err.errors = {
      username: "User with that username already exists"
    }
    return next(err);
  }

  const user = await User.create({
    email,
    username,
    hashedPassword,
    firstName,
    lastName,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
