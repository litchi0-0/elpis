@echo off
setlocal
set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
where node >nul 2>nul
if not errorlevel 1 set "NODE_EXE=node"
if not "%NODE_EXE%"=="node" if not exist "%NODE_EXE%" (
  echo Node.js was not found. Please install Node.js and retry.
  exit /b 1
)
for %%I in ("%NODE_EXE%") do set "PATH=%%~dpI;%PATH%"
cd /d "%~dp0"
set "_ENV=local"
"%NODE_EXE%" "node_modules\nodemon\bin\nodemon.js" index.js

