import React, { useEffect } from 'react';

const LoaderComponent = () => {
  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      document.querySelector('.loader-wrapper').style.zIndex = '2';
    }, 1000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  return <div className="loader-wrapper">Loading...</div>;
};

export default LoaderComponent;
