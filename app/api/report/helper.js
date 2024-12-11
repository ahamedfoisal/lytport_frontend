export default function generateCharts(selectedTiles, data) {
    let chartsHTML = "";
  
    if (selectedTiles.includes("Impressions")) {
      const impressionsData = data.monthlyImpressions.dailyImpressions;
      const labels = impressionsData.map((entry) => entry.date);
      const values = impressionsData.map((entry) => entry.impressions);
  
      chartsHTML += `
        <h3>Impressions Over Time</h3>
        <canvas id="impressionsChart" width="800" height="400"></canvas>
        <script>
          const ctxImpressions = document.getElementById('impressionsChart').getContext('2d');
          new Chart(ctxImpressions, {
            type: 'line',
            data: {
              labels: ${JSON.stringify(labels)},
              datasets: [{
                label: 'Daily Impressions',
                data: ${JSON.stringify(values)},
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { beginAtZero: true, title: { display: true, text: 'Impressions' } }
              }
            }
          });
        </script>
      `;
    }
  
    if (selectedTiles.includes("Reach")) {
      const reachData = data.reach.reach7Days;
      const labels = reachData.map((entry) => entry.date);
      const values = reachData.map((entry) => entry.reach);
  
      chartsHTML += `
        <h3>Reach Over the Last 7 Days</h3>
        <canvas id="reachChart" width="800" height="400"></canvas>
        <script>
          const ctxReach = document.getElementById('reachChart').getContext('2d');
          new Chart(ctxReach, {
            type: 'line',
            data: {
              labels: ${JSON.stringify(labels)},
              datasets: [{
                label: 'Daily Reach',
                data: ${JSON.stringify(values)},
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { beginAtZero: true, title: { display: true, text: 'Reach' } }
              }
            }
          });
        </script>
      `;
    }
  
    if (selectedTiles.includes("FollowersByCountry")) {
      const demographicsData = data.followerDemographics.slice(0,6);
      const labels = demographicsData.map((entry) => entry.country);
      const values = demographicsData.map((entry) => entry.count);
  
      chartsHTML += `
        <h3>Follower Demographics</h3>
        <canvas id="demographicsChart" width="800" height="400"></canvas>
        <script>
          const ctxDemographics = document.getElementById('demographicsChart').getContext('2d');
          new Chart(ctxDemographics, {
            type: 'bar',
            data: {
              labels: ${JSON.stringify(labels)},
              datasets: [{
                label: 'Follower Count',
                data: ${JSON.stringify(values)},
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              indexAxis: 'y',
              scales: {
                x: { beginAtZero: true, title: { display: true, text: 'Follower Count' } },
                y: { title: { display: true, text: 'Country' } }
              }
            }
          });
        </script>
      `;
    }
  
    return chartsHTML;
  }
  