import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Trophy, Medal, Award, TrendingUp, Target, Users, Crown, Star } from 'lucide-react';

interface FarmerRanking {
  id: string;
  name: string;
  location: string;
  points: number;
  rank: number;
  badge: string;
  achievements: string[];
  cropYield: number;
  sustainabilityScore: number;
  marketSuccess: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
}

export function LeaderboardSystem() {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const topFarmers: FarmerRanking[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      location: 'Punjab',
      points: 2850,
      rank: 1,
      badge: 'Gold Master',
      achievements: ['High Yield Champion', 'Organic Pioneer', 'Water Saver'],
      cropYield: 95,
      sustainabilityScore: 92,
      marketSuccess: 88
    },
    {
      id: '2',
      name: 'Priya Sharma',
      location: 'Haryana',
      points: 2720,
      rank: 2,
      badge: 'Silver Expert',
      achievements: ['Crop Rotation Master', 'Pest Control Expert'],
      cropYield: 92,
      sustainabilityScore: 89,
      marketSuccess: 91
    },
    {
      id: '3',
      name: 'Amit Patel',
      location: 'Gujarat',
      points: 2650,
      rank: 3,
      badge: 'Bronze Achiever',
      achievements: ['Innovation Leader', 'Community Helper'],
      cropYield: 88,
      sustainabilityScore: 94,
      marketSuccess: 85
    },
    {
      id: '4',
      name: 'Sunita Devi',
      location: 'Uttar Pradesh',
      points: 2580,
      rank: 4,
      badge: 'Rising Star',
      achievements: ['First Time Farmer', 'Quick Learner'],
      cropYield: 87,
      sustainabilityScore: 86,
      marketSuccess: 90
    },
    {
      id: '5',
      name: 'Mohan Singh',
      location: 'Rajasthan',
      points: 2490,
      rank: 5,
      badge: 'Dedicated Farmer',
      achievements: ['Consistent Performer', 'Weather Warrior'],
      cropYield: 85,
      sustainabilityScore: 91,
      marketSuccess: 82
    }
  ];

  // Current user (you)
  const currentUser: FarmerRanking = {
    id: 'current',
    name: 'You',
    location: 'Your Location',
    points: 2320,
    rank: 8,
    badge: 'Aspiring Farmer',
    achievements: ['Getting Started', 'Tech Adopter'],
    cropYield: 78,
    sustainabilityScore: 85,
    marketSuccess: 79
  };

  const availableAchievements: Achievement[] = [
    {
      id: '1',
      title: 'High Yield Champion',
      description: 'Achieve 90%+ crop yield efficiency',
      icon: '🏆',
      points: 500,
      unlocked: false
    },
    {
      id: '2',
      title: 'Water Conservation Hero',
      description: 'Save 30% water using efficient irrigation',
      icon: '💧',
      points: 300,
      unlocked: true
    },
    {
      id: '3',
      title: 'Organic Pioneer',
      description: 'Complete one full organic crop cycle',
      icon: '🌱',
      points: 400,
      unlocked: false
    },
    {
      id: '4',
      title: 'Tech Adopter',
      description: 'Use Khet-e app for 30 consecutive days',
      icon: '📱',
      points: 200,
      unlocked: true
    },
    {
      id: '5',
      title: 'Community Helper',
      description: 'Help 5 farmers with advice',
      icon: '🤝',
      points: 250,
      unlocked: false
    },
    {
      id: '6',
      title: 'Market Master',
      description: 'Achieve 85%+ market success rate',
      icon: '💰',
      points: 350,
      unlocked: false
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Trophy className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    if (badge.includes('Gold')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (badge.includes('Silver')) return 'bg-gray-100 text-gray-800 border-gray-300';
    if (badge.includes('Bronze')) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-yellow-800">Farmer Leaderboard</h2>
        <Badge className="bg-yellow-100 text-yellow-800">
          Your Rank: #{currentUser.rank}
        </Badge>
      </div>

      <Tabs defaultValue="rankings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="your-stats">Your Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="rankings" className="space-y-4">
          {/* Period Selector */}
          <div className="flex gap-2">
            {(['weekly', 'monthly', 'yearly'] as const).map((period) => (
              <Badge
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedPeriod === period ? 'bg-yellow-600' : 'hover:bg-yellow-50'
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Badge>
            ))}
          </div>

          {/* Your Position */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(currentUser.rank)}
                    <span className="font-bold text-lg">#{currentUser.rank}</span>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white">You</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{currentUser.name}</h3>
                    <p className="text-sm text-gray-600">{currentUser.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{currentUser.points} pts</p>
                  <Badge className={getBadgeColor(currentUser.badge)}>
                    {currentUser.badge}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Farmers */}
          <div className="space-y-3">
            {topFarmers.map((farmer) => (
              <Card key={farmer.id} className={farmer.rank <= 3 ? 'border-2 border-yellow-200 bg-yellow-50' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(farmer.rank)}
                        <span className="font-bold text-lg">#{farmer.rank}</span>
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-green-600 text-white">
                          {farmer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{farmer.name}</h3>
                        <p className="text-sm text-gray-600">{farmer.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">{farmer.points} pts</p>
                      <Badge className={getBadgeColor(farmer.badge)}>
                        {farmer.badge}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {farmer.achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {availableAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className={`font-semibold ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{achievement.points} pts</p>
                      {achievement.unlocked ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="your-stats" className="space-y-4">
          <div className="grid gap-4">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Your Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Crop Yield Efficiency</span>
                    <span className="text-sm font-bold">{currentUser.cropYield}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(currentUser.cropYield)}`}
                      style={{ width: `${currentUser.cropYield}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Sustainability Score</span>
                    <span className="text-sm font-bold">{currentUser.sustainabilityScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(currentUser.sustainabilityScore)}`}
                      style={{ width: `${currentUser.sustainabilityScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Market Success Rate</span>
                    <span className="text-sm font-bold">{currentUser.marketSuccess}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(currentUser.marketSuccess)}`}
                      style={{ width: `${currentUser.marketSuccess}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Goals to Next Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span>Increase crop yield to 85%</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">+200 pts</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Complete organic certification</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+400 pts</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-yellow-600" />
                      <span>Help 3 more farmers</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">+150 pts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}