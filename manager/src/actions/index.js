import firebase from 'firebase'
import { EMAIL_CHANGED, LOGIN_USER, 
PASSWORD_CHANGED,LOGIN_USER_FAIL, USER_LOGIN_SUCCESS} from "./type";

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER});

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch (() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch));
        });
    }    
}

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL});
}

const loginUserSuccess = (dispatch, user) => {
    dispatch ({
        type: USER_LOGIN_SUCCESS,
        payload: user
    })
}