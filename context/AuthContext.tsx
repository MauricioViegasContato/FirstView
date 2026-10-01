'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Equipment, Profile, Production, UserRole } from '@/lib/types';
import { INITIAL_EQUIPMENT, INITIAL_PROFILES, INITIAL_PRODUCTIONS } from '@/lib/mockData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: Profile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: UserRole) => void;
  logout: () => void;
  // Equipment State & Actions
  equipmentList: Equipment[];
  addEquipment: (item: Omit<Equipment, 'id'>) => void;
  updateEquipment: (item: Equipment) => void;
  deleteEquipment: (id: string) => void;
  checkoutEquipment: (id: string, memberId: string, memberName: string) => void;
  checkinEquipment: (id: string) => void;
  // Productions State & Actions
  productions: Production[];
  addProduction: (prod: Omit<Production, 'id'>) => void;
  updateProduction: (prod: Production) => void;
  deleteProduction: (id: string) => void;
  // Team Members
  teamMembers: Profile[];
  addMember: (member: Omit<Profile, 'id'>) => void;
  updateMember: (member: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'firstview_user_session';
const LOCAL_STORAGE_EQ_KEY = 'firstview_equipment_state';
const LOCAL_STORAGE_PROD_KEY = 'firstview_productions_state';
const LOCAL_STORAGE_MEMBERS_KEY = 'firstview_members_state';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [productions, setProductions] = useState<Production[]>(INITIAL_PRODUCTIONS);
  const [teamMembers, setTeamMembers] = useState<Profile[]>(INITIAL_PROFILES);

  // Inicialização e Carregamento de Sessão / Estado Persistido
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedEq = localStorage.getItem(LOCAL_STORAGE_EQ_KEY);
      if (storedEq) {
        setEquipmentList(JSON.parse(storedEq));
      }

      const storedProd = localStorage.getItem(LOCAL_STORAGE_PROD_KEY);
      if (storedProd) {
        setProductions(JSON.parse(storedProd));
      }

      const storedMembers = localStorage.getItem(LOCAL_STORAGE_MEMBERS_KEY);
      if (storedMembers) {
        setTeamMembers(JSON.parse(storedMembers));
      }
    } catch (e) {
      console.warn('Erro ao carregar dados do localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sincronizar Equipamentos
  const saveEquipmentList = (newList: Equipment[]) => {
    setEquipmentList(newList);
    try {
      localStorage.setItem(LOCAL_STORAGE_EQ_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  // Sincronizar Produções
  const saveProductions = (newProds: Production[]) => {
    setProductions(newProds);
    try {
      localStorage.setItem(LOCAL_STORAGE_PROD_KEY, JSON.stringify(newProds));
    } catch (e) {
      console.error(e);
    }
  };

  // Sincronizar Membros
  const saveTeamMembers = (newMembers: Profile[]) => {
    setTeamMembers(newMembers);
    try {
      localStorage.setItem(LOCAL_STORAGE_MEMBERS_KEY, JSON.stringify(newMembers));
    } catch (e) {
      console.error(e);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const profileMatch = teamMembers.find(m => m.email.toLowerCase() === email.toLowerCase());
          const activeUser: Profile = profileMatch || {
            id: data.user.id,
            email: data.user.email || email,
            full_name: data.user.user_metadata?.full_name || 'Profissional First View',
            role: (data.user.user_metadata?.role as UserRole) || 'member',
            position: data.user.user_metadata?.position || 'Equipe Técnica',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            skills: ['Cinematografia', 'Produção'],
            is_active: true,
          };
          setUser(activeUser);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(activeUser));
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err.message || 'Erro de autenticação' };
      }
    }

    // Mock Authentication Fallback
    const foundMember = teamMembers.find(m => m.email.toLowerCase() === email.toLowerCase().trim());
    if (foundMember) {
      setUser(foundMember);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(foundMember));
      setIsLoading(false);
      return { success: true };
    }

    // Fallback padrão se digitar qualquer email
    const genericMember: Profile = {
      id: 'user-' + Date.now(),
      email: email.trim(),
      full_name: email.split('@')[0].toUpperCase(),
      role: email.toLowerCase().includes('admin') || email.toLowerCase().includes('diretor') ? 'admin' : 'member',
      position: 'Cinegrafista First View',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      skills: ['Câmera', 'Iluminação'],
      is_active: true,
    };
    setUser(genericMember);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(genericMember));
    setIsLoading(false);
    return { success: true };
  };

  const loginAsDemo = (demoRole: UserRole) => {
    const demoProfile = demoRole === 'admin'
      ? teamMembers.find(m => m.role === 'admin') || INITIAL_PROFILES[0]
      : teamMembers.find(m => m.role === 'member') || INITIAL_PROFILES[1];

    setUser(demoProfile);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoProfile));
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  // Funções CRUD Equipamentos
  const addEquipment = (item: Omit<Equipment, 'id'>) => {
    const newItem: Equipment = {
      ...item,
      id: 'eq-' + Date.now(),
    };
    saveEquipmentList([newItem, ...equipmentList]);
  };

  const updateEquipment = (updatedItem: Equipment) => {
    const updated = equipmentList.map(item => item.id === updatedItem.id ? updatedItem : item);
    saveEquipmentList(updated);
  };

  const deleteEquipment = (id: string) => {
    const filtered = equipmentList.filter(item => item.id !== id);
    saveEquipmentList(filtered);
  };

  const checkoutEquipment = (id: string, memberId: string, memberName: string) => {
    const updated = equipmentList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'em_uso' as const,
          current_holder_id: memberId,
          current_holder_name: memberName,
        };
      }
      return item;
    });
    saveEquipmentList(updated);
  };

  const checkinEquipment = (id: string) => {
    const updated = equipmentList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'disponivel' as const,
          current_holder_id: null,
          current_holder_name: null,
        };
      }
      return item;
    });
    saveEquipmentList(updated);
  };

  // Funções CRUD Produções
  const addProduction = (prod: Omit<Production, 'id'>) => {
    const newProd: Production = {
      ...prod,
      id: 'prod-' + Date.now(),
    };
    saveProductions([newProd, ...productions]);
  };

  const updateProduction = (updatedProd: Production) => {
    const updated = productions.map(p => p.id === updatedProd.id ? updatedProd : p);
    saveProductions(updated);
  };

  const deleteProduction = (id: string) => {
    const filtered = productions.filter(p => p.id !== id);
    saveProductions(filtered);
  };

  // Funções CRUD Equipe
  const addMember = (member: Omit<Profile, 'id'>) => {
    const newMember: Profile = {
      ...member,
      id: 'user-' + Date.now(),
    };
    saveTeamMembers([...teamMembers, newMember]);
  };

  const updateMember = (updatedMember: Profile) => {
    const updated = teamMembers.map(m => m.id === updatedMember.id ? updatedMember : m);
    saveTeamMembers(updated);
    if (user?.id === updatedMember.id) {
      setUser(updatedMember);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedMember));
    }
  };

  const role = user?.role || null;
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin,
        isLoading,
        login,
        loginAsDemo,
        logout,
        equipmentList,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        checkoutEquipment,
        checkinEquipment,
        productions,
        addProduction,
        updateProduction,
        deleteProduction,
        teamMembers,
        addMember,
        updateMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
