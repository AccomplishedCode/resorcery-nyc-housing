import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Building3D, BuildingComparison, MassingStudy } from '@/components/Building3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Building, Cube, Eye, Sun, Camera, Layers, 
  RotateCcw, Maximize, Download, Share, Play
} from 'lucide-react';
import { nycSites } from '@/lib/nyc-mock-data';
import { nycColors } from '@/lib/nyc-design-system';

export default function Visualization3D() {
  const [selectedSite] = useState(nycSites[0]);
  const [currentView, setCurrentView] = useState('isometric');
  const [selectedComparison, setSelectedComparison] = useState<number[]>([0, 1, 2]);

  const scenarios = [
    {
      name: 'Maximum Density',
      stories: 15,
      units: 350,
      sqft: 280000,
      affordablePercentage: 25,
      greenSpace: 2000,
      parking: 140
    },
    {
      name: 'Affordability Focused',
      stories: 8,
      units: 240,
      sqft: 192000,
      affordablePercentage: 60,
      greenSpace: 8000,
      parking: 96
    },
    {
      name: 'Mixed-Use Village',
      stories: 12,
      units: 180,
      sqft: 320000,
      affordablePercentage: 40,
      greenSpace: 5000,
      parking: 200
    },
    {
      name: 'Green Pioneer',
      stories: 10,
      units: 200,
      sqft: 240000,
      affordablePercentage: 35,
      greenSpace: 12000,
      parking: 60
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-nyc-blue mb-2">3D Visualization Explorer</h1>
              <p className="text-gray-600">Interactive 3D models and massing studies for development scenarios</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Screenshot
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share View
              </Button>
              <Button className="bg-nyc-blue hover:bg-nyc-dark-blue">
                <Download className="h-4 w-4 mr-2" />
                Export 3D Model
              </Button>
            </div>
          </div>

          {/* Site Context */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-nyc-blue">{selectedSite.name}</h3>
                  <p className="text-sm text-gray-600">{selectedSite.address} • {selectedSite.neighborhood}, {selectedSite.borough}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Development Potential</div>
                  <div className="text-2xl font-bold text-nyc-blue">{selectedSite.potentialUnits} units</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="single">Single Model</TabsTrigger>
            <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
            <TabsTrigger value="massing">Massing Study</TabsTrigger>
            <TabsTrigger value="neighborhood">Neighborhood Context</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Scenario Selector */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {scenarios.map((scenario, index) => (
                      <Button
                        key={index}
                        variant={selectedComparison[0] === index ? 'default' : 'outline'}
                        className={`w-full justify-start ${
                          selectedComparison[0] === index ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''
                        }`}
                        onClick={() => setSelectedComparison([index])}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{scenario.name}</div>
                          <div className="text-xs opacity-75">{scenario.units} units • {scenario.stories} stories</div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* 3D Viewer */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-0">
                    <div className="h-96">
                      <Building3D
                        scenario={scenarios[selectedComparison[0] || 0]}
                        viewMode={currentView}
                        showContext={true}
                        onViewChange={setCurrentView}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Scenario Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BuildingComparison
                  scenarios={scenarios.slice(0, 3)}
                  labels={scenarios.slice(0, 3).map(s => s.name)}
                />
              </CardContent>
            </Card>

            {/* Comparison Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Comparative Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {['Units', 'Stories', 'Affordable %', 'Green Space'].map((metric, index) => (
                    <div key={metric} className="text-center">
                      <div className="text-sm text-gray-600 mb-2">{metric}</div>
                      <div className="space-y-1">
                        {scenarios.slice(0, 3).map((scenario, i) => (
                          <div 
                            key={i}
                            className={`text-sm font-medium px-2 py-1 rounded ${
                              i === 0 ? 'bg-blue-100 text-blue-800' :
                              i === 1 ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {metric === 'Units' ? scenario.units :
                             metric === 'Stories' ? scenario.stories :
                             metric === 'Affordable %' ? `${scenario.affordablePercentage}%` :
                             `${(scenario.greenSpace / 1000).toFixed(1)}K sq ft`}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="massing" className="space-y-6">
            <MassingStudy scenarios={scenarios} />
          </TabsContent>

          <TabsContent value="neighborhood" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Neighborhood Context View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-b from-sky-100 to-green-100 rounded-lg p-4 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <Building className="h-16 w-16 mx-auto mb-4 text-nyc-blue" />
                    <h3 className="text-xl font-semibold text-nyc-blue mb-2">Street-Level Experience</h3>
                    <p className="text-gray-600 max-w-md">
                      Experience how the development integrates with existing neighborhood character,
                      pedestrian flow, and urban fabric from a street perspective.
                    </p>
                    <Button className="mt-4 bg-nyc-blue hover:bg-nyc-dark-blue">
                      <Play className="h-4 w-4 mr-2" />
                      Launch Street View
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}