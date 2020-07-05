import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import { loginUser, allGenre, registerUser } from '../utils/http'
import '../styles/Home.css'
import { Link } from "react-router-dom";
// import ModalAlert from '../components/ModalAlert'
import {  Modal } from 'react-bootstrap'
// import ModalMessage from '../components/ModalMessage'
import { loginUserActionCreator } from "../redux/actions/UserAction.js";
import { connect } from "react-redux";
class Login extends Component {
	// constructor(){}
	state = {

		email: '',
		password: '',
		token: '',
		isLogin: false,
		validEmail: false,
		validPassword: false,
		isEmptyEmail: true,
		isEmptyPassword: true,
		isMatch: false,
		isShow: false

	}

// componentDidUpdate(prevState){
	

// }
	handleHide = () => {
		this.setState({ isShow: false })
	}
	handleShow = () => {
		this.setState({ isShow: true })
	}
	login = async (e) => {
		// e.preventDefault()
		const { email, password } = this.state
		if (this.state.email === "") {
			// alert("email Cannot Empty")
			this.setState({ isEmptyEmail: true })
			return
		}
		if (this.state.password === "") {
			// alert("password Cannot Empty")
			this.setState({ isEmptyPassword: true })
			return
		}

		else {
		
				if(this.props.error===204){
					this.setState({ isMatch: false })
					// alert('sadasd')
					return false
				}
				else{
					if(this.props.isRejected===false){
						// alert('berhasil')
						this.setState({ isMatch: true })
						// this.props.history.push('/book')
					}

				
				}
			}

			await this.props.loginUserAction({email,password});
			this.setState({ isShow: true })			
		
	}
	async componentDidMount() {

	}
	shouldComponentUpdate() {
		return true
	}
	render() {


		// const { isLogin } = this.state
		let valid = "form-control is-valid"
		let invalid = "form-control is-invalid"

		return (
			<>
				<Navbar />

				<div className="row">
				
						<div className="col-sm" style={{ width: "100%"}}>
							<img src="/astro5.jpg" style={{ width: "100%", height: "130%",position: "static" }} alt="library.jpeg"/>
							<h1 className="top-left" style={{ color: "white" }}>Astro Library<br></br>
					Make Your History From Now</h1>
							<br />
						</div>
		
					<div className="col-sm">
						<div className="">
							<h6 className="text-monospace" >Login</h6>
							<form style={{marginLeft:"20%"}}>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Email address</label>
									<input type="text" required className={this.state.validEmail === true ? valid : invalid} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event) => {
										// eslint-disable-next-line no-useless-escape
										if (event.target.value && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))) {
											this.setState({
												email: event.target.value, validEmail: true, isEmptyEmail: false
											})
										}
										else {
											this.setState({
												email: "",
												validEmail: false
											})
										}
									}} />
									{this.state.validEmail === true ?
										<div className="valid-feedback d-block">Looks Good!</div> :
										<div className="invalid-feedback d-block">Input Email with Correct Format</div>

									}
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Password</label>
									<input type="password" required className={this.state.validPassword === true ? valid : invalid} id="exampleInputPassword1" placeholder="Password" onChange={(event) => {
										if (event.target.value && event.target.value.length > 4) {
											this.setState({
												password: event.target.value, validPassword: true, isEmptyPassword: false
											})
										}
										else {
											this.setState({
												validPassword: false
											})
										}
									}} />
									{this.state.validPassword === true ?
										<div className="valid-feedback d-block">Looks Good!</div> :
										<div className="invalid-feedback d-block">Input Password</div>
									}

								</div>
								{/* <button style={{ marginLeft: "15px" }} type="button" className="btn btn-outline-dark" onClick={(e) => { this.login() }}>Login</button> */}

								<Button type="button" variant="outline-dark" data-toggle="modal" data-target="#myModal" onClick={this.login}>
								  Login
								</Button>

							</form>
						</div>
						<div style={{ margin: "0% 0 10% 40%" }}>
							<span style={{ margin: "0% 0 30% 0%" }}>Don't Have Account ?  </span>
							<Link to="/auth/register">
								<span className="" >Click Here</span>
							</Link>
						</div>
						<Footer />
					</div>
				</div>
				{this.props.isRejected === true ?
					<Modal show={this.state.isShow} onHide={this.handleHide}>
						<Modal.Header closeButton>
							<h4>Incorrect Email or Password</h4>
						</Modal.Header>

					</Modal> : <>
					<Link to={'/book'}>
						<Modal show={this.state.isShow} onHide={this.handleHide}>
							<Modal.Body>
								
								<h2>Login Success</h2>
							</Modal.Body>
							<Modal.Footer >
							<Button variant="dark" onClick={this.handleHide}>
              Okay
            </Button>

							</Modal.Footer>
						</Modal>
						</Link>
					</>
				}

			</>
		)
	}
}
const mapStateToProps = ({

    reducerUser,


}) => {
    return {
        isRejected: reducerUser.isRejected,
		dataLogin:reducerUser.dataLogin,
		error:reducerUser.error

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loginUserAction:async (body) => {
           await dispatch(loginUserActionCreator(body)
	);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// module.exports = App
