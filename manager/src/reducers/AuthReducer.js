import {EMAIL_CHANGED, PASSWORD_CHANGED,
USER_LOGIN_SUCCESS,
LOGIN_USER_FAIL} from '../actions/type'



const INITAL_STATE = {email: '', password: '', user: null, error: ''}

export default (state= INITAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case USER_LOGIN_SUCCESS:
            return {...state, user:action.payload, error: '' };
        case LOGIN_USER_FAIL:
            return {...state, error: 'Authentication Failed.', password: ''}
        default:
            return state;
    }
}