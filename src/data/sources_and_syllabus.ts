// Central Verified Source & Syllabus Intelligence Registry
// Verified against official TGPRB 2026 notifications, MHA CCSAP (Srikrishna Committee) Report, India Code, and TSLPRB Final Keys

export interface SourceReference {
  id: string;
  level: 1 | 2 | 3; // 1 = Primary/Official, 2 = Credible Academic, 3 = Secondary Discovery
  levelLabel: string;
  title: string;
  authority: string;
  issueDate: string;
  sectionOrPage: string;
  url: string;
  verifiedOn: string;
  topicsCovered: string[];
  historicalPeriod: string;
  verificationNotes: string;
}

export const SYLLABUS_INTELLIGENCE = {
  verificationDate: '2026-11-14',
  boardName: 'Telangana State Level Police Recruitment Board (TGPRB / TSLPRB)',
  portalUrl: 'https://www.tgprb.in/',
  importantDateRestrictionNote:
    'As verified from Official TGPRB Press Note Rc Nos. 189, 225, 234 & 279 / Rect. / 2026 dated 17-09-2026, the 2026 Preliminary Written Tests are scheduled tentatively on 29 November 2026 (SI PWT) and 20 December 2026 (PC PWT). As of November 2026, neither 2026 PWT has been conducted yet; therefore, ZERO 2026 SI/PC previous questions are invented. All PYQs come strictly from verified 2016, 2018, 2019, 2022, and 2023 TSLPRB recruitment cycles.',
  unresolvedAbbreviationNote:
    'Reference Audit ("AW"): The abbreviation "AW" in legacy aspirant references is officially ambiguous across TSLPRB notifications (no post code or paper carries the code "AW" in Rc No. 225 or Rc No. 189 of 2026; Assistant Sub-Inspector Finger Print Bureau is "ASI FPB" Post Code 33, Warder is Post Codes 27/28). Per strict academic QA protocol, "AW" is recorded as UNRESOLVED — no questions are attributed to an unverified exam label.',
  exams: {
    SI: {
      notificationNo: 'Rc No. 225 / Rect. / Rect-1 / 2026',
      notificationDate: '29-07-2026',
      tentativePwtDate: '29-11-2026 (Sunday Forenoon)',
      totalVacancies: 275,
      applicantsCount: 160756,
      pwtPattern: {
        totalQuestions: 200,
        maxMarks: 200,
        durationMinutes: 180,
        sections: 'Arithmetic & Reasoning (100 Q) + General Studies (100 Q)',
        negativeMarking: 0.20, // 20% = 1/5th mark deducted per wrong / multi-bubbled answer
        qualifyingCutoff: '30% OC/EWS, 25% BC, 20% SC/ST/Ex-Servicemen'
      },
      fwePattern: {
        paperIV: 'Paper IV: General Studies (200 Questions, 200 Marks, 3 Hours)',
        negativeMarking: 0.25, // 25% = 1/4th mark deducted in FWE Paper I/II MCQs & Paper III/IV
        verbatimSyllabus:
          'Telangana Movement and State Formation - The idea of Telangana (1948-1970), Mobilization phase (1971-1990), towards formation of Telangana State (1991-2014)'
      },
      syllabusStructure: [
        {
          code: 'SI-PHASE-I',
          title: 'Phase I: The Idea of Telangana (1948–1970)',
          explicitStatus: 'EXPLICITLY SPECIFIED (Annexure II Item B.6 & Annexure III Paper IV Item 7)'
        },
        {
          code: 'SI-PHASE-II',
          title: 'Phase II: Mobilisation Phase (1971–1990)',
          explicitStatus: 'EXPLICITLY SPECIFIED (Annexure II Item B.6 & Annexure III Paper IV Item 7)'
        },
        {
          code: 'SI-PHASE-III',
          title: 'Phase III: Towards Formation of Telangana State (1991–2014)',
          explicitStatus: 'EXPLICITLY SPECIFIED (Annexure II Item B.6 & Annexure III Paper IV Item 7)'
        }
      ]
    },
    PC: {
      notificationNo: 'Rc No. 189 / Rect. / Rect-2 / 2026',
      notificationDate: '29-07-2026',
      tentativePwtDate: '20-12-2026 (Sunday Forenoon)',
      totalVacancies: 7112,
      applicantsCount: 389356,
      pwtPattern: {
        totalQuestions: 200,
        maxMarks: 200,
        durationMinutes: 180,
        standard: 'Intermediate Standard',
        negativeMarking: 0.20, // 20% = 1/5th mark deducted in PWT
        qualifyingCutoff: '30% OC/EWS, 25% BC, 20% SC/ST/Ex-Servicemen/Home Guards'
      },
      fwePattern: {
        paper: 'Single Paper (200 Questions, 200 Marks, 3 Hours)',
        negativeMarking: 0.0, // FWE note check: configurable in simulator (0% or 20%/25%)
        verbatimSyllabus: 'Item 8 (PWT Annexure II) & Item 9 (FWE Annexure III): "Contents pertaining to the State of Telangana."'
      },
      distinctionWarning:
        'CRITICAL SYLLABUS DISTINCTION: Unlike the SI Notification, the 2026 Constable Notification does NOT explicitly print the three-phase division (1948–1970, 1971–1990, 1991–2014). Instead, it uses the broader umbrella clause "Contents pertaining to the State of Telangana." However, empirical analysis of TSLPRB PC papers (2016, 2018, 2019, 2022, 2023) proves that high-landmark Telangana Movement milestones (1952 Mulki Commission, 1956 Gentlemen’s Agreement, 1969 Fast & Observance Days, Formulas Chronology, GO 610/Girglani, Srikrishna Members, Sakala Janula Samme, Feb 2014 Lok Sabha Bill dates) ARE directly asked under this umbrella alongside Telangana Heritage, Armed Struggle (1946–51), Culture, and State Profile.'
    }
  }
};

