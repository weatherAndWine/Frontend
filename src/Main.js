import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import MainPage from "./pages/MainPage";
import RecommendPage from "./pages/RecommendPage";
import MyPage from "./pages/MyPage";
import LoginRedirect from "./pages/LoginRedirect";
import React, { useState } from "react";

function Main() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <BrowserRouter>
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
