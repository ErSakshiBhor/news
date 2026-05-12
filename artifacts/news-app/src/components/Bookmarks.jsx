import React from 'react';
import NewsItem from './NewsItem';
import { useBookmarks } from '../hooks/useBookmarks';

const Bookmarks = () => {
  const { bookmarks, removeBookmark, isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        Saved Articles
      </h1>

      {bookmarks.length === 0 ? (
        <div className="text-center my-5 py-5">
          <div style={{ fontSize: '4rem' }}>🔖</div>
          <h4 className="mt-3 text-muted">No bookmarks yet</h4>
          <p className="text-muted">
            Click the bookmark icon on any article to save it for later.
          </p>
        </div>
      ) : (
        <>
          <p className="text-muted text-center mb-4">
            <strong>{bookmarks.length}</strong> saved {bookmarks.length === 1 ? 'article' : 'articles'}
          </p>
          <div className="row">
            {bookmarks.map((article, index) => (
              <div className="col-md-4" key={article.url || index}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 45) : ""}
                  description={article.description ? article.description.slice(0, 67) : "No description available."}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  isBookmarked={isBookmarked(article.url)}
                  onToggleBookmark={() => toggleBookmark(article)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmarks;
