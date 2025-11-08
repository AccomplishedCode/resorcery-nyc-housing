import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { InteractiveHeatmap } from '@/components/InteractiveHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Users, School, Train, Briefcase, Home, TrendingUp, TrendingDown,
  MapPin, Clock, DollarSign, Building, TreePine, Car, Zap,
  BarChart3, Eye, Download, Play, Pause, RotateCcw,
  ArrowUpRight, ArrowDownRight, Minus, AlertTriangle, CheckCircle,
  Activity, Target, Layers
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
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface NeighborhoodMetric {
  name: string;
  current: number;
  projected: number;
  change: number;
  unit: string;
  icon: any;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TimelineData {
  year: number;
  population: number;
  jobs: number;
  schoolCapacity: number;
  transitUsage: number;
  propertyValues: number;
}

export default function NeighborhoodImpactEnhanced() {
  const [selectedSite] = useState(nycSites[0]);
  const [selectedMetric, setSelectedMetric] = useState('Population Density');
  const [showComparison, setShowComparison] = useState(true);
  const [timelineProgress, setTimelineProgress] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('mixed-use');

  // Mock heatmap data for different metrics
  const generateHeatmapData = (metric: string, multiplier: number = 1) => {
    const data = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 10; j++) {
        const baseValue = Math.random() * 100;
        const neighborhoodNames = [
          'East Village', 'Lower East Side', 'SoHo', 'Chinatown', 'Little Italy',
          'NoLita', 'Bowery', 'Two Bridges', 'Financial District'
        ];
        data.push({
          x: (i / 14) * 100,
          y: (j / 9) * 100,
          value: baseValue * multiplier,
          neighborhood: neighborhoodNames[Math.floor(Math.random() * neighborhoodNames.length)],
          change: (Math.random() - 0.5) * 40 * multiplier
        });
      }
    }
    return data;
  };

  const heatmapData = useMemo(() => generateHeatmapData(selectedMetric), [selectedMetric]);
  const beforeData = useMemo(() => generateHeatmapData(selectedMetric, 0.8), [selectedMetric]);

  // Impact metrics
  const impactMetrics: NeighborhoodMetric[] = [
    {
      name: 'Population Density',
      current: 45000,
      projected: 52000,
      change: 15.6,
      unit: 'per sq mile',
      icon: Users,
      trend: 'up',
      color: nycColors.primary.blue
    },
    {
      name: 'School Enrollment',
      current: 2800,
      projected: 3200,
      change: 14.3,
      unit: 'students',
      icon: School,
      trend: 'up',
      color: nycColors.secondary.green
    },
    {
      name: 'Transit Ridership',
      current: 12500,
      projected: 14200,
      change: 13.6,
      unit: 'daily riders',
      icon: Train,
      trend: 'up',
      color: nycColors.secondary.orange
    },
    {
      name: 'Local Jobs',
      current: 5800,
      projected: 7200,
      change: 24.1,
      unit: 'positions',
      icon: Briefcase,
      trend: 'up',
      color: nycColors.secondary.purple
    },
    {
      name: 'Median Rent',
      current: 3200,
      projected: 3450,
      change: 7.8,
      unit: '$/month',
      icon: Home,
      trend: 'up',
      color: nycColors.secondary.yellow
    },
    {
      name: 'Green Space',
      current: 15,
      projected: 22,
      change: 46.7,
      unit: 'acres',
      icon: TreePine,
      trend: 'up',
      color: nycColors.secondary.green
    }
  ];

  // Timeline data for projections
  const timelineData: TimelineData[] = [
    { year: 2024, population: 45000, jobs: 5800, schoolCapacity: 2800, transitUsage: 12500, propertyValues: 850000 },
    { year: 2025, population: 46500, jobs: 6200, schoolCapacity: 2900, transitUsage: 13000, propertyValues: 875000 },
    { year: 2026, population: 48200, jobs: 6600, schoolCapacity: 3000, transitUsage: 13500, propertyValues: 900000 },
    { year: 2027, population: 50000, jobs: 6900, schoolCapacity: 3100, transitUsage: 13800, propertyValues: 925000 },
    { year: 2028, population: 51500, jobs: 7200, schoolCapacity: 3200, transitUsage: 14200, propertyValues: 950000 },
    { year: 2030, population: 52000, jobs: 7200, schoolCapacity: 3200, transitUsage: 14200, propertyValues: 975000 },
  ];

  const metricOptions = ['Population Density', 'School Capacity', 'Transit Usage', 'Economic Activity'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Simulated timeline playback
  const playTimeline = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const interval = setInterval(() => {
      setTimelineProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Neighborhood Impact Analysis</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{selectedSite.name} • {selectedSite.neighborhood}, {selectedSite.borough}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Badge variant="outline" className="text-nyc-blue border-nyc-blue">
                Mixed-Use Development Scenario
              </Badge>
            </div>
          </div>

          {/* Impact Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {metric.name === 'Median Rent' || metric.name === 'Property Value' 
                        ? `$${metric.projected.toLocaleString()}`
                        : metric.projected.toLocaleString()
                      }
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{metric.name}</div>
                    <div className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}% projected
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Metric Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Heatmap Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {metricOptions.map(metric => (
                  <motion.button
                    key={metric}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMetric(metric)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      selectedMetric === metric 
                        ? 'bg-nyc-blue text-white border-nyc-blue' 
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="font-medium text-sm">{metric}</div>
                  </motion.button>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="comparison">Show Before/After</Label>
                    <Switch
                      id="comparison"
                      checked={showComparison}
                      onCheckedChange={setShowComparison}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Impact Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    size="sm"
                    onClick={playTimeline}
                    className="bg-nyc-blue hover:bg-nyc-dark-blue"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setTimelineProgress(0);
                      setIsPlaying(false);
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Year {2024 + Math.floor((timelineProgress / 100) * 6)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Label>Development Progress: {timelineProgress}%</Label>
                  <Slider
                    value={[timelineProgress]}
                    onValueChange={([value]) => setTimelineProgress(value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="text-sm font-medium text-gray-700">Key Milestones</div>
                  {[
                    { progress: 0, label: 'Construction Begins', date: '2024 Q1' },
                    { progress: 25, label: 'Foundation Complete', date: '2025 Q1' },
                    { progress: 50, label: 'Structure Complete', date: '2026 Q1' },
                    { progress: 75, label: 'Occupancy Begins', date: '2027 Q1' },
                    { progress: 100, label: 'Full Occupancy', date: '2028 Q1' },
                  ].map((milestone) => (
                    <div
                      key={milestone.progress}
                      className={`flex items-center justify-between text-xs px-3 py-2 rounded ${
                        timelineProgress >= milestone.progress 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="font-medium">{milestone.label}</span>
                      <span>{milestone.date}</span>
                      {timelineProgress >= milestone.progress && (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Activity className="h-5 w-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white rounded p-3 border border-purple-100">
                  <div className="text-sm font-medium text-purple-700 mb-1">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Positive Impact Detected
                  </div>
                  <div className="text-xs text-gray-700">
                    Transit ridership projected to increase 13.6% due to optimal station proximity
                  </div>
                </div>
                
                <div className="bg-white rounded p-3 border border-orange-100">
                  <div className="text-sm font-medium text-orange-700 mb-1">
                    <AlertTriangle className="h-4 w-4 inline mr-1" />
                    Infrastructure Consideration
                  </div>
                  <div className="text-xs text-gray-700">
                    School capacity may need expansion to accommodate 400 new students
                  </div>
                </div>

                <div className="bg-white rounded p-3 border border-green-100">
                  <div className="text-sm font-medium text-green-700 mb-1">
                    <Target className="h-4 w-4 inline mr-1" />
                    Optimization Suggestion
                  </div>
                  <div className="text-xs text-gray-700">
                    Adding 2 acres of green space could improve community health scores by 12%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Heatmap and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Heatmap */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {selectedMetric} Impact Heatmap
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {showComparison && (
                      <Badge variant="outline" className="text-xs">
                        Before/After Comparison
                      </Badge>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View 3D
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <InteractiveHeatmap
                    data={heatmapData}
                    metric={selectedMetric}
                    showComparison={showComparison}
                    beforeData={beforeData}
                    width={600}
                    height={400}
                  />
                </div>
                
                {showComparison && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 mb-2">Impact Summary</div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-green-600 font-medium">Positive Impact Areas</div>
                        <div className="text-gray-600">67% of grid cells</div>
                      </div>
                      <div>
                        <div className="text-orange-600 font-medium">Moderate Impact</div>
                        <div className="text-gray-600">28% of grid cells</div>
                      </div>
                      <div>
                        <div className="text-red-600 font-medium">High Impact Zones</div>
                        <div className="text-gray-600">5% of grid cells</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Analytics */}
            <Tabs defaultValue="trends" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
                <TabsTrigger value="comparison">Scenario Comparison</TabsTrigger>
                <TabsTrigger value="projections">Long-term Projections</TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Population & Economic Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timelineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="population" stroke={nycColors.primary.blue} name="Population" />
                          <Line type="monotone" dataKey="jobs" stroke={nycColors.secondary.green} name="Local Jobs" />
                          <Line type="monotone" dataKey="transitUsage" stroke={nycColors.secondary.orange} name="Transit Usage" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Scenario Impact Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Max Density', population: 15.6, jobs: 24.1, school: 18.2, transit: 16.8 },
                          { name: 'Affordable Focus', population: 12.3, jobs: 18.7, school: 14.5, transit: 13.2 },
                          { name: 'Mixed-Use', population: 13.8, jobs: 21.4, school: 15.7, transit: 14.9 },
                          { name: 'Green Pioneer', population: 11.9, jobs: 16.3, school: 13.1, transit: 12.5 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="population" fill={nycColors.primary.blue} name="Population Impact %" />
                          <Bar dataKey="jobs" fill={nycColors.secondary.green} name="Job Creation %" />
                          <Bar dataKey="school" fill={nycColors.secondary.orange} name="School Impact %" />
                          <Bar dataKey="transit" fill={nycColors.secondary.purple} name="Transit Impact %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projections" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>20-Year Community Impact Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="propertyValues" stackId="1" stroke={nycColors.secondary.purple} fill={nycColors.secondary.purple} name="Property Values" />
                          <Area type="monotone" dataKey="schoolCapacity" stackId="2" stroke={nycColors.secondary.green} fill={nycColors.secondary.green} name="School Capacity" />
                        </AreaChart>
                      </ResponsiveContainer>
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