import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Menu, X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'kn' : 'en');
  };

  const navItems = [
    { path: '/', label: t('dashboard') },
    { path: '/insights', label: t('insights') },
    { path: '/investments', label: t('investments') },
    { path: '/profile', label: t('profile') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl font-poppins bg-gradient-primary bg-clip-text text-transparent">
              FinanceTracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4 mr-2" />
              {i18n.language.toUpperCase()}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">{t('login')}</Link>
              </Button>
              <Button size="sm" className="btn-gradient" asChild>
                <Link to="/register">{t('register')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/40 py-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="flex items-center justify-between px-4 py-2">
                  <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                    <Globe className="h-4 w-4 mr-2" />
                    {i18n.language.toUpperCase()}
                  </Button>
                  
                  <Button variant="ghost" size="sm" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-2 px-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      {t('login')}
                    </Link>
                  </Button>
                  <Button size="sm" className="btn-gradient" asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      {t('register')}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}