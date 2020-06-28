import React from 'react'
// import { Link } from 'react-router-dom'
// import { deleteUser } from '../utils/http'
// import ModalAlert from '../components/ModalAlert'
import ModalMessage from '../components/ModalMessage'
import { useState } from 'react';
import { Modal } from 'react-bootstrap'
import { deleteUserActionCreator } from "../redux/actions/UserAction";
import { connect } from "react-redux";


function UserCard({ data,refresh,props,deleteUserAction,isLoading,isFulfilled,isRejected,errorDelete}) {
    const [isSuccess, setSuccess] = useState(true);
    const [isShow, setIsShow] = useState(false);
    async function delUser(e) {
        e.preventDefault()
     
        // const id = data.id

       
        await deleteUserAction(data.id)
        setSuccess(true)

    
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
      
  
  

        // await deleteUser(localStorage.getItem('token'),id)
        //     .then((response) => {
        //         console.log(response)
        //         setSuccess(true)
        //         setIsShow(true)
        //         // if(response.status===200){
        //         // alert("User successfully Removed")}
        //         return refresh()
        //     }

        //     )
        //     .catch((error) => {
        //         setSuccess(false)
        //         console.log(error.response)
        //        if (error.response) {

        //            if (error.response.data.data.message == "TokenExpiredError") {
        //              props.history.push('/auth/token')
        //              alert(error.response.data.data.message)
        //              props.history.push('/auth/login')
        //              console.log(error.response.data.data.message)
        //            }

        //            else if(error.response.status===500){
        //             setSuccess(false)
        //             setIsShow(true)
        //             //   alert(error.response.data.data.message)
        //              // alert("Cant delete, data still have relation with Book")

        //         return false
        //          }

        //          else {
        //            console.log(error.response.data.data.message)
        //            localStorage.removeItem('token')
        //            localStorage.removeItem('refreshToken')
        //            localStorage.removeItem('email')
        //            localStorage.removeItem('id')
        //            localStorage.removeItem('id_user')
        //            localStorage.removeItem('role')
        //            this.props.history.push('/auth/logout')
        //          }

        //          }
        //          else{
        //              console.log(error)
        //              alert("delete failed")
        //              alert("logout, renew error, please relog")
        //          }
        //    })
    }

    function handleHide() { setIsShow(false) }
  
    function handleShow() { setIsShow(true) }
    return (
        <>
        {isLoading===true  ?
              <><div style={{ margin: "10% 30% 30% 30%" }} className="spinner-border" role="status"><span className="sr-only">Loading...</span>
              </div> </> : <></>}
            <tr >
                <td>{data.id}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                    <form >
                    <button type="button" data-toggle="modal" data-target="#myModal" onClick={handleShow} className="btn"><i className="fa fa-trash"></i></button>
                    </form>
                   
                    {isSuccess === false ?
					<Modal show={isShow} onHide={handleHide}>
						<Modal.Header closeButton>
            <p>Delete Failed, Data Have Relations with Borrow table</p>
						</Modal.Header>

					</Modal> : <>
                    <ModalMessage text={"Data will be Delete "}show={isShow} handleHide={handleHide} handlerSubmit={delUser}/>
					</>
				}

                </td>
            </tr>

        </>
    )
}



const mapStateToProps = ({

    reducerUser


}) => {
    return {
        isLoading: reducerUser.isLoading,
        isRejected: reducerUser.isRejected,
        isFulfilled: reducerUser.isFulfilled,
        errorDelete: reducerUser.errorDelete

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUserAction: (id) => {
            dispatch(deleteUserActionCreator(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);

// export default UserCard