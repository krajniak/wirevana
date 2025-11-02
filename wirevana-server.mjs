#!/usr/bin/env node

import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);
const port = 3000;
const distDir = path.resolve(__dirname, 'dist');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ts': 'text/plain',
  '.md': 'text/plain'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

async function serveStaticFile(res, filePath) {
  try {
    const fullPath = path.join(distDir, filePath);
    const stats = await fs.stat(fullPath);
    
    if (stats.isDirectory()) {
      // Serve index.html for directories
      return serveStaticFile(res, path.join(filePath, 'index.html'));
    }
    
    const content = await fs.readFile(fullPath);
    const mimeType = getMimeType(fullPath);
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': content.length,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
}

async function buildExample(exampleFile) {
  const examplePath = path.resolve(__dirname, 'examples', exampleFile);
  
  try {
    // Run the CLI build command
    const { stdout, stderr } = await execAsync(
      `node packages/cli/dist/index.js build-canvas ./examples/${exampleFile}`,
      { cwd: __dirname }
    );
    
    if (stderr) {
      console.error('Build stderr:', stderr);
    }
    
    console.log('Build completed:', stdout);
    return { success: true, message: 'Build completed successfully' };
  } catch (error) {
    console.error('Build error:', error);
    return { success: false, message: error.message };
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = url.pathname;
  
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Handle API endpoints
  if (pathname === '/api/build-example' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { example } = JSON.parse(body);
        console.log(`Building example: ${example}`);
        
        const result = await buildExample(example);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: error.message }));
      }
    });
    return;
  }
  
  // Serve static files
  const filePath = pathname === '/' ? 'index.html' : pathname.slice(1);
  await serveStaticFile(res, filePath);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Wirevana server running at http://localhost:${port}`);
  console.log(`📁 Serving files from: ${distDir}`);
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});