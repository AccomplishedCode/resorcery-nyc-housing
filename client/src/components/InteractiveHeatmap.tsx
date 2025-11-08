import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { nycColors } from '@/lib/nyc-design-system';

interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
  neighborhood: string;
  change?: number;
}

interface InteractiveHeatmapProps {
  data: HeatmapDataPoint[];
  width?: number;
  height?: number;
  metric: string;
  showComparison?: boolean;
  beforeData?: HeatmapDataPoint[];
}

export function InteractiveHeatmap({ 
  data, 
  width = 600, 
  height = 400, 
  metric,
  showComparison = false,
  beforeData = []
}: InteractiveHeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<HeatmapDataPoint | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y) as [number, number])
      .range([innerHeight, 0]);

    const valueScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value) as [number, number])
      .range([0, 1]);

    // Create color scale based on metric
    const getColorScale = () => {
      switch (metric) {
        case 'Population Density':
          return d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);
        case 'School Capacity':
          return d3.scaleSequential(d3.interpolateGreens).domain([0, 1]);
        case 'Transit Usage':
          return d3.scaleSequential(d3.interpolateOranges).domain([0, 1]);
        case 'Economic Activity':
          return d3.scaleSequential(d3.interpolatePurples).domain([0, 1]);
        default:
          return d3.scaleSequential(d3.interpolateViridis).domain([0, 1]);
      }
    };

    const colorScale = getColorScale();

    // Main container
    const container = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create hexagon generator for more interesting heatmap cells
    const hexRadius = Math.min(innerWidth / 20, innerHeight / 15);
    const hexagon = (radius: number) => {
      const angles = d3.range(6).map(i => (i * Math.PI) / 3);
      return angles.map(angle => [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ]);
    };

    // Add heatmap cells
    const cells = container.selectAll('.heatmap-cell')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'heatmap-cell')
      .attr('transform', d => `translate(${xScale(d.x)}, ${yScale(d.y)})`);

    cells.append('polygon')
      .attr('points', hexagon(hexRadius).map(d => d.join(',')).join(' '))
      .attr('fill', d => colorScale(valueScale(d.value)))
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        setHoveredPoint(d);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1.2)')
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);
      })
      .on('mouseout', function() {
        setHoveredPoint(null);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1)')
          .attr('stroke', 'rgba(255,255,255,0.2)')
          .attr('stroke-width', 1);
      });

    // Add comparison indicators if showing before/after
    if (showComparison && beforeData.length) {
      cells.each(function(d, i) {
        const beforeValue = beforeData[i]?.value || d.value;
        const change = d.value - beforeValue;
        const changePercent = beforeValue > 0 ? (change / beforeValue) * 100 : 0;
        
        if (Math.abs(changePercent) > 5) {
          d3.select(this)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.3em')
            .attr('font-size', '10px')
            .attr('fill', change > 0 ? '#22c55e' : '#ef4444')
            .attr('font-weight', 'bold')
            .text(change > 0 ? '↑' : '↓');
        }
      });
    }

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    container.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#6b7280');

    container.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#6b7280');

    // Add color legend
    const legendWidth = 200;
    const legendHeight = 10;
    
    const legendScale = d3.scaleLinear()
      .domain([0, legendWidth])
      .range([0, 1]);

    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - 20}, 20)`);

    const legendGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', `legend-gradient-${metric.replace(/\s+/g, '-')}`)
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '0%');

    legendGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter().append('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => colorScale(d));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', `url(#legend-gradient-${metric.replace(/\s+/g, '-')})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', -5)
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text('Low');

    legend.append('text')
      .attr('x', legendWidth)
      .attr('y', -5)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .text('High');

  }, [data, width, height, metric, showComparison, beforeData]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="overflow-visible" />
      
      {/* Tooltip */}
      {hoveredPoint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bg-white rounded-lg shadow-xl p-3 pointer-events-none z-10 border"
          style={{ 
            left: `${(hoveredPoint.x / 100) * width}px`,
            top: `${height - (hoveredPoint.y / 100) * height - 60}px`
          }}
        >
          <div className="text-sm font-semibold text-gray-900">{hoveredPoint.neighborhood}</div>
          <div className="text-xs text-gray-600">{metric}: {hoveredPoint.value.toFixed(1)}</div>
          {hoveredPoint.change !== undefined && (
            <div className={`text-xs font-medium ${
              hoveredPoint.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {hoveredPoint.change > 0 ? '+' : ''}{hoveredPoint.change.toFixed(1)}% change
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}