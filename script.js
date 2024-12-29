document.getElementById('dataForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    centroCosto: document.getElementById('centroCosto').value,
    origenFondos: document.getElementById('origenFondos').value,
    monto: parseInt(document.getElementById('monto').value),
    proyecto: document.getElementById('proyecto').value
  };

  console.log('Datos del formulario:', formData);
  // Aquí puedes agregar la lógica para enviar los datos al servidor
});