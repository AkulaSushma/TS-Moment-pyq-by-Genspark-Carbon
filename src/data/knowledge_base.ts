// Central Knowledge Base Barrel — Single Source of Truth for Web App, D1 API & PDF/DOCX Generators
import { SYLLABUS_INTELLIGENCE, SOURCES_LIBRARY, HISTORICAL_DISCREPANCIES } from './sources_and_syllabus';
import { PERSONALITIES, COMMITTEES, RELATIONSHIP_CHAINS, WHO_IS_WHO_TRAPS } from './personalities_and_committees';
import { CONFUSION_PAIRS } from './confusion_matrix';
import { CURRICULUM_DAYS_1_TO_5 } from './curriculum_part1';
import { CURRICULUM_DAYS_6_TO_10 } from './curriculum_part2';
import { PYQ_ANALYTICS_METADATA, VERIFIED_PYQS_PART1 } from './questions_part1';
import { VERIFIED_PYQS_AND_MODEL_PART2 } from './questions_part2';
import { QUESTIONS_PART3, FLASHCARDS_BANK, CHRONOLOGY_CHALLENGES } from './questions_part3_and_drills';

export const CURRICULUM_DAYS = [...CURRICULUM_DAYS_1_TO_5, ...CURRICULUM_DAYS_6_TO_10];
export const ALL_QUESTIONS = [
  ...VERIFIED_PYQS_PART1,
  ...VERIFIED_PYQS_AND_MODEL_PART2,
  ...QUESTIONS_PART3
];

export const HISTORICAL_MAPS_METADATA = [
  {
    id: 'MAP-1948',
    era: '1948–31 October 1956',
    title: 'Erstwhile Princely & Part-B Hyderabad State (16 Districts)',
    boundaryWarning: 'Historical Boundary — Do NOT confuse with modern 33-district Telangana!',
    regions: [
      {
        name: 'Telangana (Telugu-speaking — 8/9 Districts)',
        districts: ['Hyderabad (Atraf-i-Balda / Baghat)', 'Mahbubnagar', 'Nalgonda', 'Warangal (Khammam carved out Oct 1953)', 'Karimnagar', 'Adilabad', 'Nizamabad', 'Medak'],
        fate1956: 'Merged with 11 Andhra districts on 1 Nov 1956 to form Andhra Pradesh.'
      },
      {
        name: 'Marathwada (Marathi-speaking — 5 Districts)',
        districts: ['Aurangabad', 'Parbhani', 'Nanded', 'Bhir (Beed)', 'Osmanabad'],
        fate1956: 'Transferred to Bombay State (later Maharashtra) on 1 Nov 1956 under SRC.'
      },
      {
        name: 'Hyderabad-Karnataka / Kalyana-Karnataka (Kannada-speaking — 3 Districts)',
        districts: ['Gulbarga', 'Raichur', 'Bidar'],
        fate1956: 'Transferred to Mysore State (later Karnataka) on 1 Nov 1956 under SRC.'
      }
    ]
  },
  {
    id: 'MAP-1956',
    era: '1 November 1956 – 1 June 2014',
    title: 'Erstwhile United Andhra Pradesh & 1975 Presidential Order Zones (I–VI)',
    boundaryWarning: 'United AP Zonal Map (20 -> 23 Districts): Telangana comprised ONLY Zones V & VI!',
    regions: [
      {
        name: 'Zone V — North/East Telangana (4 Districts)',
        districts: ['Adilabad', 'Karimnagar', 'Warangal', 'Khammam'],
        fate1956: 'Covered by G.O. 610 (1985) & Girglani audit (Singareni, KTPS, SRSP belt).'
      },
      {
        name: 'Zone VI — Central/South Telangana & Capital (6 Districts)',
        districts: ['Hyderabad', 'Ranga Reddy (carved out 15 Aug 1978)', 'Nizamabad', 'Medak', 'Mahbubnagar', 'Nalgonda'],
        fate1956: 'Included Para 14(f) Hyderabad City Police exemption that triggered the Oct 2009 Free Zone crisis.'
      },
      {
        name: 'Zones I, II, III (Coastal Andhra) & Zone IV (Rayalaseema)',
        districts: ['Zones I–III: 9 Coastal Districts (Srikakulam to Nellore)', 'Zone IV: 4 Rayalaseema Districts (Kurnool, Anantapur, Cuddapah, Chittoor)'],
        fate1956: 'Became 13-district Residuary Andhra Pradesh on 2 June 2014.'
      }
    ]
  },
  {
    id: 'MAP-2014',
    era: '2 June 2014 (Appointed Day under Act No. 6 of 2014)',
    title: 'Newly Formed State of Telangana (10 Erstwhile Districts at Formation)',
    boundaryWarning: 'Formation Boundary (2 June 2014 = 10 Districts; later reorganized in Oct 2016 & Feb 2019 into 33 administrative districts; minus 7 Khammam submergence mandals transferred to AP for Polavaram).',
    regions: [
      {
        name: '10 Founding Districts on 2 June 2014 (Sec 3 of Act 6 of 2014)',
        districts: ['1. Adilabad', '2. Karimnagar', '3. Nizamabad', '4. Warangal', '5. Khammam', '6. Medak', '7. Ranga Reddy', '8. Hyderabad', '9. Nalgonda', '10. Mahbubnagar'],
        fate1956: '29th State of India — 119 Assembly, 40 Council, 17 Lok Sabha & 7 Rajya Sabha seats.'
      }
    ]
  }
];

