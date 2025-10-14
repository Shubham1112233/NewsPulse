import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategory } from '../utils/api';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';

const Category = () => {
  const { name } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const cachedCategoryData = localStorage.getItem(`category_${name}`);
        if (cachedCategoryData) {
          setCategoryData(JSON.parse(cachedCategoryData));
          console.log('Cached category data found');
        } else {
          const data = await fetchCategory(name);
          setCategoryData(data || []);
          localStorage.setItem(`category_${name}`, JSON.stringify(data));
          console.log('Category data fetched and cached');
        }
      } catch (error) {
        console.error("Error fetching category", error);
        setError("Failed to load category news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [name]);

  const categoryIcon = {
    business: '💼',
    entertainment: '🎬',
    health: '⚕️',
    science: '🔬',
    sports: '⚽',
    technology: '💻'
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">
            {categoryIcon[name] || '📰'} {name.charAt(0).toUpperCase() + name.slice(1)} News
          </h1>
          <p className="page-subtitle">
            Latest updates in {name}
          </p>
        </div>

        {loading && <Loader message={`Loading ${name} news...`} />}
        
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

        {!loading && !error && categoryData.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Articles Found</h3>
            <p>There are no articles in this category at the moment.</p>
          </div>
        )}

        {!loading && !error && categoryData.length > 0 && (
          <NewsCard newsHeadlines={categoryData} />
        )}
      </div>
    </div>
  );
};

export default Category;