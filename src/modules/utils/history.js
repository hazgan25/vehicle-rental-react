import axios from 'axios'
const ulrHistory = process.env.REACT_APP_HOST + '/history'

export const reservationPayment = (id, token, body) => {
    const urlReserVationHistory = ulrHistory + `/${id}`
    return axios.post(urlReserVationHistory, body, { headers: { 'x-access-token': token } })
}