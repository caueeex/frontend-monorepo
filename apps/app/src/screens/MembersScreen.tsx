import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Platform, Dimensions } from 'react-native';
import { Card, Badge, LoadingSpinner, designTokens } from '@stefanini/ui';
import { 
  FaUsers, 
  FaUser, 
  FaEnvelope, 
  FaBriefcase,
  FaStar,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEllipsisV
} from 'react-icons/fa';
import { Member } from '../services/api';

interface MembersScreenProps {
  members: Member[];
  loading: boolean;
}

const MembersScreen: React.FC<MembersScreenProps> = ({ members, loading }) => {
  // Garante responsividade igual ao App
  const isSmallScreen = (Platform.OS === 'web' && window.innerWidth < 900) || (Platform.OS !== 'web' && Dimensions.get('window').width < 900);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Tecnologia': 'primary',
      'Design': 'success',
      'Marketing': 'warning',
      'Vendas': 'secondary',
      'RH': 'error',
      'Produto': 'primary',
      'Infraestrutura': 'warning',
    } as const;
    
    return colors[department as keyof typeof colors] || 'primary';
  };

  const renderMember = ({ item }: { item: Member }) => {
    const departmentColor = getDepartmentColor(item.department);
    
    return (
      <Card 
        style={styles.memberCard} 
        variant="elevated" 
        padding="lg"
      >
        <View style={styles.memberHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <FaUser size={24} color={designTokens.colors.white} />
            </View>
            <View style={styles.onlineIndicator} />
          </View>
          
          <View style={styles.memberInfo}>
            {Platform.OS === 'web' ? (
              <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', marginBottom: 4 }}>
                <Text style={[styles.memberName, isSmallScreen && styles.memberNameMobile]}>
                  {item.name}
                </Text>
              </div>
            ) : (
              <Text 
                style={[styles.memberName, isSmallScreen && styles.memberNameMobile]}
                numberOfLines={2}
              >
                {item.name}
              </Text>
            )}
            <Text 
              style={[styles.memberPosition, isSmallScreen && styles.memberPositionMobile]}
              numberOfLines={1}
            >
              {item.role}
            </Text>
            <Badge 
              label={item.department} 
              variant={departmentColor} 
              size="sm"
              style={styles.departmentBadge}
            />
          </View>
          
          <View style={styles.memberActions}>
            <Pressable style={styles.actionButton}>
              <FaEllipsisV size={16} color={designTokens.colors.neutral[400]} />
            </Pressable>
          </View>
        </View>
        
        <View style={styles.memberDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <FaEnvelope size={14} color={designTokens.colors.neutral[400]} />
            </View>
            <Text 
              style={[styles.detailText, isSmallScreen && styles.detailTextMobile]}
              numberOfLines={1}
            >
              {item.email}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <FaBriefcase size={14} color={designTokens.colors.neutral[400]} />
            </View>
            <Text 
              style={[styles.detailText, isSmallScreen && styles.detailTextMobile]}
              numberOfLines={1}
            >
              {item.role}
            </Text>
          </View>
        </View>
        
        <View style={styles.memberFooter}>
          <View style={styles.socialLinks}>
            <Pressable style={styles.socialButton}>
              <FaLinkedin size={16} color={designTokens.colors.primary[600]} />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <FaGithub size={16} color={designTokens.colors.neutral[600]} />
            </Pressable>
            <Pressable style={styles.socialButton}>
              <FaGlobe size={16} color={designTokens.colors.success[600]} />
            </Pressable>
          </View>
          
          <View style={styles.ratingContainer}>
            <FaStar size={14} color={designTokens.colors.warning[500]} />
            <Text style={styles.ratingText}>
              {isSmallScreen ? '4.8' : '4.8'}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <FaUsers size={80} color={designTokens.colors.neutral[300]} />
      </View>
      <Text style={styles.emptyTitle}>
        {isSmallScreen ? 'Nenhum membro' : 'Nenhum membro encontrado'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {isSmallScreen 
          ? 'Os membros aparecerão aqui quando forem adicionados'
          : 'Os membros da equipe aparecerão aqui quando forem adicionados'
        }
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, isSmallScreen && styles.headerMobile]}>
        <View style={[styles.titleContainer, isSmallScreen && styles.titleContainerMobile]}>
          <View style={isSmallScreen ? { ...styles.headerIconContainer, ...styles.headerIconContainerMobile } : styles.headerIconContainer}>
            <FaUsers size={isSmallScreen ? 24 : 36} color={designTokens.colors.primary[600]} />
          </View>
          <View style={[styles.titleTextContainer, isSmallScreen && styles.titleTextContainerMobile]}>
            <Text style={[styles.screenTitle, isSmallScreen && styles.screenTitleMobile]}>{isSmallScreen ? 'Membros' : 'Membros da Equipe'}</Text>
            <Text style={[styles.screenSubtitle, isSmallScreen && styles.screenSubtitleMobile]}>{isSmallScreen ? 'Conheça nossa equipe' : 'Conheça nossa equipe e suas especialidades'}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{members.length}</Text>
            <Text style={styles.statLabel}>{isSmallScreen ? 'Depts' : 'Membros'}</Text>

            <Text style={styles.statLabel}></Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{new Set(members.map(m => m.department)).size}</Text>
            <Text style={styles.statLabel}>{isSmallScreen ? 'Depts' : 'Departamentos'}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listContainer, isSmallScreen && styles.listContainerMobile]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
        numColumns={isSmallScreen ? 1 : 2}
        columnWrapperStyle={!isSmallScreen ? styles.row : undefined}
        style={{ width: '100%', flex: 1 }}
      />
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
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: designTokens.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing[6],
    ...designTokens.shadows.sm,
  },
  headerIconContainerMobile: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: designTokens.typography.fontSizes['4xl'],
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[3],
    letterSpacing: designTokens.typography.letterSpacing.tight,
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
    width: '100%',
  },
  screenSubtitleMobile: {
    fontSize: designTokens.typography.fontSizes.sm,
    textAlign: 'left',
    flexWrap: 'wrap',
    flexShrink: 1,
    alignSelf: 'stretch',
  },
  statsContainer: {
    marginTop: designTokens.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: designTokens.colors.white,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing[6],
    ...designTokens.shadows.sm,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: designTokens.typography.fontSizes['3xl'],
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.primary[600],
    marginBottom: designTokens.spacing[1],
  },

  statLabel: {
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[600],
    fontWeight: designTokens.typography.fontWeights.medium,
  },

  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: designTokens.colors.neutral[200],
    marginHorizontal: designTokens.spacing[4],
  },
  
  listContainer: {
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: designTokens.spacing[6],
    paddingBottom: 120,
    backgroundColor: designTokens.colors.neutral[50],
  },

  listContainerMobile: {
    paddingHorizontal: designTokens.spacing[4],
  },

  row: {
    justifyContent: 'space-between',
    gap: designTokens.spacing[8],
  },
  
  separator: {
    height: designTokens.spacing[8],
  },
  
  memberCard: {
    flex: 1,
    marginBottom: designTokens.spacing[8],
    backgroundColor: designTokens.colors.white,
    borderRadius: designTokens.borderRadius['2xl'],
    padding: designTokens.spacing[8],
    ...designTokens.shadows.lg,
  },
  
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: designTokens.spacing[8],
  },
  
  avatarContainer: {
    position: 'relative',
    marginRight: designTokens.spacing[6],
  },
  
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: designTokens.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    ...designTokens.shadows.md,
  },
  
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: designTokens.colors.success[500],
    borderWidth: 3,
    borderColor: designTokens.colors.white,
  },
  
  memberInfo: {
    flex: 1,
    marginRight: designTokens.spacing[6],
  },
  
  memberName: {
    fontSize: designTokens.typography.fontSizes.xl,
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[1],
    letterSpacing: designTokens.typography.letterSpacing.tight,
  },

  memberNameMobile: {
    fontSize: designTokens.typography.fontSizes.lg,
  },
  
  memberPosition: {
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[600],
    fontWeight: designTokens.typography.fontWeights.medium,
    marginBottom: designTokens.spacing[3],
  },

  memberPositionMobile: {
    fontSize: designTokens.typography.fontSizes.sm,
  },

  departmentBadge: {
    alignSelf: 'flex-start',
  },

  memberActions: {
    alignItems: 'center',
  },

  actionButton: {
    padding: designTokens.spacing[2],
    borderRadius: designTokens.borderRadius.full,
  },
  
  memberDetails: {
    marginBottom: designTokens.spacing[8],
  },
  
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: designTokens.spacing[4],
  },
  
  detailIcon: {
    width: 20,
    alignItems: 'center',
    marginRight: designTokens.spacing[4],
  },
  
  detailText: {
    flex: 1,
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[700],
    fontWeight: designTokens.typography.fontWeights.medium,
  },

  detailTextMobile: {
    fontSize: designTokens.typography.fontSizes.xs,
  },
  
  memberFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: designTokens.colors.neutral[200],
    paddingTop: designTokens.spacing[6],
  },
  
  socialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: designTokens.colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing[3],
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  ratingText: {
    fontSize: designTokens.typography.fontSizes.sm,
    fontWeight: designTokens.typography.fontWeights.semibold,
    color: designTokens.colors.neutral[700],
    marginLeft: designTokens.spacing[1],
  },
  
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: designTokens.spacing[16],
  },

  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: designTokens.colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: designTokens.spacing[6],
  },
  
  emptyTitle: {
    fontSize: designTokens.typography.fontSizes['2xl'],
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[3],
    textAlign: 'center',
  },
  
  emptySubtitle: {
    fontSize: designTokens.typography.fontSizes.lg,
    color: designTokens.colors.neutral[600],
    textAlign: 'center',
    lineHeight: designTokens.typography.lineHeights.relaxed,
    maxWidth: 300,
  },
});

export default MembersScreen; 