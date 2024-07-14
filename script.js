document.addEventListener('DOMContentLoaded', function() {
    const pluginList = document.getElementById('plugin-list');
    const fileUpload = document.getElementById('file-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const runAnalysisBtn = document.getElementById('run-analysis-btn');
    const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];

    const plugins = [
        'atoms', 'callbacks', 'clipboard', 'connections', 'connscan', 'dllist', 'getsids',
        'pslist', 'sockets'
    ];

    // Populate plugin list
    plugins.forEach(plugin => {
        const li = document.createElement('li');
        li.textContent = plugin;
        li.addEventListener('click', () => selectPlugin(li));
        pluginList.appendChild(li);
    });

    function selectPlugin(element) {
        document.querySelectorAll('#plugin-list li').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
        runAnalysisBtn.disabled = false;
    }

    uploadBtn.addEventListener('click', () => fileUpload.click());

    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadMemoryDump(file);
        }
    });

    runAnalysisBtn.addEventListener('click', runAnalysis);

    function uploadMemoryDump(file) {
        // Simulate file upload
        console.log(`Uploading file: ${file.name}`);
        // In a real application, you would send this file to your server
        setTimeout(() => {
            alert('Memory dump uploaded successfully!');
        }, 1500);
    }

    function runAnalysis() {
        const selectedPlugin = document.querySelector('#plugin-list li.active');
        if (selectedPlugin) {
            // Simulate analysis
            console.log(`Running analysis with plugin: ${selectedPlugin.textContent}`);
            // In a real application, you would send a request to your server to run the analysis
            setTimeout(() => {
                displayResults(generateMockResults());
            }, 2000);
        }
    }

    function displayResults(results) {
        resultsTable.innerHTML = '';
        results.forEach(result => {
            const row = resultsTable.insertRow();
            Object.values(result).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });
    }

    function generateRandomOffset() {
        return Math.floor(Math.random() * 10000000000).toString();
    }
    
    function generateRandomIP() {
        return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
    }
    
    function generateRandomPort() {
        return Math.floor(Math.random() * 65535);
    }
    
    function generateMockResults() {
        // Generate some mock results with random numbers
        return [
            { id: 1, rowParent: 0, offset: generateRandomOffset(), localAddress: `${generateRandomIP()}:${generateRandomPort()}`, remoteAddress: `${generateRandomIP()}:${generateRandomPort()}`, pid: Math.floor(Math.random() * 10000) },
            { id: 2, rowParent: 0, offset: generateRandomOffset(), localAddress: `${generateRandomIP()}:${generateRandomPort()}`, remoteAddress: `${generateRandomIP()}:${generateRandomPort()}`, pid: Math.floor(Math.random() * 10000) },
            { id: 3, rowParent: 0, offset: generateRandomOffset(), localAddress: `${generateRandomIP()}:${generateRandomPort()}`, remoteAddress: `${generateRandomIP()}:${generateRandomPort()}`, pid: Math.floor(Math.random() * 10000) },
            { id: 4, rowParent: 0, offset: generateRandomOffset(), localAddress: `${generateRandomIP()}:${generateRandomPort()}`, remoteAddress: `${generateRandomIP()}:${generateRandomPort()}`, pid: Math.floor(Math.random() * 10000) },
            { id: 5, rowParent: 0, offset: generateRandomOffset(), localAddress: `${generateRandomIP()}:${generateRandomPort()}`, remoteAddress: `${generateRandomIP()}:${generateRandomPort()}`, pid: Math.floor(Math.random() * 10000) }
        ];
    }
    
});