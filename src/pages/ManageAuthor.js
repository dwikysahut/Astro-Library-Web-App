
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
// import { editAuthor, getAuthorById } from '../utils/http'
// import { Alert } from 'react-bootstrap'
import '../styles/Home.css'
// import { Modal, Button } from 'react-bootstrap'
// import ModalMessage from '../components/ModalMessage'
import ManageData from '../components/ManageData'
import { connect } from "react-redux";
import { putAuthorActionCreator,getAuthorActionByIdCreator,postAuthorActionCreator} from "../redux/actions/AuthorAction";

class ManageAuthor extends Component {
    state = {
        id: '',
        name: '',
        isSuccess: true,
        isShow: false
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    handleHide = () => {
        this.setState({ isShow: false })
    }
    handleShow = () => {
        this.setState({ isShow: true })
    }

    handlerSubmitAdd = async(e) => {
        const {name}=this.state
		e.preventDefault()

		if(!this.state.name){
            this.setState({isSuccess:false})
            this.setState({ isShow: false })
         //  alert('Data cant empty')
             return false
		 }
		 
		 await this.props.postAuthorAction({name})
     
		 this.setState({ isShow: false })
		 this.props.history.push('/data/author')
	  




    }
    handlerSubmitEdit = async(e) => {
        const {name}=this.state
        e.preventDefault()

        if(!this.state.name){
            this.setState({isSuccess:false})
            this.setState({ isShow: false })
         //  alert('Data cant empty')
             return false
         }
         const id=this.props.match.params.id



     await this.props.putAuthorAction(id,{name})
     this.setState({ isShow: false })
                   this.props.history.push('/data/author')


    }
    componentDidUpdate=(prevProps)=> {
        // if(prevProps.selectedData!==this.props.selectedData){
        //     this.setState({
        //        name:this.props.selectedData.name
        //         // data: response.data.data
        //     }
        //     )
        // }
       
      
    }
    async componentDidMount() {
      
        // eslint-disable-next-line eqeqeq
        const dataById=this.props.dataAuthor.filter(dataAuthor=>dataAuthor.id==this.props.match.params.id)
        const data=dataById[0]
        if(this.props.match.params.id){

       await this.setState({
          name:data.name
          
       })
    }
        // const id = this.props.match.params.id
        // await this.props.getAuthorByIdAction(id);


        // await getAuthorById(
        //     localStorage.getItem('token'),
        //     id
        // )
        //     .then((response) => {
        //         this.setState({
        //             id: response.data.data.id,
        //             name: response.data.data.name,
        //         }
        //         )

        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        console.log(this.state)


    }


    next = () => {
        alert('edit succesfull')


        this.props.history.push('/data/author')
    }
    render() {
        if(this.props.errorToken==="TokenExpiredError"){
    
			alert('Token Expire')
			this.props.history.push('/auth/token')
		  
		  console.log(this.props.errorToken)
		}

        const { name } = this.state
        return (
            <>
                <Navbar />
            	

				<div className="container">
                    {this.props.match.params.id?
                 	<ManageData text={"Edit Author"} handlerChange={this.handlerChange} handleShow={this.handleShow} handleHide={this.handleHide} handlerSubmit={this.handlerSubmitEdit} isShow={this.state.isShow} isSuccess={this.state.isSuccess} name={name}/>
                     :	<ManageData text={"Add Author"} handlerChange={this.handlerChange} handleShow={this.handleShow} handleHide={this.handleHide} handlerSubmit={this.handlerSubmitAdd} isShow={this.state.isShow} isSuccess={this.state.isSuccess}/>
                }
				</div>
            </>
        )
    }
}
const mapStateToProps = ({
 
   reducerAuthor,
  
  
  }) => {
    return {
      isLoading:reducerAuthor.isLoading,
      isRejected:reducerAuthor.isRejected,
      isFulfilled:reducerAuthor.isFulfilled,
      errorToken:reducerAuthor.errorToken,
      dataAuthor:reducerAuthor.data,
      selectedData:reducerAuthor.selectedData
    };
  };
    const mapDispatchToProps = (dispatch) => {
      return {
        putAuthorAction: (id,body)=> {
          dispatch(putAuthorActionCreator(id,body));
        },
        getAuthorByIdAction: (id) => {
            dispatch(getAuthorActionByIdCreator(id));
          },
          postAuthorAction: body => {
            dispatch(postAuthorActionCreator(body));
          },
      };
    };
    
    export default connect(mapStateToProps,mapDispatchToProps)(ManageAuthor);
// export default EditAuthor
// module.exports = App
