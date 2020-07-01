import React from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
// import { deleteBook } from '../utils/http'
import '../styles/Home.css'
import '../styles/Card.css'
function BookCardUser({ data, refresh }) {
  const URL_BASE = process.env.REACT_APP_API
  return (
    <>

      <div className="flip-card" >
        <div className="flip-card-inner" style={{ borderRadius: "25px" }}>
          <div className="flip-card-front" style={{ borderRadius: "25px" }}>

            <img className="card-img-top" src={`${URL_BASE}/public/image/` + data.image} alt={data.image} style={{ "width": "300px", "height": "250px", borderRadius: "25px 25px 2px 2px" }} />
            <Card.Title className="titleCard" style={{ padding: "30px 0 10px 0"}}>{data.title}</Card.Title>
            <Card.Text className="desc"style={{ margin: "25px 25px 0 25px" }}>
              {data.description}
            </Card.Text>

          </div>
          {/* <div class="flip-card-back" style={{ padding: "20px", backgroundImage: `url(http://localhost:8080/public/image/${data.image})`, borderRadius: "25px", backgroundSize: "300px 400px" }}> */}
          <div className="flip-card-back" style={{ padding: "50px 20px 40px 40px",  backgroundImage:"url('/book.png')", borderRadius: "25px", backgroundSize: "300px 440px" }}>
     
            <ListGroup className="list-group-flush">

            
            <p className="titleCard">Author : {data.author}</p>
              <br></br>
              <p className="titleCard" style={{ margin: "5px 0px 0 0" }}>Genre : {data.genre}</p>


              <div style={{ margin: "64px 20px 20px 0" }}>
              {data.status === "Available" ?
             <h4 style={{ "color": "green" }} className="card-text">{data.status}</h4> :
                <h4 style={{ "color": "red" }} className="card-text">{data.status}</h4>

              }
</div>
              <Card.Body  >
                <div className="btn-group" style={{ float: "left", marginTop: "2px" }} role="group">
                 {localStorage.getItem('role')==="1"?
                 <></>:
              <>
                  {data.status === "Unavailable" ?
                    <Link to={`/book/borrow/user/${data.id}`}>
                      <form >
                        <button disabled type="button" style={{ }} className="btn btn-outline-dark" value={data.id}

                        >Borrow</button>
                      </form>
                    </Link> :
                    <Link to={`/book/borrow/user/${data.id}`}>
                      <form >
                        <button type="button" className="btn  btn-outline-dark" style={{ }} value={data.id}

                        >Borrow</button>
                      </form>
                    </Link>
                  }
                  </>
                }
                  <Link to={`/book/detail/item/${data.id}`}>
                    <form >
                      <button type="button" className="btn btn-outline-dark" style={{ marginLeft: "20%" }} value={data.id}

                      >Detail</button>
                    </form>
                  </Link>

                </div>

              </Card.Body>
            </ListGroup>
          </div>
        </div>
      </div>

    </>
  )
}

export default BookCardUser