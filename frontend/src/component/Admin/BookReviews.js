import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./bookReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../../../frontend/src/actions/bookAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../../../frontend/src/component/layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import SideBar from "../../../../frontend/src/component/Admin/Sidebar";
import { DELETE_REVIEW_RESET } from "../../../../frontend/src/constants/bookConstants";

const BookReviews = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector((state) => state.bookReviews);

  const [bookId, setBookId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, bookId));
  };

  const bookReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(bookId));
  };

  useEffect(() => {
    if (bookId.length === 24) {
      dispatch(getAllReviews(bookId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, bookId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="bookReviewsContainer">
          <form className="bookReviewsForm" onSubmit={bookReviewsSubmitHandler}>
            <h1 className="bookReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Book Id"
                required
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>

            <Button
              id="createBookBtn"
              type="submit"
              disabled={loading ? true : false || bookId === "" ? true : false}
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="bookListTable"
              autoHeight
            />
          ) : (
            <h1 className="bookReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BookReviews;
