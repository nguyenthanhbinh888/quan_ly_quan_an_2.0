@echo off
title Restaurant Management - Backend Server
echo ========================================================
echo   KHOI CHAY BACKEND SPRING BOOT (PORT 8080)
echo ========================================================
cd /d "%~dp0backend"

if exist "target\restaurant-backend-0.0.1-SNAPSHOT.jar" (
    echo Dang khoi dong bang file JAR da dong goi...
    java -jar target\restaurant-backend-0.0.1-SNAPSHOT.jar
) else (
    echo Dang bien dich va chay qua Maven...
    mvn spring-boot:run
)
pause
