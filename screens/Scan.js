import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import globalStyles from '../theme/globalStyles'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo'; // Import the new Logo component
import NavBar from '../components/navBar'; // Import the navigation bar component
import ButtonFillLG from '../components/buttonFillLG.js'; // Import the large button component
import ButtonOutlineLG from '../components/buttonOutlineLG.js'; // Import the outline button component

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />
        
        <Text style={globalStyles.h2}>
            Scan Your Fish
            </Text>
        
        <View style={[styles.scanContainer, selectedImageUri && styles.scanContainerFilled]}>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.scannedImage} />
            ) : (
              <>
                <View style={styles.iconPlaceholder} />
                <Text style={[globalStyles.h2, { textAlign: 'center' }]}>
                    Identify Your Fish
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
  iconPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: colors.neutral.darkGrey,
  },
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
    overflow: 'hidden', // Clip content that overflows
  },
  scanContainerFilled: {
    padding: 0, // Remove padding when filled
    justifyContent: 'flex-start', // Align image to top
  },
  scannedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover', // Cover the entire area
  },
  textContainer: {
    gap: spacing.sm,
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  imagePlaceholder: {
    width: 36, 
    height: 36, 
    backgroundColor: colors.neutral.darkGrey, 
  },
});

export default Scan;