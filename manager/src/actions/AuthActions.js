import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    LOGIN_USER,
    PASSWORD_CHANGED,
    LOGIN_USER_FAIL,
    USER_LOGIN_SUCCESS
} from "./type";

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

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        loginInProgress(dispatch);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                console.log('Error from loginUser function is ', error);
                if (error.code === "auth/network-request-failed") { // network error
                    // example of how to provide your own custom error message.
                    // how to test, uncomment line 37, turn off the network on your emulator
                    // try to login.
                    error.message = 'We are having issues connecting to the internet, please ensure your device is connected and try again.';
                    loginUserFail(dispatch, error.message);
                } else if (error.code === "auth/user-not-found") {
                    //todo - would be probably smart not to automatically call 
                    // firebase.auth().createUserWithEmailAndPassword(email, password) 
                    // everytime this error happens
                    // refactor this to maybe navigate to sign up screen?

                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(user => loginUserSuccess(dispatch, user))
                        .catch((error) => loginUserFail(dispatch, error.message));
                } else {
                    loginUserFail(dispatch, error.message);
                }
            });
    }
}

// emmergency push already reactnative to the cloud attack!!!! smh omg shallom!

const loginUserFail = (dispatch, errorMessage) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: errorMessage });
}
const loginInProgress = (dispatch) => {
    dispatch({ type: LOGIN_USER });
}
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user
    });

    Actions.main();
}