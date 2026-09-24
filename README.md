# 🛡️ TraceGuard AI — Autonomous Graph-Powered Fraud Investigation & Next-Best Action Platform

> **TigerGraph Agentic Fraud Investigation HHGOA Hackathon Project**  
> *Real-time graph intelligence, autonomous AI agent investigation, policy guardrails, and explainable next-best action directives.*

---

## 📌 Executive Summary

**TraceGuard AI** is a state-of-the-art fraud investigation platform designed for financial institutions. Fraud investigation teams face immense pressure: manually tracing transaction topologies, identifying device-sharing rings, retrieving regulatory policies, and deciding on defensible actions is slow and difficult to scale.

TraceGuard AI solves this by combining:
- **TigerGraph Cloud (`TraceGuardGraph`)**: Sub-second graph traversal, GSQL pattern detection queries, and entity relationship mapping.
- **FastAPI Core Backend**: Asynchronous API layer orchestrating database access, token management, and RESTPP endpoints.
- **LangGraph Agentic State Machine**: 8-node autonomous reasoning agent that gathers evidence, detects patterns, assesses risk vs. confidence, enforces policy guardrails, and generates explainable dossiers.
- **GraphRAG Knowledge Layer**: Grounding LLMs with regulatory policies (SAR triggers), typologies, and historical case memory.
- **Next.js 15 Futuristic Command Center UI**: Real-time fraud cockpit, interactive docket queue, graph visualization, and governance approval controls.

---

## 🏗️ Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                    TraceGuard AI System Architecture                    │
└─────────────────────────────────────────────────────────────────────────┘

   ┌──────────────────────────────────────────────────────────────────┐
   │            🌐 Next.js 15 Cyber Command Center UI                │
   │  Dashboard | Case Docket | Cockpit | Graph Viewer | Governance   │
   └────────────────────────────────┬─────────────────────────────────┘
                                    │ HTTPS / REST API
                                    ▼
   ┌──────────────────────────────────────────────────────────────────┐
   │                   ⚙️ FastAPI Core Backend                        │
   │   /api/v1/cases | /transactions | /investigations | /benchmark   │
   └───────────────┬──────────────────────────────────┬───────────────┘
                   │                                  │
                   ▼                                  ▼
   ┌───────────────────────────────┐  ┌───────────────────────────────┐
   │ 🤖 LangGraph Agent Machine    │  │ 🐯 TigerGraph Cloud          │
   │ • Investigate Node            │  │ • Vertex: PaymentTransaction  │
   │ • Collect Evidence Node       │  │ • Vertex: Account, Customer   │
   │ • Detect Patterns Node        │  │ • Vertex: Device, IP, Case    │
   │ • Assess Risk & Uncertainty   │  │ • GSQL: findSharedDevices     │
   │ • Recommend Next-Best Action  │  │ • GSQL: getCaseNetwork        │
   │ • Policy Guardrail Node       │  │ • RESTPP Token Authentication │
   │ • Generate Explanation Node   │  └───────────────────────────────┘
   │ • Save Case Memory Node       │
   └───────────────┬───────────────┘
                   │
                   ▼
   ┌───────────────────────────────┐
   │ 📚 GraphRAG Knowledge Base    │
   │ • Policy & Regulatory Rules   │
   │ • Historical Case Memory RAG  │
   └───────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.11+**
- **Node.js 18+ & npm**
- **Git**

---

### ⚙️ How to Run the Backend Server

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Set up virtual environment (optional but recommended):**
   ```bash
   # Windows PowerShell:
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux/macOS:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   # Copy example template
   cp .env.example .env
   ```
   Edit `.env` to configure your TigerGraph credentials:
   ```env
   APP_ENV=development
   DATABASE_URL=sqlite:///./traceguard.db

   TIGERGRAPH_HOST=https://your-savanna-instance.i.tigergraphcloud.com
   TIGERGRAPH_GRAPH_NAME=TraceGuardGraph
   TIGERGRAPH_SECRET=your_tigergraph_secret_token
   ```

5. **Seed the local SQLite database:**
   ```bash
   python -m app.database.seed
   ```

