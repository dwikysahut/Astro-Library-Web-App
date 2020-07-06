
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import AuthorCard from '../components/AuthorCard'
// import { allAuthor } from '../utils/http'
import TableData from '../components/TableData'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { getAuthorActionCreator } from "../redux/actions/AuthorAction";
import { connect } from "react-redux";
class Author extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {

  //     data: [],
  //     id: '',
  //     name: '',
  //   };
  // }
  getData = async () => {
    await this.props.getGenreAction();
    console.log()
  }
  componentDidMount = () => {
    if(localStorage.getItem('role')==="1"){
      if (this.props.data.length <= 0) {
        this.getData()
      }
  
    }
    else{
      this.props.history.push('/')
    }
  
  }

  // componentDidUpdate(prevProps, prevState) {


  // }

  // shouldComponentUpdate() {
  //   return true
  // }
  // handleChange = (e) => {
  //   this.setState({
  //     search: e.target.value
  //   })
  //   this.props.onChange(e.target.value)
  // }
  componentDidUpdate() {
      
     

  }
  render() {
    console.log(this.props.data, this.props.isFulfilled)
 
    if(this.props.errorToken==="TokenExpiredError"){
    
      alert('Token Expire')
      this.props.history.push('/auth/token')
    
    console.log(this.props.errorToken)
  }
    const renderData = this.props.data.map(data => {
      return (
        <AuthorCard data={data} key={data.id} refresh={this.componentDidMount} props={this.props}/>
      )
    })
    return (
      <>
        <Navbar >
        </Navbar>
      
      
      
          <h2 >Author List</h2>
      
          <Link to={"/data/author/add"}>
            <button type="submit" className="btn btn-secondary" style={{ "float": "right" }}>Add Author</button>
          </Link>
          <div className="App">
          <table className="table " style={{ margin: "5% 0 30% 0" }}>
        
                <thead className="thead-dark">
                  <tr>
                    <TableData />
                  </tr>
                </thead>
                <tbody>
                  {renderData}
                </tbody>
              </table>
              
            </div>  
     
      </>
    )
  }
}

const mapStateToProps = ({
  
  reducerAuthor,

}) => {
  return {
    isRejected:reducerAuthor.isRejected,
    isFulfilled:reducerAuthor.isFulfilled,
    data:reducerAuthor.data,
    errorToken:reducerAuthor.errorToken,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenreAction: () => {
      dispatch(getAuthorActionCreator());
    },
   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Author);
// export default Author

// module.exports = App
