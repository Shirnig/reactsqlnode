import {combineReducers} from 'redux';
import vacations from './vacations'
import isAuthenticated from "./vacationsAuth";
import usernameAvailable from "./checkUsername";

export default combineReducers({
    vacations,
    isAuthenticated,
    usernameAvailable
})
