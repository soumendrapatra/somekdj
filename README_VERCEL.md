Deploying to Vercel

1. Create a new GitHub repository and push the contents of this folder (root should contain `index.html`, `script.js`, `style.css`, `reply-me-love.mp4`, `love-me.mp4`, and `vercel.json`).

2. In Vercel, choose "Import Project" -> "Import Git Repository" and select the repo.

3. Leave the project as a static site. Do not add a custom build command. Vercel should detect `index.html` automatically.

4. After deployment, Vercel will provide a permanent URL you can share.

5. If the main page looks unstyled, open `check-assets.html` first. It confirms whether `style.css` and `script.js` are reachable from the repo root.

Notes:
- No server code is required; this is a static site.
- Make sure video filenames are preserved exactly as `reply-me-love.mp4` and `love-me.mp4`.
- If Vercel still fails, make sure the repository root contains `index.html`, `style.css`, `script.js`, and the two `.mp4` files directly.
- If Vercel still fails, make sure the repository root contains `index.html`, `style.css`, `script.js`, `check-assets.html`, and the two `.mp4` files directly.
