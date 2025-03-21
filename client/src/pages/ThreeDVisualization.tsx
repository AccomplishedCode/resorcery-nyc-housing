import { useState } from "react";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ThreeDVisualization() {
  const [selectedBuildingType, setSelectedBuildingType] = useState("standard");
  const [viewMode, setViewMode] = useState("aerial");
  const [timeOfDay, setTimeOfDay] = useState(12);
  const [showContext, setShowContext] = useState(true);
  
  // Building configurations
  const buildingConfigs = {
    standard: {
      name: "Maximum Density Residential",
      height: "85 feet (8 stories)",
      units: 85,
      description: "Maximizes total unit count with standard construction"
    },
    mixed: {
      name: "Mixed-Use with Retail",
      height: "81 feet (8 stories)",
      units: 72,
      description: "Ground floor commercial with residential above"
    },
    community: {
      name: "Community-Focused",
      height: "75 feet (7 stories)",
      units: 64,
      description: "Includes childcare center and community space"
    },
    passive: {
      name: "Passive House Design",
      height: "82 feet (8 stories)",
      units: 78,
      description: "High-efficiency sustainable construction"
    }
  };
  
  const currentConfig = buildingConfigs[selectedBuildingType as keyof typeof buildingConfigs];
  
  // 3D view images based on building type and view mode
  const getViewImage = () => {
    // In a real app, these would be actual 3D renderings with different angles
    const baseUrl = "https://images.unsplash.com/photo-";
    
    // Mapping of building types and views to sample images
    const imageMap: Record<string, Record<string, string>> = {
      standard: {
        aerial: "1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        street: "1555767525-1def7be7f391?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        context: "1581888227599-779811939961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      mixed: {
        aerial: "1577791465485-b80039b4d69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        street: "1578495757343-8576f35d1530?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        context: "1597994452736-5e152d82bd8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      community: {
        aerial: "1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        street: "1524758205288-1e7da12eedf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        context: "1582201943435-81fe778607ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      passive: {
        aerial: "1518353053542-7ea33d942319?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        street: "1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        context: "1519814847946-61e7b12e2586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      }
    };
    
    return baseUrl + imageMap[selectedBuildingType][viewMode];
  };
  
  // Determine shadow intensity based on time of day
  const getShadowIntensity = () => {
    // Times closer to noon have less shadow
    const noonDiff = Math.abs(12 - timeOfDay);
    return Math.min(0.7, noonDiff * 0.1);
  };
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="font-heading font-bold text-2xl">3D Visualization Explorer</h2>
              <p className="text-[#6C757D]">
                Interactive 3D models of development scenarios
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button className="bg-[#0dcaf0] hover:bg-[#0dcaf0]/90">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v10.764a1 1 0 01-1.447.894L15 18M5 18l-4.553-2.276A1 1 0 010 14.618V3.854a1 1 0 011.447-.894L5 5m10 0l-4.553-2.276A1 1 0 009.447 1.86L5 5" />
                </svg>
                Download 3D Model
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D View Column */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div 
                  className="relative h-[500px] bg-cover bg-center transition-all duration-500"
                  style={{ 
                    backgroundImage: `url('${getViewImage()}')`,
                  }}
                >
                  {/* Shadows overlay that changes with time of day */}
                  <div 
                    className="absolute inset-0 bg-black transition-opacity duration-500"
                    style={{ 
                      opacity: getShadowIntensity(),
                      backgroundImage: timeOfDay < 12 ? 
                        "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))" : 
                        "linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0))"
                    }}
                  ></div>
                  
                  {/* Context buildings */}
                  {showContext && (
                    <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-500"></div>
                  )}
                  
                  {/* Time indicator */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-80 px-3 py-1 rounded-md text-sm font-mono">
                    {timeOfDay}:00 {timeOfDay < 12 ? "AM" : "PM"}
                  </div>
                  
                  {/* View mode indicator */}
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-md text-sm">
                    {viewMode === "aerial" ? "Aerial View" : 
                     viewMode === "street" ? "Street-Level View" : "Context View"}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      className={viewMode === "aerial" ? "bg-[#0dcaf0] text-white" : ""}
                      onClick={() => setViewMode("aerial")}
                    >
                      Aerial View
                    </Button>
                    <Button 
                      variant="outline" 
                      className={viewMode === "street" ? "bg-[#0dcaf0] text-white" : ""}
                      onClick={() => setViewMode("street")}
                    >
                      Street-Level View
                    </Button>
                    <Button 
                      variant="outline" 
                      className={viewMode === "context" ? "bg-[#0dcaf0] text-white" : ""}
                      onClick={() => setViewMode("context")}
                    >
                      Context View
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">Time of Day</h3>
                    <div>
                      <Slider 
                        value={[timeOfDay]} 
                        min={6} 
                        max={20} 
                        step={1} 
                        onValueChange={(value) => setTimeOfDay(value[0])}
                      />
                      <div className="flex justify-between text-xs text-[#6C757D] mt-1">
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>8 PM</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                      <div 
                        className={`p-2 rounded-md cursor-pointer ${timeOfDay === 8 ? "bg-[#0dcaf0] bg-opacity-10 border border-[#0dcaf0]" : "bg-[#F8F9FA]"}`}
                        onClick={() => setTimeOfDay(8)}
                      >
                        <span className="text-xs block">Morning</span>
                        <span className="text-sm font-medium">8 AM</span>
                      </div>
                      <div 
                        className={`p-2 rounded-md cursor-pointer ${timeOfDay === 12 ? "bg-[#0dcaf0] bg-opacity-10 border border-[#0dcaf0]" : "bg-[#F8F9FA]"}`}
                        onClick={() => setTimeOfDay(12)}
                      >
                        <span className="text-xs block">Midday</span>
                        <span className="text-sm font-medium">12 PM</span>
                      </div>
                      <div 
                        className={`p-2 rounded-md cursor-pointer ${timeOfDay === 17 ? "bg-[#0dcaf0] bg-opacity-10 border border-[#0dcaf0]" : "bg-[#F8F9FA]"}`}
                        onClick={() => setTimeOfDay(17)}
                      >
                        <span className="text-xs block">Evening</span>
                        <span className="text-sm font-medium">5 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">View Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="context" className="text-sm">Show Surrounding Buildings</Label>
                        <Switch 
                          id="context" 
                          checked={showContext} 
                          onCheckedChange={setShowContext}
                        />
                      </div>
                      
                      <div className="bg-[#F8F9FA] p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">About East Village Site</h4>
                        <p className="text-xs text-[#6C757D]">
                          Block 972, Lot 34 in Manhattan Community District 3
                        </p>
                        <p className="text-xs text-[#6C757D] mt-1">
                          Zoning: R7A with MIH Option 1
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Controls Column */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Building Configuration</h3>
                  
                  <Tabs defaultValue={selectedBuildingType} onValueChange={setSelectedBuildingType}>
                    <TabsList className="grid grid-cols-2 h-auto mb-4">
                      <TabsTrigger value="standard" className="py-2">Maximum Density</TabsTrigger>
                      <TabsTrigger value="mixed" className="py-2">Mixed-Use</TabsTrigger>
                      <TabsTrigger value="community" className="py-2">Community</TabsTrigger>
                      <TabsTrigger value="passive" className="py-2">Passive House</TabsTrigger>
                    </TabsList>
                    
                    <motion.div 
                      key={selectedBuildingType}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#F8F9FA] p-4 rounded-md"
                    >
                      <h4 className="font-heading font-semibold text-md">{currentConfig.name}</h4>
                      <p className="text-sm text-[#6C757D] mt-1">{currentConfig.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <span className="text-xs text-[#6C757D] block">Height</span>
                          <span className="text-sm font-bold">{currentConfig.height}</span>
                        </div>
                        <div>
                          <span className="text-xs text-[#6C757D] block">Units</span>
                          <span className="text-sm font-bold">{currentConfig.units} units</span>
                        </div>
                      </div>
                    </motion.div>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Shadow Study</h3>
                  
                  <div 
                    className="h-40 mb-4 bg-cover bg-center rounded-md overflow-hidden relative"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                    }}
                  >
                    {/* Shadow overlay */}
                    <div 
                      className="absolute inset-0 bg-black transition-all duration-500"
                      style={{ 
                        opacity: getShadowIntensity(),
                        width: `${50 + Math.abs(12 - timeOfDay) * 5}%`,
                        left: timeOfDay < 12 ? 0 : "auto",
                        right: timeOfDay >= 12 ? 0 : "auto"
                      }}
                    ></div>
                    
                    {/* Time indicator */}
                    <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded-md text-xs font-mono">
                      {timeOfDay}:00
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Morning Impact (8AM)</span>
                        <span>
                          {selectedBuildingType === "standard" ? "High" :
                           selectedBuildingType === "passive" ? "Medium" : "Medium"}
                        </span>
                      </div>
                      <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#FFC107]"
                          style={{ 
                            width: selectedBuildingType === "standard" ? "80%" :
                                  selectedBuildingType === "passive" ? "65%" : "60%"
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Afternoon Impact (4PM)</span>
                        <span>
                          {selectedBuildingType === "standard" ? "Medium" :
                           selectedBuildingType === "passive" ? "Medium" : "Low"}
                        </span>
                      </div>
                      <div className="w-full bg-[#E9ECEF] rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#FFC107]"
                          style={{ 
                            width: selectedBuildingType === "standard" ? "70%" :
                                  selectedBuildingType === "passive" ? "60%" : "40%"
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Visual Context Analysis</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-[#F8F9FA] p-3 rounded-md">
                      <h4 className="text-sm font-medium">Sightlines</h4>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs">Roof visibility from park:</span>
                        <span className="text-xs font-bold">
                          {selectedBuildingType === "community" ? "Partial" : "Full"}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">Street wall consistency:</span>
                        <span className="text-xs font-bold">
                          {selectedBuildingType === "mixed" ? "High" :
                           selectedBuildingType === "community" ? "Medium" : "High"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-[#F8F9FA] p-3 rounded-md">
                      <h4 className="text-sm font-medium">Neighborhood Character</h4>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs">Scale compatibility:</span>
                        <span className="text-xs font-bold">
                          {selectedBuildingType === "standard" ? "Medium" :
                           selectedBuildingType === "community" ? "High" : "Medium"}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">Material harmony:</span>
                        <span className="text-xs font-bold">
                          {selectedBuildingType === "passive" ? "High" :
                           selectedBuildingType === "mixed" ? "Medium" : "Medium"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-[#0dcaf0] hover:bg-[#0dcaf0]/90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View Additional Angles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}