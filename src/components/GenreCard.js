import React,{useState} from 'react'
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

    e.preventDefault()
    await deleteGenreAction(data.id)
    setSuccess(true)

    // setIsShow(true)

 

 
    if(errorDelete===true){
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
   
    // if (isFulfilled === true) {
    //   console.log("success")
    //   console.log(isSuccess)
    //   return refresh()
    // }
    // if (isRejected === true) {
    //   alert('delete failed')
    //   console.log()
    // }

    // if (errorDelete) {


    //   setIsShow(true)
    //   //  alert("delete failed")
    //   setSuccess(false)
    //   console.log(isSuccess)
    // }



    // await deleteGenre(

    //    localStorage.getItem('token'),
    //        id
    //       )
    //        .then((response) => {
    //         setSuccess(true)
    //          setIsShow(true)
    //            console.log(response)

    //        setText("berhasil")
    //         console.log(isSuccess)

    //         return refresh() 
    //        })
    //        .catch((error) => {

    //          console.log(error.response)
    //         if (error.response) {

    //             if (error.response.data.data.message == "TokenExpiredError") {
    //               props.history.push('/auth/token')
    //               alert(error.response.data.data.message)
    //               props.history.push('/auth/login')
    //               console.log(error.response.data.data.message)
    //             }

    //             else if(error.response.status===500){
    //               setSuccess(false)
    //               setIsShow(true)


    //               //  alert(error.response.data.data.message)
    //               // alert("Cant delete, data still have relation with Book")


    //           }

    //           else {
    //             console.log(error.response.data.data.message)
    //             localStorage.removeItem('token')
    //             localStorage.removeItem('refreshToken')
    //             localStorage.removeItem('email')
    //             localStorage.removeItem('id')
    //             localStorage.removeItem('id_user')
    //             localStorage.removeItem('role')
    //             this.props.history.push('/auth/logout')
    //           }

    //           }
    //           else{

    //               console.log(error)
    //               alert("delete failed")
    //               alert("logout, renew error, please relog")
    //           }
    //     })


  }
  function handleHide() { setIsShow(false) }
  function handleShow() { setIsShow(true) }
  return (

    <>

      {/* {isLoading === true ?
        <><div style={{ margin: "10% 30% 30% 50%" }} className="spinner-border" role="status"><span className="sr-only">Loading...</span>
        </div> </> : <></>} */}
      <tr >
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>
          <Link to={"/data/genre/edit/" + data.id}>
            <form >
              <button type="button" value={data.id}><i className="fa fa-pencil" style={{"fontSize":"24px"}}></i></button>
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