Keep the local site and localtunnel always on

This repository contains `scripts/start_site.ps1` which starts a local Python static server on port 8000 and runs `localtunnel` to expose it publicly.

To install a Scheduled Task that runs the script at each logon (current user):

1. Open PowerShell as your user (no admin required for a user task).
2. Run these commands (adjust paths if needed):

```powershell
cd 'E:\OS FILE COPY\Downloads\Telegram Desktop\Do-you-love-me-code\Do you love me code\scripts'
# create a scheduled task that runs at logon
schtasks /Create /SC ONLOGON /TN "DoYouLoveMe_LocalTunnel" /TR "powershell -ExecutionPolicy Bypass -File \"E:\\OS FILE COPY\\Downloads\\Telegram Desktop\\Do-you-love-me-code\\Do you love me code\\scripts\\start_site.ps1\"" /F
```

Notes:
- Keep the machine online and connected to the internet; the scheduled task starts the server and tunnel at logon.
- The `--subdomain` used is `great-bees-deny`. Localtunnel subdomains are not guaranteed permanent; if it's taken later the tunnel may fail to start.
- For a truly permanent public URL, deploy to GitHub Pages, Netlify, or a VPS.

To remove the task:

```powershell
schtasks /Delete /TN "DoYouLoveMe_LocalTunnel" /F
```