export const EXPORT_DOCUMENTS_CATALOG = [
  {
    id: 'EXP-A',
    code: 'A',
    slug: 'A_Complete_Master_Notes_Telangana_Movement_1948_2014',
    title: 'A. Complete Master Notes (1948–2014)',
    subtitle: 'Comprehensive chronologically arranged learning book across Pre-1948 Roots & Phases I, II, III with causal chains and source citations.',
    pagesApprox: 'Master Reference Volume'
  },
  {
    id: 'EXP-B',
    code: 'B',
    slug: 'B_Ten_Day_Intelligent_Study_Guide',
    title: 'B. Ten-Day Intelligent Study Guide',
    subtitle: 'Adaptive 10-day schedule, daily learning objectives, retrieval checkpoints, spaced-repetition intervals, and Day-10 consolidation plan.',
    pagesApprox: '10-Day Action Workbook'
  },
  {
    id: 'EXP-C',
    code: 'C',
    slug: 'C_High_Priority_Exam_Intelligence_Notes',
    title: 'C. High-Priority Exam & PYQ Intelligence Notes',
    subtitle: 'Evidence-based audit of 9 TSLPRB papers, Class A/B/C repeat clusters, 2026 SI vs PC syllabus mapping, and high-yield factual traps.',
    pagesApprox: 'Exam Strategy Dossier'
  },
  {
    id: 'EXP-D',
    code: 'D',
    slug: 'D_Person_and_Committee_Relationship_Atlas',
    title: 'D. Person & Committee Relationship Atlas',
    subtitle: '16 Complete 15-Point Personality Identity Cards, 13 Committee Comparison Cards, Who-Is-Who Trap Disambiguators, and Causal Chains.',
    pagesApprox: 'Visual Identity Atlas'
  },
  {
    id: 'EXP-E',
    code: 'E',
    slug: 'E_Chronology_Revision_Book_1948_2014',
    title: 'E. Chronology Revision Book (1948–2014)',
    subtitle: 'Unbroken year-by-year and day-by-day visual timeline from 1919/1948 to 2 June 2014 with historical map era notes.',
    pagesApprox: 'Master Timeline Ledger'
  },
  {
    id: 'EXP-F',
    code: 'F',
    slug: 'F_Rapid_One_Minute_Revision_Sheets',
    title: 'F. Rapid Revision & Confusion-Eliminator Sheets',
    subtitle: 'High-density 60-second revision panels, all 12 Never-Confuse Comparison Matrices, mnemonics, and Act 2014 Schedules table.',
    pagesApprox: 'Last-24-Hours Sprint Book'
  },
  {
    id: 'EXP-G',
    code: 'G',
    slug: 'G_Verified_PYQ_and_Practice_Question_Bank',
    title: 'G. Verified PYQ & Practice Question Bank',
    subtitle: '38 Official TSLPRB PYQs strictly separated from 12 Analytical Model Questions, with 4-option distractor-by-distractor explanations.',
    pagesApprox: 'Annotated Question Bank'
  },
  {
    id: 'EXP-H',
    code: 'H',
    slug: 'H_Final_Mock_Tests_SI_and_Constable_2026',
    title: 'H. Final Mock Tests (Separate SI & Constable Sets)',
    subtitle: 'Dedicated 2026-pattern SI Mock Paper (3-Phase Explicit Syllabus, 20%/25% neg) and PC Mock Paper ("Contents pertaining to Telangana", 20% neg) with OMR keys.',
    pagesApprox: 'Exam Simulation Booklet'
  }
];

export {
  SYLLABUS_INTELLIGENCE,
  SOURCES_LIBRARY,
  HISTORICAL_DISCREPANCIES,
  PERSONALITIES,
  COMMITTEES,
  RELATIONSHIP_CHAINS,
  WHO_IS_WHO_TRAPS,
  CONFUSION_PAIRS,
  PYQ_ANALYTICS_METADATA,
  FLASHCARDS_BANK,
  CHRONOLOGY_CHALLENGES
};
