import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card, Avatar, Badge, LoadingSpinner, designTokens } from '@stefanini/ui';
import { FaUser } from 'react-icons/fa';
import { membersApi, Member } from '../services/api';

const { width } = Dimensions.get('window');
const isMobile = width < 900;

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        // Buscar o perfil do primeiro membro (ID 1) como exemplo
        const profileData = await membersApi.getProfile(1);
        setProfile(profileData);
      } catch (error) {
        console.error('❌ Erro ao carregar perfil:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.content, isMobile && styles.contentMobile]}>
          <LoadingSpinner size="lg" />
          <Text style={styles.loadingText}>Carregando perfil...</Text>
        </View>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.container}>
        <View style={[styles.content, isMobile && styles.contentMobile]}>
          <Text style={styles.errorText}>Erro ao carregar perfil</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <View style={[styles.titleContainer, isMobile && styles.titleContainerMobile]}> 
          <FaUser size={isMobile ? 24 : 32} color={designTokens.colors.primary[600]} style={isMobile ? { ...styles.headerIcon, ...styles.headerIconMobile } : styles.headerIcon} />
          <View style={[styles.titleTextContainer, isMobile && styles.titleTextContainerMobile]}> 
            <Text style={[styles.screenTitle, isMobile && styles.screenTitleMobile]}>Meu Perfil</Text>
            <Text style={[styles.screenSubtitle, isMobile && styles.screenSubtitleMobile]}>Gerencie suas informações e configurações</Text>
          </View>
        </View>
      </View>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <Card
          style={isMobile ? { ...styles.profileCard, ...styles.profileCardMobile, width: '100%', maxWidth: '100%' } : { ...styles.profileCard, width: '100%', maxWidth: 480 }}
          variant="elevated"
          padding="lg"
        >
          <View style={[styles.profileHeader, isMobile && styles.profileHeaderMobile]}>
            <Avatar
              source={profile.avatar}
              initials={profile.name.split(' ').map(n => n[0]).join('')}
              size={isMobile ? 'lg' : 'xl'}
              style={isMobile ? { alignSelf: 'center' } : undefined}
            />
            <View style={[styles.profileInfo, isMobile && styles.profileInfoMobile]}>
              <Text style={[styles.profileName, isMobile && styles.profileNameMobile]}>{profile.name}</Text>
              <Text style={[styles.profileRole, isMobile && styles.profileRoleMobile]}>{profile.role}</Text>
              <Badge
                label={profile.department}
                variant="primary"
                size={isMobile ? 'sm' : 'md'}
                style={styles.departmentBadge}
              />
            </View>
          </View>
          <View style={[styles.profileDetails, isMobile && styles.profileDetailsMobile]}>
            <Text style={[styles.detailLabel, isMobile && styles.detailLabelMobile]}>Email</Text>
            <Text style={[styles.detailValue, isMobile && styles.detailValueMobile]}>{profile.email}</Text>
            <Text style={[styles.detailLabel, isMobile && styles.detailLabelMobile]}>Cargo</Text>
            <Text style={[styles.detailValue, isMobile && styles.detailValueMobile]}>{profile.role}</Text>
            <Text style={[styles.detailLabel, isMobile && styles.detailLabelMobile]}>Departamento</Text>
            <Text style={[styles.detailValue, isMobile && styles.detailValueMobile]}>{profile.department}</Text>
            <Text style={[styles.detailLabel, isMobile && styles.detailLabelMobile]}>ID do Membro</Text>
            <Text style={[styles.detailValue, isMobile && styles.detailValueMobile]}>{profile.id}</Text>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: designTokens.colors.neutral[50],
  },
  header: {
    width: '100%',
    paddingHorizontal: designTokens.spacing[8],
    paddingVertical: designTokens.spacing[8],
    backgroundColor: designTokens.colors.neutral[50],
    borderBottomWidth: 1,
    borderBottomColor: designTokens.colors.neutral[200],
  },
  headerMobile: {
    paddingHorizontal: designTokens.spacing[6],
    paddingVertical: designTokens.spacing[6],
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titleContainerMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: designTokens.spacing[4],
    gap: 0,
  },
  headerIcon: {
    marginRight: designTokens.spacing[4],
  },
  headerIconMobile: {
    marginRight: designTokens.spacing[4],
    marginBottom: 0,
  },
  titleTextContainer: {
    flex: 1,
  },
  titleTextContainerMobile: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginTop: 0,
  },
  screenTitle: {
    fontSize: designTokens.typography.fontSizes['3xl'],
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[2],
  },
  screenTitleMobile: {
    fontSize: designTokens.typography.fontSizes.lg,
    textAlign: 'left',
  },
  screenSubtitle: {
    fontSize: designTokens.typography.fontSizes.lg,
    color: designTokens.colors.neutral[600],
    fontWeight: designTokens.typography.fontWeights.medium,
    lineHeight: designTokens.typography.lineHeights.relaxed,
    flexWrap: 'wrap',
    textAlign: 'left',
    flexShrink: 1,
    alignSelf: 'stretch',
  },
  screenSubtitleMobile: {
    fontSize: designTokens.typography.fontSizes.sm,
    textAlign: 'left',
    flexWrap: 'wrap',
    flexShrink: 1,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: designTokens.spacing[8],
  },
  contentMobile: {
    paddingHorizontal: designTokens.spacing[4],
  },
  profileCard: {
    backgroundColor: designTokens.colors.white,
    borderRadius: designTokens.borderRadius.lg,
    padding: designTokens.spacing[6],
    shadowColor: designTokens.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileCardMobile: {
    padding: designTokens.spacing[4],
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: designTokens.spacing[6],
  },
  profileHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: designTokens.spacing[4],
  },
  profileInfo: {
    flex: 1,
    marginLeft: designTokens.spacing[6],
  },
  profileInfoMobile: {
    marginLeft: 0,
    alignItems: 'center',
    marginTop: designTokens.spacing[3],
  },
  profileName: {
    fontSize: designTokens.typography.fontSizes.xl,
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[2],
  },
  profileNameMobile: {
    fontSize: designTokens.typography.fontSizes.lg,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: designTokens.typography.fontSizes.lg,
    color: designTokens.colors.primary[600],
    fontWeight: designTokens.typography.fontWeights.semibold,
    marginBottom: designTokens.spacing[3],
  },
  profileRoleMobile: {
    fontSize: designTokens.typography.fontSizes.base,
    textAlign: 'center',
  },
  departmentBadge: {
    alignSelf: 'center',
    marginTop: designTokens.spacing[2],
  },
  profileDetails: {
    marginTop: designTokens.spacing[4],
  },
  profileDetailsMobile: {
    marginTop: designTokens.spacing[2],
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[600],
    fontWeight: designTokens.typography.fontWeights.medium,
    marginTop: designTokens.spacing[2],
  },
  detailLabelMobile: {
    fontSize: designTokens.typography.fontSizes.xs,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[1],
  },
  detailValueMobile: {
    fontSize: designTokens.typography.fontSizes.sm,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: designTokens.spacing[4],
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[600],
    textAlign: 'center',
  },
  errorText: {
    fontSize: designTokens.typography.fontSizes.lg,
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.error[600],
    textAlign: 'center',
    marginBottom: designTokens.spacing[2],
  },
  errorMessage: {
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[600],
    textAlign: 'center',
    marginBottom: designTokens.spacing[4],
  },
});

export default ProfileScreen; 