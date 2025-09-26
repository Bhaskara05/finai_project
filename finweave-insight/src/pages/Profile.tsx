import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Camera, Save, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  name: string;
  email: string;
  contactNumber: string;
  gender: string;
  bankName: string;
  state: string;
  location: string;
  monthlyIncome: string;
  financialGoals: string;
  riskTolerance: string;
  familyDependents: string;
  existingLiabilities: string;
  investmentInterests: string;
  lifestyleHabits: string;
}

export default function Profile() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    contactNumber: '+91 9876543210',
    gender: 'male',
    bankName: 'State Bank of India',
    state: 'Karnataka',
    location: 'Bangalore',
    monthlyIncome: '85000',
    financialGoals: 'Save for house down payment, retirement planning, children education',
    riskTolerance: 'medium',
    familyDependents: '2',
    existingLiabilities: 'Car loan EMI: ₹15,000/month',
    investmentInterests: 'Mutual funds, stocks, FDs',
    lifestyleHabits: 'Dining out twice a week, monthly movie outings'
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem('user-profile', JSON.stringify(profileData));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="min-h-screen bg-animated">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-poppins mb-2 bg-gradient-primary bg-clip-text text-transparent">
                {t('profile')}
              </h1>
              <p className="text-muted-foreground">
                Manage your personal information and financial preferences for personalized insights.
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "destructive" : "default"}
              className={isEditing ? "" : "btn-gradient"}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="card-3d border-0">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white text-4xl font-bold mx-auto">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {profileData.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {profileData.location}, {profileData.state}
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Income:</span>
                    <span className="font-medium">₹{parseInt(profileData.monthlyIncome).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Tolerance:</span>
                    <span className="font-medium capitalize">{profileData.riskTolerance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dependents:</span>
                    <span className="font-medium">{profileData.familyDependents}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Essential Information */}
            <Card className="card-3d border-0">
              <CardHeader>
                <CardTitle className="text-primary">Essential Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('name')} *</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber">{t('contactNumber')} *</Label>
                    <Input
                      id="contactNumber"
                      value={profileData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">{t('gender')} *</Label>
                    <Select 
                      value={profileData.gender} 
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t('male')}</SelectItem>
                        <SelectItem value="female">{t('female')}</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bankName">{t('bankName')} *</Label>
                    <Input
                      id="bankName"
                      value={profileData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">{t('state')} *</Label>
                    <Select 
                      value={profileData.state} 
                      onValueChange={(value) => handleInputChange('state', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">City/Location *</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyIncome">{t('monthlyIncome')} (₹) *</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={profileData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card className="card-3d border-0">
              <CardHeader>
                <CardTitle className="text-primary">Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="financialGoals">{t('financialGoals')} *</Label>
                  <Textarea
                    id="financialGoals"
                    value={profileData.financialGoals}
                    onChange={(e) => handleInputChange('financialGoals', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Save for house, retirement planning, children education"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="riskTolerance">{t('riskTolerance')} *</Label>
                    <Select 
                      value={profileData.riskTolerance} 
                      onValueChange={(value) => handleInputChange('riskTolerance', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t('low')}</SelectItem>
                        <SelectItem value="medium">{t('medium')}</SelectItem>
                        <SelectItem value="high">{t('high')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="familyDependents">Family Dependents</Label>
                    <Input
                      id="familyDependents"
                      type="number"
                      value={profileData.familyDependents}
                      onChange={(e) => handleInputChange('familyDependents', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Number of dependents"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="existingLiabilities">Existing Liabilities/EMIs</Label>
                  <Textarea
                    id="existingLiabilities"
                    value={profileData.existingLiabilities}
                    onChange={(e) => handleInputChange('existingLiabilities', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Home loan: ₹25,000/month, Car loan: ₹15,000/month"
                  />
                </div>
                <div>
                  <Label htmlFor="investmentInterests">Investment Interests</Label>
                  <Textarea
                    id="investmentInterests"
                    value={profileData.investmentInterests}
                    onChange={(e) => handleInputChange('investmentInterests', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Stocks, mutual funds, real estate, crypto"
                  />
                </div>
                <div>
                  <Label htmlFor="lifestyleHabits">Lifestyle Habits/Preferences</Label>
                  <Textarea
                    id="lifestyleHabits"
                    value={profileData.lifestyleHabits}
                    onChange={(e) => handleInputChange('lifestyleHabits', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Dining out frequency, travel preferences, hobbies"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <Button onClick={handleSave} className="btn-gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}