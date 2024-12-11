import dynamic from 'next/dynamic'; // Dynamically import React-Plotly to avoid SSR issues
import React from 'react';
import LoadingSpinner from '../loader';
import { useState, useEffect } from 'react';

// Dynamically import React-Plotly.js to work with Next.js SSR
const Plot = dynamic(() => import('react-plotly.js').then((mod) => mod.default), {
    ssr: false,
  });

const InteractiveGraph = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
    async function fetchData() {
        try {
        const response = await fetch('/api/insight/trendyCaption');
        const result = await response.json();
        setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetch completes
        }
    }

    fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
            </div>
        );
    }

  return (
    <>
        {data && data.length > 0 ? (
            <Plot
            data={[
                {
                x: data.map((item) => item.month_day), // X-axis: Day-Month
                y: data.map((item) => item.engagement_ratio), // Y-axis: Engagement Ratio
                text: data.map((item) => item.hashtags.join(', ')), // Hover data: Hashtags
                hoverinfo: 'x+y+text',
                mode: 'lines+markers',
                type: 'scatter', // Line graph
                line: { shape: 'linear', width: 2, color: '#636EFA' }, // Styling the line
                },
            ]}
            layout={{
                title: 'Trendy Captions Engagement Over Days',
                xaxis: {
                title: 'Month-Day',
                type: 'category', // Ensure days are treated as categories
                rangeslider: { visible: true }, // Enable slider bar
                },
                yaxis: {
                title: 'Engagement Ratio',
                },
                hovermode: 'x unified', // Unified hover mode to show data on hover
                margin: { t: 50, b: 40, l: 50, r: 10 }, // Adjust margins
            }}
            config={{
                responsive: true, // Make the graph responsive
                displayModeBar: true, // Enable the toolbar for interactions
            }}
            style={{ width: '100%', height: '100%' }}
            />
        ) : (
            <p>No data available.</p>
        )}
    </>
  );

};

export default InteractiveGraph;
