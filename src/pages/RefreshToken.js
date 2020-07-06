import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
// import { refreshToken } from '../utils/http'
import '../styles/Home.css'
import { refreshTokenActionCreator } from "../redux/actions/UserAction.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import ModalAlert from '../components/ModalAlert'
import { Modal ,Button} from 'react-bootstrap'
class RefreshToken extends Component {

    constructor (props){
      super(props)
      this.state = {
       
       token:localStorage.getItem('refreshToken'),
        isShow:false
      };
    }
    handleHide = () => {
      this.setState({ isShow: false })
    }
    handlerSubmit = () => {
      this.props.history.push('/')
    }
    async componentDidMount() {   
      const{token}=this.state

      await this.props.refreshTokenAction({token})
      // alert('Token Has Been Renew')
      this.props.history.push('/')
      
      }
    render() {
  
      return (
          <>
              <Navbar/>

          <h2>Renew Token </h2>
          {this.props.isRejected===false?
             <Link to={'/book'}>
             <Modal show={true} onHide={this.handleHide}>
               <Modal.Body>
                 
                 <h2>Token Renewed Success</h2>
               </Modal.Body>
               <Modal.Footer >
             
 
               </Modal.Footer>
             </Modal>
             </Link>:
                <Link to={'/auth/login'}>
                <Modal show={true} onHide={this.handleHide}>
                  <Modal.Body>
                    
                    <h2>Token Renewed Failed, Please Login</h2>
                  </Modal.Body>
                  <Modal.Footer >
                  <Button variant="warning" >
              Okay
            </Button>
    
                  </Modal.Footer>
                </Modal>
                </Link>
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
        isFulfilled: reducerUser.isFulfilled,
        isLoading: reducerUser.isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        refreshTokenAction:async (body) => {
           await dispatch(refreshTokenActionCreator(body));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshToken);

  // export default RefreshToken
  