import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {employeesFetchSuccess} from '../actions';
import ListItem from './ListItem'



class EmployeeList extends Component {
    componentWillMount(){
        this.props.employeesFetchSuccess();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.employees.length !== this.props.employees.length) {
          this.props.employeesFetchSuccess();
        }
    }

    render() {
        return (
            // <View>
            <FlatList
                data={this.props.employees}
                renderItem={({ item }) => <ListItem employees={item} />}
                keyExtractor={(item) => item.uid}
            />
            // </View>
        );
    }
    
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => 
    ({...val, uid}));

    return {employees};
}
export default connect(mapStateToProps, {employeesFetchSuccess})(EmployeeList);