import React from 'react'
//  import{Link} from'react-router-dom'
// import { deleteBookUser,returnBook } from '../utils/http'
import ModalMessage from './ModalMessage'
import { useState } from 'react';
// import { Alert ,Modal,Button} from 'react-bootstrap'
import { returnBookActionCreator } from "../redux/actions/BorrowAction";
import { connect } from "react-redux";

function BorrowCard({data,refresh,props,returnBookAction,isLoading,isFulfilled,isRejected,errorDelete}){

  const [show, setShow] = useState(false);

    async function returnBorrowUser(e){
      e.preventDefault()
        const id=data.id
        
        await returnBookAction(id)
        setShow(false)
        return refresh()
    //     await returnBook(
         
    //        localStorage.getItem('token'),
    //            id,{status:body}
    //           )
    //            .then((response) => {
    //             setShow(false)
    //                console.log(response)
    //                }
                    
    //                  )
      
                  
               
    //            .catch((error) => {
    //                console.log(error)
                 
                 
    //            })
    //            console.log(id)
    //            return refresh()
       
     }
     
   function handleHide ()  {setShow(false)}
   function handleShow ()  {setShow(true)}
   
    return (
   
        <>
  <tr>
  {isLoading===true  ?
              <><div style={{ margin: "10% 30% 30% 50%" }} class="spinner-border" role="status"><span class="sr-only">Loading...</span>
              </div> </> : <></>}
            <td>{data.id}</td>
            <td>{data.id_user}</td>
            <td>{data.user_email}</td>
          
            <td>{data.id_book}</td>
            <td>{data.title}</td>
            <td>{new Date(data.borrow_at).toDateString()}</td>
            {data.status==="Returned"?
             <td>{new Date(data.return_at).toDateString()}</td>:<td>-</td>
          }
            {/* <td>{data.return_at}</td> */}
            <td>{data.status}</td>
            <td>
            {localStorage.getItem('role')==="2" && data.status==="Borrowed"?
            
           <form > 
           <button type="button" className="btn btn-outline-dark"onClick={handleShow}  >Return Book</button>
       </form>:<></>
        }
             
              
            </td>
            </tr>
         
            <ModalMessage text={"Are You Sure To Return Book"}show={show} handleHide={handleHide} handlerSubmit={returnBorrowUser}/>
     
           {/* <Modal show={show} onHide={handleHide}>
          <Modal.Body>
          <h2>Book wiil return</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={(e)=> {returnBorrowUser(e); handleHide()}}>
              Yes
            </Button>
            <Button variant="dark" onClick={handleHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal> */}
            
                  </>
    )
}
const mapStateToProps = ({
 
  reducerBorrow


}) => {
  return {
    isLoading:reducerBorrow.isLoading,
    isRejected:reducerBorrow.isRejected,
    isFulfilled:reducerBorrow.isFulfilled,
    errorDelete:reducerBorrow.errorDelete
    
  };
};
  const mapDispatchToProps = (dispatch) => {
    return {
      returnBookAction: (id,body)=> {
        dispatch(returnBookActionCreator(id,body));
      },
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(BorrowCard);

// export default BorrowCard