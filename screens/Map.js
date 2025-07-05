import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import globalStyles from '../theme/globalStyles'; // Import global styles
import { colors } from '../theme/colors.js'; // Import colors
import { spacing } from '../theme/spacing.js'; // Import spacing
import { typography } from '../theme/typography.js'; // Import typography
import Logo from '../components/Logo'; // Import the new Logo component
import NavBar from '../components/navBar'; // Import the navigation bar component
import { currentZone } from '../screens/HomeScreen.js';

const Map = () => {
  let currentLocation = "Port Severn";
  let currentZone = 4; // temp; should be same as homescreen 

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />

        <View style={globalStyles.container}>
            <View style={styles.horizontalContainer}>
                <Text style={globalStyles.h2}> 
                    📍
                    </Text>
                <Text style={globalStyles.h2}>
                    {currentLocation}
                    </Text>
                </View>
            
            <View style={styles.map}>
                </View>
        </View>

        <View style={globalStyles.container}>
            <Text style={globalStyles.h2}>
                You're in Zone {currentZone} ✅
                </Text>
            <Text style={globalStyles.textBody}>
                In Zone {currentZone}, familiar species like walleye, bass, pike, and trout are regulated closely. Here's what you need to know before you cast:
                Walleye & sauger: Max of 4/day, with only 1 allowed over 46 cm
                Largemouth & smallmouth bass: Up to 6, each must be ≥ 35 cm
                Northern pike: Up to 6 daily (no more than 2 over 61 cm, and only 1 over 86 cm)
                Muskellunge: 1 per day, and must be > 91 cm
                Yellow perch: Up to 50, each must be ≥ 25 cm
                Black & white crappie: Up to 30, all must be ≥ 25 cm
                Sunfish: Up to 50, each must be ≥ 15 cm
                Brook/brown/rainbow trout: Brook (5, 30 cm max one), Brown (5, 55 cm max one), Rainbow (5, 55 cm max one)
                Lake trout: Up to 3/day, but only 1 between 33–40 cm (rest outside this range)
                </Text>
            </View>
        </ScrollView>
        <View style={globalStyles.navContainer}>
          <NavBar />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  map: {
    width: '100%',
    height: 440,
    backgroundColor: colors.neutral.darkGrey,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.secondaryAccent.teal,
  }
});

export default Map;