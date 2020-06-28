import React from "react";
import { Modal, Button } from 'react-bootstrap'
// import { Link } from "react-router-dom";

const ModalMessage = ({show,text,handleHide,handlerSubmit}) =>{
  
  return (
  <>
   <Modal show={show} onHide={handleHide}>
          <Modal.Body>
  <h2>{text}</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handlerSubmit}>
              Okay
            </Button>
            <Button variant="dark" onClick={handleHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
            
  </>
  );
};

export default ModalMessage;

