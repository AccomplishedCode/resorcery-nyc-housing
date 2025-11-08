import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Building, Home, DollarSign, Calendar, Users, TreePine, 
  Zap, Car, TrendingUp, BarChart3, Eye, Download,
  CheckCircle, AlertTriangle, Clock, Target, Lightbulb,
  ArrowRight, MapPin, Building2, Layers
} from 'lucide-react';
import { nycSites } from '@/lib/nyc-mock-data';
import { nycColors } from '@/lib/nyc-design-system';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

interface DevelopmentScenario {
  id: string;
  name: string;
  description: string;
  focus: 'Density' | 'Affordability' | 'Mixed-Use' | 'Sustainability';
  image: string;
  stats: {
    totalUnits: number;
    affordablePercentage: number;
    stories: number;
    sqft: number;
    far: number;
    cost: number;
    timeline: number;
    parking: number;
    commercialSpace: number;
    greenSpace: number;
    energyEfficiency: number;
    walkScore: number;
  };
  unitMix: {
    studio: number;
    oneBed: number;
    twoBed: number;
    threeBed: number;
  };
  amenities: string[];
  sustainability: {
    leedLevel: string;
    solarPanels: boolean;
    greenRoof: boolean;
    rainwaterCollection: boolean;
    energyEfficiency: number;
  };
  financials: {
    totalCost: number;
    costPerUnit: number;
    expectedRevenue: number;
    roi: number;
    paybackPeriod: number;
    subsidyRequired: number;
  };
  community: {
    jobsCreated: number;
    schoolCapacityImpact: number;
    transitImpact: number;
    economicImpact: number;
  };
}

