const express = require("express");
const {
  saveCartItems,
  getCartItems,
} = require("../controllers/cartController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/cart/save").post(isAuthenticatedUser, saveCartItems);
router.route("/cart/:userId").get(isAuthenticatedUser, getCartItems);

module.exports = router;
