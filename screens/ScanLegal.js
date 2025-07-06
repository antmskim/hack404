import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import globalStyles from '../theme/globalStyles'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo'; // Import the new Logo component
import NavBar from '../components/navBar'; // Import the navigation bar component
import ButtonFillLG from '../components/buttonFillLG.js'; // Import the large button component
import ButtonOutlineLG from '../components/buttonOutlineLG.js'; // Import the outline button component



import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanLegal = ({ route, navigation }) => {
    const { reason, imageUri } = route.params;
    
    // Extract fish name from the reason
    const fishNameMatch = reason.match(/legal to keep (a|an) (.*?) in/);
    const fishName = fishNameMatch ? fishNameMatch[2] : "Unknown Fish";

    const saveToFishDex = async () => {
        try {
            const newFish = { imageUri, reason, timestamp: new Date().toISOString() };
            const existingFish = await AsyncStorage.getItem('fishDex');
            const fishDex = existingFish ? JSON.parse(existingFish) : [];
            fishDex.push(newFish);
            await AsyncStorage.setItem('fishDex', JSON.stringify(fishDex));
            Alert.alert('Success', 'Fish added to FishDex!');
            navigation.navigate('Dex'); // Navigate to Dex screen after saving
        } catch (e) {
            console.error('Failed to save fish to FishDex', e);
            Alert.alert('Error', 'Failed to add fish to FishDex.');
        }
    };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />
        
        <Text style={[globalStyles.h2, { textAlign: 'center' }]}>
            Great Catch! ✅
            </Text>
        
        <View style={styles.scannedContainer}>
            <Image source={{ uri: imageUri }} style={styles.scannedImage} />
        </View>

        <View style={[styles.textContainer, { gap: spacing.md }]}>
            <Text style={globalStyles.textBody}>
                {reason}
            </Text>
        </View>
        
        <View style={[globalStyles.container, { gap: spacing.sm }]}>
            <ButtonFillLG showIconPlaceholder={false} backgroundColor={colors.primary.yellow} text="Add to FishDex" onPress={saveToFishDex}/>
            <ButtonFillLG showIconPlaceholder={false} backgroundColor={colors.primary.blue} text="Scan Another Fish" onPress={() => navigation.navigate('Scan')}/>
        </View>

        </ScrollView>
        <View style={globalStyles.navContainer}>
          <NavBar />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainerTight: {
    flex: 1
  },
  textContainer: {
    gap: spacing.sm,
    flex: 1,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral.darkGrey,
  },
  scannedContainer: {
    flex: 1,
    overflow: 'hidden',
    height: 224,
    borderWidth: 1.5,
    borderRadius: 16, 
    borderColor: colors.secondaryAccent.teal,
    position: 'relative',
    backgroundColor: colors.neutral.darkGrey,
  },
  scannedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    gap: spacing.sm,
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // ← This centers horizontally
    alignItems: 'center',    // ← This centers vertically (if needed)
    width: '100%',           // ← Ensures full width for proper centering
    marginVertical: spacing.md, // Optional: Add vertical spacing
    },
});

export default ScanLegal;