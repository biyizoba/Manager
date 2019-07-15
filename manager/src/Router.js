import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" hideNavBar>

                <Scene key="auth" titleStyle={{ textAlign: 'center', flex: 1 }} initial>
                    <Scene key="login" component={LoginForm} title="Login" />
                </Scene>

                <Scene key="main" >
                    <Scene
                        rightTitle="+"
                        onRight={() => Actions.employeeCreate()}
                        key="employeeList"
                        component={EmployeeList}
                        title="Employees"
                        initial
                    />
                    <Scene
                        key="employeeCreate"
                        component={EmployeeCreate}
                        title="Create Employee"
                    />
                    <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee"/>
                </Scene>

            </Scene>
        </Router>
    );
};

export default RouterComponent;