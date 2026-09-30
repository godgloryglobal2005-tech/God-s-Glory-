import { Subject } from '../types';

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  curriculumName: string;
  examBoards: string[];
  childLevels: string[];
  highSchoolLevels: string[];
  childTerms: string[];
  highSchoolTerms: string[];
  description: string;
}

export const COUNTRIES: CountryInfo[] = [
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    dialCode: '+234',
    curriculumName: 'NERDC / WAEC / NECO / JAMB Standard',
    examBoards: ['WAEC / WASSCE', 'NECO (SSCE)', 'JAMB / UTME', 'BECE (Junior WAEC)', 'National Common Entrance'],
    childLevels: [
      'Kindergarten / Early Years',
      'Nursery 1',
      'Nursery 2',
      'Primary 1 (Basic 1)',
      'Primary 2 (Basic 2)',
      'Primary 3 (Basic 3)',
      'Primary 4 (Basic 4)',
      'Primary 5 (Basic 5)',
      'Primary 6 (Basic 6 / Common Entrance Prep)'
    ],
    highSchoolLevels: [
      'JSS 1 (Basic 7)',
      'JSS 2 (Basic 8)',
      'JSS 3 (Basic 9 / BECE)',
      'SSS 1 (Senior Secondary Year 1)',
      'SSS 2 (Senior Secondary Year 2)',
      'SSS 3 (WASSCE / WAEC / NECO / JAMB O-Level)',
      'Advanced Level / IJMB / JUPEB'
    ],
    childTerms: ['First Term (Harmattan / September-December)', 'Second Term (Lent / January-April)', 'Third Term (Promotion / April-July)'],
    highSchoolTerms: ['First Term (September-December)', 'Second Term (January-April)', 'Third Term (April-July / National Exams)'],
    description: 'National Educational Research and Development Council (NERDC) Curriculum with WAEC, NECO, and JAMB UTME syllabus.'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
    curriculumName: 'UK National Curriculum / GCSE / A-Levels',
    examBoards: ['AQA', 'Edexcel (Pearson)', 'OCR', 'Cambridge Assessment'],
    childLevels: [
      'Reception (EYFS)',
      'Year 1 (Key Stage 1)',
      'Year 2 (Key Stage 1 / SATs)',
      'Year 3 (Key Stage 2)',
      'Year 4 (Key Stage 2)',
      'Year 5 (Key Stage 2)',
      'Year 6 (Key Stage 2 / 11+ SATs)'
    ],
    highSchoolLevels: [
      'Year 7 (Key Stage 3)',
      'Year 8 (Key Stage 3)',
      'Year 9 (Key Stage 3 / GCSE Options)',
      'Year 10 (Key Stage 4 / GCSE Year 1)',
      'Year 11 (Key Stage 4 / GCSE Final Exams)',
      'Year 12 (Sixth Form / Lower Sixth AS-Level)',
      'Year 13 (Sixth Form / Upper Sixth A-Levels)'
    ],
    childTerms: ['Autumn Term (Sept-Dec)', 'Spring Term (Jan-March)', 'Summer Term (April-July)'],
    highSchoolTerms: ['Autumn Term (Sept-Dec)', 'Spring Term (Jan-March)', 'Summer Term (April-July / GCSE & A-Level Exams)'],
    description: 'England & Wales National Curriculum standards preparing pupils for GCSEs, A-Levels, and Cambridge International examinations.'
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    curriculumName: 'US Common Core / Next Generation Science / AP',
    examBoards: ['College Board (SAT & AP)', 'ACT', 'State Regents / Standards'],
    childLevels: [
      'Kindergarten',
      '1st Grade (Elementary)',
      '2nd Grade (Elementary)',
      '3rd Grade (Elementary)',
      '4th Grade (Elementary)',
      '5th Grade (Elementary)'
    ],
    highSchoolLevels: [
      '6th Grade (Middle School)',
      '7th Grade (Middle School)',
      '8th Grade (Middle School)',
      '9th Grade (Freshman High)',
      '10th Grade (Sophomore High)',
      '11th Grade (Junior High / SAT & ACT)',
      '12th Grade (Senior High / AP Courses)'
    ],
    childTerms: ['Fall Semester', 'Spring Semester', 'Summer Session'],
    highSchoolTerms: ['Fall Semester (Quarter 1 & 2)', 'Spring Semester (Quarter 3 & 4 / AP Testing)'],
    description: 'Aligned with US Common Core State Standards (CCSS), NGSS, and College Board Advanced Placement (AP) frameworks.'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    curriculumName: 'Canadian Provincial Standards (Ontario/BC/Alberta)',
    examBoards: ['OSSD (Ontario)', 'Alberta Diploma', 'BC Ministry of Education'],
    childLevels: [
      'Kindergarten (JK & SK)',
      'Grade 1 (Primary)',
      'Grade 2 (Primary)',
      'Grade 3 (Primary / EQAO)',
      'Grade 4 (Junior)',
      'Grade 5 (Junior)',
      'Grade 6 (Junior / EQAO)'
    ],
    highSchoolLevels: [
      'Grade 7 (Intermediate)',
      'Grade 8 (Intermediate)',
      'Grade 9 (Secondary High)',
      'Grade 10 (Secondary High / Literacy Test)',
      'Grade 11 (Senior Secondary)',
      'Grade 12 (University Preparation / Provincial Diplomas)'
    ],
    childTerms: ['Fall Term (Sept-Nov)', 'Winter Term (Dec-March)', 'Spring Term (April-June)'],
    highSchoolTerms: ['Semester 1 (Sept-Jan)', 'Semester 2 (Feb-June)'],
    description: 'High-standard provincial Canadian curriculums focusing on inquiry-based STEM, literacy, and university entrance.'
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    dialCode: '+233',
    curriculumName: 'GES / NaCCA Standard Curriculum',
    examBoards: ['WAEC Ghana (BECE & WASSCE)'],
    childLevels: [
      'Kindergarten 1',
      'Kindergarten 2',
      'Basic 1 (Primary 1)',
      'Basic 2 (Primary 2)',
      'Basic 3 (Primary 3)',
      'Basic 4 (Primary 4)',
      'Basic 5 (Primary 5)',
      'Basic 6 (Primary 6)'
    ],
    highSchoolLevels: [
      'Basic 7 (JHS 1)',
      'Basic 8 (JHS 2)',
      'Basic 9 (JHS 3 / BECE)',
      'SHS 1 (Senior High 1)',
      'SHS 2 (Senior High 2)',
      'SHS 3 (WASSCE Final Year)'
    ],
    childTerms: ['Term 1 (Sept-Dec)', 'Term 2 (Jan-April)', 'Term 3 (May-July)'],
    highSchoolTerms: ['First Semester', 'Second Semester (WASSCE Examination Period)'],
    description: 'Ghana Education Service (GES) standards with comprehensive BECE and West African Senior School Certificate Examination.'
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    dialCode: '+254',
    curriculumName: 'Kenya CBC (Competency-Based Curriculum) / KCSE',
    examBoards: ['KNEC (Kenya National Examinations Council)'],
    childLevels: [
      'Pre-Primary 1 (PP1)',
      'Pre-Primary 2 (PP2)',
      'Grade 1 (Lower Primary)',
      'Grade 2 (Lower Primary)',
      'Grade 3 (Lower Primary)',
      'Grade 4 (Upper Primary)',
      'Grade 5 (Upper Primary)',
      'Grade 6 (KPSEA Assessment)'
    ],
    highSchoolLevels: [
      'Grade 7 (Junior Secondary School)',
      'Grade 8 (Junior Secondary School)',
      'Grade 9 (Junior Secondary / KJSEA)',
      'Grade 10 (Senior Secondary School)',
      'Grade 11 (Senior Secondary School)',
      'Grade 12 (KCSE Examination / University Entry)'
    ],
    childTerms: ['Term 1 (Jan-April)', 'Term 2 (May-August)', 'Term 3 (Sept-Nov)'],
    highSchoolTerms: ['Term 1 (Jan-April)', 'Term 2 (May-August)', 'Term 3 (Sept-Nov / KCSE Exams)'],
    description: 'Modern Kenyan Competency-Based Curriculum transitioning through Junior and Senior Secondary with KNEC examinations.'
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    dialCode: '+27',
    curriculumName: 'CAPS Curriculum & National Senior Certificate',
    examBoards: ['Department of Basic Education (DBE / Matric)', 'IEB'],
    childLevels: [
      'Grade R (Reception)',
      'Grade 1 (Foundation Phase)',
      'Grade 2 (Foundation Phase)',
      'Grade 3 (Foundation Phase)',
      'Grade 4 (Intermediate Phase)',
      'Grade 5 (Intermediate Phase)',
      'Grade 6 (Intermediate Phase)'
    ],
    highSchoolLevels: [
      'Grade 7 (Senior Phase)',
      'Grade 8 (Senior Phase)',
      'Grade 9 (Senior Phase)',
      'Grade 10 (FET Phase)',
      'Grade 11 (FET Phase)',
      'Grade 12 (Matric / National Senior Certificate)'
    ],
    childTerms: ['Term 1 (Jan-March)', 'Term 2 (April-June)', 'Term 3 (July-Sept)', 'Term 4 (Oct-Dec)'],
    highSchoolTerms: ['Term 1 (Jan-March)', 'Term 2 (April-June)', 'Term 3 (July-Sept)', 'Term 4 (Matric Exams)'],
    description: 'South African Curriculum and Assessment Policy Statement (CAPS) leading to the Matric National Senior Certificate.'
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    curriculumName: 'CBSE / ICSE / NCERT National Curriculum',
    examBoards: ['CBSE', 'CISCE / ICSE', 'State Education Boards', 'JEE / NEET'],
    childLevels: [
      'LKG / Nursery',
      'UKG / Kindergarten',
      'Standard 1 (Class 1)',
      'Standard 2 (Class 2)',
      'Standard 3 (Class 3)',
      'Standard 4 (Class 4)',
      'Standard 5 (Class 5)'
    ],
    highSchoolLevels: [
      'Class 6 (Middle School)',
      'Class 7 (Middle School)',
      'Class 8 (Middle School)',
      'Class 9 (Secondary School)',
      'Class 10 (Secondary School / Board Exams)',
      'Class 11 (Senior Secondary - Science/Commerce/Arts)',
      'Class 12 (Senior Secondary - Board Exams & Entrance Prep)'
    ],
    childTerms: ['Term 1 (April-September)', 'Term 2 (October-March)'],
    highSchoolTerms: ['Term 1 (April-September)', 'Term 2 (October-March / Board Exams)'],
    description: 'Rigorous Indian NCERT framework supporting CBSE and ICSE board exams and competitive engineering/medical prep.'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    dialCode: '+61',
    curriculumName: 'Australian Curriculum (ACARA) & ATAR',
    examBoards: ['NESA (HSC)', 'VCAA (VCE)', 'QCAA (QCE)', 'SACE', 'WACE'],
    childLevels: [
      'Foundation / Prep / Kindergarten',
      'Year 1 (Primary)',
      'Year 2 (Primary)',
      'Year 3 (NAPLAN Year)',
      'Year 4 (Primary)',
      'Year 5 (NAPLAN Year)',
      'Year 6 (Primary Graduation)'
    ],
    highSchoolLevels: [
      'Year 7 (Secondary)',
      'Year 8 (Secondary)',
      'Year 9 (NAPLAN Year)',
      'Year 10 (Senior Secondary Prep)',
      'Year 11 (Preliminary HSC / VCE / SACE)',
      'Year 12 (ATAR Final Exams / Senior Certificate)'
    ],
    childTerms: ['Term 1 (Jan-April)', 'Term 2 (April-July)', 'Term 3 (July-Sept)', 'Term 4 (Oct-Dec)'],
    highSchoolTerms: ['Term 1 (Jan-April)', 'Term 2 (April-July)', 'Term 3 (July-Sept)', 'Term 4 (ATAR Finals)'],
    description: 'Australian Curriculum Assessment and Reporting Authority (ACARA) standards leading to Year 12 ATAR rankings.'
  },
  {
    code: 'INT',
    name: 'International (Global / Cambridge / IB)',
    flag: '🌐',
    dialCode: '+00',
    curriculumName: 'Cambridge International & International Baccalaureate (IB)',
    examBoards: ['Cambridge Assessment International Education (CAIE)', 'International Baccalaureate Organization (IBO)'],
    childLevels: [
      'Early Years / Kindergarten',
      'Cambridge Primary Stage 1 / IB PYP 1',
      'Cambridge Primary Stage 2 / IB PYP 2',
      'Cambridge Primary Stage 3 / IB PYP 3',
      'Cambridge Primary Stage 4 / IB PYP 4',
      'Cambridge Primary Stage 5 / IB PYP 5',
      'Cambridge Primary Stage 6 / IB PYP 6 (Checkpoint)'
    ],
    highSchoolLevels: [
      'Cambridge Lower Secondary Stage 7 / IB MYP 1',
      'Cambridge Lower Secondary Stage 8 / IB MYP 2',
      'Cambridge Lower Secondary Stage 9 / IB MYP 3 (Checkpoint)',
      'Cambridge IGCSE Year 1 (Stage 10) / IB MYP 4',
      'Cambridge IGCSE Year 2 (Stage 11 / O-Level) / IB MYP 5',
      'Cambridge International AS-Level / IB DP Year 1',
      'Cambridge International A-Level / IB DP Year 2 (Diploma)'
    ],
    childTerms: ['Term 1 (Autumn)', 'Term 2 (Spring)', 'Term 3 (Summer)'],
    highSchoolTerms: ['First Semester', 'Second Semester (Cambridge IGCSE / IB DP Exams)'],
    description: 'Globally recognized Cambridge International and IB World School curricula taught in over 160 countries.'
  }
];

const STORAGE_COUNTRY_KEY = 'gods_glory_tutors_selected_country';

/**
 * Get active country selection (persisted locally)
 */
export const getActiveCountryCode = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_COUNTRY_KEY);
    if (saved && COUNTRIES.some(c => c.code === saved)) {
      return saved;
    }
  } catch (e) {
    // ignore
  }
  return 'NG'; // Default to Nigeria
};

export const setActiveCountryCode = (code: string): void => {
  try {
    localStorage.setItem(STORAGE_COUNTRY_KEY, code);
  } catch (e) {
    console.warn("Could not save country to localStorage", e);
  }
};

export const getCountryByCode = (code: string): CountryInfo => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
};

/**
 * Standard real-world curriculum topics mapped by subject and educational tier
 */
export interface RealWorldCurriculum {
  [topic: string]: string[];
}

