import {createStore,combineReducers} from 'redux'
import{mainReducer} from './reducers/mainReducer'
const rootReducer = combineReducers({
    mainReducer:mainReducer,
})
export default createStore(rootReducer)