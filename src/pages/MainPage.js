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

function MainPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const getUserData = async (token) => {
    const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    console.log(user);
    return user.data;
  };

  const saveUserData = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User data saved:", response.data);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const token = localStorage.getItem("token");
      getUserData(token)
        .then((data) => {
          setUserInfo(data.properties);
          saveUserData(data.properties);
          console.log(data.properties.profile_nickname);
          console.log(userInfo);
          //console.log(data.properties.profile_image);
          localStorage.setItem(
            "profile-img",
            JSON.stringify(data.properties.profile_image)
          );
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
        <p>
          당신의 취향과 오늘의 날씨를 고려하여 가장 완벽한 와인 한 잔을
          찾아보세요!
        </p>
        <p>
          웨더앤와인은 날씨 정보를 바탕으로 당신에게 딱 맞는 와인을 추천해
          드립니다.
        </p>

        <Weather />
        <ButtonContainer
          style={{ display: "flex", gap: "65px", alignItems: "center" }}
        >
          <img src={recommend_button} onClick={() => navigate("/recommend")} />
          <img src={scrap_img} onClick={() => navigate("/mypage")} />
        </ButtonContainer>
        {/* 오늘 날씨정보 버튼에 전달 */}
      </BodyPage>
    </>
  );
}

export default MainPage;
