import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      insights: "Insights",
      investments: "Investments",
      profile: "Profile",
      login: "Login",
      register: "Register",
      
      // Dashboard
      totalIncome: "Total Income",
      totalExpenses: "Total Expenses",
      totalSavings: "Total Savings",
      monthlyOverview: "Monthly Overview",
      expenseCategories: "Expense Categories",
      
      // Categories
      food: "Food",
      travel: "Travel",
      bills: "Bills",
      shopping: "Shopping",
      homeSpent: "Home Spent",
      familiesSpent: "Families Spent",
      habits: "Habits",
      vehicles: "Vehicles",
      donateForSociety: "Donate for Society",
      other: "Other",
      
      // Common
      amount: "Amount",
      date: "Date",
      description: "Description",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      loading: "Loading...",
      
      // Auth
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      contactNumber: "Contact Number",
      
      // Profile
      gender: "Gender",
      male: "Male",
      female: "Female",
      bankName: "Bank Name",
      state: "State",
      location: "Location",
      monthlyIncome: "Monthly Income",
      financialGoals: "Financial Goals",
      riskTolerance: "Risk Tolerance",
      low: "Low",
      medium: "Medium",
      high: "High",
      
      // Insights
      actualVsPotentialSavings: "Actual vs Potential Savings",
      predictiveTrends: "Predictive Trends",
      
      // Investments
      chatPlaceholder: "Ask me about investments...",
      send: "Send",
      
      // Theme & Language
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      language: "Language",
      
      // Team
      developedBy: "Developed by",
      teamMembers: "Our Team",
    }
  },
  kn: {
    translation: {
      // Navigation
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      insights: "ಒಳನೋಟಗಳು",
      investments: "ಹೂಡಿಕೆಗಳು",
      profile: "ಪ್ರೊಫೈಲ್",
      login: "ಲಾಗಿನ್",
      register: "ನೋಂದಾಯಿಸಿ",
      
      // Dashboard
      totalIncome: "ಒಟ್ಟು ಆದಾಯ",
      totalExpenses: "ಒಟ್ಟು ವೆಚ್ಚಗಳು",
      totalSavings: "ಒಟ್ಟು ಉಳಿತಾಯ",
      monthlyOverview: "ಮಾಸಿಕ ಅವಲೋಕನ",
      expenseCategories: "ವೆಚ್ಚ ವರ್ಗಗಳು",
      
      // Categories
      food: "ಆಹಾರ",
      travel: "ಪ್ರಯಾಣ",
      bills: "ಬಿಲ್‌ಗಳು",
      shopping: "ಶಾಪಿಂಗ್",
      homeSpent: "ಮನೆ ವೆಚ್ಚ",
      familiesSpent: "ಕುಟುಂಬ ವೆಚ್ಚ",
      habits: "ಅಭ್ಯಾಸಗಳು",
      vehicles: "ವಾಹನಗಳು",
      donateForSociety: "ಸಮಾಜಕ್ಕೆ ದಾನ",
      other: "ಇತರೆ",
      
      // Common
      amount: "ಮೊತ್ತ",
      date: "ದಿನಾಂಕ",
      description: "ವಿವರಣೆ",
      save: "ಉಳಿಸು",
      cancel: "ರದ್ದುಮಾಡು",
      edit: "ಸಂಪಾದಿಸು",
      delete: "ಅಳಿಸು",
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      
      // Auth
      name: "ಹೆಸರು",
      email: "ಇಮೇಲ್",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ಖಚಿತಪಡಿಸಿ",
      contactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
      
      // Profile
      gender: "ಲಿಂಗ",
      male: "ಪುರುಷ",
      female: "ಮಹಿಳೆ",
      bankName: "ಬ್ಯಾಂಕ್ ಹೆಸರು",
      state: "ರಾಜ್ಯ",
      location: "ಸ್ಥಳ",
      monthlyIncome: "ಮಾಸಿಕ ಆದಾಯ",
      financialGoals: "ಆರ್ಥಿಕ ಗುರಿಗಳು",
      riskTolerance: "ಅಪಾಯ ಸಹನೆ",
      low: "ಕಡಿಮೆ",
      medium: "ಮಧ್ಯಮ",
      high: "ಹೆಚ್ಚು",
      
      // Insights
      actualVsPotentialSavings: "ನಿಜವಾದ ವಿರುದ್ಧ ಸಂಭಾವ್ಯ ಉಳಿತಾಯ",
      predictiveTrends: "ಭವಿಷ್ಯದ ಪ್ರವೃತ್ತಿಗಳು",
      
      // Investments
      chatPlaceholder: "ಹೂಡಿಕೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
      send: "ಕಳುಹಿಸು",
      
      // Theme & Language
      darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
      lightMode: "ಲೈಟ್ ಮೋಡ್",
      language: "ಭಾಷೆ",
      
      // Team
      developedBy: "ಅಭಿವೃದ್ಧಿಪಡಿಸಿದವರು",
      teamMembers: "ನಮ್ಮ ತಂಡ",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;