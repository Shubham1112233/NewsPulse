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


function App() {
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
