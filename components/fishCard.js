import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../theme/globalStyles'; 
import { colors } from '../theme/colors'; // Assuming you have a colors file
import { spacing } from '../theme/spacing'; // Assuming you have a spacing file
import { typography } from '../theme/typography'; // Assuming you have a typography file

const Collectible = () => {
  return (
    <View style={styles.card}>
        {/* Badge and Title Row */}
        <View style={styles.titleContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Basic</Text>
          </View>
          <Text style={styles.fishName}>Fish Name</Text>
        </View>

        <View style={styles.cardContent}>
          {/* Description */}
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            porta finibus massa ut sodales.
          </Text>

          {/* Image Placeholder */}
          <View style={styles.imagePlaceholder} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 136,
    flexDirection: 'column',
    backgroundColor: colors.secondary.green,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.secondaryAccent.teal,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  cardContent: {
    paddingTop: spacing.sm,
    gap: spacing.xs,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryAccent.purple,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: spacing.xs,
  },
  badgeText: {
    fontFamily: typography.body,
    fontSize: 8,
    color: colors.neutral.white,
    textAlign: 'center',
    lineHeight: 12,
  },
  fishName: {
    ...typography.body,
    color: colors.neutral.black,
  },
  description: {
    width: '100%',
    fontFamily: typography.primary,
    fontSize: 8,
    color: colors.black,
    lineHeight: 12,
    marginVertical: spacing.xs,
  },
  imagePlaceholder: {
    width: 100,
    height: 72,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: colors.neutral.darkGrey,
    borderColor: colors.secondaryAccent.purple,
  },
});

export default Collectible;