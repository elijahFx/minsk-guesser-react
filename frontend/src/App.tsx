import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import MainMenu from "./components/MainMenu";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WinComponent from "./components/WinComponent";
import LostComponent from "./components/LostComponent";

const App: React.FC = () => {
  //@ts-ignore
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //@ts-ignore
  const isGameEnded = useSelector((state) => state.coordinates.isGameEnded)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={isLoggedIn ? <MainMenu /> : <Signup />}
        />
        <Route path="/login" element={isLoggedIn ? <MainMenu /> : <Login />} />
        <Route path="/game" element={<MapComponent />} />
        <Route path="/win" element={isGameEnded ? <WinComponent /> : isLoggedIn ? <MainMenu /> : <Login />} />
        <Route path="/lose" element={isGameEnded ? <LostComponent /> : isLoggedIn ? <MainMenu /> : <Login />} />
        <Route path="/" element={isLoggedIn ? <MainMenu /> : <Login />} />
        <Route path="/*" element={isLoggedIn ? <MainMenu /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
