
"use client";


import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4A90E2", "#F5A623", "#50E3C2", "#9013FE", "#B8E986"]; // Color palette for chart

export default function PostTypes( {metricsData}) {

  if (!metricsData || !metricsData.postTypes || metricsData.postTypes.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center">
        <p>No post types data available</p>
      </div>
    );
  }
  const postTypes = metricsData.postTypes
  //if (!postTypes.length) return <div>Loading...</div>; // Loading state while fetching data

  // Calculate total posts for percentage computation
  const totalPosts = postTypes.reduce((sum, post) => sum + post.value, 0);

  // Add percentages and colors to the data
  const formattedData = postTypes.map((post, index) => ({
    ...post,
    percentage: ((post.value / totalPosts) * 100).toFixed(1) + "%",
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">📸 Post types</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Donut Chart */}
        <div className="flex-1 flex justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <tbody>
              {formattedData.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50"
                  style={{
                    backgroundColor: entry.color,
                    color: "#fff",
                    borderBottom: "2px solid #fff",
                  }}
                >
                  <td className="py-2 px-4 text-sm font-bold">{entry.percentage}</td>
                  <td className="py-2 px-4 text-sm">{entry.name}</td>
                  <td className="py-2 px-4 text-sm font-bold">{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
