import { Subject } from '../types';

export type Curriculum = {
  [key in Subject]?: {
    [year: string]: { // "Year 1", "Year 2", etc. or "Primary One"
      [semester: string]: { [topic: string]: string[] }; // Topic -> Array of subtopics
    }
  }
};

/**
 * Generates a generic, plausible curriculum for all subjects for the child audience level.
 * This ensures that even subjects without a specific detailed curriculum will have selectable options.
 */
const createBaseChildCurriculum = (): Curriculum => {
  const allSubjects = Object.values(Subject);
  const curriculum: Curriculum = {};

  const levels = [
    "Kindergarten", "Nursery One", "Nursery Two", 
    "Primary One", "Primary Two", "Primary Three", 
    "Primary Four", "Primary Five", "Primary Six"
  ];
  const terms = ["First Term", "Second Term", "Third Term"];

  // A template generator for creating topics and subtopics for any given subject.
  const genericTopicGenerator = (subject: Subject, level: string) => {
    const levelIndex = levels.indexOf(level);
    const baseTopics = {
      "First Term": {
        [`Introduction to ${subject}`]: [`What is ${subject}?`, `Why ${subject} is fun`, `Finding ${subject} in the world`],
        "First Steps": ["A simple core concept", "Another simple idea", "Fun activity or game"]
      },
      "Second Term": {
        "Exploring More": [`A new idea in ${subject}`, `How we use ${subject}`],
        "Creative Time": [`Drawing or building something related to ${subject}`, `Telling a story about it`]
      },
      "Third Term": {
        "Review and Connect": [`Connecting ideas from the term`, `A simple real-world example`],
        "Show What You Know": ["Fun quiz", "Class project", "Show and tell"]
      }
    };
    
    // Make topics sound slightly more advanced for older primary school children.
    if (levelIndex > 4) { // Primary Five and Six
      baseTopics["First Term"]["First Steps"] = ["A more advanced concept", "Connecting different ideas", "Simple problem-solving"];
      baseTopics["Second Term"]["Exploring More"] = [`How ${subject} works in the real world`, `Careers related to ${subject}`];
    }
    return baseTopics;
  };

  // Populate the curriculum object with the generated generic data for every subject.
  for (const subject of allSubjects) {
    curriculum[subject] = {};
    for (const level of levels) {
      curriculum[subject]![level] = genericTopicGenerator(subject, level);
    }
  }
  return curriculum;
};

/**
 * This object contains all the specific, hand-crafted curricula.
 * This data will be layered on top of the generic base, overwriting it where there's an overlap.
 * This preserves the high-quality, detailed data while ensuring 100% coverage for all subjects.
 */
