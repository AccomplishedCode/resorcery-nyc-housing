import { useState } from "react";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/CircularProgress";

export default function AffordabilityCalculator() {
  // State for slider values
  const [affordablePercentage, setAffordablePercentage] = useState(30);
  const [amiTargetAverage, setAmiTargetAverage] = useState(60);
  const [studioPercentage, setStudioPercentage] = useState(25);
  const [oneBrPercentage, setOneBrPercentage] = useState(40);
  const [twoBrPercentage, setTwoBrPercentage] = useState(25);
  const [threeBrPercentage, setThreeBrPercentage] = useState(10);
  
  // Calculate derived metrics
  const calculateFinancialFeasibility = () => {
    // Base feasibility is 100%
    let feasibility = 100;
    
    // Higher affordable percentages reduce feasibility
    if (affordablePercentage > 30) {
      feasibility -= (affordablePercentage - 30) * 2;
    }
    
    // Lower AMI targets reduce feasibility
    if (amiTargetAverage < 60) {
      feasibility -= (60 - amiTargetAverage) * 1.5;
    }
    
    // Larger units (2BR, 3BR) reduce feasibility when exceeding certain thresholds
    if (twoBrPercentage > 30) {
      feasibility -= (twoBrPercentage - 30) * 1;
    }
    
    if (threeBrPercentage > 15) {
      feasibility -= (threeBrPercentage - 15) * 2;
    }
    
    // Cap at 100% and floor at 0%
    return Math.max(0, Math.min(100, feasibility));
  };
  
  const financialFeasibility = calculateFinancialFeasibility();
  
  // Calculate subsidy needed
  const calculateSubsidyNeeded = () => {
    // Base subsidy is $10M for a 100-unit building
    let baseSubsidy = 10000000;
    
    // Higher affordable percentages increase subsidy
    let multiplier = 1 + (affordablePercentage / 100);
    
    // Lower AMI targets increase subsidy
    multiplier *= (1 + ((60 - amiTargetAverage) / 100));
    
    // Larger units increase subsidy
    multiplier *= (1 + ((twoBrPercentage + threeBrPercentage) / 200));
    
    return Math.round(baseSubsidy * multiplier);
  };
  
  const subsidyNeeded = calculateSubsidyNeeded();
  
  // Calculate community impact
  const calculateCommunityImpact = () => {
    // Base impact score is 60
    let impact = 60;
    
    // Higher affordable percentages increase impact
    impact += affordablePercentage / 2;
    
    // Lower AMI targets increase impact
    impact += (80 - amiTargetAverage) / 3;
    
    // More family-sized units (2BR, 3BR) increase impact
    impact += (twoBrPercentage + threeBrPercentage) / 5;
    
    // Cap at 100
    return Math.min(100, Math.round(impact));
  };
  
  const communityImpact = calculateCommunityImpact();
  
  // Calculate sweet spot indicators
  const isInSweetSpot = financialFeasibility >= 75 && communityImpact >= 75;
  
  // Calculate breakdown of affordable units by AMI level
  const totalUnits = 100; // Assume 100 units total for simplicity
  const affordableUnits = Math.round(totalUnits * (affordablePercentage / 100));
  
  const amiLevels = [
    {
      level: "30% AMI",
      percentage: amiTargetAverage <= 40 ? 30 : amiTargetAverage <= 60 ? 20 : 10,
      color: "#DC3545"
    },
    {
      level: "50% AMI",
      percentage: amiTargetAverage <= 40 ? 40 : amiTargetAverage <= 60 ? 35 : 25,
      color: "#FD7E14"
    },
    {
      level: "80% AMI",
      percentage: amiTargetAverage <= 40 ? 20 : amiTargetAverage <= 60 ? 30 : 40,
      color: "#0A5796"
    },
    {
      level: "120% AMI",
      percentage: amiTargetAverage <= 40 ? 10 : amiTargetAverage <= 60 ? 15 : 25,
      color: "#198754"
    }
  ];
  
  // Ensure unit type percentages add to 100%
  const normalizeUnitPercentages = () => {
    const total = studioPercentage + oneBrPercentage + twoBrPercentage + threeBrPercentage;
    if (total !== 100) {
      // Adjust the last changed value
      const diff = 100 - total;
      if (studioPercentage > 0 && studioPercentage + diff >= 0) {
        setStudioPercentage(studioPercentage + diff);
      } else if (oneBrPercentage > 0 && oneBrPercentage + diff >= 0) {
        setOneBrPercentage(oneBrPercentage + diff);
      } else if (twoBrPercentage > 0 && twoBrPercentage + diff >= 0) {
        setTwoBrPercentage(twoBrPercentage + diff);
      } else if (threeBrPercentage > 0 && threeBrPercentage + diff >= 0) {
        setThreeBrPercentage(threeBrPercentage + diff);
      }
    }
  };
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl">Affordability Calculator</h2>
              <p className="text-[#6C757D]">
                Fine-tune affordable housing parameters to optimize development feasibility
              </p>
            </div>
            <Button className="bg-[#6610f2] hover:bg-[#6610f2]/90 hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Sliders */}
            <div className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Affordability Parameters</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Affordable Percentage</label>
                        <span className="text-sm font-bold">{affordablePercentage}%</span>
                      </div>
                      <Slider 
                        value={[affordablePercentage]} 
                        min={0} 
                        max={100} 
                        step={5} 
                        onValueChange={(value) => setAffordablePercentage(value[0])}
                        className="mb-1"
                      />
                      <div className="flex justify-between text-xs text-[#6C757D]">
                        <span>Market Rate</span>
                        <span>50% Affordable</span>
                        <span>100% Affordable</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">AMI Target Average</label>
                        <span className="text-sm font-bold">{amiTargetAverage}% AMI</span>
                      </div>
                      <Slider 
                        value={[amiTargetAverage]} 
                        min={30} 
                        max={100} 
                        step={5} 
                        onValueChange={(value) => setAmiTargetAverage(value[0])}
                        className="mb-1"
                      />
                      <div className="flex justify-between text-xs text-[#6C757D]">
                        <span>Deep Affordability</span>
                        <span>Moderate</span>
                        <span>Workforce</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Unit Size Mix</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Studios</label>
                        <span className="text-sm font-bold">{studioPercentage}%</span>
                      </div>
                      <Slider 
                        value={[studioPercentage]} 
                        min={0} 
                        max={50} 
                        step={5} 
                        onValueChange={(value) => {
                          setStudioPercentage(value[0]);
                          setTimeout(normalizeUnitPercentages, 100);
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">1-Bedroom Units</label>
                        <span className="text-sm font-bold">{oneBrPercentage}%</span>
                      </div>
                      <Slider 
                        value={[oneBrPercentage]} 
                        min={0} 
                        max={60} 
                        step={5} 
                        onValueChange={(value) => {
                          setOneBrPercentage(value[0]);
                          setTimeout(normalizeUnitPercentages, 100);
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">2-Bedroom Units</label>
                        <span className="text-sm font-bold">{twoBrPercentage}%</span>
                      </div>
                      <Slider 
                        value={[twoBrPercentage]} 
                        min={0} 
                        max={50} 
                        step={5} 
                        onValueChange={(value) => {
                          setTwoBrPercentage(value[0]);
                          setTimeout(normalizeUnitPercentages, 100);
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">3-Bedroom Units</label>
                        <span className="text-sm font-bold">{threeBrPercentage}%</span>
                      </div>
                      <Slider 
                        value={[threeBrPercentage]} 
                        min={0} 
                        max={30} 
                        step={5} 
                        onValueChange={(value) => {
                          setThreeBrPercentage(value[0]);
                          setTimeout(normalizeUnitPercentages, 100);
                        }}
                      />
                    </div>
                    
                    <div className="pt-2 border-t border-[#E9ECEF]">
                      <div className="flex items-center justify-between text-xs text-[#6C757D]">
                        <span>Unit Mix Total:</span>
                        <span className={`font-bold ${studioPercentage + oneBrPercentage + twoBrPercentage + threeBrPercentage === 100 ? 'text-[#198754]' : 'text-[#DC3545]'}`}>
                          {studioPercentage + oneBrPercentage + twoBrPercentage + threeBrPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Middle Column: Results */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Financial Feasibility</h3>
                  
                  <div className="flex justify-center mb-6">
                    <CircularProgress 
                      percentage={financialFeasibility} 
                      size={150}
                      color={
                        financialFeasibility >= 80 ? "#198754" :
                        financialFeasibility >= 60 ? "#FFC107" : "#DC3545"
                      }
                    />
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-sm text-[#6C757D]">Feasibility Score</div>
                    <div className={`text-xl font-bold ${
                      financialFeasibility >= 80 ? "text-[#198754]" :
                      financialFeasibility >= 60 ? "text-[#FFC107]" : "text-[#DC3545]"
                    }`}>
                      {financialFeasibility}%
                    </div>
                  </div>
                  
                  <div className="bg-[#F8F9FA] p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Financing Gap</h4>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs text-[#6C757D]">Subsidy Needed</span>
                        <div className="text-xl font-bold">
                          ${(subsidyNeeded / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-[#6C757D]">Per Affordable Unit</span>
                        <div className="text-md font-bold">
                          ${Math.round(subsidyNeeded / affordableUnits).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {isInSweetSpot && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#198754] bg-opacity-10 border border-[#198754] p-4 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className="bg-[#198754] rounded-full h-10 w-10 flex items-center justify-center text-white shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-heading font-bold text-[#198754]">Sweet Spot Found!</h3>
                      <p className="text-sm mt-1">
                        This configuration optimally balances financial feasibility with strong community impact.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Community Impact</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <label className="text-sm">Impact Score</label>
                      <span className={`text-sm font-bold ${
                        communityImpact >= 80 ? "text-[#198754]" :
                        communityImpact >= 60 ? "text-[#FFC107]" : "text-[#6C757D]"
                      }`}>
                        {communityImpact}/100
                      </span>
                    </div>
                    <Progress 
                      value={communityImpact} 
                      className="h-3" 
                      indicatorClassName={`${
                        communityImpact >= 80 ? "bg-[#198754]" :
                        communityImpact >= 60 ? "bg-[#FFC107]" : "bg-[#6C757D]"
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs">Affordability Depth</label>
                        <span className="text-xs font-bold">
                          {amiTargetAverage <= 50 ? "Excellent" :
                           amiTargetAverage <= 70 ? "Good" : "Moderate"}
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, 100 - (amiTargetAverage - 30))} 
                        className="h-2" 
                        indicatorClassName={`${
                          amiTargetAverage <= 50 ? "bg-[#198754]" :
                          amiTargetAverage <= 70 ? "bg-[#FFC107]" : "bg-[#6C757D]"
                        }`}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs">Family-Friendly</label>
                        <span className="text-xs font-bold">
                          {twoBrPercentage + threeBrPercentage >= 45 ? "Excellent" :
                           twoBrPercentage + threeBrPercentage >= 30 ? "Good" : "Moderate"}
                        </span>
                      </div>
                      <Progress 
                        value={(twoBrPercentage + threeBrPercentage) * 2} 
                        className="h-2" 
                        indicatorClassName={`${
                          twoBrPercentage + threeBrPercentage >= 45 ? "bg-[#198754]" :
                          twoBrPercentage + threeBrPercentage >= 30 ? "bg-[#FFC107]" : "bg-[#6C757D]"
                        }`}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-xs">Affordable Quantity</label>
                        <span className="text-xs font-bold">
                          {affordablePercentage >= 40 ? "Excellent" :
                           affordablePercentage >= 25 ? "Good" : "Moderate"}
                        </span>
                      </div>
                      <Progress 
                        value={affordablePercentage * 1.5} 
                        className="h-2" 
                        indicatorClassName={`${
                          affordablePercentage >= 40 ? "bg-[#198754]" :
                          affordablePercentage >= 25 ? "bg-[#FFC107]" : "bg-[#6C757D]"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column: Breakdown */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Affordability Breakdown</h3>
                  
                  <div className="flex mb-4">
                    <div className="flex-1 text-center p-3 bg-[#F8F9FA] rounded-l-md">
                      <div className="text-sm text-[#6C757D]">Market Rate</div>
                      <div className="text-xl font-bold">{100 - affordablePercentage}%</div>
                      <div className="text-sm">{totalUnits - affordableUnits} units</div>
                    </div>
                    <div className="flex-1 text-center p-3 bg-[#6610f2] bg-opacity-10 rounded-r-md">
                      <div className="text-sm text-[#6610f2]">Affordable</div>
                      <div className="text-xl font-bold text-[#6610f2]">{affordablePercentage}%</div>
                      <div className="text-sm">{affordableUnits} units</div>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium mb-3">AMI Level Distribution</h4>
                  <div className="space-y-3">
                    {amiLevels.map((level, index) => {
                      const unitCount = Math.round(affordableUnits * (level.percentage / 100));
                      return (
                        <div key={index}>
                          <div className="flex justify-between mb-1 text-xs">
                            <span>{level.level}</span>
                            <span>{unitCount} units ({level.percentage}%)</span>
                          </div>
                          <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${level.percentage}%` }}
                              transition={{ duration: 0.5 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: level.color }}
                            ></motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Financial Incentives</h3>
                  
                  <div className="space-y-2">
                    <div className={`p-3 rounded-md ${
                      affordablePercentage >= 25 ? "bg-[#6610f2] bg-opacity-10 border border-[#6610f2]" : "bg-[#F8F9FA]"
                    }`}>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">421-a Tax Abatement</h4>
                        <span className={`text-xs ${affordablePercentage >= 25 ? "text-[#6610f2] font-bold" : "text-[#6C757D]"}`}>
                          {affordablePercentage >= 25 ? "Eligible" : "Not Eligible"}
                        </span>
                      </div>
                      {affordablePercentage >= 25 && (
                        <p className="text-xs mt-1">35-year tax exemption with 25%+ affordable units</p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${
                      affordablePercentage >= 30 && amiTargetAverage <= 80 ? "bg-[#6610f2] bg-opacity-10 border border-[#6610f2]" : "bg-[#F8F9FA]"
                    }`}>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">LIHTC 4%</h4>
                        <span className={`text-xs ${affordablePercentage >= 30 && amiTargetAverage <= 80 ? "text-[#6610f2] font-bold" : "text-[#6C757D]"}`}>
                          {affordablePercentage >= 30 && amiTargetAverage <= 80 ? "Eligible" : "Not Eligible"}
                        </span>
                      </div>
                      {affordablePercentage >= 30 && amiTargetAverage <= 80 && (
                        <p className="text-xs mt-1">Tax credits worth ~30% of affordable construction costs</p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${
                      affordablePercentage >= 50 && amiTargetAverage <= 60 ? "bg-[#6610f2] bg-opacity-10 border border-[#6610f2]" : "bg-[#F8F9FA]"
                    }`}>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">LIHTC 9%</h4>
                        <span className={`text-xs ${affordablePercentage >= 50 && amiTargetAverage <= 60 ? "text-[#6610f2] font-bold" : "text-[#6C757D]"}`}>
                          {affordablePercentage >= 50 && amiTargetAverage <= 60 ? "Eligible" : "Not Eligible"}
                        </span>
                      </div>
                      {affordablePercentage >= 50 && amiTargetAverage <= 60 && (
                        <p className="text-xs mt-1">Tax credits worth ~70% of affordable construction costs</p>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-md ${
                      affordablePercentage >= 20 ? "bg-[#6610f2] bg-opacity-10 border border-[#6610f2]" : "bg-[#F8F9FA]"
                    }`}>
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">MIH FAR Bonus</h4>
                        <span className={`text-xs ${affordablePercentage >= 20 ? "text-[#6610f2] font-bold" : "text-[#6C757D]"}`}>
                          {affordablePercentage >= 20 ? `+${Math.min(33, Math.floor(affordablePercentage * 0.8))}% FAR` : "Not Eligible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button className="bg-[#6610f2] hover:bg-[#6610f2]/90 w-full md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}