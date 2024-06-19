import {
  ALL_BOOK_FAIL,
  ALL_BOOK_REQUEST,
  ALL_BOOK_SUCCESS,
  ADMIN_BOOK_REQUEST,
  ADMIN_BOOK_SUCCESS,
  ADMIN_BOOK_FAIL,
  NEW_BOOK_REQUEST,
  NEW_BOOK_SUCCESS,
  NEW_BOOK_FAIL,
  NEW_BOOK_RESET,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
  UPDATE_BOOK_RESET,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  DELETE_BOOK_RESET,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_FAIL,
  BOOK_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/bookConstants";

export const booksReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case ALL_BOOK_REQUEST:
    case ADMIN_BOOK_REQUEST:
      return {
        loading: true,
        books: [],
      };
    case ALL_BOOK_SUCCESS:
      return {
        loading: false,
        books: action.payload.books,
        booksCount: action.payload.booksCount,
        resultPerPage: action.payload.resultPerPage,
        filteredBooksCount: action.payload.filteredBooksCount,
      };

    case ADMIN_BOOK_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case ALL_BOOK_FAIL:
    case ADMIN_BOOK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newBookReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case NEW_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BOOK_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        book: action.payload.book,
      };
    case NEW_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BOOK_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOK_REQUEST:
    case UPDATE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_BOOK_FAIL:
    case UPDATE_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BOOK_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_BOOK_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bookDetailsReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BOOK_DETAILS_SUCCESS:
      return {
        loading: false,
        book: action.payload,
      };
    case BOOK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bookReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
