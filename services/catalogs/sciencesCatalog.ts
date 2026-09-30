import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getSciencesCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // PHYSICS
  if (subjStr.includes('physics')) {
    return {
      subject,
      faculty: 'Faculty of Science',
      department: 'Department of Physics',
      degreeName: 'B.Sc. (Hons) Physics',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'PHY 101',
                title: 'General Physics I (Mechanics, Thermal Physics & Waves)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Units, dimensional analysis, vectors, linear and rotational kinematics, Newton’s laws, gravitation, work and energy, elasticity, surface tension, fluid dynamics, heat, thermodynamics, and simple harmonic motion.',
                modules: [
                  { moduleNumber: 1, title: 'Mechanics and Properties of Matter', subtopics: ['Dimensional Analysis & Precision Measurements', 'Vectors & Projectile Motion', 'Newton’s Laws of Motion & Momentum Conservation', 'Circular Motion, Moments & Elasticity (Hooke’s Law, Young’s Modulus)'] },
                  { moduleNumber: 2, title: 'Thermal Physics and Thermodynamics', subtopics: ['Thermometry & Thermal Expansion', 'First & Second Laws of Thermodynamics', 'Kinetic Theory of Gases & Heat Transfer (Conduction, Convection, Radiation)'] }
                ]
              },
              {
                code: 'PHY 107',
                title: 'General Physics Practical I',
                units: 1,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Experimental laboratory physics covering mechanics, determination of g using simple pendulum, Hooke’s law, density, thermal calorimetry, and error analysis.',
                modules: [
                  { moduleNumber: 1, title: 'Laboratory Experiments in Mechanics & Heat', subtopics: ['Error Analysis, Graphical Techniques & Vernier Calipers', 'Simple Pendulum, Spiral Spring & Surface Tension Determinations', 'Specific Heat Capacity of Solids and Liquids by Cooling'] }
                ]
              },
              {
                code: 'MTH 101',
                title: 'Elementary Mathematics I (Algebra & Trigonometry)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Algebra, sets, indices, surds, quadratic equations, progressions, matrices, and trigonometry.',
                modules: [{ moduleNumber: 1, title: 'Algebra & Functions', subtopics: ['Set Theory & Quadratics', 'Binomial Theorem & Trigonometric Identities'] }]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Atomic structure, periodic table, chemical bonding, stoichiometry, and states of matter.',
                modules: [{ moduleNumber: 1, title: 'Inorganic & Physical Basics', subtopics: ['Atomic Theory & Periodic Trends', 'Stoichiometry & Gas Laws'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHY 102',
                title: 'General Physics II (Electricity, Magnetism & Modern Physics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Electrostatics, Coulomb’s law, Gauss’s law, capacitors, electric current, Kirchhoff’s rules, magnetic fields, electromagnetic induction, AC circuits, atomic structure, photoelectric effect, and radioactivity.',
                modules: [
                  { moduleNumber: 1, title: 'Electricity and Magnetism', subtopics: ['Coulomb’s Law, Electric Fields & Potentials', 'Capacitors, Dielectrics & Energy Storage', 'Ohm’s Law, Kirchhoff’s Circuit Laws & Potentiometer', 'Magnetic Forces on Charges & Faraday’s Law of Induction'] },
                  { moduleNumber: 2, title: 'Modern Physics Basics', subtopics: ['Photoelectric Effect & Planck’s Quantum Hypothesis', 'Bohr Model of Hydrogen Atom & X-rays', 'Radioactivity, Half-life & Nuclear Decay Reactions'] }
                ]
              },
              {
                code: 'PHY 108',
                title: 'General Physics Practical II',
                units: 1,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Experimental measurements in optics, focal length of lenses, refractive index of glass prism, potentiometer experiments, and resistance measurements.',
                modules: [
                  { moduleNumber: 1, title: 'Optics and Electrical Measurements', subtopics: ['Determination of Refractive Index by Prism & Liquid', 'Focal Length of Concave Mirror and Convex Lens', 'Ohm’s Law Verification, Resistor Networks & Potentiometer Calibration'] }
                ]
              },
              {
                code: 'MTH 102',
                title: 'Elementary Mathematics II (Calculus)',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Differential and integral calculus, limits, derivatives, integrals, and applications.',
                modules: [{ moduleNumber: 1, title: 'Calculus Applications', subtopics: ['Limits, Differentiation & Curve Sketching', 'Integration Techniques & Areas'] }]
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
                code: 'PHY 201',
                title: 'Classical Mechanics I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Harmonic oscillator, central force motion, planetary orbits (Kepler’s laws), rigid body dynamics, inertia tensor, and rotating coordinate systems.',
                modules: [
                  { moduleNumber: 1, title: 'Central Forces & Rigid Body Dynamics', subtopics: ['Damped and Driven Harmonic Oscillators, Resonance', 'Central Force Motion, Effective Potential & Kepler’s Laws', 'Rigid Body Rotation, Moment of Inertia Tensor & Euler’s Equations'] }
                ]
              },
              {
                code: 'PHY 203',
                title: 'Electric Circuits and Basic Electronics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Network theorems (Thevenin, Norton, Superposition), semiconductor physics, p-n junction diodes, BJT transistors, biasing, and amplifiers.',
                modules: [
                  { moduleNumber: 1, title: 'Circuit Analysis and Semiconductors', subtopics: ['AC Circuit Analysis, RLC Resonance & Quality Factor', 'Diode Rectification, Zener Regulators & Filtering', 'Transistor Characteristics, CE/CC/CB Biasing & Small-Signal Amplifiers'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHY 202',
                title: 'Thermal and Statistical Physics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Thermodynamic potentials (Enthalpy, Helmholtz, Gibbs free energy), Maxwell relations, phase transitions, microcanonical/canonical ensembles, and Maxwell-Boltzmann distribution.',
                modules: [
                  { moduleNumber: 1, title: 'Thermodynamic Relations & Ensembles', subtopics: ['Maxwell’s Thermodynamic Relations & Clausius-Clapeyron Equation', 'Microstates, Macrostates & Entropy Statistical Definition', 'Canonical Ensemble, Partition Function & Equipartition Theorem'] }
                ]
              },
              {
                code: 'PHY 204',
                title: 'Waves, Physical Optics & Acoustics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Wave equation, Fourier analysis of waves, interference (Young’s slits, Newton’s rings), diffraction (Fraunhofer, Fresnel, diffraction grating), polarization, and laser physics.',
                modules: [
                  { moduleNumber: 1, title: 'Optics and Wave Phenomenon', subtopics: ['Wave Superposition & Group/Phase Velocities', 'Interference of Light & Michelson Interferometer', 'Diffraction Grating, Resolving Power & Polarization (Brewster’s Angle)'] }
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
                code: 'PHY 301',
                title: 'Quantum Mechanics I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Wave-particle duality, Schrödinger equation, wave functions, expectation values, particle in a box, potential barrier tunneling, and quantum harmonic oscillator.',
                modules: [
                  { moduleNumber: 1, title: 'Foundations of Quantum Mechanics', subtopics: ['Postulates of Quantum Mechanics & Hermitian Operators', 'Time-Independent Schrödinger Equation Solutions', '1D Infinite and Finite Potential Wells', 'Quantum Harmonic Oscillator (Ladder Operators)'] }
                ]
              },
              {
                code: 'PHY 303',
                title: 'Electromagnetism I (Maxwell’s Equations)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Electrostatic boundary value problems, Poisson and Laplace equations, magnetic vector potential, Maxwell’s equations in differential and integral forms, and Poynting vector.',
                modules: [
                  { moduleNumber: 1, title: 'Electrodynamics & Field Equations', subtopics: ['Laplace Equation Solutions & Separation of Variables', 'Displacement Current & Full Maxwell’s Equations', 'Poynting Theorem & Electromagnetic Energy Flow'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHY 302',
                title: 'Solid State Physics I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Crystal structures, Bravais lattices, X-ray diffraction (Bragg’s law), reciprocal lattice, phonon vibrations, free electron theory of metals, and energy band theory.',
                modules: [
                  { moduleNumber: 1, title: 'Crystallography and Band Theory', subtopics: ['Crystal Lattices, Miller Indices & Reciprocal Space', 'Phonons and Lattice Specific Heat (Einstein & Debye Models)', 'Kronig-Penney Model & Band Structure (Conductors, Semiconductors, Insulators)'] }
                ]
              },
              {
                code: 'PHY 399',
                title: 'SIWES / Industrial Training in Applied Physics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Practical attachment in research institutes (e.g. NASRDA, NNRA, ECN, meteorological centers, or industrial instrumentation firms).',
                modules: [{ moduleNumber: 1, title: 'Industrial Practicum', subtopics: ['Instrumentation & Calibration', 'Technical Report & Viva'] }]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'PHY 401',
                title: 'Quantum Mechanics II & Atomic Spectra',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Hydrogen atom solution in 3D, angular momentum algebra, spin, perturbation theory (time-independent and time-dependent), Zeeman effect, and fine structure.',
                modules: [
                  { moduleNumber: 1, title: 'Advanced Quantum Mechanics', subtopics: ['3D Schrödinger Equation & Spherical Harmonics', 'Angular Momentum & Clebsch-Gordan Coefficients', 'Non-Degenerate & Degenerate Perturbation Theory', 'Variational Principle & WKB Approximation'] }
                ]
              },
              {
                code: 'PHY 403',
                title: 'Nuclear and Particle Physics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Nuclear properties, binding energy (liquid drop model, shell model), radioactive decay laws, alpha/beta/gamma decays, nuclear fission/fusion, and elementary particles (quarks, leptons, standard model).',
                modules: [
                  { moduleNumber: 1, title: 'Nuclear Models and Radiation', subtopics: ['Semi-Empirical Mass Formula & Magic Numbers', 'Fermi Theory of Beta Decay & Selection Rules', 'Nuclear Reactors & Fusion Mechanisms', 'Fundamental Forces & Standard Model Classification'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'PHY 499',
                title: 'Final Year Research Project and Thesis',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Original supervised research project in experimental, theoretical, computational, or environmental physics with written thesis and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Physics Research & Dissertation', subtopics: ['Experimental Design / Numerical Simulation', 'Data Analysis, Uncertainty Modeling & Dissertation Writing', 'Oral Project Defense'] }
                ]
              },
              {
                code: 'PHY 402',
                title: 'Computational Physics & Modeling',
                units: 3,
                status: 'Elective',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Numerical methods in physics using Python/MATLAB, Monte Carlo simulations, finite difference methods for PDEs (heat/wave equations), and chaos theory.',
                modules: [
                  { moduleNumber: 1, title: 'Computational Simulation', subtopics: ['Monte Carlo Integration & Random Walks', 'Numerical Solutions to Schrödinger Equation', 'Nonlinear Dynamics and Chaotic Systems'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // CHEMISTRY
  if (subjStr.includes('chemistry')) {
    return {
      subject,
      faculty: 'Faculty of Science',
      department: 'Department of Chemistry',
      degreeName: 'B.Sc. (Hons) Chemistry / Pure & Applied Chemistry',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CHM 101',
                title: 'General Chemistry I (Inorganic & Physical Chemistry)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Atomic structure, periodic classification, chemical bonding, stoichiometry, kinetic theory of gases, thermochemistry, and chemical equilibria.',
                modules: [
                  { moduleNumber: 1, title: 'Atomic Structure and Periodicity', subtopics: ['Bohr’s Model & Quantum Numbers', 'Periodic Properties (Ionization Energy, Electron Affinity)', 'Chemical Bonding (Ionic, Covalent, VSEPR Theory)'] },
                  { moduleNumber: 2, title: 'Physical Chemistry Principles', subtopics: ['Gas Laws & Van der Waals Equation', 'Thermochemistry (Hess’s Law, Enthalpies)', 'Chemical Equilibrium & Le Chatelier’s Principle'] }
                ]
              },
              {
                code: 'CHM 107',
                title: 'General Chemistry Practical I',
                units: 1,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Volumetric analysis, acid-base titrations, redox titrations, and qualitative inorganic analysis for cations and anions.',
                modules: [
                  { moduleNumber: 1, title: 'Quantitative and Qualitative Analysis', subtopics: ['Preparation of Standard Solutions & Acid-Base Indicators', 'Permanganate and Dichromate Redox Titrations', 'Qualitative Group Analysis for Cations (Groups I - V)'] }
                ]
              },
              {
                code: 'MTH 101',
                title: 'Elementary Mathematics I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Algebra and trigonometry.',
                modules: [{ moduleNumber: 1, title: 'Core Algebra', subtopics: ['Sets, Quadratics & Trigonometry'] }]
              },
              {
                code: 'PHY 101',
                title: 'General Physics I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Mechanics and heat.',
                modules: [{ moduleNumber: 1, title: 'Physics Fundamentals', subtopics: ['Mechanics & Heat Transfer'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CHM 102',
                title: 'General Chemistry II (Organic & Applied Chemistry)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Carbon hybridization, IUPAC nomenclature, functional groups, reactions of alkanes, alkenes, alkynes, alcohols, carbonyls, and carboxylic acids.',
                modules: [
                  { moduleNumber: 1, title: 'Organic Chemistry Foundations', subtopics: ['Hybridization, Isomerism & Inductive/Resonance Effects', 'Hydrocarbon Reaction Mechanisms (Electrophilic Addition, Radical Halogenation)', 'Alcohols, Aldehydes, Ketones, Carboxylic Acids & Esters'] }
                ]
              },
              {
                code: 'CHM 108',
                title: 'General Chemistry Practical II',
                units: 1,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Organic qualitative analysis, identification of functional groups, melting/boiling point determination, and simple organic syntheses (e.g. aspirin).',
                modules: [
                  { moduleNumber: 1, title: 'Organic Laboratory Techniques', subtopics: ['Functional Group Tests (Unsaturation, Carbonyls, Carboxylic)', 'Melting Point Determination & Recrystallization', 'Synthesis of Aspirin & Esterification Practicals'] }
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
                code: 'CHM 211',
                title: 'Inorganic Chemistry I (Main Group Elements)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Comparative chemistry of s- and p-block elements, organometallic compounds of main group, noble gas compounds, and non-aqueous solvents.',
                modules: [
                  { moduleNumber: 1, title: 'Main Group Chemistry', subtopics: ['Periodic Trends of Groups 1 to 18 Elements', 'Hydrides, Oxides and Halides of Main Group', 'Chemistry of Boron Hydrides (Diborane) and Silicon Polymers'] }
                ]
              },
              {
                code: 'CHM 212',
                title: 'Organic Chemistry I (Mechanisms and Stereochemistry)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Stereochemistry (Chirality, R/S, E/Z, Conformations), nucleophilic substitutions (SN1, SN2), eliminations (E1, E2), and electrophilic aromatic substitution.',
                modules: [
                  { moduleNumber: 1, title: 'Reaction Mechanisms and Stereochemistry', subtopics: ['Conformational Analysis of Cyclohexane', 'SN1 vs SN2 Kinetics, Stereochemistry & Solvent Effects', 'Electrophilic Aromatic Substitution (Nitration, Halogenation, Friedel-Crafts)'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CHM 213',
                title: 'Physical Chemistry I (Thermodynamics and Chemical Kinetics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'First, second, and third laws of thermodynamics, chemical kinetics, rate laws, order of reaction, Arrhenius equation, and electrochemistry (Nernst equation).',
                modules: [
                  { moduleNumber: 1, title: 'Thermodynamics and Kinetics', subtopics: ['Entropy, Free Energy and Chemical Potential', 'Rate Equations (Zero, First, Second Order Reactions)', 'Collision Theory, Transition State Theory & Catalysis', 'Galvanic Cells, EMF & Nernst Equation Applications'] }
                ]
              },
              {
                code: 'CHM 214',
                title: 'Analytical Chemistry I (Instrumental Methods & Separations)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Sample preparation, chromatography (TLC, column, HPLC basics), spectrophotometry (Beer-Lambert law), and gravimetric analysis.',
                modules: [
                  { moduleNumber: 1, title: 'Analytical Principles & Chromatography', subtopics: ['Errors, Statistical Treatment of Analytical Data', 'Thin Layer Chromatography & Column Chromatography', 'UV-Visible Spectrophotometry Principles & Instrumentation'] }
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
                code: 'CHM 301',
                title: 'Inorganic Chemistry II (Transition Metals & Coordination Chemistry)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Transition metal chemistry, Crystal Field Theory (CFT), Ligand Field Theory, Jahn-Teller distortion, magnetic properties, electronic spectra, and organometallics.',
                modules: [
                  { moduleNumber: 1, title: 'Coordination Chemistry', subtopics: ['Werner’s Theory & IUPAC Nomenclature of Complexes', 'Crystal Field Splitting in Octahedral and Tetrahedral Fields', 'High-Spin vs Low-Spin Complexes & Magnetic Susceptibility'] }
                ]
              },
              {
                code: 'CHM 303',
                title: 'Organic Chemistry II (Carbonyl Reactions & Heterocycles)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Enolates, aldol condensation, Claisen condensation, Michael addition, Wittig reaction, pericyclic reactions, and heterocyclic chemistry (furan, pyrrole, pyridine).',
                modules: [
                  { moduleNumber: 1, title: 'Carbonyl Chemistry & Synthesis', subtopics: ['Enolates, Alpha-Substitution & Condensation Reactions', 'Wittig Reaction & Organolithium Reagents', 'Structure and Reactivity of 5- and 6-Membered Heterocycles'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CHM 302',
                title: 'Physical Chemistry II (Quantum Chemistry & Spectroscopy)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Quantum chemistry, rigid rotor, harmonic oscillator, molecular orbital theory, rotational, vibrational (IR), and electronic spectroscopy.',
                modules: [
                  { moduleNumber: 1, title: 'Quantum Chemistry & Molecular Spectroscopy', subtopics: ['Schrödinger Equation applied to Molecular Systems', 'Infrared (IR) Spectroscopy and Normal Modes of Vibration', 'NMR Spectroscopy Principles (Chemical Shift, Spin-Spin Coupling)'] }
                ]
              },
              {
                code: 'CHM 399',
                title: 'SIWES (Chemical & Industrial Internship)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Industrial attachment in petrochemical refineries, pharmaceutical industries, food/beverage quality control, or chemical manufacturing firms.',
                modules: [{ moduleNumber: 1, title: 'Industrial Practice', subtopics: ['Industrial QC/QA & Chemical Engineering Plant Operations'] }]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'CHM 401',
                title: 'Advanced Organic Synthesis & Natural Products',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Retrosynthetic analysis, protecting groups, asymmetric synthesis, alkaloids, terpenoids, steroids, and biosynthetic pathways.',
                modules: [
                  { moduleNumber: 1, title: 'Retrosynthesis & Natural Products', subtopics: ['Retrosynthetic Disconnections & Synthons', 'Stereoselective Reagents & Protecting Group Strategies', 'Isolation, Structure Elucidation & Bioactivity of Alkaloids/Flavonoids'] }
                ]
              },
              {
                code: 'CHM 403',
                title: 'Industrial & Environmental Chemistry',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Petroleum refining, polymer synthesis, soap/detergent manufacturing, industrial waste treatment, effluent monitoring, and green chemistry.',
                modules: [
                  { moduleNumber: 1, title: 'Chemical Technology and Environment', subtopics: ['Petroleum Cracking, Reforming & Petrochemical Products', 'Addition and Condensation Polymerization (Nylon, PET, PVC)', 'Air, Water and Soil Pollution Control & Green Chemistry Metrics'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CHM 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Original independent laboratory research project in organic, inorganic, physical, analytical, or environmental chemistry, with thesis and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Laboratory Research & Thesis Defense', subtopics: ['Experimental Synthesis / Instrumental Quantification', 'Data Interpretation & Dissertation Preparation', 'Oral Defense before Examiners'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // BIOLOGY / ZOOLOGY
  if (subjStr.includes('bio') || subjStr.includes('zoo')) {
    return {
      subject,
      faculty: 'Faculty of Science',
      department: 'Department of Biological Sciences / Zoology',
      degreeName: 'B.Sc. (Hons) Biological Sciences / Zoology',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BIO 101',
                title: 'General Biology I (Cell Biology & Genetics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Cell theory, ultrastructure of organelles, mitosis, meiosis, biochemistry of macromolecules, Mendelian genetics, and basic physiological processes.',
                modules: [
                  { moduleNumber: 1, title: 'Cellular Biology and Biomolecules', subtopics: ['Prokaryotic vs Eukaryotic Cell Ultrastructure', 'Cell Division (Mitosis, Meiosis & Chromosome Dynamics)', 'Carbohydrates, Proteins, Lipids & Nucleic Acids Structure'] },
                  { moduleNumber: 2, title: 'Principles of Genetics', subtopics: ['Mendelian Laws & Monohybrid/Dihybrid Crosses', 'Linkage, Crossing Over & Sex-Linked Traits', 'DNA Replication, Transcription & Protein Translation'] }
                ]
              },
              {
                code: 'BIO 107',
                title: 'General Biology Practical I',
                units: 1,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Light microscopy, slide preparation, staining of plant/animal tissues, onion root tip squash for mitosis, and biochemical tests for food substances.',
                modules: [{ moduleNumber: 1, title: 'Laboratory Microscopy & Staining', subtopics: ['Microscope Handling, Calibration & Cell Staining', 'Food Tests (Biuret, Benedict, Iodine, Emulsion)', 'Observation of Mitotic Stages in Plant Tissues'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BIO 102',
                title: 'General Biology II (Plant & Animal Diversity)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Taxonomy, morphology, anatomy and life cycles of non-vascular and vascular plants, invertebrates, vertebrates, and ecosystem dynamics.',
                modules: [
                  { moduleNumber: 1, title: 'Biodiversity and Ecology', subtopics: ['Kingdoms of Life: Monera, Protista, Fungi, Plantae, Animalia', 'Comparative Plant Anatomy & Photosynthesis', 'Ecosystem Energy Flow, Food Webs & Biogeochemical Cycles'] }
                ]
              },
              {
                code: 'BIO 108',
                title: 'General Biology Practical II',
                units: 1,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Dissection of toad/rat, anatomical drawings, floral morphology, and herbarium specimen preservation techniques.',
                modules: [{ moduleNumber: 1, title: 'Dissections and Specimen Study', subtopics: ['Vertebrate Dissection (Toad/Rat Alimentary & Reproductive Systems)', 'Floral Diagram & Floral Formula Construction'] }]
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
                code: 'ZOO 201',
                title: 'Invertebrate Zoology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Evolution, classification, morphology, physiology, and economic importance of Protozoa, Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, and Echinodermata.',
                modules: [
                  { moduleNumber: 1, title: 'Invertebrate Phyla', subtopics: ['Acoelomates, Pseudocoelomates & Coelomate Body Plans', 'Parasitic Helminths (Schistosoma, Taenia, Ascaris)', 'Arthropod Diversity, Metamorphosis & Vectors of Disease'] }
                ]
              },
              {
                code: 'BIO 201',
                title: 'General Genetics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Gene interactions, epistasis, polygenic inheritance, chromosome aberrations, cytoplasmic inheritance, population genetics, and Hardy-Weinberg law.',
                modules: [
                  { moduleNumber: 1, title: 'Advanced Genetics & Populations', subtopics: ['Epistatic Gene Ratios (9:7, 12:3:1, 9:3:4)', 'Chromosome Mutations: Deletions, Inversions, Translocations, Aneuploidy', 'Hardy-Weinberg Equilibrium & Evolutionary Forces'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ZOO 202',
                title: 'Vertebrate Zoology & Comparative Anatomy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Origin and evolutionary radiation of chordates: Pisces, Amphibia, Reptilia, Aves, and Mammalia. Comparative study of skeletal, circulatory, nervous, and urinogenital systems.',
                modules: [
                  { moduleNumber: 1, title: 'Chordate Evolution & Comparative Systems', subtopics: ['Protochordates & Evolution of Jaws and Paired Fins', 'Amniotic Egg and Terrestrial Adaptations in Reptiles/Birds/Mammals', 'Comparative Evolution of Heart and Aortic Arches in Vertebrates'] }
                ]
              },
              {
                code: 'BIO 202',
                title: 'General Ecology & Environmental Biology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Population ecology, community ecology, ecological succession, biomes (Savanna, Rainforest), biodiversity conservation, and environmental pollution in Nigeria.',
                modules: [
                  { moduleNumber: 1, title: 'Ecosystem Dynamics & Conservation', subtopics: ['Population Growth Models (Exponential, Logistic, r/K Selection)', 'Ecological Succession in Terrestrial and Aquatic Habitats', 'Nigerian Biomes & Biodiversity Hotspots Conservation'] }
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
                code: 'BIO 301',
                title: 'Molecular Biology & Recombinant DNA Technology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'DNA structure and topology, gene regulation in prokaryotes (lac and trp operons) and eukaryotes, PCR, gel electrophoresis, gene cloning, plasmids, and CRISPR technology.',
                modules: [
                  { moduleNumber: 1, title: 'Molecular Genetics & Biotechnology', subtopics: ['Gene Regulation & Epigenetics', 'Polymerase Chain Reaction (PCR) & DNA Sequencing', 'Restriction Enzymes, Recombinant Plasmids & Transgenic Organisms'] }
                ]
              },
              {
                code: 'ZOO 301',
                title: 'Animal Physiology & Endocrinology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Osmoregulation, respiration in terrestrial/aquatic animals, neuromuscular transmission, endocrine signaling, hormone receptors, and reproductive physiology.',
                modules: [
                  { moduleNumber: 1, title: 'Physiological Adaptations', subtopics: ['Osmoregulation in Freshwater, Marine and Desert Animals', 'Sliding Filament Mechanism of Muscle Contraction', 'Hormonal Control of Metamorphosis and Reproduction'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ZOO 302',
                title: 'Parasitology & Medical Entomology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Biology, epidemiology, vectors, pathology, and control of tropical parasitic diseases: Malaria (Plasmodium / Anopheles), Trypanosomiasis (Glossina), Onchocerciasis (Simulium), and Schistosomiasis.',
                modules: [
                  { moduleNumber: 1, title: 'Tropical Parasitic Vectors', subtopics: ['Host-Parasite Relationships and Immune Evasion', 'Vector Biology and Chemical/Biological Vector Control Methods', 'Neglected Tropical Diseases (NTDs) in Nigeria'] }
                ]
              },
              {
                code: 'BIO 399',
                title: 'SIWES (Biological & Agricultural Attachment)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Practical training in national biotechnology agencies (e.g. NABDA, NIHORT, IITA, NIFOR, veterinary centers, or wildlife parks).',
                modules: [{ moduleNumber: 1, title: 'Industrial Training', subtopics: ['Fieldwork & Laboratory Attachment', 'Technical Defense'] }]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BIO 401',
                title: 'Evolutionary Biology & Population Genetics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Modern synthetic theory of evolution, natural selection, speciation mechanisms (allopatric, sympatric), phylogenetics, molecular clocks, and human evolution.',
                modules: [
                  { moduleNumber: 1, title: 'Evolution & Speciation', subtopics: ['Evidence of Evolution: Paleontology, Comparative Anatomy & Genomics', 'Mechanisms of Speciation & Reproductive Isolation', 'Phylogenetic Trees, Cladistics & Molecular Evolution'] }
                ]
              },
              {
                code: 'ZOO 401',
                title: 'Fisheries & Hydrobiology / Aquaculture',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Limnology of tropical freshwater lakes and rivers, fish anatomy, fish breeding and hatchery management, pond construction, and water quality parameters.',
                modules: [
                  { moduleNumber: 1, title: 'Aquaculture and Freshwater Ecology', subtopics: ['Limnological Characteristics of Freshwater Bodies', 'Induced Breeding of Clarias and Tilapia in Hatcheries', 'Fish Nutrition, Feed Formulation & Disease Management'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BIO 499',
                title: 'Final Year Research Project and Thesis',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Original supervised research project in ecological survey, parasitology, entomology, biotechnology, or physiology with thesis and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Research & Thesis Defense', subtopics: ['Empirical Fieldwork / Laboratory Investigations', 'Statistical Data Analysis (ANOVA, Chi-Square, PCA)', 'Final Thesis Writing & External Defense'] }
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
