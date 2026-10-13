# Oriaya Landing Page — GitHub Pages (Option A)

Plan confirmed 2026-10-13: GitHub Pages + Google Sheet.

- Frontend: this repo, `index.html` (exported from the Muse landing-page artifact, images inlined).
- Waitlist storage: Google Sheet `Oriaya Waitlist` under jillrencoaching@gmail.com
  - Sheet ID: 1ZlPdK46CeJo9dPuQRvHvyPrpIogKEH75PwTHThsc6wQ
  - Columns: Timestamp, Name, Email, Source, Notes
- Backend: Apps Script project `Oriaya Waitlist Receiver` (same account).
  - Still needs: Code.gs pasted, saved, deployed as Web App (Execute as Me, Who has access: Anyone).
  - Once deployed, put its `/exec` URL into `WAITLIST_ENDPOINT` in `index.html` (see `WAITLIST_SETUP.md`).
  - Until then the form shows the preview message and does NOT save.

Deploy: GitHub Pages from `main` branch, root. Later: connect custom domain oriaya.ai / oriaya.app (not purchased yet, availability not verified).
