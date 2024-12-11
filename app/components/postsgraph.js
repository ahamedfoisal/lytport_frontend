"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { fetchInstagramPosts } from "./instagramPosts"; // Update with the correct path

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraphGenerator() {
  const [xAxis, setXAxis] = useState(""); // State for selected X-axis
  const [yAxis, setYAxis] = useState(""); // State for selected Y-axis
  const [chartData, setChartData] = useState(null);
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    // Fetch the data once and store it in state
    async function fetchData() {
      const data = await fetchInstagramPosts();
      setDictionary(data);
    }
    fetchData();
  }, []);

  const generateGraph = () => {
    if (!xAxis || !yAxis || !dictionary) return;

    const data = [];
    const labels = [];

    if (xAxis === "Time") {
      const buckets = new Array(12).fill(0);
      const values = new Array(12).fill(0);

      for (const key in dictionary) {
        const post = dictionary[key];
        if (post.time && post[yAxis.toLowerCase()] !== undefined) {
          const [hour] = post.time.split(":").map(Number);
          const bucketIndex = Math.floor(hour / 2);
          values[bucketIndex] += post[yAxis.toLowerCase()] || 0;
          buckets[bucketIndex]++;
        }
      }

      labels.push(...Array.from({ length: 12 }, (_, i) => `${i * 2}-${i * 2 + 2}h`));
      data.push(...values.map((v, i) => (buckets[i] > 0 ? v / buckets[i] : 0)));
    }

    if (xAxis === "Day") {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const buckets = new Array(7).fill(0);
      const values = new Array(7).fill(0);

      for (const key in dictionary) {
        const post = dictionary[key];
        if (post.day && post[yAxis.toLowerCase()] !== undefined) {
          const index = days.indexOf(post.day);
          if (index !== -1) {
            values[index] += post[yAxis.toLowerCase()] || 0;
            buckets[index]++;
          }
        }
      }

      labels.push(...days);
      data.push(...values.map((v, i) => (buckets[i] > 0 ? v / buckets[i] : 0)));
    }

    if (xAxis === "Media Type") {
      const mediaTypes = {};
      for (const key in dictionary) {
        const post = dictionary[key];
        if (post.mediaType && post[yAxis.toLowerCase()] !== undefined) {
          if (!mediaTypes[post.mediaType]) {
            mediaTypes[post.mediaType] = { total: 0, count: 0 };
          }
          mediaTypes[post.mediaType].total += post[yAxis.toLowerCase()] || 0;
          mediaTypes[post.mediaType].count++;
        }
      }

      labels.push(...Object.keys(mediaTypes));
      data.push(...Object.values(mediaTypes).map((m) => m.total / m.count));
    }

    if (xAxis === "Caption") {
      const buckets = new Array(50).fill(0);
      const values = new Array(50).fill(0);
      let maxCaptionSize = 0;

      for (const key in dictionary) {
        const post = dictionary[key];
        if (post.captionSize !== undefined) {
          maxCaptionSize = Math.max(maxCaptionSize, post.captionSize);
        }
      }

      for (const key in dictionary) {
        const post = dictionary[key];
        if (post.captionSize !== undefined && post[yAxis.toLowerCase()] !== undefined) {
          const bucketIndex = Math.floor((post.captionSize / maxCaptionSize) * 50);
          values[bucketIndex] += post[yAxis.toLowerCase()] || 0;
          buckets[bucketIndex]++;
        }
      }

      labels.push(
        ...Array.from({ length: 50 }, (_, i) => `${Math.floor((i / 50) * maxCaptionSize)}-${Math.floor(((i + 1) / 50) * maxCaptionSize)}`)
      );
      data.push(...values.map((v, i) => (buckets[i] > 0 ? v / buckets[i] : 0)));
    }

    // Update chart data
    setChartData({
      labels,
      datasets: [
        {
          label: `${yAxis} vs ${xAxis}`,
          data,
          borderColor: "#0074D9",
          backgroundColor: "rgba(0, 116, 217, 0.2)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "20px", alignSelf: "flex-start" }}>Graph Generator</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <button
            onClick={() => setXAxis("Time")}
            style={{
              padding: "10px",
              backgroundColor: xAxis === "Time" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Time
          </button>
          <button
            onClick={() => setXAxis("Day")}
            style={{
              padding: "10px",
              backgroundColor: xAxis === "Day" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Day
          </button>
          <button
            onClick={() => setXAxis("Media Type")}
            style={{
              padding: "10px",
              backgroundColor: xAxis === "Media Type" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Media Type
          </button>
          <button
            onClick={() => setXAxis("Caption")}
            style={{
              padding: "10px",
              backgroundColor: xAxis === "Caption" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Caption
          </button>
        </div>
        <div>
          <button
            onClick={() => setYAxis("Likes")}
            style={{
              padding: "10px",
              backgroundColor: yAxis === "Likes" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Likes
          </button>
          <button
            onClick={() => setYAxis("Comments")}
            style={{
              padding: "10px",
              backgroundColor: yAxis === "Comments" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Comments
          </button>
          <button
            onClick={() => setYAxis("Engagement")}
            style={{
              padding: "10px",
              backgroundColor: yAxis === "Engagement" ? "#9FBFF4" : "#EAF2FF",
              border: "none",
            }}
          >
            Engagement
          </button>
        </div>
      </div>
      <button
        onClick={generateGraph}
        style={{
          padding: "10px",
          backgroundColor: "#4A90E2",
          color: "white",
          border: "none",
        }}
      >
        Generate Graph
      </button>
      {chartData && (
        <div style={{ width: "80%", marginTop: "20px" }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
                title: { display: true, text: `${yAxis} vs ${xAxis}` },
              },
              scales: {
                x: { title: { display: true, text: xAxis } },
                y: { title: { display: true, text: yAxis } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
  
}
