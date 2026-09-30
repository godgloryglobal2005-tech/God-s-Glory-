export const formatMathSymbols = (text: string): string => {
  if (!text) return '';

  let formatted = text;

  // 1. Strip $$...$$ block math and $...$ inline math wrappers around expressions
  formatted = formatted.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, '$1');

  // Match inline $...$ with backslashes or math keywords
  formatted = formatted.replace(/\$([^$\n]*?\\[a-zA-Z]+[^$\n]*?)\$/g, '$1');
  formatted = formatted.replace(/\$([^$\n]*?[\pi\lambda\theta\Delta\sigma\sqrt\pm\times\div\le\ge\neq\approx\infty][^$\n]*?)\$/g, '$1');

  // 2. Convert standard LaTeX Greek letters & math symbols to exact Unicode symbols
  formatted = formatted
    .replace(/\\pi\b/g, 'π')
    .replace(/\\lambda\b/g, 'λ')
    .replace(/\\Lambda\b/g, 'Λ')
    .replace(/\\theta\b/g, 'θ')
    .replace(/\\Theta\b/g, 'Θ')
    .replace(/\\Delta\b/g, 'Δ')
    .replace(/\\delta\b/g, 'δ')
    .replace(/\\alpha\b/g, 'α')
    .replace(/\\beta\b/g, 'β')
    .replace(/\\gamma\b/g, 'γ')
    .replace(/\\Gamma\b/g, 'Γ')
    .replace(/\\sigma\b/g, 'σ')
    .replace(/\\Sigma\b/g, 'Σ')
    .replace(/\\omega\b/g, 'ω')
    .replace(/\\Omega\b/g, 'Ω')
    .replace(/\\phi\b/g, 'ϕ')
    .replace(/\\Phi\b/g, 'Φ')
    .replace(/\\psi\b/g, 'ψ')
    .replace(/\\mu\b/g, 'μ')
    .replace(/\\epsilon\b/g, 'ε')
    .replace(/\\rho\b/g, 'ρ')
    .replace(/\\tau\b/g, 'τ')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\degree\b/g, '°')
    .replace(/\\pm\b/g, '±')
    .replace(/\\mp\b/g, '∓')
    .replace(/\\times\b/g, '×')
    .replace(/\\div\b/g, '÷')
    .replace(/\\cdot\b/g, '·')
    .replace(/\\approx\b/g, '≈')
    .replace(/\\neq\b/g, '≠')
    .replace(/\\leq\b|\\le\b/g, '≤')
    .replace(/\\geq\b|\\ge\b/g, '≥')
    .replace(/\\int\b/g, '∫')
    .replace(/\\sum\b/g, '∑')
    .replace(/\\prod\b/g, '∏')
    .replace(/\\partial\b/g, '∂')
    .replace(/\\nabla\b/g, '∇')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\sqrt\b/g, '√')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');

  // 3. Clean up single dollar signs around isolated variables, e.g. $x$, $y$, $\pi$, $\lambda$
  formatted = formatted.replace(/\$([a-zA-Z0-9πλθΔαβγσωΩ∞√±×÷·≈≠≤≥°]+)\$/g, '$1');

  return formatted;
};
