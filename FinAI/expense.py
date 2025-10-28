

import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
# THE FIX: Use the standard Pydantic v2 library for full FastAPI compatibility
from pydantic import BaseModel, Field
from typing import Literal

# Structured Output Model using standard Pydantic v2
class Expense(BaseModel):
    vendor: str = Field(description="The name of the merchant or recipient, e.g., 'Starbucks', 'Zomato'.")
    amount: float = Field(description="The numerical amount of the transaction.")
    category: Literal[
        "Food & Drink", "Transportation", "Shopping", "Bills & Utilities", 
        "Entertainment", "Groceries", "Health & Wellness", "Other"
    ] = Field(description="The most appropriate category for the expense.")

# The Agent
def parse_expense_from_text(text: str) -> Expense:
    """
    Takes raw transaction text and uses an LLM to extract structured data.
    """
    llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")
    # LangChain's with_structured_output works perfectly with standard Pydantic models
    structured_llm = llm.with_structured_output(Expense)
    
    prompt = ChatPromptTemplate.from_template(
        "Parse the vendor, amount, and category from the transaction text: '{text_input}'"
    )
    chain = prompt | structured_llm
    
    parsed_expense = chain.invoke({"text_input": text})
    return parsed_expense