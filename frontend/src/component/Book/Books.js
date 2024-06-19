import React, { Fragment, useEffect, useState } from "react";
import "./Books.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getBook } from "../../actions/bookAction"; // Updated action import
import Loader from "../layout/Loader/Loader";
import BookCard from "../Home/BookCard"; // Assuming BookCard handles books as well
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

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
const Books = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    books, // Renamed books to books
    loading,
    error,
    booksCount, // Renamed booksCount to booksCount
    resultPerPage,
    filteredBooksCount, // Renamed filteredBooksCount to filteredBooksCount
  } = useSelector((state) => state.books); // Updated state selector to use books

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredBooksCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getBook(keyword, currentPage, price, category, ratings)); // Updated to use getBook
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="BOOK HUB -- ECOMMERCE" />
          <h2 className="booksHeading">Books</h2>

          <div className="books">
            {books &&
              books.map(
                (
                  book // Updated to iterate over books
                ) => (
                  <BookCard key={book._id} book={book} /> // Assuming BookCard accepts 'book' prop
                )
              )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1500}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map(
                (
                  cat // Renamed category to cat to avoid conflict
                ) => (
                  <li
                    className="category-link"
                    key={cat}
                    onClick={() => setCategory(cat)} // Renamed category to cat
                  >
                    {cat}
                  </li>
                )
              )}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={booksCount} // Updated to use booksCount
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Books;
