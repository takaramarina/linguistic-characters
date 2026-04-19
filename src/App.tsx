import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingView from "./views/LandingView/LandingView";
import CarouselView from "./views/CarouselView/CarouselView";

type View = "landing" | "carousel";

function App() {
  const [view, setView] = useState<View>("landing");

  return (
    <AnimatePresence mode="wait">
      {view === "landing" ? (
        <motion.div
          key="landing"
          style={{ height: "100%", width: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LandingView onExplore={() => setView("carousel")} />
        </motion.div>
      ) : (
        <motion.div
          key="carousel"
          style={{ height: "100%", width: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CarouselView onBack={() => setView("landing")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;