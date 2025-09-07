import { User } from '../types/user';

const API_BASE_URL = 'https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1';

export const userApi = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      // Return mock data as fallback
      return generateMockUsers();
    }
  },

  async getUser(id: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }
};

// Mock data generator for fallback
function generateMockUsers(): User[] {
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Wilson', 'Eva Martinez', 'Frank Davis', 'Grace Lee', 'Henry Taylor', 'Ivy Chen', 'Jack Anderson', 'Kate Murphy', 'Liam O\'Connor', 'Mia Rodriguez', 'Noah Thompson', 'Olivia White'];
  const companies = ['Tech Corp', 'Digital Solutions', 'Innovation Labs', 'Future Systems', 'Smart Technologies'];
  const jobTitles = ['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'Marketing Manager'];
  
  return names.map((name, index) => {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
    createdDate.setHours(Math.floor(Math.random() * 24));
    
    return {
      id: (index + 1).toString(),
      createdAt: createdDate.toISOString(),
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      avatar: Math.random() > 0.3 ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` : undefined,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      address: `${Math.floor(Math.random() * 999) + 1} Main St, City, ST 12345`,
      company: companies[Math.floor(Math.random() * companies.length)],
      jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)]
    };
  });
}