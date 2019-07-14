import firebase from 'firebase';
import { 
    EMPLOYEE_UPDATE, 
    EMPLOYEE_CREATE, 
    FETCH_EMPLOYEES_SUCCESSFUL, 
    FETCHING_EMPLOYEES, 
    FETCHING_EMPLOYEES_FAILED 
} from './type';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
}

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE })
                Actions.pop({ type: 'reset' })
            });
    };
};

export const fetchEmployeesForUser = () => {
    const currentUser  = firebase.auth().currentUser;
    return (dispatch) => {
        dispatch({ type: FETCHING_EMPLOYEES })
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                let employees = [];
                if (snapshot && snapshot.val()) {
                    let data = snapshot.val();
                    // loop thru json object and update employees array.
                    for(var i in data) {
                        let employee = data[i];
                        employee.id = i;
                        employees.push(employee);
                    }
                }
                dispatch({ type: FETCH_EMPLOYEES_SUCCESSFUL, payload: employees });
            })
            // .catch((error) => { //apparently you can't call catch() with a on() cos on() is a subscription.
            //     console.log('EmployeeActions: error caught => ', error);
            //     dispatch({ type: FETCHING_EMPLOYEES_FAILED, payload: error.message });
            // });
    };
}
