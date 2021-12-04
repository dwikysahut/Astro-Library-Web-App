
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
// import { editGenre ,getGenreById} from '../utils/http'
import '../styles/Home.css'
import ManageData from '../components/ManageData'
import { putGenreActionCreator ,getGenreByIdActionCreator,postGenreActionCreator} from "../redux/actions/GenreAction";
import { connect } from "react-redux";


class ManageGenre extends Component {
  
    state={
    id:'',
    name:'',
    isSuccess:true,
    isShow: false,
     }
    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    handleHide = () => {
        this.setState({ isShow: false })
     this.props.history.push('/data/genre')
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
   
   await this.props.postGenreAction({name})
   
   this.setState({ isShow: false })
   this.props.history.push('/data/genre')
  




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



   await this.props.putGenreAction(id,{name})
   this.setState({ isShow: false })
                 this.props.history.push('/data/genre')


  }
   componentDidUpdate=(prevState)=> {  

}
 async componentDidMount(){
  // eslint-disable-next-line eqeqeq
  const dataById=this.props.dataGenre.filter(dataGenre=>dataGenre.id==this.props.match.params.id)
  const data=dataById[0]
  if(this.props.match.params.id){

   await this.setState({
      name:data.name
      
   })
}
      // const id=this.props.match.params.id
      // await this.props.getGenreByIdAction(id)

      // const usersOnline = this.state.users.filter(user => user.online == true);
    
      //  console.log(dataById)
      // if(this.props.isFulfilled===true){
      //   this.setState({name:this.props.name})
      
      // }
      // await getGenreById(
      //    localStorage.getItem('token'),
      //        id
      //       )
      //        .then((response) => {
      //             this.setState({ id:response.data.data.id,
      //            name:response.data.data.name,
                
      //            }
                  
      //              )
                
      //        })
      //        .catch((error) => {
      //           if(error.response.data.data.message=="TokenExpiredError"){
      //               this.props.history.push('/auth/token')
      //             }
      //             alert(error.response.data.data.message)
      //             this.props.history.push('/auth/login')
      //             console.log(error.response.data.data.message)
      //        })
         console.log(this.state)
   }
 render() {
   console.log(this.props.dataById)
      const{name}=this.state
 
     return (
         <>
             <Navbar />         
             <div className="container">
             {this.props.match.params.id?
                 	<ManageData text={"Edit Genre"} handlerChange={this.handlerChange} handleShow={this.handleShow} handleHide={this.handleHide} handlerSubmit={this.handlerSubmitEdit} isShow={this.state.isShow} isSuccess={this.state.isSuccess} name={name}/>
                     :	<ManageData text={"Add Genre"} handlerChange={this.handlerChange} handleShow={this.handleShow} handleHide={this.handleHide} handlerSubmit={this.handlerSubmitAdd} isShow={this.state.isShow} isSuccess={this.state.isSuccess}/>
                }			</div>

         </>
     )
 }
}
const mapStateToProps = ({
 
  reducerGenre,ownProps

}) => {
  return {
    isLoading:reducerGenre.isLoading,
    isRejected:reducerGenre.isRejected,
    isFulfilled:reducerGenre.isFulfilled,
    dataGenre:reducerGenre.data,
    errorToken:reducerGenre.errorToken,
    selectedData:reducerGenre.selectedData
  };
};
  const mapDispatchToProps = (dispatch) => {
    return {
      putGenreAction: (id,body)=> {
        dispatch(putGenreActionCreator(id,body));
      },
      getGenreByIdAction: (id)=> {
        dispatch(getGenreByIdActionCreator(id));
      },
      postGenreAction: body => {
        dispatch(postGenreActionCreator(body));
      },
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(ManageGenre);

// export default EditGenre
// module.exports = App
