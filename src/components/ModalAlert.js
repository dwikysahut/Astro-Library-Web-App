import React from "react";
// import { Modal, ModalBody, Button } from 'react-bootstrap'
// import { Link } from "react-router-dom";

const ModalAlert = ({id,text}) =>{
  
  return (
  <>
   
<div className="container">

  {/* <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> */}

  <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
  
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        
        </div>
        <div className="modal-body">
          <p>{text}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  
</div>
  </>
  );
};

export default ModalAlert;

