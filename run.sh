#!/bin/bash

echo ""
echo "=========================================="
echo "   AI Engineer Learning Platform Launcher"
echo "=========================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null
then
    echo "[ERROR] npm is not installed."
    exit 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "[INFO] node_modules not found. Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed."
        exit 1
    fi
fi

# Check for Ollama
if ! command -v ollama &> /dev/null
then
    echo "[WARNING] Ollama is not detected."
    echo "Please install it from https://ollama.com/ for the Assistant to work."
    echo ""
else
    echo "[INFO] Ollama detected. Ensuring qwen2.5:1.5b is available..."
    # Silent check
    ollama run qwen2.5:1.5b "Hello" &> /dev/null
fi

echo "[SUCCESS] Starting the platform..."
echo "Opening http://localhost:3000"

# Open browser based on OS
case "$(uname)" in
    "Darwin") open "http://localhost:3000" ;;
    "Linux")  xdg-open "http://localhost:3000" &> /dev/null || echo "Please open http://localhost:3000 in your browser." ;;
esac

npm run dev
