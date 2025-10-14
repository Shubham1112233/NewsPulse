import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Bookmark from "./pages/Bookmark";
import { CountryProvider } from "./components/CountryProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { BookmarkProvider } from "./components/BookmarkProvider";
import { useEffect } from "react";


function App() {
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function (OneSignal) {
        await OneSignal.init({
          appId: "bc936b00-1ae9-454b-9657-3e62445b4b0c",
        });
  
        // Show permission prompt
        OneSignal.showSlidedownPrompt();
      });
    };
  }, []);
  

  return (
    <ThemeProvider>
      <CountryProvider>
        <BookmarkProvider>
        <div className="app-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/bookmarks" element={<Bookmark />} />
          </Routes>
        </div>
        </BookmarkProvider>
      </CountryProvider>
    </ThemeProvider>
  );
}

export default App;
