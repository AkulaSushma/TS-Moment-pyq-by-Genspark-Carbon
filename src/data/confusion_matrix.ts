// Special Confusion-Elimination Module (Section 8)
// Visual Comparison Tables: WHAT IT IS | WHEN | WHY | WHO | PURPOSE | RESULT | HOW TO IDENTIFY IN MCQ

export interface ComparisonRow {
  conceptA: string;
  conceptB: string;
  conceptC?: string;
}

export interface ConfusionPair {
  id: string;
  title: string;
  phase: 'PHASE-I' | 'PHASE-II' | 'PHASE-III' | 'CROSS-PHASE';
  dayNumber: number;
  entities: string[];
  trapAlert: string;
  matrix: {
    dimension: 'WHAT IT IS' | 'WHEN' | 'WHY' | 'WHO' | 'PURPOSE' | 'RESULT' | 'HOW TO IDENTIFY IN MCQ';
    values: string[];
  }[];
  mnemonicLock: string;
  sourceIds: string[];
}

export const CONFUSION_PAIRS: ConfusionPair[] = [
  {
    id: 'CMP-01',
    title: 'Mulki Rules (1919 Farman) vs Gentlemen’s Agreement (1956)',
    phase: 'PHASE-I',
    dayNumber: 1,
    entities: ['Mulki Rules (1919 Farman)', 'Gentlemen’s Agreement (1956)'],
    trapAlert: 'Aspirants confuse residence duration (15 years under 1919 Farman vs 12 years proposed in 1956 Agreement) and legal nature (Sovereign Statutory Rule vs Political Pact).',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Sovereign Civil Service Domicile Regulation (Appendix-N, Hyderabad Civil Service Regulations).', '14-Point political & administrative accord signed prior to AP formation.'] },
      { dimension: 'WHEN', values: ['1919 Farman (39th Hijri / 1329 Fasli; roots in 1868 Salar Jung I circular & 1888 Gazette).', '20 February 1956 at Hyderabad House, New Delhi.'] },
      { dimension: 'WHY', values: ['Influx of non-local (Ghair-Mulki) officials from British provinces & North India taking Hyderabad jobs.', 'To overcome SRC’s warning against immediate merger and reassure Telangana leaders.'] },
      { dimension: 'WHO', values: ['7th Nizam Mir Osman Ali Khan.', '8 Signatories (4 Telangana: Burgula, KV Ranga Reddy, M. Chenna Reddy, JV Narsing Rao; 4 Andhra: B. Gopala Reddy, N. Sanjeeva Reddy, G. Latchanna, A. Satyanarayana Raju) under HM G.B. Pant.'] },
      { dimension: 'PURPOSE', values: ['Reserve Hyderabad State posts for Mulkis (by birth, spouse, or 15 years continuous residence).', 'Safeguard Telangana surplus revenue, 12-year domicile jobs, TRC, 60:40 Cabinet, & Dy CM post.'] },
      { dimension: 'RESULT', values: ['Saved post-1950 under Art 35(b); upheld by SC on 3 Oct 1972; repealed via 32nd Amendment (1973).', 'Partially codified (TRC Order 1958 & Public Employment Act 1957), but core promises (Dy CM, surpluses) violated immediately.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['Keywords: "1919 Farman", "15 years residence", "Article 35(b)", "Salar Jung I (1868)".', 'Keywords: "20 Feb 1956", "Hyderabad House", "14 Points", "12 years domicile", "8 Signatories".'] }
    ],
    mnemonicLock: '1919 Nizam = 15 Years Law; 1956 Delhi Gentlemen = 14 Points & 12 Years Pact.',
    sourceIds: ['SRC-04', 'SRC-08', 'SRC-10']
  },
  {
    id: 'CMP-02',
    title: 'Gentlemen’s Agreement (1956) vs Telangana Regional Committee (1958)',
    phase: 'PHASE-I',
    dayNumber: 2,
    entities: ['Gentlemen’s Agreement (1956)', 'Telangana Regional Committee (TRC, 1958)'],
    trapAlert: 'Gentlemen’s Agreement is the political parent blueprint; TRC is the statutory legislative body born two years later from Point 9 of that Agreement.',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Bipartite political agreement (tabled as a Note on Safeguards in Parliament on 10 Aug 1956).', 'Statutory Legislative Committee inside AP Assembly created by Presidential Order under Article 371(1).'] },
      { dimension: 'WHEN', values: ['Signed 20 February 1956.', 'Constituted 1 February 1958 (enabled by 7th Constitutional Amendment, 1956).'] },
      { dimension: 'WHY', values: ['Pre-condition for forming Andhra Pradesh on 1 November 1956.', 'Institutional mechanism to monitor Telangana regional development, education, and land sales.'] },
      { dimension: 'WHO', values: ['8 Congress leaders (4 Telangana + 4 Andhra).', 'First Chairman: K. Achutha Reddy (later T. Hayagrivachary & J. Chokka Rao); composed of Telangana MLAs.'] },
      { dimension: 'PURPOSE', values: ['Cover 14 macro safeguards including Cabinet share, TPCC, prohibition, Urdu, surpluses & domicile.', 'Scrutinize regional legislation & budget allocation on scheduled Telangana subjects.'] },
      { dimension: 'RESULT', values: ['Lacked direct judicial enforceability on political clauses like Deputy CM.', 'Exposed surplus diversions in reports, strengthened briefly in 1969, then ABOLISHED in 1973 under Six-Point Formula.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['Look for "Hyderabad House", "Govind Ballabh Pant", "Damodaram Sanjeevaiah NOT a signatory".', 'Look for "Article 371(1)", "First President K. Achutha Reddy", "Abolished by Six-Point Formula".'] }
    ],
    mnemonicLock: '1956 Pact promised the Watchdog → 1958 TRC (Achutha Reddy) WAS the Watchdog → 1973 Six-Point Formula dissolved it.',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'CMP-03',
    title: 'SRC Recommendations (1955) vs Actual 1956 Merger Arrangements',
    phase: 'PHASE-I',
    dayNumber: 2,
    entities: ['SRC Recommendations (Paras 369–388)', 'Actual 1956 Merger (States Reorganisation Act)'],
    trapAlert: 'MAJOR EXAM TRAP: Many beginners falsely think Fazal Ali’s SRC recommended immediate formation of Andhra Pradesh! SRC actually OPPOSED immediate merger.',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Independent 3-member commission report on linguistic state reorganisation.', 'Political & statutory decision enacted via States Reorganisation Act, 1956 (effective 1 Nov 1956).'] },
      { dimension: 'WHEN', values: ['Appointed 22 Dec 1953; Report submitted 30 September 1955.', 'Gentlemen’s Agreement 20 Feb 1956; AP inaugurated 1 November 1956.'] },
      { dimension: 'WHY', values: ['Recognized Telangana’s revenue viability (excise revenue) and fear of educational/bureaucratic domination by Coastal districts.', 'Central leadership (Nehru/Pant) & Visalandhra lobby opposed keeping two Telugu states separate.'] },
      { dimension: 'WHO', values: ['Justice Syed Fazal Ali (Chair), H.N. Kunzru, K.M. Panikkar.', 'PM Jawaharlal Nehru, HM G.B. Pant, CM Neelam Sanjeeva Reddy, CM Burgula Ramakrishna Rao.'] },
      { dimension: 'PURPOSE', values: ['Keep residuary Hyderabad (Telangana) as a SEPARATE STATE until 1961, merging ONLY if 2/3rd of Hyderabad Assembly voted yes after 1961 polls.', 'Immediate unconditional merger into "Andhra Pradesh" (dropped original draft name "Andhra-Telangana"!) with 14-point safeguards.'] },
      { dimension: 'RESULT', values: ['Overruled on Telangana statehood despite Hyderabad Assembly debates.', 'Planted structural distrust from 1 Nov 1956 (Assertion-Reason tested in PC 2019 Q.191).'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['Keywords: "5-year trial period", "1961 elections", "2/3rd legislature majority", "Residuary Hyderabad State".', 'Keywords: "1 November 1956", "Immediate unification", "Draft bill renamed from Andhra-Telangana to Andhra Pradesh".'] }
    ],
    mnemonicLock: 'Fazal Ali said "WAIT 5 YEARS (1961 + 2/3rd Vote)"; Delhi forced "WEDDING NOW (1 Nov 1956)".',
    sourceIds: ['SRC-06', 'SRC-04', 'SRC-10']
  },
  {
    id: 'CMP-04',
    title: 'Eight-Point (1969) vs Five-Point (1972) vs Six-Point Formula (1973)',
    phase: 'CROSS-PHASE',
    dayNumber: 4,
    entities: ['Eight-Point Formula (1969)', 'Five-Point Formula (1972)', 'Six-Point Formula (1973)'],
    trapAlert: 'Tested directly in PC Mains 2016 (p2016f-149) for chronological order (8 → 5 → 6 → Presidential Order) and PC Mains 2019 (p2019f-194) for content traps!',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Executive pacification package during 1969 Telangana agitation.', 'Statutory Sunset compromise on Mulki Rules after Oct 1972 SC verdict.', 'Constitutional settlement ending President’s Rule & Jai Andhra stir.'] },
      { dimension: 'WHEN', values: ['11 April 1969.', '27 November 1972 (Mulki Rules Act passed 23 Dec 1972).', '21 September 1973 (32nd Amendment Act 1973, effective 1 Jul 1974).'] },
      { dimension: 'WHY', values: ['1969 student uprising + 28 Mar 1969 SC verdict striking down Sec 3 of Public Employment Act.', '3 Oct 1972 SC verdict UPHELD Mulki Rules, sparking Andhra employee backlash.', 'Full-scale Jai Andhra agitation & breakdown of state administration under President’s Rule.'] },
      { dimension: 'WHO', values: ['PM Indira Gandhi (under CM K. Brahmananda Reddy).', 'PM Indira Gandhi (under CM P.V. Narasimha Rao).', 'Central Govt & AP Congress leaders (H.C. Sarin advisor; J. Vengala Rao became CM Dec 1973).'] },
      { dimension: 'PURPOSE', values: ['Created Bhargava (Surpluses) & Wanchoo (Jurists) committees + Telangana Development Committee.', 'Limited Mulki Rules up to Dec 1977 (Twin Cities) and Dec 1980 (Rest of Telangana).', 'State Planning Board, Central University in Hyderabad (Art 371-E), Local Cadre preference, Admin Tribunal, & ABOLITION of Mulki Rules + TRC!'] },
      { dimension: 'RESULT', values: ['Rejected by TPS; 1969 movement escalated to 1971 Lok Sabha sweep.', 'Rejected by Andhra agitators -> escalated Jai Andhra stir -> PVNR resigned Jan 1973.', 'Inserted Art 371-D & 371-E; produced 18 Oct 1975 Presidential Order (6 Zones).'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['April 1969 + Wanchoo + Bhargava.', 'Nov 1972 + "1977 Hyderabad / 1980 Telangana Sunset".', 'Sep 1973 + "Central University + Art 371-D + Abolished TRC/Mulki" (NO two High Courts!).'] }
    ],
    mnemonicLock: 'Order = 8 (Apr 69) → 5 (Nov 72) → 6 (Sep 73) → P.O. (Oct 75). Remember "8-5-6": Numbers are NOT ascending!',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'CMP-05',
    title: '1969 Jai Telangana Movement vs 1972–73 Jai Andhra Movement',
    phase: 'PHASE-II',
    dayNumber: 4,
    entities: ['1969 Jai Telangana Movement', '1972–73 Jai Andhra Movement'],
    trapAlert: 'Notice the exact judicial mirror image: 1969 escalated when SC STRUCK DOWN Mulki statutory rules (28 Mar 1969); 1972 Jai Andhra erupted when SC UPHELD Nizam Mulki rules (3 Oct 1972)!',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Telangana student, employee (TNGO) & mass movement starting as "Safeguards Implementation" and turning into "Separate Telangana".', 'Coastal Andhra & Rayalaseema agitation demanding abolition of Mulki Rules in Hyderabad or creation of a separate Andhra state.'] },
      { dimension: 'WHEN', values: ['January 1969 – September 1971.', 'October 1972 – September 1973.'] },
      { dimension: 'WHY', values: ['12 years of Gentlemen’s Agreement violations, KTPS non-local jobs, diversion of surpluses, & 28 Mar 1969 SC judgment.', '3 October 1972 Supreme Court judgment (5-Judge Bench) validating 1919 Mulki Rules + resentment against PVNR’s Land Ceiling Act.'] },
      { dimension: 'WHO', values: ['Ravindranath, Mallikarjun, Madan Mohan, Marri Chenna Reddy, Konda Laxman Bapuji, K.R. Amos (CM: K. Brahmananda Reddy).', 'B.V. Subba Reddy, Kakani Venkataratnam, Tenneti Viswanatham, Gouthu Latchanna, Andhra Praja Parishad (CM: P.V. Narasimha Rao).'] },
      { dimension: 'PURPOSE', values: ['Separate Telangana State to protect Neellu, Nidhulu, Niyamakalu.', 'Unrestricted access to jobs/education in capital Hyderabad OR bifurcation without safeguards.'] },
      { dimension: 'RESULT', values: ['369+ student martyrs; 8-Point Formula; TPS won 10/14 MP seats (1971); PVNR made CM.', 'CM P.V. Narasimha Rao resigned (Jan 1973); President’s Rule (18 Jan 1973); Six-Point Formula (21 Sep 1973) abolished Mulki Rules & TRC.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['Triggered at Khammam/Palvancha (8 Jan 1969); SC verdict = 28 Mar 1969 (Narasimha Rao case).', 'Triggered by SC verdict = 3 Oct 1972 (Venkata Reddy case); ended with Six-Point Formula (Sep 1973).'] }
    ],
    mnemonicLock: 'Mar 1969 SC Strike-Down = Telangana Boiled; Oct 1972 SC Uphold = Andhra Boiled!',
    sourceIds: ['SRC-04', 'SRC-08']
  },
  {
    id: 'CMP-06',
    title: 'Six-Point Formula (1973) vs Article 371-D (1974) vs Presidential Order (1975)',
    phase: 'PHASE-II',
    dayNumber: 5,
    entities: ['Six-Point Formula', 'Article 371-D (32nd Amendment)', 'Presidential Order, 1975'],
    trapAlert: 'Never merge these three! One is a political policy statement (1973), one is the constitutional enabling article (1974), and one is the operational zonal recruitment order (1975).',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Political consensus formula announced by Central Government.', 'Special Constitutional Provision inserted into Part XXI via 32nd Amendment Act, 1973.', 'Detailed Statutory Order (G.S.R. 524E / G.O.P. 674) organizing AP into 6 Zones & defining "Local Candidate".'] },
      { dimension: 'WHEN', values: ['21 September 1973.', 'Passed Dec 1973; came into force on 1 July 1974.', '18 October 1975 (AP Govt G.O.P. 674 on 20 October 1975).'] },
      { dimension: 'WHY', values: ['Political roadmap to lift President’s Rule in AP.', 'To override Article 16(3) hurdles flagged earlier by Wanchoo Committee.', 'To execute Article 371-D(1) & (2) in actual district/zonal job notifications.'] },
      { dimension: 'WHO', values: ['Indira Gandhi Government.', 'Parliament of India (32nd Constitutional Amendment).', 'President Fakhruddin Ali Ahmed.'] },
      { dimension: 'PURPOSE', values: ['Broad 6-point policy (Planning Board, Central Univ, Local jobs, Tribunal, Constitutional shield, Repeal Mulki/TRC).', 'Empowers the President of India to issue orders for equitable opportunities & Administrative Tribunal (Art 371-E = Central Univ).', 'Defines 4-year study rule, 80%/70%/60% local quotas, Zones I–VI (Telangana = Zones V & VI), and Para 14 exemptions.'] },
      { dimension: 'RESULT', values: ['Restored popular ministry under CM J. Vengala Rao (10 Dec 1973).', 'Shielded AP zonal system from Art 14/16 challenges (though Clause 5 overriding HC power was struck down in P. Sambamurthy v. AP, 1986!).', 'Governed AP & Telangana recruitment for 40+ years; Para 14(f) created the explosive Hyderabad Police "Free Zone" dispute in Oct 2009.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['Date: 21 Sep 1973 (Policy).', '32nd Amendment, Art 371-D (Jobs/Tribunal) vs Art 371-E (Central Univ Hyderabad), P. Sambamurthy case.', '18 Oct 1975, 6 Zones (Zones V & VI), 4-year consecutive study rule, Para 14 exemptions.'] }
    ],
    mnemonicLock: '1973 Blueprint (6-Point) → 1974 Power Socket (Art 371-D) → 1975 Machine Running (6-Zone Presidential Order).',
    sourceIds: ['SRC-04', 'SRC-07']
  },
  {
    id: 'CMP-07',
    title: 'Jayabharat Reddy Committee (1985) vs G.O. Ms. No. 610 (1985) vs Girglani Commission (2001)',
    phase: 'CROSS-PHASE',
    dayNumber: 6,
    entities: ['Jayabharat Reddy Committee', 'G.O. Ms. No. 610', 'J.M. Girglani Commission'],
    trapAlert: 'High-yield PYQ triad (SI 2022 Q.171, SI 2023 Q.192, PC 2019 Q.188): Do not confuse the 1985 Officers Committee with the 1985 Government Order or the 2001 One-Man Commission!',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['3-Member Senior IAS Officers’ Fact-Finding Committee.', 'Binding Executive Government Order (General Admin SPF-A Dept).', 'Retired IAS One-Man Inquiry Commission (3-Volume Report).'] },
      { dimension: 'WHEN', values: ['Appointed & reported in 1985.', 'Issued 30 December 1985 (repatriation deadline set as 31 March 1986).', 'Appointed 25 June 2001; Interim Report 6 Oct 2001; Final Report Sep 2004.'] },
      { dimension: 'WHY', values: ['10 years of TNGO complaints about violations of 1975 Presidential Order.', 'To implement the corrective recommendations of Jayabharat Reddy Committee.', '16 years of non-implementation of GO 610 + resurgence of Telangana agitation in 2001.'] },
      { dimension: 'WHO', values: ['K. Jayabharat Reddy (Chair), Kamalnathan, Umapathi Rao (under CM N.T. Rama Rao).', 'N.T. Rama Rao TDP Government.', 'J.M. Girglani, IAS Retd. (appointed by CM N. Chandrababu Naidu; submitted final report to CM Y.S. Rajasekhara Reddy).'] },
      { dimension: 'PURPOSE', values: ['Count illegal non-local appointments in Telangana (1975–1985).', 'Order repatriation of non-locals from Zones V & VI back to their native zones.', 'Investigate HOW and WHY GO 610 & Presidential Order were subverted across departments.'] },
      { dimension: 'RESULT', values: ['36-page report discovering ~58,962 non-local appointments.', 'Remained largely on paper; became a potent symbol of betrayal.', 'Documented 126 findings across 18 categories of violations.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['"Officers Committee", "58,962 non-locals", "NTR Govt 1985".', '"30 Dec 1985", "Repatriation by 31 March 1986".', '"One-Man Commission", "June 2001 TDP Govt", "126 findings / 18 violation types", "Submitted Sep 2004".'] }
    ],
    mnemonicLock: '1985 Jayabharat FOUND the disease (58,962) → 1985 GO 610 PRESCRIBED the medicine → 2001 Girglani PROVED nobody took the medicine (126 findings)!',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'CMP-08',
    title: 'Telangana Praja Samithi (TPS, 1969) vs Telangana Rashtra Samithi (TRS, 2001)',
    phase: 'CROSS-PHASE',
    dayNumber: 7,
    entities: ['Telangana Praja Samithi (TPS)', 'Telangana Rashtra Samithi (TRS)'],
    trapAlert: 'Both carried "Samithi" and contested elections on a single-point statehood plank, but had opposite endings: TPS merged into Congress in 1971; TRS achieved statehood in 2014.',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Civil convention (Feb 1969) converted into a political party in July 1970.', 'Dedicated regional political party founded explicitly for Telangana statehood.'] },
      { dimension: 'WHEN', values: ['Founded Feb/Mar 1969; Political party July 1970; Merged 18 Sep 1971.', 'Founded 27 April 2001 at Jala Drushyam, Hyderabad.'] },
      { dimension: 'WHY', values: ['Channel the 1969 Jai Telangana mass uprising into parliamentary pressure.', 'Revive political representation after 1990s civil-society awakening & TDP power-tariff/regional neglect.'] },
      { dimension: 'WHO', values: ['Founder-President: A. Madan Mohan; Party President (from May 1969): Dr. Marri Chenna Reddy.', 'Founder-President: K. Chandrashekar Rao (ideological guidance: Prof. K. Jayashankar; venue host: Konda Laxman Bapuji).'] },
      { dimension: 'PURPOSE', values: ['Single-point agenda of Separate Telangana in 1971 Mid-Term Lok Sabha Elections.', 'Achieve Separate Telangana through democratic, parliamentary, and mass agitation methods.'] },
      { dimension: 'RESULT', values: ['Won 10 out of 14 Telangana Lok Sabha seats (1971), then merged with Indira Congress on 18 Sep 1971.', 'Sustained 13-year struggle (2001–2014), culminated in AP Reorganisation Act 2014 & formed 1st Telangana Govt on 2 June 2014.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['"Madan Mohan (Founder)", "July 1970 political body", "10 MP seats in 1971", "Spade symbol".', '"27 April 2001", "Jala Drushyam", "17 May 2001 Karimnagar Simha Garjana", "Car symbol".'] }
    ],
    mnemonicLock: '1969 TPS (Praja) = Madan Mohan/Chenna Reddy (10 MPs → Merged 1971); 2001 TRS (Rashtra) = KCR at Jala Drushyam (Achieved 2014).',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'CMP-09',
    title: '1997 Milestone Declarations: Suryapet vs Bhongir (Bhuvanagiri) vs Warangal Declaration',
    phase: 'PHASE-III',
    dayNumber: 7,
    entities: ['Bhongir (Bhuvanagiri) Sabha', 'Suryapet Declaration', 'Warangal Declaration (AIPRF)'],
    trapAlert: 'Tested directly in SI Mains 2023 (s2023d-194 & s2023d-195) and SI Prelims 2022 (s2022-170) & PC 2019 (p2019f-192)! Master exact 1997 months, organizers, and presiding figures.',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Historic two-day literary & intellectual public convention ("Telangana Daga Padda Rashtram").', 'Grassroots regional developmental & water-justice conference in Nalgonda (fluorosis/Krishna water injustice).', '2-Day "Prajaswamika Telangana Akanksha" mass conference releasing the 50-demand Democratic Telangana charter.'] },
      { dimension: 'WHEN', values: ['8–9 March 1997.', 'August / September 1997 (followed by Oct 1997 Telangana Aikya Vedika).', '28–29 December 1997.'] },
      { dimension: 'WHY', values: ['Break 25 years of political silence since 1972 via poets, writers, journalists & teachers.', 'Expose Nalgonda fluorosis, SRSP/SLBC water discrimination & agrarian distress.', 'Define socio-economic & anti-feudal Democratic Telangana agenda beyond mere geographical division.'] },
      { dimension: 'WHO', values: ['Organized by Sahithi Mitra Mandali (SMM); Presided over by veteran freedom fighter Jaini Mallaiah Gupta (Gaddar sang "Naa Talli Telangana").', 'Maroju Veeranna, Prof. Jayashankar, V. Prakash, civil society activists.', 'Organized under All India People’s Resistance Forum (AIPRF — Prof. G.N. Saibaba / Gaddar / Varavara Rao); inaugurated/associated with Kaloji Narayana Rao.'] },
      { dimension: 'PURPOSE', values: ['Ignited the cultural & intellectual Phase-III revival of Telangana consciousness.', 'Mobilized rural Nalgonda youth and spawned Telangana Mahasabha / Aikya Vedika networks.', 'Adopted the landmark 50-point Warangal Declaration for Democratic Telangana.'] },
      { dimension: 'RESULT', values: ['Triggered domino of conferences across every Telangana district in 1997–98.', 'Directly led to formation of Telangana Aikya Vedika (Oct 1997) & Telangana Jana Sabha (1998).', 'Anchored social justice, land, Podu/tribal rights & cultural self-respect at the heart of Phase III.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['"8–9 March 1997", "Sahithi Mitra Mandali", "Bhuvanagiri", "Jaini Mallaiah Gupta presided" (s2023d-195, p2019f-192).', '"1997 Nalgonda/Suryapet", precedes Warangal Dec 1997.', '"28–29 December 1997", "AIPRF banner", "Democratic Telangana / 50 demands", "Kaloji" (s2022-170).'] }
    ],
    mnemonicLock: '1997 Calendar: March = Bhongir (Sahithi Mitra / Jaini Mallaiah) → Mid-97 = Suryapet & Aikya Vedika → Dec 28–29 = Warangal (AIPRF / Kaloji).',
    sourceIds: ['SRC-09', 'SRC-10']
  },
  {
    id: 'CMP-10',
    title: 'Telangana Joint Action Committee (TJAC) vs Sectoral JACs (Students, Employees, Advocates)',
    phase: 'PHASE-III',
    dayNumber: 9,
    entities: ['Telangana Political / Apex TJAC', 'Sectoral JACs (OUJAC, TNGO/Employees JAC, Advocates JAC)'],
    trapAlert: 'PC Prelims 2016 (p2016-199) asked WHICH political party was NOT in TJAC (Answer: CPI — note CPI supported Telangana independently while BJP & TRS were founding TJAC members, Congress/TDP MLAs exited early), and PC Mains 2016 (p2016f-152) asked Convener of Advocates JAC!',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Apex umbrella body uniting political parties and mass civil/employee associations for single-point Telangana statehood (SI 2023 Q.165).', 'Autonomous occupational/campus action fronts driving ground strikes, court boycotts, and campus marches.'] },
      { dimension: 'WHEN', values: ['Formed 24 December 2009 (one day after Centre’s 23 Dec pullback statement).', 'Nov 2009 – 2014 (OUJAC formed Nov 2009 prior to Vidyarthi Garjana on 3 Jan 2010).'] },
      { dimension: 'WHY', values: ['Prevent fragmentation among parties after Chidambaram’s 23 Dec 2009 reversal.', 'Mobilize specific constituencies (universities, secretariat/RTC/coal mines, courts).'] },
      { dimension: 'WHO', values: ['Convener: Prof. M. Kodandaram (included TRS, BJP, CPI-ML New Democracy, TNGOs, etc.; CPI stayed outside TJAC structure).', 'Advocates JAC Convener: M. Rajender Reddy (p2016f-152); Employees/TNGOs: K. Swamy Goud / Vittal; OUJAC: Pidamarthi Ravi, Balka Suman, Kailashnath, Daruvu Yellanna.'] },
      { dimension: 'PURPOSE', values: ['Coordinate state-wide flagship protests: Non-Cooperation, Million March, Sakala Janula Samme, Rail Roko, Sagara Haram.', 'Execute 42-day strike on the ground (RTC wheels stopped, Singareni coal halted, OU Vidyarthi Garjana 3 Jan 2010).'] },
      { dimension: 'RESULT', values: ['Demonstrated unprecedented peaceful mass mandate before India’s Parliament.', 'Made governance of united AP administratively impossible during Sep–Oct 2011.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['"24 Dec 2009", "Prof. Kodandaram", "Sakala Janula Samme organiser (p2016f-154)", "CPI NOT a member (p2016-199)".', '"OU Vidyarthi Garjana = 3 Jan 2010 (s2022-182)", "Advocates JAC = M. Rajender Reddy (p2016f-152)".'] }
    ],
    mnemonicLock: 'Apex TJAC = Kodandaram (24 Dec 2009; CPI outside); Advocates JAC = M. Rajender Reddy; OU Vidyarthi Garjana = 3 Jan 2010.',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'CMP-11',
    title: 'Pranab Mukherjee Committee (2005) vs Srikrishna Committee (2010) vs GoM (2013)',
    phase: 'PHASE-III',
    dayNumber: 9,
    entities: ['Pranab Mukherjee Committee (2005)', 'Justice Srikrishna Committee (2010)', 'Shinde/Antony Group of Ministers (2013)'],
    trapAlert: 'Three Central committees in Phase III with completely different compositions and outcomes!',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['3-Member UPA-I Coalition Political Sub-Committee.', '5-Member Independent Consultation Committee (CCSAP) under MHA.', '7-Member Union Cabinet Group of Ministers (GoM) drafting the Reorganisation Bill.'] },
      { dimension: 'WHEN', values: ['January 2005.', 'Appointed 3 February 2010; Report submitted 30 December 2010.', 'Constituted Oct 2013 (reconstituted 8 Oct 2013 after 3 Oct Cabinet nod).'] },
      { dimension: 'WHY', values: ['Fulfil 2004 UPA Common Minimum Programme (CMP) promise to consult parties.', 'Defuse post-23 Dec 2009 crisis in both Telangana & Seemandhra.', 'Draft legal text of AP Reorganisation Bill after CWC (30 Jul 2013) & Cabinet (3 Oct 2013) approved Telangana.'] },
      { dimension: 'WHO', values: ['Pranab Mukherjee (Chair), Raghuvansh Prasad Singh, Dayanidhi Maran.', 'Justice B.N. Srikrishna (Chair), Ranbir Singh, Abusaleh Shariff, Ravinder Kaur, Vinod K. Duggal (Member-Secy).', 'Sushil Kumar Shinde (Chair), A.K. Antony, P. Chidambaram, Veerappa Moily, Ghulam Nabi Azad, Jairam Ramesh + V. Narayanasamy (Special Invitee).'] },
      { dimension: 'PURPOSE', values: ['Gather letters of support/opposition from political parties.', 'Fact-finding & presenting policy options (6 Options).', 'Settle boundaries, capital (10 yrs), assets, water boards, Art 371-D & Schedules.'] },
      { dimension: 'RESULT', values: ['Inconclusive delay; TRS quit UPA Cabinet in 2006.', 'Preferred Option 6 (United AP with Council) & Option 5 (Bifurcation as 2nd best).', 'Produced AP Reorganisation Bill approved by Cabinet on 5 Dec 2013 & passed in Feb 2014.'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['2005 + Raghuvansh Prasad Singh + Dayanidhi Maran.', '3 Feb 2010 + 5 Members (Chinmaya Goswamy NOT a member — PC 2016 Q.195!) + 6 Options.', 'Oct 2013 + Shinde Chair + V. Narayanasamy Special Invitee (PC 2018 Q.183).'] }
    ],
    mnemonicLock: '2005 Pranab (3 Politicians: Stalled) → 2010 Srikrishna (5 Experts: 6 Options) → 2013 Shinde GoM (7 Ministers: Wrote the Act)!',
    sourceIds: ['SRC-04', 'SRC-05', 'SRC-10']
  },
  {
    id: 'CMP-12',
    title: '2014 Constitutional Endgame: Bill Introduction vs Lok Sabha vs Rajya Sabha vs Assent vs Appointed Day',
    phase: 'PHASE-III',
    dayNumber: 10,
    entities: ['Parliamentary Bill Passage (Feb 2014)', 'Presidential Assent & Gazette (Mar 2014)', 'Appointed Day (2 June 2014)'],
    trapAlert: 'Every single date between 30 July 2013 and 2 June 2014 is a prime MCQ target (PC 2016 Q.155, PC 2018 Q.183, PC 2022 Q.96)! Never confuse Bill Passage, Assent, and Appointed Day.',
    matrix: [
      { dimension: 'WHAT IT IS', values: ['Legislative enactment by both Houses of Parliament under Article 3.', 'Constitutional transformation of the Bill into Act No. 6 of 2014 under Article 111 + Gazette Notification of Appointed Day.', 'Legal birth date on which the new State of Telangana officially came into existence under Section 2(a) & Section 3.'] },
      { dimension: 'WHEN', values: ['LS Intro: 13 Feb 2014 → LS Passed: 18 Feb 2014 → RS Passed: 20 Feb 2014.', 'Presidential Assent: 1 March 2014; Gazette Notification fixing Appointed Day issued: 4 March 2014.', '2 June 2014 (00:00 hours).'] },
      { dimension: 'WHY', values: ['Parliament holds plenary power under Art 3 even after AP Assembly rejected the draft bill on 30 Jan 2014.', 'President’s signature turns a Parliamentary Bill into binding Law (President’s Rule also imposed in AP on 1 March 2014 after CM Kiran Kumar Reddy resigned on 19 Feb 2014).', 'Administrative transition window (March–May 2014) to allocate cadres, treasuries, High Court, and conduct April–May 2014 General Elections.'] },
      { dimension: 'WHO', values: ['Introduced by HM Sushil Kumar Shinde; LS Speaker Meira Kumar; Leader of Opposition Sushma Swaraj ("Chinnamma") supported.', 'President Pranab Mukherjee.', 'Governor E.S.L. Narasimhan administered oath to K. Chandrashekar Rao as 1st CM of Telangana (Nayini Narasimha Reddy = 1st Home Minister, SI 2023 Q.166).'] },
      { dimension: 'PURPOSE', values: ['Approve 108 Sections & 13 Schedules of AP Reorganisation Bill.', 'Enact Act No. 6 of 2014 and legally notify when bifurcation takes effect.', 'Inaugurate Telangana as the 29th State of the Indian Union.'] },
      { dimension: 'RESULT', values: ['Cleared both Houses by voice vote.', 'Published in Gazette of India Extraordinary on 1 March & 4 March 2014.', 'Fulfilled 66-year aspiration (1948–2014).'] },
      { dimension: 'HOW TO IDENTIFY IN MCQ', values: ['13 Feb (LS Intro — p2016f-155), 18 Feb (LS Pass — p2022-96), 20 Feb (RS Pass).', '1 March 2014 = Assent; 4 March 2014 = Gazette Notification of Appointed Day.', '2 June 2014 = Appointed Day (Sec 2(a) of Act 6 of 2014).'] }
    ],
    mnemonicLock: 'Feb 13 (Intro) → Feb 18 (LS) → Feb 20 (RS) → Mar 1 (Assent) → Mar 4 (Gazette Notice) → June 2 (State Born)!',
    sourceIds: ['SRC-05', 'SRC-10']
  }
];
