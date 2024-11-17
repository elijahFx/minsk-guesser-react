import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import MapComponent from "./components/MapComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MapComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
