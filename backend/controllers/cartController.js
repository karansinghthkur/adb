const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const auth=require("../middleware/auth");
const Cart = require("../models/cartModel");


// Save cart items
exports.saveCartItems = async (req, res, next) => {
  const { cartItems } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    cart.cartItems = cartItems;
  } else {
    cart = new Cart({
      user: userId,
      cartItems,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
};

// Get cart items
exports.getCartItems = async (req, res, next) => {
  const userId = req.params.userId;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  res.status(200).json({
    success: true,
    cartItems: cart.cartItems,
  });
};
