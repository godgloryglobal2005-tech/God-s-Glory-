import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getHealthCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // NURSING SCIENCE
  if (subjStr.includes('nurs')) {
    return {
      subject,
      faculty: 'College of Medical Sciences / Faculty of Health Sciences',
      department: 'Department of Nursing Science',
      degreeName: 'B.N.Sc. (Bachelor of Nursing Science - 5-Year NMCN Standard Program)',
      levels: {
        '100 Level': {
          levelName: '100 Level (Pre-Nursing Sciences)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BIO 101',
                title: 'General Biology I (Cell Biology & Genetics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Cell structure, organelle ultrastructure, DNA replication, and Mendelian genetics.',
                modules: [{ moduleNumber: 1, title: 'Cell Biology', subtopics: ['Cell Membrane, Transport & Biomolecules', 'Mitosis and Meiosis'] }]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I (Inorganic & Physical)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Inorganic principles and acid-base buffers.',
                modules: [{ moduleNumber: 1, title: 'General Chemistry', subtopics: ['Atomic Structure & Solution Chemistry'] }]
              },
              {
                code: 'PHY 101',
                title: 'General Physics for Health Sciences I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Biomechanics, fluid pressure in blood vessels, and heat.',
                modules: [{ moduleNumber: 1, title: 'Medical Biophysics', subtopics: ['Fluid Mechanics & Pressure Measurements'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BIO 102',
                title: 'General Biology II (Comparative Anatomy)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Diversity of organisms and vertebrate organ systems.',
                modules: [{ moduleNumber: 1, title: 'Organ Systems', subtopics: ['Vertebrate Anatomy & Physiology'] }]
              },
              {
                code: 'CHM 102',
                title: 'Organic Chemistry for Health Sciences',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Structure and reactions of amino acids, carbohydrates, lipids, and vitamins.',
                modules: [{ moduleNumber: 1, title: 'Biomolecular Chemistry', subtopics: ['Proteins, Lipids & Carbohydrates Chemistry'] }]
              },
              GST_112
            ])
          }
        },
        '200 Level': {
          levelName: '200 Level (Basic Nursing & Anatomy/Physiology)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'NUR 201',
                title: 'Foundations of Nursing & Nursing Process I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'History of modern nursing (Florence Nightingale), nursing ethics (NMCN Code of Ethics), vital signs measurement, and 5-step nursing process.',
                modules: [
                  { moduleNumber: 1, title: 'Nursing Foundations & Process', subtopics: ['Evolution of Professional Nursing in Nigeria', 'Nursing Process: Assessment, Diagnosis, Planning, Implementation, Evaluation (ADPIE)', 'Vital Signs (Temperature, Pulse, Respiration, Blood Pressure, SpO2)'] }
                ]
              },
              {
                code: 'ANA 201',
                title: 'Human Anatomy for Nurses I',
                units: 3,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Human Anatomy',
                description: 'Gross anatomy of musculoskeletal system, cardiovascular system, and respiratory system.',
                modules: [{ moduleNumber: 1, title: 'Gross Anatomy', subtopics: ['Osteology, Muscles & Cardiopulmonary Anatomy'] }]
              },
              {
                code: 'PHS 201',
                title: 'Human Physiology for Nurses I',
                units: 3,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Physiology',
                description: 'Blood physiology, cardiovascular dynamics, and muscle physiology.',
                modules: [{ moduleNumber: 1, title: 'Physiology', subtopics: ['Erythropoiesis, Blood Groups & Cardiac Electrophysiology'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'NUR 202',
                title: 'Foundations of Nursing Practice II & Clinical Skills',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Aseptic techniques, wound dressing, medication administration (oral, parenteral, IV fluids), catheterization, and bed making.',
                modules: [
                  { moduleNumber: 1, title: 'Clinical Nursing Procedures', subtopics: ['Surgical and Medical Asepsis & Hand Hygiene Protocols', 'Parenteral Medication Routes (IM, SC, ID, IV Cannulation)', 'Wound Dressing Principles and Pressure Ulcer Prevention'] }
                ]
              },
              {
                code: 'BCH 202',
                title: 'Medical Biochemistry for Nurses',
                units: 3,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Biochemistry',
                description: 'Intermediary metabolism of carbohydrates, lipids, and proteins.',
                modules: [{ moduleNumber: 1, title: 'Metabolic Pathways', subtopics: ['Glycolysis, Krebs Cycle & Beta Oxidation'] }]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Medical-Surgical Nursing I)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'NUR 301',
                title: 'Medical-Surgical Nursing I (Disorders of Respiratory, CVS & GI)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Nursing management of hypertension, heart failure, pneumonia, tuberculosis, asthma, peptic ulcer disease, and intestinal obstruction.',
                modules: [
                  { moduleNumber: 1, title: 'Cardiorespiratory & GI Nursing Care', subtopics: ['Nursing Care Plans in Heart Failure & Myocardial Infarction', 'Oxygen Therapy, Nebulization & Tracheostomy Care', 'Pre- and Post-Operative Nursing in Major Abdominal Surgeries'] }
                ]
              },
              {
                code: 'PHA 301',
                title: 'Pharmacology for Nurses I',
                units: 3,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Pharmacology',
                description: 'Pharmacokinetics, drug calculations, antibiotics, analgesics, and antihypertensives.',
                modules: [{ moduleNumber: 1, title: 'Clinical Pharmacology', subtopics: ['Dosage Calculations & Adverse Drug Reactions', 'Antibiotic Classes and Safe Administration'] }]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'NUR 302',
                title: 'Medical-Surgical Nursing II & Clinical Practicum',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Neurological nursing, endocrine disorders (Diabetes Mellitus), burns management, orthopedic nursing (traction, plaster care), and clinical ward postings.',
                modules: [
                  { moduleNumber: 1, title: 'Specialized Medical-Surgical Care', subtopics: ['Nursing Management of Stroke & Comatose Patients (GCS Scoring)', 'Diabetic Foot Care and Insulin Administration Regimens', 'Care of Patients in Skeletal/Skin Traction and Casts'] }
                ]
              },
              {
                code: 'NUR 399',
                title: 'Hospital Clinical Nursing Postings (Medical/Surgical Wards)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Full-time hospital ward rotations in teaching hospitals.',
                modules: [{ moduleNumber: 1, title: 'Clinical Ward Practice', subtopics: ['Bedside Nursing Care & Nursing Process Documentation', 'Shift Handover & Clinical Case Presentation'] }]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Maternal & Child Health / Midwifery)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'NUR 401',
                title: 'Maternal and Child Health Nursing I (Midwifery)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Antenatal care, labor mechanisms, conducting normal vaginal deliveries, episiotomy, postpartum care, and neonatal resuscitation.',
                modules: [
                  { moduleNumber: 1, title: 'Midwifery & Labor Management', subtopics: ['Antenatal Assessment & High-Risk Pregnancy Screening', 'Management of the Four Stages of Labor & Partograph Use', 'Care of the Newborn (APGAR Scoring) & Exclusive Breastfeeding'] }
                ]
              },
              {
                code: 'NUR 403',
                title: 'Public / Community Health Nursing I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Primary health care, home visits, epidemiological surveillance, immunization (EPI), water sanitation, and family planning methods.',
                modules: [
                  { moduleNumber: 1, title: 'Community Health Interventions', subtopics: ['Primary Health Care Principles & Community Diagnosis', 'National Immunization Schedule & Cold Chain Maintenance', 'Modern Contraceptive Methods & Counseling (IUCD, Implants, Pills)'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'NUR 402',
                title: 'Maternal and Child Health Nursing II (Obstetric Emergencies)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Management of preeclampsia/eclampsia, antepartum hemorrhage, postpartum hemorrhage (PPH), obstructed labor, and cesarean section nursing care.',
                modules: [
                  { moduleNumber: 1, title: 'Obstetric Emergencies & Complications', subtopics: ['Emergency Protocol for Eclamptic Seizures (Magnesium Sulphate)', 'Active Management of Third Stage of Labor (AMTSL) & PPH Control', 'Neonatal Jaundice & Phototherapy Nursing Care'] }
                ]
              }
            ])
          }
        },
        '500 Level': {
          levelName: '500 Level (Mental Health / Nursing Leadership & Project)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'NUR 501',
                title: 'Mental Health and Psychiatric Nursing',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Psychiatric assessment, therapeutic communication, schizophrenia, bipolar mood disorders, depression, anxiety disorders, and psychopharmacology.',
                modules: [
                  { moduleNumber: 1, title: 'Psychiatric Nursing Care', subtopics: ['Therapeutic Nurse-Patient Relationship & Boundary Management', 'Nursing Interventions in Schizophrenia & Acute Psychosis', 'Management of Depressive Disorders & Suicide Risk Assessment'] }
                ]
              },
              {
                code: 'NUR 503',
                title: 'Nursing Leadership, Management & Health Economics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Ward administration, quality assurance, conflict management in clinical teams, staffing calculations, and nursing informatics.',
                modules: [
                  { moduleNumber: 1, title: 'Nursing Administration & Leadership', subtopics: ['Ward Organization, Duty Rostering & Staff Allocation Models', 'Quality Assurance & Clinical Nursing Audits', 'Health Informatics & Electronic Medical Records (EMR)'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'NUR 599',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Health Sciences',
                department: 'Department of Nursing Science',
                description: 'Supervised empirical clinical or public health nursing research dissertation with defense before external examiners (NMCN & NUC accredited).',
                modules: [
                  { moduleNumber: 1, title: 'Nursing Dissertation & Oral Defense', subtopics: ['Clinical/Community Data Collection & Statistical Analysis', 'Evidence-Based Practice Recommendations', 'Final Oral Dissertation Defense'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // PHYSIOTHERAPY
  if (subjStr.includes('physiotherapy')) {
    return {
      subject,
      faculty: 'Faculty of Medical Rehabilitation / Health Sciences',
      department: 'Department of Physiotherapy',
      degreeName: 'B.Physiotherapy / B.Sc. (Hons) Physiotherapy (5-Year MRTB Standard Program)',
      levels: {
        '100 Level': {
          levelName: '100 Level (Pre-Physiotherapy Sciences)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BIO 101',
                title: 'General Biology I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Cell biology and genetics.',
                modules: [{ moduleNumber: 1, title: 'Cellular Foundations', subtopics: ['Cell Structures & Genetics'] }]
              },
              {
                code: 'PHY 101',
                title: 'General Physics for Medical Rehabilitation I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Biomechanics, levers, forces, equilibrium, and elasticity.',
                modules: [{ moduleNumber: 1, title: 'Biomechanics Foundations', subtopics: ['Newtonian Mechanics & Lever Systems in Body'] }]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'General physical and inorganic chemistry.',
                modules: [{ moduleNumber: 1, title: 'Chemistry', subtopics: ['Atomic Structure & Solution Equilibria'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BIO 102',
                title: 'General Biology II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Vertebrate anatomy and physiology.',
                modules: [{ moduleNumber: 1, title: 'Organ Systems', subtopics: ['Vertebrate Structure and Functions'] }]
              },
              GST_112
            ])
          }
        },
        '200 Level': {
          levelName: '200 Level (Anatomy, Physiology & Kinesiology I)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'PHT 201',
                title: 'Introduction to Physiotherapy & Kinesiology I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'History of physiotherapy, planes of movement, center of gravity, base of support, biomechanics of human locomotion (gait cycle).',
                modules: [
                  { moduleNumber: 1, title: 'Kinesiology and Movement Analysis', subtopics: ['Axes, Planes & Types of Muscle Contraction (Isometric, Isotonic)', 'Center of Gravity, Equilibrium and Postural Control', 'Normal Gait Cycle Phases (Stance and Swing Phases)'] }
                ]
              },
              {
                code: 'ANA 201',
                title: 'Human Anatomy for Physiotherapists I (Upper & Lower Limbs)',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Human Anatomy',
                description: 'Osteology, arthrology, myology, and innervation of upper and lower extremities.',
                modules: [{ moduleNumber: 1, title: 'Extremity Anatomy', subtopics: ['Brachial Plexus & Limb Compartments'] }]
              },
              {
                code: 'PHS 201',
                title: 'Human Physiology for Physiotherapists I',
                units: 4,
                status: 'Compulsory',
                faculty: 'College of Medical Sciences',
                department: 'Department of Physiology',
                description: 'Neuromuscular physiology and cardiovascular adaptations to exercise.',
                modules: [{ moduleNumber: 1, title: 'Neuromuscular Physiology', subtopics: ['Motor Units, Action Potentials & Muscle Fiber Types'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHT 202',
                title: 'Exercise Therapy I (Movement Principles & Massage)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Passive and active movements, stretching, range of motion (ROM) exercises, goniometry, and therapeutic massage techniques (effleurage, petrissage).',
                modules: [
                  { moduleNumber: 1, title: 'Therapeutic Movements & Goniometry', subtopics: ['Measurement of Joint Range of Motion (Goniometry)', 'Passive, Active-Assisted and Resisted Exercise Protocols', 'Therapeutic Massage Strokes and Physiological Effects'] }
                ]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Electrotherapy & Clinical Assessment)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'PHT 301',
                title: 'Electrotherapy I (Thermal Agents, Ultrasound & Cryotherapy)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Therapeutic heat (Shortwave diathermy, Infrared, Wax bath), Cryotherapy (Ice packs), and Therapeutic Ultrasound physics and clinical application.',
                modules: [
                  { moduleNumber: 1, title: 'Thermal & Biophysical Modalities', subtopics: ['Shortwave Diathermy (Continuous vs. Pulsed) & Safety Precautions', 'Therapeutic Ultrasound: Attenuation, Cavitation & Acoustic Streaming', 'Cryotherapy Physiological Mechanisms & Pain Gate Modulation'] }
                ]
              },
              {
                code: 'PHT 303',
                title: 'Musculoskeletal Assessment & Manual Therapy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Manual Muscle Testing (Oxford Scale 0-5), special orthopedic tests (Lachman, Hawkins, McMurray, Spurling), and Maitland/Kaltenborn joint mobilization.',
                modules: [
                  { moduleNumber: 1, title: 'Orthopedic Assessment & Mobilization', subtopics: ['Manual Muscle Testing (MMT) Protocol & Grading', 'Orthopedic Tests for Spine, Shoulder, Knee and Ankle', 'Maitland Joint Mobilization Grades (I to IV)'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHT 302',
                title: 'Electrotherapy II (Low & Medium Frequency Electrical Stimulation)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'TENS (Transcutaneous Electrical Nerve Stimulation), Interferential Therapy (IFT), Faradic/Galvanic stimulation, and Iontophoresis.',
                modules: [
                  { moduleNumber: 1, title: 'Electrical Stimulation & Pain Modulation', subtopics: ['TENS Parameters (Conventional, Acupuncture-like) & Melzack-Wall Gate Theory', 'Interferential Current (IFT) Beat Frequencies & Vector Sweep', 'Neuromuscular Electrical Stimulation (NMES) for Denervated Muscles'] }
                ]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Neurological & Orthopedic Physiotherapy)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'PHT 401',
                title: 'Neurological Physiotherapy (Stroke, Spinal Cord Injury & CP)',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Rehabilitation of Stroke (Bobath concept, PNF, Motor Relearning Programme), Spinal Cord Injury levels, Cerebral Palsy, Parkinson’s, and Peripheral Neuropathies.',
                modules: [
                  { moduleNumber: 1, title: 'Neuro-Rehabilitation Approaches', subtopics: ['Bobath / Neurodevelopmental Treatment (NDT) Principles', 'Proprioceptive Neuromuscular Facilitation (PNF) Techniques', 'Wheelchair Transfer Training & Spinal Cord Injury Rehabilitation Stages'] }
                ]
              },
              {
                code: 'PHT 403',
                title: 'Cardiopulmonary Physiotherapy & Intensive Care',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Chest physiotherapy, postural drainage, percussion/vibration, breathing exercises (active cycle of breathing), and ICU chest clearance.',
                modules: [
                  { moduleNumber: 1, title: 'Chest Clearance & Pulmonary Rehab', subtopics: ['Postural Drainage Positions for Specific Lung Segments', 'Active Cycle of Breathing Technique (ACBT) & Forced Expiratory Technique', 'Early Mobilization in Intensive Care Unit (ICU)'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHT 402',
                title: 'Orthopedic & Sports Physiotherapy',
                units: 4,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Fracture rehabilitation, joint replacements (Total Knee/Hip Arthroplasty), sports injuries (ACL tear, meniscus, rotator cuff, ankle sprain), and return-to-sport protocols.',
                modules: [
                  { moduleNumber: 1, title: 'Sports & Musculoskeletal Rehab', subtopics: ['Post-Operative Rehabilitation Protocols in ACL Reconstruction & Arthroplasty', 'Sports Injury Assessment, POLICE/PRICE Protocols & Taping Techniques', 'Plyometric and Proprioceptive Training for Athletes'] }
                ]
              }
            ])
          }
        },
        '500 Level': {
          levelName: '500 Level (Advanced Clinical Practice & Dissertation)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'PHT 501',
                title: 'Pediatric & Geriatric Physiotherapy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Developmental milestones, congenital disorders (Clubfoot/Ponseti method, Spina Bifida, Obstetric Brachial Plexus Palsy), fall prevention in elderly, and osteoarthritis care.',
                modules: [
                  { moduleNumber: 1, title: 'Specialized Populations Care', subtopics: ['Erb’s Palsy Splinting and Therapeutic Exercises', 'Ponseti Method for Congenital Talipes Equinovarus (Clubfoot)', 'Geriatric Balance Training & Fall Risk Mitigation'] }
                ]
              },
              {
                code: 'PHT 503',
                title: 'Community Physiotherapy, Ergonomics & Administration',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Workplace ergonomics, cumulative trauma disorders, disability prevention, community-based rehabilitation (CBR), and private practice management.',
                modules: [
                  { moduleNumber: 1, title: 'Ergonomics & Community Rehab', subtopics: ['Ergonomic Risk Assessment (RULA/REBA Methods)', 'Community-Based Rehabilitation (CBR) Matrix & Inclusion', 'Physiotherapy Clinic Ethics, Billing and Legal Liability in Nigeria'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHT 599',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Medical Rehabilitation',
                department: 'Department of Physiotherapy',
                description: 'Supervised clinical trial or observational research dissertation with oral defense before external examiners (MRTB & NUC accredited).',
                modules: [
                  { moduleNumber: 1, title: 'Physiotherapy Dissertation & Defense', subtopics: ['Clinical Patient Trial / Biomechanical Analysis', 'Statistical Analysis (SPSS / ANOVA / Regression)', 'Final Oral Dissertation Defense'] }
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
