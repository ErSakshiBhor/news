import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const CATEGORIES = [
  { label: '🏠 Home',          path: '/' },
  { label: '💼 Business',      path: '/Business' },
  { label: '🌐 General',       path: '/General' },
  { label: '❤️ Health',        path: '/Health' },
  { label: '🔬 Science',       path: '/Science' },
  { label: '⚽ Sports',        path: '/Sports' },
  { label: '🎬 Entertainment', path: '/Entertainment' },
];

const CategoryBar = () => {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: '90px',
        left: 0,
        right: 0,
        zIndex: 1028,
        height: '44px',
        background: isDark ? '#141414' : '#f8f9fa',
        borderBottom: isDark ? '1px solid #2a2a2a' : '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        paddingLeft: '12px',
        paddingRight: '12px',
        gap: '6px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {CATEGORIES.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          style={({ isActive }) => ({
            flexShrink: 0,
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: isActive ? 600 : 400,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            transition: 'all 0.15s ease',
            background: isActive
              ? '#dc3545'
              : isDark ? '#2a2a2a' : '#e9ecef',
            color: isActive
              ? '#fff'
              : isDark ? '#ccc' : '#495057',
            border: isActive ? '1px solid #dc3545' : '1px solid transparent',
          })}
        >
          {label}
        </NavLink>
      ))}

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default CategoryBar;
