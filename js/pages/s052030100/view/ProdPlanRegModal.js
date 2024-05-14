import React from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  SearchBtn_EM,
  TableInput_EM,
  Selectbox,
  ButtonMedium_EM,
} from "Elements";
import { Selectbox_EM } from "../../../components/elements/_Selectbox";

const ProdPlanRegModalWrapper = styled.div`
  .box {
    width: 80vw;
    background-color: white;
    margin: 0 auto;
    margin-top: auto;
    margin-bottom: auto;
    z-index: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form {
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    overflow: scroll;
  }

  .layer {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  .inputWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 15px;
  }
  .tableWrap {
    margin-bottom: 50px;
  }
  .btnWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .btnWrap > div {
    margin: 0 10px;
  }
`;

const ProdPlanRegModal = ({
  closeModal,
  list,
  handleInputChange,
  delSaveProdPlan,
  planYear,
  yearCode,
  setPlanYear,
  openPlanTable,

  formatNumber,
}) => {
  return (
    <ProdPlanRegModalWrapper>
      <div className="modalBg">
        <div className="box">
          <div className="titleSection">
            <div className="modalTitle">생산 계획 등록</div>
          </div>
          <div className="form">
            <div className="layer">
              <div className="inputWrap">
                <Selectbox_EM
                  option={yearCode}
                  onChange={(e) => {
                    setPlanYear(e.target.value);
                  }}
                  defaultValue={String(planYear)}
                />
              </div>
              <SearchBtn_EM onClick={openPlanTable} />
            </div>

            <div className="tableWrap">
              <table>
                <thead className="tableHeadRow">
                  <tr>
                    <th className="tableHead"></th>
                    <th className="tableHead">Total</th>
                    <th className="tableHead">1월</th>
                    <th className="tableHead">2월</th>
                    <th className="tableHead">3월</th>
                    <th className="tableHead">4월</th>
                    <th className="tableHead">5월</th>
                    <th className="tableHead">6월</th>
                    <th className="tableHead">7월</th>
                    <th className="tableHead">8월</th>
                    <th className="tableHead">9월</th>
                    <th className="tableHead">10월</th>
                    <th className="tableHead">11월</th>
                    <th className="tableHead">12월</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row, index) => (
                    <tr key={index}>
                      <td className="tableData">
                        {row["energePlanTpNm"].split("(")[0]}
                        <br />
                        {"(" + row["energePlanTpNm"].split("(")[1]}
                      </td>
                      <td className="tableData">
                        {index >= 4
                          ? Number(row["totalValue"]).toFixed(1)
                          : row["totalValue"]}
                      </td>
                      {index < 4 ? (
                        <>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["janValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "janValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["febValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "febValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["marValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "marValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["aprValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "aprValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["mayValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "mayValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["junValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "junValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["julValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "julValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["augValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "augValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["sepValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "sepValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["octValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "octValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["novValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "novValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                          <td className="tableData">
                            <TableInput_EM
                              value={formatNumber(row["decValue"])}
                              onChange={(value) =>
                                handleInputChange(
                                  index,
                                  "decValue",
                                  value.target.value
                                )
                              }
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["janValue"]).toFixed(2)
                              : Number(row["janValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["febValue"]).toFixed(2)
                              : Number(row["febValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["marValue"]).toFixed(2)
                              : Number(row["marValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["aprValue"]).toFixed(2)
                              : Number(row["aprValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["mayValue"]).toFixed(2)
                              : Number(row["mayValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["junValue"]).toFixed(2)
                              : Number(row["junValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["julValue"]).toFixed(2)
                              : Number(row["julValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["augValue"]).toFixed(2)
                              : Number(row["augValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["sepValue"]).toFixed(2)
                              : Number(row["sepValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["octValue"]).toFixed(2)
                              : Number(row["octValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["novValue"]).toFixed(2)
                              : Number(row["novValue"]).toFixed(1)}
                          </td>
                          <td className="tableData">
                            {index === 6
                              ? Number(row["decValue"]).toFixed(2)
                              : Number(row["decValue"]).toFixed(1)}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="btnWrap">
            <ButtonMedium_EM
              className="negativeBtn"
              btnText="닫기"
              onClick={closeModal}
            />
            <ButtonMedium_EM
              className="positiveBtn"
              btnText="저장"
              onClick={delSaveProdPlan}
            />
          </div>
        </div>
      </div>
    </ProdPlanRegModalWrapper>
  );
};
export default ProdPlanRegModal;
