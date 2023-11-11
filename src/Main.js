import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { fetchUser } from './redux/actions/index'
import { StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FeetScreen from './main/Feed'
import ProfileScreen from './main/Profile'


const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Feet" labeled={false}>
                <Tab.Screen name="Feet" component={FeetScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                }}/>
                  <Tab.Screen name="Add" component={EmptyScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("LGBT - Add");
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),
                }}/>
                  <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                }}/>
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch); 

export default connect(mapStateToProps, mapDispatchProps)(Main);
