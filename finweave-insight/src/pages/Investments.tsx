import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Bot, User, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Investments() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        text: "Hello! I'm your investment advisor. I can help you with investment strategies, portfolio analysis, and financial planning. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('investment') || input.includes('invest')) {
      return "Based on your profile, I recommend a diversified portfolio with 60% equity, 30% bonds, and 10% alternative investments. Consider starting with mutual funds or ETFs for broad market exposure.";
    } else if (input.includes('risk') || input.includes('safe')) {
      return "Your risk tolerance appears to be moderate. I suggest a balanced approach with blue-chip stocks, government bonds, and some growth-oriented mutual funds. This provides stability while allowing for growth potential.";
    } else if (input.includes('savings') || input.includes('save')) {
      return "Great question! I recommend the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings and investments. Consider setting up automatic transfers to your investment accounts.";
    } else if (input.includes('portfolio') || input.includes('stocks')) {
      return "For portfolio diversification, consider investing across different sectors like technology, healthcare, finance, and consumer goods. Don't put all your eggs in one basket!";
    } else if (input.includes('mutual fund') || input.includes('sip')) {
      return "SIPs (Systematic Investment Plans) are excellent for beginners. They help with rupee cost averaging and discipline. I recommend starting with large-cap equity funds for stability.";
    } else {
      return "That's an interesting question! While I can provide general investment guidance, I recommend consulting with a certified financial advisor for personalized advice. What specific aspect of investing would you like to explore?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const investmentStats = [
    { title: 'Portfolio Value', value: '₹2,45,000', change: '+12.5%', icon: TrendingUp },
    { title: 'Monthly SIP', value: '₹15,000', change: 'Active', icon: DollarSign },
    { title: 'Asset Allocation', value: '5 Funds', change: 'Diversified', icon: PieChart },
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
          <h1 className="text-4xl font-bold font-poppins mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {t('investments')}
          </h1>
          <p className="text-muted-foreground">
            Get personalized investment advice and portfolio recommendations from our AI advisor.
          </p>
        </motion.div>

        {/* Investment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {investmentStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-3d p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-foreground">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-3d p-0 h-[600px] flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Investment Advisor</h3>
                <p className="text-sm text-muted-foreground">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gradient-primary text-white'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-3 rounded-2xl bg-muted">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/40">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatPlaceholder')}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="btn-gradient"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}