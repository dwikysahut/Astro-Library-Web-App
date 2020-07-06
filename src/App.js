import React from 'react'; // sama dengan const React=require
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import RefreshToken from './pages/RefreshToken'
import User from './pages/User'

import Books from './pages/Books'

import BookDetail from './pages/BookDetail'


import ManageGenre from './pages/ManageGenre'
import Genre from './pages/Genre'

import ManageAuthor from './pages/ManageAuthor'
import Author from './pages/Author';
import Home from './pages/Home';


import Borrow from './pages/Borrow'
import AddBorrow from './pages/AddBorrow'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

//materi redux
// import store from "./redux/store"
//import {Provider} from 'react-redux'

require('dotenv').config()

const role=localStorage.getItem('role')
console.log(role)

const App = () => {
  
  return (
     <Provider store={store}>
    
    <Router>
       {/* <Route path="/book/admin"  component={BooksAdmin} /> localhost:3000/ */}
       <Route path="/auth/user" exact component={User} /> {/* localhost:3000/ */}
     
      <Route path="/" exact component={localStorage.getItem('token')?Home:Login} /> {/* localhost:3000/ */}
      <Route path="/auth/login" exact component={Login} /> {/* localhost:3000/ */}
      <Route path="/auth/register" component={Register} /> {/* localhost:3000/profile */}
      <Route path="/auth/token" component={RefreshToken} /> {/* localhost:3000/profile */}
      {/* book */}
      <Route path="/book/detail/item/:id" exact component={BookDetail} /> {/* localhost:3000/profile */}
      <Route path="/book"exact component={Books} /> {/* localhost:3000/profile */}
    
      {/* <Route path="/book/add" component={AddBook} /> 
    */}
    {/* genre      */}
      <Route path="/data/genre" exact component={Genre} /> {/* localhost:3000/profile */}
      <Route path="/data/genre/edit/:id" exact component={ManageGenre} /> {/* localhost:3000/profile */}
      <Route path="/data/genre/add" component={ManageGenre} /> {/* localhost:3000/profile */}
    
     
     {/* author */}
     <Route path="/data/author" exact component={Author} /> 
     <Route path="/data/author/edit/:id" exact component={ManageAuthor} /> 
      <Route path="/data/author/add" component={ManageAuthor} /> 
    
    
    {/* borrow */}

  
      {/* <Route path="/book/borrow/admin" exact component={BorrowAdmin} /> */}
      <Route path="/book/borrow/user" exact component={Borrow} /> {/* localhost:3000/profile */}
      <Route path="/book/borrow/user/:id"  component={AddBorrow} /> {/* localhost:3000/profile */}


      <Route path="/auth/logout" exact component={Logout} /> {/* localhost:3000/ */}
   
    </Router>
     </Provider>
  );
};


export default App;