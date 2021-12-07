import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Succesfully logged in!</Text>
      {/* <Image
        style={styles.image}
        source={{uri: 'http://via.placeholder.com/300'}}
      /> */}
      <View style={styles.buttonView}>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.text}>Camera</Text>
        </Button>
        <Button style={styles.button}>
          <Text style={styles.text}>Delete</Text>
        </Button>
        <Button style={styles.button}>
          <Text style={styles.text}>Open</Text>
        </Button>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    // backgroundColor: 'yellow',
    marginBottom: 35,
  },

  loginText: {
    fontSize: 40,
    color: 'blue',
  },

  button: {
    backgroundColor: 'darkblue',
    width: '30%',
    borderRadius: 10,
    justifyContent: 'space-between',
    // elevation: 10,
    // alignSelf: 'center',
    padding: 5,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    color: 'white',
  },
  image: {
    width: '100%',
    height: '95%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
});
