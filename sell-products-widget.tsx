import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, Package, TrendingUp } from 'lucide-react';

interface SellProductsWidgetProps {
  onAddListing: () => void;
  listingCount: number;
  totalRevenue: number;
}

export function SellProductsWidget({ onAddListing, listingCount, totalRevenue }: SellProductsWidgetProps) {
  return (
    <Card className="bg-yellow-50 border-2 border-yellow-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-yellow-800 flex items-center">
          🌾 Sell Products
        </CardTitle>
        <p className="text-sm text-yellow-600">List your crops for sale</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Active Listings</span>
            <span className="font-semibold text-yellow-700">{listingCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Revenue</span>
            <span className="font-semibold text-green-600">₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        <div className="border-t border-yellow-200 pt-3">
          <Button 
            className="w-full bg-yellow-600 hover:bg-yellow-700 mb-2" 
            size="sm"
            onClick={onAddListing}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Listing
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Package className="h-3 w-3 mr-1" />
              My Listings
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Analytics
            </Button>
          </div>
        </div>

        <div className="bg-yellow-100 p-2 rounded text-xs text-yellow-800">
          💡 Tip: Upload quality photos to increase sales by 40%
        </div>
      </CardContent>
    </Card>
  );
}