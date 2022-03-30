import axios from 'axios'
const urlAuth = process.env.REACT_APP_HOST + '/auth'

export const Login = (body) => {
    const urlLogin = urlAuth + '/login'
    return axios.post(urlLogin, body)
}

export const SignUp = (body) => {
    const urlRegister = urlAuth + '/register'
    return axios.post(urlRegister, body)
}

export const verify = (params) => {
    const urlVerify = urlAuth + `/verify/${params.pin}`
    return axios.get(urlVerify)
}

export const Logout = (token) => {
    const urlLogout = urlAuth + '/logout'
    return axios.delete(urlLogout, { headers: { 'x-access-token': token } })
}

export const ForgotPass = (body) => {
    const urlForgotPass = urlAuth + '/forgot/password'
    return axios.post(urlForgotPass, body)
}

export const resetPass = (body) => {
    const urlResetPass = urlAuth + '/reset/password'
    return axios.post(urlResetPass, body)
}