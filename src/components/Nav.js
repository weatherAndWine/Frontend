import { useNavigate } from "react-router-dom";
import "./Nav.css";
import nav_logo from "../img/nav_logo.png";
import non_profile from "../img/profile.png";
function Nav() {
  const navigate = useNavigate();
  const profile_img = JSON.parse(localStorage.getItem("profile-img"));
  //console.log(`프로필 링크${profile_img}`);
  return (
    <div className="container">
      <img src={nav_logo} onClick={() => navigate("/main")} />
      {profile_img ? (
        <img
          src={profile_img}
          alt={"프로필"}
          style={{
            width: "40px", // 너비
            height: "40px", // 높이
            borderRadius: "50%", // 원형
            objectFit: "cover", // 이미지가 영역에 꽉 차도록
            cursor: "pointer", // 클릭 가능 표시
          }}
          onClick={() => navigate("/mypage")}
        />
      ) : (
        <img
          src={non_profile}
          alt={"프로필"}
          style={{
            width: "40px", // 너비
            height: "40px", // 높이
            borderRadius: "50%", // 원형
            objectFit: "cover", // 이미지가 영역에 꽉 차도록
            cursor: "pointer", // 클릭 가능 표시
          }}
          onClick={() => navigate("/mypage")}
        />
      )}
    </div>
  );
}
export default Nav;
