import { GoogleGenAI, GenerateContentResponse, Part, Type, GenerateImagesResponse } from "@google/genai";
import { Subject, ImagePart, SolutionType, Quiz, QuizQuestion, AudienceLevel, ContentPart } from '../types';
import { generateFallbackQuiz } from './quizFallbackService';
import { TutorPersona } from './tutorPersonaService';

// IMPORTANT: This relies on the API_KEY being set in the execution environment.
const API_KEY = process.env.API_KEY;

// Initialize AI client only if API_KEY is available.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// A simple in-memory cache for solutions to speed up repeated text-only queries.
const solutionCache = new Map<string, SolutionType>();

/**
 * Generates rich, subject-tailored vector educational diagrams for any searched topic.
 */
export const generateEducationalSvgPlaceholder = (prompt: string, subject: Subject): string => {
  const cleanPrompt = (prompt || 'Academic Concept Analysis').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 90);
  const subjectName = subject || 'General Academic';
  const promptLower = (prompt || '').toLowerCase();

  let diagramContent = '';

  // 1. Mathematics & Calculus & Statistics
  if (
    [Subject.Math, Subject.FurtherMathematics, Subject.DemographyAndSocialStatistics].includes(subject) ||
    promptLower.includes('calculate') || promptLower.includes('equation') || promptLower.includes('graph') ||
    promptLower.includes('derivative') || promptLower.includes('integral') || promptLower.includes('function')
  ) {
    diagramContent = `
      <!-- Coordinate System & Curve -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <!-- Grid lines -->
        <line x1="60" y1="20" x2="60" y2="190" stroke="#1e293b" stroke-width="1"/>
        <line x1="140" y1="20" x2="140" y2="190" stroke="#1e293b" stroke-width="1"/>
        <line x1="220" y1="20" x2="220" y2="190" stroke="#1e293b" stroke-width="1"/>
        <line x1="300" y1="20" x2="300" y2="190" stroke="#1e293b" stroke-width="1"/>
        <line x1="380" y1="20" x2="380" y2="190" stroke="#1e293b" stroke-width="1"/>
        <line x1="460" y1="20" x2="460" y2="190" stroke="#1e293b" stroke-width="1"/>
        <line x1="540" y1="20" x2="540" y2="190" stroke="#1e293b" stroke-width="1"/>
        <!-- X and Y Axes -->
        <line x1="50" y1="160" x2="630" y2="160" stroke="#64748b" stroke-width="2"/>
        <polygon points="630,156 642,160 630,164" fill="#64748b"/>
        <text x="648" y="164" fill="#94a3b8" font-size="13" font-weight="bold">X</text>
        <line x1="120" y1="180" x2="120" y2="25" stroke="#64748b" stroke-width="2"/>
        <polygon points="116,25 120,13 124,25" fill="#64748b"/>
        <text x="115" y="10" fill="#94a3b8" font-size="13" font-weight="bold">Y = f(X)</text>
        <!-- Polynomial / Parabolic curve -->
        <path d="M 80,150 Q 240,10 400,120 T 600,30" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Tangent line & slope point -->
        <line x1="280" y1="150" x2="480" y2="40" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="380" cy="95" r="5" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
        <text x="395" y="90" fill="#fbbf24" font-size="12" font-weight="bold">Tangent: dy/dx</text>
        <!-- Apex Vertex Point -->
        <circle cx="240" cy="50" r="5" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
        <text x="250" y="45" fill="#34d399" font-size="12" font-weight="bold">Extremum Point (x₀, y₀)</text>
        <!-- Formula Box -->
        <rect x="470" y="140" width="190" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
        <text x="565" y="162" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">f(x) = ax² + bx + c</text>
        <text x="565" y="180" fill="#94a3b8" font-size="11" text-anchor="middle">Roots: x = (-b ± √Δ) / 2a</text>
      </g>`;
  }
  // 2. Physics & Engineering & Mechatronics
  else if (
    [Subject.Physics, Subject.Mechatronics, Subject.Astronomy].includes(subject) ||
    promptLower.includes('force') || promptLower.includes('circuit') || promptLower.includes('velocity') ||
    promptLower.includes('energy') || promptLower.includes('voltage') || promptLower.includes('current')
  ) {
    diagramContent = `
      <!-- Physics Vectors & Circuit Schematic -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <!-- Circuit Diagram Loop -->
        <rect x="40" y="40" width="260" height="130" rx="4" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
        <!-- DC Voltage source -->
        <rect x="30" y="90" width="20" height="30" fill="#0f172a"/>
        <line x1="30" y1="95" x2="50" y2="95" stroke="#ef4444" stroke-width="3"/>
        <line x1="36" y1="110" x2="44" y2="110" stroke="#3b82f6" stroke-width="2"/>
        <text x="18" y="105" fill="#f87171" font-size="12" font-weight="bold">V (+)</text>
        <!-- Resistor 1 -->
        <rect x="130" y="30" width="80" height="20" rx="3" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
        <text x="170" y="45" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">R₁ (Resistor)</text>
        <!-- Current Arrow -->
        <path d="M 280 40 L 300 40 L 300 80" fill="none" stroke="#10b981" stroke-width="2"/>
        <polygon points="300,85 296,75 304,75" fill="#10b981"/>
        <text x="310" y="75" fill="#34d399" font-size="12" font-weight="bold">I = V/R</text>
        
        <!-- Force Vector Free-Body Model -->
        <g transform="translate(370, 20)">
          <rect x="80" y="50" width="100" height="70" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
          <text x="130" y="90" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Mass (m)</text>
          <!-- Normal Force Up -->
          <line x1="130" y1="50" x2="130" y2="10" stroke="#38bdf8" stroke-width="2.5"/>
          <polygon points="130,5 125,16 135,16" fill="#38bdf8"/>
          <text x="140" y="20" fill="#38bdf8" font-size="11" font-weight="bold">F_N (Normal)</text>
          <!-- Gravity Down -->
          <line x1="130" y1="120" x2="130" y2="160" stroke="#f43f5e" stroke-width="2.5"/>
          <polygon points="130,165 125,154 135,154" fill="#f43f5e"/>
          <text x="140" y="155" fill="#f43f5e" font-size="11" font-weight="bold">W = mg (Weight)</text>
          <!-- Applied Force Right -->
          <line x1="180" y1="85" x2="230" y2="85" stroke="#10b981" stroke-width="2.5"/>
          <polygon points="235,85 224,80 224,90" fill="#10b981"/>
          <text x="200" y="75" fill="#10b981" font-size="11" font-weight="bold">F_applied</text>
        </g>
      </g>`;
  }
  // 3. Chemistry & Chemical Reactions
  else if (
    [Subject.Chemistry].includes(subject) ||
    promptLower.includes('chemical') || promptLower.includes('molecule') || promptLower.includes('reaction') ||
    promptLower.includes('atom') || promptLower.includes('bond') || promptLower.includes('acid') || promptLower.includes('base')
  ) {
    diagramContent = `
      <!-- Molecular Structure & Reaction Model -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <!-- Hexagonal Benzene Ring / Aromatic Ring -->
        <g transform="translate(70, 30)">
          <polygon points="70,10 120,40 120,95 70,125 20,95 20,40" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
          <circle cx="70" cy="67" r="28" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="70" y="72" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">π-System</text>
          <text x="70" y="145" fill="#94a3b8" font-size="11" text-anchor="middle">Aromatic Core (C₆H₆)</text>
        </g>
        <!-- Reaction Mechanism Arrow -->
        <g transform="translate(240, 95)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#10b981" stroke-width="3"/>
          <polygon points="85,0 74,-5 74,5" fill="#10b981"/>
          <text x="40" y="-12" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">+ Reagents [Cat.]</text>
          <text x="40" y="18" fill="#94a3b8" font-size="10" text-anchor="middle">Δ (Heat / Energy)</text>
        </g>
        <!-- Product Molecule -->
        <g transform="translate(360, 30)">
          <rect x="0" y="15" width="270" height="110" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
          <text x="20" y="45" fill="#c084fc" font-size="14" font-weight="bold">Product Equilibrium:</text>
          <text x="20" y="72" fill="#f8fafc" font-size="13">R-COOH + R'-OH ⇌ R-COO-R' + H₂O</text>
          <text x="20" y="98" fill="#38bdf8" font-size="11">Esterification Synthesis Mechanism</text>
        </g>
      </g>`;
  }
  // 4. Biology, Medicine, Nursing & Health
  else if (
    [Subject.Biology, Subject.Medicine, Subject.Nursing, Subject.Physiotherapy, Subject.HealthEducation, Subject.Zoology, Subject.AgriculturalScience].includes(subject) ||
    promptLower.includes('cell') || promptLower.includes('dna') || promptLower.includes('organ') ||
    promptLower.includes('body') || promptLower.includes('blood') || promptLower.includes('plant') || promptLower.includes('photosynthesis')
  ) {
    diagramContent = `
      <!-- Biological Pathway & Cellular Model -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <!-- Biological Cell Model -->
        <g transform="translate(30, 20)">
          <ellipse cx="120" cy="85" rx="105" ry="70" fill="#064e3b" stroke="#10b981" stroke-width="2.5" opacity="0.8"/>
          <!-- Nucleus -->
          <circle cx="120" cy="85" r="32" fill="#047857" stroke="#34d399" stroke-width="2"/>
          <text x="120" y="82" fill="#ecfdf5" font-size="11" font-weight="bold" text-anchor="middle">Nucleus</text>
          <text x="120" y="96" fill="#a7f3d0" font-size="9" text-anchor="middle">(DNA/Chromatin)</text>
          <!-- Organelles -->
          <ellipse cx="60" cy="60" rx="15" ry="8" fill="#d97706" opacity="0.8"/>
          <ellipse cx="170" cy="115" rx="18" ry="10" fill="#d97706" opacity="0.8"/>
          <text x="120" y="172" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">Cellular Membrane & Cytoplasm</text>
        </g>
        <!-- Flow Pathway to Systems -->
        <g transform="translate(290, 30)">
          <rect x="0" y="10" width="340" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="20" y="38" fill="#38bdf8" font-size="13" font-weight="bold">🔬 Biological Hierarchy & Function</text>
          <line x1="20" y1="50" x2="320" y2="50" stroke="#334155" stroke-width="1"/>
          <text x="20" y="75" fill="#f8fafc" font-size="12">1. Cellular / Molecular Interaction</text>
          <text x="20" y="98" fill="#f8fafc" font-size="12">2. Tissue & Physiological Homeostasis</text>
          <text x="20" y="121" fill="#10b981" font-size="12" font-weight="bold">3. Systemic Function & Biological Output</text>
        </g>
      </g>`;
  }
  // 5. Economics, Accounting, Commerce & Finance
  else if (
    [Subject.Economics, Subject.Accounting, Subject.Commerce, Subject.BankingAndFinance, Subject.Marketing, Subject.BusinessAdministration, Subject.ManagementAccounting, Subject.BusinessStudies].includes(subject) ||
    promptLower.includes('market') || promptLower.includes('price') || promptLower.includes('supply') ||
    promptLower.includes('demand') || promptLower.includes('cost') || promptLower.includes('profit') || promptLower.includes('balance') ||
    promptLower.includes('ledger') || promptLower.includes('bookkeeping') || promptLower.includes('office')
  ) {
    diagramContent = `
      <!-- Economics & Business Studies Model -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <g transform="translate(40, 20)">
          <!-- Price and Quantity axes -->
          <line x1="40" y1="150" x2="280" y2="150" stroke="#64748b" stroke-width="2"/>
          <text x="290" y="154" fill="#94a3b8" font-size="12" font-weight="bold">Quantity (Q)</text>
          <line x1="40" y1="150" x2="40" y2="20" stroke="#64748b" stroke-width="2"/>
          <text x="35" y="12" fill="#94a3b8" font-size="12" font-weight="bold">Price (P)</text>
          <!-- Supply Curve (Upward) -->
          <line x1="50" y1="140" x2="250" y2="30" stroke="#10b981" stroke-width="3"/>
          <text x="255" y="32" fill="#34d399" font-size="12" font-weight="bold">Supply (S)</text>
          <!-- Demand Curve (Downward) -->
          <line x1="50" y1="30" x2="250" y2="140" stroke="#f43f5e" stroke-width="3"/>
          <text x="255" y="145" fill="#fb7185" font-size="12" font-weight="bold">Demand (D)</text>
          <!-- Equilibrium Point -->
          <circle cx="150" cy="85" r="5" fill="#fbbf24" stroke="#ffffff" stroke-width="2"/>
          <line x1="150" y1="85" x2="150" y2="150" stroke="#fbbf24" stroke-dasharray="3 3" stroke-width="1.5"/>
          <line x1="40" y1="85" x2="150" y2="85" stroke="#fbbf24" stroke-dasharray="3 3" stroke-width="1.5"/>
          <text x="160" y="80" fill="#fbbf24" font-size="12" font-weight="bold">Equilibrium (Pₑ, Qₑ)</text>
        </g>
        <g transform="translate(370, 30)">
          <rect x="0" y="10" width="270" height="125" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="20" y="38" fill="#38bdf8" font-size="13" font-weight="bold">📊 Business & Financial Analysis</text>
          <line x1="20" y1="50" x2="250" y2="50" stroke="#334155" stroke-width="1"/>
          <text x="20" y="75" fill="#f8fafc" font-size="12">Total Revenue = Price × Quantity</text>
          <text x="20" y="98" fill="#34d399" font-size="12">Net Profit = Total Rev - Total Cost</text>
          <text x="20" y="121" fill="#fbbf24" font-size="11" font-weight="bold">Equilibrium & Account Balancing</text>
        </g>
      </g>`;
  }
  // 6. Home Economics, Food & Nutrition, Clothing & Textiles
  else if (
    [Subject.HomeEconomics].includes(subject) ||
    promptLower.includes('nutrition') || promptLower.includes('recipe') || promptLower.includes('meal') ||
    promptLower.includes('sewing') || promptLower.includes('stitch') || promptLower.includes('textile') || promptLower.includes('household')
  ) {
    diagramContent = `
      <!-- Home Economics & Nutritional Concept Model -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <g transform="translate(30, 20)">
          <!-- Food Nutrients / Balanced Diet Wheel -->
          <circle cx="95" cy="85" r="70" fill="#1e293b" stroke="#f59e0b" stroke-width="2.5"/>
          <text x="95" y="80" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Balanced Diet</text>
          <text x="95" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">6 Classes of Food</text>
          <!-- Orbit markers -->
          <circle cx="95" cy="20" r="14" fill="#10b981"/>
          <text x="95" y="24" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">Carbs</text>
          <circle cx="160" cy="85" r="14" fill="#3b82f6"/>
          <text x="160" y="89" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">Protein</text>
          <circle cx="95" cy="150" r="14" fill="#ec4899"/>
          <text x="95" y="154" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">Vitamins</text>
          <circle cx="30" cy="85" r="14" fill="#8b5cf6"/>
          <text x="30" y="89" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">Minerals</text>
        </g>
        <g transform="translate(230, 25)">
          <rect x="0" y="0" width="410" height="155" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="20" y="28" fill="#34d399" font-size="13" font-weight="bold">🍳 Home Economics Mastery Pillars</text>
          <line x1="20" y1="38" x2="390" y2="38" stroke="#334155" stroke-width="1"/>
          <text x="20" y="62" fill="#f8fafc" font-size="12">1. Food & Nutrition: Nutrient preservation & meal planning</text>
          <text x="20" y="88" fill="#f8fafc" font-size="12">2. Clothing & Textiles: Stitches, seams, fabrics & garment care</text>
          <text x="20" y="114" fill="#f8fafc" font-size="12">3. Home Management: Family resources, hygiene & budgeting</text>
          <text x="20" y="138" fill="#fbbf24" font-size="11" font-weight="bold">NERDC & WAEC Standard Educational Alignment</text>
        </g>
      </g>`;
  }
  // 6. Computer Science & Software Engineering & Coding
  else if (
    [Subject.ComputerScience, Subject.SoftwareEngineering, Subject.Coding, Subject.DatabaseManagement].includes(subject) ||
    promptLower.includes('algorithm') || promptLower.includes('code') || promptLower.includes('program') ||
    promptLower.includes('database') || promptLower.includes('tree') || promptLower.includes('stack')
  ) {
    diagramContent = `
      <!-- Computer Science Logic Architecture -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <g transform="translate(30, 45)">
          <!-- Node 1: Input -->
          <rect x="0" y="15" width="130" height="70" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="65" y="45" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Input Stream</text>
          <text x="65" y="65" fill="#e0f2fe" font-size="10" text-anchor="middle">Data / Parameters</text>
          <!-- Arrow 1 -->
          <line x1="135" y1="50" x2="185" y2="50" stroke="#38bdf8" stroke-width="2.5"/>
          <polygon points="190,50 180,45 180,55" fill="#38bdf8"/>
          <!-- Node 2: Algorithm Core -->
          <rect x="195" y="15" width="180" height="70" rx="8" fill="#7c3aed" stroke="#c084fc" stroke-width="2"/>
          <text x="285" y="45" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Algorithm Processing</text>
          <text x="285" y="65" fill="#f3e8ff" font-size="10" text-anchor="middle">Time O(log N) | Space O(1)</text>
          <!-- Arrow 2 -->
          <line x1="380" y1="50" x2="430" y2="50" stroke="#c084fc" stroke-width="2.5"/>
          <polygon points="435,50 425,45 425,55" fill="#c084fc"/>
          <!-- Node 3: Result Output -->
          <rect x="440" y="15" width="150" height="70" rx="8" fill="#059669" stroke="#34d399" stroke-width="2"/>
          <text x="515" y="45" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Verified Output</text>
          <text x="515" y="65" fill="#d1fae5" font-size="10" text-anchor="middle">Optimized Execution</text>
        </g>
        <text x="340" y="165" fill="#64748b" font-size="11" font-weight="bold" text-anchor="middle">Architecture Data Flow & Computational Model</text>
      </g>`;
  }
  // 7. General Academic Concept Framework (Default)
  else {
    diagramContent = `
      <!-- Standard Academic Process Architecture -->
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="680" height="210" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <g transform="translate(30, 45)">
          <rect x="0" y="15" width="160" height="80" rx="8" fill="#0284c7" opacity="0.95" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="80" y="48" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">1. Core Theory</text>
          <text x="80" y="70" fill="#e0f2fe" font-size="11" text-anchor="middle">Academic Foundations</text>
          <path d="M 165 55 L 215 55" stroke="#60a5fa" stroke-width="3"/>
          <polygon points="220,55 210,50 210,60" fill="#60a5fa"/>
          <rect x="225" y="15" width="180" height="80" rx="8" fill="#7c3aed" opacity="0.95" stroke="#c084fc" stroke-width="1.5"/>
          <text x="315" y="48" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">2. Methodology</text>
          <text x="315" y="70" fill="#f3e8ff" font-size="11" text-anchor="middle">Analytical Step-by-Step</text>
          <path d="M 410 55 L 460 55" stroke="#c084fc" stroke-width="3"/>
          <polygon points="465,55 455,50 455,60" fill="#c084fc"/>
          <rect x="470" y="15" width="160" height="80" rx="8" fill="#059669" opacity="0.95" stroke="#34d399" stroke-width="1.5"/>
          <text x="550" y="48" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">3. Solution</text>
          <text x="550" y="70" fill="#d1fae5" font-size="11" text-anchor="middle">Synthesized Results</text>
        </g>
        <text x="340" y="170" fill="#64748b" font-size="11" font-weight="bold" text-anchor="middle">God's Glory Academic Framework — Step-by-Step Educational Proof</text>
      </g>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420" style="background:#0b1120; font-family: system-ui, -apple-system, sans-serif; border-radius: 12px;">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0b1120"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" rx="12"/>
  <rect x="0" y="0" width="800" height="5" fill="url(#accentGrad)" />
  
  <!-- Header Badge & Subject -->
  <rect x="30" y="22" width="240" height="32" rx="16" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="150" y="43" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">🎓 ${subjectName} Visual Model</text>
  
  <!-- Title and Topic Prompt -->
  <text x="30" y="85" fill="#f8fafc" font-size="19" font-weight="bold">Academic Diagram & Visual Concept</text>
  <text x="30" y="112" fill="#94a3b8" font-size="13">${cleanPrompt}</text>
  
  ${diagramContent}

  <!-- Footer Tag -->
  <text x="400" y="398" fill="#64748b" font-size="11" text-anchor="middle">God's Glory Academic Tutors — World Standard Curriculum Visual Guide</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const getSystemInstruction = (
  subject: Subject, 
  level: AudienceLevel,
  countryName?: string,
  curriculumName?: string,
  yearStr?: string,
  tutorPersona?: TutorPersona
): string => {
  let audienceDescription = "";
  switch (level) {
    case AudienceLevel.Child:
      audienceDescription = `YOUR AUDIENCE IS A YOUNG PRIMARY / BASIC SCHOOL PUPIL (Ages 5 to 11, Basic 1 to 6).
CRITICAL PRIMARY SCHOOL TEACHING RULES (MANDATORY):
1. UTMOST SIMPLICITY & WARMTH: Speak with the loving, joyful warmth of a kind primary school teacher. Use very simple, friendly English words. Absolutely NO difficult college jargon, abstract formulas, or intimidating technical terms.
2. NIGERIAN & EVERYDAY REAL-LIFE CONTEXT: Use cheerful everyday examples that Nigerian primary school children know and love: sharing ripe mangoes, oranges, sweet biscuits, counting pencils, football on the school field, and Nigerian currency (₦5, ₦10, ₦20, ₦50, ₦100, ₦200, ₦500, ₦1000 notes in a classroom store).
3. HOW TO STRUCTURE THE LESSON:
   - 🌟 **Hello Super Learner!**: A warm, cheerful 1-2 sentence greeting encouraging them.
   - 💡 **What Does This Mean? (In Simple Words)**: Explain the big idea in 2-3 short, clear, plain English sentences so that even a 6 or 7-year-old child can read and understand immediately.
   - 📝 **Easy Step-by-Step Magic**: Break the solution into small, numbered steps (Step 1, Step 2, Step 3) using friendly emojis and clear everyday words.
   - 🍎 **Fun Everyday Story**: A short 2-3 sentence story (e.g. about Chidi, Amina, or Emeka sharing items or observing nature).
   - 🔑 **Golden Memory Rule**: A catchy 1-line rhyme or memory tip to never forget this lesson.
   - 🎯 **Try This Fun Practice Question!**: 1 fun question with a clear, happy explanation so the child can test themselves and feel proud!`;
      break;
    case AudienceLevel.HighSchool:
      {
        const yr = (yearStr || '').toLowerCase();
        const isJunior = yr.includes('jss') || yr.includes('basic 7') || yr.includes('basic 8') || yr.includes('basic 9') || yr.includes('bece') || yr.includes('junior');
        if (isJunior) {
          audienceDescription = `YOUR AUDIENCE CONSISTS OF JUNIOR SECONDARY STUDENTS (${yearStr || 'JSS 1 to JSS 3 / Basic 7 to 9 / BECE'}, Ages 11 to 14).
CRITICAL JUNIOR SECONDARY TEACHING RULES (MANDATORY):
1. EXACT LEVEL CALIBRATION (NEVER OVER-COMPLEX): Teach specifically at the Junior Secondary (Basic 7–9 / BECE) level. DO NOT introduce senior secondary calculus, complex surds rationalization, university proofs, or advanced equations that belong to SSS 3 or higher. Keep it clearly matched to Junior WAEC / BECE standards.
2. STEP-BY-STEP FOUNDATION: Break every concept down into step-by-step clarity. Explain definitions with clear everyday examples before presenting equations.
3. STRUCTURED CLASSROOM FORMAT:
   - 📘 **Lesson Objective**: 1 brief sentence on what the junior student will master.
   - 💡 **Understanding the Concept**: Clear, intuitive explanation without intimidating terminology.
   - ✍️ **Step-by-Step Worked Example**: Complete working with all intermediate steps shown clearly.
   - ⚠️ **Common Exam Mistake to Avoid**: Highlight 1 common trap students fall into.
   - 📝 **Junior WAEC / BECE Practice Problem**: 1 exam-style practice question with full solution.`;
        } else {
          audienceDescription = `YOUR AUDIENCE CONSISTS OF SENIOR SECONDARY STUDENTS (${yearStr || 'SSS 1 to SSS 3 / WAEC / NECO / JAMB UTME'}, Ages 14 to 18).
CRITICAL SENIOR SECONDARY TEACHING RULES:
1. RIGOROUS EXAM STANDARDS: Align explanations directly with the WASSCE (WAEC), NECO (SSCE), and JAMB UTME syllabus.
2. MARKING SCHEME EXCELLENCE: Provide comprehensive step-by-step solutions showing standard formula quotes, substitution with correct units, algebraic manipulation, and exact final answers.
3. STRUCTURED SENIOR FORMAT:
   - 🎯 **Syllabus & Exam Focus**: Core WAEC/NECO/JAMB concept.
   - 🔬 **Theoretical Foundations & Principles**: Formal definitions, laws, and theorems.
   - 📐 **Step-by-Step Worked Solutions**: Methodical steps showing full working.
   - 💡 **Examiner's Marking Tips**: High-yield points to secure maximum marks.
   - 🏆 **WAEC / JAMB Past Question Walkthrough**: Typical examination question with step-by-step answer.`;
        }
      }
      break;
    case AudienceLevel.Expert:
      audienceDescription = `Your audience consists of post-graduates, researchers, and specialists in the field of ${subject}. Your explanations must be highly detailed, technically precise, and at a PhD level, referencing advanced theorems, current literature, and nuanced derivations.`;
      break;
    case AudienceLevel.University:
    default:
      audienceDescription = "Your audience consists of university undergraduate students. Your explanations must be accurate, comprehensive, and at a Bachelor's degree level according to accredited university benchmark standards.";
      break;
  }

  const countryCurriculumInstruction = countryName ? `
NATIONAL & GLOBAL CURRICULUM ALIGNMENT:
- Target Country / Region: ${countryName}
- Target Educational Curriculum: ${curriculumName || 'National Standard'}
- Ensure your terminology, localized examples, currency (e.g. ₦ Naira for Nigeria, £ for UK, $ for US/Canada, etc.), units of measurement (metric / SI units), and exam references strictly align with this curriculum framework (e.g. WAEC/NECO/JAMB for Nigeria, GCSE/A-Levels for UK, Common Core/AP for US, WASSCE for Ghana, Cambridge/IB for International).
` : '';

  const personaInstruction = tutorPersona ? `
MANDATORY TUTOR PERSONA & PEDAGOGICAL VOICE:
You are acting as ${tutorPersona.name}, ${tutorPersona.title} (${tutorPersona.role} at God's Glory Tutors).
Teaching Philosophy & Pedagogical Style: ${tutorPersona.pedagogicalStyle}
Signature Motto: "${tutorPersona.quote}"
Voice & Instruction: ${tutorPersona.systemPromptVoice}
Deliver the solution embodying ${tutorPersona.name}'s encouraging, brilliant, and structured scholarly presence throughout your response.
` : '';

  const baseInstruction = `You are God's Glory Tutors, a world-class academic tutor and master educator in ${subject}. ${audienceDescription}
${countryCurriculumInstruction}
${personaInstruction}
Provide a detailed, step-by-step solution to the user's problem. Structure your answer clearly using markdown (headings, lists, bold text for key terms).

CRITICAL MATHEMATICAL & CALCULATION SYMBOL RULES:
- For ALL calculation, scientific, financial, and mathematical subjects (Mathematics, Further Mathematics, Physics, Chemistry, Engineering, Statistics, Accounting, Economics, etc.), NEVER write raw LaTeX code enclosed in raw dollar signs like '$\\pi$', '$$\\lambda$$', '$\\theta$', or '$\\Delta$'.
- ALWAYS write clear, accurate, exact Unicode mathematical symbols and text notation directly.
  Examples:
  - Use 'π' instead of '$\\pi$'
  - Use 'λ' instead of '$\\lambda$'
  - Use 'θ' instead of '$\\theta$'
  - Use 'Δ' instead of '$\\Delta$'
  - Use '√' instead of '$\\sqrt$' or '\\sqrt{x}'
  - Use '∫', '∑', '±', '∞', '²', '³', '≈', '≠', '≤', '≥', '÷', '×', '°', 'Ω', 'μ', 'α', 'β', 'γ', 'σ', 'ω'
- Express mathematical equations clearly using bold text, clean Unicode symbols, or structured markdown code blocks without raw unrendered dollar signs ($) or raw backslash artifacts.

CRITICAL: To make the solution fast to analyze, begin every response with a "### 🚀 Quick Summary" section (2-3 bullet points) before the detailed explanation.

CRITICAL VISUAL & ILLUSTRATION INSTRUCTION:
For EVERY problem, concept, or search query answered, you MUST include 1-2 clear, high-quality illustrative diagram tags in your response.
Use the tag format: [GENERATE_IMAGE: "A detailed, descriptive prompt for an educational diagram, formula map, anatomical figure, flowchart, or visual illustration."].
Place this tag right where the key concept, formula, mechanism, process, or problem step is introduced so the student receives clear visual illustrations alongside the explanation.`;

  const quizInstruction = `
After the detailed explanation, add a section titled "### 🧠 Quick Check". In this section, provide 2-3 multiple-choice questions that test the core concepts of your explanation. The questions should be relevant to the provided solution. For each question, provide 4 plausible options (A, B, C, D).
After listing all questions and their options, provide a separate "#### Answers" subsection below them with the correct letter for each question, like "1. C, 2. A".`;

  return baseInstruction + quizInstruction;
};


/**
 * Retries a promise-based function if it fails with a transient server error.
 */
const retryPromise = async <T>(
  promiseFn: () => Promise<T>,
  retries: number = 1,
  delay: number = 1500
): Promise<T> => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await promiseFn();
    } catch (error: any) {
      const isServerError = error?.error?.code >= 500 && error.error.code < 600;

      if (i === retries || !isServerError) {
        throw error;
      }
      
      console.log(`Image generation failed with a server error (Attempt ${i + 1}). Retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Retry logic failed unexpectedly.");
};


// Internal function that makes the actual API call, without caching.
const _solveProblemUncached = async (
  subject: Subject,
  prompt: string,
  imagePart: ImagePart | null,
  level: AudienceLevel,
  onUpdate: (chunk: string) => void,
  onComplete: (finalSolution: SolutionType) => void,
  topic?: string,
  subTopic?: string,
  year?: string,
  semester?: string,
  countryName?: string,
  curriculumName?: string,
  tutorPersona?: TutorPersona
): Promise<void> => {
  if (!ai) {
    throw new Error("AI service is not configured. The API_KEY may be missing.");
  }
  
  const systemInstruction = getSystemInstruction(subject, level, countryName, curriculumName, year, tutorPersona);
    
  let finalPrompt = prompt;
  const contextParts = [
    countryName ? `Curriculum: ${countryName} (${curriculumName || 'National Standard'})` : null,
    year ? `Class/Year: ${year}` : null,
    semester ? `Semester/Term: ${semester}` : null,
    topic ? `Topic: ${topic}` : null,
    subTopic ? `Subtopic: ${subTopic}` : null,
  ].filter(Boolean);

  if (contextParts.length > 0) {
    const contextSummary = contextParts.join(' | ');
    if (prompt.trim()) {
      finalPrompt = `[Academic Context: Subject: ${subject} (${contextSummary})]\n\nQuestion / Problem:\n${prompt}`;
    } else {
      finalPrompt = `Solve and thoroughly explain the problem depicted in the image, tailored for ${subject} (${contextSummary}).`;
    }
  } else if (!prompt.trim() && imagePart) {
    finalPrompt = `Solve and thoroughly explain the problem depicted in the image, tailored for ${subject} at ${level} level.`;
  }
  
  const contents: Array<string | Part> = [finalPrompt];
  if (imagePart) {
    contents.push(imagePart);
  }
    
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3.8-flash',
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.3,
      topP: 0.95,
    }
  });

  let solutionText = '';
  for await (const chunk of responseStream) {
    const textChunk = chunk.text;
    if (textChunk) {
        solutionText += textChunk;
        onUpdate(textChunk);
    }
  }

  // After streaming text, process any image generation tags in parallel.
  const imageTagRegex = /\[GENERATE_IMAGE: "([^"]+)"\]/;
  const segments = solutionText.split(/(\[GENERATE_IMAGE: "[^"]+"\])/g);

  // If the model did not generate an image tag, inject a default educational diagram at the top so images are always present
  if (!segments.some(seg => seg.match(imageTagRegex))) {
    segments.unshift(`[GENERATE_IMAGE: "A detailed educational diagram illustrating ${subject}: ${prompt.slice(0, 60) || 'Academic Principles'}"]`);
  }

  const solutionPromises = segments.map(segment => {
    const match = segment.match(imageTagRegex);

    if (match) {
        const imagePrompt = match[1];
        const imageGenerationCall = () => ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: {
                parts: [
                    {
                        text: `${imagePrompt}. Crisp, educational diagram, clear annotations, high resolution academic figure.`,
                    },
                ],
            },
            config: {
                imageConfig: {
                    aspectRatio: "16:9",
                },
            },
        });

        return retryPromise(imageGenerationCall)
            .then(imageResponse => {
                const parts = imageResponse?.candidates?.[0]?.content?.parts;
                if (parts) {
                    for (const part of parts) {
                        if (part.inlineData?.data) {
                            const base64ImageBytes: string = part.inlineData.data;
                            const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                            return { type: 'image', content: imageUrl, alt: imagePrompt } as ContentPart;
                        }
                    }
                }
                throw new Error("The image generation service returned no image data.");
            })
            .catch((imgError: any) => {
                console.log("Rendering high-precision educational SVG diagram:", imgError?.message || imgError);
                const fallbackImageUrl = generateEducationalSvgPlaceholder(imagePrompt, subject);
                return { type: 'image', content: fallbackImageUrl, alt: `[Diagram] ${imagePrompt}` } as ContentPart;
            });
    } else if (segment) {
        return Promise.resolve({ type: 'text', content: segment } as ContentPart);
    }
    return Promise.resolve(null);
  });
  
  const resolvedParts = (await Promise.all(solutionPromises)).filter((part): part is ContentPart => part !== null);

  // Coalesce consecutive text parts for a cleaner final structure
  const finalSolution: SolutionType = [];
  for (const part of resolvedParts) {
      if (part.type === 'text' && finalSolution.length > 0 && finalSolution[finalSolution.length - 1].type === 'text') {
          (finalSolution[finalSolution.length - 1] as { type: 'text', content: string }).content += part.content;
      } else {
          finalSolution.push(part);
      }
  }

  try {
    onComplete(finalSolution);
  } catch (completeErr) {
    console.warn("Callback error in onComplete:", completeErr);
  }

  // Update cache if the prompt was text-only
  if (!imagePart) {
    const cacheKey = `${subject}:${level}:${topic || ''}:${subTopic || ''}:${prompt.trim()}`;
    if (finalSolution.length > 0) {
      solutionCache.set(cacheKey, finalSolution);
    }
  }
};