const mockScenarios: DevelopmentScenario[] = [
  {
    id: 'density-max',
    name: 'Maximum Density',
    description: 'Maximize unit count using full FAR allowance with focus on addressing housing shortage',
    focus: 'Density',
    image: '/api/placeholder/400/300',
    stats: {
      totalUnits: 350,
      affordablePercentage: 25,
      stories: 15,
      sqft: 280000,
      far: 7.5,
      cost: 85000000,
      timeline: 36,
      parking: 140,
      commercialSpace: 8000,
      greenSpace: 2000,
      energyEfficiency: 70,
      walkScore: 95
    },
    unitMix: { studio: 20, oneBed: 45, twoBed: 25, threeBed: 10 },
    amenities: ['Fitness Center', 'Rooftop Deck', 'Co-working Space', 'Bike Storage'],
    sustainability: {
      leedLevel: 'Silver',
      solarPanels: true,
      greenRoof: false,
      rainwaterCollection: true,
      energyEfficiency: 70
    },
    financials: {
      totalCost: 85000000,
      costPerUnit: 242857,
      expectedRevenue: 12500000,
      roi: 14.7,
      paybackPeriod: 8.5,
      subsidyRequired: 15000000
    },
    community: {
      jobsCreated: 450,
      schoolCapacityImpact: 15,
      transitImpact: 8,
      economicImpact: 25000000
    }
  },
  {
    id: 'affordable-focus',
    name: 'Affordability Focused',
    description: 'Prioritize affordable housing with 60% affordable units and community-centered design',
    focus: 'Affordability',
    image: '/api/placeholder/400/300',
    stats: {
      totalUnits: 240,
      affordablePercentage: 60,
      stories: 8,
      sqft: 192000,
      far: 4.8,
      cost: 58000000,
      timeline: 30,
      parking: 96,
      commercialSpace: 3000,
      greenSpace: 8000,
      energyEfficiency: 75,
      walkScore: 88
    },
    unitMix: { studio: 15, oneBed: 35, twoBed: 35, threeBed: 15 },
    amenities: ['Community Garden', 'Childcare Center', 'Community Kitchen', 'Learning Center'],
    sustainability: {
      leedLevel: 'Gold',
      solarPanels: true,
      greenRoof: true,
      rainwaterCollection: true,
      energyEfficiency: 75
    },
    financials: {
      totalCost: 58000000,
      costPerUnit: 241667,
      expectedRevenue: 7200000,
      roi: 12.4,
      paybackPeriod: 9.2,
      subsidyRequired: 28000000
    },
    community: {
      jobsCreated: 320,
      schoolCapacityImpact: 12,
      transitImpact: 6,
      economicImpact: 18000000
    }
  },
  {
    id: 'mixed-use',
    name: 'Mixed-Use Village',
    description: 'Balanced approach with retail, office, and residential creating vibrant neighborhood hub',
    focus: 'Mixed-Use',
    image: '/api/placeholder/400/300',
    stats: {
      totalUnits: 180,
      affordablePercentage: 40,
      stories: 12,
      sqft: 320000,
      far: 6.0,
      cost: 72000000,
      timeline: 42,
      parking: 200,
      commercialSpace: 45000,
      greenSpace: 5000,
      energyEfficiency: 80,
      walkScore: 92
    },
    unitMix: { studio: 10, oneBed: 40, twoBed: 35, threeBed: 15 },
    amenities: ['Retail Plaza', 'Office Space', 'Restaurant', 'Grocery Store', 'Pharmacy'],
    sustainability: {
      leedLevel: 'Gold',
      solarPanels: true,
      greenRoof: true,
      rainwaterCollection: true,
      energyEfficiency: 80
    },
    financials: {
      totalCost: 72000000,
      costPerUnit: 400000,
      expectedRevenue: 15800000,
      roi: 21.9,
      paybackPeriod: 5.8,
      subsidyRequired: 12000000
    },
    community: {
      jobsCreated: 580,
      schoolCapacityImpact: 8,
      transitImpact: 12,
      economicImpact: 35000000
    }
  },
  {
    id: 'green-pioneer',
    name: 'Green Pioneer',
    description: 'Cutting-edge sustainable design with net-zero energy and innovative green technologies',
    focus: 'Sustainability',
    image: '/api/placeholder/400/300',
    stats: {
      totalUnits: 200,
      affordablePercentage: 35,
      stories: 10,
      sqft: 240000,
      far: 5.0,
      cost: 68000000,
      timeline: 38,
      parking: 60,
      commercialSpace: 5000,
      greenSpace: 12000,
      energyEfficiency: 95,
      walkScore: 85
    },
    unitMix: { studio: 25, oneBed: 40, twoBed: 25, threeBed: 10 },
    amenities: ['Vertical Farm', 'Solar Garden', 'Rainwater Park', 'EV Charging', 'Composting'],
    sustainability: {
      leedLevel: 'Platinum',
      solarPanels: true,
      greenRoof: true,
      rainwaterCollection: true,
      energyEfficiency: 95
    },
    financials: {
      totalCost: 68000000,
      costPerUnit: 340000,
      expectedRevenue: 9600000,
      roi: 14.1,
      paybackPeriod: 8.8,
      subsidyRequired: 18000000
    },
    community: {
      jobsCreated: 380,
      schoolCapacityImpact: 10,
      transitImpact: 4,
      economicImpact: 22000000
    }
  }
];

