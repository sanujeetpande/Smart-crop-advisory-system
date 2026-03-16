import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, MapPin } from 'lucide-react';

interface SoilInputFormProps {
  onSubmit: (profile: FarmerProfile) => void;
  onClose: () => void;
  initialData?: FarmerProfile;
}

interface FarmerProfile {
  soilType: 'loamy' | 'sandy' | 'clay' | '';
  landSize: string;
  preferredCrop: string;
  location: string;
}

export function SoilInputForm({ onSubmit, onClose, initialData }: SoilInputFormProps) {
  const [profile, setProfile] = useState<FarmerProfile>(
    initialData || {
      soilType: '',
      landSize: '',
      preferredCrop: '',
      location: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.soilType && profile.landSize && profile.location) {
      onSubmit(profile);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const crops = [
    'Wheat', 'Rice', 'Maize', 'Sugarcane', 'Cotton', 'Soybean', 
    'Pulses', 'Mustard', 'Groundnut', 'Sunflower', 'Barley', 'Millets'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-800">Farmer Profile Setup</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type *
              </label>
              <Select
                value={profile.soilType}
                onValueChange={(value: 'loamy' | 'sandy' | 'clay') => 
                  setProfile({ ...profile, soilType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">
                    <div>
                      <div className="font-medium">Loamy Soil</div>
                      <div className="text-xs text-gray-500">Best for most crops</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="sandy">
                    <div>
                      <div className="font-medium">Sandy Soil</div>
                      <div className="text-xs text-gray-500">Good drainage, needs more water</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="clay">
                    <div>
                      <div className="font-medium">Clay Soil</div>
                      <div className="text-xs text-gray-500">Retains water well</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Land Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Size (in acres) *
              </label>
              <Input
                type="number"
                placeholder="Enter land size"
                value={profile.landSize}
                onChange={(e) => setProfile({ ...profile, landSize: e.target.value })}
                min="0"
                step="0.1"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter your location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Preferred Crop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Crop (Optional)
              </label>
              <Select
                value={profile.preferredCrop}
                onValueChange={(value) => 
                  setProfile({ ...profile, preferredCrop: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}