// Placeholder images for different chart types
export const CHART_PLACEHOLDERS = {
  bar: '/bargraph.jpeg',
  line: '/linegraph.jpg',
  pie: '/piechart.jpeg',
} as const;

export const REPORT_PLACEHOLDER = '/Generatedreport.pdf';

// Helper function to get placeholder image based on chart type
export function getChartPlaceholder(chartType: string): string {
  return CHART_PLACEHOLDERS[chartType as keyof typeof CHART_PLACEHOLDERS];
}
