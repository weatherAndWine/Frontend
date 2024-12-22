import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Weather from "../components/Weather";
import BodyPage from "../components/BodyPage";
import styled from "styled-components";
import recommend_button from "../img/recommend_button.png";
import scrap_img from "../img/toscrap_button.png";

const MainContainer = styled.div`
  text-align: center;
  margin: 20px;
  font-family: "Arial", sans-serif;
  color: white;
`;

const IntroText = styled.div`
  margin: 20px 0px;
  font-size: 30px;
  line-height: 1.8rem;
  text-align: center;
  justify-content: center;

  & p {
    margin: 10px;
    font-weight: bold;
  }

  & p:last-child {
    font-size: 18px;
    padding-top: 10px;
  }
`;

const RecommendButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 20px 0;

  & img {
    cursor: pointer;
    width: 300px;
    height: auto;
  }
`;

const mapWeatherType = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 300) {
    return 3; // 비 (뇌우)
  } else if (weatherCode >= 300 && weatherCode < 400) {
    return 3; // 비 (이슬비)
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return 3; // 비
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return 4; // 눈
  } else if (weatherCode === 800) {
    return 1; // 맑음
  } else if (weatherCode > 800 && weatherCode < 900) {
    return 2; // 구름
  } else {
    return 0; // 알 수 없음
  }
};

function MainPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [weatherCode, setWeatherCode] = useState(null);

  const handleCodUpdate = (cod) => {
    setWeatherCode(cod);
  };

  const getUserData = async (token) => {
    const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    //console.log(user);
    return user.data;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const token = localStorage.getItem("token");
      getUserData(token)
        .then((data) => {
          console.log(data.properties.nickname);
          console.log(userInfo);
          {
            /* 로컬스토리지 -> DB에 id, 스크랩  */
          }
          localStorage.setItem(
            "profile-img",
            JSON.stringify(data.properties.profile_image)
          );
          setUserInfo(data.properties);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const profile_img = localStorage.getItem("profile-img");
  return (
    <>
      <Nav />

      <BodyPage>
        <IntroText>
          <p>당신의 취향과 오늘의 날씨를 고려하여 </p>
          <p>가장 완벽한 와인 한 잔을 찾아보세요!</p>
          <p>
            웨더앤와인은 날씨 정보를 바탕으로 당신에게 딱 맞는 와인을 추천해
            드립니다.
          </p>
        </IntroText>

        <Weather onCodUpdate={handleCodUpdate} />
        <ButtonContainer
          style={{ display: "flex", gap: "65px", alignItems: "center" }}
        >
          <img
            src={recommend_button}
            onClick={() =>
              navigate("/recommend", {
                state: { weatherType: mapWeatherType(weatherCode) },
              })
            }
          />
          <img src={scrap_img} onClick={() => navigate("/mypage")} />
        </ButtonContainer>
        {/* 오늘 날씨정보 버튼에 전달 */}
      </BodyPage>
    </>
  );
}

export default MainPage;
