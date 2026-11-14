// Verified Historical Personalities & Committees/Commissions Knowledge Graph
// Every entry adheres strictly to Section 6 (15 mandatory fields per person, 12 mandatory fields per committee, and clickable graph edges)

export interface PersonalityCard {
  id: string;
  fullName: string; // 1. Full name
  preferredName: string; // 2. Preferred / commonly used name
  period: string; // 3. Historical period
  background: string; // 4. Political/administrative/academic background
  mainRole: string; // 5. Main position or role
  committees: string[]; // 6. Committee or commission association (IDs + titles)
  roleInCommittee: string; // 7. Chairman, member, convener, signatory, etc.
  otherAssociations: string[]; // 8. Other committees/commissions/bodies
  govtOrOrgPosts: string[]; // 9. Important government posts or organisational positions
  majorEvents: string[]; // 10. Major events connected to the person
  places: string[]; // 11. Places associated with their historical involvement
  contribution: string; // 12. What they contributed
  examClue: string; // 13. How they can be identified in an examination question
  commonlyConfusedWith: string[]; // 14. Names with which they are commonly confused
  visualMemoryCue: string; // 15. Visual memory cue (schematic icon/notebook anchor)
  phase: 'PRE-1948' | 'PHASE-I' | 'PHASE-II' | 'PHASE-III';
  dayNumber: number;
  monogram: string;
  accentColor: string;
  sourceIds: string[];
}

export interface CommitteeCard {
  id: string;
  name: string; // 1. Name of committee/commission
  chairman: string; // 2. Chairman
  chairmanId: string;
  members: string[]; // 3. Other important members
  appointmentDate: string; // 4. Appointment date
  reason: string; // 5. Reason for appointment
  appointingAuthority: string; // 6. Government or authority that appointed it
  headquarters: string; // 7. Headquarters or relevant institutional location
  mandate: string; // 8. Mandate
  recommendations: string[]; // 9. Recommendations
  submissionDate: string; // 10. Report submission date
  aftermath: string; // 11. What happened afterwards
  previousRelated: string; // 12a. Previous related committee/mechanism
  subsequentRelated: string; // 12b. Subsequent related committee/mechanism
  phase: 'PHASE-I' | 'PHASE-II' | 'PHASE-III';
  dayNumber: number;
  category: 'Commission' | 'Committee' | 'Agreement/Formula' | 'Constitutional/GO';
  sourceIds: string[];
}

export interface GraphChain {
  id: string;
  personId: string;
  person: string;
  committeeId: string;
  committee: string;
  position: string;
  year: string;
  event: string;
  place: string;
  outcome: string;
}

