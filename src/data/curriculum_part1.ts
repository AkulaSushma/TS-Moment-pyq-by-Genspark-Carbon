// Ten-Day Intelligent Learning Curriculum (Section 5, Section 7 [A–N], Section 9, Section 10)
// Covers Pre-1948 Roots + Phase I (1948–1970) + Phase II (1971–1990) + Phase III (1991–2014) + Day 10 Consolidation

export interface CauseEffectChain {
  background: string;
  problem: string;
  demand: string;
  action: string;
  response: string;
  result: string;
  nextDevelopment: string;
}

export interface FactualMemoryCard {
  label: string;
  value: string;
  category: 'Date' | 'Place' | 'Person' | 'Committee' | 'GO/Article' | 'Formula/Report';
}

export interface ActiveRecallPrompt {
  id: string;
  prompt: string;
  answer: string;
  hint: string;
}

export interface DayTopicLesson {
  id: string; // T1..T10
  dayNumber: number;
  title: string;
  subtitle: string;
  phase: 'PHASE-I' | 'PHASE-II' | 'PHASE-III' | 'SYNTHESIS';
  phaseLabel: string;
  yearSpan: string;
  priorityBadge: 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'FOUNDATION';
  priorityEvidence: string;
  siSyllabusMapping: string;
  pcSyllabusMapping: string;
  learningObjectives: string[];
  // Section 7 Architecture (A to N):
  bigPicture: string; // A. 3-5 simple sentences
  historicalBackground: string; // B. What was happening before?
  whyItHappened: {
    political: string;
    economic: string;
    administrative: string;
    socialCultural: string;
  }; // C. Multi-dimensional causes
  chronologicalNarrative: {
    date: string;
    eventTitle: string;
    detail: string;
    place: string;
    isPre1948Background?: boolean;
  }[]; // D. Detailed chronological explanation
  personIds: string[]; // E. Linked personality cards
  committeeIds: string[]; // E. Linked committee cards
  locations: {
    place: string;
    region: string;
    coords: [number, number]; // [lat, lng] for Interactive Telangana Map
    significance: string;
  }[]; // F. Location-based understanding
  causeEffect: CauseEffectChain; // G. 7-step causal chain
  factualCards: FactualMemoryCard[]; // H. Compact factual memory cards
  whyExaminersAsk: string; // I. Examination relevance & PYQ pattern
  confusionPairIds: string[]; // J. Common confusion eliminators
  memoryLocks: {
    mnemonic: string;
    visualAssociation: string;
    timelineAnchor: string;
    storyRecall: string;
    shortSentence: string;
  }; // K. Memory-lock mechanism
  activeRecall: ActiveRecallPrompt[]; // L. Questions asked BEFORE answers
  oneMinuteRevision: string[]; // N. High-density 60-second revision bullets
  revisionAssignment: string;
  sourceIds: string[];
}