export const SOURCES_LIBRARY: SourceReference[] = [
  {
    id: 'SRC-01',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'TGPRB SCT SI (Civil et al.) Notification 2026 (Rc No. 225 / Rect. / Rect-1 / 2026)',
    authority: 'Telangana State Level Police Recruitment Board, Hyderabad',
    issueDate: '2026-07-29',
    sectionOrPage: 'Para 16 (Pages 19–24), Annexure II (Page 42), Annexure III (Page 44)',
    url: 'https://www.tgprb.in/SI_PC_2026/SI%20(Civil%20et%20al)%202026%20Notification%20dated%2029-07-2026.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['SI Syllabus', 'Negative Marking (20% PWT / 25% FWE)', '3-Phase Structure'],
    historicalPeriod: '2026 Official Exam Mandate',
    verificationNotes: 'Directly downloaded and text-extracted. Confirms exact wording of the 3 phases and 20% PWT / 25% FWE negative marking.'
  },
  {
    id: 'SRC-02',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'TGPRB SCT PC (Civil et al.) Notification 2026 (Rc No. 189 / Rect. / Rect-2 / 2026)',
    authority: 'Telangana State Level Police Recruitment Board, Hyderabad',
    issueDate: '2026-07-29',
    sectionOrPage: 'Para 16 (Page 25), Annexure II Item 8 (Page 44), Annexure III Item 9 (Page 45)',
    url: 'https://www.tgprb.in/SI_PC_2026/PC%20(Civil%20et%20al)%202026%20Notification%20dated%2029-07-2026.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['PC Syllabus', 'Contents pertaining to the State of Telangana', 'PWT 20% Negative Marking'],
    historicalPeriod: '2026 Official Exam Mandate',
    verificationNotes: 'Confirms broader phrasing "Contents pertaining to the State of Telangana" and Intermediate standard.'
  },
  {
    id: 'SRC-03',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'TGPRB Press Note on Application Statistics & Tentative PWT Dates (Rc Nos. 189, 225, 234 & 279 / 2026)',
    authority: 'Chairman, TSLPRB (V.V. Srinivasa Rao, IPS)',
    issueDate: '2026-09-17',
    sectionOrPage: 'Pages 1–4 (Tentative PWT Schedule)',
    url: 'https://www.tgprb.in/SI_PC_2026/Press%20Note%20dated%2017-09-2026.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['2026 Exam Dates', 'SI PWT 29 Nov 2026', 'PC PWT 20 Dec 2026'],
    historicalPeriod: '2026 Official Recruitment Update',
    verificationNotes: 'Proves 2026 PWTs had not yet occurred by mid-November 2026.'
  },
  {
    id: 'SRC-04',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'Report of the Committee for Consultations on the Situation in Andhra Pradesh (CCSAP / Justice B.N. Srikrishna Committee)',
    authority: 'Ministry of Home Affairs, Government of India',
    issueDate: '2010-12-30',
    sectionOrPage: 'Chapter 1 (History, Mulki Rules, Gentlemen’s Agreement, 1969, 8/5/6 Point Formulas, GO 610, Girglani) & Chapter 9 (6 Options)',
    url: 'https://www.mha.gov.in/files/commissions_committees_documents/CCSAP_REPORT_060111.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T8', 'T9'],
    historicalPeriod: '1919–2010',
    verificationNotes: 'Primary Government of India archival report detailing Mulki rules (1919 Farman), 1956 Gentlemen’s Agreement text, 1969/1972 agitations, Article 371-D, Presidential Order 1975, GO 610, Girglani Commission, and 2010 recommendations.'
  },
  {
    id: 'SRC-05',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'The Andhra Pradesh Reorganisation Act, 2014 (Act No. 6 of 2014)',
    authority: 'Parliament of India / Gazette of India Extraordinary (India Code)',
    issueDate: '2014-03-01',
    sectionOrPage: 'Sections 2(a), 3, 4, 5, 8, 46–54, 75, 85, 94 & Schedules I–XIII',
    url: 'https://www.indiacode.nic.in/handle/123456789/2033',
    verifiedOn: '2026-11-14',
    topicsCovered: ['T9', 'T10', 'Parliamentary Passage', 'Presidential Assent 1 March 2014', 'Appointed Day 2 June 2014'],
    historicalPeriod: '2014',
    verificationNotes: 'Official statute establishing Telangana with 10 districts, common capital provisions (Sec 5 & Sec 8), Polavaram (Sec 90), River Management Boards (Sec 85).'
  },
  {
    id: 'SRC-06',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'Report of the States Reorganisation Commission (Fazal Ali Commission)',
    authority: 'Ministry of Home Affairs, Government of India',
    issueDate: '1955-09-30',
    sectionOrPage: 'Paras 369–389 (Case for Separate Hyderabad / Telangana State until 1961)',
    url: 'https://www.mha.gov.in/sites/default/files/State%20Reorganisation%20Commisison%20Report%20of%201955_270614.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['T2', 'Fazal Ali', 'H.N. Kunzru', 'K.M. Panikkar', 'SRC Recommendation'],
    historicalPeriod: '1953–1955',
    verificationNotes: 'Verifies SRC appointment (22 Dec 1953), submission (30 Sep 1955), and explicit recommendation in Para 386–388 to keep Telangana (residuary Hyderabad) separate for 5 years subject to 2/3rd Assembly consent after 1961.'
  },
  {
    id: 'SRC-07',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'The Constitution (Thirty-second Amendment) Act, 1973 & Andhra Pradesh Public Employment (Organisation of Local Cadres and Regulation of Direct Recruitment) Order, 1975',
    authority: 'Government of India / Ministry of Law & Justice / MCRHRD Institute',
    issueDate: '1975-10-18',
    sectionOrPage: 'Article 371-D & 371-E; G.S.R. 524(E) dated 18-10-1975 (G.O.P. No. 674 dated 20-10-1975)',
    url: 'https://www.mcrhrdi.gov.in/amvi/PPT%27s/Presidentail%20Order.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['T4', 'T5', 'T6', 'Article 371-D', 'Six-Point Formula', 'Zones V & VI', 'Girglani Submission'],
    historicalPeriod: '1973–2004',
    verificationNotes: 'Verifies 32nd Amendment enactment (effective 1 July 1974), Presidential Order issuance (18 Oct 1975, republished by AP Govt via G.O.P. 674 on 20 Oct 1975), 6 Zones (Zones V & VI in Telangana), and Girglani One-Man Commission report submission in Sep 2004.'
  },
  {
    id: 'SRC-08',
    level: 1,
    levelLabel: 'LEVEL 1 — PRIMARY & OFFICIAL',
    title: 'Supreme Court Judgments on Mulki Rules: A.V.S. Narasimha Rao v. State of A.P. (1969) & Director of Industries and Commerce v. V. Venkata Reddy (1972)',
    authority: 'Supreme Court of India',
    issueDate: '1969-03-28 / 1972-10-03',
    sectionOrPage: 'AIR 1970 SC 422 (28 Mar 1969) & AIR 1973 SC 827 (3 Oct 1972)',
    url: 'https://main.sci.gov.in/',
    verifiedOn: '2026-11-14',
    topicsCovered: ['T3', 'T4', 'Section 3 Public Employment Act 1957', 'Mulki Rules Validation 3 Oct 1972'],
    historicalPeriod: '1969–1972',
    verificationNotes: 'Resolves judicial sequence: 28 March 1969 SC struck down Sec 3 of Public Employment (Requirement as to Residence) Act, 1957; 3 October 1972 5-judge bench upheld pre-Constitution Nizam Mulki Rules under Article 35(b), triggering Jai Andhra Movement.'
  },
  {
    id: 'SRC-09',
    level: 2,
    levelLabel: 'LEVEL 2 — CREDIBLE ACADEMIC & STATE PUBLICATIONS',
    title: 'Telangana History & State Formation Monographs / Telugu Akademi & CESS Archival Studies',
    authority: 'Centre for Economic and Social Studies (CESS), Hyderabad & Telugu Akademi',
    issueDate: '2014–2023',
    sectionOrPage: 'Monograph No. 11 & Regional Disparities Documentation',
    url: 'https://cess.ac.in/wp-content/uploads/2023/12/Monograph-No.11.pdf',
    verifiedOn: '2026-11-14',
    topicsCovered: ['T1', 'T2', 'T3', 'T6', 'T7', 'T8', 'Signatories & Committees'],
    historicalPeriod: '1948–2014',
    verificationNotes: 'Cross-verifies Gentlemen’s Agreement 8 signatories, Kumar Lalit & Bhargava surplus committees, 1997 Bhongir/Suryapet/Warangal declarations, and TJAC agitations.'
  },
  {
    id: 'SRC-10',
    level: 3,
    levelLabel: 'LEVEL 3 — PYQ DISCOVERY & OFFICIAL KEY COMPILATIONS',
    title: 'TSLPRB Previous Question Papers & Final Answer Keys Compilation (SI & PC 2016, 2018, 2019, 2022, 2023)',
    authority: 'TSLPRB Official Papers indexed via LearnWithAnil & ExamSiri Archives',
    issueDate: '2016–2023',
    sectionOrPage: 'SI Prelims/Mains (2016, 2018, 2022, 2023) & PC Prelims/Mains (2016, 2018, 2019, 2022, 2023)',
    url: 'https://learnwithanil.in/ts-police-si/subjects/ts-police-si-telangana-history-movement-pyqs.html',
    verifiedOn: '2026-11-14',
    topicsCovered: ['All 10 Days', 'PYQ Frequency Engine', 'Official TSLPRB Key Verification'],
    historicalPeriod: '2016–2023 Recruitment Cycles (9 Distinct Official Question Papers Analyzed)',
    verificationNotes: 'Used as PYQ discovery index with question IDs (s2022, s2023d, p2016, p2016f, p2018, p2019f, p2022, p2023); every historical answer cross-checked against Level 1 & Level 2 records.'
  }
];

