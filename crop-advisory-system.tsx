import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Lightbulb, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Droplets, 
  Bug,
  Thermometer,
  Leaf,
  Clock,
  CheckCircle
} from 'lucide-react';

interface AdvisoryItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'irrigation' | 'pest' | 'fertilizer' | 'weather' | 'harvest';
  dueDate?: string;
  completed?: boolean;
}

export function CropAdvisorySystem() {
  const [advisories, setAdvisories] = useState<AdvisoryItem[]>([
    {
      id: '1',
      title: 'Wheat Irrigation Schedule',
      description: 'Apply irrigation to wheat crop. Soil moisture is below optimal level (45%). Irrigate early morning for best results.',
      priority: 'high',
      category: 'irrigation',
      dueDate: 'Today',
      completed: false
    },
    {
      id: '2',
      title: 'Pest Control - Aphids',
      description: 'Aphid infestation detected in nearby farms. Apply neem oil spray as preventive measure.',
      priority: 'medium',
      category: 'pest',
      dueDate: 'Tomorrow',
      completed: false
    },
    {
      id: '3',
      title: 'Nitrogen Fertilizer Application',
      description: 'Apply nitrogen fertilizer to boost crop growth. Use 50kg urea per acre.',
      priority: 'medium',
      category: 'fertilizer',
      dueDate: 'This week',
      completed: false
    },
    {
      id: '4',
      title: 'Weather Alert - Heavy Rain',
      description: 'Heavy rainfall expected in 48 hours. Secure harvested crops and ensure proper drainage.',
      priority: 'high',
      category: 'weather',
      dueDate: '2 days',
      completed: false
    },
    {
      id: '5',
      title: 'Cotton Harvest Ready',
      description: 'Cotton crop has reached optimal maturity. Begin harvesting to maintain quality.',
      priority: 'high',
      category: 'harvest',
      dueDate: 'This week',
      completed: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: Lightbulb },
    { id: 'irrigation', label: 'Irrigation', icon: Droplets },
    { id: 'pest', label: 'Pest Control', icon: Bug },
    { id: 'fertilizer', label: 'Fertilizer', icon: Leaf },
    { id: 'weather', label: 'Weather', icon: Thermometer },
    { id: 'harvest', label: 'Harvest', icon: TrendingUp }
  ];

  const filteredAdvisories = selectedCategory === 'all' 
    ? advisories 
    : advisories.filter(advisory => advisory.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    if (!categoryData) return <Lightbulb className="h-4 w-4" />;
    const Icon = categoryData.icon;
    return <Icon className="h-4 w-4" />;
  };

  const markAsCompleted = (id: string) => {
    setAdvisories(prev => 
      prev.map(advisory => 
        advisory.id === id 
          ? { ...advisory, completed: true }
          : advisory
      )
    );
  };

  const weeklyPlan = [
    { day: 'Monday', tasks: ['Water wheat fields', 'Check soil moisture'] },
    { day: 'Tuesday', tasks: ['Apply fertilizer', 'Inspect for pests'] },
    { day: 'Wednesday', tasks: ['Weed removal', 'Equipment maintenance'] },
    { day: 'Thursday', tasks: ['Market price analysis', 'Plan harvesting'] },
    { day: 'Friday', tasks: ['Irrigation system check', 'Crop monitoring'] },
    { day: 'Saturday', tasks: ['Community meeting', 'Advisory consultation'] },
    { day: 'Sunday', tasks: ['Rest day', 'Plan next week'] }
  ];

  const expertTips = [
    {
      title: 'Soil Health Management',
      tip: 'Add organic compost every 15 days to improve soil structure and water retention capacity.',
      icon: <Leaf className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Water Conservation',
      tip: 'Use drip irrigation to save 40% water compared to flood irrigation. Install mulching to reduce evaporation.',
      icon: <Droplets className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'Natural Pest Control',
      tip: 'Plant marigold around crop boundaries. It acts as a natural pest repellent and attracts beneficial insects.',
      icon: <Bug className="h-5 w-5 text-orange-600" />
    },
    {
      title: 'Harvest Timing',
      tip: 'Harvest in early morning when moisture content is optimal. This ensures better storage and market quality.',
      icon: <Clock className="h-5 w-5 text-purple-600" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-green-800">Crop Advisory System</h2>
        <Badge className="bg-green-100 text-green-800">
          {advisories.filter(a => !a.completed).length} Active Advisories
        </Badge>
      </div>

      <Tabs defaultValue="advisories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="advisories">Current Advisories</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
          <TabsTrigger value="tips">Expert Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="advisories" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Advisory Cards */}
          <div className="space-y-3">
            {filteredAdvisories.map((advisory) => (
              <Card 
                key={advisory.id} 
                className={`border-l-4 ${
                  advisory.priority === 'high' ? 'border-l-red-500' :
                  advisory.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                } ${advisory.completed ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(advisory.category)}
                        <h3 className={`font-semibold ${advisory.completed ? 'line-through' : ''}`}>
                          {advisory.title}
                        </h3>
                        <Badge className={getPriorityColor(advisory.priority)}>
                          {advisory.priority} priority
                        </Badge>
                        {advisory.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{advisory.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {advisory.dueDate}
                      </div>
                    </div>
                    {!advisory.completed && (
                      <Button
                        size="sm"
                        onClick={() => markAsCompleted(advisory.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Done
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">This Week's Farming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyPlan.map((day, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50">
                    <div className="font-semibold text-green-700 min-w-[100px]">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <ul className="space-y-1">
                        {day.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid gap-4">
            {expertTips.map((tip, index) => (
              <Card key={index} className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {tip.icon}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                      <p className="text-gray-600">{tip.tip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">Seasonal Reminder</h3>
              </div>
              <p className="text-yellow-700">
                This is the ideal time for winter crop sowing. Ensure soil preparation is complete and seeds are treated with fungicide before planting.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}