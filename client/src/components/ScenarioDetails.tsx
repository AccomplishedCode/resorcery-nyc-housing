import { UnitType, AffordabilityLevel, CommunityBenefit } from "@/lib/data";
import { motion } from "framer-motion";

interface BuildingDetail {
  label: string;
  value: string | number;
}

interface ScenarioDetailsProps {
  name: string;
  unitCount: number;
  buildingHeight: number;
  stories: number;
  squareFootage: number;
  far: number;
  allowedFar: number;
  constructionTimeline: number;
  estimatedCost: number;
  unitTypes: UnitType[];
  affordabilityLevels: AffordabilityLevel[];
  communityBenefits: CommunityBenefit[];
}

export function ScenarioDetails({
  name,
  unitCount,
  buildingHeight,
  stories,
  squareFootage,
  far,
  allowedFar,
  constructionTimeline,
  estimatedCost,
  unitTypes,
  affordabilityLevels,
  communityBenefits
}: ScenarioDetailsProps) {
  const buildingDetails: BuildingDetail[] = [
    { label: "Total Units", value: unitCount },
    { label: "Building Height", value: `${buildingHeight} feet (${stories} stories)` },
    { label: "Total Square Footage", value: `${squareFootage.toLocaleString()} sq ft` },
    { label: "Floor Area Ratio (FAR)", value: `${far} of ${allowedFar} allowed` },
    { label: "Construction Timeline", value: `${constructionTimeline} months` },
    { label: "Estimated Cost", value: `$${estimatedCost}M` }
  ];

  // Calculate total percentage for unit types to ensure it adds up to 100%
  const totalUnitTypePercentage = unitTypes.reduce((sum, type) => sum + type.percentage, 0);
  const unitTypePercentage = (percentage: number) => (percentage / totalUnitTypePercentage) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column: Building Details */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4">Building Details</h3>
        <div className="space-y-4">
          {buildingDetails.map((detail, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between p-3 bg-[#F8F9FA] rounded-md"
            >
              <span className="text-sm font-medium">{detail.label}</span>
              <span className="text-sm font-bold">{detail.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Middle Column: Unit Mix & Affordability */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4">Unit Mix & Affordability</h3>
        
        {/* Unit Type Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Unit Type Distribution</h4>
          <div className="h-8 w-full rounded-md overflow-hidden flex">
            {unitTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: `${unitTypePercentage(type.percentage)}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full"
                style={{ backgroundColor: type.color }}
              ></motion.div>
            ))}
          </div>
          <div className="flex text-xs mt-2 justify-between">
            {unitTypes.map((type, index) => (
              <div key={index} className="flex items-center">
                <span 
                  className="block w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: type.color }}
                ></span>
                <span>{type.name} ({type.count} units)</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Affordability Chart */}
        <div>
          <h4 className="text-sm font-medium mb-2">Affordability Levels</h4>
          <div className="space-y-3">
            {affordabilityLevels.map((level, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{level.name}</span>
                  <span>{level.unitCount} units</span>
                </div>
                <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: level.color }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-[#0A5796] bg-opacity-10 rounded-md">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0A5796] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-2">
              <p className="text-sm font-medium text-[#0A5796]">MIH Program</p>
              <p className="text-xs mt-1">This scenario implements MIH Option 1: 25% of residential floor area must be for affordable housing units for residents with incomes averaging 60% AMI.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column: Community Benefits */}
      <div>
        <h3 className="font-heading font-bold text-lg mb-4">Key Metrics & Community Benefits</h3>
        
        {/* Energy Efficiency Rating */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Energy Efficiency Rating</h4>
          <div className="flex items-center">
            <div className="w-full bg-[#E9ECEF] rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 0.8 }}
                className="bg-[#28A745] h-3 rounded-full"
              ></motion.div>
            </div>
            <span className="ml-2 text-sm font-mono">65/100</span>
          </div>
          <p className="text-xs text-[#6C757D] mt-1">Standard construction with energy efficient appliances</p>
        </div>
        
        {/* Community Benefits */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Community Benefits</h4>
          {communityBenefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="flex items-center p-2 bg-[#F8F9FA] rounded-md"
            >
              {benefit.available ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#28A745] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{benefit.name}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#6C757D] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-[#6C757D]">{benefit.name}</span>
                </>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6">
          <button className="w-full bg-[#0A5796] text-white py-2 rounded-md hover:bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Compare All Scenarios
          </button>
        </div>
      </div>
    </div>
  );
}
