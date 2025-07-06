import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, TouchableOpacity, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import globalStyles from '../theme/globalStyles';
import { colors } from '../theme/colors.js';
import { spacing } from '../theme/spacing.js';
import { typography } from '../theme/typography.js';
import Logo from '../components/Logo';
import NavBar from '../components/navBar';
import ButtonFillLG from '../components/buttonFillLG.js';
import ButtonOutlineLG from '../components/buttonOutlineLG.js';

const Scan = ({ navigation }) => {
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const takePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const response = await launchCamera(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert('Error', 'Failed to open camera: ' + response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('Photo taken: ', uri);
        setSelectedImageUri(uri);
      } else {
        console.log('No assets found in the response.');
        Alert.alert('Error', 'No photo captured.');
      }
    } catch (error) {
      console.error('Error launching camera:', error);
      Alert.alert('Error', 'An unexpected error occurred while launching camera.');
    }
  };

  const uploadFromGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const response = await launchImageLibrary(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert('Error', 'Failed to open gallery: ' + response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('Image selected: ', uri);
        setSelectedImageUri(uri);
      } else {
        console.log('No assets found in the response.');
        Alert.alert('Error', 'No image selected.');
      }
    } catch (error) {
      console.error('Error launching gallery:', error);
      Alert.alert('Error', 'An unexpected error occurred while launching gallery.');
    }
  };

  async function getFishLegality(imageUri) {
    let base64Image;
    if (Platform.OS === 'ios') {
      base64Image = await RNFS.readFile(imageUri.replace('file://', ''), 'base64');
    } else {
      base64Image = await RNFS.readFile(imageUri, 'base64');
    }
    console.log('Base64 image generated. Length:', base64Image.length);

    const backendEndpoint = 'http://localhost:3000/scan-fish';

    try {
      console.log('Sending image data to backend:', backendEndpoint);
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: base64Image }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backend API error:', error);
      return { legal: null, reason: 'Backend API error' };
    }
  }

  const handleDone = async () => {
    if (!selectedImageUri) return;
    const result = await getFishLegality(selectedImageUri);
    if (result.legal === true) {
      navigation.navigate('ScanLegal', { reason: result.reason, imageUri: selectedImageUri });
    } else if (result.legal === false) {
      navigation.navigate('ScanIllegal', { reason: result.reason, imageUri: selectedImageUri });
    } else {
      Alert.alert('Could not determine legality', result.reason);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <Text style={globalStyles.h2}>Scan Your Fish</Text>
          {selectedImageUri && (
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: colors.secondaryAccent.teal }]}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>Scan</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.scanContainer, selectedImageUri && styles.scanContainerFilled]}>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.scannedImage} />
            ) : (
              <>
                <Text style={[globalStyles.h2, { textAlign: 'center' }]}>
                    📸 Identify Your Fish
                </Text>
                <Text style={[globalStyles.textBody, { textAlign: 'center' }]}>
                    Take a photo or upload an image to identify your catch.
                </Text>
              </>
            )}
        </View>

        <View style={globalStyles.container}>
            <ButtonFillLG text="Take Photo" onPress={takePhoto}/>
            <ButtonOutlineLG text="Upload from Gallery" onPress={uploadFromGallery}/>
        </View>

        </ScrollView>
        <View style={globalStyles.navContainer}>
          <NavBar navigation={navigation} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 356,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1.5,
    borderRadius: 16, 
    borderColor: colors.secondaryAccent.teal,
    overflow: 'hidden',
  },
  scanContainerFilled: {
    padding: 0,
    justifyContent: 'flex-start',
  },
  scannedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  doneButton: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Scan;
