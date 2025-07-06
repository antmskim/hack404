import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyles from '../theme/globalStyles.js'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo.js'; // Import the new Logo component
import ButtonXL from '../components/buttonXL.js'; // Import the button component
import FishCard from '../components/fishCard.js'; // Import the fish card component
import NavBar from '../components/navBar.js'; // Import the navigation bar component

const Dex = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />

        <Text style={globalStyles.h2}>
          My FishDex
        </Text>

        <View style={[globalStyles.container, { gap : spacing.lg }]}>
            <View style={styles.horizontalContainer}>
              <FishCard />
              <FishCard />
              </View>
            <View style={styles.horizontalContainer}>
              <FishCard />
              <FishCard />
              </View>
            <View style={styles.horizontalContainer}>
              <FishCard />
              <FishCard />
              </View>
          </View>
        </ScrollView>
        <View style={styles.navContainer}>
          <NavBar navigation={navigation} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999, // Ensure the nav bar is above other content
  },
  cardRow: {
    flexDirection: 'row',
    overflow: 'visible',
    gap: spacing.sm,
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
  horizontalContainer: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
  },
});

export default Dex;
