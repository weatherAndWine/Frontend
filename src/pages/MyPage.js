import BodyPage from "../components/BodyPage";
import Nav from "../components/Nav";

function MyPage({ userInfo }) {
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
  console.log(likedItems);
  console.log(likedItems[0].name);
  return (
    <>
      <Nav />
      <BodyPage>
        <p>안녕하세요, {}님!</p>
        <p>좋아요 목록</p>
        {likedItems.map((item, index) => (
          <p key={index} item={item}>
            {likedItems[index].name}
          </p>
        ))}
      </BodyPage>
    </>
  );
}

export default MyPage;
