from flask import Flask, request, jsonify
import pickle
import numpy as np
import logging

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(filename="mushroom_classification.log", level=logging.INFO,
                    format="%(asctime)s - %(levelname)s - %(message)s")

# Load the saved model
with open("mushroom_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Convert to NumPy array safely
        input_features = np.array([
            data["odor_n"], 
            float(data["gill-color"]),  
            data["gill-size"],   
            data["odor_f"], 
            data["ring-type_p"]  
        ], dtype=np.float32).reshape(1, -1)  # Ensure float type for ML model

        # Make prediction
        prediction = model.predict(input_features)
        result = "edible" if prediction[0] == 0 else "poisonous"

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