export interface DiscrepancyAudit {
  id: string;
  topic: string;
  claimA: string;
  claimB: string;
  primaryEvidence: string;
  bestSupportedConclusion: string;
  examGuidance: string;
}

export const HISTORICAL_DISCREPANCIES: DiscrepancyAudit[] = [
  {
    id: 'DISC-01',
    topic: 'Operation Polo Exact Dates (September 1948)',
    claimA: '13 September 1948 to 17 September 1948 (5-day military operation ending with Nizam’s ceasefire broadcast on the evening of 17 Sep).',
    claimB: '13 September 1948 to 18 September 1948 (formal military surrender ceremony of Major General El Edroos to Major General J.N. Chaudhuri at Secunderabad on 18 Sep).',
    primaryEvidence: 'Ministry of States White Paper on Hyderabad (1948) & TSLPRB SI Mains 2023 (ID: s2023d-200).',
    bestSupportedConclusion: 'Military operations began on 13 September 1948; Nizam Mir Osman Ali Khan announced ceasefire & accession acceptance on 17 September 1948 (celebrated officially as Telangana Praja Palana Dinotsavam / Integration Day); formal ceremonial surrender by Maj. Gen. El Edroos occurred at 4 PM on 18 September 1948.',
    examGuidance: 'In TSLPRB MCQs (e.g., SI 2023 Q.200), 17th September 1948 is consistently tested as the integration/Operation Polo culmination date unless a question specifically asks when El Edroos formally surrendered at 5th Mile, Secunderabad (18 Sep 1948).'
  },
  {
    id: 'DISC-02',
    topic: 'Presidential Order 1975 Date: 18 October vs 20 October 1975',
    claimA: '18 October 1975 — Date President Fakhruddin Ali Ahmed signed G.S.R. 524(E) in the Gazette of India.',
    claimB: '20 October 1975 — Date Government of Andhra Pradesh republished it via G.O.P. No. 674 (General Administration SPF-A Dept).',
    primaryEvidence: 'MHA Notification G.S.R. 524(E) dated 18-10-1975 & Govt of AP G.O.P. No. 674 dated 20-10-1975 (MCRHRD Official Archive).',
    bestSupportedConclusion: 'Both dates exist in official gazettes for two distinct legal steps: Central Presidential Order = 18 October 1975; AP State Government Republication Order (G.O.P. 674) = 20 October 1975.',
    examGuidance: 'If asked when the President issued the Presidential Order under Art 371-D, select 18 October 1975. If asked for G.O.P. No. 674 date, select 20 October 1975.'
  },
  {
    id: 'DISC-03',
    topic: 'J.M. Girglani One-Man Commission Final Report Date (September 2004)',
    claimA: '21 September 2004 (cited in MCRHRD administrative training slides).',
    claimB: '30 September 2004 (cited in competitive exam compendia and legislative summaries).',
    primaryEvidence: 'Appointed via G.O. Rt. No. 2704 (GA Dept) on 25 June 2001 by N. Chandrababu Naidu Govt; Preliminary Report submitted 6 October 2001; Final 3-volume report submitted in September 2004 during Dr. Y.S. Rajasekhara Reddy’s tenure.',
    bestSupportedConclusion: 'Appointment in June 2001 (25 June 2001), Interim Report on 6 October 2001, and Final Report in September 2004 (containing 126 findings across 18 types of violations of the Presidential Order / GO 610).',
    examGuidance: 'TSLPRB exams (SI 2022 Q.171 & PC 2019 Q.188) test "June 2001" for appointment and "September 2004" (to CM Y.S. Rajasekhara Reddy) for final report submission.'
  },
  {
    id: 'DISC-04',
    topic: 'Telangana Joint Action Committee (TJAC) Formation Date: 24 December 2009',
    claimA: '23 December 2009 (evening reaction immediately after Chidambaram’s second statement).',
    claimB: '24 December 2009 (formal constitution meeting establishing Prof. M. Kodandaram as Convener).',
    primaryEvidence: 'Contemporary press archives & TSLPRB chronology keys.',
    bestSupportedConclusion: 'Union Home Minister P. Chidambaram made the second statement putting Telangana on hold on 23 December 2009; in direct response, all-party/civil-society leaders met the very next day, 24 December 2009, formally constituting TJAC with Prof. M. Kodandaram as Convener.',
    examGuidance: 'Always distinguish: 9 Dec 2009 = Process initiation announcement; 23 Dec 2009 = Consultation/hold statement; 24 Dec 2009 = Formation of TJAC.'
  }
];
