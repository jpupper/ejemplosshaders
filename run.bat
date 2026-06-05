@echo off
title Ejemplos Shaders

echo ========================================
echo   Ejemplos Shaders
echo   Servidor local en http://localhost:8000
echo ========================================
echo.

start http://localhost:8000
python -m http.server 8000

pause
