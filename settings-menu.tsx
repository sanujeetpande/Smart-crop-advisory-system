import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { User, Settings, HelpCircle, LogOut, Sprout } from 'lucide-react';

interface SettingsMenuProps {
  onClose: () => void;
  onLogout: () => void;
  onProfileSetup: () => void;
}

export function SettingsMenu({ onClose, onLogout, onProfileSetup }: SettingsMenuProps) {
  return (
    <div className="absolute top-16 right-4 z-50">
      <Card className="w-64 shadow-lg border-2">
        <CardContent className="p-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onProfileSetup}
            >
              <Sprout className="h-4 w-4 mr-3" />
              Farmer Profile
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onClose}
            >
              <User className="h-4 w-4 mr-3" />
              Account Settings
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onClose}
            >
              <Settings className="h-4 w-4 mr-3" />
              App Settings
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onClose}
            >
              <HelpCircle className="h-4 w-4 mr-3" />
              Help & Support
            </Button>
            
            <div className="border-t pt-2 mt-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 -z-10"
        onClick={onClose}
      />
    </div>
  );
}