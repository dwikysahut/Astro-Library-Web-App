import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { deleteGenre } from '../utils/http'
// import ModalAlert from '../components/ModalAlert'
import ModalMessage from '../components/ModalMessage'
import { Modal } from 'react-bootstrap'
import { deleteGenreActionCreator } from "../redux/actions/GenreAction";
import { connect } from "react-redux";


function GenreCard({ data, refresh, props, deleteGenreAction, isLoading, isFulfilled, isRejected, errorDelete }) {
  // console.log(props)
  const [isSuccess, setSuccess] = useState(true);
  const [isShow, setIsShow] = useState(false);
  // const [text, setText] = useState("sad");

  // useEffect(() => {
  //   //fetching
  //   console.log(data, new Date().getTime())
  // },[data])
  // console.log(data)
  async function delGenre(e) {
    // const id = data.id
    try {

    } catch (error) {

    }
    e.preventDefault()
    await deleteGenreAction(data.id)
    setSuccess(true)

    if (errorDelete === true) {
      console.log("success")
      console.log(errorDelete)
      setIsShow(true)
      //  alert("delete failed")
      setSuccess(false)
      return refresh()
    }

    if (isFulfilled === true) {
      console.log("success")
      console.log(isSuccess)
      return refresh()
    }



  }
  function handleHide() { setIsShow(false) }
  function handleShow() { setIsShow(true) }
  return (

    <>

      <tr >
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>
          <Link to={"/data/genre/edit/" + data.id}>
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
              <ModalMessage text={"Data will be Delete "} show={isShow} handleHide={handleHide} handlerSubmit={delGenre} />

            </>
          }


        </td>
      </tr>

    </>
  )
}
const mapStateToProps = ({

  reducerGenre,


}) => {
  return {
    isLoading: reducerGenre.isLoading,
    isRejected: reducerGenre.isRejected,
    isFulfilled: reducerGenre.isFulfilled,
    errorDelete: reducerGenre.errorDelete

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteGenreAction: (id) => {
      dispatch(deleteGenreActionCreator(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreCard);

// export default GenreCard