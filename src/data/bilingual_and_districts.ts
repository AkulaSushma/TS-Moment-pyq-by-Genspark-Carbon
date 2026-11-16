// Module 8 Content Expansion: Complete 10 Erstwhile -> 33 Present Districts Correlation Layer (2016/2019 Reorganisation + 2018 Multi-Zonal Links)
// Feature 5 Expansion: Bilingual Telugu (తెలుగు) Revision Summaries for All 10 Days & Key Terminology Glossary

export interface ErstwhileTo33Correlation {
  erstwhileNo: number;
  erstwhileName: string;
  erstwhileNameTe: string;
  zone1975: 'Zone V (North/East)' | 'Zone VI (Central/South & Capital)';
  multiZone2018: 'Multi-Zone I (Kaleshwaram/Bhadradri/Rajanna/Basara)' | 'Multi-Zone II (Charminar/Jogulamba/Yadadri)';
  presentDistrictsCount: number;
  presentDistricts: {
    name: string;
    nameTe: string;
    formedYear: string;
    movementLandmark: string;
  }[];
}

export const DISTRICT_33_CORRELATION: ErstwhileTo33Correlation[] = [
  {
    erstwhileNo: 1,
    erstwhileName: 'Adilabad',
    erstwhileNameTe: 'ఆదిలాబాద్',
    zone1975: 'Zone V (North/East)',
    multiZone2018: 'Multi-Zone I (Kaleshwaram/Bhadradri/Rajanna/Basara)',
    presentDistrictsCount: 4,
    presentDistricts: [
      { name: 'Adilabad', nameTe: 'ఆదిలాబాద్', formedYear: '1948 / Retained 2016', movementLandmark: 'Indervelli Gond Adivasi Martyrs Memorial (20 April 1981); start of 3 Feb 2010 Adilabad–Alampur 500-km Human Chain.' },
      { name: 'Komaram Bheem Asifabad', nameTe: 'కొమరం భీమ్ ఆసిఫాబాద్', formedYear: '11 Oct 2016', movementLandmark: 'Jodeghat ("Jal, Jungle, Zameen" struggle of Komaram Bheem, 1940); Wankidi (birthplace/base of Konda Laxman Bapuji).' },
      { name: 'Mancherial', nameTe: 'మంచిర్యాల', formedYear: '11 Oct 2016', movementLandmark: 'Singareni Collieries (Srirampur/Mandamarri/Bellampalli) — nerve-centre of the 35-day coal strike during 2011 Sakala Janula Samme.' },
      { name: 'Nirmal', nameTe: 'నిర్మల్', formedYear: '11 Oct 2016', movementLandmark: '1860 Ramji Gond & 1000-gallows ("Veyyi Urula Marri") anti-colonial/anti-Nizam resistance heritage; Basara Saraswati temple belt.' }
    ]
  },
  {
    erstwhileNo: 2,
    erstwhileName: 'Karimnagar',
    erstwhileNameTe: 'కరీంనగర్',
    zone1975: 'Zone V (North/East)',
    multiZone2018: 'Multi-Zone I (Kaleshwaram/Bhadradri/Rajanna/Basara)',
    presentDistrictsCount: 4,
    presentDistricts: [
      { name: 'Karimnagar', nameTe: 'కరీంనగర్', formedYear: '1948 / Retained 2016', movementLandmark: '17 May 2001 TRS Simha Garjana (SRR College); Dec 2006 KCR 2-lakh majority by-poll; 28–29 Nov 2009 Uttara Telangana Bhavan/Alganoor arrest.' },
      { name: 'Jagtial', nameTe: 'జగిత్యాల', formedYear: '11 Oct 2016', movementLandmark: 'Historic 7 September 1978 "Jagtial Jaitrayatra" anti-feudal peasant march (35,000+ ryots against Vetti/Gadi landlordism).' },
      { name: 'Peddapalli', nameTe: 'పెద్దపల్లి', formedYear: '11 Oct 2016', movementLandmark: 'Ramagundam NTPC & Singareni RG-I/II/III coal divisions — key hub of Telangana Boggu Ghani Karmika Sangham strikes.' },
      { name: 'Rajanna Sircilla', nameTe: 'రాజన్న సిరిసిల్ల', formedYear: '11 Oct 2016', movementLandmark: 'Powerloom weavers’ crisis awareness campaigns (KCR’s Sircilla relief initiatives) & anti-feudal Nimmapalli/Sircilla struggles (1978).' }
    ]
  },
  {
    erstwhileNo: 3,
    erstwhileName: 'Nizamabad',
    erstwhileNameTe: 'నిజామాబాద్',
    zone1975: 'Zone VI (Central/South & Capital)',
    multiZone2018: 'Multi-Zone I (Kaleshwaram/Bhadradri/Rajanna/Basara)',
    presentDistrictsCount: 2,
    presentDistricts: [
      { name: 'Nizamabad', nameTe: 'నిజామాబాద్', formedYear: '1948 / Retained 2016', movementLandmark: 'Nehru’s initial anti-imperialism remark on Visalandhra; Pochampadu (Sriram Sagar Project — SRSP) water-allocation struggle.' },
      { name: 'Kamareddy', nameTe: 'కామారెడ్డి', formedYear: '11 Oct 2016', movementLandmark: 'Birthplace of the first "Telangana Dhoom Dham" cultural festival (30 Sep 2002, Rasamayi Balakishan/Gaddar) & Police Constable Kishtaiah’s martyrdom (Dec 2009).' }
    ]
  },
  {
    erstwhileNo: 4,
    erstwhileName: 'Warangal',
    erstwhileNameTe: 'వరంగల్',
    zone1975: 'Zone V (North/East)',
    multiZone2018: 'Multi-Zone I (Kaleshwaram/Bhadradri/Rajanna/Basara)',
    presentDistrictsCount: 6,
    presentDistricts: [
      { name: 'Hanumakonda (erstwhile Warangal Urban)', nameTe: 'హనుమకొండ', formedYear: '2016 / Renamed 2021', movementLandmark: '26 July 1952 Student Mulki Agitation birthplace; Kakatiya University (KUJAC); 28–29 Dec 1997 Warangal Declaration (AIPRF / Kaloji); Prof. Jayashankar’s base.' },
      { name: 'Warangal (erstwhile Warangal Rural)', nameTe: 'వరంగల్', formedYear: '11 Oct 2016 / Renamed 2021', movementLandmark: 'Parkal 2 Sep 1947 liberation martyrs ("Jallianwala Bagh of Telangana") & massive 2003 TRS Warangal Jaitrayatra.' },
      { name: 'Jayashankar Bhupalpally', nameTe: 'జయశంకర్ భూపాలపల్లి', formedYear: '11 Oct 2016', movementLandmark: 'Named in honour of Chief Ideologue Prof. Kothapalli Jayashankar; Kaleshwaram Godavari lift-irrigation & coal belt.' },
      { name: 'Jangaon', nameTe: 'జనగామ', formedYear: '11 Oct 2016', movementLandmark: 'Chityala Chakali Ailamma (Palakurthy) & Doddi Komuraiah (Kadivendi, 4 Jul 1946) Armed Struggle epicentre; Bammera/sculptor Pasunuri Dayakar.' },
      { name: 'Mahabubabad', nameTe: 'మహబూబాబాద్', formedYear: '11 Oct 2016', movementLandmark: 'Bayyaram iron-ore protection movement ("Bayyaram Ukku — Telangana Hakku") & May 2010 Mahabubabad railway station firing protest.' },
      { name: 'Mulugu', nameTe: 'ములుగు', formedYear: '17 Feb 2019', movementLandmark: 'Medaram Sammakka-Saralamma tribal jatara identity & Eturunagaram Adivasi forest rights belt (32nd/33rd district created in Feb 2019).' }
    ]
  },
  {
    erstwhileNo: 5,
    erstwhileName: 'Khammam',
    erstwhileNameTe: 'ఖమ్మం',
    zone1975: 'Zone V (North/East)',
    multiZone2018: 'Multi-Zone I (Kaleshwaram/Bhadradri/Rajanna/Basara)',
    presentDistrictsCount: 2,
    presentDistricts: [
      { name: 'Khammam', nameTe: 'ఖమ్మం', formedYear: 'Oct 1953 / Retained 2016', movementLandmark: '8 Jan 1969 Annabathula Ravindranath’s first indefinite fast at Khammam; Nov 2009 Khammam Sub-Jail & Govt Hospital where KCR began his fast.' },
      { name: 'Bhadradri Kothagudem', nameTe: 'భద్రాద్రి కొత్తగూడెం', formedYear: '11 Oct 2016', movementLandmark: 'KTPS Palvancha non-Mulki exposure by Sree Ramadas (1968–69 spark); Singareni HQ at Kothagudem; note 7 Bhadrachalam-division submergence mandals transferred to AP in 2014 for Polavaram.' }
    ]
  },
  {
    erstwhileNo: 6,
    erstwhileName: 'Medak',
    erstwhileNameTe: 'మెదక్',
    zone1975: 'Zone VI (Central/South & Capital)',
    multiZone2018: 'Multi-Zone I & II (Siddipet/Medak MZ-I; Sangareddy MZ-II)',
    presentDistrictsCount: 3,
    presentDistricts: [
      { name: 'Medak', nameTe: 'మెదక్', formedYear: '1948 / Retained 2016', movementLandmark: 'Indira Gandhi’s 1980 Lok Sabha constituency; Singur/Manjeera drinking-water diversion debates.' },
      { name: 'Siddipet', nameTe: 'సిద్దిపేట', formedYear: '11 Oct 2016', movementLandmark: 'Cradle of both A. Madan Mohan (1970 TPS by-poll win) & K. Chandrashekar Rao (1985–2004 MLA; Rangadhampally 29 Nov 2009 fast venue).' },
      { name: 'Sangareddy', nameTe: 'సంగారెడ్డి', formedYear: '11 Oct 2016', movementLandmark: 'Sadasivpet Municipality passed the first civic resolution for Separate Telangana in 1969 & witnessed Jan 1969 Shankar martyrdom context; Patancheru industrial job-safeguard belt.' }
    ]
  },
  {
    erstwhileNo: 7,
    erstwhileName: 'Hyderabad',
    erstwhileNameTe: 'హైదరాబాద్',
    zone1975: 'Zone VI (Central/South & Capital)',
    multiZone2018: 'Multi-Zone II (Charminar Zone)',
    presentDistrictsCount: 1,
    presentDistricts: [
      { name: 'Hyderabad', nameTe: 'హైదరాబాద్', formedYear: '1948 / Core Urban District', movementLandmark: 'City College (3–4 Sep 1952 firing), Osmania University (1969 & 3 Jan 2010 Vidyarthi Garjana), Gun Park (369 Martyrs Memorial), Jala Drushyam (27 Apr 2001 TRS), Tank Bund/Necklace Road (Million March & Sagara Haram).' }
    ]
  },
  {
    erstwhileNo: 8,
    erstwhileName: 'Ranga Reddy',
    erstwhileNameTe: 'రంగారెడ్డి',
    zone1975: 'Zone VI (Central/South & Capital)',
    multiZone2018: 'Multi-Zone II (Charminar Zone)',
    presentDistrictsCount: 3,
    presentDistricts: [
      { name: 'Ranga Reddy', nameTe: 'రంగారెడ్డి', formedYear: '15 Aug 1978 / Reorg 2016', movementLandmark: 'Named after 1956 Signatory & 1st Dy CM K.V. Ranga Reddy; L.B. Nagar Ambedkar Statue (Srikantha Chary martyrdom, 29 Nov 2009); Shamshabad/Shadnagar (Burgula Ramakrishna Rao).' },
      { name: 'Medchal–Malkajgiri', nameTe: 'మేడ్చల్-మల్కాజిగిరి', formedYear: '11 Oct 2016', movementLandmark: 'Industrial & suburban student/employee mobilization ring around Secunderabad ("Lashkar") & Uppal/Ghatkesar.' },
      { name: 'Vikarabad', nameTe: 'వికారాబాద్', formedYear: '11 Oct 2016', movementLandmark: 'Home region of Dr. Marri Chenna Reddy (1956 Signatory & 1969–71 TPS President); Tandur stone/cement belt.' }
    ]
  },
  {
    erstwhileNo: 9,
    erstwhileName: 'Nalgonda',
    erstwhileNameTe: 'నల్గొండ',
    zone1975: 'Zone VI (Central/South & Capital)',
    multiZone2018: 'Multi-Zone II (Yadadri Zone)',
    presentDistrictsCount: 3,
    presentDistricts: [
      { name: 'Nalgonda', nameTe: 'నల్గొండ', formedYear: '1948 / Retained 2016', movementLandmark: 'Fluorosis & Nagarjuna Sagar Left Canal / SLBC water-justice struggle; 1952 PDF Ravi Narayana Reddy record Lok Sabha vote.' },
      { name: 'Suryapet', nameTe: 'సూర్యాపేట', formedYear: '11 Oct 2016', movementLandmark: 'Historic 1997 Suryapet Declaration (SI 2023 Q.194) & Musi/SRSP tail-end canal agitation.' },
      { name: 'Yadadri Bhuvanagiri', nameTe: 'యాదాద్రి భువనగిరి', formedYear: '11 Oct 2016', movementLandmark: '8–9 March 1997 Bhongir (Bhuvanagiri) Sabha by Sahithi Mitra Mandali (Jaini Mallaiah Gupta Chair); Podichedu (native village of martyr Kasoju Srikantha Chary).' }
    ]
  },
  {
    erstwhileNo: 10,
    erstwhileName: 'Mahbubnagar (Palamuru)',
    erstwhileNameTe: 'మహబూబ్‌నగర్ (పాలమూరు)',
    zone1975: 'Zone VI (Central/South & Capital)',
    multiZone2018: 'Multi-Zone II (Jogulamba Zone)',
    presentDistrictsCount: 5,
    presentDistricts: [
      { name: 'Mahbubnagar', nameTe: 'మహబూబ్‌నగర్', formedYear: '1948 / Retained 2016', movementLandmark: 'Home district of 1st TRC Chairman K. Achutha Reddy (1958); KCR served as Mahbubnagar Lok Sabha MP (2009–2014) during the decisive statehood phase!' },
      { name: 'Jogulamba Gadwal', nameTe: 'జోగులాంబ గద్వాల', formedYear: '11 Oct 2016', movementLandmark: 'Rajolibanda Diversion Scheme (RDS — Tungabhadra) water rights struggle & Alampur (southern terminal of 3 Feb 2010 500-km Human Chain).' },
      { name: 'Nagarkurnool', nameTe: 'నాగర్‌కర్నూల్', formedYear: '11 Oct 2016', movementLandmark: 'Kalwakurthy Lift Irrigation & Srisailam Pothireddypadu water-diversion resistance rallies.' },
      { name: 'Wanaparthy', nameTe: 'వనపర్తి', formedYear: '11 Oct 2016', movementLandmark: 'Jurala / Bheema Palamuru labour-migration ("Palamuru Valasa") intellectual documentation.' },
      { name: 'Narayanpet', nameTe: 'నారాయణపేట', formedYear: '17 Feb 2019', movementLandmark: 'Created on 17 Feb 2019 alongside Mulugu bringing Telangana to 33 districts; handloom & Krishna-Bhima border belt.' }
    ]
  }
];

