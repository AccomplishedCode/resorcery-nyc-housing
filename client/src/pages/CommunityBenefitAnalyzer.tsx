import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/CircularProgress";
import { motion } from "framer-motion";
import { BeforeAfterBar } from "@/components/ImpactMetric";
import { ScenarioCard } from "@/components/ScenarioCard";
import { scenarios } from "@/lib/data";

// Define community need data
const communityNeeds = [
  {
    category: "Food Access",
    metrics: [
      { name: "Grocery Stores", value: 2, recommended: 5, unit: "per sq. mile" },
      { name: "Fresh Food Markets", value: 1, recommended: 3, unit: "per neighborhood" },
      { name: "Community Gardens", value: 3, recommended: 8, unit: "per district" },
    ],
    score: 42, // 0-100 scale
    descriptions: {
      low: "Many residents live in food deserts with limited access to fresh produce and healthy food options.",
      medium: "Some areas have adequate food access, but gaps remain in lower-income sections.",
      high: "Most residents have convenient access to multiple sources of affordable, nutritious food."
    },
    currentLevel: "low"
  },
  {
    category: "Healthcare Access",
    metrics: [
      { name: "Primary Care Providers", value: 4, recommended: 10, unit: "per 10,000 residents" },
      { name: "Mental Health Services", value: 2, recommended: 6, unit: "per district" },
      { name: "Urgent Care Facilities", value: 1, recommended: 3, unit: "per neighborhood" },
    ],
    score: 35,
    descriptions: {
      low: "Significant healthcare disparities exist with inadequate facilities in most underserved areas.",
      medium: "Basic healthcare services are available but specialized care remains difficult to access.",
      high: "Comprehensive healthcare options are distributed equitably across all neighborhoods."
    },
    currentLevel: "low"
  },
  {
    category: "Green Space Equity",
    metrics: [
      { name: "Parks/Playgrounds", value: 2, recommended: 5, unit: "per sq. mile" },
      { name: "Tree Canopy Coverage", value: 15, recommended: 40, unit: "% of land area" },
      { name: "Public Recreation Areas", value: 0.8, recommended: 2.5, unit: "acres per 1,000 residents" },
    ],
    score: 28,
    descriptions: {
      low: "Green space is severely limited with minimal recreational areas and poor tree coverage.",
      medium: "Some green spaces exist but are unevenly distributed and insufficient for population density.",
      high: "Abundant, accessible green spaces are available to all residents regardless of neighborhood."
    },
    currentLevel: "low"
  },
  {
    category: "Educational Resources",
    metrics: [
      { name: "Public Libraries", value: 0.5, recommended: 1.5, unit: "per 20,000 residents" },
      { name: "After-School Programs", value: 3, recommended: 8, unit: "per school district" },
      { name: "Adult Education Centers", value: 1, recommended: 3, unit: "per district" },
    ],
    score: 45,
    descriptions: {
      low: "Educational resources are concentrated in wealthier areas with significant gaps elsewhere.",
      medium: "Basic educational facilities exist but programming and accessibility need improvement.",
      high: "Comprehensive educational resources are available to residents of all ages and backgrounds."
    },
    currentLevel: "medium"
  }
];

