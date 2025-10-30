'use client';

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { supabase } from '@/lib/supabase';
import { getChartPlaceholder } from '@/lib/placeholders';
import { useRouter } from 'next/navigation';
import Footer from '../components/footer';

type ChartType = 'bar' | 'line' | 'pie';

const GenerateDataPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const steps = [
    { number: 1, name: 'Report Details' },
    { number: 2, name: 'Upload Data' },
    { number: 3, name: 'Generate' }
  ];

  // function to handle file upload 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setUploadedFile(file);
        setError('');
      } else {
        setError('Please upload an Excel file (.xlsx or .xls)');
        setUploadedFile(null);
      }
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile) {
      setError('Failed to Upload File');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}_${uploadedFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('excel-files')
        .upload(fileName, uploadedFile);

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file
      const { data: urlData } = supabase
        .storage
        .from('excel-files')
        .getPublicUrl(fileName);

      const fileUrl = urlData.publicUrl;

      // Create JSON object with all the data
      const jsonData = {
        title,
        chart_type: chartType,
        uploaded_file_url: fileUrl,
        uploaded_file_name: uploadedFile.name,
        description: description || null,
      };

      // Save to database
      const { data, error: dbError } = await supabase
        .from('visualizations')
        .insert([
          {
            title,
            chart_type: chartType,
            uploaded_image_url: fileUrl,
            generated_chart_url: getChartPlaceholder(chartType),
            description: description || null,
          }
        ])
        .select();

      if (dbError) throw dbError;

      // Save JSON file to server
      const saveResponse = await fetch('/api/save-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      const saveResult = await saveResponse.json();
      
      if (!saveResult.success) {
        console.error('Failed to save JSON file:', saveResult.message);
      }

      // reset form after success 
      alert(`Data saved successfully! JSON saved to: ${saveResult.path}`);
      
      // Redirect to view page after saving data
      router.push('/viewData');
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceedFromStep1 = title.trim() !== '';
  const canProceedFromStep2 = uploadedFile !== null;

  return (
    <div className="font-[family-name:var(--font-family-body)] md:pb-96">
      <Navbar/>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-[family-name:var(--font-family-header)]">Generate Data Report</h1>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative px-5">
            {/* Progress Line */}
            <div className="absolute top-5 left-5 right-5 h-1 bg-accent -z-10">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Step Indicators */}
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-secondary text-primary'
                      : 'bg-accent text-primary'
                  }`}
                >
                  {step.number}
                </div>
                <span className="mt-2 text-sm font-medium">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="bg-primary rounded-lg shadow-lg p-8">
          {/* Step 1: Report Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6 font-[family-name:var(--font-family-header)]">Report Details</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Report Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter report title"
                  className="w-full px-4 py-3 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Chart Type</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['bar', 'line', 'pie'] as ChartType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`py-4 px-6 rounded-lg border-2 font-medium capitalize transition-all ${
                        chartType === type
                          ? 'border-secondary bg-secondary text-primary'
                          : 'border-accent hover:border-secondary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedFromStep1}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    canProceedFromStep1
                      ? 'bg-secondary text-primary hover:shadow-lg'
                      : 'bg-accent text-primary cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Upload Data */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6 font-[family-name:var(--font-family-header)]">Upload Your Data</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Excel File (.xlsx or .xls)</label>
                <div className="border-2 border-dashed border-accent rounded-lg p-8 text-center hover:border-secondary transition-colors">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {uploadedFile ? (
                      <div>
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-2 font-medium text-green-600">{uploadedFile.name}</p>
                        <p className="text-sm text-accent">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 font-medium">Click to upload</p>
                        <p className="text-sm text-accent">Excel files only (.xlsx, .xls)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-3 border-2 border-accent rounded-lg font-semibold hover:border-secondary transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedFromStep2}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    canProceedFromStep2
                      ? 'bg-secondary text-primary hover:shadow-lg'
                      : 'bg-accent text-accent cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Description & Generate */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6 font-[family-name:var(--font-family-header)]">Final Details</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Report Focus (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., 'Highlight key trends', 'Focus on quarterly comparisons', etc."
                  rows={4}
                  className="w-full px-4 py-3 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <h3 className="font-semibold mb-3 font-[family-name:var(--font-family-header)]">Summary</h3>
                <p><span className="font-medium">Title:</span> {title}</p>
                <p><span className="font-medium">Chart Type:</span> {chartType}</p>
                <p><span className="font-medium">File:</span> {uploadedFile?.name}</p>
                {description && <p><span className="font-medium">Focus:</span> {description}</p>}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3 border-2 border-accent rounded-lg font-semibold hover:border-secondary transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    loading
                      ? 'bg-accent text-primary cursor-not-allowed'
                      : 'bg-secondary text-primary hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {loading ? 'Saving...' : 'Generate Report'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
   </div>
  );
};

export default GenerateDataPage;