# 💰 FinAI — Income • Expense • Savings • Investments Platform

> **FinAI** is a modern, responsive finance management web platform inspired by **ET Money**, designed to help users track income, expenses, savings, and investments — with an elegant UI, bilingual support (Kannada + English), and interactive 3D visualizations.

---

## 🚀 Features

### 🏠 **Homepage**

* Dashboard showing **Income vs Expenses vs Savings** with interactive charts.
* Finance-themed **dummy images** and **animated backgrounds** (particles, gradients).
* **3D interactive model** built with Three.js / react-three-fiber.
* Smooth **page-load animations** (fade, slide, card transitions).
* **Dark/Light mode toggle**.

---

### 📊 **Home Dashboard & Transactions**

* All expense categories shown as **3D interactive cards**:

  * Food, Travel, Bills, Shopping, Home Spent, Families Spent, Habits, Vehicles, Donate for Society, Other.
* Hover and click animations (3D tilt, depth movement).
* Click a card to open a **detailed category page**:

  * Expense graphs by **day, month, and year**.
  * **Full transaction history** for that category.
  * Summary trend graph.

---

### 💡 **Insights Page**

* Visualizes **Actual vs Potential Savings**.
* Displays **Predictive Trends** (for future AI-based insights).

---

### 📈 **Investments Page**

* **Chat-style interface** (simple now, AI-ready for future).
* **Typing effect animation** and interactive cursor.
* **LocalStorage** used for chat history.

---

### 👤 **Profile Page**

* Collects essential data for future **AI/ML financial analysis**:

  * Name, Gender, Contact, Email, Bank, State/Location.
  * Monthly Income, Financial Goals, Risk Appetite.
* Optional advanced fields:

  * Family Dependents, Existing EMIs, Investment Interests, Lifestyle Habits.
* Editable and updatable profile form.
* Data structured for **AI model integration** (numeric + categorical features).

---

### 🔐 **Register & Login**

* **Register Page**:

  * Fields: Name, Contact Number, Password, Confirm Password.
  * Validation for empty fields & password match.
* **Login Page**:

  * Fields: Name, Password.
  * Redirects to Dashboard on success.

---

### 📞 **Footer & Developer Section**

* Social links (LinkedIn, Email, Facebook, Instagram, Twitter).
* Developer section with circular profile cards for:

  * **Bhaskara**, **Khusahal L**, **Nithin G**, **Prasad A M**.
* LinkedIn links placeholders (to be updated later).

---

## 🧠 Tech Stack

| Layer                    | Tools                                  |
| ------------------------ | -------------------------------------- |
| **Frontend**             | React.js + Tailwind CSS                |
| **Routing**              | React Router                           |
| **Charts**               | Chart.js / Recharts                    |
| **3D Models**            | Three.js / react-three-fiber           |
| **State Management**     | React State / Redux                    |
| **Internationalization** | i18next (Kannada + English)            |
| **Local Storage**        | Chat history, theme, language, profile |
| **Animations**           | CSS + Framer Motion (optional)         |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
[git clone https://github.com/Bhaskara05/finai_project.git
cd finweav-insight
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

### 4️⃣ Open in Browser

```
http://localhost:5173
```

---

## 🌙 Dark/Light Mode

* Toggle button on the Navbar switches between **Dark** and **Light** themes.
* Mode preference stored in **localStorage**.

---

## 🌐 Kannada & English Language Toggle

* Language toggle powered by **i18next**.
* Switch seamlessly between **Kannada (kn)** and **English (en)**.

---

## 🧩 Folder Structure

```
finweave-insight/
│
├── src/
│   ├── components/        # Reusable UI components (Buttons, Cards, Charts, Footer, etc.)
│   ├── pages/             # Home, Insights, Investments, Register, Login, Profile
│   ├── assets/            # Dummy images, icons, 3D models
│   ├── context/           # Theme and Language context
│   ├── App.jsx            # Main app with routes and layout
│   └── index.css          # Tailwind and base styles
│
├── public/
│   └── index.html
│
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🔮 Future Enhancements (Planned for FinAI v2.0)

* AI-based financial insights and recommendations.
* Predictive spending trend detection.
* Personalized investment suggestions using ML models.
* Integration with bank APIs for real transaction sync.
* Data visualization using D3.js and TensorFlow.js insights.

---

## 👨‍💻 Developer Team

| Name           | LinkedIn      |
| -------------- | --------------|
| **Bhaskara**   | https://www.linkedin.com/in/bhaskara-88aa76322/
| **Khusahal L** |:https://www.linkedin.com/in/khushal-l
| **Nithin G**   | https://www.linkedin.com/in/nithing17
| **Prasad A M** | https://www.linkedin.com/in/prasadam

---

## 🧾 License

This project is open-source under the **MIT License** — feel free to use, modify, and contribute.
