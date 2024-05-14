import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, SearchBtn } from "Elements";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import dayjs from "dayjs";

const PumpLevelGraphWrapper = styled.div`
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
  #pumpChart {
    margin: 0 50px;
  }
`;

const PumpLevelGraphModal = ({ closeModal, searchParams, setSearchParams, options, data, loading, getLevelInfo, fiveMmAgo }) => {
  Chart.register(zoomPlugin, annotationPlugin);
  return (
    <PumpLevelGraphWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">
              Pump 레벨 진행 추이도
              <div className="modalCloseBtn" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
          <div className="layer">
            <div className="inputWrap">
              <Input
                className='largeInput'
                label="조회기간"
                type="datetime-local"
                placeholder="조회기간"
                onChange={(e) =>
                  setSearchParams({ ...searchParams, fromTime: dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss") })
                }
                value={dayjs(searchParams.fromTime).format("YYYY-MM-DD HH:mm:ss") || ""}
              />
            </div>
            <div className="wave">~</div>
            <div className="inputWrap">
              <Input
                className='largeInput'
                type="datetime-local"
                placeholder="조회기간"
                onChange={(e) =>
                  setSearchParams({ ...searchParams, toTime: dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss"), optionFromTime: fiveMmAgo(dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss")) })
                }
                value={dayjs(searchParams.toTime).format("YYYY-MM-DD HH:mm:ss") || ""}
              />
            </div>
            <SearchBtn onClick={getLevelInfo} />
          </div>
          <div className="chartWrap">{!loading && <Line options={options} data={data} />}</div>
        </div>
      </div>
    </PumpLevelGraphWrapper>
  );
};
export default PumpLevelGraphModal;
