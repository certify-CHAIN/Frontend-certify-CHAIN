import { supabase } from '../lib/supabase';

export interface UserData {
  id?: string;
  wallet_address: string;
  rol: 'director' | 'student';
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

  // Method to check if user is already registered
  async getUserByWallet(walletAddress: string): Promise<UserData | null> {
    try {
      console.log('🔍 Searching for user in Supabase:', walletAddress);
      
      // Try Supabase first (as in CertificatePage.tsx)
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // User not found in Supabase
          console.log('👤 User not found in Supabase');
          return null;
        }
        console.error('❌ Error de Supabase:', error);
        throw error;
      }

      console.log('✅ User found in Supabase:', data);
      
      // Also save in localStorage as backup
      localStorage.setItem('certifychain_current_user', JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('❌ Error getting user from Supabase:', error);
      
      // Fallback with localStorage only if Supabase fails completely
      console.log('📋 Using localStorage as fallback');
      const storedUsers = localStorage.getItem('certifychain_users');
      if (storedUsers) {
        const users: UserData[] = JSON.parse(storedUsers);
        return users.find(user => user.wallet_address === walletAddress) || null;
      }
      
      return null;
    }
  }

  // Method to register a new user
  async registerUser(userData: Omit<UserData, 'id' | 'created_at'>): Promise<UserData | null> {
    try {
      console.log('💾 Registering user in Supabase:', userData);
      
      // Try registering in Supabase first (as in CertificatePage.tsx)
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
        console.error('❌ Error inserting in Supabase:', error);
        throw error;
      }

      console.log('✅ User successfully registered in Supabase:', data);

      // Also save in localStorage as backup
      const storedUsers = localStorage.getItem('certifychain_users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(data);
      localStorage.setItem('certifychain_users', JSON.stringify(users));
      localStorage.setItem('certifychain_current_user', JSON.stringify(data));

      return data;
    } catch (error) {
      console.error('❌ Error registering user in Supabase:', error);
      
      // Fallback with localStorage only if Supabase fails completely
      console.log('📋 Using localStorage as fallback for registration');
      const newUser: UserData = {
        ...userData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };

      const storedUsers = localStorage.getItem('certifychain_users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if already exists
      const existingUser = users.find(user => user.wallet_address === userData.wallet_address);
      if (existingUser) {
        throw new Error('User already registered');
      }
      
      users.push(newUser);
      localStorage.setItem('certifychain_users', JSON.stringify(users));
      localStorage.setItem('certifychain_current_user', JSON.stringify(newUser));
      
      return newUser;
    }
  }

  // Method to update user data
  async updateUser(walletAddress: string, updates: Partial<UserData>): Promise<UserData | null> {
    try {
      console.log('🔄 Updating user in Supabase:', walletAddress, updates);
      
      // Try updating in Supabase first
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
      console.error('❌ Error updating user in Supabase:', error);
      
      // Fallback with localStorage
      console.log('📋 Using localStorage as fallback for update');
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

  // Method to get current user from localStorage
  getCurrentUser(): UserData | null {
    try {
      const currentUser = localStorage.getItem('certifychain_current_user');
      return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Method to clear local data (logout)
  clearCurrentUser(): void {
    localStorage.removeItem('certifychain_current_user');
  }
}

export const userDatabase = UserDatabase.getInstance();