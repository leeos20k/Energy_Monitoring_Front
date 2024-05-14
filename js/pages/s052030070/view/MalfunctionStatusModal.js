import { Button, Input, SearchBtn } from "Elements";
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
    height: 60vh;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .showGraph {
    border-bottom: 1px solid #888;
  }
  .chartWrap {
    height: 500px;
  }
  #chart {
    margin: 50px 0;
  }
`;

const MalfunctionStatusModal = ({
  onClickClose,
  searchParams,
  setSearchParams,
  onClickSearch,
  onClickDelete,
  list,
  onClickItem,
  clickFlag,
  option,
  dataL,
  dataV,
  checkBoxHandler,
  checkAllBoxHandler,
}) => {
  Chart.register(zoomPlugin, annotationPlugin);

  return (
    <MalfunctionStatusWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">
              고장현황
              <div className="modalCloseBtn" onClick={onClickClose}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
          <div className="layer">
            <div className="inputWrap">
              <Input
                placeholder="slave명"
                onChange={(e) =>
                  setSearchParams({ ...searchParams, slaveNm: e.target.value })
                }
              />
            </div>
            <SearchBtn onClick={() => onClickSearch()} />
          </div>
          <div className="layer">
            <Button btnText="삭제" onClick={onClickDelete}/>
            <Button btnText="다운로더" />
          </div>
          <div className="tableWrap">
            <table>
              <thead className="tableHeadRow">
                <tr>
                  <th className="tableHead checkTd" rowSpan={2}>
                  <input type="checkbox" name="checkAllBox" onChange={(e) => checkAllBoxHandler(e)} />
                  </th>
                  <th className="tableHead" rowSpan={2}>
                    No
                  </th>
                  <th className="tableHead" rowSpan={2}>
                    Slave 명
                  </th>
                  <th className="tableHead" rowSpan={2}>
                    순번
                  </th>
                  <th className="tableHead" colSpan={3}>
                    경고
                  </th>
                  <th className="tableHead" colSpan={2}>
                    고장시간
                  </th>
                  <th className="tableHead" rowSpan={2}>
                    slave 구분
                  </th>
                </tr>
                <tr className="theadSpan">
                  <th className="tableHead">Min</th>
                  <th className="tableHead">Max</th>
                  <th className="tableHead">지속시간(초)</th>
                  <th className="tableHead">From</th>
                  <th className="tableHead">To</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {list?.map((v, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td className="tableData">
                      <input type="checkbox" name="checkBox" onChange={(e) => checkBoxHandler(e, v, i)} />
                      </td>
                      <td className="tableData">{i + 1}</td>
                      <td
                        className="tableData"
                        onClick={() =>
                          onClickItem(
                            v.slaveId,
                            v.seq,
                            v.alarmStartTm,
                            v.alarmEndTm,
                            v.slaveTp
                          )
                        }
                      >
                        <a className="showGraph">{v.slaveNm}</a>
                      </td>
                      <td className="tableData">{v.seq}</td>
                      <td className="tableData">{v.alarmMinValue}</td>
                      <td className="tableData">{v.alarmMaxValue}</td>
                      <td className="tableData">{v.alarmTm}</td>
                      <td className="tableData">
                        {dayjs(v.alarmStartTm).format("YYYY-MM-DD HH:mm:ss")}
                      </td>
                      <td className="tableData">
                        {dayjs(v.alarmEndTm).format("YYYY-MM-DD HH:mm:ss")}
                      </td>
                      <td className="tableData">{v.slaveTpNm}</td>
                    </tr>
                    {clickFlag.slaveId === v.slaveId &&
                    clickFlag.seq === v.seq &&
                    clickFlag.startTm === v.alarmStartTm &&
                    clickFlag.endTm === v.alarmEndTm ? (
                      <tr>
                        <td colSpan={10} className="tableWrap chartWrap">
                          <Line
                            id="chart"
                            options={option}
                            data={v.slaveTp === "V" ? dataV : dataL}
                          />
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                ))}
               
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MalfunctionStatusWrapper>
  );
};
export default MalfunctionStatusModal;
