import React, {useState, useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import {Headline, Paragraph, Button, TouchableRipple} from 'react-native-paper';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

const Camera = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const ref = useRef();

  async function takePicture() {
    setLoader(true);
    const options = {base64: true, fixOrientation: true, writeExif: true};
    const data = await ref.current.takePictureAsync(options);
    console.log(data.uri, 'data');
    const newImages = [...images];
    newImages.push({uri: data.uri});
    setImages(newImages);
    setLoader(false);
  }

  return (
    <View>
      <RNCamera
        ref={ref}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        useNativeZoom={true}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <Text>Camera is not Ready yet</Text>;
          return (
            <View>
              <TouchableRipple
                borderless
                onPress={takePicture}
                style={styles.capture}>
                {loader ? (
                  <ActivityIndicator color="black" size={60} />
                ) : (
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 100,
                      width: 60,
                      height: 60,
                    }}
                  />
                )}
              </TouchableRipple>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default Camera;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    alignSelf: 'center',
  },
});
