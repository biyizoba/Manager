import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './commons';
 
class ListItem extends Component {
    render() {
        const { name } = this.props.employee;

        return (
            <View>
                <CardSection>
                    <Text style={styles.titleStyles}>
                        {name}
                    </Text>
                </CardSection>
            </View>
        );
    };
};
 
const styles = {
  titleStyles: {
    fontSize: 18,
    paddingLeft: 15,
  }
}
 
export default ListItem;