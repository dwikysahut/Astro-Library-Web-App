// berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
import {
    getUserAction, pending,
    rejected,
    fulfilled,
    loginUserAction,
    registerUserAction,
    deleteUserAction,
    logoutUserAction,
    refreshTokenAction



} from "../actions/actionTypes";


const initialValue = {
    data: [],


    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorToken: '',
    error: '',
    errorDelete: "",
    role: '',
    id: '',
    email: '',
    refreshtoken: '',
    token: '',
    dataLogin: {}


}; // biar tidak undefined



const dataUser = (prevState = initialValue, action) => {

    switch (action.type) {
        case getUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case getUserAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: action.payload.data.data,

            }


        case deleteUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case deleteUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorDelete: action.error

            }
        case deleteUserAction + fulfilled:
            const deleteData = prevState.data.filter(
                dataUser => dataUser.id !== parseInt(action.payload.data.data.id)
            )
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: deleteData

            }




        case registerUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case registerUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.meessage,
                error: action.payload.response.status
            }
        case registerUserAction + fulfilled:
            prevState.data.push(action.payload.data.data)

            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: prevState.data

            }

        case loginUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case loginUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case loginUserAction + fulfilled:
            if (action.payload.status == 204) {
                return {
                    isRejected: true
                }
            }
            else {

                localStorage.setItem('role', action.payload.data.data.role)
                localStorage.setItem('id', action.payload.data.data.id)
                localStorage.setItem('email', action.payload.data.data.email)
                localStorage.setItem('refreshToken', action.payload.data.data.refreshToken)
                localStorage.setItem('token', action.payload.data.data.token)
                // prevState.data.push(action.payload.data.data)
            }
            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: prevState.data,
                dataLogin: action.payload.data.data


            }

        case logoutUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case logoutUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case logoutUserAction + fulfilled:
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('email')
            localStorage.removeItem('id')
            localStorage.removeItem('id_user')
            localStorage.removeItem('role')      // prevState.data.push(action.payload.data.data)

            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                data: prevState.data,
                dataLogout: action.payload.data.data,
                error: action.payload.status


            }




        case refreshTokenAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,

            }
        case refreshTokenAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
                errorToken: action.payload.response.data.data.message
            }
        case refreshTokenAction + fulfilled:
            localStorage.removeItem('token')
            localStorage.setItem('token', action.payload.data.data.token)

            return {
                ...prevState,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                // data: prevState.data,
                dataToken: action.payload.data.data,
                // error:action.payload.status


            }

        default:
            return {
                ...prevState,
            };




    }



}

export default dataUser;