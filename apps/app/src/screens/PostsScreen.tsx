import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import { Card, Badge, LoadingSpinner, designTokens } from '@stefanini/ui';
import { 
  FaFileAlt, 
  FaHeart, 
  FaCalendarAlt, 
  FaUser,
  FaThumbsUp,
  FaClock
} from 'react-icons/fa';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
}

interface PostsScreenProps {
  posts: Post[];
  loading: boolean;
}

const { width } = Dimensions.get('window');
const isMobile = width < 1200;

const PostsScreen: React.FC<PostsScreenProps> = ({ posts, loading }) => {
  // Responsividade igual ao MembersScreen
  const isSmallScreen = (Platform.OS === 'web' && window.innerWidth < 900) || (Platform.OS !== 'web' && Dimensions.get('window').width < 900);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }



  const renderPost = ({ item }: { item: Post }) => {
    const cardStyle = isSmallScreen
      ? { ...styles.postCard, ...styles.postCardMobile }
      : styles.postCard;
    return (
      <Card style={cardStyle} variant="elevated" padding="lg">
        <View style={styles.postHeader}>
          <View style={styles.postMeta}>
            <View style={styles.postStats}>
              <View style={styles.likesContainer}>
                <FaHeart size={14} color={designTokens.colors.primary[500]} />
                <Badge 
                  label={`${item.likes} curtidas`} 
                  variant="primary" 
                  size="sm"
                  style={styles.likesBadge}
                />
              </View>
              <View style={styles.dateContainer}>
                <FaCalendarAlt size={14} color={designTokens.colors.neutral[400]} />
                <Text style={styles.postDate}>{item.date}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={[styles.postContent, isSmallScreen && styles.postContentMobile]} numberOfLines={4}>{item.content}</Text>
        <View style={styles.postFooter}>
          <View style={styles.authorInfo}>
            <View style={styles.authorAvatar}>
              <FaUser size={16} color={designTokens.colors.white} />
            </View>
            <View style={styles.authorDetails}>
              <Text style={[styles.postAuthor, isSmallScreen && styles.postAuthorMobile]}>Por {item.author}</Text>
              <Text style={[styles.authorRole, isSmallScreen && styles.authorRoleMobile]}>Autor</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <FaFileAlt size={64} color={designTokens.colors.neutral[400]} />
      <Text style={styles.emptyTitle}>Nenhuma postagem encontrada</Text>
      <Text style={styles.emptySubtitle}>
        As postagens aparecerão aqui quando forem criadas
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, isSmallScreen && styles.headerMobile]}>
        <View style={[styles.titleContainer, isSmallScreen && styles.titleContainerMobile]}> 
          <FaFileAlt size={isSmallScreen ? 24 : 32} color={designTokens.colors.primary[600]} style={isSmallScreen ? { ...styles.headerIcon, ...styles.headerIconMobile } : styles.headerIcon} />
          <View style={[styles.titleTextContainer, isSmallScreen && styles.titleTextContainerMobile]}>
            <Text style={[styles.screenTitle, isSmallScreen && styles.screenTitleMobile]}>Postagens Recentes</Text>
            <Text style={[styles.screenSubtitle, isSmallScreen && styles.screenSubtitleMobile]}>Fique por dentro das últimas novidades da equipe</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listContainer, isSmallScreen && styles.listContainerMobile]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
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
  separator: {
    height: designTokens.spacing[8],
  },
  postCard: {
    flex: 1,
    marginBottom: designTokens.spacing[8],
    backgroundColor: designTokens.colors.white,
    borderRadius: designTokens.borderRadius['2xl'],
    padding: designTokens.spacing[8],
    ...designTokens.shadows.lg,
  },
  postCardMobile: {
    padding: designTokens.spacing[4],
  },
  postHeader: {
    marginBottom: designTokens.spacing[4],
  },
  postMeta: {
    marginBottom: designTokens.spacing[3],
  },
  postTitle: {
    fontSize: designTokens.typography.fontSizes.xl,
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[3],
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesBadge: {
    marginLeft: designTokens.spacing[2],
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postDate: {
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[500],
    fontWeight: designTokens.typography.fontWeights.medium,
    marginLeft: designTokens.spacing[2],
  },
  postContent: {
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[700],
    lineHeight: 24,
    marginBottom: designTokens.spacing[4],
  },
  postContentMobile: {
    fontSize: designTokens.typography.fontSizes.sm,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: designTokens.colors.neutral[200],
    paddingTop: designTokens.spacing[4],
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: designTokens.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing[3],
  },
  authorDetails: {
    flex: 1,
  },
  postAuthor: {
    fontSize: designTokens.typography.fontSizes.base,
    fontWeight: designTokens.typography.fontWeights.semibold,
    color: designTokens.colors.neutral[900],
  },
  postAuthorMobile: {
    fontSize: designTokens.typography.fontSizes.sm,
  },
  authorRole: {
    fontSize: designTokens.typography.fontSizes.sm,
    color: designTokens.colors.neutral[600],
  },
  authorRoleMobile: {
    fontSize: designTokens.typography.fontSizes.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: designTokens.spacing[12],
  },
  emptyTitle: {
    fontSize: designTokens.typography.fontSizes.xl,
    fontWeight: designTokens.typography.fontWeights.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[2],
    textAlign: 'center',
    marginTop: designTokens.spacing[4],
  },
  emptySubtitle: {
    fontSize: designTokens.typography.fontSizes.base,
    color: designTokens.colors.neutral[600],
    textAlign: 'center',
  },
});

export default PostsScreen; 