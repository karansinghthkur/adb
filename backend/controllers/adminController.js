const User = require("../models/userModel");
const Book = require("../models/bookModel");
const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get All Users (Admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// Get Single User (Admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander(`User not found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role (Admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander(`User not found with ID: ${req.params.id}`, 404));
  }

  user.role = req.body.role;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});

// Delete User (Admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander(`User not found with ID: ${req.params.id}`, 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// Get All Books (Admin)
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    count: books.length,
    books,
  });
});

// Update Book (Admin)
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHander(`Book not found with ID: ${req.params.id}`, 404));
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    book: updatedBook,
  });
});

// Delete Book (Admin)
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHander(`Book not found with ID: ${req.params.id}`, 404));
  }

  await book.remove();

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

// Get All Orders (Admin)
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// Update Order Status (Admin)
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander(`Order not found with ID: ${req.params.id}`, 404));
  }

  order.orderStatus = req.body.status;

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
  });
});

// Delete Order (Admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander(`Order not found with ID: ${req.params.id}`, 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
