const Book = require("../models/bookModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get Books of the logged in Seller
exports.getMyBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({ seller: req.seller.id });

  res.status(200).json({
    success: true,
    count: books.length,
    books,
  });
});

// Get Book Details of the logged in Seller
exports.getMyBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler(`Book not found with ID: ${req.params.id}`, 404));
  }

  // Check if the book belongs to the logged in seller
  if (book.seller.toString() !== req.seller.id) {
    return next(new ErrorHandler(`You are not authorized to access this book`, 401));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// Update Book Details of the logged in Seller
exports.updateMyBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler(`Book not found with ID: ${req.params.id}`, 404));
  }

  // Check if the book belongs to the logged in seller
  if (book.seller.toString() !== req.seller.id) {
    return next(new ErrorHandler(`You are not authorized to update this book`, 401));
  }

  // Update book details
  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    book,
  });
});

// Delete Book of the logged in Seller
exports.deleteMyBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler(`Book not found with ID: ${req.params.id}`, 404));
  }

  // Check if the book belongs to the logged in seller
  if (book.seller.toString() !== req.seller.id) {
    return next(new ErrorHandler(`You are not authorized to delete this book`, 401));
  }

  await book.remove();

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

// Get Sales Statistics of the logged in Seller
exports.getMySales = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ "orderItems.book.seller": req.seller.id });

  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  res.status(200).json({
    success: true,
    totalSales,
    ordersCount: orders.length,
  });
});

// Get Approval Status of the logged in Seller's Books
exports.getMyBookApprovalStatus = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({ seller: req.seller.id });

  const approvalStatus = books.map((book) => ({
    bookId: book._id,
    name: book.name,
    approved: book.approved,
  }));

  res.status(200).json({
    success: true,
    approvalStatus,
  });
});