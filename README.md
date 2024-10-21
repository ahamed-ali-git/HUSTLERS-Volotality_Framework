# Web Interface for Volatility Framework

This is a web-based interface for the Volatility Framework, designed to simplify memory dump analysis. It provides an easy-to-use frontend for uploading memory dumps, selecting analysis plugins, and viewing results.

## Features

- Upload memory dump files
- Select from a variety of Volatility plugins
- Run analysis on uploaded memory dumps
- View and interpret analysis results
- RESTful API for integration with other tools

## Technology Stack

- Frontend: React.js
- Backend: Flask (Python)
- Database: SQLite with SQLAlchemy ORM
- Additional libraries: axios, flask-cors

## Setup and Installation

1. Clone the repository:

2. Install backend dependencies: 
pip install -r requirements.txt

3. Start the backend server:
python app.py

4. Access the application at `http://localhost:5000`

## Usage

1. Upload a memory dump file using the file upload button.
2. Select a Volatility plugin from the list of supported plugins.
3. Click "Run Analysis" to start the analysis process.
4. View the results in the results table.

## API Endpoints

- `POST /api/memory-dump`: Upload a memory dump file
- `POST /api/analyze`: Start analysis on an uploaded file
- `GET /api/plugins`: Get a list of supported plugins

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

Copyright (c) 2024 HUSTLERS.dev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
