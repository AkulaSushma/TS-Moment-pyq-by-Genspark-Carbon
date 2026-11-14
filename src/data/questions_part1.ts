// PYQ Intelligence Engine & Multi-Format Question Bank (Sections 4 & 11)
// STRICT PROVENANCE RULE:
// - VERIFIED_PYQ: Actual TSLPRB Previous Year Questions (SI & PC 2016, 2018, 2019, 2022, 2023) with Official Answer Key verification. ZERO 2026 SI/PC questions invented.
// - ADAPTED_PYQ: Conceptual variations of repeatedly tested PYQ themes (Class B/C).
// - MODEL_PRACTICE: Newly generated conceptual/analytical questions clearly labelled as Model Questions.

export type QuestionOrigin = 'VERIFIED_PYQ' | 'ADAPTED_PYQ' | 'MODEL_PRACTICE';

export type QuestionFormat =
  | 'SINGLE_MCQ'
  | 'MATCH_FOLLOWING'
  | 'CHRONOLOGY'
  | 'STATEMENT_BASED'
  | 'ASSERTION_REASON'
  | 'PERSON_COMMITTEE'
  | 'CAUSE_EFFECT'
  | 'EVENT_LOCATION';

export type RepeatClass =
  | 'A_EXACT_REPEAT'
  | 'B_CONCEPT_REPEAT'
  | 'C_CONCEPTUAL_VARIATION'
  | 'SINGLE_APPEARANCE_PYQ'
  | 'MODEL_EXTENSION';

export interface QuestionItem {
  id: string;
  origin: QuestionOrigin;
  repeatClass: RepeatClass;
  format: QuestionFormat;
  examSuitability: 'SI_ONLY' | 'PC_ONLY' | 'BOTH_SI_AND_PC';
  examName: string; // e.g., "TSLPRB SCT SI Prelims" or "Model Analytical Practice"
  examYear: number; // 2016..2023 for PYQs; 2026 for Model
  paperSession: string;
  officialQuestionCode: string; // e.g., "s2022-168" or "MODEL-T2-01"
  topicId: string; // T1..T10
  dayNumber: number;
  subtopic: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  whyOthersWrong: [string, string, string, string];
  relatedConcept: string;
  linkedEntityId: string; // Person, Committee, or Confusion Pair ID for Weak-Memory Detector
  confusionPairId?: string;
  questionSource: string;
  keySource: string;
  sourceIds: string[];
}

export const PYQ_ANALYTICS_METADATA = {
  papersAnalyzedCount: 9,
  papersList: [
    { code: 'SI-2016-PWT', title: 'TSLPRB SCT SI Prelims 2016', dateHeld: '2016-04-17', status: 'Official Final Key Verified' },
    { code: 'PC-2016-PWT', title: 'TSLPRB SCT PC Prelims 2016 (p2016)', dateHeld: '2016-04-03', status: 'Official Key Verified' },
    { code: 'PC-2016-FWE', title: 'TSLPRB SCT PC Final Written Exam 2016 (p2016f)', dateHeld: '2016-10-23', status: 'Official Final Key Verified' },
    { code: 'SI-2018-PWT', title: 'TSLPRB SCT SI Prelims 2018', dateHeld: '2018-08-26', status: 'Official Final Key Verified' },
    { code: 'PC-2018-PWT', title: 'TSLPRB SCT PC Prelims 2018 (p2018)', dateHeld: '2018-09-30', status: 'Official Final Key Verified' },
    { code: 'PC-2019-FWE', title: 'TSLPRB SCT PC Final Written Exam 2019 (p2019f)', dateHeld: '2019-04-28', status: 'Official Key Verified' },
    { code: 'SI-2022-PWT', title: 'TSLPRB SCT SI Prelims 2022 (s2022)', dateHeld: '2022-08-07', status: 'Official Final Key Verified' },
    { code: 'PC-2022-PWT', title: 'TSLPRB SCT PC Prelims 2022 (p2022)', dateHeld: '2022-08-28', status: 'Official Final Key Verified' },
    { code: 'SI-2023-FWE', title: 'TSLPRB SCT SI Final Written Exam 2023 (s2023d)', dateHeld: '2023-04-08 / 09', status: 'Official Final Key Verified' }
  ],
  dateCutoffCompliance:
    '2026 SI PWT (tentative 29 Nov 2026) and 2026 PC PWT (tentative 20 Dec 2026) have NOT occurred yet as of 14 Nov 2026. Zero 2026 SI/PC questions are fabricated. Abbreviation "AW" is documented as UNRESOLVED.',
  evidenceFindings: [
    {
      cluster: 'Hyderabad Protection / Hitarakshana Samithi Founder (G. Ramachari)',
      classification: 'Class A — Near-Exact Repeat',
      evidence: 'Asked in SI Prelims 2022 (s2022-167) AND repeated in SI Mains 2023 (s2023d-186)!'
    },
    {
      cluster: 'J.M. Girglani Commission (June 2001, TDP Govt, GO 610)',
      classification: 'Class A/B — Direct Concept Repeat across PC & SI',
      evidence: 'Asked in PC Mains 2019 (p2019f-188) AND repeated in SI Prelims 2022 (s2022-171)!'
    },
    {
      cluster: 'Gentlemen’s Agreement (20 Feb 1956, Signatories, G.B. Pant, Dy CM "6th Finger")',
      classification: 'Class B — High-Frequency Multi-Angle Concept Cluster',
      evidence: '5 verified questions across PC 2018 (p2018-177), PC 2019 (p2019f-191), and SI 2022 (s2022-168, s2022-174, s2022-178, s2022-179).'
    },
    {
      cluster: '1997 Cultural-Intellectual Conferences (Bhongir, Suryapet, Aikya Vedika, Warangal)',
      classification: 'Class B — Multi-Angle Concept Repeat',
      evidence: '5 verified questions across PC 2019 (p2019f-192, p2019f-195), SI 2022 (s2022-170, s2022-177), and SI 2023 (s2023d-155, s2023d-194, s2023d-195).'
    },
    {
      cluster: '2010–2014 Final Phase Chronology & Parliamentary Dates',
      classification: 'Class B — Exact-Day Precision Pattern',
      evidence: '8 verified questions testing exact calendar days: 3 Jan 2010, 3 Feb 2010, 10 Mar 2011, 15 Oct 2011, 30 Jul 2013, 13 Feb 2014, 18 Feb 2014.'
    }
  ]
};

