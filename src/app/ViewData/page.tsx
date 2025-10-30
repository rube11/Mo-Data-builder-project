'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { supabase } from '@/lib/supabase';

interface visualizationProps {
  id: string;
  title: string;
  uploaded_image_url: string;
  chart_type: string;
  generated_chart_url: string;
  description: string | null;
}

type ViewMode = 'grid' | 'table';

const ViewDataPage = () => {
  const [visualizations, setVisualizations] = useState<visualizationProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchVisualizations();
  }, []);

  const fetchVisualizations = async () => {
    try {
      const { data, error } = await supabase
        .from('visualizations')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setVisualizations(data || []);
    } catch (error) {
      console.error('Error fetching visualizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    setDeleteLoading(id);
    try {
      // Extract filename from URL for storage deletion
      const fileName = fileUrl.split('/').pop();
      
      // Delete from storage if filename exists
      if (fileName) {
        await supabase.storage.from('excel-files').remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from('visualizations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state
      setVisualizations(prev => prev.filter(viz => viz.id !== id));
      alert('Report deleted successfully!');
    } catch (error) {
      console.error('Error deleting visualization:', error);
      alert('Failed to delete report. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="font-[family-name:var(--font-family-body)] min-h-screen flex flex-col">
      <Navbar activePage="view" />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-family-header)]">Recent Reports</h1>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-secondary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'table'
                  ? 'bg-secondary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">Loading reports...</p>
          </div>
        ) : visualizations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No reports generated yet</p>
            <a href="/generateData" className="text-secondary hover:underline">
              Create your first report →
            </a>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visualizations.map((viz) => (
                  <div
                    key={viz.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-primary"
                  >
                    {/* Chart Preview Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={viz.generated_chart_url} 
                        alt={`${viz.chart_type} chart for ${viz.title}`}
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600 capitalize">
                        {viz.chart_type}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 font-[family-name:var(--font-family-header)]">{viz.title}</h3>
                        <button
                          onClick={() => handleDelete(viz.id, viz.uploaded_image_url)}
                          disabled={deleteLoading === viz.id}
                          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                          title="Delete report"
                        >
                          {deleteLoading === viz.id ? (
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>

                      <div className="space-y-2 text-sm">
                        {viz.description && (
                          <p>
                            <span className="font-medium text-gray-600">Focus:</span>{' '}
                            <span className="text-gray-700">{viz.description}</span>
                          </p>
                        )}
                        <a
                          href="/Generatedreport.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-secondary hover:underline"
                        >
                          Download Generated Report →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto bg-primary rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chart Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary divide-y divide-gray-200">
                    {visualizations.map((viz) => (
                      <tr key={viz.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={viz.generated_chart_url} 
                            alt={`${viz.chart_type} preview`}
                            className="w-20 h-20 object-contain rounded border border-gray-200"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{viz.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                            {viz.chart_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {viz.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a
                            href="/Generatedreport.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline"
                          >
                            Download Report
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(viz.id, viz.uploaded_image_url)}
                            disabled={deleteLoading === viz.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {deleteLoading === viz.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewDataPage;