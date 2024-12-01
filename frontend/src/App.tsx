import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapComponent from "./components/MapComponent";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MapComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
