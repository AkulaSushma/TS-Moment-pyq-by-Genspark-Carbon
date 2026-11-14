// Telangana Movement Learning Intelligence System (1948–2014) — Complete Interactive SPA
// Principle: UNDERSTAND -> CONNECT -> VISUALIZE -> RECALL -> PRACTISE -> REVISE -> MASTER

const STATE = {
  data: null,
  learnerId: localStorage.getItem('tg_learner_id') || 'aspirant-default',
  activeTab: 'dashboard', // 1..16 primary UX sections
  selectedDay: 1,
  visualLearningOnly: false,
  examLens: 'BOTH', // 'SI' | 'PC' | 'BOTH'
  personSearch: '',
  selectedPersonId: 'P-FAZAL',
  committeeSearch: '',
  selectedCommitteeId: 'C-SRC',
  selectedCompareId: 'CMP-04',
  customCompareA: 'C-8POINT',
  customCompareB: 'C-6POINT',
  selectedMapEra: 'MAP-1948',
  selectedLocationIdx: 0,
  timelinePhaseFilter: 'ALL',
  pyqFilterExam: 'ALL',
  pyqFilterYear: 'ALL',
  pyqFilterTopic: 'ALL',
  pyqFilterRepeat: 'ALL',
  practiceFilterOrigin: 'ALL',
  practiceFilterFormat: 'ALL',
  practiceFilterTopic: 'ALL',
  activeConfidence: 2, // 1=Low, 2=Medium, 3=High
  answeredQuestions: {}, // qId -> { selected, isCorrect, isHighConfWrong, explanation, whyOthersWrong, triggeredConfusionPair }
  revealedRecall: {},
  flashcardIdx: 0,
  flashcardFlipped: false,
  flashcardCategory: 'ALL',
  chronoChallengeIdx: 0,
  chronoUserOrder: [],
  chronoChecked: false,
  // Exam Simulator state
  simConfig: {
    examType: 'SI_PWT', // 'SI_PWT' | 'SI_FWE' | 'PC_PWT'
    questionCount: 25,
    negativeRate: 0.20,
    durationMinutes: 25
  },
  simActive: false,
  simQuestions: [],
  simAnswers: {},
  simSecondsLeft: 0,
  simTimerId: null,
  simResult: null,
  sourceSearch: ''
};

const NAV_SECTIONS = [
  { id: 'dashboard', num: 1, label: 'Home Dashboard', icon: 'fa-compass' },
  { id: 'journey', num: 2, label: '10-Day Learning Journey', icon: 'fa-route' },
  { id: 'timeline', num: 3, label: 'Chronological Timeline', icon: 'fa-stream' },
  { id: 'lesson', num: 4, label: 'Learn the Concept (A–N)', icon: 'fa-book-open' },
  { id: 'personalities', num: 5, label: 'Who Is Who? Personalities', icon: 'fa-id-card' },
  { id: 'committees', num: 6, label: 'Committees & Commissions', icon: 'fa-sitemap' },
  { id: 'compare', num: 7, label: 'Compare & Never Confuse', icon: 'fa-columns' },
  { id: 'map', num: 8, label: 'Interactive Movement Map', icon: 'fa-map-marked-alt' },
  { id: 'pyq', num: 9, label: 'PYQ Intelligence Centre', icon: 'fa-microscope' },
  { id: 'practice', num: 10, label: 'Practice Question Bank', icon: 'fa-tasks' },
  { id: 'simulator', num: 11, label: 'Full Exam Simulator', icon: 'fa-stopwatch' },
  { id: 'flashcards', num: 12, label: 'Flashcards & Active Recall', icon: 'fa-clone' },
  { id: 'weakmemory', num: 13, label: 'Weak Memory Revision', icon: 'fa-heartbeat' },
  { id: 'analytics', num: 14, label: 'Mastery Analytics (90%+)', icon: 'fa-chart-line' },
  { id: 'sources', num: 15, label: 'Sources & Fact Audit', icon: 'fa-balance-scale' },
  { id: 'exports', num: 16, label: 'PDF & DOCX Export Centre', icon: 'fa-file-download' }
];

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function apiPost(path, payload) {
  const res = await fetch('/api' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ learnerId: STATE.learnerId, ...payload })
  });
  return res.json();
}

async function loadBootstrap() {
  try {
    const res = await fetch('/api/bootstrap?learnerId=' + encodeURIComponent(STATE.learnerId));
    const json = await res.json();
    STATE.data = json;
    if (json.learnerState?.learner) {
      STATE.selectedDay = json.learnerState.learner.current_day || 1;
      STATE.examLens = json.learnerState.learner.target_exam || 'BOTH';
    }
    initChronoOrder(0);
    renderApp();
  } catch (err) {
    document.getElementById('app-root').innerHTML = `
      <div class="p-8 max-w-xl mx-auto mt-12 notebook-card rounded-2xl text-center">
        <h2 class="text-xl font-bold text-red-700 mb-2">Failed to Load Knowledge Engine</h2>
        <p class="text-sm text-slate-600 mb-4">${esc(err.message)}</p>
        <button onclick="location.reload()" class="px-4 py-2 bg-amber-900 text-white rounded-lg">Retry</button>
      </div>`;
  }
}

function getTopicProgress(topicId) {
  const list = STATE.data?.learnerState?.topicProgress || [];
  return list.find((p) => p.topic_id === topicId) || {
    topic_id: topicId,
    studied: 0,
    attempts: 0,
    correct_count: 0,
    high_conf_wrong: 0,
    interval_days: 0,
    repetition_step: 0,
    mastery_score: 0
  };
}

function getOverallMasteryStats() {
  const days = STATE.data?.curriculumDays || [];
  let totalMastery = 0;
  let studiedCount = 0;
  let totalAttempts = 0;
  let totalCorrect = 0;
  let dueCount = 0;

  for (const d of days) {
    const p = getTopicProgress(d.id);
    totalMastery += Number(p.mastery_score || 0);
    if (p.studied) studiedCount += 1;
    totalAttempts += Number(p.attempts || 0);
    totalCorrect += Number(p.correct_count || 0);
    if (!p.studied || Number(p.mastery_score || 0) < 85) dueCount += 1;
  }

  const avgMastery = days.length ? Math.round((totalMastery / days.length) * 10) / 10 : 0;
  const globalAcc = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 1000) / 10 : 0;
  const unresolvedConfusions = (STATE.data?.learnerState?.confusionFlags || []).filter((f) => !f.resolved).length;

  return { avgMastery, studiedCount, totalAttempts, totalCorrect, globalAcc, dueCount, unresolvedConfusions };
}

