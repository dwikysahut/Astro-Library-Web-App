
// import React, { Component } from 'react'
// // import Button from '@material-ui/core/Button'
// import Navbar from '../components/Navbar'
// // import {postGenre} from '../utils/http'
// import ManageData from '../components/ManageData'
// import { postGenreActionCreator } from "../redux/actions/GenreAction";
// import { connect } from "react-redux";

// import '../styles/Home.css'

   
// class AddGenre extends Component {
//     state={
       
// 	   name:'',
// 	   isSuccess: true,
// 	   isShow: false
//     }
//     handlerChange=(e)=>{
	
// 		e.preventDefault()
//         this.setState({[e.target.name]:e.target.value})
	
//     }
// 	handleHide = () => {
//         this.setState({ isShow: false })
//     }
//     handleShow = () => {
//         this.setState({ isShow: true })
//   }
  
//     handlerSubmit=async (e)=>{
//       const {name}=this.state
// 		e.preventDefault()
// 		if(!this.state.name){
//             this.setState({isSuccess:false})
//             this.setState({ isShow: false })
//          //  alert('Data cant empty')
//              return false
//          }
//        console.log(this.state)
  
//        await this.props.postGenreAction({name})
//         //  console.log(this.props.isFulfilled,this.props.isRejected,this.props.isLoading)
//        this.setState({ isShow: false })
     
//        this.props.history.push('/data/genre')
     




//       //   await postGenre(
// 			// localStorage.getItem('token'),
// 			// {name:
//       //        this.state.name}
//       //          )
//       //           .then((response) => {

//       //               console.log(response.data.data.name)
//       //               //  this.props.postGenreAction(this.state.name)
// 			// 		// alert('add succesfull')
// 			// 		this.setState({ isShow: false })
//       //               this.props.history.push('/data/genre')

//       //                  }
                     
//       //                 )
       
                   
                
//       //           .catch((error) => {
//       //               console.log(error)
//       //           })        
        
//       }
//      componentDidMount(){
  
       
//     }
// 	render() {
//     if(this.props.errorToken==="TokenExpiredError"){
    
//       alert('Token Expire')
//       this.props.history.push('/auth/token')
    
//     console.log(this.props.errorToken)
//   }
//        	// const { name, date, isLogin } = this.state
      
// 		return (
		
// 			<>
// 				<Navbar />
// 				<div className="container">
// 			<ManageData text={"Add Genre"} handlerChange={this.handlerChange} handleShow={this.handleShow} handleHide={this.handleHide} handlerSubmit={this.handlerSubmit} isShow={this.state.isShow} isSuccess={this.state.isSuccess}/>
// 				</div>
// 			</>
// 		)
// 	}
// } 
// const mapStateToProps = ({
 
//   reducerGenre,


// }) => {
//   return {
//     isLoading:reducerGenre.isLoading,
//     isRejected:reducerGenre.isRejected,
//     isFulfilled:reducerGenre.isFulfilled,
//     errorToken:reducerGenre.errorToken
    
//   };
// };
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       postGenreAction: body => {
//         dispatch(postGenreActionCreator(body));
//       },
//     };
//   };
  
//   export default connect(mapStateToProps,mapDispatchToProps)(AddGenre);

// // export default AddGenre
// // module.exports = App
