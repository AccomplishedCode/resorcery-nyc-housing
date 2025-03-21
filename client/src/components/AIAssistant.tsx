import { motion } from "framer-motion";

interface AIAssistantProps {
  siteName: string;
  siteAnalysis: string[];
  developmentOptions: {
    option1: {
      name: string;
      units: number;
    };
    option2: {
      name: string;
      units: number;
    };
    timeline: string;
    cost: string;
  };
  recommendation: string;
}

export function AIAssistant({ 
  siteName, 
  siteAnalysis, 
  developmentOptions, 
  recommendation 
}: AIAssistantProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <div className="flex items-center mb-4">
        <div className="bg-[#0A5796] rounded-full h-10 w-10 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="font-heading font-bold text-lg">AI Assistant</h3>
          <p className="text-xs text-[#6C757D]">Site Analysis & Recommendations</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3 bg-[#F8F9FA] rounded-md"
        >
          <div className="flex items-start mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0A5796] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="ml-2 text-sm font-medium">
              Currently analyzing: <span className="font-semibold text-[#0A5796]">{siteName}</span>
            </p>
          </div>
          <div className="ml-6">
            <p className="text-sm mb-2">This site presents exceptional development potential:</p>
            <ul className="text-sm space-y-1 list-disc pl-4">
              {siteAnalysis.map((point, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-3 bg-[#F8F9FA] rounded-md"
        >
          <div className="flex items-start mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#28A745] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p className="ml-2 text-sm font-medium">Development potential analysis:</p>
          </div>
          <div className="ml-6">
            <div className="flex justify-between mb-1 text-xs">
              <span>{developmentOptions.option1.name}</span>
              <span>{developmentOptions.option1.units} affordable units</span>
            </div>
            <div className="w-full bg-[#E9ECEF] rounded-full h-2 mb-3">
              <div className="bg-[#28A745] h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
            
            <div className="flex justify-between mb-1 text-xs">
              <span>{developmentOptions.option2.name}</span>
              <span>{developmentOptions.option2.units} affordable units</span>
            </div>
            <div className="w-full bg-[#E9ECEF] rounded-full h-2 mb-3">
              <div className="bg-[#28A745] h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
            
            <div className="flex justify-between mb-1 text-xs">
              <span>Estimated Construction Timeline</span>
              <span>{developmentOptions.timeline}</span>
            </div>
            <div className="flex justify-between mt-3 mb-1 text-xs">
              <span>Estimated Development Cost</span>
              <span>{developmentOptions.cost}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-3 bg-[#0A5796] bg-opacity-10 rounded-md border border-[#0A5796] border-opacity-30"
        >
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0A5796] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div className="ml-2">
              <p className="text-sm font-medium text-[#0A5796]">Recommendation:</p>
              <p className="text-sm mt-1">{recommendation}</p>
            </div>
          </div>
        </motion.div>
        
        <div className="bg-[#F8F9FA] p-3 rounded-md">
          <button className="text-sm bg-[#0A5796] text-white px-3 py-1 rounded-md hover:bg-opacity-90 w-full">
            Generate Development Brief
          </button>
        </div>
      </div>
    </div>
  );
}
