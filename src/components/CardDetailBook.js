import React from 'react'
import { Link } from 'react-router-dom'
// import { deleteBook } from '../utils/http'
// import EditBookModal from '../components/EditBookModal'
import '../styles/Detail.css'
import { useState } from 'react';
import ModalMessage from '../components/ModalMessage'
// import { Modal } from 'react-bootstrap'
import { deleteBookActionCreator } from "../redux/actions/BookAction";
import { connect } from "react-redux";
// import EditBookModal from '../components/EditBookModal'
// import ModalAlert from '../components/ModalAlert'

function CardDetailBook({ data, props, deleteBookAction, id, refresh }) {
  // const [isSuccess, setSuccess] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const URL_BASE = process.env.REACT_APP_API
  async function deleteBooks() {
    // const id = data.id

    await deleteBookAction(data.id)

    props.history.push('/book')
    setIsShow(true)
    return refresh()

  }
  // function back(){props.history.push('/book')}
  function handleHide() {
    setIsShow(false)
    props.history.push('/book')
  }
  function handleShow() { setIsShow(true) }

  let button;
  if (localStorage.getItem('role') === "1") {
    button = <>

      {data.status === "Unavailable" ?
        <form >
          <button type="button" disabled className="btn btn-outline-danger" >Book Still in Borrow List,Can't Delete</button>
        </form>
        :
        // <Link to={"/book"}>
        <form >
          <button type="button" className="btn btn-outline-danger" onClick={() => { handleShow() }}  ><i className="fa fa-trash"></i></button>
        </form>
        // </Link>  


      }

    </>
  }
  else {
    button = <>
      {data.status === "Available" ?
        <Link to={`/book/borrow/user/${data.id}`}>
          <form >
            <button type="button" className="btn btn-outline-dark" value={data.id}

            >Borrow</button>
          </form>
        </Link>
        :

        <form >  
          <button type="button" disabled className="btn btn-outline-dark" value={data.id}

          >Book Unavailable</button>
        </form>
      }
    </>
  }
  return (

    <>

      <Link to={`/book`}>
        <form >
          <button type="button" className="btn btn-warning" style={{ borderRadius: "50%" }}
          ><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
        </form>
      </Link>
      {/* <EditBookModal id={id} refresh={refresh} data={data}/> */}
      <img className="card-img-top" src={`${URL_BASE}/public/image/` + data.image} alt={data.image} style={{ "height": "30%", "width": "25%", "margin": "45% 0% 0% 80%", float: "right" }} />

      <div style={{ "margin": "0 0 0% 5%", "paddingTop": "0%", filter: "brightness(110%)", minWidth: "200px" }}>

        <div className="card-body" style={{ marginBottom: "2%", paddingTop: "0%", }}>
          <p className="sanserif">{data.genre}</p>
          <h3 className="trebuchet">{data.title}</h3>
          {data.status === "Available" ?
            <h4 style={{ "color": "green" }} className="customtext">{data.status}</h4> :
            <h4 style={{ "color": "red" }} className="customtext">{data.status}</h4>
          }
          <p>Date Added :   {new Date(data.date_added).toDateString()}</p>
          <p >Date Updated : {new Date(data.date_updated).toDateString()}</p>
          <p className="monospace" style={{ textAlign: "justify" }}>{data.description}</p>
          <h5 className="sanserif">Author : {data.author}</h5>


          <div className="btn-group" role="group">

            {button}



          </div>
        </div>
      </div>
      <Link to={`/book`}>
        <ModalMessage text={"Data will be Delete "} show={isShow} handleHide={handleHide} handlerSubmit={deleteBooks} />
      </Link>
      {/* ini */}

    </>
  )
}
const mapStateToProps = ({

  reducerBook


}) => {
  return {
    isLoading: reducerBook.isLoading,
    isRejected: reducerBook.isRejected,
    isFulfilled: reducerBook.isFulfilled,
    errorDelete: reducerBook.errorDelete

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteBookAction: async (id) => {
      await dispatch(deleteBookActionCreator(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailBook);

// export default CardDetailBook






