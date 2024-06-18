const mongoose = require("mongoose");
const User = require("./User");

const sellerSchema = new mongoose.Schema({
  // Seller-specific fields
  commission: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  books: [{
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  }],
});

const Seller = User.discriminator("Seller", sellerSchema);
module.exports = Seller;
