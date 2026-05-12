import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import FeaturedStories from './FeaturedStories';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useBookmarks } from '../hooks/useBookmarks';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const showFeatured = props.featured && articles.length >= 3;
  const featuredArticles = showFeatured ? articles.slice(0, 3) : [];
  const gridArticles = showFeatured ? articles.slice(3) : articles;

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    setError(null);

    const url = `/api/news?country=${props.country}&category=${props.category}&page=1&pageSize=${props.pageSize}`;

    try {
      const response = await fetch(url);
      props.setProgress(30);
      const parsedData = await response.json();
      props.setProgress(70);

      if (!response.ok) {
        throw new Error(parsedData.message || parsedData.error || 'Failed to load news');
      }

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const url = `/api/news?country=${props.country}&category=${props.category}&page=${nextPage}&pageSize=${props.pageSize}`;
    const response = await fetch(url);
    const parsedData = await response.json();

    if (!response.ok) {
      setError(parsedData.message || parsedData.error || 'Failed to load more news');
      return;
    }

    setArticles(prev => prev.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
  };

  const categoryLabel = props.category.charAt(0).toUpperCase() + props.category.slice(1);

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '148px' }}>
        Top {categoryLabel} Headlines
      </h1>

      {loading && <Spinner />}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
          {(error.includes('apiKey') || error.includes('API')) && (
            <p className="mt-2 mb-0">Make sure <code>NEWS_API_KEY</code> is set.</p>
          )}
        </div>
      )}

      {!loading && !error && (
        <>
          {showFeatured && <FeaturedStories articles={featuredArticles} />}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
            endMessage={<p style={{ textAlign: 'center' }}><b>You've seen all the news!</b></p>}
          >
            <div className="container">
              <div className="row">
                {gridArticles.length === 0 && !showFeatured ? (
                  <div className="col-12 text-center my-5">
                    <p>No articles found for this category.</p>
                  </div>
                ) : (
                  gridArticles.map((element) => (
                    <div className="col-md-4" key={element.url}>
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
                  ))
                )}
              </div>
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: 'general',
  featured: false,
};

export default News;
