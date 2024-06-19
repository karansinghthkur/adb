const express = require("express");
const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  updateAdminRole,
} = require("../controllers/adminController");
const { isAuthenticatedAdmin, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admins").get(isAuthenticatedAdmin, getAllAdmins);

router.route("/admin/new").post(isAuthenticatedAdmin, createAdmin);

router
  .route("/admin/:id")
  .get(isAuthenticatedAdmin, getSingleAdmin)
  .put(isAuthenticatedAdmin, updateAdmin)
  .delete(isAuthenticatedAdmin, deleteAdmin);

router.route("/admin/:id/role").put(isAuthenticatedAdmin, updateAdminRole);

module.exports = router;
