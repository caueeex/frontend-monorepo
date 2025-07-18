import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { designTokens } from '@stefanini/ui';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  style,
}) => {
  return (
    <View style={[styles.base, style]}>
      {leftElement && (
        <View style={styles.leftElement}>
          {leftElement}
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      {rightElement && (
        <View style={styles.rightElement}>
          {rightElement}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: designTokens.spacing[4],
    paddingHorizontal: designTokens.spacing[6],
    backgroundColor: designTokens.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: designTokens.colors.neutral[200],
  },
  leftElement: {
    marginRight: designTokens.spacing[4],
  },
  content: {
    flex: 1,
  },
  rightElement: {
    marginLeft: designTokens.spacing[4],
  },
  title: {
    fontSize: designTokens.typography.fontSizes.xl,
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
  },
  subtitle: {
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[600],
    marginTop: designTokens.spacing[1],
  },
}); 