export const PERSONALITIES: PersonalityCard[] = [
  {
    id: 'P-OSMAN',
    fullName: 'Mir Osman Ali Khan, Asaf Jah VII',
    preferredName: '7th Nizam Mir Osman Ali Khan',
    period: '1911–1948 (Rajpramukh 1950–1956)',
    background: 'Seventh and last ruling Nizam of the Asaf Jahi dynasty of Hyderabad State.',
    mainRole: 'Ruler of Princely Hyderabad State; issued the 1919 Mulki Farman & 1917 Osmania University Farman; Rajpramukh of Hyderabad State (26 Jan 1950 – 31 Oct 1956).',
    committees: ['1919 Mulki Farman Authority'],
    roleInCommittee: 'Sovereign Issuing Authority (Farman-e-Shahi)',
    otherAssociations: ['Standstill Agreement (29 Nov 1947)', 'Instrument of Accession acceptance after Operation Polo'],
    govtOrOrgPosts: ['Nizam of Hyderabad (1911–1948)', 'Rajpramukh of Part-B Hyderabad State (1950–1956)'],
    majorEvents: ['1917 OU Farman (26 April 1917)', '1919 Mulki Farman defining 15-year residence rule', 'Operation Polo ceasefire broadcast (17 Sep 1948)'],
    places: ['King Kothi Palace, Hyderabad', 'Osmania University'],
    contribution: 'Codified the Mulki civil service domicile rules (birth or 15 years permanent residence) that became the legal bedrock of Telangana employment safeguards up to the 1972 Supreme Court verdict.',
    examClue: 'Asked via 1919 Mulki Farman, 26 April 1917 Osmania University Farman (PC 2022 Q.172), or Rajpramukh status until 31 Oct 1956.',
    commonlyConfusedWith: ['Salar Jung I (Mir Turab Ali Khan — issued earlier 1868 Mulki circular)', 'Mahbub Ali Khan (6th Nizam — 1888 Gazette notification)'],
    visualMemoryCue: 'Royal Scroll stamped "1919: 15-Year Domicile Shield" + Osmania Arch.',
    phase: 'PHASE-I',
    dayNumber: 1,
    monogram: 'MOA',
    accentColor: '#7c2d12',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-VELLODI',
    fullName: 'Mullath Kadingi Vellodi, ICS',
    preferredName: 'M.K. Vellodi',
    period: '1949–1952',
    background: 'Senior Indian Civil Service (ICS) officer from Malabar appointed by the Union Ministry of States.',
    mainRole: 'Chief Minister (Head of Civilian Administration) of Hyderabad State from 6 December 1949 to 6 March 1952.',
    committees: ['Civilian Cabinet succeeding Maj. Gen. J.N. Chaudhuri’s Military Administration'],
    roleInCommittee: 'Head of Interim Civilian Administration',
    otherAssociations: ['Ministry of States (Government of India)'],
    govtOrOrgPosts: ['Chief Minister of Hyderabad State (Dec 1949 – Mar 1952)', 'Secretary, Govt of India'],
    majorEvents: ['Transition from Military Governor J.N. Chaudhuri to Civilian Rule (Dec 1949)', 'Large-scale recruitment of non-Mulki officials from Madras/Andhra that sparked discontent leading to 1952 Mulki agitation'],
    places: ['Hyderabad Secretariat'],
    contribution: 'Bridged military rule (Sep 1948 – Dec 1949) and the first democratically elected Burgula ministry (March 1952), though mass import of outside bureaucrats under his administration fueled the 1952 Mulki upsurge.',
    examClue: 'First civilian (non-elected ICS) Chief Minister of Hyderabad State between J.N. Chaudhuri (Military Governor) and Burgula Ramakrishna Rao (first elected CM).',
    commonlyConfusedWith: ['Maj. Gen. J.N. Chaudhuri (Military Governor 1948–1949)', 'Burgula Ramakrishna Rao (First Elected CM 1952–1956)'],
    visualMemoryCue: 'ICS Fountain Pen bridging Army Baton (Chaudhuri) and Ballot Box (Burgula).',
    phase: 'PHASE-I',
    dayNumber: 1,
    monogram: 'MKV',
    accentColor: '#1e3a8a',
    sourceIds: ['SRC-04', 'SRC-09']
  },
  {
    id: 'P-BURGULA',
    fullName: 'Burgula Ramakrishna Rao',
    preferredName: 'Burgula Ramakrishna Rao',
    period: '1952–1956',
    background: 'Freedom fighter, multilingual scholar, lawyer from Mahbubnagar (Shadnagar), leader of Hyderabad State Congress.',
    mainRole: 'First democratically elected Chief Minister of Hyderabad State (6 March 1952 – 31 October 1956) and Signatory to the Gentlemen’s Agreement (1956).',
    committees: ['C-GENTLEMEN (Gentlemen’s Agreement, 20 Feb 1956)'],
    roleInCommittee: 'Telangana Signatory #1 (as Chief Minister of Hyderabad State)',
    otherAssociations: ['Hyderabad Tenancy & Agricultural Lands reforms', 'Cabinet Sub-Committee on Mulki Rules (1952)'],
    govtOrOrgPosts: ['First Elected CM of Hyderabad State (1952–1956)', 'Governor of Kerala & Uttar Pradesh (post-1956)'],
    majorEvents: ['1952 General Elections', '1952 City College Mulki Agitation handling', 'Signing Gentlemen’s Agreement at Hyderabad House, Delhi (20 Feb 1956)', 'Stepping down to facilitate Visalandhra/AP formation'],
    places: ['Burgula / Shadnagar', 'Hyderabad', 'Hyderabad House, New Delhi'],
    contribution: 'Led the elected Hyderabad government, enacted progressive Jagirdari/Inamdari abolition reforms, and represented Telangana as one of the 4 signatories in the 1956 Gentlemen’s Agreement.',
    examClue: 'First elected CM of Hyderabad State + Telangana signatory to Gentlemen’s Agreement (with KV Ranga Reddy, Marri Chenna Reddy, JV Narsing Rao).',
    commonlyConfusedWith: ['Boorgula Narsing Rao (distractor in SI 2022 Q.167)', 'Neelam Sanjeeva Reddy (First CM of AP on 1 Nov 1956)'],
    visualMemoryCue: 'First Ballot Box of Hyderabad (1952) + Signature #1 on 1956 Delhi Pact.',
    phase: 'PHASE-I',
    dayNumber: 1,
    monogram: 'BRR',
    accentColor: '#0f766e',
    sourceIds: ['SRC-04', 'SRC-09', 'SRC-10']
  },
  {
    id: 'P-JAGANMOHAN',
    fullName: 'Justice Pingali Jaganmohan Reddy',
    preferredName: 'Justice P. Jaganmohan Reddy',
    period: '1952–1953',
    background: 'Eminent jurist of Hyderabad High Court, later Chief Justice of AP High Court and Judge of the Supreme Court of India.',
    mainRole: 'Chairman of the Inquiry Commission into the 3–4 September 1952 Hyderabad Police Firing during the Mulki Agitation.',
    committees: ['C-JAGANMOHAN (Justice Jaganmohan Reddy Inquiry Committee, 1952)'],
    roleInCommittee: 'Chairman',
    otherAssociations: ['Supreme Court Bench (later career)'],
    govtOrOrgPosts: ['Judge, Hyderabad High Court', 'Vice-Chancellor, Osmania University (later)'],
    majorEvents: ['City College & Afzalgunj Police Firing Inquiry (Sep–Dec 1952)', 'Report submitted 28 December 1952'],
    places: ['City College, Pathergatti & Afzalgunj, Hyderabad'],
    contribution: 'Conducted an impartial judicial probe interviewing over 100 witnesses into the September 1952 anti-Non-Mulki student agitation firing.',
    examClue: 'Tested directly in PC Mains 2016 (p2016f-147): "Commission that investigated incidents related to 1952 Mulki Movement in Hyderabad."',
    commonlyConfusedWith: ['Justice K.N. Wanchoo (1969 Mulki constitutional safeguards committee)', 'Justice Vashishtha Bhargava (1969 Telangana surplus funds committee)'],
    visualMemoryCue: '1952 City College Gavel — "52 Firing = Jaganmohan Judge".',
    phase: 'PHASE-I',
    dayNumber: 1,
    monogram: 'PJR',
    accentColor: '#9333ea',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-FAZAL',
    fullName: 'Justice Syed Fazal Ali',
    preferredName: 'Justice Fazal Ali',
    period: '1953–1955',
    background: 'Former Judge of the Supreme Court of India and Governor of Odisha.',
    mainRole: 'Chairman of the States Reorganisation Commission (SRC) appointed by Govt of India on 22 December 1953.',
    committees: ['C-SRC (States Reorganisation Commission, 1953–1955)'],
    roleInCommittee: 'Chairman (with members H.N. Kunzru and K.M. Panikkar)',
    otherAssociations: ['Supreme Court of India'],
    govtOrOrgPosts: ['Chairman, SRC (1953–1955)', 'Governor of Assam (1956–1959)'],
    majorEvents: ['Appointment of SRC (22 Dec 1953)', 'Submission of SRC Report (30 Sep 1955) recommending a SEPARATE Hyderabad/Telangana State until at least 1961'],
    places: ['New Delhi', 'Hyderabad'],
    contribution: 'Authored Paras 369–388 of the SRC Report warning of Telangana’s fears of administrative/educational domination and recommending Telangana remain a separate state for 5 years (merging after 1961 only if 2/3rd of Hyderabad State Assembly voted in favour).',
    examClue: 'SRC Chairman (Dec 1953 – Sep 1955); remember SRC DID NOT recommend immediate merger of Telangana with Andhra!',
    commonlyConfusedWith: ['S.K. Dhar (1948 Linguistic Provinces Commission)', 'JVP Committee (Nehru, Patel, Pattabhi Sitaramayya, 1948–49)'],
    visualMemoryCue: 'Three-Judge Scale ("FPK: Fazal, Panikkar, Kunzru") holding a "Wait till 1961!" stop-sign.',
    phase: 'PHASE-I',
    dayNumber: 2,
    monogram: 'SFA',
    accentColor: '#b45309',
    sourceIds: ['SRC-06', 'SRC-04']
  },
  {
    id: 'P-KVRANGA',
    fullName: 'Konda Venkata Ranga Reddy',
    preferredName: 'K.V. Ranga Reddy',
    period: '1950–1970',
    background: 'Veteran Telangana statesman, Revenue & Home Minister in Hyderabad/AP cabinets; Ranga Reddy district is named in his honour.',
    mainRole: 'Telangana Signatory to the Gentlemen’s Agreement (1956) and First Deputy Chief Minister of Andhra Pradesh (when the post was eventually filled in 1959 under Sanjeevaiah/Sanjeeva Reddy transition).',
    committees: ['C-GENTLEMEN (Gentlemen’s Agreement, 20 Feb 1956)'],
    roleInCommittee: 'Telangana Signatory #2',
    otherAssociations: ['Hyderabad State Congress President'],
    govtOrOrgPosts: ['Revenue Minister (Hyderabad & AP)', 'Deputy Chief Minister of Andhra Pradesh (1959–1962)'],
    majorEvents: ['Advocated separate Telangana before SRC (1954–55)', 'Signed Gentlemen’s Agreement (20 Feb 1956)', 'Famous Ghanta Stambham / Secunderabad speech warning Telangana would have to wage struggle if safeguards failed'],
    places: ['Hyderabad', 'New Delhi'],
    contribution: 'Championed separate Telangana statehood alongside Dr. M. Chenna Reddy in 1955, negotiated the 14 safeguards of the Gentlemen’s Agreement, and was NOT part of the Communist Peasant Armed Struggle (explicitly tested in PC 2019 Q.187).',
    examClue: 'Telangana signatory to 1956 Agreement; First Deputy CM of AP (NOT in 1956 when Neelam Sanjeeva Reddy refused it calling it a "sixth finger", but later in 1959); NOT connected with Telangana Armed Struggle (p2019f-187).',
    commonlyConfusedWith: ['Arutla Ramachandra Reddy (Armed Struggle leader)', 'K. Achutha Reddy (First Chairman of Telangana Regional Committee)'],
    visualMemoryCue: 'District Map "Ranga Reddy" + 1956 Signatory Pen.',
    phase: 'PHASE-I',
    dayNumber: 2,
    monogram: 'KVR',
    accentColor: '#be123c',
    sourceIds: ['SRC-04', 'SRC-09', 'SRC-10']
  },
  {
    id: 'P-ACHUTHA',
    fullName: 'K. Achutha Reddy',
    preferredName: 'K. Achutha Reddy',
    period: '1958–1969',
    background: 'Legislator and parliamentarian from Mahbubnagar district.',
    mainRole: 'First Chairman (President) of the Telangana Regional Committee (TRC) constituted in 1958.',
    committees: ['C-TRC (Telangana Regional Committee, 1958)'],
    roleInCommittee: 'First Chairman (1958–1964)',
    otherAssociations: ['Telangana Praja Samithi MP (elected from Mahbubnagar in 1971 Lok Sabha)'],
    govtOrOrgPosts: ['First Chairman, Telangana Regional Committee (1958)', 'Member of Parliament (1971)'],
    majorEvents: ['Constitution of TRC via Presidential Order on 1 Feb 1958', 'Exposed diversion of Telangana revenue surpluses & Mulki violations'],
    places: ['Mahbubnagar', 'Hyderabad Assembly'],
    contribution: 'Led the statutory Telangana Regional Committee that documented systematic breaches of the 1956 Gentlemen’s Agreement in irrigation, budget surpluses, and Mulki jobs.',
    examClue: 'Tested directly in PC Prelims 2016 (p2016-190): "Who was the first President of Telangana Regional Committee?" → K. Achutha Reddy (followed later by T. Hayagrivachary & J. Chokka Rao).',
    commonlyConfusedWith: ['J. Chokka Rao (TRC Chairman during 1969 agitation)', 'T. Hayagrivachary (2nd TRC Chairman)'],
    visualMemoryCue: 'Chair #1 of TRC (1958): "A comes first — Achutha Reddy = 1st TRC Chairman".',
    phase: 'PHASE-I',
    dayNumber: 2,
    monogram: 'KAR',
    accentColor: '#0369a1',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-RAVINDRANATH',
    fullName: 'Annabathula Ravindranath',
    preferredName: 'Annabathula Ravindranath',
    period: '1969',
    background: 'B.A. second-year student leader of Khammam / Palvancha.',
    mainRole: 'Initiator of the historic indefinite hunger strike on 8 January 1969 at Khammam that sparked the 1969 Telangana Safeguards / Jai Telangana Agitation.',
    committees: ['Telangana Safeguards Agitation (Student Vanguard, Jan 1969)'],
    roleInCommittee: 'First Hunger Striker of 1969 Movement',
    otherAssociations: ['Supported by Poet Kaloji Narayana Rao & Municipal Vice-Chairman Kolishetti Ramadasu'],
    govtOrOrgPosts: ['Student Leader'],
    majorEvents: ['Indefinite fast unto death at Khammam railway station/pandal starting 8 January 1969 demanding implementation of Telangana safeguards & removal of non-Mulkis at KTPS Palvancha', '19 January 1969 All-Party Accord at CM Brahmananda Reddy’s residence; broke fast on 22 Jan 1969'],
    places: ['Khammam', 'Palvancha (KTPS)'],
    contribution: 'Turned employee grievances at Kothagudem Thermal Power Station (KTPS) into a statewide student & mass movement in January 1969.',
    examClue: 'Tested in PC Mains 2016 (p2016f-148) & SI Mains 2023 (s2023d-193): "Undertook first indefinite fast during 1969 movement (8 Jan 1969)". Note: KTPS non-local list was first exposed by A. Sree Ramadas (s2022-183).',
    commonlyConfusedWith: ['Kolishetti Ramadasu (supported Ravindranath’s fast camp in Khammam)', 'A. Sree Ramadas (exposed non-local jobs at KTPS Kothagudem)', 'Potu Krishnamurthy (fasted alongside later)'],
    visualMemoryCue: 'Torch at Khammam (8 Jan 1969) — "Ravindranath = Rising Sun (Ravi) of 1969 Fast".',
    phase: 'PHASE-I',
    dayNumber: 3,
    monogram: 'AR69',
    accentColor: '#dc2626',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-MADANMOHAN',
    fullName: 'Ananthula Madan Mohan',
    preferredName: 'A. Madan Mohan',
    period: '1969–1980s',
    background: 'Advocate and dynamic Telangana political leader from Siddipet.',
    mainRole: 'Founder-President of Telangana Praja Samithi (TPS) in February/March 1969 (originally formed as Telangana People’s Convention).',
    committees: ['Telangana Convention / Telangana Praja Samithi (Founder President, Feb–May 1969)'],
    roleInCommittee: 'Founder President (succeeded as TPS Chairman by Dr. M. Chenna Reddy in May 1969)',
    otherAssociations: ['Telangana People’s Convention (Feb 1969)'],
    govtOrOrgPosts: ['Founder-President, TPS (1969)', 'Cabinet Minister & Leader of Opposition in AP Assembly (later)'],
    majorEvents: ['Started Telangana People’s Convention in Feb 1969 which was renamed Telangana Praja Samithi (TPS)', 'Reddy Hostel Convention (8–9 March 1969)'],
    places: ['Hyderabad (Reddy Hostel)', 'Siddipet'],
    contribution: 'Built the organizational nucleus of Telangana Praja Samithi before Dr. Marri Chenna Reddy took over its presidency in May 1969.',
    examClue: 'Repeatedly asked in SI Mains 2023 (s2023d-162 & s2023d-184): Founder President of Telangana Praja Samithi (1969) AND starter of Telangana Convention = Ananthula Madan Mohan (NOT M. Chenna Reddy!).',
    commonlyConfusedWith: ['Dr. Marri Chenna Reddy (became TPS President in May 1969 and led 1971 election sweep, NOT the founder president)', 'Sreedhar Reddy (formed rival TPS faction when Chenna Reddy entered)', 'Mallikarjun (OU Student Action Committee General Secretary)'],
    visualMemoryCue: 'Foundation Stone of TPS stamped "Madan Mohan Built It (Feb 69); Chenna Reddy Led It (May 69)".',
    phase: 'PHASE-I',
    dayNumber: 3,
    monogram: 'AMM',
    accentColor: '#ea580c',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-CHENNAREDDY',
    fullName: 'Dr. Marri Chenna Reddy',
    preferredName: 'Dr. M. Chenna Reddy',
    period: '1950–1996',
    background: 'Medical doctor, freedom fighter, Telangana signatory (1956), Union Steel & Mines Minister, charismatic mass leader.',
    mainRole: 'President of Telangana Praja Samithi (from May 1969), led TPS to win 10 out of 14 Telangana Lok Sabha seats in 1971, later Chief Minister of Andhra Pradesh (1978–80, 1989–90).',
    committees: ['C-GENTLEMEN (Gentlemen’s Agreement, 1956)', 'Telangana Praja Samithi (President, May 1969 – Sep 1971)'],
    roleInCommittee: 'Signatory (1956) & President of TPS (1969–1971)',
    otherAssociations: ['Converted TPS into a political party in July 1970 (PC 2018 Q.182)', 'Merged TPS with Indira Congress in September 1971'],
    govtOrOrgPosts: ['Minister in Burgula Cabinet (1952)', 'Union Minister (1967–68)', 'Chief Minister of AP (1978–80, 1989–90)', 'Governor of UP, Punjab, Rajasthan, Tamil Nadu'],
    majorEvents: ['Advocated Separate Telangana before SRC (1955)', 'Signed Gentlemen’s Agreement (20 Feb 1956)', 'Assumed TPS Presidency (22 May 1969)', 'Converted TPS into political party (July 1970)', 'Won 10/14 Lok Sabha seats in March 1971', 'Merged TPS into Congress (18 Sep 1971)'],
    places: ['Vikarabad / Hyderabad', 'New Delhi'],
    contribution: 'Transformed the 1969 agitation into an electoral referendum in 1971 (winning 10 of 14 MP seats with ~47% Telangana vote), though his September 1971 merger of TPS into Congress disillusioned student activists.',
    examClue: '1956 Signatory + TPS President from May 1969 + 10 Lok Sabha seats in 1971 (SI 2022 Q.175) + TPS political conversion in July 1970 (PC 2018 Q.182).',
    commonlyConfusedWith: ['Ananthula Madan Mohan (Founder-President of TPS)', 'K. Chandrashekar Rao (Founder of TRS on 27 April 2001)'],
    visualMemoryCue: '10 Spade-Symbol MP Seats (1971) + Stethoscope ("Dr. Chenna Reddy").',
    phase: 'PHASE-I',
    dayNumber: 3,
    monogram: 'MCR',
    accentColor: '#b91c1c',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-BAPUJI',
    fullName: 'Acharya Konda Laxman Bapuji',
    preferredName: 'Konda Laxman Bapuji',
    period: '1942–2012',
    background: 'Quit India freedom fighter, anti-Nizam revolutionary, handloom/cooperative pioneer, Backward Classes champion.',
    mainRole: 'First Telangana Minister to resign from K. Brahmananda Reddy’s cabinet on 27 March 1969 in solidarity with the Telangana movement; hosted TRS foundation at his residence "Jala Drushyam" in 2001; led Jantar Mantar Satyagraha at age 96 in 2012.',
    committees: ['Telangana Congress Samithi (Founded after March 1969 resignation)'],
    roleInCommittee: 'Founder, Telangana Congress Samithi (s2023d-154)',
    otherAssociations: ['Hosted KCR’s TRS launch at Jala Drushyam (April–May 2001)', '2012 Jantar Mantar Satyagraha in New Delhi'],
    govtOrOrgPosts: ['Deputy Speaker (1957)', 'Minister for Information & Public Relations in AP Cabinet (resigned 27 March 1969)'],
    majorEvents: ['Resigned ministership (27 March 1969) & founded Telangana Congress Samithi', 'Provided Jala Drushyam (Tank Bund) for TRS launch (27 April 2001)', 'Undertook Delhi Jantar Mantar Satyagraha for Telangana in 2012 shortly before passing away on 21 Sep 2012'],
    places: ['Wankidi (Asifabad)', 'Jala Drushyam (Hussain Sagar, Hyderabad)', 'Jantar Mantar, New Delhi'],
    contribution: 'Served as the moral bridge across ALL THREE PHASES of the Telangana struggle — from the 1947–48 anti-Nizam fight to the 1969 Ministerial resignation, 2001 Jala Drushyam TRS cradle, and 2012 Jantar Mantar Satyagraha.',
    examClue: 'High-frequency PYQ favourite! Asked in SI 2023 (s2023d-154: founded Telangana Congress Samithi after resigning ministership) & PC 2019 (p2019f-190: undertook Satyagraha at Jantar Mantar in Delhi in 2012).',
    commonlyConfusedWith: ['Konda Venkata Ranga Reddy (shared surname "Konda", different leader — 1956 signatory)', 'Prof. K. Jayashankar (ideologue)'],
    visualMemoryCue: 'Jala Drushyam House by Tank Bund + 1969 Resignation Letter + 2012 Jantar Mantar Khadi Cap.',
    phase: 'PHASE-I',
    dayNumber: 3,
    monogram: 'KLB',
    accentColor: '#d97706',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-WANCHOO',
    fullName: 'Justice Kailas Nath Wanchoo',
    preferredName: 'Justice K.N. Wanchoo',
    period: '1969',
    background: '10th Chief Justice of India (1967–1968), ICS-turned-jurist.',
    mainRole: 'Chairman of the Three-Member Committee of Jurists appointed in April 1969 under PM Indira Gandhi’s Eight-Point Formula to examine constitutional feasibility of continuing Mulki safeguards.',
    committees: ['C-WANCHOO (Wanchoo Committee of Jurists, April 1969)'],
    roleInCommittee: 'Chairman (with MC Setalvad and Niren De)',
    otherAssociations: ['Appointed pursuant to PM Indira Gandhi’s Eight-Point Formula (11 April 1969)'],
    govtOrOrgPosts: ['Former Chief Justice of India'],
    majorEvents: ['Supreme Court struck down Sec 3 of Public Employment Act on 28 March 1969', 'Appointed 19 April 1969; reported in May 1969 that constitutional amendment for residence-based reservation in part of a state faced severe Art 16(3) hurdles, suggesting decentralization of recruitment instead'],
    places: ['New Delhi'],
    contribution: 'Clarified constitutional barriers under Article 16(3), demonstrating why simple executive assurances could not restore Mulki rules — paving the eventual path to the 32nd Constitutional Amendment (Article 371-D) in 1973.',
    examClue: 'Tested directly in PC Mains 2019 (p2019f-189): "In April 1969 the government appointed a committee to make suitable recommendations for constitutional amendments to continue Mulki rules. Who was the Chairman?" → K.N. Wanchoo.',
    commonlyConfusedWith: ['Justice Vashishtha Bhargava (1969 Telangana Revenue Surpluses Committee — also under 8-Point Formula!)', 'Kumar Lalit (Comptroller & Auditor General nominee who did the Jan 1969 initial surplus audit)'],
    visualMemoryCue: 'Two 1969 Twin-Committees: "Wanchoo = Work/Mulki Law; Bhargava = Budget/Surplus Rupees".',
    phase: 'PHASE-I',
    dayNumber: 3,
    monogram: 'KNW',
    accentColor: '#4338ca',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-BHARGAVA',
    fullName: 'Justice Vashishtha Bhargava',
    preferredName: 'Justice V. Bhargava',
    period: '1969',
    background: 'Sitting Judge of the Supreme Court of India.',
    mainRole: 'Chairman of the High-Powered Committee on Telangana Financial Surpluses appointed on 22 April 1969 under the Eight-Point Formula.',
    committees: ['C-BHARGAVA (Justice Bhargava Committee on Telangana Surpluses, 1969)'],
    roleInCommittee: 'Chairman',
    otherAssociations: ['Succeeded Kumar Lalit’s disputed January–March 1969 audit'],
    govtOrOrgPosts: ['Judge, Supreme Court of India'],
    majorEvents: ['Appointed 22 April 1969 to determine unspent Telangana revenue surpluses from 1 Nov 1956 to 31 Mar 1968', 'Assessed Rs. 28.34 crores of unspent Telangana surpluses'],
    places: ['New Delhi', 'Hyderabad'],
    contribution: 'Officially validated Telangana’s financial grievance by proving Rs. 28.34 crores of Telangana’s rightful revenue surplus had been diverted/unspent between 1956 and 1968.',
    examClue: 'Always pair Bhargava = Financial Surpluses (Rs. 28.34 Cr, April 1969) vs Kumar Lalit = Earlier official audit (Rs. 34.10 Cr / disputed figures, Jan 1969) vs Wanchoo = Mulki legal safeguards.',
    commonlyConfusedWith: ['Justice K.N. Wanchoo (Mulki legal committee)', 'J.M. Girglani (2001 GO 610 jobs commission)'],
    visualMemoryCue: 'Ledger Book showing "₹28.34 Cr Telangana Surplus" — B for Bhargava = B for Balance Sheet.',
    phase: 'PHASE-I',
    dayNumber: 3,
    monogram: 'JVB',
    accentColor: '#15803d',
    sourceIds: ['SRC-04', 'SRC-09']
  },
  {
    id: 'P-PVNR',
    fullName: 'Pamulaparti Venkata Narasimha Rao',
    preferredName: 'P.V. Narasimha Rao',
    period: '1971–1973 (CM of AP); 1991–1996 (PM of India)',
    background: 'Statesman, polyglot scholar, freedom fighter from Vangara (Karimnagar/Hanumakonda), first Chief Minister of Andhra Pradesh from Telangana region.',
    mainRole: 'Chief Minister of Andhra Pradesh (30 Sep 1971 – 10 Jan 1973) during the 1972 SC Mulki verdict, Five-Point Formula, and Jai Andhra agitation; resigned leading to President’s Rule and the Six-Point Formula.',
    committees: ['Implemented Post-1971 Indira Congress reconciliation & land ceiling reforms'],
    roleInCommittee: 'Chief Minister of AP (1971–1973)',
    otherAssociations: ['Swami Ramananda Tirtha Memorial / Kakatiya Patrika'],
    govtOrOrgPosts: ['First Telangana-born Chief Minister of AP (Sep 1971 – Jan 1973)', '9th Prime Minister of India (1991–1996)'],
    majorEvents: ['Became CM after Brahmananda Reddy stepped down post-1971 TPS sweep (30 Sep 1971)', 'Enacted radical AP Land Reforms (Ceiling on Agricultural Holdings) Act, 1972', '3 Oct 1972 SC upheld Mulki Rules', '27 Nov 1972 Five-Point Formula', '18 Jan 1973 President’s Rule imposed amid Jai Andhra agitation'],
    places: ['Vangara / Karimnagar', 'Hyderabad', 'New Delhi'],
    contribution: 'First Telangana leader to hold the AP Chief Ministership (15 years after the 1956 merger!), pushed strict Mulki enforcement & land ceilings, triggering coastal landlord/employee backlash in the Jai Andhra agitation.',
    examClue: 'CM of AP during 1972 Supreme Court Mulki judgment & Jai Andhra Movement; resigned in Jan 1973 before President’s Rule (H.C. Sarin advisor) and Sep 1973 Six-Point Formula.',
    commonlyConfusedWith: ['Kasu Brahmananda Reddy (CM during 1969 Telangana agitation)', 'J. Vengala Rao (CM from Dec 1973 who implemented Six-Point Formula & 1975 Presidential Order)'],
    visualMemoryCue: 'CM Sequence Bridge: Brahmananda (1969) → P.V. Narasimha Rao (1971–73) → President’s Rule → J. Vengala Rao (Dec 1973).',
    phase: 'PHASE-II',
    dayNumber: 4,
    monogram: 'PVN',
    accentColor: '#1d4ed8',
    sourceIds: ['SRC-04', 'SRC-08']
  },
  {
    id: 'P-JAYABHARAT',
    fullName: 'K. Jayabharat Reddy, IAS',
    preferredName: 'K. Jayabharat Reddy',
    period: '1984–1986',
    background: 'Senior IAS officer (Chief Secretary / Principal Secretary rank) in N.T. Rama Rao’s government.',
    mainRole: 'Chairman of the Three-Member Officers’ Committee (1985) that investigated violations of the 1975 Presidential Order from 1975 to 1985, directly resulting in G.O. Ms. No. 610 (30 Dec 1985).',
    committees: ['C-JAYABHARAT (Jayabharat Reddy Officers’ Committee, 1985)'],
    roleInCommittee: 'Chairman (with IAS members Kamalnathan and Umapathi Rao)',
    otherAssociations: ['36-page report identifying 58,962 non-local appointments in Telangana Zones V & VI'],
    govtOrOrgPosts: ['Senior IAS Officer, Govt of Andhra Pradesh'],
    majorEvents: ['Appointed in 1985 by CM N.T. Rama Rao after TNGO demands', 'Found ~58,962 non-locals illegally appointed in Telangana local cadres', 'Led directly to issuance of G.O. Ms. No. 610 on 30 December 1985 ordering repatriation by 31 March 1986'],
    places: ['Hyderabad Secretariat'],
    contribution: 'Quantified for the first time with official government data (58,962 irregular non-local appointments) how the 1975 Presidential Order had been systematically violated between 1975 and 1985.',
    examClue: 'Tested in SI Mains 2023 (s2023d-192): "Who presided over the Officers Committee (on Presidential Order violations)?" → Jayabharat Reddy. Remember: Jayabharat Reddy Report → Created GO 610 (1985); Girglani Commission (2001) → Audited WHY GO 610 wasn’t implemented!',
    commonlyConfusedWith: ['J.M. Girglani (2001 One-Man Commission on non-implementation of GO 610)', 'K.R. Amos (TNGO founder leader)'],
    visualMemoryCue: ' magnifying glass finding "58,962 Non-Local Posts" → birthing GO 610 (30 Dec 1985).',
    phase: 'PHASE-II',
    dayNumber: 6,
    monogram: 'KJR',
    accentColor: '#047857',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'P-GIRGLANI',
    fullName: 'Jetu M. Girglani, IAS (Retd.)',
    preferredName: 'J.M. Girglani',
    period: '2001–2004',
    background: 'Retired IAS officer, authority on service rules and the 1975 Presidential Order.',
    mainRole: 'One-Man Commission appointed on 25 June 2001 by CM N. Chandrababu Naidu’s TDP government to examine anomalies & non-implementation of G.O. Ms. No. 610 and the Presidential Order.',
    committees: ['C-GIRGLANI (J.M. Girglani One-Man Commission, 2001–2004)'],
    roleInCommittee: 'Sole Commissioner (One-Man Commission)',
    otherAssociations: ['Interim Report (6 Oct 2001)', 'Final 3-Volume Report (Sep 2004)'],
    govtOrOrgPosts: ['Retired IAS Officer', 'One-Man Commission on GO 610 / Presidential Order'],
    majorEvents: ['Appointed 25 June 2001 (G.O. Rt. No. 2704)', 'Submitted Preliminary Report on 6 Oct 2001', 'Submitted Final Report in Sep 2004 to CM Y.S. Rajasekhara Reddy documenting 126 findings across 18 categories of Presidential Order violations (including bogus domicile certificates & Secretariat/HoD loopholes)'],
    places: ['Hyderabad'],
    contribution: 'Delivered an encyclopedic 3-volume legal-administrative indictment proving that Telangana’s local reservation under the 1975 Presidential Order had been subverted through 18 distinct mechanisms.',
    examClue: 'Repeatedly asked in BOTH SI & PC! SI Prelims 2022 (s2022-171): "Commission appointed by TDP govt in June 2001" & PC Mains 2019 (p2019f-188): "Commission appointed in 2001 for implementation of GO 610".',
    commonlyConfusedWith: ['K. Jayabharat Reddy (1985 Officers Committee before GO 610)', 'Justice V. Bhargava (1969 financial surpluses)'],
    visualMemoryCue: 'One-Man Desk (June 2001 → Sep 2004): "Girglani = GO 610 Post-Mortem (18 Violation Types, 126 Findings)".',
    phase: 'PHASE-III',
    dayNumber: 6,
    monogram: 'JMG',
    accentColor: '#6d28d9',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'P-JAYASHANKAR',
    fullName: 'Prof. Kothapalli Jayashankar',
    preferredName: 'Prof. K. Jayashankar ("Pedda Sir")',
    period: '1952–2011',
    background: 'Economist, Vice-Chancellor of Kakatiya University, Registrar of CIEFL, lifelong Telangana ideologue from Akkampet (Warangal).',
    mainRole: 'Chief Ideologue of the Telangana Movement across all three phases (1952 anti-Non-Mulki protestor, 1969 Telangana Jana Sabha/Research scholar, 1990s Centre for Telangana Studies / Aikya Vedika, 2001–2011 TRS & TJAC mentor).',
    committees: ['Telangana Aikya Vedika (1997)', 'Centre for Telangana Studies', 'Advisory guide to TRS (2001) & TJAC (2009)'],
    roleInCommittee: 'Chief Ideologue & Convening Architect',
    otherAssociations: ['1952 Warangal student protests', 'Presented testimony to SRC (1954) & Srikrishna Committee (2010)'],
    govtOrOrgPosts: ['Vice-Chancellor, Kakatiya University (1991–1994)', 'Principal, CKM College Warangal'],
    majorEvents: ['Walked out of class in 1952 Mulki protest', 'Co-organized 1969 intellectual forums', 'Led 1997–99 US/Telangana diaspora & Telangana Aikya Vedika intellectual revival', 'Guided KCR in founding TRS (2001) and co-steered movement until his demise on 21 June 2011'],
    places: ['Akkampet / Hanumakonda (Warangal)', 'Kakatiya University', 'Hyderabad'],
    contribution: 'Authored rigorous empirical research on irrigation, education, and fiscal exploitation ("Telangana Rashtram – Oka Demand"), framing statehood around Three Core Pillars: Neellu (Water), Nidhulu (Funds), Niyamakalu (Jobs).',
    examClue: 'Lifelong Ideologue from 1952 to 2011; VC of Kakatiya University; key architect of Telangana Aikya Vedika (1997) & mentor to TRS/TJAC; Jayashankar Bhupalpally district & Agricultural University named after him.',
    commonlyConfusedWith: ['Prof. M. Kodandaram (Chairman/Convener of TJAC formed Dec 2009)', 'Kaloji Narayana Rao (People’s Poet of Warangal)'],
    visualMemoryCue: 'Spectacles + Three Pillars Diagram ("Neellu, Nidhulu, Niyamakalu") spanning 1952 → 1969 → 2011.',
    phase: 'PHASE-III',
    dayNumber: 7,
    monogram: 'PKJ',
    accentColor: '#0f172a',
    sourceIds: ['SRC-04', 'SRC-09', 'SRC-10']
  },
  {
    id: 'P-KALOJI',
    fullName: 'Padma Vibhushan Kaloji Narayana Rao',
    preferredName: 'Praja Kavi Kaloji Narayana Rao',
    period: '1914–2002',
    background: 'People’s Poet ("Praja Kavi"), freedom fighter against Nizam rule, MLC, Padma Vibhushan awardee (1992). Author of "Naa Godava".',
    mainRole: 'Moral & literary conscience of Telangana; supported 1969 student fasts and presided/inaugurated key 1997 Democratic Telangana conferences including the December 1997 Warangal AIPRF gathering.',
    committees: ['Telangana Writers Forum / Democratic Telangana Conference (Dec 1997)'],
    roleInCommittee: 'Presiding / Inaugural Cultural Luminary',
    otherAssociations: ['Andhra Saraswatha Parishad', '1969 Telangana Safeguards Movement'],
    govtOrOrgPosts: ['Member of AP Legislative Council (MLC)', 'Padma Vibhushan (1992)'],
    majorEvents: ['Supported Ravindranath’s 1969 Khammam fast', 'Associated with Dec 1997 Democratic Telangana Conference under AIPRF banner in Warangal (tested in SI 2022 Q.170)', '9 September (his birthday) is celebrated officially as Telangana Language Day (Telangana Bhasha Dinotsavam)'],
    places: ['Madikonda / Hanumakonda (Warangal)'],
    contribution: 'Gave fearless poetic voice to Telangana dialect and resistance ("Putuka needi, chaavu needi, bathuku antha deshanidi").',
    examClue: 'Tested directly in SI Prelims 2022 (s2022-170) in connection with Dec 1997 Democratic Telangana conference; author of "Naa Godava"; 9 September = Telangana Language Day.',
    commonlyConfusedWith: ['Gaddar (balladeer — "Podustunna Poddu Meeda")', 'Ande Sri ("Jaya Jayahe Telangana" state song poet)', 'Goreti Venkanna ("Palle Kanneeru Peduthundo")'],
    visualMemoryCue: 'Quill Pen + "Naa Godava" Book + Warangal Fort Arch.',
    phase: 'PHASE-III',
    dayNumber: 7,
    monogram: 'KNR',
    accentColor: '#9a3412',
    sourceIds: ['SRC-09', 'SRC-10']
  },
  {
    id: 'P-KCR',
    fullName: 'Kalvakuntla Chandrashekar Rao',
    preferredName: 'K. Chandrashekar Rao (KCR)',
    period: '2001–2014 (First CM of Telangana 2014–2023)',
    background: 'Legislator from Siddipet, former TDP Cabinet Minister & Deputy Speaker of AP Legislative Assembly.',
    mainRole: 'Resigned as Deputy Speaker & MLA on 27 April 2001 to found Telangana Rashtra Samithi (TRS) at Jala Drushyam; undertook the decisive fast-unto-death on 29 November 2009 that triggered the 9 December 2009 announcement; sworn in as First Chief Minister of Telangana on 2 June 2014.',
    committees: ['Telangana Rashtra Samithi (Founder President, 27 April 2001)'],
    roleInCommittee: 'Founder President of TRS',
    otherAssociations: ['UPA-I Union Labour Minister (2004–2006)', 'Karimnagar Simha Garjana (17 May 2001)'],
    govtOrOrgPosts: ['Deputy Speaker, AP Assembly (1999–2001)', 'Union Minister of Labour & Employment (2004–2006)', 'First Chief Minister of Telangana State (2 June 2014)'],
    majorEvents: ['Founded TRS at Jala Drushyam (27 April 2001)', 'Simha Garjana at Karimnagar (17 May 2001)', 'Arrested at Alganoor / Khammam while heading to Siddipet (Rangadhampally) for fast-unto-death on 29 Nov 2009 ("Telangana వచ్చుడో — కేసీఆర్ చచ్చుడో")', '11-day fast culminating in 9 Dec 2009 Centre statement', 'Sworn in as 1st CM of Telangana on 2 June 2014'],
    places: ['Chintamadaka (Siddipet)', 'Jala Drushyam (Hyderabad)', 'Karimnagar / Khammam / NIMS Hospital'],
    contribution: 'Converted Telangana regional sentiment into a sustained single-point electoral and parliamentary force from 2001 to 2014.',
    examClue: '27 April 2001 TRS foundation (SI 2022 Q.172); 29 Nov 2009 arrest & fast (PC 2019 Q.185 notes 28/29 Nov 2009 Karimnagar Uttara Telangana Bhavan episode); First CM on 2 June 2014.',
    commonlyConfusedWith: ['Dr. M. Chenna Reddy (TPS 1969)', 'T. Devender Goud (founded Nava Telangana Praja Party in 2008)', 'Ale Narendra (founded Telangana Sadhana Samithi in 2001 before merging with TRS)'],
    visualMemoryCue: 'Pink Flag at Jala Drushyam (27 Apr 2001) → 11-Day Fast Calendar (29 Nov – 9 Dec 2009).',
    phase: 'PHASE-III',
    dayNumber: 8,
    monogram: 'KCR',
    accentColor: '#db2777',
    sourceIds: ['SRC-04', 'SRC-05', 'SRC-10']
  },
  {
    id: 'P-KODANDARAM',
    fullName: 'Prof. Muddasani Kodandaram Reddy',
    preferredName: 'Prof. M. Kodandaram',
    period: '2009–2014',
    background: 'Professor of Political Science at Osmania University and civil liberties scholar.',
    mainRole: 'Chairman / Convener of the Telangana Joint Action Committee (TJAC) formed on 24 December 2009, uniting political parties, employee unions (TNGOs), students, lawyers, Singareni & RTC workers.',
    committees: ['C-TJAC (Telangana Joint Action Committee, formed 24 Dec 2009)'],
    roleInCommittee: 'Chairman / Convener',
    otherAssociations: ['Telangana Vidyavantula Vedika (TVV)'],
    govtOrOrgPosts: ['Professor, Osmania University', 'Chairman, TJAC (2009–2014)'],
    majorEvents: ['Formation of TJAC (24 Dec 2009)', 'Non-Cooperation Movement (Feb 2011)', 'Million March at Tank Bund (10 March 2011)', '42-day Sakala Janula Samme (13 Sep – 24 Oct 2011)', 'Rail Roko (15–17 Oct 2011)', 'Sagara Haram / Telangana March (30 Sep 2012)', 'Sansad Yatra (2013)'],
    places: ['Osmania University', 'Tank Bund / Necklace Road, Hyderabad'],
    contribution: 'Orchestrated non-violent Gandhian mass civil-disobedience campaigns across all 10 Telangana districts, keeping political parties and 300+ civil/employee associations under one umbrella.',
    examClue: 'TJAC Chairman/Convener; led Sakala Janula Samme (PC 2016 p2016f-154), Million March (10 Mar 2011), Rail Roko (15 Oct 2011, SI 2023 s2023d-172), and Sagara Haram (30 Sep 2012).',
    commonlyConfusedWith: ['Prof. K. Jayashankar (Senior Ideologue, passed away June 2011)', 'M. Rajender Reddy (Convener of Telangana Advocates JAC — PC 2016 p2016f-152)', 'K. Swamy Goud (TNGO / Employees JAC leader)'],
    visualMemoryCue: 'Umbrella uniting Students + Employees + Parties ("24 Dec 2009 TJAC = Kodandaram").',
    phase: 'PHASE-III',
    dayNumber: 9,
    monogram: 'PMK',
    accentColor: '#0284c7',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-SRIKRISHNA',
    fullName: 'Justice Bellur Narayanaswamy Srikrishna',
    preferredName: 'Justice B.N. Srikrishna',
    period: '2010',
    background: 'Retired Judge of the Supreme Court of India.',
    mainRole: 'Chairman of the 5-member Committee for Consultations on the Situation in Andhra Pradesh (CCSAP), popularly known as the Srikrishna Committee, appointed by MHA on 3 February 2010.',
    committees: ['C-SRIKRISHNA (CCSAP / Justice Srikrishna Committee, Feb–Dec 2010)'],
    roleInCommittee: 'Chairman',
    otherAssociations: ['Submitted 2-volume report + controversial sealed/8th chapter note on 30 December 2010'],
    govtOrOrgPosts: ['Former Judge, Supreme Court of India', 'Chairman, CCSAP (2010)'],
    majorEvents: ['Appointed 3 February 2010 (SI 2023 s2023d-160)', 'Toured AP & received ~1 lakh representations', 'Submitted Report on 30 December 2010 outlining 6 Options'],
    places: ['New Delhi', 'Hyderabad & Telangana/Andhra districts'],
    contribution: 'Produced the most comprehensive modern socio-economic investigation of regional disparities in AP, presenting 6 constitutional/political options (preferring united AP with statutory Telangana Regional Council as #6, or bifurcation into Telangana & Seemandhra with Hyderabad as UT/common arrangement as #5 second-best).',
    examClue: 'Appointment date = 3 February 2010 (SI 2023 Q.160); Submission = 30 December 2010; 5 Total Members: Justice B.N. Srikrishna (Chair), Prof. Ranbir Singh, Dr. Abusaleh Shariff, Prof. Ravinder Kaur, and Vinod K. Duggal (Member-Secretary) — tested in PC 2016 Q.195!',
    commonlyConfusedWith: ['Pranab Mukherjee (2005 UPA Cabinet Sub-Committee)', 'A.K. Antony (2013 AICC Committee & Oct 2013 GoM member)', 'Sushil Kumar Shinde (Home Minister who chaired 2013 GoM & introduced Bill in Lok Sabha on 13 Feb 2014)'],
    visualMemoryCue: '5-Finger Hand ("Srikrishna + Ranbir + Ravinder + Shariff + Duggal") holding "6 Options Book (3 Feb → 30 Dec 2010)".',
    phase: 'PHASE-III',
    dayNumber: 9,
    monogram: 'BNS',
    accentColor: '#4f46e5',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'P-SRIKANTHACHARI',
    fullName: 'Kasoju Srikantha Chary',
    preferredName: 'Srikantha Chary',
    period: '2009',
    background: 'Law student and Telangana student activist from Podichedu (Mothkur, Yadadri-Bhuvanagiri / erstwhile Nalgonda).',
    mainRole: 'First student martyr of the decisive 2009 phase of the Telangana Movement.',
    committees: ['Telangana Student Movement (2009)'],
    roleInCommittee: 'First Martyr of Final Phase (2009)',
    otherAssociations: ['TRSV Student Wing'],
    govtOrOrgPosts: ['Law Student'],
    majorEvents: ['Self-immolation at Ambedkar Statue, L.B. Nagar crossroads on 29 November 2009 protesting KCR’s arrest and demanding statehood', 'Succumbed to burns at Apollo/DRDO hospital on 3 December 2009 chanting "Jai Telangana"'],
    places: ['Ambedkar Statue, L.B. Nagar (Hyderabad)', 'Podichedu (Nalgonda)'],
    contribution: 'His sacrifice on 29 Nov – 3 Dec 2009 galvanized tens of thousands of Osmania and Kakatiya University students into an unstoppable uprising that forced the Union Government’s 9 December 2009 announcement.',
    examClue: 'Tested directly in PC 2018 (p2018-181) Match the Following Martyrs & Places: Srikantha Chary → Ambedkar Statue, L.B. Nagar; Yadaiah → NCC Gate OU (20 Feb 2010); Ishan Reddy → OU Campus / Maisamma Temple (Jul 2010); Yadi Reddy → Shastri Bhavan, New Delhi (Jul 2011).',
    commonlyConfusedWith: ['Shankar (first martyr of 1969 agitation in Secunderabad/Shadnagar firing)', 'Siripuram Yadaiah (NCC Gate OU, Feb 2010)', 'K. Yadi Reddy (Shastri Bhavan, New Delhi, 2011)'],
    visualMemoryCue: 'Eternal Flame at L.B. Nagar Ambedkar Statue (29 Nov – 3 Dec 2009).',
    phase: 'PHASE-III',
    dayNumber: 8,
    monogram: 'KSC',
    accentColor: '#e11d48',
    sourceIds: ['SRC-10', 'SRC-09']
  }
];

