import React from 'react';
import { Card, CardContent } from './ui/card';
import { Cloud, Sun, Droplets, Wind, Thermometer } from 'lucide-react';

export function WeatherWidget() {
  // Mock weather data
  const weatherData = {
    location: 'Punjab, India',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 'Expected tomorrow',
    uvIndex: 'Moderate'
  };

  return (
    <Card className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{weatherData.location}</h3>
            <p className="text-blue-100 text-sm">Current Weather</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 mr-1" />
              <span className="text-2xl font-bold">{weatherData.temperature}°C</span>
            </div>
            <p className="text-blue-100 text-sm">{weatherData.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Droplets className="h-5 w-5 mx-auto mb-1 text-blue-200" />
            <p className="text-xs text-blue-100">Humidity</p>
            <p className="font-semibold">{weatherData.humidity}%</p>
          </div>
          
          <div className="text-center">
            <Wind className="h-5 w-5 mx-auto mb-1 text-blue-200" />
            <p className="text-xs text-blue-100">Wind</p>
            <p className="font-semibold">{weatherData.windSpeed} km/h</p>
          </div>
          
          <div className="text-center">
            <Cloud className="h-5 w-5 mx-auto mb-1 text-blue-200" />
            <p className="text-xs text-blue-100">Rain</p>
            <p className="font-semibold text-xs">Tomorrow</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-400/30 rounded-lg">
          <div className="flex items-center">
            <Sun className="h-4 w-4 mr-2 text-yellow-200" />
            <span className="text-sm">UV Index: {weatherData.uvIndex} - Good for field work</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}