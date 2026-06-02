#!/usr/bin/env pwsh
# Starts the local static server and localtunnel in the background.
# Adjust the $Subdomain below if you want a custom one (may not be guaranteed).

param(
    [string]$Port = '8000',
    [string]$Subdomain = 'great-bees-deny'
)

Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

# Log files
$logDir = Join-Path -Path (Get-Location) -ChildPath 'logs'
if (-not (Test-Path $logDir)) { New-Item -Path $logDir -ItemType Directory | Out-Null }
$serverOut = Join-Path $logDir 'server.out.log'
$serverErr = Join-Path $logDir 'server.err.log'
$ltOut = Join-Path $logDir 'localtunnel.out.log'
$ltErr = Join-Path $logDir 'localtunnel.err.log'

Write-Output "Starting local static server on port $Port..." | Out-File -FilePath $serverOut -Append
Start-Process -FilePath python -ArgumentList "-m", "http.server", "$Port" -WorkingDirectory (Get-Location) -WindowStyle Hidden -RedirectStandardOutput $serverOut -RedirectStandardError $serverErr

Start-Sleep -Seconds 1

Write-Output "Starting localtunnel on port $Port (subdomain: $Subdomain)..." | Out-File -FilePath $ltOut -Append
Start-Process -FilePath npx -ArgumentList "--yes", "localtunnel", "--port", "$Port", "--subdomain", "$Subdomain" -WorkingDirectory (Get-Location) -WindowStyle Hidden -RedirectStandardOutput $ltOut -RedirectStandardError $ltErr

Write-Output "Started services. Logs: $logDir" | Out-File -FilePath $ltOut -Append
