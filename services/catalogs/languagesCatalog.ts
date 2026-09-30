import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311, GST_322 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getLanguagesCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // NIGERIAN LANGUAGES: EDO, YORUBA, IGBO, HAUSA
  if (subjStr.includes('edo') || subjStr.includes('yoruba') || subjStr.includes('igbo') || subjStr.includes('hausa')) {
    const isEdo = subjStr.includes('edo');
    const isYoruba = subjStr.includes('yoruba');
    const isIgbo = subjStr.includes('igbo');
    const prefix = isEdo ? 'EDO' : (isYoruba ? 'YOR' : (isIgbo ? 'IGB' : 'HAU'));
    const langName = isEdo ? 'Edo Language & Cultural Studies' : (isYoruba ? 'Yoruba Language & Literature' : (isIgbo ? 'Igbo Language & Linguistics' : 'Hausa Language & African Studies'));

    return {
      subject,
      faculty: 'Faculty of Arts & Humanities',
      department: `Department of Linguistics and African Languages (${isEdo ? 'Edo Unit' : (isYoruba ? 'Yoruba Unit' : (isIgbo ? 'Igbo Unit' : 'Hausa Unit'))})`,
      degreeName: `B.A. (Hons) ${langName}`,
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: `${prefix} 101`,
                title: `Introduction to the History and Orthography of ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Standard orthography, tone marking, vowel harmony, consonant charts, historical evolution, and foundational reading in ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))}.`,
                modules: [
                  { moduleNumber: 1, title: 'Orthography and Phonological Rules', subtopics: ['Standard Alphabet & Tone System (High, Mid, Low, Falling)', 'Vowel Harmony and Nasalization Patterns', 'Writing System Reforms and History of the Language'] }
                ]
              },
              {
                code: `${prefix} 103`,
                title: `Introduction to ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))} Oral Literature (Orature)`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Folktales, myths, proverbs, praise poetry (e.g. Oriki / Ijala / Abu), riddles, incantations, and social functions of indigenous folklore.`,
                modules: [
                  { moduleNumber: 1, title: 'Forms of Indigenous Oral Literature', subtopics: ['Proverbs and Idiomatic Formulations', 'Praise Chants and Historical Epic Poetry', 'Folktales and Moral Didactic Traditions'] }
                ]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 102`,
                title: `Basic Grammar and Composition in ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Nouns, verbs, pronouns, adjectives, basic sentence structure, negation, question formation, and creative essay composition.`,
                modules: [
                  { moduleNumber: 1, title: 'Grammar and Sentence Construction', subtopics: ['Word Classes & Tense/Aspect Markers', 'Sentence Typologies and Word Order (SVO)', 'Guided Composition Writing and Translation into English'] }
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
                code: `${prefix} 201`,
                title: `Phonology and Morphology of ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Autosegmental phonology of tone, syllable structure, assimilation, elision, compounding, reduplication, and nominalization processes.`,
                modules: [
                  { moduleNumber: 1, title: 'Sound Patterns & Word Formation', subtopics: ['Generative Phonology: Tone Spread & Vowel Elision Rules', 'Morphological Reduplication and Nominal Derivation', 'Affixation and Compound Word Syntax'] }
                ]
              },
              {
                code: `${prefix} 203`,
                title: `Culture and Customs of the ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))} People`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Traditional royalty (Oba of Benin / Ooni of Ife / Alaafin / Obi / Emirate system), festivals (Igue, Osun Osogbo, New Yam, Durbar), age grades, marriage rites, and indigenous religion.`,
                modules: [
                  { moduleNumber: 1, title: 'Cultural Heritage & Institutions', subtopics: ['Chieftaincy Structures and Traditional Governance', 'Rites of Passage (Birth, Marriage, Funeral Customs)', 'Traditional Festivals and Sacred Rituals'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 202`,
                title: `Written Poetry and Drama in ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Critical analysis of published plays and anthologies of poems by prominent indigenous writers, exploring themes of morality, socio-political changes, and cultural preservation.`,
                modules: [
                  { moduleNumber: 1, title: 'Literary Exegesis of Native Drama & Poetry', subtopics: ['Thematic Exploration in Indigenous Plays', 'Poetic Devices, Metaphor and Rhyme in Native Verses', 'Stage Production of Native Plays'] }
                ]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Penultimate)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: `${prefix} 301`,
                title: `Syntax and Semantics of ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Transformational generative grammar, serial verb constructions, focus constructions, topicalization, wh-movement, and indigenous idioms/semantics.`,
                modules: [
                  { moduleNumber: 1, title: 'Syntactic Structures & Serial Verbs', subtopics: ['Serial Verb Constructions (SVCs) & Argument Sharing', 'Focusing, Topicalization and Clefting in Native Syntax', 'Idiomatic Expressions and Figurative Semantics'] }
                ]
              },
              {
                code: `${prefix} 303`,
                title: `Dialectology and Language Variation`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Dialects of the language, isoglosses, dialect mapping, comparative phonology/lexicon across geographical regions, and standard dialect development.`,
                modules: [
                  { moduleNumber: 1, title: 'Dialectal Studies', subtopics: ['Geographical Dialect Boundaries and Isoglosses', 'Lexicostatistics and Glottochronology of Dialects', 'Language Planning and Standard Variety Dissemination'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 302`,
                title: `Translation Theory & Practice (English - ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))})`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Translation principles (equivalence, untranslatability, cultural adaptation), translation of legal, religious, media, and scientific texts.`,
                modules: [
                  { moduleNumber: 1, title: 'Translation and Lexicography', subtopics: ['Theories of Translation Equivalence (Dynamic vs. Formal)', 'Translating Cultural Idioms and Specialized Terminology', 'Dictionary Compilation (Lexicography) in Native Languages'] }
                ]
              },
              GST_322
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: `${prefix} 401`,
                title: `Advanced Seminar in ${isEdo ? 'Edo' : (isYoruba ? 'Yoruba' : (isIgbo ? 'Igbo' : 'Hausa'))} Linguistics & Literature`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Advanced analysis of contemporary linguistic debates, language endangerment, computational linguistics, and corpus development.`,
                modules: [
                  { moduleNumber: 1, title: 'Linguistic Research Frontiers', subtopics: ['Language Documentation & Revitalization Technologies', 'Corpus Linguistics & Digital Natural Language Processing (NLP)', 'Critical Evaluation of Modern Literature'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 499`,
                title: `Final Year Research Project and Dissertation`,
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Linguistics & African Languages',
                description: `Original supervised research dissertation written in or about the native language and oral defense before external examiners.`,
                modules: [
                  { moduleNumber: 1, title: 'Dissertation Research & Defense', subtopics: ['Fieldwork Data Collection (Recording Native Informants)', 'Linguistic/Literary Analysis and Dissertation Submission', 'Oral Defense before Examiners'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // FOREIGN LANGUAGES: FRENCH, ARABIC, PORTUGUESE, GREEK, HEBREW
  if (subjStr.includes('french') || subjStr.includes('ara') || subjStr.includes('portuguese') || subjStr.includes('greek') || subjStr.includes('hebrew')) {
    const isFrench = subjStr.includes('french');
    const isArabic = subjStr.includes('ara');
    const prefix = isFrench ? 'FRE' : (isArabic ? 'ARA' : 'FOR');
    const langName = isFrench ? 'French Language & Francophone Studies' : (isArabic ? 'Arabic Language & Islamic Studies' : 'Foreign & Classical Languages');

    return {
      subject,
      faculty: 'Faculty of Arts & Humanities',
      department: `Department of Foreign Languages (${isFrench ? 'French Unit' : (isArabic ? 'Arabic Unit' : 'Classical Unit')})`,
      degreeName: `B.A. (Hons) ${langName}`,
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: `${prefix} 101`,
                title: `Elementary ${isFrench ? 'French' : (isArabic ? 'Arabic' : 'Foreign')} Grammar & Phonetics I`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: `Pronunciation, alphabet, basic vocabulary, verb conjugations, and everyday dialogues in ${isFrench ? 'French' : (isArabic ? 'Arabic' : 'Foreign Language')}.`,
                modules: [{ moduleNumber: 1, title: 'Grammar and Oral Proficiency', subtopics: ['Phonetics, Accents & Basic Dialogues', 'Present Tense Conjugations and Noun Agreement'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 102`,
                title: `Elementary ${isFrench ? 'French' : (isArabic ? 'Arabic' : 'Foreign')} Grammar & Composition II`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: `Past tenses (Passé Composé/Imparfait), future tense, basic prose reading, and guided composition.`,
                modules: [{ moduleNumber: 1, title: 'Intermediate Grammar & Prose', subtopics: ['Tense Systems and Narrative Construction', 'Comprehension & Short Essays'] }]
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
                code: `${prefix} 201`,
                title: `Intermediate ${isFrench ? 'French' : (isArabic ? 'Arabic' : 'Foreign')} Syntax & Literature I`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: `Subjunctive mood, conditional clauses, introduction to 19th/20th century literature, and cultural context.`,
                modules: [{ moduleNumber: 1, title: 'Syntax & Literary Analysis', subtopics: ['Complex Sentence Structures & Moods', 'Selected Literary Masterpieces'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 202`,
                title: `Advanced Conversation, Phonology & Translation`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: `Phonological transcription, oral laboratory drills, and translation between English and the target foreign language.`,
                modules: [{ moduleNumber: 1, title: 'Oral Drills & Translation', subtopics: ['Language Laboratory Phonetics Drills', 'Translation Techniques (English - Target Language)'] }]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Year Abroad / Immersion)',
          semesters: {
            'First Semester': createSemester('Year Abroad / French Village / Immersion I', [
              {
                code: `${prefix} 301`,
                title: 'Year Abroad / Language Village Immersion Programme I',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: 'Full linguistic and cultural immersion at the Nigeria French Language Village (Badagry), Arabic Village (Ngala), or partner international universities in Togo/Senegal/Benin/Egypt.',
                modules: [{ moduleNumber: 1, title: 'Total Language Immersion', subtopics: ['Intensive Native Conversation & Oral Fluency', 'Grammatical Perfection & Cultural Studies'] }]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Year Abroad / French Village / Immersion II', [
              {
                code: `${prefix} 302`,
                title: 'Year Abroad Immersion Programme II & Literary Studies',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: 'Advanced translation, francophone / arabophone literature, and comprehensive oral and written examinations.',
                modules: [{ moduleNumber: 1, title: 'Immersion Literature & Translation', subtopics: ['Francophone African / Arab Literature', 'Technical and Diplomatic Translation'] }]
              },
              GST_322
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: `${prefix} 401`,
                title: `Advanced Stylistics & Post-Colonial Literature in ${isFrench ? 'French' : (isArabic ? 'Arabic' : 'Foreign Language')}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: 'Critical analysis of modern literary works, existentialism, negritude, and advanced linguistic stylistics.',
                modules: [{ moduleNumber: 1, title: 'Stylistics & Modern Theory', subtopics: ['Negritude and Francophone African Thought', 'Linguistic Stylistics of Contemporary Texts'] }]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 499`,
                title: `Final Year Research Project and Dissertation`,
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Foreign Languages',
                description: 'Supervised academic dissertation written in the foreign language with oral defense.',
                modules: [{ moduleNumber: 1, title: 'Foreign Language Dissertation & Defense', subtopics: ['Manuscript Writing in Target Language', 'Oral Defense before Examiners'] }]
              }
            ])
          }
        }
      }
    };
  }

  return null;
};
