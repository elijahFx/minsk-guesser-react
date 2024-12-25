import React from "react";

type LoaderComponentProps = {}; // Define props if needed in the future

const LoaderComponent: React.FC<LoaderComponentProps> = () => {
  return (
    <div className="loader-wrapper">
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  );
};

export default LoaderComponent;