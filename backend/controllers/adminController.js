const Admin = require('../models/Admin');
const Book = require('../models/Book');

// Admin approves a book
const approveBook = async (req, res) => {
  const { adminId, bookId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    book.approved = true;
    await book.save();

    res.status(200).json({ success: true, message: 'Book approved successfully', book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  approveBook,
};
