
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import BorrowCard from '../components/BorrowCard'
// import { getUserBorrow, getAllBorrow } from '../utils/http'
import { getUserBorrowActionCreator, getAllBorrowActionCreator } from "../redux/actions/BorrowAction";
import { connect } from "react-redux";

import '../styles/Home.css'
// import { Link } from 'react-router-dom'
class Borrow extends Component {

  constructor(props) {
    super(props)
    this.state = {

      data: [],
      id: '',
      name: '',
      isEmpty:false



    };
  }


  getData = async () => {

   
    if (localStorage.getItem('role') === "1") {

      await this.props.getAllBorrowAction();
      // await getAllBorrow(
      //   localStorage.getItem('token'),
      // )
      //   .then((response) => {

      //     this.setState({ data: response.data.data }

      //     )


      //     console.log(this.state.data)

      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       if (error.response.data.data.message == "TokenExpiredError") {
      //         this.props.history.push('/auth/token')
      //         alert(error.response.data.data.message)
      //         this.props.history.push('/auth/login')
      //         console.log(error.response.data.data.message)

      //       }
      //       else {
      //         console.log(error.response.data.data.message)
      //         localStorage.removeItem('token')
      //         localStorage.removeItem('refreshToken')
      //         localStorage.removeItem('email')

      //         localStorage.removeItem('id')
      //         localStorage.removeItem('id_user')
      //         localStorage.removeItem('role')
      //       }
      //     }
      //     else {
      //       console.log(error)
      //     }
      //     console.log(error)

      //   })
    }
    else {
      await this.props.getUserBorrowAction();
      // await getUserBorrow(
      //   localStorage.getItem('token'),
      // )
      //   .then((response) => {

      //     this.setState({ data: response.data.data }

      //     )

      //       console.log(response)
      //     console.log(this.state.data)

      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       if (error.response.data.data.message == "TokenExpiredError") {
      //         this.props.history.push('/auth/token')
      //         alert(error.response.data.data.message)
      //         this.props.history.push('/auth/login')
      //         console.log(error.response.data.data.message)

      //       }
      //       else {
      //         console.log(error.response.data.data.message)
      //         localStorage.removeItem('token')
      //         localStorage.removeItem('refreshToken')
      //         localStorage.removeItem('email')

      //         localStorage.removeItem('id')
      //         localStorage.removeItem('id_user')
      //         localStorage.removeItem('role')
      //       }
      //     }
      //     else {
      //       console.log(error)
      //     }
      //   })



    }
  }
  componentDidMount = () => {
    
    if (this.props.data.length <= 0) {
      this.getData()
    }
     this.getData()
  }
  // async	componentDidUpdate(prevProps, prevState) {


  // }

  shouldComponentUpdate() {
    // return true -> akan merubah state
    // return false
    return true
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.props.onChange(e.target.value)
  }
  // componentWillUnmount(){}

  // search = this.search.bind(this);
  render() {
    if(this.props.errorToken==="TokenExpiredError"){
    
      // alert('Token Expire')
      this.props.history.push('/auth/token')
    
    console.log(this.props.errorToken)
  }
    const renderData = this.props.data.map(data => {
      return (
        <BorrowCard data={data} key={data.id} refresh={this.componentDidMount} length={this.state.data.length}/>
      )
    })
    return (
      <>
        <Navbar >
        </Navbar>


        <div >
          <div className="form-row">
            <form className="form-inline my-4 my-lg-0">
              {/* <Link to={"/data/author/add"}>
<button type="submit" className="btn btn-secondary" >Add Borrow List</button>
        </Link> */}

            </form>
          </div>

          {this.props.data.length===0?
                <h2 style={{margin:"20% 20% 20% 40%"}}>No Data in Borrow list</h2>
                    :
          <>
             <h2 style={{margin:"0% 0% 0% 0%"}}>Borrow List & History</h2>
          <div className="App">
            <div className="left">
              <table className="table " style={{ margin: "2% 0% 30% 0%" }}>
                <thead className="thead-dark">
                  <tr>
                    <th >ID Borrow</th>
                    <th >ID User</th>
                    <th>Email</th>
                    <th>ID Book</th>
                    <th>Book Title</th>
                    <th>Borrow at</th>
                    <th>Return at</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                 
                {renderData}
                  
                
                </tbody>

              </table>
             
            </div>    </div>
            </>
    } 
        </div>
        
      </>
  
     ) }
          }

          const mapStateToProps = ({
           
            reducerBorrow,
          
          }) => {
            return {
              isRejected:reducerBorrow.isRejected,
              isFulfilled:reducerBorrow.isRejected,
              isLoading:reducerBorrow.isLoading,
              data:reducerBorrow.data,
              
            };
          };
          const mapDispatchToProps = (dispatch) => {
            return {
              getUserBorrowAction: () => {
                dispatch(getUserBorrowActionCreator());
              },
              getAllBorrowAction: () => {
                dispatch(getAllBorrowActionCreator());
              },

            };
          };
          
          export default connect(mapStateToProps,mapDispatchToProps)(Borrow);
// export default Borrow

// module.exports = App
