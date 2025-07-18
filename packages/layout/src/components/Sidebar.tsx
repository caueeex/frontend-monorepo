import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Platform } from 'react-native';
import { designTokens } from '@stefanini/ui';

export interface SidebarItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  style?: ViewStyle;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  style,
}) => {
  const renderItem = (item: SidebarItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.item,
        item.active && styles.activeItem,
      ]}
      onPress={item.onPress}
      activeOpacity={0.8}
    >
      <View style={styles.itemContent}>
        {item.icon && <View style={styles.icon}>{item.icon}</View>}
        <Text
          style={[
            styles.itemText,
            item.active && styles.activeItemText,
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Renderização específica para web
  if (Platform.OS === 'web') {
    return (
      <div
        style={{
          backgroundColor: designTokens.colors.white,
          borderRight: `1px solid ${designTokens.colors.neutral[200]}`,
          paddingTop: designTokens.spacing[4],
          paddingBottom: designTokens.spacing[4],
          width: 260,
          minHeight: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: '2px 0 16px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {items.map(renderItem)}
      </div>
    );
  }

  // Renderização para React Native
  return (
    <View style={[styles.base, style]}>
      {items.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: designTokens.colors.white,
    borderRightWidth: 1,
    borderRightColor: designTokens.colors.neutral[200],
    paddingVertical: designTokens.spacing[4],
    width: 260,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  item: {
    paddingVertical: designTokens.spacing[3],
    paddingHorizontal: designTokens.spacing[6],
    borderRadius: designTokens.borderRadius.lg,
    marginHorizontal: designTokens.spacing[2],
    marginBottom: designTokens.spacing[1],
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeItem: {
    backgroundColor: designTokens.colors.primary[50],
    borderRightWidth: 3,
    borderRightColor: designTokens.colors.primary[600],
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[700],
    fontWeight: designTokens.typography.fontWeights.medium,
    flexShrink: 1,
  },
  activeItemText: {
    color: designTokens.colors.primary[700],
    fontWeight: designTokens.typography.fontWeights.semibold,
  },
  icon: {
    marginRight: designTokens.spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 28,
  },
}); 