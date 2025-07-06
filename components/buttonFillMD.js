import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import globalStyles from '../theme/globalStyles';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const ButtonFillMD = ({ 
  onPress, 
  text, 
  backgroundColor = colors.primary.yellow, 
  textColor = colors.neutral.white 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[globalStyles.buttonText, { color: textColor }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignSelf: 'flex-start', // Makes button hug content
  },
  buttonText: {
    ...typography.buttonTextLight,
  },
});

export default ButtonFillMD;