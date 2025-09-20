#!/bin/bash

# Build the frontend
echo "Building the frontend..."
cd frontend
npm install
npm run build
cd ..

# Run the backend
echo "Starting the backend..."
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 &
cd ..

# Serve the frontend
echo "Serving the frontend..."
cd frontend/dist
python -m http.server 8080