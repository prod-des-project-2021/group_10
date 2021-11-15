/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  PermissionsAndroid,
} from 'react-native';

const example = () => {
  useEffect(() => { 
    requestPermissions();
  })
}



const requestPermissions = async () => {
  try {
    const writeGranted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA
    ],
      {
        title: "permissionit",
        message: "tarvis premikkaa että voi storagetella",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }
    );
  } catch (err) {
    console.warn(err);
  }
}

const App = () => {
  example();
  return (
    <View style={styles.body}>
      <Text style={styles.text}>React native view</Text>
      <Button title="Camera" onPress={() =>
        { NativeModules.MyModule.navigateToNative() }}/> 
      <Button title="console log dir" onPress={() =>
        { NativeModules.MyModule.getPictureDir((token) => {
          console.log("Result ", token) });
        }}/> 
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default App;