export const COMMITTEES: CommitteeCard[] = [
  {
    id: 'C-JAGANMOHAN',
    name: 'Justice Pingali Jaganmohan Reddy Inquiry Committee (1952)',
    chairman: 'Justice Pingali Jaganmohan Reddy',
    chairmanId: 'P-JAGANMOHAN',
    members: ['Single-Judge Judicial Inquiry Commission (Hyderabad High Court)'],
    appointmentDate: 'September 1952 (following 3–4 Sep 1952 firing)',
    reason: 'Widespread anti-Non-Mulki student protests starting in Warangal (July/Aug 1952) and culminating in police firing near City College & Afzalgunj, Hyderabad on 3–4 September 1952.',
    appointingAuthority: 'Burgula Ramakrishna Rao Government (Hyderabad State)',
    headquarters: 'Hyderabad',
    mandate: 'To inquire into the circumstances, necessity, and justification of the police firing on student protestors on 3 and 4 September 1952.',
    recommendations: [
      'Examined over 100 witnesses including students, officials, and magistrates.',
      'Documented deep local anxiety over bogus Mulki certificates and influx of non-local employees into Hyderabad State service.',
      'Recommended administrative tightening of Mulki verification and crowd-control reforms.'
    ],
    submissionDate: '28 December 1952',
    aftermath: 'Confirmed that genuine Mulki grievances lay beneath student anger, prompting Cabinet sub-committee circulars on Mulki verification before SRC was formed in 1953.',
    previousRelated: '1919 Nizam Mulki Farman',
    subsequentRelated: 'States Reorganisation Commission (SRC, Dec 1953)',
    phase: 'PHASE-I',
    dayNumber: 1,
    category: 'Commission',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'C-SRC',
    name: 'States Reorganisation Commission (SRC / Fazal Ali Commission)',
    chairman: 'Justice Syed Fazal Ali',
    chairmanId: 'P-FAZAL',
    members: ['Hriday Nath Kunzru (H.N. Kunzru)', 'Kavalam Madhava Panikkar (K.M. Panikkar)'],
    appointmentDate: '22 December 1953 (announced in Parliament; Resolution dated 29 Dec 1953)',
    reason: 'Formation of Andhra State (1 Oct 1953) intensified nationwide demands for linguistic reorganisation of Indian states, including conflicting demands for Visalandhra vs Separate Telangana.',
    appointingAuthority: 'Government of India (Ministry of Home Affairs, PM Jawaharlal Nehru)',
    headquarters: 'New Delhi',
    mandate: 'To investigate the conditions of the problem, historical background, existing situation, and all relevant factors (unity, security, financial/administrative viability, not language alone) for reorganising states.',
    recommendations: [
      'Recommended disintegration of multi-lingual Hyderabad State (Marathwada to Bombay, Karnataka districts to Mysore).',
      'CRUCIAL (Paras 386–388): Explicitly REJECTED immediate merger of Telangana with Andhra!',
      'Recommended residuary Hyderabad (Telangana) remain a SEPARATE STATE for at least 5 years, with unification after the 1961 General Elections ONLY if a two-thirds (2/3rd) majority of the Hyderabad State Legislature voted in favour.'
    ],
    submissionDate: '30 September 1955',
    aftermath: 'Central Congress leadership & Andhra leaders lobbied for immediate Visalandhra despite SRC’s warning, leading to the compromise Gentlemen’s Agreement on 20 February 1956 and merger on 1 November 1956.',
    previousRelated: 'Dhar Commission (1948) & JVP Committee (1949)',
    subsequentRelated: 'Gentlemen’s Agreement (20 February 1956)',
    phase: 'PHASE-I',
    dayNumber: 2,
    category: 'Commission',
    sourceIds: ['SRC-06', 'SRC-04']
  },
  {
    id: 'C-GENTLEMEN',
    name: 'Gentlemen’s Agreement (1956)',
    chairman: 'Brokered under Union Home Minister Govind Ballabh Pant (No single chair; 8 equal Regional Signatories)',
    chairmanId: 'P-BURGULA',
    members: [
      '4 TELANGANA SIGNATORIES: (1) Burgula Ramakrishna Rao, (2) K.V. Ranga Reddy, (3) Dr. Marri Chenna Reddy, (4) J.V. Narsing Rao',
      '4 ANDHRA SIGNATORIES: (5) Bezawada Gopala Reddy (CM of Andhra), (6) Neelam Sanjeeva Reddy, (7) Sardar Gouthu Latchanna, (8) Alluri Satyanarayana Raju (APCC President)'
    ],
    appointmentDate: 'Signed on 20 February 1956',
    reason: 'To allay Telangana’s fears of economic, administrative, and political domination before overriding SRC’s separate-state recommendation to form Andhra Pradesh.',
    appointingAuthority: 'Congress High Command & Union Ministry of Home Affairs (Tabled as "Note on Safeguards proposed for the Telangana Area" in Parliament on 10 August 1956)',
    headquarters: 'Hyderabad House, New Delhi',
    mandate: '14-Point political and administrative accord guaranteeing safeguards for Telangana within unified Andhra Pradesh.',
    recommendations: [
      'Separate revenue/expenditure accounting: Telangana surpluses reserved exclusively for Telangana development (5-year review).',
      '12-year domicile (Mulki) requirement for subordinate jobs & educational institutions in Telangana.',
      'Creation of statutory Telangana Regional Committee (20 members design) with strong powers over regional development, land sale control, and services.',
      'Cabinet ratio 60:40 (Andhra:Telangana) with at least one Muslim minister from Telangana.',
      'CM / Deputy CM reciprocity: If Chief Minister is from Andhra, Deputy Chief Minister MUST be from Telangana (and vice-versa); 2 out of 5 key portfolios (Home, Finance, Revenue, Planning & Development, Commerce & Industry) to Telangana.',
      'Separate Pradesh Congress Committee (TPCC) for Telangana up to end of 1962.'
    ],
    submissionDate: '20 February 1956 (Tabled in Lok Sabha 10 Aug 1956)',
    aftermath: 'Violated from Day 1 (1 Nov 1956): First CM Neelam Sanjeeva Reddy refused to appoint a Telangana Deputy CM, calling the post "a sixth finger to a hand" (SI 2022 Q.178), triggering cumulative grievances that exploded in January 1969.',
    previousRelated: 'States Reorganisation Commission Report (Sep 1955)',
    subsequentRelated: 'Telangana Regional Committee Order (Feb 1958) & Public Employment Act (1957)',
    phase: 'PHASE-I',
    dayNumber: 2,
    category: 'Agreement/Formula',
    sourceIds: ['SRC-04', 'SRC-09', 'SRC-10']
  },
  {
    id: 'C-TRC',
    name: 'Telangana Regional Committee (TRC)',
    chairman: 'K. Achutha Reddy (First Chairman, 1958)',
    chairmanId: 'P-ACHUTHA',
    members: ['All MLAs elected from Telangana constituencies (later chaired by T. Hayagrivachary and J. Chokka Rao)'],
    appointmentDate: '1 February 1958 (via Andhra Pradesh Regional Committee Order, 1958 under Article 371(1))',
    reason: 'Constitutional implementation of Clause 9 of the 1956 Gentlemen’s Agreement via the 7th Constitutional Amendment Act, 1956 (modifying Art 371).',
    appointingAuthority: 'President of India (Dr. Rajendra Prasad) under Article 371(1)',
    headquarters: 'AP Legislative Assembly, Hyderabad',
    mandate: 'Statutory legislative committee empowered to scrutinize scheduled regional matters: local administration, primary/secondary education, Telangana development plans, cottage/small industries, agriculture, and regulation of agricultural land transfers (though notably weakened on direct recruitment control).',
    recommendations: [
      'Repeatedly flagged diversion of Telangana budget surpluses to Andhra irrigation projects.',
      'Highlighted mass appointment of non-Mulkis on bogus certificates in Telangana districts.',
      'Submitted white papers that supplied statistical ammunition for the 1969 agitation.'
    ],
    submissionDate: 'Active 1958–1973 (Abolished under Six-Point Formula / 32nd Amendment, 1973)',
    aftermath: 'Enlarged slightly under Indira Gandhi’s 8-Point Formula (1969), then ABOLISHED completely under the Six-Point Formula of September 1973!',
    previousRelated: 'Gentlemen’s Agreement (1956) & 7th Constitutional Amendment (1956)',
    subsequentRelated: 'Abolished by Six-Point Formula (21 Sep 1973) & 32nd Amendment Act',
    phase: 'PHASE-I',
    dayNumber: 2,
    category: 'Constitutional/GO',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'C-8POINT',
    name: 'Eight-Point Formula (1969)',
    chairman: 'Announced by Prime Minister Indira Gandhi',
    chairmanId: 'P-WANCHOO',
    members: ['Spawned Justice V. Bhargava Committee (Surpluses) & Justice K.N. Wanchoo Committee (Mulki Law)'],
    appointmentDate: '11 April 1969',
    reason: 'Escalation of the 1969 Jai Telangana agitation AND the Supreme Court judgment of 28 March 1969 striking down Section 3 of the Public Employment Act, 1957.',
    appointingAuthority: 'Prime Minister of India (Indira Gandhi) in Lok Sabha',
    headquarters: 'New Delhi',
    mandate: '8-point executive package to pacify Telangana without bifurcating Andhra Pradesh.',
    recommendations: [
      '(1) High-Powered Committee (Justice V. Bhargava) to determine Telangana financial surpluses.',
      '(2) Telangana Development Committee chaired by CM with Planning Commission member.',
      '(3) Plan Implementation Committee of officers chaired by Planning Commission Adviser.',
      '(4) Delegation of wider powers to Telangana Regional Committee.',
      '(5) Committee of Jurists (Justice K.N. Wanchoo) to examine constitutional safeguards for public employment.',
      '(6–8) Central PM-level periodic review, grievance redressal for service integration (Central/State Advisory Committees).'
    ],
    submissionDate: '11 April 1969',
    aftermath: 'Rejected outright by Telangana Praja Samithi & students because it refused statehood and kept CM K. Brahmananda Reddy in office; agitation intensified through May–September 1969.',
    previousRelated: '19 January 1969 All-Party Accord & Kumar Lalit Audit',
    subsequentRelated: 'Five-Point Formula (27 November 1972)',
    phase: 'PHASE-I',
    dayNumber: 3,
    category: 'Agreement/Formula',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'C-WANCHOO',
    name: 'Justice K.N. Wanchoo Committee of Jurists (1969)',
    chairman: 'Justice K.N. Wanchoo (Former CJI)',
    chairmanId: 'P-WANCHOO',
    members: ['M.C. Setalvad (First Attorney General of India)', 'Niren De (Attorney General of India)'],
    appointmentDate: '19 April 1969',
    reason: 'Follow-up to Point 5 of Indira Gandhi’s Eight-Point Formula after Supreme Court struck down Sec 3 of Public Employment Act, 1957 on 28 March 1969.',
    appointingAuthority: 'Government of India',
    headquarters: 'New Delhi',
    mandate: 'To examine feasibility of constitutional or legislative measures to provide safeguards in public employment for Telangana people.',
    recommendations: [
      'Advised that amending Article 16(3) for intra-state residence reservation was constitutionally undesirable.',
      'Recommended administrative decentralization of recruitment to district/regional levels instead.'
    ],
    submissionDate: 'May 1969',
    aftermath: 'Left Mulki legal status fragile until AP High Court & Supreme Court (3 Oct 1972) upheld original Nizam Mulki Rules under Article 35(b).',
    previousRelated: 'SC Verdict in A.V.S. Narasimha Rao case (28 March 1969)',
    subsequentRelated: 'SC Mulki Validation Verdict (3 Oct 1972) & 32nd Amendment (1973)',
    phase: 'PHASE-I',
    dayNumber: 3,
    category: 'Committee',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'C-BHARGAVA',
    name: 'Justice Vashishtha Bhargava Committee (1969)',
    chairman: 'Justice Vashishtha Bhargava',
    chairmanId: 'P-BHARGAVA',
    members: ['Prof. M.V. Mathur', 'Haribhushan Bhar (Senior Audit Officer)'],
    appointmentDate: '22 April 1969',
    reason: 'Follow-up to Point 1 of Eight-Point Formula after Telangana leaders rejected Kumar Lalit’s accounting methodology.',
    appointingAuthority: 'Government of India',
    headquarters: 'New Delhi / Hyderabad',
    mandate: 'To determine the exact revenue surpluses of Telangana accrued between 1 November 1956 and 31 March 1968 that remained unspent on Telangana.',
    recommendations: [
      'Calculated unspent Telangana revenue surpluses at Rs. 28.34 Crores ( Rs. 283.4 million ).',
      'Recommended the Union Government extend special central loan/assistance so this shortfall was spent on Telangana development during the Fourth Five-Year Plan.'
    ],
    submissionDate: 'October 1969',
    aftermath: 'Government of India accepted the Rs. 28.34 Cr figure (plus Rs. 17 Cr additional development outlay = Rs. 45 Cr package), officially vindicating Telangana’s claim of fiscal diversion.',
    previousRelated: 'Kumar Lalit Audit Report (March 1969)',
    subsequentRelated: 'Telangana Development Committee reviews (1970)',
    phase: 'PHASE-I',
    dayNumber: 3,
    category: 'Committee',
    sourceIds: ['SRC-04', 'SRC-09']
  },
  {
    id: 'C-5POINT',
    name: 'Five-Point Formula (1972)',
    chairman: 'Announced by Prime Minister Indira Gandhi',
    chairmanId: 'P-PVNR',
    members: ['Enacted via Mulki Rules Act, 1972 (passed by Parliament on 23 Dec 1972)'],
    appointmentDate: '27 November 1972',
    reason: 'On 3 October 1972, the Supreme Court UPHELD the validity of Mulki Rules (Director of Industries v. V. Venkata Reddy), triggering fierce counter-protests in Coastal Andhra & Rayalaseema ("Jai Andhra" stir).',
    appointingAuthority: 'Prime Minister of India (Indira Gandhi)',
    headquarters: 'New Delhi',
    mandate: 'Compromise formula time-limiting Mulki Rules instead of keeping them permanent.',
    recommendations: [
      '(1) Mulki residential qualification to continue ONLY up to end of December 1977 in twin cities of Hyderabad & Secunderabad, and up to end of December 1980 in the rest of Telangana!',
      '(2) Safeguards restricted to non-gazetted posts, Tahsildars, Junior Engineers, and Civil Assistant Surgeons (up to 2nd promotion stage).',
      '(3) Composite regionalized police force in Hyderabad & Secunderabad drawn from both regions.',
      '(4) Educational seats in twin cities expanded without reducing existing access.',
      '(5) Composite Secretariat staffing ratios.'
    ],
    submissionDate: '27 November 1972 (Mulki Rules Act passed 23 Dec 1972)',
    aftermath: 'Satisfied NEITHER Telangana (angry that eternal 1919 Mulki Rules were given an expiry date of 1977/1980) NOR Andhra agitators (who launched full-blown Jai Andhra Movement demanding immediate abolition of Mulki Rules or separate Andhra state), forcing CM P.V. Narasimha Rao’s resignation & President’s Rule in Jan 1973.',
    previousRelated: 'Eight-Point Formula (11 April 1969) & SC Verdict (3 Oct 1972)',
    subsequentRelated: 'Six-Point Formula (21 September 1973)',
    phase: 'PHASE-II',
    dayNumber: 4,
    category: 'Agreement/Formula',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'C-6POINT',
    name: 'Six-Point Formula (1973)',
    chairman: 'Central Government / PM Indira Gandhi & AP Political Consensus',
    chairmanId: 'P-PVNR',
    members: ['Constitutionalized via 32nd Constitutional Amendment Act, 1973 (Articles 371-D & 371-E)'],
    appointmentDate: '21 September 1973',
    reason: 'To end President’s Rule (imposed 18 Jan 1973) and settle the Jai Andhra agitation while replacing region-specific Telangana safeguards with state-wide "local candidate" zonalization.',
    appointingAuthority: 'Government of India (Ministry of Home Affairs)',
    headquarters: 'New Delhi',
    mandate: 'Comprehensive 6-point restructuring of development planning, education, employment cadres, service tribunal, constitutional protection, and abolition of old Telangana-specific safeguards.',
    recommendations: [
      '(1) Accelerated development of backward areas of the WHOLE state via a State-level Planning Board & regional sub-committees.',
      '(2) Uniform state-wide preference to "local candidates" in institutional admissions; establishment of a Central University in Hyderabad (University of Hyderabad, Art 371-E).',
      '(3) Preference to "local candidates" in direct recruitment to non-gazetted, equivalent & specified junior gazetted posts via local/zonal cadres.',
      '(4) High-powered Administrative Tribunal for service seniority/promotion disputes.',
      '(5) Constitutional Amendment (32nd Amendment -> Article 371-D) to make points 2–4 immune to ordinary judicial strike-down.',
      '(6) CRITICAL LOSS FOR TELANGANA: Complete ABOLITION of both Mulki Rules AND the Telangana Regional Committee (TRC) as "redundant"!'
    ],
    submissionDate: '21 September 1973 (32nd Amendment effective 1 July 1974; Presidential Order issued 18 Oct 1975)',
    aftermath: 'NOTE EXAM TRAP (PC 2019 Q.194): It did NOT establish two separate High Courts! It created Central University of Hyderabad, abolished Mulki Rules & TRC, installed J. Vengala Rao as CM (10 Dec 1973), and led to the 1975 Presidential Order (6 Zones, with Zones V & VI in Telangana and Clause 14 "Free Zone" loophole in Hyderabad).',
    previousRelated: 'Five-Point Formula (27 Nov 1972)',
    subsequentRelated: '32nd Constitutional Amendment (Art 371-D/E) & Presidential Order (18 Oct 1975)',
    phase: 'PHASE-II',
    dayNumber: 4,
    category: 'Agreement/Formula',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'C-PRESORDER75',
    name: 'Presidential Order, 1975 & Article 371-D',
    chairman: 'Issued by President Fakhruddin Ali Ahmed under Article 371-D',
    chairmanId: 'P-JAYABHARAT',
    members: ['G.S.R. 524(E) dated 18 October 1975; AP G.O.P. No. 674 dated 20 October 1975'],
    appointmentDate: '18 October 1975',
    reason: 'Operationalizing Clauses (1) and (2) of Article 371-D (inserted by 32nd Amendment Act, 1973) to organize local cadres and regulate direct recruitment across Andhra Pradesh.',
    appointingAuthority: 'President of India',
    headquarters: 'New Delhi / Hyderabad',
    mandate: 'Divided Andhra Pradesh into 6 Zones (later 7 with police/health variations; Telangana comprised Zone V [Adilabad, Karimnagar, Warangal, Khammam] and Zone VI [Hyderabad, Nizamabad, Mahbubnagar, Medak, Nalgonda, Ranga Reddy]).',
    recommendations: [
      'Defined "Local Candidate" by 4 consecutive academic years of study (ending Class X/qualifying exam) out of 7 preceding years.',
      'Reserved 80% district cadre, 70% non-gazetted zonal cadre, and 60% specified gazetted zonal posts for local candidates.',
      'Para 14 Exemptions: Secretariat, Offices of Heads of Departments, State-level institutions, Major Development Projects, and Hyderabad City Police Commissionerate were exempted — later sparking the huge "Zone VI / Hyderabad Free Zone" controversy (2009 SC verdict)!'
    ],
    submissionDate: '18 October 1975 (Republished by AP Govt 20 Oct 1975)',
    aftermath: 'Systematic violation of local reservations between 1975 and 1985 (58,962 non-locals recruited in Zones V & VI) forced NTR Govt to appoint Jayabharat Reddy Committee and issue GO 610 (30 Dec 1985).',
    previousRelated: 'Six-Point Formula (21 Sep 1973) & 32nd Amendment (1 July 1974)',
    subsequentRelated: 'Jayabharat Reddy Officers Committee (1985) & G.O. Ms. No. 610 (30 Dec 1985)',
    phase: 'PHASE-II',
    dayNumber: 5,
    category: 'Constitutional/GO',
    sourceIds: ['SRC-04', 'SRC-07']
  },
  {
    id: 'C-JAYABHARAT',
    name: 'Jayabharat Reddy Officers’ Committee & G.O. Ms. No. 610 (1985)',
    chairman: 'K. Jayabharat Reddy, IAS',
    chairmanId: 'P-JAYABHARAT',
    members: ['R. Kamalnathan, IAS', 'Umapathi Rao, IAS'],
    appointmentDate: '1985 (GO 610 issued 30 December 1985)',
    reason: 'Persistent agitation by Telangana Non-Gazetted Officers (TNGOs) against illegal recruitment & transfers of non-locals into Telangana Zones V & VI after 18 Oct 1975.',
    appointingAuthority: 'Government of Andhra Pradesh (CM N.T. Rama Rao)',
    headquarters: 'Hyderabad Secretariat',
    mandate: 'To review implementation of the 1975 Presidential Order from 1975–1985 and identify irregular non-local appointments in Telangana.',
    recommendations: [
      'Submitted a 36-page report identifying 58,962 non-local employees appointed in violation of the Presidential Order in Zones V & VI.',
      'Resulted in G.O. Ms. No. 610 (GA SPF-A Dept, dated 30 December 1985) directing repatriation of all non-locals appointed against local quotas in Zones V & VI back to their native zones on or before 31 March 1986 (including supernumerary posts where needed).'
    ],
    submissionDate: '1985 (GO 610 issued 30 December 1985)',
    aftermath: 'Successive governments failed to repatriate the non-locals by the 31 March 1986 deadline (citing litigation & administrative excuses), turning "Implement GO 610!" into a central rallying cry up to 2001–2009.',
    previousRelated: 'Presidential Order, 1975 (18 Oct 1975)',
    subsequentRelated: 'House Committee (K. Vijayarama Rao / Assembly debates) & J.M. Girglani Commission (June 2001)',
    phase: 'PHASE-II',
    dayNumber: 6,
    category: 'Committee',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'C-GIRGLANI',
    name: 'J.M. Girglani One-Man Commission (2001–2004)',
    chairman: 'J.M. Girglani, IAS (Retd.)',
    chairmanId: 'P-GIRGLANI',
    members: ['One-Man Commission'],
    appointmentDate: '25 June 2001 (G.O. Rt. No. 2704)',
    reason: 'Resurgent Telangana movement after TRS formation (April 2001) and intense Assembly pressure demanding implementation of G.O. Ms. No. 610.',
    appointingAuthority: 'Government of Andhra Pradesh (CM N. Chandrababu Naidu)',
    headquarters: 'Hyderabad',
    mandate: 'To examine anomalies and deviations in implementing the 1975 Presidential Order and G.O. Ms. No. 610, and recommend corrective remedial measures.',
    recommendations: [
      'Preliminary Report (6 October 2001) & Final 3-Volume Report (September 2004, 759 pages).',
      'Identified 126 specific findings grouped into 18 distinct modes of violation (e.g., treating project/corporation posts as state-level, misusing Para 14 HoD exemptions, unverified study certificates, illegal inter-zonal transfers).',
      'Recommended permanent Vigilance & Enforcement mechanism over zonal recruitment.'
    ],
    submissionDate: '6 October 2001 (Interim) / September 2004 (Final Report to CM Y.S. Rajasekhara Reddy)',
    aftermath: 'Even after YSR’s government constituted a Cabinet Sub-Committee, actual repatriations remained minuscule — convincing Telangana employees (TNGOs) that only a separate state could protect local jobs.',
    previousRelated: 'Jayabharat Reddy Committee & G.O. Ms. No. 610 (1985)',
    subsequentRelated: '2009 Supreme Court "Free Zone" Police Recruitment Verdict (9 Oct 2009) & KCR’s Fast',
    phase: 'PHASE-III',
    dayNumber: 6,
    category: 'Commission',
    sourceIds: ['SRC-04', 'SRC-07', 'SRC-10']
  },
  {
    id: 'C-PRANAB',
    name: 'Pranab Mukherjee UPA Sub-Committee (2005)',
    chairman: 'Pranab Mukherjee (Union Defence Minister)',
    chairmanId: 'P-SRIKRISHNA',
    members: ['Dr. Raghuvansh Prasad Singh (RJD — Union Rural Development Minister)', 'Dayanidhi Maran (DMK — Union IT & Communications Minister)'],
    appointmentDate: 'January 2005',
    reason: 'TRS joined Congress-led UPA-I in 2004 after Telangana statehood via consensus was included in the UPA Common Minimum Programme (CMP) and President A.P.J. Abdul Kalam’s address.',
    appointingAuthority: 'UPA Coordination Committee / PM Dr. Manmohan Singh',
    headquarters: 'New Delhi',
    mandate: '3-member coalition sub-committee to elicit views of political parties and explore consensus on creating a separate Telangana state.',
    recommendations: [
      'Invited written opinions from national and regional parties (36+ parties submitted views for Telangana; CPI(M), MIM, and later TDP withheld/complicated consensus).',
      'Kept consultations dragging without submitting a time-bound statehood roadmap.'
    ],
    submissionDate: 'No final affirmative statehood report submitted (stalled 2005–2006)',
    aftermath: 'Frustrated by delay, KCR and A. Narendra resigned from the Union Cabinet in August–September 2006; KCR accepted Congress MP Venkataswamy’s challenge and won the historic Karimnagar Lok Sabha by-election by over 2 lakh votes in Dec 2006.',
    previousRelated: '2004 UPA Common Minimum Programme (CMP)',
    subsequentRelated: 'Rosaiah All-Party Meeting (7 Dec 2009), 9 Dec 2009 Statement & Srikrishna Committee (Feb 2010)',
    phase: 'PHASE-III',
    dayNumber: 8,
    category: 'Committee',
    sourceIds: ['SRC-04']
  },
  {
    id: 'C-SRIKRISHNA',
    name: 'Justice B.N. Srikrishna Committee (CCSAP, 2010)',
    chairman: 'Justice B.N. Srikrishna (Retd. SC Judge)',
    chairmanId: 'P-SRIKRISHNA',
    members: [
      'Prof. (Dr.) Ranbir Singh (VC, National Law University, Delhi)',
      'Dr. Abusaleh Shariff (Senior Economist, NCAER)',
      'Prof. (Dr.) Ravinder Kaur (Dept of Humanities & Social Sciences, IIT Delhi)',
      'Vinod K. Duggal, IAS (Retd. Former Union Home Secretary — Member-Secretary)'
    ],
    appointmentDate: '3 February 2010',
    reason: 'Following Union Home Minister P. Chidambaram’s 9 December 2009 pro-Telangana announcement and 23 December 2009 pullback statement ("wide-ranging consultations needed") amid Seemandhra MP/MLA resignations.',
    appointingAuthority: 'Ministry of Home Affairs, Government of India',
    headquarters: 'Vigyan Bhavan Annexe, New Delhi',
    mandate: 'To examine the situation in the State of Andhra Pradesh with reference to the demand for a separate State of Telangana as well as the demand for maintaining the present status of a united Andhra Pradesh.',
    recommendations: [
      'Presented SIX OPTIONS in Chapter 9:',
      'Option 1: Maintain status quo (considered least practical given intense sentiment).',
      'Option 2: Bifurcation of State into Seemandhra & Telangana, with Hyderabad as a Union Territory (unacceptable to both sides).',
      'Option 3: Bifurcation into Rayala-Telangana and Coastal Andhra, with Hyderabad in Rayala-Telangana (economically/politically unviable).',
      'Option 4: Bifurcation into Seemandhra & Telangana, with enlarged Hyderabad Metropolis as a separate Union Territory geographically linked to Guntur/Nalgonda.',
      'Option 5 (SECOND BEST): Bifurcation into Telangana & Seemandhra as per existing boundaries, with Hyderabad as capital of Telangana and definite financial/capital arrangements for Seemandhra.',
      'Option 6 (COMMITTEE’S MOST PREFERRED): Keep State UNITED while providing constitutional/statutory Telangana Regional Council and targeted water/education/job packages.'
    ],
    submissionDate: '30 December 2010 (Released by Home Ministry on 6 January 2011)',
    aftermath: 'Telangana society & TJAC rejected Option 6 (recalling failed 1958 TRC & 1969/1973 formulas) and protested the secret Chapter 8 media-management note (challenged in AP High Court). Mass agitations (Million March, Sakala Janula Samme, Sagara Haram) forced Congress Working Committee (30 July 2013) & Union Cabinet (3 Oct 2013) to adopt Option 5 (Bifurcation)!',
    previousRelated: '9 December 2009 & 23 December 2009 MHA Statements',
    subsequentRelated: 'A.K. Antony AICC Committee (Aug 2013) & Group of Ministers (Oct 2013)',
    phase: 'PHASE-III',
    dayNumber: 9,
    category: 'Commission',
    sourceIds: ['SRC-04', 'SRC-10']
  },
  {
    id: 'C-GOM2013',
    name: 'A.K. Antony Committee & Group of Ministers (GoM, 2013)',
    chairman: 'Sushil Kumar Shinde (Union Home Minister — GoM Chair); A.K. Antony chaired AICC 4-Member Committee (Aug 2013)',
    chairmanId: 'P-SRIKRISHNA',
    members: [
      'Reconstituted 7-Member GoM (8 Oct 2013): Sushil Kumar Shinde (Chair), A.K. Antony (Defence), P. Chidambaram (Finance), M. Veerappa Moily (Petroleum), Ghulam Nabi Azad (Health), Jairam Ramesh (Rural Development), plus V. Narayanasamy (MoS PMO — Special Invitee, tested in PC 2018 Q.183!)'
    ],
    appointmentDate: 'CWC Resolution: 30 July 2013 → AICC Antony Committee: 6 Aug 2013 → Union Cabinet Approval: 3 Oct 2013 → Reconstituted GoM: 8 Oct 2013',
    reason: 'To draft the exact Terms of Reference and clauses of the Andhra Pradesh Reorganisation Bill (boundaries, Hyderabad status, water, power, assets, Art 371-D continuation, employee allocation).',
    appointingAuthority: 'Union Cabinet, Government of India',
    headquarters: 'North Block, New Delhi',
    mandate: 'Drafting the AP Reorganisation Bill, 2013/2014 for reference to AP Legislature under Article 3 and introduction in Parliament.',
    recommendations: [
      'Telangana State with 10 full districts (119 Assembly + 17 Lok Sabha + 7 Rajya Sabha seats); Residuary AP with 13 districts (175 Assembly + 25 Lok Sabha + 11 Rajya Sabha seats) + transfer of 7 Bhadrachalam/Khammam submergence mandals via subsequent ordinance/amendment.',
      'Hyderabad as Common Capital for NOT exceeding 10 years (Sec 5), thereafter exclusive capital of Telangana; Governor vested with Sec 8 law-and-order responsibility in common capital.',
      'Polavaram declared a National Project (Sec 90); Krishna & Godavari River Management Boards (Sec 85); Article 371-D extended to both states.'
    ],
    submissionDate: 'Draft Bill approved by Union Cabinet on 5 December 2013',
    aftermath: 'President Pranab Mukherjee referred Draft Bill to AP Legislature under Article 3 (12 Dec 2013); AP Assembly rejected it by voice vote under CM N. Kiran Kumar Reddy (30 Jan 2014); under Art 3 proviso, Parliament is NOT bound by state assembly rejection — Bill introduced in Lok Sabha (13 Feb 2014), passed Lok Sabha (18 Feb 2014), passed Rajya Sabha (20 Feb 2014), Presidential Assent (1 March 2014), Appointed Day (2 June 2014).',
    previousRelated: 'CWC Resolution (30 July 2013)',
    subsequentRelated: 'Andhra Pradesh Reorganisation Act, 2014 (Act 6 of 2014)',
    phase: 'PHASE-III',
    dayNumber: 9,
    category: 'Committee',
    sourceIds: ['SRC-05', 'SRC-10']
  }
];