// Define community benefit impact of each development approach
const developmentBenefits = [
  {
    id: 1,
    name: "Maximum Affordable",
    benefits: [
      { category: "Food Access", impact: 30, details: "Ground floor grocery store (10,000 sq ft)" },
      { category: "Healthcare Access", impact: 10, details: "Small clinic space (2,500 sq ft)" },
      { category: "Green Space Equity", impact: 20, details: "Rooftop community garden and playground" },
      { category: "Educational Resources", impact: 15, details: "Community room with library services" }
    ],
    roi: 2.3, // Return on community investment multiplier
    timeline: "3-5 years",
    cost: "$2.8M",
  },
  {
    id: 2,
    name: "Mixed-Income",
    benefits: [
      { category: "Food Access", impact: 45, details: "Grocery store (15,000 sq ft) + farmers market space" },
      { category: "Healthcare Access", impact: 25, details: "Healthcare facility (5,000 sq ft)" },
      { category: "Green Space Equity", impact: 35, details: "Public plaza, green roof, and street trees" },
      { category: "Educational Resources", impact: 40, details: "Learning center with tech lab (3,000 sq ft)" }
    ],
    roi: 3.1,
    timeline: "2-4 years",
    cost: "$4.2M",
  },
  {
    id: 3,
    name: "Market Rate with Amenities",
    benefits: [
      { category: "Food Access", impact: 25, details: "Food hall with local vendors (8,000 sq ft)" },
      { category: "Healthcare Access", impact: 15, details: "Wellness center (3,000 sq ft)" },
      { category: "Green Space Equity", impact: 50, details: "Public park, playground, and extensive landscaping" },
      { category: "Educational Resources", impact: 20, details: "Multi-purpose community space for classes" }
    ],
    roi: 1.8,
    timeline: "2-3 years",
    cost: "$5.5M",
  }
];

