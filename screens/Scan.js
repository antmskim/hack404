import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyles from '../theme/globalStyles'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo'; // Import the new Logo component
import NavBar from '../components/navBar'; // Import the navigation bar component
import ButtonFillLG from '../components/buttonFillLG.js'; // Import the large button component
import ButtonOutlineLG from '../components/buttonOutlineLG.js'; // Import the outline button component

const Scan = () => {

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />
        
        <Text style={globalStyles.h2}>
            Scan Your Fish
            </Text>
        
        <View style={styles.scanContainer}>
            <View style={styles.iconPlaceholder} />
            <Text style={[globalStyles.h2, { textAlign: 'center' }]}>
                Identify Your Fish
                </Text>
            <Text style={[globalStyles.textBody, { textAlign: 'center' }]}>
                Take a photo or upload an image to identify your catch.
                </Text>
            </View>

        <View style={globalStyles.container}>
            <ButtonFillLG text="Take Photo"/>
            <ButtonOutlineLG text="Upload from Gallery"/>
        </View>

        </ScrollView>
        <View style={globalStyles.navContainer}>
          <NavBar />
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