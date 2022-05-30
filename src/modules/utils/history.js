import axios from 'axios'
const ulrHistory = process.env.REACT_APP_HOST + '/history'

export const reservationPayment = (id, token, body) => {
    const urlReserVationHistory = ulrHistory + `/${id}`
    return axios.post(urlReserVationHistory, body, { headers: { 'x-access-token': token } })
}

export const listHistoryUser = (token, urlParams) => {
    const urlListHistoryUser = ulrHistory + `/${urlParams}`
    return axios.get(urlListHistoryUser, { headers: { 'x-access-token': token } })
}

export const listHistoryRenter = (token, urlParams) => {
    const urlListHistoryRenter = ulrHistory + `/renter/${urlParams}`
    return axios.get(urlListHistoryRenter, { headers: { 'x-access-token': token } })
}

export const returnHistory = (token, id) => {
    const urlReturn = ulrHistory + `/${id}`
    return axios.put(urlReturn, '', { headers: { 'x-access-token': token } })
}

export const editHistory = (token, body, id) => {
    const urleditHistory = ulrHistory + `/${id}`
    return axios.patch(urleditHistory, body, { headers: { 'x-access-token': token } })
}

export const delHistoryUser = (token, body) => {
    return axios.delete(ulrHistory, { headers: { 'x-access-token': token }, data: { 'id': body } })
}

export const delHistoryRenter = (token, body) => {
    const urlDelHistoryRenter = ulrHistory + '/renter'
    return axios.delete(urlDelHistoryRenter, { headers: { 'x-access-token': token }, data: { 'id': body } })
}