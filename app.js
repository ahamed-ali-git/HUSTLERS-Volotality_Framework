import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [plugins, setPlugins] = useState([]);
  const [selectedPlugin, setSelectedPlugin] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Fetch supported plugins
    axios.get('/api/plugins')
      .then(response => setPlugins(response.data))
      .catch(error => console.error('Error fetching plugins:', error));
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/api/memory-dump', formData)
      .then(response => {
        console.log('File uploaded:', response.data);
        // Start analysis or update UI
      })
      .catch(error => console.error('Error uploading file:', error));
  };

  const runAnalysis = () => {
    if (!selectedPlugin) return;

    axios.post('/api/analyze', { fileId: 'LATEST_FILE_ID', plugin: selectedPlugin })
      .then(response => {
        console.log('Analysis started:', response.data);
        // Poll for results or update UI
      })
      .catch(error => console.error('Error starting analysis:', error));
  };

  return (
    <div className="App">
      <h1>EVOLVE - Web Interface for Volatility Framework</h1>
      <input type="file" onChange={handleFileUpload} />
      <select value={selectedPlugin} onChange={(e) => setSelectedPlugin(e.target.value)}>
        {plugins.map(plugin => (
          <option key={plugin} value={plugin}>{plugin}</option>
        ))}
      </select>
      <button onClick={runAnalysis}>Run Analysis</button>
      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;