export default function CommunityBenefitAnalyzer() {
  const [activeTab, setActiveTab] = useState("needs");
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  
  // Get selected scenario data
  const scenarioData = selectedScenario 
    ? developmentBenefits.find(s => s.id === selectedScenario) 
    : null;
  
  // Get active scenario to display from the ones in data.ts
  const displayScenario = selectedScenario 
    ? scenarios.find(s => s.id === selectedScenario) 
    : null;
  
  // Calculate updated community needs scores if a scenario is selected
  const getUpdatedScore = (category: string) => {
    if (!scenarioData) return null;
    
    const need = communityNeeds.find(n => n.category === category);
    if (!need) return null;
    
    const benefit = scenarioData.benefits.find(b => b.category === category);
    if (!benefit) return need.score;
    
    return Math.min(100, need.score + benefit.impact);
  };
  
  // Determine level description based on score
  const getCommunityLevel = (score: number) => {
    if (score >= 70) return "high";
    if (score >= 40) return "medium";
    return "low";
  };
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-12">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="font-heading font-bold text-2xl mb-1">Community Benefit Analyzer</h2>
          <p className="text-[#6C757D] mb-5">
            Analyze community needs and assess how development scenarios address local gaps
          </p>
          
          <Tabs defaultValue="needs" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="needs">Community Needs Assessment</TabsTrigger>
              <TabsTrigger value="benefits">Development Impact Analysis</TabsTrigger>
            </TabsList>
            
            {/* Community Needs Assessment Tab */}
            <TabsContent value="needs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityNeeds.map((need) => (
                  <Card key={need.category} className="overflow-hidden">
                    <div 
                      className={`h-2 w-full 
                        ${need.score < 40 ? 'bg-red-500' : 
                          need.score < 70 ? 'bg-yellow-500' : 
                          'bg-green-500'}`}
                    ></div>
                    <CardContent className="pt-5">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-heading font-bold text-lg">{need.category}</h3>
                        <div className="bg-[#F8F9FA] rounded-full h-16 w-16 flex items-center justify-center">
                          <CircularProgress 
                            percentage={need.score} 
                            size={60} 
                            color={
                              need.score < 40 ? '#DC3545' : 
                              need.score < 70 ? '#FFC107' : 
                              '#198754'
                            }
                          />
                        </div>
                      </div>
                      
                      <p className="text-sm text-[#6C757D] mb-4">
                        {need.descriptions[need.currentLevel as keyof typeof need.descriptions]}
                      </p>
                      
                      <div className="space-y-4 mb-4">
                        {need.metrics.map((metric) => (
                          <div key={metric.name}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{metric.name}</span>
                              <span className="font-medium">
                                {metric.value} / {metric.recommended} {metric.unit}
                              </span>
                            </div>
                            <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  (metric.value / metric.recommended) < 0.4 ? 'bg-red-500' : 
                                  (metric.value / metric.recommended) < 0.7 ? 'bg-yellow-500' : 
                                  'bg-green-500'
                                }`}
                                style={{ width: `${(metric.value / metric.recommended) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-[#0A5796] bg-opacity-10 rounded-lg p-5 border border-[#0A5796] border-opacity-20">
                <h3 className="font-heading font-bold text-lg text-[#0A5796] mb-3">Census Data Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-xs uppercase text-[#6C757D] font-medium mb-1">Population</div>
                    <div className="text-xl font-bold">28,746</div>
                    <div className="text-xs text-[#6C757D]">residents in study area</div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-xs uppercase text-[#6C757D] font-medium mb-1">Diversity</div>
                    <div className="text-xl font-bold">68%</div>
                    <div className="text-xs text-[#6C757D]">minority populations</div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <div className="text-xs uppercase text-[#6C757D] font-medium mb-1">Income</div>
                    <div className="text-xl font-bold">$42,580</div>
                    <div className="text-xs text-[#6C757D]">median household income</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-[#0A5796]">
                  Community needs are determined by comparing current community resources with established standards based on population density, demographics, and geographic accessibility.
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  className="bg-[#0A5796] hover:bg-[#0A5796]/90"
                  onClick={() => setActiveTab("benefits")}
                >
                  View Development Impact Analysis
                </Button>
              </div>
            </TabsContent>
            
            {/* Development Impact Analysis Tab */}
            <TabsContent value="benefits" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {scenarios.slice(0, 3).map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    id={scenario.id}
                    name={scenario.name}
                    description={scenario.description}
                    unitCount={scenario.unitCount}
                    affordablePercentage={scenario.affordablePercentage}
                    imageUrl={scenario.imageUrl}
                    isActive={selectedScenario === scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                  />
                ))}
              </div>
              
              {!selectedScenario && (
                <div className="bg-[#F8F9FA] p-10 rounded-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#ADB5BD] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-heading font-bold mb-2">Select a Development Scenario</h3>
                  <p className="text-[#6C757D] max-w-lg mx-auto">
                    Choose one of the development scenarios above to analyze its impact on community needs and benefits.
                  </p>
                </div>
              )}
              
              {selectedScenario && scenarioData && displayScenario && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-heading font-bold text-lg mb-4">Community Benefit Impacts</h3>
                          
                          <div className="space-y-6">
                            {communityNeeds.map((need) => {
                              const benefit = scenarioData.benefits.find(b => b.category === need.category);
                              const updatedScore = getUpdatedScore(need.category);
                              const currentLevel = getCommunityLevel(need.score);
                              const newLevel = updatedScore ? getCommunityLevel(updatedScore) : currentLevel;
                              
                              return (
                                <div key={need.category} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium">{need.category}</h4>
                                    {benefit && (
                                      <div className="bg-[#0A5796] bg-opacity-10 text-[#0A5796] text-xs font-medium py-1 px-2 rounded">
                                        +{benefit.impact} points
                                      </div>
                                    )}
                                  </div>
                                  
                                  <BeforeAfterBar
                                    title=""
                                    before={{ value: need.score }}
                                    after={{ value: updatedScore || need.score }}
                                    colors={{ before: "#6C757D", after: "#0A5796" }}
                                  />
                                  
                                  {benefit && (
                                    <div className="flex items-start bg-[#F8F9FA] p-3 rounded">
                                      <div className="flex-shrink-0 w-16 text-center">
                                        <div className="text-xs uppercase text-[#6C757D] mb-1">Before</div>
                                        <div className={`text-xs font-medium px-2 py-1 rounded ${
                                          currentLevel === "low" ? "bg-red-100 text-red-800" :
                                          currentLevel === "medium" ? "bg-yellow-100 text-yellow-800" :
                                          "bg-green-100 text-green-800"
                                        }`}>
                                          {currentLevel}
                                        </div>
                                      </div>
                                      
                                      <div className="mx-3 text-[#ADB5BD]">→</div>
                                      
                                      <div className="flex-shrink-0 w-16 text-center">
                                        <div className="text-xs uppercase text-[#6C757D] mb-1">After</div>
                                        <div className={`text-xs font-medium px-2 py-1 rounded ${
                                          newLevel === "low" ? "bg-red-100 text-red-800" :
                                          newLevel === "medium" ? "bg-yellow-100 text-yellow-800" :
                                          "bg-green-100 text-green-800"
                                        }`}>
                                          {newLevel}
                                        </div>
                                      </div>
                                      
                                      <div className="ml-4 flex-1">
                                        <div className="text-xs text-[#6C757D] italic">
                                          {benefit.details}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Card className="mb-6">
                        <CardContent className="pt-6">
                          <h3 className="font-heading font-bold text-lg mb-4">ROI Analysis</h3>
                          
                          <div className="flex justify-center items-center mb-4">
                            <CircularProgress 
                              percentage={Math.round(scenarioData.roi * 33)} 
                              size={100}
                              color="#0A5796"
                            />
                          </div>
                          
                          <div className="text-center mb-6">
                            <div className="text-sm text-[#6C757D]">Community Investment Return</div>
                            <div className="text-2xl font-bold">{scenarioData.roi}x</div>
                            <div className="text-xs text-[#6C757D]">ROI Multiplier</div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Implementation Cost</span>
                              <span className="font-bold">{scenarioData.cost}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Timeline</span>
                              <span className="font-bold">{scenarioData.timeline}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Public Cost Savings</span>
                              <span className="font-bold">${Math.round(parseFloat(scenarioData.cost.replace('$', '').replace('M', '')) * scenarioData.roi)}M</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-heading font-bold text-lg mb-4">Long-Term Outcomes</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium mb-1">Health Outcomes</div>
                              <div className="flex items-center">
                                <div className="h-2 rounded-full bg-green-500" style={{ width: "65%" }}></div>
                                <span className="ml-2 text-xs">65%</span>
                              </div>
                              <div className="text-xs text-[#6C757D] mt-1">Improvement in wellness metrics</div>
                            </div>
                            
                            <div>
                              <div className="text-sm font-medium mb-1">Educational Attainment</div>
                              <div className="flex items-center">
                                <div className="h-2 rounded-full bg-blue-500" style={{ width: "48%" }}></div>
                                <span className="ml-2 text-xs">48%</span>
                              </div>
                              <div className="text-xs text-[#6C757D] mt-1">Increase in graduation rates</div>
                            </div>
                            
                            <div>
                              <div className="text-sm font-medium mb-1">Economic Development</div>
                              <div className="flex items-center">
                                <div className="h-2 rounded-full bg-purple-500" style={{ width: "72%" }}></div>
                                <span className="ml-2 text-xs">72%</span>
                              </div>
                              <div className="text-xs text-[#6C757D] mt-1">Growth in local business revenue</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-heading font-bold text-lg mb-4">Implementation Strategy</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#F8F9FA] p-4 rounded">
                          <div className="bg-[#0A5796] text-white h-8 w-8 flex items-center justify-center rounded-full mb-3 font-medium">1</div>
                          <h4 className="font-medium mb-2">Community Partnership</h4>
                          <p className="text-sm text-[#6C757D]">
                            Partner with local organizations to design community facilities that meet specific neighborhood needs
                          </p>
                        </div>
                        
                        <div className="bg-[#F8F9FA] p-4 rounded">
                          <div className="bg-[#0A5796] text-white h-8 w-8 flex items-center justify-center rounded-full mb-3 font-medium">2</div>
                          <h4 className="font-medium mb-2">Public-Private Funding</h4>
                          <p className="text-sm text-[#6C757D]">
                            Leverage public dollars with private investment to maximize impact of community benefit elements
                          </p>
                        </div>
                        
                        <div className="bg-[#F8F9FA] p-4 rounded">
                          <div className="bg-[#0A5796] text-white h-8 w-8 flex items-center justify-center rounded-full mb-3 font-medium">3</div>
                          <h4 className="font-medium mb-2">Phased Approach</h4>
                          <p className="text-sm text-[#6C757D]">
                            Implement highest-need facilities first while establishing framework for future elements
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}