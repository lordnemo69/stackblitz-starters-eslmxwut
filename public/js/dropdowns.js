export async function setupDropdowns() {
  await Promise.all([
    loadDropdownOptions('origenFondos'),
    loadDropdownOptions('lugarCompra'),
    loadDropdownOptions('centroCosto')
  ]);
}

async function loadDropdownOptions(type) {
  try {
    const response = await fetch(`/api/${type}`);
    const data = await response.json();
    
    const select = document.getElementById(type);
    const newInput = document.getElementById(`nuevo${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const toggleBtn = document.getElementById(`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`);
    
    if (!select || !newInput || !toggleBtn) return;
    
    // Ensure data is an array and not empty
    if (Array.isArray(data) && data.length > 0) {
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[type];
        option.textContent = item[type];
        select.appendChild(option);
      });
    }
    
    setupToggle(select, newInput, toggleBtn);
  } catch (error) {
    console.error(`Error loading ${type} options:`, error);
  }
}

function setupToggle(select, input, button) {
  button.addEventListener('click', () => {
    const isSelect = select.style.display !== 'none';
    select.style.display = isSelect ? 'none' : 'block';
    select.required = !isSelect;
    input.style.display = isSelect ? 'block' : 'none';
    input.required = isSelect;
    button.textContent = isSelect ? 'Existente' : 'Nuevo';
  });
}