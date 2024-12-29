export async function initChart() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    
    // Handle empty data case
    if (!data || data.length === 0) {
      const ctx = document.getElementById('expensesChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Total por Centro de Costo',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      return;
    }
    
    const labels = data.map(item => item.centroCosto);
    const values = data.map(item => item.totalMonto);

    const ctx = document.getElementById('expensesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total por Centro de Costo',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error loading chart data:', error);
    // Show empty chart on error
    const ctx = document.getElementById('expensesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Total por Centro de Costo',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}