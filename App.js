import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Logo from './src/components/Logo'
import Background from './src/components/Background'
import firebase from 'firebase'
import { StyleSheet, View, Text } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  //
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen} from './src/screens'
import MainScreen from './src/Main'
import AddScreen from './src/main/Add'

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
              initialRouteName="Navigation"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Navigation" component={StartScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ResetPassword"component={ResetPasswordScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Waibo - Accueil"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Waibo - Accueil" component={MainScreen} />
              <Stack.Screen name="Waibo - Add" component={AddScreen} />
            </Stack.Navigator>
          </NavigationContainer>
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


