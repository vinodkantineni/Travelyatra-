# TravelYatra

A React 17 single-page travel booking interface built with Create React App.

## Tooling

- React 17 and React Router 5
- Create React App / `react-scripts` 4
- Bootstrap 4, React Bootstrap, and MDBReact
- Framer Motion and Lucide React
- Braintree browser SDK
- Vercel static hosting
- Node.js 22

The frontend can use a separate backend through `REACT_APP_API_URL`. When that
backend is unavailable, several screens fall back to local mock data.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm install
copy .env.example .env
npm start
```

Set the backend URL in `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Do not add a trailing slash. Values beginning with `REACT_APP_` are embedded
into the browser bundle at build time, so never store secrets in them.

Create a production build with:

```bash
npm run build
```

## Deploy to Vercel

### Dashboard (recommended)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Vercel will read `vercel.json` and use:
   - Framework: Create React App
   - Build command: `npm run build`
   - Output directory: `build`
   - Node.js: 22.x
4. In **Project Settings > Environment Variables**, add
   `REACT_APP_API_URL` with the public HTTPS URL of the deployed backend,
   for example `https://api.example.com/api`.
5. Add the variable to Production, Preview, and Development as appropriate,
   then deploy.

The SPA rewrite in `vercel.json` makes direct visits to routes such as
`/shop`, `/signin`, and `/product/:productId` load correctly.

### Vercel CLI

```bash
npm install --global vercel
vercel
vercel --prod
```

When prompted, use the current directory and accept the detected project
settings. Add the API variable with `vercel env add REACT_APP_API_URL` before
the production deployment if the app uses a live backend.

## Backend requirements

This repository deploys the frontend only. The API referenced by
`REACT_APP_API_URL` must be deployed separately, use HTTPS in production, and
allow the Vercel production and preview origins through CORS. Payment and
authenticated admin features require that backend.

`server.js` is an optional Express static server for VPS-style hosting. Vercel
does not use it; Vercel serves the generated static files directly.
