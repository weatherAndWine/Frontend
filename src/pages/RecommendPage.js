import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import "./RecommendPage.css";
import "../GlobalStyle.css";
import styled from "styled-components";

// 가짜 목업 데이터
const mockData = [
  { type: "소주", name: "참이슬", alcohol: 19, price: 1200 },
  { type: "맥주", name: "하이네켄", alcohol: 5, price: 3500 },
  { type: "와인", name: "샤또마르고", alcohol: 12, price: 75000 },
  { type: "소주", name: "진로", alcohol: 18, price: 1500 },
  { type: "맥주", name: "기린", alcohol: 5, price: 3000 },
  { type: "와인", name: "페트리", alcohol: 13, price: 45000 },
  { type: "소주", name: "대장", alcohol: 20, price: 1300 },
  { type: "와인", name: "보르도", alcohol: 14, price: 55000 },
  { type: "맥주", name: "버드와이저", alcohol: 5, price: 3200 },
];

// 스타일링된 컴포넌트
const StyledRecommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
  min-height: 100vh;
`;

const Button = styled.button`
  background-color: #cf2a2b;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background-color: #ee605d;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const Select = styled.select`
  padding: 12px 20px;
  margin: 5px;
  font-size: 14px;
  border-radius: 8px;
  border: 2px solid #ddd;

  color: #333;
  cursor: pointer;
  width: 100px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cf2a2b;
  }

  &:focus {
    outline: none;
    border-color: #cf2a2b;
    background-color: #fff;
  }

  option {
    padding: 10px;
  }
`;

function RecommendIndex() {
  return (
    <div className="recommendIndex">
      <p>주종</p>
      <p>이름</p>
      <p>도수</p>
      <p>가격</p>
    </div>
  );
}

function RecommendItem({ item }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    const isLiked = likedItems.some(
      (likedItem) => likedItem.name === item.name
    );
    setLiked(isLiked);
  }, [item.name]);

  const handleLike = () => {
    // 좋아요 목록 가져오기
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    // 새로운 항목 추가
    likedItems.push(item);
    // 로컬 스토리지에 저장
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
    // 버튼 비활성화
    setLiked(true);
  };
  return (
    <div className="recommendItem">
      <p>{item.type}</p>
      <p>{item.name}</p>
      <p>{item.alcohol}</p>
      <p>{item.price} 원</p>
      <p>
        <Button onClick={handleLike} disabled={liked}>
          {liked ? "🩶" : "❤️"}
        </Button>
      </p>
    </div>
  );
}

function RecommendPage() {
  const [sortedData, setSortedData] = useState(mockData);
  const [sortOrder, setSortOrder] = useState({ type: "", direction: "asc" });
  const [filterType, setFilterType] = useState("");

  // 정렬 함수
  const sortData = (key) => {
    const sorted = [...sortedData];
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

    setSortedData(sorted);
    setSortOrder({
      type: key,
      direction: sortOrder.direction === "asc" ? "desc" : "asc",
    });
  };

  // 필터링 함수
  const filterData = (type) => {
    if (type === "") {
      setSortedData(mockData);
    } else {
      const filtered = mockData.filter((item) => item.type === type);
      setSortedData(filtered);
    }
    setFilterType(type);
  };

  return (
    <>
      <Nav />
      <StyledRecommend>
        <p>오늘의 날씨에 따른 추천 결과입니다.</p>

        {/* 필터링: 주종 선택 */}

        {/* 정렬 버튼들 */}
        <div>
          <Select
            value={filterType}
            onChange={(e) => filterData(e.target.value)}
          >
            <option value="">전체</option>
            <option value="소주">소주</option>
            <option value="맥주">맥주</option>
            <option value="와인">와인</option>
          </Select>

          <Button onClick={() => sortData("name")}>
            이름{" "}
            {sortOrder.type === "name"
              ? sortOrder.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </Button>
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
        </div>
        <RecommendIndex />
        {/* 데이터 출력 */}
        {sortedData.map((item, index) => (
          <RecommendItem key={index} item={item} />
        ))}
      </StyledRecommend>
    </>
  );
}

export default RecommendPage;
