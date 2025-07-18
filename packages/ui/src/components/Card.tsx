import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { designTokens } from '../theme';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  onPress?: () => void;
  interactive?: boolean;
}

const paddingMap = {
  sm: 'paddingSm',
  md: 'paddingMd',
  lg: 'paddingLg',
  xl: 'paddingXl',
} as const;

type PaddingKey = keyof typeof paddingMap;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
  onPress,
  interactive = false,
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[paddingMap[padding as PaddingKey]],
    interactive && styles.interactive,
    style,
  ];

  if (onPress || interactive) {
    return (
      <Pressable
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        android_ripple={{ color: designTokens.colors.neutral[200] }}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: designTokens.colors.white,
    borderRadius: designTokens.borderRadius.xl,
    flexShrink: 0,
    overflow: 'hidden',
  },
  default: {
    borderWidth: 1,
    borderColor: designTokens.colors.neutral[200],
    backgroundColor: designTokens.colors.white,
  },
  elevated: {
    ...designTokens.shadows.lg,
    backgroundColor: designTokens.colors.white,
    borderWidth: 0,
  },
  outlined: {
    borderWidth: 2,
    borderColor: designTokens.colors.neutral[300],
    backgroundColor: designTokens.colors.white,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...designTokens.shadows.md,
  },
  gradient: {
    backgroundColor: designTokens.colors.white,
    borderWidth: 0,
    ...designTokens.shadows.xl,
  },
  interactive: {
    ...designTokens.shadows.md,
    transform: [{ scale: 1 }],
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    ...designTokens.shadows.sm,
  },
  paddingSm: {
    padding: designTokens.spacing[4],
  },
  paddingMd: {
    padding: designTokens.spacing[6],
  },
  paddingLg: {
    padding: designTokens.spacing[8],
  },
  paddingXl: {
    padding: designTokens.spacing[10],
  },
}); 