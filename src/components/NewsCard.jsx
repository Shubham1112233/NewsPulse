import React, { useContext } from "react";
import "./NewsCard.css";
import { BookmarkContext } from "../contexts/BookmarkContext";
import HeartIcon from "./HeartIcon";
import articleimage from "../assets/Breaking_news.jpg"

const NewsCard = ({ newsHeadlines }) => {
  const {bookmarks, addBookmark, removeBookmark} = useContext(BookmarkContext);

  if (!newsHeadlines || newsHeadlines.length === 0) {
    return null;
  }

  const handleBookmark = (e, article) => {
    e.preventDefault();
    e.stopPropagation();
    
    const articleUrl = article.link || article.url;
    const isBookmarked = bookmarks.some(bookmark => 
      (bookmark.link || bookmark.url) === articleUrl
    );
    
    if (isBookmarked) {
      removeBookmark(article);
    } else {
      addBookmark(article);
    }
  }
  
  const isArticleBookmarked = (article) => {
    const articleUrl = article.link || article.url;
    return bookmarks.some(bookmark => 
      (bookmark.link || bookmark.url) === articleUrl
    );
  }

  return (
    <div className="grid-container">
      {newsHeadlines.map((article, index) => {
        const imageUrl =
          article.image_url ||
          article.urlToImage ||
          articleimage ||
          "https://via.placeholder.com/400x250?text=No+Image";
        const title = article.title || "Untitled Article";
        const description =
          article.description || "No description available for this article.";
        const source =
          article.source_name || article.source?.name || "Unknown Source";
        const publishedDate = article.pubDate || article.publishedAt;

        return (
          <article className="news-card" key={index}>
            <div className="news-card-image-wrapper">
              <img
                src={imageUrl}
                alt={title}
                className="news-card-image"
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x250?text=No+Image";
                }}
              />
              {source && <span className="news-card-source">{source}</span>}
            </div>

            <div className="news-card-content">
              <div className="news-card-header">
                <h3 className="news-card-title">{title}</h3>
                <HeartIcon 
                  filled={isArticleBookmarked(article)}
                  onClick={(e) => handleBookmark(e, article)}
                  className="news-card-bookmark"
                />
              </div>
              <p className="news-card-description">{description}</p>

              <div className="news-card-footer">
                {publishedDate && (
                  <span className="news-card-date">
                    📅 {new Date(publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
                <a
                  href={article.link || article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card-link"
                >
                  Read More →
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NewsCard;
