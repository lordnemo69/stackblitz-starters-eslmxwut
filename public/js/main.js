import { initChart } from './chart.js';
import { setupForm } from './form.js';
import { setupDropdowns } from './dropdowns.js';

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    initChart(),
    setupDropdowns()
  ]);
  setupForm();
});