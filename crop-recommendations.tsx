import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sprout, TrendingUp, Droplets, Calendar } from 'lucide-react';

interface FarmerProfile {
  soilType: 'loamy' | 'sandy' | 'clay' | '';
  landSize: string;
  preferredCrop: string;
  location: string;
}

interface CropRecommendationsProps {
  farmerProfile: FarmerProfile;
}

export function CropRecommendations({ farmerProfile }: CropRecommendationsProps) {
  // Mock recommendation logic based on soil type
  const getRecommendations = () => {
    const baseRecommendations = {
      loamy: [
        {
          crop: 'Wheat',
          suitability: 95,
          expectedYield: '45-50 quintals/acre',
          marketPrice: '₹2,650/quintal',
          season: 'Rabi',
          waterNeeds: 'Medium',
          profit: 'High'
        },
        {
          crop: 'Sugarcane',
          suitability: 90,
          expectedYield: '800-900 quintals/acre',
          marketPrice: '₹350/quintal',
          season: 'Year-round',
          waterNeeds: 'High',
          profit: 'Very High'
        },
        {
          crop: 'Cotton',
          suitability: 85,
          expectedYield: '15-20 quintals/acre',
          marketPrice: '₹8,500/quintal',
          season: 'Kharif',
          waterNeeds: 'Medium',
          profit: 'High'
        }
      ],
      sandy: [
        {
          crop: 'Groundnut',
          suitability: 92,
          expectedYield: '25-30 quintals/acre',
          marketPrice: '₹6,200/quintal',
          season: 'Kharif',
          waterNeeds: 'Low',
          profit: 'High'
        },
        {
          crop: 'Millets',
          suitability: 88,
          expectedYield: '12-15 quintals/acre',
          marketPrice: '₹3,800/quintal',
          season: 'Kharif',
          waterNeeds: 'Low',
          profit: 'Medium'
        },
        {
          crop: 'Mustard',
          suitability: 85,
          expectedYield: '18-22 quintals/acre',
          marketPrice: '₹5,500/quintal',
          season: 'Rabi',
          waterNeeds: 'Low',
          profit: 'Medium'
        }
      ],
      clay: [
        {
          crop: 'Rice',
          suitability: 95,
          expectedYield: '55-60 quintals/acre',
          marketPrice: '₹3,200/quintal',
          season: 'Kharif',
          waterNeeds: 'High',
          profit: 'High'
        },
        {
          crop: 'Sugarcane',
          suitability: 90,
          expectedYield: '850-950 quintals/acre',
          marketPrice: '₹350/quintal',
          season: 'Year-round',
          waterNeeds: 'High',
          profit: 'Very High'
        },
        {
          crop: 'Cotton',
          suitability: 82,
          expectedYield: '16-22 quintals/acre',
          marketPrice: '₹8,500/quintal',
          season: 'Kharif',
          waterNeeds: 'Medium',
          profit: 'High'
        }
      ]
    };

    return baseRecommendations[farmerProfile.soilType] || [];
  };

  const recommendations = getRecommendations();

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return 'bg-green-500';
    if (suitability >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getProfitColor = (profit: string) => {
    switch (profit) {
      case 'Very High':
        return 'bg-green-600 text-white';
      case 'High':
        return 'bg-green-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="bg-green-50 border-2 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center">
          <Sprout className="h-5 w-5 mr-2" />
          Crop Recommendations
        </CardTitle>
        <p className="text-sm text-green-600">
          Based on {farmerProfile.soilType} soil • {farmerProfile.landSize} acres • {farmerProfile.location}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="bg-white border border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{rec.crop}</h4>
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${getSuitabilityColor(rec.suitability)}`}
                  />
                  <span className="text-sm font-medium">{rec.suitability}% suitable</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-gray-600">Expected Yield</p>
                    <p className="font-medium">{rec.expectedYield}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-gray-600">Season</p>
                    <p className="font-medium">{rec.season}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-gray-600">Water Needs</p>
                    <p className="font-medium">{rec.waterNeeds}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-600">Market Price</p>
                  <p className="font-medium text-green-600">{rec.marketPrice}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <Badge className={getProfitColor(rec.profit)}>
                  {rec.profit} Profit Potential
                </Badge>
                
                {index === 0 && (
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    Recommended
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Pro Tip:</strong> Consider crop rotation with legumes to improve soil nitrogen naturally.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}