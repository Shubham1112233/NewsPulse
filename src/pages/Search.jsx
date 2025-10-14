import React, { useState, useEffect } from 'react';
import { fetchSearch } from '../utils/api';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchData = async() => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSearch(query);
        setSearchData(data || []);
      } catch (error) {
        console.error("Error fetching search data", error);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchData();
  }, [query]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">
            🔍 Search Results
          </h1>
          <p className="page-subtitle">
            Results for "<strong>{query}</strong>"
          </p>
        </div>

        {loading && <Loader message={`Searching for "${query}"...`} />}
        
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

        {!loading && !error && searchData.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <h3>No Results Found</h3>
            <p>We couldn't find any articles matching "{query}". Try searching with different keywords.</p>
          </div>
        )}

        {!loading && !error && searchData.length > 0 && (
          <>
            <div style={{ padding: '0 1rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>
              Found {searchData.length} {searchData.length === 1 ? 'result' : 'results'}
            </div>
            <NewsCard newsHeadlines={searchData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Search;