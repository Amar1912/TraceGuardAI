from sqlalchemy.orm import Session
from app.database.database import SessionLocal, engine, Base
from app.models.customer import Customer
from app.models.transaction import Transaction
from app.models.case import Case
from datetime import datetime, timedelta

def seed_db():
    # Create tables
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # 1. Customers
    customers = [
        Customer(
            customer_id="CUST-10452",
            display_name="Sarah Jenkins",
            email="sjenkins@example.com",
            phone="+1-555-0143",
            account_status="Under Review",
            risk_level="HIGH",
            risk_score=88,
            account_age=450,
            transaction_count=142,
            previous_case_count=0
        ),
        Customer(
            customer_id="CUST-20891",
            display_name="Michael Chang",
            email="mchang99@example.com",
            phone="+1-555-0188",
            account_status="Active",
            risk_level="LOW",
            risk_score=12,
            account_age=1200,
            transaction_count=843,
            previous_case_count=1
        )
    ]
    db.add_all(customers)
    
    # 2. Transactions
    transactions = [
        Transaction(
            transaction_id="TXN-2026-001",
            customer_id="CUST-10452",
            account_id="ACC-001",
            amount=4850.00,
            merchant="CryptoVantage Exchange",
            category="Financial Services",
            location="Reykjavik, IS",
            device_id="DEV-OP11",
            ip_address="185.213.154.12",
            risk_score=91,
            status="Flagged"
        )
    ]
    db.add_all(transactions)
    
    # 3. Cases
    cases = [
        Case(
            case_id="CASE-2026-001",
            customer_id="CUST-10452",
            transaction_id="TXN-2026-001",
            status="INVESTIGATING",
            risk_score=91,
            confidence_score=94,
            fraud_pattern="Account Takeover",
            priority="HIGH",
            trigger_type="VELOCITY_SPIKE",
            trigger_description="Large out-of-pattern crypto purchase via VPN.",
            summary="Multiple unusual transactions were detected from a previously unseen device and connection."
        )
    ]
    db.add_all(cases)
    
    db.commit()
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
