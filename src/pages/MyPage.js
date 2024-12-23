import React, { useState, useEffect } from "react";
import BodyPage from "../components/BodyPage";
import Nav from "../components/Nav";
import styled from "styled-components";
import scrapB from "../img/scrap_button.png";
import scrappedB from "../img/scrapped_button.png";
import axios from "axios";

const mockData = [
  {
    type: "화이트",
    name: "모젤 크리스마스 리슬링",
    alcohol: 13,
    price: 55000,
    image: "https://via.placeholder.com/80x120", // 사진 링크
    description: "독일의 모젤 지역에서 재배된 리슬링 포도로 만든 와인입니다.",
  },
  {
    type: "스파클링",
    name: "샴페인 모엣 & 샹동",
    alcohol: 12.5,
    price: 85000,
    image: "https://via.placeholder.com/80x120",
    description: "프랑스 상파뉴 지방에서 생산된 샴페인의 대명사입니다.",
  },
  {
    type: "레드",
    name: "샤또 마고",
    alcohol: 14,
    price: 320000,
    image: "https://via.placeholder.com/80x120",
    description: "프랑스 보르도 지역의 최고급 레드 와인 중 하나입니다.",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: flex-start; /* 가로 왼쪽 정렬 */
  height: 20vh; /* 화면 전체 높이를 사용 */
  padding-left: 0px; /* 왼쪽 여백을 주고 싶다면 이 값 조절 */
`;

const Content = styled.div`
  padding: 0px;
  border-radius: 10px;
  width: 100%; /* 중앙에 위치시키기 위한 가로 크기 */
`;

const StyledRecommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2%;
  background-color: #151723;
  color: #ffffff;
  min-height: 100vh;
`;

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 2000px;
  background-color: #ffffff;
  padding: 20px;
  margin: 5px 0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  color: #000000;
`;

const ProductImage = styled.img`
  width: 80px;
  height: auto;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ScrapButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: ${(props) => (props.scrapped ? "#f39c12" : "#7f8c8d")};
  &:hover {
    color: #f1c40f;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: #333;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    border-color: #cf2a2b;
  }
  &:focus {
    outline: none;
    border-color: #cf2a2b;
  }
`;

const Button = styled.button`
  background-color: #cf2a2b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ee605d;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function RecommendItem({ item }) {
  const [scrapped, setScrapped] = useState(false);

  useEffect(() => {
    const scrappedItems =
      JSON.parse(localStorage.getItem("scrappedItems")) || [];
    const isScrapped = scrappedItems.some(
      (scrappedItem) => scrappedItem.name === item.name
    );
    setScrapped(isScrapped);
  }, [item.name]);

  const handleScrap = () => {
    let scrappedItems = JSON.parse(localStorage.getItem("scrappedItems")) || [];
    if (scrapped) {
      scrappedItems = scrappedItems.filter(
        (scrappedItem) => scrappedItem.name !== item.name
      );
    } else {
      scrappedItems.push(item);
    }
    localStorage.setItem("scrappedItems", JSON.stringify(scrappedItems));
    setScrapped(!scrapped);
  };

  return (
    <StyledCard>
      <ProductImage src={item.image} alt={item.name} />
      <ProductInfo>
        <div style={{ flex: 1 }}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>
            <div style={{ display: "flex", gap: "15px" }}>
              <span>
                <strong>타입 |</strong> {item.type}
              </span>
              <span>
                <strong>도수 |</strong> {item.alcohol}%
              </span>
              <span>
                <strong>가격 |</strong> {item.price.toLocaleString()}원
              </span>
            </div>
          </p>
        </div>
      </ProductInfo>
      <ScrapButton onClick={handleScrap} scrapped={scrapped}>
        {scrapped ? (
          <img src={scrappedB} style={{ width: "20px", height: "25px" }} />
        ) : (
          <img src={scrapB} style={{ width: "20px", height: "20px" }} />
        )}
      </ScrapButton>
    </StyledCard>
  );
}

function MyPage() {
  const [userData, setUserData] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const nickname = localStorage.getItem("nickname");
        // nickname 값이 없을 경우 처리
        if (!nickname) {
          console.error("User nickname is not set in localStorage.");
          return;
        }
        // JSON 파싱 추가
        const response = await axios.get(`/api/mypage?nickname=${nickname}`);
        setUserData(response.data.user);
        setLikedItems(response.data.likedAlcohols);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const nickname = localStorage.getItem("nickname");
  return (
    <>
      <Nav />
      <BodyPage>
        <Container>
          <Content>
            <h1>{nickname}님, 안녕하세요!</h1>
            <h3>
              나만의 특별한 와인 리스트를 만들고, 언제든지 다시 찾아보세요.
            </h3>
          </Content>
        </Container>

        {likedItems.length > 0 ? (
          <StyledRecommend>
            <span
              style={{
                paddingBottom: 10,
                borderBottom: "2px solid white",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              스크랩 모음
            </span>
            {likedItems.map((item, index) => (
              <RecommendItem key={index} item={item} />
            ))}
          </StyledRecommend>
        ) : (
          <h2>스크랩한 항목이 없습니다.</h2>
        )}
      </BodyPage>
    </>
  );
}

export default MyPage;
