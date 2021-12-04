import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { deleteAuthor } from '../utils/http'
import ModalMessage from '../components/ModalMessage'

import { Modal } from 'react-bootstrap'
import { deleteAuthorActionCreator } from "../redux/actions/AuthorAction";
import { connect } from "react-redux";

function AuthorCard({ data, refresh, deleteAuthorAction, isLoading, isFulfilled, errorDelete }) {
  const [isSuccess, setSuccess] = useState(true);

  const [isShow, setIsShow] = useState(false);

  async function delAuthor(e) {
    e.preventDefault()
    // const id = data.id

    await deleteAuthorAction(data.id)

    setSuccess(true)
    if (errorDelete === true) {
      console.log("success")
      console.log(errorDelete)
      setIsShow(true)
      //  alert("delete failed")
      setSuccess(false)
      // return refresh()
    }

    if (isFulfilled === true) {
      console.log("success")
      console.log(isSuccess)
    }

  }

  function handleHide() { setIsShow(false) }
  function handleShow() { setIsShow(true) }
  return (
    <>

      {isLoading === true ?
        <> </> : <></>}
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>
          <Link to={"/data/author/edit/" + data.id}>
            <form >
              <button type="button" value={data.id}><i className="fa fa-pencil" style={{ "fontSize": "24px" }}></i></button>
            </form>
          </Link>
          <form >
            <button type="button" data-toggle="modal" data-target="#myModal" onClick={handleShow} className="btn"><i className="fa fa-trash"></i></button>
          </form>

          {isSuccess === false ?
            <Modal show={isShow} onHide={handleHide}>
              <Modal.Header closeButton>
                <p>Delete Failed, Data Have Relations with Book table</p>
              </Modal.Header>

            </Modal> : <>
              <ModalMessage text={"Data will be Delete "} show={isShow} handleHide={handleHide} handlerSubmit={delAuthor} />
            </>
          }

          {/* <Modal show={show} onHide={handleHide}>
          <Modal.Body>
          <h2>Author Will Delete</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={(e)=> {delAuthor(e); handleHide()}}>
              Yes
            </Button>
            <Button variant="dark" onClick={handleHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
             */}


        </td>
      </tr>

    </>
  )
}
const mapStateToProps = ({

  reducerAuthor


}) => {
  return {
    isLoading: reducerAuthor.isLoading,
    isRejected: reducerAuthor.isRejected,
    isFulfilled: reducerAuthor.isFulfilled,
    errorDelete: reducerAuthor.errorDelete

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAuthorAction: (id) => {
      dispatch(deleteAuthorActionCreator(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorCard);

// export default AuthorCard