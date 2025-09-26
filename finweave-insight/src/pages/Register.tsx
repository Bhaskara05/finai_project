import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, TrendingUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Save user data to localStorage for demo purposes
      const userData = {
        name: formData.name,
        contactNumber: formData.contactNumber,
        password: formData.password,
        registrationDate: new Date().toISOString()
      };
      
      localStorage.setItem('user-data', JSON.stringify(userData));
      localStorage.setItem('user-session', JSON.stringify({ 
        name: formData.name, 
        loginTime: new Date().toISOString() 
      }));

      toast({
        title: "Registration Successful",
        description: `Welcome to FinanceTracker, ${formData.name}!`,
      });
      
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  const passwordStrength = {
    hasMinLength: formData.password.length >= 6,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl font-poppins bg-gradient-primary bg-clip-text text-transparent">
              FinanceTracker
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground">
            Join thousands of users managing their finances smartly
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-3d border-0">
            <CardHeader>
              <CardTitle className="text-center text-primary">
                <UserPlus className="h-6 w-6 inline mr-2" />
                {t('register')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactNumber">{t('contactNumber')} *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    className={errors.contactNumber ? 'border-destructive' : ''}
                    placeholder="+91 9876543210"
                  />
                  {errors.contactNumber && (
                    <p className="text-destructive text-sm mt-1">{errors.contactNumber}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">{t('password')} *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                      placeholder="Create a strong password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded ${
                              strengthScore >= level
                                ? strengthScore === 4
                                  ? 'bg-success'
                                  : strengthScore >= 3
                                  ? 'bg-warning'
                                  : 'bg-destructive'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs space-y-1">
                        {Object.entries(passwordStrength).map(([key, met]) => (
                          <div key={key} className={`flex items-center space-x-1 ${met ? 'text-success' : 'text-muted-foreground'}`}>
                            <Check className={`h-3 w-3 ${met ? 'opacity-100' : 'opacity-30'}`} />
                            <span>
                              {key === 'hasMinLength' && 'At least 6 characters'}
                              {key === 'hasUppercase' && 'One uppercase letter'}
                              {key === 'hasLowercase' && 'One lowercase letter'}
                              {key === 'hasNumber' && 'One number'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">{t('confirmPassword')} *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                      placeholder="Confirm your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-success text-sm mt-1 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Passwords match
                    </p>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full btn-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t('register')}
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-primary hover:underline font-medium"
                  >
                    {t('login')}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-muted/50"
        >
          <h3 className="font-semibold text-foreground mb-2 text-center">Why Choose FinanceTracker?</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center"><Check className="h-3 w-3 mr-2 text-success" />Smart expense tracking with AI insights</li>
            <li className="flex items-center"><Check className="h-3 w-3 mr-2 text-success" />Personalized investment recommendations</li>
            <li className="flex items-center"><Check className="h-3 w-3 mr-2 text-success" />Predictive savings analysis</li>
            <li className="flex items-center"><Check className="h-3 w-3 mr-2 text-success" />Multi-language support</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}