import express, { json } from "express";
import serveStatic from "serve-static"; // Correct way to serve static files
import axios from "axios";

const app = express();
const PORT = 5500;

// Middleware
app.use(json());
app.use(serveStatic("public")); // Serve frontend files correctly

// Route to handle prediction requests
app.post("/predict", async (req, res) => {
    try {
        // Send request to Flask API
        const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error in prediction:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
