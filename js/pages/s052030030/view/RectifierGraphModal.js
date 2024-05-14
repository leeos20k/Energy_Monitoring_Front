import React from "react";
import styled from "styled-components";
import { palette } from "Style";
import { Input, SearchBtn } from "Elements";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import dayjs from "dayjs";
import { FormControlLabel, Switch } from "@mui/material";

const RectifierGraphWrapper = styled.div`
  .modalBox {
    width: 80%;
  }
  .layer {
    width: 95%;
    display: flex;
    flex-direction: "row";
    align-items: "center";
    justify-content: "flex-start";
    margin: 15px auto;
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
  .slaveInfo{
    border-color : transparent;
    text-align : left;
    font-size  :18px; 
    color : #136165;
    font-family: "Pretendard";
    font-weight: 600;

  }

  .chartWrap {
    width: 95%;
    height: 60vh;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 1px solid #e9e9e9;
    border-radius: 20px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0px;
  }
  .chart {
    width: 95%;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
  .MuiFormControlLabel-label {
    width: 70px;
    font-size: 18px;
    color: ${palette.TextColor};
    line-height: 34px;
    font-family: "Pretendard";
    font-weight: 600;
    text-align: center;
  }
  .realtimeStyle {
    opacity: 0.3;
    pointer-events: none;
  }
  .subPageTitle {
    margin-top: 10px;
  }
  .divider {
    width: 100%;
    height: 8px;
    background-color: #e9e9e9;
  }
`;

const RectifierGraphModal = ({
  onClickClose,
  searchParams,
  setSearchParams,
  options,
  realtimeOption,
  data,
  dataL,
  getLevelInfo,
  isRealtimeChecked,
  handleSwitchChange,
  modalParams,
}) => {
  Chart.register(zoomPlugin, annotationPlugin);

  return (
    <RectifierGraphWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">
              Slave 추이 그래프
              <div className="modalCloseBtn" onClick={onClickClose}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
          <div className="subPageTitle">
            <div className="subPageTitleText">Slave 정보</div>
          </div>
          <div className="layer">
            <div className="inputWrap">
              <Input
                className='slaveInfo'
                label="slave명 :"
                readOnly
                value={modalParams.slaveDetailNm}
              />
            </div>
            <div className="inputWrap">
              <Input 
                className='slaveInfo'
                label="구분 :" 
                readOnly value={modalParams.slaveTpNm} />
            </div>
            {/* <div className="inputWrap">
              {modalParams.slaveTp == "V" ? (
                <Input
                  label="R / S / T"
                  readOnly
                  value={`${modalParams.rValue} / ${modalParams.sValue} / ${modalParams.tValue} `}
                />
              ) : (
                <Input label="L" readOnly value={modalParams.lValue} />
              )}
            </div> */}
          </div>
          <div className="divider" />
          <div className="layer">
            <div className="inputWrap">
              <Input
                className={`largeInput ${
                  isRealtimeChecked ? "realtimeStyle" : ""
                }`}
                label="조회기간"
                type="datetime-local"
                placeholder="조회기간"
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    fromTime: dayjs(e.target.value).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  })
                }
                value={
                  dayjs(searchParams.fromTime).format("YYYY-MM-DD HH:mm:ss") ||
                  ""
                }
              />
            </div>
            <div className={`wave ${isRealtimeChecked ? "realtimeStyle" : ""}`}>
              ~
            </div>
            <div className="inputWrap">
              <Input
                className={`largeInput ${
                  isRealtimeChecked ? "realtimeStyle" : ""
                }`}
                type="datetime-local"
                placeholder="조회기간"
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    toTime: dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss"),
                  })
                }
                value={
                  dayjs(searchParams.toTime).format("YYYY-MM-DD HH:mm:ss") || ""
                }
              />
            </div>
            <SearchBtn
              className={`${isRealtimeChecked ? "realtimeStyle" : ""}`}
              onClick={getLevelInfo}
            />
            <div className="inputWrap">
              <FormControlLabel
                control={<Switch color="primary" />}
                labelPlacement="start"
                label="실시간"
                onChange={handleSwitchChange}
                checked={isRealtimeChecked}
              />
            </div>
          </div>
          <div className="chartWrap">
            <div className="chart">
              <Line
                options={isRealtimeChecked ? realtimeOption : options}
                data={modalParams.slaveTp == "V" ? data : dataL}
              />
            </div>
          </div>
        </div>
      </div>
    </RectifierGraphWrapper>
  );
};
export default RectifierGraphModal;
