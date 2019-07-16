import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    USER_LOGIN_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/type'

const INITAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
}

export default (state = INITAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case USER_LOGIN_SUCCESS:
            return { ...state, ...INITAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false }
        case LOGIN_USER:
            return { ...state, loading: true, error: '' }
        default:
            return state;
    }
}