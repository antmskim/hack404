import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyles from '../theme/globalStyles'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo'; // Import the new Logo component
import ButtonXL from '../components/buttonXL'; // Import the button component
import FishCard from '../components/fishCard'; // Import the fish card component
import NavBar from '../components/navBar'; // Import the navigation bar component

const HomeScreen = () => {
  let currentZone = 3;
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />

        <Text style={globalStyles.h2}>
          You're in Zone {currentZone}
        </Text>
        <View style={styles.map}>
        </View>
        <View style={styles.hugContainer}>
          <View style={styles.buttonRow}>
            <ButtonXL title="Scan catch"/>
            <ButtonXL title="View FishDex"/>
              </View>
          <View style={styles.buttonRow}>
            <ButtonXL title="Track Stats"/>
            <ButtonXL title="Check Zone"/>
            </View>
            </View>
        <View style={globalStyles.container}>
          <Text style={globalStyles.h2}>
            Recent Catches
            </Text>
          <ScrollView 
            horizontal={true}
            contentContainerStyle={styles.cardRow}>
            <FishCard />
            <FishCard />
            <FishCard />
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.navContainer}>
          <NavBar />
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
  map: {
    height: 175,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryAccent.teal, // Fill color placeholder
    borderWidth: 1,
    borderColor: colors.secondaryAccent.teal, // Border color
  },
});

export default HomeScreen;
