import React from "react";
// import { Modal, ModalBody, Button } from 'react-bootstrap'
// import { Link } from "react-router-dom";
import ModalMessage from './ModalMessage'
import {Alert} from 'react-bootstrap'
const ManageData = ({text,handlerChange,handleShow,handleHide,handlerSubmit,isShow,isSuccess,name}) =>{
  
  return (
  <>
  		<h1>Library App</h1>
  <h2>{text}</h2>
					<div className="row">
						<div className="titleImage">
							<div className="col-sm">

								<br />

							</div>
						</div>
						<div className="col-sm">
							<div className="padding">
								<form onSubmit={handlerSubmit}>
									<div className="form-group">
										<label >Name</label>
										{name?
										<input type="text" required name="name" className="form-control" value={name} aria-describedby="emailHelp" onChange={handlerChange} />
									  :
									  <input type="text" required name="name" className="form-control" aria-describedby="emailHelp" onChange={handlerChange} />
									
									}
										 
										{isSuccess === false ? <Alert variant="danger">
                                            Field Can't empty
                          </Alert> : <></>}
									</div>

									<button type="button" className="btn btn-primary" onClick={handleShow}>

										Save
				</button>

								</form>
							</div>
						</div>


					</div>
					<ModalMessage text={"Data Confirm"}show={isShow} handleHide={handleHide} handlerSubmit={handlerSubmit}/>
    </>

  );
};

export default ManageData;

