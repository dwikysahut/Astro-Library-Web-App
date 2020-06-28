import { getAllBorrowAction ,addBorrowAction,returnBookAction, getUserBorrowAction} from "./actionTypes";
import { getUserBorrow,addBorrow,getAllBorrow,returnBook } from "../../utils/http";

export const getAllBorrowActionCreator = () => {
    return {
      type: getAllBorrowAction,
      payload: getAllBorrow(localStorage.getItem('token')),
    };
  };

  export const getUserBorrowActionCreator = () => {
    return {
      type: getUserBorrowAction,
      payload: getUserBorrow(localStorage.getItem('token')),
    };
  };

  export const addBorrowActionCreator = (id) => {
    return {
      type: addBorrowAction,
      payload: addBorrow(localStorage.getItem('token'),id),
    };
  };

  export const returnBookActionCreator = (id,body) => {
    return {
      type: returnBookAction,
      payload: returnBook(localStorage.getItem('token'),id,body),
    };
  };
  
