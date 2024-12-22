// WeatherWidget.js
import React, { useEffect, useState } from "react";
import "./Weather.css";
import w_clear from "../img/weather_clear.png";
import w_cloudy from "../img/weather_cloud.png";
import w_rain from "../img/weather_rain.png";
import w_snow from "../img/weather_snow.png";

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

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        resolve({ lat, lon });
      },
      (error) => reject(error)
    );
  });
};

const getWeatherByCurrentLocation = async (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=658d847ef1d28e72e047ab0c5a476d54&units=metric`;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(`날씨 데이터${JSON.stringify(data)}`);

  // 필요한 데이터만 추출
  const weatherData = {
    desc: data.weather[0].main,
    temp: data.main.temp,
    cod: data.cod,
    date: new Date(data.dt * 1000).toLocaleDateString(), // 날짜를 사람이 읽을 수 있는 형식으로 변환
    location: data.name,
  };
  //console.log("추출된 날씨 데이터:", weatherData);

  return weatherData; //
};

function Weather({ onCodUpdate }) {
  const [weather, setWeather] = useState({
    desc: "",
    temp: null,
    cod: 0,
    date: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCurrentLocation()
      .then(({ lat, lon }) => {
        return getWeatherByCurrentLocation(lat, lon); // 반환값 전달
      })
      .then((weatherData) => {
        setWeather(weatherData); // 날씨 데이터 설정
        setLoading(false);
        //console.log("셋 날씨 데이터:", JSON.stringify(weatherData));

        if (onCodUpdate) {
          onCodUpdate(weatherData.cod);
        }
      })
      .catch((error) => {
        console.error(
          "위치 또는 날씨 데이터를 가져오는데 실패했습니다:",
          error
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시할 내용
  }
  const getBackgroundImage = (desc) => {
    switch (desc) {
      case 1:
        return `url(${w_clear})`; // 맑음 배경 이미지
      case 2:
        return `url(${w_cloudy})`; // 흐림 배경 이미지
      case 3:
        return `url(${w_rain})`; // 비 배경 이미지
      case 4:
        return `url(${w_snow})`; // 눈 배경 이미지
      default:
        return "url('/path/to/default.png')"; // 기본 배경 이미지
    }
  };

  return weather.date ? (
    <div
      className="weather-widget"
      style={{
        backgroundImage: getBackgroundImage(mapWeatherType(weather.cod)),
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
        {weather.date}
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
        {weather.temp}
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
        {weather.location}
      </p>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default Weather;
