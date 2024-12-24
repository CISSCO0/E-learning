'use client';

import { useState } from 'react';
import axios from 'axios';

const ReportGeneration = () => {
  const [isLoading, setIsLoading] = useState<{ progress: boolean; analytics: boolean; instructorRatings: boolean }>({
    progress: false,
    analytics: false,
    instructorRatings: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string[][] | null>(null); // Parsed CSV data

  // Helper function to convert JSON response to CSV format
  const convertToCSVFormat = (data: any[]): string[][] => {
    if (!Array.isArray(data) || !data.length) return [];
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((header) => row[header] ?? ""));
    return [headers, ...rows];
  };

  // Handle CSV Download and Display
  const handleCsvDownload = async (url: string, fileName: string, reportType: string) => {
    setIsLoading((prev) => ({ ...prev, [reportType]: true }));
    setError(null);

    try {
      const response = await axios.get(url, {
        withCredentials: true, // Ensure cookies are sent if needed
        headers: { Accept: 'application/json' }, // Expect JSON format from the backend
        responseType: 'json', // Handle JSON response
      });

      // Determine if the response is in CSV format or JSON
      if (response.headers['content-type']?.includes('text/csv')) {
        // Handle CSV content directly
        const csvString = response.data;
        const csvRows = csvString.split('\n').map((row: any) => row.split(','));
        setCsvData(csvRows);

        // Create a Blob for download
        const fileURL = window.URL.createObjectURL(new Blob([csvString]));
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', fileName);
        link.click();
      } else {
        // Handle JSON response
        const reportData = response.data; // Assuming the response is JSON

        const csvFormattedData = convertToCSVFormat(reportData); // Convert JSON to CSV-like rows
        setCsvData(csvFormattedData);

        // Convert the CSV data back to a string for download
        const csvString = csvFormattedData.map((row) => row.join(',')).join('\n');
        const fileURL = window.URL.createObjectURL(new Blob([csvString]));
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', fileName);
        link.click();
      }
    } catch (err: any) {
      console.error(`Error generating ${reportType} report:`, err);
      if (err.response) {
        setError(`Failed to generate ${reportType} report. ${err.response.data.message || 'Please try again.'}`);
      } else {
        setError(`Failed to generate the ${reportType} report. Please try again.`);
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, [reportType]: false }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <h2 className="text-2xl font-bold mb-4">Report Generation</h2>

      {/* Buttons for Generating Reports */}
      <div className="space-y-4">
        {/* Progress Report Button */}
        <button
          onClick={() =>
            handleCsvDownload(
              'http://localhost:5000/progress/quiz-results/',
              'progress_report.csv',
              'progress'
            )
          }
          disabled={isLoading.progress}
          className={`px-4 py-2 rounded text-white ${
            isLoading.progress ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading.progress ? 'Generating Progress Report...' : 'Generate Progress Report'}
        </button>

        {/* Course Analytics Report Button */}
        <button
          onClick={() =>
            handleCsvDownload(
              'http://localhost:5000/courses/report/',
              'course_analytics_report.csv',
              'analytics'
            )
          }
          disabled={isLoading.analytics}
          className={`px-4 py-2 rounded text-white ${
            isLoading.analytics ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading.analytics ? 'Generating Course Analytics Report...' : 'Generate Course Analytics Report'}
        </button>
   
        {/* Instructor Ratings Report Button */}
        <button
          onClick={() =>
            handleCsvDownload(
              'http://localhost:5000/instructors/report',  // Correct URL for instructor ratings
              'instructor_ratings_report.csv',
              'instructorRatings'
            )
          }
          disabled={isLoading.instructorRatings}
          className={`px-4 py-2 rounded text-white ${
            isLoading.instructorRatings ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLoading.instructorRatings ? 'Generating Instructor Ratings Report...' : 'Generate Instructor Ratings Report'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Display CSV Data */}
      {csvData && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Report Data:</h3>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                {csvData[0].map((header, index) => (
                  <th key={index} className="border border-gray-400 px-2 py-1">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-400 px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportGeneration;
