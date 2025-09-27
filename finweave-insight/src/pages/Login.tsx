import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, TrendingUp, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/api';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ name: string, email: string } | null>(null);

  useEffect(() => {
    // check if user is already logged in
    const session = localStorage.getItem('user-session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = 'Enter a valid email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await loginUser({ email: formData.email, password: formData.password });
      if (res.token) {
        const sessionData = { token: res.token, name: res.user.name, email: res.user.email };
        localStorage.setItem("user-session", JSON.stringify(sessionData));
        setUser(sessionData);
        toast({ title: "Login Successful", description: `Welcome back, ${res.user.name}!` });
      } else {
        toast({ title: "Login Failed", description: res.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Server error", variant: "destructive" });
    } finally { setIsLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-session');
    setUser(null);
    toast({ title: "Logged Out", description: "You have been logged out successfully" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-blue-50 via-white to-green-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {user ? (
          <Card className="shadow-xl rounded-2xl overflow-hidden text-center p-6">
            <h2 className="text-2xl font-bold mb-4">Hello, {user.name}</h2>
            <p className="mb-6">You are already logged in.</p>
            <Button variant="destructive" className="flex items-center justify-center mx-auto" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </Card>
        ) : (
          <Card className="shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-green-400 text-white text-center py-6">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                <TrendingUp className="h-6 w-6" /> FinanceTracker
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                      placeholder="Enter your password"
                    />
                    <Button type="button" variant="ghost" size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                </div>

                <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : <><LogIn className="h-4 w-4 mr-2" /> Login</>}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-muted-foreground text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Register
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
