import BodyPage from "../components/BodyPage";
import kakaoImg from "../img/kakao_login_medium_narrow.png";
import { Link } from "react-router-dom";
import logo from "../img/image.png";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = process.env.REACT_APP_K_REDIRECT_URI;

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL; //kakaoURL로 이동
  };
  //console.log(K_REDIRECT_URI);
  //console.log(K_REST_API_KEY);
  return (
    <div>
      <BodyPage>
        <img src={logo} />
        <Link>
          <img
            className="KakaoButton"
            onClick={handleKakaoLogin}
            src={kakaoImg}
            alt="카카오로그인"
          />
        </Link>
      </BodyPage>
    </div>
  );
}

export default LoginPage;
