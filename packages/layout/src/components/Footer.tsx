import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface FooterProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Footer: React.FC<FooterProps> = ({ children, style }) => {
  return (
    <View style={[styles.footer, style]}>
      {children || (
        <Text style={styles.text}>
          © 2024 Stefanini Brasil. Todos os direitos reservados.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
});

export default Footer; 