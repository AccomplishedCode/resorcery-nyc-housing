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
import { TypewriterEffect, AIThinking } from '@/components/TypewriterEffect';
import { 
  FlaskConical, TrendingUp, TrendingDown, DollarSign, Home,
  Building, Users, Target, Award, AlertTriangle, CheckCircle,
  Zap, BarChart3, PieChart, Calculator, Lightbulb, Crown,
  Download, Play, RotateCcw, ArrowUpRight, ArrowDownRight,
  Activity, Gauge, Settings, Briefcase, School
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
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts';

interface PolicyParameter {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  description: string;
  category: 'zoning' | 'tax' | 'affordable' | 'incentive';
  impact: 'positive' | 'negative' | 'neutral';
}

interface PolicyImpact {
  category: string;
  metric: string;
  baseline: number;
  projected: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

interface PolicyScenario {
  name: string;
  description: string;
  parameters: Record<string, number>;
  outcomes: {
    affordableUnits: number;
    totalUnits: number;
    developmentCost: number;
    publicRevenue: number;
    feasibilityScore: number;
    communityBenefit: number;
  };
}

export default function PolicyLabEnhanced() {
  const [selectedSite] = useState(nycSites[0]);
  const [policyParams, setPolicyParams] = useState<Record<string, number>>({
    farBonus: 25,           // % bonus for affordable housing
    taxAbatement: 20,       // years of tax abatement
    mandatoryAffordable: 30, // % mandatory affordable
    targetAMI: 60,          // target AMI level
    developmentFee: 5,      // per sq ft fee
    transitBonus: 15,       // % bonus near transit
    greenBonus: 10,         // % bonus for green building
    inclusionaryRate: 25,   // % affordable required
    linkageFee: 20          // $per sq ft
  });

  const [simulationRunning, setSimulationRunning] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState('');
  const [policyImpacts, setPolicyImpacts] = useState<PolicyImpact[]>([]);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('current');

  // Policy parameter definitions
  const policyParameters: PolicyParameter[] = [
    {
      name: 'FAR Bonus for Affordable Housing',
      value: policyParams.farBonus,
      min: 0, max: 50, step: 5, unit: '%',
      description: 'Additional floor area ratio for including affordable units',
      category: 'zoning', impact: 'positive'
    },
    {
      name: 'Tax Abatement Period',
      value: policyParams.taxAbatement,
      min: 0, max: 30, step: 5, unit: 'years',
      description: 'Years of property tax reduction for new construction',
      category: 'tax', impact: 'positive'
    },
    {
      name: 'Mandatory Affordable Housing',
      value: policyParams.mandatoryAffordable,
      min: 0, max: 50, step: 5, unit: '%',
      description: 'Required percentage of affordable units in new developments',
      category: 'affordable', impact: 'positive'
    },
    {
      name: 'Target AMI Level',
      value: policyParams.targetAMI,
      min: 30, max: 120, step: 10, unit: '% AMI',
      description: 'Area median income target for affordable units',
      category: 'affordable', impact: 'neutral'
    },
    {
      name: 'Development Impact Fee',
      value: policyParams.developmentFee,
      min: 0, max: 20, step: 1, unit: '$/sq ft',
      description: 'Fee paid to city for infrastructure improvements',
      category: 'tax', impact: 'negative'
    },
    {
      name: 'Transit Proximity Bonus',
      value: policyParams.transitBonus,
      min: 0, max: 30, step: 5, unit: '%',
      description: 'Additional FAR for developments near transit',
      category: 'incentive', impact: 'positive'
    },
    {
      name: 'Green Building Bonus',
      value: policyParams.greenBonus,
      min: 0, max: 25, step: 5, unit: '%',
      description: 'FAR bonus for sustainable building features',
      category: 'incentive', impact: 'positive'
    },
    {
      name: 'Linkage Fee',
      value: policyParams.linkageFee,
      min: 0, max: 50, step: 5, unit: '$/sq ft',
      description: 'Fee for affordable housing fund contribution',
      category: 'tax', impact: 'negative'
    }
  ];

  // Pre-defined policy scenarios
  const policyScenarios: PolicyScenario[] = [
    {
      name: 'Status Quo',
      description: 'Current NYC housing policies',
      parameters: { farBonus: 20, taxAbatement: 25, mandatoryAffordable: 25, targetAMI: 60 },
      outcomes: { affordableUnits: 1250, totalUnits: 5000, developmentCost: 1.2, publicRevenue: 450, feasibilityScore: 65, communityBenefit: 72 }
    },
    {
      name: 'Affordability Focus',
      description: 'Maximize affordable housing production',
      parameters: { farBonus: 40, taxAbatement: 30, mandatoryAffordable: 40, targetAMI: 50 },
      outcomes: { affordableUnits: 2100, totalUnits: 5250, developmentCost: 1.1, publicRevenue: 380, feasibilityScore: 58, communityBenefit: 88 }
    },
    {
      name: 'Development Incentive',
      description: 'Encourage private development with generous incentives',
      parameters: { farBonus: 35, taxAbatement: 35, mandatoryAffordable: 20, targetAMI: 80 },
      outcomes: { affordableUnits: 1050, totalUnits: 6200, developmentCost: 0.95, publicRevenue: 520, feasibilityScore: 82, communityBenefit: 64 }
    },
    {
      name: 'Balanced Approach',
      description: 'Optimize for both affordability and development feasibility',
      parameters: { farBonus: 30, taxAbatement: 25, mandatoryAffordable: 30, targetAMI: 70 },
      outcomes: { affordableUnits: 1650, totalUnits: 5500, developmentCost: 1.05, publicRevenue: 485, feasibilityScore: 76, communityBenefit: 81 }
    }
  ];

  // Calculate policy impacts in real-time
  const calculateImpacts = useMemo(() => {
    const baseUnits = 5000;
    const baseAffordable = 1250;
    const baseCost = 1.2; // billion
    const baseRevenue = 450; // million

    // Impact calculations based on parameter changes
    const farBonusImpact = (policyParams.farBonus - 20) * 0.02; // 2% units per 1% bonus
    const taxAbatementImpact = (policyParams.taxAbatement - 25) * 0.015; // Cost reduction
    const mandatoryAffordableImpact = (policyParams.mandatoryAffordable - 25) * 0.025; // More affordable units
    const transitBonusImpact = (policyParams.transitBonus - 15) * 0.01;

    const projectedUnits = Math.round(baseUnits * (1 + farBonusImpact + transitBonusImpact));
    const projectedAffordable = Math.round(projectedUnits * (policyParams.mandatoryAffordable / 100));
    const projectedCost = baseCost * (1 - taxAbatementImpact + (policyParams.developmentFee / 100));
    const projectedRevenue = baseRevenue * (1 + farBonusImpact - (policyParams.taxAbatement / 100));

    return [
      {
        category: 'Housing Production',
        metric: 'Total Units Built',
        baseline: baseUnits,
        projected: projectedUnits,
        change: projectedUnits - baseUnits,
        changePercent: ((projectedUnits - baseUnits) / baseUnits) * 100,
        trend: projectedUnits > baseUnits ? 'up' : projectedUnits < baseUnits ? 'down' : 'stable'
      },
      {
        category: 'Housing Production',
        metric: 'Affordable Units',
        baseline: baseAffordable,
        projected: projectedAffordable,
        change: projectedAffordable - baseAffordable,
        changePercent: ((projectedAffordable - baseAffordable) / baseAffordable) * 100,
        trend: projectedAffordable > baseAffordable ? 'up' : projectedAffordable < baseAffordable ? 'down' : 'stable'
      },
      {
        category: 'Economic Impact',
        metric: 'Development Cost',
        baseline: baseCost,
        projected: projectedCost,
        change: projectedCost - baseCost,
        changePercent: ((projectedCost - baseCost) / baseCost) * 100,
        trend: projectedCost < baseCost ? 'up' : projectedCost > baseCost ? 'down' : 'stable'
      },
      {
        category: 'Economic Impact',
        metric: 'Public Revenue',
        baseline: baseRevenue,
        projected: projectedRevenue,
        change: projectedRevenue - baseRevenue,
        changePercent: ((projectedRevenue - baseRevenue) / baseRevenue) * 100,
        trend: projectedRevenue > baseRevenue ? 'up' : projectedRevenue < baseRevenue ? 'down' : 'stable'
      }
    ] as PolicyImpact[];
  }, [policyParams]);

  const runPolicySimulation = useCallback(async () => {
    setSimulationRunning(true);
    setPolicyImpacts([]);
    setCurrentAnalysis('');
    setShowTypewriter(false);

    setTimeout(() => {
      setCurrentAnalysis('Initializing citywide development model...');
      setShowTypewriter(true);
    }, 500);

    setTimeout(() => {
      setCurrentAnalysis('Simulating policy impacts across 500+ development sites...');
    }, 2500);

    setTimeout(() => {
      setCurrentAnalysis('Analyzing developer responses to incentive changes...');
    }, 4500);

    setTimeout(() => {
      setCurrentAnalysis('Calculating community benefits and economic impacts...');
    }, 6500);

    setTimeout(() => {
      const impacts = calculateImpacts;
      setPolicyImpacts(impacts);
      setCurrentAnalysis(`Policy simulation complete: Projected ${impacts[0]?.changePercent.toFixed(1)}% change in housing production with current parameters.`);
      setSimulationRunning(false);
    }, 8500);
  }, [calculateImpacts]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactColor = (changePercent: number) => {
    if (Math.abs(changePercent) < 2) return 'text-gray-600';
    return changePercent > 0 ? 'text-green-600' : 'text-red-600';
  };

  const policyEffectivenessScore = useMemo(() => {
    const affordableBoost = Math.max(0, policyParams.mandatoryAffordable - 20) * 2;
    const incentiveBoost = (policyParams.farBonus + policyParams.transitBonus + policyParams.greenBonus) * 0.5;
    const costPenalty = (policyParams.developmentFee + policyParams.linkageFee) * 0.8;
    
    return Math.max(0, Math.min(100, affordableBoost + incentiveBoost - costPenalty));
  }, [policyParams]);

  const recommendedPolicyData = [
    { parameter: 'FAR Bonus', current: policyParams.farBonus, recommended: 30, optimal: 35 },
    { parameter: 'Tax Abatement', current: policyParams.taxAbatement, recommended: 25, optimal: 20 },
    { parameter: 'Affordable %', current: policyParams.mandatoryAffordable, recommended: 35, optimal: 40 },
    { parameter: 'Transit Bonus', current: policyParams.transitBonus, recommended: 20, optimal: 25 },
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
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Policy Testing Laboratory</h1>
              <p className="text-gray-600">Test how policy adjustments affect housing development outcomes across NYC</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Policy Effectiveness Score */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={nycColors.secondary.green}
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${policyEffectivenessScore * 1.76} 176`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">{Math.round(policyEffectivenessScore)}</span>
                  </div>
                </div>
                <div className="text-xs font-medium">Effectiveness</div>
              </motion.div>

              <Button 
                onClick={runPolicySimulation}
                disabled={simulationRunning}
                className="bg-nyc-orange hover:bg-nyc-orange/90"
              >
                {simulationRunning ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>

          {/* Quick Impact Preview */}
          {policyImpacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              {policyImpacts.slice(0, 4).map((impact, index) => (
                <Card key={impact.metric} className="border-l-4" style={{ borderLeftColor: impact.trend === 'up' ? nycColors.secondary.green : nycColors.secondary.orange }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {getTrendIcon(impact.trend)}
                      <Badge variant="outline" className={getImpactColor(impact.changePercent)}>
                        {impact.changePercent > 0 ? '+' : ''}{impact.changePercent.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">{impact.projected.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{impact.metric}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Policy Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Policy Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Policy Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyParameters.map((param) => (
                  <motion.div
                    key={param.name}
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-sm flex-1">{param.name}</Label>
                      <Badge 
                        variant="outline"
                        className={
                          param.impact === 'positive' ? 'border-green-500 text-green-700' :
                          param.impact === 'negative' ? 'border-red-500 text-red-700' :
                          'border-gray-400 text-gray-700'
                        }
                      >
                        {param.value}{param.unit}
                      </Badge>
                    </div>
                    <Slider
                      value={[param.value]}
                      onValueChange={([value]) => setPolicyParams(prev => ({ 
                        ...prev, 
                        [param.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '')]: value 
                      }))}
                      max={param.max}
                      min={param.min}
                      step={param.step}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600">{param.description}</div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Scenario Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Scenarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {policyScenarios.map((scenario) => (
                  <Button
                    key={scenario.name}
                    variant={selectedScenario === scenario.name ? 'default' : 'outline'}
                    className={`w-full justify-start p-4 h-auto ${
                      selectedScenario === scenario.name ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''
                    }`}
                    onClick={() => {
                      setSelectedScenario(scenario.name);
                      setPolicyParams(prev => ({ ...prev, ...scenario.parameters }));
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{scenario.name}</div>
                      <div className="text-xs opacity-75 mt-1">{scenario.description}</div>
                      <div className="text-xs mt-2 flex gap-2">
                        <span>Score: {scenario.outcomes.feasibilityScore}</span>
                        <span>•</span>
                        <span>{scenario.outcomes.affordableUnits.toLocaleString()} affordable</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Policy Advisor */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Crown className="h-5 w-5" />
                  AI Policy Advisor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-24">
                  {simulationRunning && !showTypewriter && (
                    <AIThinking />
                  )}
                  
                  {showTypewriter && currentAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border-l-4 border-orange-400 p-3 rounded-r-lg"
                    >
                      <TypewriterEffect 
                        text={currentAnalysis}
                        speed={35}
                        className="text-xs text-orange-700 leading-relaxed"
                      />
                    </motion.div>
                  )}

                  {!simulationRunning && !currentAnalysis && (
                    <div className="text-center text-gray-500">
                      <FlaskConical className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Run simulation for AI policy recommendations</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results & Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="impacts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="impacts">Policy Impacts</TabsTrigger>
                <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="impacts" className="space-y-4">
                {policyImpacts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Citywide Impact Projections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={policyImpacts}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: any, name: string) => [
                                typeof value === 'number' && value > 1000 ? value.toLocaleString() : value,
                                name
                              ]}
                            />
                            <Legend />
                            <Bar dataKey="baseline" fill={nycColors.neutral.gray} name="Baseline" />
                            <Bar dataKey="projected" fill={nycColors.primary.blue} name="Projected" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {policyImpacts.slice(0, 2).map((impact) => (
                          <div key={impact.metric} className="bg-gray-50 p-3 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{impact.metric}</span>
                              {getTrendIcon(impact.trend)}
                            </div>
                            <div className="text-lg font-bold">{impact.projected.toLocaleString()}</div>
                            <div className={`text-sm ${getImpactColor(impact.changePercent)}`}>
                              {impact.changePercent > 0 ? '+' : ''}{impact.changePercent.toFixed(1)}% vs baseline
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Real-time Impact Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Policy Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      key={JSON.stringify(policyParams)}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-3 gap-4 text-center"
                    >
                      <div>
                        <Building className="h-8 w-8 mx-auto mb-2 text-nyc-blue" />
                        <div className="text-xl font-bold text-nyc-blue">
                          {Math.round(5000 * (1 + (policyParams.farBonus - 20) * 0.02)).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Projected Units</div>
                      </div>
                      
                      <div>
                        <Home className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-xl font-bold text-green-600">
                          {Math.round(5000 * (policyParams.mandatoryAffordable / 100) * (1 + (policyParams.farBonus - 20) * 0.02)).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Affordable Units</div>
                      </div>
                      
                      <div>
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="text-xl font-bold text-purple-600">
                          ${Math.round(450 * (1 + (policyParams.farBonus - 20) * 0.015 - (policyParams.taxAbatement / 100))).toLocaleString()}M
                        </div>
                        <div className="text-sm text-gray-600">Public Revenue</div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Scenario Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={policyScenarios.map(scenario => ({
                          name: scenario.name,
                          affordability: (scenario.outcomes.affordableUnits / scenario.outcomes.totalUnits) * 100,
                          feasibility: scenario.outcomes.feasibilityScore,
                          production: (scenario.outcomes.totalUnits / 5000) * 100,
                          revenue: (scenario.outcomes.publicRevenue / 450) * 100,
                          community: scenario.outcomes.communityBenefit
                        }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={18} domain={[0, 100]} />
                          <Radar dataKey="affordability" stroke={nycColors.secondary.green} fill={nycColors.secondary.green} fillOpacity={0.3} name="Affordability" />
                          <Radar dataKey="feasibility" stroke={nycColors.primary.blue} fill={nycColors.primary.blue} fillOpacity={0.3} name="Feasibility" />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Optimization Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedPolicyData.map((item) => (
                        <div key={item.parameter} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{item.parameter}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Current: {item.current}</span>
                              <ArrowRight className="h-3 w-3 text-gray-400" />
                              <span className="text-sm font-semibold text-green-600">Optimal: {item.optimal}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gray-400 h-2 rounded-full transition-all"
                                style={{ width: `${(item.current / Math.max(item.current, item.optimal, item.recommended)) * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${(item.optimal / Math.max(item.current, item.optimal, item.recommended)) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {item.current !== item.optimal && (
                            <Button
                              size="sm"
                              className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => setPolicyParams(prev => ({ 
                                ...prev, 
                                [param.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '')]: item.optimal 
                              }))}
                            >
                              Apply Optimal Setting
                            </Button>
                          )}
                        </div>
                      ))}

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-700">Key Insight</span>
                        </div>
                        <div className="text-sm text-blue-700">
                          Increasing the FAR bonus to 35% while maintaining 25-year tax abatements 
                          could increase affordable housing production by 28% while maintaining developer interest.
                        </div>
                      </div>
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