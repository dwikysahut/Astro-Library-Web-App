import { getAuthorAction ,putAuthorAction,deleteAuthorAction,postAuthorAction, getAuthorByIdAction} from "./actionTypes";
import { allAuthor,postAuthor,editAuthor,deleteAuthor,getAuthorById } from "../../utils/http";

export const getAuthorActionCreator = () => {
    return {
      type: getAuthorAction,
      payload: allAuthor(localStorage.getItem('token')),
    };
  };

  export const putAuthorActionCreator = (id,body) => {
    return {
      type: putAuthorAction,
      payload: editAuthor(localStorage.getItem('token'),id,body),
    };
  };

  export const postAuthorActionCreator = (body) => {
    return {
      type: postAuthorAction,
      payload: postAuthor(localStorage.getItem('token'),body),
    };
  };

  export const deleteAuthorActionCreator = (id) => {
    return {
      type: deleteAuthorAction,
      payload: deleteAuthor(localStorage.getItem('token'),id),
    };
  };
  export const getAuthorActionByIdCreator = (id) => {
    return {
      type: getAuthorByIdAction,
      payload: getAuthorById(localStorage.getItem('token'),id),
    };
  };
