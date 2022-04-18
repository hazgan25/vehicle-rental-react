import axios from 'axios'
const ulrHistory = process.env.REACT_APP_HOST + '/history'

export const reservationPayment = (id, token, body) => {
    const urlReserVationHistory = ulrHistory + `/${id}`
    return axios.post(urlReserVationHistory, body, { headers: { 'x-access-token': token } })
}

export const listHistoryUser = (token, urlParams) => {
    return axios.get(urlParams, { headers: { 'x-access-token': token } })
}

export const listHistoryRenter = (token, params) => {
    const ulrHistoryRenter = ulrHistory + `/renter?search=${params.search}&by=${params.by}&order=${params.order}&limit=3&page=${params.page}`
    return axios.get(ulrHistoryRenter, { headers: { 'x-access-token': token } })
}

export const returnEdit = (token, body, id) => {
    const urlReturnEdit = ulrHistory + `/${id}`
    return axios.patch(urlReturnEdit, body, { headers: { 'x-access-token': token } })
}

export const delHistoryUser = (token, body) => {
    return axios.delete(ulrHistory, { headers: { 'x-access-token': token }, data: { 'id': body } })
}

export const delHistoryRenter = (token, body) => {
    const urlDelHistoryRenter = ulrHistory + '/renter'
    return axios.delete(urlDelHistoryRenter, { headers: { 'x-access-token': token }, data: { 'id': body } })
}