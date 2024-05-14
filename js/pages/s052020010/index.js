import { API_POST } from 'Api';
import { MessageKor } from 'Message';
import { authStore } from "Store";
import { observer } from 'mobx-react';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginView from "./view/LoginView";

const Login = observer(() => {

  const Message = MessageKor;
  const navigate = useNavigate();

  const [loginParams, setLoginParams] = useState({
    userNm: '',
    hpNo: '010',
    appTp: '02'
  })

  const paramsCheck = () => {
    if (loginParams.userNm === '') {
      alert(Message.S05_M_000003)
      return false
    } else if (loginParams.hpNo.length !== 11) {
      alert(Message.S05_M_000004)
      return false
    } else {
      return true
    }
  }

  const onClickLogin = async () => {
    if (!paramsCheck()) {
      return
    }
    try {
      const { data } = await API_POST(`/s052020010/user`, loginParams)
      if (data.data.length !== 0) {
        authStore.setAuthInfo(data.data[0])
        sessionStorage["userInfo"] = JSON.stringify(data.data[0]);
        navigate("/Main")
      } else {
        alert(Message.S05_M_000008)
        return
      }
    } catch (e) {
      alert(Message.S05_M_000001)
      console.log(e)
    }
  }

  const onPress = (e) => {
    if (e.key === 'Enter') {
      onClickLogin()
    }
  }

  const initPage = async () => {
    if (authStore.authenticated) {
      navigate("/Main")
    }
  }

  useEffect(() => {
    initPage()
  }, [])

  return (
    <LoginView
      loginParams={loginParams}
      setLoginParams={setLoginParams}
      onClickLogin={onClickLogin}
      onPress={onPress}
    />
  );
})

export default Login;