export const CURRICULUM_DAYS_1_TO_5: DayTopicLesson[] = [
  {
    id: 'T1',
    dayNumber: 1,
    title: 'Hyderabad State, Integration (1948), Mulki Roots & 1952 Mulki Agitation',
    subtitle: 'From the 1919 Nizam Farman & Operation Polo to the City College Firing & Burgula Ministry',
    phase: 'PHASE-I',
    phaseLabel: 'Phase I: The Idea of Telangana (1948–1970) [with separated Pre-1948 Roots]',
    yearSpan: '1868 / 1919 (Roots) | 1948–1952',
    priorityBadge: 'HIGH PRIORITY',
    priorityEvidence: 'Directly tested in SI 2022 (s2022-167), SI 2023 (s2023d-186, s2023d-200), PC 2016 (p2016-200, p2016f-147), PC 2018 (p2018-173), PC 2022 (p2022-172).',
    siSyllabusMapping: 'CORE DIRECT — Phase I Unit 1: Idea of Telangana (1948–1970). Note: Pre-1948 Mulki (1868/1919) & Armed Struggle context clearly separated from post-1948 official SI timeline.',
    pcSyllabusMapping: 'HIGH DIRECT — Covered under "Contents pertaining to the State of Telangana" (Asaf Jahi reforms, Operation Polo, Armed Struggle & 1952 Mulki Commission frequently asked in PC).',
    learningObjectives: [
      'Distinguish Pre-1948 Mulki origins (1868 Salar Jung I circular vs 1919 Osman Ali Khan Farman) from post-1948 administrative changes.',
      'Trace Operation Polo (13–17 Sep 1948) → Maj. Gen. J.N. Chaudhuri (Military Rule) → M.K. Vellodi (Civilian ICS Rule) → Burgula Ramakrishna Rao (Elected Rule, Mar 1952).',
      'Explain why a school-transfer protest in Warangal (July 1952) erupted into the 3–4 September 1952 Hyderabad City College firing and the Justice P. Jaganmohan Reddy Inquiry.'
    ],
    bigPicture:
      'Princely Hyderabad State joined the Indian Union on 17 September 1948 through Operation Polo after 224 years of Asaf Jahi rule. Because Urdu had been the administrative language of Hyderabad, the post-1948 military and interim civilian administrations imported thousands of English-knowing officials from Madras Presidency (Coastal Andhra) and Bombay. When locals saw outsiders taking jobs protected since 1919 by Mulki domicile rules — often using fake Mulki certificates — students in Warangal and Hyderabad launched the historic 1952 "Idli-Sambar Go Back / Non-Mulki Go Back" agitation, planting the very first post-1948 seed of Telangana self-protection.',
    historicalBackground:
      'PRE-1948 ROOTS (Separated from Official 1948–70 Period): Under Prime Minister Salar Jung I (Mir Turab Ali Khan), administrative modernization brought North Indian & British-province recruits ("Ghair-Mulkis"), causing local ("Mulki") resentment as early as 1868 (tested in PC 2016 Q.200) and the 1888 Gazette under 6th Nizam Mahbub Ali Khan. In 1919 (1329 Fasli), 7th Nizam Mir Osman Ali Khan issued a binding Farman (Appendix-N, Hyderabad Civil Service Regulations) defining a Mulki strictly by birth, marriage, or 15 years continuous permanent residence (signing an affidavit never to return to native land). Meanwhile, Osmania University (Farman: 26 April 1917, PC 2022 Q.172) nurtured an educated Telangana middle class, while the Telangana Peasant Armed Struggle (1946–21 Oct 1951, PC 2018 Q.173) shattered feudal Jagirdari/Deshmukh oppression.',
    whyItHappened: {
      political: 'Refusal of 7th Nizam to accede in Aug 1947, Razakar atrocities (Qasim Razvi), murder of Imroz editor Shoebullah Khan (22 Aug 1948, SI 2022 Q.176), leading to Operation Polo (13–17 Sep 1948).',
      economic: 'Abolition of Sarf-e-Khas & Jagirdari freed huge state revenues, yet lucrative public jobs went to imported officials rather than qualified Hyderabad youth.',
      administrative: 'Maj. Gen. J.N. Chaudhuri (1948–49) and ICS Chief Minister M.K. Vellodi (1949–52) brought over 5,000+ personnel from Madras, Mysore, and Bombay on deputation to run English-medium administration.',
      socialCultural: 'Cultural arrogance of newly arrived officials towards Telangana dialect, Urdu-educated graduates, and local customs provoked humiliation ("Non-Mulki Go Back").'
    },
    chronologicalNarrative: [
      {
        date: '1868 & 1888 [Pre-1948 Root]',
        eventTitle: 'First Mulki Safeguard Orders',
        detail: 'Salar Jung I ordered priority for Mulkis in 1868; 6th Nizam Mahbub Ali Khan reinforced domicile rules in the 1888 Jarida (Gazette).',
        place: 'Hyderabad',
        isPre1948Background: true
      },
      {
        date: '26 April 1917 & 1919 [Pre-1948 Root]',
        eventTitle: 'Osmania University Farman & 1919 Mulki Farman',
        detail: '7th Nizam Mir Osman Ali Khan issued the OU founding Farman (1917) and the 1919 Mulki Farman mandating 15-year permanent residence for public employment.',
        place: 'Hyderabad',
        isPre1948Background: true
      },
      {
        date: '13–17 September 1948',
        eventTitle: 'Operation Polo ("Police Action") & Integration',
        detail: 'Indian Army under Southern Command (Lt. Gen. Rajendrasinhji; 1st Armoured Division led by Maj. Gen. J.N. Chaudhuri) entered Hyderabad on 13 Sep; Nizam broadcast ceasefire on 17 Sep 1948 (ceremonial surrender by Maj. Gen. El Edroos on 18 Sep).',
        place: 'Hyderabad / Secunderabad'
      },
      {
        date: '18 Sep 1948 – 6 Dec 1949',
        eventTitle: 'Military Administration of Maj. Gen. J.N. Chaudhuri',
        detail: 'J.N. Chaudhuri ruled as Military Governor; Sarf-e-Khas merged & Jagirdari Abolition Regulation issued (Aug 1949); mass import of external civil/police staff began.',
        place: 'Hyderabad State'
      },
      {
        date: '6 Dec 1949 – 6 Mar 1952',
        eventTitle: 'Vellodi Civilian Administration & Part-B Statehood',
        detail: 'ICS officer M.K. Vellodi appointed Chief Minister; on 26 Jan 1950 Hyderabad became a Part-B State with Mir Osman Ali Khan as Rajpramukh, and Article 35(b) kept pre-1950 Mulki rules alive.',
        place: 'Hyderabad'
      },
      {
        date: '21 October 1951 & March 1952',
        eventTitle: 'Withdrawal of Armed Struggle & Burgula Elected Ministry',
        detail: 'Telangana Sayudha Porata Samithi withdrew armed struggle on 21 Oct 1951 (PDF swept Nalgonda/Warangal in 1952 polls; Ravi Narayana Reddy won record votes). Congress won majority in 175-seat Hyderabad Assembly; Burgula Ramakrishna Rao sworn in as First Elected CM on 6 March 1952.',
        place: 'Hyderabad State (16 Districts: 8 Telangana, 5 Marathwada, 3 Karnataka)'
      },
      {
        date: '26 July – August 1952',
        eventTitle: 'Warangal Student Walkout — Spark of 1952 Mulki Agitation',
        detail: 'Divisional Inspector of Schools (Parthasarathy, a non-Mulki) transferred ~180 Mulki teachers in Warangal and brought non-Mulkis. Students formed Action Committee in Warangal on 26 July 1952 chanting "Non-Mulki Go Back!". Simultaneously, G. Ramachari founded Hyderabad Hitarakshana (Protection) Samithi (SI 2022 Q.167 & SI 2023 Q.186).',
        place: 'Warangal'
      },
      {
        date: '3–4 September 1952',
        eventTitle: 'City College & Afzalgunj Police Firing, Hyderabad',
        detail: 'Defying prohibitory orders of Police Commissioner Shiv Kumar Lal, thousands of students marched from City College towards Pathergatti/Afzalgunj on 3 Sep (and again 4 Sep). Police firing killed 8 protestors and injured scores.',
        place: 'City College, Hyderabad'
      },
      {
        date: 'September – 28 December 1952',
        eventTitle: 'Justice Pingali Jaganmohan Reddy Inquiry Commission',
        detail: 'Burgula Govt appointed Justice P. Jaganmohan Reddy to probe the firing (report submitted 28 Dec 1952), confirming student anger over bogus Mulki certificates.',
        place: 'Hyderabad'
      }
    ],
    personIds: ['P-OSMAN', 'P-VELLODI', 'P-BURGULA', 'P-JAGANMOHAN', 'P-JAYASHANKAR'],
    committeeIds: ['C-JAGANMOHAN'],
    locations: [
      { place: 'Warangal High School / Fort', region: 'North Telangana', coords: [17.9689, 79.5941], significance: 'Birthplace of July 1952 Student Mulki Agitation (young K. Jayashankar participated).' },
      { place: 'Govt City College & Pathergatti', region: 'Hyderabad', coords: [17.3685, 78.4712], significance: 'Site of 3–4 September 1952 police firing probed by Justice Jaganmohan Reddy.' },
      { place: 'Secunderabad (5th Mile / Trimulgherry)', region: 'Hyderabad', coords: [17.4399, 78.4983], significance: 'Operation Polo surrender ceremony of El Edroos to Maj. Gen. J.N. Chaudhuri (Sep 1948).' }
    ],
    causeEffect: {
      background: '1919 Nizam Mulki Farman guaranteed Hyderabad jobs for 15-year permanent residents.',
      problem: 'Post-1948 Chaudhuri & Vellodi administrations imported thousands of non-Mulki staff using English-language excuse & fake domicile certificates.',
      demand: 'Strict enforcement of Mulki Rules & repatriation of non-Mulki employees ("Non-Mulki Go Back").',
      action: 'July 1952 Warangal student strike spread to Hyderabad City College procession on 3–4 Sep 1952.',
      response: 'Police firing killed students; CM Burgula appointed Justice Pingali Jaganmohan Reddy Inquiry Committee.',
      result: 'Exposed widespread Mulki violations & proved deep Telangana sensitivity toward job protection even BEFORE AP existed.',
      nextDevelopment: 'When Andhra State formed in Oct 1953, SRC (Fazal Ali) cited this exact 1952 distrust to oppose immediate Telangana-Andhra merger!'
    },
    factualCards: [
      { label: 'Salar Jung I Mulki Priority Order', value: '1868', category: 'Date' },
      { label: '7th Nizam Mulki Farman', value: '1919 (15-Year Residence Rule)', category: 'GO/Article' },
      { label: 'Operation Polo Culmination', value: '13–17 September 1948', category: 'Date' },
      { label: 'Military → ICS → Elected CM Sequence', value: 'J.N. Chaudhuri (48) → M.K. Vellodi (49) → Burgula (Mar 1952)', category: 'Person' },
      { label: 'Founder of Hyderabad Protection (Hitarakshana) Samithi', value: 'G. Ramachari (Ramachary)', category: 'Person' },
      { label: '1952 City College Police Firing', value: '3–4 September 1952 (Probed by Justice P. Jaganmohan Reddy)', category: 'Committee' }
    ],
    whyExaminersAsk:
      'Examiners love Day 1 because it tests whether you know Telangana’s employment struggle began in 1952 INSIDE Hyderabad State (4 years BEFORE AP formed!). Note how G. Ramachari ("Hyderabad Protection / Hitarakshana Samithi") was asked TWICE in back-to-back SI papers (SI 2022 Q.167 & SI 2023 Q.186)!',
    confusionPairIds: ['CMP-01'],
    memoryLocks: {
      mnemonic: 'CVB-52: Chaudhuri (48 Military) → Vellodi (49 ICS) → Burgula (52 Elected).',
      visualAssociation: 'Picture City College arches on the banks of Musi in Sep 1952 with Justice Jaganmohan’s gavel stamped "15-Year Mulki Shield".',
      timelineAnchor: '1919 (Farman) → 1948 (Polo) → 1952 (Mulki Stir & Burgula).',
      storyRecall: 'One school inspector (Parthasarathy) transferring teachers in Warangal lit a match in July 1952 that reached City College Hyderabad by 3 September 1952.',
      shortSentence: 'Ramachari guarded Hitarakshana, Warangal sparked July 52, City College bled Sep 3, Jaganmohan judged Dec 52.'
    },
    activeRecall: [
      { id: 'AR-1-1', prompt: 'Who founded the "Hyderabad Protection Samithi" (Hyderabad Hitarakshana Samithi)?', answer: 'G. Ramachari (asked in both SI 2022 & SI 2023!).', hint: 'Think of a lawyer-activist whose name starts with Rama-.' },
      { id: 'AR-1-2', prompt: 'List the three heads of Hyderabad administration in exact order from Sep 1948 to Oct 1956.', answer: '1. Maj. Gen. J.N. Chaudhuri (Military Governor, Sep 1948–Dec 1949) → 2. M.K. Vellodi, ICS (CM, Dec 1949–Mar 1952) → 3. Burgula Ramakrishna Rao (1st Elected CM, Mar 1952–Oct 1956).', hint: 'Mnemonic: CVB.' },
      { id: 'AR-1-3', prompt: 'Which judicial commission investigated the 3–4 September 1952 Mulki agitation firing in Hyderabad?', answer: 'Justice Pingali Jaganmohan Reddy Commission (submitted report on 28 Dec 1952).', hint: 'Tested in PC Mains 2016.' }
    ],
    oneMinuteRevision: [
      '1868: Salar Jung I first ordered Mulki priority; 1919: 7th Nizam Osman Ali Khan issued Mulki Farman (birth or 15 yrs residence).',
      '13–17 Sep 1948: Operation Polo integrated Hyderabad State; 21 Oct 1951: Telangana Peasant Armed Struggle formally withdrawn.',
      'Admin Order: J.N. Chaudhuri (1948–49) → M.K. Vellodi ICS (1949–52) → Burgula Ramakrishna Rao (6 Mar 1952, 1st Elected CM).',
      '26 Jul 1952: Warangal student anti-Non-Mulki stir began; G. Ramachari founded Hyderabad Hitarakshana Samithi.',
      '3–4 Sep 1952: City College / Afzalgunj firing; probed by Justice P. Jaganmohan Reddy Committee.'
    ],
    revisionAssignment: 'Complete 5 Day-1 PYQs + reconstruct the 1948–1952 sequence in Chronology Builder.',
    sourceIds: ['SRC-04', 'SRC-09', 'SRC-10']
  },
  {
    id: 'T2',
    dayNumber: 2,
    title: 'SRC (Fazal Ali), Gentlemen’s Agreement, 1956 Merger & Telangana Regional Committee',
    subtitle: 'Why Fazal Ali Warned "Wait Till 1961", the 8 Signatories at Hyderabad House, and Immediate Safeguard Breaches',
    phase: 'PHASE-I',
    phaseLabel: 'Phase I: The Idea of Telangana (1948–1970)',
    yearSpan: '1953–1968',
    priorityBadge: 'HIGH PRIORITY',
    priorityEvidence: 'Extremely high PYQ density: SI 2022 (s2022-168, s2022-174, s2022-178, s2022-179), PC 2016 (p2016-190), PC 2018 (p2018-177), PC 2019 (p2019f-191).',
    siSyllabusMapping: 'CORE DIRECT — Phase I: SRC, Gentlemen’s Agreement, Formation of AP (1 Nov 1956), TRC & Violation of Safeguards.',
    pcSyllabusMapping: 'HIGH DIRECT — Repeatedly tested in PC (1956 Agreement signatories, assertion-reason on seeds of movement, 1st TRC President Achutha Reddy).',
    learningObjectives: [
      'Contrast Fazal Ali SRC Report Paras 369–388 (separate Telangana till 1961 + 2/3rd vote) with the actual political decision to merge in 1956.',
      'Memorize all 8 Signatories of the Gentlemen’s Agreement (20 Feb 1956), Home Minister G.B. Pant’s role, and the 14 safeguards.',
      'Track how breaches of the Agreement (no Telangana Dy CM, surplus diversion, weak TRC under K. Achutha Reddy) created the 1969 explosion.'
    ],
    bigPicture:
      'After Potti Sriramulu’s fast created Andhra State (capital: Kurnool) on 1 October 1953, Andhra leaders campaigned for "Visalandhra" to unite all Telugu speakers with prosperous Hyderabad as capital. However, the States Reorganisation Commission (SRC) led by Justice Fazal Ali carefully studied Telangana’s finances and fears, recommending on 30 September 1955 that Telangana remain a SEPARATE state until at least 1961! Overriding SRC under Central pressure, 4 Telangana and 4 Andhra leaders signed the 14-point Gentlemen’s Agreement on 20 February 1956, merging Telangana into Andhra Pradesh on 1 November 1956 — only for its core safeguards to be broken from the very first day.',
    historicalBackground:
      'Andhra State (carved out of Madras Presidency on 1 Oct 1953) suffered a chronic revenue deficit (partly due to Prohibition) and lacked a grand capital city. By contrast, Telangana (8 Telugu districts of Hyderabad State) generated rich excise/abkari surpluses and possessed Hyderabad’s world-class infrastructure, secretariat, hospitals, and Osmania University. While the Communist Party and Andhra Congress pushed "Visalandhra", Hyderabad PCC President K.V. Ranga Reddy and Dr. Marri Chenna Reddy forcefully demanded a Separate Telangana State before the SRC.',
    whyItHappened: {
      political: 'PM Nehru (initially skeptical of Visalandhra imperialism in his Nizamabad speech, later persuaded by Govind Ballabh Pant & Congress High Command) wanted a single large southern Congress stronghold and feared Communist influence in a smaller Telangana.',
      economic: 'Andhra sought Hyderabad’s excise surpluses and Godavari/Krishna basin command; Telangana feared its excise revenue would be spent on Coastal delta projects while prohibition might ruin local toddy-tappers.',
      administrative: 'Telangana literacy was ~9–10% (due to historic Urdu-medium transition) versus much higher English literacy in Coastal districts, creating acute fear of losing clerk, teacher, and secretariat jobs.',
      socialCultural: 'Fear of land alienation around Hyderabad/Nizam Sagar to wealthier deltaic migrants and neglect of Telangana dialect/identity (even the Joint Select Committee dropped the promised name "Andhra-Telangana" for "Andhra Pradesh").'
    },
    chronologicalNarrative: [
      {
        date: '1 October 1953',
        eventTitle: 'Formation of Andhra State (Kurnool Capital)',
        detail: 'Separate Andhra State formed from Madras with Tanguturi Prakasam Pantulu as 1st CM (later Bezawada Gopala Reddy in 1955), intensifying the Visalandhra campaign.',
        place: 'Kurnool'
      },
      {
        date: '22 December 1953 – 30 September 1955',
        eventTitle: 'Fazal Ali Commission (SRC) Inquiry & Historic Report',
        detail: 'Justice Syed Fazal Ali (Chair), H.N. Kunzru & K.M. Panikkar submitted report on 30 Sep 1955. Paras 369–388 recommended splitting Hyderabad State linguistically BUT keeping residuary Hyderabad (Telangana) SEPARATE for 5 years — merging after 1961 elections ONLY if 2/3rd of Hyderabad Legislature agreed!',
        place: 'New Delhi / Hyderabad'
      },
      {
        date: 'November–December 1955',
        eventTitle: 'Hyderabad Assembly Debate on SRC Report',
        detail: 'In the 174-member Hyderabad Assembly debate, while Marathwada/Karnataka MLAs favoured joining Bombay/Mysore, opinions among Telangana MLAs were sharply divided; Burgula Ramakrishna Rao eventually yielded to High Command.',
        place: 'Hyderabad Assembly'
      },
      {
        date: '20 February 1956',
        eventTitle: 'Signing of the Gentlemen’s Agreement (14 Points)',
        detail: 'Brokered by Union Home Minister Govind Ballabh Pant at Hyderabad House, New Delhi. Signed by 4 Telangana leaders (Burgula Ramakrishna Rao, K.V. Ranga Reddy, Dr. M. Chenna Reddy, J.V. Narsing Rao) and 4 Andhra leaders (B. Gopala Reddy, Neelam Sanjeeva Reddy, Gouthu Latchanna, Alluri Satyanarayana Raju). Note: Damodaram Sanjeevaiah was NOT a signatory (SI 2022 Q.179)!',
        place: 'Hyderabad House, New Delhi'
      },
      {
        date: '10 August 1956 & 1 November 1956',
        eventTitle: 'Parliament Safeguards Note & Formation of Andhra Pradesh',
        detail: 'Tabled as "Note on Safeguards proposed for Telangana Area" (10 Aug 1956). On 1 Nov 1956, Andhra Pradesh was inaugurated by PM Nehru. Neelam Sanjeeva Reddy became 1st CM and immediately violated the Agreement by refusing to appoint a Telangana Deputy CM, mocking the post as a "sixth finger to a hand" (SI 2022 Q.178)!',
        place: 'Hyderabad'
      },
      {
        date: 'December 1957 & 1 February 1958',
        eventTitle: 'Public Employment Act (1957) & Telangana Regional Committee (1958)',
        detail: 'Parliament enacted Public Employment (Requirement as to Residence) Act, 1957 (operationalized Mar 1959, reducing 15-yr Mulki rule to 15 yrs/12 yrs statutory residence under Sec 3). On 1 Feb 1958, Telangana Regional Committee (TRC) was formed under Art 371(1) with K. Achutha Reddy as First Chairman (PC 2016 Q.190).',
        place: 'New Delhi & Hyderabad'
      },
      {
        date: '1956–1968',
        eventTitle: '12 Years of Systematic Violations',
        detail: 'Separate TPCC abolished early; Telangana excise surpluses diverted; Pochampadu (SRSP) & Rajolibanda (RDS) truncated while Nagarjuna Sagar right-canal prioritized; thousands of non-Mulkis appointed via bogus nativity certificates issued by Tahsildars.',
        place: 'Telangana Region'
      }
    ],
    personIds: ['P-FAZAL', 'P-BURGULA', 'P-KVRANGA', 'P-CHENNAREDDY', 'P-ACHUTHA'],
    committeeIds: ['C-SRC', 'C-GENTLEMEN', 'C-TRC'],
    locations: [
      { place: 'Hyderabad House, New Delhi', region: 'National Capital', coords: [28.6156, 77.2303], significance: 'Venue where the 8 leaders signed the Gentlemen’s Agreement on 20 February 1956.' },
      { place: 'Nizamabad', region: 'North Telangana', coords: [18.6725, 78.0941], significance: 'Where PM Nehru initially remarked against "expansionist imperialism" of Visalandhra before reversing stance.' },
      { place: 'AP Legislative Assembly (Public Gardens)', region: 'Hyderabad', coords: [17.3998, 78.4686], significance: 'Seat of the Telangana Regional Committee (1958, K. Achutha Reddy 1st Chairman).' }
    ],
    causeEffect: {
      background: 'Andhra State (1953) sought prosperous Hyderabad capital; SRC (1955) warned Telangana needed at least 5 years of separate statehood.',
      problem: 'Congress High Command pushed immediate unification despite Telangana’s fear of fiscal and job domination.',
      demand: 'Binding constitutional & political guarantees before Telangana consented to merge.',
      action: '8 leaders signed the 14-Point Gentlemen’s Agreement on 20 Feb 1956 under Home Minister G.B. Pant.',
      response: 'AP formed on 1 Nov 1956; TRC formed in Feb 1958, but CM Neelam Sanjeeva Reddy rejected Dy CM ("sixth finger") and surpluses/Mulki rules were flouted.',
      result: 'Deep alienation among Telangana youth, teachers, and TNGOs between 1956 and 1968.',
      nextDevelopment: 'In January 1969, anger over non-Mulki jobs at KTPS Palvancha ignited the massive 1969 Jai Telangana Agitation!'
    },
    factualCards: [
      { label: 'SRC Appointment & Submission', value: '22 Dec 1953 → 30 Sep 1955 (Fazal Ali, Kunzru, Panikkar)', category: 'Committee' },
      { label: 'SRC Telangana Recommendation', value: 'Separate State till 1961; merge only by 2/3rd Assembly vote', category: 'Formula/Report' },
      { label: 'Gentlemen’s Agreement Date & Venue', value: '20 February 1956, Hyderabad House, New Delhi', category: 'Date' },
      { label: 'Union Home Minister at 1956 Signing', value: 'Govind Ballabh Pant (SI 2022 Q.174)', category: 'Person' },
      { label: '8 Signatories (4 TG + 4 Andhra)', value: 'TG: Burgula, KV Ranga, Chenna, JV Narsing | AP: Gopala, Sanjeeva, Latchanna, Alluri', category: 'Person' },
      { label: '"Dy CM is a Sixth Finger" Quote', value: 'Neelam Sanjeeva Reddy (SI 2022 Q.178)', category: 'Person' },
      { label: '1st President of Telangana Regional Committee', value: 'K. Achutha Reddy (1958, PC 2016 Q.190)', category: 'Person' }
    ],
    whyExaminersAsk:
      'SI Prelims 2022 asked FOUR separate questions from this single lesson alone (Date: 20 Feb 1956; Home Minister: G.B. Pant; Non-signatory: Damodaram Sanjeevaiah; "Sixth Finger" quote: Neelam Sanjeeva Reddy)! Memorizing the exact 8 signatories guarantees easy marks.',
    confusionPairIds: ['CMP-01', 'CMP-02', 'CMP-03'],
    memoryLocks: {
      mnemonic: '4 TG Signatories = "B-R-C-N" (Burgula, Ranga Reddy, Chenna Reddy, Narsing Rao); 4 Andhra = "G-S-L-A" (Gopala Reddy, Sanjeeva Reddy, Latchanna, Alluri). Note: NO Damodaram Sanjeevaiah! (He became CM in 1960 and actually appointed KV Ranga Reddy as Dy CM!).',
      visualAssociation: 'Fazal Ali holding a "1961 Stop Sign", bypassed by 8 Gentlemen shaking hands at Hyderabad House while Neelam hides a "6th Finger" behind his back.',
      timelineAnchor: 'Dec 1953 (SRC) → Sep 1955 (SRC Report) → 20 Feb 1956 (Gentlemen) → 1 Nov 1956 (AP Merger) → Feb 1958 (TRC).',
      storyRecall: 'What SRC tried to prevent in 1955 came true in 1956: without statehood, paper promises crumbled.',
      shortSentence: '20 Feb 56: 8 Gentlemen under Pant signed 14 points, broken on Nov 1 when Sanjeeva called Dy CM a 6th finger.'
    },
    activeRecall: [
      { id: 'AR-2-1', prompt: 'Name all 4 Andhra signatories to the Gentlemen’s Agreement — and who is the famous Dalit CM often placed as a trap distractor?', answer: 'Signatories: Bezawada Gopala Reddy, Neelam Sanjeeva Reddy, Sardar Gouthu Latchanna, Alluri Satyanarayana Raju. Trap distractor (NOT a signatory): Damodaram Sanjeevaiah!', hint: 'Mnemonic: G-S-L-A.' },
      { id: 'AR-2-2', prompt: 'What exact condition did Fazal Ali’s SRC prescribe for any future merger of Telangana with Andhra?', answer: 'Telangana (residuary Hyderabad) should remain a separate state for 5 years, merging after the 1961 General Elections ONLY if 2/3rds of the Hyderabad State Legislature voted in favour.', hint: 'Year + fraction.' },
      { id: 'AR-2-3', prompt: 'Who served as the first Chairman (President) of the Telangana Regional Committee in 1958?', answer: 'K. Achutha Reddy.', hint: 'Asked in PC 2016.' }
    ],
    oneMinuteRevision: [
      'SRC (22 Dec 1953 – 30 Sep 1955): Fazal Ali (Chair), H.N. Kunzru, K.M. Panikkar — opposed immediate merger; advised separate Telangana till 1961 (2/3rd vote).',
      'Gentlemen’s Agreement (20 Feb 1956, Hyderabad House, HM G.B. Pant): 14 points; 4 TG (BRCN) + 4 Andhra (GSLA). Damodaram Sanjeevaiah NOT a signatory.',
      'Key Clauses: 12-yr domicile, separate surplus budget, TRC, 60:40 Cabinet, CM/Dy CM reciprocity, separate TPCC till 1962.',
      '1 Nov 1956: AP formed; 1st CM Neelam Sanjeeva Reddy refused Dy CM calling it "sixth finger to a hand" (KV Ranga Reddy became Dy CM only in 1959).',
      '1 Feb 1958: Telangana Regional Committee constituted under Art 371(1); 1st Chairman = K. Achutha Reddy.'
    ],
    revisionAssignment: 'Drill Comparison Matrices CMP-02 & CMP-03 and test all 8 Signatories in Flashcards.',
    sourceIds: ['SRC-04', 'SRC-06', 'SRC-09', 'SRC-10']
  },
  {
    id: 'T3',
    dayNumber: 3,
    title: '1969 Jai Telangana Movement, TPS, Student Martyrs & Eight-Point Formula',
    subtitle: 'From KTPS Palvancha & Khammam Hunger Strike to 369+ Martyrs, Wanchoo/Bhargava Committees & 1971 Election Sweep',
    phase: 'PHASE-I',
    phaseLabel: 'Phase I: The Idea of Telangana (1948–1970 [extending to 1971 TPS Verdict])',
    yearSpan: '1968–1971',
    priorityBadge: 'HIGH PRIORITY',
    priorityEvidence: 'Tested heavily across SI 2022 (s2022-175, s2022-183), SI 2023 (s2023d-154, s2023d-162, s2023d-184, s2023d-193), PC 2016 (p2016f-148), PC 2018 (p2018-178, p2018-182), PC 2019 (p2019f-189).',
    siSyllabusMapping: 'CORE DIRECT — Culmination of Phase I (1969 Agitation, Osmania University, TPS, Eight-Point Formula).',
    pcSyllabusMapping: 'HIGH DIRECT — 1969 fasts, observance days, Wanchoo Chair, and TPS conversion date (July 1970) directly asked in PC.',
    learningObjectives: [
      'Reconstruct the exact month-by-month 1969 escalation from KTPS/Khammam (Jan) → All-Party Accord & GO 36 → SC Strike-down (28 Mar) → 8-Point Formula (11 Apr).',
      'Differentiate Ananthula Madan Mohan (Founder-President of TPS, Feb 1969) from Dr. Marri Chenna Reddy (TPS President from May 1969 & 1971 10-MP victor).',
      'Memorize 1969 Observance Days (PC 2018 Q.178) and distinguish Kumar Lalit, Justice Bhargava, and Justice Wanchoo.'
    ],
    bigPicture:
      'Twelve years of broken Gentlemen’s Agreement promises boiled over on 8 January 1969 when student Annabathula Ravindranath went on an indefinite fast in Khammam protesting illegal non-Mulki jobs at Kothagudem Thermal Power Station (KTPS). Within days, Osmania University students split between "Safeguards Implementation" and outright "Separate Telangana" — and when the Supreme Court struck down statutory Mulki protection on 28 March 1969, the entire region united behind Separate Statehood! Despite severe repression leaving ~369 protestors dead and Indira Gandhi’s conciliatory Eight-Point Formula (11 April 1969), Telangana Praja Samithi swept 10 of 14 Lok Sabha seats in 1971.',
    historicalBackground:
      'On 10 July 1968, Telangana Non-Gazetted Officers (TNGOs led by K.R. Amos) observed "Telangana Safeguards Day". At Kothagudem Thermal Power Station (KTPS, Palvancha), A. Sree Ramadas exposed that nearly almost all clerical/technical posts had gone to non-locals (SI 2022 Q.183), and AP High Court rulings complicated Mulki enforcement.',
    whyItHappened: {
      political: 'Arrogant dismissal of TRC complaints under CM Kasu Brahmananda Reddy and marginalization of Telangana Congress leaders.',
      economic: 'Diversion of ₹28.34+ crores of Telangana excise/revenue surpluses and starvation of Pochampadu/Nizam Sagar irrigation.',
      administrative: 'Over 4,000–6,000 non-Mulkis appointed directly on bogus certificates; then on 28 March 1969, SC struck down Sec 3 of Public Employment Act, 1957 (A.V.S. Narasimha Rao v. State of AP), wiping out even G.O. 36!',
      socialCultural: 'Emergence of the first post-1956 Osmania University student generation facing acute educated unemployment in their own capital.'
    },
    chronologicalNarrative: [
      {
        date: '8 January 1969',
        eventTitle: 'Annabathula Ravindranath’s Indefinite Fast at Khammam',
        detail: 'B.A. student Ravindranath launched indefinite hunger strike at Khammam (backed by Kolishetti Ramadasu & poet Kaloji) demanding Telangana safeguards & removal of non-Mulkis at KTPS.',
        place: 'Khammam / Palvancha'
      },
      {
        date: '13–15 January 1969',
        eventTitle: 'Osmania University Student Action Committee Splits into Two Wings',
        detail: 'At Nizam College / OU, Student Action Committee formed: Mallikarjun (Osmania Medical student) led the "Separate Telangana" wing, while Venkatrami Reddy initially led "Safeguards Implementation". Soon Separate Statehood became universal.',
        place: 'Osmania University, Hyderabad'
      },
      {
        date: '19 January & 21 January 1969',
        eventTitle: 'All-Party Accord, G.O. Ms. No. 36 & Shamshabad/Shadnagar Firing',
        detail: 'CM K. Brahmananda Reddy convened All-Party Meeting on 18–19 Jan; issued G.O. 36 on 21 Jan ordering repatriation of non-Mulkis by 28 Feb 1969 & naming Kumar Lalit to audit surpluses. In Shadnagar/Sadasivpet police firing (20/24 Jan), 17-year-old Shankar became the FIRST martyr of the 1969 movement!',
        place: 'Hyderabad / Shadnagar / Sadasivpet'
      },
      {
        date: 'February – 8–9 March 1969',
        eventTitle: 'Formation of Telangana Praja Samithi (TPS) & Reddy Hostel Convention',
        detail: 'Advocate Ananthula Madan Mohan founded Telangana People’s Convention in Feb 1969, renamed Telangana Praja Samithi (TPS) with Madan Mohan as Founder-President (SI 2023 Q.162 & Q.184). Massive two-day convention held at Raja Bahadur Venkatrama Reddy Hostel (8–9 Mar 1969) inaugurated by Ravindranath; Sadasivpet Municipality passed first civic resolution for Separate Telangana.',
        place: 'Reddy Hostel, Abids, Hyderabad'
      },
      {
        date: '27–28 March 1969',
        eventTitle: 'Konda Laxman Bapuji Resigns & Supreme Court Strikes Down Mulki Act!',
        detail: 'On 27 March, Information Minister Konda Laxman Bapuji became the FIRST Minister to resign for Telangana and founded Telangana Congress Samithi (SI 2023 Q.154). Next day (28 March 1969), Supreme Court struck down Sec 3 of Public Employment Act, 1957 AND G.O. 36 as unconstitutional under Art 16(3)!',
        place: 'Hyderabad & New Delhi'
      },
      {
        date: '11 April 1969',
        eventTitle: 'PM Indira Gandhi Announces Eight-Point Formula',
        detail: 'To stem the uprising, PM Indira Gandhi announced the 8-Point Formula in Lok Sabha, setting up Justice K.N. Wanchoo Committee (19 Apr, Mulki law) and Justice V. Bhargava Committee (22 Apr, Surpluses = ₹28.34 Cr). Rejected by TPS!',
        place: 'New Delhi'
      },
      {
        date: 'April – July 1969',
        eventTitle: 'Key 1969 Protest Observance Days & Chenna Reddy Enters TPS',
        detail: '22 April = Telangana Vanchana Dinam (Betrayal Day); 1 May = Telangana Korikala Dinam (Demands Day); 17 May = Martyrs Day; 22 May = Dr. Marri Chenna Reddy elected TPS President (Sreedhar Reddy formed parallel TPS); 4 June = PM Indira Gandhi midnight visit to Hyderabad; 12 July = Telangana Pathaka Dinam (Flag Day) [Tested in PC 2018 Q.178!]. Over 369 youths martyred across 1969.',
        place: 'Hyderabad & Telangana Districts'
      },
      {
        date: 'July 1970 → March 1971 → 18 Sep 1971',
        eventTitle: 'TPS Becomes Political Party, Wins 10/14 MP Seats, & Merges into Congress',
        detail: 'TPS converted into a political party in July 1970 (PC 2018 Q.182). Won Siddipet (Madan Mohan) & Khairatabad (Nagam Krishna Rao) Assembly by-polls, then swept 10 out of 14 Telangana Lok Sabha seats in March 1971 (SI 2022 Q.175)! After Indira Gandhi promised change of CM & fair deal, Chenna Reddy merged TPS into Congress on 18 Sep 1971, and P.V. Narasimha Rao became CM on 30 Sep 1971.',
        place: 'Telangana'
      }
    ],
    personIds: ['P-RAVINDRANATH', 'P-MADANMOHAN', 'P-CHENNAREDDY', 'P-BAPUJI', 'P-WANCHOO', 'P-BHARGAVA'],
    committeeIds: ['C-8POINT', 'C-WANCHOO', 'C-BHARGAVA'],
    locations: [
      { place: 'Khammam & Palvancha (KTPS)', region: 'East Telangana', coords: [17.2473, 80.1514], significance: 'KTPS non-local jobs exposed by Sree Ramadas; Ravindranath started indefinite fast on 8 Jan 1969.' },
      { place: 'Osmania University Arts College', region: 'Hyderabad', coords: [17.4179, 78.5287], significance: 'Nerve centre of 1969 Student Action Committee (Mallikarjun).' },
      { place: 'Gun Park (Telangana Martyrs Memorial)', region: 'Opposite AP Assembly, Hyderabad', coords: [17.4015, 78.4694], significance: 'Monument sculpted by Ekka Yadagiri Rao (initiated by Greater Hyderabad Mayor Laxminarayana Mudiraj in Feb 1970) honouring the 369 martyrs of 1969.' }
    ],
    causeEffect: {
      background: '1956–1968 non-Mulki appointments & diversion of Telangana surpluses.',
      problem: 'KTPS non-local jobs + 28 March 1969 Supreme Court judgment invalidating G.O. 36 & Sec 3 of Public Employment Act.',
      demand: 'Shifted irreversibly from "Implement Safeguards" (Jan 69) to "Separate Telangana State" (Mar 69).',
      action: '9-month student strike, TNGO 36-day strike, Konda Laxman Bapuji resignation, TPS mass Satyagraha.',
      response: 'Police/CRPF firings (~369 martyrs) + Indira Gandhi’s 8-Point Formula (11 Apr 1969: Wanchoo & Bhargava).',
      result: 'TPS converted to party (Jul 1970) and won 10/14 Lok Sabha seats in March 1971.',
      nextDevelopment: 'TPS merged with Congress (Sep 1971), Brahmananda Reddy resigned, and Telangana’s P.V. Narasimha Rao became CM — setting up the 1972 Mulki & Jai Andhra crisis!'
    },
    factualCards: [
      { label: 'KTPS Non-Local Jobs Exposer & First Faster', value: 'Sree Ramadas (Exposer) | Annabathula Ravindranath (Fast, 8 Jan 1969)', category: 'Person' },
      { label: 'TPS Founder-President vs Later President', value: 'A. Madan Mohan (Feb 69) vs Dr. M. Chenna Reddy (May 69)', category: 'Person' },
      { label: '1st Minister to Resign (27 Mar 1969)', value: 'Konda Laxman Bapuji (founded Telangana Congress Samithi)', category: 'Person' },
      { label: 'Eight-Point Formula & Twin Committees', value: '11 Apr 1969 | Wanchoo (Mulki Law) & Bhargava (₹28.34 Cr Surpluses)', category: 'Committee' },
      { label: '1969 Observance Days', value: '22 Apr Vanchana | 1 May Korikala | 12 Jul Pathaka (Flag) Dinam', category: 'Date' },
      { label: 'Gun Park Martyrs Memorial Sculptor', value: 'Ekka Yadagiri Rao (honouring 369 martyrs)', category: 'Place' },
      { label: 'TPS Political Body & 1971 Lok Sabha Tally', value: 'July 1970 | Won 10 out of 14 MP seats', category: 'Date' }
    ],
    whyExaminersAsk:
      '1969 is the single richest Phase-I mine for tricky distinction MCQs: Madan Mohan vs Chenna Reddy, Wanchoo vs Bhargava, Sree Ramadas vs Ravindranath, and exact 1969 Observance Days (PC 2018 Q.178 tested "Telangana Porata Dinotsavam – 7 March" as the WRONG pair!).',
    confusionPairIds: ['CMP-04', 'CMP-05', 'CMP-08'],
    memoryLocks: {
      mnemonic: '1969 Days "V-K-P": Apr 22 Vanchana → May 1 Korikala (May Day = Demands!) → Jul 12 Pathaka (Flag).',
      visualAssociation: 'Gun Park Black Granite Stupa with 9 bullet holes & lotus designed by Ekka Yadagiri Rao standing across the Assembly.',
      timelineAnchor: '8 Jan 69 (Fast) → 19 Jan (Accord) → 28 Mar (SC Strike-down) → 11 Apr (8-Point) → Jul 70 (TPS Party) → Mar 71 (10 MPs).',
      storyRecall: 'When the Court killed GO 36 on 28 March 1969, Safeguards died and Separate Statehood took full command.',
      shortSentence: 'Ravindranath fasted Jan 8, Madan founded TPS, Bapuji quit Mar 27, Indira gave 8 points Apr 11, TPS won 10 MPs in 71.'
    },
    activeRecall: [
      { id: 'AR-3-1', prompt: 'Who founded Telangana Praja Samithi in 1969, and when did TPS officially change from a non-political body into a political party?', answer: 'Founder-President: Ananthula Madan Mohan; changed into a political body in July 1970 (under Dr. M. Chenna Reddy).', hint: 'Both facts are verified TSLPRB PYQs!' },
      { id: 'AR-3-2', prompt: 'Which association did Konda Laxman Bapuji found immediately after resigning his Ministership in March 1969?', answer: 'Telangana Congress Samithi (SI Mains 2023 Q.154).', hint: 'Do not confuse with Telangana Praja Samithi.' },
      { id: 'AR-3-3', prompt: 'How many Lok Sabha seats did Telangana Praja Samithi win in the 1971 General Elections?', answer: '10 out of 14 Telangana Lok Sabha seats (SI Prelims 2022 Q.175).', hint: 'Double-digit round number.' }
    ],
    oneMinuteRevision: [
      '8 Jan 1969: Annabathula Ravindranath began indefinite fast at Khammam (KTPS violations first exposed by A. Sree Ramadas).',
      '19 Jan 1969 All-Party Accord → G.O. 36 (21 Jan) & Kumar Lalit audit; Shankar = 1st martyr in Jan 1969 firing.',
      'Feb 1969: A. Madan Mohan founded TPS (Dr. M. Chenna Reddy became President on 22 May 1969; political party in July 1970).',
      '27 Mar 1969: Konda Laxman Bapuji resigned ministership (founded Telangana Congress Samithi); 28 Mar 1969: SC struck down Sec 3 of Public Employment Act & G.O. 36.',
      '11 Apr 1969: Indira Gandhi’s 8-Point Formula → Wanchoo Committee (Mulki law) & Bhargava Committee (₹28.34 Cr surpluses).',
      'Mar 1971: TPS won 10/14 Lok Sabha seats; merged into Congress (18 Sep 1971); P.V. Narasimha Rao became CM (30 Sep 1971).'
    ],
    revisionAssignment: 'Practice Chronology Drill on 1969–1973 events (SI 2023 Q.193) and review Who-Is-Who Trap WIW-02 & WIW-03.',
    sourceIds: ['SRC-04', 'SRC-08', 'SRC-10']
  },
  {
    id: 'T4',
    dayNumber: 4,
    title: '1971–1973 Judicial Twist, Five-Point Formula, Jai Andhra & Six-Point Formula',
    subtitle: 'How the 3 Oct 1972 Supreme Court Verdict Revived 1919 Mulki Rules — Only for the Six-Point Formula to Abolish Both Mulki & TRC!',
    phase: 'PHASE-II',
    phaseLabel: 'Phase II: Mobilisation Phase (1971–1990)',
    yearSpan: '1971–1973',
    priorityBadge: 'HIGH PRIORITY',
    priorityEvidence: 'Tested directly in SI 2023 (s2023d-193), PC 2016 (p2016f-149), PC 2019 (p2019f-194).',
    siSyllabusMapping: 'CORE DIRECT — Opening units of Phase II: Mobilisation Phase (1971–1990): Mulki Judgments, Jai Andhra, Six-Point Formula.',
    pcSyllabusMapping: 'HIGH DIRECT — PC Mains repeatedly tests formula chronology (8→5→6→PO) and what was/wasn’t inside the Six-Point Formula.',
    learningObjectives: [
      'Master the 4-step judicial seesaw on Mulki Rules (1969 SC Strike-down → Dec 1970 HC Valid → Feb 1972 HC Full Bench Invalid → 3 Oct 1972 SC Valid!).',
      'Contrast PM Indira Gandhi’s Five-Point Formula (27 Nov 1972: 1977/1980 Mulki sunset) with the Six-Point Formula (21 Sep 1973).',
      'Identify the two historic losses Telangana suffered under the Six-Point Formula: repeal of Mulki Rules and abolition of Telangana Regional Committee.'
    ],
    bigPicture:
      'After P.V. Narasimha Rao became Andhra Pradesh’s first Telangana-born Chief Minister in September 1971, a dramatic legal twist shook the state: on 3 October 1972, a 5-judge Supreme Court bench ruled that the Nizam’s original 1919 Mulki Rules had NEVER expired and remained valid constitutional law under Article 35(b)! Shocked that Andhra migrants could be treated as non-locals in capital Hyderabad, Coastal and Rayalaseema leaders launched the fierce "Jai Andhra" agitation (1972–73). PM Indira Gandhi’s compromise Five-Point Formula (Nov 1972) failed to calm Andhra, leading to President’s Rule (Jan 1973) and finally the Six-Point Formula (21 September 1973) — which ended the crisis by abolishing Telangana’s 54-year-old Mulki Rules and 15-year-old Regional Committee!',
    historicalBackground:
      'When the Supreme Court struck down Parliament’s 1957 Public Employment Act on 28 March 1969, Telangana lawyers raised a brilliant constitutional question: if the 1957 Act repealing old Mulki rules was itself unconstitutional, didn’t the pre-1950 Nizam Mulki Rules automatically survive under Article 35(b) of the Constitution? Conflicting benches of the AP High Court gave opposite rulings between 1970 and February 1972, pushing the State Government under CM P.V. Narasimha Rao to appeal to the Supreme Court.',
    whyItHappened: {
      political: 'Coastal landlord & political elites were simultaneously angered by CM P.V. Narasimha Rao’s radical Land Ceiling Act (1972) and his refusal to dilute Mulki protections.',
      economic: 'Fear among Andhra middle classes of losing educational seats and Secretariat/capital employment in Hyderabad.',
      administrative: 'Paralysis of civil administration across Coastal districts during the 110-day NGO strike and resignation of 9 Andhra ministers led by Deputy CM B.V. Subba Reddy.',
      socialCultural: 'Feeling among Andhra agitators of becoming "second-class citizens in our own state capital" versus Telangana’s insistence that 1919 Mulki law was its sole shield.'
    },
    chronologicalNarrative: [
      {
        date: '30 September 1971 & May 1972',
        eventTitle: 'P.V. Narasimha Rao Ministry & Radical Land Ceiling Reforms',
        detail: 'P.V. Narasimha Rao took oath as CM (30 Sep 1971), retained majority in March 1972 Assembly polls, gave greater representation to BC/SC/Telangana MLAs, and passed the historic AP Land Reforms (Ceiling on Agricultural Holdings) Act in Sep 1972.',
        place: 'Hyderabad'
      },
      {
        date: '14 Feb 1972 → 3 October 1972',
        eventTitle: 'Supreme Court Upholds Mulki Rules (Director of Industries v. V. Venkata Reddy)',
        detail: 'Reversing a 4:1 AP High Court bench ruling of Feb 1972, a 5-Judge Constitution Bench of the Supreme Court ruled unanimously on 3 October 1972 that the 1919 Nizam Mulki Rules continued in force as valid law under Article 35(b)!',
        place: 'Supreme Court, New Delhi'
      },
      {
        date: 'October 1972 – January 1973',
        eventTitle: 'Eruption of the Jai Andhra Movement',
        detail: 'Students at Guntur/Vijayawada/Waltair and Andhra NGOs launched the "Jai Andhra" movement demanding abolition of Mulki Rules or creation of a Separate Andhra State (led by B.V. Subba Reddy, Kakani Venkataratnam, Tenneti Viswanatham, Gouthu Latchanna).',
        place: 'Guntur, Vijayawada, Visakhapatnam & Tirupati'
      },
      {
        date: '27 November 1972 & 23 December 1972',
        eventTitle: 'PM Indira Gandhi’s Five-Point Formula & Mulki Rules Act, 1972',
        detail: 'Indira Gandhi announced the Five-Point Formula (27 Nov 1972), enacted as the Mulki Rules Act on 23 Dec 1972: Mulki rules would EXPIRE at end of Dec 1977 in Hyderabad/Secunderabad and end of Dec 1980 in the rest of Telangana! Both regions felt cheated; Kakani Venkataratnam died on 25 Dec 1972 and Jai Andhra intensified.',
        place: 'New Delhi & Vijayawada'
      },
      {
        date: '10 January & 18 January 1973',
        eventTitle: 'Resignation of CM P.V. Narasimha Rao & Imposition of President’s Rule',
        detail: 'P.V. Narasimha Rao resigned on 10 Jan 1973; President’s Rule imposed under Art 356 for the FIRST time in AP on 18 Jan 1973 (Governor Khandubhai Desai assisted by tough Principal Advisor H.C. Sarin).',
        place: 'Hyderabad'
      },
      {
        date: '21 September 1973',
        eventTitle: 'Announcement of the Historic Six-Point Formula',
        detail: 'Central Govt unveiled the Six-Point Formula: (1) State Planning Board for backward areas; (2) Local preference in admissions + Central University in Hyderabad; (3) Local preference in non-gazetted/junior gazetted jobs; (4) Administrative Tribunal; (5) Constitutional Amendment; (6) Repeal of BOTH Mulki Rules and Telangana Regional Committee!',
        place: 'New Delhi'
      },
      {
        date: '10 December 1973 & December 1973',
        eventTitle: 'J. Vengala Rao Becomes CM & 32nd Constitutional Amendment Passed',
        detail: 'President’s Rule lifted on 10 Dec 1973 with Jalagam Vengala Rao (from Khammam district) as consensus CM; Parliament enacted the 32nd Amendment Act inserting Articles 371-D & 371-E and repealing Mulki Rules.',
        place: 'Hyderabad & New Delhi'
      }
    ],
    personIds: ['P-PVNR', 'P-CHENNAREDDY'],
    committeeIds: ['C-5POINT', 'C-6POINT'],
    locations: [
      { place: 'Supreme Court of India', region: 'New Delhi', coords: [28.6223, 77.2395], significance: '3 Oct 1972 verdict (Venkata Reddy case) validating 1919 Mulki Rules under Art 35(b).' },
      { place: 'Vijayawada / Guntur', region: 'Coastal Andhra', coords: [16.5062, 80.6480], significance: 'Epicentre of 1972–73 Jai Andhra Movement (Kakani Venkataratnam, Andhra Praja Parishad).' },
      { place: 'University of Hyderabad (Gachibowli)', region: 'Hyderabad', coords: [17.4567, 78.3264], significance: 'Central University established in 1974 under Point 2 of Six-Point Formula & Article 371-E.' }
    ],
    causeEffect: {
      background: 'TPS merged with Congress (Sep 1971) & P.V. Narasimha Rao became first Telangana CM of AP.',
      problem: '3 Oct 1972 Supreme Court judgment upheld 1919 Mulki Rules permanently under Art 35(b).',
      demand: 'Andhra agitators demanded "Scrap Mulki Rules in Capital OR Give Separate Andhra State!"',
      action: 'Jai Andhra Movement paralyzed Coastal Andhra; Five-Point Formula (27 Nov 1972: 1977/1980 sunset) rejected.',
      response: 'PVNR resigned; President’s Rule imposed (18 Jan 1973, Advisor H.C. Sarin); Centre brokered Six-Point Formula (21 Sep 1973).',
      result: 'Telangana lost BOTH its historic 1919 Mulki Rules AND its 1958 Telangana Regional Committee in exchange for state-wide "Local Candidate" zonalization.',
      nextDevelopment: '32nd Constitutional Amendment inserted Article 371-D (1 Jul 1974), leading to the 18 October 1975 Presidential Order.'
    },
    factualCards: [
      { label: 'SC Judgment Upholding Mulki Rules', value: '3 October 1972 (Director of Industries v. V. Venkata Reddy)', category: 'Date' },
      { label: 'Five-Point Formula & Sunset Dates', value: '27 Nov 1972 (Dec 1977 Twin Cities | Dec 1980 Telangana)', category: 'Formula/Report' },
      { label: 'First President’s Rule in AP', value: '18 Jan 1973 – 10 Dec 1973 (Advisor: H.C. Sarin)', category: 'Date' },
      { label: 'Six-Point Formula Date', value: '21 September 1973', category: 'Formula/Report' },
      { label: 'What Six-Point Formula ABOLISHED', value: 'Mulki Rules + Telangana Regional Committee (TRC)', category: 'Formula/Report' },
      { label: 'Exam Trap: Was "Two High Courts" in 6-Point Formula?', value: 'NO! (PC 2019 Q.194 — It created Central Univ Hyderabad, NOT two High Courts)', category: 'Formula/Report' }
    ],
    whyExaminersAsk:
      'Look at PC Mains 2016 (p2016f-149: Arrange 8-Point, 5-Point, 6-Point, Presidential Order) and PC Mains 2019 (p2019f-194: Which was NOT part of Six-Point Formula → "Two separate High Courts"). Students who memorize "8-5-6" and the exact 6 clauses never lose a mark here.',
    confusionPairIds: ['CMP-04', 'CMP-05', 'CMP-06'],
    memoryLocks: {
      mnemonic: 'Formula Sequence "8 - 5 - 6 - P.O.": 8-Point (Apr 69) → 5-Point (Nov 72) → 6-Point (Sep 73) → Presidential Order (Oct 75).',
      visualAssociation: 'A pendulum swinging: 1969 SC swung against Telangana → 1972 SC swung FOR Telangana → 1973 Six-Point Formula cut the Mulki rope altogether!',
      timelineAnchor: '3 Oct 72 (SC Upholds) → 27 Nov 72 (5-Point) → 18 Jan 73 (President’s Rule) → 21 Sep 73 (6-Point).',
      storyRecall: 'Ironically, Telangana’s biggest courtroom victory (3 Oct 1972) provoked the political counter-wave that erased Mulki Rules forever in Sep 1973.',
      shortSentence: 'Oct 72 SC upheld Mulki, Nov 72 5-Point set 77/80 sunset, Sep 73 6-Point traded Mulki & TRC for Art 371-D & Central Univ.'
    },
    activeRecall: [
      { id: 'AR-4-1', prompt: 'Arrange in strict chronological order: Six-Point Formula, Eight-Point Formula, Presidential Order, Five-Point Formula.', answer: '1. Eight-Point Formula (11 Apr 1969) → 2. Five-Point Formula (27 Nov 1972) → 3. Six-Point Formula (21 Sep 1973) → 4. Presidential Order (18 Oct 1975).', hint: '8 → 5 → 6 → PO (PC 2016 Q.149).' },
      { id: 'AR-4-2', prompt: 'What were the two sunset expiry years fixed for Mulki safeguards in PM Indira Gandhi’s Five-Point Formula (1972)?', answer: 'End of December 1977 for Hyderabad & Secunderabad; end of December 1980 for the rest of Telangana.', hint: '1977 and 1980.' },
      { id: 'AR-4-3', prompt: 'Which two Telangana-specific institutions/safeguards were abolished by Point 6 of the Six-Point Formula?', answer: 'Mulki Rules and the Telangana Regional Committee (TRC).', hint: 'Born in 1919 and 1958 respectively.' }
    ],
    oneMinuteRevision: [
      '30 Sep 1971: P.V. Narasimha Rao became 1st Telangana-born CM of AP; passed 1972 Land Ceiling Act.',
      '3 Oct 1972: 5-Judge SC bench UPHELD 1919 Nizam Mulki Rules under Art 35(b) (Venkata Reddy case), sparking Jai Andhra agitation.',
      '27 Nov 1972: Indira Gandhi’s Five-Point Formula (Mulki Rules Act, 23 Dec 1972) set expiry at Dec 1977 (Capital) & Dec 1980 (Telangana).',
      '18 Jan 1973: PVNR resignation followed by 1st President’s Rule in AP (Advisor H.C. Sarin).',
      '21 Sep 1973: Six-Point Formula announced — Planning Board, Central Univ Hyderabad, Local Cadres, Admin Tribunal, 32nd Amendment, AND abolished Mulki Rules + TRC (NO two High Courts!).'
    ],
    revisionAssignment: 'Test yourself on CMP-04 & CMP-05 side-by-side matrices.',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-08', 'SRC-10']
  },
  {
    id: 'T5',
    dayNumber: 5,
    title: 'Article 371-D, 32nd Amendment & Presidential Order of 1975 (Zonal System)',
    subtitle: 'Zones V & VI, Local Candidate 4-Year Study Rule, Quotas (80/70/60) & the Explosive Para 14 "Free Zone" Loophole',
    phase: 'PHASE-II',
    phaseLabel: 'Phase II: Mobilisation Phase (1971–1990)',
    yearSpan: '1973–1986 (with 2009 Clause 14f Link)',
    priorityBadge: 'HIGH PRIORITY',
    priorityEvidence: 'Foundational legal spine of Phase II & Phase III: tested via Presidential Order chronology (PC 2016 Q.149), Zones V & VI, Para 14f, and P. Sambamurthy v. AP.',
    siSyllabusMapping: 'CORE DIRECT — Phase II: Constitutional developments relating to Article 371-D, Presidential Order of 1975, Local cadre safeguards.',
    pcSyllabusMapping: 'MEDIUM-HIGH — Key constitutional facts (Art 371-D vs 371-E, Zones V & VI, 1975 year) appear in General Studies Polity + Telangana sections.',
    learningObjectives: [
      'Distinguish Article 371-D (Equitable opportunities & Administrative Tribunal) from Article 371-E (Central University in Hyderabad), both inserted by the 32nd Constitutional Amendment Act, 1973.',
      'Master the structure of the 18 October 1975 Presidential Order: 6 Zones (Telangana = Zone V & Zone VI), 4-year consecutive study rule, and 80%/70%/60% reservation percentages.',
      'Understand Paragraph 14 exemptions — especially Para 14(f) (Hyderabad City Police), which exploded in October 2009 as the "Free Zone" trigger for KCR’s fast!'
    ],
    bigPicture:
      'To give ironclad constitutional immunity to the Six-Point Formula so courts could not strike it down under Article 16, Parliament passed the 32nd Constitutional Amendment Act, 1973, inserting Articles 371-D and 371-E (effective 1 July 1974). Exercising power under Article 371-D, President Fakhruddin Ali Ahmed issued the Andhra Pradesh Public Employment (Organisation of Local Cadres and Regulation of Direct Recruitment) Order on 18 October 1975. It divided AP into 6 Zones (with Telangana split into Zone V and Zone VI) and reserved 60%–80% of district/zonal jobs for "Local Candidates" — yet built-in loopholes in Paragraph 14 (exempting Secretariat, HoDs, and Hyderabad City Police) quietly reopened the backdoor for massive non-local recruitment.',
    historicalBackground:
      'In 1969, Justice K.N. Wanchoo had warned that ordinary Parliamentary laws reserving jobs for part of a state violated Article 16(2)/(3). Therefore, when Mulki Rules were repealed in 1973, Telangana needed an explicit overriding Article in Part XXI of the Constitution ("Special Provisions with respect to the State of Andhra Pradesh"). Clause (10) of Article 371-D explicitly gave the Presidential Order overriding effect ("non-obstante clause") over every other provision of the Constitution!',
    whyItHappened: {
      political: 'Need to operationalize the September 1973 Six-Point Formula under CM Jalagam Vengala Rao’s administration.',
      economic: 'Competition for expanding public-sector, irrigation, police, and district secretariat employment in the 1970s.',
      administrative: 'Replacing historical birth/15-year domicile ("Mulki") with school-study-based Zonal & District Cadres across all three regions (Coastal Andhra, Rayalaseema, Telangana).',
      socialCultural: 'Educational migration into Hyderabad meant a 4-year schooling definition ("Local Candidate") was far easier for non-Telangana families to acquire than the old 15-year Nizam Mulki domicile!'
    },
    chronologicalNarrative: [
      {
        date: 'December 1973 → 1 July 1974',
        eventTitle: '32nd Constitutional Amendment Act Enters into Force',
        detail: 'Amended Art 371(1) (deleting Telangana Regional Committee reference) and inserted Article 371-D (employment/education local cadres + AP Administrative Tribunal) and Article 371-E (Parliament may by law establish a Central University in AP -> University of Hyderabad Act, 1974). Effective 1 July 1974.',
        place: 'Parliament of India, New Delhi'
      },
      {
        date: '18 October 1975 (AP G.O.P. No. 674 on 20 Oct 1975)',
        eventTitle: 'Issuance of the Presidential Order, 1975',
        detail: 'President Fakhruddin Ali Ahmed promulgated G.S.R. 524(E) on 18 Oct 1975; republished by AP Government as G.O.P. No. 674 on 20 Oct 1975, requiring state departments to organize local cadres within 27 months.',
        place: 'New Delhi & Hyderabad'
      },
      {
        date: '1975 Zonal Architecture',
        eventTitle: 'Six Zones of Andhra Pradesh (Zones V & VI = Telangana)',
        detail: 'Zone I (Srikakulam, Vizianagaram, Visakhapatnam); Zone II (East Godavari, West Godavari, Krishna); Zone III (Guntur, Prakasam, Nellore); Zone IV (Chittoor, Cuddapah, Anantapur, Kurnool — Rayalaseema); ZONE V (Adilabad, Karimnagar, Warangal, Khammam — North Telangana); ZONE VI (Hyderabad, Ranga Reddy [formed Aug 1978], Nizamabad, Mahbubnagar, Medak, Nalgonda — South Telangana & Capital).',
        place: 'Andhra Pradesh (6 Zones)'
      },
      {
        date: '1975 Quotas & Para 14 Exemptions',
        eventTitle: '80% / 70% / 60% Local Quotas vs Paragraph 14 Exemptions',
        detail: 'Local Candidate = studied 4 consecutive academic years ending with qualifying exam (or resided 4/7 yrs if didn’t study). Quotas: 80% in District Cadre (LDC/typist/equivalent), 70% in Zonal Non-Gazetted, 60% in Zonal Specified Gazetted. Remaining 20%/30%/40% = "Open/Unreserved" (open to BOTH locals on merit + non-locals, though often abused as "non-local quota"!). Para 14 exempted: (a) Secretariat, (b) Offices of Heads of Departments, (c) Special Offices/Establishments, (d) State-level Institutions, (e) Major Development Projects, and (f) Hyderabad City Police!',
        place: 'Hyderabad'
      },
      {
        date: '20 December 1986',
        eventTitle: 'P. Sambamurthy v. State of Andhra Pradesh (Supreme Court Strike-Down of Clause 5)',
        detail: 'Under Art 371-D(5) Proviso, the State Government had been given shockingly arbitrary power to annul or modify final orders of the AP Administrative Tribunal! A 5-judge SC bench led by CJI P.N. Bhagwati struck down Art 371-D(5) & its proviso as violating the Basic Structure ("Rule of Law").',
        place: 'Supreme Court, New Delhi'
      }
    ],
    personIds: ['P-PVNR', 'P-JAYABHARAT', 'P-GIRGLANI'],
    committeeIds: ['C-6POINT', 'C-PRESORDER75'],
    locations: [
      { place: 'Warangal / Karimnagar (Zone V HQ belt)', region: 'Zone V (North Telangana)', coords: [18.4386, 79.1288], significance: 'Comprised Adilabad, Karimnagar, Warangal & Khammam under the 1975 Presidential Order.' },
      { place: 'Hyderabad City Police Commissionerate (Purani Haveli / Basheerbagh)', region: 'Zone VI (Capital)', coords: [17.4021, 78.4765], significance: 'Exempted under Para 14(f) — led directly to the 9 Oct 2009 Supreme Court "Free Zone" judgment that triggered KCR’s Nov 2009 fast!' }
    ],
    causeEffect: {
      background: 'Six-Point Formula (Sep 1973) abolished Mulki Rules & TRC and promised local preference.',
      problem: 'Ordinary laws reserving jobs by residence were barred under Art 16(3) without a special constitutional amendment.',
      demand: 'Constitutional shield + concrete zonal rules for education and public jobs.',
      action: '32nd Amendment Act inserted Art 371-D & 371-E (effective 1 Jul 1974); President issued 1975 Order (18 Oct 1975).',
      response: 'AP split into 6 Zones (Telangana = Zones V & VI) with 4-year study definition & 80/70/60% local reservations.',
      result: 'Para 14 exemptions (Secretariat, HoDs, Projects, Hyderabad City Police) + bureaucratic manipulation allowed 58,962 non-locals into Zones V & VI within 10 years!',
      nextDevelopment: 'Massive TNGO protests against these exact violations forced CM N.T. Rama Rao to appoint the Jayabharat Reddy Committee & issue G.O. 610 in 1985.'
    },
    factualCards: [
      { label: 'Constitutional Amendment for Art 371-D & 371-E', value: '32nd Amendment Act, 1973 (Effective 1 July 1974)', category: 'GO/Article' },
      { label: 'Art 371-D vs Art 371-E', value: '371-D = Equitable Jobs/Education & Tribunal | 371-E = Central Univ', category: 'GO/Article' },
      { label: 'Presidential Order Date & AP G.O.', value: '18 Oct 1975 (G.S.R. 524E) | 20 Oct 1975 (G.O.P. No. 674)', category: 'GO/Article' },
      { label: 'Telangana Zones in 1975 Order', value: 'Zone V (Adilabad, KNR, WGL, KMM) & Zone VI (HYD, RR, NZB, MBNR, MDK, NLG)', category: 'Place' },
      { label: 'Local Candidate Study Requirement & Quotas', value: '4 Consecutive Years (out of 7) | 80% Dist / 70% Zonal NG / 60% Gazetted', category: 'Formula/Report' },
      { label: 'Clause 5 Struck Down Case (1986)', value: 'P. Sambamurthy v. State of AP (violated Rule of Law / Basic Structure)', category: 'Formula/Report' }
    ],
    whyExaminersAsk:
      'For Police SI & Constable aspirants, Paragraph 14(f) of the 1975 Presidential Order is EXTRA special: it specifically concerned Sub-Inspector (SI) recruitment in Hyderabad City Police ("Free Zone" dispute)! Expect statement-based MCQs testing Zones V vs VI, 80/70/60 quotas, and 371-D vs 371-E.',
    confusionPairIds: ['CMP-06', 'CMP-07'],
    memoryLocks: {
      mnemonic: 'Zone V = "A-K-W-K" (4 Northern Godavari belt districts: Adilabad, Karimnagar, Warangal, Khammam); Zone VI = Remaining 6 Southern/Central Telangana districts including Hyderabad & Ranga Reddy.',
      visualAssociation: 'Three stair-steps of Local Quotas: 80% (District) → 70% (Zonal Non-Gazetted) → 60% (Specified Gazetted), with a leaky backdoor labelled "Para 14 Exemptions".',
      timelineAnchor: '21 Sep 73 (6-Point) → 1 Jul 74 (32nd Amend in force) → 18 Oct 75 (Presidential Order) → 1986 (Sambamurthy Case).',
      storyRecall: '15 years of permanent Mulki domicile (1919) shrunk to just 4 years of school study (1975), with Hyderabad City Police left open under Para 14(f).',
      shortSentence: '32nd Amendment birthed 371-D; 18 Oct 1975 Order put Telangana in Zones V & VI with 80-70-60 quotas & Para 14 loopholes.'
    },
    activeRecall: [
      { id: 'AR-5-1', prompt: 'Which four Telangana districts formed Zone V under the 1975 Presidential Order?', answer: 'Adilabad, Karimnagar, Warangal, and Khammam (Mnemonic: AKWK).', hint: 'All four northern/eastern Godavari-belt districts.' },
      { id: 'AR-5-2', prompt: 'What is the exact difference between Article 371-D and Article 371-E?', answer: 'Article 371-D deals with equitable opportunities in public employment/education and the AP Administrative Tribunal; Article 371-E empowers Parliament to establish a Central University in Andhra Pradesh (University of Hyderabad).', hint: 'Both came via the 32nd Amendment Act, 1973.' },
      { id: 'AR-5-3', prompt: 'Which Paragraph & sub-clause of the 1975 Presidential Order exempted Hyderabad City Police, sparking the 2009 "Free Zone" SI recruitment agitation?', answer: 'Paragraph 14(f).', hint: 'Number 14.' }
    ],
    oneMinuteRevision: [
      '32nd Constitutional Amendment Act, 1973 (in force 1 Jul 1974): Inserted Art 371-D (Local Cadres + Admin Tribunal) & Art 371-E (Central Univ Hyderabad).',
      '18 Oct 1975: Presidential Order issued (AP G.O.P. 674 on 20 Oct 1975) dividing AP into 6 Zones.',
      'Telangana = Zone V (Adilabad, Karimnagar, Warangal, Khammam) + Zone VI (Hyderabad, Ranga Reddy, Nizamabad, Mahbubnagar, Medak, Nalgonda).',
      'Local Candidate = 4 consecutive academic years study preceding qualifying exam; Quotas = 80% District, 70% Zonal Non-Gazetted, 60% Specified Gazetted.',
      'Para 14 exempted Secretariat, HoDs, Major Projects, State-level bodies & Para 14(f) Hyderabad City Police.',
      'P. Sambamurthy v. State of AP (1986): SC struck down Art 371-D(5) government veto over Tribunal orders.'
    ],
    revisionAssignment: 'Complete Mid-Course Checkpoint (Days 1–5) and review Zone V vs Zone VI districts on the Interactive Telangana Map.',
    sourceIds: ['SRC-04', 'SRC-07']
  }
];
