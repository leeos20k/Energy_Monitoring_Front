import { Button_EM, TableInput_EM, SearchBtn_EM } from "Elements";
import { Loading } from "Layout";
import { useModal, useModalSub, useInterval } from "Hooks";
import { Header_EM } from "Layout";
import { palette2 } from "Style";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { FormControlLabel, Switch } from "@mui/material";
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
    display: flex;
    flex-direction: row;
    align-items: center;
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
  .inputLabel {
    display: inline-flexbox;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 30px;
    background-color: ${palette2.SecondaryColor};
    border: 1px solid ${palette2.SecondaryColor};
    color: white;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: 700;
    text-align: center;
  }
  .inputValue {
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: 700;
    border: 1px solid ${palette2.SecondaryColor};
  }
  .checkboxLabel {
    display: none;
  }

  input[type="checkbox"] {
    margin-left: 10px;
  }
  input[type="checkbox"]::after {
    border: solid ${palette2.PrimaryColor};
    border-width: 0 2.5px 2.5px 0;
    content: "";
    display: none;
    height: 40%;
    left: 40%;
    position: relative;
    top: 20%;
    transform: rotate(45deg);
    width: 15%;
  }
  input[type="checkbox"]:checked {
    background-color: white;
    outline: none;
  }
  .divider {
    width: 100%;
    height: 3px;
    background-color: #e9e9e9;
    margin: 30px 0;
  }
  .chartWrap {
    width: 95%;
    margin: 0 auto;
    padding: 20px;
    background-color: whitesmoke;
  }
  .legendWrap {
    width: 250px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .legend {
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    display: flex;
    align-items: center;
  }
  .plan {
    width: 25px;
    height: 5px;
    background-color: red;
    margin-right: 10px;
  }
  .perf {
    width: 20px;
    height: 5px;
    background-color: ${palette2.PrimaryColor};
    margin-right: 10px;
  }

  .chartInner {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 20px 0;
  }

  .chartItem {
    width: 32%;
    background-color: white;
  }

  .tableWrap {
    width: 95%;
    margin: 0 auto;
  }
  .chartName {
    width: 100%;
    line-height: 40px;
    background-color: ${palette2.SecondaryColor};
    text-align: center;
    color: white;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 22px;
  }
  .chart {
    height: 85%;
    margin: 2%;
  }
  .chart > canvas{
    max-height : 300px;
  }
  .alarmBtn {
    margin: 10px auto 20px;
    padding: 5px 0;
    width: 100px;
    color: #f44336;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    border: 2px solid #f44336;
  }

  @keyframes blink {
    0% {
      background-color: rgba(244, 67, 54, 0.3);
    }
    50% {
      background-color: transparent;
    }
    100% {
      background-color: rgba(244, 67, 54, 0.5);
    }
  }

  .blinkBg {
    animation: blink 1s linear infinite;
  }
`;

const MainView = ({
  initPage,
  energyPlList,
  energyRsList,
  energyRsnvList,
  onClickSave,
  inputData,
  setInputData,
  prodData,
  lngData,
  pwData,
  energyPlanLine,
  workGroup,
  handleAlarmDismiss,
  prodAlarm,
  lngAlarm,
  pwAlarm,

  intervalState,
  intervalCheck
}) => {
  Chart.register(zoomPlugin, annotationPlugin);

  const { openModal, closeModal, ModalPortal } = useModal();
  const { openModalSub, closeModalSub, ModalPortalSub } = useModalSub();

 


  
  useInterval(() => {
    if (intervalState) {
      initPage();
    } else {
      return;
    }
  }, 5000);

  return (
    <MainWrapper>
      <Header_EM />
      <div className="subPageTitle">
        <div className="subPageTitleText">모니터링</div>
      </div>
      <div className="layer">
        <div className="inputWrap">
          <div className="inputLabel">작업일자 (작업조)</div>
          <div className="inputValue">
            {`${workGroup.workDay} ( ${workGroup.shiftPart}조 - ${workGroup.shiftStartTime} ~ ${workGroup.shiftEndTime})`}
          </div>
        </div>
        <SearchBtn_EM onClick={initPage} />

        <FormControlLabel
          control={<Switch color="primary" />}
          labelPlacement="start"
          label="실시간"
          checked={intervalState}
          onClick={intervalCheck}
        />

        <Button_EM btnText="저장" className="rightBtn" onClick={onClickSave} />
      </div>
      <div className="tableWrap">
        <table>
          <thead className="tableHeadRow">
            <tr>
              <th className="tableHead" rowSpan={2}></th>
              <th className="tableHead" rowSpan={2}>
                전력원단위
                <br />
                (KW/ton)
              </th>
              <th className="tableHead" rowSpan={2}>
                LNG원단위
                <br />
                (m³/ton)
              </th>
              <th className="tableHead" rowSpan={2}>
                10분 생산성 <br />
                (ton/hr)
              </th>
              <th className="tableHead" rowSpan={2}>
                생산성 <br />
                (ton/hr)
              </th>
              <th className="tableHead" colSpan={2}>
                GYPSUM A
              </th>
              <th className="tableHead" colSpan={2}>
                GYPSUM B
              </th>
              <th className="tableHead" colSpan={2}>
                GYPSUM C
              </th>
              <th className="tableHead" colSpan={2}>
                Slag
              </th>
              <th className="tableHead" colSpan={2}>
                증량제
              </th>
            </tr>
            <tr className="theadSpan">
              <th className="tableHead">생산량</th>
              <th className="tableHead">수분율(%)</th>

              <th className="tableHead">생산량</th>
              <th className="tableHead">수분율(%)</th>

              <th className="tableHead">생산량</th>
              <th className="tableHead">수분율(%)</th>

              <th className="tableHead">생산량</th>
              <th className="tableHead">수분율(%)</th>

              <th className="tableHead">생산량</th>
              <th className="tableHead">수분율(%)</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            <tr>
              <td className="tableData">계획</td>
              <td className="tableData ">
                {energyPlList?.voRate === 0
                  ? 0
                  : energyPlList?.voRate
                  ? energyPlList?.voRate.toFixed(1)
                  : "-"}
              </td>
              <td className="tableData">
                {energyPlList?.lngRate === 0
                  ? 0
                  : energyPlList?.lngRate
                  ? energyPlList?.lngRate.toFixed(2)
                  : "-"}{" "}
              </td>
              <td className="tableData">
                {energyPlList?.tenMinProRate === 0
                  ? 0
                  : energyPlList?.tenMinProRate || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.prodRate === 0
                  ? 0
                  : energyPlList?.prodRate
                  ? energyPlList?.prodRate.toFixed(1)
                  : "-"}
              </td>
              <td className="tableData">
                {energyPlList?.gypAValue === 0
                  ? 0
                  : energyPlList?.gypAValue || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.gypAWaterRate === 0
                  ? 0
                  : energyPlList?.gypAWaterRate || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.gypBValue === 0
                  ? 0
                  : energyPlList?.gypBValue || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.gypBWaterRate === 0
                  ? 0
                  : energyPlList?.gypBWaterRate || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.gypCValue === 0
                  ? 0
                  : energyPlList?.gypCValue || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.gypCWaterRate === 0
                  ? 0
                  : energyPlList?.gypCWaterRate || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.slagValue === 0
                  ? 0
                  : energyPlList?.slagValue || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.slagWaterRate === 0
                  ? 0
                  : energyPlList?.slagWaterRate || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.fValue === 0 ? 0 : energyPlList?.fValue || "-"}
              </td>
              <td className="tableData">
                {energyPlList?.fWaterRate === 0
                  ? 0
                  : energyPlList?.fWaterRate || "-"}
              </td>
            </tr>
            <tr>
              <td className="tableData">실적</td>

              <td className="tableData">
                {energyRsnvList?.vValue === 0
                  ? 0
                  : energyRsnvList?.vValue
                  ? energyRsnvList?.vValue.toFixed(1)
                  : "-"}
              </td>

              <td className="tableData">
                {energyRsnvList?.nValue === 0
                  ? 0
                  : energyRsnvList?.nValue
                  ? energyRsnvList?.nValue.toFixed(2)
                  : "-"}
              </td>
              <td className="tableData">
                {energyRsList?.tenMinProRate === 0
                  ? 0
                  : energyRsList?.tenMinProRate || "-"}
              </td>
              <td className="tableData">
                {energyRsList?.prodRate === 0
                  ? 0
                  : energyRsList?.prodRate
                  ? energyRsList?.prodRate.toFixed(1)
                  : "-"}
              </td>
              <td className="tableData">
                {energyRsList?.gypAValue === 0
                  ? 0
                  : energyRsList?.gypAValue || "-"}
              </td>
              <td className="tableData">
                <TableInput_EM
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      gypAWaterRate: e.target.value,
                    })
                  }
                  value={
                    inputData?.gypAWaterRate === 0
                      ? 0
                      : inputData?.gypAWaterRate || ""
                  }
                />
              </td>
              <td className="tableData">
                {energyRsList?.gypBValue === 0
                  ? 0
                  : energyRsList?.gypBValue || "-"}
              </td>
              <td className="tableData">
                <TableInput_EM
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      gypBWaterRate: e.target.value,
                    })
                  }
                  value={
                    inputData?.gypBWaterRate === 0
                      ? 0
                      : inputData?.gypBWaterRate || ""
                  }
                />
              </td>
              <td className="tableData">
                {energyRsList?.gypCValue === 0
                  ? 0
                  : energyRsList?.gypCValue || "-"}
              </td>
              <td className="tableData">
                <TableInput_EM
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      gypCWaterRate: e.target.value,
                    })
                  }
                  value={
                    inputData?.gypCWaterRate === 0
                      ? 0
                      : inputData?.gypCWaterRate || ""
                  }
                />
              </td>
              <td className="tableData">
                {energyRsList?.slagValue === 0
                  ? 0
                  : energyRsList?.slagValue || "-"}
              </td>
              <td className="tableData">
                <TableInput_EM
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      slagWaterRate: e.target.value,
                    })
                  }
                  value={
                    inputData?.slagWaterRate === 0
                      ? 0
                      : inputData?.slagWaterRate || ""
                  }
                />
              </td>
              <td className="tableData">
                {energyRsList?.fValue === 0 ? 0 : energyRsList?.fValue || "-"}
              </td>
              <td className="tableData">
                <TableInput_EM
                  onChange={(e) =>
                    setInputData({ ...inputData, fWaterRate: e.target.value })
                  }
                  value={
                    inputData?.fWaterRate === 0
                      ? 0
                      : inputData?.fWaterRate || ""
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="divider" />
      <div className="subPageTitle">
        <div className="subPageTitleText">생산량 추이도</div>
      </div>

      <div className="chartWrap">
        <div className="legendWrap">
          <div className="legend">
            <div className="plan" />
            계획
          </div>
          <div className="legend">
            <div className="perf" />
            실적
          </div>
        </div>
        <div className="chartInner">
          <div className="chartItem">
            <div className="chartName">생산성(ton/hr)</div>
            <div className="chart">
              <Line
                className={prodAlarm ? "blinkBg" : ""}
                options={energyPlanLine[0]}
                data={prodData}
              />
              {prodAlarm ? (
                <div
                  className="alarmBtn"
                  onClick={() => handleAlarmDismiss("prodAlarm")}
                >
                  알람 해제
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="chartItem">
            <div className="chartName">연료원단위(m³/ton)</div>

            <div className="chart">
              <Line
                className={lngAlarm ? "blinkBg" : ""}
                options={energyPlanLine[1]}
                data={lngData}
              />
              {lngAlarm ? (
                <div
                  className="alarmBtn"
                  onClick={() => handleAlarmDismiss("lngAlarm")}
                >
                  알람 해제
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="chartItem">
            <div className="chartName">전력원단위(kw/ton)</div>
            <div className="chart">
              <Line
                className={pwAlarm ? "blinkBg" : ""}
                options={energyPlanLine[2]}
                data={pwData}
              />
              {pwAlarm ? (
                <div
                  className="alarmBtn"
                  onClick={() => handleAlarmDismiss("pwAlarm")}
                >
                  알람 해제
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <ModalPortal></ModalPortal>
    </MainWrapper>
  );
};
export default MainView;
