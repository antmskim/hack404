// themes/globalStyles.js
import { StyleSheet } from 'react-native';
import { colors } from './colors.js';
import { spacing } from './spacing.js';
import { typography } from './typography.js'; 

export default StyleSheet.create({
  h1: {
    ...typography.h1,
    color: colors.secondaryAccent.teal,
  },
  h2: {
    ...typography.h2,
    color: colors.text,
  },
  buttonText: {
    ...typography.buttonText,
    color: colors.neutral.white,
  },
  textBody: {
    ...typography.body,
    color: colors.text,
  },
  pageContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.background,
    gap: 28,
  },
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  }
  // ... other global text styles
});