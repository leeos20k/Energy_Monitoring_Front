import {
  Button_EM,
  Input_EM,
  SearchBtn_EM,
  Selectbox_EM,
  Checkbox,
} from "Elements";
import { Loading } from "Layout";
import { useModal, useModalSub, useInterval } from "Hooks";
import { Header_EM } from "Layout";
import { palette2 } from "Style";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ReferenceLine,
} from "recharts";
import UpdateWaterRate from "../../s052030013";

const ProductionStatusWrapper = styled.div`
  .layer {
    width: 95%;
    display: flex;
    flex-direction: "row";
    align-items: "center";
    justify-content: "flex-start";
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .Input_EMWrap {
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
  .rightBtnWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
    margin-right: -15px;
  }
  .chartWrap {
    width: 95%;
    margin: 0 auto;
    margin-top: 5%;
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
    height: 300px;
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
    height: 300px;
    margin: 2%;
  }
`;

const ProductionStatusView = ({
  RegistProductionPlan,
  selectGroup,
  planList,
  rstList,
  setSelectedGroup,
  selectedGroup,
  newConditionInquiry,
  date1,
  setDate1,
  date2,
  setDate2,
  exportToExcel,
  UserMngment,

  prod,
  vol,
  lng,

  adminFlag
}) => {
  const { openModal, closeModal, ModalPortal } = useModal();
  return (
    <ProductionStatusWrapper>
      <Header_EM />

      <div className="subPageTitle">
        <div className="subPageTitleText">생산 현황</div>
      </div>
      <div className="layer">
        <div className="Input_EMWrap">
          <Input_EM
            className="Input"
            type="date"
            label="조회일자"
            onChange={(e) => {
              setDate1(e.target.value);
            }}
            defaultValue={date1}
          />
        </div>

        <div className="wave">~</div>

        <div className="Input_EMWrap">
          <Input_EM
            className="Input"
            type="date"
            onChange={(e) => {
              setDate2(e.target.value);
            }}
            defaultValue={date2}
          />
        </div>

        <div className="Input_EMWrap">
          <Selectbox_EM
            label="작업조"
            option={selectGroup}
            onChange={(e) => {
              setSelectedGroup(e.target.value);
              // console.log(e.target.value);
            }}
            defaultValue={selectedGroup}
          />
        </div>

        <SearchBtn_EM onClick={newConditionInquiry} />

        <div className="rightBtnWrap">
          <Button_EM onClick={openModal} btnText="수분율조정" />
          <Button_EM onClick={RegistProductionPlan} btnText="생산 계획 등록" />

          {adminFlag === "Y" ? (<Button_EM onClick={UserMngment} btnText="사용자 관리" />) : null}  

          <Button_EM onClick={exportToExcel} btnText="엑셀다운로더" />
        </div>
      </div>

      <div className="tableWrap">
        <table>
          <thead className="tableHeadRow">
            <tr>
              <th className="tableHead" rowSpan={2}></th>

              <th className="tableHead" colSpan={3}>
                TOTAL
              </th>
              <th className="tableHead" colSpan={3}>
                1조
              </th>
              <th className="tableHead" colSpan={3}>
                2조
              </th>
              <th className="tableHead" colSpan={3}>
                3조
              </th>
            </tr>
            <tr className="theadSpan">
              <th className="tableHead">
                생산성
                <br />
                (ton/Hr)
              </th>
              <th className="tableHead">
                전력원단위
                <br />
                (KW/ton)
              </th>
              <th className="tableHead">
                LNG원단위
                <br />
                (㎥/ton)
              </th>

              <th className="tableHead">
                생산성
                <br />
                (ton/Hr)
              </th>
              <th className="tableHead">
                전력원단위
                <br />
                (KW/ton)
              </th>
              <th className="tableHead">
                LNG원단위
                <br />
                (㎥/ton)
              </th>
              <th className="tableHead">
                생산성
                <br />
                (ton/Hr)
              </th>
              <th className="tableHead">
                전력원단위
                <br />
                (KW/ton)
              </th>
              <th className="tableHead">
                LNG원단위
                <br />
                (㎥/ton)
              </th>
              <th className="tableHead">
                생산성
                <br />
                (ton/Hr)
              </th>
              <th className="tableHead">
                전력원단위
                <br />
                (KW/ton)
              </th>
              <th className="tableHead">
                LNG원단위
                <br />
                (㎥/ton)
              </th>
            </tr>
          </thead>
          <tbody className="tableBody">
            <tr>
              <td className="tableData">계획</td>

              <td className="tableData">
                {planList?.prodRate === null || planList?.prodRate === undefined
                  ? "-"
                  : planList?.prodRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(planList?.prodRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {planList?.volRate === null || planList?.volRate === undefined
                  ? "-"
                  : planList?.volRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(planList?.volRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {planList?.lngRate === null || planList?.lngRate === undefined
                  ? "-"
                  : planList?.lngRate === 0
                  ? Number(0).toFixed(2)
                  : (Number(planList?.lngRate) ?? 0).toFixed(2)}
              </td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
              <td className="tableData"></td>
            </tr>
            <tr>
              <td className="tableData">실적</td>

              <td className="tableData">
                {rstList?.totalProdRate === null|| rstList?.totalProdRate === undefined
                  ? "-"
                  : rstList?.totalProdRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.totalProdRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.totalVoltRate === null|| rstList?.totalVoltRate === undefined
                  ? "-"
                  : rstList?.totalVoltRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.totalVoltRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.totalLngRate === null|| rstList?.totalLngRate === undefined
                  ? "-"
                  : rstList?.totalLngRate === 0
                  ? Number(0).toFixed(2)
                  : (Number(rstList?.totalLngRate) ?? 0).toFixed(2)}
              </td>
              <td className="tableData">
                {rstList?.fstProdRate === null|| rstList?.fstProdRate === undefined
                  ? "-"
                  : rstList?.fstProdRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.fstProdRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.fstVoltRate === null||rstList?.fstVoltRate === undefined
                  ? "-"
                  : rstList?.fstVoltRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.fstVoltRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.fstLngRate === null|| rstList?.fstLngRate === undefined
                  ? "-"
                  : rstList?.fstLngRate === 0
                  ? Number(0).toFixed(2)
                  : (Number(rstList?.fstLngRate) ?? 0).toFixed(2)}
              </td>
              <td className="tableData">
                {rstList?.sndProdRate === null|| rstList?.sndProdRate === undefined
                  ? "-"
                  : rstList?.sndProdRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.sndProdRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.sndVoltRate === null|| rstList?.sndVoltRate === undefined
                  ? "-"
                  : rstList?.sndVoltRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.sndVoltRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.sndLngRate === null|| rstList?.sndLngRate === undefined
                  ? "-"
                  : rstList?.sndLngRate === 0
                  ? Number(0).toFixed(2)
                  : (Number(rstList?.sndLngRate) ?? 0).toFixed(2)}
              </td>
              <td className="tableData">
                {rstList?.thdProdRate === null|| rstList?.thdProdRate === undefined
                  ? "-"
                  : rstList?.thdProdRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.thdProdRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.thdVoltRate === null|| rstList?.thdVoltRate === undefined
                  ? "-"
                  : rstList?.thdVoltRate === 0
                  ? Number(0).toFixed(1)
                  : (Number(rstList?.thdVoltRate) ?? 0).toFixed(1)}
              </td>
              <td className="tableData">
                {rstList?.thdLngRate === null|| rstList?.thdLngRate === undefined
                  ? "-"
                  : rstList?.thdLngRate === 0
                  ? Number(0).toFixed(2)
                  : (Number(rstList?.thdLngRate) ?? 0).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
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
            <div className="chartName">생산성(ton/Hr)</div>
            <div className="chart">
              <ResponsiveContainer height="80%" width="95%">
                <BarChart data={prod}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, planList?.prodRate]} />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="value" fill={palette2.PrimaryColor} />
                  <ReferenceLine
                    y={planList?.prodRate}
                    stroke="red"
                    label={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chartItem">
            <div className="chartName">연료원단위(㎥/ton)</div>
            <div className="chart">
              <ResponsiveContainer height="80%" width="95%">
                <BarChart data={lng}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, planList?.lngRate]} />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="value" fill={palette2.PrimaryColor} />
                  <ReferenceLine
                    y={planList?.lngRate}
                    stroke="red"
                    label={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chartItem">
            <div className="chartName">전력원단위(KW/ton)</div>
            <div className="chart">
              <ResponsiveContainer height="80%" width="95%">
                <BarChart data={vol}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, planList?.volRate]} />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="value" fill={palette2.PrimaryColor} />
                  <ReferenceLine
                    y={planList?.volRate}
                    stroke="red"
                    label={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <ModalPortal>
        <UpdateWaterRate closeModal={closeModal} e/>
      </ModalPortal>
    </ProductionStatusWrapper>
  );
};
export default ProductionStatusView;
