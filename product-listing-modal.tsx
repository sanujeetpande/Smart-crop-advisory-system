import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Upload, Camera, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProductListingModalProps {
  onClose: () => void;
  onSubmit: (product: ProductListing) => void;
}

export interface ProductListing {
  id: string;
  crop: string;
  variety: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  description: string;
  location: string;
  harvestDate: string;
  quality: string;
  images: string[];
  isOrganic: boolean;
}

export function ProductListingModal({ onClose, onSubmit }: ProductListingModalProps) {
  const [product, setProduct] = useState<Partial<ProductListing>>({
    crop: '',
    variety: '',
    quantity: '',
    unit: 'quintal',
    pricePerUnit: '',
    description: '',
    location: '',
    harvestDate: '',
    quality: 'Grade A',
    images: [],
    isOrganic: false
  });

  const crops = [
    'Wheat', 'Rice', 'Maize', 'Sugarcane', 'Cotton', 'Soybean',
    'Pulses', 'Mustard', 'Groundnut', 'Sunflower', 'Barley', 'Millets',
    'Tomato', 'Onion', 'Potato', 'Cauliflower', 'Cabbage'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.crop || !product.quantity || !product.pricePerUnit) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProduct: ProductListing = {
      id: Date.now().toString(),
      crop: product.crop!,
      variety: product.variety || '',
      quantity: product.quantity!,
      unit: product.unit!,
      pricePerUnit: product.pricePerUnit!,
      description: product.description || '',
      location: product.location || '',
      harvestDate: product.harvestDate || '',
      quality: product.quality!,
      images: product.images || [],
      isOrganic: product.isOrganic!
    };

    onSubmit(newProduct);
    toast.success('Product listed successfully!');
    onClose();
  };

  const handleImageUpload = () => {
    // Simulate image upload
    toast.info('Image upload feature coming soon!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-800">List Your Product</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Crop Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type *
                </label>
                <Select
                  value={product.crop}
                  onValueChange={(value) => setProduct({ ...product, crop: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variety
                </label>
                <Input
                  placeholder="e.g., Basmati, Desi"
                  value={product.variety}
                  onChange={(e) => setProduct({ ...product, variety: e.target.value })}
                />
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <Input
                  type="number"
                  placeholder="100"
                  value={product.quantity}
                  onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <Select
                  value={product.unit}
                  onValueChange={(value) => setProduct({ ...product, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quintal">Quintal</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                    <SelectItem value="ton">Ton</SelectItem>
                    <SelectItem value="bag">Bag</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per {product.unit} *
                </label>
                <Input
                  type="number"
                  placeholder="2500"
                  value={product.pricePerUnit}
                  onChange={(e) => setProduct({ ...product, pricePerUnit: e.target.value })}
                />
              </div>
            </div>

            {/* Quality and Harvest Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality Grade
                </label>
                <Select
                  value={product.quality}
                  onValueChange={(value) => setProduct({ ...product, quality: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade A">Grade A (Premium)</SelectItem>
                    <SelectItem value="Grade B">Grade B (Good)</SelectItem>
                    <SelectItem value="Grade C">Grade C (Standard)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harvest Date
                </label>
                <Input
                  type="date"
                  value={product.harvestDate}
                  onChange={(e) => setProduct({ ...product, harvestDate: e.target.value })}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Village, District, State"
                  value={product.location}
                  onChange={(e) => setProduct({ ...product, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe your product quality, farming practices, etc."
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Upload product images</p>
                <Button type="button" variant="outline" onClick={handleImageUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Images
                </Button>
              </div>
            </div>

            {/* Organic Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="organic"
                checked={product.isOrganic}
                onChange={(e) => setProduct({ ...product, isOrganic: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="organic" className="text-sm font-medium text-gray-700">
                This is an organic product
              </label>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                List Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}