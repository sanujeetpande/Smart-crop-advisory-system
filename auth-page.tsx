import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Sprout, ShoppingCart, Users } from 'lucide-react';

interface AuthPageProps {
  onUserTypeSelect: (type: 'buyer' | 'seller') => void;
}

export function AuthPage({ onUserTypeSelect }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* App Logo and Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sprout className="h-12 w-12 text-green-600 mr-2" />
          <h1 className="text-4xl font-bold text-green-800">Khet-e</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-md">
          Your Smart Farming Companion - Connecting farmers with better crop management and market opportunities
        </p>
      </div>

      {/* Account Type Selection */}
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Choose Your Account Type
        </h2>

        {/* Seller Account Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300" 
              onClick={() => onUserTypeSelect('seller')}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Sprout className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-green-700">Seller Account</CardTitle>
            <CardDescription>
              For farmers who want to sell crops, get crop recommendations, and access farming tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sell your crops directly</li>
              <li>• Get personalized crop recommendations</li>
              <li>• Access weather and soil insights</li>
              <li>• Irrigation alerts and farming advice</li>
            </ul>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
              Create Seller Account
            </Button>
          </CardContent>
        </Card>

        {/* Buyer Account Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300" 
              onClick={() => onUserTypeSelect('buyer')}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <ShoppingCart className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-blue-700">Buyer Account</CardTitle>
            <CardDescription>
              For buyers who want to purchase fresh crops directly from farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Buy fresh crops directly from farmers</li>
              <li>• Access real-time market prices</li>
              <li>• Connect with local farmers</li>
              <li>• Quality assured produce</li>
            </ul>
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              Create Buyer Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center mb-2">
          <Users className="h-4 w-4 mr-1" />
          <span>Join thousands of farmers and buyers</span>
        </div>
        <p>Building a sustainable farming ecosystem</p>
      </div>
    </div>
  );
}