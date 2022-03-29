import { ACTION_STRING } from './actionString'
import { Login, Logout } from '../../modules/utils/auth'
import { userProfile } from '../../modules/utils/user'

const { auth, user, logout } = ACTION_STRING

export const loginAction = (body) => {
    return {
        type: auth,
        payload: Login(body)
    }
}

export const userAction = (token) => {
    return {
        type: user,
        payload: userProfile(token)
    }
}

export const logoutAction = (token) => {
    return {
        type: logout,
        payload: Logout(token)
    }
}