@echo off
SETLOCAL EnableDelayedExpansion

echo.
echo ==========================================
echo    AI Engineer Learning Platform Launcher
echo ==========================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is required but not found.
    echo Please install it from https://nodejs.org/ (LTS version recommended).
    pause
    exit /b 1
)

:: Install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Initializing platform (this may take a few minutes)...
    call npm install
)

:: Check for Build
if not exist ".next\" (
    echo [INFO] First run detected. Building the platform for maximum performance...
    call npm run build
)

:: Check for Ollama (optional)
where ollama >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [NOTICE] Ollama not found. The AI Assistant will run in 'Mock Mode'.
    echo To unlock full AI power, install Ollama from https://ollama.com/
    echo.
)

echo [SUCCESS] Platform is ready!
echo Opening http://localhost:3000

:: Open browser
start http://localhost:3000

:: Start the optimized production server
echo [INFO] Running in PRODUCTION mode for speed.
npm start
pause
