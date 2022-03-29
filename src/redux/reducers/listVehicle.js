import { ACTION_STRING } from '../actions/actionString'
// import { vehicleTypeLimit } from '../../modules/utils/vehicles'
import { ActionType } from 'redux-promise-middleware'

const initialState = {
    vehicleData: {},
    listPopularVehicle: {},
    listCarHome: {},
    listMotorbikeHome: {},
    listBikeHome: {},
    isPending: false,
    isFulfilled: false,
    isReject: false,
    errData: {}
}

const listVehicle = (state = initialState, action) => {
    const { listVehicle, listPopularVehicle, listCar, listMotorbike, listBike } = ACTION_STRING
    const { Pending, Fulfilled, Rejected } = ActionType

    switch (action.type) {
        // list vehicle for search, filter, and other
        case listVehicle.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }

        case listVehicle.concat('_', Fulfilled):
            const vehicleData = action.payload.data.result
            return {
                ...state,
                vehicleData,
                isPending: false,
                isFulfilled: true,
            }

        case listVehicle.concat('_', Rejected):
            const errData = action.payload.response.data
            return {
                ...state,
                isPending: false,
                isReject: true,
                errData
            }

        // list popular vehicle
        case listPopularVehicle.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }
        case listPopularVehicle.concat('_', Fulfilled):
            return {
                ...state,
                listPopularVehicle: action.payload.data.result.data,
                isPending: false,
                isFulfilled: true,
            }
        case listPopularVehicle.concat('_', Rejected):
            return {
                ...state,
                isPending: false,
                isReject: true,
                errData: action.payload.response.data
            }
        // list car for home
        case listCar.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }
        case listCar.concat('_', Fulfilled):
            return {
                ...state,
                listCarHome: action.payload.data.result.data,
                isPending: false,
                isFulfilled: true,
            }
        case listCar.concat('_', Rejected):
            return {
                ...state,
                isPending: false,
                isReject: true,
                errData: action.payload.response.data
            }
        // list MotorbikeHome
        case listMotorbike.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }
        case listMotorbike.concat('_', Fulfilled):
            console.log('ini action', action)
            return {
                ...state,
                listMotorbikeHome: action.payload.data.result.data,
                isPending: false,
                isFulfilled: true,
            }
        case listMotorbike.concat('_', Rejected):
            return {
                ...state,
                isPending: false,
                isReject: true,
                errData: action.payload.response.data
            }

        // listBikeHome
        case listBike.concat('_', Pending):
            return {
                ...state,
                isPending: true,
                isFulfilled: false,
                isReject: false
            }
        case listBike.concat('_', Fulfilled):
            return {
                ...state,
                listBikeHome: action.payload.data.result.data,
                isPending: false,
                isFulfilled: true,
            }
        case listBike.concat('_', Rejected):
            return {
                ...state,
                isPending: false,
                isReject: true,
                errData: action.payload.response.data
            }

        default: return state
    }
}

export default listVehicle