// Default Import

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Layout

import Layout from "@/layouts/root-layout";

// Utility Pages / Components

// import ScrollToTop from "./utility/ScrollToTop";
// import CustomCursor from "./utility/CustomCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import NotFoundPage from "./pages/Utility/NotFound404";
import LoadingScreen from "./pages/Utility/LoadingScreen";

// Pages

import LandingPage from "@/pages/Landing/page";
import FYPPage from "./pages/FYP/page";
import HomePage from "./pages/Home/page";
import WatchPage from "./pages/Film/page2";
import ForumPage from "./pages/Forum/page";
import FloatingChatbot from "./components/utils/FloatingChatbot";
import CreateForumPage from "./pages/Forum/create";
import ForumDetailPage from "./pages/Forum/[id]/page";
import NetflixFeaturesHome from "./pages/Landing/features";
import NetflixFriends from "./pages/Friends/page";

function App() {

  const [loading, setLoading] = useState(true);

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <BrowserRouter>
      <ScrollToTopFunction />
      {/* <ScrollToTop /> */}
      {/* <CustomCursor /> */}

      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes>

            <Route path="/" element={<NetflixFeaturesHome />} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/fyp" element={<FYPPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/forum" element={<ForumPage />} />

            <Route path="/friends" element={<NetflixFriends />} />

            <Route path="/forum/create" element={<CreateForumPage />} />
            <Route path="/forum/:id" element={<ForumDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/" element={<Layout />}>
              
                <Route path="/landing" element={<LandingPage/>} />

            </Route>

          </Routes>

        )}

      </AnimatePresence>

      <Toaster position="top-center" />

      <FloatingChatbot 
        position="bottom-right"
        initialOpen={false}
      />

    </BrowserRouter>

  );
}

export default App;
