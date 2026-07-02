# ✈️ TravelYatra — Premium Travel & Tour Booking Platform

TravelYatra is a modern, high-performance, and visually stunning React-based web application for exploring, planning, and booking premium travel packages and curated experiences. Equipped with an interactive shop, an AI-powered trip planner, real-time widgets, role-based dashboards (User & Admin), and integrated checkout flows, it delivers a state-of-the-art booking experience.

---

## 🌟 Key Features

### 🌌 Immersive User Experience (UI/UX)
- **Light/Dark Mode Theme Toggle:** Fully custom light and dark themes using CSS custom properties (variables) persisted in `localStorage` for a consistent viewing preference.
- **Dynamic Micro-Animations:** Premium entry animations, page transitions, hover states, and list layouts powered by **Framer Motion**.
- **Responsive Layout:** A mobile-first design system constructed with Fluid Typography (`clamp`) and custom breakpoints for seamless viewing on mobile, tablet, and desktop screens.
- **Touch-Friendly Gallery:** Full-screen photography lightboxes with touch gestures utilizing **PhotoSwipe** and `react-photoswipe-gallery`.

### 🧭 Explore & Plan
- **AI-Powered Trip Planner:** A mock AI itinerary builder that creates tailored multi-day travel itineraries based on user vibes (Adventure, Relaxation, Cultural, etc.), destination choice, and duration.
- **Interactive Shop & Search:** Advanced search bar by keyword, filters for specific travel categories, and dynamic price-range selection.
- **Destination Comparison Tool:** Side-by-side comparison of different travel packages, detailing ratings, costs, durations, and weather.
- **Live Widgets:** Built-in real-time weather predictions and quick currency converters.

### 🛍️ Cart & Checkout
- **Interactive Shopping Cart:** Full cart management allowing users to add/remove packages and adjust bookings dynamically.
- **Braintree Payment Integration:** Secure and responsive sandbox payment simulation using Braintree’s Drop-in React UI.
- **Review & Ratings:** Interactive star ratings (`react-rating-stars-component`) and localized tour review carousel.

### 🛡️ Authentication & Admin Management
- **Role-Based Routing:** Strict router guards implementing `<PrivateRoute>` and `<AdminRoute>` using React Router v5.
- **User Dashboard & Profiles:** Personal profiles where travelers can update details and check past bookings.
- **Admin Dashboard:** Administrative panel to manage travel packages (create, read, update, delete packages and categories) and track client orders.

---

## 🛠️ Technology Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Frontend Core** | React (v17.0.2), React DOM, React Scripts |
| **Routing** | React Router DOM (v5.2.0) |
| **Design & Layout** | CSS Variables, Sass, Bootstrap 4, React Bootstrap, MDBReact |
| **Icons** | Lucide React |
| **Animations** | Framer Motion (v4.1.17) |
| **Interactions** | Photoswipe, React Photoswipe Gallery, React Rating Stars Component |
| **Payments** | Braintree Web, Braintree Web Drop-in React |
| **Server/Deployment** | Express.js (v4.17.1), Compression (Gzip), Vercel |

---

## 📂 File Structure

```text
TravelYatra-react/
├── build/                 # Production compiled application assets
├── public/                # Static public assets (favicon, index.html)
├── src/
│   ├── admin/             # Admin dashboard, adding & updating packages/categories
│   ├── auth/              # PrivateRoute and AdminRoute guards
│   ├── core/              # Main pages (Home, Shop, Cart, About, Checkout, etc.)
│   ├── user/              # User Dashboard, Profile update, Signin, Signup
│   ├── CSS/               # Supplementary style files
│   ├── image/             # Core local graphic assets
│   ├── App.js             # App wrapper component
│   ├── Routes.js          # Switch & Route paths mappings
│   ├── config.js          # API URL configurations
│   ├── styles.css         # Main stylesheet (Design Tokens, variables, resets)
│   └── index.js           # Render entrypoint
├── .env                   # Environment configurations
├── server.js              # Express static server for hosting / production
├── Vercel.json            # Vercel deployment configurations
└── package.json           # Scripts and dependencies
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v16+ recommended due to OpenSSL legacy provider)
- **NPM** (packaged with Node)

### ⚙️ Step 1: Clone & Configure
1. Navigate to the project root:
   ```bash
   cd TravelYatra-react
   ```
2. Open or create the `.env` file in the root directory to set the backend API endpoint (default localhost):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api/
   ```

### 📦 Step 2: Install Dependencies
Install all the required frontend libraries and packages:
```bash
npm install
```

### 💻 Step 3: Run the Application
To run the app in the development mode:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make edits.

### 🏗️ Step 4: Build for Production
To compile the React production build into the `build/` directory:
```bash
npm run build
```
This correctly bundles React in production mode and optimizes the build for the best performance.

---

## 🌐 Production & Deployment

### 🐳 PM2 / Node.js Express Hosting
The repository includes a ready-to-use production server configuration (`server.js`) that serves the static build folder with Gzip compression:
```bash
# Start the production server locally or on a VPS
node server.js
```
To run the server in the background using PM2:
```bash
pm2 start server.js --name travelyatra-frontend
```

### ⚡ Vercel Deployment
A `Vercel.json` configuration is included to compile and route request paths correctly. Deploy directly by running:
```bash
vercel --prod
```
