import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Imagepicker');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignup = () => {
    if (email === null || password === null) {
      alert('Please fill up both fields');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        alert('User created');
      })
      .catch(error => {
        alert(error.message);

        console.error(error);
      });
  };

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Succesfully signed in');
        alert('Succesfully signed in');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputScreen}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your email here"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your password here"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.buttonStyle}>
          <Button title="Login" onPress={handleSignIn} />
          {/* <TouchableOpacity>
            <Text>asd</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.buttonStyle}>
          <Button title="Register" onPress={handleSignup} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputScreen: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
    elevation: 5,
    borderRadius: 20,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    width: 200,
  },
  buttonStyle: {
    marginTop: 20,
    width: 200,
    borderRadius: 20,
  },
});

export default Signup;
