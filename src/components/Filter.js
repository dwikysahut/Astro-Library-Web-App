import React from 'react'
// import { Link } from 'react-router-dom'
// import { deleteBook } from '../utils/http'
// import EditBookModal from '../components/EditBookModal'
import '../styles/Home.css'


function Filter({ total, handle }) {

  return (
    <>
    <div className="form-row">  
     <div className="form-group col-md-4">
                <select style={{ "marginLeft": "0" }} name="orderBy" className="form-control" onChange={handle}>
                  <option value="asc">Order By</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
                </div>
           
              <div className="form-group col-md-4">
                <select style={{ "marginLeft": "" }} name="sortBy" className="form-control" onChange={handle}>
                  <option value="id">Sort By</option>
                  <option value="id">id</option>
                  <option value="title">title</option>
                  <option value="genre">genre</option>
                  <option value="author">author</option>
                  <option value="status">title</option>
                </select>
                </div>
           
              <div className="form-group col-md-4">
                <select style={{ "marginLeft": "" }} name="limit" className="form-control" onChange={handle}>
                  <option value="3">Show</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value={total}>All</option>
                </select>
                </div>
            
              </div>
    </>
  )
}

export default Filter








