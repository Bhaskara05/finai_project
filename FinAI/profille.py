import json
import os
from typing import List, Literal
# Use the standard Pydantic v2 library
from pydantic import BaseModel, Field

# Import the now-compatible Expense model
from expense import Expense

# --- Constants & Data Models ---
PROFILE_FILE = "user_profile.json"

class UserProfileUpdate(BaseModel):
    name: str | None = None
    age: int | None = None
    monthly_income: float | None = None
    risk_tolerance: Literal["low", "medium", "high"] | None = None
    liabilities_emi: float | None = None
    financial_goals: str | None = None

class UserProfile(BaseModel):
    name: str = "Nithin G"
    age: int = 19
    risk_tolerance: Literal["low", "medium", "high"] = "medium"
    financial_goals: str = "Grow wealth for the long term."
    monthly_income: float = 85000.0
    liabilities_emi: float = 15000.0
    
    # Dynamically calculated fields
    total_monthly_spending: float = 0.0
    available_savings: float = 0.0
    expenses: List[Expense] = []

# --- The Agent Class ---
class ProfileAgent:
    def __init__(self):
        self._profile = self._load_profile()
        print(f"🤖 [Profile Agent] Profile for {self._profile.name} loaded.")

    def _load_profile(self) -> UserProfile:
        if os.path.exists(PROFILE_FILE):
            with open(PROFILE_FILE, 'r', encoding='utf-8') as f:
                return UserProfile(**json.load(f))
        else:
            new_profile = UserProfile()
            self._save_profile(new_profile)
            return new_profile

    def _save_profile(self, profile_data: UserProfile):
        with open(PROFILE_FILE, 'w', encoding='utf-8') as f:
            f.write(profile_data.model_dump_json(indent=4))

    def update_profile(self, update_data: UserProfileUpdate):
        profile_dict = self._profile.model_dump()
        update_dict = update_data.model_dump(exclude_unset=True)
        profile_dict.update(update_dict)
        self._profile = UserProfile(**profile_dict)
        self._recalculate_and_save()
        return self._profile

    def add_expense(self, expense: Expense):
        self._profile.expenses.append(expense)
        self._recalculate_and_save()

    def _recalculate_and_save(self):
        self._profile.total_monthly_spending = sum(e.amount for e in self._profile.expenses)
        self._profile.available_savings = self._profile.monthly_income - self._profile.liabilities_emi - self._profile.total_monthly_spending
        self._save_profile(self._profile)

    def get_profile(self) -> UserProfile:
        return self._profile

# --- Singleton Instance ---
profile_agent = ProfileAgent()

