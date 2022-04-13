import axios from 'axios'
const urlUser = process.env.REACT_APP_HOST + '/users'

export const userProfile = (token) => {
    const urlUserProfile = urlUser + '/profile'
    return axios.get(urlUserProfile, { headers: { 'x-access-token': token } })
}

export const editUserProfile = (body, token) => {
    const urlEditUserProfile = urlUser + '/edit'
    return axios.patch(urlEditUserProfile, body, { headers: { 'x-access-token': token } })
}

export const editPasswordUser = (body, token) => {
    const urlEditPasswordUser = urlUser + '/edit/password'
    return axios.put(urlEditPasswordUser, body, { headers: { 'x-access-token': token } })
}