import React, { useState } from 'react';
import { BookmarkContext } from '../contexts/BookmarkContext';

export const BookmarkProvider = ({children}) => {
    const [bookmarks, setBookmarks] = useState([]);

    const addBookmark = (article) => {
        if (!bookmarks.some(bookmark => bookmark.url === article.url)) {
            setBookmarks([...bookmarks, article]);
        }
    }

    const removeBookmark = (article) => {
        if (bookmarks.some(bookmark => bookmark.url === article.url)) {
            setBookmarks(bookmarks.filter(bookmark => bookmark.url !== article.url));
        }
    }

    return (
        <BookmarkContext.Provider value={{bookmarks, addBookmark, removeBookmark}}>
            {children}
        </BookmarkContext.Provider>
    )
}
