const mongoose = require("mongoose");
const User = require("./User");

const buyerSchema = new mongoose.Schema({
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
  ],

  // No additional fields for buyer, inherits from User
});

const Buyer = User.discriminator("Buyer", buyerSchema);
module.exports = Buyer;