export const solveProblem = async (
  subject: Subject,
  prompt: string,
  imagePart: ImagePart | null,
  level: AudienceLevel,
  onUpdate: (chunk: string) => void,
  onComplete: (finalSolution: SolutionType) => void,
  onError: (errorMessage: string) => void,
  topic?: string,
  subTopic?: string,
  year?: string,
  semester?: string,
  countryName?: string,
  curriculumName?: string,
  tutorPersona?: TutorPersona
): Promise<void> => {
  // Check cache for text-only queries
  if (!imagePart) {
    const cacheKey = `${tutorPersona?.id || 'default'}:${countryName || 'default'}:${subject}:${level}:${topic || ''}:${subTopic || ''}:${prompt.trim()}`;
    if (solutionCache.has(cacheKey)) {
      const cachedSolution = solutionCache.get(cacheKey)!;
      for (const part of cachedSolution) {
        if (part.type === 'text') {
          onUpdate(part.content);
        }
      }
      onComplete(cachedSolution);
      return;
    }
  }

  try {
    await _solveProblemUncached(
      subject,
      prompt,
      imagePart,
      level,
      onUpdate,
      onComplete,
      topic,
      subTopic,
      year,
      semester,
      countryName,
      curriculumName,
      tutorPersona,
    );
  } catch (error: any) {
    console.error("Error solving problem:", error);
    onError(error.message || "An unexpected error occurred while generating the solution.");
  }
};

