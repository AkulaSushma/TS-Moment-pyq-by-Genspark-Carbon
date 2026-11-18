# Telangana Movement Learning Intelligence System (1948–2014)

**Official 2026 TGPRB Sub-Inspector (SI) & Police Constable (PC) 10-Day Mastery Platform**

## 1. Project Overview
- **Project Name**: Telangana Movement Learning Intelligence System (1948–2014) (`webapp`)
- **Primary Goal**: Enable Telangana Police Sub-Inspector (`Rc No. 225/2026`) and Police Constable (`Rc No. 189/2026`) aspirants to achieve a calibrated **>= 90% accuracy benchmark** on Telangana Movement & State Formation (1948–2 June 2014) within a structured 10-day study schedule.
- **Pedagogical Loop**: `UNDERSTAND -> CONNECT -> VISUALIZE -> RECALL -> PRACTISE -> REVISE -> MASTER`
- **GitHub Repository**: `https://github.com/AkulaSushma/TS-Moment-pyq-by-Genspark-Carbon`
- **Live Sandbox Preview**: `https://3000-i35xepb0pjcbzunuoxqcq-c81df28e.sandbox.novita.ai`

---

## 2. Completed Production Features
1. **4 Collapsible Sidebar Study Suites (16 Modules)**:
   - **Learn** (`1. Home Dashboard`, `2. 10-Day Learning Journey`, `3. Chronological Timeline`, `4. Learn the Concept (A–N)`)
   - **Practice** (`9. PYQ Intelligence Centre`, `10. Practice Question Bank`, `11. Full Exam Simulator`, `12. Flashcards & Active Recall`)
   - **Deep-Dive** (`5. Who Is Who? Personalities`, `6. Committees & Commissions`, `7. Compare & Never Confuse`, `8. Movement & 33-District Map`)
   - **Tools** (`13. Weak Memory Revision`, `14. Mastery Analytics (90%+)`, `15. Sources & Fact Audit`, `16. PDF & DOCX Export Centre`)
2. **Bilingual English / తెలుగు Toggle (`English` | `EN + తెలుగు` | `తెలుగు`)**:
   - Instant toggle in the global header, lesson chapters, rapid 60-second revision notes (`T1`–`T10`), question bank cards, PYQ intelligence view, and live OMR simulator.
3. **120-Question Verified PYQ & Analytical Bank + 50Q / 100Q Grand Mocks**:
   - **44 Key-Verified Official TSLPRB PYQs** (audited across 9 official SI & PC Prelims/Mains papers from 2016–2023; zero fabricated 2026 PYQs) strictly separated from **76 Adapted/Analytical Practice Questions** (`118` SI-eligible, `109` PC-eligible).
   - Dedicated **25Q / 30Q Stream Tests** plus **50-Question and 100-Question Grand Mocks** for both **SI (`-0.20` PWT / `-0.25` FWE)** and **Constable (`-0.20` PWT)** with an OMR jump palette, lag-free DOM countdown timer, and smooth automatic scroll to the scorecard (`scorecard.offsetTop`) upon OMR submission.
4. **Module 8 Historical Atlas + 33-District Correlation Layer**:
   - Schematic historical maps separating **(1) 1948–56 Hyderabad State (16 Districts)**, **(2) 1956–2014 United AP Presidential Order Zones V & VI**, and **(3) 2 June 2014 Appointed-Day Telangana (10 Founding Districts)**.
   - Interactive **10 Founding -> All 33 Present Districts Correlation Atlas** (21 districts formed on 11 Oct 2016 + Mulugu & Narayanpet on 17 Feb 2019), cross-referenced with 1975 Zones V/VI, 2018 Multi-Zones I/II, Telugu district names, and local movement landmarks.
5. **Identity & Confusion-Eliminator Engine**:
   - **16 Complete 15-Point Personality Cards**, **13 12-Point Committee/Commission Cards**, **12 Clickable Relationship Chains**, and **12 Side-by-Side Never-Confuse Matrices** (`CMP-01` to `CMP-12`).
