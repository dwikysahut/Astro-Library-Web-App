
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
// import {addBorrow,getBookById} from '../utils/http'
// import { getBookById } from '../utils/http'

import { Modal, Button } from 'react-bootstrap'
import '../styles/Home.css'
import { addBorrowActionCreator } from "../redux/actions/BorrowAction";
import { getBookByIdActionCreator } from "../redux/actions/BookAction";
import { connect } from "react-redux";

class AddBorrow extends Component {
  state = {

    id: '',
    id_user: '',
    title: '',
    isShow: false


  }

  handleHide = () => {
    this.setState({ isShow: false })
  }
  handleShow = () => {
    this.setState({ isShow: true })
  }
  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })

  }
  handlerSubmit = async () => {
    // const id=this.props.match.params.id

    const { id } = this.state

    console.log(this.state)
    const id_user = localStorage.getItem('id')
    console.log(id_user)

    await this.props.addBorrowAction(id)

    // this.setState({ isShow: false })
    // this.props.history.push('/data/author')


    // await addBorrow(

    //    localStorage.getItem('token'),
    //        this.state.id,

    //       )
    //        .then((response) => {
    //            console.log(response)
    //             //  alert("Book successfully add to List")

    //           // this.props.history.push('/book')

    //            }

    //              )



    //        .catch((error) => {
    //            console.log(error)
    //            alert(" Failed to add to List")
    //            if(error.response.data.data.message=="TokenExpiredError"||error.response.data.data.message=="JSONWebTokenError"){
    //             this.props.history.push('/auth/token')
    //           }
    //           alert(error.response.data.data.message)
    //           this.props.history.push('/auth/login')
    //           console.log(error.response.data.data.message)
    //        })



  }


  componentDidMount = async () => {
   
    const id = this.props.match.params.id
    const id_user = localStorage.getItem('id')
    console.log("mount " + this.state.id)

    this.setState({ id: id_user })

    console.log("id book : " + id)
    // const id=data.id
    console.log("id usr " + id_user)
    console.log()

    await this.props.getBookByIdAction(id)
    if (!this.props.dataById.title) {
      this.props.history.push('/')

    }
    this.setState({
      id: id,
      title: this.props.dataById.title,
      id_user: id_user

    }


    )
    // await getBookById(
    //    localStorage.getItem('token'),
    //    id

    //       )
    //        .then((response) => {

    //            console.log(response)
    //             this.setState({ id:response.data.data.id,
    //               title:response.data.data.title,
    //            id_user:id_user

    //            }


    //              )

    //        })
    //        .catch((error) => {
    //         if(error.response.data.data.message==="TokenExpiredError"){
    //           this.props.history.push('/auth/token')
    //         }
    //         alert(error.response.data.data.message)
    //         this.props.history.push('/auth/login')
    //         console.log(error.response.data.data.message)
    //        })
    //    console.log(this.state)





  }

  render() {
    if (this.props.errorToken === "TokenExpiredError") {

      alert('Token Expire')
      this.props.history.push('/auth/token')

      console.log(this.props.errorToken)
    }

    const { id, id_user, title } = this.state

    return (
      <>
        <Navbar />

        <form onSubmit={this.handlerSubmit}>
          <div style={{ "padding": "10% 10% 20% 2%", alignItems: "center" }} >
            <div style={{ padding: "10%",minWidth:"375px", height: "relative", backgroundImage: "url('/books.jpg')", backgroundSize: "100% 120%" }}>

              <div className="form-group col-md-4">
                <h2>Book Submit</h2>
                <label >ID Book</label>
                <input type="text" required name="id" disabled className="form-control" value={id} aria-describedby="emailHelp" onChange={this.handlerChange} />

              </div>
              <div className="form-group col-md-4">
                <label >ID User</label>
                <input type="text" required disabled name="id_user" className="form-control" value={id_user} aria-describedby="emailHelp" onChange={this.handlerChange} />

              </div>
              <div className="form-group col-md-4 ">
                <label >Title Book</label>
                <textarea type="text" required disabled name="title" className="form-control" value={title} aria-describedby="emailHelp" onChange={this.handlerChange} />

              </div>
              <button style={{ marginLeft: "15px" }} type="button" className="btn btn-outline-dark" onClick={(e) => { this.handleShow(e); this.handlerSubmit() }}>Yes.. I want to Borrow</button>
            </div>
          </div>
        </form>
        <Modal show={this.state.isShow} onHide={this.handleHide}>
          <Modal.Body>
            <h2>Book Successfully Borrowed !!</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={(e) => { this.handleHide(e); this.props.history.push("/book") }}>
              Okay
            </Button>

          </Modal.Footer>
        </Modal>

      </>
    )
  }
}

const mapStateToProps = ({

  reducerBorrow, reducerBook


}) => {
  return {
    isLoading: reducerBorrow.isLoading,
    isRejected: reducerBorrow.isRejected,
    isFulfilled: reducerBorrow.isFulfilled,
    errorToken: reducerBorrow.errorToken,
    dataById: reducerBook.dataById


  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBorrowAction: id => {
      dispatch(addBorrowActionCreator(id));
    },
   getBookByIdAction: async(id) => {
     await dispatch(getBookByIdActionCreator(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBorrow);

// export default AddBorrow
// module.exports = App
