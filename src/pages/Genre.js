
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import GenreCard from '../components/GenreCard'
// import { allGenre } from '../utils/http'
import TableData from '../components/TableData'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { getGenreActionCreator } from "../redux/actions/GenreAction";
import { connect } from "react-redux";
class Genre extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {

  //     data: [],
  //     id: '',
  //     name: '',
  //     isSuccess:false

  //   };
  // }

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

  getData = async () => {

    await this.props.getGenreAction();



    // this.props.history.push('/auth/login')

    // console.log(this.props.data.data)
    //   await allGenre(
    //     localStorage.getItem('token'),
    //   )
    //     .then((response) => {

    //       this.setState({ data: response.data.data }

    //       )


    //       console.log(this.state.data)

    //     })
    //     .catch((error) => {
    //       if (error.response.data.data.message == "TokenExpiredError") {
    //         this.props.history.push('/auth/token')
    //       }
    //       alert(error.response.data.data.message)
    //       this.props.history.push('/auth/login')
    //       console.log(error.response.data.data.message)
    //     })



  }

  componentDidUpdate() {



  }


  // handleChange = (e) => {
  //   e.preventDefault()
  //   this.setState({
  //     search: e.target.value
  //   })
  //   this.props.onChange(e.target.value)
  // }
  render() {
    console.log(this.props.data, this.props.isFulfilled)
    if (this.props.errorToken === "TokenExpiredError") {

      // alert('Token Expire')
      this.props.history.push('/auth/token')

      console.log(this.props.errorToken)
    }
    const renderData = this.props.data.map(data => {
      return (
        <GenreCard data={data} key={data.id} refresh={this.componentDidMount} props={this.props} />
      )
    })
    return (
      <>
        <Navbar />

        <h2>Genre List</h2>
        <Link to={"/data/genre/add"}>
          <button type="submit" className="btn btn-secondary" style={{ "float": "right" }}>Add genre</button>
        </Link>
        <div className="App">
          <div className="left">
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
        </div>


      </>
    )
  }
}
const mapStateToProps = ({
  reducerGenre,


}) => {
  return {

    isRejected: reducerGenre.isRejected,
    isFulfilled: reducerGenre.isFulfilled,
    data: reducerGenre.data,
    errorToken: reducerGenre.errorToken

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenreAction: () => {
      dispatch(getGenreActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
// export default Genre


// module.exports = App
