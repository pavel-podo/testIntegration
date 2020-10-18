import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StartScreen } from './src/screens/StartScreen';
import { MainScreen } from './src/screens/MainScreen';
import { AboutScreen} from './src/screens/AboutScreen';
import { SettingScreen} from './src/screens/SettingScreen';
import { Provider } from 'react-redux'
import store from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {

  return (
    /*<View style={styles.container}>
      <Text>hei</Text>
      */
        <NavigationContainer>
          <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false}}  />
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="About" component={AboutScreen} 
            options={{ headerShown: false}} />
          </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      
      /*
    </View>
  */);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
