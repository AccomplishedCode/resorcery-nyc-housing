// Comprehensive NYC Mock Data for All 5 Boroughs
import { nycColors } from './nyc-design-system';

export interface Site {
  id: string;
  name: string;
  address: string;
  borough: string;
  neighborhood: string;
  lat: number;
  lng: number;
  currentFAR: number;
  allowedFAR: number;
  lotSize: number; // sq ft
  currentUnits: number;
  potentialUnits: number;
  zoning: string;
  ownershipType: 'City-Owned' | 'Private' | 'State' | 'Federal';
  status: 'Available' | 'Under Review' | 'In Progress' | 'Completed';
  nearSubway: boolean;
  walkScore: number;
  schoolsNearby: number;
  parksNearby: number;
  developmentPriority: 'High' | 'Medium' | 'Low';
  estimatedCost: number;
}

export const nycSites: Site[] = [
  // Manhattan Sites
  {
    id: 'MN-001',
    name: 'East Harlem Opportunity Zone',
    address: '2351 First Avenue',
    borough: 'Manhattan',
    neighborhood: 'East Harlem',
    lat: 40.7957,
    lng: -73.9389,
    currentFAR: 2.5,
    allowedFAR: 7.5,
    lotSize: 25000,
    currentUnits: 0,
    potentialUnits: 187,
    zoning: 'R7A',
    ownershipType: 'City-Owned',
    status: 'Available',
    nearSubway: true,
    walkScore: 98,
    schoolsNearby: 4,
    parksNearby: 2,
    developmentPriority: 'High',
    estimatedCost: 45000000
  },
  {
    id: 'MN-002',
    name: 'Lower East Side Mixed-Use',
    address: '145 Clinton Street',
    borough: 'Manhattan',
    neighborhood: 'Lower East Side',
    lat: 40.7189,
    lng: -73.9842,
    currentFAR: 1.8,
    allowedFAR: 6.0,
    lotSize: 18000,
    currentUnits: 12,
    potentialUnits: 108,
    zoning: 'R8A',
    ownershipType: 'Private',
    status: 'Under Review',
    nearSubway: true,
    walkScore: 99,
    schoolsNearby: 6,
    parksNearby: 3,
    developmentPriority: 'High',
    estimatedCost: 32000000
  },
  {
    id: 'MN-003',
    name: 'Washington Heights Development',
    address: '4790 Broadway',
    borough: 'Manhattan',
    neighborhood: 'Washington Heights',
    lat: 40.8677,
    lng: -73.9212,
    currentFAR: 3.0,
    allowedFAR: 5.0,
    lotSize: 30000,
    currentUnits: 45,
    potentialUnits: 150,
    zoning: 'R7-2',
    ownershipType: 'City-Owned',
    status: 'Available',
    nearSubway: true,
    walkScore: 95,
    schoolsNearby: 5,
    parksNearby: 2,
    developmentPriority: 'Medium',
    estimatedCost: 38000000
  },

  // Brooklyn Sites
  {
    id: 'BK-001',
    name: 'Downtown Brooklyn Tower',
    address: '141 Willoughby Street',
    borough: 'Brooklyn',
    neighborhood: 'Downtown Brooklyn',
    lat: 40.6922,
    lng: -73.9866,
    currentFAR: 2.0,
    allowedFAR: 10.0,
    lotSize: 35000,
    currentUnits: 0,
    potentialUnits: 350,
    zoning: 'R10',
    ownershipType: 'State',
    status: 'Available',
    nearSubway: true,
    walkScore: 98,
    schoolsNearby: 8,
    parksNearby: 4,
    developmentPriority: 'High',
    estimatedCost: 85000000
  },
  {
    id: 'BK-002',
    name: 'East New York Affordable Housing',
    address: '777 Atlantic Avenue',
    borough: 'Brooklyn',
    neighborhood: 'East New York',
    lat: 40.6782,
    lng: -73.9442,
    currentFAR: 1.5,
    allowedFAR: 4.5,
    lotSize: 40000,
    currentUnits: 20,
    potentialUnits: 180,
    zoning: 'R6B',
    ownershipType: 'City-Owned',
    status: 'In Progress',
    nearSubway: true,
    walkScore: 85,
    schoolsNearby: 3,
    parksNearby: 2,
    developmentPriority: 'High',
    estimatedCost: 42000000
  },
  {
    id: 'BK-003',
    name: 'Bushwick Creative District',
    address: '123 Knickerbocker Avenue',
    borough: 'Brooklyn',
    neighborhood: 'Bushwick',
    lat: 40.7081,
    lng: -73.9571,
    currentFAR: 2.2,
    allowedFAR: 4.0,
    lotSize: 22000,
    currentUnits: 30,
    potentialUnits: 88,
    zoning: 'R6A',
    ownershipType: 'Private',
    status: 'Under Review',
    nearSubway: true,
    walkScore: 92,
    schoolsNearby: 4,
    parksNearby: 1,
    developmentPriority: 'Medium',
    estimatedCost: 28000000
  },
  {
    id: 'BK-004',
    name: 'Sunset Park Industrial Conversion',
    address: '850 3rd Avenue',
    borough: 'Brooklyn',
    neighborhood: 'Sunset Park',
    lat: 40.6579,
    lng: -73.9956,
    currentFAR: 1.0,
    allowedFAR: 3.5,
    lotSize: 50000,
    currentUnits: 0,
    potentialUnits: 175,
    zoning: 'M1-2/R7A',
    ownershipType: 'City-Owned',
    status: 'Available',
    nearSubway: false,
    walkScore: 78,
    schoolsNearby: 5,
    parksNearby: 2,
    developmentPriority: 'Medium',
    estimatedCost: 48000000
  },

  // Queens Sites
  {
    id: 'QN-001',
    name: 'Long Island City Waterfront',
    address: '47-40 21st Street',
    borough: 'Queens',
    neighborhood: 'Long Island City',
    lat: 40.7472,
    lng: -73.9440,
    currentFAR: 2.5,
    allowedFAR: 8.0,
    lotSize: 45000,
    currentUnits: 0,
    potentialUnits: 360,
    zoning: 'R9',
    ownershipType: 'Private',
    status: 'Under Review',
    nearSubway: true,
    walkScore: 96,
    schoolsNearby: 6,
    parksNearby: 3,
    developmentPriority: 'High',
    estimatedCost: 92000000
  },
  {
    id: 'QN-002',
    name: 'Jamaica Downtown Revitalization',
    address: '89-14 Parsons Boulevard',
    borough: 'Queens',
    neighborhood: 'Jamaica',
    lat: 40.7057,
    lng: -73.8001,
    currentFAR: 1.8,
    allowedFAR: 5.0,
    lotSize: 38000,
    currentUnits: 25,
    potentialUnits: 190,
    zoning: 'R7X',
    ownershipType: 'City-Owned',
    status: 'Available',
    nearSubway: true,
    walkScore: 89,
    schoolsNearby: 7,
    parksNearby: 2,
    developmentPriority: 'High',
    estimatedCost: 45000000
  },
  {
    id: 'QN-003',
    name: 'Flushing Mixed-Use Complex',
    address: '136-20 38th Avenue',
    borough: 'Queens',
    neighborhood: 'Flushing',
    lat: 40.7614,
    lng: -73.8296,
    currentFAR: 3.0,
    allowedFAR: 6.5,
    lotSize: 28000,
    currentUnits: 40,
    potentialUnits: 182,
    zoning: 'R7-1',
    ownershipType: 'Private',
    status: 'Available',
    nearSubway: true,
    walkScore: 94,
    schoolsNearby: 9,
    parksNearby: 3,
    developmentPriority: 'Medium',
    estimatedCost: 52000000
  },
  {
    id: 'QN-004',
    name: 'Rockaway Beach Resilient Housing',
    address: 'Beach 94th Street',
    borough: 'Queens',
    neighborhood: 'Far Rockaway',
    lat: 40.5831,
    lng: -73.8180,
    currentFAR: 0.8,
    allowedFAR: 3.0,
    lotSize: 60000,
    currentUnits: 0,
    potentialUnits: 180,
    zoning: 'R5',
    ownershipType: 'City-Owned',
    status: 'Available',
    nearSubway: false,
    walkScore: 65,
    schoolsNearby: 3,
    parksNearby: 4,
    developmentPriority: 'Medium',
    estimatedCost: 55000000
  },

  // Bronx Sites
  {
    id: 'BX-001',
    name: 'South Bronx Transformation',
    address: '455 Southern Boulevard',
    borough: 'Bronx',
    neighborhood: 'Mott Haven',
    lat: 40.8154,
    lng: -73.9180,
    currentFAR: 1.5,
    allowedFAR: 5.0,
    lotSize: 42000,
    currentUnits: 0,
    potentialUnits: 210,
    zoning: 'R7A',
    ownershipType: 'City-Owned',
    status: 'In Progress',
    nearSubway: true,
    walkScore: 88,
    schoolsNearby: 5,
    parksNearby: 2,
    developmentPriority: 'High',
    estimatedCost: 48000000
  },
  {
    id: 'BX-002',
    name: 'Fordham Plaza Development',
    address: '2468 Grand Concourse',
    borough: 'Bronx',
    neighborhood: 'Fordham',
    lat: 40.8592,
    lng: -73.8974,
    currentFAR: 2.0,
    allowedFAR: 4.5,
    lotSize: 32000,
    currentUnits: 35,
    potentialUnits: 144,
    zoning: 'R7-1',
    ownershipType: 'State',
    status: 'Available',
    nearSubway: true,
    walkScore: 91,
    schoolsNearby: 6,
    parksNearby: 3,
    developmentPriority: 'Medium',
    estimatedCost: 36000000
  },
  {
    id: 'BX-003',
    name: 'Pelham Bay Affordable Complex',
    address: '2100 Westchester Avenue',
    borough: 'Bronx',
    neighborhood: 'Pelham Bay',
    lat: 40.8331,
    lng: -73.8332,
    currentFAR: 1.2,
    allowedFAR: 3.5,
    lotSize: 48000,
    currentUnits: 0,
    potentialUnits: 168,
    zoning: 'R6',
    ownershipType: 'City-Owned',
    status: 'Available',
    nearSubway: true,
    walkScore: 82,
    schoolsNearby: 4,
    parksNearby: 3,
    developmentPriority: 'Medium',
    estimatedCost: 42000000
  },

  // Staten Island Sites
  {
    id: 'SI-001',
    name: 'St. George Waterfront',
    address: '5 Hyatt Street',
    borough: 'Staten Island',
    neighborhood: 'St. George',
    lat: 40.6445,
    lng: -74.0788,
    currentFAR: 1.0,
    allowedFAR: 4.0,
    lotSize: 55000,
    currentUnits: 0,
    potentialUnits: 220,
    zoning: 'R7',
    ownershipType: 'City-Owned',
    status: 'Under Review',
    nearSubway: false,
    walkScore: 72,
    schoolsNearby: 4,
    parksNearby: 2,
    developmentPriority: 'High',
    estimatedCost: 58000000
  },
  {
    id: 'SI-002',
    name: 'Stapleton NYCHA Redevelopment',
    address: '45 Hill Street',
    borough: 'Staten Island',
    neighborhood: 'Stapleton',
    lat: 40.6265,
    lng: -74.0794,
    currentFAR: 0.8,
    allowedFAR: 3.0,
    lotSize: 70000,
    currentUnits: 50,
    potentialUnits: 210,
    zoning: 'R6',
    ownershipType: 'City-Owned',
    status: 'In Progress',
    nearSubway: false,
    walkScore: 68,
    schoolsNearby: 3,
    parksNearby: 3,
    developmentPriority: 'Medium',
    estimatedCost: 52000000
  },
  {
    id: 'SI-003',
    name: 'New Dorp Transit Village',
    address: '2875 Richmond Road',
    borough: 'Staten Island',
    neighborhood: 'New Dorp',
    lat: 40.5734,
    lng: -74.1180,
    currentFAR: 0.5,
    allowedFAR: 2.5,
    lotSize: 45000,
    currentUnits: 0,
    potentialUnits: 112,
    zoning: 'R5',
    ownershipType: 'Private',
    status: 'Available',
    nearSubway: false,
    walkScore: 58,
    schoolsNearby: 5,
    parksNearby: 2,
    developmentPriority: 'Low',
    estimatedCost: 32000000
  }
];

