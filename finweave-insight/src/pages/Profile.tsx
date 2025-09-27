import React, { useState, useEffect } from 'react';
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
import { getProfile, updateProfile } from '@/api/profile';

interface ProfileData {
  name: string;
  email: string;
  contactNumber: string;
  gender: string;
  age: string;
  maritalStatus: string;
  education: string;
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
  currentProfits: string;
}

export default function Profile() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    contactNumber: '',
    gender: 'male',
    age: '',
    maritalStatus: 'single',
    education: '',
    bankName: '',
    state: '',
    location: '',
    monthlyIncome: '',
    financialGoals: '',
    riskTolerance: 'medium',
    familyDependents: '',
    existingLiabilities: '',
    investmentInterests: '',
    lifestyleHabits: '',
    currentProfits: ''
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const maritalOptions = ['single', 'married', 'divorced', 'widowed'];

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user-session") || '{}')?.token;
    if (!token) return;

    getProfile(token).then(data => {
      if (data) setProfileData(data);
    });
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const token = JSON.parse(localStorage.getItem("user-session") || '{}')?.token;
    if (!token) return;

    const updatedProfile = await updateProfile(token, profileData);
    if (updatedProfile) {
      setProfileData(updatedProfile);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-animated">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <Card className="card-3d border-0">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white text-4xl font-bold mx-auto">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <Button size="sm" className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 rounded-full w-8 h-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{profileData.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{profileData.location}, {profileData.state}</p>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Income:</span>
                    <span className="font-medium">₹{parseInt(profileData.monthlyIncome || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Tolerance:</span>
                    <span className="font-medium capitalize">{profileData.riskTolerance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dependents:</span>
                    <span className="font-medium">{profileData.familyDependents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Profits:</span>
                    <span className="font-medium">₹{parseInt(profileData.currentProfits || '0').toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            <Card className="card-3d border-0">
              <CardHeader>
                <CardTitle className="text-primary">Essential Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name *</Label>
                    <Input value={profileData.name} onChange={(e) => handleInputChange('name', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" value={profileData.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Contact Number *</Label>
                    <Input value={profileData.contactNumber} onChange={(e) => handleInputChange('contactNumber', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Gender *</Label>
                    <Select value={profileData.gender} onValueChange={(v) => handleInputChange('gender', v)} disabled={!isEditing}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Age</Label>
                    <Input type="number" value={profileData.age} onChange={(e) => handleInputChange('age', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Marital Status</Label>
                    <Select value={profileData.maritalStatus} onValueChange={(v) => handleInputChange('maritalStatus', v)} disabled={!isEditing}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {maritalOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Education</Label>
                    <Input value={profileData.education} onChange={(e) => handleInputChange('education', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Bank Name *</Label>
                    <Input value={profileData.bankName} onChange={(e) => handleInputChange('bankName', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>State *</Label>
                    <Select value={profileData.state} onValueChange={(v) => handleInputChange('state', v)} disabled={!isEditing}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>City/Location *</Label>
                    <Input value={profileData.location} onChange={(e) => handleInputChange('location', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Monthly Income *</Label>
                    <Input type="number" value={profileData.monthlyIncome} onChange={(e) => handleInputChange('monthlyIncome', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Current Profits</Label>
                    <Input type="number" value={profileData.currentProfits} onChange={(e) => handleInputChange('currentProfits', e.target.value)} disabled={!isEditing} />
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
                  <Label>Financial Goals</Label>
                  <Textarea value={profileData.financialGoals} onChange={(e) => handleInputChange('financialGoals', e.target.value)} disabled={!isEditing} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Risk Tolerance</Label>
                    <Select value={profileData.riskTolerance} onValueChange={(v) => handleInputChange('riskTolerance', v)} disabled={!isEditing}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Family Dependents</Label>
                    <Input type="number" value={profileData.familyDependents} onChange={(e) => handleInputChange('familyDependents', e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
                <div>
                  <Label>Existing Liabilities/EMIs</Label>
                  <Textarea value={profileData.existingLiabilities} onChange={(e) => handleInputChange('existingLiabilities', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Investment Interests</Label>
                  <Textarea value={profileData.investmentInterests} onChange={(e) => handleInputChange('investmentInterests', e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Lifestyle Habits/Preferences</Label>
                  <Textarea value={profileData.lifestyleHabits} onChange={(e) => handleInputChange('lifestyleHabits', e.target.value)} disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            {isEditing && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <Button onClick={handleSave} className="btn-gradient">
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
