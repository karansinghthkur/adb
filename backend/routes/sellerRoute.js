const express = require("express");
const {
  registerSeller,
  loginSeller,
  logoutSeller,
  forgotPasswordSeller,
  resetPasswordSeller,
  getSellerDetails,
  updatePasswordSeller,
  updateProfileSeller,
} = require("../controllers/sellerController");
const { isAuthenticatedSeller, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerSeller);

router.route("/login").post(loginSeller);

router.route("/password/forgot").post(forgotPasswordSeller);

router.route("/password/reset/:token").put(resetPasswordSeller);

router.route("/logout").get(logoutSeller);

router.route("/me").get(isAuthenticatedSeller, getSellerDetails);

router.route("/password/update").put(isAuthenticatedSeller, updatePasswordSeller);

router.route("/me/update").put(isAuthenticatedSeller, updateProfileSeller);

module.exports = router;
