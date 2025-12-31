import { useEffect, useState } from "react";
import useAuthStore from "./stores/useAuthStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import { ProtectedRoute } from "./Routes/Route";
import { PublicRoute } from "./Routes/Route";
import { ThemeProvider } from "./providers/ThemeProvider";
import Layout from "./components/Layout";

const App = () => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loaduser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loaduser();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/home" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
