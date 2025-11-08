import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { SimpleMap } from '@/components/SimpleMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Filter, Download, RefreshCw, MapPin, Building, 
  Train, DollarSign, TrendingUp, Users, TreePine, School,
  ChevronRight, Home, Briefcase, Zap, BarChart3, Clock,
  CheckCircle, AlertCircle, XCircle
} from 'lucide-react';
import { nycSites, calculateDevelopmentPotential, estimateAffordableUnits, type Site } from '@/lib/nyc-mock-data';
import { nycColors, getBoroughColor } from '@/lib/nyc-design-system';
import { TypewriterEffect, AIThinking } from '@/components/TypewriterEffect';

export default function OpportunityFinderEnhanced() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBorough, setSelectedBorough] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);
  
  // Map layer toggles
  const [mapLayers, setMapLayers] = useState({
    cityOwned: false,
    nearTransit: false,
    highPriority: true,
    underutilized: false
  });

  // Filters
  const [filters, setFilters] = useState({
    minUnits: 0,
    maxCost: 100,
    walkScore: 0,
    ownership: 'all',
    status: 'all',
    zoning: 'all'
  });

  // AI Analysis simulation
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [currentInsight, setCurrentInsight] = useState<string>('');
  const [showTypewriter, setShowTypewriter] = useState(false);

  // Convert NYC sites to old format for Map component
  const adaptedSites = useMemo(() => {
    return nycSites.map(site => ({
      id: parseInt(site.id.replace(/[^0-9]/g, '')),
      name: site.name,
      blockNumber: Math.floor(Math.random() * 1000),
      lotNumber: Math.floor(Math.random() * 100),
      currentFAR: site.currentFAR,
      allowedFAR: site.allowedFAR,
      potentialUnits: site.potentialUnits,
      latitude: site.lat,
      longitude: site.lng,
      zoning: site.zoning,
      position: { top: '0%', left: '0%' }
    }));
  }, []);

  // Filter and search sites
  const filteredSites = useMemo(() => {
    return adaptedSites.filter(site => {
      const nycSite = nycSites.find(s => parseInt(s.id.replace(/[^0-9]/g, '')) === site.id);
      if (!nycSite) return false;
      // Search query
      if (searchQuery && !nycSite.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !nycSite.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Borough filter
      if (selectedBorough !== 'all' && nycSite.borough !== selectedBorough) {
        return false;
      }

      // Advanced filters
      if (nycSite.potentialUnits < filters.minUnits) return false;
      if (nycSite.estimatedCost > filters.maxCost * 1000000) return false;
      if (nycSite.walkScore < filters.walkScore) return false;
      if (filters.ownership !== 'all' && nycSite.ownershipType !== filters.ownership) return false;
      if (filters.status !== 'all' && nycSite.status !== filters.status) return false;

      return true;
    });
  }, [searchQuery, selectedBorough, filters, adaptedSites]);

  const selectedSite = selectedSiteId ? nycSites.find(s => s.id === selectedSiteId) : null;

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredSites.length;
    const totalUnits = filteredSites.reduce((sum, site) => sum + site.potentialUnits, 0);
    const avgCost = filteredSites.reduce((sum, site) => sum + site.estimatedCost, 0) / total;
    const cityOwned = filteredSites.filter(s => s.ownershipType === 'City-Owned').length;
    
    return { total, totalUnits, avgCost, cityOwned };
  }, [filteredSites]);

  const runAIAnalysis = async () => {
    setAiAnalysisLoading(true);
    setAiInsights([]);
    setCurrentInsight('');
    setShowTypewriter(false);
    
    // Simulate realistic AI analysis phases
    setTimeout(() => {
      setCurrentInsight('Analyzing development potential across filtered sites...');
      setShowTypewriter(true);
    }, 500);

    setTimeout(() => {
      setCurrentInsight(`Found ${stats.cityOwned} city-owned properties with immediate development potential. Analyzing FAR utilization patterns...`);
    }, 2000);

    setTimeout(() => {
      setCurrentInsight(`East Harlem and South Bronx show highest FAR underutilization at 68% below allowed density. Transit-adjacent sites could yield 3,500+ additional units with current zoning.`);
    }, 4000);

    setTimeout(() => {
      setCurrentInsight(`RECOMMENDATION: Focus on ${filteredSites[0]?.name || 'East Harlem site'} with ${filteredSites[0]?.potentialUnits || 187} unit potential. Site offers optimal transit connectivity and community amenities proximity.`);
    }, 6000);

    setTimeout(() => {
      setAiInsights([
        `Identified ${stats.cityOwned} city-owned properties ready for immediate development`,
        `Detected significant FAR underutilization: average 68% below zoning allowance`,
        `Transit-adjacent locations show 3,500+ unit development potential`,
        `Priority recommendation: ${filteredSites[0]?.name || 'East Harlem Opportunity Zone'} (${filteredSites[0]?.potentialUnits || 187} units)`
      ]);
      setAiAnalysisLoading(false);
      setShowTypewriter(false);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar - Filters & Search */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: showFilters ? 0 : -300 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-96 bg-white shadow-xl z-20 overflow-y-auto border-r-2 border-gray-100"
        >
          <div className="p-6 sticky top-0 bg-white border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-nyc-blue">Find Opportunities</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-nyc-blue to-nyc-light-blue text-white">
                <CardContent className="p-3">
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-xs opacity-90">Available Sites</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-3">
                  <div className="text-2xl font-bold">{stats.totalUnits.toLocaleString()}</div>
                  <div className="text-xs opacity-90">Potential Units</div>
                </CardContent>
              </Card>
            </div>

            {/* Borough Selector */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Select Borough</Label>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].map(borough => (
                  <Button
                    key={borough}
                    variant={selectedBorough === borough ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedBorough(borough)}
                    className={selectedBorough === borough ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}
                  >
                    {borough === 'all' ? 'All' : borough.replace(' ', '\n')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Map Layers */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Map Layers</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="city-owned" className="text-sm cursor-pointer">City-Owned Only</Label>
                  <Switch
                    id="city-owned"
                    checked={mapLayers.cityOwned}
                    onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, cityOwned: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="near-transit" className="text-sm cursor-pointer">Near Transit</Label>
                  <Switch
                    id="near-transit"
                    checked={mapLayers.nearTransit}
                    onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, nearTransit: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-priority" className="text-sm cursor-pointer">High Priority</Label>
                  <Switch
                    id="high-priority"
                    checked={mapLayers.highPriority}
                    onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, highPriority: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="underutilized" className="text-sm cursor-pointer">Underutilized FAR</Label>
                  <Switch
                    id="underutilized"
                    checked={mapLayers.underutilized}
                    onCheckedChange={(checked) => setMapLayers(prev => ({ ...prev, underutilized: checked }))}
                  />
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Advanced Filters</Label>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-600">Min. Potential Units: {filters.minUnits}</Label>
                  <Slider
                    value={[filters.minUnits]}
                    onValueChange={([value]) => setFilters(prev => ({ ...prev, minUnits: value }))}
                    max={500}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-600">Max Cost: ${filters.maxCost}M</Label>
                  <Slider
                    value={[filters.maxCost]}
                    onValueChange={([value]) => setFilters(prev => ({ ...prev, maxCost: value }))}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-600">Min Walk Score: {filters.walkScore}</Label>
                  <Slider
                    value={[filters.walkScore]}
                    onValueChange={([value]) => setFilters(prev => ({ ...prev, walkScore: value }))}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  AI Site Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={runAIAnalysis}
                  disabled={aiAnalysisLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {aiAnalysisLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Run AI Analysis
                    </>
                  )}
                </Button>

                {/* AI Analysis Display */}
                <div className="mt-4 min-h-32">
                  {aiAnalysisLoading && !showTypewriter && (
                    <AIThinking className="mt-4" />
                  )}
                  
                  {showTypewriter && currentInsight && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg"
                    >
                      <div className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <TypewriterEffect 
                          text={currentInsight}
                          speed={30}
                          className="text-xs text-blue-700 leading-relaxed"
                        />
                      </div>
                    </motion.div>
                  )}

                  {aiInsights.length > 0 && !aiAnalysisLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="text-xs font-semibold text-purple-700 mb-3 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Analysis Complete
                      </div>
                      {aiInsights.map((insight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xs text-gray-700 flex items-start gap-2 bg-gray-50 p-2 rounded"
                        >
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          {insight}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content - Map & Details */}
        <div className="flex-1 relative">
          {/* Toggle Filters Button */}
          {!showFilters && (
            <motion.button
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              onClick={() => setShowFilters(true)}
              className="absolute top-4 left-4 z-30 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow"
            >
              <Filter className="h-5 w-5 text-nyc-blue" />
            </motion.button>
          )}

          {/* Map Container */}
          <div className="h-full relative">
            <SimpleMap
              sites={filteredSites}
              selectedSiteId={selectedSiteId ? parseInt(selectedSiteId.replace(/[^0-9]/g, '')) : null}
              onSiteSelect={(id: number) => {
                const site = nycSites.find(s => parseInt(s.id.replace(/[^0-9]/g, '')) === id);
                if (site) setSelectedSiteId(site.id);
              }}
            />

            {/* Site Details Panel */}
            <AnimatePresence>
              {selectedSite && (
                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="absolute top-4 right-4 w-96 max-h-[calc(100%-2rem)] overflow-y-auto bg-white rounded-lg shadow-2xl z-30"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-nyc-blue">{selectedSite.name}</h3>
                        <p className="text-sm text-gray-600">{selectedSite.neighborhood}, {selectedSite.borough}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSiteId(null)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="potential">Potential</TabsTrigger>
                        <TabsTrigger value="location">Location</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Status</div>
                            <Badge className={
                              selectedSite.status === 'Available' ? 'bg-green-100 text-green-800' :
                              selectedSite.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {selectedSite.status}
                            </Badge>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Ownership</div>
                            <div className="font-semibold text-sm">{selectedSite.ownershipType}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Zoning</div>
                            <div className="font-mono font-semibold text-sm">{selectedSite.zoning}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Priority</div>
                            <Badge className={
                              selectedSite.developmentPriority === 'High' ? 'bg-red-100 text-red-800' :
                              selectedSite.developmentPriority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {selectedSite.developmentPriority}
                            </Badge>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm mb-3">Development Metrics</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Current FAR</span>
                              <span className="font-semibold">{selectedSite.currentFAR}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Allowed FAR</span>
                              <span className="font-semibold">{selectedSite.allowedFAR}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Lot Size</span>
                              <span className="font-semibold">{selectedSite.lotSize.toLocaleString()} sq ft</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Est. Cost</span>
                              <span className="font-semibold">${(selectedSite.estimatedCost / 1000000).toFixed(1)}M</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="potential" className="space-y-4 mt-4">
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                          <div className="text-3xl font-bold text-nyc-blue mb-1">
                            {selectedSite.potentialUnits}
                          </div>
                          <div className="text-sm text-gray-600">Potential New Units</div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>{estimateAffordableUnits(selectedSite.potentialUnits, 30)}</strong> affordable units (30%)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>{((selectedSite.allowedFAR - selectedSite.currentFAR) / selectedSite.allowedFAR * 100).toFixed(0)}%</strong> FAR underutilized
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>${Math.round(selectedSite.estimatedCost / selectedSite.potentialUnits).toLocaleString()}</strong> per unit
                            </span>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="location" className="space-y-4 mt-4">
                        <div className="space-y-3">
                          {selectedSite.nearSubway && (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-semibold">Near Subway Station</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              Walk Score: <strong>{selectedSite.walkScore}</strong>/100
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>{selectedSite.schoolsNearby}</strong> schools nearby
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TreePine className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              <strong>{selectedSite.parksNearby}</strong> parks within 0.5 miles
                            </span>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <Button className="w-full bg-nyc-blue hover:bg-nyc-dark-blue text-white">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Start Development Analysis
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}