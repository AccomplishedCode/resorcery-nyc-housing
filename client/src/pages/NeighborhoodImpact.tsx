import { useState } from "react";
import { Header } from "@/components/Header";
import { BeforeAfterBar, BeforeAfterVisualization, GridMetric } from "@/components/ImpactMetric";
import { CircularProgress } from "@/components/CircularProgress";
import { transitImpacts, schoolCapacities, economicImpact, neighborhoodInsights } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ViewMode = "before-after" | "projection";

export default function NeighborhoodImpact() {
  const [viewMode, setViewMode] = useState<ViewMode>("before-after");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl">Neighborhood Impact Dashboard</h2>
              <p className="text-[#6C757D]">East Village | Development Scenario: Maximum Density Residential</p>
            </div>
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Button
                onClick={() => setViewMode("before-after")}
                className={cn(
                  "rounded-l-lg rounded-r-none",
                  viewMode === "before-after" 
                    ? "bg-[#0A5796]" 
                    : "bg-[#E9ECEF] text-black hover:bg-[#DEE2E6]"
                )}
              >
                Before/After
              </Button>
              <Button
                onClick={() => setViewMode("projection")}
                className={cn(
                  "rounded-r-lg rounded-l-none",
                  viewMode === "projection" 
                    ? "bg-[#0A5796]" 
                    : "bg-[#E9ECEF] text-black hover:bg-[#DEE2E6]"
                )}
              >
                5-Year Projection
              </Button>
            </div>
          </div>
          
          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Population Density */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#F8F9FA] p-4 rounded-lg"
            >
              <h3 className="font-heading font-semibold text-lg mb-3">Population Density</h3>
              <div className="grid grid-cols-2 gap-4">
                <BeforeAfterVisualization
                  title="Before Development"
                  beforeValue="212 ppl/acre"
                  afterValue=""
                  beforeColor="#FFC107"
                  afterColor="#FF6B00"
                />
                <BeforeAfterVisualization
                  title="After Development"
                  beforeValue="247 ppl/acre"
                  afterValue=""
                  beforeColor="#FF6B00"
                  afterColor="#DC3545"
                />
              </div>
              <div className="mt-3 pt-3 border-t border-[#DEE2E6]">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Projected Increase:</span>
                  <span className="text-sm font-bold">+35 people/acre (+16.5%)</span>
                </div>
              </div>
            </motion.div>
            
            {/* Transit Utilization */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#F8F9FA] p-4 rounded-lg"
            >
              <h3 className="font-heading font-semibold text-lg mb-3">Transit Utilization</h3>
              <div className="space-y-4">
                {transitImpacts.map((impact, index) => (
                  <BeforeAfterBar
                    key={index}
                    title={impact.name}
                    before={{ value: impact.beforeCapacity }}
                    after={{ value: impact.afterCapacity }}
                    colors={{
                      before: impact.beforeCapacity > 90 ? "#DC3545" : 
                             impact.beforeCapacity > 80 ? "#FFC107" : "#28A745",
                      after: impact.afterCapacity > 90 ? "#DC3545" : 
                            impact.afterCapacity > 80 ? "#FF6B00" : "#FFC107"
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#DEE2E6]">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0A5796] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="ml-2 text-xs">Additional transit demand can be accommodated within current service levels.</p>
                </div>
              </div>
            </motion.div>
            
            {/* School Capacity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#F8F9FA] p-4 rounded-lg"
            >
              <h3 className="font-heading font-semibold text-lg mb-3">School Capacity Impact</h3>
              <div className="grid grid-cols-3 gap-3">
                {schoolCapacities.map((school, index) => (
                  <div key={index}>
                    <h4 className="text-xs font-medium mb-2 text-center">{school.type} ({school.name})</h4>
                    <div className="flex justify-center">
                      <CircularProgress
                        percentage={school.beforeCapacity}
                        size={100}
                        color={
                          school.beforeCapacity > 95 ? "#DC3545" :
                          school.beforeCapacity > 90 ? "#FF6B00" :
                          school.beforeCapacity > 80 ? "#FFC107" : "#28A745"
                        }
                        label={`${school.afterCapacity}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#DEE2E6]">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFC107] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="ml-2 text-xs">Middle and high schools in district are approaching capacity. Consider including educational facilities in future developments.</p>
                </div>
              </div>
            </motion.div>
            
            {/* Economic Impact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#F8F9FA] p-4 rounded-lg"
            >
              <h3 className="font-heading font-semibold text-lg mb-3">Economic Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Job Creation</h4>
                  <div className="bg-white rounded-md p-3 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="text-2xl font-bold font-heading text-[#0A5796]">
                        {economicImpact.constructionJobs}
                      </div>
                      <div className="ml-2 text-xs text-left">
                        <div>Construction</div>
                        <div>Jobs</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-2xl font-bold font-heading text-[#28A745]">
                        {economicImpact.permanentJobs}
                      </div>
                      <div className="ml-2 text-xs text-left">
                        <div>Permanent</div>
                        <div>Positions</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tax Revenue</h4>
                  <div className="bg-white rounded-md p-3">
                    <div className="mb-2">
                      <div className="flex justify-between text-xs">
                        <span>Before (Annual)</span>
                        <span className="font-mono">${economicImpact.beforeTaxRevenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-[#E9ECEF] rounded-full mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "30%" }}
                          transition={{ duration: 0.5 }}
                          className="h-2 bg-[#6C757D] rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>After (Annual)</span>
                        <span className="font-mono">${economicImpact.afterTaxRevenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-[#E9ECEF] rounded-full mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="h-2 bg-[#0A5796] rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                    <div className="text-xs text-right mt-2 font-semibold text-[#28A745]">
                      +${(economicImpact.afterTaxRevenue - economicImpact.beforeTaxRevenue).toLocaleString()} 
                      (+{Math.round(((economicImpact.afterTaxRevenue / economicImpact.beforeTaxRevenue) - 1) * 100)}%)
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Local Business Impact (0.5 mile radius)</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {economicImpact.localBusinessImpacts.map((impact, index) => (
                    <GridMetric 
                      key={index}
                      value={impact.percentage}
                      label={impact.name}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* AI Generated Insights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#0A5796] bg-opacity-5 p-5 rounded-lg border border-[#0A5796] border-opacity-20"
          >
            <div className="flex items-start">
              <div className="bg-[#0A5796] rounded-full h-10 w-10 flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="font-heading font-bold text-lg text-[#0A5796] mb-2">AI-Generated Neighborhood Insights</h3>
                <div className="space-y-3 text-sm">
                  {neighborhoodInsights.map((insight, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      <span className="font-semibold">{insight.title}:</span> {insight.content}
                    </motion.p>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Button className="bg-[#0A5796] hover:bg-[#0A5796]/90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Full Analysis
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
