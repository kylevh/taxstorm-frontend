import { useLocation, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileCreate from "./pages/ProfileCreate";
import SubmissionsCreate from "./pages/SubmissionsCreate";
import SubmissionsView from "./pages/SubmissionsView";
import Results from "./pages/Results";


function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles/create" element={<ProfileCreate />} />
          <Route path="/profiles/:id" element={<Profile />} />
          <Route path="/profiles/:id/edit" element={<Profile />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/submissions" element={<SubmissionsView />} />
          <Route path="/submissions/create" element={<SubmissionsCreate />} />
          <Route path="/submissions/:id/result" element={<Profile />} />

          <Route path="/submissions/result" element={<Results />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
