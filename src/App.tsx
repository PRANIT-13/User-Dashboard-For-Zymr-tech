import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { BarChart3, Users, Loader2, AlertCircle } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';

// Main app component - handles navigation between dashboard and user management

type ActiveTab = 'dashboard' | 'users';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <div className="flex items-center gap-3 text-destructive mb-3">
            <AlertCircle className="h-5 w-5" />
            <h2>Error Loading Data</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            {error}. Don't worry - I've loaded some sample data so you can still try out the features!
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-semibold">User Analytics</h1>
              </div>
              <Badge variant="outline" className="ml-2">
                {users.length} Users
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'users' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('users')}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Users
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'dashboard' ? (
          <Dashboard users={users} />
        ) : (
          <UserList users={users} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm text-muted-foreground">
            <p>User Analytics Dashboard</p>
            <p>API: MockAPI.io</p>
          </div>
        </div>
      </footer>
    </div>
  );
}