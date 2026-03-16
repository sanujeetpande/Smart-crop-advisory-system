import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { AlertTriangle, Droplets, Sun, Clock, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AlertsSection() {
  const alerts = [
    {
      id: 1,
      type: 'irrigation',
      icon: Droplets,
      title: 'Irrigation Reminder',
      message: 'Water your wheat crop in the next 2 hours for optimal growth',
      urgency: 'medium',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'weather',
      icon: Sun,
      title: 'Rain Expected',
      message: 'Heavy rainfall expected tomorrow. Secure your harvested crops',
      urgency: 'high',
      time: '5 minutes ago'
    },
    {
      id: 3,
      type: 'advisory',
      icon: AlertTriangle,
      title: 'Pest Alert',
      message: 'Apply organic pesticide to prevent aphid infestation in your crops',
      urgency: 'high',
      time: '1 hour ago'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-red-300 bg-red-50';
      case 'medium':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-blue-300 bg-blue-50';
    }
  };

  const getIconColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
        Farm Alerts & Advice
      </h3>
      
      {alerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <Card key={alert.id} className={`border-2 ${getUrgencyColor(alert.urgency)}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(alert.urgency)}`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}