import React, { useEffect } from "react";
import styled from "styled-components";
import { Input_EM, SearchBtn_EM, Button_EM, ButtonMedium_EM, TableInput_EM } from "Elements";
import { Selectbox_EM } from "../../../components/elements/_Selectbox";
import dayjs from "dayjs";

const UpdateWaterRateWrapper = styled.div`
  .modalBox {
    width: 80%;
  }
  .layer {
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 20px auto;
  }
  .inputWrap {
    margin-right: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .wave {
    font-family: "Pretendard";
    font-weight: 700;
    line-height: 30px;
    margin-right: 15px;
  }
  .tableWrap {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 30px;
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

const UpdateWaterRateModal = ({
  test,
  closeModal,
  searchParams,
  setSearchParams,
  options,
  data,
  loading,
  getLevelInfo,
  fiveMmAgo,


  selectableGroup,
  setSelectedGroup,
  changeGroup,
  selectDate,
  groupTime,
  selectedGroup,

  waterRateList,
  updatePumpAggre,
  handleInputChange,
  batchAdjustment,

  
}) => {
  return (
    <UpdateWaterRateWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">
              수분율조정
              <div className="modalCloseBtn" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>

          <div className="layer">
            <div className="inputWrap">
              <Input_EM
                className="Input"
                label="조정일자"
                type="date"
                onChange={(e) => {
                  selectDate(e.target.value);
                }}
               />
            </div>
            <div className="inputWrap">
              <Selectbox_EM
                  label = "작업조"
                  option={selectableGroup}
                  onChange={(e) => {
                    changeGroup(e.target.value);
                  }}
                  defaultValue={selectedGroup}
            />
              {/* <SearchBtn_EM style={{ marginLeft: 5 }} /> */}
            </div>

            

          </div>
          <div className="layer">
            <div className="inputWrap">
              <Button_EM
                btnText='일괄조정'
                onClick={batchAdjustment}
              />
            </div>
          </div>

          <div className="tableWrap">
            <table>
              <thead className="tableHeadRow">
                <tr>
                  <th className="tableHead" rowSpan={2}>
                    작업시간
                  </th>
                  <th className="tableHead" colSpan={5}>
                    수분율 ( % )
                  </th>
                </tr>
                <tr>
                  <th className="tableHead">GYPSUM A</th>
                  <th className="tableHead">GYPSUM B</th>
                  <th className="tableHead">GYPSUM C</th>
                  <th className="tableHead">Slag</th>
                  <th className="tableHead">증량제</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {waterRateList.map((waterRate, index) => (
                  <tr key={index}>
                    <td className="tableData">{groupTime[`time${index + 1}`]}시~</td>
                    <td className="tableData">
                      <TableInput_EM 
                        value={waterRate.seq1}
                        onChange={(value) =>
                              handleInputChange(
                                index,
                                "seq1",
                                value.target.value
                              )
                        }
                      />
                    </td>
                    <td className="tableData">
                      <TableInput_EM 
                        value={waterRate.seq2}
                        onChange={(value) =>
                              handleInputChange(
                                index,
                                "seq2",
                                value.target.value
                              )
                        }
                      />
                    </td>
                    <td className="tableData">
                      <TableInput_EM 
                        value={waterRate.seq3}
                        onChange={(value) =>
                              handleInputChange(
                                index,
                                "seq3",
                                value.target.value
                              )
                        }
                      />
                    </td>
                    <td className="tableData">
                      <TableInput_EM 
                        value={waterRate.seq4}
                        onChange={(value) =>
                              handleInputChange(
                                index,
                                "seq4",
                                value.target.value
                              )
                        }
                      />
                    </td>
                    <td className="tableData">
                      <TableInput_EM 
                        value={waterRate.seq5}
                        onChange={(value) =>
                              handleInputChange(
                                index,
                                "seq5",
                                value.target.value
                              )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              onClick={updatePumpAggre}
            />
          </div>

          {/* 테스트 코드
          <div>
            <button onClick={test}>ttttt</button>
          </div> */}
        </div>
      </div>
    </UpdateWaterRateWrapper>
  );
};
export default UpdateWaterRateModal;
