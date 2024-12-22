// WeatherWidget.js
import React from "react";
import "./Weather.css";
import w_clear from "../img/weather_clear.png";
import w_cloudy from "../img/weather_cloud.png";
import w_rain from "../img/weather_rain.png";
import w_snow from "../img/weather_snow.png";

function WeatherWidget() {
  // 가짜 데이터
  const fakeData = {
    date: "2024-12-21", // 오늘 날짜 (가짜 데이터)
    weather: "clear", // 날씨 상태
    temperature: "15°", // 현재 온도
    icon: "https://openweathermap.org/img/wn/01d@2x.png", // 날씨 이미지 (맑음)
    location: "서울특별시",
  };
  const getBackgroundImage = (weather) => {
    switch (weather) {
      case "clear":
        return `url(${w_clear})`; // 맑음 배경 이미지
      case "cloudy":
        return `url(${w_cloudy})`; // 흐림 배경 이미지
      case "rain":
        return `url(${w_rain})`; // 비 배경 이미지
      case "snow":
        return `url(${w_snow})`; // 눈 배경 이미지
      default:
        return "url('/path/to/default.png')"; // 기본 배경 이미지
    }
  };

  return (
    <div
      className="weather-widget"
      style={{
        backgroundImage: getBackgroundImage(fakeData.weather),
        backgroundSize: "cover", // 배경 이미지 채우기
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "10px", // 모서리 둥글게
        padding: "10px",
        color: "white", // 텍스트 색상
        height: "120px", // 위젯 높이
        width: "550px", // 위젯 너비
        position: "relative", // 자식 요소 위치 지정 가능
      }}
    >
      {/* 날짜 */}
      <p
        style={{
          position: "absolute",
          top: "15px",
          margin: "0px",
          right: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {fakeData.date}
      </p>

      {/* 온도 */}
      <p
        style={{
          position: "absolute",
          bottom: "10px",
          left: "20px",
          fontSize: "50px",
          fontWeight: "bold",
          margin: "0px",
        }}
      >
        {fakeData.temperature}
      </p>

      {/* 위치 */}
      <p
        style={{
          position: "absolute",
          bottom: "10px",
          right: "20px",
          margin: "0px",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        {fakeData.location}
      </p>
    </div>
  );
}

export default WeatherWidget;