// Development Scenarios
export interface DevelopmentScenario {
  id: string;
  siteId: string;
  name: string;
  description: string;
  type: 'Mixed-Use' | 'Residential' | 'Affordable' | 'Luxury' | 'Senior' | 'Workforce';
  units: {
    total: number;
    studio: number;
    oneBed: number;
    twoBed: number;
    threeBed: number;
  };
  affordability: {
    marketRate: number;
    affordable80: number; // 80% AMI
    affordable60: number; // 60% AMI
    affordable40: number; // 40% AMI
    affordable30: number; // 30% AMI
  };
  commercial: {
    retail: number; // sq ft
    office: number; // sq ft
    community: number; // sq ft
  };
  sustainability: {
    leedLevel: 'None' | 'Certified' | 'Silver' | 'Gold' | 'Platinum';
    solarPanels: boolean;
    greenRoof: boolean;
    rainwaterHarvesting: boolean;
    passiveHouse: boolean;
  };
  parking: {
    spaces: number;
    type: 'Underground' | 'Surface' | 'Structured' | 'Street';
  };
  timeline: {
    planning: number; // months
    approvals: number; // months
    construction: number; // months
    total: number; // months
  };
  financials: {
    totalCost: number;
    landCost: number;
    constructionCost: number;
    softCosts: number;
    expectedRevenue: number;
    roi: number; // percentage
    affordableSubsidy: number;
  };
}

