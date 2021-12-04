import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Home = ({ history }) => {
    const [show, setShow] = useState(true);

    const changeModal = () => {
        setShow(false)
        history.push('/auth/login')
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/book')
            setShow(false)
        }

    }, [history])



    return (
        <>
            {localStorage.getItem('token') ?
                <Link to="/book" >
                </Link>
                :
                <Modal show={show} onHide={() => changeModal()}>
                    <Modal.Header closeButton> Please Login First</Modal.Header>
                </Modal>

            }
        </>
    )
}

export default Home