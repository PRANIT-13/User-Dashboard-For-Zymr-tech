import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Users, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { User } from '../types/user';
import { UserDetailModal } from './UserDetailModal';

interface UserListProps {
  users: User[];
}

type SortField = 'name' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export function UserList({ users }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const usersPerPage = 10;

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;
      
      if (sortField === 'createdAt') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      } else {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + usersPerPage);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6" />
        <h1>User Management</h1>
      </div>

      <Card className="p-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={`${sortField}-${sortDirection}`} onValueChange={(value) => {
            const [field, direction] = value.split('-') as [SortField, SortDirection];
            setSortField(field);
            setSortDirection(direction);
          }}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} users
          </p>
          <Badge variant="outline">
            Page {currentPage} of {totalPages}
          </Badge>
        </div>

        {/* Users Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-medium"
                  >
                    Name
                    {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('createdAt')}
                    className="h-auto p-0 font-medium"
                  >
                    Joined
                    {getSortIcon('createdAt')}
                  </Button>
                </TableHead>
                <TableHead>Avatar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No users found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleUserClick(user)}
                  >
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{user.company || '-'}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={user.avatar ? 'default' : 'secondary'} className="text-xs">
                        {user.avatar ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </Card>

      <UserDetailModal
        user={selectedUser}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}