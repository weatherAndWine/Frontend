import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import MainPage from "./pages/MainPage";
import RecommendPage from "./pages/RecommendPage";
import MyPage from "./pages/MyPage";
import LoginRedirect from "./pages/LoginRedirect";
import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

function Main() {
  const GlobalStyle = createGlobalStyle`
  body {
    background-color: #151723;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;
  const [userInfo, setUserInfo] = useState(null);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/oauth" element={<LoginRedirect />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/mypage" element={<MyPage userInfo={userInfo} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
