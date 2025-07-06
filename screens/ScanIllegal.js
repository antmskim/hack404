import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import globalStyles from '../theme/globalStyles'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo'; // Import the new Logo component
import NavBar from '../components/navBar'; // Import the navigation bar component
import ButtonFillLG from '../components/buttonFillLG.js'; // Import the large button component




const ScanIllegal = ({ route, navigation }) => {
  const { reason, imageUri } = route.params;

  // Extract fish name from the reason
  const fishNameMatch = reason.match(/illegal to keep (a|an) (.*?) in/);
  const fishName = fishNameMatch ? fishNameMatch[2] : "Unknown Fish";
  let buttonLabel = "See " + fishName + " Rules";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />
        
        <View style={styles.textContainerTight}>
            
            <Text style={[globalStyles.textBody, { textAlign: 'center' }]}>
                Not a Legal Catch to Keep
                </Text>
            </View>
        
        <View style={styles.scannedContainer}>
            <Image source={{ uri: imageUri }} style={styles.scannedImage} />
        </View>

        <View style={[styles.textContainer, { gap: spacing.md }]}>
            <Text style={globalStyles.textBody}>
                {reason}
            </Text>

            
            </View>
        

        <View style={[globalStyles.container, { gap: spacing.sm }]}>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', // ← This centers horizontally
    alignItems: 'center',    // ← This centers vertically (if needed)
    width: '100%',           // ← Ensures full width for proper centering
    },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.md,
  },
  hugContainer: {
    alignSelf: 'flex-start',
    flexShrink: 1,
    flexGrow: 0,
    gap: spacing.md,
  },
});

export default ScanIllegal;