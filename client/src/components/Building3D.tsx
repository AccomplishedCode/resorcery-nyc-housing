import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Building, RotateCcw, Maximize, Sun, Eye, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { nycColors } from '@/lib/nyc-design-system';
import * as THREE from 'three';

interface Building3DProps {
  scenario: {
    name: string;
    stories: number;
    units: number;
    sqft: number;
    affordablePercentage: number;
    greenSpace: number;
    parking: number;
  };
  viewMode?: 'isometric' | 'street' | 'aerial';
  showContext?: boolean;
  timeOfDay?: number; // 0-24 hours
  onViewChange?: (view: string) => void;
}

// Building component
function BuildingModel({ 
  stories, 
  affordablePercentage, 
  timeOfDay = 12,
  greenSpace = 0 
}: { 
  stories: number; 
  affordablePercentage: number; 
  timeOfDay?: number;
  greenSpace?: number;
}) {
  const buildingRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (buildingRef.current) {
      // Subtle rotation animation
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const buildingColor = affordablePercentage > 50 ? nycColors.secondary.green : 
                       affordablePercentage > 30 ? nycColors.primary.skyBlue :
                       nycColors.neutral.gray;

  const storyHeight = 3;
  const buildingHeight = stories * storyHeight;

  return (
    <group ref={buildingRef}>
      {/* Base/Foundation */}
      <Box
        position={[0, -0.5, 0]}
        args={[12, 1, 8]}
        material-color="#8b8b8b"
      />

      {/* Main Building */}
      <Box
        position={[0, buildingHeight / 2, 0]}
        args={[10, buildingHeight, 6]}
        material-color={buildingColor}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [1.02, 1, 1.02] : [1, 1, 1]}
      />

      {/* Floor Lines */}
      {Array.from({ length: stories }, (_, i) => (
        <Plane
          key={i}
          position={[0, i * storyHeight + storyHeight / 2, 3.1]}
          args={[10, 0.1]}
          material-color="#ffffff"
          material-opacity={0.8}
          material-transparent
        />
      ))}

      {/* Windows */}
      {Array.from({ length: stories }, (_, floor) =>
        Array.from({ length: 8 }, (_, window) => (
          <Box
            key={`${floor}-${window}`}
            position={[
              -4 + (window * 1.2), 
              floor * storyHeight + storyHeight / 2, 
              3.1
            ]}
            args={[0.8, 1.5, 0.1]}
            material-color={timeOfDay > 18 || timeOfDay < 6 ? "#fffacd" : "#87ceeb"}
            material-opacity={0.7}
            material-transparent
          />
        ))
      )}

      {/* Green Roof/Space */}
      {greenSpace > 0 && (
        <Box
          position={[0, buildingHeight + 0.2, 0]}
          args={[10, 0.4, 6]}
          material-color={nycColors.secondary.green}
        />
      )}

      {/* Affordable Housing Indicator */}
      {affordablePercentage > 30 && (
        <Text
          position={[0, buildingHeight + 2, 0]}
          fontSize={1.2}
          color={nycColors.secondary.green}
          anchorX="center"
          anchorY="middle"
        >
          {affordablePercentage}% Affordable
        </Text>
      )}

      {/* Context Buildings (simplified neighbors) */}
      <Box position={[15, 6, 0]} args={[8, 12, 5]} material-color="#d3d3d3" material-opacity={0.6} material-transparent />
      <Box position={[-15, 4, 0]} args={[6, 8, 4]} material-color="#d3d3d3" material-opacity={0.6} material-transparent />
      <Box position={[0, 1, 15]} args={[5, 2, 8]} material-color="#d3d3d3" material-opacity={0.6} material-transparent />
      
      {/* Ground Plane */}
      <Plane
        position={[0, -1, 0]}
        args={[50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        material-color="#f0f0f0"
      />

      {/* Trees/Green Space */}
      {greenSpace > 0 && Array.from({ length: Math.min(greenSpace / 1000, 8) }, (_, i) => (
        <group key={`tree-${i}`} position={[
          -20 + (i * 5), 
          1.5, 
          -10 + (Math.random() * 6)
        ]}>
          <Box args={[0.5, 3, 0.5]} material-color="#8B4513" position={[0, 0, 0]} />
          <Box args={[2, 2, 2]} material-color={nycColors.secondary.green} position={[0, 2.5, 0]} />
        </group>
      ))}
    </group>
  );
}

// Shadow study component
function ShadowStudy({ timeOfDay }: { timeOfDay: number }) {
  const { scene } = useThree();

  useEffect(() => {
    // Update lighting based on time of day
    scene.traverse((child) => {
      if (child instanceof THREE.DirectionalLight) {
        const intensity = Math.max(0.3, Math.sin((timeOfDay / 24) * Math.PI * 2));
        child.intensity = intensity;
        
        // Position sun based on time
        const angle = (timeOfDay / 24) * Math.PI * 2 - Math.PI / 2;
        child.position.set(
          Math.cos(angle) * 20,
          Math.sin(angle) * 20,
          0
        );
      }
    });
  }, [timeOfDay, scene]);

  return null;
}

export function Building3D({ 
  scenario, 
  viewMode = 'isometric', 
  showContext = true,
  timeOfDay = 12,
  onViewChange 
}: Building3DProps) {
  const [localTimeOfDay, setLocalTimeOfDay] = useState(timeOfDay);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([20, 15, 20]);

  const handleViewChange = (view: string) => {
    switch (view) {
      case 'street':
        setCameraPosition([0, 2, 25]);
        break;
      case 'aerial':
        setCameraPosition([0, 30, 0]);
        break;
      case 'isometric':
      default:
        setCameraPosition([20, 15, 20]);
        break;
    }
    onViewChange?.(view);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-100 to-sky-200 rounded-lg overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ 
          position: cameraPosition, 
          fov: 50 
        }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Building Model */}
        <BuildingModel 
          stories={scenario.stories}
          affordablePercentage={scenario.affordablePercentage}
          timeOfDay={localTimeOfDay}
          greenSpace={scenario.greenSpace}
        />
        
        {/* Shadow Study */}
        <ShadowStudy timeOfDay={localTimeOfDay} />
        
        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={50}
        />
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 space-y-3">
        {/* View Mode Controls */}
        <div className="bg-white rounded-lg shadow-lg p-3">
          <Label className="text-xs font-semibold mb-2 block">View Mode</Label>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={viewMode === 'isometric' ? 'default' : 'outline'}
              onClick={() => handleViewChange('isometric')}
              className={viewMode === 'isometric' ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}
            >
              <Building className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'street' ? 'default' : 'outline'}
              onClick={() => handleViewChange('street')}
              className={viewMode === 'street' ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'aerial' ? 'default' : 'outline'}
              onClick={() => handleViewChange('aerial')}
              className={viewMode === 'aerial' ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''}
            >
              <Maximize className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Time of Day Control */}
        <div className="bg-white rounded-lg shadow-lg p-3">
          <Label className="text-xs font-semibold mb-2 block">
            <Sun className="h-3 w-3 inline mr-1" />
            Time: {String(Math.floor(localTimeOfDay)).padStart(2, '0')}:{String(Math.floor((localTimeOfDay % 1) * 60)).padStart(2, '0')}
          </Label>
          <Slider
            value={[localTimeOfDay]}
            onValueChange={([value]) => setLocalTimeOfDay(value)}
            max={24}
            min={0}
            step={0.5}
            className="w-32"
          />
        </div>
      </div>

      {/* Building Info Overlay */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-64">
        <div className="flex items-center gap-2 mb-3">
          <Building className="h-5 w-5 text-nyc-blue" />
          <h3 className="font-semibold text-sm">{scenario.name}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-600">Stories</div>
            <div className="font-semibold">{scenario.stories}</div>
          </div>
          <div>
            <div className="text-gray-600">Units</div>
            <div className="font-semibold">{scenario.units}</div>
          </div>
          <div>
            <div className="text-gray-600">Affordable</div>
            <div className="font-semibold">{scenario.affordablePercentage}%</div>
          </div>
          <div>
            <div className="text-gray-600">Sq Ft</div>
            <div className="font-semibold">{(scenario.sqft / 1000).toFixed(0)}K</div>
          </div>
        </div>

        {scenario.greenSpace > 0 && (
          <div className="mt-2 pt-2 border-t">
            <Badge variant="outline" className="text-green-700 border-green-300">
              <TreePine className="h-3 w-3 mr-1" />
              Green Roof
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

// Building Comparison Component
interface BuildingComparisonProps {
  scenarios: Building3DProps['scenario'][];
  labels?: string[];
}

export function BuildingComparison({ scenarios, labels }: BuildingComparisonProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenarios.map((scenario, index) => (
        <motion.div
          key={index}
          className="relative"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedBuilding(selectedBuilding === index ? null : index)}
        >
          <div className={`h-80 border-2 rounded-lg transition-all ${
            selectedBuilding === index 
              ? 'border-nyc-blue shadow-xl' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <Building3D 
              scenario={scenario} 
              viewMode="isometric"
              showContext={false}
            />
          </div>
          
          {labels?.[index] && (
            <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-95 rounded p-2 text-center">
              <div className="text-sm font-semibold">{labels[index]}</div>
              <div className="text-xs text-gray-600">{scenario.units} units • {scenario.stories} stories</div>
            </div>
          )}

          {selectedBuilding === index && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-nyc-blue bg-opacity-10 rounded-lg flex items-center justify-center"
            >
              <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                <Building className="h-8 w-8 mx-auto mb-2 text-nyc-blue" />
                <div className="text-sm font-semibold text-nyc-blue">Selected</div>
                <div className="text-xs text-gray-600">Click to deselect</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Massing Study Component - shows building footprint and volume
export function MassingStudy({ 
  scenarios 
}: { 
  scenarios: Building3DProps['scenario'][] 
}) {
  const [selectedScenario, setSelectedScenario] = useState(0);

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5" />
        Massing Study Comparison
      </h3>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {scenarios.map((scenario, index) => (
          <Button
            key={index}
            size="sm"
            variant={selectedScenario === index ? 'default' : 'outline'}
            onClick={() => setSelectedScenario(index)}
            className={`text-xs ${
              selectedScenario === index ? 'bg-nyc-blue hover:bg-nyc-dark-blue' : ''
            }`}
          >
            Option {index + 1}
          </Button>
        ))}
      </div>

      <div className="h-96">
        <Building3D 
          scenario={scenarios[selectedScenario]}
          viewMode="isometric"
          showContext={true}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Building Volume</div>
          <div className="font-semibold">
            {(scenarios[selectedScenario].sqft / 1000).toFixed(0)}K sq ft
          </div>
        </div>
        <div>
          <div className="text-gray-600">Density</div>
          <div className="font-semibold">
            {Math.round(scenarios[selectedScenario].units / (scenarios[selectedScenario].sqft / 1000))} units/K sq ft
          </div>
        </div>
        <div>
          <div className="text-gray-600">Height</div>
          <div className="font-semibold">
            {scenarios[selectedScenario].stories * 12} feet
          </div>
        </div>
      </div>
    </div>
  );
}