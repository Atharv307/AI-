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
    echo [ERROR] Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

:: Check for npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

:: Install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
    if !ERRORLEVEL! neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

:: Check for Ollama (optional but recommended)
where ollama >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [WARNING] Ollama is not detected.
    echo Please install it from https://ollama.com/ for the Assistant to work.
    echo.
) else (
    echo [INFO] Ollama detected. Ensuring qwen2.5:1.5b is available...
    ollama run qwen2.5:1.5b "Hello" >nul 2>nul
)

echo [SUCCESS] Starting the platform...
echo Opening http://localhost:3000
start http://localhost:3000

npm run dev
pause
