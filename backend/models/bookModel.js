const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Book Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Book Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Book Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Book Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Book Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  author: {
    type: String,
    required: [true, "Please Enter Book Author"],
  },
  publications: {
    type: String,
    required: [true, "Please Enter Book Publications"],
  },
  year: {
    type: Number,
    required: [true, "Please Enter Publication Year"],
  },
  isbn: {
    type: String,
    required: [true, "Please Enter ISBN"],
    unique: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
