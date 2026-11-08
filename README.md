# Smart Parking Spot Detection — Web

Web front ends for a university capstone project (Team D16, NUTC Computer Science & Information Engineering).
Each parking spot uses a light sensor plus a weight sensor; two ESP32 boards push the status to Firebase Realtime Database, and these pages show it live.

| Path | Page | What it does |
|---|---|---|
| `/user/` | User site | No sign-in. Live free spots, suggested spot, route guidance, 10-minute hold, find my car |
| `/` | Admin site | Needs owner approval and a verified email. Usage, floor plan, maintenance, event log, CSV export |
| `/owner/` | Owner page | Grant managers access by email, with custom permissions and an expiry date |

All three pages have a **中文 / EN** switch in the bottom-left corner (`i18n.js`). The choice is remembered per browser, and the AI assistant answers in the selected language.

## Tech

- Firebase Hosting, Realtime Database, Authentication, App Check
- Gemini via Firebase AI Logic
- Plain HTML, CSS and JavaScript (no build step)

## Deploy

```
firebase deploy --only hosting
```

`database.rules.json` is kept out of this public repository because it contains the owner's email.
