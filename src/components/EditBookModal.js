
import React, { Component } from 'react'
// import { editBook, getBookById, allAuthor, allGenre } from '../utils/http'
// import Button from '@material-ui/core/Button';
import '../styles/Home.css'
// import { Link } from 'react-router-dom'
import { Button, Modal, Alert } from 'react-bootstrap'
import { editBookActionCreator } from "../redux/actions/BookAction";
import { getGenreActionCreator } from "../redux/actions/GenreAction";
import { getAuthorActionCreator } from "../redux/actions/AuthorAction";
import { connect } from "react-redux";
class EditBookModal extends Component {

    state = {
        id: this.props.data.id,
        title: this.props.data.title,
        description: this.props.data.description,
        image: this.props.data.image,
        genre_id: this.props.data.genre_id,
        genre_name: this.props.data.genre,
        author_name: this.props.data.author,
        author_id: this.props.data.author_id,
        status: this.props.data.status,     
        checkErrorImage: false,
        isDone: false,
        data: {},
        author: [],
        genre: [],
        show: false,
        isImage: true,
        isFill: true,

    }

    handlerChange = (e) => {
        e.preventDefault()
        if (e.target.name === "title" || e.target.name === "description") {
            if (!e.target.value) {
                this.setState({ isFill: false })
            }
        }
        if (e.target.value) {
            this.setState({ isFill: true })
        }
        this.setState({ [e.target.name]: e.target.value })

    }
    handlerChangeImage = async (e) => {
        // const a=JSON.stringify(e.target.files[0])
        
        // // console.log(e.target.files[0])
        // // console.log(e.target.files)

        e.preventDefault()
        if (e.target.files[0] === "undefined") {
            await this.setState({ image: this.state.image }, () => { })
        }

        if (e.target.files[0].size / 1024 / 1024 > 1) {
            this.setState({ isImage: false })
            this.setState({ image: this.state.image })
            // alert("Image can't more than 2 mb,Image will not saved")
            // this.handleClose()
            return false
        }
        else {
            this.setState({ isImage: true })
            await this.setState({ image: e.target.files[0], checkErrorImage: false }, () => { })
        }
    }

    componentDidUpdate = async (prevProps) => {

        console.log(this.props.data)
        if (prevProps.data !== this.props.data) {
            await this.setState({
                id: this.props.data.id,
                title: this.props.data.title,
                description: this.props.data.description,
                image: this.props.data.image,
                genre_id: this.props.data.genre_id,
                genre_name: this.props.data.genre,
                author_name: this.props.data.author,

                author_id: this.props.data.author_id,
                status: this.props.data.status,
                // data: response.data.data
            }
            )
        }


    }

