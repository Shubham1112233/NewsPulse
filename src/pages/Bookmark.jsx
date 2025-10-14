import React from 'react'
import NewsCard from '../components/NewsCard'
import { BookmarkContext } from '../contexts/BookmarkContext'
import { useContext } from 'react'

const Bookmark = () => {

 const {bookmarks} = useContext(BookmarkContext);

 if (bookmarks.length === 0) {
    return (
        <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <h3>No Bookmarks Found</h3>
            <p>You haven't added any bookmarks yet. Start by clicking the bookmark icon on an article.</p>
        </div>
    )
 }

  return (
    <div className="page-wrapper">
        <div className="container">
            <div className="page-header">
                <h1 className="section-title">🔖 Bookmarks</h1>
                <p className="page-subtitle">Your saved articles</p>
            </div>
        </div> 
        <NewsCard newsHeadlines={bookmarks}></NewsCard>
    </div>
  )
}

export default Bookmark