import { Subject } from '../types';
import { getSciencesCatalog } from './catalogs/sciencesCatalog';
import { getBusinessCatalog } from './catalogs/businessCatalog';
import { getEngineeringCatalog } from './catalogs/engineeringCatalog';
import { getSocialSciencesCatalog } from './catalogs/socialSciencesCatalog';
import { getHumanitiesCatalog } from './catalogs/humanitiesCatalog';
import { getLanguagesCatalog } from './catalogs/languagesCatalog';
import { getHealthCatalog } from './catalogs/healthCatalog';

export interface CourseModule {
  moduleNumber: number;
  title: string;
  subtopics: string[];
}

export interface UniversityCourse {
  code: string; // e.g. "MTH 101"
  title: string; // e.g. "Elementary Mathematics I"
  units: number; // e.g. 3 (Credit Units)
  status: 'Compulsory' | 'Required' | 'General Studies' | 'Elective';
  faculty: string;
  department: string;
  description: string;
  modules: CourseModule[];
}

export interface SemesterCourses {
  semesterName: string; // e.g. "First Semester (Harmattan / Alpha)"
  totalUnits: number;
  courses: UniversityCourse[];
}

export interface LevelCurriculum {
  levelName: string; // e.g. "100 Level (Year 1 / Freshers)"
  semesters: {
    [semesterKey: string]: SemesterCourses;
  };
}

export interface UniversitySubjectCatalog {
  subject: Subject;
  faculty: string;
  department: string;
  degreeName: string; // e.g. "B.Sc. Mathematics", "LL.B. Law", "MBBS Medicine & Surgery", "B.Eng. Mechatronics"
  levels: {
    [levelKey: string]: LevelCurriculum;
  };
}

// Helper to calculate total semester units
const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

/**
 * Standard General Studies (GST / GNS) courses required across Nigerian and international universities
 */
const GST_111: UniversityCourse = {
  code: 'GST 111',
  title: 'Communication in English & Academic Writing',
  units: 2,
  status: 'General Studies',
  faculty: 'Directorate of General Studies',
  department: 'General Studies',
  description: 'Effective communication in English, logical reasoning, note-taking, essay writing, comprehension, and academic syntax.',
  modules: [
    {
      moduleNumber: 1,
      title: 'Grammar and Sentence Mechanics',
      subtopics: ['Parts of Speech & Grammatical Concord', 'Sentence Types & Clause Analysis', 'Tenses, Active & Passive Voice', 'Common Errors & Dangling Modifiers']
    },
    {
      moduleNumber: 2,
      title: 'Reading, Note-taking and Summarization',
      subtopics: ['Skimming, Scanning & Intensive Reading', 'Note-Taking and Note-Making Techniques', 'Précis and Summary Writing', 'Critical Reading and Interpretation']
    },
    {
      moduleNumber: 3,
      title: 'Academic Writing & Research Essays',
      subtopics: ['Paragraph Development & Cohesion', 'Expository, Argumentative & Narrative Essays', 'Referencing Styles (APA 7th, Harvard, MLA)', 'Plagiarism and Academic Integrity']
    }
  ]
};

const GST_112: UniversityCourse = {
  code: 'GST 112',
  title: 'Nigerian Peoples and Culture',
  units: 2,
  status: 'General Studies',
  faculty: 'Directorate of General Studies',
  department: 'General Studies',
  description: 'Study of Nigerian history, ethnic groups, cultural heritage, socio-economic evolution, and national integration.',
  modules: [
    {
      moduleNumber: 1,
      title: 'Historical Evolution of Nigeria',
      subtopics: ['Pre-Colonial Societies and Empires (Nok, Benin, Kanem-Borno, Oyo, Caliphate)', 'Colonial Rule and the 1914 Amalgamation', 'Constitutional Development & Independence (1960)']
    },
    {
      moduleNumber: 2,
      title: 'Culture and Social Values',
      subtopics: ['Concept of Culture, Norms and Values in Nigeria', 'Indigenous Knowledge Systems and Taboos', 'Family Structures and Chieftaincy Systems']
    },
    {
      moduleNumber: 3,
      title: 'National Unity & Contemporary Challenges',
      subtopics: ['Ethnic Diversity, Federal Character & Integration', 'Inter-Ethnic Conflict Resolution Mechanisms', 'Youths, Moral Re-orientation & Sustainable Nation Building']
    }
  ]
};

const GST_121: UniversityCourse = {
  code: 'GST 121',
  title: 'Use of Library, Study Skills & ICT',
  units: 2,
  status: 'General Studies',
  faculty: 'Directorate of General Studies',
  department: 'General Studies',
  description: 'Library systems, cataloguing, digital research tools, e-learning resources, and fundamental ICT applications.',
  modules: [
    {
      moduleNumber: 1,
      title: 'Library Systems & Research Tools',
      subtopics: ['Organization of Libraries & Classification Schemes (Dewey Decimal, Library of Congress)', 'OPAC (Online Public Access Catalogue) and Indexing', 'Primary, Secondary and Tertiary Information Sources']
    },
    {
      moduleNumber: 2,
      title: 'Digital Literacies & Database Searching',
      subtopics: ['Academic Search Engines & Databases (JSTOR, ScienceDirect, PubMed, Google Scholar)', 'Boolean Operators & Search Strategies', 'E-Books, Open Access Repositories and Citation Managers']
    },
    {
      moduleNumber: 3,
      title: 'Study Skills & Examination Strategies',
      subtopics: ['Time Management & SQ3R Study Method', 'Memory Retention and Mnemonics', 'Preparing for and Answering University Examinations']
    }
  ]
};

const GST_222: UniversityCourse = {
  code: 'GST 222',
  title: 'Peace Studies and Conflict Resolution',
  units: 2,
  status: 'General Studies',
  faculty: 'Directorate of General Studies',
  department: 'General Studies',
  description: 'Theories of peace, conflict analysis, mediation, negotiation, and early warning peace-building strategies.',
  modules: [
    {
      moduleNumber: 1,
      title: 'Foundations of Peace and Conflict',
      subtopics: ['Definitions of Peace, Positive vs. Negative Peace', 'Root Causes & Typologies of Conflicts', 'Theories of Aggression & Social Conflict']
    },
    {
      moduleNumber: 2,
      title: 'Conflict Management and Resolution',
      subtopics: ['Alternative Dispute Resolution (ADR)', 'Mediation, Arbitration, Conciliation & Negotiation', 'Traditional African Conflict Resolution Models']
    },
    {
      moduleNumber: 3,
      title: 'Peace Building and Human Rights',
      subtopics: ['Early Warning Signs and Crisis De-escalation', 'International Humanitarian Law and Human Rights', 'Post-Conflict Reconstruction and Reconciliation']
    }
  ]
};

const GST_223: UniversityCourse = {
  code: 'GST 223',
  title: 'Entrepreneurship and Innovation',
  units: 2,
  status: 'General Studies',
  faculty: 'Directorate of General Studies',
  department: 'General Studies',
  description: 'Entrepreneurial mindset, business opportunity recognition, feasibility studies, venture creation, and startup finance.',
  modules: [
    {
      moduleNumber: 1,
      title: 'Entrepreneurial Mindset & Ideation',
      subtopics: ['Concept and Characteristics of an Entrepreneur', 'Opportunity Recognition and Idea Generation', 'Design Thinking and Product Innovation']
    },
    {
      moduleNumber: 2,
      title: 'Business Planning and Feasibility',
      subtopics: ['Writing a Bankable Business Plan', 'Market Research & Competitive Analysis', 'Financial Forecasting & Break-Even Analysis']
    },
    {
      moduleNumber: 3,
      title: 'Venture Capital, Marketing and Legal Aspects',
      subtopics: ['Sources of Startup Capital & Angel Investors', 'Digital Marketing & Sales Strategies', 'Business Registration (CAC), Patents & Intellectual Property']
    }
  ]
};

// --- SUBJECT SPECIFIC CATALOG BUILDERS ---