export const getRealWorldChildTopics = (subject: Subject, levelStr: string): RealWorldCurriculum => {
  const subj = (subject || '').toString().toLowerCase();
  const lvl = (levelStr || '').toLowerCase();

  const isNurseryOrKg = lvl.includes('kindergarten') || lvl.includes('nursery') || lvl.includes('early') || lvl.includes('reception') || lvl.includes('grade r') || lvl.includes('pp');
  const isP1 = lvl.includes('primary 1') || lvl.includes('basic 1') || lvl.includes('1st grade') || lvl.includes('year 1') || lvl.includes('grade 1');
  const isP2 = lvl.includes('primary 2') || lvl.includes('basic 2') || lvl.includes('2nd grade') || lvl.includes('year 2') || lvl.includes('grade 2');
  const isP3 = lvl.includes('primary 3') || lvl.includes('basic 3') || lvl.includes('3rd grade') || lvl.includes('year 3') || lvl.includes('grade 3');
  const isP4 = lvl.includes('primary 4') || lvl.includes('basic 4') || lvl.includes('4th grade') || lvl.includes('year 4') || lvl.includes('grade 4');
  const isP5 = lvl.includes('primary 5') || lvl.includes('basic 5') || lvl.includes('5th grade') || lvl.includes('year 5') || lvl.includes('grade 5');
  const isP6 = lvl.includes('primary 6') || lvl.includes('basic 6') || lvl.includes('6th grade') || lvl.includes('year 6') || lvl.includes('grade 6') || lvl.includes('common entrance') || lvl.includes('checkpoint');

  // =========================================================================
  // 1. MATHEMATICS (NERDC Universal Basic Education Syllabus)
  // =========================================================================
  if (subj.includes('math')) {
    if (isNurseryOrKg) {
      return {
        "Numbers & Counting (1 to 20)": [
          "Counting objects using fingers and toys (1 to 10)",
          "Recognizing and tracing numerals 1 to 10",
          "Matching numbers to sets of fruits and bottle caps",
          "More or Less: Comparing two groups of objects",
          "Counting forward up to 20 with nursery songs"
        ],
        "Shapes and Beautiful Colors": [
          "Identifying Circles, Squares, Triangles and Rectangles",
          "Finding shapes in the classroom (clock, door, window)",
          "Sorting colorful blocks and balls (Red, Blue, Yellow, Green)",
          "Drawing and coloring simple shapes"
        ],
        "Early Comparing & Sizes": [
          "Big vs. Small objects in the home",
          "Tall vs. Short trees and friends",
          "Heavy vs. Light toys and feathers",
          "Daytime sunshine and Nighttime stars"
        ]
      };
    }

    if (isP1) {
      return {
        "Numbers 1 to 100 & Place Value": [
          "Counting forward 1 to 100 and backward from 20 to 1",
          "Place Value: Tens and Units (e.g. 24 = 2 Tens and 4 Units)",
          "Writing numbers in words and figures (1 to 50)",
          "Identifying Odd and Even numbers up to 20",
          "Ordering numbers: What comes before, between, and after"
        ],
        "Simple Addition without Carrying": [
          "Adding numbers up to 10 using objects and pictures",
          "Addition of 2-digit numbers without carrying (e.g. 23 + 12 = 35)",
          "Number bonds up to 10 and 20 (e.g. 6 + 4 = 10)",
          "Fun addition word problems with mangoes, pencils, and sweets"
        ],
        "Simple Subtraction (Taking Away)": [
          "Taking away objects within 10 and 20",
          "Subtraction of 2-digit numbers without borrowing (e.g. 38 - 14 = 24)",
          "Counting backward on a friendly number line",
          "Word stories: 'If you have 8 biscuits and eat 3, how many are left?'"
        ],
        "Nigerian Money Basics": [
          "Identifying Nigerian currency notes: ₦5, ₦10, ₦20, ₦50, ₦100",
          "Buying biscuits and juice in a pretend classroom shop",
          "Adding small amounts of money (e.g. ₦20 + ₦30 = ₦50)",
          "Recognizing Nigerian coins (50k, ₦1, ₦2)"
        ],
        "2D Shapes, Days of the Week & Length": [
          "Properties of 2D shapes: Circles (round), Squares (4 equal sides), Triangles (3 sides)",
          "The 7 Days of the Week in correct order",
          "Measuring length using hand spans, footsteps, and pencils",
          "Comparing objects: Longer vs. Shorter"
        ]
      };
    }

    if (isP2) {
      return {
        "Numbers up to 500 & Counting in Groups": [
          "Counting in 2s, 5s, and 10s up to 100",
          "Place Value: Hundreds, Tens, and Units (e.g. 345 = 3 Hundreds, 4 Tens, 5 Units)",
          "Comparing numbers using Greater Than (>), Less Than (<), and Equal (=)",
          "Writing numbers in words and figures up to 200",
          "Skip counting forward and backward"
        ],
        "Addition with Simple Carrying": [
          "Adding 2-digit numbers with carrying to the Tens column (e.g. 28 + 15 = 43)",
          "Adding three 1-digit numbers (e.g. 4 + 6 + 3 = 13)",
          "Word problems: Total items bought at the market"
        ],
        "Subtraction with Borrowing (Regrouping)": [
          "Subtracting 2-digit numbers with borrowing (e.g. 42 - 17 = 25)",
          "Word problems: Finding the difference between two quantities",
          "Checking subtraction answers using addition (Fact Families)"
        ],
        "Multiplication as Repeated Addition & Times Tables": [
          "Concept of multiplication: 3 × 2 means 2 + 2 + 2 = 6",
          "Mastering 2, 3, 4, 5, and 10 times multiplication tables",
          "Multiplication word problems with groups of oranges and books"
        ],
        "Fractions (Halves & Quarters) and Telling Time": [
          "Sharing into equal parts: Half (1/2) and One-Quarter (1/4)",
          "Telling time on the clock: O'clock and Half-past",
          "The 12 Months of the year and Seasons in Nigeria (Dry and Rainy seasons)",
          "Adding and subtracting Naira and Kobo amounts"
        ]
      };
    }

    if (isP3) {
      return {
        "Numbers up to 1,000 & Roman Numerals": [
          "Place Value: Thousands, Hundreds, Tens, Units (e.g. 1,482)",
          "Roman Numerals from I to XX (1 to 20: I, V, X, XV, XX)",
          "Rounding numbers to the nearest 10 and 100",
          "Expanded form of 3-digit and 4-digit numbers"
        ],
        "Multiplication & Simple Division": [
          "Multiplying 2-digit numbers by 1-digit numbers (e.g. 24 × 3 = 72)",
          "Multiplication tables up to 12",
          "Division as equal sharing without remainder (e.g. 28 ÷ 4 = 7)",
          "Relationship between multiplication and division (Inverse operations)"
        ],
        "Fractions & Introduction to Decimals": [
          "Fractions: Halves, Thirds, Quarters, Fifths (1/2, 1/3, 1/4, 2/4, 3/4)",
          "Adding and subtracting fractions with the same denominator (e.g. 2/5 + 1/5 = 3/5)",
          "Simple Decimals: Tenths (0.1, 0.5, 0.9)",
          "Comparing simple fractions"
        ],
        "Measurement of Length, Weight & Capacity": [
          "Measuring length with a ruler in Centimeters (cm) and Meters (m)",
          "Weight in Grams (g) and Kilograms (kg)",
          "Capacity of liquids in Liters (L) and Milliliters (ml)",
          "Telling time to the nearest 5 minutes (Quarter past, Quarter to)"
        ],
        "Plane Geometry & Money Calculations": [
          "Types of lines: Horizontal, Vertical, Curved, and Parallel lines",
          "Perimeter of simple squares and rectangles",
          "Calculating change in shopping with Nigerian Naira (₦100, ₦200, ₦500)",
          "Simple pictographs and tally charts"
        ]
      };
    }

    if (isP4) {
      return {
        "Numbers up to 100,000, Factors & Multiples": [
          "Place value up to Hundreds of Thousands",
          "Roman Numerals up to C (I to C: L = 50, C = 100)",
          "Prime numbers (2, 3, 5, 7, 11) and Composite numbers",
          "Factors of numbers and Common Factors",
          "Multiples of numbers and LCM (Lowest Common Multiple) basics"
        ],
        "Multiplication & Long Division": [
          "Multiplying 3-digit numbers by 2-digit numbers",
          "Long division with and without remainders",
          "Word problems involving all four operations (+, -, ×, ÷)",
          "Order of operations basics"
        ],
        "Fractions, Decimals & Percentages": [
          "Equivalent fractions and simplifying fractions",
          "Adding and subtracting unlike fractions (e.g. 1/2 + 1/4)",
          "Decimals: Tenths and Hundredths (e.g. 3.45 + 2.18)",
          "Introduction to Percentages: Meaning of 'out of 100'"
        ],
        "Perimeter, Area & Plane Shapes": [
          "Perimeter of rectangles, squares, and triangles",
          "Area of squares and rectangles (Formula: Area = Length × Breadth)",
          "Angles: Right angle (90°), Acute angle (< 90°), Obtuse angle (> 90°)",
          "Symmetry in letters and 2D shapes"
        ],
        "Everyday Business Math & Data": [
          "Cost price, Selling price, and calculating Profit and Loss",
          "Working with Naira and Kobo word problems",
          "Collecting data using tally marks",
          "Drawing and interpreting Bar Charts"
        ]
      };
    }

    if (isP5) {
      return {
        "Large Numbers up to Millions & LCM / HCF": [
          "Place value up to 1,000,000 (Millions)",
          "Roman Numerals up to M (D = 500, M = 1000)",
          "Finding LCM by prime factorization method",
          "Finding HCF (Highest Common Factor) of two or three numbers",
          "BODMAS order of operations with simple brackets"
        ],
        "Fractions, Decimals & Percentages Operations": [
          "Multiplying and dividing fractions (Keep, Change, Flip)",
          "Addition and subtraction of mixed numbers (e.g. 2 1/3 + 1 1/2)",
          "Converting between Fractions, Decimals, and Percentages",
          "Finding a percentage of a quantity (e.g. 15% of ₦2,000)"
        ],
        "Ratio, Proportion & Simple Interest": [
          "Simplifying ratios (e.g. 8 : 12 = 2 : 3)",
          "Sharing an amount or money in a given ratio",
          "Direct proportion word problems (Unitary method)",
          "Simple Interest formula: Interest = (Principal × Rate × Time) ÷ 100"
        ],
        "Area, Volume & Measurement Units": [
          "Area of Triangles: 1/2 × Base × Height",
          "Volume of Cubes and Cuboids: Length × Breadth × Height",
          "Capacity: Converting Liters to Milliliters (1 L = 1000 ml)",
          "24-Hour Clock time and calculating time intervals"
        ],
        "Basic Algebra & Statistics": [
          "Using letters for unknown numbers (e.g. x + 7 = 20, find x)",
          "Calculating Mean (Average), Median, Mode, and Range",
          "Interpreting Pie Charts and simple Line Graphs"
        ]
      };
    }

    // Primary 6 / National Common Entrance Prep
    return {
      "National Common Entrance Arithmetic & BODMAS": [
        "Mastering BODMAS / PEMDAS with brackets and mixed operations",
        "Place value up to Billions, Index notation, and Square roots",
        "HCF and LCM speed techniques for National Common Entrance",
        "Approximations, rounding off, and significant figures"
      ],
      "Fractions, Ratios, Proportions & Percentages": [
        "Multi-step word problems involving fractions and percentages",
        "Percentage Increase and Percentage Decrease",
        "Ratio sharing and Inverse Proportion exam questions",
        "Commercial discounts, Commission, and Value Added Tax (VAT)"
      ],
      "Commercial & Everyday Financial Mathematics": [
        "Cost Price, Selling Price, Profit, Loss, and % Profit formula",
        "Simple Interest: Calculating Principal, Rate, Time, or Total Amount",
        "Currency exchange rates and household electricity/water bills",
        "Hire purchase and installment payments"
      ],
      "Plane and Solid Geometry & Angles": [
        "Angles on a straight line (180°), Angles at a point (360°)",
        "Angles in a Triangle (sum = 180°) and Quadrilaterals (360°)",
        "Circles: Radius, Diameter, Circumference (2πr), and Area (πr²)",
        "Volume and Total Surface Area of Cubes and Rectangular Boxes",
        "Speed, Distance, and Time calculations (Speed = Distance ÷ Time)"
      ],
      "Statistics, Probability & Common Entrance Speed Drills": [
        "Mean (Average), Median, and Mode from frequency tables",
        "Probability of simple events (fair coin, 6-sided die, colored marbles)",
        "Past National Common Entrance Examination (NCEE) questions",
        "Timed exam strategy and accuracy tips for primary pupils"
      ]
    };
  }

  // =========================================================================
  // 2. ENGLISH LANGUAGE & LITERATURE (Child / Primary)
  // =========================================================================
  if (subj.includes('english') || subj.includes('literature')) {
    if (isNurseryOrKg) {
      return {
        "Alphabet Sounds & Phonics (A to Z)": [
          "Letter sounds: a for apple, b for ball, c for cat",
          "Singing cheerful alphabet rhymes and songs",
          "Tracing uppercase (A, B, C) and lowercase (a, b, c) letters",
          "Matching letter sounds to colorful pictures"
        ],
        "Early Words & Polite Speaking": [
          "Two-letter words: am, an, at, in, on, it, is, no, go",
          "Introducing myself: My name, age, and favorite toy",
          "Magic polite words: 'Please', 'Thank you', 'Excuse me', 'I am sorry'"
        ],
        "Story Time & Picture Reading": [
          "Listening to short animal stories and fables",
          "Looking at pictures and telling what is happening",
          "Singing nursery rhymes: 'Baa Baa Black Sheep', 'Twinkle Twinkle Little Star'"
        ]
      };
    }

    if (isP1) {
      return {
        "Phonics & Three-Letter Words (CVC)": [
          "Blending letter sounds: c-a-t = cat, d-o-g = dog, s-u-n = sun",
          "Short and long vowel sounds: a, e, i, o, u",
          "Fun rhyming words: cat/hat/bat, pin/tin/bin, hop/mop/top",
          "Everyday sight words: the, is, a, and, he, she, we, they"
        ],
        "Naming Words (Nouns) & Capital Letters": [
          "What is a Noun? Names of persons, animals, places, and things",
          "Using Capital Letters for names and beginning of sentences",
          "Putting a Full Stop (.) at the end of every sentence",
          "Singular and Plural: Adding '-s' (one boy -> two boys, one cup -> two cups)"
        ],
        "Reading Comprehension & Simple Sentences": [
          "Reading short 3-sentence stories with colorful pictures",
          "Answering simple questions: Who? What? Where?",
          "Building simple sentences: 'I love my school', 'The dog is brown'"
        ]
      };
    }

    if (isP2) {
      return {
        "Action Words (Verbs) & Pronouns": [
          "What is a Verb? Action words: jump, run, eat, sleep, read, sing",
          "Pronouns: Using He, She, It, We, They instead of repeating names",
          "Plural of nouns ending in -ch, -sh, -s, -x: Adding '-es' (box -> boxes, bus -> buses)",
          "Describing words (Adjectives: big, small, red, sweet, happy)"
        ],
        "Punctuation Marks & Sentence Types": [
          "Using Question Marks (?) when asking questions",
          "Using Exclamation Marks (!) for excitement, surprise, and joy",
          "Articles: When to use 'a' and 'an' (a book, an orange, an umbrella)",
          "Building 5-word complete sentences"
        ],
        "Reading Moral Stories & Paragraph Writing": [
          "Reading short moral stories (Tortoise and the Hare)",
          "Identifying the main character and lessons from a story",
          "Spelling common everyday words correctly",
          "Writing 3-4 simple sentences about 'My Family' or 'My Best Friend'"
        ]
      };
    }

    if (isP3) {
      return {
        "Tenses (Present, Past, and Continuous)": [
          "Simple Present Tense: Everyday habits (e.g. 'I walk to school')",
          "Simple Past Tense: Regular verbs with '-ed' (walk -> walked, play -> played)",
          "Irregular Past Tense verbs: go -> went, eat -> ate, see -> saw, buy -> bought",
          "Present Continuous Tense: '-ing' actions happening right now (He is writing)"
        ],
        "Adverbs, Prepositions & Conjunctions": [
          "Adverbs of manner: How actions happen (slowly, quickly, quietly)",
          "Prepositions of position: in, on, under, behind, near, between",
          "Joining words (Conjunctions): and, but, because, so",
          "Opposites (Antonyms) and Words with similar meaning (Synonyms)"
        ],
        "Comprehension Passages & Letter Writing": [
          "Reading comprehension passages and finding vocabulary meanings",
          "Writing a descriptive paragraph: 'My School Compound'",
          "Informal notes: Writing a birthday invitation to a friend",
          "Homophones: Words that sound alike (sea/see, son/sun, right/write)"
        ]
      };
    }

    if (isP4) {
      return {
        "Parts of Speech Mastery": [
          "Types of Nouns: Common, Proper, and Collective Nouns (a herd of cattle, a flock of birds)",
          "Degrees of Comparison of Adjectives: tall, taller, tallest; beautiful, more beautiful, most beautiful",
          "Subject and Predicate in a sentence",
          "Possessive Nouns using Apostrophe ('s: the boy's book, the pupils' bags)"
        ],
        "Sentence Structures & Direct Speech": [
          "Four sentence types: Declarative (statement), Interrogative (question), Imperative (command), Exclamatory (feeling)",
          "Using Commas in lists and Quotation Marks for direct speech",
          "Prefixes and Suffixes: un- (unhappy), re- (rewrite), -ful (helpful), -less (careless)",
          "Compound words: classroom, sunflower, toothbrush, rainfall"
        ],
        "Composition & Friendly Letter Formats": [
          "Narrative Composition: 'An Exciting Day at the Village / Market'",
          "Descriptive Composition: 'My Favorite Teacher'",
          "Informal Letter format: Address, date, friendly greeting, body, and sign-off",
          "Summary writing: Writing the main idea of a passage in one clear sentence"
        ]
      };
    }

    if (isP5) {
      return {
        "Advanced Grammar & Voice": [
          "Active Voice vs. Passive Voice (e.g. 'Chidi scored the goal' vs. 'The goal was scored by Chidi')",
          "Direct and Indirect (Reported) Speech basics",
          "Relative Pronouns: who, whom, which, that, whose",
          "Transitive and Intransitive verbs",
          "Idiomatic expressions and Nigerian proverb meanings"
        ],
        "Figures of Speech & Vocabulary": [
          "Similes: Comparing with 'as' or 'like' (as brave as a lion, like shining gold)",
          "Metaphors: Direct comparisons (He is a pillar of strength)",
          "Personification: Giving human qualities to objects (The wind whispered)",
          "Words often confused: there / their / they're; its / it's; to / too / two"
        ],
        "Formal Letter Writing & Debates": [
          "Formal Letter layout: Two addresses, date, salutation, title, body, 'Yours faithfully'",
          "Writing an official letter to the Head Teacher requesting leave",
          "Debate points: 'Day School is Better than Boarding School'",
          "Reading comprehension inference and deduction questions"
        ]
      };
    }

    // Primary 6 / National Common Entrance Prep
    return {
      "National Common Entrance Lexis & Structure": [
        "Question Tags and short responses ('She is in Primary 6, isn't she?')",
        "Subject-Verb Agreement (Concord rules: Singular subject takes singular verb)",
        "Prepositions, Phrasal verbs, and Connectors speed practice",
        "Synonyms and Antonyms Common Entrance drills",
        "Spelling rules, double consonants, and silent letters (doubt, island, knight)"
      ],
      "Comprehension Passages & Summary Skills": [
        "Tackling fast Common Entrance comprehension passages",
        "Distinguishing between Facts and Opinions",
        "Context-based vocabulary and phrase meanings",
        "Sentence completion and cloze passage techniques"
      ],
      "Composition & Argumentative Writing": [
        "Argumentative Essay: 'Living in the City is Better than Living in the Village'",
        "Expository Composition: 'How to Prevent Malaria in Our Community'",
        "Formal Application Letter for Secondary School Admission",
        "Speed and accuracy test for Common Entrance English papers"
      ]
    };
  }

  // =========================================================================
  // 3. BASIC SCIENCE & TECHNOLOGY (and Biology, Chemistry, Physics)
  // =========================================================================
  if (subj.includes('science') || subj.includes('biology') || subj.includes('physics') || subj.includes('chemistry') || subj.includes('zoology')) {
    if (isNurseryOrKg) {
      return {
        "My Wonderful Body": [
          "Pointing to my Eyes, Ears, Nose, Mouth, Hands, Legs",
          "What my eyes do (seeing) and what my ears do (hearing music)",
          "Singing 'Head, Shoulders, Knees and Toes'",
          "My clean hands and clean fingernails"
        ],
        "Clean Habits & Healthy Living": [
          "Washing hands with soap and water before eating",
          "Brushing teeth morning and night",
          "Drinking clean water and eating sweet oranges and bananas",
          "Getting good sleep at night"
        ],
        "Animals and Plants Around Us": [
          "Friendly animals: Dog, Cat, Goat, Bird, Fish",
          "Green trees and colorful flowers in the school compound",
          "Warm sunshine during the day and the shining moon at night"
        ]
      };
    }

    if (isP1) {
      return {
        "Living and Non-Living Things": [
          "What makes something alive? (Living things breathe, eat, grow, and move)",
          "Living things: Plants and Animals around our home and school",
          "Non-living things: Stones, Tables, Chairs, Pencils, Water",
          "Differences between a live goat and a wooden toy goat"
        ],
        "Our Five Sense Organs": [
          "The Eye: For seeing colors, shapes, and sizes",
          "The Ear: For hearing sounds, music, and voices",
          "The Nose: For smelling sweet flowers and food",
          "The Tongue: For tasting sweet, salty, and sour foods",
          "The Skin: For feeling hot, cold, soft, and rough surfaces",
          "Caring for our sense organs"
        ],
        "Things in Our Environment & Safety": [
          "Colors in nature: Red flowers, Green leaves, Blue sky, Yellow sun",
          "Clean classroom and clean school compound",
          "Safety at home: Staying away from open fire, hot pots, and sharp knives",
          "Road safety: Walking on the pedestrian path and holding an adult's hand"
        ]
      };
    }

    if (isP2) {
      return {
        "Plants and Animals in Our World": [
          "Parts of a plant: Roots, Stem, Green Leaves, Flowers",
          "How plants give us food: Yam, Cassava, Maize, Mango, Vegetables",
          "Animals that walk, animals that fly in the sky, animals that swim in water",
          "Caring for domestic pets and farm animals"
        ],
        "Water, Air and Weather Around Us": [
          "Sources of water: Rain water, Well, Borehole, Tap, Stream",
          "Uses of water: Drinking, Cooking, Bathing, Washing clothes",
          "Clean drinking water vs. Dirty water (Why we boil or filter water)",
          "Air: Feeling the wind blow; Moving air flies kites and dries clothes",
          "Types of weather: Sunny day, Rainy day, Windy day, Cloudy day"
        ],
        "Energy, Light and Simple Tools": [
          "Sources of Light: The Sun, Torchlight, Candles, Electric bulbs",
          "How shadows are formed when light is blocked by an object",
          "Simple tools in the home: Spoon, Scissors, Broom, Cup, Ruler",
          "Safe handling of tools and keeping them in the right place"
        ]
      };
    }

    if (isP3) {
      return {
        "Changes in Things & States of Matter": [
          "Three states of matter: Solids (ice, book), Liquids (water, oil), Gases (air, steam)",
          "Temporary changes: Ice melting into water, water freezing into ice",
          "Permanent changes: Burning paper into ash, cooking raw yam",
          "Dissolving in water: Sugar and salt dissolve, sand does not dissolve"
        ],
        "Soil and Rocks in Our Environment": [
          "Types of soil: Sandy soil, Clayey soil, Loamy soil",
          "Which soil is best for planting crops? (Loamy soil rich in humus)",
          "Water-holding capacity of different soils",
          "Uses of rocks and stones in building houses and tarring roads"
        ],
        "Measurement, Moving Things & First Aid": [
          "Measuring length with a ruler (cm) and measuring volume with a cup",
          "Forces: Pushing and Pulling things to make them move",
          "Friction: Why smooth floors are slippery and rough shoe soles give grip",
          "First Aid: What is a First Aid box? Treating minor cuts and bee stings"
        ]
      };
    }

    if (isP4) {
      return {
        "The Human Digestive System & Teeth": [
          "Four types of human teeth: Incisors (cutting), Canines (tearing), Premolars & Molars (grinding)",
          "Proper tooth brushing and preventing cavities and tooth decay",
          "The Digestive System: Mouth, Food pipe (Gullet), Stomach, Small and Large Intestines",
          "Journey of food: Digestion, absorption of nutrients, and waste removal"
        ],
        "Water Cycle & Environmental Quality": [
          "The Water Cycle: Evaporation, Condensation into clouds, Rain precipitation",
          "Purifying water: Boiling, Filtration, and adding water purifier (Alum/Chlorine)",
          "Proper waste disposal: Using covered bins vs. throwing trash into gutters",
          "Recycling plastic bottles, cans, and paper"
        ],
        "Energy, Forces and Electricity": [
          "Forms of Energy: Heat, Light, Sound, Chemical, and Electrical energy",
          "Heat transfer: Conduction, Convection, and Radiation basics",
          "Simple electric circuits: Battery (cell), connecting wire, switch, and bulb",
          "Conductors of electricity (copper, iron) vs Insulators (plastic, rubber, dry wood)",
          "Magnets: North pole, South pole, Magnetic attraction and repulsion"
        ]
      };
    }

    if (isP5) {
      return {
        "The Human Respiratory & Circulatory Systems": [
          "The Respiratory System: Nose, Windpipe (Trachea), Lungs",
          "Breathing in clean Oxygen and breathing out Carbon Dioxide",
          "The Heart and Blood Circulation: Heart pumps blood through blood vessels",
          "Taking pulse rate before and after exercising",
          "Dangers of inhaling dusty air, vehicle smoke, and cigarette smoke"
        ],
        "Ecology, Habitats & Food Chains": [
          "What is a habitat? Terrestrial (land), Aquatic (water), and Arboreal (trees)",
          "Producers: Green plants make food using sunlight (Photosynthesis)",
          "Consumers: Herbivores (cow), Carnivores (lion), Omnivores (man)",
          "Simple Food Chains: Grass -> Grasshopper -> Lizard -> Hawk",
          "Environmental pollution: Causes and solutions for clean air and rivers"
        ],
        "Rocks, Minerals & Energy Conversion": [
          "Types of rocks: Igneous, Sedimentary, Metamorphic rocks",
          "Minerals found in Nigeria: Coal in Enugu, Limestone in Ogun, Crude oil in Niger Delta",
          "Energy transformation: Solar energy to electricity, Electrical energy to heat (pressing iron)",
          "Simple machines: Levers (seesaw, scissors), Pulleys (flagpole), Inclined planes (ramp)"
        ]
      };
    }

    // Primary 6 / Common Entrance Basic Science Prep
    return {
      "The Human Skeletal & Nervous System": [
        "The Human Skeleton: Skull, Backbone (Spine), Rib cage, Limb bones",
        "Functions of bones: Body support, movement, and protecting delicate organs",
        "Joints: Ball-and-socket joint (shoulder), Hinge joint (elbow and knee)",
        "The Nervous System basics: Brain, Spinal cord, and Nerves",
        "Sense organs in full detail: Structure and function of the Eye and Ear"
      ],
      "The Solar System, Earth & Space": [
        "The Solar System: The Sun and 8 Planets (Mercury to Neptune)",
        "Rotation of the Earth on its axis causes Day and Night (24 hours)",
        "Revolution of the Earth around the Sun causes Seasons (365¼ days)",
        "Moon phases: New Moon, Crescent Moon, Half Moon, Full Moon",
        "Gravity: Why dropped objects fall down to the ground"
      ],
      "Mechanics, Sound & Light Science": [
        "Mechanical advantage of simple machines: 1st, 2nd, and 3rd class levers",
        "Pulleys, Wheel and Axle, Screws, and Gears",
        "Sound energy: Vibrations produce sound, Echoes, Pitch and Loudness",
        "Light: Reflection (mirrors), Refraction (bending of light), Rainbow colors (ROYGBIV)",
        "National Common Entrance Science exam questions and mock drills"
      ]
    };
  }

  // =========================================================================
  // 4. SOCIAL STUDIES & CIVIC EDUCATION (Child / Primary)
  // =========================================================================
  if (subj.includes('social') || subj.includes('civic') || subj.includes('pol') || subj.includes('gov') || subj.includes('peace') || subj.includes('demograph')) {
    if (isNurseryOrKg || isP1) {
      return {
        "The Family and Loving Home": [
          "Nuclear Family: Father, Mother, Brother, Sister, Baby",
          "Extended Family: Grandparents, Uncles, Aunts, and Cousins",
          "Roles of Father and Mother in caring for the home",
          "Roles of children: Helping with simple chores, packing toys, doing schoolwork"
        ],
        "Greetings & Respect in Nigeria": [
          "Greeting in the morning: 'Good morning Mommy and Daddy!'",
          "How boys and girls greet politely in Nigeria (Kneeling, Prostrating, Shaking hands)",
          "Respecting teachers, elders, and schoolmates",
          "Traditional clothes in Nigeria (Agbada, Babanriga, Wrapper, Blouse)"
        ],
        "Rules & Safety at Home and School": [
          "Classroom rules: Raising our hand before speaking, listening quietly",
          "Never talking to or accepting sweets from strangers",
          "Traffic lights: Red means Stop, Yellow means Get Ready, Green means Go"
        ]
      };
    }

    if (isP2 || isP3) {
      return {
        "The Community & Traditional Leaders": [
          "What is a community? People living and working happily together",
          "Traditional rulers in Nigeria: Oba, Emir, Obi, King, Village Head",
          "Religious leaders: Pastors, Imams, and Priests",
          "Qualities of a good leader: Honest, Caring, Fair, and Hardworking"
        ],
        "National Symbols of Nigeria": [
          "The Nigerian Flag: Green, White, Green (Green for Agriculture, White for Peace)",
          "The National Anthem and National Pledge: Memorizing and respecting them",
          "The Coat of Arms: Black shield, White horses, Eagle, Rivers Niger & Benue",
          "The Nigerian Currency: The Naira (₦) and Kobo (k)"
        ],
        "Civic Rights, Health & Road Safety": [
          "Rights of a child: Right to Education, Health, Food, and Protection",
          "Pedestrian Zebra Crossing: Why vehicles stop for pupils to cross",
          "FRSC (Federal Road Safety Corps): How road marshals protect citizens",
          "Drug safety: Only taking medicine given by parents or doctor"
        ]
      };
    }

    if (isP4 || isP5) {
      return {
        "Government and Democracy in Nigeria": [
          "What is Government? How government maintains law, order, and development",
          "Three tiers of government: Federal, State, and Local Government",
          "Three arms of government: Executive (President/Governor), Legislature, Judiciary",
          "The 36 States of Nigeria and the Federal Capital Territory (Abuja)"
        ],
        "Citizenship & National Unity": [
          "Duties of a good citizen: Obeying laws, paying taxes, voting, respecting symbols",
          "Living peacefully together across different ethnic groups and religions",
          "Consumer protection: Checking NAFDAC numbers and expiry dates",
          "Dangers of drug abuse and negative peer pressure"
        ],
        "Transportation & Communication Systems": [
          "Modes of transport: Road, Rail, Water, Air, and Pipeline",
          "Modern communication: Mobile phones, Internet, Television, Radio",
          "Internet safety for pupils: Protecting passwords and private info"
        ]
      };
    }

    // Primary 6 / Common Entrance Prep
    return {
      "Nigerian History: Pre-Colonial to Independence": [
        "Historical kingdoms: Benin Kingdom, Oyo Empire, Kanem-Borno, Sokoto Caliphate",
        "Amalgamation of Northern and Southern Protectorates in 1914 by Lord Lugard",
        "Nigeria's Independence: October 1st, 1960",
        "National Heroes & Heroines: Herbert Macaulay, Nnamdi Azikiwe, Ahmadu Bello, Tafawa Balewa, Obafemi Awolowo, Queen Amina, Moremi",
        "Nigeria becomes a Federal Republic in 1963"
      ],
      "International Organizations & Agencies": [
        "ECOWAS (Economic Community of West African States): Headquarters in Abuja",
        "African Union (AU) and United Nations (UN, UNICEF, WHO, UNESCO)",
        "Agencies fighting corruption and fake drugs: EFCC, ICPC, NAFDAC",
        "Child Rights Act: Banning child labor and protecting every child"
      ],
      "Common Entrance Social Studies Speed Drills": [
        "Reviewing key Nigerian government and constitution questions",
        "Civic duties, geography, and historical dates practice",
        "Multiple-choice speed strategies for National Common Entrance"
      ]
    };
  }

  // =========================================================================
  // 5. AGRICULTURAL SCIENCE (Child / Primary)
  // =========================================================================
  if (subj.includes('agric')) {
    if (isNurseryOrKg || isP1) {
      return {
        "What is Farming?": [
          "Meaning of farming: Growing crops and rearing animals for food",
          "Why we eat food: Gives us energy to learn, run, and grow strong",
          "Hardworking farmers who grow food for Nigeria"
        ],
        "Simple Farm Tools": [
          "The Cutlass (Machete): Used for clearing bushes and cutting grass",
          "The Hoe: Used for tilling soil and making planting heaps",
          "The Basket and Wheelbarrow: Used for carrying harvested crops",
          "The Watering Can: Used for watering young garden plants"
        ],
        "Crops We Eat Every Day": [
          "Delicious staple crops: Yam, Cassava (Garri), Maize, Rice, Beans",
          "Sweet fruits: Mango, Orange, Banana, Pawpaw, Watermelon"
        ]
      };
    }

    if (isP2 || isP3) {
      return {
        "Classification of Crops": [
          "Food crops (crops grown to eat: Rice, Yam, Vegetables)",
          "Cash crops (crops grown to sell for money: Cocoa, Palm oil, Rubber, Cotton)",
          "Cereals (grains: Maize, Rice, Millet) and Legumes (Beans, Groundnut)",
          "Tubers (Yam, Cassava, Sweet potato, Cocoyam)"
        ],
        "Farm Animals Around Us": [
          "Domestic animals: Goats, Sheep, Cattle (Cows), Chickens, Ducks, Rabbits",
          "Uses of animals: Meat (Beef, Chicken), Milk, Eggs, Feathers, Leather",
          "Shelters: Pen for goats, Coop for chickens, Kraal/Barn for cattle",
          "Feeding farm animals with green grass, grains, and clean water"
        ],
        "Soil and Gardening": [
          "Sandy soil, Clayey soil, and fertile Loamy soil",
          "Care of growing crops: Watering, Weeding, and adding compost manure",
          "Common enemies of crops: Caterpillars, Grasshoppers, and Weeds"
        ]
      };
    }

    if (isP4 || isP5) {
      return {
        "Classification of Farm Animals (Ruminants & Non-Ruminants)": [
          "Ruminants: Animals with 4 stomach chambers that chew the cud (Cattle, Sheep, Goats)",
          "Non-ruminants: Animals with single simple stomachs (Pigs, Rabbits, Poultry)",
          "Animal feeds: Roughages (grass, hay) vs. Concentrates (maize bran, fish meal)",
          "Care and disease prevention in livestock"
        ],
        "Weed Control & Farm Tool Maintenance": [
          "Harmful effects of weeds: Stealing plant food and water",
          "Weed control methods: Hand pulling, hoeing, slashing with cutlass",
          "Maintenance of farm tools: Washing, drying, sharpening, greasing blades"
        ],
        "Crop Propagation & Food Preservation": [
          "Propagation by seeds (Maize, Beans) vs. Vegetative parts (Cassava stem, Yam setts)",
          "Preparing a nursery bed and transplanting seedlings",
          "Traditional preservation: Sun drying, smoking fish, storing in yam barns and silos",
          "Poultry and Fish farming basics (Broilers, Layers, Catfish ponds)"
        ]
      };
    }

    // Primary 6 / Common Entrance Agric Prep
    return {
      "Agriculture in Nigeria's Economy": [
        "Contribution of agriculture to food security and employment in Nigeria",
        "Historical exports: Groundnut pyramids in Kano, Cocoa in the West, Palm oil in the East",
        "Providing raw materials for industries (Cotton for textiles, Rubber for tires)",
        "Mechanized farming: Tractors, Bulldozers, Combine Harvesters, Irrigation"
      ],
      "Problems and Modern Solutions in Farming": [
        "Challenges: Lack of farm loans, bad rural roads, storage loss, pest attacks",
        "Solutions: Government agricultural credit, storage silos, research institutes (IITA)",
        "Modern organic farming and export-quality agricultural produce"
      ],
      "Common Entrance Agricultural Science Revision": [
        "Past exam drills on soil fertility, livestock, crops, and tools",
        "Quick recognition of farm equipment and agronomy terms",
        "NCEE multiple-choice practice tests"
      ]
    };
  }

  // =========================================================================
  // 6. COMPUTER STUDIES / ICT / CODING (Child / Primary)
  // =========================================================================
  if (subj.includes('computer') || subj.includes('code') || subj.includes('software') || subj.includes('database')) {
    if (isNurseryOrKg || isP1) {
      return {
        "What is a Computer?": [
          "A computer is a smart electronic machine that helps us learn and play",
          "Computers work very fast and make no mistakes",
          "Where computers are used: Schools, Banks, Hospitals, Supermarkets"
        ],
        "Main Parts of a Desktop Computer": [
          "The Monitor (Screen): Looks like a TV and shows words, pictures, and cartoons",
          "The System Unit (CPU box): The thinking brain of the computer",
          "The Keyboard: Has buttons (keys) for typing letters, numbers, and words",
          "The Mouse: Pointing device with two buttons that moves the arrow",
          "The Speakers: Plays music, voice lessons, and sounds"
        ],
        "Safe Computer Rules": [
          "Sitting with a straight back on our chair",
          "Keeping food, drinks, and water far away from the computer",
          "Pressing keyboard keys gently without banging them",
          "Covering the computer with a dust cover after use"
        ]
      };
    }

    if (isP2 || isP3) {
      return {
        "Using the Computer Mouse & Painting": [
          "Holding the mouse comfortably with the right hand",
          "Left Click: Selecting icons; Double Click: Opening games and programs",
          "Right Click: Showing options; Click and Drag: Moving items on screen",
          "Drawing and coloring shapes using MS Paint (Pencil, Brush, Fill tool)"
        ],
        "Input and Output Devices": [
          "Input Devices (sending data in): Keyboard, Mouse, Microphone, Scanner",
          "Output Devices (showing results): Monitor, Printer, Speakers",
          "Storage Devices: USB Flash Drive and Hard Disk",
          "Proper booting (turning on) and safe Shut Down steps"
        ],
        "The Keyboard in Detail & Typing": [
          "Alphabet Keys (A to Z) and Number Keys (0 to 9)",
          "Special Keys: Spacebar (largest key), Enter key, Backspace, Caps Lock",
          "Home Row typing keys (ASDF and JKL;)"
        ]
      };
    }

    if (isP4 || isP5) {
      return {
        "Computer Software & Storage Media": [
          "System Software: Operating Systems (Windows, macOS, Android)",
          "Application Software: Programs for work and fun (MS Word, Paint, Chrome)",
          "Storage units: Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB)",
          "Windows Desktop: Icons, Taskbar, Start Menu, Recycle Bin"
        ],
        "Word Processing (MS Word) Basics": [
          "Creating and opening a new document in MS Word",
          "Typing a paragraph about 'My Best Friend'",
          "Formatting text: Font Style, Font Size, Bold, Italic, Underline, Font Color",
          "Saving work safely on the computer"
        ],
        "The Internet & Cyber Safety": [
          "What is the Internet? Connecting computers worldwide",
          "Web Browsers (Google Chrome, Edge) and Search Engines (Google)",
          "Cyber Safety: Never sharing passwords, home address, or phone number",
          "Computer Viruses and Antivirus protection"
        ]
      };
    }

    // Primary 6 / Common Entrance ICT Prep
    return {
      "Presentation Software (MS PowerPoint)": [
        "What is PowerPoint? Creating slide shows for school projects",
        "Adding new slides, headings, bullet points, and pictures",
        "Slide transitions and animations",
        "Presenting slides in full-screen Slide Show mode"
      ],
      "Introduction to Computer Logic & Scratch Coding": [
        "What is an Algorithm? Step-by-step instructions to solve a task",
        "What is a Program? Writing instructions that computers follow",
        "Block Coding in Scratch: Sprites, Stage, Motion blocks, Sound blocks",
        "Creating simple interactive animations and math quizzes"
      ],
      "Common Entrance ICT Drills & Principles": [
        "Data vs. Information: The Input-Process-Output-Storage (IPOS) cycle",
        "Computer generations: From vacuum tubes to modern microchips",
        "Common Entrance ICT multiple-choice speed drills"
      ]
    };
  }

  // =========================================================================
  // 7. CHRISTIAN RELIGIOUS STUDIES (CRS) & THEOLOGY (Child / Primary)
  // =========================================================================
  if (subj.includes('christian') || subj.includes('theology')) {
    if (isNurseryOrKg || isP1) {
      return {
        "God the Loving Creator": [
          "God created the beautiful world: Sun, Moon, Stars, Trees, and Animals",
          "God created human beings (Adam and Eve) in His own image",
          "God loves all little children"
        ],
        "Baby Jesus and Christmas": [
          "The Angel Gabriel visits Mary in Nazareth",
          "Baby Jesus born in a manger in Bethlehem",
          "Shepherds and Wise Men bringing gifts of gold, frankincense, and myrrh"
        ],
        "Obedience and Love": [
          "Obeying our parents and teachers as God commands",
          "Showing love, kindness, and sharing our toys with friends",
          "Saying simple daily prayers: Morning prayer and mealtime grace"
        ]
      };
    }

    if (isP2 || isP3) {
      return {
        "Faith and Courage in the Bible": [
          "God calls young Samuel in the temple ('Speak Lord, your servant hears')",
          "David and Goliath: Having faith in God overcomes giant troubles",
          "Noah and the Ark: God preserves those who obey Him",
          "The Ten Commandments given to Moses at Mount Sinai"
        ],
        "Jesus the Friend of Children & Healer": [
          "Jesus blesses little children ('Let the children come to me')",
          "Miracles of Jesus: Calming the stormy sea with 'Peace, be still!'",
          "Jesus heals the blind man and makes the lame walk",
          "The Good Samaritan: Helping anyone in need regardless of tribe"
        ],
        "Living as Children of God": [
          "The Lord's Prayer ('Our Father who art in heaven...')",
          "Praying for our country Nigeria, our family, and our school",
          "Telling the truth at all times"
        ]
      };
    }

    // Primary 4 to 6 / Common Entrance CRS
    return {
      "The Wisdom of God & Parables of Jesus": [
        "The wisdom of King Solomon in judging disputes fairly",
        "Parables of Jesus: The Prodigal Son (Forgiveness and reconciliation)",
        "The Parable of the Sower and The Good Shepherd",
        "Jesus feeds the 5,000 with 5 loaves and 2 fishes"
      ],
      "The Early Church & Apostles": [
        "The Holy Spirit comes upon the disciples on Pentecost Day",
        "Peter heals the lame man at the Beautiful Gate of the Temple",
        "Paul's missionary journeys and spreading the Gospel",
        "Fruit of the Holy Spirit: Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, Self-control"
      ],
      "Common Entrance CRS Drills & Christian Living": [
        "Selected Old and New Testament Common Entrance exam questions",
        "Moral values: Integrity, Forgiveness, Humility, and Service to nation",
        "Practicing past NCEE Christian Religious Studies papers"
      ]
    };
  }

  // =========================================================================
  // 8. HEALTH EDUCATION, PHE, MEDICINE, NURSING (Child / Primary)
  // =========================================================================
  if (subj.includes('health') || subj.includes('medicine') || subj.includes('nurs') || subj.includes('physio')) {
    return {
      "Personal Hygiene & Clean Living": [
        "Proper hand washing technique with clean running water and soap",
        "Bathing daily, brushing teeth twice a day, and trimming clean nails",
        "Washing school uniforms, handkerchiefs, and socks regularly",
        "Good toilet hygiene and washing hands after using the restroom"
      ],
      "Food Nutrients & Balanced Diet": [
        "Energy-giving foods (Carbohydrates: Yam, Rice, Cassava)",
        "Body-building foods (Proteins: Beans, Fish, Eggs, Meat, Milk)",
        "Body-protecting foods (Vitamins & Minerals: Oranges, Carrots, Vegetables)",
        "Nutritional deficiency diseases (Kwashiorkor, Scurvy, Rickets) and prevention"
      ],
      "Preventing Common Sicknesses & First Aid": [
        "Malaria prevention: Sleeping under treated mosquito nets and clearing bushes",
        "Clean drinking water to prevent cholera and typhoid fever",
        "What doctors and nurses do in clinics and hospitals",
        "First Aid: Simple care for minor cuts, bleeding, burns, and insect stings",
        "Immunization: Why vaccines protect children from measles and polio"
      ]
    };
  }

  // =========================================================================
  // 9. HOME ECONOMICS & FOOD/NUTRITION (Child / Primary)
  // =========================================================================
  if (subj.includes('home') || subj.includes('nutrition')) {
    if (isNurseryOrKg) {
      return {
        "Personal Cleanliness & Healthy Habits (Nursery / KG)": [
          "Washing hands with soap and running water before eating and after play",
          "Brushing teeth in the morning and before bed",
          "Putting on clean, dry clothes and shoes",
          "Saying 'Please' and 'Thank you' at mealtime"
        ],
        "Tidying Up Our Toys and Play Area": [
          "Putting toys back in their baskets after playing",
          "Keeping books and pencils tidy on the study table",
          "Staying away from hot cooking pots, electrical sockets, and matchboxes"
        ]
      };
    }

    if (isP1 || isP2 || isP3) {
      return {
        "Personal Grooming & Care of the Body (Primary 1-3)": [
          "Caring for hair, teeth, skin, ears, and fingernails",
          "Choosing clean, neat, and ironed school uniform and underwear",
          "Polite table manners: Chewing with mouth closed, using spoon and cup politely"
        ],
        "Care of the Home & Cleaning Tools (Primary 1-3)": [
          "Sweeping the floor with a local broom and mopping with clean water",
          "Dusting tables, chairs, and windowsills",
          "Disposing kitchen garbage in covered dustbins to keep flies away",
          "Care of simple home cleaning tools: Brooms, dusters, dustpans, and mops"
        ],
        "Kitchen Safety & Needlework Basics (Primary 1-3)": [
          "Kitchen safety: Staying away from gas cookers, kerosene stoves, and sharp knives",
          "Simple stitches: Threading a needle and making running stitches on handkerchiefs",
          "Preparing simple healthy snacks: Sliced fresh fruits and boiled eggs"
        ]
      };
    }

    // Primary 4, 5, 6
    return {
      "Food Nutrients & Balanced Diet (Primary 4-6)": [
        "The six classes of food: Carbohydrates, proteins, fats, vitamins, minerals, water",
        "Healthy Nigerian food combinations: Beans and plantain, yam and vegetable stew, fish and rice",
        "Simple cooking methods: Boiling, frying, steaming, and baking",
        "Food hygiene: Washing fruits and vegetables, covering food from flies and dust"
      ],
      "Care of Clothes & Sewing Craft (Primary 4-6)": [
        "Sewing tools: Needles, thread, scissors, thimble, tailor's chalk, and tape measure",
        "Permanent stitches: Running stitch, backstitch, and hemming stitch",
        "Mending torn clothes, replacing buttons, and sewing an apron or pillowcase",
        "Washing, starching, ironing, and proper wardrobe storage"
      ],
      "Home Management & Family Resource Care (Primary 4-6)": [
        "Daily, weekly, and special cleaning of living rooms, bedrooms, and kitchen",
        "Natural cleaning agents: Wood ash, pawpaw leaves, sand, lime, and water",
        "Kitchen safety rules, preventing domestic accidents, and simple First Aid",
        "Disposal of refuse and keeping gutters clean to prevent malaria mosquitoes"
      ]
    };
  }

  // =========================================================================
  // 10. HISTORY (Child / Primary)
  // =========================================================================
  if (subj.includes('history')) {
    return {
      "Heroes and Heroines of Nigeria": [
        "Queen Amina of Zaria: The brave warrior queen of Northern Nigeria",
        "King Jaja of Opobo: Defender of trade and independence in the Niger Delta",
        "Moremi of Ile-Ife: The brave heroine who saved her people",
        "Herbert Macaulay: Father of Nigerian nationalism",
        "Dr. Nnamdi Azikiwe, Sir Ahmadu Bello, and Chief Obafemi Awolowo"
      ],
      "Ancient Nigerian Kingdoms & Art": [
        "Benin Kingdom and the famous Benin Bronze castings",
        "Nok culture terracotta heads and ancient iron smelting",
        "Igbo-Ukwu ancient bronze artworks and pottery",
        "Traditional rulers and palace customs"
      ],
      "Nigeria's Journey to Nationhood": [
        "Amalgamation of Northern and Southern Nigeria in 1914",
        "Nigeria's Independence Day: October 1st, 1960",
        "Past leaders and presidents who served our nation",
        "Promoting national unity and pride in our heritage"
      ]
    };
  }

  // =========================================================================
  // 11. NIGERIAN LANGUAGES (Hausa, Igbo, Yoruba, Edo)
  // =========================================================================
  if (subj.includes('hausa')) {
    return {
      "Haruffa da Furuci (Hausa Alphabets & Sounds)": [
        "Bakar magana (Haruffan Hausa A zuwa Z)",
        "Kidayar lambobi (Lissafi 1 zuwa 20: Daya, Biyu, Uku, Hudu...)",
        "Gaisuwa ta Hausa: Ina kwana, Ina wuni, Sannu da aiki"
      ],
      "Iyali da Muhalli (Family & Environment)": [
        "Sunayen 'yan uwa: Uba (Father), Uwa (Mother), Da (Son), 'Ya (Daughter)",
        "Sunayen abinci: Tuwo, Shinkafa, Wake, Nono, Kosai",
        "Sunayen dabbobi: Kare (Dog), Mage (Cat), Akuya (Goat), Doki (Horse)"
      ]
    };
  }

  if (subj.includes('igbo')) {
    return {
      "Mkpụrụ Edemede na Ịgụ Ọnụọgụgụ (Igbo Alphabets & Counting)": [
        "Mkpụrụ edemede Igbo (A, B, CH, D, E, F, G, GB, GH...)",
        "Ịgụ ọnụọgụgụ (1 ruo 20: Otu, Abụọ, Atọ, Anọ, Ise, Isii...)",
        "Ekele dị iche iche: Ututu ọma (Good morning), Ndewo (Hello)"
      ],
      "Ezinụlọ na Ihe Ndị dị na Gburugburu (Family & Things Around Us)": [
        "Ndị ezinụlọ: Nna (Father), Nne (Mother), Nwanne (Sibling)",
        "Nri ndị Igbo: Ji (Yam), Akpụ (Fufu), Ofe Egusi, Akara",
        "Anụmanụ: Nkịta (Dog), Nwamba (Cat), Ewu (Goat), Ọkụkọ (Chicken)"
      ]
    };
  }

  if (subj.includes('yoruba')) {
    return {
      "Lẹta ati Kika Nọmba (Yoruba Alphabets & Counting)": [
        "Lẹta ede Yoruba (A, B, D, E, Ẹ, F, G, GB, H, I, J, K...)",
        "Kika nọmba (1 de 20: Ookan, Eeji, Eeta, Eerin, Aarun...)",
        "Ikini ni ile Yoruba: E kaaro (Good morning), E kaasan, E kuule"
      ],
      "Idile ati Awọn Ohun Ayika (Family & Environment)": [
        "Awọn ẹbi: Baba (Father), Iya (Mother), Egbon (Elder sibling), Aburo",
        "Ounjẹ ilẹ wa: Amala, Ewedu, Iyan (Pounded yam), Eba, Akara",
        "Awọn ẹranko: Aja (Dog), Ologbo (Cat), Ewurẹ (Goat), Adiyẹ (Chicken)"
      ]
    };
  }

  if (subj.includes('edo')) {
    return {
      "Ẹbẹ Urhie Edo (Edo Alphabets & Counting)": [
        "Urhie Edo (A, B, D, E, Ẹ, F, G, GB, GH, H, I, K...)",
        "Ọnọkpa Edo (1 to 20: Ọkpa, Eva, Eha, Ẹnẹ, Isẹn, Ehan...)",
        "Ẹkpotọ (Greetings: Kọyo, Ob'owa, Ọb'okhian)"
      ],
      "Egbé na Owa (Family and Household)": [
        "Ẹvbọ owa: Erha (Father), Iye (Mother), Ọmọ (Child)",
        "Emwin ewae: Iyan (Yam), Ema, Ẹmwin ẹkẹte",
        "Eranmwẹ: Akpolọ (Dog), Ẹwe (Goat), Ọkhọkhọ (Chicken)"
      ]
    };
  }

  // =========================================================================
  // 12. FOREIGN LANGUAGES (French, Arabic, Portuguese, Hebrew, Greek)
  // =========================================================================
  if (subj.includes('french')) {
    return {
      "L'Alphabet et Les Nombres (French Alphabet & Numbers)": [
        "L'Alphabet Français (A, B, C... avec bonne prononciation)",
        "Compter de 1 à 20 (Un, deux, trois, quatre, cinq, six, sept...)",
        "Les couleurs: Rouge, Bleu, Jaune, Vert, Blanc, Noir"
      ],
      "Les Salutations et La Famille": [
        "Salutations: Bonjour (Good morning), Bonsoir, Au revoir, Merci",
        "Comment vous appelez-vous? (Je m'appelle...)",
        "La famille: Le père, la mère, le frère, la sœur, le bébé"
      ]
    };
  }

  if (subj.includes('arabic') || subj.includes('hebrew') || subj.includes('greek') || subj.includes('portuguese')) {
    return {
      "Letters, Sounds and Counting": [
        `Introduction to ${subject} alphabets and writing direction`,
        "Counting numbers from 1 to 20 with joyful songs",
        "Basic greeting words and polite phrases"
      ],
      "Everyday Words and Family": [
        "Naming common objects in school and home",
        "Words for Father, Mother, Brother, Sister",
        "Colors and common animals"
      ]
    };
  }

  // =========================================================================
  // 14. BUSINESS, ECONOMICS, COMMERCE, ACCOUNTING (Child / Primary)
  // =========================================================================
  if (
    !subj.includes('home') &&
    (subj.includes('econo') || subj.includes('commer') || subj.includes('account') ||
    subj.includes('bank') || subj.includes('market') || subj.includes('business'))
  ) {
    return {
      "Everyday Money & Nigerian Currency": [
        "Identifying Nigerian currency notes: ₦5, ₦10, ₦20, ₦50, ₦100, ₦200, ₦500, ₦1000",
        "Coins and Kobo: Understanding how money works",
        "Buying and selling in a classroom store: Calculating prices and change"
      ],
      "Saving Money & The Piggy Bank (Kolo)": [
        "What is saving? Keeping money safe for the future",
        "Using a piggy bank or wooden saving box (Kolo)",
        "Needs vs. Wants: Spending on important needs (food, books) before wants (extra toys)",
        "What banks do: Keeping money safe for families"
      ],
      "Work, Production & Simple Business": [
        "Why parents go to work: Earning an income to care for the family",
        "Goods (things we can touch: bread, shoes) vs. Services (teaching, haircut)",
        "Simple profit and loss in everyday trading"
      ]
    };
  }

  // =========================================================================
  // 14. MUSIC & CREATIVE ARTS (Child / Primary)
  // =========================================================================
  if (subj.includes('music')) {
    return {
      "Rhythm, Rhymes and Singing": [
        "Singing cheerful school songs and national patriotic tunes",
        "Clapping to musical rhythms and beats (Fast vs. Slow)",
        "Pitch: High sounds like birds vs. Low sounds like drums"
      ],
      "Traditional Nigerian Musical Instruments": [
        "Percussion: The Talking Drum (Gangan), Ogene metal gong, Shekere rattle",
        "Wind instruments: Kakaki trumpet, Wooden flutes",
        "Making simple musical instruments with bottle caps and empty tins"
      ]
    };
  }

  // =========================================================================
  // 15. LAW & CITIZENSHIP RULES (Child / Primary)
  // =========================================================================
  if (subj.includes('law')) {
    return {
      "Good Rules for Home and School": [
        "Why we need rules: Rules keep everyone safe and happy",
        "Fair play in games: Sharing, taking turns, and not cheating",
        "Respecting each other's property: Asking before borrowing"
      ],
      "Rights of a Nigerian Child": [
        "The right to go to school and receive good education",
        "The right to healthcare, clean water, and loving care",
        "The right to protection from danger, child labor, and abuse"
      ]
    };
  }

  // =========================================================================
  // 16. ASTRONOMY & MECHATRONICS (Child / Primary)
  // =========================================================================
  if (subj.includes('astronomy')) {
    return {
      "The Sun, Moon, and Twinkling Stars": [
        "The Sun: Our closest star that gives us daylight and warmth",
        "The Moon: Why the moon changes shape (Crescent to Full Moon)",
        "Stars in the night sky and constellations"
      ],
      "Our Planet Earth & The 8 Planets": [
        "Planet Earth: Our home with blue oceans and green land",
        "The 8 Planets revolving around the Sun",
        "Rockets, Astronauts, and exploring Space"
      ]
    };
  }

  if (subj.includes('mechatron') || subj.includes('engineering')) {
    return {
      "How Toys and Machines Work": [
        "Wheels and Axles: How toy cars and bicycles roll smoothly",
        "Pushes and Pulls: Using springs and rubber bands to launch toys",
        "Batteries and Small Motors: Making toy fans spin"
      ],
      "Building Fun Inventions": [
        "Building bridges and towers with wooden blocks and paper",
        "Magnets in toys: Attracting and repelling",
        "What engineers do to build houses, roads, and airplanes"
      ]
    };
  }

  // =========================================================================
  // 17. DEFAULT TOPICS GENERATOR FOR ALL OTHER SUBJECTS (Primary / Basic)
  // =========================================================================
  return {
    [`Discovering ${subject} for Young Learners`]: [
      `What is ${subject}? Fun everyday story`,
      `Why ${subject} is exciting and helpful in our daily lives`,
      `Key words and friendly ideas in ${subject}`
    ],
    [`Simple Steps & Fun Examples in ${subject}`]: [
      `Basic concepts explained with toys, fruits, and pictures`,
      `Step-by-step easy examples a child can follow`,
      `Friendly questions and cheerful answers`
    ],
    [`Fun Activity and Practice in ${subject}`]: [
      `Drawing and classroom games related to ${subject}`,
      `A fun practice puzzle with easy solutions`,
      `Celebration of learning and super learner badge`
    ]
  };
};

