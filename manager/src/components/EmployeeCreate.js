import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate} from '../actions';
import {Card, CardSection, Input, Button} from './commons';

class EmployeeCreate extends Component {
    onButtonPress() {
        const{name, phone, shift} = this.props;

        this.props.employeeCreate({name,phone,shift: shift || 'Monday'})
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input 
                        label="Name"
                        placeholder="Chris"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({prop: 'name', value})}
                    />
                </CardSection>

                <CardSection>   
                    <Input 
                        label="Phone"
                        placeholder="111-111-1111"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({prop: 'phone', value})}
                    />  
                </CardSection>

                <CardSection style={{ padding:13}}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <View style={{flex:2, paddingLeft:85}}>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.shift}
                        onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value:day })}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                    </View>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles= {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
}

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift}
}

export default connect(mapStateToProps, {employeeUpdate, employeeCreate})(EmployeeCreate);

