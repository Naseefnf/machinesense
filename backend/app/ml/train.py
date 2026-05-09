import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
import json

def train_model(company_id: int, epochs: int = 10):

    # Step 1: Define paths
    data_dir = os.path.join("uploads", str(company_id))
    model_save_path = os.path.join("trained_models", f"{company_id}_model.h5")
    label_map_path = os.path.join("trained_models", f"{company_id}_labels.json")

    # Step 2: Count classes
    classes = [f for f in os.listdir(data_dir) 
               if os.path.isdir(os.path.join(data_dir, f))]
    num_classes = len(classes)

    # Step 3: Data generators
    datagen = ImageDataGenerator(
        preprocessing_function=tf.keras.applications.resnet50.preprocess_input,
        validation_split=0.2
    )

    train_data = datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode="categorical",
        subset="training"
    )

    val_data = datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode="categorical",
        subset="validation"
    )

    # Step 4: Build model
    base_model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation="relu")(x)
    output = Dense(num_classes, activation="softmax")(x)
    model = Model(inputs=base_model.input, outputs=output)

    # Step 5: Compile and train
    model.compile(
        optimizer="adam",
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )
    history = model.fit(train_data, epochs=epochs, validation_data=val_data)

    # Step 6: Save model and labels
    model.save(model_save_path)
    label_map = {v: k for k, v in train_data.class_indices.items()}
    with open(label_map_path, "w") as f:
        json.dump(label_map, f)

    # Step 7: Return results
    accuracy = round(float(history.history['accuracy'][-1]) * 100, 2)
    return {
        "accuracy": accuracy,
        "num_classes": num_classes,
        "classes": classes,
        "model_path": model_save_path
    }