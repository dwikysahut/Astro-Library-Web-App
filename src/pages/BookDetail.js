

import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
// import{Link} from'react-router-dom'
// import { getDetailBook, getAllBooks } from '../utils/http'
import CardDetailBook from '../components/CardDetailBook'
// import Background from '../images/astro5.jpg'
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
  getData = async () => {
    // const { data } = this.state
    const id = this.props.match.params.id

    await this.props.getDetailBookAction(id);
    console.log(this.props.match.params.id)
  }
  componentDidMount = async () => {
    //  this.getData()
    if (localStorage.getItem('role') === "1") {
      if (this.props.dataAuthor.length <= 0) {
        await this.props.getAuthorAction();

      }
      if (this.props.dataGenre.length <= 0) {
        await this.props.getGenreAction();

      }

    }

    if (this.props.dataBook.length <= 0) {

      this.props.history.push('/')

    }

  }
  componentDidUpdate(prevProps) {
    console.log(this.props.data)
  }
  shouldComponentUpdate() {
    return true
  }

  render() {
    let id = parseInt(this.props.match.params.id)
    const dataById = this.props.dataBook.filter(dataBook => dataBook.id === id)

    const data = dataById[0]
    console.log(dataById)
    console.log(this.props.dataDetail)
    if (this.props.errorToken === "TokenExpiredError") {

      // alert('Token Expire')
      this.props.history.push('/auth/token')

      console.log(this.props.errorToken)
    }

    const renderDataDetail = dataById.map(data => {
      return (
        <CardDetailBook data={data} key={data.id} props={this.props} id={this.props.match.params.id} refresh={this.componentDidMount} />

      )
    })

    return (
      <div>
        <Navbar />
        <h2 style={{fontFamily: "Roboto",marginLeft:40}} >Book Detail</h2>

        {this.props.isFulfilled === true && data ?
          <div className="container" style={{ backgroundImage: `url('http://localhost:8080/public/image/${data.image}')`, backgroundSize: "100% 40%", borderStyle: "ridge", borderRadius: "25px", maxWidth: "600px", minWidth: "475px", backgroundRepeat: "no-repeat" }}>
            <EditBookModal id={this.props.match.params.id} refresh={this.componentDidMount} data={data} />

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

      </div>
    )
  }
}
const mapStateToProps = ({

  reducerBook, reducerGenre, reducerAuthor

}) => {

  return {
    isFulfilled: reducerBook.isFulfilled,
    title: reducerBook.title,
    dataDetail: reducerBook.dataDetail,
    dataBook: reducerBook.data,
    dataGenre: reducerGenre.data,
    dataAuthor: reducerAuthor.data,

    dataObj: reducerBook.dataObj,
    success: reducerBook.isFulfilled,
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

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);