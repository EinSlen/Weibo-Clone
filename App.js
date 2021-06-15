import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Logo from './src/components/Logo'
import firebase from 'firebase'
import { StyleSheet, View, Text } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBg67fTOeGJWvPBub9g7OYXrN4COIiZmyI",
  authDomain: "lgbtapp-34045.firebaseapp.com",
  projectId: "lgbtapp-34045",
  storageBucket: "lgbtapp-34045.appspot.com",
  messagingSenderId: "74881801169",
  appId: "1:74881801169:web:31b25448bb0781a6941ef0",
  measurementId: "G-MX35EGF456"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from './src/screens'
import MainScreen from './src/Main'
import Background from './src/components/Background'

const Stack = createStackNavigator()

export class App extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <Background>
          <Logo />
            <View style={styles.view}>
              <Text>Chargement...</Text>
            </View>
        </Background>
      )
    }
    if(!loggedIn) {
      return (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="LGBT - Navigation"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="LGBT - Navigation" component={StartScreen} />
              <Stack.Screen name="LGBT - Login" component={LoginScreen} />
              <Stack.Screen name="LGBT - Register" component={RegisterScreen} />
              <Stack.Screen name="LGBT - ResetPassword"component={ResetPasswordScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App


