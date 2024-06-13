"use client";

import { ApexOptions } from "apexcharts"; 

const theme = {
  palette: {
    primary: {
      main: '#00A5E3'
    },
    text: {
      secondary: '#757575',
      primary: '#212121',
      disabled: '#BDBDBD'
    },
    divider: '#E0E0E0',
    background: {
      paper: '#FFFFFF'
    },
    grey: {
      500: '#9E9E9E'
    }
  },
  typography: {
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    fontFamily: 'Arial, sans-serif'
  },
  breakpoints: {
    values: {
      sm: 600,
      md: 960,
    }
  }
};

export default function BaseOptionChart(): ApexOptions { 
  const LABEL_TOTAL = { 
    show: true, 
    label: "Total", 
    color: theme.palette.text.secondary, 
    fontSize: theme.typography.subtitle2.fontSize as string, 
    fontWeight: theme.typography.subtitle2.fontWeight, 
    lineHeight: theme.typography.subtitle2.lineHeight, 
  }; 
 
  const LABEL_VALUE = { 
    offsetY: 8, 
    color: theme.palette.text.primary, 
    fontSize: theme.typography.h3.fontSize as string, 
    fontWeight: theme.typography.h3.fontWeight, 
    lineHeight: theme.typography.h3.lineHeight, 
  }; 
 
  return { 
    // Colors 
    colors: [theme.palette.primary.main], 
 
    // Chart 
    chart: { 
      toolbar: { show: false }, 
      zoom: { enabled: false }, 
      // animations: { enabled: false }, 
      foreColor: theme.palette.text.disabled, 
      fontFamily: theme.typography.fontFamily, 
    }, 
 
    // States 
    states: { 
      hover: { 
        filter: { 
          type: "lighten", 
          value: 0.04, 
        }, 
      }, 
      active: { 
        filter: { 
          type: "darken", 
          value: 0.88, 
        }, 
      }, 
    }, 
 
    // Fill 
    fill: { 
      opacity: 1, 
      gradient: { 
        type: "vertical", 
        shadeIntensity: 0, 
        opacityFrom: 0.4, 
        opacityTo: 0, 
        stops: [0, 100], 
      }, 
    }, 
 
    // Datalabels 
    dataLabels: { enabled: false }, 
 
    // Stroke 
    stroke: { 
      width: 3, 
      curve: "smooth", 
      lineCap: "round", 
    }, 
 
    // Grid 
    grid: { 
      strokeDashArray: 3, 
      borderColor: theme.palette.divider, 
    }, 
 
    // Xaxis 
    xaxis: { 
      axisBorder: { show: false }, 
      axisTicks: { show: false }, 
    }, 
 
    // Markers 
    markers: { 
      size: 0, 
      strokeColors: theme.palette.background.paper, 
    }, 
 
    // Tooltip 
    tooltip: { 
      x: { 
        show: false, 
      }, 
    }, 
 
    // Legend 
    legend: { 
      show: true, 
      fontSize: String(13), 
      position: "top", 
      horizontalAlign: "right", 
      markers: { 
        radius: 12, 
      }, 
      fontWeight: 500, 
      itemMargin: { horizontal: 12 }, 
      labels: { 
        colors: theme.palette.text.primary, 
      }, 
    }, 
 
    // plotOptions 
    plotOptions: { 
      // Bar 
      bar: { 
        columnWidth: "28%", 
        borderRadius: 4, 
      }, 
      // Pie + Donut 
      pie: { 
        donut: { 
          labels: { 
            show: true, 
            value: LABEL_VALUE, 
            total: LABEL_TOTAL, 
          }, 
        }, 
      }, 
      // Radialbar 
      radialBar: { 
        track: { 
          strokeWidth: "100%", 
          background: theme.palette.grey[500], 
        }, 
        dataLabels: { 
          value: LABEL_VALUE, 
          total: LABEL_TOTAL, 
        }, 
      }, 
      // Radar 
      radar: { 
        polygons: { 
          fill: { colors: ["transparent"] }, 
          strokeColors: theme.palette.divider, 
          connectorColors: theme.palette.divider, 
        }, 
      }, 
      // polarArea 
      polarArea: { 
        rings: { 
          strokeColor: theme.palette.divider, 
        }, 
        spokes: { 
          connectorColors: theme.palette.divider, 
        }, 
      }, 
    }, 
 
    // Responsive 
    responsive: [ 
      { 
        // sm 
        breakpoint: theme.breakpoints.values.sm, 
        options: { 
          plotOptions: { bar: { columnWidth: "40%" } }, 
        }, 
      }, 
      { 
        // md
        breakpoint: theme.breakpoints.values.md, 
        options: { 
          plotOptions: { bar: { columnWidth: "32%" } }, 
        }, 
      }, 
    ], 
  }; 
}