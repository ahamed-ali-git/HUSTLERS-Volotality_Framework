from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Placeholder for file storage
file_storage = {}

# Placeholder for analysis storage
analysis_storage = {}

def register_file(file_path):
    file_id = str(uuid.uuid4())
    file_storage[file_id] = file_path
    return file_id

def start_analysis(file_id, plugin):
    analysis_id = str(uuid.uuid4())
    analysis_storage[analysis_id] = {
        "file_id": file_id,
        "plugin": plugin,
        "status": "running"
    }
    return analysis_id

@app.route('/api/memory-dump', methods=['POST'])
def upload_memory_dump():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        file_id = register_file(file_path)
        return jsonify({"status": "success", "fileId": file_id})

@app.route('/api/analyze', methods=['POST'])
def start_analysis_route():
    data = request.json
    file_id = data.get('fileId')
    plugin = data.get('plugin')
    if not file_id or not plugin:
        return jsonify({"error": "Missing fileId or plugin"}), 400
    analysis_id = start_analysis(file_id, plugin)
    return jsonify({"status": "analysis_started", "analysisId": analysis_id})

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/styles.css')
def styles():
    return send_from_directory('', 'styles.css')

@app.route('/script.js')
def script():
    return send_from_directory('', 'script.js')

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
