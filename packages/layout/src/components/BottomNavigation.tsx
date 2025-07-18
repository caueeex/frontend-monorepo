import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { 
  FaHome, 
  FaUsers, 
  FaFileAlt, 
  FaUser,
  FaHeart,
  FaBookmark,
  FaBell
} from 'react-icons/fa';
import { designTokens } from '@stefanini/ui';

export interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

const tabItems: TabItem[] = [
  {
    id: 'posts',
    label: 'Postagens',
    icon: <FaFileAlt size={20} color={designTokens.colors.neutral[400]} />,
    activeIcon: <FaFileAlt size={22} color={designTokens.colors.primary[600]} />,
  },
  {
    id: 'members',
    label: 'Membros',
    icon: <FaUsers size={20} color={designTokens.colors.neutral[400]} />,
    activeIcon: <FaUsers size={22} color={designTokens.colors.primary[600]} />,
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: <FaUser size={20} color={designTokens.colors.neutral[400]} />,
    activeIcon: <FaUser size={22} color={designTokens.colors.primary[600]} />,
  },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const renderTab = (item: TabItem) => {
    const isActive = activeTab === item.id;
    
    return (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.tab,
          isActive && styles.activeTab,
          pressed && styles.pressedTab,
        ]}
        onPress={() => onTabPress(item.id)}
        android_ripple={{ 
          color: designTokens.colors.primary[100],
          borderless: true,
          radius: 28,
        }}
      >
        <View style={styles.iconContainer}>
          {isActive ? item.activeIcon : item.icon}
          {isActive && <View style={styles.activeIndicator} />}
        </View>
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  // Renderização específica para web com position: fixed
  if (Platform.OS === 'web') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          backgroundColor: designTokens.colors.white,
          borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
          paddingLeft: designTokens.spacing[4],
          paddingRight: designTokens.spacing[4],
          paddingTop: designTokens.spacing[3],
          paddingBottom: designTokens.spacing[4],
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {tabItems.map(renderTab)}
        </div>
      </div>
    );
  }

  // Renderização para mobile nativo
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabItems.map(renderTab)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: designTokens.colors.white,
    borderTopWidth: 1,
    borderTopColor: designTokens.colors.neutral[200],
    paddingHorizontal: designTokens.spacing[4],
    paddingVertical: designTokens.spacing[3],
    paddingBottom: Platform.OS === 'ios' ? designTokens.spacing[6] : designTokens.spacing[4],
    ...designTokens.shadows.lg,
    zIndex: 99999,
  },
  
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: designTokens.spacing[2],
    paddingHorizontal: designTokens.spacing[3],
    borderRadius: designTokens.borderRadius.lg,
    minWidth: 80,
    position: 'relative',
  },
  
  activeTab: {
    backgroundColor: designTokens.colors.primary[50],
  },
  
  pressedTab: {
    backgroundColor: designTokens.colors.primary[100],
    transform: [{ scale: 0.95 }],
  },
  
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: designTokens.spacing[1],
    position: 'relative',
  },
  
  activeIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: designTokens.colors.primary[600],
    borderWidth: 2,
    borderColor: designTokens.colors.white,
  },
  
  tabLabel: {
    fontSize: designTokens.typography.fontSizes.xs,
    fontWeight: designTokens.typography.fontWeights.medium,
    color: designTokens.colors.neutral[500],
    textAlign: 'center',
    letterSpacing: designTokens.typography.letterSpacing.wide,
  },
  
  activeTabLabel: {
    color: designTokens.colors.primary[600],
    fontWeight: designTokens.typography.fontWeights.semibold,
  },
}); 