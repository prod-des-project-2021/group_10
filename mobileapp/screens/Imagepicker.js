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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Imagepicker = ({navigation}) => {
  const [image, setImage] = useState(
    'https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

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
    setUploading(true);
    setTransferred(0);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
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
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require('../images/background.png')}
        style={styles.background}>
        <View style={styles.container}>
          {/* <Text style={styles.login}>
            Logged in as: {auth().currentUser.email}
          </Text> */}
          {uploading ? (
            <View>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View />
          )}

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
              {/* <Text style={styles.text}>LOG OUT</Text> */}
              <Image
                style={styles.logoutImage}
                source={require('../images/logout.png')}
                rotation={180}
                onPress={logoutHandler}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Imagepicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Helvet',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  logOut: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
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
  logoutImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  button: {
    width: 100,
    marginHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#2396f1',
    padding: 10,
    borderRadius: 10,
    // marginVertical: 10,
  },
  background: {
    width: 1000,
    height: 1000,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
