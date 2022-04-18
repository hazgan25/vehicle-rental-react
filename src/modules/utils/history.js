import axios from 'axios'
const ulrHistory = process.env.REACT_APP_HOST + '/history'

export const reservationPayment = (id, token, body) => {
    const urlReserVationHistory = ulrHistory + `/${id}`
    return axios.post(urlReserVationHistory, body, { headers: { 'x-access-token': token } })
}

export const listHistoryUser = (token, urlParams) => {
    return axios.get(urlParams, { headers: { 'x-access-token': token } })
}

export const returnEdit = (token, body, id) => {
    const urlReturnEdit = ulrHistory + `/${id}`
    return axios.patch(urlReturnEdit, body, { headers: { 'x-access-token': token } })
}

export const delHistoryUser = (token, body) => {
    console.log(body)
    return axios.delete(ulrHistory, { headers: { 'x-access-token': token }, data: { 'id': body } })
}