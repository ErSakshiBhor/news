import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useBookmarks } from '../hooks/useBookmarks';

const SearchResults = ({ setProgress }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchResults = async (pageNum = 1, reset = false) => {
    if (!query.trim()) return;

    setProgress(10);
    if (pageNum === 1) {
      setLoading(true);
      setError(null);
    }

    const url = `/api/news/search?q=${encodeURIComponent(query)}&page=${pageNum}&pageSize=10`;

    try {
      const response = await fetch(url);
      setProgress(50);
      const data = await response.json();
      setProgress(80);

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Search failed');
      }

      setArticles(prev => (reset || pageNum === 1) ? (data.articles || []) : [...prev, ...(data.articles || [])]);
      setTotalResults(data.totalResults || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setTotalResults(0);
    fetchResults(1, true);
    // eslint-disable-next-line
  }, [query]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(nextPage);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '148px' }}>
        {query ? `Results for "${query}"` : 'Search QuickNews'}
      </h1>

      {loading && <Spinner />}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && query && articles.length === 0 && (
        <div className="text-center my-5">
          <p className="text-muted fs-5">No articles found for "<strong>{query}</strong>".</p>
          <p className="text-muted">Try different keywords.</p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <>
          <p className="text-muted text-center mb-4">
            Found <strong>{totalResults.toLocaleString()}</strong> articles
          </p>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
            endMessage={<p style={{ textAlign: 'center' }}><b>You've seen all the results!</b></p>}
          >
            <div className="row">
              {articles.map((element, index) => (
                <div className="col-md-4" key={element.url || index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 67) : "No description available."}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    isBookmarked={isBookmarked(element.url)}
                    onToggleBookmark={() => toggleBookmark(element)}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default SearchResults;
