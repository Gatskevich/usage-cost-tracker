"use client";

import React, { useCallback, useMemo } from 'react';
import merge from 'lodash/merge'; 
import { Usage } from 'src/interfaces/Usage';
import { Cost } from 'src/interfaces/Cost';
import BaseOptionChart from './BaseOptionChart';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = merge(BaseOptionChart(), { 
  stroke: { width: [1, 2, 3] }, 
  plotOptions: { bar: { columnWidth: "30%" } }, 
  fill: { type: ["solid", "solid", "gradient"], opacity: [0.5, 1, 0.7] }, 
  xaxis: { 
    type: "datetime", 
    labels: { 
      datetimeFormatter: { 
        year: "yyyy", 
        month: "MMM", 
        day: "dd", 
        hour: "HH", 
        minute: "mm", 
        second: "ss", 
      }, 
    }, 
  }, 
});

interface DataUsageCostChart {
  x: number;
  y: number;
}

interface UsageCostChart {
  usages: Usage[];
  costs: Cost[];
}

const UsageCostChart = ({ usages, costs}: UsageCostChart) => {
  const calculateTotalCostsByDate = useCallback((usages: Usage[], costs: Cost[]): DataUsageCostChart[] => {
    const totalCostsByDate: { [key: string]: number } = {};

    usages.forEach((usage) => {
      if (!usage.created_at) return;

      const [day, month, year] = usage.created_at.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      const formattedDate = date.toISOString().split('T')[0];

      const modelCost = costs.find((cost) => cost.model === usage.model);
      if (!modelCost) return;

      if (!totalCostsByDate[formattedDate]) {
        totalCostsByDate[formattedDate] = 0;
      }

      const totalCost = modelCost.input * usage.usage_input + modelCost.output * usage.usage_output;
      totalCostsByDate[formattedDate] += totalCost;
    });

    return Object.entries(totalCostsByDate).map(([date, totalCost]) => ({
      x: new Date(date).getTime(),
      y: totalCost,
    }));
  }, [usages, costs]);

  const data = useMemo(() => calculateTotalCostsByDate(usages, costs), [usages, costs, calculateTotalCostsByDate]);
    
  return (
    <div className="chart-container">
      <ReactApexChart 
        type="line" 
        series={[{
          name: "Total Cost", 
          type: "bar", 
          color: "green", 
          data: data, 
        }] as ApexAxisChartSeries | ApexNonAxisChartSeries} 
        options={chartOptions} 
        height={400}
        width={"100%"}
      /> 
    </div>
  );
};

export default UsageCostChart;
