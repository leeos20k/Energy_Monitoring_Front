import { Button, Input, SearchBtn, Selectbox } from "Elements";
import { Loading } from "Layout";
import { useModal, useModalSub, useInterval } from "Hooks";
import { Header } from "Layout";
import { palette } from "Style";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PumpLevelGraph from "../../s052030020";
import RectifierGraph from "../../s052030030";
import MalfunctionStatus from "../../s052030070";
import Waveform from "../../s052030080";
import PumpIllust from "Img/pumpIllust.svg";
import PumpImg from "Img/pumpImg.svg";
import TankImg from "Img/tankImg.svg";
import FlowImgUp from "Img/flowIconUp.png";
import FlowImgLeft from "Img/flowIconLeft.png";
import FlowImgRight from "Img/flowIconRight.png";
import FlowImgDown from "Img/flowIconDown.png";
import FlowImgDownRed from "Img/flowIconDown-Red.png";
import FlowImgLeftRed from "Img/flowIconLeft-Red.png";
import AlarmIcon from "Img/alertIcon.png";

const MainWrapper = styled.div`
  .layer {
    width: 95%;
    display: flex;
    flex-direction: "row";
    align-items: "center";
    justify-content: "flex-start";
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .inputWrap {
    margin-right: 15px;
  }
  .wave {
    font-family: "Pretendard";
    font-weight: 700;
    line-height: 30px;
    margin-right: 15px;
  }
  .rightBtn {
    margin-left: auto;
    margin-right: -15px;
  }
  .illustWrap {
    width: 90%;
    height: 500px;
    padding: 80px 0 100px 0;
    margin: 20px auto;
    background-color: whitesmoke;
    position: relative;
    overflow: hidden;
    border: 5px double #333;
    border-radius: 10px;
  }

  .textWrap {
    width: 1200px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  }
  .illust {
    width: 1200px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
  }

  .tankWrap {
    width: 1200px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .tank {
    position: absolute;
    background-color: #62b2e4;
    /* background-color: #eb6877; */
    transform-origin: bottom;
    transform: scaleY(1); /* 초기에는 높이가 0이 되도록 설정 */
    transition: transform 0.5s ease-in-out;
  }
  .percentage {
    position: absolute;
    color: #2b2f54;
    font-size: 26px;
    font-weight: 800;
    font-family: "Pretendard";
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .percentage > span {
    font-size: 22px;
  }
  .pump {
    position: absolute;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0px;
    font-family: "Pretendard";
    text-align: center;
    color: #333;
    word-break: keep-all;
    display: inline-block;
  }
  .pump:hover {
    cursor: pointer;
  }
  .fa-solid {
    margin-left: 5px;
  }
  .fa-solid:hover {
    cursor: pointer;
  }

  .tankNm {
    position: absolute;
    font-size: 16px;
    font-weight: 800;
    font-family: "Pretendard";
    text-align: center;
    color: #333;
    word-break: keep-all;
    display: inline-block;
  }
  .tankNm:hover {
    cursor: pointer;
  }
  #tank1 {
    left: 75px;
    top: 35px;
    width: 115px;
    height: 167px;
  }
  #tank2 {
    right: 275px;
    top: 35px;
    width: 115px;
    height: 167px;
  }
  #tank3 {
    right: 207px;
    bottom: 12px;
    width: 188px;
    height: 169px;
  }
  #tank4 {
    left: 268px;
    bottom: 15px;
    width: 202px;
    height: 129px;
  }
  #tankNm0 {
    left: 70px;
    top: 215px;
    min-width: 125px;
  }
  #tankNm1 {
    right: 265px;
    top: 215px;
    min-width: 125px;
  }
  #tankNm2 {
    right: 203px;
    bottom: -25px;
    min-width: 195px;
  }
  #tankNm3 {
    left: 307px;
    bottom: -25px;
    min-width: 120px;
  }
  #percentage0 {
    left: 75px;
    top: 35px;
    width: 115px;
    height: 167px;
  }
  #percentage1 {
    right: 275px;
    top: 35px;
    width: 115px;
    height: 167px;
  }
  #percentage2 {
    right: 207px;
    bottom: 12px;
    width: 188px;
    height: 169px;
  }
  #percentage3 {
    left: 268px;
    bottom: 15px;
    width: 202px;
    height: 129px;
  }
  .alarmLine {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: green;
    bottom: 0;
    transition: transform 0.5s ease-in-out;
  }
  #pump0 {
    right: -40px;
    top: 510px;
    width: 120px;
  }
  #pump1 {
    right: 80px;
    top: 510px;
    width: 120px;
  }
  #pump2 {
    left: -48px;
    top: 510px;
    width: 170px;
  }
  #pump3 {
    left: 535px;
    top: 425px;
    min-width: 170px;
  }
  #pump4 {
    left: 654px;
    top: 510px;
    min-width: 170px;
  }
  .illustTitle {
    font-size: 22px;
    font-weight: 700;
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    border: 2.5px solid #2b2b2b;
    background-color: white;
    padding: 5px 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  .legendWrap {
    float: right;
    margin-right: 20px;
    margin-top: -65px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  .legend {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .legend:last-child {
    margin-bottom: 0;
  }
  .legendImg {
    margin-right: 20px;
  }
  .legendText {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  .legendImg > img {
    width: 30px;
    height: 30px;
  }
  .legendImg > i {
    display: inline-block;
    text-align: center;
    width: 30px;
    margin: 0;
    font-size: 22px;
  }
  .pipe1 {
    width: 30px;
    height: 10px;
    background-color: rgb(244, 183, 211);
  }
  .pipe2 {
    width: 30px;
    height: 10px;
    background-color: rgb(153, 209, 251);
  }
  .curTime {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  .tankNm > a,
  .pump > a {
    display: inline-block;
    border-bottom: 1.5px solid #333;
    margin: 5px 0 5px 0;
  }
  .flowWrap {
    width: 1200px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  }
  @keyframes moveUp {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 0 -100%;
    }
  }

  @keyframes moveDown {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 0 100%;
    }
  }

  @keyframes moveLeft {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
  @keyframes moveRight {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 100% 0;
    }
  }

  #flow1 {
    position: absolute;
    left: 31.5px;
    top: 5px;
    width: 10px;
    height: 430px;
    overflow-y: hidden;
    background: url(${FlowImgUp}) repeat-y center;
    background-size: 100%;
    -webkit-animation: moveUp 10s linear infinite;
    -moz-animation: moveUp 10s linear infinite;
    -o-animation: moveUp 10s linear infinite;
  }
  #flow2 {
    position: absolute;
    left: 40px;
    top: 3px;
    width: 64px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgRight}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveRight 2s linear infinite;
    -moz-animation: moveRight 2s linear infinite;
    -o-animation: moveRight 2s linear infinite;
  }
  #flow3 {
    position: absolute;
    left: 93px;
    top: 13px;
    width: 11px;
    height: 14px;
    overflow-y: hidden;
    background: url(${FlowImgDown}) repeat-y center;
    background-size: 100% 20px;
    -webkit-animation: moveDown 1s linear infinite;
    -moz-animation: moveDown 1s linear infinite;
    -o-animation: moveDown 1s linear infinite;
  }
  #flow4 {
    position: absolute;
    right: 457.5px;
    top: 5px;
    width: 10px;
    height: 430px;
    overflow-y: hidden;
    background: url(${FlowImgUp}) repeat-y center;
    background-size: 100%;
    -webkit-animation: moveUp 10s linear infinite;
    -moz-animation: moveUp 10s linear infinite;
    -o-animation: moveUp 10s linear infinite;
  }
  #flow5 {
    position: absolute;
    right: 360px;
    top: 1px;
    width: 95px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgRight}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveRight 2s linear infinite;
    -moz-animation: moveRight 2s linear infinite;
    -o-animation: moveRight 2s linear infinite;
  }
  #flow6 {
    position: absolute;
    right: 360px;
    top: 13px;
    width: 11px;
    height: 14px;
    overflow-y: hidden;
    background: url(${FlowImgDown}) repeat-y center;
    background-size: 100% 20px;
    -webkit-animation: moveDown 1s linear infinite;
    -moz-animation: moveDown 1s linear infinite;
    -o-animation: moveDown 1s linear infinite;
  }
  #flow7 {
    position: absolute;
    right: 470px;
    bottom: 169px;
    width: 118px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgRight}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveRight 2.5s linear infinite;
    -moz-animation: moveRight 2.5s linear infinite;
    -o-animation: moveRight 2.5s linear infinite;
  }
  #flow8 {
    position: absolute;
    right: 470px;
    bottom: 121px;
    width: 90px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeft}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 2s linear infinite;
    -moz-animation: moveLeft 2s linear infinite;
    -o-animation: moveLeft 2s linear infinite;
  }
  #flow9 {
    position: absolute;
    right: 405px;
    bottom: 121px;
    width: 50px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeft}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 1s linear infinite;
    -moz-animation: moveLeft 1s linear infinite;
    -o-animation: moveLeft 1s linear infinite;
  }
  #flow10 {
    position: absolute;
    right: 35px;
    bottom: 90px;
    width: 100px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeft}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 4s linear infinite;
    -moz-animation: moveLeft 4s linear infinite;
    -o-animation: moveLeft 4s linear infinite;
  }
  #flow11 {
    position: absolute;
    right: 134px;
    bottom: 90px;
    width: 65px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeft}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 2s linear infinite;
    -moz-animation: moveLeft 2s linear infinite;
    -o-animation: moveLeft 2s linear infinite;
  }
  #flow12 {
    position: absolute;
    right: 34px;
    bottom: 65px;
    width: 10px;
    height: 22px;
    overflow-y: hidden;
    background: url(${FlowImgUp}) repeat-y center;
    background-size: 100% auto;
    -webkit-animation: moveUp 0.8s linear infinite;
    -moz-animation: moveUp 0.8s linear infinite;
    -o-animation: moveUp 0.8s linear infinite;
  }
  #flow13 {
    position: absolute;
    right: 134px;
    bottom: 65px;
    width: 10px;
    height: 22px;
    overflow-y: hidden;
    background: url(${FlowImgUp}) repeat-y center;
    background-size: 100% auto;
    -webkit-animation: moveUp 0.8s linear infinite;
    -moz-animation: moveUp 0.8s linear infinite;
    -o-animation: moveUp 0.8s linear infinite;
  }
  #flow14 {
    position: absolute;
    right: 405px;
    bottom: 40px;
    width: 35px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeft}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 0.8s linear infinite;
    -moz-animation: moveLeft 0.8s linear infinite;
    -o-animation: moveLeft 0.8s linear infinite;
  }
  #flow15 {
    position: absolute;
    right: 578px;
    bottom: 145px;
    width: 10px;
    height: 22px;
    overflow-y: hidden;
    background: url(${FlowImgUp}) repeat-y center;
    background-size: 100% auto;
    -webkit-animation: moveUp 0.8s linear infinite;
    -moz-animation: moveUp 0.8s linear infinite;
    -o-animation: moveUp 0.8s linear infinite;
  }

  // 추후 반영 예정

  /* #flow16 {
    position: absolute;
    right: 335px;
    top: 215px;
    width: 10px;
    height: 50px;
    overflow-y: hidden;
    background: url(${FlowImgDownRed}) repeat-y center;
    background-size: 100%;
    -webkit-animation: moveDown 2s linear infinite;
    -moz-animation: moveDown 2s linear infinite;
    -o-animation: moveDown 2s linear infinite;
  }
  #flow17 {
    position: absolute;
    right: 335px;
    top: 268px;
    width: 120px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeftRed}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 2.5s linear infinite;
    -moz-animation: moveLeft 2.5s linear infinite;
    -o-animation: moveLeft 2.5s linear infinite;
  }
  #flow18 {
    position: absolute;
    right: 470px;
    top: 268px;
    width: 400px;
    height: 10px;
    overflow-y: hidden;
    background: url(${FlowImgLeftRed}) repeat-x center;
    background-size: auto 100%;
    -webkit-animation: moveLeft 6s linear infinite;
    -moz-animation: moveLeft 6s linear infinite;
    -o-animation: moveLeft 6s linear infinite;
  }
  #flow18 {
    position: absolute;
    left: 318px;
    top: 270px;
    width: 10px;
    height: 75px;
    overflow-y: hidden;
    background: url(${FlowImgDownRed}) repeat-y center;
    background-size: 100%;
    -webkit-animation: moveDown 2s linear infinite;
    -moz-animation: moveDown 2s linear infinite;
    -o-animation: moveDown 2s linear infinite;
  } */
  .tankInfo {
    display: flex;
    align-items :center;
    border: 1.5px solid #333;
    padding: 5px 10px;
    border-radius: 100px;
    background-color : white;
    color : 333;
    font-weight : 600;

  }
  .light {
    width: 10px;
    height: 10px;
    border-radius: 100px;
    margin-right : 10px;
  }
  #tankInfo4 {
    position: absolute;
    right: 725px;
    bottom: 165px;
  }

  .alarmWrap {
    width: 25px;
    height: 25px;
    background-color: #888;
    margin: 0 auto;
    margin-top: 3px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .alarmWrap:hover {
    cursor: pointer;
  }
  .alarmWrap > img {
    width: 60%;
    height: 60%;
  }

  .tableHeadRow {
    border-radius: 10px;
  }

  .tableWrap {
    width: 95%;
    height: 65vh;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .showGraph {
    border-bottom: 1px solid #888;
  }
  .showGraph:hover {
    cursor: pointer;
  }
  .tab {
    width: 150px;
    height: 30px;
    border-radius: 5px;
    margin-right: 15px;
    border: 2px solid ${palette.SecondaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${palette.SecondaryColor};
    font-size: 14px;
    font-weight: 600;
    font-family: "Pretendard";
  }
  .tab:hover {
    cursor: pointer;
  }
  .tabSelected {
    width: 150px;
    height: 30px;
    border-radius: 5px;
    margin-right: 15px;
    border: 2px solid ${palette.SecondaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: ${palette.SecondaryColor};
    font-size: 14px;
    font-weight: 600;
    font-family: "Pretendard";
  }
  .tableBtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .alarmCheckBtn {
    background-color: white;
    color: #eb6877;
    padding: 5px 20px;
    border: 1px solid #eb6877;
    border-radius: 5px;
  }
  .mysrc {
    display: none;
  }
`;

