import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useBookmarks } from '../hooks/useBookmarks';

const placeholderImage = 'https://placehold.co/800x450?text=No+Image+Available';

const ShareBtn = ({ url, title }) => {
  const [label, setLabel] = useState('🔗 Share');
  const handle = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
      setLabel('✅ Copied!');
      setTimeout(() => setLabel('🔗 Share'), 2000);
    }
  };
  return (
    <button onClick={handle} className="btn btn-outline-secondary btn-sm" style={{ minWidth: '90px' }}>
      {label}
    </button>
  );
};

const HeroCard = ({ article, isBookmarked, onToggleBookmark }) => {
  const { isDark } = useTheme();
  return (
    <div className="card mb-3 overflow-hidden" style={{
      background: isDark ? '#1e1e1e' : '#fff',
      border: isDark ? '1px solid #333' : '1px solid #dee2e6',
    }}>
      <div className="row g-0">
        <div className="col-md-7" style={{ position: 'relative' }}>
          <img
            src={article.urlToImage || placeholderImage}
            alt={article.title}
            onError={(e) => { e.target.src = placeholderImage; }}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: '#dc3545', color: '#fff',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
            padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase',
          }}>
            Top Story
          </span>
          {onToggleBookmark && (
            <button onClick={onToggleBookmark} title={isBookmarked ? 'Remove bookmark' : 'Save'} style={{
              position: 'absolute', top: '10px', right: '10px',
              background: isBookmarked ? '#212529' : 'rgba(255,255,255,0.9)',
              border: 'none', borderRadius: '50%',
              width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', fontSize: '15px',
            }}>🔖</button>
          )}
        </div>
        <div className="col-md-5">
          <div className="card-body d-flex flex-column h-100 p-4">
            <h3 className="card-title fw-bold lh-sm mb-3" style={{ fontSize: '1.3rem' }}>
              {article.title || 'No headline available'}
            </h3>
            <p className="card-text flex-grow-1 text-muted">
              {article.description ? article.description.slice(0, 160) + '...' : 'No description available.'}
            </p>
            <p className="card-text mb-3">
              <small className="text-muted">
                By {article.author || 'Unknown'} · {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
              </small>
            </p>
            <div className="d-flex gap-2">
              <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm flex-grow-1">Read More</a>
              <ShareBtn url={article.url} title={article.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MiniCard = ({ article, isBookmarked, onToggleBookmark }) => {
  const { isDark } = useTheme();
  const [shareLabel, setShareLabel] = useState('🔗 Share');

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: article.title, url: article.url }); } catch {}
    } else {
      await navigator.clipboard.writeText(article.url).catch(() => {});
      setShareLabel('✅ Copied!');
      setTimeout(() => setShareLabel('🔗 Share'), 2000);
    }
  };

  return (
    <div className="card h-100 overflow-hidden" style={{
      background: isDark ? '#1e1e1e' : '#fff',
      border: isDark ? '1px solid #333' : '1px solid #dee2e6',
      position: 'relative',
    }}>
      {onToggleBookmark && (
        <button onClick={onToggleBookmark} title={isBookmarked ? 'Remove bookmark' : 'Save'} style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 10,
          background: isBookmarked ? '#212529' : 'rgba(255,255,255,0.9)',
          border: 'none', borderRadius: '50%',
          width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', fontSize: '14px',
        }}>🔖</button>
      )}
      <img
        src={article.urlToImage || placeholderImage}
        alt={article.title}
        onError={(e) => { e.target.src = placeholderImage; }}
        style={{ height: '180px', objectFit: 'cover', width: '100%' }}
      />
      <div className="card-body d-flex flex-column p-3">
        <h6 className="card-title fw-semibold lh-sm mb-2">{article.title ? article.title.slice(0, 80) + '...' : 'No headline'}</h6>
        <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.83rem' }}>
          {article.description ? article.description.slice(0, 80) + '...' : 'No description.'}
        </p>
        <p className="card-text mb-2">
          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''}
          </small>
        </p>
        <div className="d-flex gap-2">
          <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm flex-grow-1" style={{ fontSize: '0.8rem' }}>Read More</a>
          <button onClick={handleShare} className="btn btn-outline-secondary btn-sm" style={{ fontSize: '0.8rem', minWidth: '78px' }}>{shareLabel}</button>
        </div>
      </div>
    </div>
  );
};

const FeaturedStories = ({ articles }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!articles || articles.length < 3) return null;

  const [hero, ...rest] = articles;
  const secondary = rest.slice(0, 2);

  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-3" style={{ borderLeft: '4px solid #dc3545', paddingLeft: '10px' }}>
        Top Stories
      </h5>

      <HeroCard
        article={hero}
        isBookmarked={isBookmarked(hero.url)}
        onToggleBookmark={() => toggleBookmark(hero)}
      />

      <div className="row g-3">
        {secondary.map(article => (
          <div className="col-md-6" key={article.url}>
            <MiniCard
              article={article}
              isBookmarked={isBookmarked(article.url)}
              onToggleBookmark={() => toggleBookmark(article)}
            />
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <h5 className="fw-bold mb-3" style={{ borderLeft: '4px solid #6c757d', paddingLeft: '10px' }}>
        More Headlines
      </h5>
    </div>
  );
};

export default FeaturedStories;
