import React, {useState} from 'react';
// import RNFS from 'react-native-fs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Imagepicker = ({navigation}) => {
  const [image, setImage] = useState('https://via.placeholder.com/150');
  // const [uploading, setUploading] = useState(false);
  // const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 1200,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        const imageUri = image.path;
        setImage(imageUri);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        const imageUri = image.path;
        setImage(imageUri);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Signup');
        alert('logged out');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const upLoadImage = async () => {
    const uploadUri = image;
    let strp = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    let filename = auth().currentUser.uid + '/' + strp;
    // console.log(filename);
    const storageRef = storage().ref(filename);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      Alert.alert('Image uploaded successfully');
      return url;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const writeData = async () => {
    const imageUrl = await upLoadImage();
    console.log(imageUrl);
    const uid = auth().currentUser.uid;
    const created_at = firebase.firestore.FieldValue.serverTimestamp();
    firestore()
      .collection(uid)
      .add({
        createdAt: created_at,
        url: imageUrl,
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Logged in as: {auth().currentUser.email}</Text>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity onPress={takePhotoFromCamera}>
            <Text style={styles.text}>CAMERA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <Text style={styles.text}>GALLERY</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={writeData}>
            <Text style={styles.text}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.logOut}>
        <TouchableOpacity onPress={logoutHandler}>
          <Text style={styles.text}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Imagepicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 100,
  },
  text: {
    color: 'white',
    fontFamily: 'Helvet',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: 50,
    flexDirection: 'row',
  },
  logOut: {
    flexDirection: 'row',
    flex: 0,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2396f1',
  },
  login: {
    marginBottom: 20,
    color: 'black',
  },

  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width * 0.75,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  button: {
    width: 100,
    marginHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#2396f1',
    padding: 10,
    borderRadius: 10,
  },
});
