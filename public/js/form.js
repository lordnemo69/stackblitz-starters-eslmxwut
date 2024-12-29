import { saveGasto } from './api.js';

export function setupForm() {
  const form = document.getElementById('expenseForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      centroCosto: document.getElementById('centroCosto').style.display !== 'none' 
        ? document.getElementById('centroCosto').value 
        : document.getElementById('nuevoCentroCosto').value,
      origenFondos: document.getElementById('origenFondos').style.display !== 'none'
        ? document.getElementById('origenFondos').value
        : document.getElementById('nuevoOrigenFondos').value,
      monto: parseInt(document.getElementById('monto').value),
      lugarCompra: document.getElementById('lugarCompra').style.display !== 'none'
        ? document.getElementById('lugarCompra').value
        : document.getElementById('nuevoLugarCompra').value
    };

    try {
      await saveGasto(formData);
      alert('Gasto registrado correctamente');
      form.reset();
      window.location.reload(); // Refresh to update chart
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}