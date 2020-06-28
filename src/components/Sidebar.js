import React from "react";
// import { Link } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
import '../styles/sidebar.css'
const Sidebar = ({btn}) => {


  return (
      <>
   <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{width:"100%"}}>
  <button className="navbar-toggler navbar-toggler-right"  style={{width:"100%"}}type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
 
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      
      <li className="nav-item dropdown d-sm-block d-md-none">
        <span className="nav-link dropdown-toggle"  style={{textAlign:"right"}} href="#" id="smallerscreenmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </span>
        <div className="dropdown-menu"  style={{paddingLeft:"0px",backgroundColor:"darkslategray"}}>
          {btn}
        </div>
      </li>
      
    </ul>
  </div>
</nav>

   

  </>
  )
}
export default Sidebar;

