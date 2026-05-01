// import React, { useEffect, useState } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const News = (props) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const updateNews = async () => {
//     props.setProgress(10);
//     setLoading(true);

//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e64e98d6775b4bb78f4f9cddc64b0f71&page=${page}&pageSize=${props.pageSize}`;

//     let data = await fetch(url);
//     props.setProgress(30);

//     let parsedData = await data.json();
//     props.setProgress(70);

//     setArticles(parsedData.articles || []);
//     setTotalResults(parsedData.totalResults || 0);
//     setLoading(false);
//     props.setProgress(100);
//   };

//   useEffect(() => {
//     updateNews();
//     // eslint-disable-next-line
//   }, [props.category]); // Re-run when category changes

//   const fetchMoreData = async () => {
//     let nextPage = page + 1;
//     setPage(nextPage);

//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e64e98d6775b4bb78f4f9cddc64b0f71&page=${nextPage+1 }&pageSize=${props.pageSize}`;

//     let data = await fetch(url);
//     let parsedData = await data.json();

//     setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
//     setTotalResults(parsedData.totalResults);
//   };

//   return (
//     <div className='container my-3'>
//       <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey - Top {props.category} Headlines </h1>

//       {loading && <Spinner />} {/* Show spinner while loading */}

//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length !== totalResults}
//         loader={<Spinner />}
//       >
//         <div className="container">
//           <div className="row">
//             {articles.map((element) => (
//               <div className="col-md-4" key={element.url}>
//                 <NewsItem
//                   title={element.title ? element.title.slice(0, 45) : ""}
//                   description={element.description ? element.description.slice(0, 67) : "No description available."}
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                   author={element.author}
//                   date={element.publishedAt}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// };

// News.defaultProps = {
//   country: 'us',
//   pageSize: 8,
//   category: 'general'
// };

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
//   setProgress: PropTypes.func.isRequired, // Ensure setProgress prop is passed
// };

// export default News;

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    // Update the API key to be fetched from environment variables
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [props.category]); // Re-run when category changes

  const fetchMoreData = async () => {
    let nextPage = page + 1;
    setPage(nextPage);

    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage + 1}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className='container my-3'>
      <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey - Top {props.category} Headlines </h1>

      {loading && <Spinner />} {/* Show spinner while loading */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 67) : "No description available."}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired, // Ensure setProgress prop is passed
};

export default News;
