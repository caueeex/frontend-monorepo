import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from './BottomNavigation';

export interface NavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <BottomNavigation
      activeTab={activeTab}
      onTabPress={onTabPress}
    />
  );
}; 