export const BILINGUAL_TELUGU_NOTES: Record<string, {
  titleTe: string;
  bigPictureTe: string;
  oneMinuteRevisionTe: string[];
}> = {
  T1: {
    titleTe: 'డే 1: హైదరాబాద్ రాజ్యం విలీనం (1948), ముల్కీ నిబంధనల చరిత్ర & 1952 ముల్కీ ఉద్యమం',
    bigPictureTe: '1948 సెప్టెంబర్ 13–17 మధ్య జరిగిన "ఆపరేషన్ పోలో" ద్వారా హైదరాబాద్ సంస్థానం భారత యూనియన్‌లో విలీనమైంది. 1919లో ఏడవ నిజాం మీర్ ఉస్మాన్ అలీ ఖాన్ జారీ చేసిన ముల్కీ ఫర్మానా (15 ఏళ్ల స్థిర నివాసం) ఉన్నప్పటికీ, జె.ఎన్. చౌదరి మరియు ఎం.కె. వెల్లోడి పాలనలో వేలాది మంది నాన్-ముల్కీ ఉద్యోగులను రప్పించడంతో 1952 జూలైలో వరంగల్‌లో మొదలైన విద్యార్థి ఉద్యమం సెప్టెంబర్ 3–4 తేదీల్లో హైదరాబాద్ సిటీ కాలేజీ కాల్పులకు దారితీసింది.',
    oneMinuteRevisionTe: [
      '1868: సాలార్ జంగ్-I తొలిసారి ముల్కీలకు ఉద్యోగాల్లో ప్రాధాన్యత ఇచ్చారు; 1919: 7వ నిజాం 15 ఏళ్ల నివాస నిబంధనతో ముల్కీ ఫర్మానా జారీ చేశారు.',
      '13–17 సెప్టెంబర్ 1948: ఆపరేషన్ పోలో ద్వారా హైదరాబాద్ విలీనం; 21 అక్టోబర్ 1951: తెలంగాణ సాయుధ పోరాట విరమణ.',
      'పాలనా క్రమం: మేజర్ జనరల్ J.N. చౌదరి (1948–49) → M.K. వెల్లోడి ICS (1949–52) → బూర్గుల రామకృష్ణారావు (6 మార్చి 1952, తొలి ఎన్నికైన సీఎం).',
      '1952 జూలై 26: వరంగల్‌లో నాన్-ముల్కీ గో బ్యాక్ ఉద్యమం; జి. రామాచారి "హైదరాబాద్ హితరక్షణ (ప్రొటెక్షన్) సమితి"ని స్థాపించారు.',
      '3–4 సెప్టెంబర్ 1952: సిటీ కాలేజీ కాల్పులపై జస్టిస్ పింగళి జగన్మోహన్ రెడ్డి కమిటీ విచారణ జరిపింది.'
    ]
  },
  T2: {
    titleTe: 'డే 2: ఫజల్ అలీ కమిషన్ (SRC), పెద్దమనుషుల ఒప్పందం (1956), ఆంధ్రప్రదేశ్ ఏర్పాటు & ప్రాంతీయ సంఘం',
    bigPictureTe: 'జస్టిస్ సయ్యద్ ఫజల్ అలీ నేతృత్వంలోని రాష్ట్రాల పునర్వ్యవస్థీకరణ కమిషన్ (SRC - 30 సెప్టెంబర్ 1955) తెలంగాణను వెంటనే ఆంధ్రతో కలపవద్దని, కనీసం 1961 వరకు ప్రత్యేక రాష్ట్రంగా ఉంచాలని స్పష్టంగా సిఫార్సు చేసింది. అయితే కేంద్ర ఒత్తిడితో 1956 ఫిబ్రవరి 20న ఢిల్లీ హైదరాబాద్ హౌస్‌లో 8 మంది నాయకులు "పెద్దమనుషుల ఒప్పందం"పై సంతకాలు చేసి 1956 నవంబర్ 1న ఆంధ్రప్రదేశ్‌ను ఏర్పాటు చేశారు.',
    oneMinuteRevisionTe: [
      'SRC (22 డిసెంబర్ 1953 – 30 సెప్టెంబర్ 1955): ఫజల్ అలీ, H.N. కుంజ్రు, K.M. ఫణిక్కర్ — 1961 ఎన్నికల తర్వాత 2/3 మెజారిటీ ఒప్పుకుంటేనే విలీనం చేయాలని సూచించింది.',
      'పెద్దమనుషుల ఒప్పందం (20 ఫిబ్రవరి 1956, ఢిల్లీ, హోంమంత్రి G.B. పంత్): తెలంగాణ నుండి బూర్గుల, K.V. రంగారెడ్డి, మర్రి చెన్నారెడ్డి, J.V. నర్సింగరావు; ఆంధ్ర నుండి బెజవాడ గోపాలరెడ్డి, నీలం సంజీవరెడ్డి, గౌతు లచ్చన్న, అల్లూరి సత్యనారాయణ రాజు సంతకాలు చేశారు (దామోదరం సంజీవయ్య సంతకం చేయలేదు!).',
      '1 నవంబర్ 1956: తొలి సీఎం నీలం సంజీవరెడ్డి ఉప ముఖ్యమంత్రి పదవిని "చేతికి ఆరో వేలు" అని తిరస్కరించి ఒప్పందాన్ని ఉల్లంఘించారు.',
      '1 ఫిబ్రవరి 1958: తెలంగాణ ప్రాంతీయ సంఘం (TRC) ఏర్పాటు — తొలి అధ్యక్షుడు కె. అచ్యుత రెడ్డి.'
    ]
  },
  T3: {
    titleTe: 'డే 3: 1969 జై తెలంగాణ ఉద్యమం, తెలంగాణ ప్రజా సమితి (TPS) & అష్టసూత్ర పథకం',
    bigPictureTe: 'పాల్వంచ KTPSలో నాన్-ముల్కీ నియామకాలకు నిరసనగా 1969 జనవరి 8న ఖమ్మంలో విద్యార్థి అన్నబత్తుల రవీంద్రనాథ్ ఆమరణ నిరాహార దీక్ష ప్రారంభించారు. 1969 మార్చి 28న సుప్రీంకోర్టు పబ్లిక్ ఎంప్లాయిమెంట్ చట్టంలోని సెక్షన్-3ను రద్దు చేయడంతో ప్రత్యేక రాష్ట్ర ఉద్యమం ఉవ్వెత్తున ఎగిసి 369 మంది అమరుల త్యాగంతో 1971 లోక్‌సభ ఎన్నికల్లో TPS 10 సీట్లు గెలుచుకుంది.',
    oneMinuteRevisionTe: [
      'KTPS నాన్-ముల్కీ జాబితాను బయటపెట్టినది: ఎ. శ్రీరామదాసు; తొలి ఆమరణ దీక్ష (8 జనవరి 1969): అన్నబత్తుల రవీంద్రనాథ్.',
      'తెలంగాణ ప్రజా సమితి (TPS) వ్యవస్థాపక అధ్యక్షుడు: అనంతల మదనమోహన్ (ఫిబ్రవరి 1969); మే 1969లో అధ్యక్షుడైనది: డా. మర్రి చెన్నారెడ్డి (జూలై 1970లో రాజకీయ పార్టీగా మార్పు).',
      '27 మార్చి 1969: మంత్రి పదవికి రాజీనామా చేసిన తొలి నేత కొండా లక్ష్మణ్ బాపూజీ ("తెలంగాణ కాంగ్రెస్ సమితి" స్థాపన).',
      '11 ఏప్రిల్ 1969: ఇందిరా గాంధీ అష్టసూత్ర పథకం (8-Point Formula) → వాంచూ కమిటీ (ముల్కీ చట్టం) & భార్గవ కమిటీ (₹28.34 కోట్ల మిగులు నిధులు).',
      '1971 లోక్‌సభ ఎన్నికల్లో TPS 14 సీట్లలో 10 గెలిచి, సెప్టెంబర్ 1971లో కాంగ్రెస్‌లో విలీనమైంది.'
    ]
  },
  T4: {
    titleTe: 'డే 4: 1972 ముల్కీ తీర్పు, పంచసూత్ర పథకం, జై ఆంధ్ర ఉద్యమం & షట్సూత్ర పథకం (1973)',
    bigPictureTe: 'పి.వి. నరసింహారావు సీఎం అయిన తర్వాత 1972 అక్టోబర్ 3న సుప్రీంకోర్టు 1919 ముల్కీ నిబంధనలు చెల్లుతాయని తీర్పునిచ్చింది. దీనిపై ఆంధ్ర ప్రాంతంలో "జై ఆంధ్ర" ఉద్యమం చెలరేగగా, ఇందిరా గాంధీ పంచసూత్ర పథకం (27 నవంబర్ 1972), ఆపై రాష్ట్రపతి పాలన, చివరకు 1973 సెప్టెంబర్ 21న షట్సూత్ర పథకం (Six-Point Formula) ద్వారా ముల్కీ నిబంధనలను, తెలంగాణ ప్రాంతీయ సంఘాన్ని రద్దు చేశారు!',
    oneMinuteRevisionTe: [
      '3 అక్టోబర్ 1972: సుప్రీంకోర్టు ముల్కీ నిబంధనలను సమర్థించింది → జై ఆంధ్ర ఉద్యమం ప్రారంభం.',
      '27 నవంబర్ 1972: పంచసూత్ర పథకం (హైదరాబాద్‌లో 1977 చివరి వరకు, మిగతా తెలంగాణలో 1980 చివరి వరకు మాత్రమే ముల్కీ అమలు).',
      '18 జనవరి 1973: పి.వి. నరసింహారావు రాజీనామా అనంతరం తొలిసారి రాష్ట్రపతి పాలన (సలహాదారు H.C. సరిన్).',
      '21 సెప్టెంబర్ 1973: షట్సూత్ర పథకం — సెంట్రల్ యూనివర్సిటీ (UoH), అడ్మినిస్ట్రేటివ్ ట్రిబ్యునల్, 32వ రాజ్యాంగ సవరణ, మరియు ముల్కీ + TRC రద్దు (రెండు హైకోర్టుల ప్రస్తావన ఇందులో లేదు!).',
      'కాలక్రమం కోడ్: అష్టసూత్ర (1969) → పంచసూత్ర (1972) → షట్సూత్ర (1973) → రాష్ట్రపతి ఉత్తర్వులు (1975).'
    ]
  },
  T5: {
    titleTe: 'డే 5: ఆర్టికల్ 371-D (32వ రాజ్యాంగ సవరణ) & 1975 రాష్ట్రపతి ఉత్తర్వులు (జోనల్ విధానం)',
    bigPictureTe: '32వ రాజ్యాంగ సవరణ (1 జూలై 1974 అమలు) ద్వారా ఆర్టికల్ 371-D (స్థానిక రిజర్వేషన్లు, ట్రిబ్యునల్) మరియు 371-E (హైదరాబాద్ సెంట్రల్ యూనివర్సిటీ) చేర్చారు. 1975 అక్టోబర్ 18న జారీ చేసిన రాష్ట్రపతి ఉత్తర్వులు రాష్ట్రాన్ని 6 జోన్లుగా విభజించగా (తెలంగాణ = జోన్ V & జోన్ VI), పేరా 14(f) మినహాయింపు 2009లో "హైదరాబాద్ ఫ్రీ జోన్" వివాదానికి దారితీసింది.',
    oneMinuteRevisionTe: [
      '32వ రాజ్యాంగ సవరణ చట్టం (1973 / అమలు 1 జూలై 1974): ఆర్టికల్ 371-D (ఉద్యోగాలు/విద్య/ట్రిబ్యునల్) & 371-E (సెంట్రల్ యూనివర్సిటీ).',
      '18 అక్టోబర్ 1975: రాష్ట్రపతి ఉత్తర్వులు జారీ (20 అక్టోబర్ 1975న AP G.O.P. 674).',
      'జోన్ V (ఆదిలాబాద్, కరీంనగర్, వరంగల్, ఖమ్మం) & జోన్ VI (హైదరాబాద్, రంగారెడ్డి, నిజామాబాద్, మెదక్, మహబూబ్‌నగర్, నల్గొండ).',
      'స్థానిక కోటా: జిల్లా క్యాడర్ 80%, జోనల్ నాన్-గెజిటెడ్ 70%, నిర్దిష్ట గెజిటెడ్ 60% (వరుసగా 4 ఏళ్ల విద్యాభ్యాసం).',
      'పి. సాంబమూర్తి కేసు (1986): ఆర్టికల్ 371-D(5) ప్రభుత్వ వీటో అధికారాన్ని సుప్రీంకోర్టు కొట్టివేసింది.'
    ]
  },
  T6: {
    titleTe: 'డే 6: జయభారత్ రెడ్డి కమిటీ, G.O. 610 (1985), గిర్గ్లానీ కమిషన్ & గ్రామీణ పోరాటాలు',
    bigPictureTe: '1975–1985 మధ్య తెలంగాణ జోన్ V, VI లలో జరిగిన అక్రమ నియామకాలపై ఎన్టీఆర్ ప్రభుత్వం నియమించిన కె. జయభారత్ రెడ్డి అధికారుల కమిటీ 58,962 మంది నాన్-లోకల్స్‌ను గుర్తించింది. వారిని వెనక్కి పంపేందుకు 1985 డిసెంబర్ 30న G.O. 610 జారీ చేసినా అమలు కాకపోవడంతో, 2001 జూన్ 25న చంద్రబాబు ప్రభుత్వం జె.ఎం. గిర్గ్లానీ ఏకసభ్య కమిషన్‌ను నియమించింది.',
    oneMinuteRevisionTe: [
      '7 సెప్టెంబర్ 1978: జగిత్యాల జైత్రయాత్ర; 20 ఏప్రిల్ 1981: ఇంద్రవెల్లి గోండు ఆదివాసీ కాల్పులు; 1984: పటేల్-పట్వారీ వ్యవస్థ రద్దు.',
      '1985: కె. జయభారత్ రెడ్డి IAS కమిటీ (58,962 నాన్-లోకల్స్ గుర్తింపు) → 30 డిసెంబర్ 1985న G.O. Ms. No. 610 జారీ.',
      '25 జూన్ 2001: J.M. గిర్గ్లానీ కమిషన్ నియామకం → సెప్టెంబర్ 2004 తుది నివేదిక (18 రకాల ఉల్లంఘనలు, 126 అంశాలు).',
      'సంస్థల స్థాపకులు: TNGO (K.R. ఆమోస్), తెలంగాణ ఇన్ఫర్మేషన్ ట్రస్ట్ (టి. ప్రభాకర్), ప్రగతి వేదిక (రాపోలు ఆనంద భాస్కర్), స్టడీ సర్కిల్ (గాదె ఇన్నయ్య).'
    ]
  },
  T7: {
    titleTe: 'డే 7: 1997 సభలు-డిక్లరేషన్లు, సాంస్కృతిక ధూంధాం & TRS ఆవిర్భావం (27 ఏప్రిల్ 2001)',
    bigPictureTe: '1996 నవంబర్ 1 విద్రోహ దినం తర్వాత 1997లో కవులు, మేధావులు భువనగిరి సభ (మార్చి 8–9), సూర్యాపేట సభ, తెలంగాణ ఐక్య వేదిక (అక్టోబర్), వరంగల్ డిక్లరేషన్ (డిసెంబర్ 28–29) ద్వారా మలిదశ ఉద్యమానికి పునాది వేశారు. ప్రొ. జయశంకర్ మార్గదర్శకత్వంలో 2001 ఏప్రిల్ 27న జలదృశ్యంలో కె. చంద్రశేఖర్ రావు తెలంగాణ రాష్ట్ర సమితి (TRS)ని స్థాపించారు.',
    oneMinuteRevisionTe: [
      '8–9 మార్చి 1997: భువనగిరి సభ (సాహితీ మిత్ర మండలి నిర్వహణ, అధ్యక్షుడు: జైని మల్లయ్య గుప్తా).',
      '1997 వరుస క్రమం: సూర్యాపేట డిక్లరేషన్ → తెలంగాణ ఐక్య వేదిక → వరంగల్ డిక్లరేషన్ (28–29 డిసెంబర్ 1997, AIPRF, కాళోజీ) → 1998 తెలంగాణ జన సభ.',
      '27 ఏప్రిల్ 2001: జలదృశ్యంలో TRS స్థాపన; 17 మే 2001: కరీంనగర్ సింహగర్జన.',
      'పార్టీల స్థాపకులు: జై తెలంగాణ పార్టీ (పి. ఇంద్రారెడ్డి), తెలంగాణ సాధన సమితి (ఆలె నరేంద్ర), నవ తెలంగాణ పార్టీ (టి. దేవేందర్ గౌడ్), తెలంగాణ నగారా సమితి (నాగం జనార్దన్ రెడ్డి).',
      '"జై బోలో తెలంగాణ" చిత్ర దర్శకుడు: ఎన్. శంకర్; తెలంగాణ తల్లి రూపకల్పన: బి.ఎస్. రాములు, ప్రొ. గంగాధర్, పసునూరి దయాకర్.'
    ]
  },
  T8: {
    titleTe: 'డే 8: ఫ్రీ జోన్ తీర్పు, కేసీఆర్ ఆమరణ దీక్ష, డిసెంబర్ 9 ప్రకటన & TJAC ఏర్పాటు (2009)',
    bigPictureTe: '2009 అక్టోబర్ 9న సుప్రీంకోర్టు హైదరాబాద్ పోలీస్ రిక్రూట్‌మెంట్‌ను "ఫ్రీ జోన్"గా ప్రకటించడంతో ఉద్యమం తీవ్రమైంది. 2009 నవంబర్ 29న కేసీఆర్ అరెస్ట్-ఆమరణ దీక్ష, కాసోజు శ్రీకాంతాచారి ఆత్మబలిదానం, ఉస్మానియా విద్యార్థుల పోరాటంతో డిసెంబర్ 9 రాత్రి చిదంబరం తెలంగాణ ప్రక్రియ ప్రారంభాన్ని ప్రకటించారు; డిసెంబర్ 23 వెనకడుగుతో డిసెంబర్ 24న ప్రొ. కోదండరాం కన్వీనర్‌గా TJAC ఏర్పడింది.',
    oneMinuteRevisionTe: [
      'జనవరి 2005: ప్రణబ్ ముఖర్జీ కమిటీ (రఘువంశ్ ప్రసాద్ సింగ్, దయానిధి మారన్).',
      '9 అక్టోబర్ 2009: సుప్రీంకోర్టు హైదరాబాద్ ఫ్రీ జోన్ తీర్పు (పేరా 14f).',
      '29 నవంబర్ 2009: అల్గనూర్ వద్ద కేసీఆర్ అరెస్ట్ & దీక్ష ప్రారంభం; LB నగర్ అంబేద్కర్ విగ్రహం వద్ద శ్రీకాంతాచారి ఆత్మబలిదానం (డిసెంబర్ 3 మరణం).',
      '9 డిసెంబర్ 2009: చిదంబరం తొలి ప్రకటన; 23 డిసెంబర్ 2009: రెండో ప్రకటన (హోల్డ్); 24 డిసెంబర్ 2009: TJAC ఏర్పాటు (CPI బయట ఉండి మద్దతిచ్చింది).',
      '3 జనవరి 2010: ఉస్మానియా యూనివర్సిటీలో చారిత్రాత్మక "తెలంగాణ విద్యార్థి గర్జన".'
    ]
  },
  T9: {
    titleTe: 'డే 9: శ్రీకృష్ణ కమిటీ, మిలియన్ మార్చ్, 42 రోజుల సకల జనుల సమ్మె & పార్లమెంట్ ఆమోదం (2010–2014)',
    bigPictureTe: 'జస్టిస్ బి.ఎన్. శ్రీకృష్ణ కమిటీ (3 ఫిబ్రవరి – 30 డిసెంబర్ 2010) 6 ఆప్షన్లు ఇవ్వగా, ప్రజలు 6వ ఆప్షన్‌ను తిరస్కరించి మిలియన్ మార్చ్ (10 మార్చి 2011), 42 రోజుల సకల జనుల సమ్మె (13 సెప్టెంబర్ – 24 అక్టోబర్ 2011), రైల్ రోకో (15 అక్టోబర్ 2011), సాగరహారం (30 సెప్టెంబర్ 2012) నిర్వహించారు. 2013 జూలై 30న CWC తీర్మానం, 2014 ఫిబ్రవరిలో పార్లమెంట్ ఆమోదం, 2014 జూన్ 2న తెలంగాణ రాష్ట్ర ఆవిర్భావం జరిగాయి!',
    oneMinuteRevisionTe: [
      '3 ఫిబ్రవరి 2010: శ్రీకృష్ణ కమిటీ నియామకం (సభ్యులు: శ్రీకృష్ణ, రణ్‌బీర్ సింగ్, అబూసలేహ్ షరీఫ్, రవీందర్ కౌర్, వినోద్ దుగ్గల్ — చిన్మయ గోస్వామి సభ్యుడు కాదు!).',
      'ప్రధాన ఉద్యమాలు: మిలియన్ మార్చ్ (10 మార్చి 2011) → నమస్తే తెలంగాణ ప్రారంభం (6 జూన్ 2011) → సకల జనుల సమ్మె (13 సెప్టెంబర్–24 అక్టోబర్ 2011, 42 రోజులు, TJAC) → రైల్ రోకో (15 అక్టోబర్ 2011) → సాగరహారం (30 సెప్టెంబర్ 2012).',
      '30 జూలై 2013: CWC తీర్మానం (జూలై 20 కాదు!) → 3 అక్టోబర్ 2013: కేంద్ర క్యాబినెట్ ఆమోదం → 8 అక్టోబర్ 2013: షిండే GoM (V. నారాయణస్వామి ప్రత్యేక ఆహ్వానితుడు).',
      '2014 ఫిబ్రవరి 13: లోక్‌సభలో బిల్లు ప్రవేశం → ఫిబ్రవరి 18: లోక్‌సభ ఆమోదం → ఫిబ్రవరి 19: సీఎం కిరణ్ రాజీనామా → ఫిబ్రవరి 20: రాజ్యసభ ఆమోదం → మార్చి 1: రాష్ట్రపతి ఆమోదం → జూన్ 2: అపాయింటెడ్ డే (29వ రాష్ట్రం!).'
    ]
  },
  T10: {
    titleTe: 'డే 10: ఆంధ్రప్రదేశ్ పునర్వ్యవస్థీకరణ చట్టం, 2014 (Act 6 of 2014) & తుది మాక్ పరీక్షల సమీక్ష',
    bigPictureTe: '2014 మార్చి 1న రాష్ట్రపతి ఆమోదం పొందిన ఆంధ్రప్రదేశ్ పునర్వ్యవస్థీకరణ చట్టం (12 భాగాలు, 108 సెక్షన్లు, 13 షెడ్యూళ్లు) ద్వారా 10 జిల్లాలతో (ప్రస్తుతం 33 జిల్లాలు) తెలంగాణ ఏర్పడింది. 2014 జూన్ 2న తొలి ముఖ్యమంత్రిగా కేసీఆర్, తొలి హోంమంత్రిగా నాయిని నర్సింహారెడ్డి ప్రమాణ స్వీకారం చేశారు.',
    oneMinuteRevisionTe: [
      'పునర్వ్యవస్థీకరణ చట్టం (Act No. 6 of 2014): 12 భాగాలు (Parts), 108 సెక్షన్లు, 13 షెడ్యూళ్లు.',
      'తెలంగాణ స్థానాలు: రాజ్యసభ = 7, లోక్‌సభ = 17, శాసనమండలి (MLC) = 40, శాసనసభ (MLA) = 119.',
      'ముఖ్య సెక్షన్లు & షెడ్యూళ్లు: సెక్షన్ 3 (తెలంగాణ), సెక్షన్ 5 (10 ఏళ్ల ఉమ్మడి రాజధాని), సెక్షన్ 8 (గవర్నర్ అధికారాలు), సెక్షన్ 85 (KRMB/GRMB), సెక్షన్ 90 (పోలవరం); షెడ్యూల్ IX (89 కార్పొరేషన్లు), షెడ్యూల్ X (107 సంస్థలు).',
      'తొలి పదవులు (2 జూన్ 2014): గవర్నర్ E.S.L. నరసింహన్, సీఎం KCR, తొలి హోంమంత్రి నాయిని నర్సింహారెడ్డి, తొలి స్పీకర్ S. మధుసూదనాచారి, మండలి చైర్మన్ K. స్వామిగౌడ్.'
    ]
  }
};

