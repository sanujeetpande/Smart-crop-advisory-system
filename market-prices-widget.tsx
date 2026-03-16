import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketPricesWidgetProps {
  onViewDetails?: () => void;
}

export function MarketPricesWidget({ onViewDetails }: MarketPricesWidgetProps) {
  // Mock market data for Indian crops
  const marketData = [
    { crop: 'Wheat', price: 2650, change: +5.2, trend: 'up' },
    { crop: 'Rice', price: 3200, change: -2.1, trend: 'down' },
    { crop: 'Sugarcane', price: 350, change: 0, trend: 'stable' },
    { crop: 'Cotton', price: 8500, change: +8.7, trend: 'up' },
    { crop: 'Maize', price: 2100, change: +3.4, trend: 'up' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="bg-green-50 border-2 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-800 flex items-center">
          📈 Market Prices
        </CardTitle>
        <p className="text-sm text-green-600">₹ per quintal</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {marketData.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{item.crop}</p>
              <p className="text-sm font-semibold text-green-700">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon(item.trend)}
              <span className={`text-xs font-medium ${getTrendColor(item.trend)}`}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
            </div>
          </div>
        ))}
        
        <button 
          className="w-full text-sm text-green-700 hover:text-green-800 font-medium mt-3 py-2 border-t border-green-200"
          onClick={onViewDetails}
        >
          View All Prices →
        </button>
      </CardContent>
    </Card>
  );
}