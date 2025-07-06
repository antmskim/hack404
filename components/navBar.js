import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const NavBar = () => {
  const navigation = useNavigation();
  const navItems = [
    {
      label: "Home",
      left: 27,
    },
    {
      label: "Zone",
      left: 89,
    },
    {
      label: "FishDex",
      left: 269,
    },
    {
      label: "Profile",
      left: 336,
    },
  ];

  return (
    <View style={styles.container} accessibilityLabel="Main navigation">
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.navItem, { left: item.left }]}
          accessibilityLabel={item.label}
          onPress={() => {
            if (item.label === "Home") {
              navigation.navigate('Home');
            }
          }}
        >
          {/* Icon placeholder - simple colored square */}
          <View style={styles.iconPlaceholder} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity 
        style={styles.scanButton}
        accessibilityLabel="Scan"
        onPress={() => navigation.navigate('Scan')}
      >
        {/* Scan icon placeholder - circle with different color */}
        <View style={styles.scanIconPlaceholder} />
        <Text style={styles.scanLabel}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: 402,
    height: 99,
    position: 'absolute',
    backgroundColor: colors.secondaryAccent.teal,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
  },
  navItem: {
    position: 'absolute',
    top: 19,
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 42,
    height: 42,
    backgroundColor: colors.secondary.green, // Different color for visibility
    borderRadius: 8, // Slightly rounded corners
  },
  label: {
    position: 'absolute',
    top: 51,
    color: colors.neutral.white,
    ...typography.bodySmall,
  },
  scanButton: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: -23,
    left: 152,
    backgroundColor: colors.secondaryAccent.teal, 
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.secondary.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIconPlaceholder: {
    width: 55,
    height: 55,
    backgroundColor: colors.secondaryAccent.purple, // Distinct color
    borderRadius: 27.5, // Circle
    marginBottom: 5,
  },
  scanLabel: {
    color: colors.neutral.white,
    ...typography.bodySmall,
  },
});

export default NavBar;