// Policy Parameters
export interface PolicyParameters {
  farBonus: {
    affordable: number; // % bonus for affordable housing
    green: number; // % bonus for green building
    mixedUse: number; // % bonus for mixed-use
  };
  taxIncentives: {
    j51: boolean; // Tax exemption for residential conversions
    icap: boolean; // Industrial & Commercial Abatement Program
    four21a: boolean; // 421-a tax exemption
    abatementYears: number;
  };
  mandatoryAffordable: {
    enabled: boolean;
    percentage: number; // % of units
    targetAMI: number; // Area Median Income target
  };
  parkingRequirements: {
    residentialRatio: number; // spaces per unit
    commercialRatio: number; // spaces per 1000 sq ft
    reducedNearTransit: boolean;
  };
}

// Neighborhood Impact Metrics
export interface NeighborhoodMetrics {
  population: {
    current: number;
    projected: number;
    density: number; // per sq mile
  };
  demographics: {
    medianIncome: number;
    medianAge: number;
    householdSize: number;
  };
  housing: {
    totalUnits: number;
    vacancyRate: number;
    medianRent: number;
    affordableUnits: number;
  };
  transportation: {
    transitScore: number;
    avgCommute: number; // minutes
    carOwnership: number; // percentage
  };
  education: {
    schools: number;
    avgClassSize: number;
    graduationRate: number;
  };
  economy: {
    jobs: number;
    unemploymentRate: number;
    businessCount: number;
  };
  environment: {
    greenSpace: number; // acres
    airQualityIndex: number;
    treeCanopy: number; // percentage
  };
}

// Helper functions
export const getSitesByBorough = (borough: string): Site[] => {
  return nycSites.filter(site => site.borough === borough);
};

export const getHighPrioritySites = (): Site[] => {
  return nycSites.filter(site => site.developmentPriority === 'High');
};

export const getCityOwnedSites = (): Site[] => {
  return nycSites.filter(site => site.ownershipType === 'City-Owned');
};

export const calculateDevelopmentPotential = (site: Site): number => {
  const farGap = site.allowedFAR - site.currentFAR;
  const additionalSqFt = farGap * site.lotSize;
  const avgUnitSize = 850; // sq ft
  return Math.floor(additionalSqFt / avgUnitSize);
};

export const estimateAffordableUnits = (totalUnits: number, affordablePercentage: number = 30): number => {
  return Math.floor(totalUnits * (affordablePercentage / 100));
};