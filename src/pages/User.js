
import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
// import { allUser } from '../utils/http'
// import TableData from '../components/TableData'
import '../styles/Home.css'
// import { Link } from 'react-router-dom'
import { getUserActionCreator } from "../redux/actions/UserAction.js";
import { connect } from "react-redux";
class User extends Component {

    constructor(props) {
        super(props)
        this.state = {

            data: [],
            id: '',
            email: '',
            password: '',
            roleuser: 2



        };
    }

    componentDidMount = () => {
        if(this.props.data.length<=0){
            this.getUser()
          }
              
    }
    getUser = async () => {

        await this.props.getUserAction();

        // await allUser(
        //     localStorage.getItem('token')
        // )
        //     .then((response) => {

        //         this.setState({ data: response.data.data }

        //         )


        //         console.log(this.state.data)

        //     })
        //     .catch((error) => {
        //         if (error.response.data.data.message == "TokenExpiredError") {
        //             this.props.history.push('/auth/token')
        //         }
        //         alert(error.response.data.data.message)
        //         this.props.history.push('/auth/login')
        //         console.log(error.response.data.data.message)
        //     })



    }

    async	componentDidUpdate(prevProps, prevState) {


    }

    shouldComponentUpdate() {
        return true
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            search: e.target.value
        })
        this.props.onChange(e.target.value)
    }

    render() {
        if (this.props.errorToken === "TokenExpiredError") {

            alert('Token Expire')
            this.props.history.push('/auth/token')

            console.log(this.props.errorToken)
        }

        const renderData = this.props.data.map(data => {
            return (
                <UserCard data={data} key={data.id} refresh={this.componentDidMount} />
            )
        })
        return (
            <>
                <Navbar />
                <div >
                    <h2>User List</h2>
                    <div className="App">

                        <table className="table"style={{ margin: "0 30% 30% 0%" }} >
                            <thead className="thead-dark"style={{"width":"50%"}}>
                                <tr>
                                    <th >ID</th>
                                    <th>Email</th>
                                    <th >Role</th>
                                    <th >Action</th>
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

    reducerUser,


}) => {
    return {
        isLoading: reducerUser.isLoading,
        isRejected: reducerUser.isRejected,
        isFulfilled: reducerUser.isFulfilled,
        errorDelete: reducerUser.errorDelete,
        data: reducerUser.data,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUserAction: () => {
            dispatch(getUserActionCreator());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);


// export default User

// module.exports = App
