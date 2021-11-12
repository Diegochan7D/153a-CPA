import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import anonymous1 from '../assets/anonymous1.jpg';
import anonymous2 from '../assets/anonymous2.png';


//Pick a photo from user's mobile phone
  const PhotoId = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }
      setSelectedImage({ localUri: pickerResult.uri });

    };

    //click to select photo
    let selectPhotoButton = <Button
       title={"Set Your Photo"}
       color="blue"
       onPress = {() => {
         openImagePickerAsync()
       }}
     />

     //If the selectedImage is null, use default photo
     if (selectedImage !== null) {
      return (
          <View style={styles.container}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.thumbnail}
            />
            {selectPhotoButton}
          </View>
        );
      }
      return (
        <View style = {styles.container}>
          <Image source = {require('../assets/anonymous1.jpg')}
          style={styles.thumbnail}
          />
        {selectPhotoButton}
        </View>
      );

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding:20

    },
    button: {
      backgroundColor: 'blue',
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
    thumbnail: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
      borderColor: 'black',
      borderWidth: 1
    },
  });



  export default PhotoId;
