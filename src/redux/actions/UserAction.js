import { getUserAction,logoutUserAction ,loginUserAction,registerUserAction,deleteUserAction, refreshTokenAction} from "./actionTypes";
import { allUser,loginUser,registerUser,deleteUser, deleteToken,refreshToken } from "../../utils/http";

export const getUserActionCreator = () => {
    return {
      type: getUserAction,
      payload: allUser(localStorage.getItem('token')),
    };
  };


  export const loginUserActionCreator = (body) => {
    
    return {
      
      type: loginUserAction,
      payload: loginUser(body)
    };
  };
  export const registerUserActionCreator = (body) => {
    return {
      
      type: registerUserAction,
      payload: registerUser(body),
    };
  };

  export const deleteUserActionCreator = (id) => {
    return {
      type: deleteUserAction,
      payload: deleteUser(localStorage.getItem('token'),id),
    };
  };

  export const logoutUserActionCreator = () => {
    return {
      type: logoutUserAction,
      payload: deleteToken(localStorage.getItem('token')),
    };
  };

  export const refreshTokenActionCreator = (body) => {
    return {
      type: refreshTokenAction,
      payload: refreshToken(body),
    };
  };
 