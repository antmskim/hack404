import React from 'react';
import globalStyles from '../theme/globalStyles';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const ButtonXL = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
      </View>
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.blue,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'flex-start',
    justifyContent: 'start',
    width: '100%',
    flexShrink: 1,
    gap: spacing.md,
  },
  imagePlaceholder: {
    width: 44, 
    height: 44, 
    backgroundColor: colors.neutral.darkGrey, 
  },
});

export default ButtonXL;