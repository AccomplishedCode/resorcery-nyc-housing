import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Train, DollarSign, Eye } from 'lucide-react';
import { nycColors, getBoroughColor } from '@/lib/nyc-design-system';
import type { Site } from '@/lib/nyc-mock-data';

interface SimpleMapProps {
  sites: any[];
  selectedSiteId: number | null;
  onSiteSelect: (id: number) => void;
}

export function SimpleMap({ sites, selectedSiteId, onSiteSelect }: SimpleMapProps) {
  const [hoveredSite, setHoveredSite] = useState<number | null>(null);

  // NYC boroughs layout for the visual map
  const boroughsLayout = {
    'Manhattan': { x: '45%', y: '35%', width: '8%', height: '25%' },
    'Brooklyn': { x: '52%', y: '45%', width: '15%', height: '20%' },
    'Queens': { x: '60%', y: '25%', width: '20%', height: '25%' },
    'Bronx': { x: '48%', y: '15%', width: '12%', height: '15%' },
    'Staten Island': { x: '25%', y: '55%', width: '10%', height: '12%' }
  };

  const getBoroughFromSiteId = (siteId: number) => {
    // Simple mapping based on site ID patterns
    if (siteId >= 1 && siteId <= 3) return 'Manhattan';
    if (siteId >= 4 && siteId <= 7) return 'Brooklyn';
    if (siteId >= 8 && siteId <= 11) return 'Queens';
    if (siteId >= 12 && siteId <= 14) return 'Bronx';
    if (siteId >= 15 && siteId <= 17) return 'Staten Island';
    return 'Manhattan';
  };

  const getSitePosition = (site: any) => {
    const borough = getBoroughFromSiteId(site.id);
    const layout = boroughsLayout[borough as keyof typeof boroughsLayout];
    
    // Add some randomness within the borough bounds
    const randomX = Math.random() * (parseFloat(layout.width) * 0.8);
    const randomY = Math.random() * (parseFloat(layout.height) * 0.8);
    
    return {
      x: `calc(${layout.x} + ${randomX}%)`,
      y: `calc(${layout.y} + ${randomY}%)`
    };
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* NYC Map Background */}
      <div className="absolute inset-0">
        {/* Borough shapes */}
        {Object.entries(boroughsLayout).map(([borough, layout]) => (
          <motion.div
            key={borough}
            className="absolute rounded-lg border-2 border-blue-200"
            style={{
              left: layout.x,
              top: layout.y,
              width: layout.width,
              height: layout.height,
              backgroundColor: `${getBoroughColor(borough)}20`,
              borderColor: getBoroughColor(borough)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute bottom-1 left-1 text-xs font-semibold opacity-70">
              {borough.replace(' ', '\n')}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Water/Rivers */}
      <div className="absolute inset-0">
        <div 
          className="absolute bg-blue-300 opacity-30"
          style={{ left: '40%', top: '10%', width: '3px', height: '80%' }}
        ></div>
        <div 
          className="absolute bg-blue-300 opacity-30"
          style={{ left: '35%', top: '60%', width: '40%', height: '3px' }}
        ></div>
      </div>

      {/* Site Markers */}
      {sites.map((site, index) => {
        const position = getSitePosition(site);
        const isSelected = selectedSiteId === site.id;
        const isHovered = hoveredSite === site.id;
        
        return (
          <motion.div
            key={site.id}
            className="absolute cursor-pointer z-10"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isSelected ? 1.4 : isHovered ? 1.2 : 1,
              opacity: 1
            }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSiteSelect(site.id)}
            onMouseEnter={() => setHoveredSite(site.id)}
            onMouseLeave={() => setHoveredSite(null)}
          >
            {/* Ripple effect for high potential */}
            {site.potentialUnits > 150 && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400"
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.6, 0, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            )}
            
            {/* Main marker */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
              }`}
              style={{
                backgroundColor: site.potentialUnits > 150 ? nycColors.status.highPotential :
                                site.potentialUnits > 100 ? nycColors.primary.blue :
                                nycColors.secondary.green
              }}
            >
              <Building className="w-3 h-3 text-white" />
            </div>

            {/* Units badge */}
            {site.potentialUnits > 100 && (
              <div className="absolute -top-2 -right-2 bg-white rounded-full px-1 py-0.5 text-xs font-bold shadow-md"
                style={{ color: nycColors.primary.blue }}
              >
                {site.potentialUnits}
              </div>
            )}

            {/* Hover tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-48 z-50"
              >
                <div className="text-sm font-semibold text-gray-900 mb-1">{site.name}</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>{site.potentialUnits} units</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>FAR {site.currentFAR}/{site.allowedFAR}</span>
                  </div>
                </div>
                <div className="text-xs mt-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Click to view
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
        <div className="text-xs font-semibold mb-2 text-gray-700">NYC Development Sites</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nycColors.status.highPotential }}></div>
            <span>High Priority (150+ units)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nycColors.primary.blue }}></div>
            <span>Medium Priority (100+ units)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nycColors.secondary.green }}></div>
            <span>Standard Priority</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="text-xs font-semibold mb-1 text-gray-700">Showing {sites.length} sites</div>
        <div className="text-xs text-gray-600">
          Total potential: {sites.reduce((sum, site) => sum + site.potentialUnits, 0).toLocaleString()} units
        </div>
      </div>

      {/* Loading state simulation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 bg-blue-50 flex items-center justify-center"
      >
        <div className="text-center">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-bounce" />
          <div className="text-sm text-blue-600 font-semibold">Loading NYC Development Map...</div>
        </div>
      </motion.div>
    </div>
  );
}