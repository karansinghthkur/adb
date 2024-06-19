import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateBook,
  getBookDetails,
} from "../../actions/bookAction"; // Assuming you have bookAction and bookConstants set up similarly
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_BOOK_RESET } from "../../constants/bookConstants"; // Update to your book constants file

const UpdateBook = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, book } = useSelector((state) => state.bookDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.book);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Science Fiction",
    "Historical",
    "Classic",
    "Fantasy",
    "Horror",
    "Mystery and Thriller",
    "Biography",
  ];
  categories.sort();
  const bookId = match.params.id;

  useEffect(() => {
    if (book && book._id !== bookId) {
      dispatch(getBookDetails(bookId));
    } else {
      setName(book.name);
      setDescription(book.description);
      setPrice(book.price);
      setCategory(book.category);
      setStock(book.stock);
      setOldImages(book.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Book Updated Successfully");
      history.push("/admin/books");
      dispatch({ type: UPDATE_BOOK_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    bookId,
    book,
    updateError,
  ]);

  const updateBookSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateBook(bookId, formData));
  };

  const updateBookImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prevImages) => [...prevImages, reader.result]);
          setImages((prevImages) => [...prevImages, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Book" />
      <div className="dashboard">
        <SideBar />
        <div className="updateBookContainer">
          <form
            className="updateBookForm"
            encType="multipart/form-data"
            onSubmit={updateBookSubmitHandler}
          >
            <h1>Update Book</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Book Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Book Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div id="updateBookFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateBookImagesChange}
                multiple
              />
            </div>

            <div id="updateBookFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Book Preview" />
                ))}
            </div>

            <div id="updateBookFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Book Preview" />
              ))}
            </div>

            <Button
              id="updateBookBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBook;
