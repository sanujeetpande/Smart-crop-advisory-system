import React from 'react';
import { Home, Lightbulb, Bot, Trophy, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'advisory', icon: Lightbulb, label: 'Advisory' },
    { id: 'ai', icon: Bot, label: 'AI Assistant' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'account', icon: User, label: 'Account' }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-green-600' : 'text-gray-600'}`} />
              <span className={`text-xs ${isActive ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}