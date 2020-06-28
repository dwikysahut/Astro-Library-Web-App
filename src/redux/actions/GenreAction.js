import { getGenreAction ,putGenreAction,deleteGenreAction,postGenreAction,getGenreByIdAction} from "./actionTypes";
import { allGenre,postGenre,editGenre,deleteGenre,getGenreById } from "../../utils/http";

export const getGenreActionCreator = () => {
    return {
      type: getGenreAction,
      payload: allGenre(localStorage.getItem('token')),
    };
  };

  export const putGenreActionCreator = (id,body) => {
    return {
      type: putGenreAction,
      payload: editGenre(localStorage.getItem('token'),id,body),
    };
  };

  export const postGenreActionCreator = (body) => {
    return {
      
      type: postGenreAction,
      payload: postGenre(localStorage.getItem('token'),body),
    };
  };

  export const deleteGenreActionCreator = (id) => {
    return {
      type: deleteGenreAction,
      payload: deleteGenre(localStorage.getItem('token'),id),
    };
  };
  export const getGenreByIdActionCreator = (id) => {
    return {
      type: getGenreByIdAction,
      payload: getGenreById(localStorage.getItem('token'),id),
    };
  };
