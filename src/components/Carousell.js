import React from "react";
import {Carousel} from "react-bootstrap";
import '../styles/Carousel.css';
// import {connect} from 'react-redux'
function Carousell({ data, refresh }) {

    return (

        <>

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="astro1.jpg" width="20%" height="400"
      alt="First slide"
    />
    <Carousel.Caption>
    <h5>“Books are the legacies that a great genius leaves to mankind, which are delivered down from generation to generation as presents to the posterity of those who are yet unborn.” </h5>
                            <p>— Joseph Addison —</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="astro4.jpg" width="100%" height="400"
      alt="Second slide"
    />
    <Carousel.Caption>
    <h5>“Some books leave us free and some books make us free.”</h5>
                            <p>— Ralph Waldo Emerson —</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="astro5.jpg" width="100%" height="400"
      alt="Third slide"
    />
    <Carousel.Caption>
    <h5>“Books are totally useless unless you take their advice. If you just keep reading them, thinking ‘that’s so insightful! that changes everything,’ but never actually doing anything different, then pretty quickly the feeling will wear off and you’ll start searching for another book to fill the void.” </h5>
                            <p>— Aaron Swartz —</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            {/* <div id="demo" className="carousel slide" data-ride="carousel">


                <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" className="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ul>

                <div className="carousel-inner" style={{ width: "100%", height: "100%", padding: "0px 0px 50px 0px", }}>
                    <div className="carousel-item active">
                        <img src="carousel-book.jpg" alt="book" width="20%" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>“Books are the legacies that a great genius leaves to mankind, which are delivered down from generation to generation as presents to the posterity of those who are yet unborn.” </h5>
                            <p>— Joseph Addison —</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="library.jpg" alt="library" width="100%" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>“Some books leave us free and some books make us free.”</h5>
                            <p>— Ralph Waldo Emerson —</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="carousel2.jpg" alt="book 2" width="100%" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>“Books are totally useless unless you take their advice. If you just keep reading them, thinking ‘that’s so insightful! that changes everything,’ but never actually doing anything different, then pretty quickly the feeling will wear off and you’ll start searching for another book to fill the void.” </h5>
                            <p>— Aaron Swartz —</p>
                        </div>
                    </div>
                </div>

                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#demo" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div> */}


        </>
    )
}

export default Carousell