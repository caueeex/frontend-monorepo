import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { designTokens } from '../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const renderContent = () => (
    <View style={styles.content}>
      {icon && iconPosition === 'left' && (
        <View style={[styles.icon, styles.iconLeft]}>
          {icon}
        </View>
      )}
      <Text style={textStyleCombined}>{title}</Text>
      {icon && iconPosition === 'right' && (
        <View style={[styles.icon, styles.iconRight]}>
          {icon}
        </View>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: designTokens.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...designTokens.shadows.sm,
  },
  primary: {
    backgroundColor: designTokens.colors.primary[600],
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: designTokens.colors.secondary[600],
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: designTokens.colors.primary[600],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: designTokens.colors.error[600],
    borderWidth: 0,
  },
  success: {
    backgroundColor: designTokens.colors.success[600],
    borderWidth: 0,
  },
  sm: {
    paddingHorizontal: designTokens.spacing[4],
    paddingVertical: designTokens.spacing[2],
    minHeight: 36,
  },
  md: {
    paddingHorizontal: designTokens.spacing[6],
    paddingVertical: designTokens.spacing[3],
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: designTokens.spacing[8],
    paddingVertical: designTokens.spacing[4],
    minHeight: 52,
  },
  xl: {
    paddingHorizontal: designTokens.spacing[10],
    paddingVertical: designTokens.spacing[5],
    minHeight: 60,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: designTokens.colors.neutral[300],
    opacity: 0.6,
    borderWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: designTokens.spacing[2],
  },
  iconLeft: {
    marginRight: designTokens.spacing[2],
  },
  iconRight: {
    marginLeft: designTokens.spacing[2],
  },
  text: {
    fontWeight: designTokens.typography.fontWeights.semibold,
    textAlign: 'center',
    letterSpacing: designTokens.typography.letterSpacing.wide,
  },
  primaryText: {
    color: designTokens.colors.white,
  },
  secondaryText: {
    color: designTokens.colors.white,
  },
  outlineText: {
    color: designTokens.colors.primary[600],
  },
  ghostText: {
    color: designTokens.colors.primary[600],
  },
  dangerText: {
    color: designTokens.colors.white,
  },
  successText: {
    color: designTokens.colors.white,
  },
  smText: {
    fontSize: designTokens.typography.fontSizes.sm,
  },
  mdText: {
    fontSize: designTokens.typography.fontSizes.base,
  },
  lgText: {
    fontSize: designTokens.typography.fontSizes.lg,
  },
  xlText: {
    fontSize: designTokens.typography.fontSizes.xl,
  },
  disabledText: {
    color: designTokens.colors.neutral[500],
  },
}); 