import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import styled from "styled-components";
import banner from "../img/recommend_banner.png";
import scrapB from "../img/scrap_button.png";
import scrappedB from "../img/scrapped_button.png";

// 가짜 목업 데이터
// 사진 URL 도 넘어와야함
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

// 스타일링된 컴포넌트
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
  width: 90%;
  max-width: 800px;
  background-color: #ffffff;
  padding: 20px;
  margin: 10px 0;
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
          <strong>
            <h3>{item.name}</h3>
          </strong>
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

function RecommendPage() {
  const location = useLocation();
  const weatherType = location.state?.weatherType;

  const [filteredData, setFilteredData] = useState(mockData);
  const [sortOrder, setSortOrder] = useState({ type: "", direction: "asc" });
  const [filterType, setFilterType] = useState("");

  const sortData = (key) => {
    const sorted = [...filteredData];
    const order = sortOrder.direction === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      if (key === "price" || key === "alcohol") {
        return (a[key] - b[key]) * order;
      }
      if (key === "type" || key === "name") {
        return a[key].localeCompare(b[key]) * order;
      }
      return 0;
    });

    setFilteredData(sorted);
    setSortOrder({
      type: key,
      direction: sortOrder.direction === "asc" ? "desc" : "asc",
    });
  };

  const filterData = (type) => {
    if (type === "") {
      setFilteredData(mockData);
    } else {
      const filtered = mockData.filter((item) => item.type === type);
      setFilteredData(filtered);
    }
    setFilterType(type);
  };

  return (
    <>
      <Nav />

      <div
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={banner}
          style={{
            width: "70%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <StyledRecommend>
        <Controls>
          <Select
            value={filterType}
            onChange={(e) => filterData(e.target.value)}
          >
            <option value="">전체</option>
            <option value="화이트">화이트</option>
            <option value="스파클링">스파클링</option>
            <option value="레드">레드</option>
            <option value="주정강화">주정강화</option>
          </Select>
          <Button onClick={() => sortData("alcohol")}>
            도수{" "}
            {sortOrder.type === "alcohol"
              ? sortOrder.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </Button>
          <Button onClick={() => sortData("price")}>
            가격{" "}
            {sortOrder.type === "price"
              ? sortOrder.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </Button>
        </Controls>
        {filteredData.map((item, index) => (
          <RecommendItem key={index} item={item} />
        ))}
      </StyledRecommend>
    </>
  );
}

export default RecommendPage;
