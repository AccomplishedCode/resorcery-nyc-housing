import { useState } from 'react';
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { nycColors } from "@/lib/nyc-design-system";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import { 
  ArrowRight, Play, MapPin, Building, Users, TrendingUp, 
  Heart, Briefcase, Home, TreePine, Target, Database,
  ChevronRight, Eye, BarChart3
} from "lucide-react";

export default function HomeRedesigned() {
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const crisisStats = [
    { label: "Vacant Storefronts", value: "12,000+", description: "Post-COVID retail spaces", color: nycColors.secondary.red },
    { label: "Housing Waitlist", value: "250,000", description: "Families needing affordable housing", color: nycColors.secondary.orange },
    { label: "Underutilized Buildings", value: "8,500", description: "City-owned properties", color: nycColors.primary.blue },
    { label: "Community Needs", value: "Unmet", description: "Childcare, healthcare, groceries", color: nycColors.secondary.purple }
  ];

  const solutionPaths = [
    {
      id: 'identify',
      title: 'Identify Opportunities',
      description: 'Find underutilized buildings and assess real community needs through data analysis',
      icon: Target,
      color: nycColors.primary.blue,
      tools: ['Opportunity Finder', '3D Visualization', 'Community Assessment'],
      outcome: 'Discover hidden potential in every neighborhood'
    },
    {
      id: 'plan',
      title: 'Plan Smart Solutions',
      description: 'Test development scenarios that balance community needs with financial reality',
      icon: BarChart3,
      color: nycColors.secondary.green,
      tools: ['Development Scenarios', 'Affordability Calculator', 'Policy Lab'],
      outcome: 'Create developments that actually work for everyone'
    },
    {
      id: 'measure',
      title: 'Measure Real Impact',
      description: 'Track how changes affect jobs, environment, housing access, and community wellbeing',
      icon: Heart,
      color: nycColors.secondary.orange,
      tools: ['Impact Dashboard', 'Environmental Analysis', 'Community Benefits'],
      outcome: 'Ensure development strengthens neighborhoods'
    }
  ];

  const demoSteps = [
    {
      title: "The Challenge",
      content: "Downtown Brooklyn has 47 vacant retail spaces since COVID, while 8,000+ families wait for affordable housing.",
      visual: "map-overview"
    },
    {
      title: "Community Voice",
      content: "Community board meetings show residents need: childcare (78% priority), affordable housing (85% priority), local jobs (62% priority).",
      visual: "community-data"
    },
    {
      title: "Hidden Opportunity", 
      content: "Data reveals: Former Macy's building has perfect zoning and community support for mixed-use redevelopment.",
      visual: "building-match"
    },
    {
      title: "Smart Solution",
      content: "Proposed: 200 affordable units + childcare center + local retail space = addresses top 3 community priorities.",
      visual: "solution-preview"
    },
    {
      title: "Real Impact",
      content: "Result: 450 residents housed + 120 local jobs + improved neighborhood services. All backed by community data.",
      visual: "impact-metrics"
    }
  ];

  const runBrooklynDemo = () => {
    setShowDemo(true);
    setDemoStep(0);
    
    // Auto-advance through demo steps
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-16">
          <div className="flex flex-col items-center justify-center py-20 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="text-nyc-orange font-semibold text-sm uppercase tracking-wider">
                Evidence-Based Neighborhood Planning
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-bold text-nyc-blue mb-6 leading-tight"
            >
              What if every decision<br />
              <span className="gradient-text">served the community?</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-700 max-w-4xl mb-8 leading-relaxed"
            >
              Resorcery combines real NYC data with community input to reveal development opportunities 
              that strengthen neighborhoods instead of displacing them.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button 
                onClick={runBrooklynDemo}
                className="bg-nyc-blue hover:bg-nyc-dark-blue text-white px-8 py-6 text-lg font-semibold flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                See Brooklyn Example
              </Button>
              <Link href="/executive-dashboard">
                <Button variant="outline" className="border-nyc-blue text-nyc-blue hover:bg-nyc-blue hover:text-white px-8 py-6 text-lg font-semibold">
                  Executive Dashboard
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-gray-600"
            >
              Used by: Mayor's Office • HPD • Community Development • Policy Teams
            </motion.div>
          </div>
        </div>

        {/* Crisis Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Urban Challenge</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NYC faces a perfect storm: post-COVID vacant buildings, housing shortage, and unmet community needs. 
              What if we could turn this crisis into an opportunity?
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {crisisStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="border-l-4 hover:shadow-lg transition-shadow" style={{ borderLeftColor: stat.color }}>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brooklyn Demo Modal */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDemo(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-nyc-blue">Brooklyn Community Development Story</h2>
                    <Button variant="ghost" onClick={() => setShowDemo(false)}>
                      ×
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    See how data-driven analysis reveals community-serving opportunities
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      {demoSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full transition-all ${
                            index <= demoStep ? 'bg-nyc-blue' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Step {demoStep + 1} of {demoSteps.length}
                    </div>
                  </div>

                  <div className="min-h-64">
                    <motion.div
                      key={demoStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-bold text-nyc-blue mb-4">
                        {demoSteps[demoStep]?.title}
                      </h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6 mb-4">
                        <TypewriterEffect 
                          text={demoSteps[demoStep]?.content || ''}
                          speed={30}
                          className="text-gray-700 text-lg leading-relaxed"
                        />
                      </div>

                      {/* Visual placeholder for demo content */}
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 text-center border border-blue-200">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                        <div className="text-lg font-semibold text-blue-700">
                          {demoSteps[demoStep]?.visual === 'map-overview' && 'Interactive Brooklyn Map'}
                          {demoSteps[demoStep]?.visual === 'community-data' && 'Community Feedback Analysis'}
                          {demoSteps[demoStep]?.visual === 'building-match' && 'Building Opportunity Assessment'}
                          {demoSteps[demoStep]?.visual === 'solution-preview' && 'Development Solution Preview'}
                          {demoSteps[demoStep]?.visual === 'impact-metrics' && 'Community Impact Dashboard'}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          Live visualization would appear here
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setDemoStep(Math.max(0, demoStep - 1))}
                      disabled={demoStep === 0}
                    >
                      Previous
                    </Button>
                    
                    {demoStep < demoSteps.length - 1 ? (
                      <Button 
                        onClick={() => setDemoStep(demoStep + 1)}
                        className="bg-nyc-blue hover:bg-nyc-dark-blue"
                      >
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Link href="/opportunity-finder">
                        <Button className="bg-green-600 hover:bg-green-700">
                          Explore Platform
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solution Approach */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Data-Driven Community Development</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Instead of guesswork and political battles, use real data to find solutions that serve existing communities 
              while addressing the housing crisis. Every recommendation is backed by evidence, not assumptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutionPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${path.color}15` }}
                      >
                        <path.icon className="h-10 w-10" style={{ color: path.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{path.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Includes:
                      </div>
                      {path.tools.map((tool, i) => (
                        <div key={tool} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: path.color }}></div>
                          {tool}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm font-medium" style={{ color: path.color }}>
                        {path.outcome}
                      </div>
                      <Button 
                        className="w-full mt-4 group-hover:shadow-md transition-all" 
                        style={{ backgroundColor: path.color, color: 'white' }}
                      >
                        Start Here
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-nyc-blue to-nyc-light-blue text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">
                From Crisis to Opportunity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">18 Months</div>
                  <div className="opacity-90">Faster development timelines</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">$2.3B</div>
                  <div className="opacity-90">Potential cost savings citywide</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">85%</div>
                  <div className="opacity-90">Community approval rate</div>
                </div>
              </div>
              <Button 
                className="mt-8 bg-white text-nyc-blue hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Request Demo for Your Team
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three simple steps that transform how neighborhoods develop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: 1,
                title: "Analyze Real Data",
                description: "Combine NYC open data, community board feedback, and demographic patterns to understand what neighborhoods actually need",
                icon: Database
              },
              {
                step: 2,
                title: "Identify Opportunities",
                description: "Find underutilized city-owned buildings and vacant spaces that could address those specific community needs",
                icon: Target
              },
              {
                step: 3,
                title: "Plan Smart Development",
                description: "Design solutions that serve existing residents while adding housing, jobs, and community amenities",
                icon: Heart
              }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-nyc-blue flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-nyc-blue mx-auto" />
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <div className="border-t-2 border-dashed border-gray-300"></div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof / Credibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-16 text-center"
        >
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              "What we need is technology that puts community voices at the center of development decisions."
            </h3>
            <div className="text-sm text-gray-600">
              — NYC Community Development Stakeholder
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="pt-12 border-t border-gray-200 text-center"
        >
          <div className="text-gray-600 mb-4">
            <div className="text-sm font-semibold text-nyc-blue mb-2">NYC Housing Preservation & Development</div>
            <div className="text-xs">Demonstration Platform • Evidence-Based Community Development</div>
          </div>
          <div className="text-xs text-gray-500">
            Built for the Future of Neighborhood Planning • Demo Mode Only
          </div>
        </motion.footer>
      </main>
    </div>
  );
}