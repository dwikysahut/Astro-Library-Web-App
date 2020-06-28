
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
// import { postBook, allAuthor, allGenre } from '../utils/http'
import { Alert } from 'react-bootstrap'
import '../styles/Home.css'
import { Modal, Button } from 'react-bootstrap'
import { postBookActionCreator } from "../redux/actions/BookAction";
import { getGenreActionCreator } from "../redux/actions/GenreAction";
import { getAuthorActionCreator } from "../redux/actions/AuthorAction";

import { connect } from "react-redux";
class AddBookModal extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        genre_id: '1',
        author_id: '1',
        status: 'Available',
        genre: [],
        author: [],
        isFill: true,
        isImage: true,
        isMatch: false,
        isShow: false,
    }
    handleHide = () => {
        this.setState({ isShow: false })
    }
    handleShow = () => {
        this.setState({ isShow: true })
    }
    handlerChange = (e) => {
        if (e.target.value) {
            this.setState({ isFill: true })
        }
        this.setState({ [e.target.name]: e.target.value })
    }
    handlerChangeImage = (e) => {
        if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
            alert("FIle not IMAGE , File will not saved or use image before")
            return false;
        }
        else {
            if (e.target.files[0].size / 1024 / 1024 > 1) {
                this.setState({ isImage: false })
                this.setState({ isMatch: false })
                //  alert("Image can't more than 1 mb,Image will not saved")
                return false
            }
            else {
                this.setState({ isImage: true })

                this.setState({ image: e.target.files[0] })
            }
        }
    }

    handlerSubmit = async (e) => {
        e.preventDefault()
        if (!this.state.title || !this.state.description) {
            this.setState({ isFill: false })

            // alert("Data can't Empty")
            return
        }

        if (!this.state.image) {
            this.setState({ isFill: false })

            console.log('image cannot empty')
            // alert('image empty,Add Failed')
            return false;
        }

        let formData = new FormData()
        this.setState({ isFill: true })
        this.setState({ isImage: true })


       
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
       await formData.append('image', this.state.image)
        formData.append('genre_id', this.state.genre_id)
        formData.append('author_id', this.state.author_id)
        formData.append('status', this.state.status)

        await this.props.postBookAction(formData)
        this.handleHide()
         return this.props.refresh()
        // await postBook(
        //     localStorage.getItem('token'),
        //     formData
        // )
        //     .then((response) => {
        //         console.log(this.state)
        //         // alert('add succesfull')
        //         this.setState({ isShow: true })
        //         this.setState({ isMatch: true })
        //          return this.props.refresh()
        //         console.log('This file size is: ' + this.state.image.size / 1024 / 1024 + " MB ");
        //     }

        //     )
        //     .catch((error) => {
        //         if (error.response) {
        //             if (error.response.data.data.message == "TokenExpiredError") {
        //                 this.props.history.push('/auth/token')

        //                 this.props.history.push('/auth/login')
        //                 console.log(error.response.data.data.message)
        //             }
        //             else {
        //                 console.log(error)
        //             }
        //         }
        //         this.setState({ isShow: true })
        //         this.setState({ isMatch: false })
        //         console.log(error)
        //         alert("add book failed")
        //     })

    }
    componentDidMount = async () => {
        //     await allAuthor(localStorage.getItem('token')).then((response) => {
        //         this.setState({
        //             author: response.data.data
        //         })
        //     }).catch((error) => {
        //         console.log(error)
        //     })


        //     await allGenre(localStorage.getItem('token')).then((response) => {
        //         this.setState({
        //             genre: response.data.data
        //         })
        //     }).catch((error) => {
        //         console.log(error)
        //     })
    }

    render() {
        // const { author, genre } = this.state
        const optionGenre = this.props.dataGenre.map(genre => {
            return (
                <option value={genre.id} key={genre.id}>{genre.name}</option>
            )
        })
        const optionAuthor = this.props.dataAuthor.map(author => {
            return (
                <option value={author.id} key={author.id}>{author.name}</option>
            )
        })
        return (
            <>
                <Button variant="dark" type="button" style={{ marginLeft: "10px"  }} onClick={this.handleShow}>
                    Add Book
</Button>


                <Modal show={this.state.isShow} onHide={this.handleHide} size='xl'

                >
                    <Modal.Header closeButton style={{ "float": "right", "borderRadius": "25px" }} >

                        <h2>Add Book</h2>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isFill === false ? <Alert variant="danger">
                            Fill in all forms
</Alert> : <></>}
                        <div className="col-sm">
                            <div className="">
                                <form onSubmit={this.handlerSubmit}>

                                  
                                    <div className="form-group">
                                        <label >Title</label>
                                        <input type="text" required name="title" className="form-control" aria-describedby="emailHelp" onChange={this.handlerChange} />

                                    </div><div className="form-group">
                                        <label >Description</label>
                                        <textarea type="text" rows="4" required name="description" className="form-control" aria-describedby="emailHelp" onChange={this.handlerChange} />

                                    </div><div className="form-group">
                                        <label >Image</label>
                                        <input type="file" accept=".jpg, .png, .jpeg,|image/*" required name="image" className="form-control" aria-describedby="emailHelp" onChange={this.handlerChangeImage} />
                                        {this.state.isImage === false ? <Alert variant="danger">
                                            Image can't More than 1  Mb  File will not saved or use image before
</Alert> : <></>}
                                    </div>
                                    <div className="form-group">
                                        <label >Genre</label>

                                        <select name="genre_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.state.genre_id}>
                                            <option value="1">Select Genre(Default)</option>
                                            {optionGenre}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >Author</label>

                                        <select name="author_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.state.author_id}>
                                            <option value="1">Select Author(Default)</option>
                                            {optionAuthor}
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label >Status</label>
                                        <select className="form-control" required name="status" onChange={(e) => this.setState({ status: e.target.value })}>
                                            <option value="">Status (Default Available)</option>
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>

                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ "float": "right", "borderRadius": "25px" }}>
                        <button type="button" className="btn btn-outline-dark" onClick={(e) => this.handlerSubmit(e)} >

                            Add
