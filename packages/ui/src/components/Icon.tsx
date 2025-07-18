import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { 
  FaHome, 
  FaUsers, 
  FaFileAlt, 
  FaUser, 
  FaHeart, 
  FaBookmark, 
  FaShare, 
  FaEllipsisH,
  FaEllipsisV,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaCog,
  FaBell,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaUpload,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUnlock,
  FaKey,
  FaShieldAlt,
  FaUserShield,
  FaUserCheck,
  FaUserTimes,
  FaUserPlus,
  FaUserMinus,
  FaUserEdit,
  FaUserCog,
  FaUserLock,
  FaUserSecret,
  FaUserTie,
  FaUserGraduate,
  FaUserAstronaut,
  FaUserNinja,
  FaHardHat,
  FaCrown,
  FaUserFriends,
  FaUserCircle,
  FaUserClock,
  FaUserTag,
  FaUserSlash,
  FaUserInjured,
  FaHeadset,
  FaBars,
  FaExclamationTriangle
} from 'react-icons/fa';
import { designTokens } from '../theme';

export type IconName = 
  | 'home' | 'users' | 'file-alt' | 'user' | 'heart' | 'bookmark' | 'share' 
  | 'ellipsis-h' | 'ellipsis-v' | 'calendar-alt' | 'envelope' | 'phone' 
  | 'map-marker-alt' | 'star' | 'linkedin' | 'github' | 'globe' | 'cog' 
  | 'bell' | 'search' | 'plus' | 'edit' | 'trash' | 'check' | 'times' 
  | 'arrow-left' | 'arrow-right' | 'chevron-down' | 'chevron-up' 
  | 'chevron-left' | 'chevron-right' | 'download' | 'upload' | 'eye' 
  | 'eye-slash' | 'lock' | 'unlock' | 'key' | 'shield-alt' | 'user-shield' 
  | 'user-check' | 'user-times' | 'user-plus' | 'user-minus' | 'user-edit' 
  | 'user-cog' | 'user-lock' | 'user-secret' | 'user-tie' | 'user-graduate' 
  | 'user-astronaut' | 'user-ninja' | 'hard-hat' | 'crown' | 'user-friends' 
  | 'user-circle' | 'user-clock' | 'user-tag' | 'user-slash' | 'user-injured' 
  | 'headset' | 'bars' | 'exclamation-triangle';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const iconMap: Record<IconName, React.ComponentType<any>> = {
  'home': FaHome,
  'users': FaUsers,
  'file-alt': FaFileAlt,
  'user': FaUser,
  'heart': FaHeart,
  'bookmark': FaBookmark,
  'share': FaShare,
  'ellipsis-h': FaEllipsisH,
  'ellipsis-v': FaEllipsisV,
  'calendar-alt': FaCalendarAlt,
  'envelope': FaEnvelope,
  'phone': FaPhone,
  'map-marker-alt': FaMapMarkerAlt,
  'star': FaStar,
  'linkedin': FaLinkedin,
  'github': FaGithub,
  'globe': FaGlobe,
  'cog': FaCog,
  'bell': FaBell,
  'search': FaSearch,
  'plus': FaPlus,
  'edit': FaEdit,
  'trash': FaTrash,
  'check': FaCheck,
  'times': FaTimes,
  'arrow-left': FaArrowLeft,
  'arrow-right': FaArrowRight,
  'chevron-down': FaChevronDown,
  'chevron-up': FaChevronUp,
  'chevron-left': FaChevronLeft,
  'chevron-right': FaChevronRight,
  'download': FaDownload,
  'upload': FaUpload,
  'eye': FaEye,
  'eye-slash': FaEyeSlash,
  'lock': FaLock,
  'unlock': FaUnlock,
  'key': FaKey,
  'shield-alt': FaShieldAlt,
  'user-shield': FaUserShield,
  'user-check': FaUserCheck,
  'user-times': FaUserTimes,
  'user-plus': FaUserPlus,
  'user-minus': FaUserMinus,
  'user-edit': FaUserEdit,
  'user-cog': FaUserCog,
  'user-lock': FaUserLock,
  'user-secret': FaUserSecret,
  'user-tie': FaUserTie,
  'user-graduate': FaUserGraduate,
  'user-astronaut': FaUserAstronaut,
  'user-ninja': FaUserNinja,
  'hard-hat': FaHardHat,
  'crown': FaCrown,
  'user-friends': FaUserFriends,
  'user-circle': FaUserCircle,
  'user-clock': FaUserClock,
  'user-tag': FaUserTag,
  'user-slash': FaUserSlash,
  'user-injured': FaUserInjured,
  'headset': FaHeadset,
  'bars': FaBars,
  'exclamation-triangle': FaExclamationTriangle,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = designTokens.colors.neutral[600],
  style,
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <IconComponent size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 