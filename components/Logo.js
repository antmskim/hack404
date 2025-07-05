// components/Logo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../theme/globalStyles'; // Use existing global styles for consistency
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';

/**
 * A simple, reusable static component.
 */
const Logo = () => {
  return (
    <View style={styles.horizontalContainer}>
      <Text style={globalStyles.h1}>
        FishKeeper
        </Text>
      <View style={styles.imagePlaceholder}>
        </View>
    </View>
  );
};

// Optional: Add some specific styles for this component if needed
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
});

export default Logo;
