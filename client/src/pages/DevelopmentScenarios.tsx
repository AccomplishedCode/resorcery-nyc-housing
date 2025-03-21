import { useState } from "react";
import { Header } from "@/components/Header";
import { ScenarioCard } from "@/components/ScenarioCard";
import { ScenarioDetails } from "@/components/ScenarioDetails";
import { scenarios, sites, unitTypeDistribution, affordabilityLevels, communityBenefits } from "@/lib/data";
import { motion } from "framer-motion";

export default function DevelopmentScenarios() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(1);
  const selectedSite = sites[0]; // East Village site
  
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl">Development Scenario Comparison</h2>
              <p className="text-[#6C757D]">
                {selectedSite.name} | Block: {selectedSite.blockNumber}, Lot: {selectedSite.lotNumber}
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-3 py-2 text-sm border border-[#DEE2E6] rounded-md hover:bg-[#F8F9FA]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button className="px-3 py-2 text-sm bg-[#0A5796] text-white rounded-md hover:opacity-90">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Generate Report
              </button>
            </div>
          </div>
          
          {/* Scenario Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            {scenarios.map(scenario => (
              <ScenarioCard 
                key={scenario.id}
                id={scenario.id}
                name={scenario.name}
                description={scenario.description}
                unitCount={scenario.unitCount}
                affordablePercentage={scenario.affordablePercentage}
                imageUrl={scenario.imageUrl}
                isActive={selectedScenarioId === scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
              />
            ))}
          </motion.div>
          
          {/* Scenario Details */}
          <motion.div
            key={selectedScenarioId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ScenarioDetails 
              name={selectedScenario.name}
              unitCount={selectedScenario.unitCount}
              buildingHeight={selectedScenario.buildingHeight}
              stories={selectedScenario.stories}
              squareFootage={selectedScenario.squareFootage}
              far={selectedScenario.far}
              allowedFar={selectedSite.allowedFAR}
              constructionTimeline={selectedScenario.constructionTimeline}
              estimatedCost={selectedScenario.estimatedCost}
              unitTypes={unitTypeDistribution}
              affordabilityLevels={affordabilityLevels}
              communityBenefits={communityBenefits}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
