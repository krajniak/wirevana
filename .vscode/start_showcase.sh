#!/bin/bash
set -e

# Kill any existing server on port 3000
pkill -f 'python3.*http.server.*3000' || echo "No existing server to kill"

# Start the HTTP server
echo "Starting HTTP server on port 3000..."
python3 -m http.server --directory dist --bind 0.0.0.0 3000
