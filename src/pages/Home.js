import React from "react";
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";

class Home extends React.Component {
    state = {
        show: true
    }
    changeModal() {
        this.setState({ show: !this.state.show })
        this.props.history.push('/auth/login')
    }

    componentDidMount() {
        console.log(this.props)
        if (localStorage.getItem('token')) {

            this.props.history.push('/book')





            this.setState({ show: false })
        }
        else {
            // this.state.show = true

            // alert('please login first')
            // this.props.history.push('/auth/login')
        }
    }

    render() {
        return (
            <>
                {localStorage.getItem('token') ?

                    <Link to="/book" >
                    </Link>

                    :
                    <Modal show={true} onHide={() => this.changeModal()}>
                        <Modal.Header closeButton> Please Login First</Modal.Header>

                   

                    </Modal>

                }
            </>
        )
    }
}
export default Home