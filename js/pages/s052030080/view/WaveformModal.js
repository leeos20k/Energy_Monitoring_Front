import { Button, Input, SearchBtn, Selectbox } from "Elements";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import dayjs from "dayjs";
import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

const MalfunctionStatusWrapper = styled.div`
  .modalBox {
    width: 80%;
  }
  .layer {
    width: 95%;
    display: flex;
    flex-direction: "row";
    align-items: "center";
    justify-content: "flex-start";
    margin: 20px auto;
  }
  .inputWrap {
    margin-right: 15px;
  }
  .tableHeadRow {
    border-radius: 10px;
  }
  .tableWrap {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .wave {
    font-family: "Pretendard";
    font-weight: 700;
    line-height: 30px;
    margin-right: 15px;
  }
  .chartWrap {
    width: 95%;
    height: 70vh;
    margin: 30px auto;
    border: 1px solid #e9e9e9;
    border-radius: 20px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0px;
    position: relative;
  }
  #chart {
    width : 100%;
    height : 100%;
    margin: 0 50px;
  }
`;

const MalfunctionStatusModal = ({
  onClickClose,
  searchParams,
  setSearchParams,
  onClickSearch,
  slaveList,
  option,
  data,
  fiveMmAgo
}) => {
  Chart.register(zoomPlugin, annotationPlugin);

  return (
    <MalfunctionStatusWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">
              Slave별 파형비교
              <div className="modalCloseBtn" onClick={onClickClose}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
          <div className="layer">
            <div className="inputWrap">
              <Input
                className='largeInput'
                type="datetime-local"
                onChange={(e) => {
                  setSearchParams({ ...searchParams, fromTm: e.target.value });
                }}
                value={searchParams.fromTm}
              />
            </div>
            <div className="wave"> ~ </div>
            <div className="inputWrap">
              <Input
                className='largeInput'
                type="datetime-local"
                onChange={(e) => {
                  setSearchParams({ ...searchParams, toTm: e.target.value, optionFromTime: fiveMmAgo(e.target.value) });
                }}
                value={searchParams.toTm}
              />
            </div>
            <div className="inputWrap">
              <Selectbox
                placeholder={"Slave선택"}
                option={slaveList}
                onChange={(e) => {
                  setSearchParams({
                    ...searchParams,
                    firstSlaveId: e.target.value.split("/")[0],
                    firstSeq: e.target.value.split("/")[1],
                    firstTp: e.target.value.split("/")[2],
                  });
                }}
                defaultValue={`${searchParams.firstSlaveId}/${searchParams.firstSeq}/${searchParams.firstTp}`}
              />
            </div>
            <div className="inputWrap">
              <Selectbox
                placeholder={"Slave선택"}
                option={slaveList}
                onChange={(e) => {
                  setSearchParams({
                    ...searchParams,
                    secondSlaveId: e.target.value.split("/")[0],
                    secondSeq: e.target.value.split("/")[1],
                    secondTp: e.target.value.split("/")[2],
                  });
                }}
                defaultValue={`${searchParams.secondSlaveId}/${searchParams.secondSeq}/${searchParams.secondTp}`}
              />
            </div>
            <SearchBtn onClick={() => onClickSearch()} />
          </div>
          <div className="chartWrap">
            <div id="chart">
              <Line
                options={option}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </MalfunctionStatusWrapper>
  );
};
export default MalfunctionStatusModal;
