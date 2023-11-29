# Importing required libs
from flask import Flask, jsonify, request
from model import preprocess_img, predict_result
from flask_cors import CORS

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
            img = preprocess_img(request.files['file'].stream)
            pred = predict_result(img)
            pred = pred.item() if hasattr(pred, 'item') else pred
            
            if pred in class_mapping:
                predicted_class = class_mapping[pred]
                print(pred) 
            else:
                predicted_class = 'Unknown'    

            # Return prediction as JSON
            return jsonify({
                'prediction' : predicted_class}
            )

    except Exception as e:
        error = "File cannot be processed."
        print(error)
        return jsonify(
            {'error': str(e)}
        )

if __name__ == "__main__":
    app.run(port=9000, debug=True)
