document.getElementById("mushroomForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh
    
    const odor = document.getElementById("odor").value;
    const gillColor = document.getElementById("gill-color").value;
    const gillColorFloat = parseFloat(gillColor);
    const gillSize = document.getElementById("gill-size").value;
    const ringType = document.getElementById("ring-type").value;
    
    // Extracting required features
    const features = {
        "odor_n": odor === "n" ? 1 : 0,
        "gill-color": gillColorFloat,
        "gill-size": gillSize === "n" ? 1 : 0,
        "odor_f": odor === "f" ? 1 : 0,
        "ring-type_p": ringType === "p" ? 1 : 0
    };
    
    console.log("Features sent to model:", features);
    
    // Show "Processing..." while waiting for response
    document.getElementById("result").innerText = "Processing...";

    // Send data to backend API
    fetch("http://localhost:5500/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features)
    })
    .then(response => response.json())
    .then(data => {
        // Display the prediction result in the existing <p id="result">
        document.getElementById("result").innerText = `Prediction: ${data.result}`;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error in prediction. Try again.";
    });
});
