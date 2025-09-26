________________________________________
Create a responsive website for an Income–Expense–Savings–Investments Platform with the following features:
________________________________________
UI/UX Reference:
•	Follow the ET Money website style (modern, professional, minimalistic finance look).
•	Clean, finance-friendly typography and dashboard-style design.
•	Responsive across mobile, tablet, and desktop.
•	Dark/Light mode with toggle.
•	Kannada and English languages with toggle.
________________________________________
Pages & Features:
1.	Homepage:
o	Dashboard showing Income vs Expenses vs Savings with charts.
o	Dummy images related to finance/money and human interactions.
o	3D interactive model that moves/rotates on interaction.
o	Background animations (particles, floating shapes, subtle gradients, money-themed).
o	Page load animations (fade-in, slide-in, card animations).
2.	Home Dashboard & Transactions Interaction (3D Cards):
On the Home Dashboard, display all expense categories as 3D cards:
Food, Travel, Bills, Shopping, Home Spent, Families Spent, Habits, Vehicles, Donate for Society, Other.
o	Each 3D card shows a summary (total expense for that category).
o	Cards should have interactive 3D effects (e.g., hover rotation, slight tilt, or depth movement) to make the dashboard dynamic.
o	When a 3D card is clicked, navigate to a detailed page for that category, showing:
	Graphs of expenses by day, month, and year.
	Complete transaction details for that category.
o	On each card detail page, also display one summary graph showing the expense trend according to the card type.

3.	Insights Page:
o	Display Actual vs Potential Savings and Predictive Trends.
4.	Investments Page:
o	Normal chat interface (no AI now, can add later).
o	Typing effect animation, interactive cursor/mouse animations.
o	Local storage for chat history.
5.	Register Page:
o	Fields: Name, Contact Number, Password, Password Verification.
o	Validation for empty fields and password match.
6.	Login Page:
o	Fields: Name, Password.
o	Redirect to profile/dashboard upon successful login.
7.	Profile Page:
Fields (Essential for AI/ML):
•	Name → For personalization.
•	Profile Image (optional) → UI only.
•	Gender (Male/Female/Other) → Helps detect demographic spending trends.
•	Contact Number & Email → For notifications and linking transaction data.
•	Bank Name → For transaction source tracking.
•	State / Location → Region-specific spending and lifestyle patterns.
•	Monthly Income / Income Range → Crucial for budgeting, predictive spending, and investment recommendations.
•	Financial Goals → Short-term, medium-term, and long-term goals to guide investment suggestions.
•	Risk Appetite / Tolerance → Low / Medium / High, to customize investment recommendations.
Optional / Advanced Fields (Improves AI accuracy):
•	Family Dependents → Helps tailor budgeting and savings suggestions.
•	Existing Liabilities / EMIs → Improves predictive cash flow and financial health analysis.
•	Investment Interests → Stocks, mutual funds, insurance, savings schemes, etc., to personalize advice.
•	Lifestyle Habits / Spending Preferences → Can be derived from transactions but helpful for initial AI model setup.
Purpose:
•	These fields provide the minimum dataset needed for AI/ML models to:
o	Predict future spending trends.
o	Highlight optimization opportunities in saving.
o	Recommend personalized investment options.
o	Compare actual vs potential savings.
Frontend & Backend Notes:
•	Profile page should allow update and edit of all fields.
•	Optional fields can be skipped but stored if provided.
o	Ensure data is structured for easy ML feature extraction (numeric fields like income, categorical like risk appetite, etc.).
8.	Footer Section:
o	Social links: LinkedIn, Email, Facebook, Instagram, Twitter, and others.
o	Clicking links navigates to other pages (internal links for website pages).
9.	Developer Section (above footer):
o	Display 4 team members in circular format with image placeholders and it taking likedin link I will update the link later:
	Bhaskara
	Khusahal L
	Nithin G
	Prasad A M
________________________________________
Styling & Components:
•	Each page should have a separate CSS/Tailwind file.
•	Reusable components for: buttons, cards, charts, forms, chatbot UI, and footer.
•	Cards with soft shadows, rounded corners.
•	Animations:
o	Page load animations
o	Background animations
o	Chat typing and cursor animations
________________________________________
Tech Stack:
•	Frontend: React.js + Tailwind CSS
•	Charts: Chart.js or Recharts
•	3D Model: Three.js or react-three-fiber
•	Internationalization: i18next or react-intl for Kannada & English
•	State Management: React state or Redux for chat history, theme, and profile data
•	Local Storage: Store chat history and basic profile info
________________________________________
Call to Action:
“Generate the complete React.js frontend code with:
•	Routing between pages
•	Page-specific styles
•	Dark/Light mode
•	Kannada/English language toggle
•	3D interactive model on homepage
•	Animated background and page transitions
•	Transactions, insights, investments pages
•	Register/Login/Profile pages with validation and relevant fields
•	Footer with social links and internal page navigation
•	Developer section with 4 circular team members (Bhaskara, Khusahal L, Nithin G, Prasad A M)
•	Normal chat interface with typing/cursor animations and local chat history storage
•	Dummy images for finance/money and human interactions (replaceable later).”
________________________________________

Home Dashboard & Transactions Interaction (3D Cards):
•	On the Home Dashboard, display all expense categories as 3D cards:
Food, Travel, Bills, Shopping, Home Spent, Families Spent, Habits, Vehicles, Donate for Society, Other.
•	Each 3D card shows a summary (total expense for that category).
•	Cards should have interactive 3D effects (e.g., hover rotation, slight tilt, or depth movement) to make the dashboard dynamic.
•	When a 3D card is clicked, navigate to a detailed page for that category, showing:
o	Graphs of expenses by day, month, and year.
o	Complete transaction details for that category.
•	On each card detail page, also display one summary graph showing the expense trend according to the card type.

Profile Page:
Fields (Essential for AI/ML):
•	Name → For personalization.
•	Profile Image (optional) → UI only.
•	Gender (Male/Female/Other) → Helps detect demographic spending trends.
•	Contact Number & Email → For notifications and linking transaction data.
•	Bank Name → For transaction source tracking.
•	State / Location → Region-specific spending and lifestyle patterns.
•	Monthly Income / Income Range → Crucial for budgeting, predictive spending, and investment recommendations.
•	Financial Goals → Short-term, medium-term, and long-term goals to guide investment suggestions.
•	Risk Appetite / Tolerance → Low / Medium / High, to customize investment recommendations.
Optional / Advanced Fields (Improves AI accuracy):
•	Family Dependents → Helps tailor budgeting and savings suggestions.
•	Existing Liabilities / EMIs → Improves predictive cash flow and financial health analysis.
•	Investment Interests → Stocks, mutual funds, insurance, savings schemes, etc., to personalize advice.
•	Lifestyle Habits / Spending Preferences → Can be derived from transactions but helpful for initial AI model setup.
Purpose:
•	These fields provide the minimum dataset needed for AI/ML models to:
o	Predict future spending trends.
o	Highlight optimization opportunities in saving.
o	Recommend personalized investment options.
o	Compare actual vs potential savings.
Frontend & Backend Notes:
•	Profile page should allow update and edit of all fields.
•	Optional fields can be skipped but stored if provided.
•	Ensure data is structured for easy ML feature extraction (numeric fields like income, categorical like risk appetite, etc.).


