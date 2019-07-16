import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchEmployeesForUser, employeeCreate, employeeResetForm } from '../actions';
import ListItem from './ListItem';
import {CardSection, Card, Button } from './commons';
import { Actions } from 'react-native-router-flux';

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton(employee) {
        Actions.employeeEdit({ employee: employee });
    }

    componentDidMount() {
        this.props.fetchEmployeesForUser();
        this.props.employeeResetForm();
        // this.props.setEmployeee('name', '')
        // this.props.setEmployeee('phone', '')
        // this.props.setEmployeee('shift', '')
    }

    componentDidUpdate(prevProps) {
        if (prevProps.employees.length !== this.props.employees.length) {
            console.log('EmployeeList: componentDidUpdate employee props don\'t match ', this.props.employees);
            this.props.fetchEmployeesForUser();
        }
    }

    render() {
        console.log('EmployeeList: employees list is ', this.props.employees);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                {/* {this.props.loading ? <ActivityIndicator size={'large'} /> : */}
                <FlatList
                    refreshing={this.props.loading}
                    onRefresh={() => this.props.fetchEmployeesForUser()}
                    data={this.props.employees}
                    renderItem={({ item }) => this.renderListItem(item)}
                    keyExtractor={(item, index) => item.id}
                    ListEmptyComponent={() => this.renderEmptyList()}
                />
                {/* } */}
            </View>
        );
    }

    renderListItem = (employee) => {
        console.log('EmployeeList: renderListItem employee is ', employee);
        return (
            <Card>
                <TouchableHighlight onPress={() => alert(employee.name + " works on " + employee.shift + ", you can reach him on " + employee.phone)}>
                    <ListItem employee={employee} />
                </TouchableHighlight>
                <CardSection>
                    <Button onPress={() => this.onPressButton(employee)}>
                        Edit
                     </Button>
                </CardSection>

            </Card>
        )
    }

    renderEmptyList = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Employees found.</Text>
        </View>
    )
}

const mapStateToProps = ({ employeeList }) => {
    const { employees, loading, error } = employeeList;
    return { employees, loading, error };
}

export default connect(mapStateToProps, { fetchEmployeesForUser, employeeCreate, employeeResetForm})(EmployeeList);