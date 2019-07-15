import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchEmployeesForUser, employeeCreate } from '../actions';
import ListItem from './ListItem';
import {CardSection, Card, Button } from './commons';
import { Actions } from 'react-native-router-flux';





class EmployeeList extends Component {
    onPressButton() {
        Actions.employeeEdit({employee: this.props.employee});
    }

    componentDidMount() {
        this.props.fetchEmployeesForUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.employees.length !== this.props.employees.length) {
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

    renderListItem = (item) => {
        console.log('EmployeeList: renderListItem item is ', item);
        return (
            <Card>
                <TouchableHighlight onPress={() => alert(item.name + " works on " + item.shift + ", you can reach him on " + item.phone)}>
                    <ListItem employee={item} />
                </TouchableHighlight>
                <CardSection>
                    <Button onPress={this.onPressButton.bind(this)}>
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

export default connect(mapStateToProps, { fetchEmployeesForUser, employeeCreate})(EmployeeList);