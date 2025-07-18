import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Dimensions, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { Container, Navigation, Sidebar } from '@stefanini/layout';
import { designTokens, Icon } from '@stefanini/ui';
import PostsScreen from './screens/PostsScreen';
import MembersScreen from './screens/MembersScreen';
import ProfileScreen from './screens/ProfileScreen';
import { postsApi, membersApi, Post, Member } from './services/api';

// Ícones para navegação
const navIcons = {
  posts: <Icon name="file-alt" size={22} />, 
  members: <Icon name="users" size={22} />, 
  profile: <Icon name="user" size={22} />
};

type Screen = 'posts' | 'members' | 'profile';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      if (Platform.OS === 'web') {
        setIsMobile(window.innerWidth < 900);
      } else {
        setIsMobile(Dimensions.get('window').width < 900);
      }
    }
    check();
    if (Platform.OS === 'web') {
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    } else {
      const sub = Dimensions.addEventListener('change', check);
      return () => sub?.remove();
    }
  }, []);
  return isMobile;
}

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [postsData, membersData] = await Promise.all([
          postsApi.getAll(),
          membersApi.getAll(),
        ]);
        
        setPosts(postsData);
        setMembers(membersData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleTabPress = (tab: string) => {
    setActiveScreen(tab as Screen);
  };

  const navItems = [
    {
      id: 'posts',
      title: 'Postagens',
      icon: navIcons.posts as React.ReactNode,
      onPress: () => setActiveScreen('posts'),
      active: activeScreen === 'posts',
    },
    {
      id: 'members',
      title: 'Membros',
      icon: navIcons.members as React.ReactNode,
      onPress: () => setActiveScreen('members'),
      active: activeScreen === 'members',
    },
    {
      id: 'profile',
      title: 'Perfil',
      icon: navIcons.profile as React.ReactNode,
      onPress: () => setActiveScreen('profile'),
      active: activeScreen === 'profile',
    },
  ];

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Icon name="exclamation-triangle" size={48} color={designTokens.colors.error[500]} />
      <Text style={styles.errorTitle}>Erro ao carregar dados</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <Text style={styles.errorHint}>
        Verifique se o backend está rodando em http://localhost:3001
      </Text>
    </View>
  );

  const renderScreen = () => {
    if (error) {
      return renderError();
    }

    switch (activeScreen) {
      case 'posts':
        return <PostsScreen posts={posts} loading={loading} />;
      case 'members':
        return <MembersScreen members={members} loading={loading} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <PostsScreen posts={posts} loading={loading} />;
    }
  };

  // Web/Desktop: sidebar fixa
  if (isWeb && !isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: designTokens.colors.neutral[50] }}>
        <Sidebar items={navItems} />
        <div style={{ flex: 1, marginLeft: 260, minHeight: '100vh', background: designTokens.colors.neutral[50] }}>
          <Container style={{ flex: 1, backgroundColor: designTokens.colors.neutral[50] }}>
            <div style={{ flex: 1, padding: 32, minHeight: '100vh' }}>{renderScreen()}</div>
          </Container>
        </div>
      </div>
    );
  }

  // Mobile/Tablet: menu toggle + drawer + bottom nav
  if (!(!isWeb || isMobile)) return null; // Garante que só renderiza para mobile/tablet
  return (
    <SafeAreaView style={styles.safeArea}>
      <Container style={styles.container}>
        {/* Botão de menu/hamburger */}
        {isMobile && (
          <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
            <Icon name="bars" size={28} />
          </TouchableOpacity>
        )}
        {/* Drawer lateral */}
        {isMobile && sidebarOpen && (
          <View style={styles.drawerOverlay}>
            <Sidebar items={navItems} />
            <TouchableOpacity style={styles.drawerBackdrop} onPress={() => setSidebarOpen(false)} />
          </View>
        )}
        <View style={styles.contentMobile}>{renderScreen()}</View>
        {isMobile && (
          <Navigation
            activeTab={activeScreen}
            onTabPress={handleTabPress}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: designTokens.colors.neutral[50],
    width: '100%',
  },
  desktopRoot: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: designTokens.colors.neutral[50],
  },
  desktopContent: {
    flex: 1,
    marginLeft: 260, // largura da sidebar
    backgroundColor: designTokens.colors.neutral[50],
  },
  contentDesktop: {
    flex: 1,
    paddingVertical: designTokens.spacing[8],
    paddingHorizontal: designTokens.spacing[8],
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: 0,
    backgroundColor: designTokens.colors.neutral[50],
  },
  contentMobile: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: 0,
    backgroundColor: designTokens.colors.neutral[50],
    minHeight: 0,
  },
  menuButton: {
    position: 'absolute',
    top: 24,
    left: 16,
    zIndex: 20,
    backgroundColor: designTokens.colors.white,
    borderRadius: 24,
    padding: 8,
    elevation: 4,
    shadowColor: designTokens.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    zIndex: 30,
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: designTokens.spacing[8],
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: designTokens.colors.error[500],
    marginTop: designTokens.spacing[4],
    marginBottom: designTokens.spacing[2],
  },
  errorMessage: {
    fontSize: 16,
    color: designTokens.colors.neutral[600],
    textAlign: 'center',
    marginBottom: designTokens.spacing[4],
  },
  errorHint: {
    fontSize: 14,
    color: designTokens.colors.neutral[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App; 