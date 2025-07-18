import { useWindowDimensions, Platform } from 'react-native';

export interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWeb: boolean;
  isNative: boolean;
  width: number;
  height: number;
}

export const useResponsive = (): ResponsiveBreakpoints => {
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isNative = Platform.OS !== 'web';

  // Breakpoints responsivos
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWeb,
    isNative,
    width,
    height,
  };
};

// Breakpoints específicos para diferentes componentes
export const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  
  return {
    xs: width < 480,
    sm: width >= 480 && width < 768,
    md: width >= 768 && width < 1024,
    lg: width >= 1024 && width < 1200,
    xl: width >= 1200,
  };
}; 