// Hono API Router: Knowledge Graph, PYQ Analytics, Confidence-Calibrated SM-2 Spaced Repetition, Weak-Memory Detector & Exam Simulator
import { Hono } from 'hono';
import {
  CURRICULUM_DAYS,
  ALL_QUESTIONS,
  PERSONALITIES,
  COMMITTEES,
  RELATIONSHIP_CHAINS,
  WHO_IS_WHO_TRAPS,
  CONFUSION_PAIRS,
  SYLLABUS_INTELLIGENCE,
  SOURCES_LIBRARY,
  HISTORICAL_DISCREPANCIES,
  PYQ_ANALYTICS_METADATA,
  FLASHCARDS_BANK,
  CHRONOLOGY_CHALLENGES,
  HISTORICAL_MAPS_METADATA,
  EXPORT_DOCUMENTS_CATALOG
} from '../data/knowledge_base';

type Bindings = {
  DB: D1Database;
};

export const apiRouter = new Hono<{ Bindings: Bindings }>();

async function ensureSchema(db: D1Database) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      pin_hash TEXT NOT NULL DEFAULT '2014',
      target_exam TEXT NOT NULL DEFAULT 'BOTH',
      exam_start_date TEXT NOT NULL,
      current_day INTEGER NOT NULL DEFAULT 1,
      daily_goal_minutes INTEGER NOT NULL DEFAULT 150,
      total_study_seconds INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS topic_progress (
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
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS question_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      learner_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      topic_id TEXT NOT NULL,
      selected_option INTEGER NOT NULL,
      is_correct INTEGER NOT NULL,
      confidence INTEGER NOT NULL DEFAULT 2,
      time_taken_ms INTEGER NOT NULL DEFAULT 0,
      mode TEXT NOT NULL DEFAULT 'practice',
      confused_entity_id TEXT DEFAULT '',
      attempted_at TEXT DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS flashcard_reviews (
      learner_id TEXT NOT NULL,
      card_id TEXT NOT NULL,
      category TEXT NOT NULL,
      box_level INTEGER NOT NULL DEFAULT 0,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      interval_days INTEGER NOT NULL DEFAULT 0,
      wrong_streak INTEGER NOT NULL DEFAULT 0,
      total_reviews INTEGER NOT NULL DEFAULT 0,
      next_review_at TEXT,
      last_reviewed_at TEXT,
      PRIMARY KEY (learner_id, card_id)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS exam_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      learner_id TEXT NOT NULL,
      exam_type TEXT NOT NULL,
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
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS confusion_flags (
      learner_id TEXT NOT NULL,
      pair_id TEXT NOT NULL,
      trigger_count INTEGER NOT NULL DEFAULT 1,
      resolved INTEGER NOT NULL DEFAULT 0,
      last_triggered_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (learner_id, pair_id)
    )`),
    db.prepare(`INSERT OR IGNORE INTO learners (id, display_name, pin_hash, target_exam, exam_start_date, current_day, daily_goal_minutes)
      VALUES ('aspirant-default', 'Telangana Police Aspirant (2026)', '2014', 'BOTH', '2026-11-14', 1, 150)`)
  ]);
}

// Compute computed PYQ statistics dynamically from ALL_QUESTIONS
function computePyqReport() {
  const verified = ALL_QUESTIONS.filter((q) => q.origin === 'VERIFIED_PYQ');
  const adapted = ALL_QUESTIONS.filter((q) => q.origin === 'ADAPTED_PYQ');
  const model = ALL_QUESTIONS.filter((q) => q.origin === 'MODEL_PRACTICE');

  const byExam: Record<string, number> = {};
  const byYear: Record<string, number> = {};
  const byTopic: Record<string, { title: string; verifiedCount: number; totalCount: number }> = {};
  const byFormat: Record<string, number> = {};
  const byRepeatClass: Record<string, number> = {};

  for (const day of CURRICULUM_DAYS) {
    byTopic[day.id] = { title: `Day ${day.dayNumber}: ${day.title}`, verifiedCount: 0, totalCount: 0 };
  }

  for (const q of ALL_QUESTIONS) {
    byTopic[q.topicId] = byTopic[q.topicId] || { title: q.topicId, verifiedCount: 0, totalCount: 0 };
    byTopic[q.topicId].totalCount += 1;
    byFormat[q.format] = (byFormat[q.format] || 0) + 1;
    if (q.origin === 'VERIFIED_PYQ') {
      byTopic[q.topicId].verifiedCount += 1;
      byExam[q.examName] = (byExam[q.examName] || 0) + 1;
      byYear[String(q.examYear)] = (byYear[String(q.examYear)] || 0) + 1;
      byRepeatClass[q.repeatClass] = (byRepeatClass[q.repeatClass] || 0) + 1;
    }
  }

  return {
    summary: {
      papersAnalyzed: PYQ_ANALYTICS_METADATA.papersAnalyzedCount,
      verifiedPyqsCount: verified.length,
      adaptedConceptCount: adapted.length,
      modelPracticeCount: model.length,
      totalQuestionBankSize: ALL_QUESTIONS.length
    },
    papersList: PYQ_ANALYTICS_METADATA.papersList,
    dateCutoffCompliance: PYQ_ANALYTICS_METADATA.dateCutoffCompliance,
    evidenceFindings: PYQ_ANALYTICS_METADATA.evidenceFindings,
    byExam,
    byYear,
    byTopic,
    byFormat,
    byRepeatClass
  };
}

// 1. Full Bootstrap Bundle (Single round-trip fast load for all 16 UI modules)
apiRouter.get('/bootstrap', async (c) => {
  const learnerId = c.req.query('learnerId') || 'aspirant-default';
  let learnerState = null;

  if (c.env?.DB) {
    await ensureSchema(c.env.DB);
    const learner = await c.env.DB.prepare(`SELECT * FROM learners WHERE id = ?`).bind(learnerId).first();
    const progress = await c.env.DB.prepare(`SELECT * FROM topic_progress WHERE learner_id = ?`).bind(learnerId).all();
    const attempts = await c.env.DB.prepare(
      `SELECT * FROM question_attempts WHERE learner_id = ? ORDER BY attempted_at DESC LIMIT 200`
    ).bind(learnerId).all();
    const flashcards = await c.env.DB.prepare(`SELECT * FROM flashcard_reviews WHERE learner_id = ?`).bind(learnerId).all();
    const exams = await c.env.DB.prepare(
      `SELECT * FROM exam_sessions WHERE learner_id = ? ORDER BY completed_at DESC LIMIT 25`
    ).bind(learnerId).all();
    const confusions = await c.env.DB.prepare(
      `SELECT * FROM confusion_flags WHERE learner_id = ? ORDER BY trigger_count DESC`
    ).bind(learnerId).all();

    learnerState = {
      learner,
      topicProgress: progress.results || [],
      recentAttempts: attempts.results || [],
      flashcardReviews: flashcards.results || [],
      examSessions: exams.results || [],
      confusionFlags: confusions.results || []
    };
  }

  return c.json({
    ok: true,
    syllabusIntelligence: SYLLABUS_INTELLIGENCE,
    curriculumDays: CURRICULUM_DAYS,
    personalities: PERSONALITIES,
    committees: COMMITTEES,
    relationshipChains: RELATIONSHIP_CHAINS,
    whoIsWhoTraps: WHO_IS_WHO_TRAPS,
    confusionPairs: CONFUSION_PAIRS,
    questions: ALL_QUESTIONS,
    pyqAnalytics: computePyqReport(),
    flashcards: FLASHCARDS_BANK,
    chronologyChallenges: CHRONOLOGY_CHALLENGES,
    historicalMaps: HISTORICAL_MAPS_METADATA,
    sourcesLibrary: SOURCES_LIBRARY,
    historicalDiscrepancies: HISTORICAL_DISCREPANCIES,
    exportsCatalog: EXPORT_DOCUMENTS_CATALOG,
    learnerState
  });
});

// 2. Learner Profile Switch / Login / Update Target Exam
apiRouter.post('/learner/profile', async (c) => {
  await ensureSchema(c.env.DB);
  const body = await c.req.json();
  const id = (body.learnerId || 'aspirant-default').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const displayName = body.displayName || 'Telangana Police Aspirant';
  const targetExam = ['SI', 'PC', 'BOTH'].includes(body.targetExam) ? body.targetExam : 'BOTH';
  const currentDay = Math.min(10, Math.max(1, Number(body.currentDay || 1)));
  const pin = String(body.pin || '2014');

  const existing = await c.env.DB.prepare(`SELECT * FROM learners WHERE id = ?`).bind(id).first<any>();
  if (!existing) {
    await c.env.DB.prepare(
      `INSERT INTO learners (id, display_name, pin_hash, target_exam, exam_start_date, current_day)
       VALUES (?, ?, ?, ?, date('now'), ?)`
    ).bind(id, displayName, pin, targetExam, currentDay).run();
  } else {
    await c.env.DB.prepare(
      `UPDATE learners SET display_name = ?, target_exam = ?, current_day = ?, updated_at = datetime('now') WHERE id = ?`
    ).bind(displayName, targetExam, currentDay, id).run();
  }

  const updated = await c.env.DB.prepare(`SELECT * FROM learners WHERE id = ?`).bind(id).first();
  return c.json({ ok: true, learner: updated });
});

// 3. Record Topic Study / Lesson Completion + Spaced Repetition Schedule
// Review intervals: Step 1 = Immediate/Same Day (0d), Step 2 = Next Day (1d), Step 3 = 3 Days (3d), Step 4 = 7 Days (7d), Step 5 = Final Pre-Exam (10d)
function computeNextIntervalDays(step: number, accuracyRatio: number, highConfWrong: number): number {
  const baseLadder = [0, 1, 3, 7, 10];
  let idx = Math.min(baseLadder.length - 1, Math.max(1, step));
  if (highConfWrong > 0 || accuracyRatio < 0.7) {
    return 1; // Force next-day urgent review if accuracy < 70% or high-confidence error detected
  }
  if (accuracyRatio < 0.85) {
    idx = Math.max(1, idx - 1);
  }
  return baseLadder[idx];
}

// Transparent Mastery Formula (Requires repeated retrieval across distinct questions — prevents single lucky quiz from giving 90%+!)
function calculateTransparentMastery(studied: number, attempts: number, correct: number, highConfWrong: number, repStep: number): number {
  if (attempts === 0) return studied ? 20 : 0;
  const rawAcc = (correct / attempts) * 100;
  // Volume reliability factor: needs at least 5 question retrievals on a topic to unlock full 100% weight
  const volumeFactor = Math.min(1.0, attempts / 5);
  const retentionBonus = Math.min(12, repStep * 3);
  const overconfidencePenalty = Math.min(25, highConfWrong * 6);
  const score = rawAcc * (0.45 + 0.55 * volumeFactor) + (studied ? 6 : 0) + retentionBonus - overconfidencePenalty;
  return Math.round(Math.max(0, Math.min(100, score)) * 10) / 10;
}

apiRouter.post('/progress/study', async (c) => {
  await ensureSchema(c.env.DB);
  const { learnerId = 'aspirant-default', topicId, dayNumber = 1, addSeconds = 120, markStudied = true, notes } = await c.req.json();

  const existing = await c.env.DB.prepare(
    `SELECT * FROM topic_progress WHERE learner_id = ? AND topic_id = ?`
  ).bind(learnerId, topicId).first<any>();

  const prevSeconds = existing?.time_spent_seconds || 0;
  const attempts = existing?.attempts || 0;
  const correct = existing?.correct_count || 0;
  const hcWrong = existing?.high_conf_wrong || 0;
  const repStep = (existing?.repetition_step || 0) + (markStudied ? 1 : 0);
  const studiedVal = markStudied ? 1 : (existing?.studied || 0);
  const accRatio = attempts > 0 ? correct / attempts : 0.8;
  const intervalDays = computeNextIntervalDays(repStep, accRatio, hcWrong);
  const mastery = calculateTransparentMastery(studiedVal, attempts, correct, hcWrong, repStep);

  await c.env.DB.prepare(
    `INSERT INTO topic_progress (
       learner_id, topic_id, day_number, studied, time_spent_seconds, attempts, correct_count, high_conf_wrong,
       interval_days, repetition_step, next_review_at, last_studied_at, mastery_score, notes
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'), datetime('now'), ?, ?)
     ON CONFLICT(learner_id, topic_id) DO UPDATE SET
       studied = excluded.studied,
       time_spent_seconds = excluded.time_spent_seconds,
       interval_days = excluded.interval_days,
       repetition_step = excluded.repetition_step,
       next_review_at = excluded.next_review_at,
       last_studied_at = datetime('now'),
       mastery_score = excluded.mastery_score,
       notes = COALESCE(?, topic_progress.notes)`
  )
    .bind(
      learnerId,
      topicId,
      dayNumber,
      studiedVal,
      prevSeconds + addSeconds,
      attempts,
      correct,
      hcWrong,
      intervalDays,
      repStep,
      intervalDays,
      mastery,
      notes ?? existing?.notes ?? '',
      notes ?? null
    )
    .run();

  await c.env.DB.prepare(
    `UPDATE learners SET total_study_seconds = total_study_seconds + ?, updated_at = datetime('now') WHERE id = ?`
  ).bind(addSeconds, learnerId).run();

  const row = await c.env.DB.prepare(`SELECT * FROM topic_progress WHERE learner_id = ? AND topic_id = ?`).bind(learnerId, topicId).first();
  return c.json({ ok: true, topicProgress: row });
});

// 4. Record Question Attempt + Confidence Calibration + Weak-Memory Confusion Detector
apiRouter.post('/attempts/record', async (c) => {
  await ensureSchema(c.env.DB);
  const {
    learnerId = 'aspirant-default',
    questionId,
    selectedOption,
    confidence = 2, // 1=Low, 2=Medium, 3=High
    timeTakenMs = 8000,
    mode = 'practice'
  } = await c.req.json();

  const q = ALL_QUESTIONS.find((item) => item.id === questionId);
  if (!q) return c.json({ ok: false, error: 'Question not found' }, 404);

  const isCorrect = Number(selectedOption) === q.correctIndex ? 1 : 0;
  const isHighConfWrong = !isCorrect && Number(confidence) === 3 ? 1 : 0;

  await c.env.DB.prepare(
    `INSERT INTO question_attempts (learner_id, question_id, topic_id, selected_option, is_correct, confidence, time_taken_ms, mode, confused_entity_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      learnerId,
      q.id,
      q.topicId,
      Number(selectedOption),
      isCorrect,
      Number(confidence),
      Number(timeTakenMs),
      mode,
      !isCorrect ? (q.confusionPairId || q.linkedEntityId || '') : ''
    )
    .run();

  // Trigger Weak-Memory Detector automatically if wrong on a question linked to a Confusion Pair!
  let triggeredConfusionPair = null;
  if (!isCorrect && q.confusionPairId) {
    await c.env.DB.prepare(
      `INSERT INTO confusion_flags (learner_id, pair_id, trigger_count, resolved, last_triggered_at)
       VALUES (?, ?, ?, 0, datetime('now'))
       ON CONFLICT(learner_id, pair_id) DO UPDATE SET
         trigger_count = confusion_flags.trigger_count + ?,
         resolved = 0,
         last_triggered_at = datetime('now')`
    )
      .bind(learnerId, q.confusionPairId, isHighConfWrong ? 2 : 1, isHighConfWrong ? 2 : 1)
      .run();

    triggeredConfusionPair = CONFUSION_PAIRS.find((cp) => cp.id === q.confusionPairId) || null;
  }

  // Update Topic Mastery & Dynamic Spaced Repetition
  const existing = await c.env.DB.prepare(
    `SELECT * FROM topic_progress WHERE learner_id = ? AND topic_id = ?`
  ).bind(learnerId, q.topicId).first<any>();

  const attempts = (existing?.attempts || 0) + 1;
  const correct = (existing?.correct_count || 0) + isCorrect;
  const hcWrong = Math.max(0, (existing?.high_conf_wrong || 0) + (isHighConfWrong ? 1 : isCorrect && existing?.high_conf_wrong > 0 ? -0.5 : 0));
  const studied = existing?.studied || 1;
  const repStep = isCorrect ? (existing?.repetition_step || 1) + 1 : 1;
  const accRatio = correct / attempts;
  const intervalDays = computeNextIntervalDays(repStep, accRatio, isHighConfWrong);
  const mastery = calculateTransparentMastery(studied, attempts, correct, hcWrong, repStep);

  await c.env.DB.prepare(
    `INSERT INTO topic_progress (
       learner_id, topic_id, day_number, studied, time_spent_seconds, attempts, correct_count, high_conf_wrong,
       interval_days, repetition_step, next_review_at, last_studied_at, mastery_score
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'), datetime('now'), ?)
     ON CONFLICT(learner_id, topic_id) DO UPDATE SET
       attempts = excluded.attempts,
       correct_count = excluded.correct_count,
       high_conf_wrong = excluded.high_conf_wrong,
       interval_days = excluded.interval_days,
       repetition_step = excluded.repetition_step,
       next_review_at = excluded.next_review_at,
       last_studied_at = datetime('now'),
       mastery_score = excluded.mastery_score`
  )
    .bind(
      learnerId,
      q.topicId,
      q.dayNumber,
      studied,
      (existing?.time_spent_seconds || 0) + Math.round(Number(timeTakenMs) / 1000),
      attempts,
      correct,
      hcWrong,
      intervalDays,
      repStep,
      intervalDays,
      mastery
    )
    .run();

  return c.json({
    ok: true,
    isCorrect: Boolean(isCorrect),
    isHighConfWrong: Boolean(isHighConfWrong),
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    whyOthersWrong: q.whyOthersWrong,
    updatedMastery: mastery,
    nextReviewInDays: intervalDays,
    triggeredConfusionPair
  });
});

// 5. Resolve a Weak-Memory Confusion Pair after targeted comparison review
apiRouter.post('/weak-memory/resolve', async (c) => {
  await ensureSchema(c.env.DB);
  const { learnerId = 'aspirant-default', pairId } = await c.req.json();
  await c.env.DB.prepare(
    `UPDATE confusion_flags SET resolved = 1 WHERE learner_id = ? AND pair_id = ?`
  ).bind(learnerId, pairId).run();
  return c.json({ ok: true });
});

// 6. Flashcard SM-2 Review Endpoint
apiRouter.post('/flashcards/review', async (c) => {
  await ensureSchema(c.env.DB);
  const { learnerId = 'aspirant-default', cardId, rating = 3 } = await c.req.json(); // rating: 1=Again, 2=Hard, 3=Good, 4=Easy
  const card = FLASHCARDS_BANK.find((fc) => fc.id === cardId);
  if (!card) return c.json({ ok: false, error: 'Flashcard not found' }, 404);

  const prev = await c.env.DB.prepare(
    `SELECT * FROM flashcard_reviews WHERE learner_id = ? AND card_id = ?`
  ).bind(learnerId, cardId).first<any>();

  let box = prev?.box_level || 0;
  let ef = prev?.ease_factor || 2.5;
  let wrongStreak = prev?.wrong_streak || 0;
  let interval = 1;

  if (rating === 1) {
    box = 0;
    wrongStreak += 1;
    ef = Math.max(1.3, ef - 0.2);
    interval = 0;
  } else {
    wrongStreak = 0;
    box += 1;
    ef = Math.max(1.3, ef + (0.1 - (4 - rating) * 0.08));
    const intervals = [1, 1, 3, 7, 10];
    interval = intervals[Math.min(intervals.length - 1, box)];
  }

  await c.env.DB.prepare(
    `INSERT INTO flashcard_reviews (learner_id, card_id, category, box_level, ease_factor, interval_days, wrong_streak, total_reviews, next_review_at, last_reviewed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, datetime('now', '+' || ? || ' days'), datetime('now'))
     ON CONFLICT(learner_id, card_id) DO UPDATE SET
       box_level = excluded.box_level,
       ease_factor = excluded.ease_factor,
       interval_days = excluded.interval_days,
       wrong_streak = excluded.wrong_streak,
       total_reviews = flashcard_reviews.total_reviews + 1,
       next_review_at = excluded.next_review_at,
       last_reviewed_at = datetime('now')`
  )
    .bind(learnerId, cardId, card.category, box, ef, interval, wrongStreak, interval)
    .run();

  return c.json({ ok: true, boxLevel: box, intervalDays: interval });
});

// 7. Submit Full Exam Simulator Session (Supports Official 2026 Negative Marking: 20% PWT / 25% SI FWE / 0% Practice)
apiRouter.post('/exams/submit', async (c) => {
  await ensureSchema(c.env.DB);
  const {
    learnerId = 'aspirant-default',
    examType = 'SI_PWT',
    negativeRate = 0.20,
    durationSeconds = 0,
    responses = [] // Array<{ questionId: string; selectedOption: number | null; confidence?: number }>
  } = await c.req.json();

  let attempted = 0;
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  const topicBreakdown: Record<string, { total: number; correct: number; wrong: number }> = {};

  for (const r of responses) {
    const q = ALL_QUESTIONS.find((item) => item.id === r.questionId);
    if (!q) continue;
    topicBreakdown[q.topicId] = topicBreakdown[q.topicId] || { total: 0, correct: 0, wrong: 0 };
    topicBreakdown[q.topicId].total += 1;

    if (r.selectedOption === null || r.selectedOption === undefined || r.selectedOption < 0) {
      unanswered += 1;
    } else {
      attempted += 1;
      if (Number(r.selectedOption) === q.correctIndex) {
        correct += 1;
        topicBreakdown[q.topicId].correct += 1;
      } else {
        wrong += 1;
        topicBreakdown[q.topicId].wrong += 1;
        if (q.confusionPairId) {
          await c.env.DB.prepare(
            `INSERT INTO confusion_flags (learner_id, pair_id, trigger_count, resolved, last_triggered_at)
             VALUES (?, ?, 1, 0, datetime('now'))
             ON CONFLICT(learner_id, pair_id) DO UPDATE SET trigger_count = confusion_flags.trigger_count + 1, resolved = 0`
          ).bind(learnerId, q.confusionPairId).run();
        }
      }
    }
  }

  const totalQuestions = responses.length;
  const maxScore = totalQuestions * 1.0;
  const rawScore = Math.round((correct * 1.0 - wrong * Number(negativeRate)) * 100) / 100;
  const accuracyPct = attempted > 0 ? Math.round((correct / attempted) * 1000) / 10 : 0;

  const weakTopics = Object.entries(topicBreakdown)
    .filter(([, stat]) => stat.total > 0 && stat.correct / stat.total < 0.85)
    .map(([topicId, stat]) => ({ topicId, accuracy: Math.round((stat.correct / stat.total) * 100) }));

  await c.env.DB.prepare(
    `INSERT INTO exam_sessions (
       learner_id, exam_type, total_questions, attempted, correct, wrong, unanswered,
       negative_rate, raw_score, max_score, accuracy_pct, duration_seconds, weak_topics_json
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      learnerId,
      examType,
      totalQuestions,
      attempted,
      correct,
      wrong,
      unanswered,
      Number(negativeRate),
      rawScore,
      maxScore,
      accuracyPct,
      Number(durationSeconds),
      JSON.stringify(weakTopics)
    )
    .run();

  return c.json({
    ok: true,
    result: {
      examType,
      totalQuestions,
      attempted,
      correct,
      wrong,
      unanswered,
      negativeRate: Number(negativeRate),
      rawScore,
      maxScore,
      netPercentage: maxScore > 0 ? Math.round((rawScore / maxScore) * 1000) / 10 : 0,
      accuracyPct,
      meets90Target: accuracyPct >= 90 && attempted >= Math.ceil(totalQuestions * 0.85),
      weakTopics
    }
  });
});
