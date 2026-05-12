const WORDS_PER_MINUTE = 200;

export const estimateReadingTime = (article) => {
  const text = [
    article?.title || '',
    article?.description || '',
    article?.content || '',
  ].join(' ');

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
};

export const ReadingTimeBadge = ({ article, style = {} }) => {
  const mins = estimateReadingTime(article);
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      fontSize: '0.72rem',
      fontWeight: 500,
      color: '#6c757d',
      background: 'rgba(108,117,125,0.1)',
      borderRadius: '12px',
      padding: '2px 8px',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      ⏱ {mins} min read
    </span>
  );
};
