@echo off
SETLOCAL EnableDelayedExpansion

:: ---------------------------------------------------------
:: AI ENGINEER LEARNING PLATFORM - WINDOWS LAUNCHER
:: ---------------------------------------------------------

echo.
echo ==========================================
echo    AI Engineer Learning Platform Launcher
echo ==========================================
echo.

:: 1. Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found on your system.
    echo ---------------------------------------------------------
    echo This platform requires Node.js to run.
    echo Please download and install the "LTS" version from:
    echo https://nodejs.org/
    echo ---------------------------------------------------------
    echo.
    pause
    exit /b 1
)

:: 2. Check for npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm (Node Package Manager) is missing.
    echo Please reinstall Node.js.
    pause
    exit /b 1
)

:: 3. Install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] First time setup: Installing dependencies...
    echo (This may take 2-5 minutes depending on your internet speed)
    call npm install
    if !ERRORLEVEL! neq 0 (
        echo [ERROR] Setup failed during dependency installation.
        pause
        exit /b 1
    )
)

:: 4. Build the platform if .next folder is missing
if not exist ".next\" (
    echo [INFO] Optimizing platform for performance (First run)...
    call npm run build
    if !ERRORLEVEL! neq 0 (
        echo [ERROR] Platform build failed.
        pause
        exit /b 1
    )
)

:: 5. Success Message and Open Browser
echo.
echo [SUCCESS] Platform is ready to launch!
echo.
echo Opening http://localhost:3000 in your browser...
start http://localhost:3000

:: 6. Start the Server
echo [INFO] Running in PRODUCTION mode for maximum speed.
echo.
echo ---------------------------------------------------------
echo KEEP THIS WINDOW OPEN while using the platform.
echo Press Ctrl+C to stop the server.
echo ---------------------------------------------------------
echo.

:: Use 'call' to ensure the batch script doesn't exit after npm starts
call npm start

if %ERRORLEVEL% neq 0 (
    echo [INFO] Server stopped.
)

pause
