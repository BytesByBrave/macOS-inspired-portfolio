# macOS-Inspired Developer Portfolio 🍎💻

Welcome to my interactive **macOS-Inspired Developer Portfolio**. This project completely reimagines the traditional developer portfolio into a fully immersive, interactive web experience mimicking the highly recognizable aesthetics, flow, and animations of an Apple operating system (macOS).

Users can browse through dynamic windows, open folders via a Finder experience, read articles in Safari, view my tech stack in the Terminal, and review my real resume through an integrated PDF viewer. Every interaction is designed to feel highly native and fluid.

## 🚀 Live Demo
*(Insert Live Deployment Link Here)*

---

## 🛠️ Technology Stack & Libraries

This application is built leveraging a modern frontend stack that prioritizes performance, state management, and pristine fluid animations:

### Core Frameworks
- **React.js 19**: The core component architecture framework powering all web elements, rendering, and view isolation.
- **Vite (v8)**: Ultra-fast frontend build tool and local development server, providing near-instant Hot Module Replacement (HMR) and optimized build bundles.
- **Tailwind CSS 4**: A utility-first CSS framework defining the pristine OS elements—handling dark/light mode toggles, absolute positioning for responsive windows, sleek Drop Shadows, and Backdrop Blurs (glassmorphism).

### State Management
- **Zustand**: A lightning-fast, highly scalable state-management solution pulling out the heavy lifting of:
  - Tracking which windows are open, closed, or minimized.
  - Ensuring clicked windows jump to the forefront (by calculating dynamic `z-index` layers).
- **Immer**: Operates alongside Zustand to allow for deeply nested, robust immutable state updates seamlessly—vital given the complex nested arrays tracking active "Windows" and their exact layout coordinates.

### Animations & Interactions
- **GSAP (GreenSock)**: Professional-grade animation library fueling all of the complex desktop motions:
  - Opening windows with expanding scaling animations mimicking native macOS.
  - **Draggable plugin (GSAP)** powering the fluid drag-and-drop mechanics behind the Desktop Folders, ensuring users can rearrange their workspace on the fly securely within absolute boundaries.

### Helper Libraries
- **Lucide React**: Clean, modern SVG icon library dynamically integrated within the Finder and Desktop menus (e.g., `Search`, `Sun`, `Moon`).
- **React Tooltip**: Managing robust user-friendly hover tooltips inside the macOS bottom Dock interface.
- **React PDF**: Rendering and displaying an actual PDF of my `Resume` natively inside the application window without needing an external viewer.
- **Day.js**: A minimalist JavaScript library rapidly formatting and rendering parsing correct date and active clock times located on the far right of the top Navigation bar.
- **clsx**: Conditionally joining CSS classNames tightly coupled together depending on Active states and Dark Mode renders.

---

## 📁 Project Architecture & File Roles

The codebase is strictly organized to separate raw component logic from state, styling, and data rendering:

```text
src/
├── App.jsx                     # Core application orchestrator, mounting the boot sequence and the Desktop space.
├── index.css                   # Global CSS. Injects Tailwind tokens, core OS variables, window breakpoints, and custom variants.
├── main.jsx                    # React entry file targeting the primary DOM node.
│
├── components/                 # Reusable, core structural OS components
│   ├── Dock.jsx                # The classic macOS bottom dock containing iconic application shortcuts with reactive hover tooltips.
│   ├── Home.jsx                # The primary "Desktop" interface handling the background wallpaper, draggable icons, and mounting dynamic windows.
│   ├── Navbar.jsx              # The top-level system menu bar (App controls, Clock, and the seamless Dark Mode toggle).
│   ├── Welcome.jsx             # The initial lock-screen/boot-up boot sequence experience.
│   └── WindowControls.jsx      # The recognizable standard red/yellow/green traffic light buttons (Close, Minimize, Maximize) mapped to states.
│
├── hoc/                        # Higher-Order Components
│   └── windowWrapper.jsx       # The architectural heavy lifter. A specialized HOC that strictly isolates inner content logic from window behavior. Wraps UI components giving them universal draggability, z-index hierarchy climbing, boundary resizing, boundary clamping, and standardized GSAP GSAP open/close animations.
│
├── store/                      # Zustand Global State Configurations
│   ├── location.js             # Tracks the active directory/folder state locally for the Finder/File Viewer UI.
│   └── window.js               # Tracks all the metadata belonging to active windows across the system (open/closed, fullscreen/original coords, z-indexes).
│
├── windows/                    # The functional Application Interfaces natively injected into the wrapper
│   ├── Contact.jsx             # Dedicated interactive panel for users to reach out.
│   ├── Finder.jsx              # Complex nested File Explorer replicating macOS Finder UI.
│   ├── ImageFile.jsx           # Single-file photo viewer rendering specific .PNG or .JPG assets.
│   ├── Photos.jsx              # Broad dynamic image gallery.
│   ├── Resume.jsx              # Integrated PDF document viewer.
│   ├── Safari.jsx              # Natively simulated web-browser providing views into recent articles or external portfolios.
│   └── Terminal.jsx            # A code-themed simulated CLI interface used to display tech stack and developer insights creatively.
│
└── constants/                  # Static Data Mapping
    └── index.js                # Contains the entire data source modeling (Navbar properties, mock file structures, file names, default window sizes, locations). Serves as a unified single source of truth dictating layout rendering.
```

## 🏁 Getting Started

If you want to spin up the local environment and see it in action:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
4. **View locally:**
   Open your browser and navigate to `http://localhost:5173`. Enjoy the OS!
