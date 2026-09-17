# Service-App Frontend
 
The React frontend for Service-App — where people browse and review local services like plumbers, electricians, and cleaners.
 
## Quick start
 
```bash
git clone https://github.com/<your-username>/service-app.git
cd service-app
npm install
npm run dev
```
 
Open `http://localhost:7000`. The UI needs the Django backend running to show real data — see [Setup](#setup) below.
 
## Features
 
- Browse and search service listings
- Filter by category and by rating
- Login and signup
## Tech stack
 
- React 19 + TypeScript
- Vite (dev server & build)
- Tailwind CSS v4
- React Router v7
- oxlint (linting)
## Project structure
 
```text
service-app/
├── mock-server/
│   └── db.json           # leftover — not used anymore
├── public/
├── src/
│   ├── assets/            # images, svgs
│   ├── components/        # SearchBar, FilterSidebar, ServiceCard/List, Login, Signup, etc.
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
├── index.html
├── mockserver-ca.pem     # same — leftover, not used anymore
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── .oxlintrc.json
├── Dockerfile
├── .dockerignore
└── .gitignore
```
 
## Setup
 
### Requirements
 
- Node.js 22+
- npm
- Git
### Installation
 
1. **Clone the repo**
```bash
   git clone https://github.com/<your-username>/service-app.git
   cd service-app
```
 
2. **Install dependencies**
```bash
   npm install
```
 
3. **Start the backend**
   This UI talks to the real Django backend — in a separate terminal, from the backend repo:
```bash
   python manage.py runserver
```
 
   (Run migrations and `seed_data.py` first if you haven't — see the backend README.)
 
4. **Start the dev server**
```bash
   npm run dev
```
 
   Open `http://localhost:7000`.
 
A Dockerfile is also included (`docker build -t service-app . && docker run -p 7000:7000 service-app`), but there's no `docker-compose.yml` connecting it to the backend yet, so the steps above are the more complete path for now.
 
## Configuration
 
There's no `.env` or `.env.example` in this repo yet, so there's nothing environment-specific to document. If you add one later, Vite automatically loads `.env` files and exposes any variable prefixed `VITE_` to the app.
 
If there's an API base URL that points the UI at the backend, it isn't set via an environment variable right now — it's most likely defined directly in `src/`, so check there if you need to change it.
 
## Usage
 
```bash
npm run dev           # dev server — http://localhost:7000
npm run build          # type-check + production build
npm run preview        # preview the production build locally
npm run lint            # run oxlint
```
 
## Troubleshooting
 
**Blank page or "Failed to fetch" errors in the console**
The backend isn't running or isn't reachable. Start it with `python manage.py runserver` from the backend repo.
 
**`tsc` errors that don't show up in `npm run dev`**
The dev server doesn't type-check. Run `npm run build` to catch type errors before you ship.
 
**Port 7000 already in use**
Something else has it. Stop that process, or change the `port` in `vite.config.ts`.
 
**Errors right after cloning, before you've run anything**
Dependencies aren't installed yet — run `npm install`.
 
## Contributing
 
```bash
npm run lint
npm run build
```