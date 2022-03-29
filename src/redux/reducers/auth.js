import { ACTION_STRING } from '../actions/actionString'
import { ActionType } from 'redux-promise-middleware'

const initialState = {
    id: null,
    token: null,
    userData: {},
    isPending: false,
    isFulfilled: false,
    isReject: false,
    errData: {}
}

const authReducer = (state = initialState, action) => {
    const { auth, user, logout } = ACTION_STRING
    const { Pending, Fulfilled, Rejected } = ActionType

    switch (action.type) {
        case auth.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }

        case auth.concat('_', Fulfilled):
            const token = action.payload.data.result.token
            const id = action.payload.data.result.id
            return {
                ...state,
                isPending: false,
                isFulfilled: true,
                id,
                token
            }

        case auth.concat('_', Rejected):
            const errData = action.payload.response.data
            return {
                ...state,
                isPending: false,
                isReject: true,
                errData
            }

        case user.concat('_', Fulfilled):
            const userData = action.payload.data.result[0]
            return {
                ...state,
                userData
            }

        case logout.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }

        case logout.concat('_', Fulfilled):
            return {
                ...state,
                isFulfilled: false,
                isReject: false,
                isPending: false,
                id: null,
                token: null,
                userData: {}
            }

        default: return state
    }
}

export default authReducer