/**
 * Real-world High & Secondary School syllabus topics mapped grade-by-grade from JSS 1 to SSS 3,
 * strictly aligned to Nigerian NERDC, BECE (Junior WAEC), WAEC/WASSCE, NECO, and JAMB UTME standards,
 * ensuring students are NEVER taught topics beyond or below their exact class level.
 */
export const getRealWorldHighSchoolTopics = (subject: Subject, levelStr: string): RealWorldCurriculum => {
  const subj = (subject || '').toString().toLowerCase();
  const lvl = (levelStr || '').toLowerCase();

  const isJSS1 = lvl.includes('jss 1') || lvl.includes('basic 7') || lvl.includes('grade 7') || lvl.includes('year 7');
  const isJSS2 = lvl.includes('jss 2') || lvl.includes('basic 8') || lvl.includes('grade 8') || lvl.includes('year 8');
  const isJSS3 = lvl.includes('jss 3') || lvl.includes('basic 9') || lvl.includes('bece') || lvl.includes('grade 9') || lvl.includes('year 9');
  const isJunior = isJSS1 || isJSS2 || isJSS3 || lvl.includes('junior');

  const isSSS1 = lvl.includes('sss 1') || lvl.includes('ss 1') || lvl.includes('year 10') || lvl.includes('grade 10');
  const isSSS2 = lvl.includes('sss 2') || lvl.includes('ss 2') || lvl.includes('year 11') || lvl.includes('grade 11');
  const isSSS3 = lvl.includes('sss 3') || lvl.includes('ss 3') || lvl.includes('wassce') || lvl.includes('waec') || lvl.includes('jamb') || lvl.includes('neco') || lvl.includes('year 12') || lvl.includes('grade 12') || lvl.includes('advanced') || lvl.includes('jupeb') || lvl.includes('ijmb');

  // =========================================================================
  // 1. GENERAL MATHEMATICS (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('further math')) {
    if (isSSS1) {
      return {
        "Indices, Surds & Logarithms (SSS 1)": [
          "Laws of indices and fractional powers",
          "Surds: Simplification, conjugate surds and rationalizing binomial denominators",
          "Logarithmic equations and change of base theorem"
        ],
        "Polynomials & Factor Theory (SSS 1)": [
          "Algebraic division of polynomials",
          "The Remainder Theorem and Factor Theorem",
          "Roots of cubic and higher degree equations"
        ],
        "Matrices & Linear Systems (SSS 1)": [
          "Order and algebra of 2x2 matrices (addition, scalar multiplication, multiplication)",
          "Determinants of 2x2 matrices and matrix singularity",
          "Matrix inversion and solving 2x2 simultaneous linear equations"
        ],
        "Trigonometric Functions & Vectors (SSS 1)": [
          "Trigonometric ratios of general angles (0° to 360°)",
          "Trigonometric identities: sin²θ + cos²θ = 1, tan²θ + 1 = sec²θ",
          "Vectors in 2-Dimensions: Unit vectors i and j, scalar product (dot product)"
        ]
      };
    }
    if (isSSS2) {
      return {
        "Coordinate Geometry & Conic Sections (SSS 2)": [
          "Equations of lines: Gradient-intercept, point-slope, and perpendicular line conditions",
          "Distance from a point to a line",
          "Equation of a Circle: Standard form (x - a)² + (y - b)² = r² and general form",
          "Equations of tangents and normals to a circle"
        ],
        "Sequences, Series & Binomial Theorem (SSS 2)": [
          "Arithmetic Progression (AP): nth term, sum of first n terms",
          "Geometric Progression (GP): nth term, sum of n terms, sum to infinity",
          "Binomial Expansion for positive integer indices (Pascal's triangle & nCr combinations)"
        ],
        "Differential Calculus Fundamentals (SSS 2)": [
          "Limits of functions and continuity",
          "Differentiation from first principles",
          "Differentiation rules: Power rule, Product rule, Quotient rule, Chain rule",
          "Tangents and normals to algebraic curves"
        ],
        "Introductory Integration (SSS 2)": [
          "Indefinite integrals of polynomials and standard functions",
          "Integration by simple algebraic substitution",
          "Definite integrals and area bounded by curves"
        ]
      };
    }
    // SSS 3 / WAEC / JUPEB Prep
    return {
      "Advanced Calculus & Optimization (SSS 3 / WAEC)": [
        "Stationary points: Maximum, minimum, and points of inflection",
        "Rates of change and small approximations",
        "Integration techniques: Integration by parts and partial fractions",
        "Volume of revolution about the coordinate axes",
        "First-order linear differential equations (separable and integrating factor)"
      ],
      "3x3 Matrices & Linear Transformations (SSS 3)": [
        "Evaluation of 3x3 determinants using expansion by minors",
        "Matrix transformations in 2D: Reflection, rotation, enlargement, and shear",
        "Solving systems of 3 linear equations using Cramer's Rule"
      ],
      "Vectors & Mechanics in 2D/3D (SSS 3 / WAEC)": [
        "Dot and cross products of vectors in 3D",
        "Equilibrium of concurrent coplanar forces and Lami's Theorem",
        "Kinematics: Velocity-time relations with calculus",
        "Projectiles on horizontal and inclined planes",
        "Newton's Laws, impulse, momentum, and connected particles"
      ],
      "Probability Distributions & Statistics (SSS 3)": [
        "Permutations and Combinations (nPr and nCr)",
        "Probability: Conditional probability and tree diagrams",
        "Binomial and Poisson probability distributions",
        "Continuous random variables and Normal distribution curves"
      ]
    };
  }

  if (subj.includes('math')) {
    if (isJSS1) {
      return {
        "Whole Numbers & Place Value (JSS 1)": [
          "Counting in millions and billions; writing numbers in words and figures",
          "Place value and face value of large numbers",
          "Roman numerals: Reading and converting up to 1000 (M)",
          "Rounding off numbers to the nearest 10, 100, 1000"
        ],
        "Factors, Multiples & Prime Numbers (JSS 1)": [
          "Prime numbers between 1 and 100",
          "Expressing numbers as products of prime factors in index form",
          "Highest Common Factor (HCF) by prime factorization",
          "Lowest Common Multiple (LCM) by prime factorization"
        ],
        "Fractions, Decimals & Percentages (JSS 1)": [
          "Equivalent fractions and simplifying fractions to lowest terms",
          "Operations on fractions: Addition, subtraction, multiplication, and division",
          "Converting decimals to fractions and fractions to decimals",
          "Percentages: Expressing quantities as percentages and finding percentage of a quantity"
        ],
        "Basic Algebra & Directed Numbers (JSS 1)": [
          "Positive and negative numbers on the number line",
          "Addition and subtraction of directed numbers",
          "Algebraic terms, variables, coefficients, and simplifying like terms",
          "Solving simple linear equations: x + a = b, ax = b"
        ],
        "Plane Shapes & Mensuration (JSS 1)": [
          "Properties of 2D shapes: Squares, rectangles, triangles, circles",
          "Perimeter of rectangles, squares, and composite shapes",
          "Area of rectangles, squares, and right-angled triangles"
        ],
        "Angles & Basic Geometry (JSS 1)": [
          "Types of angles: Acute, right, obtuse, straight, and reflex angles",
          "Measuring and drawing angles with a protractor",
          "Sum of angles on a straight line (180°) and at a point (360°)"
        ],
        "Everyday Statistics (JSS 1)": [
          "Collecting and organizing classroom data using tally marks",
          "Constructing and reading frequency tables",
          "Drawing and interpreting pictograms and simple bar charts"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Whole Numbers & Standard Form (JSS 2)": [
          "Standard Form (Scientific Notation): A × 10ⁿ where 1 ≤ A < 10",
          "Approximations: Significant figures and decimal places",
          "Multiplication and division of directed numbers",
          "Order of operations: Applying BODMAS in arithmetic"
        ],
        "Linear Equations & Inequalities (JSS 2)": [
          "Solving linear equations with brackets and fractions",
          "Translating word problems into linear algebraic equations",
          "Linear inequalities in one variable with symbols (<, >, ≤, ≥)",
          "Graphing inequalities on the number line"
        ],
        "Angles in Polygons & Parallel Lines (JSS 2)": [
          "Angles associated with parallel lines: Alternate, corresponding, allied angles",
          "Sum of interior angles of a polygon: (n - 2) × 180°",
          "Sum of exterior angles of any convex polygon (360°)"
        ],
        "Pythagoras' Theorem (JSS 2)": [
          "Concept of hypotenuse in right-angled triangles",
          "Pythagoras' Rule: c² = a² + b²",
          "Calculating unknown sides in right-angled triangles",
          "Word problems: Ladders leaning on walls and tree shadows"
        ],
        "Mensuration: Solids & Prisms (JSS 2)": [
          "Surface area of cubes and rectangular cuboids",
          "Volume of cubes, cuboids, and right triangular prisms",
          "Circumference and area of circles (using π ≈ 22/7 or 3.142)"
        ],
        "Statistics & Introduction to Probability (JSS 2)": [
          "Calculating Mean, Median, and Mode for ungrouped data",
          "Constructing and interpreting Pie Charts (converting data to degrees)",
          "Concept of chance and probability: Tossing a coin, rolling a six-sided die"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Number Bases (Binary & Decimal) (JSS 3 / BECE)": [
          "Concept of number bases: Base 2 (Binary) and Base 10 (Decimal)",
          "Converting numbers from base 10 to base 2 and base 2 to base 10",
          "Addition and subtraction of binary numbers (0 and 1)"
        ],
        "Simultaneous Linear Equations (JSS 3 / BECE)": [
          "Simultaneous equations: Elimination method",
          "Simultaneous equations: Substitution method",
          "Word problems leading to simultaneous linear equations"
        ],
        "Quadratic Expressions & Factorization (JSS 3 / BECE)": [
          "Expansion of algebraic expressions: (a + b)(c + d)",
          "Factorizing quadratic expressions of the form x² + bx + c",
          "Difference of two squares: a² - b² = (a - b)(a + b)",
          "Change of subject of formula in algebraic relations"
        ],
        "Trigonometry & Elevation/Depression (JSS 3 / BECE)": [
          "Trigonometric ratios in right-angled triangles: Sine, Cosine, Tangent (SOH CAH TOA)",
          "Finding unknown sides and angles using trig tables",
          "Angles of elevation and depression with simple word applications"
        ],
        "Mensuration of Cylinders & Spheres (JSS 3 / BECE)": [
          "Curved surface area and total surface area of cylinders",
          "Volume of cylinders: V = πr²h",
          "Area of sectors and length of arcs in circles"
        ],
        "BECE Examination Masterclass & Past Papers": [
          "Comprehensive review of BECE (Junior WAEC) objective question patterns",
          "Step-by-step theory presentation for maximum marks",
          "Common pitfalls and time management strategies in Junior WAEC"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Number Bases & Modular Arithmetic (SSS 1)": [
          "Conversion between bases 2 to 10 and fractional bases",
          "Addition, subtraction, and multiplication in various number bases",
          "Modular arithmetic: Addition and multiplication in clock arithmetic (Mod n)"
        ],
        "Indices, Standard Form & Logarithms (SSS 1)": [
          "Laws of indices: Multiplication, division, zero, negative, and fractional indices",
          "Standard form and scientific calculations",
          "Logarithms of numbers > 1: Characteristic and mantissa using four-figure tables",
          "Logarithm multiplication, division, powers, and roots"
        ],
        "Sets & Venn Diagrams (SSS 1)": [
          "Types of sets: Universal, empty, finite, infinite, subset, complement",
          "Set operations: Union (∪) and Intersection (∩)",
          "Solving 2-set problems using Venn diagrams and algebraic formulas"
        ],
        "Quadratic Equations & Variations (SSS 1)": [
          "Solving quadratic equations by factorization and completing the square",
          "Introduction to the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a",
          "Variations: Direct variation, Inverse variation, Joint variation, and Partial variation"
        ],
        "Geometry of Lines, Triangles & Circles (SSS 1)": [
          "Angles of triangles and quadrilaterals",
          "Circle Geometry: Chords, perpendicular bisectors, tangents to circles",
          "Angles subtended by an arc at the center and circumference"
        ],
        "Trigonometry & Special Angles (SSS 1)": [
          "Trig ratios of 30°, 45°, 60° (surd forms)",
          "Trigonometric ratios for angles 0° to 360° using unit circle",
          "Graphs of y = sin x and y = cos x from 0° to 360°"
        ],
        "Mensuration & Statistics (SSS 1)": [
          "Length of arcs, perimeter of sectors, area of sectors and segments",
          "Organizing grouped data: Class intervals, class boundaries, class midpoints",
          "Calculating Mean, Median, and Mode for grouped data, drawing histograms"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Logarithms & Surds Mastery (SSS 2)": [
          "Logarithms of numbers less than 1 (negative characteristics / bar notation)",
          "Logarithmic equations and laws of logarithms",
          "Surds: Addition, subtraction, multiplication, and conjugate rationalization"
        ],
        "Sequences and Series: AP & GP (SSS 2)": [
          "Arithmetic Progression (AP): First term (a), common difference (d), nth term Un = a + (n-1)d",
          "Sum of the first n terms of an AP: Sn = n/2 [2a + (n-1)d]",
          "Geometric Progression (GP): First term (a), common ratio (r), nth term Un = arⁿ⁻¹",
          "Sum of n terms of a GP and Sum to Infinity: S∞ = a / (1 - r)"
        ],
        "Quadratic Equations & Graphical Solutions (SSS 2)": [
          "Roots of quadratic equations and nature of roots (b² - 4ac)",
          "Drawing quadratic graphs: Table of values, vertex/turning point, axis of symmetry",
          "Reading roots of quadratic equations and solving simultaneous linear-quadratic equations graphically"
        ],
        "Circle Theorems (WAEC Core Focus) (SSS 2)": [
          "Angle at center is twice angle at circumference",
          "Angles in the same segment of a circle are equal",
          "Angle in a semicircle is a right angle (90°)",
          "Opposite angles of a cyclic quadrilateral sum to 180°",
          "Alternate Segment Theorem and Tangent properties"
        ],
        "Trigonometry, Bearings & Distances (SSS 2)": [
          "Sine Rule: a/sin A = b/sin B = c/sin C for non-right triangles",
          "Cosine Rule: a² = b² + c² - 2bc cos A for non-right triangles",
          "Bearings and distances: 3-figure bearings, plotting navigation problems, resolving triangles"
        ],
        "Mensuration of 3D Solids (SSS 2)": [
          "Surface area and volume of Cones and Pyramids",
          "Surface area and volume of Spheres and Hemispheres",
          "Frustum of cones and pyramids: Slant height, surface area, and volume"
        ],
        "Cumulative Frequency (Ogive) & Probability (SSS 2)": [
          "Cumulative frequency tables and plotting Ogive curves",
          "Estimating median, lower quartile (Q1), upper quartile (Q3), and interquartile range from Ogive",
          "Probability: Addition law (mutually exclusive) and Multiplication law (independent events), tree diagrams"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Matrices & Determinants (SSS 3 / WAEC)": [
        "Matrix dimensions, matrix addition, scalar multiplication, and matrix multiplication",
        "Determinants of 2x2 matrices and finding inverse matrices",
        "Solving simultaneous linear equations using matrix inversion and Cramer's Rule"
      ],
      "Coordinate Geometry (SSS 3 / JAMB)": [
        "Midpoint and length of a line segment connecting two points",
        "Gradient (slope) of a straight line: m = (y₂ - y₁) / (x₂ - x₁)",
        "Equations of lines: y = mx + c, point-slope form, intercepts form",
        "Parallel lines (m₁ = m₂) and perpendicular lines (m₁ × m₂ = -1)"
      ],
      "Latitude & Longitude (Earth Geometry) (SSS 3 / WAEC)": [
        "Parallels of latitude and meridians of longitude; Equator and Greenwich Meridian",
        "Distance along great circles (along meridians): D = (θ/360) × 2πR",
        "Radius of small circles: r = R cos α",
        "Distance along parallels of latitude: d = (θ/360) × 2πr",
        "Time differences based on longitude (15° = 1 hour)"
      ],
      "Introductory Calculus (SSS 3 / WAEC / JAMB)": [
        "Concept of limits and rate of change",
        "Differentiation of polynomials using the power rule: d/dx (axⁿ) = anxⁿ⁻¹",
        "Applications of differentiation: Gradient of curves, velocity, acceleration, turning points (max/min)",
        "Integration of algebraic polynomials: ∫ axⁿ dx = (axⁿ⁺¹) / (n + 1) + C",
        "Definite integrals and finding area under a curve"
      ],
      "Advanced Statistics & Dispersion (SSS 3)": [
        "Measures of dispersion: Range, Mean Deviation, Variance, and Standard Deviation for grouped data",
        "Comparing datasets using the Coefficient of Variation"
      ],
      "WASSCE / NECO / JAMB Examination Masterclass": [
        "WAEC General Mathematics Paper 1 (50 Objective questions) speed techniques and tricks",
        "WAEC Paper 2 (Theory) step-by-step presentation to secure full method (M) and accuracy (A) marks",
        "JAMB UTME Mathematics syllabus mastery and high-yield past question walkthroughs"
      ]
    };
  }

  // =========================================================================
  // 2. PHYSICS & JUNIOR BASIC SCIENCE (PHYSICS MODULES)
  // =========================================================================
  if (subj.includes('physic')) {
    if (isJSS1) {
      return {
        "Introduction to Science & Measurement (JSS 1)": [
          "Meaning of Science, scientific methods and laboratory safety rules",
          "Measurement of length, mass, and time using standard metric units",
          "Instruments for measuring length: Metric ruler, measuring tape"
        ],
        "Matter & Energy Basics (JSS 1)": [
          "States of matter: Solids, liquids, and gases (arrangement of particles)",
          "Forms of energy: Light, heat, sound, electrical, mechanical energy",
          "Sources of energy: Renewable (Solar, Wind, Water) vs. Non-renewable (Crude oil, Coal)"
        ],
        "Force & Motion Intro (JSS 1)": [
          "What is Force? Pushes and pulls in everyday activities",
          "Types of forces: Contact forces (friction, tension) vs. Non-contact forces (gravity, magnetism)",
          "Friction: Advantages (walking, braking) and disadvantages (wear and tear, heat)"
        ],
        "Light & Sound in Daily Life (JSS 1)": [
          "Sources of light: Natural (Sun, stars) vs. Artificial (bulbs, candles, torches)",
          "Luminous vs. Non-luminous objects, shadow formation",
          "Sound: How sound is produced by vibrations, hearing sounds safely"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Work, Energy & Power (JSS 2)": [
          "Scientific definition of Work: Work = Force × Distance moved in direction of force",
          "Kinetic Energy (energy of motion) and Potential Energy (stored energy)",
          "Law of Conservation of Energy: Energy cannot be destroyed, only transformed",
          "Power: Rate of doing work (Power = Work / Time in Watts)"
        ],
        "Simple Machines (JSS 2)": [
          "Types of simple machines: Levers, pulleys, inclined planes, wheel and axle, screw",
          "Classes of levers: First class, Second class, Third class levers with everyday tools",
          "Mechanical Advantage (MA), Velocity Ratio (VR), and Efficiency of machines"
        ],
        "Heat Energy & Temperature (JSS 2)": [
          "Difference between Heat (energy) and Temperature (degree of hotness)",
          "Clinical and laboratory thermometers: Celsius scale",
          "Methods of heat transfer: Conduction (solids), Convection (fluids), Radiation (vacuum)"
        ],
        "Magnetism & Electricity Intro (JSS 2)": [
          "Magnetic poles: Law of magnetism (Like poles repel, unlike poles attract)",
          "Making simple magnets by stroking and electrical method",
          "Simple electric circuits: Cell, switch, connecting wire, bulb, series and parallel"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Motion & Speed (JSS 3 / BECE)": [
          "Types of motion: Random, rectilinear, rotational, and oscillatory motion",
          "Speed = Distance / Time; Velocity = Displacement / Time",
          "Acceleration: Rate of change of velocity (a = (v - u) / t)"
        ],
        "Sound Waves & Light Reflection (JSS 3 / BECE)": [
          "Production and transmission of sound through solids, liquids, and gases",
          "Echoes: Reflection of sound waves and applications (sonar, depth finding)",
          "Reflection of light on plane mirrors: Angle of incidence = Angle of reflection",
          "Formation of virtual images in plane mirrors (lateral inversion, same size)"
        ],
        "Electric Current & Safety (JSS 3 / BECE)": [
          "Electric current (amperes) and voltage (volts)",
          "Conductors (metals, copper) vs. Insulators (rubber, wood, plastics)",
          "Electrical safety: Fuses, circuit breakers, earthing, avoiding electric shock"
        ],
        "BECE Basic Science & Tech Examination Review": [
          "Junior WAEC / BECE question breakdown on mechanics, energy, and electricity",
          "Calculation practice on work, energy, power, and simple machines"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Units, Dimensions & Measurements (SSS 1)": [
          "Fundamental quantities and units (Mass, Length, Time, Current, Temperature, Luminous intensity, Amount of substance)",
          "Derived quantities and units (Velocity, Acceleration, Force, Work, Power)",
          "Measurement instruments: Vernier calipers, Micrometer screw gauge, Beam balance, Stopwatch",
          "Dimensional analysis: Verifying physical equations"
        ],
        "Scalars, Vectors & Coplanar Forces (SSS 1)": [
          "Difference between Scalar and Vector quantities",
          "Resolution of vectors into horizontal and vertical components",
          "Resultant of coplanar vectors using parallelogram law and triangle law"
        ],
        "Rectilinear Motion & Velocity-Time Graphs (SSS 1)": [
          "Displacement, velocity, uniform acceleration",
          "Equations of uniformly accelerated motion: v = u + at, s = ut + ½at², v² = u² + 2as",
          "Motion under gravity (free fall, vertical projection)",
          "Interpreting Velocity-Time graphs: Gradient (acceleration) and Area under graph (distance)"
        ],
        "Force, Momentum & Newton's Laws (SSS 1)": [
          "Newton's First Law of Motion (Inertia)",
          "Newton's Second Law of Motion: F = ma, Momentum (p = mv) and Impulse",
          "Law of Conservation of Linear Momentum and collisions (Elastic vs. Inelastic)",
          "Newton's Third Law: Action and reaction pairs",
          "Friction: Static vs. Dynamic friction, coefficient of friction (μ = F/R)"
        ],
        "Work, Energy, Power & Machines (SSS 1)": [
          "Work done by a constant and inclined force",
          "Mechanical energy: Kinetic energy (½mv²) and Gravitational potential energy (mgh)",
          "Simple machines: Pulleys (block and tackle), inclined planes, screw jacks, gear systems",
          "Calculating MA, VR, and Efficiency: Efficiency = (MA / VR) × 100%"
        ],
        "Density, Relative Density & Fluid Pressure (SSS 1)": [
          "Density = Mass / Volume; Relative density of liquids and solids",
          "Pressure in fluids: P = hρg; Atmospheric pressure and barometers",
          "Archimedes' Principle and the Law of Flotation; Applications (Hydrometers, Ships, Submarines)"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Projectile Motion & Circular Dynamics (SSS 2)": [
          "Projectiles: Trajectory, time of flight (T = 2u sin θ / g), maximum height (H = u² sin² θ / 2g), range (R = u² sin 2θ / g)",
          "Circular motion: Angular velocity (ω), centripetal acceleration (a = v²/r), centripetal force (F = mv²/r)",
          "Equilibrium of forces: Principle of Moments, Conditions for static equilibrium, Lami's Theorem"
        ],
        "Elasticity & Properties of Matter (SSS 2)": [
          "Hooke's Law: F = ke, elastic limit, yield point, breaking point",
          "Young's Modulus of elasticity: Stress, Strain, Strain energy (E = ½Fe)",
          "Surface tension, capillarity, viscosity and terminal velocity (Stokes' Law)"
        ],
        "Thermal Physics & Gas Laws (SSS 2)": [
          "Temperature scales: Celsius, Fahrenheit, Kelvin (T = θ + 273)",
          "Thermal expansion of solids: Linear (α), Superficial (β = 2α), Cubic (γ = 3α) expansivity",
          "Gas Laws: Boyle's Law (P₁V₁ = P₂V₂), Charles' Law (V₁/T₁ = V₂/T₂), Pressure Law, General Gas Equation",
          "Heat Capacity and Specific Heat Capacity: Q = mcΔθ (Method of mixtures, electrical method)",
          "Latent Heat of Fusion and Vaporization: Q = mL; Cooling by evaporation and refrigerators"
        ],
        "Wave Motion, Sound & Optics (SSS 2)": [
          "General wave properties: Wave equation v = fλ, Transverse vs. Longitudinal waves",
          "Wave phenomena: Reflection, Refraction, Diffraction, Interference, Polarization",
          "Sound waves: Speed of sound, Resonance, Stationary waves in vibrating strings and pipes",
          "Reflection of light on curved mirrors: Concave and Convex mirror formulas (1/f = 1/u + 1/v)",
          "Refraction of light: Snell's Law, Refractive index (n = sin i / sin r), Critical angle and Total Internal Reflection",
          "Thin Lenses: Convex and Concave lenses, ray tracing, lens formula, linear magnification"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Optical Instruments & Dispersion (SSS 3 / WAEC)": [
        "Human Eye and defects of vision: Short sight (Myopia - correction with concave lens), Long sight (Hypermetropia - convex lens)",
        "Optical instruments: Simple microscope, Compound microscope, Astronomical telescope (Magnifying power)",
        "Dispersion of white light through triangular prisms, Pure spectrum, Rainbow formation"
      ],
      "Electrostatics & Capacitors (SSS 3 / WAEC)": [
        "Coulomb's Law of electrostatic force: F = (k q₁ q₂) / r²",
        "Electric field intensity (E) and Electric potential (V)",
        "Capacitors: Capacitance C = Q/V, Parallel plate capacitors, Capacitors in series and parallel"
      ],
      "Current Electricity & DC Circuits (SSS 3 / WAEC)": [
        "Ohm's Law: V = IR, Electrical resistivity and conductivity (R = ρL/A)",
        "Resistors in series (R = R₁ + R₂) and parallel (1/R = 1/R₁ + 1/R₂)",
        "Electromotive force (E) and internal resistance (r): E = I(R + r)",
        "Electrical power (P = IV = I²R = V²/R) and electrical energy consumption calculations",
        "Potentiometers and Wheatstone Bridge for precise resistance measurement"
      ],
      "Electromagnetism & AC Circuits (SSS 3 / WAEC)": [
        "Magnetic field around straight conductors, circular coils, and solenoids",
        "Force on a current-carrying conductor in a magnetic field: F = BIl sin θ (Fleming's Left-Hand Rule)",
        "Electromagnetic Induction: Faraday's Law and Lenz's Law; AC and DC generators",
        "Transformers: Step-up and Step-down, Turns ratio (Vs/Vp = Ns/Np = Ip/Is), Efficiency",
        "Alternating Current (AC): Peak and RMS values (Irms = I₀/√2), Inductance, Capacitance, R-L-C series resonance"
      ],
      "Atomic & Modern Physics (SSS 3 / JAMB)": [
        "Models of the atom: Thomson, Rutherford, Bohr's postulates and energy levels",
        "Photoelectric effect: Einstein's photoelectric equation (hf = W₀ + KEmax), work function, threshold frequency",
        "X-Rays: Production, properties, and medical/industrial applications",
        "Radioactivity: Alpha, Beta, Gamma radiations, Radioactive decay law, Half-life (T½ = 0.693/λ)",
        "Nuclear reactions: Nuclear fission, Nuclear fusion, Mass-energy equivalence (E = mc²)",
        "Semiconductors: Intrinsic vs. Extrinsic (p-type and n-type), p-n junction diodes, rectification"
      ],
      "WAEC Physics Practical & Theory Masterclass": [
        "Mastering WAEC Paper 3 Physics Practicals: Mechanics, Optics, Electricity experiments",
        "Graph plotting standards: Scales, line of best fit, slope calculation, evaluation of intercepts",
        "WAEC Paper 2 Theory scoring walkthrough and JAMB UTME calculation shortcuts"
      ]
    };
  }

  // =========================================================================
  // 3. CHEMISTRY & JUNIOR BASIC SCIENCE (CHEMISTRY MODULES)
  // =========================================================================
  if (subj.includes('chem')) {
    if (isJSS1) {
      return {
        "Matter & Materials (JSS 1)": [
          "What is Matter? Solid, liquid, and gaseous states",
          "Pure substances vs. Mixtures in the kitchen and classroom",
          "Separation of mixtures: Filtration, Evaporation, Decantation"
        ],
        "Air & Water Basics (JSS 1)": [
          "Composition of air: Nitrogen (78%), Oxygen (21%), Carbon dioxide (0.03%), Noble gases",
          "Importance of Oxygen in burning (combustion) and breathing",
          "Sources of water, clean drinking water, and water purification methods"
        ],
        "Acids & Bases in Daily Life (JSS 1)": [
          "Common acidic substances: Lemon juice, vinegar, sour milk",
          "Common basic substances: Wood ash, soap, lime water",
          "Using litmus paper to test for acids (turns blue litmus red) and bases (turns red litmus blue)"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Elements, Compounds & Mixtures (JSS 2)": [
          "Symbols of the first 20 elements (H to Ca)",
          "Chemical symbols and how they are derived (Latin names: Na, Fe, Cu, Au, Ag)",
          "Differences between Compounds (chemically joined) and Mixtures (physically mixed)",
          "Separation techniques: Simple distillation, Fractional distillation, Chromatography intro"
        ],
        "Chemical Changes vs. Physical Changes (JSS 2)": [
          "Physical changes: Easily reversible, no new substance formed (e.g. melting ice)",
          "Chemical changes: Irreversible, new substances formed (e.g. rusting of iron, burning wood)",
          "Rusting of iron: Conditions for rusting (Oxygen and Moisture) and prevention methods"
        ],
        "Crude Oil & Petrochemicals Intro (JSS 2)": [
          "What is Crude Oil (Petroleum)? Origin and discovery in the Niger Delta",
          "Fractional distillation of petroleum into petrol, kerosene, diesel, and bitumen",
          "Importance of petroleum to the Nigerian economy"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Atomic Structure Basics (JSS 3 / BECE)": [
          "The Atom: Protons (positive), Neutrons (neutral), Electrons (negative)",
          "Atomic number (Z) and Mass number (A)",
          "Electronic configuration of the first 20 elements (2, 8, 8, 2 rule)"
        ],
        "Acids, Bases & Salts Intro (JSS 3 / BECE)": [
          "Physical and chemical properties of acids and alkalis",
          "The pH Scale: Neutral (7), Acidic (< 7), Alkaline (> 7)",
          "Neutralization reaction: Acid + Base → Salt + Water"
        ],
        "Chemical Industries & Safety (JSS 3 / BECE)": [
          "Chemical industries in Nigeria: Soaps, paints, pharmaceuticals, plastics",
          "Hazard symbols: Flammable, toxic, corrosive, explosive",
          "Environmental pollution from chemical wastes and safe disposal"
        ],
        "BECE Basic Science Chemistry Revision": [
          "Review of high-frequency Junior WAEC / BECE chemistry questions",
          "Chemical formulas and equation balancing for junior students"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Particulate Nature of Matter & Atomic Structure (SSS 1)": [
          "Atomic Theory (Dalton, Thomson, Rutherford, Bohr)",
          "Fundamental subatomic particles: Protons, Neutrons, Electrons",
          "Atomic Number, Mass Number, Isotopy and relative atomic mass calculations",
          "Electronic configuration using spdf notation for elements 1 to 30"
        ],
        "Periodic Table & Periodic Trends (SSS 1)": [
          "Structure of the Periodic Table: Groups (1 to 8) and Periods (1 to 7)",
          "Periodic trends across periods and down groups: Atomic radius, Ionization energy, Electronegativity, Electron affinity",
          "Properties of Group 1 (Alkali metals), Group 2 (Alkaline earth metals), and Group 7 (Halogens)"
        ],
        "Chemical Bonding (SSS 1)": [
          "Electrovalent (Ionic) bonding: Transfer of electrons, properties of ionic compounds",
          "Covalent bonding: Sharing of electron pairs, single, double, triple bonds",
          "Coordinate (Dative) bonding and intermolecular forces (Hydrogen bonding, Van der Waals forces)",
          "Metallic bonding and properties of metals"
        ],
        "Chemical Formulas & Stoichiometry Intro (SSS 1)": [
          "Oxidation numbers of elements in compounds and radical valencies",
          "Writing and balancing chemical equations with state symbols",
          "The Mole concept: Molar mass, Avogadro's number (6.02 × 10²³), Moles = Mass / Molar Mass",
          "Empirical Formula and Molecular Formula determination"
        ],
        "Acids, Bases & Salts (SSS 1)": [
          "Definitions: Arrhenius, Bronsted-Lowry, Lewis theories",
          "Basicity of acids and pH scale calculations: pH = -log[H⁺]",
          "Preparation of soluble and insoluble salts",
          "Deliquescent, hygroscopic, and efflorescent substances"
        ],
        "Water & Carbon Chemistry (SSS 1)": [
          "Hardness of water: Temporary hardness (caused by Ca(HCO3)2) and Permanent hardness (CaSO4), softening methods",
          "Carbon: Allotropes (Diamond, Graphite, Fullerenes, Amorphous carbons)",
          "Oxides of carbon: Carbon monoxide (CO - toxicity) and Carbon dioxide (CO2)"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Stoichiometry & Gas Laws (SSS 2)": [
          "Molar volume of gases at STP (22.4 dm³ / mol)",
          "Calculations from balanced chemical equations: Mass-mass, mass-volume relationships",
          "Kinetic theory of gases and Gas Laws: Boyle's Law, Charles' Law, General Gas Equation, Ideal Gas Law (PV = nRT)",
          "Graham's Law of Diffusion and Dalton's Law of Partial Pressures"
        ],
        "Energetics & Reaction Rates (SSS 2)": [
          "Enthalpy changes: Exothermic (ΔH < 0) and Endothermic (ΔH > 0) reactions",
          "Standard enthalpy of combustion, formation, and neutralization",
          "Factors affecting reaction rates: Temperature, concentration, pressure, surface area, catalysts",
          "Collision theory and activation energy profiles"
        ],
        "Chemical Equilibrium (SSS 2)": [
          "Concept of dynamic chemical equilibrium",
          "Le Chatelier's Principle: Effects of temperature, pressure, concentration, and catalyst",
          "Industrial applications: Haber Process (ammonia synthesis) and Contact Process (sulfuric acid)"
        ],
        "Redox Reactions & Electrochemistry (SSS 2)": [
          "Oxidation and reduction in terms of oxygen, hydrogen, electron transfer, and oxidation numbers",
          "Balancing redox half-equations and full redox reactions in acidic/basic media",
          "Electrolysis: Preferential discharge of ions, Electrolysis of acidified water, CuSO4, brine",
          "Faraday's Laws of Electrolysis: m = (ItM) / (nF) calculations; Electroplating and refining of copper"
        ],
        "Inorganic Chemistry: Non-Metals & Metals (SSS 2)": [
          "Halogens (Fluorine, Chlorine, Bromine, Iodine): Laboratory preparation and oxidizing properties",
          "Nitrogen, Sulfur and their oxides; Manufacture of HNO3 and H2SO4",
          "Extraction of metals: Extraction of Aluminium from bauxite, Iron in the Blast Furnace"
        ],
        "Introduction to Organic Chemistry: Hydrocarbons (SSS 2)": [
          "Uniqueness of carbon: Catenation, hybridization (sp³, sp², sp)",
          "IUPAC nomenclature of organic compounds and homologous series",
          "Alkanes: Preparation, substitution reactions (chlorination), combustion",
          "Alkenes: Preparation of ethene, addition reactions (hydrogenation, halogenation), polymerisation",
          "Alkynes: Ethyne preparation and reactions"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Organic Chemistry Mastery (SSS 3 / WAEC)": [
        "Alkanols (Alcohols): Primary, secondary, tertiary alcohols, fermentation, dehydration to alkenes",
        "Alkanoic acids (Carboxylic acids): Acetic acid properties and reactions",
        "Esters & Esterification: Sweet-smelling esters, saponification, soaps and synthetic detergents",
        "Fats and oils: Hydrogenation of vegetable oils to margarine",
        "Giant molecules & Polymers: Carbohydrates (glucose, starch), Proteins (peptide bonds), Natural vs. Synthetic polymers (nylon, terylene, plastics)"
      ],
      "Petroleum & Petrochemicals (SSS 3 / JAMB)": [
        "Crude oil in Nigeria: Fractional distillation fractions and boiling points",
        "Octane number and anti-knock agents",
        "Cracking (Thermal and Catalytic) and reforming of hydrocarbons",
        "Petrochemicals and economic importance"
      ],
      "Volumetric & Qualitative Analysis (Practical Chemistry) (SSS 3)": [
        "Acid-base titrations: Standard solutions, molarity, indicator selection (phenolphthalein, methyl orange)",
        "Calculations of concentrations in mol/dm³ and g/dm³, percentage purity, water of crystallization",
        "Qualitative testing for cations: Fe²⁺, Fe³⁺, Cu²⁺, Al³⁺, Pb²⁺, Zn²⁺, NH₄⁺ using NaOH and NH3 solutions",
        "Qualitative testing for anions: Cl⁻, SO₄²⁻, SO₃²⁻, CO₃²⁻, NO₃⁻",
        "Identification of gases: H₂, O₂, CO₂, Cl₂, NH₃, SO₂, H₂S, NO₂"
      ],
      "Nuclear Chemistry & Environmental Pollution (SSS 3)": [
        "Radioactive decay, natural vs. artificial radioactivity, nuclear fission and fusion",
        "Half-life calculations and applications in medicine, agriculture, and carbon dating",
        "Environmental chemistry: Greenhouse effect, global warming, acid rain, ozone layer depletion"
      ],
      "WASSCE / NECO / JAMB Examination Masterclass": [
        "WAEC Paper 1 (Objectives) high-frequency questions and speed techniques",
        "WAEC Paper 2 (Theory) structured answers and equation-balancing guidelines",
        "WAEC Paper 3 (Alternative to Practical) exact tabular presentation and test deduction writing"
      ]
    };
  }

  // =========================================================================
  // 4. BIOLOGY & JUNIOR BASIC SCIENCE (BIOLOGY MODULES)
  // =========================================================================
  if (subj.includes('biol') || subj.includes('zool') || subj.includes('botan')) {
    if (isJSS1) {
      return {
        "Living Things & Life Processes (JSS 1)": [
          "Characteristics of Living Things (MR NIGER D: Movement, Respiration, Nutrition, Irritability, Growth, Excretion, Reproduction, Death)",
          "Classification: Differences between Plants and Animals",
          "Activities of living things in their natural environment"
        ],
        "Human Body Systems & Growth (JSS 1)": [
          "The Human Skeletal System: Main bones (skull, backbone, ribs, limbs) and functions (support, protection, movement)",
          "Muscles and movement: How muscles pull bones to move",
          "Puberty and Adolescence: Physical changes in boys and girls during puberty"
        ],
        "Personal Health & Cleanliness (JSS 1)": [
          "Cleanliness of body, hair, teeth, clothes, and school surroundings",
          "Nutrition: Classes of food (Carbohydrates, Proteins, Fats, Vitamins, Minerals, Water, Roughage)",
          "Water-borne and airborne diseases, and basic prevention"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Digestive & Circulatory Systems (JSS 2)": [
          "The Human Digestive System: Mouth, gullet, stomach, small intestine, large intestine",
          "Functions of digestive enzymes and absorption of digested nutrients",
          "The Human Circulatory System: Heart, blood vessels (arteries, veins, capillaries)",
          "Blood composition: Red blood cells, white blood cells, platelets, and plasma"
        ],
        "Respiratory & Excretory Systems (JSS 2)": [
          "Respiratory system: Nose, trachea, lungs, diaphragm, breathing mechanism",
          "Excretory organs in humans: Kidneys (urine), Skin (sweat), Lungs (carbon dioxide)",
          "Keeping excretory organs healthy and drinking clean water"
        ],
        "Habitats & Living Organisms (JSS 2)": [
          "Types of habitats: Terrestrial (land), Aquatic (freshwater, marine), Arboreal (trees)",
          "Simple Food Chains and Food Webs in grassland and pond habitats",
          "Pests, vectors of diseases (Mosquito - Malaria, Tsetse fly - Sleeping sickness) and their control"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Nervous System & Sense Organs (JSS 3 / BECE)": [
          "The Central Nervous System: Brain, spinal cord, and nerves",
          "The Five Sense Organs: Eye (sight), Ear (hearing), Nose (smell), Tongue (taste), Skin (touch)",
          "Care of sense organs and avoiding sensory damage"
        ],
        "Reproduction in Living Things (JSS 3 / BECE)": [
          "Reproduction in flowering plants: Parts of a flower, pollination, fertilization, seed dispersal",
          "Reproduction in humans: Male and female reproductive organs, fertilization, pregnancy",
          "Sexually Transmitted Infections (STIs, HIV/AIDS): Transmission, effects, and prevention"
        ],
        "Ecology & Environmental Balance (JSS 3 / BECE)": [
          "Ecosystems: Producers (green plants), Consumers (herbivores, carnivores), Decomposers (fungi, bacteria)",
          "Deforestation, soil erosion, and bush burning in Nigeria",
          "Conservation of natural resources: Forest reserves and wildlife preservation"
        ],
        "BECE Basic Science Biology Review": [
          "Junior WAEC / BECE high-yield biology questions and diagram labeling",
          "Practical revision: Food tests (Starch with Iodine, Glucose with Benedict's)"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Organization of Life & Cell Biology (SSS 1)": [
          "Living things: Cell Theory (Hooke, Schleiden, Schwann)",
          "Levels of Organization of Life: Cell → Tissue → Organ → System → Organism",
          "Structure and functions of cell organelles: Nucleus, Mitochondria, Ribosomes, Chloroplasts, Vacuole, Endoplasmic Reticulum",
          "Comparison between Plant Cell and Animal Cell",
          "Movement of substances: Diffusion, Osmosis (hypotonic, hypertonic, isotonic), Plasmolysis, Active transport"
        ],
        "Classification of Living Organisms (SSS 1)": [
          "Five Kingdom classification: Monera, Protista, Fungi, Plantae, Animalia",
          "Plantae: Thallophytes, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms (Monocots vs. Dicots)",
          "Animalia: Invertebrates (Porifera, Coelenterates, Platyhelminthes, Nematodes, Annelids, Molluscs, Arthropods) and Vertebrates (Pisces, Amphibians, Reptiles, Aves, Mammals)"
        ],
        "Nutrition in Plants & Animals (SSS 1)": [
          "Autotrophic nutrition: Photosynthesis (Light reaction, Dark reaction / Calvin cycle), factors affecting rate",
          "Mineral nutrition in plants: Nitrogen, Phosphorus, Potassium, Magnesium deficiencies",
          "Heterotrophic nutrition: Holozoic, Parasitic, Saprophytic, Symbiotic",
          "Human Alimentary Canal: Ingestion, Digestion, Absorption, Assimilation, Egestion; Digestive enzymes and action"
        ],
        "Basic Ecology (SSS 1)": [
          "Ecological concepts: Environment, Habitat, Niche, Biosphere, Population, Community, Ecosystem",
          "Biotic components (producers, consumers, decomposers) and Abiotic factors (temperature, rainfall, humidity, soil)",
          "Ecological instruments: Rain gauge, Anemometer, Hygrometer, Barometer, Secchi disc, Quadrate, Sweep net",
          "Food Chains, Food Webs, and Trophic levels; Ecological Pyramids (Numbers, Biomass, Energy)"
        ],
        "Energy Flow & Nutrient Cycles (SSS 1)": [
          "Energy flow through ecosystems and the 10% energy rule",
          "Carbon Cycle: Photosynthesis, respiration, combustion, decomposition",
          "Nitrogen Cycle: Nitrogen fixation, nitrification, denitrification, decay",
          "Water Cycle: Evaporation, transpiration, condensation, precipitation"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Transport Systems in Plants & Animals (SSS 2)": [
          "Need for transport system in multicellular organisms",
          "Transport in plants: Xylem (water and mineral transport, transpiration pull) and Phloem (translocation of organic food)",
          "Circulatory system in mammals: Structure of the heart, cardiac cycle, double circulation (pulmonary and systemic)",
          "Composition and functions of blood: RBCs (hemoglobin), WBCs (phagocytes, lymphocytes), Platelets, Plasma",
          "Blood grouping (ABO system and Rhesus factor), Blood transfusion compatibility",
          "Lymphatic system: Lymph, lymph nodes, lymph vessels"
        ],
        "Respiratory Systems (SSS 2)": [
          "Respiratory surfaces across organisms: Body surface (Amoeba), Gills (Fish), Tracheal system (Insects), Lungs (Mammals)",
          "Mechanism of breathing in humans: Inhalation and Exhalation (rib cage, intercostal muscles, diaphragm)",
          "Aerobic Respiration: Glycolysis, Krebs Cycle, Electron Transport Chain (ATP production)",
          "Anaerobic Respiration: Lactic acid fermentation in muscles, alcoholic fermentation in yeast"
        ],
        "Excretory & Osmoregulatory Systems (SSS 2)": [
          "Excretory structures: Contractile vacuole (Amoeba), Flame cells (Planaria), Nephridia (Earthworm), Malpighian tubules (Insects), Kidneys (Mammals)",
          "Structure of the mammalian kidney and nephron: Bowman's capsule, Glomerulus, Loop of Henle, Collecting duct",
          "Process of urine formation: Ultrafiltration, Selective reabsorption, Secretion",
          "Osmoregulation by the kidney (Role of Antidiuretic Hormone - ADH)",
          "Excretion in plants: Stomata, lenticels, excretion products (gums, resins, latex)"
        ],
        "Coordination & Sense Organs (SSS 2)": [
          "The Nervous System: Neurons (Sensory, Motor, Relay), Synapse, Reflex arc, Conditioned reflexes",
          "Brain structure and functions: Cerebrum, Cerebellum, Medulla oblongata, Hypothalamus",
          "The Eye: Structure, image formation, accommodation, defects (Myopia, Hypermetropia, Astigmatism, Cataract)",
          "The Ear: Outer, middle, inner ear; Mechanism of hearing and balance",
          "Endocrine System: Pituitary, Thyroid, Adrenal, Pancreas, Gonads; Hormones and deficiency diseases"
        ],
        "Reproductive Systems & Development (SSS 2)": [
          "Sexual reproduction in flowering plants: Floral parts, Pollination adaptations, Fertilization, Seed and fruit development",
          "Male and female reproductive anatomy in humans",
          "Spermatogenesis, Oogenesis, and the Menstrual Cycle (Hormonal control: FSH, LH, Estrogen, Progesterone)",
          "Fertilization, Cleavage, Implantation, Placenta functions, Gestation, Birth",
          "Growth in organisms: Mitosis (Prophase, Metaphase, Anaphase, Telophase) vs. Meiosis (reduction division)"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Genetics & Heredity (SSS 3 / WAEC)": [
        "Mendel's Laws of Inheritance: Law of Segregation and Law of Independent Assortment",
        "Monohybrid and Dihybrid crosses: Punnett squares, phenotypic and genotypic ratios (3:1, 9:3:3:1)",
        "Incomplete dominance, Co-dominance, Multiple alleles (ABO blood group inheritance)",
        "Sex determination in humans (XX female, XY male) and Sex-linked traits (Hemophilia, Red-Green color blindness)",
        "Structure of DNA (Double Helix, Nucleotides: A, T, C, G) and RNA, Genetic code and mutations"
      ],
      "Variation in Population (SSS 3 / WAEC)": [
        "Morphological variation in humans: Height, weight, skin color, fingerprint patterns",
        "Physiological variation: Ability to roll tongue, PTC tasting, ABO blood groups",
        "Continuous variation (Bell curve) vs. Discontinuous variation"
      ],
      "Evolution & Adaptation Theories (SSS 3 / JAMB)": [
        "Theories of Evolution: Lamarck's theory of use and disuse vs. Darwin's Natural Selection",
        "Evidence of evolution: Fossil records, Comparative anatomy (Homologous and Analogous organs), Embryology",
        "Adaptive coloration and protective adaptations: Camouflage, Mimicry, Warning coloration"
      ],
      "Applied Biology & Biotechnology (SSS 3)": [
        "Microorganisms in action: Bacteria and Fungi in food processing (baking, brewing, cheese)",
        "Disease control: Vaccines, antibiotics, antiseptic methods, and quarantine",
        "Genetic engineering: Genetically modified organisms (GMOs), gene therapy, artificial insemination"
      ],
      "WAEC Practical Biology Masterclass": [
        "Specimen identification: Plants, animals, bones, and organs in WAEC Paper 3",
        "Biological drawing rules: Sharp lines, proportional magnification, labels with horizontal leader lines, no shading",
        "Food tests: Starch (Iodine), Reducing sugars (Benedict's/Fehling's), Protein (Biuret/Millon's), Fats and Oils (Emulsion/Translucent paper test)",
        "JAMB UTME Biology past question speed analysis and diagram questions"
      ]
    };
  }

  // =========================================================================
  // 5. ENGLISH LANGUAGE & LITERACY (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('english') && !subj.includes('literature')) {
    if (isJSS1) {
      return {
        "Grammar & Parts of Speech (JSS 1)": [
          "Nouns: Common, Proper, Collective, Abstract, Countable vs. Uncountable",
          "Pronouns: Personal, Possessive, Demonstrative, Relative pronouns",
          "Verbs: Action verbs, Helping (auxiliary) verbs, Simple Present and Simple Past tenses",
          "Adjectives: Descriptive adjectives, Comparison of adjectives (positive, comparative, superlative)",
          "Prepositions: Prepositions of place, time, and direction"
        ],
        "Sentence Structure & Punctuation (JSS 1)": [
          "Subject, Verb, and Object in simple sentences",
          "Capital letters, full stops, question marks, and commas in lists",
          "Forming correct questions and negative sentences"
        ],
        "Reading Comprehension & Vocabulary (JSS 1)": [
          "Reading narrative passages and answering direct factual questions",
          "Vocabulary development: Family, school, sports, home, and market words",
          "Synonyms (words of similar meaning) and Antonyms (opposites)"
        ],
        "Composition & Essay Writing (JSS 1)": [
          "Narrative Essay: 'My First Day at Secondary School', 'An Unforgettable Event'",
          "Descriptive Essay: 'My School', 'My Best Friend', 'My Village'",
          "Informal Letter: Writing friendly letters to parents and friends"
        ],
        "Speech Work & Oral English (JSS 1)": [
          "Pure Vowels (Monophthongs): Short and long vowel sounds (/i:/ vs. /ɪ/, /u:/ vs. /ʊ/)",
          "Consonant sounds: Plosives, Fricatives (/f/ vs. /v/, /θ/ vs. /ð/)",
          "Clear pronunciation and syllables"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Grammar & Tenses (JSS 2)": [
          "Adverbs: Adverbs of manner, time, place, degree, and frequency",
          "Conjunctions: Coordinating (FANBOYS) and Subordinating conjunctions",
          "Tenses: Present Continuous, Past Continuous, Present Perfect, Past Perfect",
          "Active Voice vs. Passive Voice in sentences",
          "Direct Speech vs. Indirect (Reported) Speech intro"
        ],
        "Punctuation & Sentence Types (JSS 2)": [
          "Apostrophe for possession and contractions (it's vs. its)",
          "Inverted commas (quotation marks) in direct speech",
          "Compound sentences and Complex sentences with relative clauses"
        ],
        "Comprehension & Summary Writing (JSS 2)": [
          "Identifying the central idea (main theme) of a paragraph",
          "Techniques of summarizing paragraphs into two or three concise sentences",
          "Registers: Farming, healthcare, transportation, and cooking"
        ],
        "Continuous Writing (JSS 2)": [
          "Expository Essay: 'How to Prepare a Local Dish', 'The Importance of Education'",
          "Semi-Formal Letters: Letter to your School Principal or House Master",
          "Dialogue writing and informal debates"
        ],
        "Speech Work & Oral English (JSS 2)": [
          "Diphthongs: Glide vowel sounds (/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/, /ɪə/, /eə/, /ʊə/)",
          "Consonant clusters: Initial and final consonant clusters (e.g. /str-/, /-kts/)",
          "Word stress: Stressing two-syllable nouns vs. verbs (RE-cord vs. re-CORD)"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Advanced Grammar & Syntax (JSS 3 / BECE)": [
          "Phrases and Clauses: Noun phrases, Adjectival clauses, Adverbial clauses",
          "Question Tags and responses: Positive statement → Negative tag and vice versa",
          "Concord: Basic Subject-Verb agreement rules",
          "Reported speech: Converting statements, questions, and commands"
        ],
        "Summary Writing & Comprehension (JSS 3 / BECE)": [
          "Reading comprehension: Identifying implied meanings and author's tone",
          "BECE Summary Writing: Extracting required points without mindless lifting",
          "Vocabulary registers: Government, commerce, computer technology, law"
        ],
        "Composition & Letter Writing (JSS 3 / BECE)": [
          "Formal Letters: Letter of Application, Letter to Local Government Chairman",
          "Argumentative Essays / Debates: 'Day Schools Are Better Than Boarding Schools'",
          "Articles for publication in school magazines"
        ],
        "BECE Oral English Masterclass": [
          "Distinguishing vowel and consonant sounds tested in BECE Paper 2",
          "Intonation patterns: Falling intonation for statements and wh-questions; Rising intonation for yes/no questions",
          "Comprehensive review of past BECE English Language papers"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Grammatical Functions & Sentence Analysis (SSS 1)": [
          "Nouns and Noun Phrases: Subject of verb, Object of verb, Subject complement",
          "Adjectival Clauses and their grammatical functions (qualifying nouns)",
          "Adverbial Clauses (Time, Place, Reason, Manner, Condition, Concession) and their functions (modifying verbs)",
          "Sentence structures: Simple, Compound, Complex, Compound-Complex"
        ],
        "Lexis & Structure (SSS 1)": [
          "Concord rules: Proximity, neither/nor, either/or, indefinite pronouns, collective nouns",
          "Idiomatic expressions and phrasal verbs in contemporary English",
          "Synonyms, Antonyms, and Homophones in WAEC questions",
          "Vocabulary of Agriculture, Building, Health, and Environment"
        ],
        "Essay Writing: Creative & Formal (SSS 1)": [
          "Narrative and Descriptive writing for WASSCE Section A",
          "Formal Letter writing format: Two addresses, date, salutation, title, body, sign-off",
          "Informal Letter and Semi-Formal Letter mastery",
          "Speech Writing and Debate writing presentation"
        ],
        "Comprehension & Summary Foundations (SSS 1)": [
          "Strategies for reading unseen passages efficiently",
          "Summary writing: Recognizing topic sentences and writing points in own words (paraphrasing)",
          "Avoiding penalties for mindless lifting, extraneous material, and grammatical errors"
        ],
        "Oral English & Phonetics (SSS 1)": [
          "International Phonetic Alphabet (IPA) symbols for vowels and consonants",
          "Vowel contrast: Short vs. Long vowels (/æ/ vs. /ɑ:/, /ɒ/ vs. /ɔ:/)",
          "Consonant contrast: Voiced vs. Voiceless pairs (/s/ vs. /z/, /t/ vs. /d/)"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Grammar Mastery & Concord Rules (SSS 2)": [
          "Complex Concord: Plural words with singular meaning, 'as well as', 'together with', 'one of the...'",
          "Inversion of verbs and negative fronting ('Rarely did he...', 'Scarcely had she...')",
          "Modal Auxiliaries: Expressing certainty, possibility, obligation, and permission",
          "Punctuation mastery: Semicolons, colons, hyphens, dashes, and parenthetical commas"
        ],
        "Vocabulary Registers (WAEC Core) (SSS 2)": [
          "Vocabulary of Law and the Judiciary (plaintiff, defendant, subpoena, acquittal)",
          "Vocabulary of Banking, Finance, and Stock Exchange (dividend, collateral, inflation, liquidity)",
          "Vocabulary of Journalism, Media, and Advertising",
          "Vocabulary of Marine and Aviation transport"
        ],
        "WASSCE Continuous Writing Mastery (SSS 2)": [
          "Articles for publication in national newspapers and periodicals",
          "Argumentative essays: Constructing persuasive rebuttals and evidence-based claims",
          "Letters to the Editor regarding public utility crises and social issues",
          "Creative narrative techniques: Suspense, flashback, figurative language"
        ],
        "Summary Writing Excellence (SSS 2)": [
          "Answering 2-point, 3-point, and 4-point summary questions accurately",
          "Sentence synthesis: Writing one complete grammatical sentence per summary point",
          "Strict adherence to WAEC marking schemes to achieve maximum marks"
        ],
        "Oral English: Stress & Intonation (SSS 2)": [
          "Syllable division and Primary Word Stress in 3-syllable and 4-syllable words",
          "Stress shift in derivative words (e.g. PHO-to-graph, pho-TO-gra-phy, pho-to-GRA-phic)",
          "Intonation: Attitudinal and grammatical uses of falling and rising pitch"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "WASSCE Paper 1 (Lexis & Structure) Mastery": [
        "Mastering the 80/100 Objective Questions: Concord, Tenses, Prepositions, Phrasal verbs",
        "Idiomatic expressions, Figures of Speech, Antonyms, and Nearest in Meaning (Synonyms)",
        "Sentence completion and cloze test strategies"
      ],
      "WASSCE Paper 2 (Section A: Essay Writing) Masterclass": [
        "Selecting the highest-scoring question out of the 5 options",
        "Meeting the 450-word requirement with rich vocabulary and flawless paragraphing",
        "Scoring breakdown: Content (10 marks), Organization (10 marks), Expression (20 marks), Mechanical Accuracy (10 marks)"
      ],
      "WASSCE Paper 2 (Section B: Comprehension & Section C: Summary)": [
        "Comprehension questions: Grammatical name and function questions (Clauses & Phrases)",
        "Figurative expressions and literary devices in comprehension passages",
        "Summary writing: Writing clear, self-contained sentences without grammatical flaws or preamble errors"
      ],
      "WASSCE Paper 3 (Test of Orals) Mastery": [
        "Vowels (Monophthongs and Diphthongs) test questions",
        "Consonants and silent letters (e.g. doubt, castle, knife, psychology)",
        "Rhyme schemes: Identifying words that rhyme with target exam words",
        "Word Stress: Polysyllabic stress rules and suffixes that attract stress",
        "Emphatic Stress: Identifying the correct statement that contradicts emphatic capitalized words"
      ],
      "JAMB UTME Use of English Complete Syllabus": [
        "Comprehension passages (including recommended prose text)",
        "Lexis and Structure: Synonyms, Antonyms, Interpretation, Sentence completion",
        "Oral forms: Vowel sounds, Consonants, Stress patterns, and Rhyme"
      ]
    };
  }

  // =========================================================================
  // 6. COMPUTER STUDIES / ICT (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('computer') || subj.includes('ict') || subj.includes('infotech')) {
    if (isJunior) {
      return {
        "Computer Fundamentals & Hardware (JSS 1-3)": [
          "Historical development of computers: Abacus, Napier's bones, Pascaline, Babbage's engines",
          "Generations of computers (1st to 5th generations)",
          "Hardware components: Input devices (keyboard, mouse), Output devices (monitor, printer), Central Processing Unit (ALU, Control Unit, Registers)",
          "Storage devices: RAM, ROM, Hard disk, Flash drive"
        ],
        "Software & Operating Systems (JSS 1-3)": [
          "Types of software: System software (OS, Utilities) vs. Application software",
          "Operating System functions and user interfaces (GUI vs. CLI)",
          "Word Processing basics: Typing, formatting, saving, printing in Microsoft Word",
          "Spreadsheet basics: Rows, columns, cells, simple formulas (SUM, AVERAGE) in Microsoft Excel"
        ],
        "Internet & Computer Safety (JSS 1-3 / BECE)": [
          "The Internet: Web browsers, search engines, websites, email creation",
          "Computer ethics: Taking care of computer labs, posture, avoiding liquid spills",
          "Computer viruses: Symptoms, prevention, and anti-virus software",
          "BECE Computer Studies past questions and mock examination review"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Computer Architecture & Logic Gates (SSS 1)": [
          "Von Neumann architecture: Bus systems (Data, Address, Control bus)",
          "Logic Gates: Truth tables and symbols for AND, OR, NOT, NAND, NOR",
          "Combining basic logic gates to build simple electronic decision circuits"
        ],
        "Information Transmission & Networking Intro (SSS 1)": [
          "Data representation: Bits, Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes",
          "Computer networks: LAN (Local Area Network), WAN (Wide Area Network), MAN",
          "Network topologies: Star, Bus, Ring, Mesh topologies",
          "Network transmission media: Cables (Coaxial, Twisted pair, Fiber optic) vs. Wireless (Wi-Fi, Bluetooth)"
        ],
        "Office Productivity Suites Mastery (SSS 1)": [
          "Advanced Word Processing: Mail merge, tables, headers, footers, table of contents",
          "Advanced Spreadsheets: Nested IF formulas, VLOOKUP, charts, data sorting and filtering",
          "Presentation software: Slide transitions, animations, timing in PowerPoint"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Algorithms, Flowcharts & Programming (SSS 2)": [
          "Algorithm design: Pseudocode and flowcharts (symbols: terminator, process, decision, input/output)",
          "Programming languages: Machine code, Assembly language, High-level languages",
          "Introduction to Python / QBasic programming: Variables, data types, conditional statements (if-else), loops (for, while)"
        ],
        "Database Management Systems (DBMS) (SSS 2)": [
          "Database concepts: Fields, records, files, primary key, foreign key",
          "Relational databases: Tables, relationships (one-to-one, one-to-many)",
          "SQL fundamentals: CREATE TABLE, SELECT, INSERT, UPDATE, DELETE queries",
          "Creating databases and forms in Microsoft Access"
        ],
        "Computer Maintenance & Security (SSS 2)": [
          "Computer maintenance: Defragmentation, disk cleanup, dust removal, cooling fans",
          "Cybersecurity threats: Malware, Phishing, Ransomware, Denial of Service (DoS)",
          "Protection measures: Firewalls, strong passwords, encryption, biometric security"
        ]
      };
    }

    // SSS 3 / WAEC / JAMB Prep
    return {
      "Web Design & Internet Technologies (SSS 3 / WAEC)": [
        "Web development basics: HTML tags (headings, paragraphs, links, images, tables, forms)",
        "Cascading Style Sheets (CSS): Colors, fonts, margins, responsive layouts",
        "Networking protocols: TCP/IP, HTTP/HTTPS, FTP, DNS, IP addressing"
      ],
      "Digital Technology, AI & Ethics (SSS 3 / JAMB)": [
        "Emerging technologies: Artificial Intelligence (AI), Machine Learning, Internet of Things (IoT), Cloud Computing",
        "Cyber laws and computer crime in Nigeria (Cybercrime Act, EFCC guidelines)",
        "Intellectual property, copyright, software piracy, and digital ethics"
      ],
      "WAEC / NECO / JAMB Computer Studies Masterclass": [
        "WAEC Paper 1 (Objectives) high-frequency questions",
        "WAEC Paper 2 (Theory) structured answers and algorithm tracing",
        "WAEC Paper 3 (Practical): Live programming, spreadsheet modeling, and web design tasks",
        "JAMB CBT Computer Studies examination tips and drills"
      ]
    };
  }

  // =========================================================================
  // 7. AGRICULTURAL SCIENCE (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('agric')) {
    if (isJunior) {
      return {
        "Introduction to Agriculture (JSS 1-3)": [
          "Meaning, importance, and branches of Agriculture (Agronomy, Animal Science, Agric Economics, Extension)",
          "Types of agriculture: Subsistence vs. Commercial agriculture",
          "Simple farm tools: Hand tools (cutlass, hoe, rake, spade, watering can) and maintenance"
        ],
        "Crop Production & Husbandry (JSS 1-3)": [
          "Classification of crops based on life cycle (annuals, biennials, perennials) and uses (cereals, legumes, tubers, vegetables, fruits)",
          "Cultural practices: Pre-planting (land clearing, ploughing), Planting, and Post-planting (weeding, mulching, fertilizer application)",
          "Weeds and Pests: Common agricultural weeds, crop pests (weevils, grasshoppers), and simple control methods"
        ],
        "Animal Husbandry & Farm Records (JSS 1-3 / BECE)": [
          "Classification of farm animals: Ruminants (cattle, sheep, goats) vs. Non-ruminants (pigs, poultry, rabbits)",
          "Care and housing of farm animals",
          "Simple farm records: Production records, sales records, farm diary",
          "BECE Agricultural Science past question review"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Agricultural Ecology & Land Use (SSS 1)": [
          "Meaning of agricultural ecology and ecosystem components",
          "Land and its uses: Agricultural vs. Non-agricultural land, Land Use Act of Nigeria",
          "Environmental factors affecting agricultural production: Climatic factors (rainfall, temperature, light) and Biotic factors"
        ],
        "Rocks & Soil Science (SSS 1)": [
          "Rock formation: Igneous, Sedimentary, and Metamorphic rocks; Weathering of rocks",
          "Soil formation, soil profile, and composition of soil (mineral matter, organic matter, soil water, soil air, living organisms)",
          "Soil physical properties: Soil texture (sand, silt, clay), soil structure, and soil permeability",
          "Plant nutrients: Macro-nutrients (N, P, K, Ca, Mg, S) and Micro-nutrients (Fe, Zn, Cu, B, Mo); Fertilizer types and application methods"
        ],
        "Farm Power & Farm Mechanization (SSS 1)": [
          "Sources of farm power: Human, animal, mechanical, electrical, solar, and wind power",
          "Farm machinery: Tractors, bulldozers, ploughs, harrows, ridges, combine harvesters",
          "Advantages and disadvantages of agricultural mechanization in West Africa"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Animal Anatomy & Physiology (SSS 2)": [
          "Digestive system of ruminants (rumen, reticulum, omasum, abomasum) vs. non-ruminants (monogastric)",
          "Reproductive system in farm animals (mammals and poultry - egg formation process)",
          "Circulatory, respiratory, and nervous systems in livestock"
        ],
        "Livestock Nutrition & Management (SSS 2)": [
          "Animal feed types: Concentrates (energy and protein feeds), Roughages (hay, silage, fodder)",
          "Ration formulation: Maintenance ration vs. Production ration, Malnutrition diseases",
          "Livestock management practices: Cattle, Sheep, Goats, Pigs, and Poultry (broilers and layers)",
          "Pasture and Forage crops: Grasses, legumes, and rangeland improvement"
        ],
        "Crop Physiology & Forestry (SSS 2)": [
          "Crop propagation: Sexual (seeds) vs. Asexual / Vegetative (stem cuttings, grafting, budding, layering)",
          "Plant diseases: Fungal, bacterial, viral diseases (Cassava mosaic, Cocoa black pod, Maize rust) and control",
          "Forestry and Wildlife management: Forest reserves, economic trees, and wildlife conservation"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Agricultural Economics & Farm Management (SSS 3 / WAEC)": [
        "Principles of agricultural economics: Demand and supply of agricultural produce, price elasticity",
        "Factors of production in agriculture: Land, labour, capital, and management",
        "Farm management: Farm planning, farm budgeting, profit and loss account, balance sheet",
        "Agricultural marketing: Marketing channels, functions of middlemen, and commodity boards"
      ],
      "Agricultural Extension & Aquaculture (SSS 3 / WAEC)": [
        "Agricultural extension: Methods of extension teaching (individual, group, mass media), role of extension agents",
        "Fisheries and Aquaculture: Types of fish, establishment of fish ponds, feeding, harvesting, and preservation",
        "Apiculture (Beekeeping) and Snail farming (Heliculture)"
      ],
      "WAEC Agricultural Science Practical & Theory Masterclass": [
        "WAEC Paper 3 Specimen Identification: Rocks, soils, fertilizers, farm tools, animal feed ingredients, parasites (ticks, liver fluke)",
        "WAEC Paper 2 Theory scoring strategy: Structured descriptions, scientific terminology, and labeled sketches",
        "JAMB UTME Agricultural Science syllabus breakdown and past examination practice"
      ]
    };
  }

  // =========================================================================
  // 8. HOME ECONOMICS & FOOD/NUTRITION (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('home') || subj.includes('nutrition')) {
    if (isJSS1) {
      return {
        "Introduction to Home Economics (JSS 1)": [
          "Meaning, scope, and branches of Home Economics (Food & Nutrition, Clothing & Textiles, Home Management)",
          "Importance of Home Economics to the individual, family, and society",
          "Careers in Home Economics (dietetics, catering, fashion design, interior decor)"
        ],
        "Food, Nutrients & Healthy Habits (JSS 1)": [
          "Food and its classes: Carbohydrates, Proteins, Fats and Oils, Vitamins, Minerals, Water",
          "Sources, functions, and deficiency diseases (Kwashiorkor, Scurvy, Rickets, Beriberi)",
          "Healthy eating habits and importance of clean drinking water"
        ],
        "Kitchen Equipment & Safety (JSS 1)": [
          "Classification of kitchen tools: Large equipment (cooker, refrigerator) vs. Small tools (pots, knives, grater)",
          "Kitchen safety rules and hygiene: Avoiding burns, scalds, cuts, and food contamination",
          "First Aid for kitchen accidents"
        ],
        "Care of the Home & Family Living (JSS 1)": [
          "The Family: Nuclear and Extended family, roles and responsibilities of family members",
          "Cleaning materials and agents: Brooms, brushes, dusters, soaps, local abrasives (pawpaw leaf, fine sand, ash)",
          "Daily and weekly care of the living room and bedroom",
          "Proper disposal of household waste and drainage care"
        ],
        "Clothing & Sewing Basics (JSS 1)": [
          "Basic sewing kit: Needles, pins, tape measure, scissors, thimble, tailor's chalk",
          "Temporary stitches: Even tacking (basting), uneven tacking, diagonal tacking",
          "Permanent stitches: Running stitch, backstitch, hemming, overcast stitch",
          "Simple sewing practical: Making a pot holder, handkerchief, or simple apron"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Food Preparation & Cooking Methods (JSS 2)": [
          "Reasons for cooking food: Palatability, digestibility, safety, and shelf-life",
          "Moist heat cooking methods: Boiling, steaming, stewing, poaching",
          "Dry heat cooking methods: Baking, roasting, grilling, frying (shallow and deep frying)",
          "Preparation of simple balanced meals: Local Nigerian soups and dishes (Egusi, Ogbono, Jollof rice)"
        ],
        "Food Hygiene & Kitchen Organization (JSS 2)": [
          "Food spoilage and food poisoning: Causes (bacteria, moulds, enzymes) and symptoms",
          "Proper storage of perishable and non-perishable foods",
          "Kitchen layouts: U-shaped, L-shaped, straight line, and work triangle"
        ],
        "Household Care & Room Management (JSS 2)": [
          "Cleaning and maintenance of special household surfaces: Wood, metal, plastic, and glass",
          "Daily, weekly, and seasonal cleaning of the kitchen, bathroom, and toilet",
          "Pest control in the home: Mosquitoes, cockroaches, rats, and safe pest prevention"
        ],
        "Textiles, Fibres & Garment Construction (JSS 2)": [
          "Classification of textile fibres: Natural fibres (Cotton, Wool, Silk, Linen) vs. Synthetic fibres (Nylon, Polyester)",
          "Characteristics, burning tests, and uses of cotton and synthetic fabrics",
          "Seams in sewing: Plain seam, French seam, and flat felled (run-and-fell) seam",
          "Care of clothes: Washing, stain removal (tea, grease, ink), ironing, and storage"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Meal Planning for the Family (JSS 3 / BECE)": [
          "Principles of meal planning: Nutritional needs, family budget, likes/dislikes, season, age",
          "Planning meals for special groups: Toddlers, adolescents, manual workers, pregnant/lactating mothers, the elderly, and convalescents",
          "Table setting, table manners, and serving styles (buffet, family service, plate service)"
        ],
        "Food Preservation & Buying (JSS 3 / BECE)": [
          "Methods of food preservation: Sun drying, smoking, freezing, salting, canning, pasteurization",
          "Wise food buying: Bulk purchasing vs. retail buying, food marketing strategies",
          "Food labeling and expiry dates: Role of NAFDAC in food safety"
        ],
        "Family Resources & Budgeting (JSS 3 / BECE)": [
          "Family needs: Primary needs (food, clothing, shelter) vs. Secondary needs",
          "Family resources: Human resources (skills, energy, time) vs. Non-human / material resources (money, house, goods)",
          "Family budget: Meaning, importance, and steps in preparing a family budget",
          "Consumer education: Consumer rights, wise shopping guidelines, and redresses"
        ],
        "Garment Construction & Sewing Machine (JSS 3 / BECE)": [
          "Parts of the sewing machine, threading, operation, common faults, and maintenance",
          "Facings, bindings, darts, and gathering in garment making",
          "Fasteners in garment making: Zips, press studs, hooks and eyes, buttons and buttonholes",
          "Junior WAEC / BECE Home Economics past questions and practical project review"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Food Science & Nutrients Chemistry (SSS 1 / Food & Nutrition)": [
          "Detailed chemistry of Carbohydrates, Proteins, Lipids, Vitamins, Minerals, and Water",
          "Digestion, absorption, and metabolism of nutrients in the human body",
          "Scientific food tests: Starch (Iodine), Reducing sugars (Benedict's), Proteins (Biuret/Millon's), Lipids (Emulsion/Translucent)",
          "Kitchen laboratory planning, commercial equipment, and safety regulations"
        ],
        "Home Management Foundations (SSS 1)": [
          "Management process: Planning, organizing, implementing, controlling, and evaluating",
          "Family values, goals, standards, and their relationship with decision making",
          "Housing the family: House types, factors affecting choice of family housing (renting vs. building), house orientation"
        ],
        "Clothing & Textiles Technology (SSS 1)": [
          "Microscopic structure and chemical properties of textile fibres",
          "Yarn manufacturing and fabric construction methods: Weaving (warp and weft), Knitting, Non-woven felting",
          "Body measurements taking, metric sizing, and basic block pattern drafting"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Meal Management & Special Dietetics (SSS 2 / WASSCE)": [
          "Nutritional requirements across life cycle: Infancy, childhood, adolescence, pregnancy, lactation, old age",
          "Therapeutic diets: Low-sodium diets (hypertension), diabetic diets, low-cholesterol diets, high-fibre diets",
          "Flour confectionery: Batters and doughs; Raising agents (baking powder, yeast, steam, air)",
          "Pastry making: Shortcrust pastry, rough puff pastry, choux pastry, faults in pastry making"
        ],
        "Household Equipment & Interior Design (SSS 2)": [
          "Principles of interior decoration: Balance, rhythm, proportion, emphasis, and harmony",
          "Color schemes: Primary, secondary, complementary, and monochromatic schemes in rooms",
          "Household linen: Bed sheets, tablecloths, curtains, towels; Selection, laundering, and care",
          "Flower arrangement: Line, mass, triangular, and crescent arrangements"
        ],
        "Garment Construction Techniques (SSS 2)": [
          "Pattern adaptation, manipulation of darts into style lines (princess lines, gathers, tucks)",
          "Edge finishes: Collars (flat, rolled, stand collars), Sleeves (set-in, raglan, puff, kimonos), Cuffs and plackets",
          "Pockets: Patch pockets, in-seam pockets, welt pockets"
        ]
      };
    }

    // SSS 3 / WASSCE / NECO Examination Prep
    return {
      "Food Preservation, Packaging & Catering (SSS 3 / WAEC)": [
        "Industrial and home food preservation: Irradiation, freeze-drying, chemical preservatives, aseptic packaging",
        "Beverages: Alcoholic vs. Non-alcoholic; Hot beverages (tea, coffee, cocoa) and cold drinks",
        "Catering and entrepreneurship: Event catering, buffet catering, food costing, recipe standardization",
        "Food laws, NAFDAC standards, and international food hygiene guidelines (HACCP)"
      ],
      "Consumer Education & Estate Management (SSS 3 / WAEC)": [
        "Consumer legislation, consumer protection agencies (FCCPC, SON, NAFDAC, CPC)",
        "Consumer rights and responsibilities, consumer exploitation methods, and channels of redress",
        "Financial management: Banking services, insurance for home and property, investments, and wills"
      ],
      "WASSCE / NECO Practical Food & Nutrition Masterclass": [
        "WAEC Paper 3 Practical examination guidelines: 3-course meal preparation under 2.5 hours",
        "Time planning, order of work, shopping list, equipment requisition, and costing",
        "Table setting, tray service, garnishing, presentation, and examiner scoring criteria",
        "Comprehensive review of WASSCE Paper 1 (Objectives) and Paper 2 (Theory) past questions"
      ]
    };
  }

  // =========================================================================
  // 9. BUSINESS STUDIES (JSS 1 to SSS 3 / BECE Standard)
  // =========================================================================
  if (subj.includes('business stud')) {
    if (isJSS1) {
      return {
        "Introduction to Business Studies (JSS 1)": [
          "Meaning, objectives, and importance of Business Studies to the individual and nation",
          "Components of Business Studies: Office Practice, Commerce, Bookkeeping, Keyboarding, Computer Studies",
          "Career opportunities in Business Studies (Secretaries, Accountants, Bankers, Entrepreneurs)"
        ],
        "The Office & Clerical Staff (JSS 1)": [
          "Meaning of an office, types of offices (Open plan office vs. Closed/Private office)",
          "Departments in an organization: Administration, Accounts, Marketing, Personnel, Production",
          "Clerical staff: Qualities of a good clerk (punctuality, honesty, neatness, confidentiality), duties of office staff",
          "The Receptionist: Duties, personal qualities, receiving visitors, and keeping the visitors' book"
        ],
        "Commerce & Production (JSS 1)": [
          "Meaning and importance of Commerce",
          "Production: Meaning, types of production (Primary/Extractive, Secondary/Manufacturing, Tertiary/Services)",
          "Factors of production: Land (rent), Labour (wages), Capital (interest), Entrepreneur (profit)",
          "Division of labour and specialization: Advantages and disadvantages"
        ],
        "Introduction to Bookkeeping (JSS 1)": [
          "Meaning, importance, and historical development of Bookkeeping",
          "Principles of Double Entry bookkeeping: Debit the receiver, Credit the giver",
          "Source Documents: Meaning and uses of Receipts, Sales invoices, Purchases invoices, and Payment vouchers"
        ],
        "Keyboarding & Sitting Posture (JSS 1)": [
          "Meaning, importance, and uses of keyboarding / typing",
          "Parts of the computer keyboard: Alphanumeric keys, Function keys, Numeric keypad, Special keys",
          "Ergonomics: Proper sitting posture, hand position, and eye level at the keyboard"
        ]
      };
    }

    if (isJSS2) {
      return {
        "Office Correspondence & Filing (JSS 2)": [
          "Incoming and outgoing mail: Procedures for receiving, recording, and dispatching mail",
          "Mail handling books: Postage book, Dispatch book, Postage stamp register",
          "Filing: Meaning, importance, and classification systems (Alphabetical, Numerical, Chronological, Geographical, Subject)",
          "Filing equipment: Filing cabinets, box files, lever arch files, folders, index cards"
        ],
        "Trade & Buying/Selling Methods (JSS 2)": [
          "Trade: Meaning and divisions of trade (Home Trade vs. Foreign Trade)",
          "Home Trade: Wholesale trade (functions to manufacturer and retailer) and Retail trade",
          "Small-scale retailers (hawking, kiosks, roadside stalls) vs. Large-scale retailers (supermarkets, departmental stores, chain stores)",
          "Modern buying and selling: Cash trading, credit trading, hire purchase, online shopping"
        ],
        "Books of Original Entry & The Ledger (JSS 2)": [
          "Journals (Books of Prime Entry): Sales Day Book, Purchases Day Book, Returns Inwards Book, Returns Outwards Book",
          "The Ledger: Classification of accounts (Real, Personal, and Nominal accounts)",
          "Posting transactions from journals to ledgers and balancing accounts",
          "Two-Column Cash Book: Cash column and Bank column with contra entries"
        ],
        "Keyboarding: Home Keys & Technique (JSS 2)": [
          "Home keys: Finger placement on A S D F (left hand) and J K L ; (right hand)",
          "Typing alphanumeric keys, punctuation symbols, space bar, and shift keys",
          "Touch-typing drills to build finger memory, speed, and accuracy"
        ],
        "Consumer Education & Shopping Habits (JSS 2)": [
          "Consumer rights: Right to safety, right to be informed, right to choose, right to be heard",
          "Wise shopping habits: Making a shopping list, comparing prices, checking expiry dates, resisting impulse buying",
          "Need for consumer protection against fake goods, adulteration, and misleading advertisements"
        ]
      };
    }

    if (isJSS3) {
      return {
        "Office Procedures & Store Records (JSS 3 / BECE)": [
          "Store records: Meaning, importance, store requisition forms, bin cards, stock records",
          "Office meetings: Notice of meeting, agenda, quorum, presiding officer, minutes of meeting",
          "Modern office communication: Telephone etiquette, intercom, email, video conferencing",
          "Modern office machines: Photocopier, computer, scanner, laminating machine, paper shredder"
        ],
        "Aids to Trade & Foreign Commerce (JSS 3 / BECE)": [
          "Aids to Trade: Banking, Insurance, Transport (Road, Rail, Water, Air, Pipeline), Communication, Warehousing, Advertising",
          "Foreign Trade: Import trade, Export trade, and Entrepot trade; Documents used in foreign trade (Bill of Lading, Consular Invoice)",
          "Barriers to international trade: Tariffs, quotas, embargoes, and foreign exchange restrictions"
        ],
        "Advanced Bookkeeping & Simple Financial Accounts (JSS 3 / BECE)": [
          "Three-Column Cash Book: Cash, Bank, and Discount columns (Discount Allowed vs. Discount Received)",
          "Petty Cash Book: The Imprest System and Petty Cash Vouchers",
          "The Trial Balance: Meaning, rules of debit and credit, preparation, and extraction of trial balance",
          "Simple Final Accounts: Trading Account, Profit and Loss Account, and Balance Sheet"
        ],
        "Document Formatting & Typing Speed (JSS 3 / BECE)": [
          "Business document formatting: Business letters, memoranda (memos), envelopes, and tabulations",
          "Manuscript signs and proofreading symbols used in typing",
          "Speed and accuracy development: Typing at 30-40 words per minute (wpm)"
        ],
        "Consumer Protection & Entrepreneurship (JSS 3 / BECE)": [
          "Consumer protection agencies in Nigeria: FCCPC (Federal Competition & Consumer Protection Commission), NAFDAC, SON (Standards Organisation of Nigeria)",
          "Consumer redress: How to seek compensation for damaged or fake goods",
          "Entrepreneurship: Characteristics of an entrepreneur, self-employment opportunities, business planning, business ethics",
          "BECE Junior WAEC Business Studies past examination papers walkthrough"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Commercial Foundations & Business Environment (SSS 1)": [
          "Nature and scope of Commerce, historical development of commerce in Nigeria",
          "Occupations: Classification into industrial, commercial, and service occupations",
          "Business units: Sole proprietorship, Partnerships, Limited Liability Companies (Private and Public)",
          "Financing small business: Personal savings, trade credit, bank loans, and microfinance"
        ],
        "Commercial Documents & Contract Law (SSS 1)": [
          "Essential commercial documents: Quotation, order, proforma invoice, statement of account",
          "Terms of trade and payment: Cash with order (CWO), Cash on delivery (COD), trade discounts",
          "Law of Contract: Offer, acceptance, consideration, legality, and remedies for breach of contract"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Financial Institutions & Capital Markets (SSS 2)": [
          "Commercial banking operations, electronic banking (POS, USSD, ATM, Internet banking)",
          "The Central Bank of Nigeria (CBN) and regulatory functions",
          "The Nigerian Capital Market: The Nigerian Exchange (NGX), Securities and Exchange Commission (SEC), shares, debentures, bonds",
          "Insurance: Principles of insurance (Utmost good faith, Insurable interest, Indemnity, Subrogation, Proximate cause), types of policies"
        ],
        "Transportation & Warehousing (SSS 2)": [
          "Modes of transport: Advantages, disadvantages, and relative costs in Nigerian economy",
          "Warehousing: Types of warehouses (Bonded, Public, Private, Manufacturer's), importance in distribution"
        ]
      };
    }

    // SSS 3 / WAEC Commerce / Business Management
    return {
      "International Trade & Business Combinations (SSS 3 / WAEC)": [
        "International trade procedures, customs authorities, ports authority, export promotion council (NEPC)",
        "Business combinations: Mergers, acquisitions, holding companies, cartels, trusts",
        "Privatization, Commercialization, and Deregulation in Nigeria"
      ],
      "WAEC / NECO / JAMB Business Studies & Commerce Masterclass": [
        "Comprehensive past question walkthrough for WASSCE Commerce and Financial Accounting",
        "Speed techniques for JAMB CBT Commercial subjects",
        "Case studies in business management and entrepreneurship"
      ]
    };
  }

  // =========================================================================
  // 10. ECONOMICS (Senior Secondary SSS 1 to SSS 3 / WASSCE / NECO / JAMB)
  // =========================================================================
  if (!subj.includes('home') && !subj.includes('business stud') && (subj.includes('econ') || subj.includes('commer') || subj.includes('business'))) {
    if (isJunior) {
      return {
        "Foundations of Commerce & Economic Life (Junior Secondary)": [
          "Basic economic activities: Production, distribution, and consumption in Nigerian communities",
          "Needs vs. Wants, making wise choices, and scale of preference intro",
          "Introduction to trading, market places, and simple money transactions"
        ],
        "Everyday Business & Consumer Awareness (Junior Level)": [
          "Buying and selling in Nigerian markets: Wholesale, retail, and fair prices",
          "Consumer rights: Quality goods, checking expiry dates, and NAFDAC safety",
          "Saving and banking basics for junior secondary students"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Basic Economic Concepts (SSS 1)": [
          "Meaning of Economics, Scarcity, Choice, Scale of Preference, and Opportunity Cost",
          "Production Possibility Curve (PPC) and concept of efficiency",
          "Basic economic problems of society: What to produce, How to produce, For whom to produce",
          "Economic systems: Free market (Capitalism), Centrally planned (Socialism), and Mixed economy"
        ],
        "Theory of Demand and Supply (SSS 1)": [
          "Theory of Demand: Law of Demand, demand schedules, individual vs. market demand curves, determinants of demand",
          "Theory of Supply: Law of Supply, supply schedules, individual vs. market supply curves, determinants of supply",
          "Market Equilibrium: Interaction of demand and supply, equilibrium price and quantity",
          "Price Controls: Minimum price legislation (Price floor) and Maximum price legislation (Price ceiling)"
        ],
        "Theory of Production (SSS 1)": [
          "Factors of production: Land (rent), Labour (wages), Capital (interest), Entrepreneur (profit)",
          "Division of Labour and Specialization: Advantages, disadvantages, and limitations",
          "Short-run vs. Long-run production: Total Product (TP), Marginal Product (MP), Average Product (AP)",
          "The Law of Diminishing Returns"
        ],
        "Population & Labour Force (SSS 1)": [
          "Theories of population: Malthusian Population Theory and Demographic Transition Theory",
          "Population census in Nigeria, population growth rates, and age distribution",
          "Labour force and occupational distribution"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Elasticity of Demand & Supply (SSS 2)": [
          "Price Elasticity of Demand: Calculation (Percentage change method), degrees (elastic, inelastic, unitary, perfectly elastic/inelastic)",
          "Income Elasticity of Demand (normal, inferior, luxury goods) and Cross Elasticity (substitutes and complements)",
          "Price Elasticity of Supply: Determinants and calculations"
        ],
        "Theory of Consumer Behaviour & Utility (SSS 2)": [
          "Total Utility and Marginal Utility concepts",
          "The Law of Diminishing Marginal Utility and consumer equilibrium",
          "Indifference Curves, budget lines, and consumer choice"
        ],
        "Theory of Cost and Revenue (SSS 2)": [
          "Cost concepts: Fixed Cost (FC), Variable Cost (VC), Total Cost (TC), Average Cost (AC), Marginal Cost (MC)",
          "Short-run cost curves and their U-shapes",
          "Revenue concepts: Total Revenue (TR), Average Revenue (AR = Price), Marginal Revenue (MR)",
          "Market structures: Perfect Competition, Monopoly, Monopolistic Competition, Oligopoly"
        ],
        "Money & Banking (SSS 2)": [
          "Evolution of money, functions, and qualities of good money",
          "Commercial Banks: Functions, credit creation process",
          "Central Bank of Nigeria (CBN): Functions, banker to government, lender of last resort",
          "Monetary Policy tools: Cash Reserve Ratio, Monetary Policy Rate (MPR), Open Market Operations (OMO)"
        ],
        "National Income Accounting (SSS 2)": [
          "Gross Domestic Product (GDP), Gross National Product (GNP), Net National Product (NNP), Disposable Income",
          "Methods of measuring National Income: Output method, Income method, Expenditure method",
          "Problems in measuring National Income in developing nations"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Inflation, Deflation & Public Finance (SSS 3 / WAEC)": [
        "Inflation: Demand-pull inflation, Cost-push inflation, hyperinflation; Causes, effects, and control measures",
        "Deflation and its economic impacts",
        "Public Finance: Sources of government revenue (Direct taxes vs. Indirect taxes)",
        "Government expenditure (Recurrent vs. Capital)",
        "Government budget: Deficit, Surplus, Balanced budgets; Fiscal Policy"
      ],
      "International Trade & Balance of Payments (SSS 3 / WAEC)": [
        "Theories of International Trade: Absolute Advantage (Adam Smith) vs. Comparative Advantage (David Ricardo)",
        "Terms of Trade, Balance of Trade, and Balance of Payments (Current account, Capital account)",
        "Measures to correct balance of payments deficits: Tariffs, quotas, subsidies, devaluation",
        "Foreign exchange market: Fixed vs. Floating exchange rates in Nigeria"
      ],
      "Economic Growth, Development & Integration (SSS 3 / JAMB)": [
        "Economic growth vs. Economic development; Indices of economic development (HDI, per capita income)",
        "Characteristics of developing nations and challenges of the Nigerian petroleum economy",
        "Economic Integration in West Africa: ECOWAS, African Continental Free Trade Area (AfCFTA), AU, WTO, IMF, World Bank"
      ],
      "WASSCE / NECO / JAMB Economics Examination Masterclass": [
        "WAEC Paper 1 (Objectives) calculation tricks: Elasticity, national income, costs, and utility",
        "WAEC Paper 2 (Theory & Data Response): Interpreting tables, graphs, and structured economic analysis",
        "JAMB UTME Economics syllabus mastery and high-scoring strategies"
      ]
    };
  }

  // =========================================================================
  // 9. GOVERNMENT, CIVIC EDUCATION & SOCIAL STUDIES (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('gov') || subj.includes('civic') || subj.includes('social')) {
    if (isJunior) {
      return {
        "National Values & Citizenship (JSS 1-3)": [
          "Meaning of Civic Education, National values: Honesty, Integrity, Discipline, Courage, Patriotism",
          "Rights and responsibilities of Nigerian citizens under the Constitution",
          "Obligations of government to citizens: Security, infrastructure, education, healthcare"
        ],
        "Democratic Institutions & Rule of Law (JSS 1-3)": [
          "Meaning of Democracy, pillars of democracy: Constitution, Arms of Government, Political Parties, Free Press",
          "The Rule of Law: Equality before the law, fundamental human rights",
          "Elections and voting in Nigeria: Role of the Independent National Electoral Commission (INEC)"
        ],
        "Social Issues & Community Safety (JSS 1-3 / BECE)": [
          "Drug abuse: Causes, consequences, and prevention (Role of NDLEA)",
          "Human trafficking and child abuse: Dangers and rehabilitation (Role of NAPTIP)",
          "Peace and conflict resolution in Nigerian communities",
          "BECE Civic Education and Social Studies past question revision"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Basic Concepts of Government (SSS 1)": [
          "Meaning of Government as an institution, process, and academic discipline",
          "Fundamental concepts: Power, Authority, Legitimacy, Sovereignty",
          "Rule of Law: Principles (Dicey's formulation), limitations, and safeguards",
          "Fundamental Human Rights: Civil, political, economic, social rights, and limitations"
        ],
        "Forms & Systems of Government (SSS 1)": [
          "Forms of government: Monarchy, Republican, Aristocracy, Totalitarianism",
          "Systems of government: Unitary system vs. Federal system (features, merits, demerits)",
          "Presidential system of government (separation of powers) vs. Parliamentary system of government (collective responsibility)"
        ],
        "Arms of Government (SSS 1)": [
          "The Legislature: Functions, Unicameral vs. Bicameral legislature, legislative process (bills to laws)",
          "The Executive: Powers, functions, cabinet system",
          "The Judiciary: Structure of courts in Nigeria, judicial review, independence of the judiciary"
        ],
        "Constitutions & Constitutionalism (SSS 1)": [
          "Meaning and sources of constitutions (Conventions, Customs, Decrees, Statutes)",
          "Written vs. Unwritten constitutions; Rigid vs. Flexible constitutions"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Political Parties, Elections & Pressure Groups (SSS 2)": [
          "Political Parties: Functions, organization, party manifestos",
          "Party Systems: One-party, Two-party, and Multi-party systems (merits and demerits)",
          "Electoral Systems: Universal Adult Suffrage, First-Past-The-Post (Simple Majority), Proportional Representation, Absolute Majority",
          "Conduct of elections: Voter registration, electoral offences, role of INEC",
          "Pressure Groups: Types, techniques of operation, differences from political parties",
          "Public Opinion: Formation, measurement, and importance in governance"
        ],
        "Civil Service & Local Government Administration (SSS 2)": [
          "Civil Service: Structure, characteristics (Permanence, Neutrality, Anonymity), functions and problems",
          "Public Corporations: Characteristics, differences from civil service, privatization and commercialization",
          "Local Government Administration: Evolution in Nigeria (1976 Local Government Reforms), functions, sources of revenue, and autonomy challenges"
        ],
        "Pre-Colonial Political Systems in Nigeria (SSS 2)": [
          "The Hausa-Fulani Emirate system (Centralized, Emir, Waziri, Madawaki)",
          "The Yoruba Oyo Empire (Checks and balances: Alaafin, Oyomesi, Ogboni, Bashorun)",
          "The Igbo Segmentary System (Decentralized, Village Assembly, Ofo title holders, Age grades)"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Colonial & Constitutional History of Nigeria (SSS 3 / WAEC)": [
        "British Colonial Administration: Indirect Rule policy in Northern, Western, and Eastern Nigeria",
        "Nationalist movements in Nigeria: Leaders (Herbert Macaulay, Nnamdi Azikiwe, Obafemi Awolowo, Ahmadu Bello), newspapers, and protests",
        "Constitutional developments: Clifford (1922), Richards (1946), Macpherson (1951), Lyttelton (1954), Independence (1960), Republican (1963)",
        "The 1979 and 1999 Constitutions of the Federal Republic of Nigeria"
      ],
      "Federalism & Post-Independence Politics (SSS 3 / WAEC)": [
        "Development of Nigerian Federalism: Revenue allocation commissions, State creation exercises, Federal Character Principle",
        "Military Rule in Nigeria: Causes of military intervention (1966 coups), structure of military administration, impact on federalism",
        "The Nigerian Civil War (1967-1970) causes, events, and lessons in national unity"
      ],
      "Foreign Policy & International Organizations (SSS 3 / JAMB)": [
        "Nigeria's Foreign Policy: Basic principles (Afrocentric policy, Non-alignment, Sovereign equality of states)",
        "International Organizations: ECOWAS (origin, organs, achievements, challenges)",
        "African Union (AU) and African development initiatives",
        "Commonwealth of Nations, United Nations Organization (UNO), Organization of Petroleum Exporting Countries (OPEC)"
      ],
      "WASSCE / NECO / JAMB Government Examination Masterclass": [
        "WAEC Paper 1 (Objectives) high-scoring strategies",
        "WAEC Paper 2 (Theory) structured analytical essay writing and historical facts presentation",
        "JAMB UTME Government past question walkthroughs and high-frequency topics"
      ]
    };
  }

  // =========================================================================
  // 10. LITERATURE IN ENGLISH (JSS 1 to SSS 3)
  // =========================================================================
  if (subj.includes('literature')) {
    if (isJunior) {
      return {
        "Introduction to Literature (JSS 1-3)": [
          "Meaning of Literature, functions: Entertainment, education, preservation of culture",
          "The Three Genres of Literature: Prose (fiction vs. non-fiction), Drama (playwright, script, stage), Poetry (stanzas, rhythm)",
          "Elements of Prose: Plot, setting, characterization, theme, narrative point of view"
        ],
        "Literary Devices & Figures of Speech (JSS 1-3)": [
          "Simile (comparisons with 'like' or 'as') and Metaphor (direct comparisons)",
          "Personification, Hyperbole (exaggeration), Onomatopoeia (sound words)",
          "Alliteration and Assonance; Rhyme and Rhythm in simple poems"
        ],
        "Recommended Junior African Literature (JSS 1-3 / BECE)": [
          "Reading and studying prescribed Junior African novels and short stories",
          "Reading and dramatizing selected Junior African plays",
          "Understanding moral lessons and character actions",
          "BECE Literature-in-English past question review"
        ]
      };
    }

    if (isSSS1) {
      return {
        "Literary Appreciation & Critical Terminology (SSS 1)": [
          "Detailed study of Literary Genres: Prose, Drama, Poetry",
          "Dramatic terms: Aside, Soliloquy, Dramatic Irony, Catharsis, Hubris, Tragic Flaw, Prologue, Epilogue",
          "Poetic forms: Sonnet (Petrarchan, Shakespearean), Ode, Elegy, Ballad, Epic, Lyric, Free verse",
          "Figures of Speech: Irony, Paradox, Oxymoron, Euphemism, Litotes, Metonymy, Synecdoche, Apostrophe"
        ],
        "African Prose & Drama Foundations (SSS 1)": [
          "Analysis of prescribed WAEC African prose text: Plot summary, background, thematic concerns",
          "Character analysis: Protagonist, antagonist, minor characters, character development",
          "Analysis of prescribed WAEC African drama: Conflict, dramatic climax, stage directions"
        ],
        "Poetic Analysis Techniques (SSS 1)": [
          "How to read and analyze poems: Subject matter, tone, mood, rhyme scheme, meter, imagery",
          "Analyzing selected African poems from the harmonized WAEC syllabus"
        ]
      };
    }

    if (isSSS2) {
      return {
        "Non-African Prose & Shakespearean Drama (SSS 2)": [
          "In-depth analysis of prescribed WAEC Non-African prose text: Context, themes, narrative style",
          "Shakespearean Drama: In-depth study of the prescribed tragedy or comedy",
          "Themes in Shakespeare: Ambition, betrayal, fate, love, supernatural elements",
          "Language and poetic devices in Shakespeare: Blank verse, rhyming couplets, soliloquies"
        ],
        "Non-African Poetry Analysis (SSS 2)": [
          "Study of prescribed WAEC Non-African poems",
          "Contextual background: Romantic, Victorian, or Modernist periods",
          "Exploring themes: Nature, mortality, industrialization, identity, warfare"
        ],
        "Unseen Prose & Poetry Appreciation (SSS 2)": [
          "Strategies for tackling unseen poetry in examinations",
          "Strategies for analyzing unseen prose extracts: Inferring tone, style, and figurative language"
        ]
      };
    }

    // SSS 3 / WAEC / NECO / JAMB Prep
    return {
      "Harmonized WASSCE / NECO Literature Prescribed Texts": [
        "African Prose: Complete textual analysis, themes, motifs, and essay question answering",
        "Non-African Prose: Character studies, socio-historical context, and structural analysis",
        "African Drama: Stagecraft, cultural themes, role of ritual and music in African theater",
        "Non-African Drama / Shakespeare: Comprehensive act-by-act quotation analysis and essay questions"
      ],
      "WAEC Poetry Masterclass (African & Non-African)": [
        "Mastering all 12 prescribed African and Non-African poems in the WAEC syllabus",
        "Stanza-by-stanza thematic breakdowns, diction analysis, and poetic devices"
      ],
      "Unseen Prose & Poetry Examination Techniques (Paper 1 & 2)": [
        "Answering WAEC Paper 1 (Objective questions on literary devices and unseen passages)",
        "Answering WAEC Paper 2, 3 & 4 (Drama, Prose, and Poetry essays) to achieve A1 grades",
        "JAMB UTME Literature-in-English past question walkthroughs"
      ]
    };
  }

  // =========================================================================
  // 11. DEFAULT HIGH SCHOOL / SECONDARY TOPICS GENERATOR
  // =========================================================================
  if (isJunior) {
    return {
      [`Foundational ${subject} (Junior Secondary / JSS 1-3)`]: [
        `Introduction to ${subject} concepts suitable for junior secondary students`,
        `Core terms, definitions, and simple real-world examples`,
        `Basic principles, diagrams, and step-by-step illustrations`
      ],
      [`Applied Everyday ${subject} (Junior Level)`]: [
        `Practical classroom activities and everyday Nigerian applications`,
        `Guided problem-solving steps with clear explanations`,
        `Understanding key rules and foundational concepts`
      ],
      [`BECE / Junior WAEC Examination Preparation (${subject})`]: [
        `Junior WAEC / BECE question breakdown and review`,
        `Practice questions with step-by-step answers and explanations`,
        `Quick summary notes and study tips for junior students`
      ]
    };
  }

  // Senior Secondary default
  return {
    [`Core Syllabus Principles of ${subject} (${isSSS1 ? 'SSS 1' : isSSS2 ? 'SSS 2' : 'SSS 3 / WAEC'})`]: [
      `Fundamental laws, theorems, and definitions aligned to national Senior Secondary syllabus`,
      `Key formulas, theoretical derivations, and standard terminology`,
      `Step-by-step problem-solving methods matching WAEC/NECO marking standards`
    ],
    [`Intermediate & Applied ${subject} (Senior Secondary)`]: [
      `System dynamics, experimental procedures, and practical applications`,
      `Graphical analysis, data interpretation, and case studies`,
      `Comparative analysis of key concepts and standard exam models`
    ],
    [`WASSCE / NECO / JAMB Examination Masterclass (${subject})`]: [
      `High-frequency past exam questions with complete step-by-step solutions`,
      `Common marking scheme pitfalls and examiner expectations`,
      `Objective paper speed techniques and theory presentation masterclass`
    ]
  };
};