export const RELATIONSHIP_CHAINS: GraphChain[] = [
  {
    id: 'GC-01',
    personId: 'P-OSMAN',
    person: '7th Nizam Mir Osman Ali Khan',
    committeeId: 'C-JAGANMOHAN',
    committee: '1919 Mulki Farman',
    position: 'Sovereign Issuer',
    year: '1919',
    event: 'Codified 15-year domicile / birth rule for Hyderabad State jobs',
    place: 'Hyderabad',
    outcome: 'Legal root of Mulki Safeguards upheld by SC in Oct 1972'
  },
  {
    id: 'GC-02',
    personId: 'P-JAGANMOHAN',
    person: 'Justice P. Jaganmohan Reddy',
    committeeId: 'C-JAGANMOHAN',
    committee: '1952 Police Firing Inquiry Committee',
    position: 'Chairman',
    year: 'Sep–Dec 1952',
    event: 'Investigated 3–4 Sep 1952 City College / Afzalgunj anti-Non-Mulki firing',
    place: 'City College, Hyderabad',
    outcome: 'Validated student grievances over fake Mulki certificates (28 Dec 1952)'
  },
  {
    id: 'GC-03',
    personId: 'P-FAZAL',
    person: 'Justice Syed Fazal Ali',
    committeeId: 'C-SRC',
    committee: 'States Reorganisation Commission (SRC)',
    position: 'Chairman (with Kunzru & Panikkar)',
    year: '1953–1955',
    event: 'Examined Visalandhra vs Separate Telangana arguments',
    place: 'New Delhi / Hyderabad',
    outcome: 'Recommended Separate Telangana until 1961 (2/3rd Assembly vote clause)'
  },
  {
    id: 'GC-04',
    personId: 'P-BURGULA',
    person: 'Burgula Ramakrishna Rao & K.V. Ranga Reddy',
    committeeId: 'C-GENTLEMEN',
    committee: 'Gentlemen’s Agreement (14 Points)',
    position: 'Telangana Signatories (with Chenna Reddy & JV Narsing Rao)',
    year: '20 Feb 1956',
    event: 'Signed Delhi Pact with 4 Andhra leaders under HM G.B. Pant',
    place: 'Hyderabad House, New Delhi',
    outcome: 'Merger on 1 Nov 1956; Dy CM & surplus promises immediately breached'
  },
  {
    id: 'GC-05',
    personId: 'P-ACHUTHA',
    person: 'K. Achutha Reddy',
    committeeId: 'C-TRC',
    committee: 'Telangana Regional Committee (TRC)',
    position: 'First Chairman (President)',
    year: '1958',
    event: 'Constituted under Art 371(1) Presidential Order',
    place: 'Hyderabad Assembly',
    outcome: 'Documented surplus & job violations until abolished in Sep 1973'
  },
  {
    id: 'GC-06',
    personId: 'P-WANCHOO',
    person: 'Justice K.N. Wanchoo & Justice V. Bhargava',
    committeeId: 'C-8POINT',
    committee: 'Eight-Point Formula Twin Committees',
    position: 'Chairmen (Jurists & Surpluses)',
    year: 'April 1969',
    event: 'Appointed after 28 Mar 1969 SC verdict & 11 Apr 1969 8-Point Formula',
    place: 'New Delhi',
    outcome: 'Bhargava proved ₹28.34 Cr surplus diversion; Wanchoo flagged Art 16(3) limits'
  },
  {
    id: 'GC-07',
    personId: 'P-CHENNAREDDY',
    person: 'A. Madan Mohan → Dr. M. Chenna Reddy',
    committeeId: 'C-8POINT',
    committee: 'Telangana Praja Samithi (TPS)',
    position: 'Founder President (Feb 69) → Party President (May 69)',
    year: '1969–1971',
    event: 'Converted to political party (Jul 1970); swept 1971 Lok Sabha polls',
    place: 'Telangana (14 MP seats)',
    outcome: 'Won 10/14 seats; merged into Congress (Sep 1971); PVNR became CM'
  },
  {
    id: 'GC-08',
    personId: 'P-PVNR',
    person: 'P.V. Narasimha Rao → Indira Gandhi',
    committeeId: 'C-6POINT',
    committee: '5-Point (1972) → 6-Point Formula (1973)',
    position: 'CM (1971–73) → Central Constitutional Settlement',
    year: '1972–1975',
    event: '3 Oct 1972 SC Mulki verdict → Jai Andhra stir → 21 Sep 1973 6-Point Formula',
    place: 'Andhra & Telangana',
    outcome: '32nd Amendment (Art 371-D), abolished Mulki & TRC, 1975 Presidential Order'
  },
  {
    id: 'GC-09',
    personId: 'P-JAYABHARAT',
    person: 'K. Jayabharat Reddy, IAS → J.M. Girglani, IAS',
    committeeId: 'C-GIRGLANI',
    committee: 'Officers Committee (1985) → One-Man Commission (2001)',
    position: 'Chairman (1985) → Sole Commissioner (2001–2004)',
    year: '1985 & 2001–2004',
    event: 'Found 58,962 non-locals (GO 610, 30 Dec 1985) → Audited 126 non-implementation findings',
    place: 'Zones V & VI, Telangana',
    outcome: 'Exposed systematic failure of job safeguards inside united AP'
  },
  {
    id: 'GC-10',
    personId: 'P-KCR',
    person: 'K. Chandrashekar Rao & Prof. K. Jayashankar',
    committeeId: 'C-PRANAB',
    committee: 'TRS (2001) & UPA Pranab Committee (2005)',
    position: 'TRS Founder & Chief Ideologue',
    year: '2001–2009',
    event: '27 Apr 2001 TRS launch → 29 Nov 2009 Fast-unto-Death → 9 Dec 2009 Statement',
    place: 'Jala Drushyam / Karimnagar / Khammam',
    outcome: 'Forced Union Government to initiate Telangana statehood process'
  },
  {
    id: 'GC-11',
    personId: 'P-SRIKRISHNA',
    person: 'Justice B.N. Srikrishna & Prof. M. Kodandaram',
    committeeId: 'C-SRIKRISHNA',
    committee: 'CCSAP (Srikrishna Committee) vs TJAC Mass Movement',
    position: 'CCSAP Chair (5 Members) vs TJAC Convener',
    year: '2010–2012',
    event: '3 Feb–30 Dec 2010 Report (6 Options) met by Million March & 42-Day Sakala Janula Samme',
    place: 'Hyderabad & All 10 Telangana Districts',
    outcome: 'Option 6 (United AP) rejected by people; Option 5 (Bifurcation) adopted in 2013'
  },
  {
    id: 'GC-12',
    personId: 'P-KCR',
    person: 'Sushil Kumar Shinde (GoM) & Pranab Mukherjee (President)',
    committeeId: 'C-GOM2013',
    committee: 'GoM & AP Reorganisation Act, 2014 (Act 6 of 2014)',
    position: 'Home Minister / President of India',
    year: 'Jul 2013 – 2 Jun 2014',
    event: 'CWC (30 Jul 13) → LS Intro (13 Feb 14) → LS Pass (18 Feb) → RS Pass (20 Feb) → Assent (1 Mar)',
    place: 'Parliament of India & Hyderabad',
    outcome: '29th State of India — Telangana formed on Appointed Day 2 June 2014!'
  }
];

