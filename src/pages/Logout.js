// import { deleteToken } from '../utils/http'
import React from 'react'
import Navbar from '../components/Navbar'
import { Modal} from 'react-bootstrap'
// import { Modal, ModalBody, Button } from 'react-bootstrap'

import { logoutUserActionCreator } from "../redux/actions/UserAction.js";
import { connect } from "react-redux";

class Logout extends React.Component {
    state = {
        show: true
    }
    changeModal() {
        this.setState({ show: !this.state.show })
        this.props.history.push('/auth/login')
    }
    componentDidMount = async () => {
        await this.props.logoutUserAction()
        this.setState({ show:true })
        // await deleteToken(
        //     localStorage.getItem('token'),
        // )
        //     .then((response) => {
        //         this.state.show = true
        //         console.log(response)
        //         //  alert("Logout successfully ")
        //         localStorage.removeItem('token')
        //         localStorage.removeItem('refreshToken')
        //         localStorage.removeItem('email')
        //         localStorage.removeItem('id')
        //         localStorage.removeItem('id_user')
        //         localStorage.removeItem('role')

        //         //  this.props.history.push('/auth/login')

        //     })
        //     .catch((error) => {
        //         this.setState({ show: false })
        //         console.log(error)
        //     })
    }

    render() {
        return (
            <>
                {this.state.show === true ?
                    <Modal show={this.state.show} onHide={() => this.changeModal()}>
                        <Modal.Header closeButton> Logout Success</Modal.Header>
                    </Modal>
                    :

                    <Modal show={this.state.show} onHide={() => this.changeModal()}>
                        <Modal.Header closeButton> Logout Failed</Modal.Header>
                    </Modal>
                }
                <Navbar />
                <div className="container">
                    <h1 style={{margin:"20% 20% 20% 40%"}}>THANK YOU</h1>


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
        logoutUserAction:async () => {
           await dispatch(logoutUserActionCreator()
	);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
// export default Logout