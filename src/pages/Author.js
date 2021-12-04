
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
  getData = async () => {
    await this.props.getAuthorAction();
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
        <AuthorCard data={data} key={data.id} props={this.props}/>
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
    getAuthorAction: () => {
      dispatch(getAuthorActionCreator());
    },
   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Author);
// export default Author

// module.exports = App
