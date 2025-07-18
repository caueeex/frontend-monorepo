import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { designTokens } from '../theme';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
}) => {
  const badgeStyle = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyleCombined}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: designTokens.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: designTokens.colors.primary[100],
  },
  secondary: {
    backgroundColor: designTokens.colors.secondary[100],
  },
  success: {
    backgroundColor: designTokens.colors.success[100],
  },
  warning: {
    backgroundColor: designTokens.colors.warning[100],
  },
  error: {
    backgroundColor: designTokens.colors.error[100],
  },
  sm: {
    paddingHorizontal: designTokens.spacing[2],
    paddingVertical: designTokens.spacing[1],
  },
  md: {
    paddingHorizontal: designTokens.spacing[3],
    paddingVertical: designTokens.spacing[1],
  },
  lg: {
    paddingHorizontal: designTokens.spacing[4],
    paddingVertical: designTokens.spacing[2],
  },
  text: {
    fontWeight: designTokens.typography.fontWeights.medium,
    textAlign: 'center',
  },
  primaryText: {
    color: designTokens.colors.primary[700],
  },
  secondaryText: {
    color: designTokens.colors.secondary[700],
  },
  successText: {
    color: designTokens.colors.success[700],
  },
  warningText: {
    color: designTokens.colors.warning[700],
  },
  errorText: {
    color: designTokens.colors.error[700],
  },
  smText: {
    fontSize: designTokens.typography.fontSizes.xs,
  },
  mdText: {
    fontSize: designTokens.typography.fontSizes.sm,
  },
  lgText: {
    fontSize: designTokens.typography.fontSizes.base,
  },
}); 