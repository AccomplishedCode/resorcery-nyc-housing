// NYC Government Official Design System
// Based on NYC.gov design guidelines and HPD branding

export const nycColors = {
  // Primary NYC Government Colors
  primary: {
    blue: '#003764',        // NYC Blue (official)
    darkBlue: '#002d56',    // Darker variant
    lightBlue: '#0050a1',   // Lighter variant
    skyBlue: '#4a90e2',     // Accent blue
  },
  
  // Secondary Colors
  secondary: {
    green: '#006400',       // Success/Growth
    orange: '#f37321',      // Warning/Alert
    red: '#d0021b',         // Error/Critical
    yellow: '#ffc72c',      // Highlight
    purple: '#6b3aa2',      // Innovation
  },
  
  // Neutral Colors
  neutral: {
    black: '#212121',
    darkGray: '#424242',
    gray: '#666666',
    mediumGray: '#999999',
    lightGray: '#cccccc',
    paleGray: '#e8e8e8',
    offWhite: '#f5f5f5',
    white: '#ffffff',
  },
  
  // Borough Colors (for map visualization)
  boroughs: {
    manhattan: '#0074d9',
    brooklyn: '#2ecc40',
    queens: '#ff851b',
    bronx: '#b10dc9',
    statenIsland: '#ffdc00',
  },
  
  // Development Status Colors
  status: {
    available: '#28a745',
    underReview: '#ffc107',
    inProgress: '#17a2b8',
    completed: '#6c757d',
    highPotential: '#ff6b6b',
  },
  
  // Affordability Levels
  affordability: {
    deeplyAffordable: '#004b87',
    veryLowIncome: '#0074d9',
    lowIncome: '#4a90e2',
    moderate: '#7fcdff',
    marketRate: '#b8d4f0',
  }
};

export const nycTypography = {
  fontFamily: {
    // NYC uses Public Sans for digital properties
    primary: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const nycSpacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

export const nycShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const nycBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Export a theme object for easy integration
export const nycTheme = {
  colors: nycColors,
  typography: nycTypography,
  spacing: nycSpacing,
  shadows: nycShadows,
  breakpoints: nycBreakpoints,
};

// Helper function to get borough color
export const getBoroughColor = (borough: string): string => {
  const normalized = borough.toLowerCase().replace(/\s+/g, '');
  return nycColors.boroughs[normalized as keyof typeof nycColors.boroughs] || nycColors.neutral.gray;
};

// Helper function to get affordability color
export const getAffordabilityColor = (percentage: number): string => {
  if (percentage >= 80) return nycColors.affordability.deeplyAffordable;
  if (percentage >= 60) return nycColors.affordability.veryLowIncome;
  if (percentage >= 40) return nycColors.affordability.lowIncome;
  if (percentage >= 20) return nycColors.affordability.moderate;
  return nycColors.affordability.marketRate;
};