import React, { useContext } from "react";
import "./NewsCard.css";
import { BookmarkContext } from "../contexts/BookmarkContext";

const NewsCard = ({ newsHeadlines }) => {
  const {bookmarks, addBookmark, removeBookmark} = useContext(BookmarkContext);


  if (!newsHeadlines || newsHeadlines.length === 0) {
    return null;
  }

  
  const handleBookmark = (article) => {
    if (bookmarks.some(bookmark => bookmark.url === article.url)) {
      console.log("Removing bookmark", article);
      removeBookmark(article);
    } else {
      console.log("Adding bookmark", article);
      addBookmark(article);
    }
  }

  return (
    <div className="grid-container">
      {newsHeadlines.map((article, index) => {
        const imageUrl =
          article.image_url ||
          article.urlToImage ||
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
              <h3 className="news-card-title">{title}</h3>
              <p className="news-card-description">{description}</p>

              <div className="news-card-footer">
                {publishedDate && (
                  <span className="news-card-date">
                    {new Date(publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-primary" onClick={()=> handleBookmark(article)}>
                    <i className="bi bi-bookmark"></i>
                  </button>
                  <a
                    href={article.link || article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card-link"
                  >
                    Read Article →
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NewsCard;
