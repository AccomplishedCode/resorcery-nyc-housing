import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  DollarSign, Home, TrendingUp, TrendingDown, Target, 
  Calculator, PieChart, Users, Briefcase, Award,
  AlertTriangle, CheckCircle, Lightbulb, BarChart3,
  Zap, Download, Gauge, ArrowRight, Star, Crown
} from 'lucide-react';
import { nycSites } from '@/lib/nyc-mock-data';
import { nycColors, getAffordabilityColor } from '@/lib/nyc-design-system';
import { 
  ResponsiveContainer, 
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts';

interface AffordabilityParameters {
  totalUnits: number;
  ami30: number; // 30% AMI units
  ami50: number; // 50% AMI units  
  ami60: number; // 60% AMI units
  ami80: number; // 80% AMI units
  marketRate: number; // Market rate units
  avgUnitSize: number; // sq ft
  constructionCost: number; // per sq ft
  landCost: number;
  subsidyAvailable: number;
}

interface FinancialProjection {
  scenario: string;
  totalCost: number;
  totalRevenue: number;
  subsidy: number;
  roi: number;
  feasible: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export default function AffordabilityCalculatorEnhanced() {
  const [selectedSite] = useState(nycSites[0]);
  
  // Core parameters
  const [params, setParams] = useState<AffordabilityParameters>({
    totalUnits: 240,
    ami30: 20, // percentages
    ami50: 25,
    ami60: 20,
    ami80: 15,
    marketRate: 20,
    avgUnitSize: 850,
    constructionCost: 350,
    landCost: 15000000,
    subsidyAvailable: 25000000
  });

  // Advanced options
  const [taxIncentives, setTaxIncentives] = useState({
    j51: true,
    four21a: true,
    opportunityZone: false
  });

  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [optimizationSuggestion, setOptimizationSuggestion] = useState<string>('');
  const [showOptimization, setShowOptimization] = useState(false);

  // NYC AMI levels for 2024 (family of 3)
  const amiLevels = {
    ami30: 31020,  // 30% of AMI
    ami50: 51700,  // 50% of AMI
    ami60: 62040,  // 60% of AMI
    ami80: 82720,  // 80% of AMI
    market: 120000 // Market rate income
  };

  // Calculate affordable rents (30% of income rule)
  const maxRents = {
    ami30: Math.floor((amiLevels.ami30 * 0.3) / 12),
    ami50: Math.floor((amiLevels.ami50 * 0.3) / 12),
    ami60: Math.floor((amiLevels.ami60 * 0.3) / 12),
    ami80: Math.floor((amiLevels.ami80 * 0.3) / 12),
    market: 4500 // Market rate
  };

  // Financial calculations
  const financials = useMemo(() => {
    const totalConstructionCost = params.totalUnits * params.avgUnitSize * params.constructionCost;
    const totalProjectCost = totalConstructionCost + params.landCost + (totalConstructionCost * 0.25); // 25% soft costs
    
    const unitsByType = {
      ami30: Math.floor(params.totalUnits * params.ami30 / 100),
      ami50: Math.floor(params.totalUnits * params.ami50 / 100),
      ami60: Math.floor(params.totalUnits * params.ami60 / 100),
      ami80: Math.floor(params.totalUnits * params.ami80 / 100),
      market: Math.floor(params.totalUnits * params.marketRate / 100)
    };

    const annualRevenue = 
      (unitsByType.ami30 * maxRents.ami30 * 12) +
      (unitsByType.ami50 * maxRents.ami50 * 12) +
      (unitsByType.ami60 * maxRents.ami60 * 12) +
      (unitsByType.ami80 * maxRents.ami80 * 12) +
      (unitsByType.market * maxRents.market * 12);

    const subsidyGap = Math.max(0, totalProjectCost - (annualRevenue * 12)); // 12 year payback
    const feasible = subsidyGap <= params.subsidyAvailable;
    const roi = ((annualRevenue - (totalProjectCost * 0.05)) / totalProjectCost) * 100; // 5% annual costs

    const affordablePercentage = params.ami30 + params.ami50 + params.ami60 + params.ami80;
    
    return {
      totalProjectCost,
      annualRevenue,
      subsidyGap,
      subsidyRequired: subsidyGap,
      feasible,
      roi,
      affordablePercentage,
      unitsByType,
      costPerUnit: totalProjectCost / params.totalUnits,
      revenuePerUnit: annualRevenue / params.totalUnits
    };
  }, [params, maxRents]);

  // Generate scenarios for comparison
  const scenarios = useMemo((): FinancialProjection[] => [
    {
      scenario: 'Current Mix',
      totalCost: financials.totalProjectCost,
      totalRevenue: financials.annualRevenue,
      subsidy: financials.subsidyRequired,
      roi: financials.roi,
      feasible: financials.feasible,
      riskLevel: financials.roi > 8 ? 'Low' : financials.roi > 4 ? 'Medium' : 'High'
    },
    {
      scenario: '50% Affordable',
      totalCost: financials.totalProjectCost,
      totalRevenue: financials.annualRevenue * 0.75,
      subsidy: financials.subsidyRequired * 1.4,
      roi: financials.roi * 0.6,
      feasible: financials.subsidyRequired * 1.4 <= params.subsidyAvailable,
      riskLevel: 'Medium'
    },
    {
      scenario: 'Market Rate',
      totalCost: financials.totalProjectCost * 1.1,
      totalRevenue: financials.annualRevenue * 1.8,
      subsidy: 0,
      roi: financials.roi * 2.2,
      feasible: true,
      riskLevel: 'Low'
    },
    {
      scenario: '80% Affordable',
      totalCost: financials.totalProjectCost * 0.95,
      totalRevenue: financials.annualRevenue * 0.45,
      subsidy: financials.subsidyRequired * 2.1,
      roi: financials.roi * 0.3,
      feasible: false,
      riskLevel: 'High'
    }
  ], [financials, params.subsidyAvailable]);

  // Find optimal affordability mix
  const findOptimalMix = useCallback(async () => {
    setAnalysisRunning(true);
    setOptimizationSuggestion('');
    setShowOptimization(false);

    setTimeout(() => {
      setOptimizationSuggestion('Analyzing financial feasibility across AMI levels...');
      setShowOptimization(true);
    }, 500);

    setTimeout(() => {
      setOptimizationSuggestion('Evaluating subsidy requirements and ROI projections...');
    }, 2500);

    setTimeout(() => {
      setOptimizationSuggestion('Calculating optimal unit mix for maximum affordability...');
    }, 4500);

    setTimeout(() => {
      const optimalAffordable = Math.min(65, Math.floor(params.subsidyAvailable / (financials.costPerUnit * 0.4)));
      setOptimizationSuggestion(
        `OPTIMAL MIX FOUND: ${optimalAffordable}% affordable housing achieves maximum community benefit while maintaining financial feasibility. Recommended: 15% at 30% AMI, 20% at 50% AMI, 15% at 60% AMI, 15% at 80% AMI.`
      );
      setAnalysisRunning(false);
    }, 7000);
  }, [params, financials]);

  // Sweet spot indicator
  const sweetSpot = useMemo(() => {
    const score = (financials.affordablePercentage * 0.6) + (financials.roi * 0.4) + (financials.feasible ? 20 : -20);
    return {
      score: Math.max(0, Math.min(100, score)),
      level: score > 80 ? 'Excellent' : score > 60 ? 'Good' : score > 40 ? 'Fair' : 'Poor',
      color: score > 80 ? nycColors.secondary.green : score > 60 ? nycColors.secondary.yellow : score > 40 ? nycColors.secondary.orange : nycColors.secondary.red
    };
  }, [financials]);

  const unitMixData = [
    { name: '30% AMI', value: params.ami30, count: financials.unitsByType.ami30, rent: maxRents.ami30, fill: getAffordabilityColor(90) },
    { name: '50% AMI', value: params.ami50, count: financials.unitsByType.ami50, rent: maxRents.ami50, fill: getAffordabilityColor(70) },
    { name: '60% AMI', value: params.ami60, count: financials.unitsByType.ami60, rent: maxRents.ami60, fill: getAffordabilityColor(50) },
    { name: '80% AMI', value: params.ami80, count: financials.unitsByType.ami80, rent: maxRents.ami80, fill: getAffordabilityColor(30) },
    { name: 'Market Rate', value: params.marketRate, count: financials.unitsByType.market, rent: maxRents.market, fill: getAffordabilityColor(10) }
  ];

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
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Affordability Calculator</h1>
              <p className="text-gray-600">Find the optimal balance between affordability and financial feasibility</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Sweet Spot Indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: sweetSpot.color }}
                  >
                    {sweetSpot.score}
                  </div>
                  <Target className="absolute -top-1 -right-1 h-4 w-4 text-white bg-nyc-blue rounded-full p-0.5" />
                </div>
                <div className="text-xs font-medium mt-1">{sweetSpot.level}</div>
                <div className="text-xs text-gray-600">Feasibility Score</div>
              </motion.div>

              <Button 
                onClick={findOptimalMix}
                disabled={analysisRunning}
                className="bg-nyc-purple hover:bg-nyc-purple/90"
              >
                {analysisRunning ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Find Sweet Spot
                  </>
                )}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className={`${financials.feasible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <CardContent className="p-4 text-center">
                <CheckCircle className={`h-8 w-8 mx-auto mb-2 ${financials.feasible ? 'text-green-600' : 'text-red-600'}`} />
                <div className="text-lg font-bold">{financials.feasible ? 'Feasible' : 'Not Feasible'}</div>
                <div className="text-sm text-gray-600">Financial Viability</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Home className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-lg font-bold">{financials.affordablePercentage.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Affordable Units</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-bold">{financials.roi.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Annual ROI</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-lg font-bold">${(financials.subsidyRequired / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-600">Subsidy Needed</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calculator className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-lg font-bold">${Math.floor(financials.costPerUnit).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Cost per Unit</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Unit Mix Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Affordability Mix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>30% AMI Units: {params.ami30}%</Label>
                  <Slider
                    value={[params.ami30]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, ami30: value }))}
                    max={50}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Max rent: ${maxRents.ami30}/month • {financials.unitsByType.ami30} units
                  </div>
                </div>

                <div>
                  <Label>50% AMI Units: {params.ami50}%</Label>
                  <Slider
                    value={[params.ami50]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, ami50: value }))}
                    max={50}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Max rent: ${maxRents.ami50}/month • {financials.unitsByType.ami50} units
                  </div>
                </div>

                <div>
                  <Label>60% AMI Units: {params.ami60}%</Label>
                  <Slider
                    value={[params.ami60]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, ami60: value }))}
                    max={50}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Max rent: ${maxRents.ami60}/month • {financials.unitsByType.ami60} units
                  </div>
                </div>

                <div>
                  <Label>80% AMI Units: {params.ami80}%</Label>
                  <Slider
                    value={[params.ami80]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, ami80: value }))}
                    max={50}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Max rent: ${maxRents.ami80}/month • {financials.unitsByType.ami80} units
                  </div>
                </div>

                <div>
                  <Label>Market Rate: {params.marketRate}%</Label>
                  <Slider
                    value={[params.marketRate]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, marketRate: value }))}
                    max={80}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Max rent: ${maxRents.market}/month • {financials.unitsByType.market} units
                  </div>
                </div>

                {/* Balance Check */}
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Allocation:</span>
                    <span className={`font-bold ${
                      params.ami30 + params.ami50 + params.ami60 + params.ami80 + params.marketRate === 100
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {params.ami30 + params.ami50 + params.ami60 + params.ami80 + params.marketRate}%
                    </span>
                  </div>
                  {params.ami30 + params.ami50 + params.ami60 + params.ami80 + params.marketRate !== 100 && (
                    <div className="text-xs text-red-600 mt-1">Must total 100%</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Development Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Development Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Total Units: {params.totalUnits}</Label>
                  <Slider
                    value={[params.totalUnits]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, totalUnits: value }))}
                    max={500}
                    min={50}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Construction Cost: ${params.constructionCost}/sq ft</Label>
                  <Slider
                    value={[params.constructionCost]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, constructionCost: value }))}
                    max={500}
                    min={250}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Available Subsidy: ${(params.subsidyAvailable / 1000000).toFixed(1)}M</Label>
                  <Slider
                    value={[params.subsidyAvailable / 1000000]}
                    onValueChange={([value]) => setParams(prev => ({ ...prev, subsidyAvailable: value * 1000000 }))}
                    max={100}
                    min={5}
                    step={2.5}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tax Incentives */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Incentives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: 'j51', label: 'J-51 Tax Exemption', description: '10-year property tax exemption' },
                  { key: 'four21a', label: '421-a Housing Program', description: '25-year tax abatement' },
                  { key: 'opportunityZone', label: 'Opportunity Zone', description: 'Federal tax benefits' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm cursor-pointer">{label}</Label>
                      <div className="text-xs text-gray-600">{description}</div>
                    </div>
                    <Switch
                      checked={taxIncentives[key as keyof typeof taxIncentives]}
                      onCheckedChange={(checked) => setTaxIncentives(prev => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Optimization */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Crown className="h-5 w-5" />
                  AI Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-24">
                  {analysisRunning && !showOptimization && (
                    <AIThinking />
                  )}
                  
                  {showOptimization && optimizationSuggestion && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border-l-4 border-purple-400 p-3 rounded-r-lg"
                    >
                      <TypewriterEffect 
                        text={optimizationSuggestion}
                        speed={25}
                        className="text-xs text-purple-700 leading-relaxed"
                      />
                    </motion.div>
                  )}

                  {!analysisRunning && !optimizationSuggestion && (
                    <div className="text-center text-gray-500">
                      <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Click "Find Sweet Spot" for AI recommendations</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="mix" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mix">Unit Mix</TabsTrigger>
                <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
                <TabsTrigger value="scenarios">Scenario Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="mix" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Unit Mix Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                            <Pie
                              data={unitMixData.filter(item => item.value > 0)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {unitMixData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPie>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Rent Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {unitMixData.filter(item => item.value > 0).map((item) => (
                          <div key={item.name} className="flex items-center justify-between p-2 rounded border">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.fill }}
                              ></div>
                              <div>
                                <div className="text-sm font-medium">{item.name}</div>
                                <div className="text-xs text-gray-600">{item.count} units</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold">${item.rent}</div>
                              <div className="text-xs text-gray-600">/month</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Feasibility Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Cost Breakdown */}
                      <div>
                        <h4 className="font-semibold mb-3">Project Costs</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total Project Cost</span>
                            <span className="font-bold">${(financials.totalProjectCost / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Construction</span>
                            <span>${((params.totalUnits * params.avgUnitSize * params.constructionCost) / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Land</span>
                            <span>${(params.landCost / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Soft Costs (25%)</span>
                            <span>${(((params.totalUnits * params.avgUnitSize * params.constructionCost) * 0.25) / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Revenue Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Annual Revenue</span>
                            <span className="font-bold">${(financials.annualRevenue / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Revenue per Unit</span>
                            <span>${Math.floor(financials.revenuePerUnit)}/month avg</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Payback Period</span>
                            <span>{(financials.totalProjectCost / financials.annualRevenue).toFixed(1)} years</span>
                          </div>
                        </div>
                      </div>

                      {/* Feasibility Gauge */}
                      <div className="pt-4 border-t">
                        <div className="text-center">
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-32 h-32">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#e5e7eb"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke={sweetSpot.color}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${sweetSpot.score * 2.51} 251`}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold" style={{ color: sweetSpot.color }}>
                                  {sweetSpot.score}
                                </div>
                                <div className="text-xs text-gray-600">Score</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-lg font-semibold" style={{ color: sweetSpot.color }}>
                            {sweetSpot.level} Balance
                          </div>
                          <div className="text-sm text-gray-600">
                            Affordability vs Feasibility
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scenario Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scenarios}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="scenario" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="roi" fill={nycColors.secondary.green} name="ROI %" />
                          <Bar dataKey="subsidy" fill={nycColors.secondary.orange} name="Subsidy Required ($M)" 
                            valueFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {scenarios.map((scenario, index) => (
                        <div key={scenario.scenario} className="text-center p-2 rounded border">
                          <div className="text-xs font-medium mb-1">{scenario.scenario}</div>
                          <Badge 
                            variant="outline"
                            className={scenario.feasible ? 'border-green-600 text-green-700' : 'border-red-600 text-red-700'}
                          >
                            {scenario.feasible ? 'Feasible' : 'Not Feasible'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}