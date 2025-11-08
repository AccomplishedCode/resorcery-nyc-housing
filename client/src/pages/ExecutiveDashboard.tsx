import { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { nycColors, getBoroughColor } from "@/lib/nyc-design-system";
import { nycSites } from "@/lib/nyc-mock-data";
import { 
  TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign,
  Users, Building, Briefcase, Target, Crown, Flag,
  ArrowUpRight, ArrowRight, Eye, Download, RefreshCw
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ExecutiveMetric {
  title: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on-track' | 'at-risk' | 'critical';
  timeline: string;
  description: string;
}

interface QuickWin {
  location: string;
  opportunity: string;
  impact: string;
  timeline: string;
  investment: string;
  confidence: 'High' | 'Medium' | 'Low';
  politicalRisk: 'Low' | 'Medium' | 'High';
}

export default function ExecutiveDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'current' | '1year' | '4year'>('1year');
  const [selectedBorough, setSelectedBorough] = useState<string>('all');

  // Executive-level metrics that matter to leadership
  const executiveMetrics: ExecutiveMetric[] = [
    {
      title: 'Affordable Units Pipeline',
      current: 12500,
      target: 25000,
      unit: 'units',
      trend: 'up',
      status: 'at-risk',
      timeline: 'By 2028',
      description: 'Units identified through evidence-based site selection'
    },
    {
      title: 'Community Approval Rate',
      current: 68,
      target: 85,
      unit: '%',
      trend: 'up',
      status: 'on-track', 
      timeline: 'This year',
      description: 'Projects using community-informed development approach'
    },
    {
      title: 'Development Timeline',
      current: 42,
      target: 28,
      unit: 'months',
      trend: 'down',
      status: 'on-track',
      timeline: 'Average',
      description: 'From site identification to occupancy'
    },
    {
      title: 'Public Investment ROI',
      current: 2.8,
      target: 4.2,
      unit: 'x return',
      trend: 'up',
      status: 'on-track',
      timeline: '10-year',
      description: 'Economic impact per dollar of public investment'
    }
  ];

  // Quick wins that could be implemented immediately
  const quickWins: QuickWin[] = [
    {
      location: 'Downtown Brooklyn',
      opportunity: 'Former Macy\'s → Mixed-Use Development',
      impact: '450 affordable units + 200 jobs + childcare center',
      timeline: '24 months',
      investment: '$85M (60% private)',
      confidence: 'High',
      politicalRisk: 'Low'
    },
    {
      location: 'South Bronx',
      opportunity: 'Vacant Lots → Community Housing',
      impact: '320 units + green space + health clinic', 
      timeline: '18 months',
      investment: '$52M (80% federal)',
      confidence: 'High',
      politicalRisk: 'Low'
    },
    {
      location: 'East New York',
      opportunity: 'Old Warehouse → Senior Housing',
      impact: '180 senior units + community center',
      timeline: '20 months', 
      investment: '$38M (full public)',
      confidence: 'Medium',
      politicalRisk: 'Medium'
    },
    {
      location: 'Flushing',
      opportunity: 'Underused Plaza → Transit Housing',
      impact: '280 units + retail + transit improvements',
      timeline: '36 months',
      investment: '$95M (40% MTA partnership)',
      confidence: 'Medium',
      politicalRisk: 'Medium'
    }
  ];

  const boroughData = [
    { borough: 'Brooklyn', opportunities: 185, readyForDevelopment: 67, highCommunitySupport: 23 },
    { borough: 'Queens', opportunities: 156, readyForDevelopment: 42, highCommunitySupport: 18 },
    { borough: 'Bronx', opportunities: 134, readyForDevelopment: 51, highCommunitySupport: 31 },
    { borough: 'Manhattan', opportunities: 89, readyForDevelopment: 28, highCommunitySupport: 12 },
    { borough: 'Staten Island', opportunities: 45, readyForDevelopment: 15, highCommunitySupport: 8 }
  ];

  const communityNeedsData = [
    { need: 'Affordable Housing', priority: 89, satisfaction: 32 },
    { need: 'Childcare', priority: 76, satisfaction: 45 },
    { need: 'Grocery/Food Access', priority: 68, satisfaction: 52 },
    { need: 'Healthcare', priority: 72, satisfaction: 61 },
    { need: 'Green Space', priority: 58, satisfaction: 38 },
    { need: 'Job Training', priority: 65, satisfaction: 28 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'at-risk': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-green-600 transform rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Executive Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">Executive Dashboard</h1>
              <p className="text-gray-600">Real-time view of neighborhood development opportunities and community impact</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">
                <RefreshCw className="h-3 w-3 mr-1" />
                Updated 2 hours ago
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export for Mayor
              </Button>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {executiveMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-l-4 ${
                  metric.status === 'on-track' ? 'border-green-500' :
                  metric.status === 'at-risk' ? 'border-orange-500' : 'border-red-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {getStatusIcon(metric.status)}
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.current.toLocaleString()}{metric.unit}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{metric.title}</div>
                    <div className="text-xs text-gray-600 mb-2">{metric.description}</div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span>Target: {metric.target.toLocaleString()}{metric.unit}</span>
                      <span className="text-gray-500">{metric.timeline}</span>
                    </div>
                    <Progress 
                      value={(metric.current / metric.target) * 100} 
                      className="h-1 mt-2"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Immediate Opportunities */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Ready for Action
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    {quickWins.filter(w => w.confidence === 'High').length} High-Confidence Opportunities
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickWins.slice(0, 3).map((win, index) => (
                  <motion.div
                    key={win.location}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{win.location}</h4>
                        <p className="text-sm text-gray-600">{win.opportunity}</p>
                      </div>
                      <div className="flex gap-1">
                        <Badge 
                          variant="outline"
                          className={
                            win.confidence === 'High' ? 'border-green-500 text-green-700' :
                            'border-orange-500 text-orange-700'
                          }
                        >
                          {win.confidence} Confidence
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={
                            win.politicalRisk === 'Low' ? 'border-green-500 text-green-700' :
                            win.politicalRisk === 'Medium' ? 'border-orange-500 text-orange-700' :
                            'border-red-500 text-red-700'
                          }
                        >
                          {win.politicalRisk} Risk
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-gray-600">Impact</div>
                        <div className="font-medium">{win.impact}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Timeline</div>
                        <div className="font-medium">{win.timeline}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-nyc-blue">{win.investment}</span>
                      <Button size="sm" className="bg-nyc-blue hover:bg-nyc-dark-blue">
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}

                <Button className="w-full mt-4" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View All 47 Opportunities
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Borough Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Borough Development Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={boroughData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="borough" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="opportunities" fill={nycColors.neutral.gray} name="Total Opportunities" />
                      <Bar dataKey="readyForDevelopment" fill={nycColors.secondary.green} name="Development Ready" />
                      <Bar dataKey="highCommunitySupport" fill={nycColors.primary.blue} name="High Community Support" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-5 gap-2 text-xs">
                  {boroughData.map((borough) => (
                    <div key={borough.borough} className="text-center p-2 rounded border">
                      <div className="font-semibold">{borough.borough}</div>
                      <div className="text-gray-600">{borough.readyForDevelopment} ready</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Priorities Citywide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communityNeedsData.slice(0, 4).map((need, index) => (
                    <div key={need.need} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{need.need}</span>
                          <div className="flex gap-2 text-xs">
                            <span className="text-gray-600">Priority: {need.priority}%</span>
                            <span className="text-gray-600">Satisfied: {need.satisfaction}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Progress value={need.priority} className="flex-1 h-2" />
                          <Progress value={need.satisfaction} className="flex-1 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="text-sm font-medium text-blue-700 mb-1">
                    Data Pattern Insight
                  </div>
                  <div className="text-xs text-blue-600">
                    Neighborhoods with high childcare demand show 34% faster approval for family housing developments
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Strategic Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Budget Impact */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <DollarSign className="h-5 w-5" />
                Budget Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-green-700">$2.3B</div>
                  <div className="text-sm text-green-600">Potential savings vs traditional development</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-700">$450M</div>
                  <div className="text-sm text-green-600">Annual economic impact from identified opportunities</div>
                </div>
                <div className="text-xs text-gray-600 pt-2 border-t">
                  Based on evidence-based site selection reducing approval time by 18 months average
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Political Risk Assessment */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Crown className="h-5 w-5" />
                Political Viability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low Risk Projects</span>
                  <span className="font-bold text-green-600">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Community Board Support</span>
                  <span className="font-bold text-blue-600">73%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Regulatory Alignment</span>
                  <span className="font-bold text-green-600">89%</span>
                </div>
                <div className="text-xs text-gray-600 pt-2 border-t">
                  Projects selected using community-informed data show 3x higher approval rates
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline to Impact */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Clock className="h-5 w-5" />
                Timeline to Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">6 Months</span>
                    <span className="text-sm font-medium">15 projects approved</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">18 Months</span>
                    <span className="text-sm font-medium">2,500 units under construction</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">4 Years</span>
                    <span className="text-sm font-medium">25,000 new affordable units</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="text-xs text-gray-600 pt-2 border-t">
                  Accelerated timeline through data-driven pre-qualification
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-r from-nyc-blue to-nyc-light-blue text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Transform Neighborhood Planning?
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Every day of delay means more families on waitlists and more vacant buildings. 
                Data-driven development can start addressing both problems immediately.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-white text-nyc-blue hover:bg-gray-100 px-8 py-3">
                  Schedule Briefing with Mayor's Team
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-nyc-blue px-8 py-3">
                  Request Pilot Program
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}