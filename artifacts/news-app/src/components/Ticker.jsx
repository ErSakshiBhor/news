import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const Ticker = () => {
  const [headlines, setHeadlines] = useState([]);
  const [paused, setPaused] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await fetch('/api/news?country=us&category=general&page=1&pageSize=20');
        const data = await res.json();
        if (data.articles) {
          setHeadlines(data.articles.map(a => a.title).filter(Boolean));
        }
      } catch {
        // silently fail — ticker is non-critical
      }
    };
    fetchHeadlines();
  }, []);

  if (headlines.length === 0) return null;

  const tickerText = headlines.join('   •   ');

  return (
    <div
      style={{
        position: 'fixed',
        top: '56px',
        left: 0,
        right: 0,
        zIndex: 1029,
        height: '34px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: isDark ? '#1a1a1a' : '#212529',
        borderBottom: isDark ? '1px solid #333' : '1px solid #111',
        userSelect: 'none',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BREAKING label */}
      <div
        style={{
          flexShrink: 0,
          background: '#dc3545',
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '0 12px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 1,
          boxShadow: '4px 0 8px rgba(0,0,0,0.3)',
        }}
      >
        Breaking
      </div>

      {/* Scrolling track */}
      <div style={{ flex: 1, overflow: 'hidden', height: '100%', position: 'relative' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '100%',
            whiteSpace: 'nowrap',
            animation: `ticker-scroll 90s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            color: '#e4e6eb',
            fontSize: '0.8rem',
            gap: '0',
            paddingLeft: '24px',
          }}
        >
          <span>{tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}</span>
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
