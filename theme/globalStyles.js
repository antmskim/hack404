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
  h3: {
    ...typography.h3,
    color: colors.text,
  },
  buttonText: {
    ...typography.buttonText,
    color: colors.neutral.white,
  },
  buttonTextLight: {
    ...typography.buttonTextLight,
    color: colors.neutral.white,
  },
  textBody: {
    ...typography.body,
    color: colors.text,
  },
  pageContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    paddingBottom: 144,
    backgroundColor: colors.background,
    gap: spacing.xl,
    overflow: 'visible',
  },
    navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999, // Ensure the nav bar is above other content
  },
  container: {
    flex: 1,
    gap: spacing.md,
  }
  // ... other global text styles
});