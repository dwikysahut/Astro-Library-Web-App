import React, { Component } from 'react'
import Navbar from '../components/Navbar'
// import { getAllBooks } from '../utils/http'
import BookCardUser from '../components/BookCardUser'
import AddBookModal from '../components/AddBookModal'
import Carousell from '../components/Carousell'
import Filter from '../components/Filter'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { getAllBooksActionCreator } from "../redux/actions/BookAction";
import { getAuthorActionCreator } from "../redux/actions/AuthorAction";
import { getGenreActionCreator } from "../redux/actions/GenreAction";
import { getUserActionCreator } from "../redux/actions/UserAction";
// import {Form} from 'react-redux'
import { connect } from "react-redux";
import '../styles/Home.css'
// const qs = require('querystring')
class Books extends Component {

  state = {
    startpage: 1,
    page: '',
    limit: '',
    orderBy: '',
    sortBy: '',
    token: "",
    title: '',
    data: [],
    pagination: {},

  };


  handlerSearch = async (e) => {
    e.preventDefault()
    if (!e.target.value) {
      this.setState({ title: "", isUpdate: true },
        () => { this.getData() }
      )
    }
    this.setState({ [e.target.name]: e.target.value },
    )
  }
  handlerChange = async (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value },
      () => { this.getData() }
    )
  }
  handlerPage = async (e) => {
    this.setState({ page: e.target.id },
      () => { this.getData() }
    )
  }
  handlerNextPage = (e) => {
    e.preventDefault();
    let currentPage = this.state.page
    currentPage++;
    if (currentPage > this.props.pagination.totalPage) {
      currentPage = this.props.pagination.totalPage
      this.props.pagination.next_page = this.props.pagination.totalPage
      return false
    }
    if (this.props.pagination.totalPage === 1) {
      currentPage = this.props.pagination.totalPage
    }
    else {
      this.setState({ page: this.props.pagination.next_page },
        () => { this.getData() }
      )
    }
  }
  handlerLastPage = () => {
    this.setState({ page: this.props.pagination.totalPage },
      () => { this.getData() })
  }
  handlerStartPage = () => {
    this.setState({ page: 1 },
      () => { this.getData() })
  }
  handlerPrevPage = async (e) => {
    e.preventDefault();

    let currentPage = this.state.page
    currentPage--;
    if (currentPage < 1) {
      currentPage = this.props.pagination.startpage
    }

    else {
      this.setState({ [e.target.name]: e.target.value, page: currentPage },
        () => { this.getData() }
      )
    }
  }

  getData = async () => {
    const { page, limit, orderBy, sortBy, title } = this.state
    const pageQuery = {
      page: page,
      limit: limit,
      orderBy: orderBy,
      sortBy: sortBy,
      title: title
    }

    // console.log(this.props.isFulfilled)
    await this.props.getAllBooksAction(pageQuery)
  }
  getDataGenre = async () => {
    await this.props.getGenreAction();
  }
  getDataAuthor = async () => {
    await this.props.getAuthorAction();
  }
  getDataUser = async () => {
    await this.props.getUserAction();
  }

  componentDidMount = () => {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/auth/login')
    }
    this.getData()


    if (localStorage.getItem('role') === "1") {
      if (this.props.dataAuthor.length <= 0) {
        this.getDataAuthor()

      }
      if (this.props.dataUser.length <= 0) {
        this.getDataUser()

      }


      if (this.props.dataGenre.length <= 0) {
        this.getDataGenre()

      }
    }

  }
  componentDidUpdate(prevprops, prevState) {
    let qs



    const { page, title, limit, sortBy, orderBy } = this.state
    if (prevprops.pagination !== this.props.pagination) {


      qs = "?"
      if (page) {
        qs += `page=${page}`
      }
      if (limit) {
        qs += `&limit=${limit}`
      }
      if (sortBy) {
        qs += `&sortBy=${sortBy}`
      }
      if (orderBy) {
        qs += `&orderBy=${orderBy}`
      }
      if (title) {
        qs += `&title=${title}`
      }
      this.props.history.push(qs)
    }

  }
  render() {
    // this.wrapper = React.createRef();
    if (this.props.isRejected === true) {

      // alert('Token Expire')
      this.props.history.push('/auth/token')

      console.log(this.props.errorToken)
    }
    let btn;
    if (localStorage.getItem('role') === "2") {
      btn =
        <div className="btn-group-vertical">
          <ul className="list-group" >
            <li >
              <Link to={"/book/borrow/user"}>
                <button style={{ "margin": "0% 0% 10% 0%", "width": "175%" }} type="button" className="btn btn-outline-secondary" >My Borrow List</button>
              </Link>
            </li>

          </ul>
        </div>
    }
    else {
      btn =
        <div className="btn-group-vertical">
          <ul className="list-group" >
            <li >
              <Link to={"/data/genre"}>
                <button style={{ "margin": "0% 0% 10% 0%", "width": "175%" }} type="button" className="btn btn-outline-secondary custom-btn " >Genre</button>
              </Link>
            </li>
            <li >
              <Link to={"/data/author"}>
                <button style={{ "margin": "0% 0% 10% 0%", "width": "175%" }} type="buttonku" className="btn btn-outline-secondary" >Author</button>
              </Link>
            </li>
            <li   >
              {/* <AddBookModal refresh={this.componentDidMount} /> */}
              <Link to={"/auth/user"}>
                <button style={{ "margin": "0% 0% 10% 0%", "width": "175%" }} type="button" className="btn btn-outline-secondary" >User</button>
              </Link>
            </li>
            <li  >
              <Link to={"/book/borrow/user"}>
                <button style={{ "margin": "0% 0% 0% 0%", "width": "175%" }} type="button" className="btn btn-dark" >All Borrow List</button>
              </Link>
            </li>
          </ul>
        </div>
    }
    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(this.props.pagination.totalItem / this.props.pagination.limit); i++) {
    //   pageNumbers.push(i);
    // }
    const renderData = this.props.data.map(data => {
      return (
        <BookCardUser data={data} key={data.id} />
      )

    })

    return (
      <>
        {/* {this.props.isLoading === true ?
              <><div style={{ margin: "10% 30% 30% 50%" }} className="spinner-border" role="status"><span className="sr-only">Loading...</span>
              </div> </> : <></>} */}

        <Navbar handle={this.handlerChange} total={this.props.pagination.totalItem} keys={'home'} />

        {/* <h2 style={{ "margin": "10px" }}></h2> */}
        <div className="row" >
          <Sidebar btn={btn} />

          <div id="sidebar-container" className="sidebar-expanded d-none d-md-block">
            <ul className="list-group">
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">

              </li>
              {btn}
            </ul>
          </div>

          <div className="col" style={{ "backgroundColor": "white", borderRadius: "5px", paddingLeft: "0", paddingRight: "0" }}>

            <Carousell />
            <div className="btn-group" role="group" aria-label="Basic example">
            </div>
            <h2 className="cstm-btn" style={{ marginLeft: "10px", fontFamily: "Courier New, Courier, monospace" }}>Book List</h2>

            <div style={{ marginLeft: "5px" }} className="form-row">
              <div className="col cstm-btn">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" name="title" onChange={this.handlerSearch} />

              </div>
              <div className="col">
                <div className="md-form active-pink active-pink-2 mb-3 mt-0">




                  <button style={{}} type="button" className="btn btn-outline-info " onClick={this.handlerChange}>Go Search</button>


                  {/* <input className="form-control" type="search" placeholder="Type Title Here . . ." name="title" aria-label="Search" onChange={this.handlerChange
                  } /> */}
                </div>

              </div>
            </div>
            {/* <form> */}
            <div className="form-row">
              <div className="col cstm-btn">
                {localStorage.getItem('role') === "1" ? <AddBookModal refresh={this.getData} /> : <></>}
              </div>
              <div className="col cstm-btn-filter">
                <Filter total={this.props.pagination.itemFound} handle={this.handlerChange} />
              </div>
            </div>
            {/* </form> */}
            {/* {this.props.isLoading === true ?
              <><div style={{ margin: "10% 30% 30% 50%" }} class="spinner-border" role="status"><span class="sr-only">Loading...</span>
              </div> </> : <></>} */}
            {this.props.pagination.itemFound <= 0 ?
              <> <h2 style={{ margin: "10% 30% 30% 30%" }}>No Result for "{this.state.title}"</h2>
              </> : <> </>

            }
            {!this.props.isFulfilled ?
              <><div style={{ margin: "10% 30% 30% 50%" }} className="spinner-border" role="status"><span className="sr-only">Loading...</span>
              </div> </> : <div className="row-book" style={{ padding: "10px 0 0 10px" }}>
                {renderData}
              </div>}


          </div>
        </div>
        <Pagination limit={this.props.pagination.limit} totalItem={this.props.pagination.itemFound} paginate={this.handlerPage} page={this.props.pagination.page} left={this.handlerPrevPage} right={this.handlerNextPage} start={this.handlerStartPage} last={this.handlerLastPage} />
      </>
    )
  }
}
const mapStateToProps = ({
  reducerBook, reducerGenre, reducerAuthor, reducerUser


}) => {
  return {

    isRejected: reducerBook.isRejected,
    isFulfilled: reducerBook.isFulfilled,
    isLoading: reducerBook.isLoading,
    data: reducerBook.data,
    dataGenre: reducerGenre.data,
    dataAuthor: reducerAuthor.data,
    pagination: reducerBook.pagination,
    errorToken: reducerBook.errorToken,
    dataUser: reducerUser.data

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllBooksAction: (pageQuery) => {
      dispatch(getAllBooksActionCreator(pageQuery));
    },
    getGenreAction: () => {
      dispatch(getGenreActionCreator());
    },
    getAuthorAction: () => {
      dispatch(getAuthorActionCreator());
    },
    getUserAction: () => {
      dispatch(getUserActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);

// export default Books























