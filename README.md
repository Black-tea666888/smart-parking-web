<h1 align="center">Smart Parking Spot Detection</h1>

<p align="center">
  Real-time parking availability from light + weight sensors, shown on three web front ends.<br>
  <b>Team D16</b> · NUTC Computer Science &amp; Information Engineering · Capstone Project
</p>

<p align="center">
  <a href="https://smart-parking-8df51.web.app/user/"><img alt="User site" src="https://img.shields.io/badge/User_site-live-F5B700?style=for-the-badge"></a>
  <a href="https://smart-parking-8df51.web.app/"><img alt="Admin site" src="https://img.shields.io/badge/Admin_site-live-0F172A?style=for-the-badge"></a>
  <a href="https://smart-parking-8df51.web.app/owner/"><img alt="Owner page" src="https://img.shields.io/badge/Owner_page-live-334155?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="https://github.com/Black-tea666888/smart-parking-web/actions/workflows/deploy.yml"><img alt="Deploy" src="https://github.com/Black-tea666888/smart-parking-web/actions/workflows/deploy.yml/badge.svg"></a>
  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-Hosting%20%7C%20RTDB%20%7C%20Auth-FFCA28?logo=firebase&logoColor=black">
  <img alt="Gemini" src="https://img.shields.io/badge/AI-Gemini-4285F4?logo=googlegemini&logoColor=white">
  <img alt="No build step" src="https://img.shields.io/badge/build-none-22C55E">
  <img alt="Languages" src="https://img.shields.io/badge/UI-中文%20%2F%20EN-8B5CF6">
</p>

<p align="center"><img src="docs/hero.jpg" alt="User, admin and owner pages" width="100%"></p>

## Overview

Each parking spot has a **light sensor** and a **weight sensor**. Using both cuts false readings from shadows, people or objects left in the spot.
Two ESP32 boards (indoor and outdoor) push spot status to **Firebase Realtime Database**, and every page updates within about a second.

| | Page | Who it's for | Sign-in |
|---|---|---|---|
| [`/user/`](https://smart-parking-8df51.web.app/user/) | **User site** | Drivers looking for a spot | None |
| [`/`](https://smart-parking-8df51.web.app/) | **Admin site** | Parking lot staff | Verified email + owner approval |
| [`/owner/`](https://smart-parking-8df51.web.app/owner/) | **Owner page** | The lot owner | Owner account |

---

## User site · `/user/`

<table>
<tr>
<td width="70%"><img src="docs/user.gif" alt="User site on desktop"></td>
<td width="30%"><img src="docs/user-phone.gif" alt="User site on phone"></td>
</tr>
</table>

- **Live spot map**: an animated 2D / 3D view of indoor and outdoor spots with free, in-use, held and maintenance states
- **Suggested spot**: one tap shows the best free spot and the route to it
- **Navigation**: open the lot in Google Maps or Apple Maps
- **10-minute hold**: reserve a spot while you drive in
- **Find my car**: remember where you parked
- **Ask AI**: plain-language questions such as "which spots are free outdoors?", with voice input and spoken answers
- **Installable PWA** with offline shell, large-text mode and a QR code for sharing

## Admin site · `/`

<table>
<tr>
<td width="70%"><img src="docs/admin.gif" alt="Admin site on desktop"></td>
<td width="30%"><img src="docs/admin-phone.gif" alt="Admin site on phone"></td>
</tr>
</table>

- **Overview dashboard**: free spots, indoor / outdoor split and current occupancy
- **Usage trend** for 24 hours, 3 days or 7 days, with a busy-hour threshold line
- **Live spot cards**: switch a spot between in-use and free, or put it under maintenance
- **Event log** with search, filters and CSV export
- **Floor plan** view of every spot
- **AI summary and AI daily report** generated from the live data
- Access only after **email verification** and **approval by the owner**

## Owner page · `/owner/`

<table>
<tr>
<td width="70%"><img src="docs/owner.gif" alt="Owner page on desktop"></td>
<td width="30%"><img src="docs/owner-phone.gif" alt="Owner page on phone"></td>
</tr>
</table>

- **Grant access by email**: manager, custom or co-owner roles
- **Custom permissions**: view only, switch spots, set maintenance, export CSV, clear the log
- **Expiry date** for each grant, after which access ends automatically
- **Revoke** any grant instantly; the person is signed out of the admin site

> The recordings use demo data and placeholder accounts (`@d16.tw`).

---

## Architecture

```mermaid
flowchart LR
  subgraph Sensors["Each parking spot"]
    L[Light sensor]
    W[Weight sensor]
  end
  L --> E1[ESP32 · indoor]
  W --> E1
  L --> E2[ESP32 · outdoor]
  W --> E2
  E1 --> DB[(Firebase<br>Realtime Database)]
  E2 --> DB
  DB <--> U[User site<br>/user/]
  DB <--> A[Admin site<br>/]
  DB <--> O[Owner page<br>/owner/]
  DB <--> APP[Android app]
  AUTH[Firebase Auth<br>+ App Check] -.-> A
  AUTH -.-> O
  AI[Gemini<br>Firebase AI Logic] -.-> U
  AI -.-> A
```

## Language switch

Every page has a **中文 / EN** button in the bottom-left corner (`i18n.js`).
The choice is saved per browser, and the AI assistant, voice input and spoken answers follow the selected language.

## Tech stack

| Layer | Used |
|---|---|
| Front end | Plain HTML, CSS and JavaScript, no framework, no build step |
| Data | Firebase Realtime Database (live listeners) |
| Accounts | Firebase Authentication, email verification, App Check |
| AI | Gemini through Firebase AI Logic, with shared response cache |
| Hosting | Firebase Hosting, auto-deployed by GitHub Actions |
| Hardware | ESP32, light sensors, load cells |

## Repository layout

```
.
├── index.html          Admin site
├── user/               User site (PWA: manifest, service worker, icons, QR code)
├── owner/              Owner page
├── i18n.js             中文 / EN switch shared by all pages
├── sw.js               Removes the old user-page service worker
├── docs/               Screenshots and recordings for this README
├── firebase.json       Hosting config
└── .github/workflows/  Auto deploy
```

## Deploy

```bash
firebase deploy --only hosting
```

Every push to `main` also deploys through GitHub Actions (`.github/workflows/deploy.yml`) and appears under **Deployments**.
It needs the repository secret `FIREBASE_SERVICE_ACCOUNT_SMART_PARKING_8DF51` (created by `firebase init hosting:github`); without it the workflow only prints a warning.

`database.rules.json` is not in this public repository because it contains the owner's email.

## Team

**Team D16** · Day Division, CSIE Year 5, Class B · National Taichung University of Science and Technology

| Role | Name |
|---|---|
| Advisor | 周孝興 |
| Members | 蘇立庠 · 鄭羽紋 · 林家濬 |
