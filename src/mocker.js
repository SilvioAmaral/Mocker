const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

function getFilename(req) {
    const file = path.join(config.folderPath, req.url, `${req.method}.json`);
    console.log(file);
    return file;
}

function saveFile(filename, data) {
    const directoryPath = path.dirname(filename);
  
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true }); // Create multi-level directories if they don't exist
    }
  
    fs.writeFileSync(filename, data, 'utf8');
  }

const server = http.createServer((req, res) => {
    if (!!config.proxy) {
        // Forward the request to another server
        const forwardConfig = config.forward;
        const forwardReq = http.request({
            hostname: forwardConfig.hostname,
            port: forwardConfig.port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        });

        forwardReq.on('response', (forwardRes) => {
            const responseChunks = [];
            forwardRes.on('data', (chunk) => {
                responseChunks.push(chunk);
            });

            forwardRes.on('end', () => {
                res.writeHead(forwardRes.statusCode, forwardRes.headers);
                res.end(Buffer.concat(responseChunks));

                if (forwardConfig.saveResponseToFile) {
                    const filename = getFilename(req);
                    saveFile(filename, Buffer.concat(responseChunks).toString('utf8'));
        
                }
            });
        });

        forwardReq.on('error', (error) => {
            res.statusCode = 500;
            res.end('Forwarding error: ' + error.message);
        });

        req.pipe(forwardReq);
    } else {
        // Read from a file 
        const filename = getFilename(req);

        if (fs.existsSync(filename)) {
            try {
                const data = fs.readFileSync(filename, 'utf8');
                res.setHeader('Content-Type', 'text/plain');
                res.end(data);
            } catch (err) {
                res.statusCode = 500;
                res.end('Internal server error');
            }
        } else {
            res.statusCode = 404;
            res.end('File not found');
        }
    }
});

const port = 3000; // Change this to the desired port number
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
