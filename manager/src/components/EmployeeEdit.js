import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmployeeForm from './EmployeeForm';
import {employeeUpdate} from '../actions'
import {Card, CardSection, Button} from './commons'

class EmployeeEdit extends Component {
    componentDidMount(){
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value});
        });
    }

    onButtonPress(){
        const{ name, phone, shift } = this.props;
        console.log(name, phone, shift);
    }
    render() {
        return(
            <Card>
                <EmployeeForm  {...this.props}/>
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
    return{name, phone, shift}
}

export default connect(mapStateToProps, {employeeUpdate})(EmployeeEdit);