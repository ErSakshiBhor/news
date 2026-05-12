import React from 'react'

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date } = props;
  const placeholderImage = 'https://placehold.co/600x400?text=No+Image+Available';

  return (
    <div>
      <div className="my-3">
        <div className="card">
          <img
            src={imageUrl || placeholderImage}
            className="card-img-top"
            alt={title || 'News Image'}
            onError={(e) => { e.target.src = placeholderImage; }}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{title ? `${title}...` : 'No headline available'}</h5>
            <p className="card-text">{description ? `${description}...` : 'No description available.'}</p>
            <p className='card-text'>
              <small className='text-muted'>
                By {!author ? 'Unknown' : author} on {date ? new Date(date).toGMTString() : 'Unknown date'}
              </small>
            </p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
