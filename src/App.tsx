import { useLocation, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
