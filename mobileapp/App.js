import React, {useEffect, useState, PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';


import Signup from './screens/Signup';
import Imagepicker from './screens/Imagepicker';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  AppRegistry,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signup" component={Signup} />
          
          <Stack.Screen name="Imagepicker" component={Imagepicker} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