// Telugu Bilingual Question Translations Map (Covers Verified PYQs & Key Analytical Stems; fallback auto-generates bilingual context header)
export const QUESTION_TELUGU_MAP: Record<string, { stemTe: string; optionsTe?: [string, string, string, string]; explanationTe?: string }> = {
  'PYQ-01': {
    stemTe: '1948, సెప్టెంబర్ 17న భారత ప్రభుత్వం హైదరాబాద్ రాష్ట్రాన్ని ఇండియన్ యూనియన్‌లోకి తీసుకురావడానికి ఏ సైనిక చర్యను నిర్వహించింది?',
    optionsTe: ['ఆపరేషన్ లోగో', 'ఆపరేషన్ కోడ్', 'ఆపరేషన్ పోలో', 'ఆపరేషన్ విజయ్'],
    explanationTe: '1948 సెప్టెంబర్ 13–17 మధ్య మేజర్ జనరల్ జె.ఎన్. చౌదరి నేతృత్వంలో జరిగిన "ఆపరేషన్ పోలో" (పోలీస్ యాక్షన్) ద్వారా హైదరాబాద్ సంస్థానం భారత యూనియన్‌లో విలీనమైంది.'
  },
  'PYQ-02': {
    stemTe: '‘హైదరాబాద్ ప్రొటెక్షన్ సమితి’ (హితరక్షణ సమితి) స్థాపకుడు ఎవరు?',
    optionsTe: ['బూర్గుల నర్సింగరావు', 'హయగ్రీవాచారి', 'రామాచారి', 'మందుముల నర్సింగరావు'],
    explanationTe: 'ముల్కీ హక్కుల పరిరక్షణ కోసం జి. రామాచారి హైదరాబాద్ హితరక్షణ (ప్రొటెక్షన్) సమితిని స్థాపించారు (ఇదే ప్రశ్న 2022 SI ప్రిలిమ్స్ మరియు 2023 SI మెయిన్స్ రెండింటిలోనూ అడిగారు!).'
  },
  'PYQ-03': {
    stemTe: '‘హైదరాబాద్-హితరక్షణ సమితి’ స్థాపకుడు ఎవరు?',
    optionsTe: ['రామాచారి', 'కృష్ణంరాజు', 'సి.హెచ్. వాగ్రే', 'కుప్పానాయుడు'],
    explanationTe: 'జి. రామాచారి హైదరాబాద్ హితరక్షణ సమితి వ్యవస్థాపకుడు.'
  },
  'PYQ-04': {
    stemTe: '1952 హైదరాబాద్ ముల్కీ ఉద్యమ కాల్పుల సంఘటనలపై విచారణ జరిపిన కమిషన్‌కు ఎవరు నేతృత్వం వహించారు?',
    optionsTe: ['వామన్ నాయక్', 'అక్బర్ హైదరీ', 'జగన్మోహన్ రెడ్డి', 'రామాచారి'],
    explanationTe: '1952 సెప్టెంబర్ 3–4 సిటీ కాలేజీ పోలీసు కాల్పులపై జస్టిస్ పింగళి జగన్మోహన్ రెడ్డి కమిషన్ విచారణ జరిపింది.'
  },
  'PYQ-05': {
    stemTe: 'నిశ్చిత వాక్యం (A): 1868లో సాలార్ జంగ్-I ఉద్యోగాల్లో ముల్కీలకు ప్రాధాన్యత ఇవ్వాలని ఆదేశించారు.\nకారణం (R): నాన్-ముల్కీల నియామకం వల్ల స్థానిక ముల్కీలలో తీవ్ర అసంతృప్తి ఏర్పడింది.',
    optionsTe: ['(A) మరియు (R) రెండూ సరైనవి, (A) కు (R) సరైన వివరణ', '(A) మరియు (R) రెండూ సరైనవి, కానీ (R) సరైన వివరణ కాదు', '(A) సరైనది, (R) తప్పు', '(A) తప్పు, (R) సరైనది'],
    explanationTe: 'బయటి ప్రాంతాల వారి నియామకంపై స్థానికుల్లో కలిగిన అసంతృప్తి వల్లే 1868లో సాలార్ జంగ్-I ముల్కీ ఉత్తర్వులు ఇచ్చారు.'
  },
  'PYQ-06': {
    stemTe: 'ఢిల్లీలో ‘పెద్దమనుషుల ఒడంబడిక’ (Gentlemen’s Agreement) పై ఏ రోజు సంతకం చేయబడింది?',
    optionsTe: ['16 ఫిబ్రవరి, 1956', '18 ఫిబ్రవరి, 1956', '19 ఫిబ్రవరి, 1956', '20 ఫిబ్రవరి, 1956'],
    explanationTe: '1956 ఫిబ్రవరి 20న ఢిల్లీలోని హైదరాబాద్ హౌస్‌లో ఆంధ్ర, తెలంగాణ నేతలు పెద్దమనుషుల ఒప్పందంపై సంతకాలు చేశారు.'
  },
  'PYQ-07': {
    stemTe: '1956లో ఆంధ్ర మరియు తెలంగాణ నాయకులు పెద్దమనుషుల ఒడంబడికపై సంతకాలు చేసిన చారిత్రక సందర్భంలో భారత హోంమంత్రి ఎవరు?',
    optionsTe: ['సర్దార్ పటేల్', 'గోవింద్ వల్లభ్ పంత్', 'మొరార్జీ దేశాయ్', 'మౌలానా అబుల్ కలాం ఆజాద్'],
    explanationTe: '1956 ఫిబ్రవరి 20 నాటికి భారత హోంమంత్రి గోవింద్ వల్లభ్ పంత్.'
  },
  'PYQ-08': {
    stemTe: '1956లో పెద్దమనుషుల ఒడంబడికపై సంతకాలు చేసిన ఆంధ్ర ప్రాంత నాయకులలో సభ్యుడు కాని నాయకుని గుర్తించండి:',
    optionsTe: ['దామోదరం సంజీవయ్య', 'నీలం సంజీవరెడ్డి', 'గౌతు లచ్చన్న', 'బి. గోపాలరెడ్డి'],
    explanationTe: 'ఆంధ్ర నుండి బెజవాడ గోపాలరెడ్డి, నీలం సంజీవరెడ్డి, గౌతు లచ్చన్న, అల్లూరి సత్యనారాయణ రాజు సంతకం చేశారు; దామోదరం సంజీవయ్య సంతకం చేయలేదు.'
  },
  'PYQ-09': {
    stemTe: 'ఉప ముఖ్యమంత్రి పదవిని ‘చేతికి ఆరో వ్రేలు’గా ఎవరు అభివర్ణించారు?',
    optionsTe: ['ఎం. చెన్నారెడ్డి', 'నీలం సంజీవరెడ్డి', 'బి. రామకృష్ణారెడ్డి', 'కె. బ్రహ్మానంద రెడ్డి'],
    explanationTe: '1956 నవంబర్ 1న ఆంధ్రప్రదేశ్ తొలి ముఖ్యమంత్రి అయిన నీలం సంజీవరెడ్డి తెలంగాణకు ఇవ్వాల్సిన ఉప ముఖ్యమంత్రి పదవిని "చేతికి ఆరో వేలు" అని తిరస్కరించారు.'
  },
  'PYQ-10': {
    stemTe: 'తెలంగాణ ప్రాంతీయ సంఘం (Telangana Regional Committee - 1958) తొలి అధ్యక్షుడు ఎవరు?',
    optionsTe: ['హయగ్రీవాచారి', 'చొక్కారావు', 'కె. అచ్యుత రెడ్డి', 'కోదాటి రాజమల్లు'],
    explanationTe: '1958 ఫిబ్రవరి 1న ఏర్పాటైన తెలంగాణ ప్రాంతీయ సంఘానికి కె. అచ్యుత రెడ్డి తొలి అధ్యక్షుడిగా ఎన్నికయ్యారు.'
  },
  'PYQ-12': {
    stemTe: '1969 జై తెలంగాణ ఉద్యమంలో తొలిసారిగా ఆమరణ నిరాహార దీక్ష చేపట్టినది ఎవరు?',
    optionsTe: ['కొలిశెట్టి రామదాసు', 'టి. పురుషోత్తమ రావు', 'పోటు కృష్ణమూర్తి', 'అన్నబత్తుల రవీంద్రనాథ్'],
    explanationTe: '1969 జనవరి 8న ఖమ్మంలో బి.ఏ. విద్యార్థి అన్నబత్తుల రవీంద్రనాథ్ తొలి ఆమరణ నిరాహార దీక్ష ప్రారంభించారు.'
  },
  'PYQ-14': {
    stemTe: '1969లో స్థాపించబడిన తెలంగాణ ప్రజా సమితి (TPS) వ్యవస్థాపక అధ్యక్షుడు ఎవరు?',
    optionsTe: ['అనంతల మదనమోహన్', 'కె. జయశంకర్', 'కొండా లక్ష్మణ్ బాపూజీ', 'ఎం. చెన్నారెడ్డి'],
    explanationTe: '1969 ఫిబ్రవరిలో TPS వ్యవస్థాపక అధ్యక్షుడు అనంతల మదనమోహన్; మే 1969లో డా. మర్రి చెన్నారెడ్డి అధ్యక్ష బాధ్యతలు చేపట్టారు.'
  },
  'PYQ-15': {
    stemTe: '1969 మార్చిలో తన మంత్రి పదవికి రాజీనామా చేసిన అనంతరం కొండా లక్ష్మణ్ బాపూజీ స్థాపించిన సంస్థ ఏది?',
    optionsTe: ['తెలంగాణ పీపుల్స్ సమితి', 'తెలంగాణ కాంగ్రెస్ సమితి', 'తెలంగాణ కన్వెన్షన్', 'పీపుల్స్ పార్టీ ఆఫ్ తెలంగాణ'],
    explanationTe: '1969 మార్చి 27న మంత్రి పదవికి రాజీనామా చేసిన కొండా లక్ష్మణ్ బాపూజీ "తెలంగాణ కాంగ్రెస్ సమితి"ని స్థాపించారు.'
  },
  'PYQ-16': {
    stemTe: 'ముల్కీ నిబంధనలను కొనసాగించేందుకు రాజ్యాంగ సవరణలపై సిఫార్సులు చేయడానికి 1969 ఏప్రిల్‌లో నియమించిన కమిటీ చైర్మన్ ఎవరు?',
    optionsTe: ['పింగళి జగన్మోహన్ రెడ్డి', 'కుమార్ లలిత్', 'జి.ఎన్. వాగ్రే', 'కె.ఎన్. వాంచూ'],
    explanationTe: 'అష్టసూత్ర పథకంలో భాగంగా 1969 ఏప్రిల్ 19న మాజీ ప్రధాన న్యాయమూర్తి జస్టిస్ కె.ఎన్. వాంచూ అధ్యక్షతన న్యాయనిపుణుల కమిటీని నియమించారు.'
  },
  'PYQ-19': {
    stemTe: '1971 సాధారణ (లోక్‌సభ) ఎన్నికల్లో తెలంగాణ ప్రజా సమితి ఎన్ని సీట్లు గెలుచుకుంది?',
    optionsTe: ['12', '11', '14', '10'],
    explanationTe: '1971 మార్చి లోక్‌సభ ఎన్నికల్లో తెలంగాణలోని 14 సీట్లలో TPS 10 సీట్లు గెలుచుకుంది.'
  },
  'PYQ-21': {
    stemTe: 'ఈ క్రింది వాటిని కాలక్రమానుసారంగా అమర్చండి: (a) అష్టసూత్ర పథకం (b) షట్సూత్ర పథకం (c) పంచసూత్ర పథకం (d) రాష్ట్రపతి ఉత్తర్వులు',
    optionsTe: ['a, c, b, d', 'a, b, c, d', 'c, b, a, d', 'b, c, a, d'],
    explanationTe: 'అష్టసూత్ర (1969) → పంచసూత్ర (1972) → షట్సూత్ర (1973) → రాష్ట్రపతి ఉత్తర్వులు (1975).'
  },
  'PYQ-23': {
    stemTe: '1985లో G.O. 610 జారీకి దారితీసిన ‘ఆఫీసర్స్ కమిటీ’కి ఎవరు అధ్యక్షత వహించారు?',
    optionsTe: ['జయభారత్ రెడ్డి', 'శ్రీధర్ నాయక్', 'జె.కె. దూబే', 'ఎస్.కె. మిశ్రా'],
    explanationTe: 'కె. జయభారత్ రెడ్డి IAS నేతృత్వంలోని కమిటీ 58,962 నాన్-లోకల్ నియామకాలను గుర్తించడంతో 1985 డిసెంబర్ 30న G.O. 610 జారీ అయింది.'
  },
  'PYQ-24': {
    stemTe: '2001 జూన్‌లో తెలుగుదేశం ప్రభుత్వం (G.O. 610 అమలుపై) నియమించిన కమిషన్‌ను గుర్తించండి:',
    optionsTe: ['భార్గవ కమిషన్', 'జె.ఎం. గిర్గ్లానీ కమిషన్', 'నాన్ ముల్కీ ప్రొటెక్షన్ కమిషన్', 'తెలంగాణ ముల్కీ కమిషన్'],
    explanationTe: '2001 జూన్ 25న చంద్రబాబు నాయుడు ప్రభుత్వం జె.ఎం. గిర్గ్లానీ ఏకసభ్య కమిషన్‌ను నియమించింది.'
  },
  'PYQ-28': {
    stemTe: '1997 మార్చి 8–9 తేదీలలో జరిగిన ‘భువనగిరి సభ’కు ఎవరు అధ్యక్షత వహించారు?',
    optionsTe: ['మల్లయ్య ముదిరాజ్', 'శ్రీశైలం యాదవ్', 'జైని మల్లయ్య గుప్తా', 'కె. జయశంకర్'],
    explanationTe: 'సాహితీ మిత్ర మండలి నిర్వహించిన 1997 భువనగిరి సభకు స్వాతంత్ర్య సమరయోధుడు జైని మల్లయ్య గుప్తా అధ్యక్షత వహించారు.'
  },
  'PYQ-29': {
    stemTe: '1997 డిసెంబర్‌లో AIPRF బ్యానర్ క్రింద వరంగల్‌లో జరిగిన డెమొక్రాటిక్ తెలంగాణ కాన్ఫరెన్స్‌తో సంబంధం ఉన్న ప్రముఖుడు ఎవరు?',
    optionsTe: ['మర్రి చెన్నారెడ్డి', 'కె. జయశంకర్', 'కాళోజీ నారాయణరావు', 'వేదకుమార్'],
    explanationTe: 'TSLPRB తుది కీ ప్రకారం ప్రజాకవి కాళోజీ నారాయణరావు.'
  },
  'PYQ-31': {
    stemTe: 'తెలంగాణ ఉద్యమ అంతిమ దశలో 2001 ఏప్రిల్ 27 చారిత్రక ప్రాధాన్యత ఏమిటి?',
    optionsTe: ['తెలంగాణ ఎలైట్స్ ఫోరం ఏర్పాటు', 'తెలంగాణ జనసభ స్థాపన', 'భువనగిరి డిక్లరేషన్', 'తెలంగాణ రాష్ట్ర సమితి (TRS) స్థాపన'],
    explanationTe: '2001 ఏప్రిల్ 27న హైదరాబాద్ జలదృశ్యంలో కేసీఆర్ తెలంగాణ రాష్ట్ర సమితి (TRS)ని స్థాపించారు.'
  },
  'PYQ-35': {
    stemTe: 'ఉస్మానియా విశ్వవిద్యాలయంలో విద్యార్థులు ‘తెలంగాణ విద్యార్థి గర్జన’ను ఏ రోజు నిర్వహించారు?',
    optionsTe: ['14 జూన్, 2013', '3 జనవరి, 2010', '3 జనవరి, 2012', '10 ఏప్రిల్, 2011'],
    explanationTe: '2010 జనవరి 3న ఉస్మానియా యూనివర్సిటీ ఆర్ట్స్ కాలేజీ వద్ద విద్యార్థి గర్జన జరిగింది.'
  },
  'PYQ-37': {
    stemTe: 'జస్టిస్ శ్రీకృష్ణ కమిటీ నియామక తేదీని గుర్తించండి:',
    optionsTe: ['ఫిబ్రవరి 2, 2010', 'ఫిబ్రవరి 4, 2010', 'ఫిబ్రవరి 3, 2010', 'పైవేవీ కావు'],
    explanationTe: '2010 ఫిబ్రవరి 3న కేంద్ర హోంశాఖ జస్టిస్ బి.ఎన్. శ్రీకృష్ణ కమిటీని నియమించింది.'
  },
  'PYQ-38': {
    stemTe: 'ఈ క్రింది వారిలో జస్టిస్ శ్రీకృష్ణ కమిటీలో సభ్యుడు కానివారు ఎవరు?',
    optionsTe: ['వినోద్ దుగ్గల్', 'రవీందర్ కౌర్', 'చిన్మయ గోస్వామి', 'రణ్‌బీర్ సింగ్'],
    explanationTe: 'శ్రీకృష్ణ కమిటీలో 5 గురు సభ్యులు: శ్రీకృష్ణ, రణ్‌బీర్ సింగ్, అబూసలేహ్ షరీఫ్, రవీందర్ కౌర్, వినోద్ దుగ్గల్. చిన్మయ గోస్వామి సభ్యుడు కాదు.'
  },
  'PYQ-39': {
    stemTe: '42 రోజుల చారిత్రాత్మక ‘సకల జనుల సమ్మె’ (2011) ను నిర్వహించిన సంస్థ ఏది?',
    optionsTe: ['తెలంగాణ జాయింట్ యాక్షన్ కమిటీ (TJAC)', 'తెలంగాణ విద్యావంతుల వేదిక', 'తెలంగాణ రాష్ట్ర సమితి', 'తెలంగాణ ఐక్య వేదిక'],
    explanationTe: 'ప్రొ. కోదండరాం నేతృత్వంలోని TJAC ఆధ్వర్యంలో 2011 సెప్టెంబర్ 13 నుండి అక్టోబర్ 24 వరకు సకల జనుల సమ్మె జరిగింది.'
  },
  'PYQ-40': {
    stemTe: 'మలిదశ తెలంగాణ ఉద్యమంలో ‘రైల్ రోకో’ ఏ తేదీన ప్రారంభమైంది?',
    optionsTe: ['అక్టోబర్ 16, 2011', 'అక్టోబర్ 11, 2011', 'అక్టోబర్ 15, 2011', 'పైవేవీ కావు'],
    explanationTe: '2011 అక్టోబర్ 15 నుండి 17 వరకు మూడు రోజుల పాటు రైల్ రోకో నిర్వహించారు.'
  },
  'PYQ-45': {
    stemTe: 'కేంద్ర హోంమంత్రి సుశీల్ కుమార్ షిండే లోక్‌సభలో ఆంధ్రప్రదేశ్ పునర్వ్యవస్థీకరణ బిల్లును ఎప్పుడు ప్రవేశపెట్టారు?',
    optionsTe: ['ఫిబ్రవరి 3, 2014', 'ఫిబ్రవరి 13, 2014', 'ఫిబ్రవరి 20, 2014', 'మార్చి 1, 2014'],
    explanationTe: '2014 ఫిబ్రవరి 13న లోక్‌సభలో బిల్లును ప్రవేశపెట్టారు.'
  },
  'PYQ-46': {
    stemTe: 'ప్రత్యేక తెలంగాణ రాష్ట్ర బిల్లును లోక్‌సభ ఏ రోజున ఆమోదించింది?',
    optionsTe: ['16 ఫిబ్రవరి, 2014', '18 మార్చి, 2014', '18 ఫిబ్రవరి, 2014', '20 ఫిబ్రవరి, 2014'],
    explanationTe: '2014 ఫిబ్రవరి 18న లోక్‌సభ, ఫిబ్రవరి 20న రాజ్యసభ ఆమోదించాయి.'
  },
  'PYQ-47': {
    stemTe: '2014 జూన్ 2న ఏర్పడిన తెలంగాణ రాష్ట్రానికి తొలి హోంమంత్రి ఎవరు?',
    optionsTe: ['మహమూద్ అలీ', 'టి. హరీష్ రావు', 'నాయిని నర్సింహారెడ్డి', 'పి. సబితా ఇంద్రారెడ్డి'],
    explanationTe: 'తెలంగాణ తొలి హోంమంత్రి నాయిని నర్సింహారెడ్డి.'
  }
};
