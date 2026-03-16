import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Minus, X, RefreshCw, AlertCircle } from 'lucide-react';

interface MarketPrice {
  crop: string;
  price: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
  quality: string;
  volume: number;
}

interface MarketPricesDetailedProps {
  onClose: () => void;
}

export function MarketPricesDetailed({ onClose }: MarketPricesDetailedProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>('wheat');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const marketData: MarketPrice[] = [
    { crop: 'wheat', price: 2650, change: +5.2, trend: 'up', market: 'Delhi', quality: 'Grade A', volume: 1250 },
    { crop: 'wheat', price: 2580, change: +3.8, trend: 'up', market: 'Mumbai', quality: 'Grade A', volume: 980 },
    { crop: 'rice', price: 3200, change: -2.1, trend: 'down', market: 'Kolkata', quality: 'Basmati', volume: 2100 },
    { crop: 'rice', price: 3150, change: -1.8, trend: 'down', market: 'Chennai', quality: 'Basmati', volume: 1850 },
    { crop: 'cotton', price: 8500, change: +8.7, trend: 'up', market: 'Nagpur', quality: 'Superior', volume: 750 },
    { crop: 'cotton', price: 8350, change: +7.2, trend: 'up', market: 'Rajkot', quality: 'Superior', volume: 650 },
    { crop: 'sugarcane', price: 350, change: 0, trend: 'stable', market: 'Pune', quality: 'Standard', volume: 5000 },
    { crop: 'maize', price: 2100, change: +3.4, trend: 'up', market: 'Hyderabad', quality: 'Yellow', volume: 1500 }
  ];

  // Mock historical data for chart
  const getHistoricalData = (crop: string) => {
    const basePrice = marketData.find(item => item.crop === crop)?.price || 2000;
    return [
      { date: '15 Dec', price: basePrice - 200 },
      { date: '16 Dec', price: basePrice - 150 },
      { date: '17 Dec', price: basePrice - 100 },
      { date: '18 Dec', price: basePrice - 50 },
      { date: '19 Dec', price: basePrice - 25 },
      { date: '20 Dec', price: basePrice },
    ];
  };

  const getCropData = (crop: string) => {
    return marketData.filter(item => item.crop === crop);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'rice', name: 'Rice', icon: '🍚' },
    { id: 'cotton', name: 'Cotton', icon: '🌱' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' },
    { id: 'maize', name: 'Maize', icon: '🌽' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                📈 Market Prices - Live Data
              </CardTitle>
              <p className="text-green-100 text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleRefresh} className="text-white hover:bg-green-700">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-green-700">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 max-h-[calc(90vh-120px)] overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="charts">Price Charts</TabsTrigger>
              <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="grid gap-6">
                {/* Crop Selection */}
                <div>
                  <h3 className="font-semibold mb-3">Select Crop</h3>
                  <div className="flex flex-wrap gap-2">
                    {crops.map((crop) => (
                      <Button
                        key={crop.id}
                        variant={selectedCrop === crop.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCrop(crop.id)}
                        className={selectedCrop === crop.id ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {crop.icon} {crop.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selected Crop Data */}
                <div>
                  <h3 className="font-semibold mb-3">
                    {crops.find(c => c.id === selectedCrop)?.name} Prices by Market
                  </h3>
                  <div className="grid gap-3">
                    {getCropData(selectedCrop).map((item, index) => (
                      <Card key={index} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{item.market} Market</h4>
                              <p className="text-sm text-gray-600">{item.quality} Quality</p>
                              <p className="text-lg font-bold text-green-700">
                                ₹{item.price.toLocaleString()}/quintal
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-1">
                                {getTrendIcon(item.trend)}
                                <span className={`font-medium ${getTrendColor(item.trend)}`}>
                                  {item.change > 0 ? '+' : ''}{item.change}%
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Volume: {item.volume} quintals
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="charts" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Price Trend - Last 7 Days</h3>
                  <Card>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={getHistoricalData(selectedCrop)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`₹${value}`, 'Price per quintal']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#16a34a" 
                            strokeWidth={3}
                            dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Volume by Market</h3>
                  <Card>
                    <CardContent className="p-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={getCropData(selectedCrop)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="market" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`${value} quintals`, 'Volume']}
                          />
                          <Bar dataKey="volume" fill="#16a34a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Price Alerts</h3>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    + Add Alert
                  </Button>
                </div>

                <div className="space-y-3">
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Wheat Price Alert</h4>
                          <p className="text-sm text-yellow-700">
                            Alert when wheat price exceeds ₹2,700/quintal
                          </p>
                          <Badge className="bg-yellow-100 text-yellow-800 mt-2">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Cotton Price Alert</h4>
                          <p className="text-sm text-blue-700">
                            Alert when cotton price drops below ₹8,000/quintal
                          </p>
                          <Badge className="bg-blue-100 text-blue-800 mt-2">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Create New Alert</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <select className="p-2 border rounded">
                          <option>Select Crop</option>
                          <option>Wheat</option>
                          <option>Rice</option>
                          <option>Cotton</option>
                        </select>
                        <select className="p-2 border rounded">
                          <option>Price Condition</option>
                          <option>Above ₹</option>
                          <option>Below ₹</option>
                        </select>
                      </div>
                      <input 
                        type="number" 
                        placeholder="Price threshold"
                        className="w-full p-2 border rounded"
                      />
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Create Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}