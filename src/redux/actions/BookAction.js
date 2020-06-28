import { getAllBooksAction ,postBookAction,deleteBookAction, editBookAction,getBookByIdAction,getDetailBookAction} from "./actionTypes";
import { getAllBooks,getDetailBook,getBookById,postBook, editBook, deleteBook } from "../../utils/http";

export const getAllBooksActionCreator = (body) => {
    return {
      type: getAllBooksAction,
      payload: getAllBooks(localStorage.getItem('token'),body),
    };
  };

  export const getDetailBookActionCreator = (id) => {
    return {
      type: getDetailBookAction,
      payload: getDetailBook(localStorage.getItem('token'),id),
    };
  };

  export const getBookByIdActionCreator = (id) => {
    return {
      type: getBookByIdAction,
      payload: getBookById(localStorage.getItem('token'),id),
    };
  };

  export const postBookActionCreator = (body) => {
    return {
      type: postBookAction,
      payload: postBook(localStorage.getItem('token'),body),
    };
  };

  export const editBookActionCreator = (id,body) => {
    return {
      type: editBookAction,
      payload: editBook(localStorage.getItem('token'),id,body),
    };
  };

  export const deleteBookActionCreator = (id) => {
    return {
      type: deleteBookAction,
      payload: deleteBook(localStorage.getItem('token'),id),
    };
  };
  