    handleHide = () => {
        this.setState({
            show: false,

        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handlerSubmit = async (e) => {
        let formData = new FormData()
        e.preventDefault()
        if (this.state.isFill === true) {

            formData.append('title', this.state.title)
            formData.append('description', this.state.description)
            await formData.append('image', this.state.image)
            formData.append('genre_id', this.state.genre_id)
            formData.append('author_id', this.state.author_id)
            formData.append('status', this.state.status)


            await this.props.editBookAction(this.props.id, formData)


            console.log(this.props)
            if (this.props.isLoading === false && this.props.isFulfilled === true) {
                this.handleHide()
                // return this.props.refresh()
            }
            // await editBook(
            //     localStorage.getItem('token'),
            //     this.props.data.id,
            //     formData
            // )
            //     .then((response) => {
            //         console.log(response)
            //         // alert('edit succesfull')
            //         this.handleHide()
            //         return this.props.refresh()

            //     }

            //     )
            //     .catch((error) => {
            //         if (error.response.data.message) {

            //             if (error.response.data.data.message == "TokenExpiredError") {
            //                 this.props.props.history.push('/auth/token')
            //                 alert(error.response.data.data.message)
            //                 this.props.props.history.push('/auth/login')
            //                 console.log(error.response.data.data.message)

            //             }
            //             else {

            //                 console.log(error.response.data.data.message)
            //                 if (error.response.data.data.message == "TokenExpiredError") {
            //                     localStorage.removeItem('token')
            //                     localStorage.removeItem('refreshToken')
            //                     localStorage.removeItem('email')

            //                     localStorage.removeItem('id')
            //                     localStorage.removeItem('id_user')
            //                     localStorage.removeItem('role')
            //                 }
            //                 else {
            //                     alert("Edit Failed")
            //                     console.log(error)
            //                 }
            //             }
            //         }
            //         console.log(error)
            //     })

        }
    }

    async componentDidMount() {

        //   this.getData()
        if (this.props.dataAuthor.length <= 0) {
            await this.props.getAuthorAction();

        }
        if (this.props.dataGenre.length <= 0) {
            await this.props.getGenreAction();

        }

    }



    render() {

        // const { title, description, author_id, genre_id, image, status } = this.state

        // let btn
        // const { author, genre } = this.state
        const optionGenre = this.props.dataGenre.map(genre => {
            return (
                <option value={genre.id} key={genre.id}>{genre.id}-{genre.name}</option>
            )
        })
        const optionAuthor = this.props.dataAuthor.map(author => {
            return (

                <option value={author.id} key={author.id}>{author.id}-{author.name}</option>
            )
        })
        return (
            <> {this.props.isFulfilled === false ?
                <><div style={{ margin: "10% 30% 30% 50%" }} class="spinner-border" role="status"><span class="sr-only">Loading...</span>
                </div> </> : <></>
            }

                {localStorage.getItem('role') === "1" ?

                    <Button variant="dark" type="button" style={{ "float": "right", "borderRadius": "10%" }} onClick={this.handleShow}>
                        Edit
</Button> :  <Button variant="transparent" disabled type="button" style={{ "float": "right", "borderRadius": "10%" }} onClick={this.handleShow}>
                     
</Button>

                }
                <Modal show={this.state.show} onHide={this.handleHide} size='xl'

                >
                    <Modal.Header closeButton style={{ "float": "right", "borderRadius": "25px" }} >

                        <h2>Edit Book</h2>
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
                                        <input type="text" required name="title" className="form-control" defaultValue={this.props.data.title} aria-describedby="emailHelp" onChange={this.handlerChange} />

                                    </div><div className="form-group" >
                                        <label >Description</label>
                                        <textarea type="text" rows="4" required name="description" className="form-control" defaultValue={this.props.data.description} aria-describedby="emailHelp" onChange={this.handlerChange} />

                                    </div>

                                    <div className="form-group">
                                        <label >Image</label>
                                        <input type="file" accept=".jpg, .png, .jpeg,|image/*" name="image" defaultValue={this.props.data.fileName} className="form-control" onChange={this.handlerChangeImage} />
                                        {/* <input type="text"   name="image"  className="form-control" disabled  value={this.state.image}/> */}
                                        {this.state.isImage === false ? <Alert variant="danger">
                                            Image can't More than 1  Mb  File will not saved or use image before
                                          </Alert> : <></>}
                                    </div>
                                    <div className="form-group">
                                        <label >Genre</label>

                                        <select name="genre_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.props.data.genre_id}>
                                            {optionAuthor.key === this.props.data.genre_id ? <></> :
                                                <option disabled value={this.props.data.genre_id}>Current - ({this.props.data.genre_id}-{this.props.data.genre})</option>

                                            }    {optionGenre}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >Author</label>

                                        <select name="author_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.props.data.author_id}>
                                            {optionAuthor.key === this.props.data.author_id ? <></> :
                                                <option disabled value={this.props.data.author_id}>Current - ({this.props.data.author_id}-{this.props.data.author})</option>

                                            }
                                            {/* <option  value={this.state.author_id}>Current-{this.state.author_id}-{this.state.author_name}</option>:  */}

                                            {optionAuthor}
                                        </select>
                                    </div>
                                    {/* {this.props.data.status === "Unavailable" ? */}
                                    {/* <div className="form-group">

                                            <label >Status</label>
                                            <select disabled className="form-control" required name="status" onChange={(e) => this.setState({ status: e.target.value })}>
                                                <option value={this.props.data.status}>Current - ({this.props.data.status})</option>
                                                <option value="Available">Available</option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                        </div> : */}
                                    <div className="form-group">

                                        <label >Status</label>
                                        <select className="form-control" required name="status" onChange={(e) => this.setState({ status: e.target.value })}>
                                            <option value={this.props.data.status}>Current-{this.props.data.status}</option>
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                    {/* } */}


                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ "float": "right", "borderRadius": "25px" }}>
                        <button type="button" className="btn btn-outline-dark" onClick={(e) => this.handlerSubmit(e)} >

                            Edit
</button>       <Button variant="warning" onClick={this.handleHide}>
                            Close
            </Button>
                    </Modal.Footer>
                </Modal>

            </>

        );
    };
}


const mapStateToProps = ({

    reducerGenre,
    reducerAuthor,
    reducerBook


}) => {
    return {
        isLoading: reducerBook.isLoading,
        isRejected: reducerBook.isRejected,
        isFulfilled: reducerBook.isFulfilled,
        errorToken: reducerBook.errorToken,
        name: reducerGenre.name,
        //   data:reducerBook.dataDetail,
        dataGenre: reducerGenre.data,
        dataAuthor: reducerAuthor.data

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        editBookAction: async (id, body) => {
            await dispatch(editBookActionCreator(id, body));
        },
        getGenreAction: () => {
            dispatch(getGenreActionCreator());
        },
        getAuthorAction: () => {
            dispatch(getAuthorActionCreator());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBookModal);

// export default EditBookModal;





// <>
// {localStorage.getItem('role') == 1 ?

//     <Button variant="contained" type="button" style={{ "float": "right", "borderRadius": "10%" }} className="btn btn-dark" data-toggle="modal" data-target="#example">
//         Edit
// </Button> : <></>

// }

// <div className="modal fade" id="example" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div className="modal-dialog" role="document">
//         <div className="modal-content" style={{ "width": "150%", "borderRadius": "25px" }}>
//             <div className="modal-header">
//                 <div className="container">
//                     <h1>Library App</h1>
//                     <h2>Edit Book</h2>
//                     <div className="row">
//                         <div className="titleImage">


//                             <div className="col-sm">

//                                 <br />

//                             </div>
//                         </div>
//                         <div className="col-sm">
//                             <div className="">
//                                 <form onSubmit={this.handlerSubmit}>


//                                     <div className="form-group">
//                                         <label >Title</label>
//                                         <input type="text" required name="title" className="form-control" value={this.state.title} aria-describedby="emailHelp" onChange={this.handlerChange} />

//                                     </div><div className="form-group" >
//                                         <label >Description</label>
//                                         <textarea type="text" rows="4" required name="description" className="form-control" value={this.state.description} aria-describedby="emailHelp" onChange={this.handlerChange} />

//                                     </div>
//                                     <div className="form-group">
//                                         <label >Image</label>
//                                         <input type="file" accept=".jpg, .png, .jpeg,|image/*" name="image" value={this.state.image.fileName} className="form-control" onChange={this.handlerChangeImage} />
//                                         {/* <input type="text"   name="image"  className="form-control" disabled  value={this.state.image}/> */}

//                                     </div>
//                                     <div className="form-group">
//                                         <label >Genre</label>

//                                         <select name="genre_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.state.genre_id}>
//                                             <option value={this.state.genre_id}>{this.state.genre_id}-{this.state.genre_name}</option>
//                                             {optionGenre}
//                                         </select>
//                                     </div>
//                                     <div className="form-group">
//                                         <label >Author</label>

//                                         <select name="author_id" required className="form-control" onChange={this.handlerChange} defaultValue={this.state.genre_id}>
//                                             <option value={this.state.author_id}>{this.state.author_id}-{this.state.author_name}</option>
//                                             {optionAuthor}
//                                         </select>
//                                     </div>
//                                     <div className="form-group">
//                                         <label >Status</label>
//                                         <select className="form-control" required name="status" onChange={(e) => this.setState({ status: e.target.value })}>
//                                             <option value="">Status (Default Available)</option>
//                                             <option value="Available">Available</option>
//                                             <option value="Unavailable">Unavailable</option>

//                                         </select>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//             </div>

//             <div className="modal-footer">

//                 <button type="button" className="btn btn-outline-dark" data-dismiss="modal" onClick={(e) => this.handlerSubmit(e)} >

//                     Edit
// </button>
//                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>

//             </div>
//         </div>
//     </div>
// </div>
// </>