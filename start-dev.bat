@echo off
echo Starting Invoice Analytics Dashboard...

echo.
echo Starting API server...
start "API Server" cmd /k "cd apps\api && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Web app...
start "Web App" cmd /k "cd apps\web && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Vanna AI service...
start "Vanna AI" cmd /k "cd services\vanna && python main.py"

echo.
echo All services started!
echo - API: http://localhost:3001
echo - Web: http://localhost:3000  
echo - Vanna AI: http://localhost:8000