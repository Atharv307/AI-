#!/bin/bash

echo ""
echo "=========================================="
echo "   AI Engineer Learning Platform Launcher"
echo "=========================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is required but not found."
    echo "Please install it from https://nodejs.org/"
    exit 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "[INFO] node_modules not found. Initializing platform..."
    npm install
fi

# Check for Build
if [ ! -d ".next" ]; then
    echo "[INFO] First run detected. Building the platform for maximum performance..."
    npm run build
fi

# Check for Ollama
if ! command -v ollama &> /dev/null
then
    echo "[NOTICE] Ollama not found. The AI Assistant will run in 'Mock Mode'."
    echo "To unlock full AI power, install Ollama from https://ollama.com/"
    echo ""
fi

echo "[SUCCESS] Platform is ready!"
echo "Opening http://localhost:3000"

# Open browser
case "$(uname)" in
    "Darwin") open "http://localhost:3000" ;;
    "Linux")  xdg-open "http://localhost:3000" &> /dev/null || echo "Please open http://localhost:3000 in your browser." ;;
esac

# Start optimized production server
echo "[INFO] Running in PRODUCTION mode for speed."
npm start
