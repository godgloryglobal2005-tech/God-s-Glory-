import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311, GST_322 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getSocialSciencesCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // POLITICAL SCIENCE / GOVERNMENT / PEACE STUDIES
  if (subjStr.includes('pol') || subjStr.includes('gov') || subjStr.includes('peace')) {
    return {
      subject,
      faculty: 'Faculty of Social Sciences',
      department: 'Department of Political Science and Public Administration',
      degreeName: 'B.Sc. (Hons) Political Science',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'POL 101',
                title: 'Introduction to Political Science I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Nature, scope and methods of political science, concepts of power, authority, legitimacy, sovereignty, state, nation, and government types.',
                modules: [
                  { moduleNumber: 1, title: 'Foundational Political Concepts', subtopics: ['Politics as Science and Art & Sub-disciplines', 'Power, Authority and Legitimacy (Max Weber’s Typology)', 'The State vs. Society, Sovereignty (Bodin, Austin)'] }
                ]
              },
              {
                code: 'SOC 101',
                title: 'Introduction to Sociology I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Sociological imagination, social structure, culture, and socialization.',
                modules: [{ moduleNumber: 1, title: 'Sociological Foundations', subtopics: ['The Sociological Imagination & Social Institutions'] }]
              },
              {
                code: 'HIS 101',
                title: 'Nigeria from 1500 to 1800 AD',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Arts',
                department: 'Department of History',
                description: 'Pre-colonial state formation and inter-group relations.',
                modules: [{ moduleNumber: 1, title: 'Pre-Colonial Kingdoms', subtopics: ['Benin Empire, Oyo Empire & Kanem-Borno Dynamics'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'POL 102',
                title: 'Introduction to Political Science II (Citizen & State)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Citizenship, rights and duties, political ideologies (liberalism, socialism, fascism, capitalism), rule of law, and constitutions.',
                modules: [
                  { moduleNumber: 1, title: 'Ideologies and Constitutions', subtopics: ['Classical Liberalism vs. Marxism-Leninism', 'Constitutionalism, Written vs. Unwritten Constitutions', 'Fundamental Human Rights & Rule of Law (Dicey)'] }
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
                code: 'POL 201',
                title: 'Nigerian Government and Politics I (Colonial Era to 1966)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Colonial administration, indirect rule, constitutional evolution (Clifford 1922, Richards 1946, Macpherson 1951, Lyttelton 1954, 1960 Independence), and First Republic collapse.',
                modules: [
                  { moduleNumber: 1, title: 'Colonialism and Constitutional Development', subtopics: ['Indirect Rule System in Northern, Western & Eastern Nigeria', 'Nationalist Movements (NCNC, AG, NPC) and Constitutional Conferences', 'First Republic Politics (1960-1966), Regionalism & January 1966 Coup'] }
                ]
              },
              {
                code: 'POL 203',
                title: 'Political Ideas & Classical Political Theory',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Political thought of Plato (The Republic), Aristotle (Politics), Machiavelli (The Prince), Hobbes, Locke, and Rousseau (Social Contract).',
                modules: [
                  { moduleNumber: 1, title: 'Classical and Modern Political Thinkers', subtopics: ['Plato’s Philosopher King & Ideal State', 'Aristotle’s Classification of Constitutions & Best State', 'Social Contract Theories: Hobbes Leviathan vs. Locke’s Natural Rights'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'POL 202',
                title: 'Nigerian Government and Politics II (Civil War to Present)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Nigerian Civil War (1967-1970), military rule, Second Republic (1979 Constitution), June 12 1993 crisis, and Fourth Republic democratic transitions.',
                modules: [
                  { moduleNumber: 1, title: 'Military Rule, Civil War and Democratization', subtopics: ['Causes and Consequences of the 1967-1970 Civil War', 'Military Disengagement Programmes & 1979 Presidential System', 'Fourth Republic Politics: Federal Character, Zoning & Electoral Reforms'] }
                ]
              },
              {
                code: 'POL 204',
                title: 'Introduction to International Relations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'International system, national interest, foreign policy, realism vs. liberalism, diplomacy, United Nations, African Union, and ECOWAS.',
                modules: [
                  { moduleNumber: 1, title: 'International Systems and Theories', subtopics: ['Realism (Morgenthau, Waltz) vs. Liberal Internationalism', 'Instruments of Foreign Policy: Diplomacy, Sanctions & War', 'Nigeria’s Afrocentric Foreign Policy & Regional Hegemony'] }
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
                code: 'POL 301',
                title: 'Comparative Politics & Political Analysis',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Comparative methodology, structural-functionalism (Almond & Powell), political culture, political socialization, and comparative electoral systems.',
                modules: [
                  { moduleNumber: 1, title: 'Comparative Methodology and Systems', subtopics: ['Systems Theory (David Easton) & Structural-Functionalism', 'Typologies of Political Systems: Democratic, Authoritarian, Totalitarian', 'Electoral Systems: First-Past-The-Post vs. Proportional Representation'] }
                ]
              },
              {
                code: 'POL 303',
                title: 'Public Policy Analysis & Implementation',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Public policy models (rational-comprehensive, incremental, institutional, elite theory), agenda setting, policy implementation failure in developing countries.',
                modules: [
                  { moduleNumber: 1, title: 'Policy Formulation and Implementation', subtopics: ['Stages of Public Policy Process (Agenda, Formulation, Implementation, Evaluation)', 'Top-Down vs. Bottom-Up Implementation Models', 'Bureaucratic Bottlenecks and Policy Implementation in Nigeria'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'POL 302',
                title: 'Political Economy of the Third World & Africa',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Dependency theory (Andre Gunder Frank, Samir Amin), unequal exchange, neo-colonialism, IMF/World Bank structural adjustment programs, and resource curse in Africa.',
                modules: [
                  { moduleNumber: 1, title: 'Dependency and Underdevelopment', subtopics: ['Modernization Theory vs. Dependency & Underdevelopment Theory', 'Imperialism, Neocolonialism and Transnational Corporations', 'Petroleum Rentier State Dynamics and Corruption in Nigeria'] }
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
                code: 'POL 401',
                title: 'Contemporary Political Analysis & Game Theory',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Decision-making models, behavioral revolution, rational choice theory in political elections, coalition bargaining, and elite analysis.',
                modules: [
                  { moduleNumber: 1, title: 'Modern Political Models', subtopics: ['Behavioralism and Post-Behavioralism in Political Inquiry', 'Rational Choice and Spatial Voting Models', 'Elite Theory (Pareto, Mosca, Michels Iron Law of Oligarchy)'] }
                ]
              },
              {
                code: 'POL 403',
                title: 'Security Studies, Terrorism & Insurgency in Africa',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Traditional vs. human security, insurgency (Boko Haram/ISWAP, Banditry), counter-insurgency strategies, border porosity, and regional security architecture (MNJTF).',
                modules: [
                  { moduleNumber: 1, title: 'African Security Dynamics', subtopics: ['Root Causes of Terrorism, Radicalization & Insurgency in the Sahel', 'Counter-Terrorism Doctrines, Civil-Military Relations & Intelligence', 'Proliferation of Small Arms and Light Weapons (SALW) in West Africa'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'POL 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Political Science',
                description: 'Supervised empirical research in governance, electoral behavior, public policy, security studies, or foreign policy with oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Political Science Dissertation', subtopics: ['Empirical Methodology (Qualitative & Quantitative)', 'Manuscript Writing and Academic Referencing', 'Oral Project Defense'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // SOCIOLOGY / PSYCHOLOGY / DEMOGRAPHY & SOCIAL STATISTICS
  if (subjStr.includes('soc') || subjStr.includes('psy') || subjStr.includes('demograph')) {
    return {
      subject,
      faculty: 'Faculty of Social Sciences',
      department: 'Department of Sociology and Social Work / Psychology',
      degreeName: 'B.Sc. (Hons) Sociology / Psychology',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'SOC 101',
                title: 'Introduction to Sociology I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Origin and scope of sociology, founding fathers (Auguste Comte, Karl Marx, Emile Durkheim, Max Weber), social interaction, status, role, groups, and culture.',
                modules: [
                  { moduleNumber: 1, title: 'Foundations of Sociology', subtopics: ['Historical Emergence of Sociology & The Sociological Perspective', 'Founding Thinkers: Comte, Marx, Durkheim & Weber', 'Culture, Norms, Values, Ethnocentrism & Cultural Relativism'] }
                ]
              },
              {
                code: 'PSY 101',
                title: 'Introduction to General Psychology I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Psychology',
                description: 'Biological bases of behavior, sensation, perception, learning, memory, and cognitive processes.',
                modules: [{ moduleNumber: 1, title: 'Psychological Bases', subtopics: ['Neuron Transmission, Sensation, Perception & Classical Conditioning'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'SOC 102',
                title: 'Introduction to Sociology II (Social Institutions & Change)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Major social institutions: Family, Religion, Education, Economy, Government; social stratification (caste, class, slavery, estate), and social mobility.',
                modules: [
                  { moduleNumber: 1, title: 'Social Institutions & Stratification', subtopics: ['Family Systems & Polygyny/Monogamy in Nigeria', 'Theories of Social Stratification (Functionalist vs. Conflict)', 'Social Mobility (Vertical, Horizontal, Intergenerational)'] }
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
                code: 'SOC 201',
                title: 'Classical Sociological Theories',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'In-depth analysis of Marx (Historical Materialism, Alienation, Class Struggle), Durkheim (Division of Labor, Social Facts, Suicide), and Weber (Protestant Ethic, Rationalization, Bureaucracy).',
                modules: [
                  { moduleNumber: 1, title: 'Classical Theoretical Formulations', subtopics: ['Karl Marx: Base-Superstructure, Surplus Value & False Consciousness', 'Emile Durkheim: Mechanical vs. Organic Solidarity & Anomie', 'Max Weber: Verstehen, Ideal Types & The Protestant Ethic'] }
                ]
              },
              {
                code: 'DSS 201',
                title: 'Social Statistics and Demographic Analysis I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Measures of central tendency and dispersion, demographic rates (crude birth rate, crude death rate, total fertility rate, infant mortality rate), and census methodology.',
                modules: [
                  { moduleNumber: 1, title: 'Demographic Measurements & Rates', subtopics: ['Census Operations in Nigeria & Population Pyramids', 'Fertility, Mortality and Migration Measures', 'Demographic Transition Theory (Notestein)'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'SOC 202',
                title: 'Sociology of Crime and Delinquency (Criminology)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Sociological theories of deviance and crime (Strain theory, Differential association, Labeling theory, Social bond theory), juvenile delinquency, and criminal justice system in Nigeria.',
                modules: [
                  { moduleNumber: 1, title: 'Theories of Crime and Deviance', subtopics: ['Merton’s Strain Theory & Typology of Adaptations', 'Sutherland’s Differential Association & Becker’s Labeling Theory', 'Nigerian Police, Judiciary and Correctional Services System'] }
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
                code: 'SOC 301',
                title: 'Contemporary Sociological Theories',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Structural functionalism (Parsons AGIL model), Conflict theory (Dahrendorf, Mills), Symbolic interactionism (Mead, Blumer, Goffman’s Dramaturgy), and Feminist theories.',
                modules: [
                  { moduleNumber: 1, title: 'Modern Sociological Perspectives', subtopics: ['Talcott Parsons: Social Action & AGIL Schema', 'Erving Goffman: Dramaturgical Analysis & Impression Management', 'African Feminist Perspectives and Gender Relations'] }
                ]
              },
              {
                code: 'SOC 303',
                title: 'Social Research Methods & Qualitative Techniques',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Qualitative and quantitative research designs, Focus Group Discussions (FGDs), Key Informant Interviews (KIIs), survey sampling, and ethical protocols.',
                modules: [
                  { moduleNumber: 1, title: 'Social Research Design & Fieldwork', subtopics: ['Formulation of Problem & Conceptual Framework', 'FGDs, In-depth Interviews & Participant Observation', 'Survey Sampling (Stratified, Cluster, Purposive) & Informed Consent'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'SOC 302',
                title: 'Urban Sociology & Rural Community Development',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Urbanization in the global South, Chicago School urban models (Concentric zone, Sector, Multi-nuclei), slums, urban informal sector, and rural livelihood strategies in Nigeria.',
                modules: [
                  { moduleNumber: 1, title: 'Urban Ecology and Rural Dynamics', subtopics: ['Theories of Urban Ecology & Spatial Growth', 'Rural-Urban Migration Drivers and Slum Proliferation', 'Community-Driven Development (CDD) Models in Nigeria'] }
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
                code: 'SOC 401',
                title: 'Medical Sociology & Sociology of Health and Illness',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Social determinants of health, illness behavior (Parsons Sick Role), traditional medicine vs. orthodox healthcare, doctor-patient interactions, and maternal health inequalities in Nigeria.',
                modules: [
                  { moduleNumber: 1, title: 'Social Context of Health & Disease', subtopics: ['Social Determinants of Health (WHO Framework)', 'Talcott Parsons’ Sick Role Concept & Health Belief Model', 'Traditional Healing Systems and Medical Pluralism in Africa'] }
                ]
              },
              {
                code: 'SOC 403',
                title: 'Industrial Sociology & Labor Relations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Hawthorne experiments, human relations school, alienation at work, trade unionism (NLC, TUC), strike actions, and collective bargaining in Nigerian public/private sectors.',
                modules: [
                  { moduleNumber: 1, title: 'Workplace Dynamics and Industrial Conflict', subtopics: ['Human Relations Movement (Elton Mayo) & Workplace Ergonomics', 'Theories of Industrial Conflict and Strikes', 'Tripartite Collective Bargaining and Trade Disputes Act in Nigeria'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'SOC 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Sociology',
                description: 'Supervised empirical fieldwork research on societal issues with written sociological dissertation and defense.',
                modules: [
                  { moduleNumber: 1, title: 'Sociological Dissertation & Defense', subtopics: ['Field Data Sourcing (FGDs, Surveys, Key Informants)', 'Data Triangulation & Thematic / Statistical Analysis', 'Final Dissertation Oral Defense'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  return null;
};
