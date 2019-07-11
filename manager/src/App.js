import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers'
import LoginForm from './components/LoginForm'

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyDTk2GNegn0Qgl54Um73lyIYJNtYd_bNfc",
            authDomain: "employees-28bf2.firebaseapp.com",
            databaseURL: "https://employees-28bf2.firebaseio.com",
            projectId: "employees-28bf2",
            storageBucket: "",
            messagingSenderId: "957258099869",
            appId: "1:957258099869:web:924e120c33d93c01"
        };

        if (!firebase.apps.length) {
        firebase.initializeApp(config);
        }
    }
    
    render() {
        const store=createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return(
        <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;