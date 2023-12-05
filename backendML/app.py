# Importing required libs
from flask import Flask, jsonify, request
from model import preprocess_img, predict_result
import os 
os.environ['TF_CPP_MIN_VLOG_LEVEL'] = '0'
from flask_cors import CORS
import base64
from io import BytesIO
import uuid
from PIL import Image

# Instantiating flask app
app = Flask(__name__)
CORS(app)

class_mapping = {
    0: 'Calendula',
    1: 'Carnation',
    2: 'Daisy',
    3: 'Rose',
    4: 'Sunflower',
    5: 'Tulip',
}

# Prediction route
@app.route('/predict', methods=['POST'])
def predict_image_file():
    try:
        if request.method == 'POST':
            base64_image = request.json['image']

        # Remove the data URI prefix if it exists
        if base64_image.startswith("data:image"):
            base64_image = base64_image.split(",")[1]

        image_data = base64.b64decode(base64_image)

        # You can use the PIL library to check the image format and size
        image = Image.open(BytesIO(image_data))
        image_format = image.format.lower()  # Get the image format (jpg, png, etc.)
        image_size = image.size  # Get the image size (width, height)

        random_filename = str(uuid.uuid4()) + f".{image_format}"
        file_path = f"images/{random_filename}"

        try:
            with open(file_path, "wb") as file:
                file.write(image_data)

            print(f"Image saved to {file_path}")
            print(f"Image format: {image_format}")
            print(f"Image size: {image_size}")
        except Exception as e:
            print(f"Error saving image: {str(e)}")        

        # Preprocess the image
        img = preprocess_img(file_path)
        pred = predict_result(img)
        pred = pred.item() if hasattr(pred, 'item') else pred
            
        if pred in class_mapping:
            predicted_class = class_mapping[pred]
            print(pred)    

        # Return prediction as JSON
        return jsonify({
            'prediction': predicted_class
        })

    except Exception as e:
        error = "File cannot be processed."
        print(error)
        return jsonify(
            {'error': str(e)}
        )

if __name__ == "__main__":
    app.run(port=9000, debug=True)
