import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TypewriterEffect, AIThinking } from '@/components/TypewriterEffect';
import { 
  TreePine, Zap, Droplets, Sun, Wind, Thermometer, 
  Leaf, Recycle, Car, Building, TrendingDown, TrendingUp,
  Target, Award, AlertTriangle, CheckCircle, Calculator,
  BarChart3, PieChart, Activity, Download, Play, Lightbulb
} from 'lucide-react';
import { nycSites } from '@/lib/nyc-mock-data';
import { nycColors } from '@/lib/nyc-design-system';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from 'recharts';

interface EnvironmentalMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'improving' | 'declining' | 'stable';
  category: 'energy' | 'water' | 'waste' | 'air' | 'carbon';
}

interface SustainabilityFeature {
  name: string;
  enabled: boolean;
  impact: number;
  cost: number;
  description: string;
  category: string;
}

export default function EnvironmentalImpactEnhanced() {
  const [selectedSite] = useState(nycSites[0]);
  const [buildingOrientation, setBuildingOrientation] = useState(180); // degrees
  const [greenRoofCoverage, setGreenRoofCoverage] = useState(60); // percentage
  const [solarPanelCoverage, setSolarPanelCoverage] = useState(80); // percentage
  const [timeOfDay, setTimeOfDay] = useState(12); // hour
  const [seasonIndex, setSeasonIndex] = useState(1); // 0-3 for seasons
  
  const [sustainabilityFeatures, setSustainabilityFeatures] = useState<SustainabilityFeature[]>([
    { name: 'Solar Panels', enabled: true, impact: 35, cost: 180000, description: 'Rooftop photovoltaic system', category: 'energy' },
    { name: 'Green Roof', enabled: true, impact: 15, cost: 120000, description: 'Living roof with vegetation', category: 'air' },
    { name: 'Rainwater Harvesting', enabled: true, impact: 25, cost: 85000, description: 'Stormwater collection system', category: 'water' },
    { name: 'Geothermal Heating', enabled: false, impact: 40, cost: 250000, description: 'Ground-source heat pump', category: 'energy' },
    { name: 'Smart Windows', enabled: true, impact: 20, cost: 95000, description: 'Automated daylight control', category: 'energy' },
    { name: 'EV Charging Stations', enabled: true, impact: 10, cost: 45000, description: 'Electric vehicle infrastructure', category: 'carbon' },
    { name: 'Composting System', enabled: false, impact: 12, cost: 35000, description: 'Organic waste processing', category: 'waste' },
    { name: 'Greywater Recycling', enabled: false, impact: 18, cost: 75000, description: 'Water reuse system', category: 'water' }
  ]);

  const [analysisPhase, setAnalysisPhase] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [currentAnalysis, setCurrentAnalysis] = useState('');

  // Calculate environmental impact
  const environmentalMetrics = useMemo(() => {
    const baseEnergy = 120000; // kWh/year
    const baseCO2 = 45; // tons/year
    const baseWater = 2500; // gallons/month
    const baseWaste = 180; // tons/year

    const energySavings = sustainabilityFeatures
      .filter(f => f.enabled && f.category === 'energy')
      .reduce((total, f) => total + f.impact, 0);
    
    const carbonReduction = sustainabilityFeatures
      .filter(f => f.enabled && (f.category === 'carbon' || f.category === 'energy'))
      .reduce((total, f) => total + f.impact * 0.8, 0);

    const waterSavings = sustainabilityFeatures
      .filter(f => f.enabled && f.category === 'water')
      .reduce((total, f) => total + f.impact, 0);

    // Apply building orientation impact
    const orientationMultiplier = Math.cos((buildingOrientation - 180) * Math.PI / 180) * 0.2 + 0.8;
    
    return {
      energyUsage: Math.round(baseEnergy * (1 - energySavings / 100) * orientationMultiplier),
      carbonEmissions: Math.round(baseCO2 * (1 - carbonReduction / 100) * orientationMultiplier),
      waterUsage: Math.round(baseWater * (1 - waterSavings / 100)),
      wasteProduction: Math.round(baseWaste * 0.85), // Base reduction from modern practices
      leedPoints: sustainabilityFeatures.filter(f => f.enabled).length * 8 + Math.floor(greenRoofCoverage / 10) + Math.floor(solarPanelCoverage / 10),
      totalCost: sustainabilityFeatures.filter(f => f.enabled).reduce((total, f) => total + f.cost, 0)
    };
  }, [sustainabilityFeatures, buildingOrientation, greenRoofCoverage, solarPanelCoverage]);

  // Solar analysis data based on orientation and time
  const solarData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => {
      const sunAngle = (hour - 12) * 15; // degrees from south
      const orientationDiff = Math.abs(buildingOrientation - sunAngle);
      const efficiency = Math.max(0, Math.cos(orientationDiff * Math.PI / 180)) * 100;
      const seasonalMultiplier = [0.6, 0.8, 1.0, 0.7][seasonIndex] || 1.0; // Winter, Spring, Summer, Fall
      
      return {
        hour: `${hour}:00`,
        efficiency: efficiency * seasonalMultiplier * (solarPanelCoverage / 100),
        generation: efficiency * seasonalMultiplier * (solarPanelCoverage / 100) * 2.5 // kW
      };
    });
  }, [buildingOrientation, solarPanelCoverage, seasonIndex]);

  const energyComparisonData = [
    { name: 'Baseline Building', energy: 120000, carbon: 45, cost: 18000 },
    { name: 'Standard Green', energy: 85000, carbon: 32, cost: 14500 },
    { name: 'Current Design', energy: environmentalMetrics.energyUsage, carbon: environmentalMetrics.carbonEmissions, cost: 12000 },
    { name: 'Net Zero Target', energy: 15000, carbon: 2, cost: 8500 }
  ];

  const runEnvironmentalAnalysis = async () => {
    setAnalysisPhase('analyzing');
    setCurrentAnalysis('Analyzing solar exposure and energy efficiency...');
    
    setTimeout(() => {
      setCurrentAnalysis('Calculating carbon footprint and sustainability metrics...');
    }, 2000);

    setTimeout(() => {
      setCurrentAnalysis('Evaluating stormwater management and green infrastructure...');
    }, 4000);

    setTimeout(() => {
      setCurrentAnalysis('Optimizing building orientation for maximum solar gain...');
    }, 6000);

    setTimeout(() => {
      setAnalysisPhase('complete');
      setCurrentAnalysis(`Analysis complete: Projected to achieve ${Math.round(100 - (environmentalMetrics.energyUsage / 120000) * 100)}% energy reduction vs baseline.`);
    }, 8000);
  };

  const toggleFeature = (index: number) => {
    setSustainabilityFeatures(prev => prev.map((feature, i) => 
      i === index ? { ...feature, enabled: !feature.enabled } : feature
    ));
  };

  const getLEEDLevel = (points: number) => {
    if (points >= 80) return { level: 'Platinum', color: 'bg-purple-100 text-purple-800' };
    if (points >= 60) return { level: 'Gold', color: 'bg-yellow-100 text-yellow-800' };
    if (points >= 50) return { level: 'Silver', color: 'bg-gray-100 text-gray-800' };
    if (points >= 40) return { level: 'Certified', color: 'bg-green-100 text-green-800' };
    return { level: 'Not Certified', color: 'bg-red-100 text-red-800' };
  };

  const leedStatus = getLEEDLevel(environmentalMetrics.leedPoints);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Environmental Impact Simulator</h1>
              <p className="text-gray-600">Analyze and optimize environmental performance of development scenarios</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className={leedStatus.color}>
                <Award className="h-3 w-3 mr-1" />
                LEED {leedStatus.level}
              </Badge>
              <Button 
                onClick={runEnvironmentalAnalysis}
                className="bg-green-600 hover:bg-green-700"
                disabled={analysisPhase === 'analyzing'}
              >
                {analysisPhase === 'analyzing' ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Key Environmental Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-700">{environmentalMetrics.energyUsage.toLocaleString()}</div>
                <div className="text-sm text-green-600">kWh/year</div>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round(100 - (environmentalMetrics.energyUsage / 120000) * 100)}% reduction
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 text-center">
                <Wind className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-700">{environmentalMetrics.carbonEmissions}</div>
                <div className="text-sm text-blue-600">tons CO₂/year</div>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round(100 - (environmentalMetrics.carbonEmissions / 45) * 100)}% reduction
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
              <CardContent className="p-4 text-center">
                <Droplets className="h-8 w-8 mx-auto mb-2 text-cyan-600" />
                <div className="text-2xl font-bold text-cyan-700">{environmentalMetrics.waterUsage.toLocaleString()}</div>
                <div className="text-sm text-cyan-600">gal/month</div>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round(100 - (environmentalMetrics.waterUsage / 2500) * 100)}% reduction
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-700">{environmentalMetrics.leedPoints}</div>
                <div className="text-sm text-purple-600">LEED Points</div>
                <div className="text-xs text-gray-600 mt-1">{leedStatus.level}</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Building Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Building Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Building Orientation: {buildingOrientation}°</Label>
                  <Slider
                    value={[buildingOrientation]}
                    onValueChange={([value]) => setBuildingOrientation(value)}
                    max={360}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Optimal solar orientation: 180° (due south)
                  </div>
                </div>

                <div>
                  <Label>Green Roof Coverage: {greenRoofCoverage}%</Label>
                  <Slider
                    value={[greenRoofCoverage]}
                    onValueChange={([value]) => setGreenRoofCoverage(value)}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Solar Panel Coverage: {solarPanelCoverage}%</Label>
                  <Slider
                    value={[solarPanelCoverage]}
                    onValueChange={([value]) => setSolarPanelCoverage(value)}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Season & Time Study</Label>
                  <div className="grid grid-cols-4 gap-1 mt-2">
                    {['Winter', 'Spring', 'Summer', 'Fall'].map((season, index) => (
                      <Button
                        key={season}
                        size="sm"
                        variant={seasonIndex === index ? 'default' : 'outline'}
                        onClick={() => setSeasonIndex(index)}
                        className={`text-xs ${seasonIndex === index ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}`}
                      >
                        {season}
                      </Button>
                    ))}
                  </div>
                  <Slider
                    value={[timeOfDay]}
                    onValueChange={([value]) => setTimeOfDay(value)}
                    max={24}
                    min={0}
                    step={1}
                    className="mt-3"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Time: {timeOfDay}:00 • Solar angle: {Math.round((timeOfDay - 12) * 15)}°
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Sustainability Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sustainabilityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="flex items-center justify-between p-2 rounded border border-gray-200 hover:border-gray-300 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => toggleFeature(index)}
                          size="sm"
                        />
                        <span className="text-sm font-medium">{feature.name}</span>
                      </div>
                      <div className="text-xs text-gray-600">{feature.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Impact: {feature.impact}% • Cost: ${feature.cost.toLocaleString()}
                      </div>
                    </div>
                    {feature.enabled && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </motion.div>
                ))}

                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Total Sustainability Investment</div>
                  <div className="text-2xl font-bold text-nyc-blue">
                    ${environmentalMetrics.totalCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">
                    ROI: 8-12 years through energy savings
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Lightbulb className="h-5 w-5" />
                  AI Environmental Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-24">
                  {analysisPhase === 'analyzing' && (
                    <div className="space-y-3">
                      <AIThinking />
                      <TypewriterEffect 
                        text={currentAnalysis}
                        speed={40}
                        className="text-sm text-blue-700"
                      />
                    </div>
                  )}
                  
                  {analysisPhase === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <div className="text-sm text-green-700 font-medium">{currentAnalysis}</div>
                      <div className="space-y-2 pt-2">
                        <div className="text-xs text-gray-700 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Optimal solar orientation achieved (95% efficiency)
                        </div>
                        <div className="text-xs text-gray-700 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Stormwater runoff reduced by 65%
                        </div>
                        <div className="text-xs text-gray-700 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Carbon emissions 58% below city average
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {analysisPhase === 'idle' && (
                    <div className="text-center text-gray-500">
                      <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Click "Run Analysis" to evaluate environmental impact</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="solar" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="solar">Solar Analysis</TabsTrigger>
                <TabsTrigger value="energy">Energy Usage</TabsTrigger>
                <TabsTrigger value="carbon">Carbon Impact</TabsTrigger>
                <TabsTrigger value="water">Water & Waste</TabsTrigger>
              </TabsList>

              <TabsContent value="solar" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5" />
                      Solar Generation Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={solarData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="generation" 
                            stroke={nycColors.secondary.yellow} 
                            fill={nycColors.secondary.yellow}
                            name="Solar Generation (kW)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-yellow-600">
                          {Math.round(solarData.reduce((sum, d) => sum + d.generation, 0) * 365 / 1000)} MWh
                        </div>
                        <div className="text-xs text-gray-600">Annual Generation</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          ${Math.round(solarData.reduce((sum, d) => sum + d.generation, 0) * 365 * 0.12).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Annual Savings</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {Math.round(buildingOrientation === 180 ? 95 : Math.max(60, 95 - Math.abs(buildingOrientation - 180) / 2))}%
                        </div>
                        <div className="text-xs text-gray-600">Efficiency Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="energy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Energy Performance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={energyComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="energy" fill={nycColors.secondary.green} name="Energy Usage (kWh/year)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="carbon" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Footprint Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie width={400} height={400}>
                          <Pie
                            data={[
                              { name: 'Heating/Cooling', value: 45, fill: nycColors.secondary.orange },
                              { name: 'Lighting', value: 20, fill: nycColors.secondary.yellow },
                              { name: 'Appliances', value: 25, fill: nycColors.primary.blue },
                              { name: 'Common Areas', value: 10, fill: nycColors.secondary.green }
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
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="water" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Water Management & Waste Reduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <Droplets className="h-12 w-12 mx-auto mb-2 text-cyan-600" />
                          <div className="text-2xl font-bold text-cyan-700">{environmentalMetrics.waterUsage.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Monthly Water Usage (gal)</div>
                          <Progress value={100 - (environmentalMetrics.waterUsage / 2500) * 100} className="mt-2" />
                        </div>
                        
                        <div className="text-center">
                          <Recycle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-700">{environmentalMetrics.wasteProduction}</div>
                          <div className="text-sm text-gray-600">Annual Waste (tons)</div>
                          <Progress value={15} className="mt-2" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Rainwater Collection</span>
                          <span className="font-medium text-blue-600">8,500 gal/month</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Greywater Recycling</span>
                          <span className="font-medium text-green-600">
                            {sustainabilityFeatures.find(f => f.name === 'Greywater Recycling')?.enabled ? '25%' : 'Not enabled'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Waste Diversion Rate</span>
                          <span className="font-medium text-orange-600">85%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom Section - Recommendations */}
        {analysisPhase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Target className="h-5 w-5" />
                  Optimization Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Excellent Solar Design</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Current orientation maximizes solar gain. Maintain 180° south-facing alignment.
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">Consider Geothermal</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Adding geothermal heating could improve efficiency by 40% with 8-year payback.
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Water Optimization</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Enable greywater recycling to achieve additional 18% water savings.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}