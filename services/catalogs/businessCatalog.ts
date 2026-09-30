import { Subject } from '../../types';
import { UniversityCourse, UniversitySubjectCatalog, SemesterCourses } from '../universityCourseService';
import { GST_111, GST_112, GST_121, GST_211, GST_222, GST_311, GST_322 } from './generalStudies';

const createSemester = (semesterName: string, courses: UniversityCourse[]): SemesterCourses => ({
  semesterName,
  totalUnits: courses.reduce((acc, c) => acc + c.units, 0),
  courses
});

export const getBusinessCatalog = (subject: Subject): UniversitySubjectCatalog | null => {
  const subjStr = (subject || '').toString().toLowerCase();

  // ECONOMICS & ECONOMICS EDUCATION
  if (!subjStr.includes('home') && subjStr.includes('econ')) {
    const isEducation = subjStr.includes('educ');
    return {
      subject,
      faculty: isEducation ? 'Faculty of Education' : 'Faculty of Management & Social Sciences',
      department: isEducation ? 'Department of Educational Management (Economics Option)' : 'Department of Economics',
      degreeName: isEducation ? 'B.Sc. (Ed.) Economics Education' : 'B.Sc. (Hons) Economics',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'ECO 101',
                title: 'Principles of Economics I (Microeconomics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Nature and scope of economics, scarcity, choice, opportunity cost, production possibility curve, demand and supply, price elasticity, consumer behavior (cardinal and ordinal utility), and cost curves.',
                modules: [
                  { moduleNumber: 1, title: 'Price Theory & Market Equilibrium', subtopics: ['Fundamental Economic Concepts & Scarcity', 'Laws of Demand and Supply & Equilibrium Price', 'Price, Income and Cross Elasticities of Demand', 'Government Price Controls (Price Ceilings and Price Floors)'] },
                  { moduleNumber: 2, title: 'Consumer Behavior and Production', subtopics: ['Cardinal Utility & Diminishing Marginal Utility', 'Ordinal Utility (Indifference Curves, Budget Constraints)', 'Short-run and Long-run Production Functions & Diminishing Returns', 'Cost Concepts: Total, Marginal, Average Cost Curves'] }
                ]
              },
              {
                code: 'ACC 101',
                title: 'Introduction to Financial Accounting I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Accounting concepts and conventions, double-entry bookkeeping, ledger accounts, trial balance, and trading/profit and loss accounts.',
                modules: [{ moduleNumber: 1, title: 'Bookkeeping Fundamentals', subtopics: ['Double-Entry Principle & Books of Prime Entry', 'Trial Balance Preparation & Suspense Accounts'] }]
              },
              {
                code: 'BUS 101',
                title: 'Introduction to Business Administration I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Nature of business, types of business ownership (sole proprietorship, partnership, limited liability), and functional areas of enterprise.',
                modules: [{ moduleNumber: 1, title: 'Business Structure', subtopics: ['Forms of Business Enterprises', 'Management Functions & Business Ethics'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ECO 102',
                title: 'Principles of Economics II (Macroeconomics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Circular flow of national income, GDP, GNP, NNI measurement, aggregate demand and supply, classical vs. Keynesian models, inflation, unemployment, money and banking, and fiscal policy.',
                modules: [
                  { moduleNumber: 1, title: 'National Income and Aggregate Output', subtopics: ['Circular Flow of Income in 2, 3, and 4-Sector Economies', 'Measurement of GDP, GNP, Real vs. Nominal Output', 'Consumption Function, Multiplier Effect & Marginal Propensity to Consume (MPC)'] },
                  { moduleNumber: 2, title: 'Macroeconomic Instability & Policy', subtopics: ['Types and Causes of Inflation (Demand-Pull, Cost-Push)', 'Unemployment Types (Frictional, Structural, Cyclical) & Okun’s Law', 'Monetary vs. Fiscal Policy Tools in Economic Stabilization'] }
                ]
              },
              {
                code: 'MTH 105',
                title: 'Mathematics for Social Scientists I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Science',
                department: 'Department of Mathematics',
                description: 'Set theory, matrix algebra, linear equations, coordinate geometry, and basic derivatives applied to economic optimization.',
                modules: [{ moduleNumber: 1, title: 'Mathematical Economics Tools', subtopics: ['Matrix Algebra & Cramer’s Rule', 'Marginal Functions & Profit Maximization'] }]
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
                code: 'ECO 201',
                title: 'Microeconomic Theory I (Intermediate Microeconomics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Axiomatic preference theory, Slutsky equation (income and substitution effects), Cobb-Douglas and CES production functions, isoquants, profit maximization, and cost minimization.',
                modules: [
                  { moduleNumber: 1, title: 'Advanced Consumer & Producer Theory', subtopics: ['Compensated vs. Uncompensated Demand (Hicks vs. Marshall)', 'Slutsky Decomposition of Price Changes', 'Isoquants, Isocost Lines & Expansion Paths in Long Run', 'Returns to Scale and Euler’s Theorem of Distribution'] }
                ]
              },
              {
                code: 'ECO 203',
                title: 'Mathematics for Economists I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Multivariable calculus, partial derivatives, Lagrange multipliers for constrained optimization, input-output analysis (Leontief model), and differential equations.',
                modules: [
                  { moduleNumber: 1, title: 'Optimization Techniques in Economics', subtopics: ['Hessian Matrices & Second-Order Conditions', 'Lagrange Multiplier in Utility and Cost Optimization', 'Leontief Static Input-Output Model & Open Systems'] }
                ]
              },
              {
                code: 'ECO 205',
                title: 'Structure of the Nigerian Economy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Historical overview of Nigeria’s economic growth, agricultural sector, oil and gas sector, industrialization policies (ISI, SAP), banking reforms, and debt profile.',
                modules: [
                  { moduleNumber: 1, title: 'Nigerian Economic Architecture', subtopics: ['Agrarian Economy to Petroleum Dominance Transition', 'Structural Adjustment Programme (SAP) & Diversification Efforts', 'Petroleum Subsidies, Exchange Rate Dynamics & Inflation in Nigeria'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ECO 202',
                title: 'Macroeconomic Theory I (Intermediate Macroeconomics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'IS-LM model in closed economy, goods market and money market equilibrium, fiscal and monetary multipliers, aggregate demand derivation, and Phillips curve.',
                modules: [
                  { moduleNumber: 1, title: 'The IS-LM Framework & Policy', subtopics: ['Derivation and Shifts of IS and LM Curves', 'Monetary and Fiscal Policy Effectiveness (Liquidity Trap, Crowding Out)', 'Short-Run and Long-Run Phillips Curve (Inflation-Unemployment Tradeoff)'] }
                ]
              },
              {
                code: 'ECO 204',
                title: 'Statistics for Economists I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Probability distributions (Binomial, Poisson, Normal), sampling theory, hypothesis testing (Z-test, t-test, Chi-square, F-test), and index numbers.',
                modules: [
                  { moduleNumber: 1, title: 'Statistical Inference in Economics', subtopics: ['Sampling Distributions & Central Limit Theorem', 'Confidence Intervals and Null Hypothesis Significance Testing', 'Consumer Price Index (CPI) and Inflation Measurement'] }
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
                code: 'ECO 301',
                title: 'Econometrics I (Introductory Econometrics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Classical linear regression model (CLRM), Ordinary Least Squares (OLS) assumptions, Gauss-Markov theorem, R-squared, hypothesis testing of regression coefficients, and multiple regression.',
                modules: [
                  { moduleNumber: 1, title: 'OLS Regression and Properties', subtopics: ['Derivation of OLS Estimators & BLUE Properties', 'Goodness of Fit (R² and Adjusted R²)', 't-Tests and F-Tests in Multiple Regression Models', 'Violations of Assumptions: Multicollinearity Diagnostics'] }
                ]
              },
              {
                code: 'ECO 303',
                title: 'Public Sector Economics & Fiscal Policy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Role of government in the economy, market failure, public goods, externalities, taxation principles, tax incidence, deadweight loss, and public debt management.',
                modules: [
                  { moduleNumber: 1, title: 'Market Failure and Taxation', subtopics: ['Public Goods vs. Common Resources (Free Rider Problem)', 'Positive and Negative Externalities & Pigouvian Taxes', 'Direct vs. Indirect Taxation, Progressive Tax Systems & Fiscal Federalism in Nigeria'] }
                ]
              },
              {
                code: 'ECO 305',
                title: 'Development Economics & Growth Models',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Theories of economic growth (Harrod-Domar, Solow-Swan, Rostow’s stages of growth), poverty, income inequality (Gini coefficient, Lorenz curve), and sustainable development goals.',
                modules: [
                  { moduleNumber: 1, title: 'Theories of Economic Growth', subtopics: ['Harrod-Domar Growth Model & Capital-Output Ratio', 'Solow Neoclassical Growth Model & Steady State', 'Inequality Measurement: Lorenz Curve & Gini Index', 'Human Development Index (HDI) & Multidimensional Poverty'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ECO 302',
                title: 'Econometrics II (Advanced Econometrics & Time Series)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Heteroskedasticity (Breusch-Pagan, White test), Autocorrelation (Durbin-Watson), model specification errors, dummy variables, and introduction to stationary time series (ADF test).',
                modules: [
                  { moduleNumber: 1, title: 'Econometric Diagnostics & Time Series', subtopics: ['Detecting and Remedying Heteroskedasticity (WLS)', 'Autocorrelation in Time Series Data & Newey-West', 'Stationarity, Unit Roots (Augmented Dickey-Fuller) & Cointegration Basics'] }
                ]
              },
              {
                code: 'ECO 304',
                title: 'Monetary Economics & Financial Markets',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Demand for money (Classical, Keynesian liquidity preference, Friedman’s restatement), money supply process, Central Bank of Nigeria (CBN) monetary policy transmission, and banking regulation.',
                modules: [
                  { moduleNumber: 1, title: 'Money Demand & Central Banking', subtopics: ['Theories of Money Demand & Velocity of Money', 'Money Multiplier, High-Powered Money & Fractional Reserve Banking', 'CBN Monetary Policy Rate (MPR), Cash Reserve Ratio (CRR) & Open Market Operations (OMO)'] }
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
                code: 'ECO 401',
                title: 'Advanced Microeconomics & Game Theory',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'General equilibrium theory, Pareto optimality, Welfare economics (First and Second Fundamental Theorems), Game theory (Nash equilibrium, Prisoner’s Dilemma), and asymmetric information (Moral hazard, Adverse selection).',
                modules: [
                  { moduleNumber: 1, title: 'Welfare Economics & Game Theory', subtopics: ['Edgeworth Box, Contract Curve & Pareto Efficiency', 'Strategic Normal Form & Extensive Form Games', 'Nash Equilibrium & Subgame Perfect Equilibrium', 'Information Asymmetry: Signalling and Screening Models'] }
                ]
              },
              {
                code: 'ECO 403',
                title: 'International Trade and Finance',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Classical trade theories (Ricardian comparative advantage, Heckscher-Ohlin theorem), tariffs, quotas, balance of payments, foreign exchange rate systems, and WTO/AfCFTA protocols.',
                modules: [
                  { moduleNumber: 1, title: 'Trade Theory and Balance of Payments', subtopics: ['Comparative Advantage & Factor Price Equalization', 'Tariffs vs. Quotas: Welfare Effects of Protectionism', 'Balance of Payments Accounting & Current Account Deficits', 'AfCFTA (African Continental Free Trade Area) & Regional Integration'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ECO 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Original independent empirical research in economics using statistical/econometric modeling (EViews, Stata, R, Python) with written dissertation and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Empirical Research & Defense', subtopics: ['Econometric Model Specification & Data Sourcing (CBN / World Bank)', 'Empirical Estimation, Diagnostics & Hypothesis Testing', 'Dissertation Manuscript Writing & Oral Defense'] }
                ]
              },
              {
                code: 'ECO 402',
                title: 'Advanced Macroeconomic Analysis',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Open economy macroeconomics (Mundell-Fleming model), dynamic stochastic general equilibrium (DSGE) basics, rational expectations hypothesis, and sovereign debt crises.',
                modules: [
                  { moduleNumber: 1, title: 'Open Economy & Expectations', subtopics: ['Mundell-Fleming Model under Fixed vs. Floating Exchange Rates', 'Lucas Critique and Rational Expectations Revolution', 'Fiscal Deficits, Monetization and Hyperinflation Dynamics'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // ACCOUNTING & MANAGEMENT ACCOUNTING
  if (subjStr.includes('acc')) {
    return {
      subject,
      faculty: 'Faculty of Management Sciences',
      department: 'Department of Accounting',
      degreeName: 'B.Sc. (Hons) Accounting',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'ACC 101',
                title: 'Principles of Accounting I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'History and evolution of accounting, regulatory framework (ICAN, ANAN, IFRS), double-entry system, journals, ledger posting, trial balance, and financial statements of sole proprietors.',
                modules: [
                  { moduleNumber: 1, title: 'Double Entry & Financial Statements', subtopics: ['Accounting Principles, Concepts and Conventions', 'Books of Prime Entry (Sales, Purchases, Cash Book, General Journal)', 'Trial Balance, Correction of Errors & Suspense Account', 'Statement of Profit or Loss and Financial Position for Sole Traders'] }
                ]
              },
              {
                code: 'BUS 101',
                title: 'Introduction to Business I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Foundations of business enterprises and corporate structures.',
                modules: [{ moduleNumber: 1, title: 'Business Environment', subtopics: ['Forms of Business Ownership & Corporate Governance'] }]
              },
              {
                code: 'ECO 101',
                title: 'Principles of Economics I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Microeconomics principles.',
                modules: [{ moduleNumber: 1, title: 'Price Theory', subtopics: ['Demand, Supply & Market Equilibrium'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ACC 102',
                title: 'Principles of Accounting II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Partnership accounts (admission, retirement, dissolution, goodwill), manufacturing accounts, incomplete records, and non-profit organizations accounting.',
                modules: [
                  { moduleNumber: 1, title: 'Partnerships and Specialized Accounts', subtopics: ['Partnership Profit Sharing, Capital and Current Accounts', 'Admission and Retirement of Partners & Goodwill Valuation', 'Manufacturing Accounts (Prime Cost, Factory Overheads, WIP)', 'Accounts of Clubs, Societies and Non-Profit Entities'] }
                ]
              },
              {
                code: 'ECO 102',
                title: 'Principles of Economics II',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Macroeconomics principles.',
                modules: [{ moduleNumber: 1, title: 'Macroeconomic Aggregates', subtopics: ['National Income & Fiscal Policy'] }]
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
                code: 'ACC 201',
                title: 'Financial Accounting I (Intermediate Financial Accounting)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Company accounts, issue of shares and debentures, redemption of preference shares, published financial statements according to IAS 1 and IAS 7 (Statement of Cash Flows).',
                modules: [
                  { moduleNumber: 1, title: 'Corporate Financial Reporting & IAS', subtopics: ['Accounting for Share Capital, Rights Issues & Bonus Shares', 'Debenture Issue and Amortization Schedules', 'IAS 1 Presentation of Financial Statements', 'IAS 7 Statement of Cash Flows (Direct vs. Indirect Methods)'] }
                ]
              },
              {
                code: 'ACC 203',
                title: 'Cost Accounting I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Cost classification, material costing (FIFO, LIFO, Weighted Average, EOQ), labor costing (incentive schemes), overhead allocation, apportionment, and absorption costing.',
                modules: [
                  { moduleNumber: 1, title: 'Elements of Cost & Cost Allocation', subtopics: ['Cost Classification (Fixed, Variable, Semi-Variable, Direct/Indirect)', 'Inventory Valuation: FIFO, LIFO, Weighted Average & EOQ Formula', 'Labor Remuneration Schemes & Idle Time Accounting', 'Overhead Allocation, Apportionment and Absorption Rates (OAR)'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ACC 202',
                title: 'Financial Accounting II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Accounting for leases (IFRS 16), revenue recognition (IFRS 15), provisions, contingent liabilities (IAS 37), and accounting for branches and departments.',
                modules: [
                  { moduleNumber: 1, title: 'IFRS Standards & Branch Accounts', subtopics: ['IFRS 15: 5-Step Model of Revenue Recognition', 'IFRS 16: Lease Liability & Right-of-Use Asset Accounting', 'IAS 37 Provisions and Contingent Assets/Liabilities', 'Autonomous vs. Non-Autonomous Branch Accounting'] }
                ]
              },
              {
                code: 'ACC 204',
                title: 'Cost Accounting II & Costing Methods',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Job costing, batch costing, contract costing, process costing (equivalent units, normal/abnormal losses), and marginal costing vs. absorption costing.',
                modules: [
                  { moduleNumber: 1, title: 'Specific Order & Process Costing', subtopics: ['Job and Batch Costing Procedures', 'Contract Costing: Retention Money, Architect’s Certificate & Profit Recognition', 'Process Costing: Equivalent Units of Production and Joint/By-Product Costing', 'Marginal Costing vs. Absorption Costing Reconciliation'] }
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
                code: 'ACC 301',
                title: 'Management Accounting I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Cost-Volume-Profit (CVP) analysis, break-even charts, limiting factor analysis, budgetary control, functional budgets, and master budget preparation.',
                modules: [
                  { moduleNumber: 1, title: 'CVP Analysis and Master Budgets', subtopics: ['Multi-Product Break-Even Point & Margin of Safety', 'Key / Limiting Factor Decision Making (Optimal Production Mix)', 'Preparation of Cash Budgets, Operating Budgets & Master Budget', 'Fixed vs. Flexible Budgeting & Variance Analysis Foundations'] }
                ]
              },
              {
                code: 'ACC 303',
                title: 'Auditing and Assurance Services I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Nature and purpose of audit, ISA standards, statutory duties of auditors (CAMA 2020), audit planning, risk assessment, internal controls, and audit evidence.',
                modules: [
                  { moduleNumber: 1, title: 'Audit Framework and Risk Assessment', subtopics: ['External vs. Internal Audit & Professional Ethics (IFAC Code)', 'Auditor Appointment, Rights and Duties under CAMA 2020', 'Audit Risk Model (Inherent Risk, Control Risk, Detection Risk)', 'Internal Control Evaluation & System Flowcharts'] }
                ]
              },
              {
                code: 'ACC 305',
                title: 'Taxation I (Personal Income Tax & CIT Basics)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Nigerian tax system, Personal Income Tax Act (PITA), PAYE computation, allowable and non-allowable deductions, capital allowances, and tax administration.',
                modules: [
                  { moduleNumber: 1, title: 'Personal Income Tax & Computation', subtopics: ['Tax Authorities in Nigeria (FIRS, SIRS, JTB)', 'Determination of Residence & Chargeable Income', 'Consolidated Relief Allowance (CRA) & PAYE Tax Bands', 'Capital Allowances (Initial, Annual, Balancing Adjustments)'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ACC 302',
                title: 'Corporate Financial Reporting I (Group Accounts)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Consolidated financial statements (IFRS 10, IAS 28), parent and subsidiary accounting, goodwill on consolidation, non-controlling interest (NCI), and intercompany eliminations.',
                modules: [
                  { moduleNumber: 1, title: 'Group Financial Statements', subtopics: ['IFRS 10: Definition of Control and Consolidation Scope', 'Calculation of Goodwill on Acquisition (Full vs. Proportionate)', 'Consolidated Statement of Financial Position & NCI', 'Consolidated Statement of Profit or Loss & Unrealized Profit in Inventory'] }
                ]
              },
              {
                code: 'ACC 304',
                title: 'Public Sector Accounting & IPSAS',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Constitutional framework of public finance, Consolidated Revenue Fund, Federation Account, IPSAS (Cash & Accrual basis), and government budgeting systems (PPBS, ZBB).',
                modules: [
                  { moduleNumber: 1, title: 'Government Accounting Framework', subtopics: ['Constitutional and Legal Provisions of Nigerian Public Funds', 'Treasury Single Account (TSA) & GIFMIS System Operations', 'IPSAS Accrual Financial Statements Preparation for Public Entities'] }
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
                code: 'ACC 401',
                title: 'Advanced Financial Accounting & IFRS Standards',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Financial instruments (IFRS 9), foreign currency translation (IAS 21), segment reporting (IFRS 8), and corporate restructuring (mergers, acquisitions, reconstructions).',
                modules: [
                  { moduleNumber: 1, title: 'Complex Reporting & Restructuring', subtopics: ['IFRS 9 Classification & Impairment (Expected Credit Loss Model)', 'Foreign Operations Translation & Exchange Differences (IAS 21)', 'Capital Reduction Schemes & Internal/External Reconstructions'] }
                ]
              },
              {
                code: 'ACC 403',
                title: 'Advanced Management Accounting & Performance Evaluation',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Activity-Based Costing (ABC), Target Costing, Life-Cycle Costing, Balanced Scorecard, Transfer Pricing, and Standard Costing Advanced Variances (Mix and Yield).',
                modules: [
                  { moduleNumber: 1, title: 'Strategic Cost Management', subtopics: ['Activity-Based Costing vs. Traditional Absorption Costing', 'Transfer Pricing Methods & Sub-Optimization Prevention', 'Balanced Scorecard (Financial, Customer, Internal, Learning Perspectives)', 'Advanced Material and Labor Mix/Yield Variance Calculations'] }
                ]
              },
              {
                code: 'ACC 405',
                title: 'Taxation II (Company Income Tax, VAT & International Tax)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Companies Income Tax Act (CITA), Value Added Tax (VAT), Tertiary Education Tax, Withholding Tax, Pioneer Status, Double Taxation Agreements, and Transfer Pricing.',
                modules: [
                  { moduleNumber: 1, title: 'Corporate Taxation & Tax Planning', subtopics: ['Computation of Assessable and Total Profits for Companies', 'Minimum Tax Rules & Tertiary Education Tax (EDT) Calculations', 'VAT Invoicing, Output/Input VAT & Exempt vs. Zero-Rated Goods', 'Tax Planning vs. Tax Avoidance vs. Tax Evasion & ICAN Standards'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'ACC 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Supervised empirical research in corporate financial reporting, forensic accounting, auditing, taxation, or sustainability accounting with thesis and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Accounting Dissertation & Defense', subtopics: ['Empirical Methodology (Panel Data / Content Analysis / Survey)', 'Statistical Hypothesis Testing (Regression, Correlation)', 'Final Dissertation Preparation & Oral Examination'] }
                ]
              },
              {
                code: 'ACC 402',
                title: 'Forensic Accounting & Fraud Auditing',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Fraud triangle, forensic investigation techniques, digital forensics, litigation support, asset tracing, and anti-money laundering regulations (EFCC/ICPC laws).',
                modules: [
                  { moduleNumber: 1, title: 'Forensic Investigation & Evidence', subtopics: ['Fraud Schemes (Asset Misappropriation, Corruption, Financial Statement Fraud)', 'Evidence Gathering, Chain of Custody & Expert Witness Testimony', 'Forensic Data Analytics & Anti-Money Laundering (AML) Compliance'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // BANKING AND FINANCE
  if (subjStr.includes('bank') || subjStr.includes('finan')) {
    return {
      subject,
      faculty: 'Faculty of Management Sciences',
      department: 'Department of Banking and Finance',
      degreeName: 'B.Sc. (Hons) Banking and Finance',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BFN 101',
                title: 'Introduction to Finance I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Nature and scope of finance, financial systems, financial institutions, money markets, and capital markets.',
                modules: [{ moduleNumber: 1, title: 'Financial System Overview', subtopics: ['Functions of Financial System & Money Markets', 'Role of Commercial and Development Banks'] }]
              },
              {
                code: 'ECO 101',
                title: 'Principles of Economics I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Microeconomics.',
                modules: [{ moduleNumber: 1, title: 'Price Theory', subtopics: ['Demand & Supply Equilibrium'] }]
              },
              {
                code: 'ACC 101',
                title: 'Principles of Accounting I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Financial accounting.',
                modules: [{ moduleNumber: 1, title: 'Bookkeeping', subtopics: ['Double Entry & Trial Balance'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BFN 102',
                title: 'Introduction to Finance II (Money & Banking)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Evolution of money, credit creation, central banking, and monetary management.',
                modules: [{ moduleNumber: 1, title: 'Banking Operations', subtopics: ['Commercial Bank Credit Creation & Central Bank Roles'] }]
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
                code: 'BFN 201',
                title: 'Corporate Finance I (Business Finance)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Time value of money (present value, future value, annuities), capital budgeting techniques (NPV, IRR, Payback), and working capital management.',
                modules: [
                  { moduleNumber: 1, title: 'Time Value & Capital Budgeting', subtopics: ['Compounding, Discounting & Annuity Calculations', 'NPV vs. IRR Decisions & Profitability Index', 'Working Capital Cycle & Cash/Inventory Optimization'] }
                ]
              },
              {
                code: 'BFN 203',
                title: 'Banking Laws and Regulations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'BOFIA Act, CBN Act, NDIC Act, banker-customer relationship, negotiable instruments, and banking ethics (CIBN Code of Conduct).',
                modules: [
                  { moduleNumber: 1, title: 'Legal & Regulatory Framework', subtopics: ['Banker-Customer Rights, Duties and Fiduciary Liabilities', 'Cheques, Promissory Notes and Bills of Exchange Law', 'BOFIA and NDIC Deposit Insurance Framework'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BFN 202',
                title: 'Financial Markets and Institutions',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Nigerian Exchange Group (NGX), Securities and Exchange Commission (SEC), treasury bills, bonds, commercial papers, and mutual funds.',
                modules: [
                  { moduleNumber: 1, title: 'Capital & Money Markets', subtopics: ['Primary vs. Secondary Capital Market Operations', 'Securities Issuance, Underwriting & Stockbroking', 'Treasury Bill Auctions and Open Market Operations'] }
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
                code: 'BFN 301',
                title: 'Financial Management I (Advanced Corporate Finance)',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Cost of capital (WACC, CAPM), capital structure theories (Modigliani-Miller, Trade-off, Pecking order), and dividend policy theories.',
                modules: [
                  { moduleNumber: 1, title: 'Cost of Capital & Capital Structure', subtopics: ['Weighted Average Cost of Capital (WACC) Computations', 'Modigliani-Miller Propositions with and without Taxes', 'Dividend Irrelevance vs. Bird-in-the-Hand Theory'] }
                ]
              },
              {
                code: 'BFN 303',
                title: 'Bank Lending and Credit Administration',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Credit appraisal techniques (5 Cs of credit), loan documentation, collateral valuation, non-performing loans (NPLs), and AMCON debt resolution.',
                modules: [
                  { moduleNumber: 1, title: 'Credit Risk Analysis', subtopics: ['5 Cs of Credit: Character, Capacity, Capital, Collateral, Conditions', 'Credit Bureau Reports and Loan Syndication', 'Management of Non-Performing Loans & Debt Recovery Protocols'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BFN 302',
                title: 'Investment Analysis & Portfolio Management',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Markowitz modern portfolio theory, Capital Asset Pricing Model (CAPM), security valuation (Dividend discount model, P/E ratio), and Sharpe/Treynor performance metrics.',
                modules: [
                  { moduleNumber: 1, title: 'Portfolio Theory & Asset Pricing', subtopics: ['Risk and Return of 2-Asset and N-Asset Portfolios', 'Efficient Frontier, Indifference Curves & Capital Allocation Line', 'Security Market Line (SML) & Beta Estimation', 'Portfolio Performance: Sharpe, Treynor and Jensen’s Alpha'] }
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
                code: 'BFN 401',
                title: 'International Finance & Foreign Exchange Operations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Foreign exchange market mechanisms, Purchasing Power Parity (PPP), Interest Rate Parity (IRP), currency derivatives (forwards, futures, options, swaps), and country risk analysis.',
                modules: [
                  { moduleNumber: 1, title: 'Foreign Exchange & Hedging', subtopics: ['Spot vs. Forward Forex Market Mechanisms', 'Covered and Uncovered Interest Rate Parity', 'Hedging Foreign Exchange Risk with Currency Futures and Options', 'Eurocurrency Markets and International Capital Flows'] }
                ]
              },
              {
                code: 'BFN 403',
                title: 'Financial Risk Management & Fintech Operations',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Credit risk, market risk, liquidity risk, operational risk, Basel III capital adequacy accords, mobile banking, blockchain, and digital payment ecosystems.',
                modules: [
                  { moduleNumber: 1, title: 'Risk Governance & Digital Finance', subtopics: ['Value at Risk (VaR) Calculation Techniques', 'Basel II/III Capital Adequacy Framework & Stress Testing', 'Fintech Innovations: Open Banking, USSD, Blockchain & CBDC (eNaira)'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BFN 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Banking and Finance',
                description: 'Original independent empirical research in corporate finance, financial markets, banking operations, or fintech, with thesis and oral defense.',
                modules: [
                  { moduleNumber: 1, title: 'Finance Dissertation & Defense', subtopics: ['Financial Econometric Analysis (Regression, Time Series)', 'Empirical Findings & Policy Recommendations', 'Final Oral Thesis Defense'] }
                ]
              }
            ])
          }
        }
      }
    };
  }

  // BUSINESS ADMINISTRATION / MARKETING / COMMERCE / BUSINESS EDUCATION
  if (subjStr.includes('bus') || subjStr.includes('mark') || subjStr.includes('comm')) {
    const isEducation = subjStr.includes('educ');
    return {
      subject,
      faculty: isEducation ? 'Faculty of Education' : 'Faculty of Management Sciences',
      department: isEducation ? 'Department of Vocational & Technical Education (Business Option)' : 'Department of Business Administration',
      degreeName: isEducation ? 'B.Sc. (Ed.) Business Education' : 'B.Sc. (Hons) Business Administration / Marketing',
      levels: {
        '100 Level': {
          levelName: '100 Level (Year 1 / Freshers)',
          semesters: {
            'First Semester': createSemester('First Semester (Harmattan / Alpha)', [
              {
                code: 'BUS 101',
                title: 'Introduction to Business Administration I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Concept of business, business environment in Nigeria, types of business organizations, social responsibilities of business, and managerial functions (Planning, Organizing, Leading, Controlling).',
                modules: [
                  { moduleNumber: 1, title: 'Foundations of Business Management', subtopics: ['Scope and Definition of Business & Economic Objectives', 'Internal and External Business Environments in Nigeria', 'Sole Proprietorships, Partnerships, Joint Stock Companies & Cooperatives', 'Classical and Contemporary Management Theories (Taylor, Fayol, Weber)'] }
                ]
              },
              {
                code: 'ECO 101',
                title: 'Principles of Economics I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Social Sciences',
                department: 'Department of Economics',
                description: 'Microeconomics.',
                modules: [{ moduleNumber: 1, title: 'Price Theory', subtopics: ['Demand & Supply Equilibrium'] }]
              },
              {
                code: 'ACC 101',
                title: 'Introduction to Financial Accounting I',
                units: 3,
                status: 'Required',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Accounting',
                description: 'Financial accounting fundamentals.',
                modules: [{ moduleNumber: 1, title: 'Bookkeeping', subtopics: ['Double Entry & Trial Balance'] }]
              },
              GST_111,
              GST_121
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BUS 102',
                title: 'Introduction to Business Administration II',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Functional business operations: production, human resources, marketing, finance, corporate culture, and business communications.',
                modules: [
                  { moduleNumber: 1, title: 'Functional Business Units', subtopics: ['Human Resource Lifecycle & Employee Motivation', 'Marketing Mix (4 Ps) & Customer Relationship Management', 'Financial Planning & Operational Budgeting Basics'] }
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
                code: 'BUS 201',
                title: 'Principles of Management I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Organizational structures, authority delegation, span of control, decision-making models, leadership styles, and organizational change.',
                modules: [
                  { moduleNumber: 1, title: 'Organizational Design & Leadership', subtopics: ['Departmentalization, Centralization vs. Decentralization', 'Rational Decision-Making & Bounded Rationality', 'Transformational vs. Transactional Leadership Styles'] }
                ]
              },
              {
                code: 'MKT 201',
                title: 'Principles of Marketing I',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Marketing',
                description: 'Marketing philosophy, market segmentation, targeting, positioning (STP), consumer buying behavior, and product life cycle (PLC).',
                modules: [
                  { moduleNumber: 1, title: 'Marketing Strategy & Consumer Behavior', subtopics: ['STP: Segmentation, Targeting and Positioning Framework', 'Factors Influencing Consumer Buying Decisions', 'Product Life Cycle Stages and Marketing Strategies'] }
                ]
              },
              GST_211,
              GST_222
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BUS 202',
                title: 'Organizational Behavior & Human Dynamics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Individual differences, personality traits, perception, job satisfaction, team dynamics, conflict resolution, and corporate culture.',
                modules: [
                  { moduleNumber: 1, title: 'Human Behavior in Organizations', subtopics: ['Personality Traits (Big Five) & Work Performance', 'Group Dynamics, Team Cohesiveness & Groupthink', 'Conflict Management Strategies in Corporate Settings'] }
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
                code: 'BUS 301',
                title: 'Operations Management & Production Planning',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Plant location and layout, aggregate planning, inventory management (JIT, EOQ), supply chain logistics, Total Quality Management (TQM), and Six Sigma.',
                modules: [
                  { moduleNumber: 1, title: 'Operations & Quality Management', subtopics: ['Facility Location & Layout Optimization Techniques', 'Just-In-Time (JIT) Manufacturing & Lean Systems', 'Total Quality Management (TQM) & Statistical Process Control'] }
                ]
              },
              {
                code: 'BUS 303',
                title: 'Human Resource Management',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Job analysis, recruitment and selection, performance appraisal (360-degree feedback), compensation management, and Nigerian trade union law.',
                modules: [
                  { moduleNumber: 1, title: 'Strategic HRM & Industrial Relations', subtopics: ['Job Descriptions, Specifications & Recruitment Channels', 'Performance Appraisal Systems & KPI Setting', 'Trade Unions, Collective Bargaining & Nigerian Labor Laws'] }
                ]
              },
              GST_311
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BUS 302',
                title: 'Business Research Methods & Statistical Analytics',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Research design, questionnaire design, sampling techniques (probability vs. non-probability), data collection, and statistical analysis with SPSS/Excel.',
                modules: [
                  { moduleNumber: 1, title: 'Research Design & Quantitative Analysis', subtopics: ['Formulating Research Questions and Hypotheses', 'Likert Scale Questionnaire Design & Cronbach’s Alpha Reliability', 'Multiple Regression and Hypothesis Testing in Business Data'] }
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
                code: 'BUS 401',
                title: 'Strategic Management & Business Policy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Strategic analysis (SWOT, PESTEL, Porter’s Five Forces), corporate, business and functional level strategies, strategy implementation, and corporate governance.',
                modules: [
                  { moduleNumber: 1, title: 'Strategic Formulation & Execution', subtopics: ['PESTEL & Porter’s Five Competitive Forces Analysis', 'Generic Business Strategies (Cost Leadership, Differentiation, Focus)', 'Mergers, Acquisitions and Strategic Alliances', 'Balanced Scorecard Strategy Execution and KPI Monitoring'] }
                ]
              },
              {
                code: 'BUS 403',
                title: 'International Business & Global Strategy',
                units: 3,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Multinational corporations (MNCs), entry modes into foreign markets (exporting, licensing, FDI), cultural diversity in global business, and international trade treaties.',
                modules: [
                  { moduleNumber: 1, title: 'Global Business Management', subtopics: ['Foreign Market Entry Strategies & Risk Assessment', 'Hofstede’s Cultural Dimensions in Multinational Management', 'Global Supply Chain Management and AfCFTA Trade Protocols'] }
                ]
              }
            ]),
            'Second Semester': createSemester('Second Semester (Rain / Omega)', [
              {
                code: 'BUS 499',
                title: 'Final Year Research Project and Dissertation',
                units: 6,
                status: 'Compulsory',
                faculty: 'Faculty of Management Sciences',
                department: 'Department of Business Administration',
                description: 'Supervised empirical business dissertation and oral presentation before the departmental examination panel.',
                modules: [
                  { moduleNumber: 1, title: 'Business Project & Oral Defense', subtopics: ['Empirical Fieldwork & Corporate Case Study Analysis', 'Quantitative and Qualitative Data Synthesis', 'Final Dissertation Defense'] }
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
