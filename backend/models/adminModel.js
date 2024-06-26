const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter Your First Name"],
      maxLength: [30, "First Name cannot exceed 30 characters"],
      minLength: [2, "First Name should have more than 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
      maxLength: [30, "Last Name cannot exceed 30 characters"],
      minLength: [2, "Last Name should have more than 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter Your Phone Number"],
      minLength: [10, "Phone Number should have 10 digits"],
      maxLength: [10, "Phone Number should have 10 digits"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please Enter Your Date of Birth"],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin", "seller", "user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Admin-specific fields
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware to hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to generate JWT token
adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Method to compare passwords
adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate reset password token
adminSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
