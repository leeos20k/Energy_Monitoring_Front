import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { authStore } from "Store";
import { palette } from "Style";
import { observer, useObserver } from "mobx-react";

const AccountSection = styled.div`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  .userName {
    min-width: 60px;
    text-align: right;
    margin-right : 10px;
  }
  .login {
    padding : 0px 10px;
    height: 30px;
    border-radius: 5px;
    color: white;
    text-align: center;
    line-height: 30px;
    border: 1.5px solid white;
  }
  .logout {
    padding : 0px 10px;
    height: 30px;
    border-radius: 5px;
    color: white;
    text-align: center;
    line-height: 30px;
    border: 1.5px solid white;
  }
  .login,
  .logout:hover {
    cursor: pointer;
  }
  .login:active {
    background-color: white;
    color : ${palette.PrimaryColor};
  }
  .logout:active {
    background-color: white;
    background-color: white;
    color : ${palette.PrimaryColor};
  }
  .autenticated {
    display: flex;
    align-items: center;
  }
  .notAuthenticated {
  }
`;
const Account = observer(() => {
  const navivate = useNavigate();

  const logOut = () => {
    authStore.removeAuthInfo();
    sessionStorage.clear();
    navivate("/");
  };
  return useObserver(() => (
    <AccountSection>
      {authStore.authenticated ? (
        <div className="autenticated">
          <div className="userName">{authStore.userNm}</div>
          <div className="logout" onClick={logOut}>
            로그아웃
          </div>
        </div>
      ) : (
        <div className="notAutenticated">
          <Link to={"/Login"}>
            <div className="login">로그인</div>
          </Link>
        </div>
      )}
    </AccountSection>
  ));
});
export default Account;
