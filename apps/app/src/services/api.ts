import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

// Função utilitária para formatação de data
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return 'Data não disponível';
  }

  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    // Formatação simples: DD/MM/AAAA
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    return 'Erro na data';
  }
};

// Interface para dados do backend
interface BackendPost {
  id: number;
  title: string;
  content: string;
  member?: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
}

interface BackendMember {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

// Função para mapear dados do backend para o frontend
const mapBackendPostToFrontend = (backendPost: BackendPost): Post => {
  return {
    id: backendPost.id,
    title: backendPost.title,
    content: backendPost.content,
    author: backendPost.member?.name || 'Autor desconhecido',
    date: formatDate(backendPost.created_at),
    likes: Math.floor(Math.random() * 50) + 10, // Mock de likes
  };
};

const mapBackendMemberToFrontend = (backendMember: BackendMember): Member => {
  // Mapear email para role e department baseado no domínio
  const emailDomain = backendMember.email.split('@')[1];
  const role = emailDomain.includes('stefanini') ? 'Desenvolvedor' : 'Colaborador';
  const department = emailDomain.includes('stefanini') ? 'Tecnologia' : 'Geral';
  
  return {
    id: backendMember.id,
    name: backendMember.name,
    email: backendMember.email,
    role,
    department,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(backendMember.name)}&background=2563eb&color=fff&size=150`,
  };
};

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<BackendPost[]>('/posts');
    
    if (!response.data || response.data.length === 0) {
      throw new Error('Nenhuma postagem encontrada no banco de dados');
    }
    
    return response.data.map(mapBackendPostToFrontend);
  },
};

export const membersApi = {
  getAll: async (): Promise<Member[]> => {
    const response = await api.get<BackendMember[]>('/members');
    
    if (!response.data || response.data.length === 0) {
      throw new Error('Nenhum membro encontrado no banco de dados');
    }
    
    return response.data.map(mapBackendMemberToFrontend);
  },

  getProfile: async (id: number): Promise<Member> => {
    const response = await api.get<BackendMember>(`/members/profile/${id}`);
    
    if (!response.data) {
      throw new Error('Perfil não encontrado no banco de dados');
    }
    
    return mapBackendMemberToFrontend(response.data);
  },
}; 