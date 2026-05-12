import React from 'react'

const Spinner = () => {
  return (
    <div className='text-center my-4'>
      <div className="spinner-border text-dark" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
