import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CardSection } from './commons';

const ListItem = (props) => {
    console.log('ListItem: props is ', props);
    const { name, phone, shift } = props.employee;
    return (
        <View>
            <CardSection>
                <Text style={styles.titleStyles}>
                    {name}
                </Text>
            </CardSection>
        </View>
    );
}
const styles = StyleSheet.create({
    titleStyles: {
        fontSize: 18,
        paddingLeft: 15,
        color: '#000',
        fontWeight: 'bold'
    }
});

export default ListItem;