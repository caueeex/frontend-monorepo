import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { designTokens } from '../theme';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = designTokens.colors.primary[600],
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(spin);
    };
    spin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spinnerStyle = [
    styles.base,
    styles[size],
    { borderColor: color },
    style,
  ];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          spinnerStyle,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  base: {
    borderWidth: 2,
    borderTopColor: 'transparent',
    borderRadius: designTokens.borderRadius.full,
  },
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 32,
    height: 32,
  },
}); 