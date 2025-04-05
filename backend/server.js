import path from "path";
import { fileURLToPath } from "url";
import express, { json } from "express";
import axios from "axios";

const app = express();
const PORT = 5500;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html for root URL "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Route to handle prediction requests
app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error in prediction:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
