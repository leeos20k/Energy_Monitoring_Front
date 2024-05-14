import { LoginButton, LoginInput } from "Elements";
import LoginBg from "Img/loginBg.png";
import { palette } from "Style";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginWrapper = styled.div`
  .loginBg {
    width: 100vw;
    height: 100vh;
    background: url(${LoginBg}) no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loginTitle {
    position: absolute;
    top: 20px;
    left: 20px;
    font-family: "Pretendard";
    font-weight: 800;
    font-size: 3vw;
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .loginBox {
    width: 25%;
    height: 65%;
    background-color: white;
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
  }
  .loginText {
    font-size: 3vw;
    font-weight: 700;
    text-align: center;
    color: ${palette.SecondaryColor};
    margin-top: 50px;
  }
  .loginForm {
    width: 90%;
    margin: 0 auto;
    margin-top: auto;
    margin-bottom: 30px;
  }
  #hpInput {
    margin-bottom: 20px;
  }
  #loginBtn {
    margin: 20px 0;
  }
  .back {
    font-size: 1vw;
    font-weight: 500;
    color: white;
    margin-top: 20px;
  }
`;

const LoginView = ({ loginParams, setLoginParams, onClickLogin, onPress }) => {
  const navigate = useNavigate();

  return (
    <LoginWrapper>
      <div className="loginBg">
        <div className="loginTitle">IOT 모니터링 시스템</div>
        <div className="loginBox">
          <div className="loginText">로그인</div>
          <div className="loginForm">
            <LoginInput
              label="이름"
              id="hpInput"
              value={loginParams.userNm}
              onChange={(e) =>
                setLoginParams({ ...loginParams, userNm: e.target.value })
              }
            />
            <LoginInput
              label="휴대폰"
              id="pwInput"
              maxLength="13"
              value={
                loginParams?.hpNo.length > 7
                  ? `${loginParams?.hpNo.substring(
                      0,
                      3
                    )}-${loginParams?.hpNo.substring(
                      3,
                      7
                    )}-${loginParams?.hpNo.substring(7)}`
                  : loginParams?.hpNo.length > 3
                  ? `${loginParams?.hpNo.substring(
                      0,
                      3
                    )}-${loginParams?.hpNo.substring(3)}`
                  : loginParams?.hpNo
              }
              onChange={(e) => {
                const regex = /^[0-9\b -]{0,13}$/;
                if (regex.test(e.target.value)) {
                  setLoginParams({
                    ...loginParams,
                    hpNo: e.target.value.replace(/-/gi, ""),
                  });
                }
              }}
              onKeyPress={onPress}
            />
            <LoginButton
              id="loginBtn"
              btnText="로그인"
              onClick={() => {
                onClickLogin();
              }}
            />
          </div>
        </div>
        <div className="back" onClick={() => navigate("/")}>
          이전 페이지로 돌아가기
        </div>
      </div>
    </LoginWrapper>
  );
};
export default LoginView;
