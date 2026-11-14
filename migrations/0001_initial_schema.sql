-- Migration 0001: Telangana Movement Learning Intelligence System Schema
-- Relational + Knowledge-Graph + Adaptive SM-2 Spaced Repetition + Learner Telemetry

CREATE TABLE IF NOT EXISTS learners (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  pin_hash TEXT NOT NULL DEFAULT '1948',
  target_exam TEXT NOT NULL DEFAULT 'BOTH', -- 'SI' | 'PC' | 'BOTH'
  exam_start_date TEXT NOT NULL,
  current_day INTEGER NOT NULL DEFAULT 1,
  daily_goal_minutes INTEGER NOT NULL DEFAULT 120,
  total_study_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS topic_progress (
  learner_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  studied INTEGER NOT NULL DEFAULT 0,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  high_conf_wrong INTEGER NOT NULL DEFAULT 0,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  repetition_step INTEGER NOT NULL DEFAULT 0,
  next_review_at TEXT,
  last_studied_at TEXT,
  mastery_score REAL NOT NULL DEFAULT 0,
  notes TEXT DEFAULT '',
  PRIMARY KEY (learner_id, topic_id)
);

CREATE TABLE IF NOT EXISTS question_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  learner_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  selected_option INTEGER NOT NULL,
  is_correct INTEGER NOT NULL,
  confidence INTEGER NOT NULL DEFAULT 2, -- 1=Low, 2=Medium, 3=High
  time_taken_ms INTEGER NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'practice', -- 'practice' | 'pyq' | 'exam_si' | 'exam_pc' | 'day_test' | 'recall'
  confused_entity_id TEXT DEFAULT '',
  attempted_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS flashcard_reviews (
  learner_id TEXT NOT NULL,
  card_id TEXT NOT NULL,
  category TEXT NOT NULL, -- 'date' | 'person' | 'committee' | 'formula_go' | 'reverse_recall'
  box_level INTEGER NOT NULL DEFAULT 0,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  wrong_streak INTEGER NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  next_review_at TEXT,
  last_reviewed_at TEXT,
  PRIMARY KEY (learner_id, card_id)
);

CREATE TABLE IF NOT EXISTS exam_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  learner_id TEXT NOT NULL,
  exam_type TEXT NOT NULL, -- 'SI_PWT' | 'SI_FWE' | 'PC_PWT' | 'PC_FWE' | 'DAY_TEST'
  total_questions INTEGER NOT NULL,
  attempted INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  wrong INTEGER NOT NULL,
  unanswered INTEGER NOT NULL,
  negative_rate REAL NOT NULL,
  raw_score REAL NOT NULL,
  max_score REAL NOT NULL,
  accuracy_pct REAL NOT NULL,
  duration_seconds INTEGER NOT NULL,
  weak_topics_json TEXT NOT NULL DEFAULT '[]',
  completed_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS confusion_flags (
  learner_id TEXT NOT NULL,
  pair_id TEXT NOT NULL,
  trigger_count INTEGER NOT NULL DEFAULT 1,
  resolved INTEGER NOT NULL DEFAULT 0,
  last_triggered_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (learner_id, pair_id)
);

CREATE INDEX IF NOT EXISTS idx_qa_learner ON question_attempts(learner_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_tp_learner ON topic_progress(learner_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_es_learner ON exam_sessions(learner_id, exam_type);

-- Seed default single-user learner profile
INSERT OR IGNORE INTO learners (id, display_name, pin_hash, target_exam, exam_start_date, current_day, daily_goal_minutes)
VALUES ('aspirant-default', 'Telangana Police Aspirant (2026)', '2014', 'BOTH', '2026-11-14', 1, 150);
