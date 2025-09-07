import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { User, Mail, Phone, MapPin, Building, Briefcase, Calendar } from 'lucide-react';
import { User as UserType } from '../types/user';

interface UserDetailModalProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailModal({ user, open, onOpenChange }: UserDetailModalProps) {
  if (!user) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header with Avatar */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Joined {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
            <Badge variant={user.avatar ? 'default' : 'secondary'}>
              {user.avatar ? 'Has Avatar' : 'No Avatar'}
            </Badge>
          </div>

          {/* Contact Information */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}
              
              {user.address && (
                <div className="flex items-center gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Professional Information */}
          {(user.company || user.jobTitle) && (
            <Card className="p-4">
              <h3 className="font-medium mb-3">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.company && (
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{user.company}</p>
                    </div>
                  </div>
                )}
                
                {user.jobTitle && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Job Title</p>
                      <p className="font-medium">{user.jobTitle}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Account Information */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium font-mono">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}