export const generateQuiz = async (
  subject: Subject,
  level: AudienceLevel,
  numQuestions: number = 5,
  topic?: string,
  subTopic?: string,
  year?: string,
  semester?: string,
  countryName?: string,
  curriculumName?: string,
): Promise<Quiz> => {
  if (!ai) {
    console.warn("AI service not configured for quiz generation, using rich academic fallback.");
    return generateFallbackQuiz(subject, level, numQuestions, topic, subTopic, year, semester);
  }

  const contextInfo = [
    countryName ? `Curriculum: "${countryName} (${curriculumName || 'National Standard'})"` : '',
    topic ? `Topic: "${topic}"` : '',
    subTopic ? `Subtopic: "${subTopic}"` : '',
    year ? `Level/Year: "${year}"` : '',
    semester ? `Semester/Term: "${semester}"` : '',
  ].filter(Boolean).join(', ');

  const isJunior = (year || '').toLowerCase().includes('jss') || (year || '').toLowerCase().includes('basic 7') || (year || '').toLowerCase().includes('basic 8') || (year || '').toLowerCase().includes('basic 9') || (year || '').toLowerCase().includes('bece');
  const levelRule = level === AudienceLevel.Child 
    ? 'CRITICAL FOR PRIMARY PUPILS: Use very simple English, joyful everyday examples (fruits, animals, simple numbers), and absolutely NO complex algebra or difficult formulas.'
    : level === AudienceLevel.HighSchool && isJunior
    ? 'CRITICAL FOR JUNIOR SECONDARY: All questions must strictly align with Junior WAEC / BECE (Basic 7-9) standard. DO NOT include senior secondary calculus, complex trigonometry, or college physics/chemistry formulas.'
    : level === AudienceLevel.HighSchool
    ? 'CRITICAL FOR SENIOR SECONDARY: All questions must align with WAEC / WASSCE / NECO / JAMB UTME syllabus standards.'
    : '';

  const safeNumQuestions = Math.min(50, Math.max(1, numQuestions));

  const prompt = `Generate a high-quality ${safeNumQuestions}-question multiple-choice academic quiz for the subject "${subject}" tailored for "${level}" students${contextInfo ? ` aligned with ${contextInfo}` : ''}.
${levelRule}
You MUST generate exactly ${safeNumQuestions} unique questions.
Each question must have exactly 4 distinct options labeled A, B, C, D (plain text option strings), exactly one zero-based correctAnswerIndex (0 for A, 1 for B, 2 for C, 3 for D), and a clear educational explanation of why that option is correct.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  questionText: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['questionText', 'options', 'correctAnswerIndex', 'explanation']
              }
            }
          },
          required: ['quizTitle', 'subject', 'questions']
        }
      }
    });

    if (response.text) {
      const parsedQuiz = JSON.parse(response.text);
      if (parsedQuiz && Array.isArray(parsedQuiz.questions) && parsedQuiz.questions.length > 0) {
        const normalizedQuestions: QuizQuestion[] = parsedQuiz.questions.map((q: any) => ({
          questionText: q.questionText || q.question || 'Academic Quiz Question',
          options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswerIndex: typeof q.correctAnswerIndex === 'number' && q.correctAnswerIndex >= 0 && q.correctAnswerIndex < (q.options?.length || 4)
            ? q.correctAnswerIndex
            : 0,
          explanation: q.explanation || 'Verified academic curriculum solution and marking guide.',
        }));

        return {
          quizTitle: parsedQuiz.quizTitle || parsedQuiz.title || `${subject} Academic Mastery Quiz (${normalizedQuestions.length} Questions)`,
          questions: normalizedQuestions,
        };
      }
    }
    throw new Error("Invalid or empty quiz structure returned from AI model.");
  } catch (error) {
    console.warn("AI Quiz generation error, using fallback quiz data:", error);
    return generateFallbackQuiz(subject, level, safeNumQuestions, topic, subTopic, year, semester);
  }
};