</button>       <Button variant="warning" onClick={this.handleHide}>
                            Close
</Button>
                    </Modal.Footer>
                </Modal>




                {/* <button type="button" style={{ marginLeft: "10px" }} className="btn btn-dark" data-toggle="modal" data-target="#example">
                    Add Book
</button>
                <div className="modal fade" style={{}} id="example" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ "width": "150%", "borderRadius": "25px" }}>
                            <div className="modal-header">

                                <h1>Library App</h1>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.isFill === false ? <Alert variant="danger">
                                    Fill in all forms
            </Alert> : <></>}
                              
                                <form onSubmit={this.handlerSubmit}>

                                    <h2>Add Book</h2>
                                    <div className="form-group">
                                        <label >Title</label>
                                        <input type="text" required name="title" className="form-control" aria-describedby="emailHelp" onChange={this.handlerChange} />

                                    </div><div className="form-group">
                                        <label >Description</label>
                                        <textarea type="text" rows="4" required name="description" className="form-control" aria-describedby="emailHelp" onChange={this.handlerChange} />

                                    </div><div className="form-group">
                                        <label >Image</label>
                                        <input type="file" accept=".jpg, .png, .jpeg,|image/*" required name="image" className="form-control" aria-describedby="emailHelp" onChange={this.handlerChangeImage} />
                                        {this.state.isImage === false ? <Alert variant="danger">
                                            Image can't More than 1  Mb  File will not saved or use image before
            </Alert> : <></>}
                                    </div>
                                    <div className="form-group">
                                        <label >Genre</label>

                                        <select name="genre_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.state.genre_id}>
                                            <option value="1">Select Genre(Default)</option>
                                            {optionGenre}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >Author</label>

                                        <select name="author_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.state.author_id}>
                                            <option value="1">Select Author(Default)</option>
                                            {optionAuthor}
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label >Status</label>
                                        <select className="form-control" required name="status" onChange={(e) => this.setState({ status: e.target.value })}>
                                            <option value="">Status (Default Available)</option>
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>

                                        </select>
                                    </div>
                                </form>
                                <div className="modal-footer" style={{ borderRadius: " 0 0 20px 20px " }}>
                                    <button type="button" style={{ "padding": "15px" }} data-dismiss="modal" className="btn btn-outline-success" onClick={this.handlerSubmit}>
                                        Add
                                </button>
                                    <button type="button" className="btn btn-outline-warning" data-dismiss="modal">Cancel</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/*                        
                        </div>
                    </div>
                </div> */}
                {/* {this.state.isMatch === false ?
                    <Modal show={this.state.isShow} onHide={this.handleHide}>
                        <Modal.Header closeButton>
                            <h4>Add Failed ,Image size More Than Limit </h4>
                        </Modal.Header>

                    </Modal> : <>
                        <Modal show={this.state.isShow} onHide={this.handleHide}>
                            <Modal.Body>
                                <p style={{ textAlign: "center" }}>Add Success</p>
                            </Modal.Body>

                        </Modal>
                    </>
                } */}
            </>

        );
    };
}


const mapStateToProps = ({

    reducerBook, reducerAuthor, reducerGenre


}) => {
    return {
        isLoading: reducerBook.isLoading,
        isRejected: reducerBook.isRejected,
        isFulfilled: reducerBook.isFulfilled,
        dataAuthor: reducerAuthor.data,
        dataGenre: reducerGenre.data,

        errorToken: reducerBook.errorToken

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        postBookAction:async (body) => {
          await  dispatch(postBookActionCreator(body));
        },
        getAuthorAction: () => {
            dispatch(getAuthorActionCreator());
        },
        getGenreAction: () => {
            dispatch(getGenreActionCreator());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);

// export default AddBookModal;