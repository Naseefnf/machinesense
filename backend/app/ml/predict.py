import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import os

def predict_image(company_id: int, img_path: str):
    # Define paths
    model_path = os.path.join("trained_models", f"{company_id}_model.h5")
    label_map_path = os.path.join("trained_models", f"{company_id}_labels.json")

    # Check if model exists
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"No trained model found for company {company_id}")

    # Load model and label map
    loaded_model = load_model(model_path)
    with open(label_map_path) as f:
        label_map = json.load(f)

    # Load and preprocess image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = tf.keras.applications.resnet50.preprocess_input(img_array)

    # Predict
    predictions = loaded_model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    confidence = predictions[0][predicted_index] * 100
    machine_name = label_map[str(predicted_index)]

    return {
        "machine": machine_name,
        "confidence": round(float(confidence), 2)
    }