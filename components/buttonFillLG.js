import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import globalStyles from '../theme/globalStyles';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const ButtonFillLG = ({ 
  onPress, 
  text, 
  showIconPlaceholder = true,
  backgroundColor = colors.secondaryAccent.teal, 
  textColor = colors.neutral.white 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {showIconPlaceholder && (
          <View style={styles.iconPlaceholder} />
        )}
        <Text style={[globalStyles.buttonTextLight, { color: textColor }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: colors.neutral.white,
    borderRadius: 4,
  },
  buttonText: {
    ...typography.buttonTextLight,
    textAlign: 'center',
  },
});

export default ButtonFillLG;