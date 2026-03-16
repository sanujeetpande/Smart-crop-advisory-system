import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Phone, Shield, CheckCircle } from 'lucide-react';

interface SignUpPageProps {
  userType: 'buyer' | 'seller';
  onSignUpComplete: () => void;
  onBack: () => void;
}

export function SignUpPage({ userType, onSignUpComplete, onBack }: SignUpPageProps) {
  const [step, setStep] = useState<'mobile' | 'otp' | 'success'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onSignUpComplete();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Create {userType === 'seller' ? 'Seller' : 'Buyer'} Account
          </h1>
          <p className="text-gray-600">
            {step === 'mobile' && 'Enter your mobile number to get started'}
            {step === 'otp' && 'Enter the OTP sent to your mobile number'}
            {step === 'success' && 'Account created successfully!'}
          </p>
        </div>
      </div>

      {/* Mobile Number Step */}
      {step === 'mobile' && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Phone className="h-10 w-10 text-green-600 mx-auto mb-2" />
            <CardTitle>Mobile Number</CardTitle>
            <CardDescription>
              We'll send you an OTP for verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +91
                </span>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="rounded-l-none"
                  maxLength={10}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSendOTP}
              disabled={mobileNumber.length !== 10 || isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* OTP Verification Step */}
      {step === 'otp' && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-10 w-10 text-blue-600 mx-auto mb-2" />
            <CardTitle>Verify OTP</CardTitle>
            <CardDescription>
              OTP sent to +91 {mobileNumber}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            
            <Button 
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm text-gray-600">
                Didn't receive OTP? Resend
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Account Created Successfully!
            </h3>
            <p className="text-gray-600">
              Welcome to Khet-e! Redirecting to your dashboard...
            </p>
            <div className="mt-4">
              <div className="animate-spin h-6 w-6 border-2 border-green-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <div className="mt-6 text-center text-xs text-gray-500 max-w-md">
        <p>
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          Your mobile number will be kept secure and used only for account verification.
        </p>
      </div>
    </div>
  );
}