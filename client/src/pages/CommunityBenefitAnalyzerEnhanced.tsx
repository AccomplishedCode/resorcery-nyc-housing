import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TypewriterEffect, AIThinking } from '@/components/TypewriterEffect';
import { 
  Users, Heart, ShoppingCart, GraduationCap, Stethoscope, 
  TreePine, Car, Train, Coffee, UtensilsCrossed, Baby,
  MapPin, TrendingUp, Target, CheckCircle, AlertTriangle,
  Star, Award, Activity, Zap, BarChart3, PieChart,
  Lightbulb, Download, Eye, Navigation, Clock
} from 'lucide-react';
import { nycSites } from '@/lib/nyc-mock-data';
import { nycColors } from '@/lib/nyc-design-system';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';

interface CommunityNeed {
  category: string;
  name: string;
  currentScore: number; // 0-100
  projectedScore: number;
  priority: 'High' | 'Medium' | 'Low';
  icon: any;
  description: string;
  solutions: string[];
}

interface AmenityScore {
  name: string;
  current: number;
  projected: number;
  walkTime: number; // minutes
  available: boolean;
}

export default function CommunityBenefitAnalyzerEnhanced() {
  const [selectedSite] = useState(nycSites[0]);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(0.5); // miles
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Community needs assessment
  const communityNeeds: CommunityNeed[] = [
    {
      category: 'Food Access',
      name: 'Grocery Stores',
      currentScore: 45,
      projectedScore: 75,
      priority: 'High',
      icon: ShoppingCart,
      description: 'Limited access to affordable fresh food options',
      solutions: ['Ground floor supermarket', 'Farmers market space', 'Food co-op']
    },
    {
      category: 'Healthcare',
      name: 'Medical Services',
      currentScore: 62,
      projectedScore: 68,
      priority: 'Medium',
      icon: Stethoscope,
      description: 'Adequate but could improve specialist access',
      solutions: ['Community health center', 'Urgent care facility', 'Pharmacy']
    },
    {
      category: 'Education',
      name: 'Schools & Childcare',
      currentScore: 58,
      projectedScore: 82,
      priority: 'High',
      icon: GraduationCap,
      description: 'Schools at capacity, limited childcare options',
      solutions: ['Childcare center', 'After-school programs', 'Adult education']
    },
    {
      category: 'Recreation',
      name: 'Green & Open Space',
      currentScore: 35,
      projectedScore: 72,
      priority: 'High',
      icon: TreePine,
      description: 'Below city average for green space per capita',
      solutions: ['Community garden', 'Playground', 'Fitness equipment', 'Dog run']
    },
    {
      category: 'Transportation',
      name: 'Transit Connectivity',
      currentScore: 78,
      projectedScore: 85,
      priority: 'Medium',
      icon: Train,
      description: 'Good subway access, limited bus frequency',
      solutions: ['Bike share station', 'Improved bus stop', 'Pedestrian improvements']
    },
    {
      category: 'Economic',
      name: 'Local Services',
      currentScore: 52,
      projectedScore: 88,
      priority: 'Medium',
      icon: Coffee,
      description: 'Limited local businesses and services',
      solutions: ['Small business incubator', 'Community bank', 'Retail spaces']
    },
    {
      category: 'Safety',
      name: 'Public Safety',
      currentScore: 68,
      projectedScore: 75,
      priority: 'Medium',
      icon: Heart,
      description: 'Generally safe with room for improvement',
      solutions: ['Better lighting', 'Community policing', 'Youth programs']
    },
    {
      category: 'Community',
      name: 'Social Cohesion',
      currentScore: 55,
      projectedScore: 82,
      priority: 'High',
      icon: Users,
      description: 'Need for more community gathering spaces',
      solutions: ['Community center', 'Event space', 'Senior center', 'Maker space']
    }
  ];

  // Walkability and amenity scores
  const amenityScores: AmenityScore[] = [
    { name: 'Grocery Stores', current: 3, projected: 5, walkTime: 8, available: true },
    { name: 'Restaurants', current: 12, projected: 18, walkTime: 3, available: true },
    { name: 'Schools', current: 4, projected: 6, walkTime: 12, available: true },
    { name: 'Parks', current: 2, projected: 4, walkTime: 15, available: true },
    { name: 'Pharmacies', current: 2, projected: 3, walkTime: 6, available: true },
    { name: 'Banks/ATMs', current: 5, projected: 7, walkTime: 4, available: true },
    { name: 'Healthcare', current: 1, projected: 2, walkTime: 20, available: false },
    { name: 'Childcare', current: 1, projected: 3, walkTime: 10, available: false }
  ];

  // Calculate community benefit score
  const communityBenefitScore = useMemo(() => {
    const totalImprovement = communityNeeds.reduce((sum, need) => {
      const improvement = need.projectedScore - need.currentScore;
      const weight = need.priority === 'High' ? 1.5 : need.priority === 'Medium' ? 1.0 : 0.7;
      return sum + (improvement * weight);
    }, 0);
    
    return Math.min(100, Math.max(0, totalImprovement / communityNeeds.length));
  }, [communityNeeds]);

  const runCommunityAnalysis = async () => {
    setAnalysisRunning(true);
    setCurrentAnalysis('');
    setShowTypewriter(false);

    setTimeout(() => {
      setCurrentAnalysis('Analyzing neighborhood demographics and existing amenities...');
      setShowTypewriter(true);
    }, 500);

    setTimeout(() => {
      setCurrentAnalysis(`Assessing community needs within ${selectedRadius} mile radius of development site...`);
    }, 2500);

    setTimeout(() => {
      setCurrentAnalysis('Calculating walkability scores and transit accessibility improvements...');
    }, 4500);

    setTimeout(() => {
      setCurrentAnalysis('Evaluating proposed community amenities and their impact on neighborhood well-being...');
    }, 6500);

    setTimeout(() => {
      setCurrentAnalysis(`Community benefit analysis complete: Development will improve overall neighborhood livability by ${communityBenefitScore.toFixed(0)}%. Priority focus areas: ${communityNeeds.filter(n => n.priority === 'High').map(n => n.category.toLowerCase()).join(', ')}.`);
      setAnalysisRunning(false);
    }, 9000);
  };

  const filteredNeeds = priorityFilter === 'all' 
    ? communityNeeds 
    : communityNeeds.filter(need => need.priority === priorityFilter);

  const walkabilityData = amenityScores.map(amenity => ({
    category: amenity.name,
    current: amenity.current,
    projected: amenity.projected,
    walkTime: amenity.walkTime
  }));

  const impactTimelineData = [
    { phase: 'Construction Start', food: 45, healthcare: 62, education: 58, recreation: 35 },
    { phase: 'Phase 1 Complete', food: 55, healthcare: 64, education: 65, recreation: 48 },
    { phase: 'Move-in Begins', food: 68, healthcare: 66, education: 75, recreation: 62 },
    { phase: 'Full Occupancy', food: 75, healthcare: 68, education: 82, recreation: 72 },
    { phase: '2 Years Post', food: 75, healthcare: 68, education: 82, recreation: 72 }
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
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Community Benefit Analyzer</h1>
              <p className="text-gray-600">Assess how development addresses neighborhood needs and improves quality of life</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Community Benefit Score */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
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
                      strokeDasharray={`${communityBenefitScore * 1.76} 176`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">{Math.round(communityBenefitScore)}</span>
                  </div>
                </div>
                <div className="text-xs font-medium">Benefit Score</div>
              </motion.div>

              <Button 
                onClick={runCommunityAnalysis}
                disabled={analysisRunning}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {analysisRunning ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Analyze Community
                  </>
                )}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Site Context */}
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{selectedSite.neighborhood}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Walk Score</div>
                  <div className="font-semibold">{selectedSite.walkScore}/100</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Population Density</div>
                  <div className="font-semibold">45,000/mi²</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Median Income</div>
                  <div className="font-semibold">$68,500</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Analysis Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Priority Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Analysis Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-1">
                  {['all', 'High', 'Medium', 'Low'].map(priority => (
                    <Button
                      key={priority}
                      size="sm"
                      variant={priorityFilter === priority ? 'default' : 'outline'}
                      onClick={() => setPriorityFilter(priority)}
                      className={`text-xs ${
                        priorityFilter === priority ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''
                      }`}
                    >
                      {priority === 'all' ? 'All' : priority}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3 pt-4">
                  {['High', 'Medium', 'Low'].map(priority => {
                    const count = communityNeeds.filter(n => n.priority === priority).length;
                    const color = priority === 'High' ? nycColors.secondary.red :
                                 priority === 'Medium' ? nycColors.secondary.orange :
                                 nycColors.secondary.green;
                    return (
                      <div key={priority} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                          <span>{priority} Priority</span>
                        </div>
                        <Badge variant="outline">{count} needs</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Community Needs List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Community Needs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {filteredNeeds.map((need, index) => (
                  <motion.div
                    key={need.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <need.icon className="h-4 w-4" style={{ color: 
                          need.priority === 'High' ? nycColors.secondary.red :
                          need.priority === 'Medium' ? nycColors.secondary.orange :
                          nycColors.secondary.green
                        }} />
                        <span className="font-medium text-sm">{need.name}</span>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          need.priority === 'High' ? 'border-red-500 text-red-700' :
                          need.priority === 'Medium' ? 'border-orange-500 text-orange-700' :
                          'border-green-500 text-green-700'
                        }
                      >
                        {need.priority}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-2">{need.description}</div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Current Score</span>
                      <span className="text-xs font-medium">{need.currentScore}/100</span>
                    </div>
                    <Progress value={need.currentScore} className="h-2 mb-2" />
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Projected Score</span>
                      <span className="text-xs font-medium text-green-600">{need.projectedScore}/100</span>
                    </div>
                    <Progress value={need.projectedScore} className="h-2" />
                    
                    <div className="mt-2 text-xs">
                      <span className={`font-medium ${
                        need.projectedScore > need.currentScore ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {need.projectedScore > need.currentScore ? '+' : ''}{need.projectedScore - need.currentScore} point improvement
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* AI Community Analysis */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Lightbulb className="h-5 w-5" />
                  AI Community Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-24">
                  {analysisRunning && !showTypewriter && (
                    <AIThinking />
                  )}
                  
                  {showTypewriter && currentAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border-l-4 border-emerald-400 p-3 rounded-r-lg"
                    >
                      <TypewriterEffect 
                        text={currentAnalysis}
                        speed={30}
                        className="text-xs text-emerald-700 leading-relaxed"
                      />
                    </motion.div>
                  )}

                  {!analysisRunning && !currentAnalysis && (
                    <div className="text-center text-gray-500">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">Run analysis for community insights</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Visualizations & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="walkability">Walkability</TabsTrigger>
                <TabsTrigger value="timeline">Impact Timeline</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Needs Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={communityNeeds.map(need => ({
                          category: need.category,
                          current: need.currentScore,
                          projected: need.projectedScore,
                          fullMark: 100
                        }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="category" />
                          <PolarRadiusAxis angle={45} domain={[0, 100]} />
                          <Radar dataKey="current" stroke={nycColors.neutral.gray} fill={nycColors.neutral.gray} fillOpacity={0.2} name="Current" />
                          <Radar dataKey="projected" stroke={nycColors.secondary.green} fill={nycColors.secondary.green} fillOpacity={0.4} name="Projected" />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Areas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {communityNeeds.filter(need => need.priority === 'High').map((need) => (
                    <Card key={need.name} className="border-l-4 border-red-400">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <need.icon className="h-5 w-5 text-red-600" />
                          <span className="font-semibold text-sm">{need.name}</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-3">{need.description}</div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Current</span>
                            <span className="font-medium">{need.currentScore}</span>
                          </div>
                          <Progress value={need.currentScore} className="h-1" />
                          <div className="flex justify-between text-xs">
                            <span>Projected</span>
                            <span className="font-medium text-green-600">{need.projectedScore}</span>
                          </div>
                          <Progress value={need.projectedScore} className="h-1" />
                        </div>

                        <div className="mt-3 text-center">
                          <Badge className="bg-green-100 text-green-800">
                            +{need.projectedScore - need.currentScore} improvement
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="walkability" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Walkability & Amenity Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={walkabilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="current" fill={nycColors.neutral.gray} name="Current Count" />
                          <Bar dataKey="projected" fill={nycColors.secondary.green} name="Projected Count" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Average Walk Time</div>
                        <div className="space-y-1">
                          {amenityScores.slice(0, 4).map(amenity => (
                            <div key={amenity.name} className="flex justify-between text-xs">
                              <span>{amenity.name}</span>
                              <span className="font-medium">{amenity.walkTime} min</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">Accessibility Score</div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">{selectedSite.walkScore}</div>
                          <div className="text-sm text-gray-600">Very Walkable</div>
                          <Progress value={selectedSite.walkScore} className="mt-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Impact Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={impactTimelineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="phase" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="food" stroke={nycColors.secondary.orange} name="Food Access" />
                          <Line type="monotone" dataKey="education" stroke={nycColors.secondary.green} name="Education" />
                          <Line type="monotone" dataKey="recreation" stroke={nycColors.primary.blue} name="Recreation" />
                          <Line type="monotone" dataKey="healthcare" stroke={nycColors.secondary.purple} name="Healthcare" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solutions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Community Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {communityNeeds.filter(need => need.priority === 'High').map((need) => (
                        <div key={need.name} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <need.icon className="h-5 w-5 text-red-600" />
                            <span className="font-semibold">{need.category}</span>
                          </div>
                          
                          <div className="space-y-2">
                            {need.solutions.map((solution, index) => (
                              <motion.div
                                key={solution}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                                <span>{solution}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-3 pt-3 border-t flex justify-between items-center">
                            <span className="text-xs text-gray-600">Impact Potential</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor((need.projectedScore - need.currentScore) / 10)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom Summary */}
        {currentAnalysis && !analysisRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Award className="h-5 w-5" />
                  Community Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {Math.round(communityBenefitScore)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">Overall Benefit Score</div>
                    <Progress value={communityBenefitScore} className="h-3" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Key Improvements</div>
                    {communityNeeds
                      .filter(need => (need.projectedScore - need.currentScore) > 20)
                      .slice(0, 3)
                      .map(need => (
                      <div key={need.name} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>{need.category}: +{need.projectedScore - need.currentScore} points</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1,200+</div>
                    <div className="text-sm text-gray-600">Residents Served</div>
                    <div className="text-xs text-gray-500 mt-2">
                      Projected to benefit from improved amenities and services
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