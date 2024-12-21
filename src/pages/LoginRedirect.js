import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URI = process.env.REACT_APP_K_REDIRECT_URI;

function KakaoRedirect({ setUserInfo }) {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const getToken = async () => {
    const token = new URL(window.location.href).searchParams.get("code");
    const res = axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: K_REST_API_KEY,
        redirect_uri: K_REDIRECT_URI,
        code: token,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return res;
    console.log(res);
  };

  useEffect(() => {
    getToken()
      .then((res) => {
        if (res) {
          localStorage.setItem("token", JSON.stringify(res.data.access_token));
          navigate("/main");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}

export default KakaoRedirect;