export default function DevelopmentScenariosEnhanced() {
  const [selectedSite] = useState(nycSites[0]); // Default to first site
  const [selectedScenario, setSelectedScenario] = useState<string>('density-max');
  const [comparisonMode, setComparisonMode] = useState<'single' | 'compare'>('single');
  const [compareScenarios, setCompareScenarios] = useState<string[]>(['density-max', 'affordable-focus']);

  const scenario = mockScenarios.find(s => s.id === selectedScenario) || mockScenarios[0];

  const handleScenarioSelect = (scenarioId: string) => {
    if (comparisonMode === 'single') {
      setSelectedScenario(scenarioId);
    } else {
      // Handle comparison mode
      if (compareScenarios.includes(scenarioId)) {
        setCompareScenarios(prev => prev.filter(id => id !== scenarioId));
      } else if (compareScenarios.length < 3) {
        setCompareScenarios(prev => [...prev, scenarioId]);
      }
    }
  };

  const financialComparisonData = useMemo(() => {
    return mockScenarios.map(scenario => ({
      name: scenario.name.split(' ')[0],
      cost: scenario.financials.totalCost / 1000000,
      revenue: scenario.financials.expectedRevenue / 1000000,
      roi: scenario.financials.roi,
      units: scenario.stats.totalUnits
    }));
  }, []);

  const sustainabilityData = useMemo(() => {
    return mockScenarios.map(scenario => ({
      name: scenario.name.split(' ')[0],
      efficiency: scenario.stats.energyEfficiency,
      greenSpace: scenario.stats.greenSpace,
      walkScore: scenario.stats.walkScore
    }));
  }, []);

  const getFocusColor = (focus: string) => {
    switch (focus) {
      case 'Density': return nycColors.primary.blue;
      case 'Affordability': return nycColors.secondary.green;
      case 'Mixed-Use': return nycColors.secondary.orange;
      case 'Sustainability': return nycColors.secondary.purple;
      default: return nycColors.neutral.gray;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Development Scenarios</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{selectedSite.name} • {selectedSite.neighborhood}, {selectedSite.borough}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant={comparisonMode === 'single' ? 'default' : 'outline'}
                onClick={() => setComparisonMode('single')}
                className={comparisonMode === 'single' ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}
              >
                <Eye className="h-4 w-4 mr-2" />
                Single View
              </Button>
              <Button
                variant={comparisonMode === 'compare' ? 'default' : 'outline'}
                onClick={() => setComparisonMode('compare')}
                className={comparisonMode === 'compare' ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Site Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none">
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Current FAR</div>
                  <div className="font-bold text-lg">{selectedSite.currentFAR}</div>
                </div>
                <div>
                  <div className="text-gray-600">Allowed FAR</div>
                  <div className="font-bold text-lg">{selectedSite.allowedFAR}</div>
                </div>
                <div>
                  <div className="text-gray-600">Lot Size</div>
                  <div className="font-bold text-lg">{selectedSite.lotSize.toLocaleString()} sq ft</div>
                </div>
                <div>
                  <div className="text-gray-600">Zoning</div>
                  <div className="font-bold text-lg font-mono">{selectedSite.zoning}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {comparisonMode === 'single' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Scenario Selector */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Select Scenario</h3>
              <div className="space-y-3">
                {mockScenarios.map((scen) => (
                  <motion.div
                    key={scen.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedScenario === scen.id 
                          ? 'ring-2 border-opacity-50' 
                          : 'hover:shadow-md'
                      }`}
                      style={{ 
                        ringColor: selectedScenario === scen.id ? getFocusColor(scen.focus) : 'transparent',
                        borderColor: selectedScenario === scen.id ? getFocusColor(scen.focus) : undefined
                      }}
                      onClick={() => handleScenarioSelect(scen.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge 
                            className="text-xs text-white mb-2"
                            style={{ backgroundColor: getFocusColor(scen.focus) }}
                          >
                            {scen.focus}
                          </Badge>
                          {selectedScenario === scen.id && (
                            <CheckCircle className="h-5 w-5" style={{ color: getFocusColor(scen.focus) }} />
                          )}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{scen.name}</h4>
                        <p className="text-xs text-gray-600 mb-3">{scen.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Units:</span>
                            <span className="font-semibold ml-1">{scen.stats.totalUnits}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Affordable:</span>
                            <span className="font-semibold ml-1">{scen.stats.affordablePercentage}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Stories:</span>
                            <span className="font-semibold ml-1">{scen.stats.stories}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Cost:</span>
                            <span className="font-semibold ml-1">${(scen.stats.cost / 1000000).toFixed(0)}M</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={selectedScenario}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                    <TabsTrigger value="community">Community Impact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Building className="h-8 w-8 mx-auto mb-2 text-nyc-blue" />
                          <div className="text-2xl font-bold">{scenario.stats.totalUnits}</div>
                          <div className="text-sm text-gray-600">Total Units</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Home className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold">{scenario.stats.affordablePercentage}%</div>
                          <div className="text-sm text-gray-600">Affordable</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Layers className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                          <div className="text-2xl font-bold">{scenario.stats.stories}</div>
                          <div className="text-sm text-gray-600">Stories</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold">${(scenario.stats.cost / 1000000).toFixed(0)}M</div>
                          <div className="text-sm text-gray-600">Total Cost</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Unit Mix Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          Unit Mix Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Studio', value: scenario.unitMix.studio, fill: nycColors.primary.blue },
                                  { name: '1 Bedroom', value: scenario.unitMix.oneBed, fill: nycColors.secondary.green },
                                  { name: '2 Bedroom', value: scenario.unitMix.twoBed, fill: nycColors.secondary.orange },
                                  { name: '3 Bedroom', value: scenario.unitMix.threeBed, fill: nycColors.secondary.purple }
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Timeline & Amenities */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Development Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Total Duration</span>
                              <span className="font-bold">{scenario.stats.timeline} months</span>
                            </div>
                            <Progress value={(scenario.stats.timeline / 48) * 100} className="h-2" />
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center">
                                <div className="font-semibold">Planning</div>
                                <div className="text-gray-600">6 months</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold">Approvals</div>
                                <div className="text-gray-600">8 months</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold">Construction</div>
                                <div className="text-gray-600">{scenario.stats.timeline - 14} months</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Key Amenities
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {scenario.amenities.map((amenity, index) => (
                              <motion.div
                                key={amenity}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                {amenity}
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-6">
                    {/* Financial Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Cost Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span>Total Project Cost</span>
                              <span className="font-bold">${(scenario.financials.totalCost / 1000000).toFixed(1)}M</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cost per Unit</span>
                              <span className="font-bold">${scenario.financials.costPerUnit.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Subsidy Required</span>
                              <span className="font-bold">${(scenario.financials.subsidyRequired / 1000000).toFixed(1)}M</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                              <span>Expected ROI</span>
                              <span className="font-bold text-green-600">{scenario.financials.roi}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payback Period</span>
                              <span className="font-bold">{scenario.financials.paybackPeriod} years</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Revenue Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={[
                                { name: 'Year 1', revenue: scenario.financials.expectedRevenue * 0.6 / 1000000, cost: scenario.financials.totalCost * 0.8 / 1000000 },
                                { name: 'Year 3', revenue: scenario.financials.expectedRevenue * 0.9 / 1000000, cost: scenario.financials.totalCost * 0.2 / 1000000 },
                                { name: 'Year 5', revenue: scenario.financials.expectedRevenue / 1000000, cost: 0 },
                              ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill={nycColors.secondary.green} name="Revenue ($M)" />
                                <Bar dataKey="cost" fill={nycColors.secondary.orange} name="Remaining Cost ($M)" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="sustainability" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TreePine className="h-5 w-5" />
                            Environmental Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>LEED Certification</span>
                              <Badge variant="outline" className="font-semibold">
                                {scenario.sustainability.leedLevel}
                              </Badge>
                            </div>
                            
                            <div className="space-y-3">
                              {[
                                { label: 'Solar Panels', enabled: scenario.sustainability.solarPanels },
                                { label: 'Green Roof', enabled: scenario.sustainability.greenRoof },
                                { label: 'Rainwater Collection', enabled: scenario.sustainability.rainwaterCollection }
                              ].map((feature) => (
                                <div key={feature.label} className="flex items-center justify-between">
                                  <span className="text-sm">{feature.label}</span>
                                  {feature.enabled ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="pt-4">
                              <div className="flex justify-between items-center mb-2">
                                <span>Energy Efficiency</span>
                                <span className="font-bold">{scenario.stats.energyEfficiency}%</span>
                              </div>
                              <Progress value={scenario.stats.energyEfficiency} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Environmental Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart data={[
                                { subject: 'Energy Efficiency', value: scenario.stats.energyEfficiency, fullMark: 100 },
                                { subject: 'Green Space', value: (scenario.stats.greenSpace / 15000) * 100, fullMark: 100 },
                                { subject: 'Walk Score', value: scenario.stats.walkScore, fullMark: 100 },
                                { subject: 'Transit Access', value: 85, fullMark: 100 },
                                { subject: 'Carbon Reduction', value: scenario.stats.energyEfficiency * 0.8, fullMark: 100 },
                              ]}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                <Radar name="Score" dataKey="value" stroke={nycColors.secondary.green} fill={nycColors.secondary.green} fillOpacity={0.3} />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="community" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Community Benefits
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-nyc-blue">{scenario.community.jobsCreated}</div>
                              <div className="text-sm text-gray-600">Jobs Created</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{scenario.community.schoolCapacityImpact}%</div>
                              <div className="text-sm text-gray-600">School Impact</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{scenario.community.transitImpact}%</div>
                              <div className="text-sm text-gray-600">Transit Usage</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">${(scenario.community.economicImpact / 1000000).toFixed(0)}M</div>
                              <div className="text-sm text-gray-600">Economic Impact</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Long-term Impact Projection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={[
                                { year: '2025', jobs: 0, impact: 0 },
                                { year: '2026', jobs: scenario.community.jobsCreated * 0.3, impact: scenario.community.economicImpact * 0.2 / 1000000 },
                                { year: '2027', jobs: scenario.community.jobsCreated * 0.7, impact: scenario.community.economicImpact * 0.6 / 1000000 },
                                { year: '2028', jobs: scenario.community.jobsCreated, impact: scenario.community.economicImpact / 1000000 },
                                { year: '2030', jobs: scenario.community.jobsCreated * 1.2, impact: scenario.community.economicImpact * 1.5 / 1000000 },
                              ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="jobs" stroke={nycColors.primary.blue} name="Jobs" />
                                <Line type="monotone" dataKey="impact" stroke={nycColors.secondary.green} name="Economic Impact ($M)" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        ) : (
          // Comparison Mode
          <div className="space-y-6">
            {/* Scenario Selection for Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Select Scenarios to Compare (up to 3)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockScenarios.map((scen) => (
                    <Card 
                      key={scen.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        compareScenarios.includes(scen.id) 
                          ? 'ring-2 ring-nyc-blue bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => handleScenarioSelect(scen.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            className="text-xs text-white"
                            style={{ backgroundColor: getFocusColor(scen.focus) }}
                          >
                            {scen.focus}
                          </Badge>
                          {compareScenarios.includes(scen.id) && (
                            <CheckCircle className="h-5 w-5 text-nyc-blue" />
                          )}
                        </div>
                        <h4 className="font-semibold text-sm">{scen.name}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparison Charts */}
            {compareScenarios.length > 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financialComparisonData.filter(d => 
                          compareScenarios.some(id => mockScenarios.find(s => s.id === id)?.name.startsWith(d.name))
                        )}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="cost" fill={nycColors.secondary.orange} name="Cost ($M)" />
                          <Bar dataKey="revenue" fill={nycColors.secondary.green} name="Revenue ($M)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sustainability Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sustainabilityData.filter(d => 
                          compareScenarios.some(id => mockScenarios.find(s => s.id === id)?.name.startsWith(d.name))
                        )}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="efficiency" stackId="1" stroke={nycColors.secondary.green} fill={nycColors.secondary.green} name="Energy Efficiency" />
                          <Area type="monotone" dataKey="walkScore" stackId="2" stroke={nycColors.primary.blue} fill={nycColors.primary.blue} name="Walk Score" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}