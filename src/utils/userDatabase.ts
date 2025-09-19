import { supabase } from '../lib/supabase';

export interface UserData {
  id?: string;
  wallet_address: string;
  rol: 'director' | 'estudiante';
  nombre: string;
  created_at?: string;
}

class UserDatabase {
  private static instance: UserDatabase;

  static getInstance(): UserDatabase {
    if (!UserDatabase.instance) {
      UserDatabase.instance = new UserDatabase();
    }
    return UserDatabase.instance;
  }

  // Método para verificar si el usuario ya está registrado
  async getUserByWallet(walletAddress: string): Promise<UserData | null> {
    try {
      console.log('🔍 Buscando usuario en Supabase:', walletAddress);
      
      // Intentar con Supabase primero (como en CertificatePage.tsx)
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No se encontró el usuario en Supabase
          console.log('👤 Usuario no encontrado en Supabase');
          return null;
        }
        console.error('❌ Error de Supabase:', error);
        throw error;
      }

      console.log('✅ Usuario encontrado en Supabase:', data);
      
      // También guardar en localStorage como backup
      localStorage.setItem('certifychain_current_user', JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('❌ Error al obtener usuario desde Supabase:', error);
      
      // Fallback con localStorage solo si Supabase falla completamente
      console.log('📋 Usando localStorage como fallback');
      const storedUsers = localStorage.getItem('certifychain_users');
      if (storedUsers) {
        const users: UserData[] = JSON.parse(storedUsers);
        return users.find(user => user.wallet_address === walletAddress) || null;
      }
      
      return null;
    }
  }

  // Método para registrar un nuevo usuario
  async registerUser(userData: Omit<UserData, 'id' | 'created_at'>): Promise<UserData | null> {
    try {
      console.log('💾 Registrando usuario en Supabase:', userData);
      
      // Intentar registrar en Supabase primero (como en CertificatePage.tsx)
      const { data, error } = await supabase
        .from('roles')
        .insert([{
          wallet_address: userData.wallet_address,
          rol: userData.rol,
          nombre: userData.nombre
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Error al insertar en Supabase:', error);
        throw error;
      }

      console.log('✅ Usuario registrado exitosamente en Supabase:', data);

      // También guardar en localStorage como backup
      const storedUsers = localStorage.getItem('certifychain_users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(data);
      localStorage.setItem('certifychain_users', JSON.stringify(users));
      localStorage.setItem('certifychain_current_user', JSON.stringify(data));

      return data;
    } catch (error) {
      console.error('❌ Error al registrar usuario en Supabase:', error);
      
      // Fallback con localStorage solo si Supabase falla completamente
      console.log('📋 Usando localStorage como fallback para registro');
      const newUser: UserData = {
        ...userData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };

      const storedUsers = localStorage.getItem('certifychain_users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Verificar si ya existe
      const existingUser = users.find(user => user.wallet_address === userData.wallet_address);
      if (existingUser) {
        throw new Error('Usuario ya registrado');
      }
      
      users.push(newUser);
      localStorage.setItem('certifychain_users', JSON.stringify(users));
      localStorage.setItem('certifychain_current_user', JSON.stringify(newUser));
      
      return newUser;
    }
  }

  // Método para actualizar datos del usuario
  async updateUser(walletAddress: string, updates: Partial<UserData>): Promise<UserData | null> {
    try {
      console.log('🔄 Actualizando usuario en Supabase:', walletAddress, updates);
      
      // Intentar actualizar en Supabase primero
      const { data, error } = await supabase
        .from('roles')
        .update(updates)
        .eq('wallet_address', walletAddress)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al actualizar en Supabase:', error);
        throw error;
      }

      console.log('✅ Usuario actualizado en Supabase:', data);

      // Actualizar también en localStorage
      const storedUsers = localStorage.getItem('certifychain_users');
      if (storedUsers) {
        const users: UserData[] = JSON.parse(storedUsers);
        const userIndex = users.findIndex(user => user.wallet_address === walletAddress);
        
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...data };
          localStorage.setItem('certifychain_users', JSON.stringify(users));
          
          // Actualizar usuario actual si es el mismo
          const currentUser = localStorage.getItem('certifychain_current_user');
          if (currentUser) {
            const current = JSON.parse(currentUser);
            if (current.wallet_address === walletAddress) {
              localStorage.setItem('certifychain_current_user', JSON.stringify(users[userIndex]));
            }
          }
        }
      }

      return data;
    } catch (error) {
      console.error('❌ Error al actualizar usuario en Supabase:', error);
      
      // Fallback con localStorage
      console.log('📋 Usando localStorage como fallback para actualización');
      const storedUsers = localStorage.getItem('certifychain_users');
      if (storedUsers) {
        const users: UserData[] = JSON.parse(storedUsers);
        const userIndex = users.findIndex(user => user.wallet_address === walletAddress);
        
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updates };
          localStorage.setItem('certifychain_users', JSON.stringify(users));
          
          // Actualizar usuario actual si es el mismo
          const currentUser = localStorage.getItem('certifychain_current_user');
          if (currentUser) {
            const current = JSON.parse(currentUser);
            if (current.wallet_address === walletAddress) {
              localStorage.setItem('certifychain_current_user', JSON.stringify(users[userIndex]));
            }
          }
          
          return users[userIndex];
        }
      }
      
      return null;
    }
  }

  // Método para obtener el usuario actual desde localStorage
  getCurrentUser(): UserData | null {
    try {
      const currentUser = localStorage.getItem('certifychain_current_user');
      return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  }

  // Método para limpiar datos locales (logout)
  clearCurrentUser(): void {
    localStorage.removeItem('certifychain_current_user');
  }
}

export const userDatabase = UserDatabase.getInstance();