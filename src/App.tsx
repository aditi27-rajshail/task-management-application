import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { auth } from "./firebase";

export default function App() {
  const [thisUser, setThisUser] = useState(null);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // signed in
        setThisUser(user);
        console.log("user", user);
      } else {
        // signed out
        console.log("Signed out");
      }
      setLoading(false); // set loading to false after checking auth state
    });
  }, []);

  // Show a loading screen while checking auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard user={thisUser} />} />
        </Routes>
      </Router>
    </>
  );
}