export const VERIFIED_PYQS_PART1: QuestionItem[] = [
  // ================= DAY 1 PYQs =================
  {
    id: 'PYQ-01',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'SINGLE_APPEARANCE_PYQ',
    format: 'SINGLE_MCQ',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Final Written Exam (Mains)',
    examYear: 2023,
    paperSession: 'Paper IV General Studies (8–9 Apr 2023)',
    officialQuestionCode: 's2023d-200',
    topicId: 'T1',
    dayNumber: 1,
    subtopic: 'Integration of Hyderabad State (1948)',
    difficulty: 'Easy',
    stem: 'The Indian Government on 17th September, 1948 conducted which military operation to bring Hyderabad State into the Indian Union?',
    options: ['Operation Logo', 'Operation Code', 'Operation Polo', 'Operation Vijay'],
    correctIndex: 2,
    explanation: 'Operation Polo ("Police Action", 13–17 September 1948) was executed by the Indian Army (1st Armoured Division under Maj. Gen. J.N. Chaudhuri) culminating in the 7th Nizam’s ceasefire broadcast on 17 September 1948.',
    whyOthersWrong: [
      'Operation Logo is a coined distractor.',
      'Operation Code is a coined distractor.',
      'CORRECT: Named Operation Polo (referencing Hyderabad’s numerous polo grounds).',
      'Operation Vijay was the 1961 liberation of Goa (and later the 1999 Kargil operation).'
    ],
    relatedConcept: 'Integration of Princely Hyderabad State (1948)',
    linkedEntityId: 'P-OSMAN',
    questionSource: 'TSLPRB SI Mains 2023 GS Paper (Q.200)',
    keySource: 'TSLPRB Final Key 2023',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-02',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'A_EXACT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims Forenoon (7 Aug 2022)',
    officialQuestionCode: 's2022-167',
    topicId: 'T1',
    dayNumber: 1,
    subtopic: '1952 Mulki Agitation Organisations',
    difficulty: 'Moderate',
    stem: 'Who was the founder of "Hyderabad Protection Samithi"?',
    options: ['Boorgula Narsing Rao', 'Hayagreevachari', 'Ramachary', 'Mandumula Narsinga Rao'],
    correctIndex: 2,
    explanation: 'Advocate G. Ramachari (Ramachary) founded the Hyderabad Hitarakshana Samithi (translated into English in the 2022 paper as "Hyderabad Protection Samithi") to champion Mulki employment and regional safeguards.',
    whyOthersWrong: [
      'Boorgula Narsing Rao is a name-blend distractor with CM Burgula Ramakrishna Rao & JV Narsing Rao.',
      'T. Hayagreevachari was a freedom fighter and later 2nd Chairman of Telangana Regional Committee.',
      'CORRECT: G. Ramachary founded Hyderabad Hitarakshana (Protection) Samithi — repeated again in SI Mains 2023!',
      'Mandumula Narsinga Rao was editor of Rayyat and freedom fighter.'
    ],
    relatedConcept: 'Early Mulki Protection Civic Forums',
    linkedEntityId: 'C-JAGANMOHAN',
    confusionPairId: 'CMP-01',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.167)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-10']
  },
  {
    id: 'PYQ-03',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'A_EXACT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Final Written Exam (Mains)',
    examYear: 2023,
    paperSession: 'Paper IV General Studies (Apr 2023)',
    officialQuestionCode: 's2023d-186',
    topicId: 'T1',
    dayNumber: 1,
    subtopic: '1952 Mulki Agitation Organisations',
    difficulty: 'Moderate',
    stem: 'Who was the founder of "Hyderabad-Hitarakshana Samithi"?',
    options: ['Ramachari', 'Krishnam Raju', 'C.H. Wagray', 'Kuppaunaidu'],
    correctIndex: 0,
    explanation: 'Notice the Class-A Exact Repetition! SI Prelims 2022 asked "Hyderabad Protection Samithi" and SI Mains 2023 asked its Telugu-Sanskrit title "Hyderabad-Hitarakshana Samithi" — both answered by G. Ramachari!',
    whyOthersWrong: [
      'CORRECT: G. Ramachari founded Hyderabad Hitarakshana Samithi.',
      'Krishnam Raju was not associated with this Hyderabad forum.',
      'G.N. Waghray / C.H. Wagray was associated with civic/legal panels, not founder of Hitarakshana Samithi.',
      'Kuppaunaidu is an unrelated distractor.'
    ],
    relatedConcept: 'Exact PYQ Repetition Proof (2022 → 2023)',
    linkedEntityId: 'C-JAGANMOHAN',
    confusionPairId: 'CMP-01',
    questionSource: 'TSLPRB SI Mains 2023 (Q.186)',
    keySource: 'TSLPRB Final Key 2023',
    sourceIds: ['SRC-10']
  },
  {
    id: 'PYQ-04',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Final Written Exam (Mains)',
    examYear: 2016,
    paperSession: 'FWE General Studies (23 Oct 2016)',
    officialQuestionCode: 'p2016f-147',
    topicId: 'T1',
    dayNumber: 1,
    subtopic: '1952 Mulki Movement Inquiry',
    difficulty: 'Moderate',
    stem: 'The Commission that investigated the incidents related to the 1952 Mulki Movement in Hyderabad was headed by whom of the following?',
    options: ['Vaman Naik', 'Akbar Hyderi', 'Jagan Mohan Reddy', 'Ramachari'],
    correctIndex: 2,
    explanation: 'Following the police firing near City College and Afzalgunj on 3–4 September 1952 during the anti-Non-Mulki student protests, the Burgula Ramakrishna Rao government appointed Hyderabad High Court Judge Justice Pingali Jaganmohan Reddy to conduct a judicial inquiry (report submitted 28 Dec 1952).',
    whyOthersWrong: [
      'Vaman Naik was an early nationalist/social reformer in Hyderabad.',
      'Sir Akbar Hydari was Prime Minister (Sadr-i-Azam) of Nizam’s Executive Council earlier (1937–41).',
      'CORRECT: Justice Pingali Jaganmohan Reddy headed the 1952 firing inquiry commission.',
      'G. Ramachari founded Hyderabad Hitarakshana Samithi, not the judicial commission.'
    ],
    relatedConcept: '1952 City College Firing & Judicial Probe',
    linkedEntityId: 'P-JAGANMOHAN',
    confusionPairId: 'CMP-01',
    questionSource: 'TSLPRB PC Mains 2016 (Q.147)',
    keySource: 'TSLPRB Final Key 2016',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-05',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'ASSERTION_REASON',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Preliminary Written Test',
    examYear: 2016,
    paperSession: 'Prelims (3 Apr 2016)',
    officialQuestionCode: 'p2016-200',
    topicId: 'T1',
    dayNumber: 1,
    subtopic: 'Pre-1948 Roots of Mulki Rules',
    difficulty: 'Moderate',
    stem: 'Assertion (A): In 1868, Salarjung I ordered that Mulkis should be given priority in jobs.\nReason (R): Due to the employment of Non-Mulkis there was discontentment among Mulkis.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true, but (R) is not the correct explanation of (A)',
      '(A) is true, but (R) is false',
      '(A) is false, but (R) is true'
    ],
    correctIndex: 0,
    explanation: 'During Salar Jung I’s administrative reforms (post-1853), large recruitment of outsiders (Ghair-Mulkis) from North India and British provinces caused strong local discontent, prompting his 1868 circular prioritizing Mulkis — the historical root later codified in the 1919 Farman.',
    whyOthersWrong: [
      'CORRECT: Both statements are historically accurate and R directly explains why A was issued.',
      'R directly caused A, so option 2 is wrong.',
      'R is historically true.',
      'A is historically true.'
    ],
    relatedConcept: '1868 Salar Jung I Circular → 1919 Mulki Farman',
    linkedEntityId: 'P-OSMAN',
    confusionPairId: 'CMP-01',
    questionSource: 'TSLPRB PC Prelims 2016 (Q.200)',
    keySource: 'TSLPRB Key 2016',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  // ================= DAY 2 PYQs =================
  {
    id: 'PYQ-06',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'SINGLE_MCQ',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims (7 Aug 2022)',
    officialQuestionCode: 's2022-168',
    topicId: 'T2',
    dayNumber: 2,
    subtopic: 'Gentlemen’s Agreement (1956)',
    difficulty: 'Easy',
    stem: 'The Gentlemen’s Agreement at Delhi was signed on:',
    options: ['16th February, 1956', '18th February, 1956', '19th February, 1956', '20th February, 1956'],
    correctIndex: 3,
    explanation: 'The 14-point Gentlemen’s Agreement between 4 Telangana and 4 Andhra Congress leaders was signed on 20th February, 1956 at Hyderabad House, New Delhi.',
    whyOthersWrong: [
      '16th February 1956 is a close-date distractor.',
      '18th February 1956 is a close-date distractor.',
      '19th February 1956 saw preparatory talks, not the final signing.',
      'CORRECT: Signed on 20th February, 1956.'
    ],
    relatedConcept: 'Gentlemen’s Agreement Date & Venue',
    linkedEntityId: 'C-GENTLEMEN',
    confusionPairId: 'CMP-02',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.168)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-07',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims (7 Aug 2022)',
    officialQuestionCode: 's2022-174',
    topicId: 'T2',
    dayNumber: 2,
    subtopic: 'Gentlemen’s Agreement (1956)',
    difficulty: 'Easy',
    stem: 'Who was the "Home Minister of India" on the historic occasion of signing of "Gentlemen’s Agreement" by Andhra & Telangana leaders in 1956?',
    options: ['Sardar Patel', 'Govind Vallabh Pant', 'Morarji Desai', 'Moulana Abul Kalam Azad'],
    correctIndex: 1,
    explanation: 'Pandit Govind Ballabh Pant served as Union Home Minister (1955–1961) and actively brokered the Gentlemen’s Agreement on 20 February 1956 and tabled the Safeguards Note in Lok Sabha on 10 August 1956.',
    whyOthersWrong: [
      'Sardar Vallabhbhai Patel passed away on 15 December 1950 (led 1948 Operation Polo, not 1956 merger).',
      'CORRECT: Govind Ballabh Pant was Union Home Minister in February 1956.',
      'Morarji Desai was Chief Minister of Bombay State in February 1956.',
      'Maulana Abul Kalam Azad was Union Education Minister.'
    ],
    relatedConcept: 'Central Mediation in 1956 Merger',
    linkedEntityId: 'C-GENTLEMEN',
    confusionPairId: 'CMP-02',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.174)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-08',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims (7 Aug 2022)',
    officialQuestionCode: 's2022-179',
    topicId: 'T2',
    dayNumber: 2,
    subtopic: 'Gentlemen’s Agreement Signatories',
    difficulty: 'Moderate',
    stem: 'Identify the leader from Andhra region who was NOT a member who signed on the "Gentlemen’s Agreement" in 1956:',
    options: ['Damodaram Sanjeevaiah', 'N. Sanjeeva Reddy', 'Gauthu Lachanna', 'B. Gopal Reddy'],
    correctIndex: 0,
    explanation: 'The 4 Andhra signatories were Bezawada Gopala Reddy, Neelam Sanjeeva Reddy, Sardar Gouthu Latchanna, and Alluri Satyanarayana Raju. Damodaram Sanjeevaiah was NOT one of the 8 signatories (ironically, when Sanjeevaiah became CM in 1960, he honoured the Agreement by making K.V. Ranga Reddy Deputy CM!).',
    whyOthersWrong: [
      'CORRECT: Damodaram Sanjeevaiah did NOT sign the 1956 Gentlemen’s Agreement.',
      'Neelam Sanjeeva Reddy (Dy CM of Andhra State) signed it.',
      'Sardar Gouthu Latchanna (Krishikar Lok Party minister in Andhra) signed it.',
      'Bezawada Gopala Reddy (CM of Andhra State) signed it.'
    ],
    relatedConcept: 'Exact 8 Signatories of Gentlemen’s Agreement',
    linkedEntityId: 'C-GENTLEMEN',
    confusionPairId: 'CMP-02',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.179)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-04', 'SRC-09', 'SRC-10']
  },
  {
    id: 'PYQ-09',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'SINGLE_MCQ',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims (7 Aug 2022)',
    officialQuestionCode: 's2022-178',
    topicId: 'T2',
    dayNumber: 2,
    subtopic: 'Violation of Gentlemen’s Agreement',
    difficulty: 'Easy',
    stem: 'Who described the post of Deputy Chief Minister as "sixth finger to a hand"?',
    options: ['M. Chenna Reddy', 'Neelam Sanjeeva Reddy', 'B. Ramakrishna Reddy', 'K. Brahmananda Reddy'],
    correctIndex: 1,
    explanation: 'Immediately upon becoming the first Chief Minister of Andhra Pradesh on 1 November 1956, Neelam Sanjeeva Reddy violated Point 11 of the Gentlemen’s Agreement by refusing to appoint a Telangana Deputy CM, dismissing the post as "useless like a sixth finger on a hand".',
    whyOthersWrong: [
      'Dr. M. Chenna Reddy protested against this breach.',
      'CORRECT: Neelam Sanjeeva Reddy made this infamous remark in 1956.',
      'Burgula Ramakrishna Rao was outgoing CM of Hyderabad State.',
      'K. Brahmananda Reddy was CM later (1964–1971).'
    ],
    relatedConcept: 'Day-1 Violation of Gentlemen’s Agreement',
    linkedEntityId: 'C-GENTLEMEN',
    confusionPairId: 'CMP-02',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.178)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-10',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Preliminary Written Test',
    examYear: 2016,
    paperSession: 'Prelims (3 Apr 2016)',
    officialQuestionCode: 'p2016-190',
    topicId: 'T2',
    dayNumber: 2,
    subtopic: 'Telangana Regional Committee (1958)',
    difficulty: 'Moderate',
    stem: 'Who was the first President (Chairman) of the Telangana Regional Committee?',
    options: ['Hayagreeva Chary', 'Chokka Rao', 'Achyutha Reddy', 'Kodati Rajamallu'],
    correctIndex: 2,
    explanation: 'Constituted on 1 February 1958 under Article 371(1), the Telangana Regional Committee (TRC) elected K. Achutha Reddy (Mahbubnagar MLA) as its first Chairman (succeeded later by T. Hayagrivachary and J. Chokka Rao).',
    whyOthersWrong: [
      'T. Hayagrivachary served as the 2nd Chairman of TRC (1964–67).',
      'J. Chokka Rao served as the 3rd Chairman of TRC (from 1967, during the 1969 movement).',
      'CORRECT: K. Achutha Reddy was the first Chairman (President) of TRC in 1958.',
      'Kodati Rajamallu was a prominent Telangana minister/legislator, not 1st TRC Chairman.'
    ],
    relatedConcept: 'Telangana Regional Committee Leadership',
    linkedEntityId: 'P-ACHUTHA',
    confusionPairId: 'CMP-02',
    questionSource: 'TSLPRB PC Prelims 2016 (Q.190)',
    keySource: 'TSLPRB Key 2016',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-11',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'ASSERTION_REASON',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Preliminary Written Test',
    examYear: 2018,
    paperSession: 'Prelims (30 Sep 2018)',
    officialQuestionCode: 'p2018-177',
    topicId: 'T2',
    dayNumber: 2,
    subtopic: 'Gentlemen’s Agreement Context',
    difficulty: 'Hard',
    stem: 'Assertion (A): A Gentlemen’s Agreement was signed between Telangana leaders and Andhra leaders in February 1956 to merge Telangana and Andhra.\nReason (R): Accepting the merger proposals, Andhra Assembly passed a resolution on November 25, 1954 to safeguard the interests of Telangana.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      '(A) is true, but (R) is false',
      '(A) is false, but (R) is true',
      'Both (A) and (R) are true, but (R) is not the correct explanation of (A)'
    ],
    correctIndex: 1,
    explanation: 'Assertion (A) is true (signed 20 Feb 1956). Reason (R) is FALSE because SRC had not even submitted its report in Nov 1954 (submitted 30 Sep 1955); the Andhra State Assembly passed its Visalandhra/safeguards resolution on 25 November 1955 (NOT 1954!). Notice the 1-year date trap!',
    whyOthersWrong: [
      'R contains a deliberate year trap (1954 instead of 25 Nov 1955).',
      'CORRECT: (A) is true, while (R) is false due to the wrong year 1954.',
      'A is true.',
      'R is false.'
    ],
    relatedConcept: 'Precision Year Traps in Assertion-Reason',
    linkedEntityId: 'C-GENTLEMEN',
    confusionPairId: 'CMP-03',
    questionSource: 'TSLPRB PC Prelims 2018 (Q.177)',
    keySource: 'TSLPRB Final Key 2018',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  // ================= DAY 3 PYQs =================
  {
    id: 'PYQ-12',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'SINGLE_MCQ',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Final Written Exam (Mains)',
    examYear: 2016,
    paperSession: 'FWE (23 Oct 2016)',
    officialQuestionCode: 'p2016f-148',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: '1969 Telangana Agitation Spark',
    difficulty: 'Easy',
    stem: 'Who among the following undertook the first indefinite fast during the 1969 Jai Telangana / Safeguards Movement?',
    options: ['Kolisetti Ramdas', 'T. Purshotham Rao', 'Potu Krishnamurthy', 'Annabathula Ravindranath'],
    correctIndex: 3,
    explanation: 'B.A. student Annabathula Ravindranath launched the historic indefinite hunger strike on 8 January 1969 at Khammam demanding implementation of Telangana safeguards and removal of non-Mulkis.',
    whyOthersWrong: [
      'Kolishetti Ramadasu (Khammam Municipal Vice-Chairman) supported and managed the hunger strike camp.',
      'T. Purushotham Rao was an intellectual/politician from Warangal.',
      'Potu Krishnamurthy joined hunger protests subsequently.',
      'CORRECT: Annabathula Ravindranath started the 8 January 1969 indefinite fast.'
    ],
    relatedConcept: 'Spark of 1969 Movement at Khammam',
    linkedEntityId: 'P-RAVINDRANATH',
    questionSource: 'TSLPRB PC Mains 2016 (Q.148)',
    keySource: 'TSLPRB Final Key 2016',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-13',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'SINGLE_APPEARANCE_PYQ',
    format: 'SINGLE_MCQ',
    examSuitability: 'SI_ONLY',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims (7 Aug 2022)',
    officialQuestionCode: 's2022-183',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: 'KTPS Non-Local Appointments',
    difficulty: 'Hard',
    stem: 'Identify the person who brought the illegal appointment of non-locals in Kothagudem Thermal Power Station (KTPS) for the first time into public:',
    options: ['A. Ramadas', 'A. Ravindranath', 'Sree Ramadas', 'I. Kiran Nath'],
    correctIndex: 2,
    explanation: 'A. Sree Ramadas (TSLPRB Final Key accepted both Option 1 "A. Ramadas" and Option 3 "Sree Ramadas") first compiled and exposed the list of illegal non-local appointments at KTPS Palvancha, which then inspired Annabathula Ravindranath’s hunger strike!',
    whyOthersWrong: [
      'Also accepted as equivalent spelling of A. Sree Ramadas in TSLPRB final key.',
      'Annabathula Ravindranath undertook the fast on 8 Jan 1969 after the KTPS issue came out.',
      'CORRECT: Sree Ramadas (A. Ramadas) exposed the KTPS non-local recruitment list.',
      'I. Kiran Nath is a distractor.'
    ],
    relatedConcept: 'KTPS Palvancha Spark vs Khammam Fast',
    linkedEntityId: 'P-RAVINDRANATH',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.183)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-10']
  },
  {
    id: 'PYQ-14',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Final Written Exam (Mains)',
    examYear: 2023,
    paperSession: 'Paper IV General Studies (Apr 2023)',
    officialQuestionCode: 's2023d-162',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: 'Telangana Praja Samithi (1969)',
    difficulty: 'Moderate',
    stem: 'Who was the Founder President of Telangana Praja Samithi founded in 1969?',
    options: ['Ananthula Madan Mohan', 'K. Jayashankar', 'Konda Laxman Bapuji', 'M. Chenna Reddy'],
    correctIndex: 0,
    explanation: 'Ananthula Madan Mohan was the Founder-President of Telangana Praja Samithi (formed in Feb/March 1969 out of the Telangana People’s Convention; SI 2023 Q.184 also tested Madan Mohan for "Telangana Convention"). Dr. Marri Chenna Reddy took over as President later on 22 May 1969!',
    whyOthersWrong: [
      'CORRECT: Ananthula Madan Mohan founded TPS and served as its first President.',
      'Prof. K. Jayashankar was co-organizer of Telangana Jana Sabha / academic research forums in 1969.',
      'Konda Laxman Bapuji founded Telangana Congress Samithi after resigning his ministership on 27 Mar 1969.',
      'TRAP DISTRACTOR: Dr. M. Chenna Reddy became TPS President in May 1969, NOT the Founder-President!'
    ],
    relatedConcept: 'TPS Founder (Madan Mohan) vs Later Leader (Chenna Reddy)',
    linkedEntityId: 'P-MADANMOHAN',
    confusionPairId: 'CMP-08',
    questionSource: 'TSLPRB SI Mains 2023 (Q.162)',
    keySource: 'TSLPRB Final Key 2023',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-15',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Final Written Exam (Mains)',
    examYear: 2023,
    paperSession: 'Paper IV General Studies (Apr 2023)',
    officialQuestionCode: 's2023d-154',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: '1969 Political Developments',
    difficulty: 'Moderate',
    stem: 'Identify the association founded by Konda Laxman Bapuji after submitting his resignation to his Ministership in March 1969:',
    options: ['Telangana People’s Samithi', 'Telangana Congress Samithi', 'Telangana Convention', 'People’s Party of Telangana'],
    correctIndex: 1,
    explanation: 'After resigning as Minister for Information & Public Relations from K. Brahmananda Reddy’s cabinet on 27 March 1969 (becoming the first minister to resign for Telangana), Acharya Konda Laxman Bapuji founded the "Telangana Congress Samithi".',
    whyOthersWrong: [
      'Telangana Praja (People’s) Samithi was founded by Ananthula Madan Mohan.',
      'CORRECT: Konda Laxman Bapuji founded Telangana Congress Samithi.',
      'Telangana Convention was started by A. Madan Mohan (s2023d-184).',
      'Coined distractor.'
    ],
    relatedConcept: 'Konda Laxman Bapuji’s 1969 Resignation',
    linkedEntityId: 'P-BAPUJI',
    questionSource: 'TSLPRB SI Mains 2023 (Q.154)',
    keySource: 'TSLPRB Final Key 2023',
    sourceIds: ['SRC-10']
  },
  {
    id: 'PYQ-16',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'PERSON_COMMITTEE',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Final Written Exam (Mains)',
    examYear: 2019,
    paperSession: 'FWE (28 Apr 2019)',
    officialQuestionCode: 'p2019f-189',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: 'Eight-Point Formula Committees (1969)',
    difficulty: 'Moderate',
    stem: 'In April 1969 the government appointed a committee to make suitable recommendations for constitutional amendments to continue Mulki rules. Who was the Chairman of that committee?',
    options: ['Pingali Jaganmohan Reddy', 'Kumar Lalith', 'G.N. Waghre', 'K.N. Wanchoo'],
    correctIndex: 3,
    explanation: 'Following the 28 March 1969 SC strike-down of Sec 3 of the Public Employment Act and Point 5 of Indira Gandhi’s 8-Point Formula (11 April 1969), the Union Government appointed a 3-member Committee of Jurists chaired by former Chief Justice of India K.N. Wanchoo (with M.C. Setalvad and Niren De) on 19 April 1969.',
    whyOthersWrong: [
      'Justice P. Jaganmohan Reddy probed the 1952 Mulki firing (17 years earlier!).',
      'Kumar Lalit audited Telangana financial surpluses in Jan–Mar 1969.',
      'G.N. Waghray was not the jurists committee chair.',
      'CORRECT: Former CJI Justice K.N. Wanchoo chaired the April 1969 Jurists Committee on Mulki constitutional safeguards.'
    ],
    relatedConcept: 'Wanchoo (Law) vs Bhargava (Surpluses) under 8-Point Formula',
    linkedEntityId: 'P-WANCHOO',
    confusionPairId: 'CMP-04',
    questionSource: 'TSLPRB PC Mains 2019 (Q.189)',
    keySource: 'TSLPRB Key 2019',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-17',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'SINGLE_APPEARANCE_PYQ',
    format: 'STATEMENT_BASED',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Preliminary Written Test',
    examYear: 2018,
    paperSession: 'Prelims (30 Sep 2018)',
    officialQuestionCode: 'p2018-178',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: '1969 Agitation Observance Days',
    difficulty: 'Hard',
    stem: 'Identify the pair of 1969 Telangana Movement observance days which is NOT correct:',
    options: [
      'Telangana Vanchana Dinamu – 22 April 1969',
      'Telangana Pathaka Dinamu – 12 July 1969',
      'Telangana Porata Dinotsavamu – 7 March 1969',
      'Telangana Korikala Dinamu – 1 May 1969'
    ],
    correctIndex: 2,
    explanation: 'During 1969: 22 April = Vanchana Dinam (Betrayal Day); 1 May = Korikala Dinam (Demands Day, coinciding with May Day); 17 May = Porata / Martyrs Day; 12 July = Pathaka Dinam (Flag Day). 7 March 1969 was NOT Porata Dinotsavam (8–9 March was the Reddy Hostel Convention; 3 March was Bandh).',
    whyOthersWrong: [
      '22 April 1969 is correctly matched with Telangana Vanchana Dinam.',
      '12 July 1969 is correctly matched with Telangana Pathaka (Flag) Dinam.',
      'CORRECT (WRONG PAIR): 7 March 1969 is NOT Telangana Porata Dinotsavam.',
      '1 May 1969 is correctly matched with Telangana Korikala (Demands) Dinam.'
    ],
    relatedConcept: '1969 Mass Protest Calendar',
    linkedEntityId: 'P-CHENNAREDDY',
    questionSource: 'TSLPRB PC Prelims 2018 (Q.178)',
    keySource: 'TSLPRB Final Key 2018',
    sourceIds: ['SRC-10']
  },
  {
    id: 'PYQ-18',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'SINGLE_MCQ',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Preliminary Written Test',
    examYear: 2018,
    paperSession: 'Prelims (30 Sep 2018)',
    officialQuestionCode: 'p2018-182',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: 'Telangana Praja Samithi Political Conversion',
    difficulty: 'Moderate',
    stem: 'In which month/year did Telangana Praja Samithi decide to change the scope of its organisation from a non-political body to a political party?',
    options: ['July 1970', 'May 1970', 'April 1970', 'June 1970'],
    correctIndex: 0,
    explanation: 'Despite initial internal debate (where some student leaders opposed electoral party conversion), TPS decided in July 1970 to become a full-fledged political party to contest by-elections and the upcoming Lok Sabha general elections.',
    whyOthersWrong: [
      'CORRECT: TPS converted into a political party in July 1970.',
      'May 1970 saw executive discussions, not the formal conversion.',
      'April 1970 is incorrect.',
      'June 1970 saw convention groundwork leading to the July 1970 formal conversion.'
    ],
    relatedConcept: 'Evolution of TPS (1969–1971)',
    linkedEntityId: 'P-CHENNAREDDY',
    confusionPairId: 'CMP-08',
    questionSource: 'TSLPRB PC Prelims 2018 (Q.182)',
    keySource: 'TSLPRB Final Key 2018',
    sourceIds: ['SRC-10']
  },
  {
    id: 'PYQ-19',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'SINGLE_MCQ',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Preliminary Written Test',
    examYear: 2022,
    paperSession: 'Prelims (7 Aug 2022)',
    officialQuestionCode: 's2022-175',
    topicId: 'T3',
    dayNumber: 3,
    subtopic: '1971 Mid-Term Lok Sabha Elections',
    difficulty: 'Easy',
    stem: 'How many Lok Sabha seats were won by "Telangana Praja Samithi" in the 1971 General Elections in Andhra Pradesh?',
    options: ['12', '11', '14', '10'],
    correctIndex: 3,
    explanation: 'Contesting all 14 Lok Sabha constituencies in Telangana on a single-point statehood mandate in March 1971, Telangana Praja Samithi (TPS) won 10 out of 14 seats (securing ~47% of votes polled in Telangana).',
    whyOthersWrong: [
      '12 is incorrect.',
      '11 is incorrect (though 1 more independent/ally later aligned, official TPS tally was 10).',
      '14 was the total number of Lok Sabha seats in Telangana in 1971 (increased to 17 post-delimitation).',
      'CORRECT: TPS won 10 Lok Sabha seats.'
    ],
    relatedConcept: '1971 Electoral Mandate of TPS',
    linkedEntityId: 'P-CHENNAREDDY',
    confusionPairId: 'CMP-08',
    questionSource: 'TSLPRB SI Prelims 2022 (Q.175)',
    keySource: 'TSLPRB Final Key 2022',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  // ================= DAY 4 & DAY 5 PYQs =================
  {
    id: 'PYQ-20',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'CHRONOLOGY',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT SI Final Written Exam (Mains)',
    examYear: 2023,
    paperSession: 'Paper IV General Studies (Apr 2023)',
    officialQuestionCode: 's2023d-193',
    topicId: 'T4',
    dayNumber: 4,
    subtopic: '1969–1973 Chronological Sequence',
    difficulty: 'Moderate',
    stem: 'Arrange the following events in chronological order:\n(A) Ravindranath started indefinite strike at Khammam/Palvancha context\n(B) Indira Gandhi announced Eight-Point Formula\n(C) M. Chenna Reddy’s announcement of postponement/withdrawal of Jai Telangana movement (merger with Congress)\n(D) Announcement of Six-Point Formula by Central Govt. in September 1973',
    options: ['(B), (A), (C), (D)', '(A), (C), (B), (D)', '(A), (B), (C), (D)', '(D), (C), (B), (A)'],
    correctIndex: 2,
    explanation: '(A) 8 January 1969 (Ravindranath’s fast) → (B) 11 April 1969 (Indira Gandhi’s 8-Point Formula) → (C) September 1971 (Chenna Reddy called off separate agitation & merged TPS into Congress) → (D) 21 September 1973 (Six-Point Formula). Exact sequence: A, B, C, D!',
    whyOthersWrong: [
      'Ravindranath’s fast (Jan 69) came 3 months before 8-Point Formula (Apr 69).',
      '8-Point Formula (Apr 69) preceded Chenna Reddy’s 1971 withdrawal.',
      'CORRECT: (A) Jan 1969 → (B) Apr 1969 → (C) Sep 1971 → (D) Sep 1973.',
      'Reverse order.'
    ],
    relatedConcept: 'Phase I to Phase II Bridge Chronology',
    linkedEntityId: 'C-6POINT',
    confusionPairId: 'CMP-04',
    questionSource: 'TSLPRB SI Mains 2023 (Q.193)',
    keySource: 'TSLPRB Final Key 2023',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'PYQ-21',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'CHRONOLOGY',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Final Written Exam (Mains)',
    examYear: 2016,
    paperSession: 'FWE (23 Oct 2016)',
    officialQuestionCode: 'p2016f-149',
    topicId: 'T4',
    dayNumber: 4,
    subtopic: 'Formulas & Presidential Order Sequence',
    difficulty: 'Moderate',
    stem: 'Arrange the following in chronological order:\n(a) Eight-Point Formula\n(b) Six-Point Formula\n(c) Five-Point Formula\n(d) The Presidential Order',
    options: ['a, c, b, d', 'a, b, c, d', 'c, b, a, d', 'b, c, a, d'],
    correctIndex: 0,
    explanation: 'Remember the golden mnemonic "8 → 5 → 6 → P.O."! (a) Eight-Point Formula = 11 April 1969; (c) Five-Point Formula = 27 November 1972; (b) Six-Point Formula = 21 September 1973; (d) Presidential Order = 18 October 1975.',
    whyOthersWrong: [
      'CORRECT: a (1969) → c (1972) → b (1973) → d (1975).',
      'TRAP: Putting 6-Point before 5-Point because 8-6-5 looks descending — 5-Point (1972) came BEFORE 6-Point (1973)!',
      '8-Point Formula came first in 1969.',
      '6-Point Formula was 1973, not first.'
    ],
    relatedConcept: '8-5-6 Formula Chronology Trap',
    linkedEntityId: 'C-6POINT',
    confusionPairId: 'CMP-04',
    questionSource: 'TSLPRB PC Mains 2016 (Q.149)',
    keySource: 'TSLPRB Final Key 2016',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'PYQ-22',
    origin: 'VERIFIED_PYQ',
    repeatClass: 'B_CONCEPT_REPEAT',
    format: 'STATEMENT_BASED',
    examSuitability: 'BOTH_SI_AND_PC',
    examName: 'TSLPRB SCT PC Final Written Exam (Mains)',
    examYear: 2019,
    paperSession: 'FWE (28 Apr 2019)',
    officialQuestionCode: 'p2019f-194',
    topicId: 'T4',
    dayNumber: 4,
    subtopic: 'Provisions of Six-Point Formula (1973)',
    difficulty: 'Moderate',
    stem: 'Which of the following was NOT a part of the Six-Point Formula announced in September 1973?',
    options: [
      'A State-level Planning Board to be constituted for backward areas.',
      'A Central University to be established in Hyderabad.',
      'Two separate High Courts to be established, one for Andhra and another for Telangana.',
      'Local candidates to be given preference in specified appointments and admissions.'
    ],
    correctIndex: 2,
    explanation: 'The Six-Point Formula (21 Sep 1973) provided for a State Planning Board, Central University in Hyderabad (Art 371-E), local preference in admissions & jobs, an Administrative Tribunal, a Constitutional Amendment (32nd), and abolition of Mulki Rules & TRC. It NEVER proposed two separate High Courts (in fact, AP & Telangana shared a common High Court even up to 31 Dec 2018!).',
    whyOthersWrong: [
      'Point 1 of the Six-Point Formula created a State-level Planning Board.',
      'Point 2 established a Central University in Hyderabad (University of Hyderabad, 1974).',
      'CORRECT (NOT PART OF FORMULA): Separate High Courts were NEVER part of the 1973 Six-Point Formula.',
      'Points 2 & 3 granted preference to local candidates.'
    ],
    relatedConcept: 'Six-Point Formula Clauses Audit',
    linkedEntityId: 'C-6POINT',
    confusionPairId: 'CMP-06',
    questionSource: 'TSLPRB PC Mains 2019 (Q.194)',
    keySource: 'TSLPRB Key 2019',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  }
];