const MainView = ({
  searchParams,
  setSearchParams,
  tabFlag,
  onClickSearch,
  list,
  slaveInfo,
  setSlaveInfo,
  openUserModal,
  setModalFlag,
  onClickImage,
  subModalFlag,
  setSubModalFlag,
  adminFlag,
  tpOption,
  setTabFlag,
  handlePageChange,
  loadingFlag,
  intervalState,
  setIntervalState,
  intervalFunction,
  onClickAlarmCheck,
}) => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const { openModalSub, closeModalSub, ModalPortalSub } = useModalSub();
  const [selected, setSelected] = useState({
    tabNum: 1,
    selected1: true,
    selected2: false,
  });

  let today = new Date();

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  const showGraph = (
    slaveId,
    seq,
    slaveDetailNm,
    slaveTp,
    slaveTpNm,
    rValue,
    sValue,
    tValue,
    lValue,
    pumpEventTm,
    pumpEventTmAgo,
  ) => {
    openModal();
    setSlaveInfo({
      slaveId: slaveId || "",
      seq: seq || "",
      slaveDetailNm: slaveDetailNm,
      slaveTpNm: slaveTpNm,
      slaveTp: slaveTp,
      rValue: rValue,
      sValue: sValue,
      tValue: tValue,
      lValue: lValue,
      pumpEventTm: pumpEventTm || "",
      pumpEventTmAgo: pumpEventTmAgo || "",
    });
  };

  // 탭 선택
  const select = (num) => {
    if (num === 1)
      setSelected({
        ...selected,
        tabNum: num,
        selected1: true,
        selected2: false,
      });
    else if (num === 2)
      setSelected({
        ...selected,
        tabNum: num,
        selected1: false,
        selected2: true,
      });
  };

  useInterval(() => {
    if (intervalState) {
      intervalFunction();
    } else {
      return;
    }
  }, 10000);

  return (
    <MainWrapper>
      <iframe className="mysrc" allow="microphone;" />
      <Header />
      <div className="subPageTitle">
        <div className="subPageTitleText">모니터링</div>
      </div>
      <div className="layer">
        <div className="inputWrap">
          <Input
            placeholder="Slave 명"
            value={searchParams.slaveNm || ""}
            onChange={(e) =>
              setSearchParams({ ...searchParams, slaveNm: e.target.value })
            }
          />
        </div>
        <div className="inputWrap">
          <Input
            placeholder="마스터 명"
            value={searchParams.masterNm || ""}
            onChange={(e) =>
              setSearchParams({ ...searchParams, masterNm: e.target.value })
            }
          />
        </div>

        <div className="inputWrap">
          <Selectbox
            placeholder="구분"
            option={tpOption}
            onChange={(e) => {
              setSearchParams({ ...searchParams, slaveTp: e.target.value });
            }}
            defaultValue={searchParams?.slaveTp}
          />
        </div>
        <SearchBtn onClick={() => onClickSearch(1)} />
      </div>
      <div className="layer">
        <Button
          btnText="고장현황"
          onClick={() => {
            setSubModalFlag(true);
            setIntervalState(false);
            openModalSub();
          }}
        />
        <Button
          btnText="파형비교"
          onClick={() => {
            setSubModalFlag(false);
            setIntervalState(false);
            openModalSub();
          }}
        />
        {adminFlag === "Y" ? (
          <Button
            className="rightBtn"
            btnText="사용자 관리"
            onClick={() => {
              setModalFlag(true);
              setIntervalState(false);
              openUserModal();
            }}
          />
        ) : null}
      </div>

      <div className="layer">
        <div
          className={selected.tabNum === 1 ? "tabSelected" : "tab"}
          onClick={() => {
            select(1);
          }}
        >
          그래픽
        </div>
        <div
          className={selected.tabNum === 2 ? "tabSelected" : "tab"}
          onClick={() => {
            select(2);
          }}
        >
          모니터링
        </div>
      </div>
      {selected.tabNum === 1 ? (
        <div className="illustWrap">
          <div className="curTime">{today.toLocaleString()}</div>
          <div className="illustTitle">
            청주공장 고가/지하 수조 구성도 및 위치
          </div>
          <div className="legendWrap">
            <div className="legend">
              <div className="legendImg">
                <img src={TankImg} />
              </div>
              <p className="legendText">수조</p>
            </div>
            <div className="legend">
              <div className="legendImg">
                <img src={PumpImg} />
              </div>
              <p className="legendText">펌프</p>
            </div>
            <div className="legend">
              <div className="legendImg">
                <div className="pipe1" />
              </div>
              <p className="legendText">자중낙하</p>
            </div>
            <div className="legend">
              <div className="legendImg">
                <div className="pipe2" />
              </div>
              <p className="legendText">펌핑</p>
            </div>
            <div className="legend">
              <div className="legendImg">
                <i className="fa-solid fa-paperclip" />
              </div>
              <p className="legendText">첨부파일</p>
            </div>
          </div>
          <div className="flowWrap">
            <div
              id="flow1"
              style={{
                backgroundImage: list[3]?.rValue ? `url(${FlowImgUp})` : "none",
              }}
            />
            <div
              id="flow2"
              style={{
                backgroundImage: list[3]?.rValue
                  ? `url(${FlowImgRight})`
                  : "none",
              }}
            />
            <div
              id="flow3"
              style={{
                backgroundImage: list[3]?.rValue
                  ? `url(${FlowImgDown})`
                  : "none",
              }}
            />
            <div
              id="flow4"
              style={{
                backgroundImage:
                  list[4]?.rValue || list[5]?.rValue
                    ? `url(${FlowImgUp})`
                    : "none",
                height: list[5]?.rValue ? 430 : 330,
              }}
            />
            <div
              id="flow5"
              style={{
                backgroundImage:
                  list[4]?.rValue || list[5]?.rValue
                    ? `url(${FlowImgRight})`
                    : "none",
              }}
            />
            <div
              id="flow6"
              style={{
                backgroundImage:
                  list[4]?.rValue || list[5]?.rValue
                    ? `url(${FlowImgDown})`
                    : "none",
              }}
            />
            <div
              id="flow7"
              style={{
                backgroundImage: list[4]?.rValue
                  ? `url(${FlowImgRight})`
                  : "none",
              }}
            />
            <div
              id="flow8"
              style={{
                backgroundImage: list[4]?.rValue
                  ? `url(${FlowImgLeft})`
                  : "none",
              }}
            />
            <div
              id="flow9"
              style={{
                backgroundImage: list[4]?.rValue
                  ? `url(${FlowImgLeft})`
                  : "none",
              }}
            />
            <div
              id="flow10"
              style={{
                backgroundImage: list[1]?.rValue
                  ? `url(${FlowImgLeft})`
                  : "none",
                width: list[2]?.rValue ? 100 : 160,
              }}
            />
            <div
              id="flow11"
              style={{
                backgroundImage: list[2]?.rValue
                  ? `url(${FlowImgLeft})`
                  : "none",
              }}
            />
            <div
              id="flow12"
              style={{
                backgroundImage: list[1]?.rValue ? `url(${FlowImgUp})` : "none",
              }}
            />
            <div
              id="flow13"
              style={{
                backgroundImage: list[2]?.rValue ? `url(${FlowImgUp})` : "none",
              }}
            />
            <div
              id="flow14"
              style={{
                backgroundImage: list[5]?.rValue
                  ? `url(${FlowImgLeft})`
                  : "none",
              }}
            />
            <div
              id="flow15"
              style={{
                backgroundImage: list[4]?.rValue ? `url(${FlowImgUp})` : "none",
              }}
            />
            {/* <div
          id="flow16"
          style={{
            backgroundImage: list[34]?.lValue
              ? `url(${FlowImgDownRed})`
              : "none",
          }}
        />
        <div
          id="flow17"
          style={{
            backgroundImage: list[34]?.lValue
              ? `url(${FlowImgLeftRed})`
              : "none",
          }}
        />
        <div
          id="flow18"
          style={{
            backgroundImage: list[34]?.lValue
              ? `url(${FlowImgLeftRed})`
              : "none",
          }}
        />
        <div
          id="flow19"
          style={{
            backgroundImage: list[34]?.lValue
              ? `url(${FlowImgDownRed})`
              : "none",
          }}
        /> */}
          </div>
          <img className="illust" src={PumpIllust} />
          <div className="tankWrap">
            <div
              className="tank"
              id="tank1"
              style={{
                backgroundColor:
                  list[31]?.lValue < list[31]?.alarmMinValue ||
                  list[31]?.lValue > list[31]?.alarmMaxValue
                    ? "#eb6877"
                    : "#62b2e4",
                transform: `scaleY(${clamp(
                  ((list[31]?.lValue - 4) * 6.25) / 100,
                  0,
                  1
                )})`,
                transition: "transform 0.5s ease-in-out",
              }}
            />
            <div
              className="tank"
              id="tank2"
              style={{
                backgroundColor:
                  list[32]?.lValue < list[32]?.alarmMinValue ||
                  list[32]?.lValue > list[32]?.alarmMaxValue
                    ? "#eb6877"
                    : "#62b2e4",
                transform: `scaleY(${clamp(
                  ((list[32]?.lValue - 4) * 6.25) / 100,
                  0,
                  1
                )})`,

                transition: "transform 0.5s ease-in-out",
              }}
            />
            <div
              className="tank"
              id="tank3"
              style={{
                backgroundColor:
                  list[33]?.lValue < list[33]?.alarmMinValue ||
                  list[33]?.lValue > list[33]?.alarmMaxValue
                    ? "#eb6877"
                    : "#62b2e4",
                transform: `scaleY(${clamp(
                  ((list[33]?.lValue - 4) * 6.25) / 100,
                  0,
                  1
                )})`,

                transition: "transform 0.5s ease-in-out",
              }}
            />
            <div
              className="tank"
              id="tank4"
              style={{
                backgroundColor:
                  list[34]?.lValue < list[34]?.alarmMinValue ||
                  list[34]?.lValue > list[34]?.alarmMaxValue
                    ? "#eb6877"
                    : "#62b2e4",
                transform: `scaleY(${clamp(
                  ((list[34]?.lValue - 4) * 6.25) / 100,
                  0,
                  1
                )})`,
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </div>
          <div className="textWrap">
            <div className="percentage" id="percentage0">
              <p>
                {list[31]?.lValue == null
                  ? "-"
                  : list[31]?.lValue === 0
                  ? "0%"
                  : Math.ceil((list[31]?.lValue - 4) * 6.25) + "%"}
              </p>
              <span>
                {list[31]?.lValue == null
                  ? "( - )"
                  : "(" + list[31]?.lValue + ")"}
              </span>
              <div
                className="alarmLine"
                id="alarmMaxLine1"
                style={{
                  bottom: (167 * ((list[31]?.alarmMaxValue - 4) * 6.25)) / 100,
                }}
              />
              <div
                className="alarmLine"
                id="alarmMinLine1"
                style={{
                  bottom: (167 * ((list[31]?.alarmMinValue - 4) * 6.25)) / 100,
                }}
              />
            </div>
            <div className="percentage" id="percentage1">
              <p>
                {list[32]?.lValue == null
                  ? "-"
                  : list[32].lValue === 0
                  ? "0%"
                  : Math.ceil((list[32].lValue - 4) * 6.25) + "%"}
              </p>
              <span>
                {list[32]?.lValue == null
                  ? "( - )"
                  : "(" + list[32]?.lValue + ")"}
              </span>
              <div
                className="alarmLine"
                id="alarmMaxLine1"
                style={{
                  bottom: (167 * ((list[32]?.alarmMaxValue - 4) * 6.25)) / 100,
                }}
              />
              <div
                className="alarmLine"
                id="alarmMinLine1"
                style={{
                  bottom: (167 * ((list[32]?.alarmMinValue - 4) * 6.25)) / 100,
                }}
              />
            </div>
            <div className="percentage" id="percentage2">
              <p>
                {list[33]?.lValue == null
                  ? "-"
                  : list[33].lValue === 0
                  ? "0%"
                  : Math.ceil((list[33].lValue - 4) * 6.25) + "%"}
              </p>
              <span>
                {list[33]?.lValue == null
                  ? "( - )"
                  : "(" + list[33]?.lValue + ")"}
              </span>
              <div
                className="alarmLine"
                id="alarmMaxLine1"
                style={{
                  bottom: (169 * ((list[33]?.alarmMaxValue - 4) * 6.25)) / 100,
                }}
              />
              <div
                className="alarmLine"
                id="alarmMinLine1"
                style={{
                  bottom: (169 * ((list[33]?.alarmMinValue - 4) * 6.25)) / 100,
                }}
              />
            </div>
            <div className="percentage" id="percentage3">
              <p>
                {list[34]?.lValue == null
                  ? "-"
                  : list[34].lValue === 0
                  ? "0%"
                  : Math.ceil((list[34].lValue - 4) * 6.25) + "%"}
              </p>
              <span>
                {list[34]?.lValue == null
                  ? "( - )"
                  : "(" + list[34]?.lValue + ")"}
              </span>
              <div
                className="alarmLine"
                id="alarmMaxLine1"
                style={{
                  bottom: (129 * ((list[34]?.alarmMaxValue - 4) * 6.25)) / 100,
                }}
              />
              <div
                className="alarmLine"
                id="alarmMinLine1"
                style={{
                  bottom: (129 * ((list[34]?.alarmMinValue - 4) * 6.25)) / 100,
                }}
              />
            </div>
            <div className="pump" id="pump0">
              <a
                onClick={() =>
                  showGraph(
                    list[1]?.slaveId,
                    list[1]?.seq,
                    list[1]?.slaveDetailNm,
                    list[1]?.slaveTp,
                    list[1]?.slaveTpNm,
                    list[1]?.rValue,
                    list[1]?.sValue,
                    list[1]?.tValue,
                    list[1]?.lValue,
                    list[1]?.pumpEventTm,
                    list[1]?.pumpEventTmAgo
                  )
                }
              >
                (정격:10A/{list[1]?.rValue == null ? "-" : list[1]?.rValue}A)
              </a>
              <p>
                {list[1]?.slaveDetailNm == null ? "-" : list[1]?.slaveDetailNm}
                {list[1]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[1]?.slaveId, list[1]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
              <div
                className="alarmWrap"
                style={{
                  backgroundColor:
                    list[1]?.alarmConfirmFlag == "Y" ? "red" : "#888",
                }}
                onClick={() =>
                  onClickAlarmCheck(list[1]?.slaveId, list[1]?.seq)
                }
              >
                <img src={AlarmIcon} />
              </div>
            </div>
            <div className="pump" id="pump1">
              <a
                onClick={() =>
                  showGraph(
                    list[2]?.slaveId,
                    list[2]?.seq,
                    list[2]?.slaveDetailNm,
                    list[2]?.slaveTp,
                    list[2]?.slaveTpNm,
                    list[2]?.rValue,
                    list[2]?.sValue,
                    list[2]?.tValue,
                    list[2]?.lValue,
                    list[2]?.pumpEventTm,
                    list[2]?.pumpEventTmAgo
                  )
                }
              >
                (정격:10A/{list[2]?.rValue == null ? "-" : list[2]?.rValue}A)
              </a>
              <p>
                {list[2]?.slaveDetailNm == null ? "-" : list[2]?.slaveDetailNm}
                {list[2]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[2]?.slaveId, list[2]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
              <div
                className="alarmWrap"
                style={{
                  backgroundColor:
                    list[2]?.alarmConfirmFlag == "Y" ? "red" : "#888",
                }}
                onClick={() =>
                  onClickAlarmCheck(list[2]?.slaveId, list[2]?.seq)
                }
              >
                <img src={AlarmIcon} />
              </div>
            </div>
            <div className="pump" id="pump2">
              <a
                onClick={() =>
                  showGraph(
                    list[3]?.slaveId,
                    list[3]?.seq,
                    list[3]?.slaveDetailNm,
                    list[3]?.slaveTp,
                    list[3]?.slaveTpNm,
                    list[3]?.rValue,
                    list[3]?.sValue,
                    list[3]?.tValue,
                    list[3]?.lValue,
                    list[3]?.pumpEventTm,
                    list[3]?.pumpEventTmAgo
                  )
                }
              >
                (정격:5A/{list[3]?.rValue == null ? "-" : list[3]?.rValue}A)
              </a>
              <p>
                {list[3]?.slaveDetailNm == null ? "-" : list[3]?.slaveDetailNm}
                {list[3]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[3]?.slaveId, list[3]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
              <div
                className="alarmWrap"
                style={{
                  backgroundColor:
                    list[3]?.alarmConfirmFlag == "Y" ? "red" : "#888",
                }}
                onClick={() =>
                  onClickAlarmCheck(list[3]?.slaveId, list[3]?.seq)
                }
              >
                <img src={AlarmIcon} />
              </div>
            </div>
            <div className="pump" id="pump3">
              <a
                onClick={() =>
                  showGraph(
                    list[4]?.slaveId,
                    list[4]?.seq,
                    list[4]?.slaveDetailNm,
                    list[4]?.slaveTp,
                    list[4]?.slaveTpNm,
                    list[4]?.rValue,
                    list[4]?.sValue,
                    list[4]?.tValue,
                    list[4]?.lValue,
                    list[4]?.pumpEventTm,
                    list[4]?.pumpEventTmAgo
                  )
                }
              >
                (정격:42A/{list[4]?.rValue == null ? "-" : list[4]?.rValue}A)
              </a>
              <p>
                {list[4]?.slaveDetailNm == null ? "-" : list[4]?.slaveDetailNm}
                {list[4]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[4]?.slaveId, list[4]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
              <div
                className="alarmWrap"
                style={{
                  backgroundColor:
                    list[4]?.alarmConfirmFlag == "Y" ? "red" : "#888",
                }}
                onClick={() =>
                  onClickAlarmCheck(list[4]?.slaveId, list[4]?.seq)
                }
              >
                <img src={AlarmIcon} />
              </div>
            </div>
            <div className="pump" id="pump4">
              <a
                onClick={() =>
                  showGraph(
                    list[5]?.slaveId,
                    list[5]?.seq,
                    list[5]?.slaveDetailNm,
                    list[5]?.slaveTp,
                    list[5]?.slaveTpNm,
                    list[5]?.rValue,
                    list[5]?.sValue,
                    list[5]?.tValue,
                    list[5]?.lValue,
                    list[5]?.pumpEventTm,
                    list[5]?.pumpEventTmAgo
                  )
                }
              >
                (정격:42A/{list[5]?.rValue == null ? "-" : list[5]?.rValue}A)
              </a>
              <p>
                {list[5]?.slaveDetailNm == null ? "-" : list[5]?.slaveDetailNm}
                {list[5]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[5]?.slaveId, list[5]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
              <div
                className="alarmWrap"
                style={{
                  backgroundColor:
                    list[5]?.alarmConfirmFlag == "Y" ? "red" : "#888",
                }}
                onClick={() =>
                  onClickAlarmCheck(list[5]?.slaveId, list[5]?.seq)
                }
              >
                <img src={AlarmIcon} />
              </div>
            </div>
            <div className="tankNm" id="tankNm0">
              <a
                onClick={() =>
                  showGraph(
                    list[31]?.slaveId,
                    list[31]?.seq,
                    list[31]?.slaveDetailNm,
                    list[31]?.slaveTp,
                    list[31]?.slaveTpNm,
                    list[31]?.rValue,
                    list[31]?.sValue,
                    list[31]?.tValue,
                    list[31]?.lValue,
                    list[31]?.pumpEventTm,
                    list[31]?.pumpEventTmAgo
                  )
                }
              >
                {list[31]?.slaveDetailNm == null
                  ? "-"
                  : list[31]?.slaveDetailNm}
              </a>
              <p>
                {list[31]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[31]?.slaveId, list[31]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
            </div>
            <div className="tankNm" id="tankNm1">
              <a
                onClick={() =>
                  showGraph(
                    list[32]?.slaveId,
                    list[32]?.seq,
                    list[32]?.slaveDetailNm,
                    list[32]?.slaveTp,
                    list[32]?.slaveTpNm,
                    list[32]?.rValue,
                    list[32]?.sValue,
                    list[32]?.tValue,
                    list[32]?.lValue,
                    list[32]?.pumpEventTm,
                    list[32]?.pumpEventTmAgo
                  )
                }
              >
                {list[32]?.slaveDetailNm == null
                  ? "-"
                  : list[32]?.slaveDetailNm}
              </a>
              <p>
                {list[32]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[32]?.slaveId, list[32]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
            </div>
            <div className="tankNm" id="tankNm2">
              <a
                onClick={() =>
                  showGraph(
                    list[33]?.slaveId,
                    list[33]?.seq,
                    list[33]?.slaveDetailNm,
                    list[33]?.slaveTp,
                    list[33]?.slaveTpNm,
                    list[33]?.rValue,
                    list[33]?.sValue,
                    list[33]?.tValue,
                    list[33]?.lValue,
                    list[33]?.pumpEventTm,
                    list[33]?.pumpEventTmAgo
                  )
                }
              >
                {list[33]?.slaveDetailNm == null
                  ? "-"
                  : list[33]?.slaveDetailNm}
              </a>
              <p>
                {list[33]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[33]?.slaveId, list[33]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
            </div>
            <div className="tankNm" id="tankNm3">
              <a
                onClick={() =>
                  showGraph(
                    list[34]?.slaveId,
                    list[34]?.seq,
                    list[34]?.slaveDetailNm,
                    list[34]?.slaveTp,
                    list[34]?.slaveTpNm,
                    list[34]?.rValue,
                    list[34]?.sValue,
                    list[34]?.tValue,
                    list[34]?.lValue,
                    list[34]?.pumpEventTm,
                    list[34]?.pumpEventTmAgo
                  )
                }
              >
                {list[34]?.slaveDetailNm == null
                  ? "-"
                  : list[34]?.slaveDetailNm}
              </a>
              <p>
                {list[34]?.attachFileNm ? (
                  <i
                    className="fa-solid fa-paperclip"
                    onClick={() => {
                      onClickImage(list[34]?.slaveId, list[34]?.seq);
                    }}
                  />
                ) : (
                  <></>
                )}
              </p>
            </div>
            <div className="tankInfo" id="tankInfo4">
              {list[34]?.lValue === null || list[34]?.lValue === undefined ? (
                <>
                  <div
                    className="light"
                    style={{ backgroundColor: "#eb6877" }}
                  />
                  <div className="status">가동정지</div>
                </>
              ) : (
                <>
                  <div
                    className="light"
                    style={{ backgroundColor: "green" }}
                  />
                  <div className="status">가동중</div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="tableWrap">
          <table>
            <thead className="tableHeadRow">
              <tr>
                {/* <th className="tableHead checkTd" rowSpan={2}>
                <input type="checkbox" />
              </th> */}
                <th className="tableHead" rowSpan={2}>
                  No
                </th>
                <th className="tableHead" rowSpan={2}>
                  Slave 상세명
                </th>
                <th className="tableHead" rowSpan={2}>
                  Slave ID
                </th>
                <th className="tableHead" rowSpan={2}>
                  Slave 그룹명
                </th>
                <th className="tableHead" rowSpan={2}>
                  마스터 명
                </th>
                <th className="tableHead" rowSpan={2}>
                  구분
                </th>
                <th className="tableHead" rowSpan={2}>
                  경고 확인 여부
                </th>
                <th className="tableHead" colSpan={3}>
                  전류 값
                </th>
                <th className="tableHead">레벨 값</th>
                <th className="tableHead" rowSpan={2}>
                  도면파일
                </th>
              </tr>
              <tr className="theadSpan">
                <th className="tableHead">R</th>
                <th className="tableHead">S</th>
                <th className="tableHead">T</th>
                <th className="tableHead">L</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {loadingFlag ? (
                <Loading />
              ) : (
                list?.map((v, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor:
                        v.alarmConfirmFlag == "Y" ? "#eb6877" : "none",
                    }}
                  >
                    {/* <td className="tableData">
                  <input type="checkbox" />
                </td> */}
                    <td className="tableData">{i + 1}</td>
                    <td className="tableData">
                      <a
                        className="showGraph"
                        // onClick={() => {
                        //   setTabFlag(v.slaveTp === "L" ? true : false);
                        //   openModal();
                        //   setSlaveInfo({
                        //     slaveId: v.slaveId || "",
                        //     seq: v.seq || "",
                        //   });
                        // }}
                        onClick={() =>
                          showGraph(
                            v.slaveId,
                            v.seq,
                            v.slaveDetailNm,
                            v.slaveTp,
                            v.slaveTpNm,
                            v.rValue,
                            v.sValue,
                            v.tValue,
                            v.lValue,
                            v.pumpEventTm,
                            v.pumpEventTmAgo
                          )
                        }
                      >
                        {v.slaveDetailNm || ""}
                      </a>
                    </td>
                    <td className="tableData">{v.slaveDetailId || ""}</td>
                    <td className="tableData">{v.slaveNm || ""}</td>
                    <td className="tableData">{v.masterNm || ""}</td>
                    <td className="tableData">{v.slaveTpNm || ""}</td>
                    <td className="tableData">
                      {v.alarmConfirmFlag == "Y" ? (
                        <div
                          className="tableBtn"
                          onClick={() => onClickAlarmCheck(v.slaveId, v.seq)}
                        >
                          <div className="alarmCheckBtn">경고</div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="tableData">
                      {v.rValue == null ? "-" : v.rValue}
                    </td>
                    <td className="tableData">
                      {v.sValue == null ? "-" : v.sValue}
                    </td>
                    <td className="tableData">
                      {v.tValue == null ? "-" : v.tValue}
                    </td>
                    <td className="tableData">
                      {v.lValue == null
                        ? "-"
                        : v?.lValue === 0
                        ? "0%"
                        : Math.ceil((v.lValue - 4) * 6.25) +
                          "%(" +
                          v.lValue +
                          ")"}
                    </td>
                    <td
                      className="tableData"
                      onClick={() => {
                        onClickImage(v.slaveId, v.seq);
                      }}
                    >
                      {v.attachFileNm || ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* <div id="listViewPagination">
        <Pagination
          onChange={handlePageChange}
          page={searchParams?.curPage || 1}
          count={
            list === undefined
              ? 0
              : Math.ceil(list[0]?.totCnt / searchParams?.limit) || 0
          }
          size="large"
          showFirstButton
          showLastButton
        />
      </div> */}

      <ModalPortal>
        {/* {tabFlag ? (
          <PumpLevelGraph closeModal={closeModal} slaveInfo={slaveInfo} />
        ) : (
          <RectifierGraph closeModal={closeModal} slaveInfo={slaveInfo} />
        )} */}

        <RectifierGraph
          closeModal={closeModal}
          slaveInfo={slaveInfo}
          intervalState={intervalState}
          setIntervalState={setIntervalState}
        />
      </ModalPortal>
      <ModalPortalSub>
        {subModalFlag ? (
          <MalfunctionStatus
            closeModal={closeModalSub}
            intervalState={intervalState}
            setIntervalState={setIntervalState}
          />
        ) : (
          <Waveform
            closeModal={closeModalSub}
            intervalState={intervalState}
            setIntervalState={setIntervalState}
          />
        )}
      </ModalPortalSub>
    </MainWrapper>
  );
};
export default MainView;
