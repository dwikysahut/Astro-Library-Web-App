

import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
// import{Link} from'react-router-dom'
// import { getDetailBook, getAllBooks } from '../utils/http'
import CardDetailBook from '../components/CardDetailBook'
import '../styles/Home.css'
import EditBookModal from '../components/EditBookModal'
import { Link } from 'react-router-dom'
// import { getDetailBookActionCreator } from "../redux/actions/BookAction";
import { connect } from "react-redux";
import { getAuthorActionCreator } from "../redux/actions/AuthorAction";
import { getGenreActionCreator } from "../redux/actions/GenreAction";

// const qs = require('querystring')

class BookDetail extends Component {
    state = {
      data: [],
      id: '',
      title: '',
      description: '',
      image: '',
      genre_id: '',
      author_id: '',
      status: '',
    

    };

  isDone = false;
  // handlerChange = async (e) => {

  //   this.setState({ [e.target.name]: e.target.value },
  //     () => { this.getData() }
  //   )

  // }


  getData = async () => {
    // const { data } = this.state
    const id = this.props.match.params.id
  
    await this.props.getDetailBookAction(id);


    
    console.log(this.props.match.params.id)
    // await getDetailBook(
    //   localStorage.getItem('token'),
    //   id
    // )
    //   .then((response) => {

    //     this.setState({
    //       data: response.data.data,
    //       object : response.data.data[0],
    //       title:response.data.data.title
          
    //     })
    //     console.log(this.state.object)
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       if (error.response.data.data.image === "Undefined") {
    //         console.log('some image not found')
    //       }
    //       if (error.response.data.data.message == "TokenExpiredError") {
    //         this.props.history.push('/auth/token')
    //         alert(error.response.data.data.message)
    //         this.props.history.push('/auth/login')
    //         console.log(error.response.data.data.message)

    //       }
    //       else {
    //         console.log(error.response.data.data.message)
    //         localStorage.removeItem('token')
    //         localStorage.removeItem('refreshToken')
    //         localStorage.removeItem('email')

    //         localStorage.removeItem('id')
    //         localStorage.removeItem('id_user')
    //         localStorage.removeItem('role')
    //       }
    //     }

    //     console.log(error)
    //   })


  }
  componentDidMount =async () => {
      //  this.getData()
      if(localStorage.getItem('role')==="1"){
        if(this.props.dataAuthor.length<=0){
          await this.props.getAuthorAction();
  
        }
        if(this.props.dataGenre.length<=0){
          await this.props.getGenreAction();
  
        }
   
      }
     
      if(this.props.dataBook.length<=0){
        
     this.props.history.push('/')

      }
   
 
    

  }
  componentDidUpdate(prevProps) {
    console.log(this.props.data)
  }
  shouldComponentUpdate() {
    return true
  }

  // render() { 
  //   if (this.props.errorToken === "TokenExpiredError") {

  //     // alert('Token Expire')
  //     this.props.history.push('/auth/token')

  //     console.log(this.props.errorToken)
  //   }
  // //   if(this.props.isRejected===true){
    
  // //     alert('Token Expire')
  // //     this.props.history.push('/auth/token')
    
  // //   console.log(this.props.errorToken)
  // // }
  //   // const { object } = this.state
  //   // console.log(this.props.title)

  //   const renderData = this.props.dataDetail.map(data => {
  //     return (
  //       // <li key={data.id}>{data}</li>,
  //       <CardDetailBook data={data} key={data.id} refresh={this.componentDidMount} props={this.props} />
  //     )
  //   })


  //   return (
  //     <>
  //       <Navbar >
  //       </Navbar>
   
  //       <ul id="page-numbers">
  //         {/* {renderPageNumbers} */}
  //         {/* onClick{} */}
  //       </ul>
  //       <div >
   
  //         <h2>Book Detail</h2>
  //         {this.props.isFulfilled===true?

//after redux
  render() { 
    let id=parseInt(this.props.match.params.id)
    const dataById=this.props.dataBook.filter(dataBook=>dataBook.id===id)

    const data=dataById[0]
    console.log(dataById)
    console.log(this.props.dataDetail)
    if (this.props.errorToken === "TokenExpiredError") {

      // alert('Token Expire')
      this.props.history.push('/auth/token')

      console.log(this.props.errorToken)
    }
  //   if(this.props.isRejected===true){
    
  //     alert('Token Expire')
  //     this.props.history.push('/auth/token')
    
  //   console.log(this.props.errorToken)
  // }
    // const { object } = this.state
    // console.log(this.props.title)

    const renderDataDetail = dataById.map(data => {
      return (
     
        <CardDetailBook data={data} key={data.id}  props={this.props}  id={this.props.match.params.id} refresh={this.componentDidMount}  />
       
     
      )
    })


    return (
      <>
        <Navbar />
      
  
          <h2>Book Detail</h2>
       
          {this.props.isFulfilled===true&&data?
             <div className="container" style={{  backgroundImage:`url('http://localhost:8080/public/image/${data.image}')`,backgroundSize: "100% 40%",borderStyle:"ridge", borderRadius: "25px",maxWidth: "600px",minWidth: "475px" , backgroundRepeat: "no-repeat" }}>
                  <EditBookModal id={this.props.match.params.id} refresh={this.componentDidMount} data={data}/>
         
    <div className="row">
               {renderDataDetail}
 
             </div>      
           </div>
      
          :
          <Link to={`/book`}>
          <><div style={{ margin: "10% 30% 30% 50%" }} className="spinner-border" role="status"><span className="sr-only">Loading...</span>
              </div> </>
              </Link>
        }
 
      </>
    )
  }
}
const mapStateToProps = ({
 
  reducerBook,reducerGenre,reducerAuthor

}) => {
 
  return {
    isFulfilled:reducerBook.isFulfilled,
    title:reducerBook.title,
    dataDetail:reducerBook.dataDetail,
    dataBook:reducerBook.data,
    dataGenre:reducerGenre.data,
    dataAuthor:reducerAuthor.data,
    
    dataObj:reducerBook.dataObj,
    success:reducerBook.isFulfilled,
    errorToken: reducerBook.errorToken
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   
    getGenreAction: () => {
      dispatch(getGenreActionCreator());
    },
    getAuthorAction: () => {
      dispatch(getAuthorActionCreator());
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(BookDetail);











//TANPA REDUX DAN FETCHING DETAIL BOOK



// import React, { Component } from 'react'
// // import Button from '@material-ui/core/Button'
// import Navbar from '../components/Navbar'
// // import{Link} from'react-router-dom'
// // import { getDetailBook, getAllBooks } from '../utils/http'
// import CardDetailBook from '../components/CardDetailBook'
// import '../styles/Home.css'
// import EditBookModal from '../components/EditBookModal'
// import { getDetailBookActionCreator } from "../redux/actions/BookAction";
// import { connect } from "react-redux";
// // const qs = require('querystring')

//   const URL_BASE = process.env.REACT_APP_API
// class BookDetail extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       id: '',
//       title: '',
//       description: '',
//       image: '',
//       genre_id: '',
//       author_id: '',
//       status: '',
    

//     };
//   }
//   isDone = false;
//   // handlerChange = async (e) => {

//   //   this.setState({ [e.target.name]: e.target.value },
//   //     () => { this.getData() }
//   //   )

//   // }


//   getData = async () => {
//     // const { data } = this.state
//     const id = this.props.match.params.id
  
//     await this.props.getDetailBookAction(id);


    
//     console.log(this.props.match.params.id)
//     // await getDetailBook(
//     //   localStorage.getItem('token'),
//     //   id
//     // )
//     //   .then((response) => {

//     //     this.setState({
//     //       data: response.data.data,
//     //       object : response.data.data[0],
//     //       title:response.data.data.title
          
//     //     })
//     //     console.log(this.state.object)
//     //   })
//     //   .catch((error) => {
//     //     if (error.response) {
//     //       if (error.response.data.data.image === "Undefined") {
//     //         console.log('some image not found')
//     //       }
//     //       if (error.response.data.data.message == "TokenExpiredError") {
//     //         this.props.history.push('/auth/token')
//     //         alert(error.response.data.data.message)
//     //         this.props.history.push('/auth/login')
//     //         console.log(error.response.data.data.message)

//     //       }
//     //       else {
//     //         console.log(error.response.data.data.message)
//     //         localStorage.removeItem('token')
//     //         localStorage.removeItem('refreshToken')
//     //         localStorage.removeItem('email')

//     //         localStorage.removeItem('id')
//     //         localStorage.removeItem('id_user')
//     //         localStorage.removeItem('role')
//     //       }
//     //     }

//     //     console.log(error)
//     //   })


//   }
//   componentDidMount = () => {
//        this.getData()
 
   

//   }
//   componentDidUpdate(prevProps) {
//     console.log(this.props.data)
//   }
//   // shouldComponentUpdate() {
//   //   return true
//   // }

//   render() { 
//     if (this.props.errorToken === "TokenExpiredError") {

//       // alert('Token Expire')
//       this.props.history.push('/auth/token')

//       console.log(this.props.errorToken)
//     }
//   //   if(this.props.isRejected===true){
    
//   //     alert('Token Expire')
//   //     this.props.history.push('/auth/token')
    
//   //   console.log(this.props.errorToken)
//   // }
//     // const { object } = this.state
//     // console.log(this.props.title)

//     const renderData = this.props.dataDetail.map(data => {
//       return (
//         // <li key={data.id}>{data}</li>,
//         <CardDetailBook data={data} key={data.id} refresh={this.componentDidMount} props={this.props} />
//       )
//     })


//     return (
//       <>
//         <Navbar />
       
   
//         <ul id="page-numbers">
//           {/* {renderPageNumbers} */}
//           {/* onClick{} */}
//         </ul>
//         <div >
   
//           <h2>Book Detail</h2>
//           {renderData}
//           {this.props.isFulfilled===true?
//              <div className="container" style={{  backgroundImage:`url('${URL_BASE}/public/image/${this.props.dataObj.image}')`,backgroundSize: "100% 40%", borderRadius: "25px",borderStyle:"ridge",  backgroundRepeat: "no-repeat" }}>
       
//              <EditBookModal id={this.props.match.params.id} refresh={this.componentDidMount} data={this.props.dataObj}/>
//              <div className="row">
//                {renderData}
 
//              </div>
 
//            </div>
      
//           :
//           <><div style={{ margin: "10% 30% 30% 50%" }} class="spinner-border" role="status"><span class="sr-only">Loading...</span>
//               </div> </>
//         }
//           </div>
//       </>
//     )
//   }
// }
// const mapStateToProps = ({
 
//   reducerBook,

// }) => {
 
//   return {
//     isFulfilled:reducerBook.isFulfilled,
//     title:reducerBook.title,
//     dataDetail:reducerBook.dataDetail,
//     dataId:reducerBook.data,
    
//     dataObj:reducerBook.dataObj,
//     success:reducerBook.isFulfilled,
//     errorToken: reducerBook.errorToken
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getDetailBookAction: (id) => {
//       dispatch(getDetailBookActionCreator(id));
//     },
//   };
// };

// export default connect(mapStateToProps,mapDispatchToProps)(BookDetail);


// export default BookDetail
// module.exports = App















// // export default BookDetail
// // module.exports = App

