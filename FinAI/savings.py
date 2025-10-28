from pydantic import BaseModel
from collections import defaultdict

# Import the core data models we need
from profille import UserProfile

# --- Data Models for the Savings Dashboard API Response ---

class ExpenseSummary(BaseModel):
    """Data for a single category in the expense pie chart."""
    category: str
    total_amount: float

class SavingsBarData(BaseModel):
    """Data specifically for a visual savings bar."""
    monthly_income: float
    total_expenses: float
    net_savings: float

class SavingsAnalysis(BaseModel):
    """Data for the 'Current vs Potential' insight card."""
    current_monthly_savings: float
    potential_monthly_savings: float
    insight: str

class SavingsDashboardData(BaseModel):
    """The complete data payload for the savings dashboard section."""
    savings_bar: SavingsBarData
    spending_chart: list[ExpenseSummary]
    savings_analysis: SavingsAnalysis

# --- The Agent Class ---

class SavingsAgent:
    """
    A stateless agent that analyzes a user's profile to provide savings insights.
    """
    def analyze_and_get_dashboard_data(self, profile: UserProfile) -> SavingsDashboardData:
        print("🤖 [Savings Agent] Analyzing profile for dashboard insights...")

        # Note: total_monthly_spending from profile is just tracked expenses.
        # Total expenses for the bar chart should also include fixed EMIs.
        total_monthly_expenses = profile.total_monthly_spending + profile.liabilities_emi
        
        savings_bar_data = SavingsBarData(
            monthly_income=profile.monthly_income,
            total_expenses=total_monthly_expenses,
            net_savings=profile.available_savings
        )

        # This calculates the data for the pie chart
        summary = defaultdict(float)
        for expense in profile.expenses:
            summary[expense.category] += expense.amount
        
        spending_chart_data = [
            ExpenseSummary(category=cat, total_amount=total)
            for cat, total in summary.items()
        ]

        # This calculates the data for the insight card
        potential_savings = profile.monthly_income * 0.20
        insight_text = ""
        if profile.available_savings < potential_savings:
            insight_text = f"You're on the right track! Based on the 50/30/20 rule, you could potentially save up to ₹{potential_savings:,.0f} each month."
        else:
            insight_text = f"Excellent work! You are exceeding the recommended 20% savings goal of ₹{potential_savings:,.0f}."
            
        savings_analysis_data = SavingsAnalysis(
            current_monthly_savings=profile.available_savings,
            potential_monthly_savings=potential_savings,
            insight=insight_text
        )

        # Assemble the complete data package
        return SavingsDashboardData(
            savings_bar=savings_bar_data,
            spending_chart=spending_chart_data,
            savings_analysis=savings_analysis_data
        )

# --- Singleton Instance ---
savings_agent = SavingsAgent()

