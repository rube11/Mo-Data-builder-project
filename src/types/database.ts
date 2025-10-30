export interface Visualization {
  id: string;
  title: string;
  uploaded_image_url: string;
  chart_type: 'bar' | 'line' | 'pie';
  generated_chart_url: string;
  description: string | null;
}

export type NewVisualization = Omit<Visualization, 'id' | 'generated_chart_url'> & {
  generated_chart_url?: string;
  description?: string | null;
};
