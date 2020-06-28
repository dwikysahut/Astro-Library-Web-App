
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import { registerUser } from '../utils/http'
import ModalAlert from '../components/ModalAlert'
import '../styles/Home.css'
import {  Modal } from 'react-bootstrap'
// import ModalMessage from '../components/ModalMessage'
import { registerUserActionCreator } from "../redux/actions/UserAction.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Register extends Component {
	async componentDidMount() {
		console.log(this.props)

		console.log('didmount')
	}
	// constructor(){}
	state = {

		email: '',
		password: '',
		password2: '',
		role: "2",
		isEmpty: true,
		isEmptyEmail: true,
		isEmptyPassword: true,
		isSuccess: false,
		isEmailValid:true,
		isMatch:true,
		isShow: false,
		emailExist:'',
	}
	handleHide = () => {
		this.setState({ isShow: false })
	}
	handleShow = () => {
		this.setState({ isShow: true })
	}
	handlerChange = (e) => {
		e.preventDefault()
		if (e.target.value) {
			// if(e.target.name==="email"){
			// 	if(e.target.value.length>20){
			// 		alert("email too long")
			// 		return false
			// 	}
			// }


			this.setState({ [e.target.name]: e.target.value, isEmpty: false,isEmptyEmail:false ,isEmptyPassword:false}, () => { })
			console.log(this.state.email)
			console.log(this.state.password)
		}
		else {
			this.setState({
				isEmpty: true, [e.target.name]: ""
			})
		}

	}
	register = async (e) => {
		console.log(this.state)
		if (this.state.email) {
				
			// eslint-disable-next-line no-useless-escape
			if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
				// this.setState({ isEmailValid: false })
	
				//  alert("You have entered an invalid email address!")
				return (false)
			}
		}
		if (!this.state.email || this.state.email === "") {
			// alert("email Cannot Empty")
			this.setState({ isEmptyEmail: true })
			return
		}
		if (this.state.password.length < 4 || this.state.password.length > 16) {
			return false
			// alert("The password must be 5-16 characters")
		}
		if (!this.state.password || this.state.password === "") {
			// alert("password Cannot Empty")
			this.setState({ isEmptyPassword: true })
			return
		}
		
		if (this.state.password2 !== this.state.password ) {
			// alert("password and Re-Enter Password Doesn't Match")
			this.setState({ isMatch: false })
			return false
		}
		else{
			this.setState({ isMatch: true })
		
		}

		if (this.state.isEmpty === false && this.state.password.length > 4) {
			this.state.isSuccess = true
			this.setState({ isSuccess: true })

			console.log(this.state)
			// e.preventDefault()
			const { email, password, role } = this.state
			await this.props.registerUserAction({email,password,role});
			this.state.isSuccess = true
			this.setState({ isShow: true })
			// await registerUser({
			// 	email,
			// 	password,
			// 	role

			// })
				// .then((response) => {

				// 	console.log(this.state)
				// 	console.log(response)
				// 	if (response.data.status === 200) {
				// 		this.state.isSuccess = true
				// 		this.setState({ isSuccess: true })
				// 		console.log(this.state.isSuccess)
				// 		alert("Register success")

				// 		// console.log(response)
				// 		this.setState({ email: email })
				// 		this.setState({ password: password })
				// 		this.setState({ role: role })
				// 		this.props.history.push('/auth/login')
				// 	}
				// 	else if (response.data.status === 400) {
				// 		alert("Email has taken")
				// 	}
				// 	else if (response.data.status === 500) {
				// 		alert("error")
				// 	}
				// 	else if (response.status === 204) {
				// 		console.log('cant null')
				// 		alert("email and password must have Value");
				// 	}
				// 	else {
				// 		alert("Register Failed");
				// 	}
				// })
				// .catch((error) => {
				// 	alert("Email has taken")
				// 	console.log(error)
				// })
		}
	}
	shouldComponentUpdate() {

		return true
	}
	// componentWillUnmount(){}

	render() {

		// const { name, date, isLogin } = this.state
		let valid = "form-control is-valid"
		let invalid = "form-control is-invalid"

		return (

			<>
			{this.state.isSuccess===true?	
		<Link to="/auth/login">
			<Modal show={this.state.isShow} onHide={this.handleHide}>
							<Modal.Body>
								<h2>Register Success</h2>
							</Modal.Body>
							<Modal.Footer>


							</Modal.Footer>
						</Modal>
						</Link>:<></>}
			{this.props.isRejected===true?
			<Modal show={this.state.isShow} onHide={this.handleHide}>
			<Modal.Body>
				<h2>Email  Has Taken</h2>
			</Modal.Body>
			<Modal.Footer>


			</Modal.Footer>
		</Modal>:<></>
			}
				<Navbar />

				<div className="row">
				<div className="col-sm" style={{ width: "100%" }}>
							<img src="/library.jpeg" style={{ width: "100%", height: "100%" }} alt="library.jpeg"/>
							<h1 className="top-left" style={{ color: "white" }}>Library App<br></br>
					Make Your History From Now</h1>
							<br />
						</div>
					<div className="col-sm">
						<div className="">
						<h6 className="text-monospace" >Register</h6>
							<form style={{marginLeft:"20%"}}>
						
								<div className="form-group ">
									<label >Email Address </label>
									{/*eslint-disable-next-line no-useless-escape*/}
									<input type="text" required className={this.state.email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) ? valid : invalid} name="email" aria-describedby="emailHelp" placeholder="Email Address" onChange={
										this.handlerChange} />
										{/*eslint-disable-next-line no-useless-escape*/}
									{(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) ?
									
										<small>Email Format Valid</small>
								:
								<>	<small>input Email with Valid Format</small>
									 </> 
									}
								</div>
								<div className="form-group">
									<label >Password</label>
									<input type="password" required className={this.state.password ? "form-control" : invalid} name="password" aria-describedby="emailHelp" placeholder="Enter Password" onChange={this.handlerChange} />
									{this.state.password.length <= 4 || this.state.password.length > 16 ?
										<small style={{color:"red"}}>Password must More than 4 character and Max 16 Character</small> :
										<small>nice</small>
									}
								</div>
								<div className="form-group ">
									<label >Re-Enter Password</label>
									<input type="password" required className={this.state.password && this.state.password2 && this.state.password === this.state.password2 ? valid : invalid} name="password2" aria-describedby="emailHelp" placeholder="Repeat Password" onChange={(event) => {
										if (event.target.value) {
											if (event.target.value !== this.state.password) {
												// <small style={{color:"red"}}>Doesn't match</small> 
											}
											this.setState({
												password2: event.target.value, isSame: false, isEmpty: false
											})
										}
										else {
											this.setState({
												password2: "",
												isSame: false, isEmpty: true
											})
										}
									}} />

								</div>
								<div className="form-group ">
									<label>Role</label>
									<select className="form-control" name="role" required onChange={this.handlerChange}>
										<option value="2" >User</option>


										{/* <option value="2">user</option> */}

									</select>

								</div>
								<div className="form-group col-md-8">
								<button type="button"  data-toggle="modal" data-target="#myModal" className="btn btn-outline-success" onClick={this.register}>
									Sign Up
				</button>
				</div>

							</form>
							{this.state.isEmptyEmail===true?
		<ModalAlert text="Email Empty"/>:<></>
		}			

					</div>
						<Footer />
					</div>


				</div>

		


			</>
		)
	}
}
const mapStateToProps = ({

    reducerUser,


}) => {
    return {
        isRejected: reducerUser.isRejected,
      
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        registerUserAction: (body) => {
            dispatch(registerUserActionCreator(body));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

// export default Register
// module.exports = App
