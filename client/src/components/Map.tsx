import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Site } from "@/lib/data";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Plus, Minus, Move } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface MapProps {
  sites: Site[];
  onSiteSelect: (siteId: number) => void;
  selectedSiteId: number | null;
}

export function Map({ sites, onSiteSelect, selectedSiteId }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  const [activeLayers, setActiveLayers] = useState({
    far: true,
    cityOwned: false,
    transit: false
  });

  // Calculate center point based on sites
  const getInitialCenter = () => {
    // Default to Manhattan if no sites
    if (!sites.length) {
      return {
        lng: -73.98,
        lat: 40.72,
        zoom: 12
      };
    }

    // Calculate center based on the average of site coordinates
    const avgLat = sites.reduce((sum, site) => sum + site.latitude, 0) / sites.length;
    const avgLng = sites.reduce((sum, site) => sum + site.longitude, 0) / sites.length;

    return {
      lng: avgLng,
      lat: avgLat,
      zoom: 13
    };
  };

  const handleLayerToggle = (layer: string) => {
    setActiveLayers(prev => {
      const newLayers = {
        ...prev,
        [layer]: !prev[layer as keyof typeof prev]
      };
      
      // Update map layers visibility
      if (map.current) {
        if (map.current.getLayer('far-layer')) {
          map.current.setPaintProperty('far-layer', 'fill-opacity', 
            newLayers.far ? 0.3 : 0);
        }
        if (map.current.getLayer('city-owned-layer')) {
          map.current.setPaintProperty('city-owned-layer', 'fill-opacity', 
            newLayers.cityOwned ? 0.3 : 0);
        }
        if (map.current.getLayer('transit-layer')) {
          map.current.setPaintProperty('transit-layer', 'fill-opacity', 
            newLayers.transit ? 0.3 : 0);
        }
      }
      
      return newLayers;
    });
  };

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const center = getInitialCenter();
    
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: center.zoom
    });
    
    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    map.current = mapInstance;
    
    // Setup map when loaded
    mapInstance.on('load', () => {
      // Add NYC Area polygon for demonstration
      mapInstance.addSource('nyc-area', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-74.03, 40.68],
              [-73.90, 40.68],
              [-73.90, 40.82],
              [-74.03, 40.82],
              [-74.03, 40.68]
            ]]
          }
        }
      });
      
      // Add layer styles
      mapInstance.addLayer({
        id: 'far-layer',
        type: 'fill',
        source: 'nyc-area',
        paint: {
          'fill-color': '#0A5796',
          'fill-opacity': activeLayers.far ? 0.3 : 0
        }
      });
      
      mapInstance.addLayer({
        id: 'city-owned-layer',
        type: 'fill',
        source: 'nyc-area',
        paint: {
          'fill-color': '#FF6B00',
          'fill-opacity': activeLayers.cityOwned ? 0.3 : 0
        }
      });
      
      mapInstance.addLayer({
        id: 'transit-layer',
        type: 'fill',
        source: 'nyc-area',
        paint: {
          'fill-color': '#28A745',
          'fill-opacity': activeLayers.transit ? 0.3 : 0
        }
      });
      
      // Add markers for sites
      sites.forEach(site => {
        const markerColor = site.potentialUnits >= 75 
          ? "#28A745" 
          : site.potentialUnits >= 30 
            ? "#FFC107" 
            : "#FF6B00";
        
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'site-marker';
        markerEl.style.backgroundColor = markerColor;
        markerEl.style.width = '20px';
        markerEl.style.height = '20px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.display = 'flex';
        markerEl.style.alignItems = 'center';
        markerEl.style.justifyContent = 'center';
        markerEl.style.color = 'white';
        markerEl.style.fontWeight = 'bold';
        markerEl.style.fontSize = '12px';
        markerEl.style.cursor = 'pointer';
        markerEl.innerText = site.id.toString();
        
        // Create marker and add click handler
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([site.longitude, site.latitude])
          .addTo(mapInstance);
        
        markerEl.addEventListener('click', () => {
          onSiteSelect(site.id);
        });
        
        // Store marker reference
        markers.current.push(marker);
      });
    });
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Update marker appearance when selected site changes
  useEffect(() => {
    const markerElements = document.querySelectorAll('.site-marker');
    
    markerElements.forEach((el, index) => {
      const siteId = sites[index]?.id;
      if (siteId === selectedSiteId) {
        (el as HTMLElement).style.boxShadow = '0 0 0 3px #0A5796';
        (el as HTMLElement).style.transform = 'scale(1.2)';
      } else {
        (el as HTMLElement).style.boxShadow = 'none';
        (el as HTMLElement).style.transform = 'scale(1)';
      }
    });
  }, [selectedSiteId, sites]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading font-bold text-xl">NYC Opportunity Finder</h2>
        <div className="flex space-x-2">
          <button className="text-sm px-3 py-1 bg-[#E9ECEF] rounded-md hover:bg-[#DEE2E6]">
            Print
          </button>
          <button className="text-sm px-3 py-1 bg-[#0A5796] text-white rounded-md hover:opacity-90">
            Share
          </button>
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden h-[500px]">
        {/* Map container - mapbox-gl will render here */}
        <div ref={mapContainer} className="h-full w-full rounded-lg" />

        {/* Map Controls Panel */}
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
      </div>
    </div>
  );
}
