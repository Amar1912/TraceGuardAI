import asyncio
import json
from typing import Any

from app.agent.graph import investigation_runnable
from app.agent.state import InvestigationState


async def main() -> None:
    initial_state: InvestigationState = {
        "case_id": "TEST-001",
        "iteration": 0,
        "trigger": {
            "customer_id": "cust-001",
            "account_id": "acct-001",
            "signal": "high_value_velocity",
        },
    }

    final_state: dict[str, Any] = await investigation_runnable.ainvoke(initial_state)

    print("LangGraph investigation completed")
    print(f"Risk score: {final_state.get('risk_score', 0.0):.2f}")
    print("Recommended actions:")
    print(json.dumps(final_state.get("recommended_actions", []), indent=2))
    print("Final state:")
    print(json.dumps(final_state, indent=2, default=str))


if __name__ == "__main__":
    asyncio.run(main())