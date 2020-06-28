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
    // setSuccess(true)
    setIsShow(true)
    return refresh()
    // await deleteBook(

    //   localStorage.getItem('token'),
    //   id
    // )
    //   .then((response) => {
    //     console.log(response)
    //     setSuccess(true)
    //     setIsShow(true)
    //     // alert("Book successfully Removed")

    //  //   return refresh()
    //   })
    //   .catch((error) => {
    //     if (error.response) {

    //       if (error.response.data.data.message == "TokenExpiredError") {
    //         this.props.history.push('/auth/token')
    //         alert(error.response.data.data.message)
    //         this.props.history.push('/auth/login')
    //         console.log(error.response.data.data.message)
    //       }

    //       else if(error.response.status===500){
    //         setSuccess(false)
    //         setIsShow(true)


    //         //  alert(error.response.data.data.message)
    //         // alert("Cant delete, data still have relation with Book")


    //     }

    //     else {
    //       console.log(error.response.data.data.message)
    //       localStorage.removeItem('token')
    //       localStorage.removeItem('refreshToken')
    //       localStorage.removeItem('email')
    //       localStorage.removeItem('id')
    //       localStorage.removeItem('id_user')
    //       localStorage.removeItem('role')
    //       this.props.history.push('/auth/logout')
    //     }

    //     }
    //     else{

    //         console.log(error)
    //         alert("delete failed")
    //         alert("logout, renew error, please relog")
    //     }
    //   })
    // console.log(id)
    // return refresh()

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
          <p >Date Update : {new Date(data.date_updated).toDateString()}</p>
          <p className="monospace" style={{ textAlign: "justify" }}>{data.description}</p>
          <h5 className="sanserif">Author : {data.author}</h5>


          <div className="btn-group" role="group">

            {button}



          </div>
        </div>
      </div>

      {/* {isSuccess === false ?
					<Modal show={isShow} onHide={handleHide}>
						<Modal.Header closeButton>
            <p>Delete Failed</p>
						</Modal.Header>

					</Modal> : <>
          <Modal show={isShow} onHide={handleHide}>
						<Modal.Header closeButton>
            <p>Delete successfully</p>
						</Modal.Header>
            <Modal.Footer closeButton>
            <Button variant="warning" onClick={()=>{handleHide();back()}}>
              Okay
            </Button>
						</Modal.Footer>
           

					</Modal>  */}
      {/* <ModalMessage text={"Data will be Delete "}show={isShow} handleHide={handleHide} handlerSubmit={delGenre}/> */}

      {/* </>
				} */}
      {/* <Modal show={isShow} onHide={handleHide}>
						<Modal.Header closeButton>
            <p>Delete Failed, Data Have Relations with Book table</p>
						</Modal.Header>

					</Modal> : <> */}

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






