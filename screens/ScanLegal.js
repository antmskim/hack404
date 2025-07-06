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

const ScanLegal = () => {
    let fishName = "Largemouth Bass";

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
            <View style={styles.imagePlaceholder} />
            </View>

        <View style={[styles.textContainer, { gap: spacing.md }]}>
            <Text style={globalStyles.textBody}>
                This catch is legal and safe to keep based on your current zone and the species’ size, season, and limits.
                </Text>

            <View style={styles.textContainerTight}>
                <Text style={globalStyles.textBody}>
                    ✔ In Season
                    </Text>
                <Text style={globalStyles.textBody}>
                    ✔ Meets Size Requirements
                    </Text>
                <Text style={globalStyles.textBody}>
                    ✔ Within Your Daily Limit
                    </Text>
            </View>
        </View>
        
        <View style={[styles.textContainer, { gap: spacing.md }]}>
            <Text style={[globalStyles.h2, { textDecorationLine: 'underline' }]}>
                {fishName}
                </Text>
            <Text style={globalStyles.textBody}>
                You’ve caught a {fishName}! Known for its powerful fight and wide mouth, this popular freshwater fish thrives in warm, weedy lakes.
                </Text>
            <View style={styles.textContainerTight}>
                <Text style={globalStyles.h3}>
                    📏 Size Limits
                    </Text>
                <Text style={globalStyles.textBody}>
                    Minimum size: 35 cm (13.8 in) — any bass must meet or exceed this length to be kept
                    </Text>
                </View>
            <View style={styles.textContainerTight}>
                <Text style={globalStyles.h3}>
                    🗓️ Season Dates
                    </Text>
                <Text style={globalStyles.textBody}>
                    Open season for harvest: All year{"\n"}
                    Special early-season rules (Jan 1–May 10):{"\n"}
                    Catch-and-release only during this period — no harvesting allowed{"\n"}
                    </Text>
                </View>
            <View style={styles.textContainerTight}>
                <Text style={globalStyles.h3}>
                    🎣 Daily & Possession Limits
                    </Text>
                <Text style={globalStyles.textBody}>
                    Annual catch limit: Up to 6 bass per person{"\n"}
                    Possession limit: No more than 2 bass over 35 cm at any time{"\n"}
                    </Text>
                </View>
            <View style={styles.horizontalContainer}>
                <ButtonFillMD text="Add to FishDex 🎴" />
                </View>
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
    flexDirection: 'row',
    justifyContent: 'center', // ← This centers horizontally
    alignItems: 'center',    // ← This centers vertically (if needed)
    width: '100%',           // ← Ensures full width for proper centering
    marginVertical: spacing.md, // Optional: Add vertical spacing
    },
});

export default ScanLegal;