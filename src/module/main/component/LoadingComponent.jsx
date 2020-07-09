import React from 'react';

const LoadingComponent = ({ type }) => (
  <div className={`spinner-wrap spinner-wrap-${type}`}>
    <div className="spinner">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  </div>
);

export default LoadingComponent;
