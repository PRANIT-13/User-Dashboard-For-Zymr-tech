import { useState, useEffect } from 'react';
import { User, UserStats } from '../types/user';
import { userApi } from '../services/api';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const userData = await userApi.getUsers();
        setUsers(userData);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}

export function useUserStats(users: User[]): UserStats {
  return {
    totalUsers: users.length,
    usersPerDay: generateUsersPerDayData(users),
    avatarDistribution: generateAvatarDistribution(users),
    signupTimeDistribution: generateSignupTimeDistribution(users),
    recentUsers: users
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  };
}

function generateUsersPerDayData(users: User[]) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const userCounts = last30Days.map(date => {
    const count = users.filter(user => 
      user.createdAt.split('T')[0] === date
    ).length;
    return { date, count };
  });

  return userCounts;
}

function generateAvatarDistribution(users: User[]) {
  const withAvatar = users.filter(user => user.avatar).length;
  const withoutAvatar = users.length - withAvatar;
  
  return [
    { name: 'With Avatar', value: withAvatar },
    { name: 'Without Avatar', value: withoutAvatar }
  ];
}

function generateSignupTimeDistribution(users: User[]) {
  const hourCounts = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));
  
  users.forEach(user => {
    const hour = new Date(user.createdAt).getHours();
    hourCounts[hour].count++;
  });
  
  return hourCounts;
}