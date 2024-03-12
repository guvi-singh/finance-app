function runSimulation() {
  const C = parseFloat(document.getElementById("cost").value);
  const initialER = parseFloat(document.getElementById("exchange-rate").value);
  const SP = parseFloat(document.getElementById("price").value);
  const CPMR = parseFloat(document.getElementById("cpmr").value);
  const EF = parseFloat(document.getElementById("fluctuation").value);
  const iterations = parseInt(document.getElementById("iterations").value);

  let exchangeRate = initialER;
  let resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  for (let i = 0; i < iterations; i++) {
    // Randomly fluctuate exchange rate within the specified range
    exchangeRate += (Math.random() * 2 - 1) * EF * initialER;

    // Adjust selling price based on updated exchange rate
    const newSP = (1 + CPMR) * C / exchangeRate;

    // Calculate new Cost-Pricing Margin Ratio
    const newCPMR = (newSP - C) / newSP;

    // Create table row for the current iteration
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${exchangeRate.toFixed(2)}</td>
      <td>${newSP.toFixed(2)}</td>
      <td>${newCPMR.toFixed(2)}</td>
    `;

    // Append row to table body
    resultsBody.appendChild(row);
  }
}

// Run simulation when any input field changes
document.querySelectorAll("input[type='number']").forEach(input => {
  input.addEventListener("input", runSimulation);
});

// Initial simulation run
runSimulation();
