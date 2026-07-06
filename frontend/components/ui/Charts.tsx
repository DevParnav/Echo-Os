import React from 'react';
import { motion } from 'framer-motion';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
}

// --- LINE CHART (SVG) ---
export const LineChart: React.FC<ChartProps> = ({ data, width = 500, height = 200 }) => {
  if (!data || data.length === 0) return null;

  const padding = 32;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const minVal = Math.min(...data.map((d) => d.value), 0);
  const valRange = maxVal - minVal;

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((d.value - minVal) / valRange) * chartHeight;
    return { x, y };
  });

  // Construct SVG Path String
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Path string for the filled area below the line
  const fillD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` 
    : '';

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Grids / Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="var(--color-surface)"
          strokeWidth={1.5}
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="var(--color-surface)"
          strokeWidth={1.5}
        />

        {/* Muted horizontal background grid lines */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + chartHeight * (1 - ratio)}
            x2={width - padding}
            y2={padding + chartHeight * (1 - ratio)}
            stroke="var(--color-background)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}

        {/* Shaded Area Below Line */}
        {fillD && (
          <motion.path
            d={fillD}
            fill="rgba(0,0,0,0.02)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        )}

        {/* Line Path Animation */}
        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Interactive Dots */}
        {points.map((p, idx) => (
          <g key={idx}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--color-white)"
              stroke="var(--color-primary)"
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
            />
            {/* Value Tooltip Label (Subtle hover reveal simulated or static) */}
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-sans)',
                fill: 'var(--color-secondary)',
                fontWeight: '500',
              }}
            >
              {data[idx].value}
            </text>
          </g>
        ))}

        {/* Labels below Axis */}
        {data.map((d, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          return (
            <text
              key={index}
              x={x}
              y={height - padding + 18}
              textAnchor="middle"
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-sans)',
                fill: 'var(--color-secondary)',
              }}
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// --- BAR CHART (SVG) ---
export const BarChart: React.FC<ChartProps> = ({ data, width = 500, height = 200 }) => {
  if (!data || data.length === 0) return null;

  const padding = 32;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const minVal = 0;
  const valRange = maxVal - minVal;

  const barGap = 16;
  const totalBarGapsWidth = barGap * (data.length - 1);
  const barWidth = (chartWidth - totalBarGapsWidth) / data.length;

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Horizontal baseline */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="var(--color-surface)"
          strokeWidth={1.5}
        />

        {/* Bars */}
        {data.map((d, index) => {
          const x = padding + index * (barWidth + barGap);
          const barHeight = (d.value / valRange) * chartHeight;
          const y = height - padding - barHeight;

          return (
            <g key={index}>
              {/* Animated Bar Column */}
              <motion.rect
                x={x}
                y={height - padding} // start at baseline
                width={barWidth}
                height={0}
                fill="var(--color-primary)"
                rx={4} // subtle rounded top corners
                animate={{
                  y: y,
                  height: barHeight,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.05,
                }}
                style={{
                  fill: index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                }}
              />

              {/* Value Text */}
              <motion.text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-sans)',
                  fill: 'var(--color-secondary)',
                  fontWeight: '500',
                }}
              >
                {d.value}
              </motion.text>

              {/* Axis Label */}
              <text
                x={x + barWidth / 2}
                y={height - padding + 18}
                textAnchor="middle"
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-sans)',
                  fill: 'var(--color-secondary)',
                }}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
export default LineChart;
