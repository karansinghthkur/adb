import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";

import "./Home.css";
import BookCard from "./BookCard.js"; // Assuming BookCard.js is renamed to BookCard.js
import MetaData from "../layout/MetaData";
import { clearErrors, getBook } from "../../actions/bookAction"; // Assuming getBook() is renamed to getBooks()
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, books } = useSelector((state) => state.books); // Assuming state.books is renamed to state.books

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBook()); // Assuming getBook() is renamed to getBooks()
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <h1>Welcome to Book Hub</h1>
            <h1>
              Discover Remarkable Reads: Explore Our Diverse Book Collection!
            </h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Books</h2>{" "}
          {/* Changed "Books" to "Books" */}
          <div className="container" id="container">
            {books &&
              books.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
