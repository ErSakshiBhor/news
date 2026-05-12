import { useState, useEffect } from 'react';

const STORAGE_KEY = 'newsmonkey_bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article) => {
    setBookmarks(prev => {
      if (prev.some(b => b.url === article.url)) return prev;
      return [{ ...article, savedAt: new Date().toISOString() }, ...prev];
    });
  };

  const removeBookmark = (url) => {
    setBookmarks(prev => prev.filter(b => b.url !== url));
  };

  const isBookmarked = (url) => bookmarks.some(b => b.url === url);

  const toggleBookmark = (article) => {
    if (isBookmarked(article.url)) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
};
