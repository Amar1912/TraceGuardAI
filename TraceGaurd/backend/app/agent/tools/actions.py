from typing import Any, Dict


def request_customer_verification(transaction_id: str) -> Dict[str, Any]:
    return {"action": "REQUEST_CUSTOMER_VERIFICATION", "transaction_id": transaction_id, "status": "requested"}


def request_step_up_authentication(customer_id: str) -> Dict[str, Any]:
    return {"action": "REQUEST_STEP_UP_AUTHENTICATION", "customer_id": customer_id, "status": "requested"}


def request_analyst_review(case_id: str, reason: str) -> Dict[str, Any]:
    return {"action": "REQUEST_ANALYST_REVIEW", "case_id": case_id, "reason": reason, "status": "requested"}