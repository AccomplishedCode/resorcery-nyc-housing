import { useState } from "react";
import { motion } from "framer-motion";
import { Site } from "@/lib/data";

interface MapProps {
  sites: Site[];
  onSiteSelect: (siteId: number) => void;
  selectedSiteId: number | null;
}

export function Map({ sites, onSiteSelect, selectedSiteId }: MapProps) {
  const [activeLayers, setActiveLayers] = useState({
    far: true,
    cityOwned: false,
    transit: false
  });

  const handleLayerToggle = (layer: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading font-bold text-xl">NYC Opportunity Finder</h2>
        <div className="flex space-x-2">
          <button className="text-sm px-3 py-1 bg-[#E9ECEF] rounded-md hover:bg-[#DEE2E6]">
            <i className="fas fa-print mr-1"></i> Print
          </button>
          <button className="text-sm px-3 py-1 bg-[#0A5796] text-white rounded-md hover:opacity-90">
            <i className="fas fa-share-alt mr-1"></i> Share
          </button>
        </div>
      </div>
      
      <div 
        className="relative rounded-lg overflow-hidden h-[500px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1546636889-ba9fdd63583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-90 p-3 rounded-lg shadow-md">
          <h3 className="font-heading font-semibold text-sm mb-2">Map Layers</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#0A5796]" 
                checked={activeLayers.far}
                onChange={() => handleLayerToggle('far')}
              />
              <span className="ml-2 text-sm">Underutilized FAR</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#0A5796]" 
                checked={activeLayers.cityOwned}
                onChange={() => handleLayerToggle('cityOwned')}
              />
              <span className="ml-2 text-sm">City-Owned Properties</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#0A5796]" 
                checked={activeLayers.transit}
                onChange={() => handleLayerToggle('transit')}
              />
              <span className="ml-2 text-sm">Transit Access</span>
            </label>
          </div>
          <div className="mt-4 pt-3 border-t border-[#DEE2E6]">
            <p className="text-xs text-[#6C757D] mb-2">Potential New Units</p>
            <div className="flex items-center space-x-2">
              <span className="block w-3 h-3 rounded-full bg-[#28A745]"></span>
              <span className="text-xs">High (75+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="block w-3 h-3 rounded-full bg-[#FFC107]"></span>
              <span className="text-xs">Medium (30-74)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="block w-3 h-3 rounded-full bg-[#FF6B00]"></span>
              <span className="text-xs">Low (1-29)</span>
            </div>
          </div>
        </div>
        
        {/* Map Markers */}
        {sites.map(site => {
          const markerColor = site.potentialUnits >= 75 
            ? "#28A745" 
            : site.potentialUnits >= 30 
              ? "#FFC107" 
              : "#FF6B00";
          
          return (
            <motion.div 
              key={site.id}
              className="absolute cursor-pointer"
              style={{ top: site.position?.top, left: site.position?.left }}
              whileHover={{ scale: 1.2 }}
              onClick={() => onSiteSelect(site.id)}
            >
              <div 
                className="h-5 w-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: markerColor }}
              >
                <span className="text-white text-xs font-bold">{site.id}</span>
              </div>
            </motion.div>
          );
        })}
        
        {/* Map Overlay Layers */}
        <div 
          className={`absolute inset-0 bg-[#0A5796] pointer-events-none transition-opacity duration-300`}
          style={{ opacity: activeLayers.far ? 0.3 : 0 }}
        ></div>
        <div 
          className={`absolute inset-0 bg-[#FF6B00] pointer-events-none transition-opacity duration-300`}
          style={{ opacity: activeLayers.cityOwned ? 0.3 : 0 }}
        ></div>
        <div 
          className={`absolute inset-0 bg-[#28A745] pointer-events-none transition-opacity duration-300`}
          style={{ opacity: activeLayers.transit ? 0.3 : 0 }}
        ></div>
        
        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 z-10 bg-white bg-opacity-90 p-2 rounded-lg shadow-md">
          <button className="p-2 hover:bg-[#E9ECEF] rounded-md">
            <i className="fas fa-plus"></i>
          </button>
          <button className="p-2 hover:bg-[#E9ECEF] rounded-md">
            <i className="fas fa-minus"></i>
          </button>
          <button className="p-2 hover:bg-[#E9ECEF] rounded-md">
            <i className="fas fa-arrows-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
