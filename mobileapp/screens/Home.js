import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Headline,
  Paragraph,
  Button,
  TouchableOpacity,
} from 'react-native-paper';
import Camera from './camera';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: 'http://via.placeholder.com/300'}}
      />
      <View style={{flexDirection: 'row'}}>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'yellow',
  },
  button: {
    backgroundColor: 'darkblue',
    width: '30%',
    borderRadius: 10,
    elevation: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
  image: {
    width: 300,
    height: 500,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
});