export const WHO_IS_WHO_TRAPS = [
  {
    id: 'WIW-01',
    groupTitle: 'The Three "Reddy" Judges & Officers Who Investigated Telangana Issues',
    trapSummary: 'Aspirants constantly mix up Pingali Jaganmohan Reddy (1952), K. Achutha Reddy (1958), and K. Jayabharat Reddy (1985).',
    members: [
      { name: 'Justice Pingali Jaganmohan Reddy', year: '1952', role: 'High Court Judge — Investigated 3–4 Sep 1952 City College Police Firing (Mulki agitation).' },
      { name: 'K. Achutha Reddy', year: '1958', role: 'Legislator — First Chairman (President) of Telangana Regional Committee (TRC).' },
      { name: 'K. Jayabharat Reddy, IAS', year: '1985', role: 'Senior IAS Officer — Chaired 1985 Officers Committee finding 58,962 non-locals, leading to GO 610.' }
    ]
  },
  {
    id: 'WIW-02',
    groupTitle: 'The Two 1969 Eight-Point Formula Committees (Wanchoo vs Bhargava vs Kumar Lalit)',
    trapSummary: 'Both Wanchoo and Bhargava were appointed in April 1969 right after Indira Gandhi’s 8-Point Formula — never swap their mandates!',
    members: [
      { name: 'Kumar Lalit', year: 'Jan–Mar 1969', role: 'CAG Nominee — Appointed after 19 Jan 1969 All-Party Accord; initial surplus audit rejected by Telangana leaders.' },
      { name: 'Justice K.N. Wanchoo', year: '19 April 1969', role: 'Former CJI — Examined CONSTITUTIONAL/LEGAL safeguards for Mulki jobs after 28 Mar 1969 SC strike-down.' },
      { name: 'Justice Vashishtha Bhargava', year: '22 April 1969', role: 'SC Judge — Determined unspent Telangana REVENUE SURPLUSES at ₹28.34 Crores.' }
    ]
  },
  {
    id: 'WIW-03',
    groupTitle: 'Telangana Praja Samithi (1969) Founders vs Leaders',
    trapSummary: 'TSLPRB SI Mains 2023 specifically trapped candidates who assumed Marri Chenna Reddy founded TPS!',
    members: [
      { name: 'Ananthula Madan Mohan', year: 'Feb–Mar 1969', role: 'FOUNDER PRESIDENT of Telangana Convention / Telangana Praja Samithi.' },
      { name: 'Dr. Marri Chenna Reddy', year: 'May 1969 – Sep 1971', role: 'Took over as TPS PRESIDENT in May 1969, turned it into a political party (Jul 1970), won 10 MP seats (1971).' },
      { name: 'Mallikarjun', year: 'Jan 1969', role: 'Osmania Medical Student — General Secretary of Telangana Student Action Committee advocating separate statehood.' }
    ]
  },
  {
    id: 'WIW-04',
    groupTitle: 'The Two "Konda" Stalwarts: K.V. Ranga Reddy vs Konda Laxman Bapuji',
    trapSummary: 'Both carry "Konda" in their full name, both served as ministers, yet their exam roles are completely distinct.',
    members: [
      { name: 'Konda Venkata Ranga Reddy', year: '1956 & 1959', role: '1956 Gentlemen’s Agreement Signatory + First Deputy CM of AP (1959). Not in Peasant Armed Struggle.' },
      { name: 'Acharya Konda Laxman Bapuji', year: '1969, 2001, 2012', role: 'First Minister to resign in 1969 (founded Telangana Congress Samithi) + gave Jala Drushyam for TRS (2001) + 2012 Jantar Mantar Satyagraha.' }
    ]
  },
  {
    id: 'WIW-05',
    groupTitle: '1969 KTPS / Khammam Spark Trio: Sree Ramadas vs Ravindranath vs Kolishetti Ramadasu',
    trapSummary: 'Three names at the exact birthplace of the January 1969 movement in Khammam/Palvancha.',
    members: [
      { name: 'A. Sree Ramadas (A. Ramadas)', year: '1968–69', role: 'First exposed illegal non-local appointments at Kothagudem Thermal Power Station (KTPS) to the public (SI 2022 Q.183).' },
      { name: 'Annabathula Ravindranath', year: '8 Jan 1969', role: 'B.A. Student who began the FIRST indefinite hunger strike at Khammam (PC 2016 Q.148 & SI 2023 Q.193).' },
      { name: 'Kolishetti Ramadasu', year: 'Jan 1969', role: 'Khammam Municipal Vice-Chairman who organized and supported Ravindranath’s hunger-strike camp.' }
    ]
  },
  {
    id: 'WIW-06',
    groupTitle: 'Two Professors of Phase III: Prof. K. Jayashankar vs Prof. M. Kodandaram',
    trapSummary: 'Both are revered university professors who guided the final phase — distinguish academic university & institutional title.',
    members: [
      { name: 'Prof. Kothapalli Jayashankar', year: '1952–2011', role: 'Economist & VC of KAKATIYA University; Chief Ideologue across all 3 phases; Telangana Aikya Vedika (1997) & TRS advisor.' },
      { name: 'Prof. M. Kodandaram', year: '2009–2014', role: 'Political Scientist at OSMANIA University; Chairman/Convener of TJAC (formed 24 Dec 2009) leading Sakala Janula Samme.' }
    ]
  }
];
