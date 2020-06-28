import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css'
const Navbar = ({handle,total}) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" id="fixedbutton" ></span>
        
      </button>
      
       {localStorage.getItem('email') || localStorage.getItem('token') ?
        <>
          <span style={{marginRight:"10%"}}>Hi {localStorage.getItem('email')} </span>

{/* 
     <Filter total={total} handle={handle} />
     <div class="form-group col-md-2">
     <input className="form-control" type="search" placeholder="Search" aria-label="Search" name="title" onChange={handle} />
   </div>
 */}
        </>
        : <><span>Welcome </span>
        </>
      }
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{margin:"20px"}}>

        <ul className="navbar-nav ml-auto">
          <Link to="/">
            <li className="nav-link" >Home</li>
          </Link>
          {localStorage.getItem('role') ?
            <Link to="/auth/logout">
              <li className="nav-link" >Logout</li>
            </Link> :
            <Link to="/auth/login">
              <li className="nav-link" >Login</li>
            </Link>
          }
          {localStorage.getItem('token') ?
            <> </> : <Link to="/auth/register">
              <li className="nav-link" >Register</li>
            </Link>
          }
        </ul>
      </div>
     
    </nav>
  );
};
export default Navbar;

