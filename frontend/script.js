document.getElementById("mushroomForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh
    
    let inputs = document.querySelectorAll("#mushroomForm .grid-container .grid-item input, #mushroomForm .grid-container .grid-item select, #mushroomForm .grid-container .grid-item textarea");

    for (let input of inputs) {
        if (!input.value.trim()) {
            document.getElementById("result").textContent = "Please fill all the fields.";
            document.getElementById("result").style.color = "#FFD700";  // Light Yellow for contrast
            document.getElementById("result").style.fontWeight = "bold";  // Make text bold
            document.getElementById("result").style.fontSize = "17px";
            return;
        }
    }

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
    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received response:", data);  // Debugging
        if (data.error) {
            console.error("Server Error:", data.error);
            document.getElementById("result").textContent = "Error: " + data.error;
        } else {
            document.getElementById("result").textContent = data.prediction;
            document.getElementById("result").style.color = "#FFD700";  // Light Yellow for contrast
            document.getElementById("result").style.fontWeight = "bold";  // Make text bold
            document.getElementById("result").style.fontSize = "17px";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error in prediction. Try again.";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const detailsElements = document.querySelectorAll("details");

    detailsElements.forEach((detail) => {
        detail.addEventListener("click", function () {
            // Close all other details except the one being clicked
            detailsElements.forEach((otherDetail) => {
                if (otherDetail !== this) {
                    otherDetail.removeAttribute("open");
                }
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Select all details elements on the page
    const allDetails = document.querySelectorAll("details");

    allDetails.forEach(details => {
        const selects = details.querySelectorAll("select"); // Select all dropdowns inside each details
        const summary = details.querySelector("summary"); // Select the corresponding summary

        function checkFields() {
            let allFilled = Array.from(selects).every(select => select.value !== ""); // Check if all selects are filled

            if (allFilled) {
                summary.style.color = "white";  // Change text color
                summary.style.backgroundColor = "green"; // Change background color
                summary.style.borderRadius = "5px"; // Add rounded corners
                summary.style.padding = "5px"; // Add padding
            } else {
                summary.style.color = ""; // Reset color
                summary.style.backgroundColor = ""; // Reset background color
            }
        }

        // Attach event listeners to all select elements inside this details
        selects.forEach(select => {
            select.addEventListener("change", checkFields);
        });
    });
});
