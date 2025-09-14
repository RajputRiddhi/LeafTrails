
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import type { AqiData } from '../types';

interface AqiDisplayProps {
  aqiData: AqiData;
}

const getAqiColor = (value: number) => {
  if (value <= 50) return '#34D399'; // Green
  if (value <= 100) return '#FBBF24'; // Yellow
  if (value <= 150) return '#F97316'; // Orange
  if (value <= 200) return '#EF4444'; // Red
  if (value <= 300) return '#A855F7'; // Purple
  return '#7F1D1D'; // Maroon
};

const AqiDisplay: React.FC<AqiDisplayProps> = ({ aqiData }) => {
  const color = getAqiColor(aqiData.value);
  const data = [{ name: 'AQI', value: aqiData.value, fill: color }];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-slide-in">
      <h3 className="mb-2 text-xl font-bold text-center text-gray-800 dark:text-white">Air Quality Index (AQI)</h3>
      <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
            barSize={20}
          >
            <PolarAngleAxis
                type="number"
                domain={[0, 500]}
                angleAxisId={0}
                tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold" style={{ color: color }}>
            {aqiData.value}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">AQI</span>
        </div>
      </div>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">{aqiData.description}</p>
    </div>
  );
};

export default AqiDisplay;
