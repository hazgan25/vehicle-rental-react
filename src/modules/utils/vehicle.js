import axios from 'axios'
const urlVehicles = process.env.REACT_APP_HOST + '/vehicles'

export const postVehicle = (body, token) => {
    return axios.post(urlVehicles, body, { headers: { 'x-access-token': token } })
}

export const vehicleDetail = (id) => {
    const urlVehicleDetail = urlVehicles + `/${id}`
    return axios.get(urlVehicleDetail)
}

export const vehicleTypeLimit = (params) => {
    const urlGetVehicles = urlVehicles + `?search=${params.search}&type=${params.type}&location=${params.location}&by=${params.by}&order=${params.order}&limit=${params.limit}&page=${params.page}`
    return axios.get(urlGetVehicles)
}

export const vehicleSearchFilter = (urlParams) => {
    return axios.get(urlParams)
}