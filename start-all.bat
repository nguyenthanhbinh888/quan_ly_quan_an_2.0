@echo off
title Restaurant Management - Khoi Chay He Thong
echo ========================================================
echo   KHOI CHAY TOAN BO HE THONG QUAN LY QUAN AN LOCAL
echo ========================================================
echo.
echo 1. Dang mo Backend Server (Port 8080)...
start "Backend Server" cmd /k "%~dp0start-backend.bat"

echo 2. Dang cho Backend khoi tao...
timeout /t 5 /nobreak >nul

echo 3. Dang mo Frontend UI (Port 3000)...
start "Frontend UI" cmd /k "%~dp0start-frontend.bat"

echo.
echo ========================================================
echo   HE THONG DA DUOC KHOI CHAY:
echo   - Frontend: http://localhost:3000
echo   - Backend:  http://localhost:8080/api/health
echo   - Admin:    admin   / Admin123@
echo   - Staff:    staff01 / Admin123@
echo ========================================================
