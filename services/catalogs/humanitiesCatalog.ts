import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311, GST_322 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getHumanitiesCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // ENGLISH & LITERATURE IN ENGLISH
  if (subjStr.includes('english') || subjStr.includes('literature')) {
    return {
      subject,
      faculty: 'Faculty of Arts & Humanities',
      department: 'Department of English and Literary Studies',
      degreeName: 'B.A. (Hons) English and Literary Studies',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'ENG 101',
                title: 'Introduction to English Phonetics & Phonology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Organs of speech, English vowel and consonant sounds (IPA), phonemic transcription, syllable structure, stress patterns, and intonation tunes.',
                modules: [
                  { moduleNumber: 1, title: 'English Segmental Phonology', subtopics: ['Articulatory Phonetics: Active and Passive Articulators', 'Classification of English Vowels (Pure Vowels & Diphthongs)', 'Classification of Consonants (Place, Manner, Voicing)', 'IPA Transcription & Phonemic Contrast'] },
                  { moduleNumber: 2, title: 'Suprasegmental Phonology', subtopics: ['English Syllable Structure (Onset, Nucleus, Coda)', 'Word and Sentence Stress Rules', 'Intonation Tunes (Falling, Rising, Fall-Rise) & Functions'] }
                ]
              },
              {
                code: 'LIT 101',
                title: 'Introduction to Literature & Literary Genres',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Nature and functions of literature, genres of literature (Poetry, Prose, Drama), literary devices, figures of speech, and critical analysis.',
                modules: [
                  { moduleNumber: 1, title: 'Literary Forms & Appreciation', subtopics: ['Elements of Poetry: Stanza, Meter, Rhyme Scheme & Imagery', 'Elements of Prose: Plot, Characterization, Setting, Theme & POV', 'Elements of Drama: Conflict, Dialogue, Soliloquy, Catharsis & Stagecraft'] }
                ]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 102',
                title: 'English Syntax and Grammatical Structure',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Word classes, morphemes, phrase structure (NP, VP, PP, AP, AdvP), clause types, sentence types (simple, compound, complex), and transformational grammar basics.',
                modules: [
                  { moduleNumber: 1, title: 'Grammar and Syntax', subtopics: ['Morphology: Free vs. Bound Morphemes, Inflectional vs. Derivational', 'Phrase Structure Trees and Immediate Constituent (IC) Analysis', 'Systemic Functional Grammar vs. Generative Grammar Models'] }
                ]
              },
              {
                code: 'LIT 102',
                title: 'Introduction to African Literature (Oral & Written)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'African oral tradition (folktales, praise poetry, proverbs, myths) and early African written literature (Chinua Achebe, Wole Soyinka, Ngugi wa Thiong’o).',
                modules: [
                  { moduleNumber: 1, title: 'African Literary Traditions', subtopics: ['Forms and Functions of African Oral Literature (Orature)', 'The African Novel: Themes of Colonial Encounters & Cultural Clash', 'Pioneering African Dramatists and Poets (Clark, Okigbo, Senghor)'] }
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
                code: 'ENG 201',
                title: 'Advanced English Morphology and Syntax',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Word-formation processes (compounding, clipping, blending, back-formation), Government and Binding (GB) theory, X-bar theory, and clause rank scale.',
                modules: [
                  { moduleNumber: 1, title: 'Syntactic and Morphological Analysis', subtopics: ['Morphological Processes & Allomorphy', 'X-Bar Syntax and Phrase Structure Hierarchies', 'Movement Rules, Transformations and Wh-Questions'] }
                ]
              },
              {
                code: 'LIT 201',
                title: 'African Poetry and Drama',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Thematic and stylistic study of major African poets (Christopher Okigbo, Kofi Awoonor, Niyi Osundare) and playwrights (Wole Soyinka, Femi Osofisan, Ola Rotimi).',
                modules: [
                  { moduleNumber: 1, title: 'Poetic & Dramatic Discourse in Africa', subtopics: ['Themes of Post-Independence Disillusionment in African Poetry', 'Total Theatre Aesthetics and Ritual Drama in Wole Soyinka', 'Marxist and Materialist Theatre: Femi Osofisan’s Revolutionary Aesthetics'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 202',
                title: 'English Semantics and Pragmatics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Sense and reference, semantic relations (synonymy, antonymy, hyponymy, polysemy), Speech Act theory (Austin & Searle), Grice’s Cooperative Principle, and implicature.',
                modules: [
                  { moduleNumber: 1, title: 'Meaning and Context', subtopics: ['Theories of Meaning: Componential Analysis & Prototype Theory', 'Austin’s Locutionary, Illocutionary and Perlocutionary Acts', 'Gricean Conversational Maxims and Flouting of Maxims'] }
                ]
              },
              {
                code: 'ENG 204',
                title: 'Sociolinguistics & Nigerian English Varieties',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Language and society, bilingualism, code-switching and code-mixing, pidgins and creoles (Nigerian Pidgin), and Nigerian English characteristics.',
                modules: [
                  { moduleNumber: 1, title: 'Language in Society', subtopics: ['Dialects, Sociolects, Idiolects & Register Analysis', 'Phonological, Syntactic and Lexical Features of Nigerian English', 'Nigerian Pidgin: Sociolinguistic Status and Standardization Debates'] }
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
                code: 'ENG 301',
                title: 'Discourse Analysis and Text Linguistics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Cohesion and coherence (Halliday & Hasan), Critical Discourse Analysis (Fairclough CDA model), conversation analysis (turn-taking, adjacency pairs), and media discourse.',
                modules: [
                  { moduleNumber: 1, title: 'Discourse Frameworks', subtopics: ['Cohesive Devices: Reference, Substitution, Ellipsis, Conjunction, Lexical', 'Critical Discourse Analysis: Power, Ideology and Language', 'Conversational Structure: Turn-Taking Mechanisms and Repair'] }
                ]
              },
              {
                code: 'LIT 301',
                title: 'Literary Theory and Criticism I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Classical literary theory (Plato, Aristotle’s Poetics, Longinus on the Sublime), Russian Formalism, New Criticism, Structuralism, and Psychoanalytic criticism.',
                modules: [
                  { moduleNumber: 1, title: 'Foundations of Literary Criticism', subtopics: ['Aristotelian Mimesis, Hamartia, Anagnorisis and Catharsis', 'Russian Formalism: Defamiliarization (Ostranenie) & Fabula/Syuzhet', 'Structuralism (Saussure, Barthes) & Psychoanalysis (Freud, Lacan)'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 302',
                title: 'English Stylistics & Forensic Linguistics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Linguistic approaches to literature, foregrounding (deviation and parallelism), transitivity analysis, modality, and language of legal/forensic texts.',
                modules: [
                  { moduleNumber: 1, title: 'Stylistic Analysis of Texts', subtopics: ['Phonological, Graphological and Syntactic Deviations', 'Systemic Functional Transitivity Systems in Literary Texts', 'Forensic Authorship Attribution and Language of the Courtroom'] }
                ]
              },
              {
                code: 'LIT 302',
                title: 'Post-Colonial and Feminist Literary Theories',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Post-colonialism (Edward Said’s Orientalism, Homi Bhabha’s Hybridity, Gayatri Spivak’s Subaltern), and African Womanism / Motherism (Flora Nwapa, Buchi Emecheta, Chimamanda Adichie).',
                modules: [
                  { moduleNumber: 1, title: 'Post-Colonial & Gender Discourse', subtopics: ['Orientalism, Imperialism and the Construction of the Other', 'Hybridity, Mimicry and Third Space in Post-Colonial Literature', 'African Feminism vs. Womanism (Ogunyemi, Acholonu, Kolawole)'] }
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
                code: 'ENG 401',
                title: 'Applied Linguistics & Language Teaching Methods',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Second Language Acquisition (SLA) theories (Krashen’s Monitor Model, Chomsky’s UG), contrastive analysis, error analysis, and English as a Second Language (ESL) pedagogy.',
                modules: [
                  { moduleNumber: 1, title: 'SLA Theories & Pedagogy', subtopics: ['Interlanguage Theory & Fossilization', 'Contrastive Analysis vs. Error Analysis in Nigerian ESL Classrooms', 'Communicative Language Teaching (CLT) & Task-Based Learning'] }
                ]
              },
              {
                code: 'LIT 401',
                title: 'Commonwealth & World Literature in Translation',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Comparative study of Caribbean (Derek Walcott, Aimé Césaire), South Asian (Salman Rushdie, Arundhati Roy), and Latin American literature (Gabriel García Márquez).',
                modules: [
                  { moduleNumber: 1, title: 'World Literature & Magical Realism', subtopics: ['Caribbean Negritude, Caliban Motif & Creole Identity', 'Magical Realism and Political Allegory in World Fiction', 'Diaspora Narratives and Transnational Identities'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of English',
                description: 'Supervised comprehensive academic dissertation in English linguistics, syntax, pragmatics, African or world literature with oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Dissertation Research & Defense', subtopics: ['Formulation of Theoretical Framework & Data Corpus', 'Linguistic / Literary Exegesis and Textual Analysis', 'Final Manuscript Defense before Faculty Panel'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // CHRISTIAN RELIGIOUS STUDIES / THEOLOGY / PHILOSOPHY
  if (subjStr.includes('relig') || subjStr.includes('theol') || subjStr.includes('crs') || subjStr.includes('phil')) {
    return {
      subject,
      faculty: 'Faculty of Arts & Humanities',
      department: 'Department of Religious Studies & Philosophy',
      degreeName: 'B.A. (Hons) Christian Religious Studies / Philosophy',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CRS 101',
                title: 'Introduction to Old Testament Literature & History',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Pentateuch/Torah, documentary hypothesis (JEDP), patriarchs, Exodus, conquest of Canaan, monarchy, prophetic literature, and historical background.',
                modules: [{ moduleNumber: 1, title: 'Old Testament Background', subtopics: ['Creation Narratives, Patriarchal Era & Mosaic Covenant', 'Prophetic Tradition & Wisdom Literature in Ancient Israel'] }]
              },
              {
                code: 'PHL 101',
                title: 'Introduction to Philosophy and Logic I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Philosophy',
                description: 'Definition, branches of philosophy (metaphysics, epistemology, ethics, logic), and critical reasoning.',
                modules: [{ moduleNumber: 1, title: 'Philosophical Inquiries', subtopics: ['Scope of Philosophy & Problem of Knowledge', 'Deductive vs. Inductive Arguments'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CRS 102',
                title: 'Introduction to New Testament Literature & Gospels',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Synoptic problem (Two-Source hypothesis, Q document), life and ministry of Jesus Christ, Pauline epistles, and early Christian church.',
                modules: [{ moduleNumber: 1, title: 'New Testament Exegesis', subtopics: ['The Synoptic Gospels & Johannine Theology', 'Pauline Epistles & Early Church in Acts of Apostles'] }]
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
                code: 'CRS 201',
                title: 'Biblical Hebrew / Greek Grammar I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Alphabet, vowels, nouns, verbs, conjugation, syntax, and elementary translation of biblical texts.',
                modules: [{ moduleNumber: 1, title: 'Ancient Biblical Languages', subtopics: ['Hebrew/Koine Greek Phonology and Morphological Paradigms', 'Translation of Selected Biblical Chapters'] }]
              },
              {
                code: 'CRS 203',
                title: 'African Traditional Religion (ATR) & Philosophy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Structure of ATR, Supreme Being, divinities, ancestral cults, sacred rites, taboos, and interactions with Christianity in Nigeria.',
                modules: [{ moduleNumber: 1, title: 'African Worldview & Sacred Systems', subtopics: ['Concept of God and Divinities in Yoruba, Igbo and Edo Worldviews', 'Ancestral Veneration, Reincarnation and Rites of Passage'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CRS 202',
                title: 'History of Christianity in Nigeria & Africa',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Early Christian missions (CMS, SIM, Catholic missions), indigenous African independent churches (Aladura, Cherubim & Seraphim), and Pentecostal explosion.',
                modules: [{ moduleNumber: 1, title: 'Christianity in Nigeria', subtopics: ['Bishop Samuel Ajayi Crowther and CMS Niger Mission', 'African Independent Churches (AICs) & Indigenous Adaptations', 'Modern Pentecostal and Charismatic Movements in Nigeria'] }]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Penultimate)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CRS 301',
                title: 'Systematic Theology & Christian Ethics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Doctrine of God (Trinity), Christology, Pneumatology, Soteriology, Eschatology, and bioethics/social justice ethics in modern society.',
                modules: [
                  { moduleNumber: 1, title: 'Christian Doctrinal Formulations', subtopics: ['Trinitarian Controversies (Nicaea, Chalcedon)', 'Theological Anthropology and Problem of Evil (Theodicy)', 'Christian Ethical Perspectives on Medical Bioethics and Corruption'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CRS 302',
                title: 'Sociology of Religion & Inter-Religious Dialogue in Nigeria',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Religious pluralism, secularization, Christian-Muslim relations in Nigeria (NIREC), religious conflicts, and peace-building initiatives.',
                modules: [
                  { moduleNumber: 1, title: 'Inter-Faith Relations & Peace', subtopics: ['Sociological Theories of Religion (Marx, Durkheim, Weber)', 'Christian-Muslim Dialogue Frameworks in Northern & Southern Nigeria', 'Religious Extremism Mitigation and Peace Building'] }
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
                code: 'CRS 401',
                title: 'Advanced Hermeneutics & Biblical Exegesis',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Historical-critical method, redaction criticism, contextual African hermeneutics, and contemporary biblical application.',
                modules: [
                  { moduleNumber: 1, title: 'Hermeneutical Methods', subtopics: ['Socio-Rhetorical and Literary Exegetical Principles', 'African Contextual Biblical Hermeneutics & Liberation Theology'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CRS 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: 'Department of Religious Studies',
                description: 'Supervised academic dissertation in biblical studies, African theology, church history, or philosophical ethics with oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Theological Dissertation & Defense', subtopics: ['Original Textual/Fieldwork Research', 'Thematic Analysis & Dissertation Writing', 'Final Oral Examination'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // HISTORY / MUSIC / HOME ECONOMICS
  if (subjStr.includes('hist') || subjStr.includes('music') || subjStr.includes('home')) {
    const isHistory = subjStr.includes('hist');
    const isMusic = subjStr.includes('music');
    const prefix = isHistory ? 'HIS' : (isMusic ? 'MUS' : 'HEC');
    const titleTerm = isHistory ? 'History & International Studies' : (isMusic ? 'Music' : 'Home Economics');
    return {
      subject,
      faculty: isHistory || isMusic ? 'Faculty of Arts & Humanities' : 'Faculty of Agriculture & Education',
      department: `Department of ${titleTerm}`,
      degreeName: `B.A. / B.Sc. (Hons) ${titleTerm}`,
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: `${prefix} 101`,
                title: `Foundations of ${titleTerm} I`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `Historical origins, foundational concepts, and core methodologies in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: `Core Concepts of ${titleTerm}`, subtopics: [`Scope, Terminology and Historiography of ${titleTerm}`, 'Primary Sources and Academic Inquiry'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 102`,
                title: `Foundations of ${titleTerm} II`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `Applied principles, Nigerian perspectives, and global traditions in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: `Applied Formulations`, subtopics: [`African and Global Dimensions in ${titleTerm}`, 'Practical Repertoire and Methodologies'] }]
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
                title: `Intermediate ${titleTerm} I`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `In-depth theoretical analysis and field practicum in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: 'Intermediate Analysis', subtopics: ['Theoretical Frameworks and Analytical Tools', 'Comparative Nigerian Studies'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 202`,
                title: `Intermediate ${titleTerm} II`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `Advanced performance, historical documentation, and research design in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: 'Practicum and Documentation', subtopics: ['Archival Research / Performance Practicum', 'Statistical / Qualitative Data Synthesis'] }]
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
                title: `Advanced ${titleTerm} Theory & Methodology`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `Specialized research paradigms, historiography, and contemporary developments in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: 'Research Paradigms', subtopics: ['Methodological Frameworks & Research Proposal Formulation', 'Fieldwork Design and Ethical Standards'] }]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 302`,
                title: `Applied ${titleTerm} & Industry Practice`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `Professional ethics, cultural heritage management, and SIWES attachment in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: 'Professional Practice', subtopics: ['Cultural Industries, Heritage Sites & Enterprise Operations'] }]
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
                title: `Special Topics & Seminar in ${titleTerm}`,
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `High-level academic seminar, critical reviews, and dissertation draft presentation in ${titleTerm}.`,
                modules: [{ moduleNumber: 1, title: 'Seminar Synthesis', subtopics: ['Advanced Literature Review & Academic Defense Preparation'] }]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: `${prefix} 499`,
                title: `Final Year Research Project and Dissertation`,
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Arts',
                department: `Department of ${titleTerm}`,
                description: `Supervised independent research dissertation with formal oral defense before external examiners.`,
                modules: [{ moduleNumber: 1, title: 'Dissertation & Oral Defense', subtopics: ['Dissertation Manuscript Submission', 'Oral Defense before Examiners'] }]
              }
            ])
          }
        }
      }
    };
  }

  return null;
};