export const getUniversityCatalogForSubject = (subject: Subject): UniversitySubjectCatalog => {
  const subjStr = (subject || '').toString().toLowerCase();

  // Check Modular Subject Catalogs first
  const healthCatalog = getHealthCatalog(subject);
  if (healthCatalog) return healthCatalog;

  const engCatalog = getEngineeringCatalog(subject);
  if (engCatalog) return engCatalog;

  const scienceCatalog = getSciencesCatalog(subject);
  if (scienceCatalog) return scienceCatalog;

  const businessCatalog = getBusinessCatalog(subject);
  if (businessCatalog) return businessCatalog;

  const socialScienceCatalog = getSocialSciencesCatalog(subject);
  if (socialScienceCatalog) return socialScienceCatalog;

  const humanitiesCatalog = getHumanitiesCatalog(subject);
  if (humanitiesCatalog) return humanitiesCatalog;

  const langCatalog = getLanguagesCatalog(subject);
  if (langCatalog) return langCatalog;

  // 1. MATHEMATICS
  if (subjStr.includes('math') || subjStr.includes('further math')) {
    return {
      subject,
      faculty: 'Faculty of Science',
      department: 'Department of Mathematics',
      degreeName: 'B.Sc. (Hons) Mathematics',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MTH 101',
                title: 'Elementary Mathematics I (Algebra, Trigonometry & Coordinate Geometry)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Real number system, sets and mappings, quadratic equations, surds, mathematical induction, binomial theorem, trigonometric functions, circular functions, and coordinate geometry of straight lines and circles.',
                modules: [
                  { moduleNumber: 1, title: 'Sets, Numbers & Theory of Equations', subtopics: ['Real Numbers & Axioms', 'Set Theory, Venn Diagrams & Mappings', 'Quadratic Equations, Surds & Logarithms', 'Principle of Mathematical Induction'] },
                  { moduleNumber: 2, title: 'Sequences, Series & Binomial Theorem', subtopics: ['Arithmetic & Geometric Progressions (AP/GP)', 'Infinite Series and Convergence Tests', 'Binomial Theorem for Any Rational Index', 'Partial Fractions Decomposition'] },
                  { moduleNumber: 3, title: 'Trigonometry & Coordinate Geometry', subtopics: ['Trigonometric Ratios and Compound Angles', 'Inverse Trigonometric & Hyperbolic Functions', 'Distance Formula, Slopes & Lines', 'Equations of Circles, Tangents & Normals'] }
                ]
              },
              {
                code: 'MTH 103',
                title: 'Vectors and Elementary Mechanics',
                units: 2,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Vector algebra, scalar and vector products, coplanar forces, equilibrium of particles, moments, kinematics of straight line motion, and projectile dynamics.',
                modules: [
                  { moduleNumber: 1, title: 'Vector Algebra in 2D and 3D', subtopics: ['Vector Addition, Subtraction & Unit Vectors', 'Dot (Scalar) Product and Direction Cosines', 'Cross (Vector) Product and Triple Products', 'Vector Equations of Lines and Planes'] },
                  { moduleNumber: 2, title: 'Statics and Equilibrium', subtopics: ['Composition and Resolution of Forces', 'Lami\'s Theorem and Moments', 'Couples, Center of Gravity & Stability'] },
                  { moduleNumber: 3, title: 'Dynamics and Kinematics', subtopics: ['Equations of Motion under Constant Acceleration', 'Projectiles on Horizontal and Inclined Planes', 'Newton\'s Laws of Motion, Friction and Momentum'] }
                ]
              },
              {
                code: 'PHY 101',
                title: 'General Physics I (Mechanics, Thermal Physics & Waves)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Units and dimensions, vectors, kinematics, circular motion, gravitation, elasticity, fluid dynamics, heat, thermodynamics, and wave phenomena.',
                modules: [
                  { moduleNumber: 1, title: 'Mechanics and Properties of Matter', subtopics: ['Dimensional Analysis & Errors', 'Conservation of Linear & Angular Momentum', 'Newton\'s Law of Gravitation & Planetary Motion', 'Hooke\'s Law, Young\'s Modulus & Surface Tension'] },
                  { moduleNumber: 2, title: 'Thermal Physics and Kinetic Theory', subtopics: ['Thermometry & Thermal Expansion', 'First and Second Laws of Thermodynamics', 'Carnot Engine & Entropy', 'Kinetic Theory of Gases & Gas Laws'] },
                  { moduleNumber: 3, title: 'Waves, Oscillations and Sound', subtopics: ['Simple Harmonic Motion (SHM)', 'Damped and Forced Oscillations', 'Wave Equation, Superposition & Standing Waves', 'Doppler Effect and Resonance'] }
                ]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I (Physical and Inorganic Chemistry)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Atomic structure, quantum numbers, periodic table trends, chemical bonding, stoichiometry, gas laws, chemical equilibria, and ionic equilibria.',
                modules: [
                  { moduleNumber: 1, title: 'Atomic Structure and Periodicity', subtopics: ['Bohr\'s Theory & Quantum Numbers', 'Electronic Configuration (Aufbau, Pauli, Hund)', 'Periodic Table Trends (IE, EA, Electronegativity)', 'Nuclear Chemistry and Radioactivity'] },
                  { moduleNumber: 2, title: 'Chemical Bonding and States of Matter', subtopics: ['Ionic, Covalent, Coordinate & Hydrogen Bonds', 'VSEPR Theory & Molecular Geometry', 'Ideal and Real Gases (Van der Waals Equation)', 'Solutions, Solubility Product & Colloids'] },
                  { moduleNumber: 3, title: 'Chemical Kinetics, Equilibria & Energetics', subtopics: ['Thermochemistry (Hess\'s Law & Enthalpy)', 'Chemical Equilibrium & Le Chatelier\'s Principle', 'Acids, Bases, pH, Buffers & Titrations', 'Reaction Rates & Activation Energy'] }
                ]
              },
              {
                code: 'CSC 101',
                title: 'Introduction to Computer Science & Problem Solving',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Computer Science',
                description: 'History of computers, hardware/software components, number systems, algorithm design, flowcharts, and basic programming concepts.',
                modules: [
                  { moduleNumber: 1, title: 'Computer Architecture & Systems', subtopics: ['Evolution of Computers & Microprocessors', 'CPU, ALU, Control Unit, Registers & Memory', 'Number Systems (Binary, Octal, Hexadecimal conversions)', 'Operating Systems Overview'] },
                  { moduleNumber: 2, title: 'Algorithms and Computational Logic', subtopics: ['Problem Formulation and Step-by-Step Logic', 'Flowcharts and Pseudocode Construction', 'Structured Programming Control Structures (Sequence, Selection, Iteration)'] },
                  { moduleNumber: 3, title: 'Introductory Programming in Python / C', subtopics: ['Variables, Data Types and Operators', 'Conditionals (if-elif-else) and Loops (for, while)', 'Functions, Scope and Modularity', 'Arrays / Lists and Basic File Operations'] }
                ]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'MTH 102',
                title: 'Elementary Mathematics II (Calculus & Differential Equations)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Functions of a real variable, limits, continuity, differentiation techniques, curve sketching, integration techniques, definite integrals, area, volume, and introduction to first-order differential equations.',
                modules: [
                  { moduleNumber: 1, title: 'Limits, Continuity and Differentiation', subtopics: ['Formal Definition of Limits (Epsilon-Delta intuition)', 'Continuity and Intermediate Value Theorem', 'Derivatives from First Principles', 'Product, Quotient, Chain Rule & Implicit Differentiation'] },
                  { moduleNumber: 2, title: 'Applications of Derivatives', subtopics: ['Tangents and Normals to Curves', 'Maxima, Minima, Points of Inflection & Optimization', 'Related Rates and Mean Value Theorem', 'Taylor and Maclaurin Series Expansions'] },
                  { moduleNumber: 3, title: 'Integration Techniques and Applications', subtopics: ['Indefinite Integrals & Fundamental Theorem of Calculus', 'Integration by Substitution, Parts & Partial Fractions', 'Definite Integrals, Areas under Curves & Volumes of Revolution', 'Separable First-Order Ordinary Differential Equations'] }
                ]
              },
              {
                code: 'PHY 102',
                title: 'General Physics II (Electricity, Magnetism and Modern Physics)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Electrostatics, Coulomb\'s law, electric potential, Gauss\'s law, capacitors, electric currents, Ohm\'s law, magnetic fields, Biot-Savart law, Ampere\'s law, electromagnetic induction, Faraday\'s law, and introductory modern physics.',
                modules: [
                  { moduleNumber: 1, title: 'Electrostatics and Dielectrics', subtopics: ['Coulomb\'s Law and Superposition of Charges', 'Electric Field Strength and Potential', 'Gauss\'s Law and Applications', 'Capacitance, Dielectrics and Energy Storage'] },
                  { moduleNumber: 2, title: 'Current Electricity and Magnetism', subtopics: ['Ohm\'s Law, Resistivity and Kirchhoff\'s Rules', 'Magnetic Fields, Lorentz Force on Charges & Wires', 'Biot-Savart Law and Ampere\'s Circuital Law', 'Faraday\'s Law of Induction & Lenz\'s Law'] },
                  { moduleNumber: 3, title: 'AC Circuits and Modern Physics', subtopics: ['Alternating Current, RLC Resonance & Power Factor', 'Electromagnetic Spectrum and Maxwell\'s Equations', 'Photoelectric Effect and Wave-Particle Duality', 'X-rays, Radioactivity & Nuclear Fission/Fusion'] }
                ]
              },
              {
                code: 'CHM 102',
                title: 'General Chemistry II (Organic and Applied Chemistry)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Hybridization, functional groups, nomenclature (IUPAC), reaction mechanisms of alkanes, alkenes, alkynes, alcohols, alkyl halides, carbonyls, and carboxylic acids.',
                modules: [
                  { moduleNumber: 1, title: 'Foundations of Organic Chemistry', subtopics: ['Carbon Hybridization (sp³, sp², sp)', 'IUPAC Nomenclature & Functional Groups', 'Isomerism (Structural, Geometric & Optical)', 'Inductive, Mesomeric and Steric Effects'] },
                  { moduleNumber: 2, title: 'Hydrocarbons and Reaction Mechanisms', subtopics: ['Alkanes (Free Radical Halogenation)', 'Alkenes (Electrophilic Addition, Markovnikov Rule)', 'Alkynes (Acidity and Hydrogenation)', 'Aromatic Hydrocarbons (Benzene & Electrophilic Substitution)'] },
                  { moduleNumber: 3, title: 'Oxygen and Nitrogen Derivatives', subtopics: ['Alcohols, Phenols & Ethers (Preparation & Oxidation)', 'Aldehydes and Ketones (Nucleophilic Addition)', 'Carboxylic Acids and Esterification', 'Amines, Amides and Amino Acids Basics'] }
                ]
              },
              {
                code: 'CSC 102',
                title: 'Structured Programming Logic & Data Representation',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Computer Science',
                description: 'Structured programming techniques, multidimensional arrays, string manipulation, file processing, recursion, and algorithm efficiency.',
                modules: [
                  { moduleNumber: 1, title: 'Arrays and Data Collections', subtopics: ['1D and 2D Arrays Matrix Operations', 'Strings and Regular Expressions', 'Structures and Record Data Types', 'Pointers and Memory Addressing Basics'] },
                  { moduleNumber: 2, title: 'Recursion and File Handling', subtopics: ['Recursive Thinking and Base Cases', 'Factorials, Fibonacci and Tower of Hanoi', 'Sequential and Random File Input/Output', 'Error Handling and Exception Management'] },
                  { moduleNumber: 3, title: 'Fundamental Algorithms', subtopics: ['Linear Search vs. Binary Search', 'Bubble, Insertion and Selection Sorting', 'Algorithmic Complexity & Big-O Notation Intro'] }
                ]
              },
              GST_112
            ])
          }
        },
        '200 Level': {
          levelName: '200 Level (Year 2 / Sophomores)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MTH 201',
                title: 'Mathematical Methods I (Advanced Calculus & Vector Analysis)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Partial derivatives, directional derivatives, gradient, divergence, curl, line integrals, surface integrals, Green\'s theorem, Stokes\' theorem, and divergence theorem.',
                modules: [
                  { moduleNumber: 1, title: 'Multivariable Calculus', subtopics: ['Functions of Several Variables & Limits', 'Partial Differentiation, Total Differentials & Chain Rule', 'Directional Derivatives & Gradient Vector', 'Tangent Planes, Normals & Lagrange Multipliers'] },
                  { moduleNumber: 2, title: 'Vector Differential Operators', subtopics: ['Gradient, Divergence and Curl in Cartesian & Curvilinear Coordinates', 'Vector Identities and Laplacian Operator', 'Conservative Vector Fields & Scalar Potentials'] },
                  { moduleNumber: 3, title: 'Multiple and Vector Integrals', subtopics: ['Double and Triple Integrals in Polar, Cylindrical & Spherical Coordinates', 'Line Integrals and Work Done', 'Surface Integrals and Flux', 'Green\'s Theorem, Stokes\' Theorem and Gauss Divergence Theorem'] }
                ]
              },
              {
                code: 'MTH 203',
                title: 'Sets, Logic and Real Analysis I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Axiomatic set theory, relations, equivalence classes, cardinal numbers, Supremum and Infimum, completeness axiom of R, Bolzano-Weierstrass theorem, and Cauchy sequences.',
                modules: [
                  { moduleNumber: 1, title: 'Logic, Sets and Cardinality', subtopics: ['Propositional & Predicate Calculus', 'Equivalence Relations and Partitions', 'Countable and Uncountable Sets (Cantor\'s Diagonalization)'] },
                  { moduleNumber: 2, title: 'Topology of the Real Line (R)', subtopics: ['Axioms of R, Archimedean Property & Density of Q', 'Supremum, Infimum & Completeness Axiom', 'Open Sets, Closed Sets, Boundary Points & Compactness (Heine-Borel)'] },
                  { moduleNumber: 3, title: 'Sequences and Limits in R', subtopics: ['Formal Limits of Sequences & Squeeze Theorem', 'Monotone Convergence Theorem & Subsequences', 'Bolzano-Weierstrass Theorem', 'Cauchy Sequences and Completeness of R'] }
                ]
              },
              {
                code: 'MTH 205',
                title: 'Linear Algebra I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Vector spaces over a field, subspaces, linear span, linear independence, bases and dimension, linear transformations, matrix representations, rank-nullity theorem, determinants, and system of linear equations.',
                modules: [
                  { moduleNumber: 1, title: 'Vector Spaces and Subspaces', subtopics: ['Definition and Axioms of Vector Spaces', 'Subspaces and Direct Sums', 'Linear Combinations and Linear Span', 'Linear Independence and Linear Dependence'] },
                  { moduleNumber: 2, title: 'Bases, Dimension and Coordinates', subtopics: ['Bases and Dimension of Finite-Dimensional Vector Spaces', 'Coordinate Vectors and Change of Basis', 'Dimension of Sum and Intersection of Subspaces'] },
                  { moduleNumber: 3, title: 'Linear Transformations and Matrices', subtopics: ['Linear Mappings, Kernel (Nullspace) and Image (Range)', 'Rank-Nullity Theorem and Isomorphisms', 'Matrix Representation of Linear Operators', 'Gaussian Elimination and Invertibility'] }
                ]
              },
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'MTH 202',
                title: 'Elementary Differential Equations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'First order ODEs (separable, homogeneous, exact, linear, Bernoulli), orthogonal trajectories, second order linear ODEs with constant coefficients, method of undetermined coefficients, variation of parameters, and Cauchy-Euler equations.',
                modules: [
                  { moduleNumber: 1, title: 'First Order Ordinary Differential Equations', subtopics: ['Separable and Homogeneous Equations', 'Exact Equations and Integrating Factors', 'First-Order Linear ODEs (Integrating Factor method)', 'Bernoulli, Riccati & Clairaut Equations', 'Orthogonal Trajectories and Population Growth Modeling'] },
                  { moduleNumber: 2, title: 'Higher Order Linear Differential Equations', subtopics: ['Homogeneous Equations with Constant Coefficients (Characteristic Equation)', 'Non-Homogeneous Equations: Method of Undetermined Coefficients', 'Method of Variation of Parameters', 'Cauchy-Euler Equidimensional Equations', 'Mechanical Vibrations (Harmonic, Damped, Resonance)'] }
                ]
              },
              {
                code: 'MTH 204',
                title: 'Real Analysis II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Limits and continuity of real functions, uniform continuity, differentiability, Rolle\'s theorem, Mean Value Theorem, Riemann integration, Fundamental Theorem of Calculus, sequences and series of functions, pointwise and uniform convergence, and Weierstrass M-test.',
                modules: [
                  { moduleNumber: 1, title: 'Continuity and Differentiability', subtopics: ['Epsilon-Delta Definition of Functional Limits', 'Continuous Functions on Compact Sets & Extreme Value Theorem', 'Uniform Continuity and Lipschitz Continuity', 'Differentiability, Rolle\'s Theorem & Generalized MVT'] },
                  { moduleNumber: 2, title: 'Riemann Integration', subtopics: ['Partitions, Upper and Lower Darboux Sums', 'Riemann Integrability Criteria', 'Properties of the Integral and Mean Value Theorem for Integrals', 'Fundamental Theorem of Calculus (Parts 1 & 2)'] },
                  { moduleNumber: 3, title: 'Sequences and Series of Functions', subtopics: ['Pointwise vs. Uniform Convergence', 'Weierstrass M-Test for Series of Functions', 'Uniform Convergence & Continuity, Differentiability, Integrability', 'Power Series, Radius of Convergence & Taylor Polynomials'] }
                ]
              },
              {
                code: 'MTH 206',
                title: 'Linear Algebra II & Matrix Theory',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Eigenvalues and eigenvectors, characteristic polynomial, Cayley-Hamilton theorem, diagonalization, inner product spaces, Gram-Schmidt orthogonalization, symmetric/Hermitian matrices, and bilinear forms.',
                modules: [
                  { moduleNumber: 1, title: 'Eigenvalues, Eigenvectors and Diagonalization', subtopics: ['Characteristic Polynomial and Eigenspaces', 'Algebraic and Geometric Multiplicities', 'Cayley-Hamilton Theorem and Minimal Polynomial', 'Matrix Diagonalization and Powers of Matrices'] },
                  { moduleNumber: 2, title: 'Inner Product Spaces', subtopics: ['Inner Products, Norms and Cauchy-Schwarz Inequality', 'Orthogonality and Orthogonal Complements', 'Gram-Schmidt Orthogonalization Process', 'Orthonormal Bases and Orthogonal Projections'] },
                  { moduleNumber: 3, title: 'Canonical Forms and Bilinear Forms', subtopics: ['Symmetric, Orthogonal, Hermitian and Unitary Operators', 'Spectral Theorem for Self-Adjoint Operators', 'Quadratic Forms and Positive Definiteness', 'Jordan Canonical Form Overview'] }
                ]
              },
              GST_223
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Penultimate)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MTH 301',
                title: 'Abstract Algebra I (Groups and Rings)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Groups, subgroups, cyclic groups, permutation groups, cosets, Lagrange\'s theorem, normal subgroups, quotient groups, homomorphism theorems, rings, subrings, ideals, and quotient rings.',
                modules: [
                  { moduleNumber: 1, title: 'Group Theory Foundations', subtopics: ['Definition and Examples of Groups (Symmetric, Dihedral, Matrix Groups)', 'Subgroups, Cyclic Groups and Generators', 'Cosets and Lagrange\'s Theorem with Applications (Fermat\'s Little Theorem)'] },
                  { moduleNumber: 2, title: 'Normal Subgroups & Homomorphisms', subtopics: ['Normal Subgroups and Quotient (Factor) Groups', 'Group Homomorphisms, Kernels & First Isomorphism Theorem', 'Cayley\'s Theorem and Direct Products'] },
                  { moduleNumber: 3, title: 'Ring Theory Foundations', subtopics: ['Rings, Integral Domains and Fields', 'Subrings and Ideals (Principal, Prime, Maximal Ideals)', 'Quotient Rings and Ring Homomorphisms'] }
                ]
              },
              {
                code: 'MTH 303',
                title: 'Complex Analysis I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Complex numbers, analytic functions, Cauchy-Riemann equations, harmonic functions, complex integration, Cauchy-Goursat theorem, Cauchy integral formula, Morera\'s theorem, and Liouville\'s theorem.',
                modules: [
                  { moduleNumber: 1, title: 'Analytic Functions and C-R Equations', subtopics: ['Complex Numbers, Topology of C & Extended Complex Plane', 'Differentiability and Analytic (Holomorphic) Functions', 'Cauchy-Riemann Equations in Cartesian & Polar Coordinates', 'Harmonic Functions and Harmonic Conjugates'] },
                  { moduleNumber: 2, title: 'Complex Integration', subtopics: ['Contour Integrals along Smooth Curves', 'Cauchy-Goursat Theorem for Simply Connected Domains', 'Cauchy Integral Formula and Higher Derivatives', 'Liouville\'s Theorem & Fundamental Theorem of Algebra'] }
                ]
              },
              {
                code: 'MTH 305',
                title: 'Metric Spaces and General Topology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Metric spaces, open and closed balls, topological spaces, neighborhoods, continuous mappings, homeomorphisms, compactness, connectedness, and completeness.',
                modules: [
                  { moduleNumber: 1, title: 'Metric Spaces', subtopics: ['Definition, Metrics in Rⁿ, C[a,b], lp spaces', 'Open Sets, Closed Sets, Interior, Closure and Boundary', 'Convergence of Sequences in Metric Spaces'] },
                  { moduleNumber: 2, title: 'Topological Properties', subtopics: ['Continuity of Maps Between Metric Spaces', 'Completeness and Banach Fixed Point Theorem', 'Compactness (Sequential Compactness & Open Covers)', 'Connectedness and Path-Connectedness'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'MTH 302',
                title: 'Numerical Analysis I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Error analysis, floating point arithmetic, root-finding for non-linear equations (Bisection, Secant, Newton-Raphson), polynomial interpolation (Lagrange, Newton divided differences), numerical differentiation and integration (Trapezoidal, Simpson\'s rules), and numerical solution of ODEs (Euler, Runge-Kutta).',
                modules: [
                  { moduleNumber: 1, title: 'Root Finding Algorithms', subtopics: ['Error Analysis, Round-Off and Truncation Errors', 'Bisection Method & Regula Falsi', 'Newton-Raphson Method and Order of Convergence', 'Fixed-Point Iteration Method'] },
                  { moduleNumber: 2, title: 'Interpolation and Approximation', subtopics: ['Lagrange Interpolating Polynomial', 'Newton Divided Differences & Forward/Backward Differences', 'Spline Interpolation Intro & Least Squares Regression'] },
                  { moduleNumber: 3, title: 'Numerical Calculus & ODEs', subtopics: ['Numerical Differentiation Formulas', 'Trapezoidal Rule, Simpson\'s 1/3 and 3/8 Rules', 'Euler\'s Method and Modified Euler Method', 'Runge-Kutta 4th Order (RK4) Method'] }
                ]
              },
              {
                code: 'MTH 304',
                title: 'Ordinary Differential Equations II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Series solutions about ordinary and regular singular points, Frobenius method, Bessel and Legendre functions, system of linear differential equations, phase plane analysis, and stability.',
                modules: [
                  { moduleNumber: 1, title: 'Series Solutions of ODEs', subtopics: ['Ordinary Points and Power Series Solutions', 'Regular Singular Points and Method of Frobenius', 'Bessel\'s Equation, Bessel Functions and Generating Function', 'Legendre\'s Equation, Legendre Polynomials & Orthogonality'] },
                  { moduleNumber: 2, title: 'Linear Systems and Stability', subtopics: ['Systems of Linear First-Order ODEs with Constant Coefficients', 'Matrix Exponential & Fundamental Matrix Solutions', 'Phase Plane Analysis, Critical Points & Stability (Nodes, Saddles, Spirals, Centers)'] }
                ]
              },
              {
                code: 'MTH 306',
                title: 'Probability Theory and Mathematical Statistics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Probability spaces, random variables, cumulative distribution functions, probability density functions, expectation, variance, moment generating functions, joint distributions, marginal and conditional distributions, Law of Large Numbers, and Central Limit Theorem.',
                modules: [
                  { moduleNumber: 1, title: 'Probability Distributions', subtopics: ['Discrete Distributions (Binomial, Poisson, Geometric, Hypergeometric)', 'Continuous Distributions (Uniform, Exponential, Gamma, Normal)', 'Expectation, Variance, Covariance & Correlation', 'Moment Generating Functions & Characteristic Functions'] },
                  { moduleNumber: 2, title: 'Multivariate Distributions & Limit Theorems', subtopics: ['Joint, Marginal and Conditional Distributions', 'Transformations of Random Variables', 'Chebyshev\'s Inequality and Weak Law of Large Numbers', 'Central Limit Theorem and Normal Approximations'] }
                ]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MTH 401',
                title: 'Functional Analysis',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Normed vector spaces, Banach spaces, Lp spaces, inner product spaces, Hilbert spaces, orthogonal complements, Riesz representation theorem, linear operators, bounded linear functionals, Hahn-Banach theorem, Open Mapping theorem, and Closed Graph theorem.',
                modules: [
                  { moduleNumber: 1, title: 'Normed and Banach Spaces', subtopics: ['Normed Spaces and Equivalent Norms', 'Banach Spaces (Completeness, l^p and L^p Spaces)', 'Bounded Linear Operators and Dual Spaces', 'Hahn-Banach Extension Theorem'] },
                  { moduleNumber: 2, title: 'Hilbert Spaces & Fundamental Theorems', subtopics: ['Inner Product Spaces and Hilbert Spaces Geometry', 'Orthogonal Complements and Projection Theorem', 'Riesz Representation Theorem for Linear Functionals', 'Uniform Boundedness Principle, Open Mapping & Closed Graph Theorems'] }
                ]
              },
              {
                code: 'MTH 403',
                title: 'Partial Differential Equations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Classification of second order linear PDEs (elliptic, parabolic, hyperbolic), method of characteristics, separation of variables for Laplace, heat and wave equations, Fourier series, Fourier transforms, and Green\'s functions.',
                modules: [
                  { moduleNumber: 1, title: 'First Order PDEs and Classification', subtopics: ['Linear and Quasilinear First-Order PDEs', 'Method of Characteristics and Cauchy Problem', 'Classification of Second-Order Linear PDEs in 2 Variables (Hyperbolic, Parabolic, Elliptic)'] },
                  { moduleNumber: 2, title: 'Classical Equations of Mathematical Physics', subtopics: ['1D and 2D Wave Equation (D\'Alembert\'s Solution, Separation of Variables)', '1D Heat Conduction Equation (Maximum Principle, Fundamental Solution)', 'Laplace and Poisson Equations in Rectangular, Polar and Spherical Coordinates', 'Fourier Transform & Laplace Transform Solutions to PDEs'] }
                ]
              },
              {
                code: 'MTH 405',
                title: 'Measure Theory and Lebesgue Integration',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Outer measure, Lebesgue measurable sets, Borel sets, measurable functions, Lebesgue integral, Monotone Convergence Theorem, Fatou\'s Lemma, Dominated Convergence Theorem, and comparison with Riemann integral.',
                modules: [
                  { moduleNumber: 1, title: 'Lebesgue Measure on R', subtopics: ['Lebesgue Outer Measure and Measurable Sets', 'Properties of Measurable Sets & Sigma-Algebras', 'Non-Measurable Sets (Vitali Construction)', 'Lebesgue Measurable Functions'] },
                  { moduleNumber: 2, title: 'Lebesgue Integration & Limit Theorems', subtopics: ['Lebesgue Integral of Simple Functions and Non-Negative Functions', 'Monotone Convergence Theorem (MCT)', 'Fatou\'s Lemma and Lebesgue Dominated Convergence Theorem (LDCT)', 'Lp Spaces and Completeness (Riesz-Fischer Theorem)'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'MTH 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Independent supervised mathematical research project, scientific literature review, mathematical formulation, proof derivations, computational simulation, written dissertation, and oral defense before external examiners.',
                modules: [
                  { moduleNumber: 1, title: 'Research Methodology & Literature Synthesis', subtopics: ['Identification of Research Problem in Pure or Applied Mathematics', 'Literature Search, Bibliographic Tools & LaTeX Typesetting', 'Mathematical Model Formulation and Assumptions'] },
                  { moduleNumber: 2, title: 'Analytical/Numerical Derivation & Defense', subtopics: ['Rigorous Proof Derivation or Computational Algorithm Implementation', 'Analysis of Results, Error Bounds and Convergence Proofs', 'Preparation of Final Dissertation Manuscript & Oral Defense'] }
                ]
              },
              {
                code: 'MTH 402',
                title: 'Complex Analysis II & Conformal Mappings',
                units: 3,
                status: 'Elective',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Laurent series, singularities (removable, poles, essential), residue theorem, contour integration of trigonometric and rational functions, argument principle, Rouché\'s theorem, and conformal mappings (Möbius transformations).',
                modules: [
                  { moduleNumber: 1, title: 'Series and Residue Calculus', subtopics: ['Taylor Series and Laurent Series Expansions', 'Classification of Isolated Singularities and Poles', 'Residue Theorem and Calculation of Residues', 'Evaluation of Definite Integrals Using Contour Integration'] },
                  { moduleNumber: 2, title: 'Geometric Function Theory', subtopics: ['Argument Principle and Rouché\'s Theorem', 'Conformal Mappings and Angle Preservation', 'Möbius (Bilinear) Transformations and Invariants', 'Applications to Fluid Dynamics and Electrostatics'] }
                ]
              },
              {
                code: 'MTH 404',
                title: 'Fluid Dynamics and Continuum Mechanics',
                units: 3,
                status: 'Elective',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Continuum hypothesis, stress and strain tensors, Navier-Stokes equations, Euler equations, potential flow, stream functions, Bernoulli equation, and boundary layer theory.',
                modules: [
                  { moduleNumber: 1, title: 'Kinematics and Conservation Laws', subtopics: ['Lagrangian vs. Eulerian Descriptions', 'Equation of Continuity (Conservation of Mass)', 'Navier-Stokes Equations of Motion (Conservation of Momentum)', 'Energy Equation in Fluid Flow'] },
                  { moduleNumber: 2, title: 'Inviscid and Viscous Flows', subtopics: ['Euler Equation and Bernoulli\'s Principle', 'Velocity Potential and Stream Functions in 2D Flow', 'Vorticity, Circulation and Kelvin\'s Circulation Theorem', 'Boundary Layer Theory (Prandtl Equation)'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // 2. COMPUTER SCIENCE / CODING / SOFTWARE ENGINEERING
  if (subjStr.includes('computer') || subjStr.includes('code') || subjStr.includes('software') || subjStr.includes('database')) {
    return {
      subject,
      faculty: 'Faculty of Computing & Information Technology',
      department: 'Department of Computer Science',
      degreeName: 'B.Sc. (Hons) Computer Science / Software Engineering',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CSC 101',
                title: 'Introduction to Computer Science & Information Systems',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Historical development of computers, hardware structure, memory hierarchy, operating systems, data representation, binary/octal/hex conversions, computer logic, and problem solving.',
                modules: [
                  { moduleNumber: 1, title: 'Hardware, Architecture and Number Systems', subtopics: ['Computer Generations & Von Neumann Architecture', 'Data Representation: Binary, Octal, Hexadecimal & Two\'s Complement', 'Floating Point Representation (IEEE 754)', 'Primary & Secondary Storage Technologies'] },
                  { moduleNumber: 2, title: 'Software and Operating Principles', subtopics: ['System Software vs. Application Software', 'Functions of Operating Systems & Process Concepts', 'Translators: Compilers, Interpreters and Assemblers', 'Network Fundamentals (LAN, WAN, Internet, Protocols)'] },
                  { moduleNumber: 3, title: 'Algorithmic Problem Solving', subtopics: ['Problem Analysis and Decomposition', 'Flowcharts and Pseudocode Design', 'Control Structures: Sequence, Selection, Iteration', 'Tracing and Dry-Running Algorithms'] }
                ]
              },
              {
                code: 'MTH 101',
                title: 'Elementary Mathematics I (Calculus & Algebra)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Real numbers, sets, polynomials, quadratic equations, surds, sequences and series, matrices, determinants, and coordinate geometry.',
                modules: [
                  { moduleNumber: 1, title: 'Algebra and Polynomials', subtopics: ['Set Theory & Mappings', 'Quadratic Equations & Polynomial Roots', 'Mathematical Induction', 'Partial Fractions'] },
                  { moduleNumber: 2, title: 'Coordinate Geometry & Trigonometry', subtopics: ['Straight Lines and Circles', 'Trigonometric Identities', 'Binomial Theorem'] }
                ]
              },
              {
                code: 'PHY 101',
                title: 'General Physics I (Mechanics, Heat and Properties of Matter)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Vectors, kinematics, Newton\'s laws, work-energy, momentum, rotational dynamics, gravitation, elasticity, and thermodynamics.',
                modules: [
                  { moduleNumber: 1, title: 'Mechanics', subtopics: ['Vectors & Kinematics', 'Newton\'s Laws & Friction', 'Conservation of Momentum & Energy', 'Gravitation & Planetary Motion'] },
                  { moduleNumber: 2, title: 'Thermal Physics', subtopics: ['Heat Capacity & Latent Heat', 'Laws of Thermodynamics', 'Kinetic Theory of Gases'] }
                ]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CSC 102',
                title: 'Introduction to Problem Solving & Programming in Python/C',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Syntax, variables, expressions, control flow, functions, arrays, pointers, file input/output, and modular programming paradigms.',
                modules: [
                  { moduleNumber: 1, title: 'Core Syntax and Control Structures', subtopics: ['Data Types, Type Casting & Operators', 'Conditional Logic (if-else, switch)', 'Loops (while, for, do-while)', 'Variable Scope and Lifetime'] },
                  { moduleNumber: 2, title: 'Data Structures and Modularity', subtopics: ['1D & 2D Arrays / Lists', 'Strings and String Manipulation', 'Functions, Parameters & Return Values', 'Pass by Value vs. Pass by Reference'] },
                  { moduleNumber: 3, title: 'Pointers, Records and File I/O', subtopics: ['Pointers and Dynamic Memory Basics', 'Structures / Records and Tuples', 'File Operations: Reading, Writing and Appending', 'Debugging and Exception Handling'] }
                ]
              },
              {
                code: 'MTH 102',
                title: 'Elementary Mathematics II (Calculus & Vectors)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Calculus, limits, differentiation, integration, techniques of integration, areas, volumes, and differential equations.',
                modules: [
                  { moduleNumber: 1, title: 'Differential Calculus', subtopics: ['Limits and Continuity', 'Derivatives & Chain Rule', 'Implicit Differentiation & Optimization'] },
                  { moduleNumber: 2, title: 'Integral Calculus', subtopics: ['Definite & Indefinite Integrals', 'Integration by Parts & Substitution', 'Differential Equations Intro'] }
                ]
              },
              {
                code: 'PHY 102',
                title: 'General Physics II (Electricity, Magnetism and Optics)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Coulomb\'s law, electric field, potential, capacitance, circuits, magnetic field, induction, and geometric optics.',
                modules: [
                  { moduleNumber: 1, title: 'Electricity and Circuits', subtopics: ['Coulomb\'s Law & Electric Fields', 'Kirchhoff\'s Circuit Laws', 'Capacitors & Dielectrics'] },
                  { moduleNumber: 2, title: 'Magnetism and Optics', subtopics: ['Magnetic Forces & Induction', 'Refraction, Reflection & Lenses'] }
                ]
              },
              GST_112
            ])
          }
        },
        '200 Level': {
          levelName: '200 Level (Year 2 / Sophomores)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CSC 201',
                title: 'Computer Programming I (Object-Oriented Programming in Java/C++)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Classes, objects, encapsulation, constructors, inheritance, polymorphism, abstract classes, interfaces, exception handling, and GUI development.',
                modules: [
                  { moduleNumber: 1, title: 'Classes, Encapsulation & Objects', subtopics: ['Class Definition, Fields and Methods', 'Constructors, Overloading and this keyword', 'Access Modifiers (public, private, protected)', 'Encapsulation and Getters/Setters'] },
                  { moduleNumber: 2, title: 'Inheritance and Polymorphism', subtopics: ['Subclassing, super keyword & Method Overriding', 'Dynamic Method Dispatch & Runtime Polymorphism', 'Abstract Classes vs. Interfaces', 'Multiple Inheritance via Interfaces'] },
                  { moduleNumber: 3, title: 'Advanced OOP & Generics', subtopics: ['Exception Handling (try-catch-finally, throws)', 'Collections Framework (ArrayList, HashMap, HashSet)', 'Generics and Type Safety', 'Event-Driven GUI Programming'] }
                ]
              },
              {
                code: 'CSC 203',
                title: 'Discrete Structures & Computational Mathematics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Propositional and predicate logic, truth tables, proof techniques (direct, contradiction, induction), sets, relations, functions, recurrence relations, and graph theory basics.',
                modules: [
                  { moduleNumber: 1, title: 'Mathematical Logic and Proofs', subtopics: ['Propositional Logic & Logical Equivalences', 'Predicates and Quantifiers (Universal, Existential)', 'Direct Proofs, Proof by Contradiction & Contrapositive', 'Mathematical Induction & Well-Ordering Principle'] },
                  { moduleNumber: 2, title: 'Relations, Functions and Recurrences', subtopics: ['Equivalence Relations and Partial Orders (Posets)', 'Injective, Surjective & Bijective Functions', 'Recurrence Relations & Master Theorem', 'Generating Functions'] },
                  { moduleNumber: 3, title: 'Graph Theory Foundations', subtopics: ['Graphs, Vertices, Edges & Degrees (Handshaking Lemma)', 'Paths, Cycles, Trees & Spanning Trees', 'Eulerian and Hamiltonian Graphs', 'Graph Isomorphism and Planarity'] }
                ]
              },
              {
                code: 'CSC 205',
                title: 'Computer Architecture & Digital Logic Design',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Boolean algebra, logic gates, combinational circuits (adders, multiplexers, decoders), sequential circuits (flip-flops, registers, counters), ALU design, and instruction sets.',
                modules: [
                  { moduleNumber: 1, title: 'Boolean Algebra and Combinational Circuits', subtopics: ['Boolean Algebra Laws & Karnaugh Maps (K-Maps)', 'Logic Gates (AND, OR, NOT, NAND, NOR, XOR)', 'Adders (Half/Full), Subtractors and ALUs', 'Multiplexers, Demultiplexers, Encoders and Decoders'] },
                  { moduleNumber: 2, title: 'Sequential Circuits & Memory Units', subtopics: ['Latches and Flip-Flops (SR, JK, D, T)', 'Registers, Shift Registers and Asynchronous/Synchronous Counters', 'State Diagrams and Finite State Machines (FSM)', 'RAM, ROM and Memory Interfacing'] }
                ]
              },
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CSC 202',
                title: 'Data Structures and Algorithms',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Abstract Data Types (ADTs), stacks, queues, linked lists (singly, doubly, circular), trees, binary search trees, AVL trees, heaps, hash tables, sorting algorithms, and Big-O complexity analysis.',
                modules: [
                  { moduleNumber: 1, title: 'Linear Data Structures', subtopics: ['Array-Based vs. Dynamic Storage', 'Singly, Doubly and Circular Linked Lists', 'Stacks (LIFO) & Applications (Infix to Postfix, Recursion)', 'Queues (FIFO), Circular Queues & Priority Queues'] },
                  { moduleNumber: 2, title: 'Non-Linear Data Structures (Trees & Graphs)', subtopics: ['Binary Trees and Tree Traversals (Inorder, Preorder, Postorder)', 'Binary Search Trees (BST) Insertion, Deletion & Search', 'Balanced Trees: AVL Trees & Red-Black Trees Basics', 'Heaps (Min-Heap, Max-Heap) and HeapSort'] },
                  { moduleNumber: 3, title: 'Hashing and Algorithm Analysis', subtopics: ['Hash Tables, Hash Functions and Collision Resolution (Chaining, Open Addressing)', 'Sorting: QuickSort, MergeSort, RadixSort', 'Asymptotic Notation: Big-O, Big-Omega, Big-Theta', 'Space and Time Complexity Trade-Offs'] }
                ]
              },
              {
                code: 'CSC 204',
                title: 'Database Management Systems & SQL',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Relational database model, Entity-Relationship (ER) modeling, relational algebra, SQL (DDL, DML, DQL, DCL), normalization (1NF to BCNF), transactions, and ACID properties.',
                modules: [
                  { moduleNumber: 1, title: 'Data Modeling and ER Design', subtopics: ['Three-Schema Architecture & Data Independence', 'Entity-Relationship (ER) & Enhanced ER Diagrams', 'Relational Model Constraints (Primary, Foreign Keys)', 'Relational Algebra Operations (Select, Project, Join)'] },
                  { moduleNumber: 2, title: 'Structured Query Language (SQL)', subtopics: ['Table Creation, Constraints & Alterations (DDL)', 'Data Manipulation: Insert, Update, Delete (DML)', 'Complex Queries: Joins, Subqueries, Group By & Having (DQL)', 'Views, Triggers, Indexes and Stored Procedures'] },
                  { moduleNumber: 3, title: 'Normalization and Transaction Management', subtopics: ['Functional Dependencies & Armstrong\'s Axioms', 'Normal Forms: 1NF, 2NF, 3NF and Boyce-Codd (BCNF)', 'ACID Properties of Transactions', 'Concurrency Control, Locking & Deadlock Prevention'] }
                ]
              },
              {
                code: 'CSC 208',
                title: 'Operating Systems Principles',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Process management, threads, CPU scheduling algorithms, synchronization (semaphores, mutexes), deadlocks, memory management, paging, segmentation, virtual memory, and file systems.',
                modules: [
                  { moduleNumber: 1, title: 'Process and Thread Management', subtopics: ['Process States, Process Control Block (PCB) & Context Switching', 'Threads (User vs. Kernel level) and Multithreading Models', 'CPU Scheduling: FCFS, SJF, Round Robin, Priority Scheduling', 'Inter-Process Communication (IPC)'] },
                  { moduleNumber: 2, title: 'Concurrency, Synchronization & Deadlocks', subtopics: ['Critical Section Problem & Race Conditions', 'Mutex Locks, Semaphores and Monitors', 'Deadlock Characterization (Coffman Conditions)', 'Deadlock Prevention, Avoidance (Banker\'s Algorithm) & Detection'] },
                  { moduleNumber: 3, title: 'Memory Management and Storage', subtopics: ['Contiguous Allocation, Paging and Segmentation', 'Virtual Memory, Demand Paging & Page Replacement (FIFO, LRU, Optimal)', 'File Allocation Methods (Contiguous, Linked, Indexed)', 'Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)'] }
                ]
              },
              GST_223
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Penultimate)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CSC 301',
                title: 'Software Engineering & Agile Methodologies',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Software lifecycle models (Waterfall, Spiral, Agile/Scrum), requirements engineering, UML modeling, software architecture, design patterns, testing strategies, CI/CD, and version control (Git).',
                modules: [
                  { moduleNumber: 1, title: 'Software Process & Requirements', subtopics: ['Software Lifecycles: Waterfall, V-Model, Spiral, Agile/Scrum', 'Functional vs. Non-Functional Requirements', 'Software Requirements Specification (SRS) Document', 'Use Case Modeling and User Stories'] },
                  { moduleNumber: 2, title: 'Software Architecture and Design Patterns', subtopics: ['UML Class, Sequence, Activity & State Diagrams', 'Architectural Patterns: Layered, Client-Server, Microservices, MVC', 'GoF Design Patterns: Singleton, Factory, Observer, Strategy', 'SOLID Design Principles'] },
                  { moduleNumber: 3, title: 'Software Quality Assurance & DevOps', subtopics: ['Unit Testing, Integration Testing, System & Acceptance Testing', 'Test-Driven Development (TDD)', 'Version Control with Git and Branching Strategies', 'Continuous Integration / Continuous Deployment (CI/CD Pipelines)'] }
                ]
              },
              {
                code: 'CSC 303',
                title: 'Computer Networks and Internet Technologies',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'OSI 7-layer model and TCP/IP stack, physical transmission media, data link protocols (Ethernet, CSMA/CD), IP addressing (IPv4, IPv6, Subnetting), routing algorithms (Dijkstra, Distance Vector), TCP/UDP, and application layer protocols (HTTP, DNS, SMTP).',
                modules: [
                  { moduleNumber: 1, title: 'Layered Network Architecture', subtopics: ['OSI Reference Model vs. TCP/IP Protocol Suite', 'Physical Transmission Media (Fiber, Copper, Wireless)', 'Data Link Framing, Error Detection (CRC, Parity) & Flow Control', 'Medium Access Control (CSMA/CD, CSMA/CA, Ethernet Standards)'] },
                  { moduleNumber: 2, title: 'Network and Transport Layers', subtopics: ['IPv4 Addressing, Subnet Masks, CIDR and IPv6', 'Routing Protocols: OSPF, BGP, RIP, Dijkstra\'s Shortest Path', 'TCP Connection Management (3-Way Handshake, Flow Control, Congestion Control)', 'UDP vs. TCP Comparison and Socket Programming'] },
                  { moduleNumber: 3, title: 'Application Layer and Security', subtopics: ['DNS Resolution, HTTP/HTTPS Protocols & Web Architecture', 'Email Protocols: SMTP, POP3, IMAP', 'Network Security: Firewalls, VPNs, SSL/TLS Encryption', 'DHCP and NAT (Network Address Translation)'] }
                ]
              },
              {
                code: 'CSC 305',
                title: 'Theory of Computation & Automata Theory',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Deterministic and Nondeterministic Finite Automata (DFA, NFA), regular expressions, pumping lemma, context-free grammars (CFG), pushdown automata (PDA), Turing machines, Church-Turing thesis, and decidability.',
                modules: [
                  { moduleNumber: 1, title: 'Regular Languages and Finite Automata', subtopics: ['Deterministic Finite Automata (DFA) Definition & State Transitions', 'Nondeterministic Finite Automata (NFA) and Subset Construction', 'Regular Expressions and Equivalence with Automata', 'Pumping Lemma for Regular Languages and Non-Regularity Proofs'] },
                  { moduleNumber: 2, title: 'Context-Free Languages and Pushdown Automata', subtopics: ['Context-Free Grammars (CFG), Derivations and Parse Trees', 'Chomsky Normal Form (CNF) & Greibach Normal Form', 'Pushdown Automata (PDA) Definition and Acceptance by Stack', 'Pumping Lemma for Context-Free Languages'] },
                  { moduleNumber: 3, title: 'Turing Machines and Decidability', subtopics: ['Standard Turing Machine Model & Transition Functions', 'Turing Recognizable vs. Turing Decidable Languages', 'Church-Turing Thesis', 'The Halting Problem & Undecidability Proof by Diagonalization'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CSC 302',
                title: 'Artificial Intelligence & Knowledge Representation',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'AI foundations, state-space search, uninformed search (BFS, DFS), informed heuristic search (A*, Greedy Best-First), game playing (Minimax, Alpha-Beta pruning), propositional/first-order logic reasoning, expert systems, and fuzzy logic.',
                modules: [
                  { moduleNumber: 1, title: 'Problem Solving and Search Strategies', subtopics: ['Intelligent Agents & Environment Types', 'Uninformed Search: BFS, DFS, Uniform Cost, Iterative Deepening', 'Heuristic Search: Greedy Best-First, A* Algorithm & Admissibility', 'Adversarial Search: Minimax Algorithm & Alpha-Beta Pruning'] },
                  { moduleNumber: 2, title: 'Knowledge Representation and Reasoning', subtopics: ['First-Order Logic & Unification Algorithm', 'Forward and Backward Chaining Inference', 'Ontologies, Semantic Networks and Frames', 'Rule-Based Expert Systems & Inference Engines'] },
                  { moduleNumber: 3, title: 'Uncertainty and Probabilistic Reasoning', subtopics: ['Probability Axioms in AI & Conditional Probability', 'Bayesian Networks and Markov Chains', 'Fuzzy Logic, Membership Functions and Fuzzy Inference'] }
                ]
              },
              {
                code: 'CSC 304',
                title: 'Web Application Technologies & Cloud Computing',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Full-stack web development, HTML5/CSS3/JavaScript, frontend frameworks (React, Vue), backend API architecture (REST, GraphQL, Node.js/Express), cloud computing models (IaaS, PaaS, SaaS), and Docker containerization.',
                modules: [
                  { moduleNumber: 1, title: 'Modern Frontend Engineering', subtopics: ['DOM Manipulation, ES6+ JavaScript & TypeScript', 'Component-Driven Architecture (React State & Props, Hooks)', 'Responsive Layouts (Tailwind CSS, CSS Grid/Flexbox)', 'Single Page Applications (SPAs) and Client-Side Routing'] },
                  { moduleNumber: 2, title: 'Backend APIs and Cloud Services', subtopics: ['RESTful API Design Principles & HTTP Status Codes', 'Authentication with JWT and OAuth 2.0', 'Cloud Infrastructure: AWS / GCP / Cloud Run, Serverless Functions', 'Docker Containers and Microservices Deployment'] }
                ]
              },
              {
                code: 'CSC 399',
                title: 'SIWES (Industrial Attachment / Internship)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Six months of practical industry experience in a reputable technology firm, software house, or telecommunications company.',
                modules: [
                  { moduleNumber: 1, title: 'Industry Practical Immersion', subtopics: ['Real-world Software Development Workflows', 'Collaboration in Professional Engineering Teams', 'Technical Report Writing and Defense'] }
                ]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CSC 401',
                title: 'Machine Learning & Deep Neural Networks',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Supervised learning (Linear/Logistic Regression, Decision Trees, Random Forests, SVM), unsupervised learning (K-Means, PCA), neural networks (Perceptron, Multilayer Perceptron, Backpropagation), Deep Learning (CNNs, RNNs, Transformers), and model evaluation metrics.',
                modules: [
                  { moduleNumber: 1, title: 'Classical Machine Learning', subtopics: ['Supervised vs. Unsupervised vs. Reinforcement Learning', 'Linear Regression, Gradient Descent & Regularization (L1/L2)', 'Logistic Regression, Decision Trees & Random Forests', 'Support Vector Machines (SVM) & Kernel Trick'] },
                  { moduleNumber: 2, title: 'Neural Networks & Deep Learning', subtopics: ['Artificial Neurons, Activation Functions (ReLU, Sigmoid, Softmax)', 'Feedforward Networks & Backpropagation Algorithm', 'Convolutional Neural Networks (CNNs) for Computer Vision', 'Recurrent Neural Networks (RNNs), LSTMs & Transformers for NLP'] },
                  { moduleNumber: 3, title: 'Model Evaluation and Production ML', subtopics: ['Cross-Validation, Overfitting, Underfitting & Bias-Variance Tradeoff', 'Confusion Matrix, Precision, Recall, F1-Score & ROC-AUC', 'Feature Engineering & Dimensionality Reduction (PCA)', 'Deploying Machine Learning Models into Production APIs'] }
                ]
              },
              {
                code: 'CSC 403',
                title: 'Cybersecurity, Cryptography & Network Defense',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Information security principles (CIA Triad), classical ciphers, symmetric cryptography (AES, DES), asymmetric cryptography (RSA, ECC), cryptographic hash functions (SHA-256), digital signatures, authentication protocols, penetration testing, and ethical hacking.',
                modules: [
                  { moduleNumber: 1, title: 'Cryptography and Encryption Systems', subtopics: ['CIA Triad (Confidentiality, Integrity, Availability)', 'Symmetric Key Cryptography (DES, 3DES, AES)', 'Asymmetric Key Cryptography (Diffie-Hellman, RSA, Elliptic Curves)', 'Hash Functions (MD5, SHA-2/3) and Message Authentication Codes (HMAC)'] },
                  { moduleNumber: 2, title: 'Network Security and Threat Vectors', subtopics: ['Digital Signatures, Public Key Infrastructure (PKI) & X.509 Certificates', 'Web Application Vulnerabilities (SQL Injection, XSS, CSRF, DDoS)', 'Firewalls, IDS/IPS, and Zero-Trust Architecture', 'Ethical Hacking, Penetration Testing & Vulnerability Assessment'] }
                ]
              },
              {
                code: 'CSC 405',
                title: 'Compiler Construction and Language Translation',
                units: 3,
                status: 'Elective',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Phases of a compiler, lexical analysis (Lex/Flex), syntax analysis (LL and LR parsing, Yacc/Bison), semantic analysis, intermediate code generation, code optimization, and target code generation.',
                modules: [
                  { moduleNumber: 1, title: 'Lexical and Syntax Analysis', subtopics: ['Structure of a Multi-Pass Compiler', 'Lexical Analysis: Tokenization, Regular Expressions & Finite Automata', 'Top-Down Parsing: LL(1) Grammars, Recursive Descent', 'Bottom-Up Parsing: Shift-Reduce, LR(0), SLR, LALR, LR(1)'] },
                  { moduleNumber: 2, title: 'Intermediate Code & Optimization', subtopics: ['Syntax-Directed Translation & Abstract Syntax Trees (AST)', 'Three-Address Code (TAC) and Quadruple Representations', 'Control Flow Graphs & Basic Blocks', 'Machine-Independent and Dependent Code Optimization Techniques'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CSC 499',
                title: 'Final Year Capstone Software Project and Thesis',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Design, architectural modeling, full-stack implementation, testing, deployment, written academic dissertation, and defense of an enterprise-grade software system solving real-world challenges.',
                modules: [
                  { moduleNumber: 1, title: 'System Specification & Architecture Design', subtopics: ['Problem Statement, Objectives and Scope Definition', 'System Architecture, Database Schema & API Specifications', 'Prototyping, UI/UX Wireframing and Tech Stack Selection'] },
                  { moduleNumber: 2, title: 'Implementation, Deployment & Defense', subtopics: ['Full-Stack Implementation with Best Engineering Practices', 'Rigorous Automated & User Acceptance Testing', 'Cloud Deployment and Documentation', 'Final Dissertation Manuscript Writing & Oral Project Defense'] }
                ]
              },
              {
                code: 'CSC 402',
                title: 'Distributed Systems & Cloud-Native Architectures',
                units: 3,
                status: 'Elective',
                faculty: 'Faculty of Computing',
                department: 'Department of Computer Science',
                description: 'Characterization of distributed systems, RPC, RMI, distributed clock synchronization (Lamport timestamps), consensus algorithms (Paxos, Raft), CAP theorem, distributed transactions, and microservices.',
                modules: [
                  { moduleNumber: 1, title: 'Distributed Systems Foundations', subtopics: ['Distributed Architecture Models & IPC Mechanisms', 'Remote Procedure Calls (RPC) and gRPC Frameworks', 'Logical Clocks, Lamport Timestamps and Vector Clocks', 'Distributed Mutual Exclusion Algorithms'] },
                  { moduleNumber: 2, title: 'Consensus, Fault Tolerance & Scalability', subtopics: ['CAP Theorem and Eventual Consistency Models', 'Consensus Protocols (Raft and Paxos)', 'Distributed Caching (Redis) and Load Balancing Strategies', 'Kubernetes Orchestration & Cloud-Native Microservices'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // 3. MEDICINE AND SURGERY (MBBS) / NURSING / PHYSIOTHERAPY
  if (subjStr.includes('med') || subjStr.includes('surg') || subjStr.includes('nurs') || subjStr.includes('physiotherapy')) {
    return {
      subject,
      faculty: 'College of Medical Sciences / Health Sciences',
      department: 'Faculty of Clinical Sciences / Basic Medical Sciences',
      degreeName: 'MBBS (Bachelor of Medicine & Bachelor of Surgery) / B.N.Sc Nursing',
      levels: {
        '100 Level': {
          levelName: '100 Level (Pre-Medical Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BIO 101',
                title: 'General Biology I (Cell Biology, Genetics & Physiology)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Cell structure, organelle ultrastructure, membrane transport, DNA replication, transcription, translation, Mendelian genetics, and metabolism.',
                modules: [
                  { moduleNumber: 1, title: 'Cell Structure and Biomolecules', subtopics: ['Prokaryotic vs. Eukaryotic Cells', 'Cell Membrane Fluid Mosaic Model & Active/Passive Transport', 'Proteins, Lipids, Carbohydrates & Nucleic Acids'] },
                  { moduleNumber: 2, title: 'Molecular Genetics and Heredity', subtopics: ['Mendel\'s Laws of Inheritance & Punnett Squares', 'DNA Structure, Replication & Polymerase Enzymes', 'Gene Expression: Transcription, mRNA Splicing & Translation'] }
                ]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I (Medical Physical & Inorganic Chemistry)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Atomic structure, chemical bonding, buffer solutions in physiological systems, acid-base equilibrium, and thermodynamics.',
                modules: [
                  { moduleNumber: 1, title: 'Inorganic Principles in Medicine', subtopics: ['Electrolytes and Osmotic Pressure in Biological Fluids', 'Buffers (Bicarbonate, Phosphate & Protein Buffering Systems)', 'Coordination Chemistry & Hemoglobin Metal Complexes'] }
                ]
              },
              {
                code: 'PHY 101',
                title: 'General Physics for Medical Sciences I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Biomechanics, fluid dynamics in circulatory systems (Poiseuille\'s Law), thermodynamics, and acoustics of medical ultrasound.',
                modules: [
                  { moduleNumber: 1, title: 'Biomechanics and Biofluids', subtopics: ['Statics and Levers in Human Skeletal System', 'Viscosity, Laminar vs. Turbulent Blood Flow, Reynolds Number', 'Blood Pressure Measurement & Doppler Ultrasound Physics'] }
                ]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BIO 102',
                title: 'General Biology II (Comparative Animal Anatomy & Diversity)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Animal diversity from protozoa to chordates, comparative vertebrate anatomy, embryology, and evolutionary biology.',
                modules: [
                  { moduleNumber: 1, title: 'Invertebrate and Vertebrate Zoology', subtopics: ['Phylogeny and Classification of Major Animal Phyla', 'Comparative Anatomy of Circulatory, Respiratory & Excretory Systems', 'Embryonic Germ Layers and Organogenesis'] }
                ]
              },
              {
                code: 'CHM 102',
                title: 'Organic Chemistry for Medical Students',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Structure, stereochemistry, synthesis, and reactions of biological organic molecules, amino acids, carbohydrates, lipids, and pharmaceuticals.',
                modules: [
                  { moduleNumber: 1, title: 'Organic Chemistry of Biomolecules', subtopics: ['Chirality, Optical Activity & Enantiomers in Pharmacology', 'Peptide Bond Synthesis and Protein Conformations', 'Lipids, Steroids and Cholesterol Biochemistry'] }
                ]
              },
              GST_112
            ])
          }
        },
        '200 Level': {
          levelName: '200 Level (Basic Medical Sciences I - Pre-Clinical)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'ANA 201',
                title: 'Gross Human Anatomy I (Upper Limb, Lower Limb & Thorax)',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Human Anatomy',
                description: 'Cadaveric dissection, osteology, arthrology, myology, neurovascular supply of upper limb, lower limb, thoracic wall, heart, and lungs.',
                modules: [
                  { moduleNumber: 1, title: 'Upper and Lower Limb Anatomy', subtopics: ['Brachial Plexus & Nerve Injuries (Erb\'s, Klumpke\'s, Wrist Drop)', 'Bones, Joints and Compartments of Upper and Lower Extremities', 'Femoral Triangle, Popliteal Fossa & Inguinal Canal Anatomy', 'Blood Supply & Venous Drainage (Saphenous Veins, Varicosities)'] },
                  { moduleNumber: 2, title: 'Thoracic Cavity and Cardiopulmonary Anatomy', subtopics: ['Thoracic Cage, Intercostal Spaces and Mechanism of Respiration', 'Heart: Chambers, Coronary Circulation & Conducting System', 'Lungs: Bronchopulmonary Segments, Pleura & Mediastinum Boundaries'] }
                ]
              },
              {
                code: 'PHS 201',
                title: 'Human Physiology I (General, Blood & Cardiovascular Physiology)',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Physiology',
                description: 'Cell membrane potentials, action potentials, blood composition, erythropoiesis, blood groups, haemostasis, cardiac electrophysiology, ECG, and hemodynamics.',
                modules: [
                  { moduleNumber: 1, title: 'General and Blood Physiology', subtopics: ['Resting Membrane Potential & Action Potential Generation', 'Erythropoiesis, Hemoglobin Synthesis & Anemia Classifications', 'Hemostasis: Platelet Plug, Clotting Cascades & Anticoagulants', 'ABO and Rhesus Blood Group Systems and Transfusion Medicine'] },
                  { moduleNumber: 2, title: 'Cardiovascular and Autonomic Physiology', subtopics: ['Cardiac Cycle, Heart Sounds and Pressure-Volume Loops', 'Cardiac Electrophysiology and ECG Waveform Interpretation', 'Regulation of Blood Pressure (Baroreceptors, RAAS System)', 'Cardiac Output, Peripheral Resistance and Hemorrhagic Shock'] }
                ]
              },
              {
                code: 'BCH 201',
                title: 'Medical Biochemistry I (Structure and Chemistry of Biomolecules)',
                units: 3,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Biochemistry',
                description: 'Proteins, enzymes (kinetics, Michaelis-Menten, inhibition), coenzymes, vitamins, bioenergetics, and biological membrane transport.',
                modules: [
                  { moduleNumber: 1, title: 'Enzymology and Bioenergetics', subtopics: ['Protein Primary, Secondary, Tertiary and Quaternary Structures', 'Michaelis-Menten Kinetics, Km, Vmax and Lineweaver-Burk Plots', 'Competitive, Non-Competitive and Allosteric Enzyme Inhibition', 'Thermodynamics of ATP and Electron Transport Chain Complexes'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ANA 202',
                title: 'Gross Anatomy II (Abdomen, Pelvis & Perineum) & Histology',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Human Anatomy',
                description: 'Anterior abdominal wall, peritoneal cavity, gastrointestinal tract, liver, pancreas, spleen, kidneys, pelvic organs, and systemic histology.',
                modules: [
                  { moduleNumber: 1, title: 'Abdominal and Pelvic Anatomy', subtopics: ['Stomach, Duodenum, Mesentery and Portal Venous System', 'Liver, Biliary Tree, Pancreas and Spleen Relations', 'Kidneys, Ureters, Urinary Bladder and Pelvic Diaphragm', 'Male and Female Reproductive Organs and Perineal Pouches'] },
                  { moduleNumber: 2, title: 'Systemic Microscopic Histology', subtopics: ['Epithelial, Connective, Muscular and Nervous Tissues Histology', 'Microscopic Anatomy of Liver (Hepatic Lobules), Kidneys (Nephrons)', 'Histology of Respiratory, GI Tract and Endocrine Glands'] }
                ]
              },
              {
                code: 'PHS 202',
                title: 'Human Physiology II (Respiration, Renal & GI Physiology)',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Physiology',
                description: 'Pulmonary ventilation, gas exchange, acid-base regulation, GFR, tubular reabsorption, countercurrent mechanism, digestion, and absorption.',
                modules: [
                  { moduleNumber: 1, title: 'Respiratory and Renal Physiology', subtopics: ['Lung Volumes, Compliance and Surfactant in Alveoli', 'Oxygen-Hemoglobin Dissociation Curve & Carbon Dioxide Transport', 'Glomerular Filtration Rate (GFR) Regulation & Clearance', 'Countercurrent Mechanism and Urine Concentration in Loop of Henle', 'Acid-Base Balance: Respiratory vs. Metabolic Acidosis/Alkalosis'] },
                  { moduleNumber: 2, title: 'Gastrointestinal and Endocrine Physiology', subtopics: ['Gastric Acid Secretion Mechanisms and Peptic Ulcer Etiology', 'Pancreatic and Bile Secretions in Digestion', 'Pituitary, Thyroid, Adrenal and Pancreatic Hormones Regulation'] }
                ]
              },
              {
                code: 'BCH 202',
                title: 'Medical Biochemistry II (Intermediary Metabolism)',
                units: 3,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Biochemistry',
                description: 'Glycolysis, citric acid cycle, gluconeogenesis, glycogen metabolism, fatty acid beta-oxidation, amino acid catabolism, and urea cycle.',
                modules: [
                  { moduleNumber: 1, title: 'Carbohydrate and Lipid Metabolism', subtopics: ['Glycolysis, Fate of Pyruvate and Citric Acid (Krebs) Cycle', 'Gluconeogenesis and Glycogenolysis Regulation (Insulin/Glucagon)', 'Beta-Oxidation of Fatty Acids, Ketogenesis and Diabetic Ketoacidosis', 'Lipoprotein Metabolism (Chylomicrons, VLDL, LDL, HDL)'] },
                  { moduleNumber: 2, title: 'Amino Acid Catabolism and Inborn Errors', subtopics: ['Transamination, Deamination and Urea Cycle Disorders', 'Metabolism of Essential Amino Acids & Phenylketonuria (PKU)', 'Purine and Pyrimidine Synthesis and Gout Pathophysiology'] }
                ]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Basic Medical Sciences II / Path & Pharm)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'ANA 301',
                title: 'Neuroanatomy, Head & Neck and Medical Embryology',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Human Anatomy',
                description: 'Cranial nerves, brainstem, cerebrum, cerebellum, spinal cord tracts, ventricular system, circle of Willis, head/neck triangles, and congenital anomalies.',
                modules: [
                  { moduleNumber: 1, title: 'Neuroanatomy and Cranial Nerves', subtopics: ['Cranial Nerves I to XII (Origins, Pathways & Clinical Lesions)', 'Brainstem (Medulla, Pons, Midbrain) and Cranial Nuclei', 'Ascending (Spinothalamic, Dorsal Columns) and Descending (Corticospinal) Tracts', 'Circle of Willis and Stroke Syndromes (MCA, ACA, PCA)'] },
                  { moduleNumber: 2, title: 'Head & Neck and Embryology', subtopics: ['Anterior and Posterior Triangles of the Neck', 'Pharyngeal Arches and Head/Neck Congenital Malformations', 'Embryology of the Cardiovascular and Nervous Systems (Neural Tube Defects)'] }
                ]
              },
              {
                code: 'PAT 301',
                title: 'General Pathology & Cell Injury',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Pathology',
                description: 'Cellular adaptation, cell injury, necrosis vs. apoptosis, acute/chronic inflammation, wound healing, hemodynamic disorders (thrombosis, embolism, infarction), and neoplasia.',
                modules: [
                  { moduleNumber: 1, title: 'Cell Injury, Inflammation and Repair', subtopics: ['Cellular Adaptations (Hypertrophy, Hyperplasia, Atrophy, Metaplasia)', 'Mechanisms of Ischemia/Hypoxia Cell Injury and Free Radicals', 'Necrosis (Coagulative, Liquefactive, Caseous) vs. Apoptosis', 'Vascular and Cellular Events of Acute Inflammation & Mediators'] },
                  { moduleNumber: 2, title: 'Hemodynamics and Neoplasia', subtopics: ['Edema, Hyperemia, Congestion and Hemorrhage', 'Thrombosis (Virchow\'s Triad), Embolism and Infarction', 'Benign vs. Malignant Tumors Characteristics and Staging (TNM)', 'Carcinogenesis Molecular Basis: Oncogenes & Tumor Suppressor Genes'] }
                ]
              },
              {
                code: 'PHM 301',
                title: 'General Pharmacology & Pharmacokinetics',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Pharmacology',
                description: 'Pharmacokinetics (absorption, distribution, metabolism, excretion), pharmacodynamics (receptors, agonists, antagonists, dose-response), and autonomic pharmacology.',
                modules: [
                  { moduleNumber: 1, title: 'Pharmacokinetics and Pharmacodynamics', subtopics: ['Drug Absorption, Bioavailability & First-Pass Metabolism', 'Volume of Distribution, Cytochrome P450 Enzymes and Clearance', 'Drug-Receptor Interactions (Agonists, Inverse Agonists, Antagonists)', 'Therapeutic Index, EC50, Potency and Efficacy'] },
                  { moduleNumber: 2, title: 'Autonomic Nervous System Pharmacology', subtopics: ['Cholinergic Agonists and Antimuscarinic Drugs (Atropine)', 'Adrenergic Agonists (Alpha & Beta) and Sympathomimetics', 'Beta-Blockers and Alpha-Antagonists in Hypertension'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'MCB 301',
                title: 'Medical Microbiology, Virology & Parasitology',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Medical Microbiology',
                description: 'Bacteriology (Gram-positive/negative pathogens), Virology (HIV, Hepatitis, Influenza), Mycology, Medical Parasitology (Malaria, Helminths), and Immunology.',
                modules: [
                  { moduleNumber: 1, title: 'Bacteriology and Immunology', subtopics: ['Pathogenic Cocci (Staph, Strep) and Bacilli (E. coli, Pseudomonas, TB)', 'Innate vs. Adaptive Immunity, T-Cells, B-Cells & Antibodies (IgG, IgM)', 'Hypersensitivity Reactions (Types I, II, III, IV) and Autoimmunity', 'Antimicrobial Mechanisms and Mechanisms of Bacterial Resistance'] },
                  { moduleNumber: 2, title: 'Parasitology and Virology', subtopics: ['Plasmodium Life Cycle, Malaria Pathogenesis and Antimalarials', 'Intestinal Protozoa (Entamoeba, Giardia) and Nematodes/Cestodes', 'Viral Replication, Retroviruses (HIV Pathogenesis & ARTs), Hepatitis Viruses'] }
                ]
              },
              {
                code: 'PHM 302',
                title: 'Systemic Pharmacology (Cardiovascular, CNS & Antimicrobials)',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Pharmacology',
                description: 'Antihypertensives, antiarrhythmics, diuretics, CNS pharmacology (sedatives, analgesics, antipsychotics), and antimicrobial chemotherapy.',
                modules: [
                  { moduleNumber: 1, title: 'Cardiovascular and Renal Pharmacology', subtopics: ['Diuretics (Thiazides, Loop, K+-sparing)', 'ACE Inhibitors, ARBs, Calcium Channel Blockers in Hypertension', 'Cardiac Glycosides (Digoxin) & Heart Failure Management', 'Anticoagulants (Heparin, Warfarin, DOACs) & Antiplatelets'] },
                  { moduleNumber: 2, title: 'Chemotherapy and CNS Drugs', subtopics: ['Beta-Lactams (Penicillins, Cephalosporins), Aminoglycosides, Fluoroquinolones', 'Opioids, NSAIDs and Pain Management Protocols', 'Antidepressants, Anxiolytics and Antiepileptic Drugs'] }
                ]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Junior Clinical Postings / Pathology / Med / Surg)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MED 401',
                title: 'Principles of Internal Medicine & Clinical Examination',
                units: 6,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Internal Medicine',
                description: 'History taking, physical examination techniques, cardiovascular diseases (hypertension, heart failure, infective endocarditis), and respiratory medicine.',
                modules: [
                  { moduleNumber: 1, title: 'Clinical History Taking & Physical Diagnosis', subtopics: ['Systematic History Taking and Doctor-Patient Communication', 'General Physical Examination (Pallor, Jaundice, Cyanosis, Clubbing, Edema, Lymphadenopathy)', 'Cardiovascular Examination (Precordial Inspection, Palpation, Auscultation of Murmurs)', 'Respiratory Examination (Chest Expansion, Percussion, Breath Sounds, Adventitious Sounds)'] },
                  { moduleNumber: 2, title: 'Cardiovascular and Respiratory Medicine', subtopics: ['Essential and Secondary Hypertension Management Guidelines', 'Heart Failure Etiology, NYHA Staging and Pharmacotherapy', 'Community-Acquired Pneumonia, Tuberculosis and Asthma Management', 'Chronic Obstructive Pulmonary Disease (COPD) and Pulmonary Embolism'] }
                ]
              },
              {
                code: 'SUR 401',
                title: 'Principles of General Surgery & Operative Techniques',
                units: 6,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Surgery',
                description: 'Fluid and electrolyte management in surgical patients, shock, wound healing, surgical infections, burns, trauma resuscitation (ATLS), and abdominal surgery.',
                modules: [
                  { moduleNumber: 1, title: 'Basic Surgical Principles & Trauma', subtopics: ['Pre-Operative Assessment and Post-Operative Complications', 'Surgical Asepsis, Suture Materials and Wound Healing Stages', 'ATLS Protocol in Polytrauma Resuscitation & Head Injury Management', 'Fluid Balance, Electrolyte Derangements and Blood Transfusion in Surgery'] },
                  { moduleNumber: 2, title: 'Acute Abdomen and Surgical Emergencies', subtopics: ['Acute Appendicitis, Peritonitis and Perforated Viscus', 'Intestinal Obstruction (Mechanical vs. Dynamic) Causes & Management', 'Abdominal Wall Hernias (Inguinal, Femoral, Umbilical) & Repair Techniques', 'Burns Management: Parkland Formula, Resuscitation & Sepsis Control'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PAT 401',
                title: 'Systemic Pathology, Chemical Pathology & Haematology',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Pathology',
                description: 'Systemic diseases of kidney, liver, lungs, GI tract, heart, haematological malignancies (Leukaemia, Lymphoma), and clinical biochemistry diagnostic tests.',
                modules: [
                  { moduleNumber: 1, title: 'Chemical Pathology and Organ Function Tests', subtopics: ['Kidney Function Tests (Creatinine, Urea, Electrolytes) & Acute/Chronic Kidney Injury', 'Liver Function Tests (Transaminases, Bilirubin, Albumin, ALP) & Jaundice Differential', 'Endocrine Diagnostics (Diabetes Mellitus HbA1c, Thyroid Hormones)'] },
                  { moduleNumber: 2, title: 'Haematology and Blood Transfusion', subtopics: ['Sickle Cell Anaemia Pathophysiology and Crisis Management', 'Acute and Chronic Leukaemias (ALL, AML, CLL, CML) & Lymphomas', 'Haemophilia and Bleeding Disorders Differential Diagnosis'] }
                ]
              }
            ])
          }
        },
        '500 Level': {
          levelName: '500 Level (Specialties: Paediatrics, Obstetrics & Gynaecology)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'OBG 501',
                title: 'Obstetrics and Gynaecology I',
                units: 6,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Obstetrics and Gynaecology',
                description: 'Antenatal care, normal and abnormal labor, hypertensive disorders of pregnancy (Preeclampsia/Eclampsia), obstetric hemorrhage, and contraception.',
                modules: [
                  { moduleNumber: 1, title: 'Antenatal Care and Normal Labor', subtopics: ['Maternal Physiological Adaptations to Pregnancy', 'Stages of Normal Labor and Partograph Monitoring', 'Malpresentations, Malpositions and Cephalopelvic Disproportion (CPD)', 'Operative Delivery: Caesarean Section, Vacuum Extraction, Forceps'] },
                  { moduleNumber: 2, title: 'Obstetric Complications and Emergencies', subtopics: ['Hypertensive Disorders in Pregnancy: Gestational HTN, Preeclampsia, Eclampsia', 'Antepartum Hemorrhage (Placenta Previa vs. Abruptio Placentae)', 'Postpartum Hemorrhage (PPH) Causes (4 Ts) and Emergency Management', 'Ectopic Pregnancy Diagnosis, Rupture and Surgical/Medical Management'] }
                ]
              },
              {
                code: 'PED 501',
                title: 'Paediatrics and Child Health I',
                units: 6,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Paediatrics',
                description: 'Neonatology, growth and development milestones, immunization schedules, malnutrition (Kwashiorkor, Marasmus), diarrheal diseases, and pediatric emergencies.',
                modules: [
                  { moduleNumber: 1, title: 'Neonatology and Preventive Paediatrics', subtopics: ['Neonatal Resuscitation, APGAR Scoring and Birth Asphyxia', 'Neonatal Jaundice (Physiological vs. Pathological, Kernicterus)', 'National Expanded Programme on Immunization (EPI Schedule)', 'Child Development Milestones (Motor, Social, Language, Cognitive)'] },
                  { moduleNumber: 2, title: 'Common Paediatric Illnesses', subtopics: ['Severe Acute Malnutrition (Kwashiorkor vs. Marasmus Management)', 'Severe Malaria and Febrile Convulsions in Children', 'Neonatal Sepsis, Tetanus and Meningitis Protocols', 'Diarrhoeal Diseases, ORS and Dehydration Staging in Paediatrics'] }
                ]
              }
            ])
          }
        },
        '600 Level': {
          levelName: '600 Level (Final Senior Clinical Postings & MBBS Exams)',
          semesters: {
            'First Semester': createSemester('Final Clinical Year (First & Second Semesters)', [
              {
                code: 'MED 601',
                title: 'Senior Clinical Clerkship in Internal Medicine',
                units: 8,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Internal Medicine',
                description: 'Senior ward rounds, intensive care medicine, emergency room triage, neurology, nephrology, cardiology, gastroenterology, infectious diseases, and final MBBS preparation.',
                modules: [
                  { moduleNumber: 1, title: 'Advanced Internal Medicine Specialties', subtopics: ['Ischemic Stroke vs. Hemorrhagic Stroke Management in ICU', 'Diabetic Emergencies (DKA, HHS, Hypoglycemia Protocol)', 'Chronic Kidney Disease Staging and Hemodialysis Indications', 'HIV/AIDS Opportunistic Infections and ART Regimens'] }
                ]
              },
              {
                code: 'SUR 601',
                title: 'Senior Surgical Postings and Operative Procedures',
                units: 8,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Surgery',
                description: 'Senior surgical clerkship, orthopedic trauma, urology, neurosurgery, cardiothoracic surgery, pediatric surgery, and operative decision-making.',
                modules: [
                  { moduleNumber: 1, title: 'Surgical Subspecialties and Critical Care', subtopics: ['Fractures Classification, Compartment Syndrome & Open Fracture Protocols', 'Benign Prostatic Hyperplasia (BPH) and Prostate Cancer Surgery', 'Increased Intracranial Pressure and Traumatic Brain Injury Triage', 'Major Surgical Complications and Sepsis Resuscitation Protocols'] }
                ]
              },
              {
                code: 'COM 601',
                title: 'Community Medicine, Public Health & Epidemiology',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Community Health',
                description: 'Epidemiology of communicable and non-communicable diseases, primary health care, environmental sanitation, biostatistics, health management, and research project.',
                modules: [
                  { moduleNumber: 1, title: 'Public Health and Epidemiological Surveillance', subtopics: ['Epidemiological Study Designs (Cohort, Case-Control, Cross-Sectional, RCT)', 'Disease Surveillance, Outbreak Investigation and Quarantine Measures', 'Primary Health Care Components (Alma-Ata Declaration)', 'Maternal and Child Health Indicators & Sustainable Development Goals (SDGs)'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // 4. LAW (LL.B.)
  if (subjStr.includes('law')) {
    return {
      subject,
      faculty: 'Faculty of Law',
      department: 'Department of Jurisprudence and Public Law',
      degreeName: 'LL.B. (Bachelor of Laws)',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'LAW 101',
                title: 'Legal Methods I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Jurisprudence',
                description: 'Nature of law, theories of law (Natural Law, Positivism, Historical, Sociological, Realism), functions of law, classification of law, sources of law, and legal reasoning.',
                modules: [
                  { moduleNumber: 1, title: 'Nature and Theories of Law', subtopics: ['Definition and Characteristics of Law', 'Schools of Jurisprudence (Natural Law vs. Legal Positivism)', 'Law and Morality, Law and Justice, Law and State'] },
                  { moduleNumber: 2, title: 'Sources and Classifications of Law', subtopics: ['Primary vs. Secondary Sources of Law', 'Civil Law vs. Criminal Law, Public Law vs. Private Law', 'Substantive Law vs. Procedural Law, Common Law vs. Equity'] }
                ]
              },
              {
                code: 'LAW 103',
                title: 'Nigerian Legal System I',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Public Law',
                description: 'Historical evolution of the Nigerian legal system, reception of English law (Received English Law: Common Law, Equity, Statutes of General Application 1900), and customary law.',
                modules: [
                  { moduleNumber: 1, title: 'Sources of Nigerian Law', subtopics: ['Received English Law: Common law, Doctrines of Equity, Statutes of General Application (SOGA 1900)', 'Nigerian Legislation (Constitution, Acts, Laws, Decrees)', 'Judicial Precedent (Stare Decisis, Ratio Decidendi, Obiter Dictum)'] },
                  { moduleNumber: 2, title: 'Customary Law and Islamic Law', subtopics: ['Characteristics and Validity Tests for Customary Law (Repugnancy, Incompatibility, Public Policy)', 'Proof of Customary Law in Nigerian Courts', 'Sources and Application of Islamic (Sharia) Law in Nigeria'] }
                ]
              },
              {
                code: 'LAW 105',
                title: 'Constitutional Law I',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Public Law',
                description: 'Concept of constitutionalism, supremacy of the 1999 Constitution of Nigeria, separation of powers, rule of law, federalism, and fundamental human rights (Chapter IV).',
                modules: [
                  { moduleNumber: 1, title: 'Constitutionalism and State Structure', subtopics: ['Supremacy of the Constitution (Section 1, 1999 CFRN as amended)', 'Separation of Powers & Checks and Balances (Sections 4, 5, 6)', 'Rule of Law, Dicey\'s Formulation & Military Decrees Interregnum'] },
                  { moduleNumber: 2, title: 'Fundamental Rights in Nigeria', subtopics: ['Chapter IV Rights: Life, Dignity, Personal Liberty, Fair Hearing (Section 36)', 'Freedom of Expression, Association, Movement and Property Rights', 'Derogation and Enforcement of Fundamental Rights (FREP Rules 2009)'] }
                ]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'LAW 102',
                title: 'Legal Methods II & Statutory Interpretation',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Jurisprudence',
                description: 'Statutory interpretation canons (Literal rule, Golden rule, Mischief rule, Purposive approach), Ejusdem Generis, Noscitur a Sociis, and legal drafting.',
                modules: [
                  { moduleNumber: 1, title: 'Canons of Statutory Interpretation', subtopics: ['Literal Rule of Interpretation and Case Law Applications', 'Golden Rule to Prevent Absurdity and Mischief Rule (Heydon\'s Case)', 'Internal and External Aids to Statutory Construction', 'Latin Maxims: Ejusdem Generis, Expressio Unius Exclusio Alterius'] }
                ]
              },
              {
                code: 'LAW 104',
                title: 'Nigerian Legal System II & Court Hierarchy',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Public Law',
                description: 'Hierarchy of Nigerian courts (Supreme Court, Court of Appeal, Federal High Court, State High Court, Customary/Sharia Court of Appeal, Magistrate Courts), and legal aid.',
                modules: [
                  { moduleNumber: 1, title: 'Hierarchy and Jurisdiction of Courts', subtopics: ['Supreme Court of Nigeria: Original and Appellate Jurisdiction', 'Court of Appeal and Specialized Tribunals (Election, CCT, Investments)', 'High Courts (Federal, State, NICN) Original Jurisdictions', 'Subordinate Courts: Magistrate, District, Customary and Area Courts'] }
                ]
              },
              GST_112
            ])
          }
        },
        '200 Level': {
          levelName: '200 Level (Year 2 / Sophomores)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'LAW 201',
                title: 'Law of Contract I (Formation and Vitiating Elements)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Commercial Law',
                description: 'Nature of contract, offer and acceptance, intention to create legal relations, consideration, capacity to contract, and privity of contract.',
                modules: [
                  { moduleNumber: 1, title: 'Formation of a Valid Contract', subtopics: ['Offer vs. Invitation to Treat (Pharmaceutical Society v. Boots, Carlill v. Carbolic Smoke Ball)', 'Acceptance, Postal Rule (Adams v. Lindsell) and Communication', 'Intention to Create Legal Relations (Domestic vs. Commercial Agreements)', 'Consideration Doctrine: Sufficiency vs. Adequacy, Past Consideration'] },
                  { moduleNumber: 2, title: 'Capacity and Privity of Contract', subtopics: ['Contractual Capacity of Minors, Drunkards and Illiterates (Illiterates Protection Act)', 'Doctrine of Privity of Contract (Tweedle v. Atkinson, Dunlop v. Selfridge) & Exceptions', 'Promissory Estoppel (Central London Property Trust v. High Trees House)'] }
                ]
              },
              {
                code: 'LAW 203',
                title: 'Criminal Law I (General Principles and Offences Against Persons)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Public Law',
                description: 'General principles of criminal liability (Actus Reus and Mens Rea), Criminal Code (Southern Nigeria) and Penal Code (Northern Nigeria), and general defences.',
                modules: [
                  { moduleNumber: 1, title: 'Principles of Criminal Liability', subtopics: ['Constitutional Principle of Legality (Nullum Crimen Sine Lege)', 'Actus Reus: Voluntary Acts, Omissions and Causation Tests', 'Mens Rea: Intention, Recklessness, Negligence and Strict Liability', 'Parties to Offences: Principal Offenders, Aiders and Abettors'] },
                  { moduleNumber: 2, title: 'General Defences in Criminal Law', subtopics: ['Insanity (M\'Naghten Rules) and Diminished Responsibility', 'Intoxication, Automatism and Infancy', 'Self-Defence, Defence of Property, Provocation and Necessity'] }
                ]
              },
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'LAW 202',
                title: 'Law of Contract II (Terms, Discharge and Remedies)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Commercial Law',
                description: 'Terms of contract (conditions, warranties, innominate terms), exemption clauses, vitiating elements (mistake, misrepresentation, duress, undue influence), discharge, and remedies for breach.',
                modules: [
                  { moduleNumber: 1, title: 'Vitiating Factors in Contracts', subtopics: ['Operative Mistake (Common, Mutual, Unilateral Mistake, Non Est Factum)', 'Misrepresentation (Fraudulent, Negligent, Innocent) and Rescission', 'Duress (Physical and Economic) and Undue Influence (Actual vs. Presumed)'] },
                  { moduleNumber: 2, title: 'Discharge and Remedies for Breach', subtopics: ['Discharge by Performance, Agreement, Frustration and Breach', 'Damages for Breach of Contract (Hadley v. Baxendale Rules on Remoteness)', 'Specific Performance, Injunctions and Quantum Meruit'] }
                ]
              },
              {
                code: 'LAW 204',
                title: 'Criminal Law II (Specific Offences and Homicide)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Law',
                department: 'Department of Public Law',
                description: 'Homicide (Murder, Manslaughter), assault, rape and sexual offences, stealing, theft, robbery, armed robbery, obtaining by false pretences, forgery, and corruption.',
                modules: [
                  { moduleNumber: 1, title: 'Homicide and Violent Offences', subtopics: ['Murder (Section 316 Criminal Code) and Unlawful Killing', 'Voluntary Manslaughter (Provocation Section 318) vs. Involuntary Manslaughter', 'Assault, Battery and Grievous Bodily Harm'] },
                  { moduleNumber: 2, title: 'Property Offences and Economic Crimes', subtopics: ['Stealing and Theft (Section 383 Criminal Code Elements of Fraudulent Taking)', 'Robbery, Armed Robbery (Robbery and Firearms Act) and Extortion', 'Obtaining Property by False Pretences (Section 419) and Cybercrimes Act'] }
                ]
              },
              GST_223
            ])
          }
        }
      }
    };
  }

  // 5. DEFAULT ACADEMIC CURRICULUM GENERATOR FOR ALL OTHER SUBJECTS (Sciences, Arts, Social Sciences, Engineering, Education, Business)
  const defaultFaculty = subjStr.includes('educ') ? 'Faculty of Education' :
    (subjStr.includes('home') || subjStr.includes('nutrition')) ? 'Faculty of Agricultural Sciences & Consumer Studies' :
    (!subjStr.includes('home') && (subjStr.includes('bank') || subjStr.includes('acc') || subjStr.includes('econ') || subjStr.includes('bus') || subjStr.includes('mark') || subjStr.includes('pol') || subjStr.includes('soc'))) ? 'Faculty of Management & Social Sciences' :
    (subjStr.includes('eng') || subjStr.includes('french') || subjStr.includes('hist') || subjStr.includes('phil') || subjStr.includes('music') || subjStr.includes('relig') || subjStr.includes('theol') || subjStr.includes('yoruba') || subjStr.includes('igbo') || subjStr.includes('hausa') || subjStr.includes('edo') || subjStr.includes('arabic') || subjStr.includes('greek') || subjStr.includes('hebrew') || subjStr.includes('portuguese') || subjStr.includes('peace')) ? 'Faculty of Arts & Humanities' :
    (subjStr.includes('agric')) ? 'Faculty of Agricultural Sciences' :
    (subjStr.includes('mechatronics') || subjStr.includes('transport')) ? 'Faculty of Engineering & Technology' :
    'Faculty of Science';

  const codePrefix = (subject || 'GEN').toString().substring(0, 3).toUpperCase();

  return {
    subject,
    faculty: defaultFaculty,
    department: `Department of ${subject}`,
    degreeName: `B.Sc. / B.A. (Hons) ${subject}`,
    levels: {
      '100 Level': {
        levelName: '100 Level (Year 1 / Freshers)',
        semesters: {
          'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
            {
              code: `${codePrefix} 101`,
              title: `Foundations of ${subject} I (Core Principles)`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Fundamental axioms, historical evolution, conceptual frameworks, and core methodologies of ${subject} in university education.`,
              modules: [
                { moduleNumber: 1, title: `Theoretical Foundations of ${subject}`, subtopics: [`Scope, Definition and Historical Origin of ${subject}`, 'Primary Axioms and Theoretical Formulations', 'Methodological Approaches and Academic Inquiry'] },
                { moduleNumber: 2, title: `Core Conceptual Frameworks`, subtopics: [`Key Principles and Models in ${subject}`, 'Analytical Tools and Quantitative/Qualitative Methods', 'Real-World Applications and Contemporary Issues'] }
              ]
            },
            {
              code: `${codePrefix} 103`,
              title: `Introductory Methods and Literature in ${subject}`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Analytical techniques, critical reading, terminology, and foundational problem solving in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Analytical & Methodological Frameworks', subtopics: ['Literature Synthesis and Academic Referencing', 'Empirical Research Methods in the Discipline', 'Case Studies and Practical Examples'] }
              ]
            },
            GST_111,
            GST_121
          ]),
          'Second Semester': createSemester('Second Semester (Rain / Omega)', [
            {
              code: `${codePrefix} 102`,
              title: `Foundations of ${subject} II (Intermediate Concepts)`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Advanced foundational theories, system dynamics, problem solving, and analytical extensions in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Intermediate Theoretical Extensions', subtopics: ['Sub-discipline Specializations and Theories', 'Mathematical / Methodological Derivations and Modeling', 'Comparative International Standards'] }
              ]
            },
            GST_112
          ])
        }
      },
      '200 Level': {
        levelName: '200 Level (Year 2 / Sophomores)',
        semesters: {
          'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
            {
              code: `${codePrefix} 201`,
              title: `Intermediate ${subject} I`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Rigorous academic exploration of intermediate principles, empirical models, and research design in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Advanced Analysis and Formulations', subtopics: ['Core Theorems and Structural Formulations', 'Qualitative and Quantitative Research Approaches', 'Applied Problem Sets and Case Analysis'] }
              ]
            },
            GST_222
          ]),
          'Second Semester': createSemester('Second Semester (Rain / Omega)', [
            {
              code: `${codePrefix} 202`,
              title: `Intermediate ${subject} II & Laboratory/Field Practicum`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Empirical testing, fieldwork, laboratory protocols, and applied modeling in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Fieldwork, Laboratory and Analysis', subtopics: ['Experimental Protocol & Data Collection', 'Statistical Analysis & Hypothesis Testing', 'Technical Report Writing'] }
              ]
            },
            GST_223
          ])
        }
      },
      '300 Level': {
        levelName: '300 Level (Year 3 / Penultimate)',
        semesters: {
          'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
            {
              code: `${codePrefix} 301`,
              title: `Advanced ${subject} Theory and Research Methodology`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Advanced theoretical formulations, research design, proposal development, and specialized paradigms in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Advanced Specialized Formulations', subtopics: ['Contemporary Paradigms in the Field', 'Research Proposal Formulation and Design', 'Data Analytics and Computation in the Discipline'] }
              ]
            }
          ]),
          'Second Semester': createSemester('Second Semester (Rain / Omega)', [
            {
              code: `${codePrefix} 302`,
              title: `Applied ${subject} & Policy / Industry Operations`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Industry applications, national policies, professional regulatory standards, and SIWES practicum in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Professional Practice and Regulations', subtopics: ['Regulatory Frameworks & Professional Ethics', 'Industry Implementation & Case Studies', 'Pre-Project Seminar'] }
              ]
            }
          ])
        }
      },
      '400 Level': {
        levelName: '400 Level (Year 4 / Final Year)',
        semesters: {
          'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
            {
              code: `${codePrefix} 401`,
              title: `Contemporary Issues & Special Topics in ${subject}`,
              units: 3,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `High-level seminar, advanced academic synthesis, global trends, and critique of contemporary research in ${subject}.`,
              modules: [
                { moduleNumber: 1, title: 'Advanced Seminar & Thesis Formulation', subtopics: ['Critical Literature Review', 'Emerging Global Innovations and Frontiers', 'Thesis Defense Preparation'] }
              ]
            }
          ]),
          'Second Semester': createSemester('Second Semester (Rain / Omega)', [
            {
              code: `${codePrefix} 499`,
              title: `Final Year Research Project and Dissertation`,
              units: 6,
              status: 'Compulsory',
              faculty: defaultFaculty,
              department: `Department of ${subject}`,
              description: `Supervised independent research project, empirical investigation, dissertation writing, and oral defense before the departmental board of examiners.`,
              modules: [
                { moduleNumber: 1, title: 'Dissertation Research & Final Defense', subtopics: ['Empirical Investigation & Data Synthesis', 'Dissertation Manuscript Writing', 'Oral Project Defense & Peer Review'] }
              ]
            }
          ])
        }
      }
    }
  };
};
