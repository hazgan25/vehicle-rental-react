import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import rpm from 'redux-promise-middleware'
import storage from 'redux-persist/lib/storage'

import rootReducers from './reducers'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth']
}

const pReducers = persistReducer(persistConfig, rootReducers)
const enchancers = applyMiddleware(rpm, logger)
export const store = createStore(pReducers, enchancers)
export const pStore = persistStore(store)