function initChronoOrder(idx) {
  const ch = STATE.data?.chronologyChallenges?.[idx];
  if (!ch) return;
  STATE.chronoChallengeIdx = idx;
  STATE.chronoChecked = false;
  // Deterministic shuffle so learner must actively reconstruct
  const copy = [...ch.items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  STATE.chronoUserOrder = copy;
}

//Schematic SVG Portrait Generator (Section 9 Compliance: Never invent facial appearance or AI likeness; use clean labelled schematic insignia portraits!)
function renderSchematicPortraitSVG(person) {
  return `
  <svg viewBox="0 0 120 120" class="w-20 h-20 shrink-0 rounded-xl shadow-sm border border-stone-300" aria-label="Schematic Historical Emblem for ${esc(person.preferredName)}">
    <defs>
      <linearGradient id="grad-${esc(person.id)}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${esc(person.accentColor)}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#1c1917" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="14" fill="url(#grad-${esc(person.id)})"/>
    <circle cx="60" cy="46" r="24" fill="none" stroke="#fde68a" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="60" y="53" text-anchor="middle" fill="#fffbeb" font-family="Fraunces, serif" font-size="20" font-weight="700">${esc(person.monogram)}</text>
    <rect x="10" y="82" width="100" height="24" rx="6" fill="rgba(255,251,235,0.16)" stroke="rgba(253,230,138,0.4)"/>
    <text x="60" y="98" text-anchor="middle" fill="#fde68a" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="700">${esc(person.phase)}</text>
  </svg>`;
}

// Hand-drawn Notebook Causal Chain SVG Flow Diagram
function renderCausalChainDiagram(ce) {
  const steps = [
    { tag: '1. BACKGROUND', text: ce.background, bg: 'bg-stone-100 border-stone-400 text-stone-800' },
    { tag: '2. PROBLEM', text: ce.problem, bg: 'bg-rose-50 border-rose-400 text-rose-900' },
    { tag: '3. DEMAND', text: ce.demand, bg: 'bg-amber-50 border-amber-500 text-amber-950' },
    { tag: '4. ACTION', text: ce.action, bg: 'bg-orange-50 border-orange-500 text-orange-950' },
    { tag: '5. RESPONSE', text: ce.response, bg: 'bg-indigo-50 border-indigo-400 text-indigo-950' },
    { tag: '6. RESULT', text: ce.result, bg: 'bg-emerald-50 border-emerald-500 text-emerald-950' },
    { tag: '7. NEXT LINK', text: ce.nextDevelopment, bg: 'bg-purple-50 border-purple-400 text-purple-950' }
  ];
  return `
  <div class="grid grid-cols-1 md:grid-cols-7 gap-2 items-stretch">
    ${steps
      .map(
        (s, idx) => `
      <div class="relative flex flex-col justify-between p-3 rounded-xl border-l-4 ${s.bg} shadow-sm">
        <div>
          <div class="text-[10px] font-extrabold tracking-wider uppercase opacity-75 mb-1">${s.tag}</div>
          <p class="text-xs leading-relaxed font-medium">${esc(s.text)}</p>
        </div>
        ${idx < 6 ? `<div class="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-amber-900 text-white text-[10px] items-center justify-center shadow">→</div>` : ''}
      </div>`
      )
      .join('')}
  </div>`;
}

// Render Single Interactive Question Card (Supports Confidence Calibration BEFORE Reveal + 4-Option Distractor Breakdown)
function renderQuestionCard(q, modeLabel = 'practice') {
  const ans = STATE.answeredQuestions[q.id];
  const originBadge =
    q.origin === 'VERIFIED_PYQ'
      ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-400"><i class="fas fa-check-circle mr-1"></i>VERIFIED OFFICIAL PYQ (${esc(q.officialQuestionCode)})</span>`
      : q.origin === 'ADAPTED_PYQ'
      ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-400"><i class="fas fa-sync-alt mr-1"></i>ADAPTED PYQ VARIATION (NON-PYQ)</span>`
      : `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-400"><i class="fas fa-flask mr-1"></i>MODEL PRACTICE QUESTION (NON-PYQ)</span>`;

  const suitabilityBadge =
    q.examSuitability === 'SI_ONLY'
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">SI EXPLICIT SYLLABUS</span>`
      : q.examSuitability === 'PC_ONLY'
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">PC TELANGANA UMBRELLA</span>`
      : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-800">HIGH RELEVANCE: SI & PC</span>`;

  return `
  <article class="notebook-card rounded-2xl p-5 mb-4 border border-stone-200/90" id="qcard-${esc(q.id)}">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <div class="flex flex-wrap items-center gap-2">
        ${originBadge}
        ${suitabilityBadge}
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700">${esc(q.format.replace('_', ' '))}</span>
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-900">Day ${q.dayNumber} • ${esc(q.difficulty)}</span>
      </div>
      <span class="text-[11px] text-stone-500 font-medium">${esc(q.examName)} (${q.examYear})</span>
    </div>

    <p class="text-sm md:text-base font-semibold text-stone-900 whitespace-pre-line leading-relaxed mb-4">${esc(q.stem)}</p>

    ${
      !ans
        ? `
      <div class="mb-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-wrap items-center justify-between gap-2">
        <span class="text-xs font-semibold text-amber-950"><i class="fas fa-bullseye mr-1"></i>Step 1 — Calibrate Confidence Before Answering:</span>
        <div class="flex gap-1.5">
          ${[
            { lvl: 1, label: '1 • Guessing / Unsure' },
            { lvl: 2, label: '2 • Fairly Confident' },
            { lvl: 3, label: '3 • 100% Lock Sure' }
          ]
            .map(
              (c) => `
            <button onclick="setConfidence(${c.lvl})" class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                STATE.activeConfidence === c.lvl
                  ? 'bg-amber-900 text-white shadow'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }">${c.label}</button>`
            )
            .join('')}
        </div>
      </div>`
        : ''
    }

    <div class="grid grid-cols-1 gap-2 mb-3">
      ${q.options
        .map((opt, idx) => {
          let btnCls = 'bg-white hover:bg-amber-50/60 border-stone-300 text-stone-800';
          let icon = `<span class="w-6 h-6 rounded-full border border-stone-400 text-xs font-bold flex items-center justify-center shrink-0">${idx + 1}</span>`;
          if (ans) {
            if (idx === q.correctIndex) {
              btnCls = 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-500';
              icon = `<span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0"><i class="fas fa-check"></i></span>`;
            } else if (idx === ans.selected && !ans.isCorrect) {
              btnCls = 'bg-rose-50 border-rose-600 text-rose-950';
              icon = `<span class="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shrink-0"><i class="fas fa-times"></i></span>`;
            } else {
              btnCls = 'bg-stone-50 border-stone-200 text-stone-500';
            }
          }
          return `
          <button ${ans ? 'disabled' : `onclick="submitSingleQuestion('${esc(q.id)}', ${idx}, '${esc(modeLabel)}')"`}
            class="w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${btnCls}">
            ${icon}
            <div class="flex-1">
              <div class="text-sm font-medium">${esc(opt)}</div>
              ${
                ans
                  ? `<div class="text-xs mt-1 ${idx === q.correctIndex ? 'text-emerald-800 font-semibold' : 'text-stone-600'}">→ ${esc(
                      q.whyOthersWrong[idx]
                    )}</div>`
                  : ''
              }
            </div>
          </button>`;
        })
        .join('')}
    </div>

    ${
      ans
        ? `
      <div class="mt-3 p-4 rounded-xl ${ans.isCorrect ? 'bg-emerald-50/90 border border-emerald-300' : 'bg-rose-50/90 border border-rose-300'}">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span class="text-xs font-extrabold uppercase ${ans.isCorrect ? 'text-emerald-900' : 'text-rose-900'}">
            ${
              ans.isCorrect
                ? '✓ Correct Retrieval! Spaced-Repetition Interval Extended.'
                : ans.isHighConfWrong
                ? '⚠ HIGH-CONFIDENCE ERROR DETECTED! Priority Revision Scheduled for Tomorrow.'
                : '✗ Incorrect — Scheduled for Immediate Spaced Review.'
            }
          </span>
          <span class="text-[11px] font-semibold text-stone-600">Source: ${esc(q.questionSource)} | Key: ${esc(q.keySource)}</span>
        </div>
        <p class="text-xs md:text-sm text-stone-800 leading-relaxed mb-2"><strong>Historical Explanation:</strong> ${esc(q.explanation)}</p>
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="px-2 py-0.5 bg-white rounded border border-stone-300">Concept: <strong>${esc(q.relatedConcept)}</strong></span>
          ${
            q.confusionPairId
              ? `<button onclick="openConfusionPair('${esc(q.confusionPairId)}')" class="px-2.5 py-0.5 bg-amber-900 text-white rounded font-semibold hover:bg-amber-800">
                  <i class="fas fa-columns mr-1"></i>Open Confusion-Eliminator Table (${esc(q.confusionPairId)})
                 </button>`
              : ''
          }
        </div>
      </div>`
        : ''
    }
  </article>`;
}

// ===================== VIEWS 1 TO 8 =====================

// 1. HOME DASHBOARD
function renderDashboardView() {
  const stats = getOverallMasteryStats();
  const siInfo = STATE.data.syllabusIntelligence.exams.SI;
  const pcInfo = STATE.data.syllabusIntelligence.exams.PC;
  const pyqMeta = STATE.data.pyqAnalytics.summary;

  return `
  <section id="hero-dashboard" class="space-y-6">
    <!-- Top Documentary Hero Banner -->
    <div class="notebook-card rounded-2xl p-6 md:p-8 border-l-8 border-amber-900 relative overflow-hidden">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-extrabold mb-3">
            <i class="fas fa-graduation-cap"></i> TELANGANA MOVEMENT & STATE FORMATION (1948–2014) • 10-DAY MASTERY TUTOR
          </div>
          <h1 class="font-editorial text-2xl md:text-4xl font-extrabold text-stone-900 leading-tight mb-2">
            Understand Why History Happened. <span class="hand-highlight">Never Confuse</span> Names, Formulas or Dates Again.
          </h1>
          <p class="text-sm text-stone-700 leading-relaxed">
            Built on the cognitive loop: <strong>UNDERSTAND → CONNECT → VISUALIZE → RECALL → PRACTISE → REVISE → MASTER</strong>.
            Aligned directly with official <strong>TGPRB 2026 SI (Rc No. 225)</strong> &amp; <strong>Constable (Rc No. 189)</strong> notifications dated 29-07-2026.
          </p>
        </div>

        <!-- Target 90% Gauge -->
        <div class="bg-amber-950 text-amber-50 rounded-2xl p-5 min-w-[250px] text-center shadow-lg">
          <div class="text-[11px] uppercase tracking-widest text-amber-300 font-bold mb-1">Calibrated Mastery Score</div>
          <div class="font-editorial text-4xl font-extrabold ${stats.avgMastery >= 90 ? 'text-emerald-400' : 'text-amber-200'}">${stats.avgMastery}%</div>
          <div class="text-xs text-amber-200/90 mt-1">Target Benchmark: <strong>≥ 90.0%</strong></div>
          <div class="w-full bg-amber-900/80 h-2.5 rounded-full mt-3 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all" style="width:${Math.min(100, stats.avgMastery)}%"></div>
          </div>
          <div class="text-[11px] mt-2 text-amber-300">${stats.studiedCount}/10 Days Studied • ${stats.globalAcc}% Quiz Accuracy</div>
        </div>
      </div>
    </div>

    <!-- KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button onclick="switchTab('pyq')" class="notebook-card rounded-2xl p-4 text-left hover:border-amber-700 transition">
        <div class="text-xs font-bold text-stone-500 uppercase">Official Papers Audited</div>
        <div class="font-editorial text-2xl font-extrabold text-amber-900 mt-1">${pyqMeta.papersAnalyzed} TSLPRB Papers</div>
        <div class="text-xs text-emerald-800 font-semibold mt-1">${pyqMeta.verifiedPyqsCount} Verified PYQs + ${pyqMeta.adaptedConceptCount + pyqMeta.modelPracticeCount} Model Qs</div>
      </button>
      <button onclick="switchTab('personalities')" class="notebook-card rounded-2xl p-4 text-left hover:border-amber-700 transition">
        <div class="text-xs font-bold text-stone-500 uppercase">Identity & Relationship Graph</div>
        <div class="font-editorial text-2xl font-extrabold text-indigo-900 mt-1">${STATE.data.personalities.length} Icons • ${STATE.data.committees.length} Panels</div>
        <div class="text-xs text-stone-600 mt-1">15-Point Cards & Clickable Chains</div>
      </button>
      <button onclick="switchTab('weakmemory')" class="notebook-card rounded-2xl p-4 text-left hover:border-amber-700 transition">
        <div class="text-xs font-bold text-stone-500 uppercase">Weak-Memory Detector</div>
        <div class="font-editorial text-2xl font-extrabold ${stats.unresolvedConfusions > 0 ? 'text-rose-700' : 'text-emerald-800'} mt-1">
          ${stats.unresolvedConfusions} Active Flags
        </div>
        <div class="text-xs text-stone-600 mt-1">${STATE.data.confusionPairs.length} Side-by-Side Confusion Tables</div>
      </button>
      <button onclick="switchTab('exports')" class="notebook-card rounded-2xl p-4 text-left hover:border-amber-700 transition">
        <div class="text-xs font-bold text-stone-500 uppercase">Publication Study Books</div>
        <div class="font-editorial text-2xl font-extrabold text-emerald-900 mt-1">8 PDF + 8 DOCX</div>
        <div class="text-xs text-stone-600 mt-1">Editable Word & Print-Ready Books</div>
      </button>
    </div>

    <!-- Official 2026 SI vs Constable Notification Verification Panel -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="notebook-card rounded-2xl p-5 border-t-4 border-rose-800">
        <div class="flex items-center justify-between mb-2">
          <span class="px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 text-xs font-extrabold">2026 SI NOTIFICATION VERIFIED</span>
          <span class="text-xs font-semibold text-stone-500">${esc(siInfo.notificationNo)} (${esc(siInfo.notificationDate)})</span>
        </div>
        <h3 class="font-editorial text-lg font-bold text-stone-900 mb-2">SCT Sub-Inspector (Civil et al.) — Explicit 3-Phase Syllabus</h3>
        <p class="text-xs text-stone-700 bg-rose-50/70 p-3 rounded-xl border border-rose-200 italic mb-3">
          Verbatim Official Text (Annexure II Item B.6 &amp; Annexure III Paper IV Item 7):<br/>
          <strong>"${esc(siInfo.fwePattern.verbatimSyllabus)}"</strong>
        </p>
        <ul class="text-xs space-y-1.5 text-stone-700">
          <li>• <strong>Tentative PWT Date:</strong> ${esc(siInfo.tentativePwtDate)} • <strong>Vacancies:</strong> ${siInfo.totalVacancies} (${siInfo.applicantsCount.toLocaleString()} applicants)</li>
          <li>• <strong>Negative Marking:</strong> <strong>20% (1/5th)</strong> in Preliminary Written Test; <strong>25% (1/4th)</strong> in Final Written Exam!</li>
        </ul>
      </div>

      <div class="notebook-card rounded-2xl p-5 border-t-4 border-sky-800">
        <div class="flex items-center justify-between mb-2">
          <span class="px-2.5 py-0.5 rounded bg-sky-100 text-sky-900 text-xs font-extrabold">2026 CONSTABLE NOTIFICATION VERIFIED</span>
          <span class="text-xs font-semibold text-stone-500">${esc(pcInfo.notificationNo)} (${esc(pcInfo.notificationDate)})</span>
        </div>
        <h3 class="font-editorial text-lg font-bold text-stone-900 mb-2">SCT Police Constable (Civil et al.) — Broad Telangana Umbrella</h3>
        <p class="text-xs text-stone-700 bg-sky-50/70 p-3 rounded-xl border border-sky-200 italic mb-3">
          Verbatim Official Text (${esc(pcInfo.fwePattern.verbatimSyllabus)}) — <strong>Does NOT use identical 3-phase wording!</strong>
        </p>
        <p class="text-xs text-stone-700 leading-relaxed mb-2">${esc(pcInfo.distinctionWarning)}</p>
        <div class="text-xs text-stone-700">• <strong>Tentative PWT Date:</strong> ${esc(pcInfo.tentativePwtDate)} • <strong>Vacancies:</strong> ${pcInfo.totalVacancies.toLocaleString()} • <strong>PWT Negative Marking:</strong> <strong>20% (1/5th)</strong></div>
      </div>
    </div>

    <!-- Quick Start Today's Day Lesson -->
    <div class="notebook-card rounded-2xl p-6 bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <div class="font-handwritten text-2xl text-amber-900">Your Active Day in the 10-Day Programme:</div>
        <h2 class="font-editorial text-xl font-bold text-stone-900">
          Day ${STATE.selectedDay}: ${esc(STATE.data.curriculumDays[STATE.selectedDay - 1]?.title || '')}
        </h2>
        <p class="text-xs text-stone-600 mt-1">${esc(STATE.data.curriculumDays[STATE.selectedDay - 1]?.subtitle || '')}</p>
      </div>
      <div class="flex flex-wrap gap-2 shrink-0">
        <button onclick="openDayLesson(${STATE.selectedDay})" class="px-5 py-2.5 rounded-xl bg-amber-900 text-white text-sm font-bold shadow hover:bg-amber-800 transition">
          <i class="fas fa-play mr-1.5"></i>Continue Day ${STATE.selectedDay} Lesson
        </button>
        <button onclick="switchTab('simulator')" class="px-4 py-2.5 rounded-xl bg-white border border-amber-900 text-amber-950 text-sm font-bold hover:bg-amber-100 transition">
          <i class="fas fa-stopwatch mr-1.5"></i>Launch Exam Simulator
        </button>
      </div>
    </div>
  </section>`;
}

// 2. TEN-DAY INTELLIGENT LEARNING JOURNEY
function renderJourneyView() {
  const days = STATE.data.curriculumDays;
  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Adaptive 10-Day Mastery Programme</h2>
          <p class="text-sm text-stone-600">Spaced-repetition intervals (Same Day → +1d → +3d → +7d → Day-10 Consolidation) adapt dynamically to your quiz accuracy &amp; confidence calibration.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-stone-600">Exam Lens:</span>
          ${['BOTH', 'SI', 'PC']
            .map(
              (lens) => `
            <button onclick="setExamLens('${lens}')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
                STATE.examLens === lens ? 'bg-amber-900 text-white' : 'bg-stone-200 text-stone-700'
              }">${lens === 'BOTH' ? 'Both SI & PC' : lens + ' Focus'}</button>`
            )
            .join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${days
          .map((d) => {
            const p = getTopicProgress(d.id);
            const qCount = STATE.data.questions.filter((q) => q.dayNumber === d.dayNumber).length;
            const pyqCount = STATE.data.questions.filter((q) => q.dayNumber === d.dayNumber && q.origin === 'VERIFIED_PYQ').length;
            return `
            <div class="notebook-card rounded-2xl p-5 border-l-4 ${
              p.mastery_score >= 90
                ? 'border-emerald-600'
                : p.studied
                ? 'border-amber-600'
                : 'border-stone-400'
            } flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-900 text-amber-50">DAY ${d.dayNumber} • ${esc(d.yearSpan)}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-900">${esc(d.priorityBadge)}</span>
                </div>
                <h3 class="font-editorial text-lg font-bold text-stone-900 mb-1">${esc(d.title)}</h3>
                <p class="text-xs text-stone-600 mb-3">${esc(d.subtitle)}</p>

                <div class="text-[11px] space-y-1 bg-stone-50 p-2.5 rounded-xl border border-stone-200 mb-3">
                  ${
                    STATE.examLens !== 'PC'
                      ? `<div><strong class="text-rose-900">SI Mapping:</strong> ${esc(d.siSyllabusMapping)}</div>`
                      : ''
                  }
                  ${
                    STATE.examLens !== 'SI'
                      ? `<div><strong class="text-sky-900">PC Mapping:</strong> ${esc(d.pcSyllabusMapping)}</div>`
                      : ''
                  }
                </div>

                <ul class="text-xs text-stone-700 space-y-1 mb-4">
                  ${d.learningObjectives.map((obj) => `<li><i class="fas fa-check text-amber-800 mr-1.5"></i>${esc(obj)}</li>`).join('')}
                </ul>
              </div>

              <div class="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <div class="text-xs">
                  <span class="font-bold ${p.mastery_score >= 90 ? 'text-emerald-700' : 'text-amber-900'}">Mastery: ${p.mastery_score}%</span>
                  <span class="text-stone-400 mx-1">•</span>
                  <span class="text-stone-600">${pyqCount} PYQs / ${qCount} Total Qs</span>
                  ${p.interval_days ? `<span class="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-bold">SR +${p.interval_days}d</span>` : ''}
                </div>
                <div class="flex gap-2">
                  <button onclick="openDayLesson(${d.dayNumber})" class="px-3.5 py-1.5 rounded-lg bg-amber-900 text-white text-xs font-bold hover:bg-amber-800">
                    Open Lesson (A–N)
                  </button>
                  <button onclick="openDayPractice(${d.dayNumber})" class="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-800 text-xs font-bold hover:bg-stone-300">
                    Day Test
                  </button>
                </div>
              </div>
            </div>`;
          })
          .join('')}
      </div>
    </div>
  </section>`;
}

// 3. COMPLETE CHRONOLOGICAL TIMELINE (1948–2014 + Separated Pre-1948 Roots)
function renderTimelineView() {
  const allEvents = [];
  for (const d of STATE.data.curriculumDays) {
    for (const ev of d.chronologicalNarrative) {
      if (STATE.timelinePhaseFilter !== 'ALL') {
        if (STATE.timelinePhaseFilter === 'PRE-1948' && !ev.isPre1948Background) continue;
        if (STATE.timelinePhaseFilter !== 'PRE-1948' && (ev.isPre1948Background || d.phase !== STATE.timelinePhaseFilter)) continue;
      }
      allEvents.push({ ...ev, dayNumber: d.dayNumber, phase: ev.isPre1948Background ? 'PRE-1948 ROOT' : d.phase, topicId: d.id });
    }
  }

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Complete Interconnected Chronology (1948 – 2 June 2014)</h2>
          <p class="text-sm text-stone-600">Pre-1948 historical roots (1868/1919 Mulki Farmans) are clearly separated from the official 3-Phase SI classification. Click any milestone to jump to its full lesson.</p>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${[
            { k: 'ALL', l: 'All Milestones (' + allEvents.length + ')' },
            { k: 'PRE-1948', l: 'Pre-1948 Roots' },
            { k: 'PHASE-I', l: 'Phase I (1948–70)' },
            { k: 'PHASE-II', l: 'Phase II (1971–90)' },
            { k: 'PHASE-III', l: 'Phase III (1991–2014)' }
          ]
            .map(
              (f) => `
            <button onclick="setTimelineFilter('${f.k}')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
                STATE.timelinePhaseFilter === f.k ? 'bg-amber-900 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }">${f.l}</button>`
            )
            .join('')}
        </div>
      </div>

      <!-- Hand-Drawn Style Illustrated SVG Era Ribbon -->
      <div class="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 overflow-x-auto">
        <svg viewBox="0 0 960 95" class="w-full min-w-[680px] h-24">
          <path d="M 30 50 Q 250 38, 480 50 T 930 48" fill="none" stroke="#7c2d12" stroke-width="3.5" stroke-dasharray="6 3"/>
          ${[
            { x: 55, yr: '1919', lbl: 'Mulki Farman' },
            { x: 160, yr: '17 Sep 1948', lbl: 'Operation Polo' },
            { x: 265, yr: '3 Sep 1952', lbl: 'City College' },
            { x: 375, yr: '20 Feb 1956', lbl: 'Gentlemen Pact' },
            { x: 485, yr: '8 Jan 1969', lbl: '1969 Uprising' },
            { x: 595, yr: '21 Sep 1973', lbl: '6-Point / 371D' },
            { x: 700, yr: '30 Dec 1985', lbl: 'GO 610' },
            { x: 805, yr: '27 Apr 2001', lbl: 'TRS Founded' },
            { x: 905, yr: '2 Jun 2014', lbl: '29th State!' }
          ]
            .map(
              (m) => `
            <g>
              <circle cx="${m.x}" cy="49" r="8" fill="#fffbeb" stroke="#7c2d12" stroke-width="3"/>
              <text x="${m.x}" y="26" text-anchor="middle" font-family="Fraunces, serif" font-size="11" font-weight="700" fill="#7c2d12">${m.yr}</text>
              <text x="${m.x}" y="76" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="600" fill="#292524">${m.lbl}</text>
            </g>`
            )
            .join('')}
        </svg>
      </div>

      <div class="relative pl-6 border-l-4 border-amber-800/40 space-y-4">
        ${allEvents
          .map(
            (ev) => `
          <div onclick="openDayLesson(${ev.dayNumber})" class="cursor-pointer group relative notebook-card rounded-xl p-4 hover:border-amber-800 transition">
            <div class="absolute -left-[34px] top-5 w-4 h-4 rounded-full ${
              ev.isPre1948Background ? 'bg-stone-500' : 'bg-amber-800'
            } ring-4 ring-amber-50"></div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 text-xs font-extrabold">${esc(ev.date)}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                  ev.isPre1948Background ? 'bg-stone-200 text-stone-800' : 'bg-indigo-100 text-indigo-900'
                }">${esc(ev.phase)} • Day ${ev.dayNumber}</span>
              </div>
              <span class="text-xs text-stone-500"><i class="fas fa-map-pin mr-1 text-rose-700"></i>${esc(ev.place)}</span>
            </div>
            <h4 class="font-editorial text-base font-bold text-stone-900 group-hover:text-amber-900">${esc(ev.eventTitle)}</h4>
            <p class="text-xs md:text-sm text-stone-700 mt-1 leading-relaxed">${esc(ev.detail)}</p>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

// 4. LEARN THE CONCEPT (FULL SECTION 7 ARCHITECTURE: A TO N + VISUAL MODE TOGGLE)
function renderLessonView() {
  const day = STATE.data.curriculumDays.find((d) => d.dayNumber === STATE.selectedDay) || STATE.data.curriculumDays[0];
  const prog = getTopicProgress(day.id);
  const linkedPeople = STATE.data.personalities.filter((p) => day.personIds.includes(p.id));
  const linkedCommittees = STATE.data.committees.filter((c) => day.committeeIds.includes(c.id));
  const linkedConfusions = STATE.data.confusionPairs.filter((cp) => day.confusionPairIds.includes(cp.id));
  const dayQuestions = STATE.data.questions.filter((q) => q.dayNumber === day.dayNumber);
  const linkedSources = STATE.data.sourcesLibrary.filter((s) => day.sourceIds.includes(s.id));

  return `
  <section class="space-y-6">
    <!-- Day Selector Strip & Visual Learning Mode Switch -->
    <div class="notebook-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap gap-1.5">
        ${STATE.data.curriculumDays
          .map(
            (d) => `
          <button onclick="openDayLesson(${d.dayNumber})" class="px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
              d.dayNumber === day.dayNumber
                ? 'bg-amber-900 text-white shadow'
                : 'bg-stone-100 text-stone-700 hover:bg-amber-100'
            }">Day ${d.dayNumber}</button>`
          )
          .join('')}
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleVisualMode()" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
          STATE.visualLearningOnly
            ? 'bg-indigo-900 text-white border-indigo-900'
            : 'bg-white text-indigo-950 border-indigo-300 hover:bg-indigo-50'
        }">
          <i class="fas fa-project-diagram mr-1"></i>${STATE.visualLearningOnly ? 'Showing Visual Learning Mode (Diagrams Only)' : 'Switch to Visual Learning Mode'}
        </button>
        <button onclick="markDayCompleted('${day.id}', ${day.dayNumber})" class="px-3.5 py-1.5 rounded-lg text-xs font-bold ${
          prog.studied ? 'bg-emerald-700 text-white' : 'bg-amber-800 text-white hover:bg-amber-700'
        }">
          <i class="fas ${prog.studied ? 'fa-check-double' : 'fa-bookmark'} mr-1"></i>${prog.studied ? 'Studied (Log +5m Review)' : 'Mark Lesson Studied'}
        </button>
      </div>
    </div>

    <!-- Chapter Header Banner -->
    <div class="notebook-card rounded-2xl p-6 md:p-8 border-t-8 border-amber-900">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="px-3 py-0.5 rounded-full bg-amber-900 text-white text-xs font-extrabold">DAY ${day.dayNumber} OF 10 • ${esc(day.yearSpan)}</span>
        <span class="px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 text-xs font-extrabold">${esc(day.priorityBadge)}</span>
        <span class="text-xs text-stone-600 font-semibold">${esc(day.phaseLabel)}</span>
      </div>
      <h1 class="font-editorial text-2xl md:text-3xl font-extrabold text-stone-900 mb-2">${esc(day.title)}</h1>
      <p class="text-sm text-stone-600 mb-4">${esc(day.subtitle)}</p>

      <!-- Dual Exam Relevance Indicator (Section 3 Mandatory Requirement) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-rose-50/80 border border-rose-200">
          <strong class="text-rose-950"><i class="fas fa-shield-alt mr-1"></i>2026 SI Relevance:</strong> ${esc(day.siSyllabusMapping)}
        </div>
        <div class="p-3 rounded-xl bg-sky-50/80 border border-sky-200">
          <strong class="text-sky-950"><i class="fas fa-user-shield mr-1"></i>2026 Constable Relevance:</strong> ${esc(day.pcSyllabusMapping)}
        </div>
      </div>
    </div>

    ${
      !STATE.visualLearningOnly
        ? `
    <!-- A & B: Big Picture + Historical Background -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="notebook-card rounded-2xl p-6 notebook-margin-line">
        <div class="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-1">A. Start With The Big Picture</div>
        <p class="text-sm md:text-base text-stone-800 leading-relaxed font-medium">${esc(day.bigPicture)}</p>
      </div>
      <div class="notebook-card rounded-2xl p-6">
        <div class="text-xs font-extrabold uppercase tracking-wider text-stone-600 mb-1">B. Historical Background & Pre-Conditions</div>
        <p class="text-sm text-stone-700 leading-relaxed">${esc(day.historicalBackground)}</p>
      </div>
    </div>

    <!-- C: Why Did It Happen? (4-Dimensional Causal Grid) -->
    <div class="notebook-card rounded-2xl p-6">
      <div class="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-3">C. Why Did It Happen? — Multi-Dimensional Structural Causes</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div class="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200"><strong class="block text-rose-950 mb-1">1. Political Causes</strong>${esc(day.whyItHappened.political)}</div>
        <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200"><strong class="block text-amber-950 mb-1">2. Economic & Fiscal</strong>${esc(day.whyItHappened.economic)}</div>
        <div class="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200"><strong class="block text-indigo-950 mb-1">3. Administrative & Legal</strong>${esc(day.whyItHappened.administrative)}</div>
        <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200"><strong class="block text-emerald-950 mb-1">4. Social & Cultural</strong>${esc(day.whyItHappened.socialCultural)}</div>
      </div>
    </div>`
        : ''
    }

    <!-- G: Visual Cause-and-Effect Chain (Always visible in both Normal & Visual Modes) -->
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-extrabold uppercase tracking-wider text-amber-900">G. Visual Cause-and-Effect Chain</div>
        <span class="font-handwritten text-xl text-amber-900">How one event forced the next →</span>
      </div>
      ${renderCausalChainDiagram(day.causeEffect)}
    </div>

    <!-- D: Detailed Chronological Sequence -->
    <div class="notebook-card rounded-2xl p-6">
      <div class="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-4">D. What Exactly Happened? — Verified Chronological Sequence</div>
      <div class="space-y-3">
        ${day.chronologicalNarrative
          .map(
            (item) => `
          <div class="p-4 rounded-xl ${
            item.isPre1948Background ? 'bg-stone-100 border-l-4 border-stone-500' : 'bg-amber-50/40 border-l-4 border-amber-800'
          }">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span class="text-xs font-extrabold text-amber-950">${esc(item.date)} — ${esc(item.eventTitle)}</span>
              <span class="text-[11px] text-stone-600"><i class="fas fa-map-marker-alt text-rose-700 mr-1"></i>${esc(item.place)}</span>
            </div>
            ${!STATE.visualLearningOnly ? `<p class="text-xs md:text-sm text-stone-700 leading-relaxed">${esc(item.detail)}</p>` : ''}
          </div>`
          )
          .join('')}
      </div>
    </div>

    <!-- E & F: People, Committees & Geographical Locations -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="notebook-card rounded-2xl p-5 lg:col-span-2">
        <div class="text-xs font-extrabold uppercase tracking-wider text-indigo-900 mb-3">E. Connected Personalities & Committees (Click to Inspect Full Network)</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          ${linkedPeople
            .map(
              (p) => `
            <button onclick="inspectPerson('${esc(p.id)}')" class="p-3 rounded-xl border border-stone-200 bg-white hover:border-indigo-500 text-left flex items-center gap-3 transition">
              ${renderSchematicPortraitSVG(p)}
              <div>
                <div class="text-sm font-bold text-stone-900">${esc(p.preferredName)}</div>
                <div class="text-[11px] text-stone-600 line-clamp-2">${esc(p.mainRole)}</div>
                <div class="text-[10px] font-bold text-indigo-800 mt-1">Click for 15-Point Identity Card →</div>
              </div>
            </button>`
            )
            .join('')}
        </div>
        <div class="flex flex-wrap gap-2">
          ${linkedCommittees
            .map(
              (c) => `
            <button onclick="inspectCommittee('${esc(c.id)}')" class="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-950 text-xs font-bold hover:bg-indigo-100">
              <i class="fas fa-sitemap mr-1"></i>${esc(c.name)}
            </button>`
            )
            .join('')}
        </div>
      </div>

      <div class="notebook-card rounded-2xl p-5">
        <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-3">F. Spatial & Location Anchors</div>
        <div class="space-y-2.5">
          ${day.locations
            .map(
              (loc) => `
            <div class="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div class="text-xs font-bold text-emerald-950"><i class="fas fa-map-pin mr-1"></i>${esc(loc.place)} <span class="text-[10px] font-normal text-stone-500">(${esc(loc.region)})</span></div>
              <div class="text-xs text-stone-700 mt-1">${esc(loc.significance)}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>

    <!-- H & K: Compact Factual Memory Cards + Memory-Lock Mechanism -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="notebook-card rounded-2xl p-5">
        <div class="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-3">H. High-Yield Factual Memory Cards</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${day.factualCards
            .map(
              (fc) => `
            <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <div class="text-[10px] font-extrabold uppercase text-amber-800">${esc(fc.category)} • ${esc(fc.label)}</div>
              <div class="text-xs font-bold text-stone-900 mt-0.5">${esc(fc.value)}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>

      <div class="notebook-card rounded-2xl p-5 bg-amber-50/40 border-2 border-dashed border-amber-800/40">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-950">K. Classroom Notebook Memory-Lock</span>
          <span class="font-handwritten text-2xl text-rose-700">Lock It In Memory!</span>
        </div>
        <div class="space-y-2 text-xs text-stone-800">
          <div><strong class="text-amber-950">Mnemonic Code:</strong> <span class="hand-highlight font-bold">${esc(day.memoryLocks.mnemonic)}</span></div>
          <div><strong class="text-amber-950">Visual Anchor:</strong> ${esc(day.memoryLocks.visualAssociation)}</div>
          <div><strong class="text-amber-950">Timeline Chain:</strong> <code class="bg-white px-1.5 py-0.5 rounded border">${esc(day.memoryLocks.timelineAnchor)}</code></div>
          <div><strong class="text-amber-950">Story Hook:</strong> ${esc(day.memoryLocks.storyRecall)}</div>
          <div class="p-2.5 bg-white rounded-lg border border-amber-300 font-semibold text-amber-950">“${esc(day.memoryLocks.shortSentence)}”</div>
        </div>
      </div>
    </div>

    ${
      !STATE.visualLearningOnly
        ? `
    <!-- I & J: Why Examiners Ask This + Common Confusion Eliminators -->
    <div class="notebook-card rounded-2xl p-5">
      <div class="text-xs font-extrabold uppercase tracking-wider text-rose-900 mb-1">I. Why Examiners Ask This Topic & PYQ Evidence</div>
      <p class="text-xs md:text-sm text-stone-800 leading-relaxed mb-3">${esc(day.whyExaminersAsk)} <span class="text-stone-500">(${esc(day.priorityEvidence)})</span></p>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs font-bold text-stone-700">J. Linked Confusion-Eliminator Comparisons:</span>
        ${linkedConfusions
          .map(
            (cp) => `
          <button onclick="openConfusionPair('${esc(cp.id)}')" class="px-3 py-1 rounded-lg bg-rose-100 text-rose-900 text-xs font-bold hover:bg-rose-200">
            <i class="fas fa-columns mr-1"></i>${esc(cp.title)}
          </button>`
          )
          .join('')}
      </div>
    </div>

    <!-- L: Active Recall Prompts (Ask BEFORE Displaying Answer!) -->
    <div class="notebook-card rounded-2xl p-6 border-l-4 border-indigo-700">
      <div class="text-xs font-extrabold uppercase tracking-wider text-indigo-900 mb-3">L. Active Recall Checkpoint — Retrieve From Memory Before Clicking Reveal!</div>
      <div class="space-y-3">
        ${day.activeRecall
          .map((ar) => {
            const rev = STATE.revealedRecall[ar.id];
            return `
            <div class="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200">
              <div class="text-sm font-bold text-stone-900 mb-2">Q: ${esc(ar.prompt)}</div>
              <div class="text-xs text-stone-500 mb-2">Hint: ${esc(ar.hint)}</div>
              ${
                rev
                  ? `<div class="p-3 rounded-lg bg-white border border-emerald-400 text-xs md:text-sm font-semibold text-emerald-950">${esc(ar.answer)}</div>`
                  : `<button onclick="revealRecallPrompt('${esc(ar.id)}')" class="px-3.5 py-1.5 rounded-lg bg-indigo-800 text-white text-xs font-bold hover:bg-indigo-700">
                      <i class="fas fa-eye mr-1"></i>I Have Recalled Mentally — Reveal Verified Answer
                     </button>`
              }
            </div>`;
          })
          .join('')}
      </div>
    </div>

    <!-- M: Day Examination Drill (PYQs + Model Analytical Questions) -->
    <div>
      <h3 class="font-editorial text-xl font-bold text-stone-900 mb-3">M. Day ${day.dayNumber} Examination Drill (${dayQuestions.length} Verified PYQs &amp; Analytical Questions)</h3>
      ${dayQuestions.map((q) => renderQuestionCard(q, 'day_test')).join('')}
    </div>`
        : ''
    }

    <!-- N: One-Minute Rapid Revision Panel + Source Verification Footer -->
    <div class="notebook-card rounded-2xl p-6 bg-stone-900 text-amber-50">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-extrabold uppercase tracking-widest text-amber-400">N. 60-Second Rapid Revision Compression</div>
        <span class="text-xs text-stone-400">Next Assignment: ${esc(day.revisionAssignment)}</span>
      </div>
      <ul class="space-y-1.5 text-xs md:text-sm">
        ${day.oneMinuteRevision.map((line) => `<li><span class="text-amber-400 font-bold mr-2">⚡</span>${esc(line)}</li>`).join('')}
      </ul>
      <div class="mt-4 pt-3 border-t border-stone-700 text-[11px] text-stone-300 flex flex-wrap gap-2 items-center">
        <span class="font-bold text-amber-300"><i class="fas fa-check-shield mr-1"></i>Verified Sources for Day ${day.dayNumber}:</span>
        ${linkedSources.map((s) => `<span class="px-2 py-0.5 rounded bg-stone-800 border border-stone-600">${esc(s.id)}: ${esc(s.title.slice(0, 62))}…</span>`).join('')}
      </div>
    </div>
  </section>`;
}

// 5. HISTORICAL PERSONALITY EXPLORER + "WHO IS WHO? NEVER CONFUSE AGAIN" + CLICKABLE RELATIONSHIP GRAPH
function renderPersonalitiesView() {
  const q = STATE.personSearch.trim().toLowerCase();
  const filtered = STATE.data.personalities.filter(
    (p) =>
      !q ||
      p.fullName.toLowerCase().includes(q) ||
      p.preferredName.toLowerCase().includes(q) ||
      p.mainRole.toLowerCase().includes(q) ||
      p.examClue.toLowerCase().includes(q)
  );
  const selected = STATE.data.personalities.find((p) => p.id === STATE.selectedPersonId) || filtered[0] || STATE.data.personalities[0];
  const chains = STATE.data.relationshipChains.filter((ch) => ch.personId === selected.id);
  const relatedQuestions = STATE.data.questions.filter((item) => item.linkedEntityId === selected.id);

  return `
  <section class="space-y-6">
    <!-- Clickable Master Person -> Committee -> Outcome Network Chains -->
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Historical Personality Explorer &amp; Clickable Network Graph</h2>
          <p class="text-sm text-stone-600">Select any personality below to inspect all <strong>15 mandatory identity attributes</strong>, confused names, and verified historical chains.</p>
        </div>
        <input type="search" value="${esc(STATE.personSearch)}" oninput="updatePersonSearch(this.value)"
          placeholder="Search name, committee, role, place…"
          class="px-4 py-2 rounded-xl border border-stone-300 bg-white text-sm w-full md:w-72" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Selector List -->
        <div class="lg:col-span-4 space-y-2 max-h-[680px] overflow-y-auto pr-1">
          ${filtered
            .map(
              (p) => `
            <button onclick="selectPerson('${esc(p.id)}')" class="w-full text-left p-3 rounded-xl border transition flex items-center gap-3 ${
                selected.id === p.id ? 'bg-amber-900 text-white border-amber-900 shadow' : 'bg-white hover:bg-amber-50 border-stone-200'
              }">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center font-editorial font-bold text-xs shrink-0" style="background:${esc(p.accentColor)};color:#fff">${esc(p.monogram)}</div>
              <div class="min-w-0">
                <div class="text-sm font-bold truncate">${esc(p.preferredName)}</div>
                <div class="text-[11px] ${selected.id === p.id ? 'text-amber-200' : 'text-stone-500'} truncate">${esc(p.period)} • Day ${p.dayNumber}</div>
              </div>
            </button>`
            )
            .join('')}
        </div>

        <!-- Right 15-Field Structured Identity Card -->
        <div class="lg:col-span-8 notebook-card rounded-2xl p-6 border-2 border-amber-900/25">
          <div class="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b border-stone-200">
            ${renderSchematicPortraitSVG(selected)}
            <div>
              <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 text-[11px] font-extrabold">${esc(selected.phase)} • DAY ${selected.dayNumber}</span>
              <h3 class="font-editorial text-2xl font-extrabold text-stone-900 mt-1">1. ${esc(selected.fullName)}</h3>
              <div class="text-xs text-stone-600 font-semibold">2. Commonly Known As: <strong>${esc(selected.preferredName)}</strong> • 3. Period: <strong>${esc(selected.period)}</strong></div>
              <p class="text-xs text-stone-700 mt-1.5"><strong>4. Background:</strong> ${esc(selected.background)}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 text-xs">
            <div class="p-3 rounded-xl bg-stone-50 border"><strong>5. Main Role:</strong> ${esc(selected.mainRole)}</div>
            <div class="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200"><strong>6 &amp; 7. Committee &amp; Exact Role:</strong> ${esc(selected.committees.join('; '))} — <em>${esc(selected.roleInCommittee)}</em></div>
            <div class="p-3 rounded-xl bg-stone-50 border"><strong>8. Other Bodies/Associations:</strong> ${esc(selected.otherAssociations.join('; '))}</div>
            <div class="p-3 rounded-xl bg-stone-50 border"><strong>9. Govt / Organisational Posts:</strong> ${esc(selected.govtOrOrgPosts.join('; '))}</div>
            <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200"><strong>10. Major Connected Events:</strong> ${esc(selected.majorEvents.join(' • '))}</div>
            <div class="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200"><strong>11. Associated Places:</strong> ${esc(selected.places.join(', '))}</div>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="p-3 rounded-xl bg-white border border-stone-200"><strong>12. Historical Contribution:</strong> ${esc(selected.contribution)}</div>
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950"><strong>13. How To Identify Instantly in MCQ:</strong> ${esc(selected.examClue)}</div>
            <div class="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-950"><strong>14. Commonly Confused With (WATCH OUT!):</strong> ${esc(selected.commonlyConfusedWith.join(' | '))}</div>
            <div class="p-3 rounded-xl bg-amber-100/70 border border-amber-400 text-amber-950 font-semibold"><strong>15. Visual Memory Cue:</strong> <span class="font-handwritten text-lg ml-1">${esc(selected.visualMemoryCue)}</span></div>
          </div>

          <!-- Interactive Relationship Chain Diagram for Selected Person -->
          ${
            chains.length
              ? `
            <div class="mt-5 pt-4 border-t border-stone-200">
              <div class="text-xs font-extrabold uppercase text-indigo-950 mb-2">Interactive Connection Chain (PERSON → COMMITTEE → POSITION → YEAR → EVENT → PLACE → OUTCOME)</div>
              ${chains
                .map(
                  (ch) => `
                <div class="flex flex-wrap items-center gap-1.5 text-xs bg-indigo-50/60 p-3 rounded-xl border border-indigo-200 mb-2">
                  <span class="px-2 py-1 rounded bg-amber-900 text-white font-bold">${esc(ch.person)}</span>
                  <span>→</span>
                  <button onclick="inspectCommittee('${esc(ch.committeeId)}')" class="px-2 py-1 rounded bg-indigo-700 text-white font-bold hover:bg-indigo-600">${esc(ch.committee)}</button>
                  <span>→</span>
                  <span class="px-2 py-1 rounded bg-white border font-semibold">${esc(ch.position)} (${esc(ch.year)})</span>
                  <span>→</span>
                  <span class="px-2 py-1 rounded bg-white border">${esc(ch.event)} @ ${esc(ch.place)}</span>
                  <span>→</span>
                  <span class="px-2 py-1 rounded bg-emerald-100 text-emerald-950 font-bold">${esc(ch.outcome)}</span>
                </div>`
                )
                .join('')}
            </div>`
              : ''
          }

          ${
            relatedQuestions.length
              ? `<div class="mt-3 text-xs text-stone-600"><strong>Linked Exam Questions (${relatedQuestions.length}):</strong> ${relatedQuestions.map((rq) => rq.officialQuestionCode).join(', ')}</div>`
              : ''
          }
        </div>
      </div>
    </div>

    <!-- Special Compulsory Section: WHO IS WHO? — NEVER CONFUSE THESE PERSONALITIES AGAIN -->
    <div class="notebook-card rounded-2xl p-6 border-t-4 border-rose-700">
      <h3 class="font-editorial text-xl font-extrabold text-rose-950 mb-1">WHO IS WHO? — Never Confuse These Personalities Again!</h3>
      <p class="text-xs text-stone-600 mb-4">High-risk exam name traps disambiguated side by side.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${STATE.data.whoIsWhoTraps
          .map(
            (trap) => `
          <div class="p-4 rounded-xl bg-rose-50/40 border border-rose-200">
            <h4 class="font-bold text-sm text-stone-900 mb-1">${esc(trap.groupTitle)}</h4>
            <p class="text-xs text-rose-800 mb-2.5">${esc(trap.trapSummary)}</p>
            <div class="space-y-1.5">
              ${trap.members
                .map(
                  (m) => `
                <div class="p-2 rounded-lg bg-white border border-stone-200 text-xs">
                  <strong class="text-amber-950">${esc(m.name)} (${esc(m.year)}):</strong> ${esc(m.role)}
                </div>`
                )
                .join('')}
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

// 6. COMMITTEE AND COMMISSION EXPLORER
function renderCommitteesView() {
  const q = STATE.committeeSearch.trim().toLowerCase();
  const list = STATE.data.committees.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.chairman.toLowerCase().includes(q) ||
      c.mandate.toLowerCase().includes(q)
  );
  const sel = STATE.data.committees.find((c) => c.id === STATE.selectedCommitteeId) || list[0] || STATE.data.committees[0];

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Committee, Commission, Formula &amp; G.O. Explorer</h2>
          <p class="text-sm text-stone-600">Every mechanism strictly separated with all 12 verification fields (Chair, Members, Appointment, Mandate, Findings, Submission &amp; Aftermath).</p>
        </div>
        <input type="search" value="${esc(STATE.committeeSearch)}" oninput="updateCommitteeSearch(this.value)"
          placeholder="Search Fazal Ali, Wanchoo, Girglani, Srikrishna, 610…"
          class="px-4 py-2 rounded-xl border border-stone-300 bg-white text-sm w-full md:w-80" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-4 space-y-2 max-h-[650px] overflow-y-auto pr-1">
          ${list
            .map(
              (c) => `
            <button onclick="selectCommittee('${esc(c.id)}')" class="w-full text-left p-3.5 rounded-xl border transition ${
                sel.id === c.id ? 'bg-indigo-950 text-white border-indigo-950 shadow' : 'bg-white hover:bg-indigo-50/60 border-stone-200'
              }">
              <div class="text-[10px] font-extrabold uppercase ${sel.id === c.id ? 'text-amber-300' : 'text-indigo-700'}">${esc(c.category)} • ${esc(c.phase)}</div>
              <div class="text-sm font-bold mt-0.5">${esc(c.name)}</div>
              <div class="text-[11px] ${sel.id === c.id ? 'text-indigo-200' : 'text-stone-500'} mt-0.5">Appointed: ${esc(c.appointmentDate)}</div>
            </button>`
            )
            .join('')}
        </div>

        <div class="lg:col-span-8 notebook-card rounded-2xl p-6 border-2 border-indigo-900/20">
          <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div>
              <span class="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-950 text-xs font-extrabold">${esc(sel.category)} • Day ${sel.dayNumber}</span>
              <h3 class="font-editorial text-2xl font-extrabold text-stone-900 mt-1">${esc(sel.name)}</h3>
            </div>
            <button onclick="inspectPerson('${esc(sel.chairmanId)}')" class="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-950 text-xs font-bold hover:bg-amber-200">
              <i class="fas fa-user-tie mr-1"></i>Inspect Linked Leader Card
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 text-xs">
            <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200"><strong>Chairman / Lead Authority:</strong> ${esc(sel.chairman)}</div>
            <div class="p-3 rounded-xl bg-stone-50 border"><strong>Appointment Date:</strong> ${esc(sel.appointmentDate)}</div>
            <div class="p-3 rounded-xl bg-stone-50 border md:col-span-2"><strong>Other Members / Signatories:</strong> ${esc(sel.members.join(' • '))}</div>
            <div class="p-3 rounded-xl bg-stone-50 border"><strong>Appointing Authority:</strong> ${esc(sel.appointingAuthority)}</div>
            <div class="p-3 rounded-xl bg-stone-50 border"><strong>HQ / Location &amp; Report Date:</strong> ${esc(sel.headquarters)} | <strong>${esc(sel.submissionDate)}</strong></div>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded-xl bg-rose-50/60 border border-rose-200"><strong>Reason for Appointment:</strong> ${esc(sel.reason)}</div>
            <div class="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200"><strong>Official Mandate:</strong> ${esc(sel.mandate)}</div>
            <div class="p-4 rounded-xl bg-white border border-stone-300">
              <strong class="block text-stone-900 mb-1.5">Key Provisions / Recommendations / Findings:</strong>
              <ul class="space-y-1 list-disc pl-4 text-stone-800">
                ${sel.recommendations.map((r) => `<li>${esc(r)}</li>`).join('')}
              </ul>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950"><strong>What Happened Afterwards (Historical Outcome):</strong> ${esc(sel.aftermath)}</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <div class="p-2.5 rounded-lg bg-stone-100 text-stone-700"><strong>← Preceded By:</strong> ${esc(sel.previousRelated)}</div>
              <div class="p-2.5 rounded-lg bg-stone-100 text-stone-700"><strong>→ Followed By:</strong> ${esc(sel.subsequentRelated)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// 7. COMPARE & NEVER CONFUSE MODULE (12 Dedicated Comparison Matrices + Custom Any-Two Committee Comparator)
function renderCompareView() {
  const pairs = STATE.data.confusionPairs;
  const active = pairs.find((p) => p.id === STATE.selectedCompareId) || pairs[0];
  const compA = STATE.data.committees.find((c) => c.id === STATE.customCompareA) || STATE.data.committees[0];
  const compB = STATE.data.committees.find((c) => c.id === STATE.customCompareB) || STATE.data.committees[1];

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <h2 class="font-editorial text-2xl font-bold text-stone-900 mb-1">Special Confusion-Elimination Module</h2>
      <p class="text-sm text-stone-600 mb-4">Side-by-side comparison matrices structured strictly on: <strong>WHAT IT IS | WHEN | WHY | WHO | PURPOSE | RESULT | HOW TO IDENTIFY IN MCQ</strong>.</p>

      <div class="flex flex-wrap gap-2 mb-5">
        ${pairs
          .map(
            (p) => `
          <button onclick="selectComparePair('${esc(p.id)}')" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              active.id === p.id
                ? 'bg-amber-900 text-white border-amber-900 shadow'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-amber-50'
            }">${esc(p.title)}</button>`
          )
          .join('')}
      </div>

      <!-- Active Comparison Matrix -->
      <div class="p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-950 mb-4">
        <strong><i class="fas fa-exclamation-triangle mr-1"></i>Examiner Trap Alert:</strong> ${esc(active.trapAlert)}
      </div>

      <div class="overflow-x-auto rounded-xl border border-stone-300">
        <table class="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr class="bg-stone-900 text-amber-50">
              <th class="p-3 w-40 font-extrabold">DIMENSION</th>
              ${active.entities.map((ent) => `<th class="p-3 font-editorial text-base">${esc(ent)}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 bg-white">
            ${active.matrix
              .map(
                (row) => `
              <tr class="hover:bg-amber-50/40">
                <td class="p-3 font-extrabold text-amber-950 bg-amber-50/60">${esc(row.dimension)}</td>
                ${row.values.map((v) => `<td class="p-3 text-stone-800 leading-relaxed">${esc(v)}</td>`).join('')}
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="mt-4 p-3.5 rounded-xl bg-amber-100/80 border border-amber-400 text-xs font-bold text-amber-950">
        <i class="fas fa-key mr-1"></i>Memory Lock: ${esc(active.mnemonicLock)}
      </div>
    </div>

    <!-- Custom Interactive Any-2 Mechanism Side-by-Side Comparator -->
    <div class="notebook-card rounded-2xl p-6">
      <h3 class="font-editorial text-xl font-bold text-stone-900 mb-3">Interactive Custom Side-by-Side Comparator (Place Any Two Mechanisms Together)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select onchange="setCustomCompare('A', this.value)" class="p-2.5 rounded-xl border border-stone-300 bg-white text-sm font-bold">
          ${STATE.data.committees.map((c) => `<option value="${esc(c.id)}" ${c.id === compA.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
        </select>
        <select onchange="setCustomCompare('B', this.value)" class="p-2.5 rounded-xl border border-stone-300 bg-white text-sm font-bold">
          ${STATE.data.committees.map((c) => `<option value="${esc(c.id)}" ${c.id === compB.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
        </select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        ${[compA, compB]
          .map(
            (c) => `
          <div class="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
            <div class="font-editorial text-base font-bold text-amber-950">${esc(c.name)}</div>
            <div><strong>Chair / Authority:</strong> ${esc(c.chairman)}</div>
            <div><strong>Appointed:</strong> ${esc(c.appointmentDate)} | <strong>Submitted:</strong> ${esc(c.submissionDate)}</div>
            <div><strong>Mandate:</strong> ${esc(c.mandate)}</div>
            <div><strong>Outcome:</strong> ${esc(c.aftermath)}</div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

// 8. INTERACTIVE TELANGANA MOVEMENT MAP (3 Appropriately Dated Historical Boundaries + Clickable Event Pins)
function renderMapView() {
  const eras = STATE.data.historicalMaps;
  const activeEra = eras.find((e) => e.id === STATE.selectedMapEra) || eras[0];
  const allLocs = [];
  for (const d of STATE.data.curriculumDays) {
    for (const loc of d.locations) {
      allLocs.push({ ...loc, dayNumber: d.dayNumber, dayTitle: d.title });
    }
  }
  const activeLoc = allLocs[STATE.selectedLocationIdx] || allLocs[0];

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Historical Boundary &amp; Movement Geography Atlas</h2>
          <p class="text-sm text-stone-600">Strictly separates <strong>(1) 1948–56 Hyderabad State (16 Districts)</strong>, <strong>(2) 1956–2014 United AP Zones V &amp; VI</strong>, and <strong>(3) 2 June 2014 Telangana State (10 Founding Districts)</strong>.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${eras
            .map(
              (e) => `
            <button onclick="selectMapEra('${esc(e.id)}')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                activeEra.id === e.id ? 'bg-amber-900 text-white shadow' : 'bg-stone-200 text-stone-800'
              }">${esc(e.era)}</button>`
            )
            .join('')}
        </div>
      </div>

      <div class="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-950 mb-5">
        <i class="fas fa-compass mr-1"></i>Boundary Accuracy Note: ${esc(activeEra.boundaryWarning)}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Schematic Historical Boundary SVG Map -->
        <div class="lg:col-span-7 bg-amber-50/50 rounded-2xl p-4 border border-stone-300">
          <svg viewBox="0 0 560 440" class="w-full h-auto" aria-label="Historical Regional Schematic Map">
            <rect width="560" height="440" rx="16" fill="#fefce8"/>
            ${
              activeEra.id === 'MAP-1948'
                ? `
              <!-- Marathwada (West/NW) -->
              <polygon points="45,75 215,55 235,195 95,225 40,155" fill="#fde68a" stroke="#92400e" stroke-width="2.5"/>
              <text x="135" y="135" text-anchor="middle" font-size="12" font-weight="800" fill="#78350f">MARATHWADA</text>
              <text x="135" y="152" text-anchor="middle" font-size="10" fill="#78350f">(5 Marathi Districts)</text>
              <!-- Karnataka (SW) -->
              <polygon points="95,225 235,195 230,355 115,365 75,295" fill="#fed7aa" stroke="#9a3412" stroke-width="2.5"/>
              <text x="160" y="285" text-anchor="middle" font-size="11" font-weight="800" fill="#7c2d12">HYD-KARNATAKA</text>
              <text x="160" y="301" text-anchor="middle" font-size="10" fill="#7c2d12">(Gulbarga, Raichur, Bidar)</text>`
                : ''
            }
            ${
              activeEra.id === 'MAP-1956'
                ? `
              <!-- Seemandhra Zones I-IV Schematic -->
              <polygon points="245,315 495,235 535,385 215,415" fill="#bae6fd" stroke="#0369a1" stroke-width="2" stroke-dasharray="5 3"/>
              <text x="395" y="355" text-anchor="middle" font-size="11" font-weight="800" fill="#0c4a6e">COASTAL ANDHRA (ZONES I–III) &amp; RAYALASEEMA (ZONE IV)</text>`
                : ''
            }

            <!-- Core Telangana Polygon (Zone V North + Zone VI South) -->
            <polygon points="235,55 415,70 475,185 435,265 320,315 230,295 220,175" fill="${
              activeEra.id === 'MAP-1956' ? '#bbf7d0' : '#fecdd3'
            }" stroke="#881337" stroke-width="3"/>
            ${
              activeEra.id === 'MAP-1956'
                ? `<line x1="225" y1="185" x2="460" y2="195" stroke="#065f46" stroke-width="2.5" stroke-dasharray="6 3"/>
                   <text x="345" y="125" text-anchor="middle" font-size="12" font-weight="800" fill="#064e3b">ZONE V (Adilabad, KNR, WGL, KMM)</text>
                   <text x="335" y="245" text-anchor="middle" font-size="12" font-weight="800" fill="#064e3b">ZONE VI (HYD, RR, NZB, MDK, NLG, MBNR)</text>`
                : `<text x="340" y="155" text-anchor="middle" font-family="Fraunces, serif" font-size="15" font-weight="800" fill="#881337">TELANGANA REGION</text>
                   <text x="340" y="174" text-anchor="middle" font-size="10.5" font-weight="700" fill="#4c0519">${
                     activeEra.id === 'MAP-1948' ? '(8/9 Telugu Districts of Hyderabad State)' : '(10 Districts on Appointed Day: 2 June 2014)'
                   }</text>`
            }

            <!-- Interactive Historical Pin Markers -->
            ${[
              { lbl: 'Indervelli (1981)', x: 315, y: 78, idx: 12 },
              { lbl: 'Jagtial / KNR (78/01/09)', x: 345, y: 122, idx: 11 },
              { lbl: 'Warangal (1952 / Dec 97)', x: 392, y: 165, idx: 0 },
              { lbl: 'Khammam / KTPS (Jan 69)', x: 438, y: 215, idx: 6 },
              { lbl: 'Bhongir (Mar 1997)', x: 348, y: 205, idx: 14 },
              { lbl: 'HYDERABAD (OU / Tank Bund / City College)', x: 295, y: 218, idx: 1 }
            ]
              .map(
                (pt) => `
              <g class="cursor-pointer" onclick="selectMapPin(${pt.idx})">
                <circle cx="${pt.x}" cy="${pt.y}" r="7" fill="#9a3412" stroke="#fff" stroke-width="2"/>
                <text x="${pt.x}" y="${pt.y - 10}" text-anchor="middle" font-size="9.5" font-weight="800" fill="#1c1917">${pt.lbl}</text>
              </g>`
              )
              .join('')}
          </svg>
        </div>

        <!-- Right Era Breakdown & Location Cards -->
        <div class="lg:col-span-5 space-y-4">
          <div class="p-4 rounded-xl bg-white border border-stone-200">
            <h3 class="font-editorial text-lg font-bold text-stone-900 mb-2">${esc(activeEra.title)}</h3>
            <div class="space-y-3 text-xs">
              ${activeEra.regions
                .map(
                  (r) => `
                <div class="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <div class="font-extrabold text-amber-950">${esc(r.name)}</div>
                  <div class="text-stone-700 mt-1">${esc(r.districts.join(', '))}</div>
                  <div class="text-emerald-800 font-semibold mt-1">→ ${esc(r.fate1956)}</div>
                </div>`
                )
                .join('')}
            </div>
          </div>

          ${
            activeLoc
              ? `
            <div class="p-4 rounded-xl bg-amber-900 text-amber-50">
              <div class="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Selected Spatial Landmark (Day ${activeLoc.dayNumber})</div>
              <div class="font-editorial text-lg font-bold mt-0.5">${esc(activeLoc.place)} — ${esc(activeLoc.region)}</div>
              <p class="text-xs text-amber-100 mt-1 leading-relaxed">${esc(activeLoc.significance)}</p>
              <button onclick="openDayLesson(${activeLoc.dayNumber})" class="mt-2.5 px-3 py-1 rounded bg-amber-100 text-amber-950 text-xs font-bold">Open Day ${activeLoc.dayNumber} Lesson →</button>
            </div>`
              : ''
          }
        </div>
      </div>
    </div>
  </section>`;
}
// ===================== VIEWS 9 TO 16 + EVENT CONTROLLERS =====================

// 9. PYQ INTELLIGENCE CENTRE (Evidence-Based Analysis of 9 Official TSLPRB Papers)
function renderPyqView() {
  const analytics = STATE.data.pyqAnalytics;
  const verifiedList = STATE.data.questions.filter((q) => {
    if (q.origin !== 'VERIFIED_PYQ') return false;
    if (STATE.pyqFilterExam !== 'ALL' && !q.examName.includes(STATE.pyqFilterExam)) return false;
    if (STATE.pyqFilterYear !== 'ALL' && String(q.examYear) !== STATE.pyqFilterYear) return false;
    if (STATE.pyqFilterTopic !== 'ALL' && q.topicId !== STATE.pyqFilterTopic) return false;
    if (STATE.pyqFilterRepeat !== 'ALL' && q.repeatClass !== STATE.pyqFilterRepeat) return false;
    return true;
  });

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6 border-t-4 border-emerald-700">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">PYQ Intelligence &amp; Repetition Evidence Centre</h2>
          <p class="text-sm text-stone-600">Empirical audit of <strong>${analytics.summary.papersAnalyzed} actual TSLPRB papers (2016–2023)</strong>. Newly generated model questions are strictly excluded from PYQ statistics.</p>
        </div>
        <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-extrabold">${analytics.summary.verifiedPyqsCount} Official Key-Verified PYQs</span>
      </div>

      <!-- Date Restriction & Unresolved Abbreviation Compliance Notice -->
      <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-stone-800 space-y-1 mb-5">
        <div><strong><i class="fas fa-calendar-check text-amber-900 mr-1"></i>2026 Exam Cutoff Audit:</strong> ${esc(analytics.dateCutoffCompliance)}</div>
        <div><strong><i class="fas fa-search text-amber-900 mr-1"></i>Abbreviation Audit:</strong> ${esc(STATE.data.syllabusIntelligence.unresolvedAbbreviationNote)}</div>
      </div>

      <!-- 9 Official Papers Analyzed Grid -->
      <div class="mb-5">
        <div class="text-xs font-extrabold uppercase text-stone-600 mb-2">Actual Official Examination Papers Analyzed (${analytics.papersList.length})</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          ${analytics.papersList
            .map(
              (p) => `
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <div class="font-bold text-stone-900">${esc(p.title)}</div>
                <div class="text-[11px] text-stone-500">Held: ${esc(p.dateHeld)}</div>
              </div>
              <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">✓ Key Verified</span>
            </div>`
            )
            .join('')}
        </div>
      </div>

      <!-- Class A / B Repeat Clusters Proof -->
      <div class="mb-6">
        <div class="text-xs font-extrabold uppercase text-amber-950 mb-2">Verified Repetition &amp; High-Yield Concept Clusters</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          ${analytics.evidenceFindings
            .map(
              (f) => `
            <div class="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <div class="font-bold text-amber-950">${esc(f.cluster)}</div>
              <div class="text-[11px] font-extrabold text-rose-800 mt-0.5">${esc(f.classification)}</div>
              <div class="text-stone-700 mt-1">${esc(f.evidence)}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>

      <!-- Interactive Filters -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-xl bg-stone-100 mb-5 text-xs">
        <div>
          <label class="block font-bold text-stone-600 mb-1">Filter by Exam Stream</label>
          <select onchange="setPyqFilter('Exam', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.pyqFilterExam === 'ALL' ? 'selected' : ''}>All TSLPRB Papers</option>
            <option value="SI" ${STATE.pyqFilterExam === 'SI' ? 'selected' : ''}>Sub-Inspector (SI Prelims/Mains)</option>
            <option value="PC" ${STATE.pyqFilterExam === 'PC' ? 'selected' : ''}>Police Constable (PC Prelims/Mains)</option>
          </select>
        </div>
        <div>
          <label class="block font-bold text-stone-600 mb-1">Filter by Exam Year</label>
          <select onchange="setPyqFilter('Year', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.pyqFilterYear === 'ALL' ? 'selected' : ''}>All Years (2016–2023)</option>
            ${['2023', '2022', '2019', '2018', '2016'].map((yr) => `<option value="${yr}" ${STATE.pyqFilterYear === yr ? 'selected' : ''}>${yr}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block font-bold text-stone-600 mb-1">Filter by Day / Topic</label>
          <select onchange="setPyqFilter('Topic', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.pyqFilterTopic === 'ALL' ? 'selected' : ''}>All 10 Days</option>
            ${STATE.data.curriculumDays.map((d) => `<option value="${d.id}" ${STATE.pyqFilterTopic === d.id ? 'selected' : ''}>Day ${d.dayNumber}: ${esc(d.title.slice(0, 28))}…</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block font-bold text-stone-600 mb-1">Repetition Class</label>
          <select onchange="setPyqFilter('Repeat', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.pyqFilterRepeat === 'ALL' ? 'selected' : ''}>All Classifications</option>
            <option value="A_EXACT_REPEAT" ${STATE.pyqFilterRepeat === 'A_EXACT_REPEAT' ? 'selected' : ''}>Class A: Exact/Near-Exact Repeat</option>
            <option value="B_CONCEPT_REPEAT" ${STATE.pyqFilterRepeat === 'B_CONCEPT_REPEAT' ? 'selected' : ''}>Class B: Repeated Concept</option>
            <option value="SINGLE_APPEARANCE_PYQ" ${STATE.pyqFilterRepeat === 'SINGLE_APPEARANCE_PYQ' ? 'selected' : ''}>Single-Appearance PYQ</option>
          </select>
        </div>
      </div>

      <div class="text-xs font-bold text-stone-600 mb-3">Showing ${verifiedList.length} Verified PYQs:</div>
      ${verifiedList.map((q) => renderQuestionCard(q, 'pyq')).join('')}
    </div>
  </section>`;
}

// 10. PRACTICE QUESTION BANK (All Formats, Strictly Separating PYQs, Adapted Variations & Model Questions)
function renderPracticeView() {
  const list = STATE.data.questions.filter((q) => {
    if (STATE.practiceFilterOrigin !== 'ALL' && q.origin !== STATE.practiceFilterOrigin) return false;
    if (STATE.practiceFilterFormat !== 'ALL' && q.format !== STATE.practiceFilterFormat) return false;
    if (STATE.practiceFilterTopic !== 'ALL' && q.topicId !== STATE.practiceFilterTopic) return false;
    return true;
  });

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Topic-Linked Multi-Format Question Bank (${STATE.data.questions.length} Questions)</h2>
          <p class="text-sm text-stone-600">Supports Single-MCQ, Match-the-Following, Chronological Arrangement, Statement-Based, Assertion-Reason, Person-Committee &amp; Cause-Effect formats.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-stone-100 mb-5 text-xs">
        <div>
          <label class="block font-bold text-stone-600 mb-1">Question Provenance (Strict Separation)</label>
          <select onchange="setPracticeFilter('Origin', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.practiceFilterOrigin === 'ALL' ? 'selected' : ''}>All (${STATE.data.questions.length})</option>
            <option value="VERIFIED_PYQ" ${STATE.practiceFilterOrigin === 'VERIFIED_PYQ' ? 'selected' : ''}>Verified Previous Exam Questions Only</option>
            <option value="ADAPTED_PYQ" ${STATE.practiceFilterOrigin === 'ADAPTED_PYQ' ? 'selected' : ''}>Adapted PYQ Concept Variations</option>
            <option value="MODEL_PRACTICE" ${STATE.practiceFilterOrigin === 'MODEL_PRACTICE' ? 'selected' : ''}>Newly Generated Analytical Model Questions</option>
          </select>
        </div>
        <div>
          <label class="block font-bold text-stone-600 mb-1">Question Format</label>
          <select onchange="setPracticeFilter('Format', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.practiceFilterFormat === 'ALL' ? 'selected' : ''}>All Question Formats</option>
            <option value="SINGLE_MCQ" ${STATE.practiceFilterFormat === 'SINGLE_MCQ' ? 'selected' : ''}>Single-Correct MCQ</option>
            <option value="MATCH_FOLLOWING" ${STATE.practiceFilterFormat === 'MATCH_FOLLOWING' ? 'selected' : ''}>Match the Following</option>
            <option value="CHRONOLOGY" ${STATE.practiceFilterFormat === 'CHRONOLOGY' ? 'selected' : ''}>Chronological Arrangement</option>
            <option value="STATEMENT_BASED" ${STATE.practiceFilterFormat === 'STATEMENT_BASED' ? 'selected' : ''}>Multi-Statement / Wrong Pair</option>
            <option value="ASSERTION_REASON" ${STATE.practiceFilterFormat === 'ASSERTION_REASON' ? 'selected' : ''}>Assertion &amp; Reason</option>
            <option value="PERSON_COMMITTEE" ${STATE.practiceFilterFormat === 'PERSON_COMMITTEE' ? 'selected' : ''}>Person &amp; Committee Identification</option>
            <option value="CAUSE_EFFECT" ${STATE.practiceFilterFormat === 'CAUSE_EFFECT' ? 'selected' : ''}>Cause &amp; Effect</option>
          </select>
        </div>
        <div>
          <label class="block font-bold text-stone-600 mb-1">Day / Syllabus Unit</label>
          <select onchange="setPracticeFilter('Topic', this.value)" class="w-full p-2 rounded-lg border bg-white font-semibold">
            <option value="ALL" ${STATE.practiceFilterTopic === 'ALL' ? 'selected' : ''}>All 10 Days</option>
            ${STATE.data.curriculumDays.map((d) => `<option value="${d.id}" ${STATE.practiceFilterTopic === d.id ? 'selected' : ''}>Day ${d.dayNumber}: ${esc(d.title.slice(0, 30))}…</option>`).join('')}
          </select>
        </div>
      </div>

      ${list.map((q) => renderQuestionCard(q, 'practice')).join('')}
    </div>
  </section>`;
}

// 11. FULL-LENGTH EXAM SIMULATOR (Separate SI & Constable Streams + Configurable 2026 Negative Marking)
function renderSimulatorView() {
  if (STATE.simActive) {
    const mins = String(Math.floor(STATE.simSecondsLeft / 60)).padStart(2, '0');
    const secs = String(STATE.simSecondsLeft % 60).padStart(2, '0');
    const answeredCount = Object.keys(STATE.simAnswers).length;

    return `
    <section class="space-y-5">
      <div class="sticky top-0 z-20 notebook-card rounded-2xl p-4 bg-stone-900 text-amber-50 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div>
          <div class="text-xs font-extrabold text-amber-300 uppercase">${esc(STATE.simConfig.examType)} LIVE OMR SIMULATION</div>
          <div class="text-sm font-bold">Answered: ${answeredCount} / ${STATE.simQuestions.length} • Negative Marking: -${STATE.simConfig.negativeRate} per wrong</div>
        </div>
        <div class="flex items-center gap-3">
          <div class="px-4 py-1.5 rounded-xl bg-amber-800 font-mono text-lg font-extrabold"><i class="fas fa-clock mr-1.5"></i>${mins}:${secs}</div>
          <button onclick="finishExamSimulation()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold">
            Submit OMR Sheet
          </button>
        </div>
      </div>

      <div class="space-y-4">
        ${STATE.simQuestions
          .map((q, idx) => {
            const sel = STATE.simAnswers[q.id];
            return `
            <div class="notebook-card rounded-2xl p-5">
              <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span class="font-extrabold text-stone-800">Question ${idx + 1} of ${STATE.simQuestions.length}</span>
                <span>Day ${q.dayNumber} • ${esc(q.format)}</span>
              </div>
              <p class="text-sm font-semibold text-stone-900 whitespace-pre-line mb-3">${esc(q.stem)}</p>
              <div class="grid grid-cols-1 gap-2">
                ${q.options
                  .map(
                    (opt, oIdx) => `
                  <button onclick="selectSimAnswer('${esc(q.id)}', ${oIdx})" class="w-full text-left p-3 rounded-xl border text-xs md:text-sm font-medium flex items-center gap-3 ${
                      sel === oIdx ? 'bg-amber-900 text-white border-amber-900' : 'bg-white hover:bg-amber-50 border-stone-300 text-stone-800'
                    }">
                    <span class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0">${oIdx + 1}</span>
                    <span>${esc(opt)}</span>
                  </button>`
                  )
                  .join('')}
              </div>
              ${
                sel !== undefined
                  ? `<button onclick="clearSimBubble('${esc(q.id)}')" class="mt-2 text-[11px] text-stone-500 underline">Leave Unanswered (0 Marks, Avoid Negative Penalty)</button>`
                  : ''
              }
            </div>`;
          })
          .join('')}
      </div>
    </section>`;
  }

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6 border-t-4 border-amber-900">
      <h2 class="font-editorial text-2xl font-bold text-stone-900 mb-1">2026 TGPRB Realistic Exam Simulator (Separate SI &amp; Constable Streams)</h2>
      <p class="text-sm text-stone-600 mb-5">Matches official 29-07-2026 notifications: <strong>SI Prelims (-0.20 / 20%)</strong>, <strong>SI Mains FWE Paper IV (-0.25 / 25%)</strong>, and <strong>Constable Prelims (-0.20 / 20%, excluding SI-only technical syllabus assumptions)</strong>.</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button onclick="configureSimulator('SI_PWT', 25, 0.20, 25)" class="p-4 rounded-2xl border-2 text-left transition ${
          STATE.simConfig.examType === 'SI_PWT' ? 'border-amber-900 bg-amber-50' : 'border-stone-200 bg-white'
        }">
          <div class="text-xs font-extrabold text-rose-900">STREAM 1 • Rc No. 225/2026</div>
          <div class="font-editorial text-lg font-bold text-stone-900 mt-0.5">SCT SI Prelims (PWT) Mode</div>
          <div class="text-xs text-stone-600 mt-1">All 3 Explicit SI Phases • <strong>20% (0.20) Negative Marking</strong> • 25 Questions</div>
        </button>

        <button onclick="configureSimulator('SI_FWE', 30, 0.25, 30)" class="p-4 rounded-2xl border-2 text-left transition ${
          STATE.simConfig.examType === 'SI_FWE' ? 'border-amber-900 bg-amber-50' : 'border-stone-200 bg-white'
        }">
          <div class="text-xs font-extrabold text-indigo-900">STREAM 2 • Rc No. 225/2026</div>
          <div class="font-editorial text-lg font-bold text-stone-900 mt-0.5">SCT SI Mains (FWE Paper IV)</div>
          <div class="text-xs text-stone-600 mt-1">High-Analytical &amp; Chronology Depth • <strong>25% (0.25) Negative Marking</strong> • 30 Questions</div>
        </button>

        <button onclick="configureSimulator('PC_PWT', 25, 0.20, 25)" class="p-4 rounded-2xl border-2 text-left transition ${
          STATE.simConfig.examType === 'PC_PWT' ? 'border-amber-900 bg-amber-50' : 'border-stone-200 bg-white'
        }">
          <div class="text-xs font-extrabold text-sky-900">STREAM 3 • Rc No. 189/2026</div>
          <div class="font-editorial text-lg font-bold text-stone-900 mt-0.5">SCT Constable (PC PWT) Mode</div>
          <div class="text-xs text-stone-600 mt-1">"Contents Pertaining to Telangana" Filter • <strong>20% (0.20) Negative Marking</strong> • 25 Questions</div>
        </button>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-100">
        <div class="flex flex-wrap items-center gap-4 text-xs font-bold">
          <label>Custom Negative Penalty:
            <select onchange="STATE.simConfig.negativeRate=parseFloat(this.value);renderApp()" class="ml-1 p-1.5 rounded border bg-white">
              <option value="0.20" ${STATE.simConfig.negativeRate === 0.20 ? 'selected' : ''}>20% (-0.20 Official PWT)</option>
              <option value="0.25" ${STATE.simConfig.negativeRate === 0.25 ? 'selected' : ''}>25% (-0.25 Official SI FWE)</option>
              <option value="0" ${STATE.simConfig.negativeRate === 0 ? 'selected' : ''}>0% (No Negative Practice)</option>
            </select>
          </label>
          <label>Time Limit (Minutes):
            <input type="number" min="5" max="180" value="${STATE.simConfig.durationMinutes}"
              onchange="STATE.simConfig.durationMinutes=parseInt(this.value||25);renderApp()"
              class="ml-1 w-16 p-1.5 rounded border bg-white text-center" />
          </label>
        </div>
        <button onclick="startExamSimulation()" class="px-6 py-2.5 rounded-xl bg-amber-900 text-white text-sm font-extrabold shadow hover:bg-amber-800">
          <i class="fas fa-play-circle mr-1.5"></i>Start Timed ${esc(STATE.simConfig.examType)} Exam Now
        </button>
      </div>

      ${
        STATE.simResult
          ? `
        <div class="mt-6 p-6 rounded-2xl border-2 ${
          STATE.simResult.meets90Target ? 'bg-emerald-50 border-emerald-600' : 'bg-amber-50 border-amber-500'
        }">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 class="font-editorial text-xl font-extrabold text-stone-900">Latest Simulation Scorecard (${esc(STATE.simResult.examType)})</h3>
            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${
              STATE.simResult.meets90Target ? 'bg-emerald-700 text-white' : 'bg-amber-900 text-white'
            }">
              ${STATE.simResult.meets90Target ? '★ 90%+ TARGET BENCHMARK ACHIEVED!' : 'Keep Revising Weak Areas Toward 90% Target'}
            </span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
            <div class="p-3 bg-white rounded-xl border"><div class="text-stone-500">Net OMR Score</div><div class="text-lg font-extrabold text-stone-900">${STATE.simResult.rawScore} / ${STATE.simResult.maxScore}</div></div>
            <div class="p-3 bg-white rounded-xl border"><div class="text-stone-500">Attempted Accuracy</div><div class="text-lg font-extrabold text-emerald-800">${STATE.simResult.accuracyPct}%</div></div>
            <div class="p-3 bg-white rounded-xl border"><div class="text-stone-500">Correct</div><div class="text-lg font-extrabold text-emerald-700">${STATE.simResult.correct}</div></div>
            <div class="p-3 bg-white rounded-xl border"><div class="text-stone-500">Wrong (-${STATE.simResult.negativeRate})</div><div class="text-lg font-extrabold text-rose-700">${STATE.simResult.wrong}</div></div>
            <div class="p-3 bg-white rounded-xl border"><div class="text-stone-500">Unanswered</div><div class="text-lg font-extrabold text-stone-600">${STATE.simResult.unanswered}</div></div>
          </div>
        </div>`
          : ''
      }
    </div>
  </section>`;
}

// 12. FLASHCARDS, REVERSE RECALL & CHRONOLOGY RECONSTRUCTION LAB
function renderFlashcardsView() {
  const cards = STATE.data.flashcards.filter((c) => STATE.flashcardCategory === 'ALL' || c.category === STATE.flashcardCategory);
  const idx = Math.min(cards.length - 1, Math.max(0, STATE.flashcardIdx));
  const card = cards[idx] || STATE.data.flashcards[0];
  const ch = STATE.data.chronologyChallenges[STATE.chronoChallengeIdx] || STATE.data.chronologyChallenges[0];

  return `
  <section class="space-y-6">
    <!-- SM-2 Active Retrieval Flashcards + Reverse Recall + Person Challenge -->
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Active Recall Flashcards, Person Challenge &amp; Reverse Recall</h2>
          <p class="text-sm text-stone-600">Includes Date Locks, Person Identification, Committee Mandates, and <strong>Reverse Recall (Outcome → Historical Cause)</strong>.</p>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${[
            { k: 'ALL', l: 'All Cards (' + STATE.data.flashcards.length + ')' },
            { k: 'reverse_recall', l: 'Reverse Recall' },
            { k: 'person', l: 'Person Challenge' },
            { k: 'committee', l: 'Committee Challenge' },
            { k: 'date', l: 'Date Locks' }
          ]
            .map(
              (f) => `
            <button onclick="setFlashcardCat('${f.k}')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
                STATE.flashcardCategory === f.k ? 'bg-amber-900 text-white' : 'bg-stone-200 text-stone-700'
              }">${f.l}</button>`
            )
            .join('')}
        </div>
      </div>

      <div class="max-w-2xl mx-auto">
        <div onclick="flipFlashcard()" class="cursor-pointer min-h-[230px] p-6 md:p-8 rounded-2xl border-2 ${
          STATE.flashcardFlipped ? 'bg-emerald-50 border-emerald-600' : 'bg-amber-50/80 border-amber-800/40'
        } flex flex-col justify-between shadow-md transition">
          <div class="flex items-center justify-between text-xs font-bold text-stone-500">
            <span class="uppercase text-amber-900">${esc(card.category.replace('_', ' '))} • Day ${card.dayNumber}</span>
            <span>Card ${idx + 1} of ${cards.length} (Click Card to Flip)</span>
          </div>
          <div class="my-4">
            ${
              !STATE.flashcardFlipped
                ? `<p class="font-editorial text-lg md:text-xl font-bold text-stone-900 leading-relaxed">${esc(card.frontPrompt)}</p>`
                : `<div>
                     <div class="text-xs font-extrabold uppercase text-emerald-800 mb-1">Verified Answer:</div>
                     <p class="text-sm md:text-base font-bold text-stone-900 leading-relaxed mb-3">${esc(card.backAnswer)}</p>
                     <div class="p-2.5 rounded-lg bg-white border border-emerald-300 text-xs font-semibold text-amber-950">Memory Hook: ${esc(card.memoryHook)}</div>
                   </div>`
            }
          </div>
          <div class="text-xs text-center text-stone-500">${STATE.flashcardFlipped ? 'Rate your recall below to schedule SM-2 review:' : 'Think of the answer first — then click to reveal!'}</div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 mt-4">
          <button onclick="stepFlashcard(-1)" class="px-4 py-2 rounded-xl bg-stone-200 text-xs font-bold">← Previous</button>
          <div class="flex gap-2">
            <button onclick="rateFlashcard('${esc(card.id)}', 1)" class="px-3 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">1 • Forgot (Repeat Today)</button>
            <button onclick="rateFlashcard('${esc(card.id)}', 2)" class="px-3 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold">2 • Hard (+1d)</button>
            <button onclick="rateFlashcard('${esc(card.id)}', 3)" class="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">3 • Good (+3d)</button>
            <button onclick="rateFlashcard('${esc(card.id)}', 4)" class="px-3 py-2 rounded-xl bg-indigo-700 text-white text-xs font-bold">4 • Easy (+7d)</button>
          </div>
          <button onclick="stepFlashcard(1)" class="px-4 py-2 rounded-xl bg-stone-200 text-xs font-bold">Next →</button>
        </div>
      </div>
    </div>

    <!-- Chronology Reconstruction Lab (Dates Hidden Until Checked!) -->
    <div class="notebook-card rounded-2xl p-6 border-t-4 border-indigo-800">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 class="font-editorial text-xl font-bold text-stone-900">Chronology Reconstruction Challenge (Dates Hidden!)</h3>
          <p class="text-xs text-stone-600">Move events ↑ or ↓ into strict earliest-to-latest historical order without seeing the dates, then verify.</p>
        </div>
        <div class="flex gap-2">
          ${STATE.data.chronologyChallenges
            .map(
              (c, cIdx) => `
            <button onclick="initChronoOrder(${cIdx});renderApp()" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
                STATE.chronoChallengeIdx === cIdx ? 'bg-indigo-900 text-white' : 'bg-stone-200 text-stone-700'
              }">${esc(c.phase)}</button>`
            )
            .join('')}
        </div>
      </div>

      <div class="space-y-2 mb-4">
        ${STATE.chronoUserOrder
          .map((item, pos) => {
            const isRightPos = item.orderRank === pos + 1;
            return `
            <div class="p-3 rounded-xl border flex items-center justify-between gap-3 text-xs md:text-sm ${
              STATE.chronoChecked
                ? isRightPos
                  ? 'bg-emerald-50 border-emerald-500'
                  : 'bg-rose-50 border-rose-400'
                : 'bg-white border-stone-300'
            }">
              <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-stone-800 text-white font-bold flex items-center justify-center text-xs">#${pos + 1}</span>
                <div>
                  <span class="font-semibold text-stone-900">${esc(item.label)}</span>
                  ${
                    STATE.chronoChecked
                      ? `<span class="ml-2 px-2 py-0.5 rounded text-xs font-bold ${
                          isRightPos ? 'bg-emerald-200 text-emerald-950' : 'bg-rose-200 text-rose-950'
                        }">Actual #${item.orderRank}: ${esc(item.exactDate)}</span>`
                      : ''
                  }
                </div>
              </div>
              <div class="flex gap-1 shrink-0">
                <button onclick="moveChronoItem(${pos}, -1)" ${pos === 0 ? 'disabled' : ''} class="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 font-bold disabled:opacity-40">↑</button>
                <button onclick="moveChronoItem(${pos}, 1)" ${pos === STATE.chronoUserOrder.length - 1 ? 'disabled' : ''} class="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 font-bold disabled:opacity-40">↓</button>
              </div>
            </div>`;
          })
          .join('')}
      </div>

      <div class="flex gap-3">
        <button onclick="STATE.chronoChecked=true;renderApp()" class="px-5 py-2 rounded-xl bg-indigo-900 text-white text-xs font-extrabold">Check My Chronological Order</button>
        <button onclick="solveChronoOrder()" class="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold">Snap to Verified Chronology</button>
      </div>
    </div>
  </section>`;
}

// 13. WEAK MEMORY REVISION CENTRE
function renderWeakMemoryView() {
  const flags = STATE.data.learnerState?.confusionFlags || [];
  const activeFlags = flags.filter((f) => !f.resolved);
  const dueTopics = STATE.data.curriculumDays.filter((d) => {
    const p = getTopicProgress(d.id);
    return !p.studied || Number(p.mastery_score || 0) < 85 || Number(p.high_conf_wrong || 0) > 0;
  });

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6 border-l-8 border-rose-700">
      <h2 class="font-editorial text-2xl font-bold text-stone-900 mb-1">Weak-Memory Detector &amp; Targeted Revision Mode</h2>
      <p class="text-sm text-stone-600 mb-5">Automatically isolates (1) Confused Committees/Personalities/Formulas triggered by wrong answers, (2) High-Confidence Mistakes, and (3) Topics below the 90% Mastery threshold.</p>

      <h3 class="font-editorial text-lg font-bold text-rose-950 mb-3">1. Auto-Triggered Confusion Sessions (${activeFlags.length} Active)</h3>
      ${
        activeFlags.length === 0
          ? `<div class="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 mb-6">
               ✓ Zero unresolved confusion traps right now! Whenever you miss a question linked to two easily confused committees, formulas, or dates, an automatic comparison drill appears here.
             </div>`
          : `<div class="space-y-4 mb-6">
              ${activeFlags
                .map((fl) => {
                  const cp = STATE.data.confusionPairs.find((x) => x.id === fl.pair_id);
                  if (!cp) return '';
                  return `
                  <div class="p-4 rounded-2xl bg-rose-50/70 border border-rose-300">
                    <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span class="text-sm font-extrabold text-rose-950"><i class="fas fa-bolt mr-1"></i>${esc(cp.title)} (Triggered ${fl.trigger_count}x)</span>
                      <div class="flex gap-2">
                        <button onclick="openConfusionPair('${esc(cp.id)}')" class="px-3 py-1 rounded-lg bg-amber-900 text-white text-xs font-bold">Study Comparison Table</button>
                        <button onclick="resolveWeakFlag('${esc(cp.id)}')" class="px-3 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold">Mark Mastered</button>
                      </div>
                    </div>
                    <p class="text-xs text-stone-800">${esc(cp.mnemonicLock)}</p>
                  </div>`;
                })
                .join('')}
            </div>`
      }

      <h3 class="font-editorial text-lg font-bold text-amber-950 mb-3">2. Spaced-Repetition Due Queue (${dueTopics.length} Days Below 85% Mastery)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${dueTopics
          .map((d) => {
            const p = getTopicProgress(d.id);
            return `
            <div class="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <div class="text-xs font-extrabold text-amber-900">DAY ${d.dayNumber} • Mastery: ${p.mastery_score}%</div>
                <div class="text-sm font-bold text-stone-900">${esc(d.title)}</div>
                ${
                  p.high_conf_wrong > 0
                    ? `<div class="text-[11px] font-bold text-rose-700 mt-0.5">⚠ ${p.high_conf_wrong} High-Confidence Error(s) — Priority Calibration Needed!</div>`
                    : ''
                }
              </div>
              <button onclick="openDayLesson(${d.dayNumber})" class="px-3 py-1.5 rounded-lg bg-amber-900 text-white text-xs font-bold shrink-0">Revise Now</button>
            </div>`;
          })
          .join('')}
      </div>
    </div>
  </section>`;
}

// 14. PROGRESS & MASTERY ANALYTICS
function renderAnalyticsView() {
  const stats = getOverallMasteryStats();
  const sessions = STATE.data.learnerState?.examSessions || [];

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Transparent Mastery &amp; Calibration Analytics</h2>
          <p class="text-sm text-stone-600">Formula requires <strong>≥ 5 retrievals per topic + Spaced-Repetition steps − Overconfidence Penalty</strong>. One lucky quiz cannot fake ≥ 90% mastery.</p>
        </div>
        <div class="px-4 py-2 rounded-xl bg-amber-950 text-amber-50 text-sm font-bold">
          Global Calibrated Mastery: <span class="text-amber-300">${stats.avgMastery}%</span> / 90% Target
        </div>
      </div>

      <!-- Day-by-Day Mastery Bars -->
      <div class="space-y-3 mb-6">
        ${STATE.data.curriculumDays
          .map((d) => {
            const p = getTopicProgress(d.id);
            const acc = p.attempts > 0 ? Math.round((p.correct_count / p.attempts) * 100) : 0;
            return `
            <div class="p-3.5 rounded-xl bg-white border border-stone-200">
              <div class="flex flex-wrap items-center justify-between text-xs mb-1.5">
                <span class="font-bold text-stone-900">Day ${d.dayNumber}: ${esc(d.title)}</span>
                <span class="font-semibold text-stone-600">Attempts: ${p.attempts} (${acc}% Acc) • SR Interval: +${p.interval_days || 0}d • <strong class="${
              p.mastery_score >= 90 ? 'text-emerald-700' : 'text-amber-900'
            }">Mastery: ${p.mastery_score}%</strong></span>
              </div>
              <div class="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                <div class="${p.mastery_score >= 90 ? 'bg-emerald-600' : 'bg-amber-700'} h-full transition-all" style="width:${Math.min(100, p.mastery_score)}%"></div>
              </div>
            </div>`;
          })
          .join('')}
      </div>

      <!-- Exam Simulation History -->
      <h3 class="font-editorial text-lg font-bold text-stone-900 mb-2">Recorded Mock Exam Sessions (${sessions.length})</h3>
      ${
        sessions.length === 0
          ? `<p class="text-xs text-stone-500">No full mock tests submitted yet — visit the <strong>Full Exam Simulator</strong> tab to record a timed SI or Constable mock session.</p>`
          : `<div class="overflow-x-auto rounded-xl border border-stone-200">
              <table class="w-full text-left text-xs">
                <thead class="bg-stone-100 font-bold"><tr><th class="p-2.5">Exam Stream</th><th class="p-2.5">Attempted</th><th class="p-2.5">Correct / Wrong</th><th class="p-2.5">Net OMR Score</th><th class="p-2.5">Accuracy</th><th class="p-2.5">Completed</th></tr></thead>
                <tbody class="divide-y bg-white">
                  ${sessions
                    .map(
                      (s) => `
                    <tr>
                      <td class="p-2.5 font-bold">${esc(s.exam_type)}</td>
                      <td class="p-2.5">${s.attempted} / ${s.total_questions}</td>
                      <td class="p-2.5 text-emerald-700 font-semibold">${s.correct} ✓ / <span class="text-rose-700">${s.wrong} ✗</span></td>
                      <td class="p-2.5 font-extrabold">${s.raw_score} / ${s.max_score}</td>
                      <td class="p-2.5 font-bold ${s.accuracy_pct >= 90 ? 'text-emerald-700' : 'text-amber-800'}">${s.accuracy_pct}%</td>
                      <td class="p-2.5 text-stone-500">${esc(s.completed_at)}</td>
                    </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>`
      }
    </div>
  </section>`;
}

// 15. SOURCES, FACT VERIFICATION & DISCREPANCY AUDIT LIBRARY
function renderSourcesView() {
  const q = STATE.sourceSearch.trim().toLowerCase();
  const sources = STATE.data.sourcesLibrary.filter(
    (s) =>
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.historicalPeriod.toLowerCase().includes(q) ||
      s.verificationNotes.toLowerCase().includes(q)
  );

  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Global Source Reference Library &amp; Fact-Checking Audit</h2>
          <p class="text-sm text-stone-600">Strict 3-Tier Hierarchy: <strong>Level 1 (Primary Official Acts/Reports/Gazettes/Notifications)</strong> → <strong>Level 2 (Academic/State Monographs)</strong> → <strong>Level 3 (PYQ Discovery Compilations)</strong>.</p>
        </div>
        <input type="search" value="${esc(STATE.sourceSearch)}" oninput="STATE.sourceSearch=this.value;renderApp()"
          placeholder="Search source title, date, Act, G.O.…"
          class="px-4 py-2 rounded-xl border border-stone-300 bg-white text-sm w-full md:w-72" />
      </div>

      <div class="space-y-3 mb-6">
        ${sources
          .map(
            (s) => `
          <div class="p-4 rounded-xl bg-white border border-stone-200">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded text-[11px] font-extrabold ${
                s.level === 1
                  ? 'bg-emerald-100 text-emerald-950'
                  : s.level === 2
                  ? 'bg-indigo-100 text-indigo-950'
                  : 'bg-amber-100 text-amber-950'
              }">${esc(s.id)} • ${esc(s.levelLabel)}</span>
              <span class="text-xs text-stone-500">Issued: <strong>${esc(s.issueDate)}</strong> • Verified: ${esc(s.verifiedOn)}</span>
            </div>
            <h4 class="font-editorial text-base font-bold text-stone-900">${esc(s.title)}</h4>
            <div class="text-xs text-stone-600 mt-0.5"><strong>Authority:</strong> ${esc(s.authority)} | <strong>Section/Page:</strong> ${esc(s.sectionOrPage)}</div>
            <p class="text-xs text-stone-700 mt-1.5">${esc(s.verificationNotes)}</p>
            <a href="${esc(s.url)}" target="_blank" rel="noopener" class="inline-block mt-1.5 text-xs font-bold text-amber-900 underline hover:text-amber-700">
              <i class="fas fa-external-link-alt mr-1"></i>${esc(s.url)}
            </a>
          </div>`
          )
          .join('')}
      </div>

      <!-- Historical Discrepancy Resolution Protocol -->
      <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-300">
        <h3 class="font-editorial text-xl font-bold text-amber-950 mb-2">Source Contradiction &amp; Discrepancy Audit Log</h3>
        <p class="text-xs text-stone-700 mb-4">Where secondary textbooks cite slightly differing dates, primary gazettes and TSLPRB keys are transparently compared below:</p>
        <div class="space-y-3">
          ${STATE.data.historicalDiscrepancies
            .map(
              (d) => `
            <div class="p-4 rounded-xl bg-white border border-amber-200 text-xs space-y-1">
              <div class="font-extrabold text-sm text-stone-900">${esc(d.id)}: ${esc(d.topic)}</div>
              <div><strong>Claim A:</strong> ${esc(d.claimA)}</div>
              <div><strong>Claim B:</strong> ${esc(d.claimB)}</div>
              <div><strong>Primary Evidence:</strong> ${esc(d.primaryEvidence)}</div>
              <div class="text-emerald-900 font-semibold"><strong>Best-Supported Conclusion:</strong> ${esc(d.bestSupportedConclusion)}</div>
              <div class="p-2 rounded bg-amber-100/70 text-amber-950 font-bold">MCQ Exam Guidance: ${esc(d.examGuidance)}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </section>`;
}

// 16. DOWNLOAD & EXPORT CENTRE (8 Publication PDFs + 8 Editable DOCX Books)
function renderExportsView() {
  const docs = STATE.data.exportsCatalog;
  return `
  <section class="space-y-6">
    <div class="notebook-card rounded-2xl p-6 border-t-4 border-emerald-800">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="font-editorial text-2xl font-bold text-stone-900">Publication-Grade PDF &amp; Editable DOCX Export Centre</h2>
          <p class="text-sm text-stone-600">All <strong>8 study books (A–H)</strong> are generated programmatically from the exact same verified knowledge base — formatted with title pages, tables of contents, timelines, comparison tables, and source references.</p>
        </div>
        <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold">16 Verified Files Ready</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${docs
          .map(
            (doc) => `
          <div class="p-5 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 text-xs font-extrabold">VOLUME ${esc(doc.code)}</span>
                <span class="text-xs font-semibold text-stone-500">${esc(doc.pagesApprox)}</span>
              </div>
              <h3 class="font-editorial text-lg font-bold text-stone-900">${esc(doc.title)}</h3>
              <p class="text-xs text-stone-600 mt-1 mb-4 leading-relaxed">${esc(doc.subtitle)}</p>
            </div>
            <div class="flex flex-wrap gap-2 pt-3 border-t border-stone-100">
              <a href="/exports/${esc(doc.slug)}.pdf" download class="flex-1 text-center px-3.5 py-2 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-extrabold transition">
                <i class="fas fa-file-pdf mr-1.5"></i>Download Print PDF
              </a>
              <a href="/exports/${esc(doc.slug)}.docx" download class="flex-1 text-center px-3.5 py-2 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-extrabold transition">
                <i class="fas fa-file-word mr-1.5"></i>Download Editable DOCX
              </a>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

// ===================== MASTER SHELL & INTERACTION HANDLERS =====================
function renderMainContent() {
  switch (STATE.activeTab) {
    case 'dashboard': return renderDashboardView();
    case 'journey': return renderJourneyView();
    case 'timeline': return renderTimelineView();
    case 'lesson': return renderLessonView();
    case 'personalities': return renderPersonalitiesView();
    case 'committees': return renderCommitteesView();
    case 'compare': return renderCompareView();
    case 'map': return renderMapView();
    case 'pyq': return renderPyqView();
    case 'practice': return renderPracticeView();
    case 'simulator': return renderSimulatorView();
    case 'flashcards': return renderFlashcardsView();
    case 'weakmemory': return renderWeakMemoryView();
    case 'analytics': return renderAnalyticsView();
    case 'sources': return renderSourcesView();
    case 'exports': return renderExportsView();
    default: return renderDashboardView();
  }
}

function renderApp() {
  if (!STATE.data) return;
  const stats = getOverallMasteryStats();
  const learnerName = STATE.data.learnerState?.learner?.display_name || 'Telangana Police Aspirant';

  document.getElementById('app-root').innerHTML = `
    <!-- Top Header Bar -->
    <header class="sticky top-0 z-30 bg-[#26160c] text-amber-50 border-b border-amber-900/60 shadow-md">
      <div class="max-w-[1480px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3 cursor-pointer" onclick="switchTab('dashboard')">
          <div class="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-editorial font-extrabold text-lg shadow">TG</div>
          <div>
            <div class="font-editorial text-sm md:text-base font-bold leading-tight">Telangana Movement Learning Intelligence System</div>
            <div class="text-[11px] text-amber-300/90">1948 – 2 June 2014 • Official 2026 TGPRB SI &amp; Constable Tutor</div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 text-xs">
          <div class="px-3 py-1 rounded-lg bg-amber-950/90 border border-amber-700/60">
            Mastery: <strong class="${stats.avgMastery >= 90 ? 'text-emerald-400' : 'text-amber-300'}">${stats.avgMastery}%</strong>
            <span class="text-amber-400/60 mx-1">|</span>
            Acc: <strong>${stats.globalAcc}%</strong>
          </div>
          <button onclick="promptLearnerSwitch()" class="px-3 py-1 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold">
            <i class="fas fa-user-graduate mr-1"></i>${esc(learnerName)}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Workspace Layout -->
    <div class="max-w-[1480px] w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 px-3 md:px-5 py-5">
      <!-- Left Navigation Sidebar (16 Modules) -->
      <aside class="lg:col-span-3 xl:col-span-3">
        <nav aria-label="Learning Modules" class="notebook-card rounded-2xl p-3 lg:sticky lg:top-16 space-y-1">
          <div class="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-500">16 Intelligence Modules</div>
          ${NAV_SECTIONS.map(
            (item) => `
            <button onclick="switchTab('${item.id}')" id="nav-${item.id}"
              class="w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                STATE.activeTab === item.id ? 'nav-item-active' : 'text-stone-700 hover:bg-amber-100/60'
              }">
              <span class="flex items-center gap-2.5 truncate">
                <i class="fas ${item.icon} w-4 text-center opacity-85"></i>
                <span class="truncate">${item.num}. ${esc(item.label)}</span>
              </span>
              ${
                item.id === 'weakmemory' && stats.unresolvedConfusions > 0
                  ? `<span class="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px]">${stats.unresolvedConfusions}</span>`
                  : ''
              }
            </button>`
          ).join('')}
        </nav>
      </aside>

      <!-- Active Module Canvas -->
      <main id="module-canvas" class="lg:col-span-9 xl:col-span-9 min-w-0">
        ${renderMainContent()}
      </main>
    </div>
  `;
}

// Global Action Handlers
window.switchTab = function (tabId) {
  STATE.activeTab = tabId;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openDayLesson = function (dayNum) {
  STATE.selectedDay = dayNum;
  STATE.activeTab = 'lesson';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openDayPractice = function (dayNum) {
  STATE.practiceFilterTopic = 'T' + dayNum;
  STATE.practiceFilterOrigin = 'ALL';
  STATE.practiceFilterFormat = 'ALL';
  STATE.activeTab = 'practice';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleVisualMode = function () {
  STATE.visualLearningOnly = !STATE.visualLearningOnly;
  renderApp();
};

window.setExamLens = async function (lens) {
  STATE.examLens = lens;
  renderApp();
  await apiPost('/learner/profile', {
    displayName: STATE.data.learnerState?.learner?.display_name || 'Telangana Police Aspirant',
    targetExam: lens,
    currentDay: STATE.selectedDay
  });
};

window.setTimelineFilter = function (f) {
  STATE.timelinePhaseFilter = f;
  renderApp();
};

window.setConfidence = function (lvl) {
  STATE.activeConfidence = lvl;
  renderApp();
};

window.revealRecallPrompt = function (id) {
  STATE.revealedRecall[id] = true;
  renderApp();
};

window.markDayCompleted = async function (topicId, dayNumber) {
  const res = await apiPost('/progress/study', { topicId, dayNumber, addSeconds: 300, markStudied: true });
  if (res.ok && res.topicProgress) {
    const list = STATE.data.learnerState.topicProgress;
    const idx = list.findIndex((x) => x.topic_id === topicId);
    if (idx >= 0) list[idx] = res.topicProgress;
    else list.push(res.topicProgress);
  }
  renderApp();
};

window.submitSingleQuestion = async function (questionId, selectedOption, mode) {
  const res = await apiPost('/attempts/record', {
    questionId,
    selectedOption,
    confidence: STATE.activeConfidence,
    timeTakenMs: 9000,
    mode
  });
  if (res.ok) {
    STATE.answeredQuestions[questionId] = {
      selected: selectedOption,
      isCorrect: res.isCorrect,
      isHighConfWrong: res.isHighConfWrong,
      explanation: res.explanation,
      whyOthersWrong: res.whyOthersWrong,
      triggeredConfusionPair: res.triggeredConfusionPair
    };
    const b = await fetch('/api/bootstrap?learnerId=' + encodeURIComponent(STATE.learnerId)).then((r) => r.json());
    STATE.data.learnerState = b.learnerState;
    renderApp();
  }
};

window.inspectPerson = function (personId) {
  STATE.selectedPersonId = personId;
  STATE.personSearch = '';
  STATE.activeTab = 'personalities';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.selectPerson = function (personId) {
  STATE.selectedPersonId = personId;
  renderApp();
};

window.updatePersonSearch = function (val) {
  STATE.personSearch = val;
  renderApp();
};

window.inspectCommittee = function (commId) {
  STATE.selectedCommitteeId = commId;
  STATE.committeeSearch = '';
  STATE.activeTab = 'committees';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.selectCommittee = function (commId) {
  STATE.selectedCommitteeId = commId;
  renderApp();
};

window.updateCommitteeSearch = function (val) {
  STATE.committeeSearch = val;
  renderApp();
};

window.openConfusionPair = function (pairId) {
  STATE.selectedCompareId = pairId;
  STATE.activeTab = 'compare';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.selectComparePair = function (pairId) {
  STATE.selectedCompareId = pairId;
  renderApp();
};

window.setCustomCompare = function (slot, val) {
  if (slot === 'A') STATE.customCompareA = val;
  else STATE.customCompareB = val;
  renderApp();
};

window.selectMapEra = function (eraId) {
  STATE.selectedMapEra = eraId;
  renderApp();
};

window.selectMapPin = function (idx) {
  STATE.selectedLocationIdx = idx;
  renderApp();
};

window.setPyqFilter = function (kind, val) {
  STATE['pyqFilter' + kind] = val;
  renderApp();
};

window.setPracticeFilter = function (kind, val) {
  STATE['practiceFilter' + kind] = val;
  renderApp();
};

window.setFlashcardCat = function (cat) {
  STATE.flashcardCategory = cat;
  STATE.flashcardIdx = 0;
  STATE.flashcardFlipped = false;
  renderApp();
};

window.flipFlashcard = function () {
  STATE.flashcardFlipped = !STATE.flashcardFlipped;
  renderApp();
};

window.stepFlashcard = function (delta) {
  const cards = STATE.data.flashcards.filter((c) => STATE.flashcardCategory === 'ALL' || c.category === STATE.flashcardCategory);
  STATE.flashcardIdx = (STATE.flashcardIdx + delta + cards.length) % cards.length;
  STATE.flashcardFlipped = false;
  renderApp();
};

window.rateFlashcard = async function (cardId, rating) {
  await apiPost('/flashcards/review', { cardId, rating });
  window.stepFlashcard(1);
};

window.moveChronoItem = function (pos, delta) {
  const target = pos + delta;
  if (target < 0 || target >= STATE.chronoUserOrder.length) return;
  const arr = [...STATE.chronoUserOrder];
  [arr[pos], arr[target]] = [arr[target], arr[pos]];
  STATE.chronoUserOrder = arr;
  STATE.chronoChecked = false;
  renderApp();
};

window.solveChronoOrder = function () {
  STATE.chronoUserOrder = [...STATE.chronoUserOrder].sort((a, b) => a.orderRank - b.orderRank);
  STATE.chronoChecked = true;
  renderApp();
};

window.resolveWeakFlag = async function (pairId) {
  await apiPost('/weak-memory/resolve', { pairId });
  const b = await fetch('/api/bootstrap?learnerId=' + encodeURIComponent(STATE.learnerId)).then((r) => r.json());
  STATE.data.learnerState = b.learnerState;
  renderApp();
};

window.configureSimulator = function (examType, count, negRate, mins) {
  STATE.simConfig = { examType, questionCount: count, negativeRate: negRate, durationMinutes: mins };
  renderApp();
};

window.startExamSimulation = function () {
  const isPc = STATE.simConfig.examType.startsWith('PC');
  const pool = STATE.data.questions.filter((q) => (isPc ? q.examSuitability !== 'SI_ONLY' : q.examSuitability !== 'PC_ONLY'));
  const selected = pool.slice(0, Math.min(pool.length, STATE.simConfig.questionCount));
  STATE.simQuestions = selected;
  STATE.simAnswers = {};
  STATE.simSecondsLeft = STATE.simConfig.durationMinutes * 60;
  STATE.simActive = true;
  STATE.simResult = null;
  if (STATE.simTimerId) clearInterval(STATE.simTimerId);
  STATE.simTimerId = setInterval(() => {
    STATE.simSecondsLeft -= 1;
    if (STATE.simSecondsLeft <= 0) {
      window.finishExamSimulation();
    } else {
      renderApp();
    }
  }, 1000);
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.selectSimAnswer = function (qId, optIdx) {
  STATE.simAnswers[qId] = optIdx;
  renderApp();
};

window.clearSimBubble = function (qId) {
  delete STATE.simAnswers[qId];
  renderApp();
};

window.finishExamSimulation = async function () {
  if (STATE.simTimerId) clearInterval(STATE.simTimerId);
  STATE.simActive = false;
  const elapsed = STATE.simConfig.durationMinutes * 60 - Math.max(0, STATE.simSecondsLeft);
  const responses = STATE.simQuestions.map((q) => ({
    questionId: q.id,
    selectedOption: STATE.simAnswers[q.id] !== undefined ? STATE.simAnswers[q.id] : null
  }));
  const res = await apiPost('/exams/submit', {
    examType: STATE.simConfig.examType,
    negativeRate: STATE.simConfig.negativeRate,
    durationSeconds: elapsed,
    responses
  });
  if (res.ok) {
    STATE.simResult = res.result;
    const b = await fetch('/api/bootstrap?learnerId=' + encodeURIComponent(STATE.learnerId)).then((r) => r.json());
    STATE.data.learnerState = b.learnerState;
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.promptLearnerSwitch = async function () {
  const newName = prompt('Enter Learner Display Name (or Profile ID to switch/create persistent profile):', STATE.data.learnerState?.learner?.display_name || 'Telangana Police Aspirant');
  if (!newName) return;
  const slug = newName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 28) || 'aspirant-default';
  STATE.learnerId = slug;
  localStorage.setItem('tg_learner_id', slug);
  await apiPost('/learner/profile', { learnerId: slug, displayName: newName.trim(), targetExam: STATE.examLens, currentDay: STATE.selectedDay });
  await loadBootstrap();
};

// Boot Application
loadBootstrap();
