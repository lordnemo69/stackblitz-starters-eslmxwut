// API utility functions
export async function fetchOptions(endpoint) {
  try {
    const response = await fetch(endpoint);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return [];
  }
}

export async function saveGasto(formData) {
  const response = await fetch('/api/gastos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    throw new Error('Error al guardar los datos');
  }
  
  return response.json();
}