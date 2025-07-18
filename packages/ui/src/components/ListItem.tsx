import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { designTokens } from '../theme';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  const containerStyle = [
    styles.base,
    onPress && styles.pressable,
    style,
  ];

  return (
    <View style={containerStyle}>
      {leftElement && (
        <View style={styles.leftElement}>
          {leftElement}
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
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
  },
  pressable: {
    // Add pressable styles if needed
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
    fontSize: designTokens.typography.fontSizes.base,
    fontWeight: designTokens.typography.fontWeights.medium,
    color: designTokens.colors.neutral[900],
  },
  subtitle: {
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[600],
    marginTop: designTokens.spacing[1],
  },
}); 