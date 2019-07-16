import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, updateEmployeeInfo, employeeDelete } from '../actions'
import { Card, CardSection, Button, Confirm } from './commons';
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';

class EmployeeEdit extends Component {
    state= { showModal: false };

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
    

    onTextPress() {
        const {phone, shift} = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }


    onAccept(){
        const {uid} = this.props.employee;
        this.props.employeeDelete({uid});

        
    };

    onDecline(){
        this.setState({showModal:false});
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
                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to fire this employee?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift }
}

export default connect(mapStateToProps, 
{ employeeUpdate, updateEmployeeInfo, employeeDelete })
(EmployeeEdit);