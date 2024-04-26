import { useLocation, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileCreate from "./pages/ProfileCreate";
import SubmissionsCreate from "./pages/SubmissionsCreate";


function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Profile />} />
          <Route path="/profiles/create" element={<ProfileCreate />} />
          <Route path="/profiles/:id" element={<Profile />} />
          <Route path="/profiles/:id/edit" element={<Profile />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/submissions" element={<Profile />} />
          <Route path="/submissions/create" element={<SubmissionsCreate />} />
          <Route path="/submissions/:id/result" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
