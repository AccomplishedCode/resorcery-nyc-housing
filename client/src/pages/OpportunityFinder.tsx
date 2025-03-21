import { useState } from "react";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { AIAssistant } from "@/components/AIAssistant";
import { sites, aiAssistantData } from "@/lib/data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OpportunityFinder() {
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(1); // Default to first site
  
  const selectedSite = selectedSiteId 
    ? sites.find(site => site.id === selectedSiteId) 
    : null;

  const handleSiteSelect = (siteId: number) => {
    setSelectedSiteId(siteId);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Map 
              sites={sites} 
              onSiteSelect={handleSiteSelect} 
              selectedSiteId={selectedSiteId} 
            />
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              {sites.slice(0, 3).map(site => (
                <motion.div 
                  key={site.id}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "bg-[#F8F9FA] rounded-md p-3 cursor-pointer hover:bg-[#E9ECEF]",
                    selectedSiteId === site.id && "bg-[#0A5796] bg-opacity-10 border border-[#0A5796]"
                  )}
                  onClick={() => handleSiteSelect(site.id)}
                >
                  <div className="flex justify-between">
                    <h4 className="font-heading font-semibold text-sm">{site.name}</h4>
                    <span className="text-xs font-mono px-2 py-1 bg-[#28A745] text-white rounded-full">
                      {site.potentialUnits} units
                    </span>
                  </div>
                  <p className="text-xs mt-1">
                    Current FAR: {site.currentFAR} / Allowed: {site.allowedFAR}
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>Block: {site.blockNumber}</span>
                    <span>Lot: {site.lotNumber}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <AIAssistant
              siteName={aiAssistantData.siteName}
              siteAnalysis={aiAssistantData.siteAnalysis}
              developmentOptions={aiAssistantData.developmentOptions}
              recommendation={aiAssistantData.recommendation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
