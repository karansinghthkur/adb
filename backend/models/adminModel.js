const mongoose = require("mongoose");
const User = require("./User");

const adminSchema = new mongoose.Schema({
  // Admin-specific fields
  commission: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: true,
  },
});

const Admin = User.discriminator("Admin", adminSchema);
module.exports = Admin;
