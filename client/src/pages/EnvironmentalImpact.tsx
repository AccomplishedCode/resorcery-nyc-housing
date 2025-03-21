import { useState } from "react";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/CircularProgress";

export default function EnvironmentalImpact() {
  const [selectedBuildingType, setSelectedBuildingType] = useState("standard");
  const [timeOfDay, setTimeOfDay] = useState(12); // 12pm default
  const [orientation, setOrientation] = useState(180); // South facing

  // Energy metrics data
  const energyData = {
    standard: {
      energyUseIntensity: 85,
      carbonFootprint: 68,
      renewableEnergy: 15,
      waterUsage: 75
    },
    passive: {
      energyUseIntensity: 45,
      carbonFootprint: 32,
      renewableEnergy: 30,
      waterUsage: 52
    },
    netzero: {
      energyUseIntensity: 20,
      carbonFootprint: 10,
      renewableEnergy: 90,
      waterUsage: 30
    }
  };
  
  // Get current metrics based on selection
  const currentMetrics = energyData[selectedBuildingType as keyof typeof energyData];
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl">Environmental Impact Simulator</h2>
              <p className="text-[#6C757D]">
                Compare sustainability metrics between different construction approaches
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button
                  onClick={() => setSelectedBuildingType("standard")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    selectedBuildingType === "standard" 
                      ? "bg-[#198754] text-white" 
                      : "bg-[#E9ECEF] text-black hover:bg-[#DEE2E6]"
                  }`}
                >
                  Standard Construction
                </Button>
                <Button
                  onClick={() => setSelectedBuildingType("passive")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedBuildingType === "passive" 
                      ? "bg-[#198754] text-white" 
                      : "bg-[#E9ECEF] text-black hover:bg-[#DEE2E6]"
                  }`}
                >
                  Passive House
                </Button>
                <Button
                  onClick={() => setSelectedBuildingType("netzero")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    selectedBuildingType === "netzero" 
                      ? "bg-[#198754] text-white" 
                      : "bg-[#E9ECEF] text-black hover:bg-[#DEE2E6]"
                  }`}
                >
                  Net Zero
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="energy" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="energy">Energy Consumption</TabsTrigger>
              <TabsTrigger value="carbon">Carbon Footprint</TabsTrigger>
              <TabsTrigger value="solar">Solar Gain</TabsTrigger>
              <TabsTrigger value="water">Stormwater Management</TabsTrigger>
            </TabsList>
            
            {/* Energy Consumption Tab */}
            <TabsContent value="energy" className="space-y-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Energy Use Intensity</h3>
                    <div className="flex justify-center mb-4">
                      <CircularProgress 
                        percentage={currentMetrics.energyUseIntensity} 
                        size={150}
                        color={
                          currentMetrics.energyUseIntensity > 70 ? "#DC3545" :
                          currentMetrics.energyUseIntensity > 40 ? "#FFC107" : "#198754"
                        }
                      />
                    </div>
                    <p className="text-center text-sm text-[#6C757D] mb-2">
                      {currentMetrics.energyUseIntensity} kBtu/ft²/year
                    </p>
                    <div className="bg-[#F8F9FA] p-3 rounded-md">
                      <p className="text-xs">
                        {selectedBuildingType === "standard" && "Standard construction uses conventional HVAC systems and building envelope, resulting in typical energy consumption for multi-family buildings."}
                        {selectedBuildingType === "passive" && "Passive House design incorporates superior insulation, airtight construction, and heat recovery ventilation to minimize energy use."}
                        {selectedBuildingType === "netzero" && "Net Zero buildings combine energy efficiency with renewable energy production to achieve a net zero energy balance over the course of a year."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Energy Sources Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Electricity (Grid)</span>
                          <span>{100 - currentMetrics.renewableEnergy}%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${100 - currentMetrics.renewableEnergy}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#6C757D] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Renewable Energy</span>
                          <span>{currentMetrics.renewableEnergy}%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${currentMetrics.renewableEnergy}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#198754] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Natural Gas</span>
                          <span>
                            {selectedBuildingType === "standard" ? "35%" : 
                             selectedBuildingType === "passive" ? "20%" : "0%"}
                          </span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 
                              selectedBuildingType === "standard" ? "35%" : 
                              selectedBuildingType === "passive" ? "20%" : "0%"
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#FF6B00] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-[#198754] bg-opacity-10 p-3 rounded-md">
                      <p className="text-xs text-[#198754]">
                        <strong>Potential Cost Savings:</strong> {" "}
                        {selectedBuildingType === "standard" ? "$0/year (baseline)" : 
                         selectedBuildingType === "passive" ? "$42,500/year" : "$78,900/year"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Heating & Cooling Load</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-[#DC3545] mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-medium">Heating Load</h4>
                        <p className="text-2xl font-bold mt-1">
                          {selectedBuildingType === "standard" ? "45" : 
                           selectedBuildingType === "passive" ? "18" : "8"} 
                          <span className="text-sm font-normal"> kBtu/ft²</span>
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-[#0dcaf0] mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-medium">Cooling Load</h4>
                        <p className="text-2xl font-bold mt-1">
                          {selectedBuildingType === "standard" ? "38" : 
                           selectedBuildingType === "passive" ? "15" : "7"} 
                          <span className="text-sm font-normal"> kBtu/ft²</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Envelope Performance</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span>Wall R-Value</span>
                            <span className="font-mono">
                              {selectedBuildingType === "standard" ? "R-21" : 
                               selectedBuildingType === "passive" ? "R-40" : "R-60"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span>Window U-Factor</span>
                            <span className="font-mono">
                              {selectedBuildingType === "standard" ? "0.32" : 
                               selectedBuildingType === "passive" ? "0.14" : "0.10"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs">
                            <span>Air Changes/Hour</span>
                            <span className="font-mono">
                              {selectedBuildingType === "standard" ? "3.0" : 
                               selectedBuildingType === "passive" ? "0.6" : "0.3"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <div className="bg-[#F8F9FA] p-4 rounded-lg">
                <h3 className="font-heading font-semibold text-lg mb-4">Building Materials Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Insulation Type</h4>
                    <div className="space-y-2">
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "standard" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Fiberglass Batts</span>
                          <span className="text-xs bg-[#6C757D] text-white px-2 py-1 rounded-full">Standard</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "passive" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Mineral Wool</span>
                          <span className="text-xs bg-[#198754] text-white px-2 py-1 rounded-full">Passive</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "netzero" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Cellulose/Hemp</span>
                          <span className="text-xs bg-[#0A5796] text-white px-2 py-1 rounded-full">Net Zero</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Window Systems</h4>
                    <div className="space-y-2">
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "standard" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Double Glazed</span>
                          <span className="text-xs bg-[#6C757D] text-white px-2 py-1 rounded-full">Standard</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "passive" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Triple Glazed</span>
                          <span className="text-xs bg-[#198754] text-white px-2 py-1 rounded-full">Passive</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "netzero" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Quad Glazed + Dynamic</span>
                          <span className="text-xs bg-[#0A5796] text-white px-2 py-1 rounded-full">Net Zero</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">HVAC Systems</h4>
                    <div className="space-y-2">
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "standard" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Gas Boiler + Split AC</span>
                          <span className="text-xs bg-[#6C757D] text-white px-2 py-1 rounded-full">Standard</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "passive" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Heat Pumps + ERV</span>
                          <span className="text-xs bg-[#198754] text-white px-2 py-1 rounded-full">Passive</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-md border ${selectedBuildingType === "netzero" ? "border-[#198754] bg-[#198754] bg-opacity-10" : "border-[#E9ECEF]"}`}>
                        <div className="flex justify-between">
                          <span className="text-sm">Geothermal + Solar</span>
                          <span className="text-xs bg-[#0A5796] text-white px-2 py-1 rounded-full">Net Zero</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Carbon Footprint Tab */}
            <TabsContent value="carbon">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Carbon Emissions Breakdown</h3>
                    
                    <div className="flex justify-center mb-6">
                      <CircularProgress 
                        percentage={currentMetrics.carbonFootprint} 
                        size={150}
                        color={
                          currentMetrics.carbonFootprint > 60 ? "#DC3545" :
                          currentMetrics.carbonFootprint > 30 ? "#FFC107" : "#198754"
                        }
                      />
                    </div>
                    
                    <p className="text-center text-sm mb-6">
                      <span className="font-bold text-xl">
                        {currentMetrics.carbonFootprint}
                      </span>
                      <span className="text-[#6C757D]"> kg CO₂e/ft²/year</span>
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Operational Carbon</span>
                          <span>{selectedBuildingType === "standard" ? 70 : 
                                 selectedBuildingType === "passive" ? 50 : 30}%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedBuildingType === "standard" ? 70 : 
                                                 selectedBuildingType === "passive" ? 50 : 30}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#FFC107] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Embodied Carbon</span>
                          <span>{selectedBuildingType === "standard" ? 30 : 
                                 selectedBuildingType === "passive" ? 50 : 70}%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedBuildingType === "standard" ? 30 : 
                                                 selectedBuildingType === "passive" ? 50 : 70}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#6C757D] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Lifetime Carbon Analysis</h3>
                    
                    <div className="bg-[#F8F9FA] p-4 rounded-md mb-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <h4 className="text-xs font-medium text-[#6C757D]">Year 1</h4>
                          <p className="font-bold text-xl mt-1">
                            {selectedBuildingType === "standard" ? "534" : 
                             selectedBuildingType === "passive" ? "758" : "960"} 
                            <span className="text-xs font-normal block">tons CO₂e</span>
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-[#6C757D]">Year 15</h4>
                          <p className="font-bold text-xl mt-1">
                            {selectedBuildingType === "standard" ? "1,620" : 
                             selectedBuildingType === "passive" ? "1,238" : "1,080"} 
                            <span className="text-xs font-normal block">tons CO₂e</span>
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-[#6C757D]">Year 30</h4>
                          <p className="font-bold text-xl mt-1">
                            {selectedBuildingType === "standard" ? "2,842" : 
                             selectedBuildingType === "passive" ? "1,756" : "1,200"} 
                            <span className="text-xs font-normal block">tons CO₂e</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#198754] bg-opacity-10 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-[#198754] mb-2">Carbon Reduction Strategies</h4>
                      <ul className="text-xs space-y-1 list-disc pl-4">
                        {selectedBuildingType === "standard" && (
                          <>
                            <li>Upgrade to high-efficiency HVAC systems</li>
                            <li>Install smart building controls</li>
                            <li>Purchase renewable energy credits</li>
                          </>
                        )}
                        {selectedBuildingType === "passive" && (
                          <>
                            <li>Enhanced thermal envelope with low-carbon materials</li>
                            <li>Heat recovery ventilation systems</li>
                            <li>On-site renewable energy generation</li>
                          </>
                        )}
                        {selectedBuildingType === "netzero" && (
                          <>
                            <li>Mass timber construction reduces embodied carbon</li>
                            <li>Building integrated photovoltaics</li>
                            <li>Battery storage for renewable energy</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Solar Gain Tab */}
            <TabsContent value="solar">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <Card className="h-full">
                      <CardContent className="pt-6">
                        <h3 className="font-heading font-semibold text-lg mb-4">Solar Study Visualization</h3>
                        
                        <div 
                          className="h-80 bg-[#F8F9FA] rounded-md mb-4 flex items-center justify-center relative overflow-hidden"
                          style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                          }}
                        >
                          {/* Sun position indicator */}
                          <div 
                            className="absolute h-4 w-4 rounded-full bg-yellow-400 shadow-lg"
                            style={{ 
                              top: `${Math.sin((timeOfDay - 6) / 12 * Math.PI) * 60 + 20}%`,
                              left: `${(timeOfDay - 6) / 12 * 80 + 10}%`,
                              boxShadow: "0 0 20px 10px rgba(255,200,0,0.3)"
                            }}
                          ></div>
                          
                          {/* Building shadow */}
                          <div 
                            className="absolute bg-black bg-opacity-50 transition-all duration-500"
                            style={{ 
                              height: "40%",
                              width: "20%",
                              top: "50%",
                              left: "40%",
                              transform: `rotate(${(timeOfDay - 12) * 15}deg) skew(${(timeOfDay - 12) * 5}deg) translateX(${(timeOfDay - 12) * 10}px)`,
                              transformOrigin: "bottom center"
                            }}
                          ></div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Time of Day: {timeOfDay}:00</label>
                            <Slider 
                              value={[timeOfDay]} 
                              min={6} 
                              max={18} 
                              step={1} 
                              onValueChange={(value) => setTimeOfDay(value[0])}
                            />
                            <div className="flex justify-between text-xs text-[#6C757D] mt-1">
                              <span>6 AM</span>
                              <span>Noon</span>
                              <span>6 PM</span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Building Orientation: {orientation}° ({
                              orientation === 0 ? "North" :
                              orientation === 90 ? "East" :
                              orientation === 180 ? "South" :
                              orientation === 270 ? "West" : 
                              orientation > 0 && orientation < 90 ? "Northeast" :
                              orientation > 90 && orientation < 180 ? "Southeast" :
                              orientation > 180 && orientation < 270 ? "Southwest" : "Northwest"
                            })</label>
                            <Slider 
                              value={[orientation]} 
                              min={0} 
                              max={359} 
                              step={15} 
                              onValueChange={(value) => setOrientation(value[0])}
                            />
                            <div className="flex justify-between text-xs text-[#6C757D] mt-1">
                              <span>N (0°)</span>
                              <span>E (90°)</span>
                              <span>S (180°)</span>
                              <span>W (270°)</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-heading font-semibold text-lg mb-4">Solar Analysis</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium">Solar Potential</h4>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-[#E9ECEF] rounded-full h-3">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: orientation === 180 ? "95%" : 
                                                  orientation > 135 && orientation < 225 ? "85%" :
                                                  orientation > 90 && orientation < 270 ? "70%" : "50%" }}
                                transition={{ duration: 0.5 }}
                                className="bg-[#FFC107] h-3 rounded-full"
                              ></motion.div>
                            </div>
                            <span className="ml-2 text-sm">
                              {orientation === 180 ? "95%" : 
                               orientation > 135 && orientation < 225 ? "85%" :
                               orientation > 90 && orientation < 270 ? "70%" : "50%"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="text-sm font-medium mb-2">Estimated Annual Production</h4>
                          <p className="text-2xl font-bold">
                            {orientation === 180 ? "89,500" : 
                             orientation > 135 && orientation < 225 ? "76,800" :
                             orientation > 90 && orientation < 270 ? "65,200" : "45,300"}
                            <span className="text-sm font-normal"> kWh/year</span>
                          </p>
                          
                          <div className="mt-3 text-xs text-[#6C757D]">
                            <p>Based on: {selectedBuildingType === "netzero" ? "720" : "420"} m² of PV panels</p>
                            <p>Efficiency: {selectedBuildingType === "netzero" ? "22%" : "18%"}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="text-sm font-medium mb-2">Window Optimization</h4>
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-[#0A5796] mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </div>
                              <p className="text-xs">South: {orientation === 180 ? "100%" : 
                                                      orientation > 135 && orientation < 225 ? "85%" : "65%"} optimal</p>
                            </div>
                            <div>
                              <div className="text-[#0A5796] mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                              </div>
                              <p className="text-xs">North: {orientation === 0 ? "100%" : 
                                                     orientation < 45 || orientation > 315 ? "85%" : "65%"} optimal</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Stormwater Management Tab */}
            <TabsContent value="water">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Water Usage Metrics</h3>
                    
                    <div className="flex justify-center mb-4">
                      <CircularProgress 
                        percentage={currentMetrics.waterUsage} 
                        size={150}
                        color={
                          currentMetrics.waterUsage > 70 ? "#DC3545" :
                          currentMetrics.waterUsage > 40 ? "#FFC107" : "#198754"
                        }
                      />
                    </div>
                    
                    <p className="text-center text-sm text-[#6C757D] mb-4">
                      {currentMetrics.waterUsage} gallons/occupant/day
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Potable Water</span>
                          <span>{selectedBuildingType === "standard" ? "100%" : 
                                 selectedBuildingType === "passive" ? "85%" : "60%"}</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedBuildingType === "standard" ? 100 : 
                                               selectedBuildingType === "passive" ? 85 : 60}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#0A5796] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Recycled Water</span>
                          <span>{selectedBuildingType === "standard" ? "0%" : 
                                 selectedBuildingType === "passive" ? "15%" : "40%"}</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedBuildingType === "standard" ? 0 : 
                                               selectedBuildingType === "passive" ? 15 : 40}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#198754] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Stormwater Retention</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Pre-Development Runoff</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-3">
                          <div 
                            className="bg-[#0dcaf0] h-3 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Post-Development Runoff</span>
                          <span>
                            {selectedBuildingType === "standard" ? "85%" : 
                             selectedBuildingType === "passive" ? "45%" : "15%"}
                          </span>
                        </div>
                        <div className="w-full bg-[#E9ECEF] rounded-full h-3">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 
                              selectedBuildingType === "standard" ? "85%" : 
                              selectedBuildingType === "passive" ? "45%" : "15%"
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#0dcaf0] h-3 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="bg-[#F8F9FA] p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Retention Strategies</h4>
                        <ul className="text-xs space-y-1 list-disc pl-4">
                          {selectedBuildingType === "standard" && (
                            <>
                              <li>Basic detention basin</li>
                              <li>Limited permeable pavement</li>
                            </>
                          )}
                          {selectedBuildingType === "passive" && (
                            <>
                              <li>Bioswales and rain gardens</li>
                              <li>Permeable pavement (50% of hardscape)</li>
                              <li>Smaller detention basin</li>
                            </>
                          )}
                          {selectedBuildingType === "netzero" && (
                            <>
                              <li>Blue roof system with controlled flow</li>
                              <li>Extensive green roof (85% coverage)</li>
                              <li>Rainwater harvesting cistern</li>
                              <li>Full permeable paving systems</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Annual Water Savings</h4>
                        <p className="text-2xl font-bold text-[#198754]">
                          {selectedBuildingType === "standard" ? "0" : 
                           selectedBuildingType === "passive" ? "325,000" : "785,000"}
                          <span className="text-sm font-normal"> gallons/year</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Green Infrastructure</h3>
                    
                    <div className="space-y-3">
                      <div className={`p-3 rounded-md ${selectedBuildingType === "netzero" ? "bg-[#198754] bg-opacity-10 border border-[#198754]" : "bg-[#F8F9FA]"}`}>
                        <h4 className="text-sm font-medium mb-1">Green Roof</h4>
                        <div className="flex justify-between text-xs">
                          <span>Coverage</span>
                          <span>
                            {selectedBuildingType === "standard" ? "0%" : 
                             selectedBuildingType === "passive" ? "25%" : "85%"}
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 
                              selectedBuildingType === "standard" ? "0%" : 
                              selectedBuildingType === "passive" ? "25%" : "85%"
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#198754] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-md ${selectedBuildingType !== "standard" ? "bg-[#198754] bg-opacity-10 border border-[#198754]" : "bg-[#F8F9FA]"}`}>
                        <h4 className="text-sm font-medium mb-1">Rainwater Harvesting</h4>
                        <div className="flex justify-between text-xs">
                          <span>System Capacity</span>
                          <span>
                            {selectedBuildingType === "standard" ? "0 gallons" : 
                             selectedBuildingType === "passive" ? "5,000 gallons" : "15,000 gallons"}
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 
                              selectedBuildingType === "standard" ? "0%" : 
                              selectedBuildingType === "passive" ? "33%" : "100%"
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#0dcaf0] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-md ${selectedBuildingType !== "standard" ? "bg-[#198754] bg-opacity-10 border border-[#198754]" : "bg-[#F8F9FA]"}`}>
                        <h4 className="text-sm font-medium mb-1">Permeable Surfaces</h4>
                        <div className="flex justify-between text-xs">
                          <span>Site Coverage</span>
                          <span>
                            {selectedBuildingType === "standard" ? "10%" : 
                             selectedBuildingType === "passive" ? "45%" : "80%"}
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-[#E9ECEF] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: 
                              selectedBuildingType === "standard" ? "10%" : 
                              selectedBuildingType === "passive" ? "45%" : "80%"
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#6610f2] h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-[#F8F9FA] p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Regulations Compliance</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div 
                          className={`text-center p-2 rounded-md ${
                            selectedBuildingType === "standard" ? "bg-[#FFC107] bg-opacity-20" : "bg-[#198754] bg-opacity-20"
                          }`}
                        >
                          <span className="text-xs block">NYC Stormwater Rule</span>
                          <span className={`text-sm font-semibold ${
                            selectedBuildingType === "standard" ? "text-[#FFC107]" : "text-[#198754]"
                          }`}>
                            {selectedBuildingType === "standard" ? "Minimal" : "Exceeds"}
                          </span>
                        </div>
                        <div 
                          className={`text-center p-2 rounded-md ${
                            selectedBuildingType === "standard" ? "bg-[#DC3545] bg-opacity-20" : 
                            selectedBuildingType === "passive" ? "bg-[#FFC107] bg-opacity-20" : "bg-[#198754] bg-opacity-20"
                          }`}
                        >
                          <span className="text-xs block">LEED v4 Credits</span>
                          <span className={`text-sm font-semibold ${
                            selectedBuildingType === "standard" ? "text-[#DC3545]" : 
                            selectedBuildingType === "passive" ? "text-[#FFC107]" : "text-[#198754]"
                          }`}>
                            {selectedBuildingType === "standard" ? "0/10" : 
                             selectedBuildingType === "passive" ? "5/10" : "10/10"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}