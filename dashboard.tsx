import React, { useState } from 'react';
import { WeatherWidget } from './weather-widget';
import { MarketPricesWidget } from './market-prices-widget';
import { SellProductsWidget } from './sell-products-widget';
import { BottomNavigation } from './bottom-navigation';
import { SettingsMenu } from './settings-menu';
import { AlertsSection } from './alerts-section';
import { SoilInputForm } from './soil-input-form';
import { CropRecommendations } from './crop-recommendations';
import { ProductListingModal, ProductListing } from './product-listing-modal';
import { AIAssistantChat } from './ai-assistant-chat';
import { CropAdvisorySystem } from './crop-advisory-system';
import { LeaderboardSystem } from './leaderboard-system';
import { MarketPricesDetailed } from './market-prices-detailed';
import { Button } from './ui/button';
import { Menu, User, Bell } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface DashboardProps {
  userType: 'buyer' | 'seller';
  onLogout: () => void;
}

interface FarmerProfile {
  soilType: 'loamy' | 'sandy' | 'clay' | '';
  landSize: string;
  preferredCrop: string;
  location: string;
}

export function Dashboard({ userType, onLogout }: DashboardProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showSoilForm, setShowSoilForm] = useState(false);
  const [showProductListing, setShowProductListing] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showMarketDetails, setShowMarketDetails] = useState(false);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>({
    soilType: '',
    landSize: '',
    preferredCrop: '',
    location: ''
  });

  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [productListings, setProductListings] = useState<ProductListing[]>([]);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleSoilFormSubmit = (profile: FarmerProfile) => {
    setFarmerProfile(profile);
    setShowSoilForm(false);
    toast.success('Farmer profile updated successfully!');
  };

  const handleProductListingSubmit = (product: ProductListing) => {
    setProductListings(prev => [...prev, product]);
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
    toast.info('All notifications marked as read');
  };

  const getTotalRevenue = () => {
    return productListings.reduce((total, product) => {
      return total + (parseFloat(product.pricePerUnit) * parseFloat(product.quantity));
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-green-800">Khet-e</h1>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {userType === 'seller' ? 'Farmer' : 'Buyer'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      {/* Settings Dropdown */}
      {showSettings && (
        <SettingsMenu 
          onClose={() => setShowSettings(false)}
          onLogout={onLogout}
          onProfileSetup={() => setShowSoilForm(true)}
        />
      )}

      {/* Soil Input Form Modal */}
      {showSoilForm && (
        <SoilInputForm
          onSubmit={handleSoilFormSubmit}
          onClose={() => setShowSoilForm(false)}
          initialData={farmerProfile}
        />
      )}

      {/* Product Listing Modal */}
      {showProductListing && (
        <ProductListingModal
          onSubmit={handleProductListingSubmit}
          onClose={() => setShowProductListing(false)}
        />
      )}

      {/* AI Assistant Chat */}
      {showAIChat && (
        <AIAssistantChat
          onClose={() => setShowAIChat(false)}
        />
      )}

      {/* Market Prices Detailed */}
      {showMarketDetails && (
        <MarketPricesDetailed
          onClose={() => setShowMarketDetails(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeBottomTab === 'home' && (
          <div className="space-y-4 p-4">
            {/* Hero Section with Background Image */}
            <div className="relative h-48 rounded-lg overflow-hidden mb-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1716544895422-7ea0e1cf9344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbGFuZHNjYXBlJTIwaW5kaWElMjBjcm9wc3xlbnwxfHx8fDE3NTgzNTc5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Farm landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent flex items-center">
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome to Smart Farming
                  </h2>
                  <p className="text-green-100">
                    Get insights, recommendations, and market updates
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Widget - Covers 1/3 of top screen */}
            <WeatherWidget />

            {/* Alerts Section */}
            <AlertsSection />

            {/* Market Prices and Sell Products - Square widgets side by side */}
            <div className="grid grid-cols-2 gap-4">
              <MarketPricesWidget onViewDetails={() => setShowMarketDetails(true)} />
              {userType === 'seller' && (
                <SellProductsWidget 
                  onAddListing={() => setShowProductListing(true)}
                  listingCount={productListings.length}
                  totalRevenue={getTotalRevenue()}
                />
              )}
              {userType === 'buyer' && (
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Browse Products</h3>
                  <p className="text-sm text-blue-600 mb-3">Find fresh produce from local farmers</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                    Browse Crops
                  </Button>
                </div>
              )}
            </div>

            {/* Crop Recommendations - Only for sellers */}
            {userType === 'seller' && farmerProfile.soilType && (
              <CropRecommendations farmerProfile={farmerProfile} />
            )}

            {/* Setup Profile CTA - Only for sellers without profile */}
            {userType === 'seller' && !farmerProfile.soilType && (
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Complete Your Farmer Profile</h3>
                <p className="text-sm text-yellow-600 mb-3">
                  Add your soil type and land details to get personalized crop recommendations
                </p>
                <Button 
                  onClick={() => setShowSoilForm(true)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                  size="sm"
                >
                  Setup Profile
                </Button>
              </div>
            )}
          </div>
        )}

        {activeBottomTab === 'advisory' && (
          <div className="p-4">
            <CropAdvisorySystem />
          </div>
        )}

        {activeBottomTab === 'ai' && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">AI Assistant</h2>
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Smart Farming AI</h3>
              <p className="text-blue-600 mb-4">
                Ask questions about farming, get instant answers and personalized recommendations.
              </p>
              <Button 
                onClick={() => setShowAIChat(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Start Conversation
              </Button>
            </div>
          </div>
        )}

        {activeBottomTab === 'leaderboard' && (
          <div className="p-4">
            <LeaderboardSystem />
          </div>
        )}

        {activeBottomTab === 'account' && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Account</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="h-8 w-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Profile Settings</h3>
                    <p className="text-sm text-gray-600">Manage your account information</p>
                  </div>
                </div>
                {userType === 'seller' && (
                  <Button 
                    onClick={() => setShowSoilForm(true)}
                    variant="outline" 
                    size="sm"
                  >
                    Edit Farmer Profile
                  </Button>
                )}
              </div>
              
              <Button 
                onClick={onLogout}
                variant="destructive"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeBottomTab}
        onTabChange={setActiveBottomTab}
      />
    </div>
  );
}