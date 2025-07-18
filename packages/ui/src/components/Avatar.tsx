import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { designTokens } from '../theme';

export interface AvatarProps {
  source?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'square';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 'md',
  variant = 'circle',
  style,
}) => {
  const avatarStyle = [
    styles.base,
    styles[size],
    styles[variant],
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${size}Text`],
  ];

  // Calculate borderRadius for image
  const imageBorderRadius =
    variant === 'circle'
      ? styles[size].width
        ? (styles[size].width as number) / 2
        : 20
      : designTokens.borderRadius.md;

  return (
    <View style={avatarStyle}>
      {source ? (
        <Image source={{ uri: source }} style={[styles.image, { borderRadius: imageBorderRadius }]} />
      ) : (
        <Text style={textStyle}>{initials || '?'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designTokens.colors.neutral[300],
  },
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 48,
    height: 48,
  },
  xl: {
    width: 64,
    height: 64,
  },
  circle: {
    borderRadius: designTokens.borderRadius.full,
  },
  square: {
    borderRadius: designTokens.borderRadius.md,
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius will be set dynamically
  } as ImageStyle,
  text: {
    color: designTokens.colors.neutral[700],
    fontWeight: designTokens.typography.fontWeights.medium,
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
  xlText: {
    fontSize: designTokens.typography.fontSizes.lg,
  },
}); 