import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, updateEmployeeInfo } from '../actions'
import { Card, CardSection, Button } from './commons'
import { Actions } from 'react-native-router-flux';

class EmployeeEdit extends Component {
    componentDidMount() {
        console.log('EmployeeEdit: value of props is ', this.props);
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress(){
        const{ name, phone, shift } = this.props;
        console.log(name, phone, shift);
        let employee = this.props.employee;
        if (name === employee.name || phone === employee.phone || shift === employee.shift) {
            // change detected.
            console.log('EmployeeEdit: updating employee info')
            employee.name = name;
            employee.phone = phone;
            employee.shift = shift;
            this.props.updateEmployeeInfo(employee)
        } else {
            Actions.pop({ type: 'reset' });
        }
    }

    render() {
        return (
            <Card>
                <EmployeeForm  {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift }
}

export default connect(mapStateToProps, { employeeUpdate, updateEmployeeInfo })(EmployeeEdit);