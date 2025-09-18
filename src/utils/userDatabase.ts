import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
      // Solo usar Supabase si está configurado correctamente
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('roles')
          .select('*')
          .eq('wallet_address', walletAddress)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No se encontró el usuario
            return null;
          }
          throw error;
        }

        return data;
      }

      // Fallback con localStorage
      const storedUsers = localStorage.getItem('certifychain_users');
      if (storedUsers) {
        const users: UserData[] = JSON.parse(storedUsers);
        return users.find(user => user.wallet_address === walletAddress) || null;
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener usuario desde Supabase, usando localStorage:', error);
      
      // Fallback con localStorage si Supabase falla
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
      // Solo usar Supabase si está configurado correctamente
      if (isSupabaseConfigured && supabase) {
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
          throw error;
        }

        // También guardar en localStorage como backup
        const storedUsers = localStorage.getItem('certifychain_users');
        const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
        users.push(data);
        localStorage.setItem('certifychain_users', JSON.stringify(users));
        localStorage.setItem('certifychain_current_user', JSON.stringify(data));

        console.log('✅ Usuario registrado en Supabase y localStorage');
        return data;
      }

      // Fallback con localStorage si Supabase no está configurado
      console.log('📋 Usando localStorage para registro (Supabase no configurado)');
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
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  // Método para actualizar datos del usuario
  async updateUser(walletAddress: string, updates: Partial<UserData>): Promise<UserData | null> {
    try {
      // Solo usar Supabase si está configurado correctamente
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('roles')
          .update(updates)
          .eq('wallet_address', walletAddress)
          .select()
          .single();

        if (error) {
          throw error;
        }

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
      }

      // Fallback con localStorage
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
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      
      // Fallback con localStorage
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