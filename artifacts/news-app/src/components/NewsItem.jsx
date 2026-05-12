import React, { useState } from 'react'
import { ReadingTimeBadge } from '../utils/readingTime.jsx';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, content, isBookmarked, onToggleBookmark } = props;
  const placeholderImage = 'https://placehold.co/600x400?text=No+Image+Available';
  const [shareLabel, setShareLabel] = useState('Share');

  const article = { title, description, content };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: title || 'News article', url: newsUrl });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(newsUrl);
        setShareLabel('Copied!');
        setTimeout(() => setShareLabel('Share'), 2000);
      } catch {}
    }
  };

  return (
    <div className="my-3">
      <div className="card h-100" style={{ position: 'relative' }}>
        {onToggleBookmark && (
          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Save article'}
            style={{
              position: 'absolute', top: '10px', right: '10px', zIndex: 10,
              background: isBookmarked ? '#212529' : 'rgba(255,255,255,0.9)',
              border: 'none', borderRadius: '50%',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              fontSize: '16px', transition: 'all 0.2s ease',
            }}
          >
            🔖
          </button>
        )}

        <img
          src={imageUrl || placeholderImage}
          className="card-img-top"
          alt={title || 'News Image'}
          onError={(e) => { e.target.src = placeholderImage; }}
          style={{ height: '200px', objectFit: 'cover' }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title ? `${title}...` : 'No headline available'}</h5>
          <p className="card-text flex-grow-1">{description ? `${description}...` : 'No description available.'}</p>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
              By {!author ? 'Unknown' : author}
            </small>
            <ReadingTimeBadge article={article} />
          </div>

          <small className="text-muted d-block mb-2" style={{ fontSize: '0.72rem' }}>
            {date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Unknown date'}
          </small>

          <div className="d-flex gap-2 mt-auto">
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark flex-grow-1">
              Read More
            </a>
            <button
              onClick={handleShare}
              className="btn btn-outline-secondary"
              title="Share article"
              style={{ minWidth: '80px', transition: 'all 0.2s' }}
            >
              {shareLabel === 'Copied!' ? '✅ Copied!' : '🔗 Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
