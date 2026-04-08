# Interactive Wall Calendar Component

A highly polished, responsive React/Next.js calendar component inspired by physical wall calendars. Built for performance, beautiful UX, and seamless interaction, adhering strictly to frontend-only constraints.

## 🚀 Core Features

* **Wall Calendar Aesthetic:** A dynamic hero image anchors the left panel, automatically updating to match the vibe of the current month.

* **Intelligent Date Range Selection:** Users can seamlessly click to set start and end dates. The custom `useCalendar` hook handles edge cases (like selecting an end date before a start date), and the current day is always distinctly highlighted.

* **Integrated Notes System:** A dedicated text area allows users to jot down month-specific memos. Data is persisted entirely on the client side using `localStorage`.

* **Smart Holiday Integration:** Automatically calculates and highlights major National and Regional Indian festivals. Custom-built to run entirely locally without relying on slow external APIs. Tooltips are fully touch-responsive for mobile users.

* **Fluid Animations:** Powered by `Framer Motion` for buttery smooth 3D page-flips and crossfades when navigating between months.

## 🧠 Technical Architecture & Engineering Decisions

To meet the evaluation criteria and ensure a production-ready component, the following architectural choices were made:

* **Strictly Frontend:** Adhering to the challenge constraints, no backend, database, or external API was used. State and persistence are handled entirely via React Hooks and browser `localStorage`.

* **Performance & Asset Optimization:** All hero images are hosted locally in the `/public` directory rather than relying on external image CDNs. This guarantees instant load times, prevents broken layouts, and ensures animations don't stutter while waiting for network requests.

* **Fluid Responsiveness (`aspect-square`):** Instead of using rigid, hardcoded heights that break on mobile, the calendar grid utilizes CSS aspect-ratios. This ensures every day-cell remains a perfectly proportioned touch-target, gracefully collapsing from a side-by-side desktop view to a vertically stacked mobile layout.

* **Bulletproof Date Handling:** Apple devices (iOS Safari) have notorious bugs when parsing specific string formats into JavaScript `Date` objects. The codebase bypasses this by utilizing strict substring slicing and `date-fns` for cross-browser stability, preventing fatal mobile crashes.

* **Hydration Stability:** Implemented an `isMounted` state check to ensure the Next.js server-side rendering strictly matches the client-side environment, preventing layout shifts and hydration mismatch crashes on mobile devices.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Date Logic:** date-fns, date-holidays

## 💻 How to Run Locally

1. Clone the repository:
   ```bash
   git clone <your-repo-url>

2. Navigate into the project directory:
    cd <your-folder-name>

3. Install the dependencies:
    npm install

4. Start the development server:
    npm run dev

5. Open your browser and visit http://localhost:3000 to view the calendar.