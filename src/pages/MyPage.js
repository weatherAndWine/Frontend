import BodyPage from "../components/BodyPage";
import Nav from "../components/Nav";

function MyPage({ userInfo }) {
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

  console.log("Liked items:", likedItems);

  return (
    <>
      <Nav />
      <BodyPage>
        <p>안녕하세요, {userInfo?.profile_nickname || "사용자"}님!</p>
        <p>좋아요 목록</p>
        {likedItems.length > 0 ? (
          likedItems.map((item, index) => (
            <p key={index}>{item.profile_nickname || "닉네임 정보 없음"}</p>
          ))
        ) : (
          <p>좋아요 목록이 비어 있습니다.</p>
        )}
      </BodyPage>
    </>
  );
}

export default MyPage;
