export interface User {
  id: string;
  createdAt: string;
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  jobTitle?: string;
}

export interface UserStats {
  totalUsers: number;
  usersPerDay: { date: string; count: number }[];
  avatarDistribution: { name: string; value: number }[];
  signupTimeDistribution: { hour: number; count: number }[];
  recentUsers: User[];
}