6. **Start the FastAPI backend server:**
   ```bash
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   - **Backend API**: `http://localhost:8000`
   - **Interactive Swagger Docs**: `http://localhost:8000/docs`
   - **Health Check**: `http://localhost:8000/health`

---

### 🌐 How to Run the Frontend Server

1. **Navigate to the repository root directory:**
   ```bash
   cd C:\Goa Hackathon\TraceGuardAI
   ```

2. **Install Node.js packages:**
   ```bash
   npm install
   ```

3. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

4. **Access the application in your browser:**
   - **Command Center Dashboard**: `http://localhost:3000/dashboard`
   - **Case Docket Queue**: `http://localhost:3000/cases`
   - **Graph Investigation**: `http://localhost:3000/graph`

---

## ⚡ Key Features & Agentic Capabilities

### 1. Autonomous Agent Investigation Workflow
The agent runs an 8-stage state machine (`backend/app/agent/graph.py`):
1. **Triggering**: Triggered by velocity spikes, risk score breaches, or analyst requests.
2. **Evidence Collection**: Queries TigerGraph for shared hardware, IP clusters, and transaction paths.
3. **Pattern Detection**: Identifies Device Sharing Rings, Rapid Asset Movement, ATO, and Structuring.
4. **Risk vs. Confidence Assessment**: Evaluates certainty; if uncertainty is high, requests step-up authentication or biometric validation.
5. **Policy-Governed Directives**: Issues directives (`BLOCK_ACCOUNT`, `FILE_REPORT`, `STEP_UP_AUTH`, `ESCALATE`).
6. **Policy Guardrails**: Enforces human-in-the-loop analyst approval for high-impact actions.
7. **Explainability**: Generates reasoning summaries, evidence considered, and action rationales.
8. **Case Memory**: Persists investigation findings and decisions into graph memory for future case RAG.

### 2. Benchmark Case Processor
To run all 20 hackathon benchmark cases and output standardized answer records:
```bash
# Via curl / PowerShell REST POST request:
Invoke-RestMethod -Method Post http://localhost:8000/api/v1/benchmark/process
```

---

## 🧪 Testing & Verification

Run the backend pytest suite to verify all endpoints and the LangGraph workflow:

```bash
# From repository root:
$env:PYTHONPATH="backend"; python -m pytest backend/tests
```

All 5 test suites pass with 100% success rate:
- `test_health_check`
- `test_read_cases`
- `test_read_dashboard_summary`
- `test_read_transactions`
- `test_read_case_graph`

---

## 📂 Project Structure

```text
TraceGuardAI/
├── backend/
│   ├── app/
│   │   ├── agent/             # LangGraph workflow, nodes, tools & state
│   │   ├── api/               # FastAPI route controllers
│   │   ├── core/              # Configuration & settings (.env loader)
│   │   ├── database/          # SQLAlchemy models & database seed
│   │   ├── gsql/              # TigerGraph GSQL query definitions
│   │   ├── integrations/      # TigerGraphClient & GraphRAGClient
│   │   ├── schemas/           # Pydantic data schemas
│   │   └── services/          # Business logic services
│   ├── tests/                 # Pytest test suite
│   ├── .env.example           # Environment template (NO SECRETS)
│   └── .gitignore             # Strict gitignore protecting secrets
├── src/
│   ├── app/                   # Next.js 15 App Router pages
│   ├── components/            # UI layout & sidebar components
│   ├── lib/                   # Zustand store & initial mock fallback
│   ├── services/              # API fetchers connecting to FastAPI
│   └── types/                 # TypeScript interfaces
├── COMPLIANCE_REPORT.md       # Hackathon requirements compliance report
└── README.md                  # Main project documentation
```

---

## 🔒 Security Compliance

- **Zero Hardcoded Secrets**: Credentials belong exclusively in local `backend/.env`.
- **Git Safety**: `.env` and `.db` files are strictly ignored by `.gitignore`.
- **Backend Proxy**: The frontend NEVER connects directly to TigerGraph or holds secret tokens; all requests pass through authenticated FastAPI endpoints.

---

## 📄 License & Hackathon Info

Developed for the **TigerGraph Agentic Fraud Investigation HHGOA Hackathon**.  
*TraceGuard AI — Deeper Connections. Real-Time Intelligence. Safer Communities.*
