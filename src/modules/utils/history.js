import axios from 'axios'
const urlHistory = process.env.REACT_APP_HOST + '/history'

export const reservationPayment = (id, token, body) => {
    const urlReserVationHistory = urlHistory + `/${id}`
    return axios.post(urlReserVationHistory, body, { headers: { 'x-access-token': token } })
}

export const listHistoryUser = (token, urlParams) => {
    const urlListHistoryUser = urlHistory + `/${urlParams}`
    return axios.get(urlListHistoryUser, { headers: { 'x-access-token': token } })
}

export const listHistoryRenter = (token, urlParams) => {
    const urlListHistoryRenter = urlHistory + `/renter/${urlParams}`
    return axios.get(urlListHistoryRenter, { headers: { 'x-access-token': token } })
}

export const returnHistory = (token, id) => {
    const urlReturn = urlHistory + `/${id}`
    return axios.put(urlReturn, '', { headers: { 'x-access-token': token } })
}

export const editHistory = (token, body, id) => {
    const urleditHistory = urlHistory + `/${id}`
    return axios.patch(urleditHistory, body, { headers: { 'x-access-token': token } })
}

export const delHistoryUser = (token, body) => {
    return axios.delete(urlHistory, { headers: { 'x-access-token': token }, data: { 'id': body } })
}

export const delHistoryRenter = (token, body) => {
    const urlDelHistoryRenter = urlHistory + '/renter'
    return axios.delete(urlDelHistoryRenter, { headers: { 'x-access-token': token }, data: { 'id': body } })
}