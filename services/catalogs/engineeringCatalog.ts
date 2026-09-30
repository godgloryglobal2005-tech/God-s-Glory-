import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getEngineeringCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // MECHATRONICS / ENGINEERING
  if (subjStr.includes('mechatronics') || subjStr.includes('engine')) {
    return {
      subject,
      faculty: 'Faculty of Engineering & Technology',
      department: 'Department of Mechatronics Engineering',
      degreeName: 'B.Eng. (Hons) Mechatronics Engineering (5-Year Professional Program)',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'ENG 101',
                title: 'Engineering Mathematics I (Algebra & Calculus)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Faculty of Engineering',
                description: 'Real number systems, complex numbers, hyperbolic functions, differential calculus, Leibnitz rule, Taylor series, and matrices.',
                modules: [{ moduleNumber: 1, title: 'Calculus and Complex Numbers', subtopics: ['De Moivre’s Theorem & Complex Algebra', 'Differentiation Techniques & Partial Derivatives'] }]
              },
              {
                code: 'ENG 103',
                title: 'Technical Drawing & Engineering Graphics',
                units: 2,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechanical Engineering',
                description: 'Orthographic projections, isometric views, sectional views, dimensioning, tolerancing, and AutoCAD 2D drafting basics.',
                modules: [{ moduleNumber: 1, title: 'Drafting Principles', subtopics: ['First and Third Angle Projections', 'Sectional Views & Fasteners Drafting', 'AutoCAD Computer-Aided Drafting'] }]
              },
              {
                code: 'PHY 101',
                title: 'General Physics I (Mechanics & Heat)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Mechanics, Newton’s laws, fluid statics/dynamics, and heat.',
                modules: [{ moduleNumber: 1, title: 'Mechanics', subtopics: ['Vectors, Kinematics & Energy'] }]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'General and physical chemistry.',
                modules: [{ moduleNumber: 1, title: 'Inorganic Chemistry', subtopics: ['Atomic Theory & Bonding'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 102',
                title: 'Engineering Mathematics II (Integral Calculus & Vectors)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Faculty of Engineering',
                description: 'Definite integrals, volume of solids of revolution, vectors in 3D, dot and cross products, and introductory differential equations.',
                modules: [{ moduleNumber: 1, title: 'Vectors and Integrals', subtopics: ['Multiple Integrals & Vector Operators (Grad, Div, Curl)', 'First-Order Differential Equations'] }]
              },
              {
                code: 'ENG 104',
                title: 'General Engineering Workshop Practice',
                units: 2,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Faculty of Engineering',
                description: 'Hands-on training in machine shop (lathe, milling), welding, fabrication, foundry, automotive, and electrical wiring safety.',
                modules: [{ moduleNumber: 1, title: 'Workshop Safety & Fabrication', subtopics: ['Lathe Turning & Milling Machine Operations', 'Arc & Gas Welding, Sheet Metal Work', 'Electrical Wiring and Industrial Safety Protocols'] }]
              },
              {
                code: 'PHY 102',
                title: 'General Physics II (Electricity & Magnetism)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Physics',
                description: 'Electrostatics, magnetism, and AC circuits.',
                modules: [{ moduleNumber: 1, title: 'Electromagnetism', subtopics: ['Circuits & Magnetic Induction'] }]
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
                title: 'Engineering Mathematics III (Differential Equations & Linear Algebra)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Faculty of Engineering',
                description: 'Second-order linear ODEs, Laplace transforms, eigenvalues/eigenvectors, and Fourier series analysis.',
                modules: [{ moduleNumber: 1, title: 'Transforms and Linear Systems', subtopics: ['Laplace Transforms & Inverse Transforms', 'Second Order ODEs & Damped Oscillations', 'Matrix Diagonalization & Eigenvalues'] }]
              },
              {
                code: 'ENG 203',
                title: 'Engineering Mechanics I (Statics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechanical Engineering',
                description: 'Force vectors, equilibrium of particles and rigid bodies, trusses (method of joints/sections), friction, centroids, and moments of inertia.',
                modules: [{ moduleNumber: 1, title: 'Statics & Truss Analysis', subtopics: ['2D and 3D Equilibrium Equations', 'Truss Analysis (Method of Joints and Sections)', 'Centroids and Area Moments of Inertia'] }]
              },
              {
                code: 'EEE 201',
                title: 'Applied Electricity & Circuit Theory I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Electrical Engineering',
                description: 'Mesh and nodal circuit analysis, Thevenin/Norton theorems, operational amplifiers, and AC phasors.',
                modules: [{ moduleNumber: 1, title: 'Network Theorems', subtopics: ['Nodal and Mesh Analysis Techniques', 'Thevenin & Norton Equivalent Circuits', 'Op-Amp Linear Circuits (Inverting, Non-inverting, Summing)'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 204',
                title: 'Engineering Mechanics II (Dynamics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechanical Engineering',
                description: 'Kinematics of particles and rigid bodies, Newton’s second law, work-energy, impulse-momentum, and planetary motion.',
                modules: [{ moduleNumber: 1, title: 'Rigid Body Dynamics', subtopics: ['Planar Kinematics of Rigid Bodies (ICR)', 'Kinetics of Rigid Bodies (Force-Acceleration, Work-Energy)'] }]
              },
              {
                code: 'MCT 202',
                title: 'Introduction to Mechatronics Systems & Sensors',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Definition of mechatronics, sensors and transducers (LVDT, strain gauges, thermocouples, encoders), and signal conditioning.',
                modules: [{ moduleNumber: 1, title: 'Sensors and Signal Conditioning', subtopics: ['Classification of Sensors and Transducers', 'Wheatstone Bridge Circuits & Instrumentation Amplifiers', 'Rotary Encoders, Optical Sensors and Hall Effect Sensors'] }]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Penultimate I)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MCT 301',
                title: 'Sensors, Actuators & Signal Conditioning',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'DC motors, stepper motors, servo motors, pneumatic and hydraulic actuators, solenoid valves, and power semiconductor drives (H-Bridge, MOSFETs).',
                modules: [
                  { moduleNumber: 1, title: 'Actuators and Motor Control', subtopics: ['Stepper Motor Driving (Full Step, Microstepping)', 'Servo Motors and Pulse Width Modulation (PWM)', 'Pneumatic Valves, Cylinders and Fluid Power Circuits'] }
                ]
              },
              {
                code: 'MCT 303',
                title: 'Control Systems Engineering I (Classical Control)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Transfer functions, block diagrams, signal flow graphs, Routh-Hurwitz stability criterion, root locus analysis, and PID controller tuning.',
                modules: [
                  { moduleNumber: 1, title: 'Feedback Control & Stability', subtopics: ['Transfer Function Modeling of Electrical/Mechanical Systems', 'Root Locus Design Techniques', 'PID Controllers (Proportional, Integral, Derivative Tuning)'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'MCT 302',
                title: 'Microcontroller Systems & Embedded C Programming',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Microcontroller architecture (ARM Cortex, PIC, AVR/Arduino), embedded C programming, GPIO, timers, interrupts, ADC, and communication protocols (I2C, SPI, UART).',
                modules: [
                  { moduleNumber: 1, title: 'Embedded System Design', subtopics: ['Registers, Memory Maps and Interrupt Service Routines (ISR)', 'Analog-to-Digital Conversion (ADC) and Sampling', 'I2C and SPI Sensor Interfacing Protocols'] }
                ]
              },
              {
                code: 'ENG 399',
                title: 'SIWES I (Industrial Training Practicum)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Supervised industrial attachment in manufacturing, automotive assembly, oil & gas, or robotics automation industries.',
                modules: [{ moduleNumber: 1, title: 'Industrial Immersion', subtopics: ['PLC Wiring & Industrial Automation', 'Logbook & Technical Report Defense'] }]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Penultimate II)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MCT 401',
                title: 'Industrial Automation & PLC Programming',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Programmable Logic Controllers (PLCs), ladder logic programming, SCADA systems, industrial sensors, and pneumatic sequencing.',
                modules: [
                  { moduleNumber: 1, title: 'PLC and SCADA Systems', subtopics: ['PLC Architecture & Hardware Configurations', 'Ladder Logic Programming (Timers, Counters, Latches)', 'SCADA and Human-Machine Interface (HMI) Design', 'Industrial Communication Buses (Modbus, Profinet)'] }
                ]
              },
              {
                code: 'MCT 403',
                title: 'Robotics Engineering & Kinematics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Robot anatomy, spatial transformations (Euler angles, homogeneous matrices), forward and inverse kinematics (Denavit-Hartenberg parameters), and trajectory planning.',
                modules: [
                  { moduleNumber: 1, title: 'Robot Kinematics', subtopics: ['Homogeneous Transformation Matrices', 'Denavit-Hartenberg (D-H) Parameter Conventions', 'Inverse Kinematics Solutions & Jacobian Matrices', 'Trajectory Generation and Obstacle Avoidance'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 499',
                title: 'SIWES II (6-Month Continuous Industrial Attachment)',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Full 6-month hands-on industrial placement in certified engineering companies across Nigeria.',
                modules: [{ moduleNumber: 1, title: 'Extended Industrial Practicum', subtopics: ['Plant Maintenance & Industrial Troubleshooting', 'Comprehensive SIWES Defense'] }]
              }
            ])
          }
        },
        '500 Level': {
          levelName: '500 Level (Year 5 / Final Professional Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'MCT 501',
                title: 'Advanced Robotics & Machine Vision',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Digital image processing for robotics, OpenCV, edge detection, object tracking, ROS (Robot Operating System), and autonomous mobile robots (SLAM).',
                modules: [
                  { moduleNumber: 1, title: 'Computer Vision & ROS', subtopics: ['Camera Calibration & Image Filtering in OpenCV', 'Object Recognition and 3D Pose Estimation', 'Robot Operating System (ROS 2) Nodes and Topics', 'Simultaneous Localization and Mapping (SLAM)'] }
                ]
              },
              {
                code: 'MCT 503',
                title: 'Modern Control Engineering (State-Space & Digital Control)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'State-space representations, controllability and observability (Kalman tests), pole placement, state observers (Luenberger), and discrete-time Z-transforms.',
                modules: [
                  { moduleNumber: 1, title: 'State-Space & Observer Design', subtopics: ['State Equations and State Transition Matrix', 'Controllability and Observability Criteria', 'Full State Feedback Controller Design (Pole Placement)', 'Luenberger State Observer & Kalman Filter Basics'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ENG 599',
                title: 'Final Year Capstone Engineering Design Project',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Engineering',
                department: 'Department of Mechatronics Engineering',
                description: 'Design, physical fabrication, circuit construction, programming, testing, and oral defense of an innovative mechatronic/robotic system before external examiners.',
                modules: [
                  { moduleNumber: 1, title: 'Capstone Prototype & Thesis Defense', subtopics: ['Hardware Prototype Construction & PCB Design', 'Embedded Control Firmware Implementation', 'System Validation, Technical Documentation & Oral Defense'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // TRANSPORT & OPERATIONAL MANAGEMENT
  if (subjStr.includes('transport')) {
    return {
      subject,
      faculty: 'Faculty of Management Sciences',
      department: 'Department of Transport and Logistics Management',
      degreeName: 'B.Sc. (Hons) Transport Management and Operational Logistics',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'TOM 101',
                title: 'Introduction to Transport Systems & Logistics I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Evolution of transport, modes of transport (Road, Rail, Maritime, Air, Pipeline), transport geography, and socio-economic significance in Nigeria.',
                modules: [{ moduleNumber: 1, title: 'Transport Fundamentals', subtopics: ['Modal Characteristics & Comparative Economics', 'Transport Infrastructure and National Development'] }]
              },
              {
                code: 'ECO 101',
                title: 'Principles of Economics I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Microeconomics.',
                modules: [{ moduleNumber: 1, title: 'Price Theory', subtopics: ['Demand, Supply & Market Clearing'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'TOM 102',
                title: 'Introduction to Transport Economics & Operations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Demand for transport, cost structure of transport operators, tariff formulation, and public transit operations in Nigeria.',
                modules: [{ moduleNumber: 1, title: 'Transport Economics', subtopics: ['Elasticity of Transport Demand & Route Costing', 'Fare Structures and Subsidy Economics'] }]
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
                code: 'TOM 201',
                title: 'Highway Transport Planning and Traffic Management',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Traffic flow theory, congestion management, road safety administration (FRSC guidelines), highway financing, and toll systems.',
                modules: [{ moduleNumber: 1, title: 'Traffic & Highway Systems', subtopics: ['Traffic Volume, Density and Speed Relationships', 'Congestion Alleviation Strategies & Intelligent Transport Systems (ITS)'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'TOM 202',
                title: 'Maritime Transport, Ports & Shipping Management',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Port operations in Nigeria (NPA, NIMASA), containerization, shipping lines, chartering, bill of lading, and maritime cabotage law.',
                modules: [{ moduleNumber: 1, title: 'Port & Shipping Logistics', subtopics: ['Port Terminal Operations & Berth Productivity', 'Incoterms 2020 & Maritime Documentation', 'Nigerian Cabotage Act and Coastal Shipping'] }]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Penultimate)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'TOM 301',
                title: 'Supply Chain Management & Operational Logistics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Logistics network design, warehouse management, inventory control, cold chain logistics, freight forwarding, and 3PL/4PL providers.',
                modules: [
                  { moduleNumber: 1, title: 'Supply Chain Logistics', subtopics: ['Bullwhip Effect & Supply Chain Coordination', 'Warehouse Layout and Cross-Docking Operations', 'Multimodal Freight Transport Coordination'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'TOM 302',
                title: 'Aviation Management & Airline Operations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Airport operations (FAAN, NCAA regulations), airline scheduling, fleet planning, revenue management, and air cargo logistics.',
                modules: [
                  { moduleNumber: 1, title: 'Aviation Logistics', subtopics: ['Airport Terminal Management & Air Traffic Control', 'Airline Yield Management and Pricing Algorithms', 'Air Freight Forwarding and Dangerous Goods Handling'] }
                ]
              },
              {
                code: 'TOM 399',
                title: 'SIWES (Logistics & Transport Practicum)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Industrial placement in ports, haulage fleets, aviation agencies, or railway corporations.',
                modules: [{ moduleNumber: 1, title: 'Field Operations', subtopics: ['Fleet Management & Dispatch Workflows', 'Technical Report Writing'] }]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Final Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'TOM 401',
                title: 'Operations Research & Quantitative Methods in Transport',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Transportation problem algorithms (Vogel’s approximation, MODI), network routing (Dijkstra, traveling salesman), and queuing theory in terminals.',
                modules: [
                  { moduleNumber: 1, title: 'Optimization in Logistics', subtopics: ['Linear Programming & Transportation Models', 'Vehicle Routing Problems (VRP) & Heuristics', 'Queuing Models (M/M/1, M/M/c) in Port and Toll Plazas'] }
                ]
              },
              {
                code: 'TOM 403',
                title: 'Transport Policy, Environmental Sustainability & GIS',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'National Transport Policy of Nigeria, green logistics, carbon emission reduction, GIS mapping of transport networks, and urban mobility planning.',
                modules: [
                  { moduleNumber: 1, title: 'Policy, GIS & Sustainability', subtopics: ['National Transport Master Plan Evaluation', 'GIS Spatial Analysis for Route Optimization', 'Decarbonization, Electric Vehicles & Green Transit'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'TOM 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Transport Management',
                description: 'Supervised empirical research in transportation, urban transit, maritime logistics, or supply chain optimization with dissertation and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Logistics Dissertation & Defense', subtopics: ['Field Data Collection & Traffic/Logistics Modeling', 'Empirical Analysis and Policy Recommendations', 'Final Oral Examination'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // AGRICULTURAL SCIENCE
  if (subjStr.includes('agric')) {
    return {
      subject,
      faculty: 'Faculty of Agricultural Sciences',
      department: 'Department of Agricultural Economics & Extension / Crop Science / Animal Science',
      degreeName: 'B.Agric. (Bachelor of Agriculture - 5-Year NUC Standard Program)',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'AGR 101',
                title: 'Introduction to Agriculture I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Faculty of Agriculture',
                description: 'Importance of agriculture in national economy, history of agricultural development in Nigeria, farming systems (shifting cultivation, agroforestry, intensive cropping), and land tenure systems.',
                modules: [{ moduleNumber: 1, title: 'Agricultural Overview & Land Tenure', subtopics: ['Agriculture and Nigerian Economic Growth', 'Traditional vs. Modern Farming Systems', 'Land Tenure Systems and Agricultural Policy in Nigeria'] }]
              },
              {
                code: 'BIO 101',
                title: 'General Biology I (Botany & Genetics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Biological Sciences',
                description: 'Plant cells, photosynthesis, and genetics.',
                modules: [{ moduleNumber: 1, title: 'Plant Biology', subtopics: ['Plant Anatomy & Physiology'] }]
              },
              {
                code: 'CHM 101',
                title: 'General Chemistry I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Chemistry',
                description: 'Inorganic and physical chemistry.',
                modules: [{ moduleNumber: 1, title: 'Inorganic Chemistry', subtopics: ['Stoichiometry & Chemical Bonding'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'AGR 102',
                title: 'Introduction to Agriculture II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Faculty of Agriculture',
                description: 'Overview of crop production, animal husbandry, soil science, forestry, wildlife, fisheries, and agricultural economics.',
                modules: [{ moduleNumber: 1, title: 'Sub-disciplines of Agriculture', subtopics: ['Principles of Crop and Livestock Management', 'Introduction to Soil Classification & Farm Machinery'] }]
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
                code: 'CRP 201',
                title: 'Principles of Crop Production I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Crop Science',
                description: 'Crop ecology, seedbed preparation, planting methods, weed control, fertilizer application, crop rotation, and harvesting techniques.',
                modules: [{ moduleNumber: 1, title: 'Agronomic Practices', subtopics: ['Climatic and Soil Factors in Crop Growth', 'Propagation Methods: Sexual vs. Asexual', 'Weed Science & Integrated Weed Management'] }]
              },
              {
                code: 'ANS 201',
                title: 'Principles of Animal Production I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Animal Science',
                description: 'Breeds and management of farm animals (cattle, sheep, goats, poultry, pigs, rabbits), housing, and digestive physiology.',
                modules: [{ moduleNumber: 1, title: 'Livestock Management', subtopics: ['Breeds of Farm Livestock in Nigeria', 'Monogastric vs. Ruminant Digestive Physiology', 'Poultry and Swine Housing and Bio-Security'] }]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'SOS 202',
                title: 'Introduction to Soil Science',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Soil Science',
                description: 'Soil formation (pedogenesis), physical properties (texture, structure, bulk density), chemical properties (pH, CEC), and soil water relations.',
                modules: [{ moduleNumber: 1, title: 'Soil Physics & Chemistry', subtopics: ['Weathering of Rocks and Soil Profile Horizons', 'Soil Texture, Textural Triangle & Soil Moisture', 'Cation Exchange Capacity (CEC) & Soil Acidity Management'] }]
              }
            ])
          }
        },
        '300 Level': {
          levelName: '300 Level (Year 3 / Pre-Practical Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'AEC 301',
                title: 'Principles of Agricultural Economics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Agricultural Economics',
                description: 'Production economics, law of diminishing returns in agriculture, farm cost concepts, agricultural price analysis, and farm planning.',
                modules: [
                  { moduleNumber: 1, title: 'Agricultural Production Economics', subtopics: ['Factor-Product, Factor-Factor & Product-Product Relationships', 'Farm Budgeting (Complete Budget, Partial Budget, Gross Margin)', 'Risk and Uncertainty in Tropical Farming Enterprises'] }
                ]
              },
              {
                code: 'AEX 301',
                title: 'Agricultural Extension & Rural Sociology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Agricultural Extension',
                description: 'Agricultural extension concepts, diffusion of agricultural innovations, adoption process, extension teaching methods (FADAMA model), and rural social institutions.',
                modules: [
                  { moduleNumber: 1, title: 'Extension & Innovation Adoption', subtopics: ['Adoption Categories (Innovators to Laggards)', 'Individual, Group and Mass Extension Methods', 'Gender and Youth Participation in Agricultural Development'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'CRP 302',
                title: 'Crop Protection & Entomology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Crop Science',
                description: 'Pests of arable and tree crops, plant pathology (fungal, bacterial, viral diseases), and Integrated Pest Management (IPM).',
                modules: [
                  { moduleNumber: 1, title: 'Pests and Disease Management', subtopics: ['Major Field and Storage Pests of Cereals and Tubers', 'Cassava Mosaic, Cocoa Black Pod & Blast Diseases', 'Integrated Pest Management (Biological, Cultural, Chemical Controls)'] }
                ]
              }
            ])
          }
        },
        '400 Level': {
          levelName: '400 Level (Year 4 / Farm Practical Year - FPY)',
          semesters: {
            'First Semester': createSemester('Farm Practical Year (Harmattan Semester)', [
              {
                code: 'FPY 401',
                title: 'Farm Practical Year (Crop, Livestock & Farm Management Practicum)',
                units: 15,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Faculty of Agriculture',
                description: 'Full-time year-round practical farming. Students cultivate commercial plots of arable crops (maize, cassava, vegetables), manage poultry/swine/fishery units, operate tractors and agricultural implements, and maintain farm records.',
                modules: [
                  { moduleNumber: 1, title: 'Crop Production Practicum', subtopics: ['Land Clearing, Tillage & Planting of Arable Crops', 'Fertilizer Application, Weeding & Irrigation Management', 'Harvesting, Post-Harvest Processing & Market Sales'] },
                  { moduleNumber: 2, title: 'Livestock & Fishery Management Practicum', subtopics: ['Broiler and Layer Bird Feeding and Medication Protocols', 'Swine and Small Ruminant Husbandry Operations', 'Catfish Pond Management, Fingerling Stocking & Feed Formulation'] },
                  { moduleNumber: 3, title: 'Farm Mechanics & Accounting Practicum', subtopics: ['Tractor Driving, Implement Hitching and Maintenance', 'Daily Farm Record Keeping, Gross Margin and Enterprise Accounting'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Farm Practical Year (Rain Semester)', [
              {
                code: 'FPY 402',
                title: 'Farm Practical Year Project & Extension Fieldwork',
                units: 15,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Faculty of Agriculture',
                description: 'Rural village extension practicum, community farmer surveys, farm enterprise defense, and comprehensive farm logbook evaluation.',
                modules: [
                  { moduleNumber: 1, title: 'Rural Extension Immersion', subtopics: ['Farmer Group Engagement and Technology Demonstration', 'Enterprise Profitability Audit and Logbook Defense'] }
                ]
              }
            ])
          }
        },
        '500 Level': {
          levelName: '500 Level (Year 5 / Final Professional Year)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'AGR 501',
                title: 'Advanced Agricultural Policy, Project Planning & Agribusiness',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Agricultural Economics',
                description: 'National agricultural policies, agricultural credit schemes (NIRSAL, Anchor Borrowers Programme), agribusiness value chains, and project appraisal (BCR, IRR).',
                modules: [
                  { moduleNumber: 1, title: 'Agribusiness Policy & Project Appraisal', subtopics: ['Project Appraisal Metrics (Benefit-Cost Ratio, Net Present Value)', 'Value Chain Development in Cassava, Cocoa, Oil Palm & Rice', 'Agricultural Credit Risk and Micro-Insurance Instruments'] }
                ]
              },
              {
                code: 'CRP 501',
                title: 'Advanced Seed Science, Breeding & Biotechnology',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Department of Crop Science',
                description: 'Plant breeding methods (mass selection, pedigree, hybrid vigor), seed certification and testing (NASC regulations), and genetically modified crops.',
                modules: [
                  { moduleNumber: 1, title: 'Crop Breeding and Biotechnology', subtopics: ['Heterosis and Hybrid Seed Production Techniques', 'National Agricultural Seeds Council (NASC) Protocols', 'Genetic Engineering & Biofortified Crops (Vitamin A Cassava)'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'AGR 599',
                title: 'Final Year Agricultural Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Agriculture',
                department: 'Faculty of Agriculture',
                description: 'Supervised experimental field/laboratory or socio-economic research in agriculture with comprehensive dissertation and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Agricultural Dissertation & Defense', subtopics: ['Field Trial Experimental Design (RCBD, Split-Plot)', 'Statistical Data Analysis with SAS/R/SPSS', 'Final Thesis Writing & External Examination Defense'] }
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
