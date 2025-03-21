import { useState } from "react";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/CircularProgress";

export default function PolicyLab() {
  // Policy parameters with initial values
  const [farBonus, setFarBonus] = useState(33);
  const [taxAbatement, setTaxAbatement] = useState(90);
  const [sustainabilityIncentive, setSustainabilityIncentive] = useState(15);
  const [communityFacilityRequirement, setCommunityFacilityRequirement] = useState(5);
  
  // Calculate policy outcomes
  const calculateOutcomes = () => {
    // Base affordability percentage
    let affordability = 20; // Baseline MIH requirement
    
    // Increase based on policy levels
    affordability += (farBonus / 100) * 30; // Higher FAR bonus increases affordability
    affordability += (taxAbatement / 100) * 10; // Tax abatements have moderate impact
    
    // Cap at 50%
    affordability = Math.min(50, Math.round(affordability));
    
    // Units produced per acre
    const baseUnits = 80;
    const unitsPerAcre = Math.round(baseUnits * (1 + (farBonus / 100)));
    
    // Cost per affordable unit
    const baseCost = 140000;
    const costPerUnit = Math.round(baseCost * (1 - (taxAbatement / 100) * 0.3));
    
    // Energy efficiency score (0-100)
    const baseEfficiency = 50;
    const efficiencyScore = Math.min(100, Math.round(baseEfficiency + sustainabilityIncentive * 2));
    
    // Development feasibility
    let feasibility = 80;
    
    // Modify based on policy interactions
    if (farBonus > 40) feasibility -= (farBonus - 40) * 0.5;
    if (taxAbatement < 80) feasibility -= (80 - taxAbatement) * 0.5;
    if (communityFacilityRequirement > 10) feasibility -= (communityFacilityRequirement - 10) * 2;
    
    // Add back some feasibility for sustainability incentives
    feasibility += (sustainabilityIncentive / 100) * 10;
    
    // Cap between 0-100
    feasibility = Math.max(0, Math.min(100, Math.round(feasibility)));
    
    return {
      affordability,
      unitsPerAcre,
      costPerUnit,
      efficiencyScore,
      feasibility
    };
  };
  
  const outcomes = calculateOutcomes();
  
  // Calculate recommended policy mix
  const calculateRecommendation = () => {
    const current = calculateOutcomes();
    
    // Create recommendation if current mix is suboptimal
    if (current.feasibility < 75 || current.affordability < 30) {
      let recommended = {
        farBonus: farBonus,
        taxAbatement: taxAbatement,
        sustainabilityIncentive: sustainabilityIncentive,
        communityFacilityRequirement: communityFacilityRequirement
      };
      
      // Optimize for feasibility if it's too low
      if (current.feasibility < 75) {
        if (farBonus > 40) recommended.farBonus = 40;
        if (taxAbatement < 80) recommended.taxAbatement = 80;
        if (communityFacilityRequirement > 10) recommended.communityFacilityRequirement = 10;
      }
      
      // Optimize for affordability if it's too low
      if (current.affordability < 30) {
        if (farBonus < 35) recommended.farBonus = 35;
        if (taxAbatement < 90) recommended.taxAbatement = 90;
      }
      
      return recommended;
    }
    
    // If current mix is good, return null
    return null;
  };
  
  const recommendation = calculateRecommendation();
  
  // Apply recommended settings
  const applyRecommendation = () => {
    if (!recommendation) return;
    
    setFarBonus(recommendation.farBonus);
    setTaxAbatement(recommendation.taxAbatement);
    setSustainabilityIncentive(recommendation.sustainabilityIncentive);
    setCommunityFacilityRequirement(recommendation.communityFacilityRequirement);
  };
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl">Policy Testing Laboratory</h2>
              <p className="text-[#6C757D]">
                Analyze how housing policy changes affect development outcomes
              </p>
            </div>
            <Button className="bg-[#fd7e14] hover:bg-[#fd7e14]/90 hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Analysis
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Policy Parameters */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Affordability Incentives</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">FAR Bonus for Affordable Housing</label>
                        <span className="text-sm font-bold">{farBonus}%</span>
                      </div>
                      <Slider 
                        value={[farBonus]} 
                        min={0} 
                        max={50} 
                        step={1} 
                        onValueChange={(value) => setFarBonus(value[0])}
                        className="mb-1"
                      />
                      <div className="flex justify-between text-xs text-[#6C757D]">
                        <span>No Bonus</span>
                        <span>25% Bonus</span>
                        <span>50% Bonus</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Tax Abatement Duration</label>
                        <span className="text-sm font-bold">{taxAbatement}%</span>
                      </div>
                      <Slider 
                        value={[taxAbatement]} 
                        min={0} 
                        max={100} 
                        step={5} 
                        onValueChange={(value) => setTaxAbatement(value[0])}
                        className="mb-1"
                      />
                      <div className="flex justify-between text-xs text-[#6C757D]">
                        <span>None</span>
                        <span>25-Year</span>
                        <span>Full (35-Year)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Sustainability & Community</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Sustainability Incentives</label>
                        <span className="text-sm font-bold">{sustainabilityIncentive}%</span>
                      </div>
                      <Slider 
                        value={[sustainabilityIncentive]} 
                        min={0} 
                        max={30} 
                        step={5} 
                        onValueChange={(value) => setSustainabilityIncentive(value[0])}
                        className="mb-1"
                      />
                      <div className="flex justify-between text-xs text-[#6C757D]">
                        <span>None</span>
                        <span>Moderate</span>
                        <span>Strong</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Community Facility Requirement</label>
                        <span className="text-sm font-bold">{communityFacilityRequirement}%</span>
                      </div>
                      <Slider 
                        value={[communityFacilityRequirement]} 
                        min={0} 
                        max={20} 
                        step={5} 
                        onValueChange={(value) => setCommunityFacilityRequirement(value[0])}
                        className="mb-1"
                      />
                      <div className="flex justify-between text-xs text-[#6C757D]">
                        <span>None</span>
                        <span>10% of FAR</span>
                        <span>20% of FAR</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-[#fd7e14] bg-opacity-10 p-4 rounded-lg border border-[#fd7e14] border-opacity-40">
                <h3 className="font-heading font-semibold text-md text-[#fd7e14] mb-2">Policy Notes</h3>
                <p className="text-sm">
                  The current Mandatory Inclusionary Housing (MIH) program requires 20-30% affordable units.
                  These tools let you test potential modifications to the existing policy framework.
                </p>
              </div>
            </div>
            
            {/* Middle Column: Development Outcomes */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Development Outcomes</h3>
                  
                  <div className="flex justify-center mb-6">
                    <CircularProgress 
                      percentage={outcomes.feasibility} 
                      size={150}
                      color={
                        outcomes.feasibility >= 80 ? "#198754" :
                        outcomes.feasibility >= 60 ? "#FFC107" : "#DC3545"
                      }
                    />
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-sm text-[#6C757D]">Financial Feasibility</div>
                    <div className={`text-xl font-bold ${
                      outcomes.feasibility >= 80 ? "text-[#198754]" :
                      outcomes.feasibility >= 60 ? "text-[#FFC107]" : "text-[#DC3545]"
                    }`}>
                      {outcomes.feasibility}%
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Affordability Percentage</span>
                        <span className="font-bold">{outcomes.affordability}%</span>
                      </div>
                      <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${outcomes.affordability * 2}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#fd7e14] h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Units Per Acre</span>
                        <span className="font-bold">{outcomes.unitsPerAcre}</span>
                      </div>
                      <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(outcomes.unitsPerAcre / 120) * 100}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#0A5796] h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Cost Per Affordable Unit</span>
                        <span className="font-bold">${outcomes.costPerUnit.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - (outcomes.costPerUnit / 140000) * 100}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#198754] h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Energy Efficiency Score</span>
                        <span className="font-bold">{outcomes.efficiencyScore}/100</span>
                      </div>
                      <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${outcomes.efficiencyScore}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-[#198754] h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {recommendation && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#fd7e14] bg-opacity-10 border border-[#fd7e14] p-4 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className="bg-[#fd7e14] rounded-full h-10 w-10 flex items-center justify-center text-white shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-heading font-bold text-[#fd7e14]">Recommendation Available</h3>
                      <p className="text-sm mt-1">
                        Our analysis suggests a more balanced policy mix for optimal results.
                      </p>
                      <Button 
                        className="mt-2 bg-[#fd7e14] hover:bg-[#fd7e14]/90"
                        onClick={applyRecommendation}
                      >
                        Apply Recommended Settings
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Comparative Analysis</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-xs font-medium">Current MIH</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Affordability</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <div className="bg-[#6C757D] h-2 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-xs font-medium">Your Policy</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Affordability</span>
                          <span>{outcomes.affordability}%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <div className="bg-[#fd7e14] h-2 rounded-full" style={{ width: `${outcomes.affordability * 2}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-xs font-medium">Current MIH</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Units/Acre</span>
                          <span>80</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <div className="bg-[#6C757D] h-2 rounded-full" style={{ width: "66%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-right text-xs font-medium">Your Policy</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Units/Acre</span>
                          <span>{outcomes.unitsPerAcre}</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <div className="bg-[#0A5796] h-2 rounded-full" style={{ width: `${(outcomes.unitsPerAcre / 120) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column: Impact Analysis */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Policy Impact Analysis</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Neighborhood Impact</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#F8F9FA] p-3 rounded-md text-center">
                          <div className="text-sm font-bold mb-1">{Math.round(outcomes.affordability * outcomes.unitsPerAcre / 100)}</div>
                          <div className="text-xs text-[#6C757D]">Affordable Units per Acre</div>
                        </div>
                        <div className="bg-[#F8F9FA] p-3 rounded-md text-center">
                          <div className="text-sm font-bold mb-1">{
                            outcomes.feasibility >= 80 ? "High" :
                            outcomes.feasibility >= 60 ? "Medium" : "Low"
                          }</div>
                          <div className="text-xs text-[#6C757D]">Development Likelihood</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Citywide Production</h4>
                      <div className="bg-[#F8F9FA] p-3 rounded-md">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-xs text-[#6C757D] block">10-Year Projection</span>
                            <div className="text-xl font-bold">
                              {Math.round(outcomes.unitsPerAcre * 40 * (outcomes.feasibility / 100))}
                            </div>
                            <div className="text-xs text-[#6C757D]">New Units</div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-[#6C757D] block">Affordable Units</span>
                            <div className="text-xl font-bold text-[#fd7e14]">
                              {Math.round(outcomes.unitsPerAcre * 40 * (outcomes.feasibility / 100) * (outcomes.affordability / 100))}
                            </div>
                            <div className="text-xs text-[#6C757D]">Units at ≤80% AMI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Policy Cost-Benefit</h4>
                      <div className="bg-[#F8F9FA] p-3 rounded-md">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Public Investment Required</span>
                            <span className="font-bold">
                              ${Math.round(outcomes.unitsPerAcre * 40 * (outcomes.feasibility / 100) * (outcomes.affordability / 100) * outcomes.costPerUnit / 1000000)}M
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Tax Revenue Generation</span>
                            <span className="font-bold">
                              ${Math.round(outcomes.unitsPerAcre * 40 * (outcomes.feasibility / 100) * (1 - (taxAbatement / 100) * 0.4) * 15000 / 1000000)}M
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Carbon Reduction</span>
                            <span className="font-bold">
                              {Math.round(outcomes.unitsPerAcre * 40 * (outcomes.feasibility / 100) * (outcomes.efficiencyScore / 100) * 1.2)} tons/year
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#fd7e14] bg-opacity-5 p-3 rounded-md border border-[#fd7e14] border-opacity-20">
                      <h4 className="text-sm font-medium mb-2 text-[#fd7e14]">Key Policy Trade-offs</h4>
                      <ul className="text-xs space-y-1">
                        <li>• Higher affordability requirements reduce feasibility</li>
                        <li>• Greater FAR bonuses increase overall unit production</li>
                        <li>• Tax abatements increase affordability but reduce revenue</li>
                        <li>• Community facility mandates enhance neighborhoods but add costs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Historical Context</h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#DEE2E6]"></div>
                      
                      <div className="relative pl-8 pb-4">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-[#fd7e14] flex items-center justify-center text-white">
                          <span className="text-xs">1</span>
                        </div>
                        <h4 className="text-sm font-medium">1987: 421-a Property Tax Exemption</h4>
                        <p className="text-xs text-[#6C757D] mt-1">
                          Original program provided tax breaks for new multifamily construction without affordable requirements
                        </p>
                      </div>
                      
                      <div className="relative pl-8 pb-4">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-[#fd7e14] flex items-center justify-center text-white">
                          <span className="text-xs">2</span>
                        </div>
                        <h4 className="text-sm font-medium">2007: Geographic Exclusion Area</h4>
                        <p className="text-xs text-[#6C757D] mt-1">
                          Revised to require affordable housing in high-value areas
                        </p>
                      </div>
                      
                      <div className="relative pl-8 pb-4">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-[#fd7e14] flex items-center justify-center text-white">
                          <span className="text-xs">3</span>
                        </div>
                        <h4 className="text-sm font-medium">2016: Mandatory Inclusionary Housing</h4>
                        <p className="text-xs text-[#6C757D] mt-1">
                          Required 20-30% affordable units in rezoned areas
                        </p>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-[#198754] flex items-center justify-center text-white">
                          <span className="text-xs">?</span>
                        </div>
                        <h4 className="text-sm font-medium">Future: Policy Lab Recommendations</h4>
                        <p className="text-xs text-[#6C757D] mt-1">
                          Your policy testing helps shape the next generation of housing initiatives
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button className="bg-[#fd7e14] hover:bg-[#fd7e14]/90 w-full md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}