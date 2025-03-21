// Static data for NYC Housing Department visualization

export interface Site {
  id: number;
  name: string;
  blockNumber: number;
  lotNumber: number;
  currentFAR: number;
  allowedFAR: number;
  potentialUnits: number;
  latitude: number;
  longitude: number;
  zoning: string;
  position?: { top: string; left: string };
}

export interface Scenario {
  id: number;
  siteId: number;
  name: string;
  description: string;
  unitCount: number;
  affordablePercentage: number;
  buildingHeight: number;
  stories: number;
  squareFootage: number;
  far: number;
  constructionTimeline: number;
  estimatedCost: number;
  imageUrl: string;
}

export interface UnitType {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AffordabilityLevel {
  name: string;
  percentage: number;
  unitCount: number;
  color: string;
}

export interface CommunityBenefit {
  name: string;
  available: boolean;
}

export interface TransitImpact {
  name: string;
  beforeCapacity: number;
  afterCapacity: number;
}

export interface SchoolCapacity {
  name: string;
  type: string;
  beforeCapacity: number;
  afterCapacity: number;
}

export interface EconomicImpact {
  constructionJobs: number;
  permanentJobs: number;
  beforeTaxRevenue: number;
  afterTaxRevenue: number;
  localBusinessImpacts: {
    name: string;
    percentage: number;
  }[];
}

// Sample Sites Data (simulated positions for NYC map)
export const sites: Site[] = [
  {
    id: 1,
    name: "East Village R7A Lot",
    blockNumber: 972,
    lotNumber: 34,
    currentFAR: 1.2,
    allowedFAR: 4.0,
    potentialUnits: 85,
    latitude: 40.726,
    longitude: -73.984,
    zoning: "R7A",
    position: { top: "150px", left: "350px" }
  },
  {
    id: 2,
    name: "Williamsburg R6 Lot",
    blockNumber: 2382,
    lotNumber: 17,
    currentFAR: 2.1,
    allowedFAR: 3.6,
    potentialUnits: 64,
    latitude: 40.714,
    longitude: -73.961,
    zoning: "R6",
    position: { top: "220px", left: "420px" }
  },
  {
    id: 3,
    name: "Bed-Stuy R7D Lot",
    blockNumber: 1624,
    lotNumber: 48,
    currentFAR: 2.8,
    allowedFAR: 4.2,
    potentialUnits: 42,
    latitude: 40.687,
    longitude: -73.949,
    zoning: "R7D",
    position: { top: "280px", left: "300px" }
  },
  {
    id: 4,
    name: "Harlem R8 Lot",
    blockNumber: 1820,
    lotNumber: 52,
    currentFAR: 2.5,
    allowedFAR: 6.0,
    potentialUnits: 28,
    latitude: 40.805,
    longitude: -73.941,
    zoning: "R8",
    position: { top: "350px", left: "380px" }
  }
];

// Sample Development Scenarios
export const scenarios: Scenario[] = [
  {
    id: 1,
    siteId: 1,
    name: "Maximum Density Residential",
    description: "Maximizes total unit count with standard construction",
    unitCount: 85,
    affordablePercentage: 25,
    buildingHeight: 85,
    stories: 8,
    squareFootage: 78500,
    far: 3.9,
    constructionTimeline: 24,
    estimatedCost: 46.2,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    siteId: 1,
    name: "Mixed-Use with Retail",
    description: "Ground floor commercial with residential above",
    unitCount: 72,
    affordablePercentage: 25,
    buildingHeight: 81,
    stories: 8,
    squareFootage: 78000,
    far: 3.8,
    constructionTimeline: 26,
    estimatedCost: 47.5,
    imageUrl: "https://images.unsplash.com/photo-1577791465485-b80039b4d69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    siteId: 1,
    name: "Community-Focused",
    description: "Includes childcare center and community space",
    unitCount: 64,
    affordablePercentage: 35,
    buildingHeight: 75,
    stories: 7,
    squareFootage: 74000,
    far: 3.7,
    constructionTimeline: 28,
    estimatedCost: 45.8,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    siteId: 1,
    name: "Passive House Design",
    description: "High-efficiency sustainable construction",
    unitCount: 78,
    affordablePercentage: 30,
    buildingHeight: 82,
    stories: 8,
    squareFootage: 76000,
    far: 3.8,
    constructionTimeline: 30,
    estimatedCost: 53.0,
    imageUrl: "https://images.unsplash.com/photo-1518353053542-7ea33d942319?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

// Unit Type Distribution for Maximum Density Scenario
export const unitTypeDistribution: UnitType[] = [
  { name: "Studios", count: 30, percentage: 35, color: "#0A5796" },
  { name: "1BR", count: 38, percentage: 45, color: "#28A745" },
  { name: "2BR", count: 17, percentage: 20, color: "#FF6B00" }
];

// Affordability Levels for Maximum Density Scenario
export const affordabilityLevels: AffordabilityLevel[] = [
  { name: "Market Rate Units (75%)", percentage: 75, unitCount: 64, color: "#6C757D" },
  { name: "80% AMI (10%)", percentage: 10, unitCount: 8, color: "#0A5796" },
  { name: "60% AMI (10%)", percentage: 10, unitCount: 8, color: "#0A5796" },
  { name: "40% AMI (5%)", percentage: 5, unitCount: 5, color: "#0A5796" }
];

// Community Benefits for Maximum Density Scenario
export const communityBenefits: CommunityBenefit[] = [
  { name: "25 affordable housing units", available: true },
  { name: "Bicycle parking (45 spaces)", available: true },
  { name: "Community facility space", available: false },
  { name: "Green roof/public space", available: false }
];

// Development cost comparison (per unit in $K)
export const costComparison = [
  { name: "Max Density", cost: 544, active: true },
  { name: "Mixed-Use", cost: 562, active: false },
  { name: "Community", cost: 612, active: false },
  { name: "Passive", cost: 679, active: false }
];

// Transit Impact Data
export const transitImpacts: TransitImpact[] = [
  { name: "1st Ave Station (L)", beforeCapacity: 87, afterCapacity: 93 },
  { name: "M14 SBS Bus Route", beforeCapacity: 74, afterCapacity: 79 }
];

// School Capacity Data
export const schoolCapacities: SchoolCapacity[] = [
  { name: "PS 064", type: "Elementary", beforeCapacity: 85, afterCapacity: 87 },
  { name: "MS 104", type: "Middle", beforeCapacity: 92, afterCapacity: 94 },
  { name: "Stuyvesant", type: "High", beforeCapacity: 98, afterCapacity: 99 }
];

// Economic Impact Data
export const economicImpact: EconomicImpact = {
  constructionJobs: 185,
  permanentJobs: 12,
  beforeTaxRevenue: 82450,
  afterTaxRevenue: 274800,
  localBusinessImpacts: [
    { name: "Retail Sales", percentage: 8 },
    { name: "Restaurant Revenue", percentage: 5 },
    { name: "Service Demand", percentage: 3 }
  ]
};

// AI Assistant Data
export const aiAssistantData = {
  siteName: "East Village R7A Lot",
  siteAnalysis: [
    "Current FAR of 1.2 is significantly below allowed 4.0 FAR",
    "Potential for 85 new housing units",
    "Located within 0.2 miles of multiple transit options",
    "Existing structure is over 70 years old"
  ],
  developmentOptions: {
    option1: {
      name: "MIH Option 1 (25% at 60% AMI)",
      units: 21
    },
    option2: {
      name: "MIH Option 2 (30% at 80% AMI)",
      units: 26
    },
    timeline: "18-24 months",
    cost: "$42.5M - $48.2M"
  },
  recommendation: "This site is ideal for the Mixed-Income Housing program with ground floor community facility space. Consider reaching out to the property owner to discuss affordable housing incentives."
};

// Neighborhood Insights
export const neighborhoodInsights = [
  {
    title: "Housing Pressure",
    content: "This development will help alleviate housing pressure in the East Village, where rental prices have increased 18% over the past 5 years. The addition of 21 affordable units is significant in a neighborhood that has lost approximately 14% of its rent-stabilized housing stock since 2010."
  },
  {
    title: "School Capacity",
    content: "While elementary schools can absorb new students, the district's middle schools are approaching capacity. DOE should monitor enrollment patterns and may need to expand MS 104 facilities within 3-5 years if additional development occurs."
  },
  {
    title: "Transit Analysis",
    content: "The L train and M14 bus can accommodate increased ridership in off-peak hours, but peak morning congestion may require MTA schedule adjustments. Recommend coordinating with MTA on potential service increases during 7:30-8:30am weekday window."
  },
  {
    title: "Economic Benefits", 
    content: "The significant increase in property tax revenue could support neighborhood improvements. Consider allocating a portion to streetscape enhancements and playground renovations at Tompkins Square Park to accommodate increased usage."
  }
];
