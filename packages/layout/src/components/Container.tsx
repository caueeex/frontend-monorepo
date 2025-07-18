import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { designTokens } from '@stefanini/ui';

export interface ContainerProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: number;
  style?: ViewStyle;
}

const paddingMap = {
  sm: 'paddingSm',
  md: 'paddingMd',
  lg: 'paddingLg',
  xl: 'paddingXl',
} as const;

type PaddingKey = keyof typeof paddingMap;

export const Container: React.FC<ContainerProps> = ({
  children,
  padding = 'md',
  maxWidth,
  style,
}) => {
  const containerStyle = [
    styles.base,
    styles[paddingMap[padding as PaddingKey]],
    ...(typeof maxWidth === 'number' && maxWidth > 0 ? [{ maxWidth }] : []),
    style,
  ];

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    alignSelf: 'center',
  },
  paddingSm: {
    paddingHorizontal: designTokens.spacing[4],
  },
  paddingMd: {
    paddingHorizontal: designTokens.spacing[6],
  },
  paddingLg: {
    paddingHorizontal: designTokens.spacing[8],
  },
  paddingXl: {
    paddingHorizontal: designTokens.spacing[12],
  },
}); 