@echo off
title Ejemplos Shaders

echo ========================================
echo   Ejemplos Shaders
echo   Servidor local en http://localhost:8000
echo ========================================
echo.

REM --- Kill any existing server on port 8000 ---
echo [*] Limpiando instancias previas en puerto 8000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000.*LISTENING"') do (
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 1 /nobreak >nul

REM --- Start server ---
echo [*] Iniciando servidor...
start http://localhost:8000
python -m http.server 8000

pause
