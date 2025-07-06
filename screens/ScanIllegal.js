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
import ButtonFillMD from '../components/buttonFillMD.js';
import { Button } from 'react-native/types_generated/index';
import ButtonDanger from '../components/buttonDanger.js';

const ScanIllegal = () => {
  let fishName = "Northern Pike";
  let buttonLabel = "See " + fishName + " Rules";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />
        
        <View style={styles.textContainerTight}>
            <Text style={[globalStyles.h2, { textAlign: 'center' }]}>
                Uh oh! ❌ 
                </Text>
            <Text style={[globalStyles.textBody, { textAlign: 'center' }]}>
                Not a Legal Catch to Keep
                </Text>
            </View>
        
        <View style={styles.scannedContainer}>
            <View style={styles.imagePlaceholder} />
            </View>

        <View style={[styles.textContainer, { gap: spacing.md }]}>
            <Text style={globalStyles.textBody}>
                This Northern Pike doesn’t meet local regulations in your zone and must be released.
                </Text>

            <View style={[styles.textContainerTight, { gap: spacing.sm }]}>
                <View style={styles.textContainerTight}>
                    <Text style={globalStyles.h3}>
                        ⚠ Too Small
                        </Text>
                    <Text style={globalStyles.textBody}>
                        Minimum size in this zone is 61 cm, and your catch is 54 cm
                        </Text>
                    </View>
                <View style={styles.textContainerTight}>
                    <Text style={globalStyles.h3}>
                        ⚠ Daily Limit Reached
                        </Text>
                    <Text style={globalStyles.textBody}>
                        You’ve already logged your maximum of 2 {fishName} over 61 cm today
                        </Text>
                    </View>
                <View style={styles.textContainerTight}>
                    <Text style={globalStyles.h3}>
                        ⚠ Out of Season
                        </Text>
                    <Text style={globalStyles.textBody}>
                        Pike season in Zone 3 opens May 15
                        </Text>
                    </View>
                </View>
            </View>
        <View style={[globalStyles.container, { gap: spacing.xl }]}>
            <View style={styles.horizontalContainer}>
                <ButtonDanger text={buttonLabel} />
                </View>
            <View style={styles.horizontalContainer}>
                <Text style={[globalStyles.textBody, { textAlign: 'center' }]}>
                    Help protect Ontario’s pike population—please release this fish safely.
                    </Text>
                </View>
            </View>
        
        <View style={[globalStyles.container, { gap: spacing.sm }]}>
            <ButtonFillLG showIconPlaceholder={false} backgroundColor={colors.primary.yellow} text="Release and Log"/>
            <ButtonFillLG showIconPlaceholder={false} backgroundColor={colors.primary.blue} text="Scan Another Fish"/>
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