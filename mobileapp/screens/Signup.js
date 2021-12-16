import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Imagepicker');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [email, password]);

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
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid.');
        }
        if (error.code === 'auth/invalid-password') {
          alert('That password is invalid!');
        }
        // if (error.code) {
        //   alert(error.code);
        // }

        if (error.code === 'auth/weak-password') {
          alert('That password is weak, try a longer one.');
        }
      });
  };

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Succesfully signed in');
        // alert('Succesfully signed in');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password');
        }

        if (error.code === 'auth/user-not-found') {
          alert('That user does not exist');
        }
        // if (error.code) {
        //   alert(error.code);
        // }
      });
  };

  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require('../images/background.png')}
        style={styles.background}>
        <View style={styles.screen}>
          <View style={styles.inputScreen}>
            <TextInput
              style={styles.inputStyle}
              placeholderTextColor={'grey'}
              placeholder="E-mail"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.inputStyle}
              placeholderTextColor={'grey'}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.buttonStyle}>
              <Button
                disabled={buttonDisabled}
                title="Login"
                onPress={handleSignIn}
              />
              {/* <TouchableOpacity>
            <Text>asd</Text>
          </TouchableOpacity> */}
            </View>
            <View style={styles.buttonStyle}>
              <Button
                disabled={buttonDisabled}
                title="Register"
                onPress={handleSignup}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  inputScreen: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    width: 200,
    color: 'black',
  },
  buttonStyle: {
    marginTop: 20,
    width: 200,
    borderRadius: 20,
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  background: {
    width: 1000,
    height: 1000,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Signup;
