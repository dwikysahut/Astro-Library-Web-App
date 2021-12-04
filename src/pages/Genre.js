
import React, { useEffect } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import GenreCard from '../components/GenreCard'
// import { allGenre } from '../utils/http'
import TableData from '../components/TableData'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { getGenreActionCreator } from "../redux/actions/GenreAction";
import { connect } from "react-redux";
const Genre = ({ data, errorToken, history , getGenreAction }) => {

  useEffect(() => {
    if (localStorage.getItem('role') === "1") {
      if (data.length <= 0) {
        getData()
      }
    }
    else {
      history.push('/')
    }
  })
  
  useEffect(() => {
    if (errorToken === "TokenExpiredError") {
      history.push('/auth/token')
    }
  }, [errorToken, history])
  const getData = async () => {
    await getGenreAction();
  }

  const renderData = data.map(data => {
    return (
      <GenreCard data={data} key={data.id} refresh={getData} />
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
