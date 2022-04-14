import { ACTION_STRING } from './actionString'
import { vehicleTypeLimit, vehicleSearchFilter } from '../../modules/utils/vehicle'

const { listVehicle, listPopularVehicle, listCar, listMotorbike, listBike } = ACTION_STRING

export const listVehiclePopularAction = (params) => {
    return {
        type: listPopularVehicle,
        payload: vehicleTypeLimit(params)
    }
}

export const listVechileAction = (params) => {
    return {
        type: listVehicle,
        payload: vehicleSearchFilter(params)
    }
}

export const listVehicleCarAction = (params) => {
    return {
        type: listCar,
        payload: vehicleTypeLimit(params)
    }
}
export const listVehicleMotorbikeAction = (params) => {
    return {
        type: listMotorbike,
        payload: vehicleTypeLimit(params)
    }
}

export const listVehicleBikeAction = (params) => {
    return {
        type: listBike,
        payload: vehicleTypeLimit(params)
    }
}
