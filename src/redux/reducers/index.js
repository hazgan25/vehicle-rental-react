import { ACTION_STRING } from '../actions/actionString'
import { combineReducers } from 'redux'

import authReducer from './auth'
import listVehicleReducer from './listVehicle'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    auth: authReducer,
    listVehicle: listVehicleReducer,
})

const rootReducer = (state, action) => {
    const { logout } = ACTION_STRING
    if (action.type === logout) {
        storage.removeItem('persist:root')
        state = undefined
    }
    return reducers(state, action)
}

export default rootReducer