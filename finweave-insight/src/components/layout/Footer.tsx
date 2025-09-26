import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:team@financetracker.com', label: 'Email' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const teamMembers = [
    { name: 'Bhaskara', role: 'Full Stack Developer', linkedin: '#' },
    { name: 'Khusahal L', role: 'Frontend Developer', linkedin: '#' },
    { name: 'Nithin G', role: 'Backend Developer', linkedin: '#' },
    { name: 'Prasad A M', role: 'UI/UX Designer', linkedin: '#' },
  ];

  const footerLinks = [
    { label: t('dashboard'), href: '/' },
    { label: t('insights'), href: '/insights' },
    { label: t('investments'), href: '/investments' },
    { label: t('profile'), href: '/profile' },
  ];

  return (
    <footer className="bg-card border-t border-border/40 mt-20">
      {/* Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4 font-poppins">{t('developedBy')}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our talented team of developers and designers who made this financial platform possible.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-4 mx-auto">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-semibold text-foreground mb-1">{member.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
              <a
                href={member.linkedin}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="border-t border-border/40">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-poppins bg-gradient-primary bg-clip-text text-transparent">
                FinanceTracker
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Your comprehensive platform for managing income, expenses, savings, and investments with intelligent insights.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect With Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors duration-200 group"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 FinanceTracker. All rights reserved. Built with ❤️ for better financial management.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}