const specificAndUniversityData: Curriculum = {
  // --- MATHEMATICS (Detailed Child + University) ---
  [Subject.Math]: {
    "Kindergarten": {
      "First Term": {
        "Pre-Math Skills": ["Sorting and Classifying by color, shape, and size", "Identifying Patterns", "One-to-one correspondence"],
        "Numbers 1-10": ["Rote Counting 1-10", "Recognizing Numerals 1-10", "Counting Objects up to 10"],
      },
      "Second Term": {
        "Shapes": ["Identifying Circle, Square, Triangle, Rectangle", "Drawing basic shapes", "Finding shapes in the environment"],
        "Comparing Objects": ["Big vs. Small", "Tall vs. Short", "Long vs. Short", "More vs. Less"],
      },
      "Third Term": {
        "Introduction to Addition & Subtraction": ["Concept of 'adding one more'", "Concept of 'taking one away'", "Simple stories involving adding/subtracting within 5"],
        "Measurement Concepts": ["Heavy vs. Light", "Full vs. Empty", "Introduction to Money (recognizing coins)"],
      },
    },
    "Nursery One": {
        "First Term": {
            "Numbers 1-20": ["Counting and Recognition", "Writing Numerals 1-20", "Ordering numbers"],
            "Basic Addition": ["Adding numbers up to 10", "Using pictures to add", "Addition sentences"],
        },
        "Second Term": {
            "Basic Subtraction": ["Subtracting numbers from 10", "Using pictures to subtract", "Subtraction sentences"],
            "More on Shapes": ["Identifying Oval, Star, Heart", "Properties of basic shapes (sides, corners)"],
        },
        "Third Term": {
            "Measurement": ["Comparing Lengths (longer/shorter)", "Comparing Weights (heavier/lighter)", "Introduction to Time (Morning, Afternoon, Night)"],
            "Money": ["Recognizing different coins and notes", "Simple value comparison"],
        },
    },
    "Nursery Two": {
        "First Term": {
            "Numbers 1-50": ["Counting in 2s and 5s", "Place Value (Tens and Ones)", "Writing numbers in words"],
            "Addition & Subtraction": ["Adding and subtracting within 20", "Word problems", "Missing numbers in sentences"],
        },
        "Second Term": {
            "Introduction to Multiplication": ["Concept of repeated addition", "Multiplication by 2", "Simple multiplication stories"],
            "Time": ["Telling time to the hour (o'clock)"],
        },
        "Third Term": {
            "Fractions": ["Concept of a whole", "Identifying half (1/2)", "Identifying one-quarter (1/4)"],
            "Data Handling": ["Collecting data using tally marks", "Simple pictographs"],
        },
    },
    "Primary One": {
      "First Term": {
        "Numbers 1-100": ["Counting and Recognition", "Writing Numbers", "Place Value (Tens and Ones)"],
        "Addition": ["Adding within 20", "Addition Stories and Word Problems", "Using a Number Line"],
      },
      "Second Term": {
        "Subtraction": ["Subtracting within 20", "Take Away Stories and Word Problems", "Relationship between Addition and Subtraction"],
        "Shapes and Space": ["2D Shapes (Circle, Square, Triangle, Rectangle)", "3D Shapes (Cube, Sphere, Cylinder)", "Positions (Above, Below, Beside)"],
      },
      "Third Term": {
        "Measurement": ["Length (Longer/Shorter, measuring with non-standard units)", "Weight (Heavier/Lighter)", "Introduction to Money"],
        "Time": ["Days of the week", "Months of the year", "Telling time to the hour and half-past"],
      },
    },
    "Primary Two": {
      "First Term": {
        "Numbers up to 200": ["Place Value (Hundreds, Tens, Ones)", "Ordering and Comparing Numbers", "Even and Odd Numbers"],
        "Addition with Regrouping": ["Adding 2-digit numbers", "Word Problems involving addition"],
      },
      "Second Term": {
        "Subtraction with Regrouping": ["Subtracting 2-digit numbers", "Word Problems involving subtraction"],
        "Introduction to Multiplication": ["Concept of Multiplication as repeated addition", "Multiplication Tables (2, 3, 5, 10)"],
      },
      "Third Term": {
        "Introduction to Division": ["Concept of sharing equally", "Division by 2, 5, 10", "Relationship between Multiplication and Division"],
        "Fractions": ["Understanding Halves, Quarters, and Thirds", "Comparing simple fractions"],
      },
    },
    "Primary Three": {
        "First Term": {
            "Numbers up to 1000": ["Place Value (Thousands)", "Roman Numerals", "Rounding to nearest 10 and 100"],
            "Advanced Addition & Subtraction": ["Adding and subtracting 3-digit numbers", "Multi-step word problems"],
        },
        "Second Term": {
            "Multiplication": ["Multiplying 2-digit by 1-digit numbers", "Multiplication tables up to 12"],
            "Division": ["Dividing 2-digit by 1-digit numbers", "Division with remainders"],
        },
        "Third Term": {
            "Measurement": ["Length (cm, m, km)", "Mass (g, kg)", "Capacity (ml, l)"],
            "Geometry": ["Lines (Parallel, Perpendicular)", "Angles (Right angle, acute, obtuse)"],
        },
    },
    "Primary Four": {
        "First Term": {
            "Large Numbers": ["Numbers up to 1,000,000", "Factors and Multiples", "Prime Numbers"],
            "Operations with Large Numbers": ["Addition and subtraction of large numbers", "Long Multiplication (3-digit by 2-digit)"],
        },
        "Second Term": {
            "Long Division": ["Dividing by 2-digit numbers", "Word problems involving all four operations"],
            "Fractions and Decimals": ["Equivalent Fractions", "Adding and Subtracting Fractions", "Introduction to Decimals"],
        },
        "Third Term": {
            "Geometry": ["Polygons", "Perimeter of shapes", "Area of squares and rectangles"],
            "Data Handling": ["Bar graphs", "Line graphs", "Interpreting data"],
        },
    },
    "Primary Five": {
        "First Term": {
            "Fractions": ["Multiplying and Dividing Fractions", "Mixed Numbers", "Word problems with fractions"],
            "Decimals": ["Operations with Decimals (Addition, Subtraction, Multiplication, Division)"],
        },
        "Second Term": {
            "Percentages": ["Concept of Percentage", "Converting between fractions, decimals, and percentages", "Finding a percentage of a quantity"],
            "Ratio and Proportion": ["Understanding Ratios", "Solving proportion problems"],
        },
        "Third Term": {
            "Area and Volume": ["Area of triangles and parallelograms", "Volume of cubes and cuboids"],
            "Introduction to Algebra": ["Simple expressions", "Solving one-step equations"],
        },
    },
    "Primary Six": {
        "First Term": {
            "Advanced Algebra": ["Using letters for numbers", "Simplifying algebraic expressions", "Solving two-step equations"],
            "Speed, Distance, Time": ["Calculating speed, distance, and time", "Word problems"],
        },
        "Second Term": {
            "Circles": ["Parts of a circle (Radius, Diameter, Circumference)", "Calculating Circumference and Area"],
            "Data Analysis": ["Calculating Mean, Median, and Mode", "Pie charts"],
        },
        "Third Term": {
            "Coordinate Geometry": ["The Cartesian Plane", "Plotting points", "Simple transformations"],
            "Problem Solving and Revision": ["Multi-step word problems", "Preparation for secondary school mathematics"],
        },
    },
    "Year 1": {
      "Semester 1": {
        "Elementary Mathematics I (Algebra & Trig)": ["Set Theory", "Functions", "Trigonometry", "Complex Numbers"],
        "Calculus I": ["Limits and Continuity", "Derivatives", "Applications of Differentiation", "Integration"],
        "Vectors and Geometry": ["Vectors in 2D and 3D", "Dot and Cross Products", "Lines and Planes", "Analytic Geometry"],
        "Mechanics I": ["Kinematics", "Newton's Laws of Motion", "Work and Energy", "Momentum"]
      },
      "Semester 2": {
        "Elementary Mathematics II (Calculus)": ["Techniques of Integration", "Sequences and Series", "Conic Sections", "Polar Coordinates"],
        "Calculus II": ["Further Techniques of Integration", "Applications of Integration", "Parametric Equations", "Infinite Series"],
        "Linear Algebra I": ["Systems of Linear Equations", "Matrices and Determinants", "Vector Spaces", "Linear Independence"],
        "Statistics I": ["Descriptive Statistics", "Probability", "Discrete and Continuous Distributions", "Introduction to Sampling"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Abstract Algebra I": ["Groups", "Subgroups, Cyclic Groups, Permutation Groups", "Isomorphisms and Homomorphisms", "Lagrange's Theorem"],
        "Real Analysis I": ["The Real Number System", "Sequences and their Limits", "Limits of Functions", "Continuity"],
        "Differential Equations I": ["First Order ODEs", "Second Order Linear ODEs", "Homogeneous and Non-homogeneous Equations", "Applications"],
        "Numerical Analysis I": ["Error Analysis", "Root Finding (Bisection, Newton's method)", "Interpolation", "Numerical Differentiation"]
      },
      "Semester 2": {
        "Abstract Algebra II": ["Rings and Fields", "Ideals and Factor Rings", "Polynomial Rings", "Introduction to Galois Theory"],
        "Real Analysis II": ["Differentiation", "The Riemann Integral", "Sequences and Series of Functions", "Uniform Convergence"],
        "Differential Equations II": ["Laplace Transforms", "Systems of First Order Linear Equations", "Series Solutions of ODEs", "Introduction to PDEs"],
        "Linear Algebra II": ["Linear Transformations", "Eigenvalues and Eigenvectors", "Diagonalization", "Inner Product Spaces"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "Complex Analysis I": ["Complex Numbers and Functions", "Analytic Functions, Cauchy-Riemann Equations", "Elementary Functions", "Complex Integration"],
        "Vector and Tensor Analysis": ["Vector Calculus (Gradient, Divergence, Curl)", "Line and Surface Integrals", "Green's, Stokes', and Divergence Theorems", "Introduction to Tensors"],
        "Topology I": ["Topological Spaces", "Basis and Sub-basis", "Continuous Functions and Homeomorphisms", "Connectedness and Compactness"],
        "Mathematical Methods I": ["Fourier Series", "Fourier Transforms", "Special Functions", "Calculus of Variations"]
      },
      "Semester 2": {
        "Complex Analysis II": ["Cauchy's Integral Formula", "Taylor and Laurent Series", "The Residue Theorem", "Applications of Residues"],
        "Metric Spaces": ["Definition and Examples", "Open and Closed Sets", "Convergence and Completeness", "Contraction Mapping Theorem"],
        "Mathematical Methods II": ["Partial Differential Equations", "Sturm-Liouville Theory", "Integral Equations", "Group Theory for Physicists"],
        "Industrial Training (SIWES)": ["Practical application of mathematical skills in a relevant industry."]
      },
    },
     "Year 4": {
      "Semester 1": {
        "Measure Theory": ["Algebras and Sigma-Algebras", "Measures", "The Lebesgue Integral", "Dominated Convergence Theorem"],
        "Functional Analysis": ["Normed Spaces, Banach Spaces", "Hilbert Spaces", "Linear Operators and Functionals", "The Hahn-Banach Theorem"],
        "Partial Differential Equations": ["Classification of PDEs", "The Wave Equation", "The Heat Equation", "Laplace's Equation"],
        "Research Methods": ["Literature Review", "Mathematical Writing (using LaTeX)", "Problem Formulation", "Presenting Mathematical Results"]
      },
      "Semester 2": {
        "Lebesgue Integration": ["Comparison with Riemann Integral", "Lp Spaces", "Modes of Convergence", "Product Measures and Fubini's Theorem"],
        "Fluid Dynamics": ["Kinematics of Fluids", "The Navier-Stokes Equations", "Potential Flow", "Boundary Layer Theory"],
        "Galois Theory": ["Field Extensions", "The Fundamental Theorem of Galois Theory", "Solvability of Equations by Radicals"],
        "Research Project": ["Independent research project on a topic in pure or applied mathematics."]
      },
    },
  },
  // --- ENGLISH (Detailed Child + University) ---
  [Subject.English]: {
    "Kindergarten": {
        "First Term": {
            "Alphabet Recognition": ["Identifying uppercase letters", "Identifying lowercase letters", "Matching upper and lower case"],
            "Phonemic Awareness": ["Recognizing rhyming words", "Identifying initial sounds in words"],
        },
        "Second Term": {
            "Phonics": ["Letter-sound correspondence for common consonants", "Short vowel sounds (a, e, i, o, u)"],
            "Sight Words": ["Introduction to first 10 sight words (e.g., the, a, I, see)"],
        },
        "Third Term": {
            "Listening and Speaking": ["Following simple one-step directions", "Answering 'who', 'what', 'where' questions", "Participating in songs and rhymes"],
            "Pre-writing Skills": ["Holding a pencil correctly", "Tracing lines and shapes", "Drawing pictures to tell a story"],
        },
    },
    "Nursery One": {
        "First Term": {
            "Phonics": ["Consonant-Vowel-Consonant (CVC) words", "Blending sounds to read words (e.g., c-a-t -> cat)"],
            "Vocabulary": ["Colors, animals, family members", "Common objects"],
        },
        "Second Term": {
            "Reading": ["Reading simple CVC sentences", "Understanding concept of print (left to right, top to bottom)"],
            "Grammar": ["Introduction to Nouns (naming words)"],
        },
        "Third Term": {
            "Writing": ["Writing own name", "Labeling pictures", "Attempting to write simple CVC words"],
            "Comprehension": ["Retelling a simple story", "Answering questions about a story"],
        },
    },
    "Nursery Two": {
        "First Term": {
            "Advanced Phonics": ["Consonant blends (bl, st, tr)", "Digraphs (sh, ch, th)"],
            "Grammar": ["Introduction to Verbs (action words)", "Singular and Plural Nouns"],
        },
        "Second Term": {
            "Reading Fluency": ["Reading grade-level texts with more accuracy", "Self-correcting while reading"],
            "Punctuation": ["Using capital letters for start of sentences", "Using full stops"],
        },
        "Third Term": {
            "Writing": ["Writing simple complete sentences", "Using phonics to spell words", "Drawing and writing to express ideas"],
            "Vocabulary": ["Opposites", "Positional words (in, on, under)"],
        },
    },
    "Primary One": {
      "First Term": {
        "Alphabet and Sounds": ["Letter Recognition (A-Z)", "Phonics (Vowel and Consonant Sounds)", "Three-Letter Words"],
        "Basic Grammar": ["Nouns (Person, Place, Animal, Thing)", "Simple Sentences"],
      },
      "Second Term": {
        "Reading Skills": ["Reading Simple Stories", "Answering Comprehension Questions"],
        "Vocabulary Building": ["Colors, Animals, Family Members", "Days of the Week"],
      },
      "Third Term": {
        "Writing Skills": ["Writing the Alphabet", "Copying Simple Sentences", "Dictation"],
        "Punctuation": ["Full Stop", "Capital Letters"],
      },
    },
    "Primary Two": {
      "First Term": {
        "Grammar": ["Pronouns (I, you, he, she)", "Verbs (Action Words)", "Present Tense"],
        "Reading Comprehension": ["Identifying Main Ideas", "Sequencing Events in a Story"],
      },
      "Second Term": {
        "Composition": ["Writing Guided Paragraphs", "Describing a Picture"],
        "Vocabulary": ["Opposites", "Synonyms", "Months of the Year"],
      },
      "Third Term": {
        "Punctuation": ["Question Mark", "Comma in a list", "Exclamation Mark"],
        "Spoken English": ["Reciting Poems", "Simple Conversations", "Giving and following instructions"],
      },
    },
    "Primary Three": {
        "First Term": {
            "Parts of Speech": ["Identifying Nouns, Verbs, Adjectives", "Articles (a, an, the)"],
            "Reading": ["Reading longer passages", "Identifying characters and setting"],
        },
        "Second Term": {
            "Grammar": ["Past Tense of regular and irregular verbs", "Adverbs"],
            "Writing": ["Writing a simple paragraph with a topic sentence", "Story writing with beginning, middle, end"],
        },
        "Third Term": {
            "Punctuation": ["Using quotation marks for dialogue", "Apostrophes for possession"],
            "Vocabulary": ["Homophones", "Using a dictionary"],
        },
    },
    "Primary Four": {
        "First Term": {
            "Grammar": ["Tenses (Simple Present, Past, Future)", "Conjunctions (and, but, or)"],
            "Comprehension": ["Making inferences", "Understanding cause and effect"],
        },
        "Second Term": {
            "Writing": ["Letter Writing (Informal)", "Descriptive writing"],
            "Parts of Speech": ["Prepositions", "Pronouns (Subject, Object)"],
        },
        "Third Term": {
            "Figurative Language": ["Introduction to Simile and Metaphor", "Onomatopoeia"],
            "Spoken English": ["Participating in group discussions", "Giving short presentations"],
        },
    },
    "Primary Five": {
        "First Term": {
            "Sentence Structure": ["Simple, Compound, and Complex sentences", "Clauses (Main and Subordinate)"],
            "Writing": ["Narrative writing", "Expository writing (explaining a topic)"],
        },
        "Second Term": {
            "Grammar": ["Perfect Tenses (Present Perfect, Past Perfect)", "Active and Passive Voice"],
            "Comprehension": ["Summarizing texts", "Identifying author's purpose"],
        },
        "Third Term": {
            "Vocabulary": ["Using context clues to determine word meaning", "Prefixes and Suffixes"],
            "Literature": ["Introduction to literary elements (plot, character, theme)", "Reading a simple chapter book"],
        },
    },
    "Primary Six": {
        "First Term": {
            "Advanced Grammar": ["Conditional Sentences", "Reported Speech", "All parts of speech review"],
            "Writing": ["Persuasive writing", "Formal Letter writing"],
        },
        "Second Term": {
            "Literature": ["Analyzing poetry", "Comparing and contrasting characters or stories"],
            "Figurative Language": ["Personification, Hyperbole, Alliteration"],
        },
        "Third Term": {
            "Language for Exams": ["Comprehension strategies for tests", "Composition practice for exams", "Grammar and vocabulary revision"],
            "Public Speaking": ["Preparing and delivering a speech", "Debating skills"],
        },
    },
    "Year 1": {
      "Semester 1": {
        "Introduction to Nigerian Literature": ["Oral Traditions", "Pioneer Modern Writers (e.g., Achebe, Soyinka)", "Major Themes", "Literary History Overview"],
        "Use of English I": ["Grammar, Usage, and Mechanics", "Sentence Structure", "Punctuation", "Vocabulary Development"],
        "Introduction to Prose Fiction": ["Elements of Fiction (Plot, Character, Setting)", "Narrative Techniques", "Short Story Analysis", "Introduction to the Novel"],
        "Introduction to Phonetics": ["The Speech Organs", "Classification of English Sounds (Consonants)", "Classification of English Sounds (Vowels)", "Phonetic Transcription"]
      },
      "Semester 2": {
        "Introduction to Drama and Theatre": ["Elements of Drama", "Forms and Genres of Drama", "Theatrical Conventions", "Analysis of a Play"],
        "Use of English II": ["The Paragraph and Essay Writing", "Expository and Argumentative Writing", "Summary and Comprehension", "The Research Paper"],
        "Introduction to Poetry": ["Elements of Poetry (Rhythm, Rhyme, Imagery)", "Figures of Speech", "Forms and Genres of Poetry", "Analysis of a Poem"],
        "Introduction to English Syntax": ["Word Classes (Nouns, Verbs, etc.)", "Phrase Structure", "Clause Types", "Basic Sentence Patterns"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Phonology of English": ["The Phoneme", "Phonological Rules", "Stress and Intonation", "Connected Speech Processes"],
        "The African Novel": ["Major African Novelists", "Themes in the African Novel (e.g., Colonialism, Postcolonialism)", "Narrative Strategies", "Regional Varieties"],
        "Shakespearean Drama": ["Shakespeare's Life and Times", "Analysis of a Comedy", "Analysis of a Tragedy", "Analysis of a History Play"],
        "Advanced English Syntax I": ["The Noun Phrase", "The Verb Phrase", "Adjectival and Adverbial Phrases", "Functional Grammar Introduction"]
      },
      "Semester 2": {
        "Morphology of English": ["Morphemes", "Word Formation Processes", "Inflectional Morphology", "Derivational Morphology"],
        "Modern African Poetry": ["Pioneer African Poets", "Themes in Modern African Poetry", "Stylistic Features", "Francophone vs. Anglophone Poetry"],
        "European Continental Literature": ["Survey of major movements (e.g., Realism, Modernism)", "Analysis of a major French novel", "Analysis of a major German play", "Analysis of a major Russian novel"],
        "Advanced English Syntax II": ["Subordinate Clauses", "Coordination and Subordination", "Sentence Complexity", "Transformational Generative Grammar"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "18th Century Literature": ["The Age of Enlightenment", "The Rise of the Novel (e.g., Defoe, Swift)", "Satire", "Neoclassical Poetry (e.g., Pope)"],
        "Semantics": ["Theories of Meaning", "Lexical Semantics (Synonymy, Antonymy)", "Sentence Meaning", "Figurative Language"],
        "Creative Writing": ["Techniques in Fiction Writing", "Techniques in Poetry Writing", "Techniques in Playwriting", "Workshop and Peer Review"],
        "American Literature": ["Early American Literature", "Transcendentalism", "19th Century American Novel (e.g., Hawthorne, Melville)", "American Poetry (e.g., Whitman, Dickinson)"]
      },
      "Semester 2": {
        "English Language in Nigeria": ["History of English in Nigeria", "Features of Nigerian English", "Standard Nigerian English Debate", "Pidgin English"],
        "Discourse Analysis": ["Cohesion and Coherence", "Speech Act Theory", "Conversation Analysis", "Critical Discourse Analysis"],
        "Literary Theory and Criticism": ["Classical Criticism (Plato, Aristotle)", "Formalism and New Criticism", "Structuralism and Post-structuralism", "Marxist and Feminist Criticism"],
        "Industrial Training (SIWES)": ["Attachment to a media house, publishing company, or educational institution."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Psycholinguistics": ["Language Acquisition", "Language and the Brain", "Language Processing", "Bilingualism"],
        "Pragmatics": ["Implicature", "Presupposition", "Speech Acts", "Politeness Theory"],
        "Modern Comedy": ["Theories of Comedy", "Satire and Farce", "Analysis of modern comic plays", "Comedy in the novel and film"],
        "Research Methods": ["Methodologies in Language and Literature", "Data Collection", "Data Analysis", "Writing a Project Proposal"]
      },
      "Semester 2": {
        "Sociolinguistics": ["Language Variation", "Language and Social Class", "Language and Gender", "Language Policy and Planning"],
        "Stylistics": ["Linguistic Analysis of Literary Texts", "Foregrounding Theory", "Narrative Stylistics", "Poetic Stylistics"],
        "New Trends in Literary Theory": ["Postcolonial Theory", "Ecocriticism", "Queer Theory", "Reader-Response Theory"],
        "Research Project": ["Independent research project on a topic in English language or literature."]
      },
    },
  },
  // --- BIOLOGY (Detailed Child + University) ---
  [Subject.Biology]: {
    "Kindergarten": {
        "First Term": {
            "Living and Non-Living Things": ["Identifying living and non-living things", "Characteristics of living things (move, grow, eat)"],
            "The Five Senses": ["Seeing, Hearing, Smelling, Tasting, Touching", "Parts of the body associated with senses"],
        },
        "Second Term": {
            "Animals": ["Common domestic animals", "Common wild animals", "Sounds animals make"],
            "Plants": ["Identifying parts of a plant (root, stem, leaf)", "What plants need to grow (sun, water, air)"],
        },
        "Third Term": {
            "Our Environment": ["Day and Night", "Weather (Sunny, Rainy, Cloudy)", "Keeping our environment clean"],
            "Water": ["Uses of water", "Sources of water"],
        },
    },
    "Nursery One": {
        "First Term": {
            "My Body": ["Naming parts of the body", "Functions of main body parts", "Keeping my body clean"],
            "Food": ["Identifying different types of food", "Why we eat food"],
        },
        "Second Term": {
            "Plants Around Us": ["Types of plants (trees, flowers, grass)", "How plants grow from seeds"],
            "Animals Around Us": ["Where animals live (land, water)", "What animals eat"],
        },
        "Third Term": {
            "Air and Weather": ["Air is everywhere", "The Wind", "Seasons (Rainy and Dry)"],
            "Safety": ["Safety at home", "Safety at school"],
        },
    },
    "Nursery Two": {
        "First Term": {
            "Life Cycles": ["Life cycle of a butterfly", "Life cycle of a plant"],
            "Healthy Habits": ["Eating balanced meals", "Exercise", "Personal hygiene"],
        },
        "Second Term": {
            "Our Earth": ["Landforms (hills, valleys)", "Water bodies (rivers, lakes)"],
            "The Sky": ["The Sun", "The Moon and Stars"],
        },
        "Third Term": {
            "Materials": ["Identifying materials (wood, plastic, metal, cloth)", "Floating and Sinking"],
            "Sound and Light": ["Sources of light", "Making sounds"],
        },
    },
    "Primary One": {
        "First Term": {
            "Living and Non-Living Things": ["Characteristics of Living Things", "Identifying Objects", "Needs of Living Things"],
            "Parts of the Body": ["Head, Trunk, Limbs", "The Five Senses", "Functions of Body Parts"],
        },
        "Second Term": {
            "Animals Around Us": ["Domestic Animals", "Wild Animals", "Sounds Animals Make", "Homes of Animals"],
            "Plants Around Us": ["Parts of a Plant", "Types of Plants", "What Plants Need to Grow"],
        },
        "Third Term": {
            "Food and Water": ["Sources of Food", "Types of Food", "Importance of Water", "Healthy Eating Habits"],
            "Our Environment": ["Keeping our surroundings clean", "Air and Water"],
        },
    },
    "Primary Two": {
        "First Term": {
            "Growth and Changes": ["How Plants Grow", "How Animals Grow", "Changes in Humans"],
            "Movement": ["How Animals Move", "Movement in Plants"],
        },
        "Second Term": {
            "The Skeleton and Muscles": ["Bones in our Body", "The function of the Skeleton", "Muscles and Movement"],
            "Feeding Habits of Animals": ["Herbivores", "Carnivores", "Omnivores"],
        },
        "Third Term": {
            "Safety": ["Safety at Home", "Safety at School", "Road Safety"],
            "The Earth and Sky": ["Day and Night", "The Sun, Moon, and Stars"],
        },
    },
    "Primary Three": {
        "First Term": {
            "The Human Body Systems": ["The Skeletal System", "The Digestive System"],
            "Matter": ["States of Matter (Solid, Liquid, Gas)", "Changes in state (melting, freezing)"],
        },
        "Second Term": {
            "Energy": ["Sources of energy", "Uses of energy", "Light and sound energy"],
            "Simple Machines": ["Lever", "Pulley", "Inclined Plane"],
        },
        "Third Term": {
            "The Environment": ["Soil types", "Water cycle", "Pollution (Air, Water)"],
            "Plants": ["Photosynthesis (simple concept)", "Reproduction in plants (flowers and seeds)"],
        },
    },
    "Primary Four": {
        "First Term": {
            "Ecosystems": ["What is an ecosystem?", "Habitats (forest, desert, aquatic)", "Adaptation of plants and animals"],
            "Food Chains": ["Producers, Consumers, Decomposers", "Constructing simple food chains"],
        },
        "Second Term": {
            "The Solar System": ["The Sun and the Planets", "Earth's rotation and revolution"],
            "Electricity": ["Simple circuits", "Conductors and Insulators", "Sources of electricity"],
        },
        "Third Term": {
            "Forces": ["Push and Pull", "Friction", "Gravity", "Magnetism"],
            "Health": ["Communicable diseases", "Personal hygiene and sanitation"],
        },
    },
    "Primary Five": {
        "First Term": {
            "Cells": ["Introduction to plant and animal cells", "Parts of a cell (nucleus, cytoplasm, cell membrane)"],
            "Classification of Living Things": ["Vertebrates and Invertebrates", "Flowering and Non-flowering plants"],
        },
        "Second Term": {
            "Human Body Systems II": ["The Respiratory System", "The Circulatory System", "The Nervous System"],
            "Forces and Motion": ["Speed", "Effects of forces on motion"],
        },
        "Third Term": {
            "Reproduction": ["Reproduction in animals", "Reproduction in humans (basic concepts)"],
            "Environment and Conservation": ["Natural resources", "Conservation of resources", "Effects of human activities on the environment"],
        },
    },
    "Primary Six": {
        "First Term": {
            "Energy Conversion": ["Forms of energy (kinetic, potential, chemical)", "Energy changing from one form to another"],
            "Technology": ["Uses of technology in daily life", "Simple technological devices"],
        },
        "Second Term": {
            "Earth Science": ["Rocks and Minerals", "Weathering and Erosion", "Natural Disasters"],
            "Space Exploration": ["Satellites", "Rockets", "Achievements in space exploration"],
        },
        "Third Term": {
            "Genetics and Evolution": ["Heredity (simple concept of passing traits)", "Introduction to Evolution"],
            "Scientific Method and Revision": ["Steps of the scientific method", "Review of all primary science topics"],
        },
    },
    "Year 1": {
      "Semester 1": {
        "General Biology I (Cell Biology & Genetics)": ["The Cell Theory", "Prokaryotic vs Eukaryotic Cells", "Cell Organelles", "Mitosis and Meiosis", "Mendelian Genetics"],
        "General Chemistry I": ["Atomic Structure", "Periodic Table", "Chemical Bonds", "Solutions and Concentrations"],
        "Mathematics for Biologists": ["Basic Algebra", "Logarithms", "Basic Calculus", "Introduction to Statistics"],
        "Communication Skills": ["Scientific Writing", "Oral Presentations", "Citing Sources", "Library Research"]
      },
      "Semester 2": {
        "General Biology II (Organismal Biology)": ["Diversity of Life", "Plant Form and Function", "Animal Form and Function", "Introduction to Ecology"],
        "General Chemistry II": ["Chemical Kinetics", "Equilibrium", "Acids and Bases", "Introduction to Organic Chemistry"],
        "Introduction to Physics": ["Mechanics", "Heat and Thermodynamics", "Light and Optics", "Electricity"],
        "Use of Library": ["Information Retrieval", "Database Searching", "Evaluating Sources"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Genetics I": ["Classical Genetics", "Gene Linkage and Mapping", "Chromosomal Aberrations", "Population Genetics"],
        "General Ecology": ["Ecosystems", "Population Dynamics", "Community Interactions", "Biogeochemical Cycles"],
        "Introductory Biochemistry": ["Carbohydrates", "Lipids", "Proteins and Amino Acids", "Enzymes"],
        "Seedless Plants": ["Algae", "Fungi", "Bryophytes (Mosses)", "Pteridophytes (Ferns)"]
      },
      "Semester 2": {
        "Genetics II": ["Molecular Genetics", "DNA Replication", "Transcription and Translation", "Gene Regulation"],
        "Cell Biology": ["Membrane Structure and Function", "Cytoskeleton", "Cell Signaling", "The Cell Cycle"],
        "Seed Plants": ["Gymnosperms", "Angiosperms", "Plant Anatomy", "Plant Reproduction"],
        "Introductory Microbiology": ["Bacteriology", "Virology", "Mycology", "Microbial Ecology"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "Molecular Biology": ["DNA Technology", "Gene Cloning", "PCR and Sequencing", "Genomics and Proteomics"],
        "Animal Physiology": ["Homeostasis", "Nervous System", "Endocrine System", "Circulatory and Respiratory Systems"],
        "Plant Physiology": ["Photosynthesis", "Respiration", "Plant Hormones", "Water Relations"],
        "Biostatistics": ["Probability Distributions", "Hypothesis Testing", "Analysis of Variance (ANOVA)", "Correlation and Regression"]
      },
      "Semester 2": {
        "Immunology": ["Innate and Adaptive Immunity", "Antigens and Antibodies", "T-cells and B-cells", "Vaccines and Immunological Disorders"],
        "Developmental Biology": ["Gametogenesis", "Fertilization", "Embryonic Development", "Organogenesis"],
        "Systematics": ["Principles of Classification", "Taxonomy", "Phylogenetics", "Cladistics"],
        "Field Course/SIWES": ["Ecological Survey Methods", "Specimen Collection and Preservation", "Data Collection in the Field"]
      },
    },
     "Year 4": {
      "Semester 1": {
        "Evolutionary Biology": ["History of Evolutionary Thought", "Natural Selection", "Speciation", "Macroevolution"],
        "Conservation Biology": ["Biodiversity", "Threats to Biodiversity", "Conservation Strategies", "Population Viability Analysis"],
        "Applied Entomology": ["Insect Pest Management", "Medical Entomology", "Forensic Entomology", "Beneficial Insects"],
        "Research Methods": ["Designing an Experiment", "Literature Review", "Data Analysis", "Writing a Research Proposal"]
      },
      "Semester 2": {
        "Dissertation/Project": ["Independent Research", "Data Collection and Analysis", "Thesis Writing", "Oral Defense"],
        "Advanced Topics in Cell Biology": ["Cancer Biology", "Stem Cells", "Apoptosis", "Advanced Cell Signaling"],
        "Environmental Biology": ["Pollution Biology", "Ecotoxicology", "Climate Change Biology", "Environmental Impact Assessment"],
        "Seminar in Biology": ["Presentation of Research Findings", "Critical Analysis of Scientific Literature", "Discussion of Current Topics"]
      },
    },
  },
  // --- ACCOUNTING (Detailed Child + University) ---
  [Subject.Accounting]: {
    "Kindergarten": {
        "First Term": { "Counting Money": ["Recognizing coins", "Counting small amounts"], "Sharing": ["Concept of sharing toys and snacks equally"] },
        "Second Term": { "Saving": ["What is a piggy bank?", "Why we save money"], "Needs vs. Wants": ["Things we need (food) vs. things we want (toys)"] },
        "Third Term": { "Simple Buying": ["Role-playing buying from a shop", "Understanding 'change'"], "Keeping Track": ["Simple picture charts of money saved"] }
    },
    "Nursery One": {
        "First Term": { "More Coins and Notes": ["Identifying different currency notes", "Value of coins and notes"], "Earning Money": ["How adults earn money (jobs)", "Classroom jobs for rewards"] },
        "Second Term": { "Spending Wisely": ["Making choices at a class 'shop'", "Thinking before buying"], "Giving": ["Concept of giving or donating"] },
        "Third Term": { "Simple Budgets": ["Planning how to use pretend money", "Saving for a class goal"] }
    },
    "Nursery Two": {
        "First Term": { "Adding Money": ["Simple addition of coin values", "Calculating costs of two items"], "Income and Expense": ["'Money In' and 'Money Out' concepts"] },
        "Second Term": { "Keeping Records": ["Simple record book for class money", "Tallying income and spending"], "Banking": ["What is a bank?", "How banks keep money safe"] },
        "Third Term": { "Business Ideas": ["What is a shop?", "Selling pretend goods"], "Profit and Loss": ["Simple idea of making more or less money than spent"] }
    },
    "Primary One": {
        "First Term": { "Financial Literacy": ["Understanding income, savings, and spending", "Basic budgeting"], "Record Keeping": ["Keeping a simple personal diary of money"] },
        "Second Term": { "Business Basics": ["What is a business?", "Buying and selling"], "Simple Transactions": ["Calculating total cost and change"] },
        "Third Term": { "Assets": ["What you own (toys, books)", "Taking care of personal assets"] }
    },
    "Primary Two": {
        "First Term": { "Budgeting": ["Creating a simple weekly budget for pocket money", "Tracking expenses"], "Banking Basics": ["Savings accounts", "How interest works (earning extra money)"] },
        "Second Term": { "Costing": ["Calculating the cost to make a simple item (e.g., a sandwich)", "Concept of price"] },
        "Third Term": { "Financial Decisions": ["Comparing prices", "Making choices based on a budget"] }
    },
    "Primary Three": {
        "First Term": { "Double-Entry Concept": ["Simple T-accounts (What I Got vs. What I Gave)", "Introduction to Debit and Credit"], "Ledgers": ["Creating a simple ledger for a class store"] },
        "Second Term": { "Financial Statements": ["Very simple Income Statement (Money In - Money Out = Profit)", "Simple Balance Sheet (What I Have = What I Owe + My Share)"] },
        "Third Term": { "Ethics in Accounting": ["Honesty in handling money", "Importance of being accurate"] }
    },
    "Primary Four": {
        "First Term": { "Partnerships": ["Running a business with a friend", "Sharing profits and tasks"], "Source Documents": ["Understanding receipts and invoices"] },
        "Second Term": { "Cash Book": ["Recording cash transactions", "Simple bank reconciliation"] },
        "Third Term": { "Depreciation": ["Concept that things lose value over time (e.g., a bicycle)", "Simple calculation"] }
    },
    "Primary Five": {
        "First Term": { "Company Concepts": ["What is a company?", "Owners (shareholders)", "Limited liability (simple idea)"], "Cost Accounting": ["Fixed vs. Variable costs (rent vs. materials)"] },
        "Second Term": { "Budgetary Control": ["Comparing budget to actual spending", "Making adjustments"], "Ratio Analysis": ["Simple ratios (e.g., profit margin)"] },
        "Third Term": { "Auditing": ["What is an audit?", "The role of checking for accuracy and honesty"] }
    },
    "Primary Six": {
        "First Term": { "Advanced Financial Statements": ["More detailed income statements and balance sheets", "Introduction to cash flow"], "Investment": ["What it means to invest money", "Simple risk and return"] },
        "Second Term": { "Taxation": ["Why we pay taxes", "How tax money is used"], "Management Accounting": ["Using financial information to make decisions"] },
        "Third Term": { "Career in Accounting": ["What accountants do", "Different types of accountants"], "Revision Project": ["Running a complete 'business' for a month with all accounting records"] }
    },
    "Year 1": {
      "Semester 1": {
        "Principles of Accounting I": ["Introduction to Accounting", "The Accounting Equation", "Debits and Credits", "Journalizing Transactions", "Posting to Ledgers", "Trial Balance"],
        "Business Mathematics I": ["Ratios and Proportions", "Percentages and Simple Interest", "Linear Equations", "Basic Algebra"],
        "Introduction to Business": ["Forms of Business Ownership", "Business Environment", "Functions of a Business", "Business Ethics"],
        "Microeconomics": ["Supply and Demand", "Elasticity", "Consumer Theory", "Market Structures"]
      },
      "Semester 2": {
        "Principles of Accounting II": ["Adjusting Entries", "Closing Entries", "Financial Statements", "Accounting for Merchandising Operations"],
        "Business Mathematics II": ["Compound Interest", "Annuities", "Break-Even Analysis", "Trade and Cash Discounts"],
        "Business Law": ["Law of Contract", "Law of Agency", "Sale of Goods Act"],
        "Macroeconomics": ["National Income Accounting", "Inflation and Unemployment", "Monetary and Fiscal Policy", "International Trade"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Financial Accounting I": ["Accounting Standards (IFRS/GAAP)", "Accounting for Current Assets", "Accounting for Non-Current Assets", "Partnership Accounts"],
        "Cost Accounting": ["Cost Concepts and Classification", "Job Order Costing", "Process Costing", "Cost-Volume-Profit Analysis"],
        "Company Law": ["Incorporation of Companies", "Memorandum and Articles of Association", "Shares and Debentures", "Directors and Meetings"],
        "Business Statistics": ["Measures of Central Tendency", "Measures of Dispersion", "Correlation and Regression", "Probability Distributions"]
      },
      "Semester 2": {
        "Financial Accounting II": ["Company Accounts (Financial Statements)", "Cash Flow Statements", "Interpretation of Financial Statements", "Accounting for Leases"],
        "Management Accounting": ["Budgeting and Budgetary Control", "Standard Costing and Variance Analysis", "Decision Making Techniques", "Performance Measurement"],
        "Introduction to Finance": ["Time Value of Money", "Risk and Return", "Capital Budgeting Techniques", "Working Capital Management"],
        "Information Technology for Accountants": ["Accounting Software (e.g., QuickBooks, Sage)", "Spreadsheet Skills for Accountants", "Database Management Systems", "Cybersecurity for Financial Data"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Advanced Financial Accounting I": ["Consolidated Financial Statements", "Accounting for Business Combinations", "Foreign Currency Transactions", "Segment Reporting"],
        "Auditing and Assurance I": ["Introduction to Auditing", "Audit Planning and Risk Assessment", "Internal Control Systems", "Audit Evidence"],
        "Taxation I": ["Principles of Taxation", "Personal Income Tax", "Company Income Tax", "Value Added Tax (VAT)"],
        "Public Sector Accounting": ["Introduction to Government Accounting", "Treasury Single Account (TSA)", "IPSAS Standards", "Budgeting in the Public Sector"]
      },
      "Semester 2": {
        "Advanced Financial Accounting II": ["Accounting for Financial Instruments", "Share-Based Payments", "Earnings Per Share", "Interim Financial Reporting"],
        "Auditing and Assurance II": ["Audit Sampling", "Audit of Cycles (Revenue, Expenditure)", "Completing the Audit", "Audit Reporting"],
        "Taxation II": ["Capital Gains Tax", "Petroleum Profits Tax", "Tax Audit and Investigation", "International Taxation"],
        "Corporate Finance": ["Capital Structure Decisions", "Dividend Policy", "Mergers and Acquisitions", "Valuation of Businesses"]
      },
    },
    "Year 4": {
        "Semester 1": {
            "Forensic Accounting": ["Introduction to Forensic Accounting", "Fraud Schemes", "Litigation Support", "Investigation Techniques"],
            "International Accounting": ["Comparative Accounting Systems", "International Financial Reporting Standards (IFRS)", "Accounting for Multinational Corporations", "Harmonization of Accounting Standards"],
            "Accounting Theory": ["Development of Accounting Thought", "Normative and Positive Theories", "Conceptual Framework", "Measurement Theory"],
            "Strategic Management": ["SWOT Analysis", "Porter's Five Forces", "Strategic Planning Process", "Implementation and Control"]
        },
        "Semester 2": {
            "Advanced Management Accounting": ["Strategic Management Accounting", "Activity-Based Costing and Management", "Target Costing and Life Cycle Costing", "Performance Measurement and Evaluation (Balanced Scorecard)"],
            "Accounting Information Systems": ["Systems Analysis and Design", "Database Design for Accounting", "Internal Controls in AIS", "Auditing of Information Systems"],
            "Dissertation/Project": ["Research Proposal", "Literature Review", "Data Collection and Analysis", "Final Report Writing"],
            "Professional Ethics": ["Code of Conduct for Professional Accountants", "Ethical Dilemmas in Accounting", "Corporate Governance", "Social Responsibility Accounting"]
        },
    },
  },
  // --- LAW (Detailed Child + University) ---
  [Subject.Law]: {
    "Kindergarten": {
        "First Term": { "Rules": ["Why we have rules at home and school", "Following rules"], "Sharing and Fairness": ["Taking turns", "Being fair to friends"] },
        "Second Term": { "Community Helpers": ["The role of Police Officers", "The role of Teachers"], "Right and Wrong": ["Understanding simple consequences"] },
        "Third Term": { "Promises": ["What it means to keep a promise", "Honesty"], "Classroom Court": ["Solving simple disputes fairly"] }
    },
    "Nursery One": {
        "First Term": { "Safety Rules": ["Road safety", "Safety at the playground"], "Property": ["Respecting others' belongings", "Asking before taking"] },
        "Second Term": { "Authority": ["Listening to parents and teachers", "Who makes the rules?"], "Making Amends": ["Saying sorry", "Fixing a mistake"] },
        "Third Term": { "Group Agreements": ["Making rules for a game together", "Cooperation"] }
    },
    "Nursery Two": {
        "First Term": { "Contracts as Promises": ["Making a deal (e.g., 'If you help me, I'll help you')", "Handshake agreements"], "Truthfulness": ["Why telling the truth is important"] },
        "Second Term": { "The Role of a Judge": ["A judge helps solve problems fairly", "Listening to both sides of a story"], "Laws vs. Rules": ["School rules vs. laws for everyone"] },
        "Third Term": { "Consequences": ["Natural consequences of actions", "Rules having consequences"] }
    },
    "Primary One": {
        "First Term": { "Introduction to Law": ["What are laws?", "How laws keep us safe"], "The Constitution": ["A special set of rules for the whole country (simple concept)"] },
        "Second Term": { "Rights and Responsibilities": ["My right to be safe", "My responsibility to be kind"], "The Courtroom": ["Who is in a courtroom? (Judge, lawyers)"] },
        "Third Term": { "Making Laws": ["How leaders are chosen (voting)", "How they make rules for everyone"] }
    },
    "Primary Two": {
        "First Term": { "Types of Laws": ["Criminal Law (breaking big rules)", "Civil Law (disagreements between people)"], "Evidence": ["What is proof?", "Using facts to tell a story"] },
        "Second Term": { "Contracts": ["Written promises", "What happens if a promise is broken?"], "Property Law": ["What does it mean to own something?"] },
        "Third Term": { "Mock Trial": ["Acting out a simple case (e.g., The Case of the Missing Crayon)"] }
    },
    "Primary Three": {
        "First Term": { "The Nigerian Legal System": ["Different types of courts", "The role of the police"], "Human Rights": ["Basic rights for all children"] },
        "Second Term": { "Torts (Civil Wrongs)": ["The idea of negligence (not being careful)", "Accidents and responsibility"], "Family Law": ["Rules about families and children"] },
        "Third Term": { "The Legislature": ["Who makes the laws in Nigeria?", "The National Assembly"] }
    },
    "Primary Four": {
        "First Term": { "Criminal Procedure": ["From arrest to trial (simple steps)", "Innocent until proven guilty"], "The Role of a Lawyer": ["Helping people understand the law"] },
        "Second Term": { "Environmental Law": ["Laws to protect nature", "Rules against pollution"], "Consumer Rights": ["Laws that protect people who buy things"] },
        "Third Term": { "Debate": ["Debating a topic about fairness or rules"] }
    },
    "Primary Five": {
        "First Term": { "Constitutional Law": ["The three branches of government", "Checks and balances"], "Democracy and Elections": ["The importance of voting"] },
        "Second Term": { "International Law": ["Rules for how countries treat each other", "The United Nations"], "Intellectual Property": ["Owning an idea (copyright for stories, patents for inventions)"] },
        "Third Term": { "Moot Court": ["Preparing and arguing a more complex mock case"] }
    },
    "Primary Six": {
        "First Term": { "Advanced Legal Concepts": ["Due process", "Justice and equality before the law"], "Administrative Law": ["Rules for government agencies"] },
        "Second Term": { "Company Law": ["Rules for businesses", "The idea of a company as a 'person'"], "Ethics for Lawyers": ["The duties of a lawyer"] },
        "Third Term": { "Careers in Law": ["Different jobs in the legal profession"], "Final Project": ["Researching a simple law and its effect on society"] }
    }
  },
  // --- COMPUTER SCIENCE / SOFTWARE ENGINEERING / CODING (Detailed Child + University) ---
  ...(() => {
    const csCurriculum = {
      "Kindergarten": {
          "First Term": { "What is a Computer?": ["Identifying parts (screen, keyboard, mouse)", "Computer vs. Human"], "Giving Instructions": ["Simon Says as an algorithm", "Following a sequence of steps"] },
          "Second Term": { "Patterns": ["Recognizing and creating patterns", "Patterns in technology"], "Sorting": ["Sorting objects by color, size, shape"] },
          "Third Term": { "Logic Puzzles": ["Simple 'if this, then that' games", "Problem-solving with blocks"] }
      },
      "Nursery One": {
          "First Term": { "Algorithms": ["Creating step-by-step instructions for a task (e.g., making a sandwich)", "Debugging: Finding what's wrong with instructions"], "Mouse and Keyboard Skills": ["Clicking, dragging, simple typing"] },
          "Second Term": { "Introduction to 'Code'": ["Code is a language for computers", "Unplugged coding games"], "Sequencing": ["Putting story pictures in the correct order"] },
          "Third Term": { "Loops": ["The idea of repeating an action", "Songs and dances with repeating parts"] }
      },
      "Nursery Two": {
          "First Term": { "Block-Based Coding Intro": ["Using simple block coding apps (e.g., ScratchJr)", "Making a character move"], "Decomposition": ["Breaking a big problem into smaller parts"] },
          "Second Term": { "Conditionals": ["'If' statements (e.g., 'if' you touch the red block, say 'ouch!')"], "Events": ["'When the green flag is clicked...' concept"] },
          "Third Term": { "Creative Projects": ["Making a simple animation or story", "Sharing creations"] }
      },
      "Primary One": {
          "First Term": { "Digital Citizenship": ["Staying safe online", "Being kind to others online"], "Hardware vs. Software": ["Physical parts vs. programs"] },
          "Second Term": { "Variables": ["A box to hold a number or word (like a score)", "Using variables in block coding"], "Basic Debugging": ["Finding and fixing mistakes in code"] },
          "Third Term": { "Project: Digital Storytelling": ["Planning and creating a story with code"] }
      },
      "Primary Two": {
          "First Term": { "The Internet": ["How does the internet work? (simple model)", "What is a website?"], "Functions": ["Creating a block of code you can use again"] },
          "Second Term": { "Data": ["What is data?", "Collecting and organizing class data (e.g., favorite colors)"], "Binary": ["The 'on/off' language of computers (0s and 1s)"] },
          "Third Term": { "Project: Build a Simple Game": ["Using block coding to create a game with rules and a score"] }
      },
      "Primary Three": {
          "First Term": { "User Interface (UI)": ["What makes a program easy to use?", "Designing a simple app layout on paper"], "Paired Programming": ["Working with a partner to solve a coding challenge"] },
          "Second Term": { "Introduction to Text-Based Coding": ["Looking at simple Python or JavaScript code", "Understanding syntax"], "Loops and Conditionals in Text": ["'for' loops and 'if/else' statements"] },
          "Third Term": { "Project: Interactive Quiz": ["Coding a quiz that asks questions and checks answers"] }
      },
      "Primary Four": {
          "First Term": { "Software Development Life Cycle": ["Plan -> Design -> Code -> Test -> Release (simplified)", "Working on a team project"], "Version Control": ["The idea of saving different versions of your work"] },
          "Second Term": { "Cybersecurity Basics": ["What are viruses?", "Creating strong passwords"], "Web Development Basics": ["What is HTML? (structure)", "What is CSS? (style)"] },
          "Third Term": { "Project: Create a Simple Webpage": ["Using HTML and CSS to build a personal webpage"] }
      },
      "Primary Five": {
          "First Term": { "Advanced Programming Concepts": ["Arrays/Lists", "Nested loops", "More complex functions"], "Introduction to AI": ["What is Artificial Intelligence?", "How machines learn from data"] },
          "Second Term": { "Databases": ["What is a database?", "Organizing information in tables"], "JavaScript for Websites": ["Making webpages interactive"] },
          "Third Term": { "Project: Dynamic Website": ["Building a website that responds to user input with JavaScript"] }
      },
      "Primary Six": {
          "First Term": { "Object-Oriented Programming (OOP) Concepts": ["Objects have properties and methods (e.g., a 'car' object has a 'color' and can 'drive')", "Simplified introduction"], "Agile Methodologies": ["Working in 'sprints'", "Daily stand-ups"] },
          "Second Term": { "Networking Basics": ["IP addresses", "How data travels across the internet"], "Ethical Hacking": ["Thinking like a hacker to find weaknesses and fix them"] },
          "Third Term": { "Capstone Project": ["Planning, designing, and coding a significant project", "Presenting the project to the class"] }
      },
      "Year 1": {
        "Semester 1": {
          "Introduction to Programming (Python)": [
              "Variables and Data Types",
              "Control Flow (Loops, Conditionals)",
              "Functions and Modules",
              "Basic I/O Operations"
          ],
          "Discrete Mathematics": [
              "Set Theory",
              "Logic and Propositional Calculus",
              "Graph Theory Basics",
              "Combinatorics"
          ],
          "Fundamentals of Computer Hardware": [
              "CPU Architecture",
              "Memory Hierarchy",
              "Input/Output Devices",
              "Binary Representation"
          ],
          "Communication Skills": ["Technical Writing", "Presentation Skills", "Team Communication"]
        },
        "Semester 2": {
          "Data Structures": [
              "Arrays and Lists",
              "Stacks and Queues",
              "Trees and Graphs",
              "Hash Tables"
          ],
          "Object-Oriented Programming (Java)": [
              "Classes and Objects",
              "Inheritance and Polymorphism",
              "Encapsulation and Abstraction",
              "Interfaces and Abstract Classes"
          ],
          "Computer Architecture": ["Instruction Set Architecture", "Pipelining", "Memory Systems", "Bus Structures"],
          "Calculus for Computing": ["Limits and Derivatives", "Integration", "Sequences and Series"]
        },
      },
      "Year 2": {
        "Semester 1": {
          "Algorithms": ["Asymptotic Notation (Big O)", "Sorting and Searching Algorithms", "Greedy Algorithms", "Dynamic Programming", "Graph Algorithms"],
          "Operating Systems": ["Process Management and Scheduling", "Memory Management", "File Systems", "Concurrency and Deadlocks"],
          "Database Systems I": ["Relational Model", "SQL (Data Definition, Data Manipulation)", "Entity-Relationship Modeling", "Database Normalization (1NF, 2NF, 3NF)"],
          "Linear Algebra": ["Vectors and Matrices", "Determinants", "Vector Spaces", "Eigenvalues and Eigenvectors"]
        },
        "Semester 2": {
          "Software Engineering": ["Software Development Life Cycles (Waterfall, Agile)", "Requirements Engineering", "UML Diagrams", "Software Testing"],
          "Computer Networks": ["OSI and TCP/IP Models", "Application Layer Protocols (HTTP, DNS)", "Transport Layer (TCP, UDP)", "IP Addressing and Subnetting"],
          "Web Development (Frontend)": ["HTML5 and CSS3", "JavaScript Fundamentals", "DOM Manipulation", "Introduction to a JS Framework (e.g., React)"],
          "Probability and Statistics": ["Probability Theory", "Random Variables", "Statistical Inference", "Regression Analysis"]
        },
      },
       "Year 3": {
        "Semester 1": {
          "Theory of Computation": ["Finite Automata and Regular Languages", "Context-Free Grammars", "Turing Machines", "Computability and Undecidability"],
          "Artificial Intelligence": ["Search Algorithms (BFS, DFS, A*)", "Knowledge Representation", "Logic and Reasoning", "Introduction to Machine Learning"],
          "Compiler Design": ["Lexical Analysis", "Syntax Analysis (Parsing)", "Semantic Analysis", "Code Generation and Optimization"],
          "Web Development (Backend)": ["Server-side Programming (e.g., Node.js/Express)", "REST APIs", "Databases and ORMs", "Authentication and Authorization"]
        },
        "Semester 2": {
          "Cybersecurity Fundamentals": ["Cryptography Basics (Symmetric, Asymmetric)", "Network Security", "Web Security (XSS, SQL Injection)", "Access Control"],
          "Machine Learning": ["Supervised Learning (Regression, Classification)", "Unsupervised Learning (Clustering)", "Model Evaluation", "Neural Networks Introduction"],
          "Mobile App Development": ["UI/UX for Mobile", "Building a Simple App (e.g., Android/iOS)", "State Management", "API Integration"],
          "Industrial Training (SIWES)": ["Practical experience in a software development company."]
        },
      },
       "Year 4": {
        "Semester 1": {
          "Distributed Systems": ["Characterization of Distributed Systems", "System Models", "Interprocess Communication", "Distributed File Systems"],
          "Cryptography": ["Classical Ciphers", "Modern Symmetric Ciphers (DES, AES)", "Public-Key Cryptography (RSA)", "Digital Signatures and Hash Functions"],
          "Advanced Algorithms": ["NP-Completeness", "Approximation Algorithms", "Randomized Algorithms", "String Matching Algorithms"],
          "Research Methods": ["Literature Review", "Formulating a Research Question", "Experimental Design", "Writing a Research Paper"]
        },
        "Semester 2": {
          "Cloud Computing": ["Virtualization", "Cloud Service Models (IaaS, PaaS, SaaS)", "Cloud Storage", "Introduction to AWS/Azure/GCP"],
          "Natural Language Processing": ["Text Processing", "Language Models", "Sentiment Analysis", "Machine Translation"],
          "Final Year Project": ["Project Proposal", "System Design and Implementation", "Testing and Evaluation", "Final Report and Defense"],
          "Professional Ethics in Computing": ["Codes of Conduct (ACM/IEEE)", "Privacy", "Intellectual Property", "Social Impact of Computing"]
        },
      },
    };
    return {
      [Subject.ComputerScience]: csCurriculum,
      [Subject.SoftwareEngineering]: csCurriculum,
      [Subject.Coding]: csCurriculum,
    };
  })(),
  // --- PHYSICS (Detailed Child + University) ---
  [Subject.Physics]: {
    "Kindergarten": {
        "First Term": { "Push and Pull": ["What is a force?", "Moving toys"], "Light and Shadow": ["Making shadows", "Sources of light"] },
        "Second Term": { "Floating and Sinking": ["Testing objects in water", "Heavy vs. Light"], "Sound": ["Making different sounds", "Loud vs. Soft"] },
        "Third Term": { "Magnets": ["What do magnets stick to?", "North and South poles"] }
    },
    "Nursery One": {
        "First Term": { "Movement": ["Fast and Slow", "Up and Down"], "Colors": ["Mixing colors", "Rainbows"] },
        "Second Term": { "States of Matter": ["Solids, Liquids (water, juice)", "Feeling air (gas)"], "Day and Night": ["The sun gives us light"] },
        "Third Term": { "Simple Machines": ["Ramps (inclined planes)", "Wheels"] }
    },
    "Nursery Two": {
        "First Term": { "Energy": ["We need energy to play (from food)", "Sun as a source of energy"], "Electricity Safety": ["Things that use electricity", "Being safe around plugs"] },
        "Second Term": { "Heat": ["Hot and Cold", "Where does heat come from?"], "Vibrations and Sound": ["Feeling vibrations", "How sound travels through air"] },
        "Third Term": { "Gravity": ["What goes up must come down", "Why we don't float away"] }
    },
    "Primary One": {
        "First Term": { "Forces": ["Balanced and Unbalanced forces", "Friction (what makes things stop)"], "Materials": ["Properties of materials (hard, soft, bendy)"] },
        "Second Term": { "Light": ["Reflection (mirrors)", "Transparent, Translucent, Opaque"], "Sound Travels": ["Sound through different materials"] },
        "Third Term": { "Simple Circuits": ["Making a bulb light up with a battery and wires", "Switches"] }
    },
    "Primary Two": {
        "First Term": { "Energy Forms": ["Light, heat, sound energy", "Energy can change forms"], "Levers": ["Introduction to levers", "Seesaws"] },
        "Second Term": { "Magnetism": ["Magnetic fields", "Making a simple compass"], "Weather": ["Sun's role in weather", "Wind"] },
        "Third Term": { "Measurement": ["Measuring length, weight, and volume", "Introduction to scientific measurement"] }
    },
    "Primary Three": {
        "First Term": { "States of Matter": ["Melting and Freezing", "Evaporation and Condensation"], "Forces in Motion": ["Inertia", "How forces change motion"] },
        "Second Term": { "Light and Color": ["Refraction (bending light)", "How we see color"], "Static Electricity": ["Balloons sticking to walls", "Positive and negative charges"] },
        "Third Term": { "Renewable Energy": ["Sun, wind, and water as energy sources", "Saving energy"] }
    },
    "Primary Four": {
        "First Term": { "Circuits and Electricity": ["Series and Parallel circuits", "Conductors and Insulators"], "Sound Waves": ["Pitch and Volume", "How sound waves travel"] },
        "Second Term": { "Work and Energy": ["Defining 'work' in physics", "Potential and Kinetic energy"], "The Solar System": ["Gravity's role in keeping planets in orbit"] },
        "Third Term": { "Optics": ["Lenses (magnifying glass)", "How eyes work"] }
    },
    "Primary Five": {
        "First Term": { "Newton's Laws of Motion": ["First Law (Inertia)", "Second Law (F=ma simplified)", "Third Law (Action-Reaction)"], "Pressure": ["Air pressure", "Water pressure"] },
        "Second Term": { "Electromagnetism": ["Making an electromagnet", "How motors work (simple concept)"], "Heat Transfer": ["Conduction, Convection, Radiation"] },
        "Third Term": { "The Atom": ["Simple model of the atom (protons, neutrons, electrons)", "Elements"] }
    },
    "Primary Six": {
        "First Term": { "Energy Conservation": ["Energy cannot be created or destroyed", "Tracking energy transformations"], "Wave Properties": ["Amplitude, Frequency, Wavelength"] },
        "Second Term": { "Introduction to Relativity": ["Speed of light is special (simple concept)", "Time and space are connected"], "Density": ["Why some things float and others sink in the same liquid"] },
        "Third Term": { "The Universe": ["Galaxies, stars, and planets", "The Big Bang (simple introduction)"], "Science Fair Project": ["Designing and conducting a simple physics experiment"] }
    }
  },
  // --- CHEMISTRY (Detailed Child + University) ---
  [Subject.Chemistry]: {
    "Kindergarten": {
        "First Term": { "Exploring Materials": ["Hard vs. Soft", "Rough vs. Smooth"], "Mixing Things": ["Mixing water and sand", "Mixing water and salt"] },
        "Second Term": { "Water": ["Water can be liquid or solid (ice)", "Things that dissolve in water"], "Colors": ["Mixing primary colors"] },
        "Third Term": { "Kitchen Chemistry": ["Watching bread rise", "Cooking as a change"] }
    },
    "Nursery One": {
        "First Term": { "States of Matter": ["Identifying solids, liquids, and gases", "Playing with ice, water, and steam (with supervision)"], "Floating and Sinking": ["Predicting and testing objects"] },
        "Second Term": { "Properties": ["Describing objects (color, shape, texture)", "Magnetic vs. Non-magnetic"], "Simple Reactions": ["Baking soda and vinegar fizz"] },
        "Third Term": { "Growing Crystals": ["Making sugar or salt crystals", "Observing changes"] }
    },
    "Nursery Two": {
        "First Term": { "Physical Changes": ["Tearing paper, melting ice", "Change of shape or state"], "Chemical Changes": ["Burning paper (with demonstration), rusting", "A new substance is formed"] },
        "Second Term": { "Solutions": ["What is a solution?", "Solute and Solvent"], "Separating Mixtures": ["Sieving, filtering, using magnets"] },
        "Third Term": { "Acids and Bases": ["Testing with litmus paper or cabbage juice", "Sour (acidic) vs. Soapy (basic)"] }
    },
    "Primary One": {
        "First Term": { "Matter": ["Everything is made of matter", "Mass and Volume (simple concepts)"], "Atoms and Molecules": ["Matter is made of tiny particles (atoms)", "Molecules are atoms joined together"] },
        "Second Term": { "The Water Cycle": ["Evaporation, Condensation, Precipitation", "Chemistry of weather"], "Reversible and Irreversible Changes": ["Melting chocolate vs. cooking an egg"] },
        "Third Term": { "Materials Science": ["Natural vs. Man-made materials", "Properties of wood, plastic, metal"] }
    },
    "Primary Two": {
        "First Term": { "Elements": ["Introduction to the idea of pure substances", "Examples like gold, oxygen, carbon"], "The Periodic Table": ["A chart of all the elements (visual introduction)"] },
        "Second Term": { "Compounds and Mixtures": ["Difference between a compound (water) and a mixture (sandy water)"], "Chemical Formulas": ["H₂O means two hydrogen and one oxygen"] },
        "Third Term": { "Combustion": ["What is needed for something to burn? (fuel, oxygen, heat)", "Fire safety"] }
    },
    "Primary Three": {
        "First Term": { "Chemical Reactions": ["Reactants and Products", "Signs of a chemical reaction (color change, gas produced)"], "Conservation of Mass": ["Mass is not lost in a reaction (simple experiments)"] },
        "Second Term": { "Metals and Non-metals": ["Properties of metals (shiny, conduct electricity)", "Properties of non-metals"], "Alloys": ["Mixing metals to make them stronger (e.g., steel)"] },
        "Third Term": { "Plastics and Polymers": ["What are plastics?", "Long chains of molecules (polymers)"] }
    },
    "Primary Four": {
        "First Term": { "Atomic Structure": ["Protons, Neutrons, Electrons", "The nucleus and electron shells"], "Ions": ["Atoms that have gained or lost electrons"] },
        "Second Term": { "Chemical Bonding": ["Ionic bonds (giving/taking electrons)", "Covalent bonds (sharing electrons)"], "Simple Chemical Equations": ["Balancing simple equations"] },
        "Third Term": { "Acids, Bases, and pH": ["The pH scale", "Neutralization reactions"], "Everyday Chemistry": ["Chemistry in cooking, cleaning, and medicine"] }
    },
    "Primary Five": {
        "First Term": { "Rates of Reaction": ["How temperature and concentration affect reaction speed", "Catalysts"], "Organic Chemistry": ["Introduction to carbon compounds", "Hydrocarbons"] },
        "Second Term": { "Redox Reactions": ["Oxidation and Reduction (gaining/losing oxygen or electrons)", "Batteries"], "Electrochemistry": ["Using electricity to cause chemical reactions (electrolysis)"] },
        "Third Term": { "Environmental Chemistry": ["Air and water pollution", "The role of chemists in protecting the environment"] }
    },
    "Primary Six": {
        "First Term": { "The Mole Concept": ["A way of counting atoms (simple introduction)", "Molar mass"], "Stoichiometry": ["Using balanced equations to predict amounts"] },
        "Second Term": { "Thermodynamics": ["Exothermic and Endothermic reactions", "Energy changes in reactions"], "Biochemistry": ["The chemistry of life (carbohydrates, proteins)"] },
        "Third Term": { "Famous Chemists and Discoveries": ["Learning about scientists like Marie Curie and Lavoisier"], "Final Project": ["Investigating a chemical question through experiments"] }
    },
    "Year 1": {
      "Semester 1": {
        "General Chemistry I (Principles)": ["Atomic Theory and Structure", "Stoichiometry and Chemical Reactions", "The Periodic Table and Periodicity", "Gas Laws and Kinetic Theory"],
        "Calculus I": ["Limits and Continuity", "Derivatives and Differentiation Rules", "Applications of Differentiation", "Introduction to Integration"],
        "General Physics I (Mechanics)": ["Kinematics in 1D and 2D", "Newton's Laws of Motion", "Work, Energy, and Power", "Momentum and Collisions"],
        "Biology for Physical Sciences": ["The Chemical Basis of Life", "Cell Structure and Function", "Macromolecules (Proteins, Lipids, Carbohydrates)", "Basic Metabolism"]
      },
      "Semester 2": {
        "General Chemistry II (States of Matter & Energetics)": ["Liquids, Solids, and Intermolecular Forces", "Chemical Thermodynamics (Enthalpy, Entropy)", "Chemical Equilibrium", "Acids, Bases, and Buffers"],
        "Calculus II": ["Techniques of Integration", "Sequences and Series", "Vectors and the Geometry of Space", "Parametric Equations"],
        "General Physics II (E&M)": ["Electric Charge and Fields", "Gauss's Law", "Electric Potential", "Capacitance and Dielectrics"],
        "Practical Chemistry I": ["Lab Safety and Techniques", "Qualitative Analysis", "Titrations", "Basic Synthesis Experiments"]
      },
    },
    "Year 2": {
       "Semester 1": {
        "Inorganic Chemistry I": ["Atomic and Molecular Structure (VSEPR, MO Theory)", "Chemistry of Main Group Elements", "Acid-Base Theories (Lewis, Hard-Soft)", "Solid State Chemistry"],
        "Organic Chemistry I": ["Structure and Bonding", "Alkanes, Alkenes, Alkynes", "Stereochemistry", "Substitution and Elimination Reactions"],
        "Physical Chemistry I (Thermodynamics)": ["First and Second Laws of Thermodynamics", "Free Energy and Spontaneity", "Phase Equilibria", "Chemical Potential"],
        "Analytical Chemistry I": ["Gravimetric Analysis", "Volumetric Analysis (Titrations)", "Introduction to Spectroscopy (UV-Vis)", "Statistical Analysis of Data"]
       },
       "Semester 2": {
        "Inorganic Chemistry II": ["Introduction to Coordination Chemistry", "Crystal Field Theory", "Chemistry of d-block Metals", "Bioinorganic Chemistry"],
        "Organic Chemistry II": ["Spectroscopy (IR, NMR, Mass Spec)", "Aromaticity and Benzene Chemistry", "Aldehydes and Ketones", "Carboxylic Acids and Derivatives"],
        "Physical Chemistry II (Kinetics)": ["Rates of Reactions", "Rate Laws and Reaction Mechanisms", "Temperature Dependence of Reaction Rates", "Catalysis"],
        "Practical Chemistry II": ["Organic Synthesis and Purification", "Inorganic Complex Synthesis", "Kinetics Experiments", "Spectroscopic Identification"]
       },
    },
     "Year 3": {
      "Semester 1": {
        "Coordination Chemistry": ["Ligand Field Theory", "Electronic Spectra of Complexes", "Magnetic Properties of Complexes", "Reaction Mechanisms of d-block Complexes"],
        "Reaction Mechanisms in Organic Chemistry": ["Thermodynamics vs. Kinetics", "Pericyclic Reactions", "Free Radical Reactions", "Photochemistry"],
        "Quantum Chemistry": ["Postulates of Quantum Mechanics", "The Schrödinger Equation", "Particle in a Box", "The Hydrogen Atom"],
        "Instrumental Analysis": ["Chromatography (GC, HPLC)", "Atomic Spectroscopy (AAS, AES)", "Electroanalytical Methods", "Mass Spectrometry"]
      },
      "Semester 2": {
        "Transition Metal Chemistry": ["Organometallic Chemistry", "Catalysis by Transition Metal Complexes", "Chemistry of f-block Elements", "Advanced Bioinorganic Chemistry"],
        "Natural Products Chemistry": ["Terpenes and Steroids", "Alkaloids", "Carbohydrates", "Amino Acids and Peptides"],
        "Statistical Mechanics": ["Statistical Ensembles", "Partition Functions", "Applications to Ideal Gases", "Introduction to Statistical Thermodynamics"],
        "Industrial Training (SIWES)": ["Experience in a chemical industry, research lab, or quality control facility."]
      },
    },
    "Year 4": {
        "Semester 1": {
            "Advanced Organic Synthesis": ["Retrosynthetic Analysis", "Protecting Groups", "Named Reactions in Organic Synthesis", "Asymmetric Synthesis"],
            "Advanced Inorganic Chemistry": ["Advanced Organometallics", "Inorganic Materials Chemistry", "Solid State Chemistry II", "Inorganic Photochemistry"],
            "Polymer Chemistry": ["Polymerization Mechanisms", "Polymer Characterization", "Properties of Polymers", "Specialty Polymers"],
            "Research Methods & Seminar": ["Literature Search and Review", "Research Design", "Scientific Writing", "Seminar Presentation"]
        },
        "Semester 2": {
            "Photochemistry & Pericyclic Reactions": ["Woodward-Hoffmann Rules", "Cycloadditions", "Electrocyclic Reactions", "Sigmatropic Rearrangements"],
            "Organometallic Chemistry": ["Structure and Bonding", "Reactions of Organometallic Compounds", "Homogeneous Catalysis", "Applications in Synthesis"],
            "Environmental Chemistry": ["Atmospheric Chemistry", "Water Chemistry and Pollution", "Soil Chemistry", "Toxicology"],
            "Research Project/Dissertation": ["Independent research project in a chosen area of chemistry."]
        },
    },
  },
  // --- UNIVERSITY ONLY SUBJECTS ---
  [Subject.Portuguese]: {
    "Year 1": {
        "Semester 1": {
            "Elementary Portuguese I": ["Alphabet and Pronunciation", "Greetings and Introductions", "Gender and Number", "Present Tense of Regular Verbs"],
            "Introduction to Lusophone Cultures": ["Geography of Portuguese-Speaking Countries", "Overview of Portugal and Brazil", "Music and Festivals"],
            "Spoken Portuguese I": ["Basic Conversation", "Asking for Information", "Numbers, Dates, and Time"]
        },
        "Semester 2": {
            "Elementary Portuguese II": ["Common Irregular Verbs (ser, estar, ter, ir)", "Prepositions", "The Preterite Tense", "Object Pronouns"],
            "Brazilian Culture and Society": ["History Overview", "Regional Diversity", "Carnaval and Popular Culture", "Social Issues"],
            "Spoken Portuguese II": ["Talking about daily routines", "Making plans", "Shopping and Ordering Food"]
        }
    },
    "Year 2": {
        "Semester 1": {
            "Intermediate Portuguese I": ["Imperfect vs. Preterite", "The Future Tense", "The Conditional Tense", "Relative Pronouns"],
            "Readings in Brazilian Literature": ["Short stories by famous authors (e.g., Machado de Assis)", "Vocabulary building", "Reading comprehension"],
            "Portuguese Phonetics": ["Vowel and Consonant Sounds", "Nasalization", "Rhythm and Intonation"]
        },
        "Semester 2": {
            "Intermediate Portuguese II": ["The Subjunctive Mood", "Commands", "Gerund and Participles", "Advanced Grammar"],
            "Portuguese and African Cultures": ["History of Portuguese in Africa (Angola, Mozambique)", "Post-colonial Identity", "Lusophone African Music and Film"],
            "Composition and Conversation": ["Writing descriptive and narrative paragraphs", "Debates and Discussions", "Improving Fluency"]
        }
    },
    "Year 3": {
        "Semester 1": {
            "Advanced Portuguese Grammar and Syntax": ["Complex Sentence Structures", "Idiomatic Expressions", "Stylistics", "Registers of language"],
            "Survey of Portuguese Literature": ["Medieval Period", "The Age of Discoveries (Camões)", "19th Century Realism", "20th Century Modernism"],
            "Brazilian Cinema": ["Cinema Novo", "The Retomada", "Contemporary Brazilian Films", "Themes and Directors"]
        },
        "Semester 2": {
            "Advanced Composition": ["Writing Essays and Reports", "Creative Writing", "Academic Writing in Portuguese"],
            "Survey of Brazilian Literature": ["Romanticism and Realism", "Modernismo", "Contemporary Brazilian Writers", "Afro-Brazilian Literature"],
            "Internship/Language Immersion": ["Practical application of language skills."]
        }
    },
    "Year 4": {
        "Semester 1": {
            "Translation Theory and Practice": ["Translating from Portuguese to English", "Translating from English to Portuguese", "Cultural Issues in Translation"],
            "Contemporary Issues in the Lusophone World": ["Politics in Brazil and Portugal", "Social Movements", "Economic Challenges", "Environmental Issues"],
            "Seminar on a Lusophone Author": ["In-depth study of a major writer (e.g., Saramago, Lispector, Pessoa)"]
        },
        "Semester 2": {
            "Linguistics of Portuguese": ["History and Evolution of the Language", "Dialects of Portuguese (European vs. Brazilian)", "Sociolinguistics"],
            "Research Project": ["Independent research project on a topic in Portuguese language or Lusophone literature/culture."],
            "Advanced Conversation": ["Discussing complex and abstract topics", "Public Speaking", "Perfecting pronunciation and fluency"]
        }
    }
  },
   [Subject.AgriculturalScience]: {
    "Year 1": {
      "Semester 1": {
        "General Agriculture": ["History of Agriculture", "Branches of Agriculture", "Farming Systems", "Role of Agriculture in the Economy"],
        "Botany": ["Plant Cell", "Plant Tissues", "Photosynthesis", "Plant Reproduction"],
        "Zoology": ["Animal Cell", "Animal Tissues", "Classification of Animals", "Basic Animal Physiology"],
        "General Chemistry": ["Atoms and Molecules", "Chemical Bonding", "Acids and Bases", "Stoichiometry"]
      },
      "Semester 2": {
        "Agricultural Economics I": ["Introduction to Economics", "Supply and Demand in Agriculture", "Production Economics", "Farm Records"],
        "Introduction to Soil Science": ["Soil Formation", "Physical Properties of Soil", "Soil Texture and Structure", "Soil Water"],
        "Agricultural Engineering I (Mechanics)": ["Farm Tools and Implements", "Simple Machines", "Tractor Operations", "Farmstead Layout"],
        "Rural Sociology": ["Concept of Rural Society", "Social Stratification in Rural Areas", "Community Development", "Adoption and Diffusion of Innovations"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Crop Production I (Arable Crops)": ["Maize Production", "Cassava Production", "Yam Production", "Legume Production"],
        "Animal Production I (Monogastrics)": ["Poultry Production", "Swine Production", "Rabbitry", "Feeds and Feeding"],
        "Soil Chemistry and Fertility": ["Soil Colloids", "Soil pH and Liming", "Organic Matter", "Fertilizers and Manures"],
        "Agricultural Biochemistry": ["Carbohydrates", "Lipids", "Proteins", "Enzymes in Agriculture"]
      },
      "Semester 2": {
        "Crop Production II (Permanent Crops)": ["Oil Palm Production", "Cocoa Production", "Rubber Production", "Citrus Production"],
        "Animal Production II (Ruminants)": ["Cattle Production", "Sheep and Goat Production", "Pasture Management", "Animal Health"],
        "Principles of Entomology": ["Insect Morphology and Physiology", "Insect Classification", "Beneficial and Harmful Insects", "Pest Control Methods"],
        "Agricultural Statistics": ["Experimental Design", "Analysis of Variance (ANOVA)", "Regression Analysis", "Data Presentation"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Farm Management": ["Farm Planning and Budgeting", "Farm Records and Accounts", "Risk Management in Agriculture", "Resource Allocation"],
        "Agricultural Extension and Communication": ["Principles of Extension", "Extension Teaching Methods", "Program Planning in Extension", "Communication Strategies"],
        "Plant Pathology": ["Introduction to Plant Diseases", "Fungal Diseases", "Bacterial and Viral Diseases", "Disease Control Principles"],
        "Animal Breeding and Genetics": ["Principles of Inheritance", "Selection and Mating Systems", "Heritability and Repeatability", "Biotechnology in Animal Breeding"]
      },
      "Semester 2": {
        "Soil and Water Management": ["Irrigation and Drainage", "Soil Erosion and Control", "Water Harvesting", "Soil Conservation Techniques"],
        "Horticulture": ["Vegetable Production", "Fruit Production", "Floriculture", "Nursery Management"],
        "Animal Nutrition": ["Nutrient Requirements of Farm Animals", "Feedstuffs and Feed Formulation", "Digestive Physiology", "Ration Formulation"],
        "Industrial Training (SIWES)": ["Practical Farm Experience", "Agro-industrial Attachment", "Report Writing"]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Farming Systems": ["Shifting Cultivation", "Intensive Farming", "Organic Farming", "Integrated Farming Systems"],
        "Post-Harvest Technology": ["Storage of Crops", "Processing of Agricultural Products", "Food Preservation Techniques", "Value Addition"],
        "Agribusiness and Marketing": ["Agribusiness Management", "Marketing Channels for Agricultural Products", "Price Analysis", "Export Promotion"],
        "Research Methods": ["Identifying a Research Problem", "Literature Review", "Research Design", "Data Analysis and Interpretation"]
      },
      "Semester 2": {
        "Agricultural Policy and Development": ["Role of Government in Agriculture", "Land Tenure Systems", "Agricultural Finance", "International Agricultural Development"],
        "Environmental Management in Agriculture": ["Climate Change and Agriculture", "Agroforestry", "Waste Management in Agriculture", "Sustainable Agriculture"],
        "Seminar": ["Presentation on a Selected Topic", "Literature Review and Synthesis", "Public Speaking"],
        "Research Project": ["Project Execution", "Data Collection", "Data Analysis", "Final Project Write-up and Defense"]
      },
    },
  },
  [Subject.Arabic]: {
    "Year 1": {
      "Semester 1": {
        "Arabic Alphabet and Pronunciation": ["Recognizing Letters", "Vowels (Short and Long)", "Sun and Moon Letters", "Correct Articulation"],
        "Basic Arabic Grammar I (Nouns and Adjectives)": ["Definite and Indefinite Nouns", "Gender (Masculine/Feminine)", "Noun-Adjective Agreement", "Introduction to Idafa (Genitive Construction)"],
        "Introduction to Arabic Culture": ["Greetings and Etiquette", "Family and Social Structure", "Major Arab Holidays", "Geography of the Arab World"],
        "Spoken Arabic I": ["Greetings and Introductions", "Asking Basic Questions", "Numbers and Counting", "Daily Routines"]
      },
      "Semester 2": {
        "Basic Arabic Grammar II (Verbs and Prepositions)": ["The Past Tense Verb (Perfect)", "Subject Pronouns and Verb Conjugation", "Common Prepositions and their Effects", "Simple Sentence Structure (Verbal/Nominal)"],
        "Reading Simple Arabic Texts": ["Short Stories for Beginners", "News Headlines", "Simple Dialogues", "Biographical Snippets"],
        "Arabic Penmanship": ["Writing Letters in Isolation", "Joining Letters", "Ruq'ah Script Basics", "Naskh Script Basics"],
        "Spoken Arabic II": ["Shopping and Bargaining", "Ordering Food", "Giving Directions", "Talking about Hobbies"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Intermediate Arabic Grammar I (Syntax)": ["The Present and Future Tenses", "The Subjunctive and Jussive Moods", "Object Pronouns", "Complex Sentences"],
        "Modern Standard Arabic I": ["Reading Newspaper Articles", "Listening to News Broadcasts", "Writing Short Paragraphs", "Vocabulary Building"],
        "Introduction to Classical Arabic": ["Differences from MSA", "Reading simple Qur'anic verses", "Introduction to Hadith literature", "Basic Classical Prose"],
        "Media Arabic I": ["Journalistic Vocabulary", "Analyzing News Reports", "Understanding Political Commentary", "Media Idioms"]
      },
      "Semester 2": {
        "Intermediate Arabic Grammar II (Morphology)": ["The Root and Pattern System (Form I-IV)", "Derived Nouns (Masdar, Participles)", "Plural Patterns (Sound and Broken)", "The Dual"],
        "Modern Standard Arabic II": ["Writing Formal Letters", "Debates and Discussions", "Summarizing Texts", "Advanced Vocabulary"],
        "Readings in Islamic Texts": ["Selections from the Qur'an", "Selections from Hadith collections", "Introduction to Tafsir", "Biographies of the Prophet"],
        "Media Arabic II": ["Conducting Interviews", "Writing Press Releases", "Analyzing Editorials", "Broadcast Media Analysis"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Advanced Arabic Grammar": ["The Verb Forms (V-X)", "Exceptional Verbs (Hollow, Weak, Geminate)", "Conditional Sentences", "Advanced Syntactic Structures (Hal, Tamyiz)"],
        "Introduction to Arabic Literature": ["Pre-Islamic Poetry (Mu'allaqat)", "Umayyad and Abbasid Prose", "The Maqamat Genre", "Influential Arab Writers"],
        "Arabic Translation: Theory and Practice": ["Translation Strategies", "Translating from Arabic to English", "Translating from English to Arabic", "Cultural Challenges in Translation"],
        "Arabic Phonetics": ["Articulatory Phonetics of Arabic", "Phonological Rules", "Suprasegmental Features (Stress, Intonation)", "Comparative Phonetics"]
      },
      "Semester 2": {
        "Arabic Prose and Poetry": ["Analysis of Abbasid Poetry", "Modern Arabic Short Stories", "The Arabic Novel", "Literary Criticism"],
        "Advanced Conversation and Composition": ["Debating Complex Topics", "Public Speaking in Arabic", "Writing Research Papers", "Creative Writing"],
        "History of the Arabic Language": ["Proto-Semitic Roots", "Development of the Arabic Script", "The Role of the Qur'an", "Modern Language Reforms"],
        "Internship/Language Immersion": ["Practical application of language skills in a professional setting."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Sociolinguistics of the Arab World": ["Diglossia", "Code-Switching", "Language and Identity", "Dialectology"],
        "Comparative Semitic Linguistics": ["Arabic in the Semitic Family", "Phonological Correspondences", "Morphological Comparisons", "Syntactic Parallels"],
        "Advanced Readings in Arabic Literature": ["The works of Naguib Mahfouz", "Contemporary Arab Poets", "Feminist Arabic Literature", "Post-colonial Themes"],
        "Research Methods": ["Methodologies in Linguistics and Literature", "Bibliographic Research", "Developing a Thesis Proposal", "Academic Writing Standards"]
      },
      "Semester 2": {
        "Contemporary Arab Thought": ["Arab Nationalism", "Political Islam", "Modernism and Postmodernism", "Intellectual Debates in the Arab World"],
        "Arabic Stylistics and Rhetoric": ["Al-Badi' (Rhetorical Devices)", "Al-Bayan (Figurative Language)", "Al-Ma'ani (Semantics)", "Analysis of Eloquent Texts"],
        "Seminar on a Special Topic": ["In-depth study of a specific author, genre, or period."],
        "Senior Project/Thesis": ["Independent research project on a topic in Arabic language or literature."]
      },
    },
  },
  [Subject.Astronomy]: {
    "Year 1": {
      "Semester 1": {
        "Introduction to Astronomy": ["History of Astronomy", "The Celestial Sphere", "Laws of Motion and Gravity", "Telescopes and Instrumentation"],
        "University Physics I (Mechanics)": ["Kinematics", "Newton's Laws", "Work and Energy", "Rotational Motion"],
        "Calculus I": ["Limits and Continuity", "Derivatives", "Applications of Differentiation", "Integration"],
        "General Chemistry I": ["Atomic Structure", "Periodicity", "Chemical Bonding", "Stoichiometry"]
      },
      "Semester 2": {
        "The Solar System": ["Formation of the Solar System", "Terrestrial Planets", "Jovian Planets", "Minor Bodies (Asteroids, Comets)"],
        "University Physics II (E&M)": ["Electric Fields and Potentials", "Magnetic Fields", "Electromagnetic Induction", "Maxwell's Equations"],
        "Calculus II": ["Techniques of Integration", "Sequences and Series", "Parametric Equations and Polar Coordinates", "Vectors"],
        "Introduction to Programming (Python)": ["Variables and Data Types", "Control Structures", "Functions", "Data Visualization with Matplotlib"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Stellar Astrophysics": ["Stellar Properties (Luminosity, Temperature)", "Stellar Spectra and Classification", "Stellar Structure and Evolution", "H-R Diagram"],
        "University Physics III (Waves & Optics)": ["Mechanical Waves", "Sound", "Geometric Optics", "Interference and Diffraction"],
        "Differential Equations": ["First-Order ODEs", "Second-Order Linear ODEs", "Laplace Transforms", "Series Solutions"],
        "Observational Astronomy Methods": ["Coordinate Systems and Time", "Photometry", "Spectroscopy", "Telescope Operations"]
      },
      "Semester 2": {
        "Galactic Astronomy": ["The Milky Way Galaxy", "Stellar Populations", "Interstellar Medium", "Galactic Dynamics"],
        "Classical Mechanics": ["Lagrangian and Hamiltonian Mechanics", "Central Force Motion", "Non-inertial Reference Frames", "Rigid Body Motion"],
        "Introduction to Modern Physics": ["Special Relativity", "Quantum Theory Beginnings", "Atomic Structure", "Introduction to Nuclear Physics"],
        "Data Analysis in Astronomy": ["Error Analysis", "Statistical Methods", "Image Processing", "Working with Astronomical Data (FITS files)"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Extragalactic Astronomy & Cosmology": ["Types of Galaxies", "Active Galaxies and Quasars", "Large-Scale Structure", "The Big Bang Theory"],
        "Thermodynamics & Statistical Mechanics": ["Laws of Thermodynamics", "Kinetic Theory", "Statistical Ensembles", "Quantum Statistics"],
        "Electromagnetism I": ["Electrostatics", "Magnetostatics", "Maxwell's Equations in Vacuum", "Electromagnetic Waves"],
        "Computational Astrophysics": ["Numerical Methods for ODEs", "N-body Simulations", "Hydrodynamics Simulations", "Monte Carlo Methods"]
      },
      "Semester 2": {
        "General Relativity": ["Foundations of GR", "The Equivalence Principle", "Curved Spacetime", "Schwarzschild Solution and Black Holes"],
        "Quantum Mechanics I": ["Wave-Particle Duality", "Schrödinger Equation", "Hydrogen Atom", "Angular Momentum and Spin"],
        "Radiative Processes in Astrophysics": ["Radiation Fundamentals", "Bremsstrahlung", "Synchrotron Radiation", "Radiative Transfer"],
        "Internship/Research Experience": ["Working with a research group on an astronomy project."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "High-Energy Astrophysics": ["Accretion Disks", "Neutron Stars and Pulsars", "Supernovae", "Gamma-Ray Bursts"],
        "Planetary Science": ["Planetary Atmospheres", "Planetary Geology", "Exoplanets", "Astrobiology"],
        "Advanced Observational Techniques": ["Radio Astronomy", "X-ray and Gamma-ray Astronomy", "Adaptive Optics", "Interferometry"],
        "Research Methods": ["Literature Search and Review", "Proposal Writing", "Data Interpretation", "Scientific Communication"]
      },
      "Semester 2": {
        "Senior Thesis/Project": ["Independent research project culminating in a written thesis and oral defense."],
        "Seminar in Current Topics": ["Discussion of recent papers and discoveries in astronomy."],
        "Advanced Cosmology": ["Inflation", "Cosmic Microwave Background Anisotropies", "Dark Matter and Dark Energy", "Formation of Structure"],
        "Stellar Atmospheres and Interiors": ["Radiative Transfer in Stars", "Stellar Opacity", "Models of Stellar Structure", "Helioseismology"]
      },
    },
  },
  [Subject.BankingAndFinance]: {
    "Year 1": {
      "Semester 1": {
        "Principles of Economics I": ["Microeconomic Principles", "Supply and Demand", "Market Structures", "Consumer Theory"],
        "Principles of Accounting I": ["The Accounting Cycle", "Financial Statements", "Debits and Credits", "Accounting Equation"],
        "Business Mathematics I": ["Algebraic Concepts", "Simple and Compound Interest", "Annuities", "Linear Programming"],
        "Introduction to Business": ["Forms of Business", "Business Environment", "Management Functions", "Business Ethics"]
      },
      "Semester 2": {
        "Principles of Economics II": ["Macroeconomic Principles", "National Income", "Inflation and Unemployment", "Monetary and Fiscal Policy"],
        "Principles of Accounting II": ["Accounting for Partnerships", "Company Accounts", "Cash Flow Statements", "Analysis of Financial Statements"],
        "Business Mathematics II": ["Calculus for Business", "Matrix Algebra", "Probability Theory", "Statistical Inference"],
        "Introduction to Finance": ["Financial System Overview", "Time Value of Money", "Risk and Return", "Financial Instruments"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Financial Markets and Institutions": ["Money Markets", "Capital Markets", "Depository Institutions", "Non-Depository Institutions"],
        "Monetary Economics": ["Theories of Money Demand", "The Money Supply Process", "Central Banking", "Monetary Policy Tools"],
        "Business Law": ["Law of Contract", "Law of Agency", "Sale of Goods", "Negotiable Instruments"],
        "Business Statistics": ["Descriptive Statistics", "Probability Distributions", "Sampling and Estimation", "Hypothesis Testing"]
      },
      "Semester 2": {
        "Banking Operations and Ethics": ["Customer Service in Banking", "Types of Bank Accounts", "Payment Systems (Cheques, EFTs)", "Ethical Issues in Banking"],
        "Corporate Finance I": ["Capital Budgeting Decisions", "Cost of Capital", "Leverage", "Working Capital Management"],
        "Microeconomic Theory": ["Advanced Consumer Theory", "Advanced Theory of the Firm", "Game Theory", "Welfare Economics"],
        "Quantitative Techniques": ["Operations Research Models", "Network Analysis", "Decision Theory", "Inventory Management"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Investment Analysis and Portfolio Management": ["Security Valuation (Stocks and Bonds)", "Modern Portfolio Theory", "Capital Asset Pricing Model (CAPM)", "Efficient Market Hypothesis"],
        "Credit Analysis and Management": ["The 5 Cs of Credit", "Financial Statement Analysis for Lending", "Loan Structuring", "Credit Scoring Models"],
        "Financial Regulation": ["Role of Regulatory Bodies (e.g., Central Bank)", "Basel Accords", "Anti-Money Laundering (AML) Regulations", "Consumer Protection in Finance"],
        "Macroeconomic Theory": ["IS-LM Model", "Aggregate Demand and Supply", "Theories of Economic Growth", "Business Cycles"]
      },
      "Semester 2": {
        "International Finance": ["Foreign Exchange Markets", "Balance of Payments", "Exchange Rate Determination", "International Financial Institutions (IMF, World Bank)"],
        "Public Finance": ["Government Budgets", "Taxation Principles", "Public Debt Management", "Fiscal Federalism"],
        "Research Methodology": ["Formulating a Research Problem", "Literature Review", "Data Collection Methods", "Data Analysis Techniques"],
        "Industrial Training (SIWES)": ["Practical experience in a bank or financial institution."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Corporate Finance II": ["Capital Structure Theory", "Dividend Policy", "Mergers and Acquisitions", "Corporate Valuation"],
        "Financial Derivatives": ["Futures and Forwards", "Options", "Swaps", "Risk Management with Derivatives"],
        "Risk Management and Insurance": ["Types of Financial Risks", "Value at Risk (VaR)", "Credit Risk Management", "Principles of Insurance"],
        "Project Evaluation": ["Cost-Benefit Analysis", "Feasibility Studies", "Project Financing", "Managing Project Risks"]
      },
      "Semester 2": {
        "Bank Lending and Credit Administration": ["Retail Lending", "Corporate Lending", "Loan Monitoring and Recovery", "Documentation in Lending"],
        "International Banking": ["Multinational Banking Operations", "Correspondent Banking", "Trade Finance", "Syndicated Loans"],
        "Contemporary Issues in Finance": ["Financial Technology (FinTech)", "Cryptocurrencies and Blockchain", "Sustainable Finance", "Behavioral Finance"],
        "Research Project": ["Independent research project on a banking or finance topic."]
      },
    },
  },
  [Subject.BusinessAdministration]: {
     "Year 1": {
      "Semester 1": {
        "Introduction to Business": ["Nature and Scope of Business", "Forms of Business Ownership", "The Business Environment", "Social Responsibility and Ethics"],
        "Principles of Economics I": ["Microeconomics", "Supply and Demand", "Elasticity", "Market Structures"],
        "Business Mathematics I": ["Algebraic Concepts", "Functions and Graphs", "Simple and Compound Interest", "Annuities"],
        "Legal Aspects of Business I": ["Sources of Law", "Law of Contract", "Law of Agency", "Elements of Tort"]
      },
      "Semester 2": {
        "Functions of Management": ["Planning", "Organizing", "Leading", "Controlling"],
        "Principles of Economics II": ["Macroeconomics", "National Income Accounting", "Inflation and Unemployment", "Fiscal and Monetary Policy"],
        "Business Mathematics II": ["Calculus for Management", "Matrix Algebra", "Linear Programming", "Probability"],
        "Business Communication": ["Theories of Communication", "Written Communication (Memos, Reports)", "Oral Communication (Presentations)", "Interpersonal Skills"]
      },
    },
     "Year 2": {
      "Semester 1": {
        "Principles of Marketing": ["The Marketing Concept", "Marketing Environment", "Consumer Behavior", "Marketing Mix (4 Ps)"],
        "Principles of Finance": ["Introduction to Financial Management", "Time Value of Money", "Risk and Return", "Financial Statement Analysis"],
        "Human Resources Management": ["HR Planning", "Recruitment and Selection", "Training and Development", "Performance Appraisal"],
        "Quantitative Analysis": ["Statistical Inference", "Hypothesis Testing", "Correlation and Regression", "Decision Theory"]
      },
      "Semester 2": {
        "Organizational Behavior": ["Individual Behavior (Personality, Perception)", "Group Dynamics", "Leadership", "Organizational Culture and Change"],
        "Production Management": ["Operations Strategy", "Process Design and Layout", "Quality Management", "Inventory Control"],
        "Cost Accounting": ["Cost Concepts", "Job Order Costing", "Process Costing", "Cost-Volume-Profit Analysis"],
        "Computer Applications in Business": ["Spreadsheet Software (e.g., Excel)", "Database Management", "Presentation Software", "Introduction to ERP Systems"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "Business Strategy I": ["Strategic Management Process", "Internal and External Analysis (SWOT)", "Generic Competitive Strategies", "Corporate Level Strategy"],
        "Marketing Management": ["Marketing Planning", "Product and Brand Management", "Pricing Strategies", "Integrated Marketing Communications"],
        "Financial Management": ["Capital Budgeting", "Cost of Capital", "Capital Structure", "Dividend Policy"],
        "Entrepreneurship Development": ["The Entrepreneurial Mindset", "Opportunity Recognition", "Business Plan Development", "Financing a New Venture"]
      },
      "Semester 2": {
        "Business Strategy II": ["Strategy Implementation", "Strategic Control and Evaluation", "International Strategy", "Mergers and Acquisitions"],
        "International Business": ["Globalization", "Cultural Environment of International Business", "International Trade Theory", "Foreign Direct Investment"],
        "Research Methodology": ["The Research Process", "Research Design", "Data Collection Methods", "Data Analysis and Report Writing"],
        "Industrial Attachment (SIWES)": ["Practical experience in a business organization."]
      },
    },
     "Year 4": {
      "Semester 1": {
        "Corporate Policy and Strategy": ["Advanced Strategic Analysis", "Corporate Governance", "Business Ethics and Strategy", "Case Studies in Strategy"],
        "Small Business Management": ["Managing Growth", "Family Business Issues", "Marketing for Small Business", "Financial Control in Small Firms"],
        "Analysis for Business Decisions": ["Decision Making Under Uncertainty", "Forecasting Techniques", "Simulation", "Project Management (PERT/CPM)"],
        "Leadership and Corporate Governance": ["Theories of Leadership", "Role of the Board of Directors", "Shareholder vs. Stakeholder Theory", "Corporate Scandals and Reforms"]
      },
      "Semester 2": {
        "Project Management": ["Project Initiation and Planning", "Project Execution and Control", "Risk Management in Projects", "Project Closure"],
        "Contemporary Issues in Business": ["Digital Transformation", "Sustainability and Business", "The Gig Economy", "Artificial Intelligence in Business"],
        "Business Ethics": ["Ethical Theories", "Ethical Dilemmas in Business", "Corporate Social Responsibility", "Creating an Ethical Organization"],
        "Research Project": ["Independent research on a topic in business administration."]
      },
    },
  },
  [Subject.BusinessEducation]: {
    "Year 1": {
      "Semester 1": {
        "Foundations of Business Education": ["History and Philosophy of Business Education", "Objectives of Business Education", "The Business Education Curriculum", "Professionalism in Business Education"],
        "Keyboarding and Word Processing I": ["Mastery of the Keyboard", "Basic Formatting", "Document Creation (Letters, Memos)", "Speed and Accuracy Development"],
        "Introduction to Business": ["Forms of Business Ownership", "Functions of Business", "Business Environment", "Introduction to Management"],
        "General Psychology": ["Introduction to Psychology", "Learning Theories", "Motivation", "Human Development"]
      },
      "Semester 2": {
        "Keyboarding and Word Processing II": ["Advanced Formatting (Tables, Columns)", "Mail Merge", "Document Design", "Productivity Tools"],
        "Principles of Accounting": ["The Accounting Equation", "The Accounting Cycle", "Financial Statements", "Merchandising Operations"],
        "Introduction to Economics": ["Microeconomic Principles", "Macroeconomic Principles", "Supply and Demand", "National Income"],
        "Sociology of Education": ["School as a Social System", "Socialization", "Education and Social Stratification", "Education and Social Change"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Shorthand Theory": ["Principles of Shorthand", "Brief Forms and Derivatives", "Phrasing", "Transcription Techniques"],
        "Office Administration and Management": ["The Modern Office", "Office Layout and Environment", "Records Management", "Supervision in the Office"],
        "Business Law": ["Law of Contract", "Law of Agency", "Sale of Goods", "Partnership Law"],
        "Curriculum and Instruction": ["Principles of Curriculum Development", "Instructional Planning", "Teaching Strategies", "Assessment of Learning"]
      },
      "Semester 2": {
        "Shorthand Speed Development": ["Building Speed and Accuracy", "Dictation and Transcription Practice", "Specialized Vocabulary", "Proofreading"],
        "Business Communication": ["Effective Writing Skills", "Oral Presentation Skills", "Interpersonal Communication", "Business Etiquette"],
        "Marketing": ["The Marketing Concept", "Consumer Behavior", "The Marketing Mix", "Salesmanship"],
        "Educational Technology": ["Integrating Technology in the Classroom", "Instructional Software", "Multimedia Presentations", "Online Learning Tools"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "Methods of Teaching Business Subjects": ["Methods for Skill Subjects (Keyboarding, Shorthand)", "Methods for Content Subjects (Accounting, Marketing)", "Lesson Planning", "Classroom Management"],
        "Entrepreneurship in Business Education": ["Identifying Business Opportunities", "Developing a Business Plan", "Small Business Management", "Teaching Entrepreneurship"],
        "ICT in Business Education": ["Using Spreadsheets in Business Classes", "Database Applications", "Web Design for Business", "E-Commerce Concepts"],
        "Micro-teaching": ["Peer Teaching Sessions", "Feedback and Reflection", "Refining Teaching Skills"]
      },
      "Semester 2": {
        "Student Industrial Work Experience Scheme (SIWES)": ["Practical experience in an office or business setting."]
      },
    },
    "Year 4": {
        "Semester 1": {
            "Advanced Accounting": ["Partnership Accounts", "Company Accounts", "Cost Accounting Basics", "Budgeting"],
            "Management Information Systems": ["Concepts of MIS", "Information Systems in Business Functions", "Database Management", "Systems Development"],
            "Research Methods in Education": ["The Research Process", "Types of Research", "Data Collection Techniques", "Writing a Research Proposal"],
            "Teaching Practice": ["Full-time supervised teaching in a secondary school."]
        },
        "Semester 2": {
            "Vocational Guidance": ["Theories of Career Development", "Career Information Resources", "Guiding Students in Career Choices", "The Role of the Business Educator"],
            "Comparative Business Education": ["Business Education Systems in Different Countries", "Curriculum Comparisons", "Teacher Training Models", "Global Trends"],
            "Administration of Vocational Education": ["Leadership in Vocational Education", "Program Planning and Evaluation", "Financial Management", "Supervision of Instruction"],
            "Research Project": ["Independent research on a topic in business education."]
        },
    },
  },
  [Subject.ChristianReligiousStudies]: {
     "Year 1": {
      "Semester 1": {
        "Introduction to the Old Testament": ["Canon and Text of the OT", "Geography of the Ancient Near East", "Historical Background of Israel", "Major Themes of the OT"],
        "Introduction to the New Testament": ["The Intertestamental Period", "The World of the New Testament", "Canon and Text of the NT", "Overview of NT Books"],
        "History of Christianity I": ["The Apostolic Church", "The Church Fathers", "Councils and Creeds", "Christianity in the Roman Empire"],
        "Introduction to Philosophy": ["What is Philosophy?", "Logic and Argumentation", "Metaphysics", "Epistemology"]
      },
      "Semester 2": {
        "The Pentateuch": ["Genesis", "Exodus", "Leviticus, Numbers, Deuteronomy", "Theology of the Torah"],
        "The Synoptic Gospels": ["The Synoptic Problem", "The Gospel of Mark", "The Gospel of Matthew", "The Gospel of Luke"],
        "History of Christianity II": ["The Rise of the Papacy", "The Great Schism", "Early and High Middle Ages", "Monasticism"],
        "Introduction to Sociology": ["What is Sociology?", "Culture and Society", "Socialization", "Social Groups"]
      },
    },
     "Year 2": {
      "Semester 1": {
        "Old Testament Prophetic Books": ["The Nature of Prophecy", "Isaiah", "Jeremiah", "Ezekiel and the Minor Prophets"],
        "The Book of Acts": ["The Coming of the Spirit", "The Jerusalem Church", "Paul's Missionary Journeys", "Theology of Acts"],
        "African Traditional Religion": ["Nature of ATR", "Belief in God", "Spirits and Ancestors", "Rites of Passage"],
        "Greek Language I": ["Alphabet and Pronunciation", "Nouns (First and Second Declension)", "Present Tense Verbs", "Basic Sentence Structure"]
      },
      "Semester 2": {
        "The Writings (OT)": ["Psalms", "Wisdom Literature (Proverbs, Job, Ecclesiastes)", "Daniel", "Chronicles, Ezra, Nehemiah"],
        "Pauline Epistles": ["Life of Paul", "Romans", "1 & 2 Corinthians", "Galatians"],
        "Religion and Society": ["Functionalist Theories of Religion", "Conflict Theories of Religion", "Secularization", "New Religious Movements"],
        "Greek Language II": ["Third Declension Nouns", "Aorist and Future Tenses", "Participles", "Reading Simple NT Texts"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "Theology of the Old Testament": ["Covenant", "Law", "Kingdom of God", "Messianic Hope"],
        "Theology of the New Testament": ["Kingdom of God in the Gospels", "Christology", "Soteriology (Salvation)", "Eschatology (Last Things)"],
        "Christian Ethics": ["Foundations of Christian Ethics", "Ethical Decision Making", "Issues in Personal Ethics", "Issues in Social Ethics"],
        "Hebrew Language I": ["Alphabet and Vowels", "Nouns and Adjectives", "The Qal Perfect Verb", "Basic Sentence Structure"]
      },
      "Semester 2": {
        "Comparative Religion": ["Islam", "Hinduism", "Buddhism", "Judaism"],
        "Pastoral Epistles": ["1 & 2 Timothy", "Titus", "Church Leadership and Order", "Combating False Teaching"],
        "History of the Church in Africa": ["Early Christianity in North Africa", "The Missionary Enterprise in Sub-Saharan Africa", "Rise of African Initiated Churches", "Christianity in Contemporary Africa"],
        "Hebrew Language II": ["The Qal Imperfect Verb", "Derived Stems (Niphal, Piel)", "Pronominal Suffixes", "Reading Simple OT Texts"]
      },
    },
    "Year 4": {
        "Semester 1": {
            "Systematic Theology": ["Prolegomena (Starting points)", "Theology Proper (Doctrine of God)", "Anthropology (Doctrine of Humanity)", "Christology (Doctrine of Christ)"],
            "Research Methods": ["Theological Research Methods", "Bibliographic Research", "Writing a Research Proposal", "Exegesis and Exposition"],
            "Contemporary Issues in Christian Theology": ["Feminist Theology", "Liberation Theology", "Ecotheology", "Theology and Science Dialogue"],
            "Inter-Testamental Period": ["History of the Second Temple Period", "Jewish Sects (Pharisees, Sadducees)", "Apocryphal and Pseudepigraphal Literature", "Dead Sea Scrolls"]
        },
        "Semester 2": {
            "Research Project": ["Independent research project in a chosen area of religious studies."],
            "African Instituted Churches": ["History and Typology", "Beliefs and Practices", "Contribution to African Christianity", "Challenges and Prospects"],
            "Johannine Literature": ["The Gospel of John", "The Epistles of John", "The Book of Revelation", "Theology of the Johannine Corpus"],
            "The Reformation": ["Martin Luther and the German Reformation", "John Calvin and the Reformed Tradition", "The English Reformation", "The Catholic Counter-Reformation"]
        },
    },
  },
  [Subject.Commerce]: {
     "Year 1": {
      "Semester 1": {
        "Introduction to Commerce": ["Nature and Scope of Commerce", "Trade and Aids to Trade", "Business Environment", "Forms of Business Units"],
        "Book-keeping and Accounting I": ["Principles of Double Entry", "The Ledger and Trial Balance", "Books of Prime Entry", "Bank Reconciliation"],
        "Business Mathematics I": ["Fractions, Decimals, Percentages", "Ratio and Proportion", "Simple and Compound Interest", "Algebraic Expressions"],
        "Principles of Economics I": ["Microeconomics", "The Concept of Demand and Supply", "Theory of Production", "Market Structures"]
      },
      "Semester 2": {
        "Business Organisation": ["Theories of Organisation", "Organisation Structure", "Functions of Management", "Leadership and Motivation"],
        "Book-keeping and Accounting II": ["Accounting for Depreciation", "Correction of Errors", "Accounts of Non-Profit Organisations", "Partnership Accounts"],
        "Business Mathematics II": ["Annuities and Perpetuities", "Data Presentation", "Measures of Central Tendency", "Measures of Dispersion"],
        "Principles of Economics II": ["Macroeconomics", "National Income", "Money and Banking", "Inflation"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Marketing I": ["The Marketing Concept", "Marketing Environment", "Consumer Behaviour", "Market Segmentation"],
        "Business Law": ["Law of Contract", "Sale of Goods Act", "Law of Agency", "Hire Purchase"],
        "Introduction to Management": ["Evolution of Management Thought", "Planning", "Organizing", "Controlling"],
        "Business Statistics": ["Probability Theory", "Sampling", "Hypothesis Testing", "Correlation and Regression"]
      },
      "Semester 2": {
        "Marketing II": ["The Marketing Mix (Product, Price)", "The Marketing Mix (Place, Promotion)", "Marketing Research", "Services Marketing"],
        "Company Law": ["Formation of a Company", "Memorandum and Articles of Association", "Shares and Debentures", "Meetings and Resolutions"],
        "Business Communication": ["The Communication Process", "Written Communication (Letters, Reports)", "Oral Communication", "Non-verbal Communication"],
        "Costing Methods": ["Cost Classification", "Job and Batch Costing", "Process Costing", "Marginal and Absorption Costing"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "International Trade and Finance": ["Theories of International Trade", "Balance of Payments", "Foreign Exchange Market", "International Financial Institutions"],
        "E-Commerce": ["Introduction to E-commerce", "E-commerce Business Models", "Online Payment Systems", "E-marketing"],
        "Supply Chain Management": ["Introduction to SCM", "Logistics and Distribution", "Inventory Management", "Procurement"],
        "Entrepreneurship": ["The Entrepreneurial Process", "Developing a Business Plan", "Sources of Finance", "Small Business Management"]
      },
      "Semester 2": {
        "Retail Management": ["Types of Retailers", "Retail Location", "Merchandise Management", "Store Layout and Design"],
        "Sales Management": ["The Sales Process", "Sales Force Management", "Sales Forecasting", "Territory Management"],
        "Advertising and Promotion": ["Integrated Marketing Communications", "Advertising Media", "Sales Promotion", "Public Relations"],
        "Industrial Attachment (SIWES)": ["Practical experience in a commercial enterprise."]
      },
    },
     "Year 4": {
      "Semester 1": {
        "Strategic Marketing Management": ["Marketing Strategy Formulation", "Competitive Analysis", "Strategic Marketing Planning", "Implementation and Control"],
        "Commercial Policy": ["Trade Policies and Instruments", "Trade Agreements (e.g., WTO)", "Economic Integration", "Trade and Development"],
        "Logistics Management": ["Transportation Management", "Warehousing", "Inventory Control Systems", "Reverse Logistics"],
        "Research Methodology": ["The Research Process", "Research Design", "Data Collection", "Report Writing"]
      },
      "Semester 2": {
        "Contemporary Issues in Commerce": ["Globalization", "Sustainability in Commerce", "Digital Disruption", "Ethical Issues"],
        "Customer Relationship Management": ["Principles of CRM", "CRM Technology", "Customer Loyalty", "Managing Customer Data"],
        "Cooperative Management": ["Principles of Cooperatives", "Types of Cooperatives", "Management of Cooperatives", "Cooperative Law"],
        "Research Project": ["Independent research on a topic in commerce."]
      },
    },
  },
  [Subject.DatabaseManagement]: {
      "Year 1": {
          "Semester 1": {
            "Introduction to Databases": ["File Systems vs. DBMS", "Database Models (Relational, NoSQL)", "Database Architecture", "Roles in Database Environment"],
            "SQL Fundamentals": ["SELECT Statements and Filtering", "Sorting Data", "Joining Multiple Tables", "Aggregate Functions (COUNT, SUM, AVG)"],
            "Data Modeling and ER Diagrams": ["Entities, Attributes, and Relationships", "Cardinality and Modality", "Enhanced ER (EER) Modeling", "Conceptual to Logical Mapping"],
            "Relational Algebra": ["SELECT, PROJECT, JOIN Operations", "Set Operations (UNION, INTERSECT, DIFFERENCE)", "RENAME Operation", "Complex Queries"]
          },
          "Semester 2": {
            "Advanced SQL": ["Subqueries", "Common Table Expressions (CTEs)", "Window Functions", "Stored Procedures and Triggers"],
            "Database Normalization": ["Functional Dependencies", "First, Second, and Third Normal Forms (1NF, 2NF, 3NF)", "Boyce-Codd Normal Form (BCNF)", "Denormalization"],
            "Indexing and Query Optimization": ["Types of Indexes (B-Tree, Hash)", "Understanding Execution Plans", "Query Tuning Techniques", "Database Statistics"],
            "Transaction Management": ["ACID Properties", "Concurrency Control (Locking, Timestamping)", "Recovery Mechanisms", "Deadlocks"]
          },
      },
  },
  [Subject.DemographyAndSocialStatistics]: {
    "Year 1": {
      "Semester 1": {
        "Introduction to Demography": ["Definition and Scope", "History of Demography", "Components of Population Change", "Demography and other disciplines"],
        "Introductory Statistics I": ["Descriptive Statistics", "Data Presentation (Charts, Graphs)", "Measures of Central Tendency", "Measures of Dispersion"],
        "Introductory Mathematics I": ["Algebra", "Functions and Graphs", "Logarithms", "Basic Calculus"],
        "Introduction to Sociology": ["The Sociological Perspective", "Culture", "Socialization", "Social Groups"]
      },
      "Semester 2": {
        "Sources of Demographic Data": ["Population Census", "Vital Registration Systems", "Sample Surveys", "Administrative Records"],
        "Introductory Statistics II": ["Probability Theory", "Discrete and Continuous Distributions", "Sampling Distributions", "Estimation"],
        "Introductory Mathematics II": ["Matrix Algebra", "Set Theory", "Sequences and Series", "Further Calculus"],
        "Introduction to Computers": ["Computer Hardware and Software", "Word Processing", "Spreadsheets", "Internet and Email"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Population Theories": ["Malthusian Theory", "Demographic Transition Theory", "Marxist Population Theory", "Modernization Theory"],
        "Social Research Methods": ["The Scientific Method", "Quantitative vs. Qualitative Research", "Research Design", "Questionnaire Design"],
        "Probability Theory": ["Axioms of Probability", "Conditional Probability", "Bayes' Theorem", "Common Probability Distributions"],
        "Nigerian Population": ["Population Size, Growth and Distribution", "Age and Sex Structure", "Fertility, Mortality, and Migration in Nigeria", "Population Policies in Nigeria"]
      },
      "Semester 2": {
        "Basic Demographic Methods": ["Rates, Ratios, and Proportions", "Standardization", "Measures of Fertility", "Measures of Mortality"],
        "Statistical Inference I": ["Point and Interval Estimation", "Hypothesis Testing (t-test, Z-test)", "Chi-Square Test", "Analysis of Variance (ANOVA)"],
        "Population and Development": ["Population Growth and Economic Development", "Population and Environment", "Population and Health", "Human Capital Development"],
        "Computer Applications in Demography": ["Using SPSS for Data Entry and Management", "Descriptive Analysis in SPSS", "Basic Inferential Statistics in SPSS", "Introduction to Demographic Software (e.g., MortPak)"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Fertility Analysis": ["Crude and Age-Specific Fertility Rates", "Total Fertility Rate (TFR)", "Proximate Determinants of Fertility", "Theories of Fertility Change"],
        "Mortality Analysis": ["Crude and Age-Specific Death Rates", "Life Tables", "Infant and Child Mortality", "Causes of Death"],
        "Nuptiality and Migration": ["Marriage Patterns and Trends", "Measures of Nuptiality", "Concepts and Measures of Migration", "Theories of Migration"],
        "Statistical Inference II": ["Correlation Analysis", "Simple Linear Regression", "Multiple Linear Regression", "Logistic Regression"]
      },
      "Semester 2": {
        "Population Estimates and Projections": ["Methods of Population Estimation", "Cohort-Component Method of Projection", "Mathematical Methods of Projection", "Uses and limitations of Projections"],
        "Survey Design and Management": ["Sampling Techniques", "Sample Size Determination", "Fieldwork Management", "Data Quality Control"],
        "Data Analysis with SPSS/Stata": ["Advanced Data Management", "Multivariate Analysis", "Regression Analysis with Statistical Software", "Survival Analysis"],
        "Industrial Training (SIWES)": ["Attachment to a statistical agency, research institute, or NGO."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Advanced Demographic Analysis": ["Indirect Estimation Techniques", "Stable Population Theory", "Model Life Tables", "Family Demography"],
        "Population Policies and Programs": ["Types of Population Policies", "Family Planning Programs", "Policies on Migration", "Aging Population Policies"],
        "Gender and Reproductive Health": ["Gender issues in Demography", "Reproductive Health Indicators", "Maternal Health", "HIV/AIDS and Population"],
        "Research Methodology": ["Advanced Research Design", "Qualitative Data Analysis", "Ethical Issues in Research", "Writing a Research Proposal"]
      },
      "Semester 2": {
        "Evaluation of Demographic Data": ["Errors in Demographic Data", "Age-Sex Accuracy Indexes", "Data Smoothing Techniques", "Adjusting Demographic Data"],
        "Social and Health Statistics": ["Health Indicators", "Measuring Health Inequalities", "Education Statistics", "Crime Statistics"],
        "Seminar in Demography": ["Presentation on current demographic issues.", "Critical review of demographic literature.", "Discussion and debate."],
        "Research Project": ["Independent research project in demography or social statistics."]
      },
    },
  },
  [Subject.Economics]: {
      "Year 1": {
          "Semester 1": {
            "Principles of Microeconomics": [
                "Supply and Demand",
                "Elasticity",
                "Consumer Theory",
                "Theory of the Firm"
            ],
            "Introductory Mathematics for Economists I": [
                "Functions and Graphs",
                "Limits and Continuity",
                "Differentiation",
                "Integration Basics"
            ],
            "Nigerian Economy Structure": [
                "Overview of Economic Sectors",
                "Role of Oil and Gas",
                "Challenges of Development",
                "Economic Policies"
            ]
          },
          "Semester 2": {
            "Principles of Macroeconomics": ["National Income Accounting", "Aggregate Demand and Supply", "Money and Banking", "Inflation and Unemployment"],
            "Introductory Mathematics for Economists II": ["Multivariable Calculus", "Matrix Algebra", "Optimization", "Differential Equations"],
            "Introductory Statistics for Economists": ["Descriptive Statistics", "Probability Theory", "Sampling Distributions", "Introduction to Hypothesis Testing"]
          },
      },
      "Year 2": {
          "Semester 1": {
            "Intermediate Microeconomics": ["Advanced Consumer Theory", "Production and Cost Functions", "Perfect Competition and Monopoly", "Game Theory"],
            "Intermediate Macroeconomics": ["IS-LM Model", "AD-AS Model", "The Phillips Curve", "Theories of Economic Growth"],
            "History of Economic Thought": ["Mercantilism and Physiocracy", "Classical Economics (Smith, Ricardo, Malthus)", "Marxian Economics", "The Marginal Revolution"]
          },
          "Semester 2": {
            "Econometrics I": ["Simple Linear Regression Model", "Multiple Linear Regression Model", "Hypothesis Testing in Regression", "Violations of Classical Assumptions"],
            "Public Sector Economics": ["Public Goods and Externalities", "Theory of Taxation", "Public Expenditure", "Fiscal Federalism"],
            "Monetary Economics": ["Demand for Money", "The Money Supply Process", "The Role of Central Banks", "The Transmission Mechanism of Monetary Policy"],
            "Structure of Nigerian Economy": ["Agriculture Sector", "Industrial Sector", "Informal Sector", "Public Finance in Nigeria"]
          },
      },
      "Year 3": {
          "Semester 1": {
            "Advanced Microeconomics": ["General Equilibrium and Welfare Economics", "Asymmetric Information", "Bargaining and Auctions", "Behavioral Economics"],
            "Advanced Macroeconomics": ["Real Business Cycle Theory", "New Keynesian Economics", "Dynamic Macroeconomic Models", "Open Economy Macroeconomics"],
            "International Economics I": ["Theories of International Trade (Ricardo, Heckscher-Ohlin)", "Tariffs and Non-Tariff Barriers", "International Factor Movements", "Trade Policy"],
            "Development Economics": ["Theories of Economic Growth and Development", "Poverty and Inequality", "Agriculture and Development", "Foreign Aid and Investment"]
          },
          "Semester 2": {
            "Econometrics II": ["Dummy Variables", "Panel Data Models", "Instrumental Variables", "Time Series Models (AR, MA)"],
            "International Economics II": ["Balance of Payments", "Foreign Exchange Markets", "Exchange Rate Regimes", "International Monetary System"],
            "Mathematical Economics": ["Optimization Methods", "Dynamic Analysis", "Input-Output Analysis", "Game Theory applications"],
            "Industrial Training (SIWES)": ["Practical experience in a financial institution, research organization, or government agency."]
          },
      },
      "Year 4": {
          "Semester 1": {
            "Project Evaluation": ["Cost-Benefit Analysis", "Net Present Value and Internal Rate of Return", "Risk and Uncertainty in Projects", "Social Cost-Benefit Analysis"],
            "Petroleum Economics": ["Oil and Gas Markets", "OPEC and Oil Pricing", "Economics of Exploration and Production", "The 'Dutch Disease'"],
            "Public Finance": ["Tax Incidence and Efficiency", "Public Debt Management", "Fiscal Policy and Stabilization", "Social Security and Insurance"],
            "Research Methods": ["Formulating a Research Question", "Literature Review", "Econometric Modeling", "Writing an Economics Paper"]
          },
          "Semester 2": {
            "Applied Econometrics": ["Time Series Econometrics (VAR, Cointegration)", "Microeconometrics (Logit, Probit)", "Panel Data applications", "Causal Inference"],
            "Health Economics": ["Demand for Health Care", "Health Insurance", "Health Care Systems", "Economic Evaluation of Health Programs"],
            "Environmental Economics": ["Externalities and Environmental Problems", "Valuation of Environmental Goods", "Environmental Policy Instruments", "Climate Change Economics"],
            "Research Project": ["Independent research project on an economics topic."]
          },
      },
  },
  [Subject.EconomicsEducation]: {
      "Year 1": {
        "Semester 1": {
            "Principles of Microeconomics": ["Supply and Demand", "Consumer Behavior", "Theory of the Firm", "Market Structures"],
            "Introductory Mathematics I": ["Algebra", "Functions", "Basic Differentiation", "Logarithms"],
            "History of Education": ["Education in Traditional African Societies", "Western Education in Nigeria", "Major Figures in Educational History", "Development of Higher Education"],
            "Introduction to Teaching Profession": ["The Role of the Teacher", "Professional Ethics", "Teacher Organizations", "Qualities of a Good Teacher"]
        },
        "Semester 2": {
            "Principles of Macroeconomics": ["National Income Accounting", "Inflation and Unemployment", "Money and Banking", "Fiscal and Monetary Policy"],
            "Introductory Mathematics II": ["Integration", "Matrix Algebra", "Set Theory", "Sequences and Series"],
            "Philosophy of Education": ["Major Philosophical Schools (Idealism, Realism, etc.)", "Aims and Objectives of Education", "Education and Values", "Nigerian Philosophy of Education"],
            "General Teaching Methods": ["Lesson Planning", "Instructional Strategies", "Classroom Management", "Questioning Techniques"]
        },
      },
      "Year 2": {
        "Semester 1": {
            "Intermediate Microeconomics": ["Advanced Consumer Theory", "Production and Costs", "Game Theory", "Welfare Economics"],
            "Educational Psychology": ["Theories of Learning", "Human Development", "Motivation in the Classroom", "Individual Differences"],
            "Curriculum and Instruction": ["Principles of Curriculum Development", "Models of Curriculum Design", "Curriculum Implementation and Evaluation", "Instructional Materials"],
            "Statistics for Economists": ["Descriptive Statistics", "Probability", "Inferential Statistics", "Introduction to Regression"]
        },
        "Semester 2": {
            "Intermediate Macroeconomics": ["IS-LM Framework", "Aggregate Demand and Supply", "Economic Growth Models", "Open Economy Macroeconomics"],
            "Sociology of Education": ["School as a Social System", "Education and Social Stratification", "The Hidden Curriculum", "Education and Social Change"],
            "History of Economic Thought": ["Classical Economics", "Marxian Economics", "Neoclassical Economics", "Keynesian Revolution"],
            "Educational Technology": ["Integrating Technology in Teaching", "Selection and Use of Media", "Online Learning Environments", "Assistive Technology"]
        },
      },
      "Year 3": {
        "Semester 1": {
            "Methods of Teaching Economics": ["Strategies for Teaching Economic Concepts", "Using Models and Graphs", "Developing Lesson Plans for Economics", "Assessing Learning in Economics"],
            "Development Economics": ["Theories of Development", "Poverty and Inequality", "Role of Agriculture and Industry", "Foreign Aid"],
            "Public Sector Economics": ["Public Goods and Externalities", "Taxation", "Government Expenditure", "Public Debt"],
            "Micro-teaching": ["Peer teaching sessions", "Feedback and analysis of teaching skills", "Practice of specific teaching techniques"]
        },
        "Semester 2": {
            "Student Industrial Work Experience Scheme (SIWES)": ["Attachment to a relevant institution (e.g., Ministry of Finance, research institute)."]
        },
      },
      "Year 4": {
        "Semester 1": {
            "Measurement and Evaluation in Education": ["Principles of Assessment", "Test Construction", "Validity and Reliability", "Interpreting Test Scores"],
            "Econometrics": ["Simple and Multiple Regression", "Hypothesis Testing", "Dummy Variables", "Basic Time Series"],
            "International Economics": ["Theories of International Trade", "Balance of Payments", "Foreign Exchange", "Trade Policies"],
            "Teaching Practice": ["Full-time supervised teaching in a secondary school."]
        },
        "Semester 2": {
            "Economics of Education": ["Human Capital Theory", "Demand and Supply of Education", "Educational Finance", "Cost-Benefit Analysis in Education"],
            "Research Methods in Education": ["The Research Process", "Types of Educational Research", "Data Collection Techniques", "Writing a Research Report"],
            "Comparative Education": ["Comparing Education Systems", "Factors Influencing Education Systems", "Global Trends in Education", "Education in Developed vs. Developing Countries"],
            "Research Project": ["Independent research project on a topic in economics education."]
        },
      },
  },
  [Subject.Edo]: {
    "Year 1": {
      "Semester 1": {
        "Introduction to Edo Language": ["The Place of Edo in Benue-Congo", "Dialects of Edo", "History of the Study of Edo", "Importance of Edo Language"],
        "Basic Edo Grammar I": ["The Sound System (Vowels and Consonants)", "Tone System", "Nouns and Noun Classes", "Adjectives"],
        "Edo Culture and Society I": ["Greeting Systems", "Family and Kinship", "Traditional Festivals", "Edo Worldview"],
        "Use of English": ["Grammar and Syntax Review", "Academic Writing", "Reading Comprehension"]
      },
      "Semester 2": {
        "Introduction to Linguistics": ["Phonetics and Phonology", "Morphology", "Syntax", "Semantics"],
        "Basic Edo Grammar II": ["Pronouns", "Verbs and Verb Forms", "Simple Sentence Structure", "Prepositions"],
        "Edo Culture and Society II": ["Traditional Marriage System", "Political Organization", "Arts and Crafts", "Music and Dance"],
        "Spoken Edo": ["Conversational Practice", "Pronunciation Drills", "Role Playing", "Listening Comprehension"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Intermediate Edo Grammar and Syntax": ["Tense, Aspect, and Mood", "Complex Sentences", "Serial Verb Constructions", "Relative Clauses"],
        "Phonetics and Phonology of Edo": ["Articulatory Phonetics of Edo sounds", "Phonological Processes (e.g., Vowel Harmony)", "Tone Rules", "Syllable Structure"],
        "Introduction to Edo Oral Literature": ["Folktales", "Myths and Legends", "Proverbs", "Incantations"],
        "History of Benin Kingdom": ["Origins and Early Rulers", "The Ogiso Dynasty", "The Oba Dynasty", "Benin and the Europeans"]
      },
      "Semester 2": {
        "Advanced Edo Syntax": ["Focus and Topic Constructions", "Negation", "Interrogative Sentences", "Nominalization"],
        "Morphology of Edo": ["Word Formation Processes", "Derivational Morphemes", "Inflectional Morphemes", "Compounding"],
        "Edo Written Literature": ["The Pioneers of Edo Writing", "The Edo Novel", "Edo Poetry", "Edo Drama"],
        "Edo Orthography": ["History of Edo Orthography", "Current Orthographic Conventions", "Problems and Debates", "Writing Practice"]
      },
    },
     "Year 3": {
      "Semester 1": {
        "Sociolinguistics of Edo": ["Language Variation and Change", "Language and Identity", "Code-switching and Code-mixing", "Language Policy and Planning"],
        "Edo Translation: Theory and Practice": ["Theories of Translation", "Translating from Edo to English", "Translating from English to Edo", "Cultural issues in Translation"],
        "Edo Drama and Theatre": ["Traditional Edo Theatre", "Modern Edo Playwrights", "Performance Analysis", "Staging an Edo Play"],
        "Research Methods": ["Research in Linguistics and Literature", "Data Collection Techniques", "Data Analysis", "Writing a Research Proposal"]
      },
      "Semester 2": {
        "Stylistics": ["Analysis of Literary Language", "Figures of Speech in Edo", "Stylistic Analysis of Prose", "Stylistic Analysis of Poetry"],
        "Edo Dialects": ["Major Dialect Groups", "Phonological and Lexical Variations", "Comparative Analysis", "Dialect Mapping"],
        "Edo Traditional Institutions": ["The Role of the Oba", "Palace Chiefs", "Guilds", "Age Grade System"],
        "Industrial Training (SIWES)": ["Attachment at a cultural center, media house, or educational institution."]
      },
    },
     "Year 4": {
      "Semester 1": {
        "Edo Semantics and Pragmatics": ["Word Meaning and Sense Relations", "Sentence Meaning", "Implicature and Presupposition", "Speech Acts"],
        "Advanced Edo Composition": ["Essay Writing", "Creative Writing", "Report Writing", "Public Speaking in Edo"],
        "Edo Philosophy and Worldview": ["Concepts of God, Deities, and Spirits", "Concept of Personhood", "Ethics and Morality", "Cosmology"],
        "Seminar": ["Presentation of research on a selected topic in Edo studies."]
      },
      "Semester 2": {
        "Project/Long Essay": ["Independent research project on Edo language or literature."],
        "Modern Edo Literature": ["Post-colonial themes", "Contemporary authors", "Literary criticism", "The future of Edo literature"],
        "Comparative Edo Studies": ["Comparing Edo with other Edoid languages", "Cultural comparisons with neighboring groups", "Edo in the diaspora"],
        "Language and Technology": ["Edo on the Internet", "Developing digital resources for Edo", "Computational Linguistics for Edo"]
      },
    },
  },
  [Subject.French]: {
    "Year 1": {
      "Semester 1": {
        "Elementary French I: Grammar & Pronunciation": ["Alphabet and accents", "Definite/indefinite articles", "Present tense of regular -er verbs", "Gender and number of nouns"],
        "French Oral Expression I": ["Greetings and introductions", "Basic questions and answers", "Numbers, dates, and time", "Classroom expressions"],
        "Introduction to French Culture": ["Geography of France", "Symbols of France (flag, anthem)", "Major holidays and festivals", "French cuisine basics"],
        "Use of Library": ["Finding resources", "Citing sources", "Using academic databases"]
      },
      "Semester 2": {
        "Elementary French II: Syntax & Composition": ["Present tense of -ir and -re verbs", "Common irregular verbs (être, avoir, aller)", "Prepositions of place", "Writing simple descriptive paragraphs"],
        "French Oral Expression II": ["Talking about family and friends", "Describing people and things", "Making plans", "Shopping and ordering food"],
        "Introduction to Francophone World": ["Overview of French-speaking countries", "Introduction to Francophone Africa", "Introduction to French Canada (Quebec)", "Introduction to the Caribbean"],
        "Phonetics of French": ["Vowel and consonant sounds", "Nasal vowels", "Liaison and enchaînement", "Rhythm and intonation"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Intermediate French Grammar and Composition": ["Passé composé vs. Imparfait", "Object pronouns (direct, indirect)", "Relative pronouns (qui, que, dont, où)", "Writing narrative paragraphs"],
        "French Reading and Comprehension": ["Reading short stories and articles", "Developing reading strategies", "Vocabulary building", "Answering comprehension questions"],
        "History of French Literature I (Medieval to 17th C.)": ["La Chanson de Roland", "François Villon", "The Pléiade", "Classical Theatre (Molière, Racine)"],
        "Advanced Oral French": ["Discussions on familiar topics", "Short presentations", "Debates", "Improving fluency and accuracy"]
      },
      "Semester 2": {
        "Advanced French Grammar": ["The subjunctive mood", "The conditional mood", "Si clauses (conditional sentences)", "The passive voice"],
        "Introduction to French Linguistics": ["History of the French language", "Morphology", "Syntax", "Sociolinguistics of French"],
        "History of French Literature II (18th C. to Present)": ["The Enlightenment (Voltaire, Rousseau)", "Romanticism (Hugo, Lamartine)", "Realism and Naturalism (Balzac, Zola)", "20th Century Literature"],
        "French for Specific Purposes (e.g., Business)": ["Business vocabulary", "Writing professional emails", "Telephone etiquette", "Marketing in French"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "French Translation: Theory and Practice": ["Introduction to translation theory", "Translating from French to English", "Common translation problems", "Using translation tools"],
        "Francophone African Literature": ["Négritude movement (Senghor, Césaire)", "The colonial novel", "The post-colonial novel", "Female Francophone writers"],
        "French Civilization and Thought": ["The French Revolution", "Major political movements", "Existentialism (Sartre, Camus)", "Contemporary French society"],
        "Research Methodology": ["Finding a research topic", "Conducting a literature review", "Methods in literary and linguistic analysis", "Writing a proposal"]
      },
      "Semester 2": {
        "Advanced Translation and Interpretation": ["Translating from English to French", "Introduction to consecutive interpreting", "Specialized translation (legal, medical)", "Cultural adaptation in translation"],
        "French Stylistics": ["Analysis of literary texts", "Figures of speech", "Levels of language (registres)", "Rhetorical analysis"],
        "Contemporary France: Politics and Society": ["The French political system", "Immigration and identity", "The role of France in the EU", "Current social issues"],
        "Internship/Language Immersion": ["Practical experience or study abroad program."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Comparative Literature (French and English/Other)": ["Thematic comparisons", "Genre comparisons", "Influence studies", "Theoretical approaches"],
        "Advanced French Syntax and Semantics": ["Complex sentence structures", "Theories of meaning", "Discourse analysis", "Pragmatics"],
        "Modern French Theatre": ["Theatre of the Absurd (Beckett, Ionesco)", "Contemporary French playwrights", "Performance analysis", "Mise en scène"],
        "Seminar in French Studies": ["In-depth study and presentation on a specific topic."]
      },
      "Semester 2": {
        "Caribbean Francophone Literature": ["Aimé Césaire", "Frantz Fanon", "Créolité movement", "Themes of identity and resistance"],
        "Didactics of French as a Foreign Language": ["Theories of second language acquisition", "Methods of teaching French", "Curriculum design", "Assessment techniques"],
        "Special Topics in French": ["Advanced seminar on a faculty's research specialty, e.g., French cinema, 19th-century poetry."],
        "Research Project/Long Essay": ["Independent research project on French or Francophone literature or linguistics."]
      },
    },
  },
    [Subject.FurtherMathematics]: {
    "Year 1": {
      "Semester 1": {
        "Advanced Algebra and Functions": ["Polynomial and Rational Functions", "Conic Sections", "Parametric and Polar Equations", "Matrices and Determinants"],
        "Calculus III (Multivariable)": ["Vectors and the Geometry of Space", "Partial Derivatives", "Multiple Integrals", "Vector Calculus"],
        "Proof Techniques and Logic": ["Propositional and Predicate Logic", "Methods of Proof (Direct, Contradiction, Induction)", "Set Theory", "Relations and Functions"],
        "Linear Algebra II": ["Vector Spaces and Subspaces", "Linear Transformations", "Eigenvalues and Eigenvectors", "Inner Product Spaces"]
      },
      "Semester 2": {
        "Ordinary Differential Equations II": ["Systems of Linear Differential Equations", "Nonlinear Differential Equations", "Laplace Transforms", "Series Solutions of ODEs"],
        "Complex Variables": ["Complex Numbers and Functions", "Cauchy-Riemann Equations", "Complex Integration", "Cauchy's Integral Formula"],
        "Number Theory": ["Divisibility and Congruences", "Prime Numbers", "Diophantine Equations", "Introduction to Cryptography"],
        "Probability Theory": ["Axioms of Probability", "Conditional Probability and Independence", "Discrete and Continuous Random Variables", "Common Distributions (Binomial, Poisson, Normal)"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Real Analysis II": ["Sequences and Series of Functions", "Uniform Convergence", "Power Series", "Riemann Integration"],
        "Abstract Algebra II (Rings and Fields)": ["Rings and Ideals", "Integral Domains", "Fields and Field Extensions", "Introduction to Galois Theory"],
        "Numerical Analysis II": ["Numerical Solution of ODEs", "Approximation Theory", "Numerical Linear Algebra", "Eigenvalue Problems"],
        "Mechanics II (Lagrangian and Hamiltonian)": ["Lagrangian Formalism", "Hamilton's Principle", "Hamiltonian Formalism", "Central Force Problem"]
      },
      "Semester 2": {
        "Topology": ["Topological Spaces", "Continuity and Homeomorphisms", "Connectedness and Compactness", "Introduction to Algebraic Topology"],
        "Partial Differential Equations": ["First-Order PDEs", "The Wave Equation", "The Heat Equation", "Laplace's Equation"],
        "Statistical Inference": ["Estimation (Method of Moments, MLE)", "Hypothesis Testing", "Confidence Intervals", "Linear Models"],
        "Mathematical Modeling": ["Modeling Process", "Discrete and Continuous Models", "Optimization Models", "Simulation"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Measure Theory": ["Lebesgue Measure", "Measurable Functions", "The Lebesgue Integral", "Convergence Theorems"],
        "Differential Geometry": ["Curves in Space", "Surfaces in Space", "Curvature", "The Gauss-Bonnet Theorem"],
        "Graph Theory": ["Paths and Cycles", "Trees", "Planar Graphs", "Graph Coloring"],
        "Optimization Techniques": ["Linear Programming", "The Simplex Method", "Duality", "Non-linear Optimization"]
      },
      "Semester 2": {
        "Functional Analysis": ["Normed Vector Spaces", "Banach Spaces", "Hilbert Spaces", "Linear Operators"],
        "Galois Theory": ["Field Extensions", "Automorphism Groups", "The Fundamental Theorem of Galois Theory", "Solvability by Radicals"],
        "Stochastic Processes": ["Markov Chains", "Poisson Processes", "Brownian Motion", "Introduction to Martingales"],
        "Industrial Training (SIWES)": ["Practical application of mathematical skills in industry or research."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Fluid Dynamics": ["Kinematics of Fluids", "Navier-Stokes Equations", "Inviscid Flow", "Boundary Layer Theory"],
        "Advanced Topics in Pure Mathematics": ["Algebraic Geometry", "Analytic Number Theory", "Set Theory", "Category Theory"],
        "Advanced Topics in Applied Mathematics": ["Control Theory", "Information Theory", "Dynamical Systems", "Game Theory"],
        "Research Methods": ["Literature Review", "Problem Formulation", "Mathematical Writing (LaTeX)", "Presenting Research"]
      },
      "Semester 2": {
        "Algebraic Topology": ["Homology", "Cohomology", "Homotopy Theory", "Fundamental Group"],
        "Quantum Mechanics for Mathematicians": ["Hilbert Spaces", "Operators and Observables", "The Schrödinger Equation", "Spectral Theory"],
        "Financial Mathematics": ["The Black-Scholes Model", "Stochastic Calculus", "Risk-Neutral Pricing", "Portfolio Optimization"],
        "Research Project": ["Independent research project in an area of pure or applied mathematics."]
      },
    },
  },
  [Subject.Government]: {
    "Year 1": {
      "Semester 1": {
        "Introduction to Government & Politics": ["Basic Concepts (State, Nation, Power)", "Forms of Government", "Political Ideologies", "The Scope of Political Science"],
        "Nigerian Constitutional Development": ["Pre-colonial Systems", "Colonial Constitutions (Clifford, Richards)", "Independence and Republican Constitutions", "The 1999 Constitution"],
        "Introduction to Sociology": ["The Sociological Imagination", "Culture and Society", "Socialization", "Social Structure"],
        "Use of English": ["Grammar and Mechanics", "Academic Writing", "Comprehension and Summary"]
      },
      "Semester 2": {
        "Organization of Government": ["The Legislature", "The Executive", "The Judiciary", "The Bureaucracy"],
        "Nigerian Government and Politics": ["The Executive in Nigeria", "The Legislature in Nigeria", "The Judiciary in Nigeria", "Political Parties and Elections"],
        "Introduction to Psychology": ["Schools of Thought in Psychology", "Human Development", "Learning and Motivation", "Social Behavior"],
        "History of Political Thought": ["From Ancient Greece to Modern Times", "Key thinkers and their ideas", "Evolution of political concepts"]
      },
    },
    "Year 2": {
       "Semester 1": {
        "Introduction to Public Administration": ["Theories of Public Administration", "Civil Service", "Public Corporations", "Administrative Law"],
        "Introduction to International Relations": ["Actors in World Politics", "Concepts of National Interest and Power", "Theories of IR (Realism, Liberalism)", "Foreign Policy"],
        "Ancient & Medieval Political Thought": ["Plato and Aristotle", "Roman Political Thought", "Augustine and Aquinas", "Islamic Political Thought"],
        "Local Government Administration": ["Theories of Local Government", "Structure of Local Government in Nigeria", "Local Government Finance", "Intergovernmental Relations"]
       },
       "Semester 2": {
        "Modern Political Thought": ["Machiavelli", "Hobbes, Locke, and Rousseau", "The Federalist Papers", "Marx and Mill"],
        "Comparative Government and Politics": ["Methods of Comparison", "Political Systems (Parliamentary, Presidential)", "Comparing UK, US, and Nigeria", "Political Culture"],
        "Elements of Federalism": ["Theories of Federalism", "Federalism in Nigeria", "Fiscal Federalism", "Comparative Federalism"],
        "Political Behavior": ["Political Socialization", "Public Opinion", "Voting Behavior", "Political Participation"]
       },
    },
    "Year 3": {
      "Semester 1": {
        "Public Policy Analysis": ["The Policy Cycle", "Models of Policy Making", "Policy Implementation and Evaluation", "Case Studies in Nigerian Public Policy"],
        "Theories of International Relations": ["Neorealism and Neoliberalism", "Constructivism", "Marxist Theories of IR", "Feminist Theories of IR"],
        "Political Parties and Pressure Groups": ["Functions of Political Parties", "Party Systems", "Role of Pressure Groups", "Lobbying and Advocacy"],
        "Research Methodology": ["The Scientific Method in Political Science", "Research Design", "Data Collection Techniques", "Basic Data Analysis"]
      },
      "Semester 2": {
        "Civil-Military Relations": ["Theories of Civil-Military Relations", "The Military in Nigerian Politics", "Democratization and the Military", "Defense Management"],
        "Politics of Developing Nations": ["Theories of Development and Underdevelopment", "Colonialism and its Legacies", "The State in the Third World", "Democracy and Authoritarianism"],
        "Contemporary Political Analysis": ["Game Theory", "Rational Choice Theory", "Political Economy Approaches", "Discourse Analysis"],
        "Fieldwork/Internship": ["Practical attachment to a government agency, NGO, or political organization."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Nigerian Foreign Policy": ["Determinants of Foreign Policy", "Nigeria's Foreign Policy since Independence", "Nigeria in Africa (ECOWAS, AU)", "Nigeria and the Great Powers"],
        "Political Economy": ["Classical Political Economy", "Marxist Political Economy", "Dependency Theory", "Neoliberalism and Globalization"],
        "Public Financial Administration": ["The Budgetary Process", "Revenue Generation", "Public Expenditure Management", "Fiscal Accountability and Transparency"],
        "Advanced Theories of International Relations": ["The English School", "Post-structuralism in IR", "Critical Theory", "Peace and Conflict Studies"]
      },
      "Semester 2": {
        "State and Economy": ["The Role of the State in the Economy", "Privatization and Commercialization", "Development Planning", "The Politics of Economic Reform in Nigeria"],
        "Democratization Studies": ["Theories of Democratization", "Waves of Democracy", "Challenges of Democratic Consolidation", "Case Studies in Democratization"],
        "Conflict and Political Violence": ["Theories of Conflict", "Types of Political Violence", "Conflict Management and Resolution", "Post-Conflict Peacebuilding"],
        "Research Project": ["Independent research project on a topic in government or political science."]
      },
    },
  },
  [Subject.Greek]: {
    "Year 1": {
      "Semester 1": {
        "Introduction to Koine Greek I (Alphabet, Nouns, Articles)": ["The Greek Alphabet", "Pronunciation", "The Definite Article", "First and Second Declension Nouns"],
        "Greek History and Culture": ["Minoan and Mycenaean Civilizations", "The Archaic and Classical Periods", "Athenian Democracy", "Greek Mythology"],
        "Introduction to the New Testament": ["The World of the New Testament", "The Canon of the NT", "Overview of the Gospels and Acts", "Overview of the Epistles and Revelation"]
      },
      "Semester 2": {
        "Introduction to Koine Greek II (Verbs, Prepositions)": ["Present and Imperfect Indicative Active", "Contract Verbs", "Prepositions", "Basic Sentence Structure"],
        "Reading Simple Greek Sentences": ["Translating from John's Gospel", "Basic Vocabulary Building", "Parsing Nouns and Verbs", "Syntactical Analysis"],
        "Hellenistic World": ["Alexander the Great and his legacy", "The Ptolemaic and Seleucid Empires", "Hellenistic Philosophy (Stoicism, Epicureanism)", "The Rise of Rome"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Intermediate Koine Greek I (Participles, Infinitives)": ["The Aorist and Future Tenses", "The Infinitive", "The Participle (Adjectival and Adverbial)", "The Imperative Mood"],
        "Readings in the Gospel of John": ["Translation of selected passages", "Theological themes in John", "Grammatical analysis", "Comparison with Synoptics"],
        "Introduction to Textual Criticism": ["The manuscript tradition of the NT", "Types of textual variants", "Principles of textual criticism", "Using a critical apparatus"]
      },
      "Semester 2": {
        "Intermediate Koine Greek II (Syntax of Cases)": ["The Genitive, Dative, and Accusative Cases", "The Subjunctive Mood", "Conditional Sentences", "The Middle and Passive Voice"],
        "Readings in the Pauline Epistles": ["Translation of passages from Galatians or 1 Corinthians", "Paul's style and vocabulary", "Theological arguments", "Rhetorical analysis"],
        "Septuagint Studies": ["History and Importance of the LXX", "Translating from the Greek Old Testament", "Comparing the LXX with the Hebrew Bible", "Theological significance of the LXX"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Advanced Greek Grammar and Syntax": ["Advanced uses of the Participle", "Discourse Analysis", "Aspect Theory", "Wallace's Greek Grammar Beyond the Basics"],
        "Greek Exegesis of Romans": ["Detailed clause-by-clause analysis", "Theological interpretation", "Interaction with commentaries", "Writing an exegetical paper"],
        "Introduction to Classical Greek": ["Differences from Koine", "Reading passages from Plato or Xenophon", "Attic verb morphology", "Historical context"]
      },
      "Semester 2": {
        "Readings in Patristic Greek": ["The Apostolic Fathers", "Justin Martyr", "Irenaeus", "Athanasius"],
        "Greek Composition": ["Translating English sentences into Greek", "Practicing grammar and syntax", "Developing a feel for Greek style"],
        "Homeric or Platonic Greek": ["Reading from the Iliad or the Republic", "Epic or philosophical vocabulary", "Literary analysis"]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Greek Exegesis of Hebrews": ["Authorship and destination", "Structure and argument", "Christology in Hebrews", "Use of the Old Testament"],
        "Advanced Textual Criticism": ["Analyzing significant textual problems", "History of the printed Greek New Testament", "Theological implications of variants", "Manuscript studies"],
        "Greek Stylistics": ["Rhetorical devices in the NT", "Literary features of different authors", "Analyzing stylistic choices", "Advanced discourse analysis"],
        "Research Methods": ["Theological and linguistic research methods", "Using biblical studies software", "Writing a thesis proposal"]
      },
      "Semester 2": {
        "Seminar in a New Testament Book": ["In-depth study of a book like Ephesians, Philippians, or Revelation.", "Student presentations", "Interaction with scholarly literature"],
        "Readings in Josephus": ["Translating passages from 'The Jewish War' or 'Antiquities'", "Historical context", "Josephus as a source for the NT world"],
        "Comparative Greek Linguistics": ["Indo-European language family", "Historical development of Greek", "Dialects of Ancient Greek"],
        "Senior Thesis/Project": ["Independent research project on a topic in Greek language or New Testament studies."]
      },
    },
  },
  [Subject.Hausa]: {
    "Year 1": {
      "Semester 1": {
        "Introduction to Hausa Studies": ["The Hausa People and Language", "Geographical Spread", "Brief History", "Importance of Hausa"],
        "Basic Hausa Grammar I": ["The Sound System (Consonants, Vowels)", "The Tone System", "Nouns and Gender", "Pronouns"],
        "Hausa Culture and Institutions I": ["Greeting Etiquette", "Family and Kinship System", "Traditional Occupations", "Festivals"],
        "Spoken Hausa": ["Basic Conversation", "Greetings and Responses", "Asking and Answering Questions", "Pronunciation Practice"]
      },
      "Semester 2": {
        "Introduction to Linguistics": ["Core areas of linguistics", "Language families", "Language in society"],
        "Basic Hausa Grammar II": ["Verbs and Verb Grades", "Tense and Aspect", "Simple Sentence Structure", "Adjectives and Adverbs"],
        "Hausa Culture and Institutions II": ["Traditional Political System", "Marriage Customs", "Arts, Crafts, and Music", "Food Culture"],
        "Hausa Orthography": ["The Boko (Latin) Script", "The Ajami (Arabic) Script", "Writing conventions", "Punctuation"]
      },
    },
    "Year 2": {
      "Semester 1": {
        "Intermediate Hausa Grammar": ["Complex Sentences", "Relative Clauses", "Serial Verb Constructions", "Ideophones"],
        "Phonetics and Phonology of Hausa": ["Articulatory Phonetics of Hausa", "Phonological Processes", "Tone and Intonation", "Syllable Structure"],
        "Introduction to Hausa Literature (Oral & Written)": ["Oral Genres (Tales, Proverbs, Riddles)", "Written Genres (Poetry, Prose, Drama)", "Pioneer Hausa Writers"],
        "History of the Hausa People": ["The Hausa City-States", "The Sokoto Caliphate", "Colonial and Post-Colonial History"]
      },
      "Semester 2": {
        "Advanced Hausa Syntax": ["Focus and Topicalization", "Negation", "Interrogatives", "Nominalization"],
        "Morphology of Hausa": ["Word Formation Processes", "Derivational Morphemes", "Inflectional Morphemes", "Pluralization"],
        "Hausa Poetry": ["Traditional Hausa Poetry", "Islamic Verse", "Modern Hausa Poetry", "Analysis of Poetic Texts"],
        "Hausa Prose": ["The Hausa Novel", "Short Stories", "Biographies and Autobiographies", "Literary Criticism"]
      },
    },
    "Year 3": {
      "Semester 1": {
        "Sociolinguistics of Hausa": ["Dialects of Hausa", "Language and Identity", "Code-switching", "Standardization"],
        "Hausa Translation and Interpretation": ["Theories of Translation", "Practical Translation (Hausa-English)", "Practical Translation (English-Hausa)", "Introduction to Interpreting"],
        "Hausa Drama": ["Traditional and Modern Drama", "Major Playwrights", "Performance Analysis", "Staging a Hausa Play"],
        "Research Methods": ["Research in Language and Literature", "Data Collection (Fieldwork)", "Data Analysis", "Proposal Writing"]
      },
      "Semester 2": {
        "Hausa Dialectology": ["Mapping the Dialects", "Phonological and Lexical Variation", "Syntactic Variation", "Comparative Analysis"],
        "Stylistics": ["Linguistic Analysis of Hausa Texts", "Figures of Speech", "Stylistics of Prose", "Stylistics of Poetry"],
        "Hausa in the Media": ["Language of Radio and TV", "Newspaper Hausa", "Hausa on the Internet", "Film and Video"],
        "Industrial Training (SIWES)": ["Attachment at a media house, cultural center, or school."]
      },
    },
    "Year 4": {
      "Semester 1": {
        "Semantics and Pragmatics of Hausa": ["Word Meaning", "Sentence Meaning", "Presupposition and Implicature", "Speech Acts"],
        "Comparative West-Chadic Linguistics": ["Hausa in the Chadic Family", "Phonological Correspondences", "Lexical and Morphological Comparisons"],
        "Advanced Hausa Composition": ["Essay Writing", "Creative Writing", "Academic Writing", "Public Speaking"],
        "Seminar": ["Presentation on a current topic in Hausa studies"]
      },
      "Semester 2": {
        "Project/Long Essay": ["Independent research project on Hausa language, literature or culture."],
        "Modern Trends in Hausa Literature": ["Contemporary Novelists and Poets", "Post-modernist influences", "The role of literature in society"],
        "Language and Technology": ["Hausa computational linguistics", "Developing digital resources for Hausa", "Language documentation"],
        "Advanced Hausa-English Translation": ["Translating literary texts", "Translating technical documents", "Simultaneous Interpretation practice"]
      },
    },
  },
};

const getHighSchoolDomainCurriculum = (subject: Subject, level: string) => {
  const isJunior = (level || '').startsWith("JSS") || (level || '').includes("Nursery") || (level || '').includes("Primary");
  const isALevel = (level || '').includes("A-Level") || (level || '').includes("AP") || (level || '').includes("IB");
  const s = (subject || '').toString().toLowerCase();

  if (s.includes("math")) {
    if (isJunior) {
      return {
        "First Term": {
          "Whole Numbers & Place Value": ["Counting, Notation and Place Value", "L.C.M and H.C.F", "Fractions, Decimals and Percentages"],
          "Basic Algebra": ["Algebraic Expressions & Terms", "Simplification & Substitution", "Linear Equations in One Variable"]
        },
        "Second Term": {
          "Plane & Solid Geometry": ["Angles, Parallel Lines and Transversals", "Triangles, Quadrilaterals and Polygons", "Perimeter and Area of Plane Shapes"],
          "Statistics & Data": ["Collection and Presentation of Data", "Frequency Tables & Bar Charts", "Mean, Median and Mode"]
        },
        "Third Term": {
          "Commercial Mathematics": ["Profit and Loss Calculations", "Simple Interest and Compound Interest", "Rates, Ratios and Proportions"],
          "Probability & Measurement": ["Simple Probability & Coin Tossing", "Volume and Capacity of Cubes and Cylinders", "Pythagoras Theorem"]
        }
      };
    } else if (isALevel) {
      return {
        "First Term": {
          "Advanced Algebra & Functions": ["Polynomials and Partial Fractions", "Logarithmic & Exponential Functions", "Complex Numbers & Argand Diagrams"],
          "Differential Calculus": ["Differentiation from First Principles", "Product, Quotient and Chain Rules", "Implicit and Parametric Differentiation"]
        },
        "Second Term": {
          "Integral Calculus & Differential Equations": ["Integration Techniques (Substitution, Parts)", "Definite Integrals & Area Under Curves", "First-Order Separable Differential Equations"],
          "Vectors & Coordinate Geometry": ["Vector Algebra in 3D Space", "Equations of Lines and Planes", "Conic Sections (Parabola, Ellipse, Hyperbola)"]
        },
        "Third Term": {
          "Mechanics & Further Statistics": ["Kinematics with Calculus", "Newton's Laws & Friction", "Probability Distributions (Binomial, Normal, Poisson)"]
        }
      };
    } else {
      return {
        "First Term": {
          "Quadratic Equations & Theory": ["Factorization & Completing the Square", "Quadratic Formula and Discriminant", "Quadratic Graphs and Turning Points"],
          "Set Theory & Venn Diagrams": ["Union, Intersection and Complements", "Venn Diagram Problem Solving", "Cardinality of Sets"]
        },
        "Second Term": {
          "Trigonometric Ratios & Applications": ["Sine, Cosine and Tangent Ratios", "Angles of Elevation and Depression", "Sine and Cosine Rules"],
          "Circle Geometry & Theorems": ["Angles in the Same Segment", "Cyclic Quadrilaterals and Tangents", "Chords and Arc Length Calculations"]
        },
        "Third Term": {
          "Coordinate Geometry & Statistics": ["Distance, Midpoint and Gradient of Lines", "Equations of Straight Lines (y = mx + c)", "Cumulative Frequency Curves (Ogives) & Percentiles"]
        }
      };
    }
  }

  if (s.includes("physic") || s.includes("chemist") || s.includes("biolog") || s.includes("zoolog") || s.includes("astronomy") || s.includes("agricultural")) {
    if (isJunior) {
      return {
        "First Term": {
          "Matter & Measurement": ["States of Matter & Phase Changes", "Measuring Mass, Volume and Density", "Elements, Compounds and Mixtures"],
          "Living Organisms": ["Characteristics of Living Things", "Plant vs Animal Cells", "Basic Classification of Living Things"]
        },
        "Second Term": {
          "Energy & Force": ["Forms and Sources of Energy", "Types of Forces & Gravity", "Simple Machines (Levers, Pulleys, Inclined Planes)"],
          "Human Body Systems": ["Human Digestive System", "Respiratory System & Gas Exchange", "Circulatory System Basics"]
        },
        "Third Term": {
          "Ecosystems & Environment": ["Food Chains and Food Webs", "Pollution & Environmental Protection", "The Solar System & Earth's Atmosphere"]
        }
      };
    } else if (isALevel) {
      return {
        "First Term": {
          "Advanced Thermodynamics & Energetics": ["Enthalpy, Entropy and Gibbs Free Energy", "Laws of Thermodynamics", "Chemical Equilibrium & Le Chatelier's Principle"],
          "Quantum & Nuclear Physics": ["Wave-Particle Duality & De Broglie Wavelength", "Atomic Energy Levels and Spectra", "Nuclear Decay, Binding Energy and Mass Defect"]
        },
        "Second Term": {
          "Molecular Genetics & Cell Biology": ["DNA Replication and Transcription Mechanisms", "Translation & Protein Synthesis", "Recombinant DNA & Gene Editing"],
          "Electromagnetism & Wave Optics": ["Faraday's & Lenz's Laws of Induction", "Electromagnetic Waves Spectrum", "Interference, Diffraction and Polarization"]
        },
        "Third Term": {
          "Organic Reaction Mechanisms": ["Electrophilic & Nucleophilic Addition", "Aromatic Chemistry (Benzene Structure & Reactions)", "Spectroscopy (NMR, IR, Mass Spectrometry)"]
        }
      };
    } else {
      return {
        "First Term": {
          "Kinematics & Dynamics": ["Equations of Motion (u, v, a, t, s)", "Newton's Three Laws of Motion", "Work, Energy, Power and Momentum"],
          "Atomic Structure & Chemical Bonding": ["Subatomic Particles and Electron Configuration", "Ionic, Covalent and Metallic Bonding", "Periodic Table Trends and Groups"]
        },
        "Second Term": {
          "Stoichiometry & Solutions": ["Mole Concept and Avogadro's Constant", "Concentration, Molarity and Titrations", "Acids, Bases, pH Scale and Salt Preparation"],
          "Cell Biology & Genetics": ["Mitosis and Meiosis Cell Division", "Mendelian Genetics and Monohybrid Crosses", "Structure and Function of DNA and RNA"]
        },
        "Third Term": {
          "Waves, Optics & Electricity": ["Transverse and Longitudinal Waves", "Reflection, Refraction and Lenses", "Ohm's Law, Resistance and Electrical Circuits"]
        }
      };
    }
  }

  if (s.includes("code") || s.includes("comput") || s.includes("software") || s.includes("database") || s.includes("mechatronics")) {
    if (isJunior) {
      return {
        "First Term": {
          "Computer Fundamentals": ["Hardware Components & Input/Output Devices", "Operating System Basics", "Introduction to Computer Networking"],
          "Algorithm & Flowcharts": ["Problem Solving Logic", "Flowchart Symbols & Rules", "Pseudocode Writing"]
        },
        "Second Term": {
          "Intro to Programming": ["Variables, Constants & Data Types", "Conditional Statements (If-Else)", "Loops (For, While)"],
          "Digital Literacy": ["Word Processing & Spreadsheets", "Internet Navigation & Search Skills", "Cyber Safety & Ethics"]
        },
        "Third Term": {
          "Web & Creative Coding": ["HTML Document Structure", "CSS Styling & Colors", "Interactive Blocks in Scratch/Python"]
        }
      };
    } else {
      return {
        "First Term": {
          "Programming & Data Structures": ["Functions and Recursion", "Arrays, Lists and Tuples", "Object-Oriented Concepts (Classes, Objects)"],
          "Computer Architecture": ["CPU Architecture & Von Neumann Model", "Binary, Octal & Hexadecimal Arithmetic", "Logic Gates & Boolean Algebra"]
        },
        "Second Term": {
          "Database Systems & SQL": ["Relational Database Design", "Primary & Foreign Keys", "SQL Queries (SELECT, INSERT, UPDATE, DELETE)"],
          "Networking & Cybersecurity": ["OSI and TCP/IP Networking Layers", "IP Addressing and Subnetting", "Encryption, Firewalls & Network Security"]
        },
        "Third Term": {
          "Software Engineering": ["Software Development Lifecycle (SDLC)", "Agile vs Waterfall Methodologies", "Testing, Debugging and Code Refactoring"]
        }
      };
    }
  }

  if (s.includes("account") || s.includes("bank") || s.includes("business") || s.includes("commer") || s.includes("market") || s.includes("econom")) {
    return {
      "First Term": {
        "Microeconomic Foundations": ["Demand and Supply Analysis", "Price Elasticity of Demand and Supply", "Market Structures (Perfect Competition, Monopoly)"],
        "Bookkeeping & Double-Entry": ["Journals, Day Books and Ledgers", "The Trial Balance", "Bank Reconciliation Statements"]
      },
      "Second Term": {
        "Financial Statements": ["Trading, Profit and Loss Accounts", "The Balance Sheet (Statement of Financial Position)", "Adjustments for Accruals and Prepayments"],
        "Macroeconomic Policy": ["National Income Determination (GDP, GNP)", "Inflation and Unemployment", "Fiscal Policy and Monetary Policy"]
      },
      "Third Term": {
        "Business Strategy & Finance": ["Forms of Business Organizations", "Capital Structure and Sources of Finance", "International Trade and Foreign Exchange"]
      }
    };
  }

  return {
    "First Term": {
      [`Foundations of ${subject}`]: [
        `Core Principles & Definitions of ${subject}`,
        `Historical Development & Key Thinkers`,
        `Fundamental Analytical Frameworks`
      ],
      [`Applied Practice in ${subject}`]: [
        `Standard Methodologies & Problem Solving`,
        `Case Studies and Empirical Analysis`,
        `Practical Classroom Drills`
      ]
    },
    "Second Term": {
      [`Intermediate ${subject} Analysis`]: [
        `Systematic Analysis & Derivations`,
        `Critical Evaluation & Model Comparison`,
        `Experimental Methods & Data Interpretation`
      ],
      [`Real-World Applications`]: [
        `Standard Exam Style Question Strategies`,
        `Structured Problem Scenarios`,
        `Analytical Writing & Essay Formulation`
      ]
    },
    "Third Term": {
      [`Advanced ${subject} Topics`]: [
        `Interdisciplinary Synthesis & Integration`,
        `Comprehensive Review & Exam Drills`,
        `World Curriculum Standard Past Questions`
      ]
    }
  };
};

const getUniversityDomainCurriculum = (subject: Subject, yr: string) => {
  const s = (subject || '').toString().toLowerCase();

  if (s.includes("math")) {
    if (yr === "Year 1") {
      return {
        "Semester 1": {
          "Calculus I": ["Limits and Continuity", "Derivatives & Applications", "Fundamental Theorem of Calculus"],
          "Algebra & Trigonometry": ["Complex Numbers", "Polynomials & Partial Fractions", "Matrices & Determinants"]
        },
        "Semester 2": {
          "Calculus II": ["Integration Techniques", "Sequences & Infinite Series", "Polar Coordinates"],
          "Linear Algebra I": ["Vector Spaces", "Linear Independence", "Eigenvalues & Eigenvectors"]
        }
      };
    } else if (yr === "Year 2") {
      return {
        "Semester 1": {
          "Multivariable Calculus": ["Partial Derivatives", "Multiple Integrals", "Vector Fields & Line Integrals"],
          "Differential Equations I": ["First Order ODEs", "Second Order Linear ODEs", "Applications in Physics & Modeling"]
        },
        "Semester 2": {
          "Abstract Algebra I": ["Group Theory", "Subgroups & Cyclic Groups", "Lagrange's Theorem"],
          "Real Analysis I": ["Topology of R", "Sequences & Limits", "Continuity & Uniform Continuity"]
        }
      };
    } else if (yr === "Year 3") {
      return {
        "Semester 1": {
          "Complex Analysis": ["Analytic Functions", "Cauchy-Riemann Equations", "Complex Contour Integration"],
          "Numerical Analysis": ["Root-Finding Algorithms", "Interpolation", "Numerical Differential Equations"]
        },
        "Semester 2": {
          "Differential Geometry": ["Curves and Surfaces", "Curvature and Torsion", "First and Second Fundamental Forms"],
          "Probability Theory": ["Random Variables", "Joint Distributions", "Law of Large Numbers & Central Limit Theorem"]
        }
      };
    } else {
      return {
        "Semester 1": {
          "Measure Theory & Lebesgue Integration": ["Sigma-Algebras & Measures", "Lebesgue Monotone & Dominated Convergence", "Lp Spaces"],
          "Functional Analysis": ["Normed and Banach Spaces", "Hilbert Spaces", "Linear Operators & Hahn-Banach Theorem"]
        },
        "Semester 2": {
          "Partial Differential Equations": ["Heat, Wave and Laplace Equations", "Fourier Transforms", "Sturm-Liouville Theory"],
          "Senior Thesis / Capstone": ["Independent Research Project & Mathematical Exposition"]
        }
      };
    }
  }

  if (s.includes("physic") || s.includes("chemist") || s.includes("biolog") || s.includes("zoolog") || s.includes("medicine") || s.includes("nursing")) {
    if (yr === "Year 1") {
      return {
        "Semester 1": {
          "General Chemistry / Biology I": ["Atomic Structure and Chemical Bonding", "Cellular Biology and Biomolecules", "Stoichiometry"],
          "Physics I (Mechanics & Thermal)": ["Kinematics & Newton's Laws", "Work, Energy & Momentum", "Thermodynamics & Kinetic Theory"]
        },
        "Semester 2": {
          "General Chemistry / Biology II": ["Thermodynamics & Kinetics", "Genetics & Molecular Biology", "Electrochemistry"],
          "Physics II (Electricity & Magnetism)": ["Electric Fields & Gauss's Law", "Magnetic Fields & Induction", "Wave Optics & Interference"]
        }
      };
    } else if (yr === "Year 2") {
      return {
        "Semester 1": {
          "Organic Chemistry I / Human Anatomy": ["Stereochemistry & Reaction Mechanisms", "Alkanes, Alkenes & Alkynes", "Gross Anatomy & Histology"],
          "Classical Mechanics / Biochemistry": ["Lagrangian Mechanics", "Protein Structure & Enzyme Kinetics", "Metabolic Pathways (Glycolysis, Krebs Cycle)"]
        },
        "Semester 2": {
          "Organic Chemistry II / Physiology": ["Spectroscopy (NMR, IR, Mass)", "Aromatic & Carbonyl Reactions", "Organ System Physiology & Homeostasis"],
          "Electromagnetism / Cell Physiology": ["Maxwell's Equations", "Electromagnetic Waves", "Cell Membrane Transport & Signaling"]
        }
      };
    } else if (yr === "Year 3") {
      return {
        "Semester 1": {
          "Quantum Mechanics / Pathology": ["Schrödinger Equation", "Quantum Harmonic Oscillator", "General Pathology & Cell Injury"],
          "Physical Chemistry / Microbiology": ["Quantum Chemistry", "Statistical Thermodynamics", "Bacteriology & Virology Mechanisms"]
        },
        "Semester 2": {
          "Statistical Physics / Pharmacology": ["Ensembles and Partition Functions", "Fermi-Dirac & Bose-Einstein Statistics", "Pharmacokinetics & Pharmacodynamics"],
          "Analytical Chemistry / Immunology": ["Chromatography & Mass Spectrometry", "Instrumental Analysis", "Innate & Adaptive Immunity Mechanisms"]
        }
      };
    } else {
      return {
        "Semester 1": {
          "Advanced Laboratory & Research": ["Experimental Design & Instrumentation", "Data Analysis & Error Propagation", "Research Literature Review"],
          "Specialized Topics": ["Condensed Matter Physics / Medicinal Chemistry", "Genomics & Bioinformatics", "Clinical Medicine & Diagnostics"]
        },
        "Semester 2": {
          "Senior Honors Thesis Project": ["Independent Laboratory Research", "Data Synthesis & Scientific Manuscript", "Thesis Oral Defense"]
        }
      };
    }
  }

  if (s.includes("code") || s.includes("comput") || s.includes("software") || s.includes("database")) {
    if (yr === "Year 1") {
      return {
        "Semester 1": {
          "Introduction to Computer Science": ["Problem Solving & Algorithms", "Basic Programming Syntax", "Data Types & Variables"],
          "Discrete Mathematics": ["Propositional Logic", "Set Theory & Relations", "Proof Techniques & Induction"]
        },
        "Semester 2": {
          "Object-Oriented Programming": ["Classes, Objects & Encapsulation", "Inheritance & Polymorphism", "File I/O & Exception Handling"],
          "Digital Logic Design": ["Boolean Algebra", "Combinational Circuits", "Sequential Circuits & Flip-Flops"]
        }
      };
    } else if (yr === "Year 2") {
      return {
        "Semester 1": {
          "Data Structures & Algorithms": ["Arrays, Linked Lists, Stacks, Queues", "Trees, Binary Search Trees & Heaps", "Sorting & Searching Algorithms"],
          "Computer Organization & Assembly": ["MIPS/x86 Assembly Language", "Memory Hierarchy & Cache", "Pipelining & CPU Design"]
        },
        "Semester 2": {
          "Algorithms & Complexity": ["Divide and Conquer, Dynamic Programming", "Greedy Algorithms & Graph Algorithms", "NP-Completeness & Big-O Analysis"],
          "Database Management Systems": ["Relational Model & ER Diagrams", "SQL Query Optimization", "Transaction Management & ACID Properties"]
        }
      };
    } else if (yr === "Year 3") {
      return {
        "Semester 1": {
          "Operating Systems": ["Process Management & Threads", "CPU Scheduling & Synchronization", "Memory Management & Virtual Memory"],
          "Computer Networks": ["OSI & TCP/IP Stack", "Routing Algorithms & IP Protocols", "Transport Layer (TCP/UDP) & Socket Programming"]
        },
        "Semester 2": {
          "Software Engineering": ["Agile Development Methodologies", "Software Architecture & Design Patterns", "Testing, CI/CD & Version Control"],
          "Theory of Computation": ["Finite Automata & Regular Languages", "Context-Free Grammars", "Turing Machines & Decidability"]
        }
      };
    } else {
      return {
        "Semester 1": {
          "Artificial Intelligence & Machine Learning": ["Supervised & Unsupervised Learning", "Neural Networks & Deep Learning", "Natural Language Processing Basics"],
          "Cybersecurity & Cryptography": ["Symmetric & Asymmetric Encryption", "Network Security Protocols", "Web Application Security & Exploits"]
        },
        "Semester 2": {
          "Senior Capstone Project": ["Full-Stack Software Architecture", "Implementation & Deployment", "Technical Documentation & Presentation"]
        }
      };
    }
  }

  return {
    "Semester 1": {
      [`${subject} Foundations I`]: [
        `Theoretical Frameworks & Historical Context`,
        `Methodological Approaches & Axioms`,
        `Core Analytical Equations & Models`
      ],
      [`Applied ${subject} Seminar`]: [
        `Empirical Research & Problem Solving`,
        `Laboratory / Methodological Analysis`,
        `Case Studies and Literature Review`
      ]
    },
    "Semester 2": {
      [`Advanced ${subject} II`]: [
        `Complex System Dynamics & Theories`,
        `Advanced Derivations & Specializations`,
        `Interdisciplinary Applications`
      ],
      [`Research Methods & Thesis`]: [
        `Experimental Design & Data Analysis`,
        `Academic Writing & Manuscript Preparation`,
        `Comprehensive Degree Examination Prep`
      ]
    }
  };
};

/**
 * Generates a generic, plausible high school curriculum for all subjects.
 */
const createBaseHighSchoolCurriculum = (): Curriculum => {
  const allSubjects = Object.values(Subject);
  const curriculum: Curriculum = {};
  const levels = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3 (O-Level)", "A-Level"];

  for (const subject of allSubjects) {
    curriculum[subject] = {};
    for (const level of levels) {
      curriculum[subject]![level] = getHighSchoolDomainCurriculum(subject, level);
    }
  }
  return curriculum;
};

/**
 * Generates a generic, plausible university curriculum for all subjects.
 */
const createBaseUniversityCurriculum = (): Curriculum => {
  const allSubjects = Object.values(Subject);
  const curriculum: Curriculum = {};
  const years = ["Year 1", "Year 2", "Year 3", "Year 4"];

  for (const subject of allSubjects) {
    curriculum[subject] = {};
    for (const yr of years) {
      curriculum[subject]![yr] = getUniversityDomainCurriculum(subject, yr);
    }
  }
  return curriculum;
};

// --- MERGE LOGIC ---
const baseChild = createBaseChildCurriculum();
const baseHighSchool = createBaseHighSchoolCurriculum();
const baseUniversity = createBaseUniversityCurriculum();

const baseCurriculum: Curriculum = {};

for (const subject of Object.values(Subject)) {
  baseCurriculum[subject] = {
    ...(baseChild[subject] || {}),
    ...(baseHighSchool[subject] || {}),
    ...(baseUniversity[subject] || {}),
    ...(specificAndUniversityData[subject] || {})
  };
}

// Export the final, merged curriculum object.
export const curriculumData: Curriculum = baseCurriculum;
