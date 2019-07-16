import React, {Component} from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate, employeeResetForm} from '../actions';
import {Card, CardSection, Button} from './commons';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
    onButtonPress() {
        const{name, phone, shift} = this.props;
        this.props.employeeCreate({name,phone,shift: shift || 'Monday'})
    }

    componentWillMount(){
        this.props.employeeResetForm();
    }

    render() {
        return(
            <Card>
                <EmployeeForm {...this.props}/>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift}
}

export default connect(mapStateToProps, {employeeUpdate, employeeResetForm, employeeCreate})(EmployeeCreate);

