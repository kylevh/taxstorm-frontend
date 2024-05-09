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
import { Navigate } from "react-router-dom";
import { useAppSelector } from './store/hooks';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAppSelector(state => state.loggedIn.loggedIn);
  if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
  }
  return children;
}

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
          <Route path="/profiles/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profiles/:id/edit" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/submissions" element={<ProtectedRoute><SubmissionsView /></ProtectedRoute>} />
          <Route path="/submissions/create" element={<ProtectedRoute><SubmissionsCreate /></ProtectedRoute>} />
          <Route path="/submissions/:id/result" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/submissions/result" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
