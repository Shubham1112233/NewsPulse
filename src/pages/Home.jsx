import React, { useContext, useState, useEffect } from "react";
import { fetchHeadlines } from "../utils/api";
import { CountryContext } from "../contexts/CountryContext";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import "./Home.css";

const Home = () => {
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { country } = useContext(CountryContext);
  const [newNextPage, setNewNextPage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const cachedNextPage = localStorage.getItem('nextPage');
        const cachedNewsHeadlines = localStorage.getItem('newsHeadlines');
        if (cachedNextPage && cachedNewsHeadlines) {
          try {
            setNewNextPage(cachedNextPage);
            setNewsHeadlines(JSON.parse(cachedNewsHeadlines));
            console.log('Cached headlines found');
          } catch (error) {
            console.error("Error parsing cached headlines", error);
            const {results, nextPage} = await fetchHeadlines(country);
            setNewsHeadlines(results || []);
            setNewNextPage(nextPage);
            localStorage.setItem('nextPage', nextPage);
            localStorage.setItem('newsHeadlines', JSON.stringify(results));
            console.log('Headlines fetched and cached');
          }
        } else {
          const {results, nextPage} = await fetchHeadlines(country);
          setNewsHeadlines(results || []);
          setNewNextPage(nextPage);
          localStorage.setItem('nextPage', nextPage);
          localStorage.setItem('newsHeadlines', JSON.stringify(results));
          console.log('Headlines fetched and cached');
        }
      } catch (error) {
        console.error("Error fetching headlines", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);

  const handleLoadMore = async() => {
    try {
      setLoading(true);
      const {results, nextPage} = await fetchHeadlines(country, newNextPage);
      setNewsHeadlines([...newsHeadlines, ...results]);
      setNewNextPage(nextPage);
    } catch (error) {
      console.error("Error fetching headlines", error);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">📰 Top Headlines</h1>
          <p className="page-subtitle">
            Stay updated with the latest news from around the world
          </p>
        </div>

        {loading && <Loader message="Loading top headlines..." />}

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && newsHeadlines.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No News Available</h3>
            <p>
              There are no headlines available at the moment. Please check back
              later.
            </p>
          </div>
        )}

        {!loading && !error && newsHeadlines.length > 0 && (
          <>
          <NewsCard newsHeadlines={newsHeadlines} />
          <div className="load-more-btn d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={handleLoadMore}
            disabled={!newNextPage}
          >
            Load More
          </button>
          </div>
          </>
        )}
          
      </div>
    </div>
  );
};

export default Home;
