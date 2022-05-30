import axios from 'axios'
const urlVehicles = process.env.REACT_APP_HOST + '/vehicles'

export const postVehicle = (body, token) => {
    return axios.post(urlVehicles, body, { headers: { 'x-access-token': token } })
}

export const vehicleDetail = (id) => {
    const urlVehicleDetail = urlVehicles + `/${id}`
    return axios.get(urlVehicleDetail)
}

export const vehicleEdit = (id, body, token) => {
    const urlVehicleEdit = urlVehicles + `/${id}`
    return axios.patch(urlVehicleEdit, body, { headers: { 'x-access-token': token } })
}

export const vehicleDelete = (id, token) => {
    const urlVehicleDelete = urlVehicles + `?id=${id}`
    return axios.delete(urlVehicleDelete, { headers: { 'x-access-token': token } })
}

export const vehicleTypeLimit = (params) => {
    const urlGetVehicles = urlVehicles + `?search=${params.search}&type=${params.type}&location=${params.location}&by=${params.by}&order=${params.order}&limit=${params.limit}&page=${params.page}`
    console.log(urlGetVehicles)
    return axios.get(urlGetVehicles)
}

export const vehicleSearchFilter = (urlParams) => {
    const urlVehicleSearchFilter = urlVehicles + `/${urlParams}`
    return axios.get(urlVehicleSearchFilter)
}

export const vehicleSearchFilterByRenterId = (urlParams, token) => {
    const urlVehicleSearchFilterByRenterId = urlVehicles + `/renter${urlParams}`
    return axios.get(urlVehicleSearchFilterByRenterId, { headers: { 'x-access-token': token } })
}