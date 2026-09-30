import { Subject, AudienceLevel, Quiz } from '../types';

/**
 * Generates an educational, high-quality 5-question fallback quiz for any subject and level.
 * Guarantees that quizzes ALWAYS work seamlessly across all mobile phones, browsers, and accounts.
 */
export const generateFallbackQuiz = (
  subject: Subject, 
  level: AudienceLevel, 
  numQuestions: number = 5,
  topic?: string,
  subTopic?: string,
  year?: string,
  semester?: string
): Quiz => {
  const isChild = level === AudienceLevel.Child;
  const levelName = isChild ? 'Primary / Basic School' : level === AudienceLevel.HighSchool ? 'High School' : 'University';

  // CHILD / PRIMARY BASIC SCHOOL QUIZZES (Simplified for young pupils, ages 5-11)
  const childSubjectQuizzes: Record<string, Array<{ questionText: string; options: string[]; correctAnswerIndex: number; explanation: string }>> = {
    [Subject.Math]: [
      {
        questionText: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        correctAnswerIndex: 2,
        explanation: 'When you count 5 fingers and add 3 more fingers, you get 8!'
      },
      {
        questionText: 'If Chidi has 10 sweet mangoes and eats 4 of them, how many mangoes are left?',
        options: ['4 mangoes', '5 mangoes', '6 mangoes', '7 mangoes'],
        correctAnswerIndex: 2,
        explanation: '10 take away 4 is 6 (10 - 4 = 6 mangoes).'
      },
      {
        questionText: 'Which shape has 3 straight sides and 3 sharp corners?',
        options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
        correctAnswerIndex: 1,
        explanation: 'A triangle always has 3 sides and 3 corners (like a slice of pizza!).'
      },
      {
        questionText: 'Which of these is a Nigerian money paper note?',
        options: ['₦50 Note', '$50 Dollar', '€50 Euro', '¥50 Yen'],
        correctAnswerIndex: 0,
        explanation: 'Fifty Naira (₦50) is an official Nigerian currency note with the symbol ₦.'
      },
      {
        questionText: 'What number comes right after 19 when counting forward?',
        options: ['18', '20', '21', '22'],
        correctAnswerIndex: 1,
        explanation: 'Counting forward: 17, 18, 19, 20!'
      }
    ],
    [Subject.English]: [
      {
        questionText: 'Which of these words is a Noun (the name of an animal)?',
        options: ['Quickly', 'Lion', 'Sleep', 'Happy'],
        correctAnswerIndex: 1,
        explanation: 'A Lion is an animal, so it is a naming word (Noun)!'
      },
      {
        questionText: 'What punctuation mark do we put at the very end of a sentence?',
        options: ['Comma (,)', 'Question Mark (?)', 'Full Stop (.)', 'Quotation Mark (")'],
        correctAnswerIndex: 2,
        explanation: 'A Full Stop (.) tells us that the sentence has finished.'
      },
      {
        questionText: 'Which word rhymes with the word "SUN"?',
        options: ['RUN', 'DOG', 'CAT', 'BOOK'],
        correctAnswerIndex: 0,
        explanation: 'SUN and RUN end with the same fun sound "-un"!'
      },
      {
        questionText: 'What is the plural of one "Book"?',
        options: ['Bookes', 'Books', 'Booking', 'Bookies'],
        correctAnswerIndex: 1,
        explanation: 'We add "-s" to make plural: one book, two books.'
      },
      {
        questionText: 'Which polite word should you say when someone gives you a gift?',
        options: ['Go away', 'Thank you', 'Give me more', 'No'],
        correctAnswerIndex: 1,
        explanation: 'Saying "Thank you" is good manners and shows appreciation!'
      }
    ],
    [Subject.Physics]: [
      {
        questionText: 'What gives us warm, bright light during the day?',
        options: ['The Moon', 'The Sun', 'A Candle', 'The Stars'],
        correctAnswerIndex: 1,
        explanation: 'The Sun is a giant bright star that warms the Earth and gives us daylight!'
      },
      {
        questionText: 'What happens when you push a toy car across a smooth floor?',
        options: ['It moves forward', 'It turns into water', 'It disappears', 'It falls asleep'],
        correctAnswerIndex: 0,
        explanation: 'A push is a force that makes things move forward!'
      },
      {
        questionText: 'What tool do we use to see what time it is for school?',
        options: ['Ruler', 'Clock', 'Thermometer', 'Weighing scale'],
        correctAnswerIndex: 1,
        explanation: 'A clock or wristwatch tells us the time in hours and minutes.'
      },
      {
        questionText: 'Which of these will stick to a magnet?',
        options: ['Plastic spoon', 'Iron nail', 'Paper sheet', 'Wooden pencil'],
        correctAnswerIndex: 1,
        explanation: 'Magnets attract magnetic metals like iron nails and paper clips!'
      },
      {
        questionText: 'What happens to ice cubes when left in the warm sunshine?',
        options: ['They turn to rock', 'They melt into water', 'They grow bigger', 'Nothing happens'],
        correctAnswerIndex: 1,
        explanation: 'Warm heat makes cold solid ice melt into liquid water.'
      }
    ],
    [Subject.Chemistry]: [
      {
        questionText: 'What happens when you stir a spoon of white sugar into a cup of warm water?',
        options: ['It dissolves and disappears', 'It catches fire', 'It turns into a rock', 'It breaks the cup'],
        correctAnswerIndex: 0,
        explanation: 'Sugar dissolves in water to make sweet sugar water!'
      },
      {
        questionText: 'What state of matter is drinking water?',
        options: ['Solid', 'Liquid', 'Gas', 'Steam'],
        correctAnswerIndex: 1,
        explanation: 'Water is a liquid because it flows and takes the shape of its container.'
      },
      {
        questionText: 'What happens when water is heated in a pot until it boils?',
        options: ['It freezes', 'It turns into steam (water vapor)', 'It becomes soil', 'It turns into oil'],
        correctAnswerIndex: 1,
        explanation: 'Boiling water turns into invisible water vapor and steam (a gas).'
      },
      {
        questionText: 'Which of these is a clean, natural liquid we drink to stay healthy?',
        options: ['Kerosene', 'Paint', 'Clean Water', 'Petrol'],
        correctAnswerIndex: 2,
        explanation: 'Clean drinking water keeps our body refreshed and hydrated!'
      },
      {
        questionText: 'What color does water have when it is pure and clean?',
        options: ['Colorless (Clear)', 'Bright red', 'Jet black', 'Dark green'],
        correctAnswerIndex: 0,
        explanation: 'Pure clean water is clear and colorless.'
      }
    ],
    [Subject.Biology]: [
      {
        questionText: 'Which of these is a LIVING thing?',
        options: ['A wooden table', 'A baby goat', 'A plastic cup', 'A river stone'],
        correctAnswerIndex: 1,
        explanation: 'A baby goat breathes, eats, grows, and plays, so it is a living animal!'
      },
      {
        questionText: 'Which sense organ do we use to see colors and watch cartoons?',
        options: ['Nose', 'Ears', 'Eyes', 'Tongue'],
        correctAnswerIndex: 2,
        explanation: 'Our two eyes are our sense organs for seeing the world.'
      },
      {
        questionText: 'Where do fish live and swim?',
        options: ['On tree branches', 'Inside water (rivers and seas)', 'Under the ground', 'In the sky'],
        correctAnswerIndex: 1,
        explanation: 'Fish have fins and gills to breathe and swim inside water.'
      },
      {
        questionText: 'What green part of a plant catches sunshine to make food?',
        options: ['Roots', 'Leaves', 'Bark', 'Thorns'],
        correctAnswerIndex: 1,
        explanation: 'The green leaves catch sunlight and air to cook food for the plant.'
      },
      {
        questionText: 'What should we always do before eating our food?',
        options: ['Wash our hands with soap and water', 'Run around outside', 'Touch dirty shoes', 'Sleep'],
        correctAnswerIndex: 0,
        explanation: 'Washing our hands washes away germs so we stay healthy and strong!'
      }
    ],
    [Subject.AgriculturalScience]: [
      {
        questionText: 'Which farm tool does a Nigerian farmer use to make soil heaps for yams?',
        options: ['Hoe', 'Pencil', 'Scissors', 'Ruler'],
        correctAnswerIndex: 0,
        explanation: 'A hoe is used for digging, weeding, and making soil heaps!'
      },
      {
        questionText: 'Which of these is a delicious food crop grown in Nigeria?',
        options: ['Yam', 'Stone', 'Sand', 'Plastic'],
        correctAnswerIndex: 0,
        explanation: 'Yam is an important Nigerian tuber crop that we eat as boiled yam, fried yam, or pounded yam.'
      },
      {
        questionText: 'Which farm animal lays fresh eggs for us to eat?',
        options: ['Dog', 'Chicken (Hen)', 'Goat', 'Cat'],
        correctAnswerIndex: 1,
        explanation: 'Hens lay fresh eggs that give us protein!'
      },
      {
        questionText: 'What do green crops need to grow healthy and strong?',
        options: ['Sunlight, Water, and Fertile Soil', 'Ice cream and Soda', 'Darkness only', 'Soap only'],
        correctAnswerIndex: 0,
        explanation: 'Crops need good soil, water, and warm sunlight to grow.'
      },
      {
        questionText: 'Which animal says "Moo" and gives us fresh milk?',
        options: ['Cow', 'Duck', 'Frog', 'Lion'],
        correctAnswerIndex: 0,
        explanation: 'Cows (cattle) provide wholesome fresh milk and beef.'
      }
    ],
    [Subject.SocialStudies]: [
      {
        questionText: 'What are the three colors of the Nigerian National Flag?',
        options: ['Red, White, Blue', 'Green, White, Green', 'Yellow, Black, Red', 'Green, Yellow, Blue'],
        correctAnswerIndex: 1,
        explanation: 'The Nigerian flag is Green, White, Green (Green for rich agriculture, White for peace).'
      },
      {
        questionText: 'What is a family made up of Father, Mother, and Children called?',
        options: ['Nuclear Family', 'Extended Family', 'Classroom Family', 'Sports Club'],
        correctAnswerIndex: 0,
        explanation: 'Father, Mother, and Children make up a Nuclear Family.'
      },
      {
        questionText: 'What does the RED light on a traffic light tell drivers to do?',
        options: ['Drive very fast', 'STOP', 'Dance', 'Turn off engine'],
        correctAnswerIndex: 1,
        explanation: 'Red means STOP, Yellow means GET READY, and Green means GO!'
      },
      {
        questionText: 'What is the Federal Capital Territory (Capital City) of Nigeria?',
        options: ['Lagos', 'Abuja', 'Kano', 'Port Harcourt'],
        correctAnswerIndex: 1,
        explanation: 'Abuja is the Federal Capital Territory and capital city of Nigeria.'
      },
      {
        questionText: 'How should well-behaved children treat their teachers and parents?',
        options: ['With respect and obedience', 'By shouting loudly', 'By refusing to listen', 'By running away'],
        correctAnswerIndex: 0,
        explanation: 'Respecting elders, parents, and teachers is a core Nigerian value!'
      }
    ],
    [Subject.ComputerScience]: [
      {
        questionText: 'Which part of a desktop computer looks like a television and shows pictures and games?',
        options: ['Monitor (Screen)', 'Mouse', 'Keyboard', 'Power cable'],
        correctAnswerIndex: 0,
        explanation: 'The Monitor displays text, images, and videos like a television!'
      },
      {
        questionText: 'What part of the computer do we use to type letters, numbers, and words?',
        options: ['Keyboard', 'Speakers', 'Mouse pad', 'Microphone'],
        correctAnswerIndex: 0,
        explanation: 'The Keyboard has buttons (keys) for typing letters from A to Z and numbers 0 to 9.'
      },
      {
        questionText: 'What is the small pointing device that moves an arrow on the screen called?',
        options: ['Computer Mouse', 'Elephant', 'Remote control', 'Printer'],
        correctAnswerIndex: 0,
        explanation: 'The Computer Mouse lets you click, double-click, and move things around.'
      },
      {
        questionText: 'What should you NEVER bring near a computer?',
        options: ['A notebook', 'Cups of water or sweet drinks', 'A school bag', 'Your eyes'],
        correctAnswerIndex: 1,
        explanation: 'Spilling water or drinks can damage the electronic computer parts!'
      },
      {
        questionText: 'What is the longest key on the computer keyboard that puts a space between words?',
        options: ['Enter key', 'Spacebar', 'Backspace', 'Shift key'],
        correctAnswerIndex: 1,
        explanation: 'The Spacebar is the wide, long key at the bottom of the keyboard.'
      }
    ]
  };

  const defaultChildQuiz = [
    {
      questionText: `What makes learning ${subject} so exciting and helpful?`,
      options: [
        'It helps us understand the world and solve everyday problems',
        'It is only for big university professors',
        'It has no real-life use',
        'It makes us forget everything'
      ],
      correctAnswerIndex: 0,
      explanation: `Learning ${subject} teaches young super learners how the world works!`
    },
    {
      questionText: `When you are solving a new lesson in ${subject}, what should you do first?`,
      options: [
        'Read the question carefully step-by-step',
        'Close your eyes and make a wild guess',
        'Tear the paper',
        'Give up immediately'
      ],
      correctAnswerIndex: 0,
      explanation: 'Reading carefully step-by-step helps you understand and find the right answer!'
    },
    {
      questionText: `Who can you ask for guidance when you need help with ${subject}?`,
      options: [
        'Your loving teacher, parents, or God\'s Glory Tutors',
        'Nobody at all',
        'Strangers on the street',
        'A sleeping cat'
      ],
      correctAnswerIndex: 0,
      explanation: 'Your teachers and parents are always happy to help you understand and succeed!'
    },
    {
      questionText: `What is the best way to remember what you learned in ${subject}?`,
      options: [
        'Practice with fun questions and teach a friend',
        'Never open your school book again',
        'Forget about it immediately',
        'Throw your pencil away'
      ],
      correctAnswerIndex: 0,
      explanation: 'Practicing a little bit every day makes your brain super smart and strong!'
    },
    {
      questionText: `How do you feel when you complete your school lessons in ${subject}?`,
      options: [
        'Proud, joyful, and confident like a champion',
        'Sad and angry',
        'Afraid of learning',
        'Tired forever'
      ],
      correctAnswerIndex: 0,
      explanation: 'Every lesson you master makes you a proud, brilliant scholar!'
    }
  ];

  // If AudienceLevel.Child, use the child quizzes
  if (isChild) {
    const questions = childSubjectQuizzes[subject] || defaultChildQuiz;
    return {
      quizTitle: `🌟 ${subject} Fun Quiz (Primary / Basic School Standard)`,
      questions
    };
  }

  // HIGH SCHOOL & UNIVERSITY QUIZZES
  const highSchoolAndUniQuizzes: Record<string, Array<{ questionText: string; options: string[]; correctAnswerIndex: number; explanation: string }>> = {
    [Subject.Math]: [
      {
        questionText: 'What is the value of x if 2x + 6 = 18?',
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 12'],
        correctAnswerIndex: 1,
        explanation: 'Subtract 6 from both sides to get 2x = 12, then divide by 2 to get x = 6.'
      },
      {
        questionText: 'What is the square root of 144?',
        options: ['10', '11', '12', '14'],
        correctAnswerIndex: 2,
        explanation: '12 multiplied by 12 equals 144.'
      },
      {
        questionText: 'If a right-angled triangle has legs of length 3 and 4, what is the length of the hypotenuse?',
        options: ['5', '6', '7', '8'],
        correctAnswerIndex: 0,
        explanation: 'By the Pythagorean theorem: 3² + 4² = 9 + 16 = 25. √25 = 5.'
      },
      {
        questionText: 'What is the derivative of f(x) = x³ with respect to x?',
        options: ['x²', '3x²', '3x', 'x³/3'],
        correctAnswerIndex: 1,
        explanation: 'By the power rule of differentiation, d/dx(xⁿ) = n·xⁿ⁻¹. For x³, the derivative is 3x².'
      },
      {
        questionText: 'What is the area of a circle with radius r = 7 units? (Using π ≈ 22/7)',
        options: ['44 sq units', '154 sq units', '308 sq units', '49 sq units'],
        correctAnswerIndex: 1,
        explanation: 'Area = π·r² = (22/7) × 7 × 7 = 154 square units.'
      }
    ],
    [Subject.English]: [
      {
        questionText: 'Which of the following is an example of a simile?',
        options: ['The room was a furnace.', 'He ran as fast as a cheetah.', 'Time is money.', 'The stars danced in the sky.'],
        correctAnswerIndex: 1,
        explanation: 'A simile compares two things using "like" or "as".'
      },
      {
        questionText: 'What is the correct past participle of the verb "to write"?',
        options: ['Wrote', 'Written', 'Writing', 'Writes'],
        correctAnswerIndex: 1,
        explanation: 'The past participle of "write" is "written" (e.g., "He has written a letter").'
      },
      {
        questionText: 'Identify the noun in the sentence: "The courageous student answered quickly."',
        options: ['Courageous', 'Student', 'Answered', 'Quickly'],
        correctAnswerIndex: 1,
        explanation: '"Student" is a person, which makes it a noun.'
      },
      {
        questionText: 'What literary device is used in the phrase: "Peter Piper picked a peck of pickled peppers"?',
        options: ['Onomatopoeia', 'Alliteration', 'Metaphor', 'Hyperbole'],
        correctAnswerIndex: 1,
        explanation: 'Alliteration is the repetition of the initial consonant sound in a phrase.'
      },
      {
        questionText: 'Which phrase contains a split infinitive?',
        options: ['To boldly go where no one has gone before', 'To go boldly where no one has gone before', 'Going boldly into the unknown', 'Boldly going ahead'],
        correctAnswerIndex: 0,
        explanation: '"To boldly go" places the adverb "boldly" between "to" and "go", splitting the infinitive verb.'
      }
    ],
    [Subject.Physics]: [
      {
        questionText: 'What is the SI unit of Force?',
        options: ['Joule', 'Pascal', 'Newton', 'Watt'],
        correctAnswerIndex: 2,
        explanation: 'Force is measured in Newtons (N) in honor of Sir Isaac Newton.'
      },
      {
        questionText: 'What is the acceleration due to gravity on Earth at sea level (approximate)?',
        options: ['8.5 m/s²', '9.8 m/s²', '10.8 m/s²', '12.0 m/s²'],
        correctAnswerIndex: 1,
        explanation: 'Standard acceleration due to gravity on Earth is approximately 9.8 m/s² (or 9.81 m/s²).'
      },
      {
        questionText: 'Which law states that for every action there is an equal and opposite reaction?',
        options: ['Newton\'s 1st Law', 'Newton\'s 2nd Law', 'Newton\'s 3rd Law', 'Law of Gravitation'],
        correctAnswerIndex: 2,
        explanation: 'Newton\'s Third Law of Motion governs action-reaction forces.'
      },
      {
        questionText: 'What is the speed of light in a vacuum?',
        options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '1.5 × 10⁸ m/s', '300,000 m/s'],
        correctAnswerIndex: 0,
        explanation: 'The speed of light in a vacuum is approximately 300,000,000 meters per second (3 × 10⁸ m/s).'
      },
      {
        questionText: 'In electrical physics, what is Ohm\'s Law formula?',
        options: ['V = I / R', 'V = I × R', 'P = V × I', 'I = V × R'],
        correctAnswerIndex: 1,
        explanation: 'Ohm\'s Law states Voltage (V) equals Current (I) multiplied by Resistance (R).'
      }
    ],
    [Subject.Chemistry]: [
      {
        questionText: 'What is the chemical symbol for Gold?',
        options: ['Ag', 'Au', 'Fe', 'Go'],
        correctAnswerIndex: 1,
        explanation: 'Au comes from the Latin word for gold, "Aurum".'
      },
      {
        questionText: 'What is the pH level of pure distilled water at 25°C?',
        options: ['5', '7', '9', '14'],
        correctAnswerIndex: 1,
        explanation: 'A pH of 7 represents a completely neutral solution.'
      },
      {
        questionText: 'Which element is essential for organic compounds?',
        options: ['Hydrogen', 'Oxygen', 'Carbon', 'Nitrogen'],
        correctAnswerIndex: 2,
        explanation: 'Organic chemistry is the study of carbon-containing compounds.'
      },
      {
        questionText: 'What type of bond is formed when electrons are shared between atoms?',
        options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
        correctAnswerIndex: 1,
        explanation: 'Covalent bonding involves the sharing of electron pairs between atoms.'
      },
      {
        questionText: 'How many valence electrons does a neutral Carbon atom possess?',
        options: ['2', '4', '6', '8'],
        correctAnswerIndex: 1,
        explanation: 'Carbon has 6 total electrons (2 in the inner shell, 4 in the valence shell).'
      }
    ],
    [Subject.Biology]: [
      {
        questionText: 'Which organelle is known as the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswerIndex: 2,
        explanation: 'Mitochondria produce ATP, supplying energy for cellular activities.'
      },
      {
        questionText: 'What process do green plants use to synthesize food using sunlight?',
        options: ['Respiration', 'Photosynthesis', 'Osmosis', 'Transpiration'],
        correctAnswerIndex: 1,
        explanation: 'Photosynthesis converts sunlight, water, and carbon dioxide into glucose and oxygen.'
      },
      {
        questionText: 'What molecule carries the genetic instruction code in living organisms?',
        options: ['RNA', 'DNA', 'ATP', 'Protein'],
        correctAnswerIndex: 1,
        explanation: 'Deoxyribonucleic Acid (DNA) holds hereditary genetic code.'
      },
      {
        questionText: 'In humans, which blood cells are responsible for carrying oxygen throughout the body?',
        options: ['White Blood Cells', 'Red Blood Cells', 'Platelets', 'Plasma'],
        correctAnswerIndex: 1,
        explanation: 'Red blood cells contain hemoglobin, which binds oxygen.'
      },
      {
        questionText: 'Which biological kingdom contains non-photosynthetic organisms with chitin in their cell walls?',
        options: ['Plantae', 'Animalia', 'Fungi', 'Protista'],
        correctAnswerIndex: 2,
        explanation: 'Fungi (mushrooms, yeasts) have cell walls composed of chitin.'
      }
    ],
    [Subject.ComputerScience]: [
      {
        questionText: 'What does CPU stand for in computer science?',
        options: ['Central Performance Unit', 'Central Processing Unit', 'Computer Processing User', 'Core Power Unit'],
        correctAnswerIndex: 1,
        explanation: 'CPU stands for Central Processing Unit, the primary component executing instructions.'
      },
      {
        questionText: 'Which data structure follows the First-In, First-Out (FIFO) order?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        correctAnswerIndex: 1,
        explanation: 'A Queue works on FIFO principles (first item added is first to be processed).'
      },
      {
        questionText: 'What is the time complexity of binary search on a sorted array of n elements?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswerIndex: 2,
        explanation: 'Binary search repeatedly cuts the search space in half, resulting in O(log n) time complexity.'
      },
      {
        questionText: 'In Object-Oriented Programming (OOP), what concept allows a subclass to provide a specific implementation of a method defined in its superclass?',
        options: ['Encapsulation', 'Polymorphism / Method Overriding', 'Abstraction', 'Inheritance'],
        correctAnswerIndex: 1,
        explanation: 'Method overriding is a form of runtime polymorphism where a subclass redefines a parent method.'
      },
      {
        questionText: 'Which binary value represents the decimal number 10?',
        options: ['1000', '1010', '1100', '1110'],
        correctAnswerIndex: 1,
        explanation: 'In binary: 8 + 0 + 2 + 0 = 1010₂.'
      }
    ]
  };

  const defaultGenericQuiz = [
    {
      questionText: `What is a fundamental principle of ${subject}?`,
      options: [
        'Systematic observation and analytical reasoning',
        'Random guessing without evidence',
        'Memorizing facts without comprehension',
        'Ignoring logical consistency'
      ],
      correctAnswerIndex: 0,
      explanation: `${subject} relies on structured analytical reasoning, empirical evidence, and conceptual clarity.`
    },
    {
      questionText: `How does mastering ${subject} benefit real-world problem solving?`,
      options: [
        'It develops critical thinking and domain expertise',
        'It replaces all practical experience',
        'It prevents new discoveries',
        'It simplifies every problem to zero effort'
      ],
      correctAnswerIndex: 0,
      explanation: `Studying ${subject} equips learners with critical inquiry and structured problem-solving skills.`
    },
    {
      questionText: `At the ${levelName} level, what is the best strategy when tackling complex questions in ${subject}?`,
      options: [
        'Break the problem down into smaller logical steps',
        'Skip reading the problem statement',
        'Guess the first option immediately',
        'Assume the problem is unsolvable'
      ],
      correctAnswerIndex: 0,
      explanation: 'Decomposing complex problems into manageable sub-steps ensures accuracy and reduces errors.'
    },
    {
      questionText: `In academic studies of ${subject}, why are foundational concepts important?`,
      options: [
        'They form the building blocks for advanced topics',
        'They are only useful for elementary tests',
        'They are quickly forgotten and unused',
        'They contradict higher-level principles'
      ],
      correctAnswerIndex: 0,
      explanation: 'Advanced theories in any discipline rely heavily on a rock-solid grasp of fundamentals.'
    },
    {
      questionText: `Which approach produces the most reliable outcomes in ${subject}?`,
      options: [
        'Rigorous verification and evidence-backed analysis',
        'Unverified assumptions',
        'Skipping peer review and checks',
        'Relying solely on intuition'
      ],
      correctAnswerIndex: 0,
      explanation: 'Rigorous testing and evidence-backed evaluation yield verified, dependable solutions.'
    }
  ];

  const baseQuestions = (isChild ? childSubjectQuizzes[subject] : highSchoolAndUniQuizzes[subject]) || defaultGenericQuiz;
  const safeCount = Math.min(50, Math.max(1, numQuestions));

  // If requested more than baseQuestions length, generate synthetic curriculum variations up to safeCount
  const finalQuestions = [...baseQuestions];
  let cycle = 1;

  while (finalQuestions.length < safeCount) {
    const template = baseQuestions[(finalQuestions.length - baseQuestions.length) % baseQuestions.length];
    const questionNumber = finalQuestions.length + 1;
    
    // Create educational variations
    const randomizedOptions = [...template.options];
    // Rotate options to vary correct answer index
    const shift = cycle % 4;
    const rotated = [
      ...randomizedOptions.slice(shift),
      ...randomizedOptions.slice(0, shift)
    ];
    const newCorrectIndex = (template.correctAnswerIndex - shift + 4) % 4;

    finalQuestions.push({
      questionText: `[Question ${questionNumber}] On ${topic || subject}: ${template.questionText} (Concept Mastery Item ${cycle})`,
      options: rotated,
      correctAnswerIndex: newCorrectIndex,
      explanation: `${template.explanation} (Reviewing syllabus core standard for ${subject}).`
    });

    if (finalQuestions.length % baseQuestions.length === 0) {
      cycle++;
    }
  }

  return {
    quizTitle: `${subject} Master Quiz (${safeCount} Questions · ${levelName} Standard)`,
    questions: finalQuestions.slice(0, safeCount)
  };
};
