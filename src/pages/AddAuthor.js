
// import React, { Component } from 'react'
// // import Button from '@material-ui/core/Button'
// import Navbar from '../components/Navbar'
// import { postAuthor } from '../utils/http'
// import ModalMessage from '../components/ModalMessage'
// import ManageData from '../components/ManageData'
// import {Alert} from 'react-bootstrap'
// import '../styles/Home.css'
// import { postAuthorActionCreator } from "../redux/actions/AuthorAction";
// import { connect } from "react-redux";

// class AddAuthor extends Component {
// 	state = {

// 		name: '',
// 		isSuccess: true,
//         isShow: false
// 	}
// 	handlerChange = (e) => {
// 		e.preventDefault()
// 		this.setState({ [e.target.name]: e.target.value })

// 	}
// 	handleHide = () => {
//         this.setState({ isShow: false })
//     }
//     handleShow = () => {
//         this.setState({ isShow: true })
// 	}
	
// 	handlerSubmit = async (e) => {
// 		const {name}=this.state
// 		e.preventDefault()

// 		if(!this.state.name){
//             this.setState({isSuccess:false})
//             this.setState({ isShow: false })
//          //  alert('Data cant empty')
//              return false
// 		 }
		 
// 		 await this.props.postAuthorAction({name})
     
// 		 this.setState({ isShow: false })
// 		 this.props.history.push('/data/author')
	  



// 		// console.log(this.state)

// 		// await postAuthor(
// 		// 	localStorage.getItem('token'),
// 		// 	{name:
// 		// 		this.state.name}
// 		// )
// 		// 	.then((response) => {
// 		// 		console.log(this.state)
// 		// 		// alert('add succesfull')
// 		// 		this.setState({ isShow: false })
// 		// 		this.props.history.push('/data/author')

// 		// 	}
// 		// 	)
// 		// 	.catch((error) => {
// 		// 		if (error.response.data.data.message == "TokenExpiredError") {
// 		// 			this.props.history.push('/auth/token')
// 		// 		}
// 		// 		alert(error.response.data.data.message)
// 		// 		this.props.history.push('/auth/login')
// 		// 		console.log(error.response.data.data.message)
// 		// 	})
// 	}
// 	componentDidMount = () => {
		
// 	}

// 	render() {
// 		if(this.props.errorToken==="TokenExpiredError"){
    
// 			alert('Token Expire')
// 			this.props.history.push('/auth/token')
		  
// 		  console.log(this.props.errorToken)
// 		}

// 		return (

// 			<>
// 				<Navbar />

// 				<div className="container">
// 			<ManageData text={"Add Author"} handlerChange={this.handlerChange} handleShow={this.handleShow} handleHide={this.handleHide} handlerSubmit={this.handlerSubmit} isShow={this.state.isShow} isSuccess={this.state.isSuccess}/>
// 				</div>
// 			</>
// 		)
// 	}
// }

// const mapStateToProps = ({
 
// 	reducerAuthor,
  
  
//   }) => {
// 	return {
// 	  isLoading:reducerAuthor.isLoading,
// 	  isRejected:reducerAuthor.isRejected,
// 	  isFulfilled:reducerAuthor.isFulfilled,
// 	  errorToken:reducerAuthor.errorToken
	  
// 	};
//   };
// 	const mapDispatchToProps = (dispatch) => {
// 	  return {
// 		postAuthorAction: body => {
// 		  dispatch(postAuthorActionCreator(body));
// 		},
// 	  };
// 	};
	
// 	export default connect(mapStateToProps,mapDispatchToProps)(AddAuthor);
  

// // export default AddAuthor
// // module.exports = App