6. **In-App Persistent Profile Modal & Confirmed Mastery Reset**:
   - Custom accessible modal (no `window.prompt`) to create/switch aspirant profiles, select target 2026 stream (`SI` / `PC` / `BOTH`), and perform a two-step confirmed session mastery reset (`POST /api/learner/reset`).
7. **Resilient Edge API & D1 Persistence**:
   - Cached D1 schema bootstrapper, graceful fallback state on `/api/bootstrap` (`Cache-Control: no-store`), single-flight frontend loader, and inline `learnerState` responses to prevent overlapping or aborted network requests.
8. **8 Printable PDF + 8 Editable DOCX Study Books**:
   - Served directly from `/exports/<slug>.pdf` and `/exports/<slug>.docx` (generated via `scripts/generate_exports.py`).

---

## 3. Functional Entry URIs & API Endpoints
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Main Single-Page Interactive Learning Application |
| `GET` | `/health` | Service health check (`200 OK`) |
| `GET` | `/api/bootstrap?learnerId=<id>` | Full static knowledge graph + learner D1 state (graceful fallback enabled) |
| `GET` | `/api/learner/state?learnerId=<id>` | Lightweight learner progress/session state sync |
| `POST` | `/api/learner/profile` | Create or switch learner profile & update target exam (`SI`, `PC`, `BOTH`) |
| `POST` | `/api/learner/reset` | Confirmed reset of topic progress, attempts, flashcards, exams & confusion flags |
| `POST` | `/api/progress/study` | Log topic study time & update SM-2 spaced-repetition interval |
| `POST` | `/api/attempts/record` | Record confidence-calibrated MCQ attempt & trigger weak-memory detector |
| `POST` | `/api/weak-memory/resolve` | Mark a confusion-eliminator pair resolved |
| `POST` | `/api/flashcards/review` | Record SM-2 active-recall flashcard rating |
| `POST` | `/api/exams/submit` | Score 25Q, 30Q, 50Q, or 100Q OMR mock session with negative marking |
| `GET` | `/exports/<slug>.(pdf\|docx)` | Download any of the 8 PDF or 8 DOCX study volumes |

---

## 4. Data Architecture & Storage Services
- **Runtime**: Cloudflare Pages + Hono v4 (`src/index.tsx`, `src/routes/api.ts`)
- **Database**: Cloudflare D1 SQLite (`DB` binding configured in `wrangler.jsonc`; migrations in `migrations/0001_initial_schema.sql`)
- **D1 Tables**:
  - `learners` — Aspirant profile, target exam stream, current study day, cumulative study seconds
  - `topic_progress` — Per-day study completion, accuracy, overconfidence count, SM-2 interval, calibrated mastery score
  - `question_attempts` — Granular MCQ history with confidence level (`1..3`) and confused entity link
  - `flashcard_reviews` — Leitner/SM-2 box level and review intervals
  - `exam_sessions` — Completed 25Q / 30Q / 50Q / 100Q OMR mock test scorecards
  - `confusion_flags` — Automatically triggered confusion pairs from wrong/overconfident answers

---

## 5. Local Development & Deployment Guide
```bash
# 1. Install dependencies
npm install

# 2. Apply local D1 database migrations
npm run db:migrate:local

# 3. Build production bundle
npm run build

# 4. Run locally with Cloudflare Pages + D1 via PM2
pm2 start ecosystem.config.cjs

# 5. Regenerate all 8 PDF + 8 DOCX study books (optional, when editing src/data/*)
python3 scripts/generate_exports.py
```

---

## 6. Features Not Yet Implemented & Recommended Next Steps
- **Audio Pronunciation / Podcast Summaries**: Add optional Telugu/English audio summaries for the 60-second revision sheets.
- **Post-2026 Exam Paper Ingestion**: Once TGPRB conducts the 2026 SI & PC Preliminary/Final Written Examinations, ingest verified official keys into `src/data/` under `VERIFIED_PYQ`.
- **Cloudflare Production Deployment**: Ready to deploy either via user-owned Cloudflare Pages (`cf-byok-deploy`) or Genspark Hosted Deploy (`gsk-hosted-deploy`).
