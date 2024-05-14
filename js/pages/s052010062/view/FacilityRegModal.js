import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useModal } from "Hooks";
import { palette2 } from "Style";
import {
  Input_EM,
  SearchBtn_EM,
  Selectbox_EM,
  TableInput_EM,
  Button_EM,
} from "Elements";
import ImageZoom from "../../s052010061";

const FacilityRegModalWrapper = styled.div`
  .modalBox {
    width: 55%;
  }

  .form {
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    overflow: scroll;
  }

  .layer {
    width: 100%;
    margin-bottom: 3%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .inputWrap {
    width: 45%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .label {
    width: 100px;
    font-size: 18px;
    font-weight: 600;
  }
  .veryShortSelect > div {
  }
  .btnWrap {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .positiveBtn {
    width: 45%;
    background-color: ${palette2.PrimaryColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding: 10px 0;
    font-weight: 700;
  }
  .negativeBtn {
    width: 45%;
    background-color: #888;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding: 10px 0;
    font-weight: 700;
  }
  .btnText {
    font-size: 28px;
    color: white;
    text-align: center;
  }
  .fullInputWrap {
    flex-grow: 1;
  }

  .fileTd {
    padding: 8px 10px;
    display: flex;
    align-items: center;
  }
  .rightBtn {
    margin-left: auto;
  }
`;

const FacilityRegModal = ({
  closeModal,
  inputData,
  setInputData,
  currentMachine,
  setCurrentMachine,
  slaveTp,
  useFlag,
  imageRef,
  uploadImg,
  onClickSave,
  checkedSlave,
  checkBoxHandler,
  onClickAddRow,
  onClickRemoveRow,
  initCheckList,
}) => {
  const { openModal, closeModal: closeZoomModal, ModalPortal } = useModal();
  const [imgUrl, setImgUrl] = useState("");

  const onClickZoom = (i, flag) => {
    if (currentMachine[i]?.attachFile && flag) {
      setImgUrl(currentMachine[i].attachFile);
      openModal();
    } else if (levelMachine[i]?.attachFile && !flag) {
      setImgUrl(levelMachine[i].attachFile);
      openModal();
    }
  };

  return (
    <FacilityRegModalWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">
              {checkedSlave ? "설비Item 수정" : "설비Item 등록"}
            </div>
          </div>
          <div className="form">
            <div className="layer">
              <div className="inputWrap">
                <div className="label">설비Item 명</div>
                <div className="fullInputWrap">
                  <Input_EM
                    className="fullInput"
                    onChange={(e) =>
                      setInputData({ ...inputData, slaveNm: e.target.value })
                    }
                    value={inputData?.slaveNm || ""}
                  />
                </div>
              </div>
              <div className="inputWrap">
                <div className="label">구분</div>
                <div className="fullInputWrap">
                  <Selectbox_EM
                    className="fullSelect"
                    option={slaveTp}
                    onChange={(e) => {
                      setInputData({ ...inputData, slaveTp: e.target.value });
                      initCheckList();
                    }}
                    defaultValue={inputData.slaveTp}
                  />
                </div>
              </div>
            </div>
            <div className="layer">
              <div className="inputWrap">
                <div className="label">시작 주소</div>
                <div className="fullInputWrap">
                  <Input_EM
                    className="fullInput"
                    onChange={(e) =>
                      setInputData({ ...inputData, startNum: e.target.value })
                    }
                    value={inputData?.startNum || ""}
                  />
                </div>
              </div>
              <div className="inputWrap">
                <div className="label">개수</div>
                <div className="fullInputWrap">
                  <Input_EM
                    className="fullInput"
                    onChange={(e) =>
                      setInputData({ ...inputData, readRegCnt: e.target.value })
                    }
                    value={inputData?.readRegCnt || ""}
                  />
                </div>
              </div>
            </div>
            <div className="layer">
              <div className="label">비고</div>
              <div className="fullInputWrap">
                <Input_EM
                  className="fullInput"
                  onChange={(e) =>
                    setInputData({ ...inputData, comments: e.target.value })
                  }
                  defaultValue={inputData?.comments || ""}
                />
              </div>
            </div>
            <div className="layer">
              <Button_EM
                btnText="행추가"
                className="rightBtn"
                onClick={onClickAddRow}
              />
              <Button_EM
                btnText="행삭제"
                className="rightBtnEnd"
                onClick={onClickRemoveRow}
              />
            </div>
            <div className="tableWrap">
              <table>
                <thead className="tableHeadRow">
                  <tr>
                    <th className="tableHead" style={{ width: 40 }}>
                      선택
                    </th>
                    <th className="tableHead">Machine 명</th>
                    <th className="tableHead">사용여부</th>
                    <th className="tableHead">Unit ID</th>
                    <th className="tableHead">시작주소</th>
                    <th className="tableHead">수분율</th>
                    <th className="tableHead">첨부파일</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {currentMachine.map((v, i) => (
                    <tr key={i}>
                      <td className="tableData">
                        <div>
                          <input
                            type="checkbox"
                            name="checkBox"
                            onChange={(e) => checkBoxHandler(e, i)}
                          />
                        </div>
                      </td>
                      <td className="tableData">
                        <TableInput_EM
                          className={
                            currentMachine[i]?.useFlag === "Y"
                              ? "mediumInput"
                              : "mediumInput disabled"
                          }
                          readOnly={
                            currentMachine[i]?.useFlag === "Y" ? false : true
                          }
                          onChange={(e) => {
                            const newInfo = [
                              ...currentMachine.slice(0, i),
                              {
                                ...currentMachine[i],
                                slaveDetailNm: e.target.value,
                              },
                              ...currentMachine.slice(i + 1),
                            ];
                            setCurrentMachine(newInfo);
                          }}
                          value={currentMachine[i]?.slaveDetailNm || ""}
                        />
                      </td>
                      <td className="tableData">
                        <Selectbox_EM
                          style={{ justifyContent: "center" }}
                          className="veryShortSelect"
                          option={useFlag}
                          onChange={(e) => {
                            let newInfo;
                            e.target.value === "Y"
                              ? (newInfo = [
                                  ...currentMachine.slice(0, i),
                                  {
                                    ...currentMachine[i],
                                    useFlag: e.target.value,
                                  },
                                  ...currentMachine.slice(i + 1),
                                ])
                              : (newInfo = [
                                  ...currentMachine.slice(0, i),
                                  {
                                    ...currentMachine[i],
                                    useFlag: e.target.value,
                                    alarmMinValue: null,
                                    alarmMaxValue: null,
                                    alarmTm: null,
                                    attachFile: null,
                                    attachFileNm: null,
                                  },
                                  ...currentMachine.slice(i + 1),
                                ]);

                            setCurrentMachine(newInfo);
                          }}
                          defaultValue={currentMachine[i]?.useFlag}
                        />
                      </td>
                      <td className="tableData">
                        <TableInput_EM
                          className={
                            currentMachine[i]?.useFlag === "Y"
                              ? "shortInput"
                              : "shortInput disabled"
                          }
                          readOnly={
                            currentMachine[i]?.useFlag === "Y" ? false : true
                          }
                          onChange={(e) => {
                            const newInfo = [
                              ...currentMachine.slice(0, i),
                              {
                                ...currentMachine[i],
                                slaveDetailId: e.target.value,
                              },
                              ...currentMachine.slice(i + 1),
                            ];
                            setCurrentMachine(newInfo);
                          }}
                          value={currentMachine[i]?.slaveDetailId || ""}
                        />
                      </td>
                      <td className="tableData">
                        <TableInput_EM
                          className={
                            currentMachine[i]?.useFlag === "Y"
                              ? "shortInput"
                              : "shortInput disabled"
                          }
                          readOnly={
                            currentMachine[i]?.useFlag === "Y" ? false : true
                          }
                          onChange={(e) => {
                            const newInfo = [
                              ...currentMachine.slice(0, i),
                              {
                                ...currentMachine[i],
                                startNum: e.target.value,
                              },
                              ...currentMachine.slice(i + 1),
                            ];
                            setCurrentMachine(newInfo);
                          }}
                          value={currentMachine[i]?.startNum || ""}
                        />
                      </td>
                      <td className="tableData">
                        <TableInput_EM
                          className={
                            currentMachine[i]?.useFlag === "Y"
                              ? "shortInput"
                              : "shortInput disabled"
                          }
                          readOnly={
                            currentMachine[i]?.useFlag === "Y" ? false : true
                          }
                          onChange={(e) => {
                            const newInfo = [
                              ...currentMachine.slice(0, i),
                              {
                                ...currentMachine[i],
                                waterRate: e.target.value,
                              },
                              ...currentMachine.slice(i + 1),
                            ];
                            setCurrentMachine(newInfo);
                          }}
                          value={currentMachine[i]?.waterRate || ""}
                        />
                      </td>

                      <td className="tableData fileTd">
                        <TableInput_EM
                          className={
                            currentMachine[i]?.useFlag === "Y"
                              ? "largeInput"
                              : "largeInput disabled"
                          }
                          onClick={() => onClickZoom(i, true)}
                          value={currentMachine[i]?.attachFileNm || ""}
                          readOnly
                        />
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={(el) => (imageRef.current[i] = el)}
                          onChange={(e) => uploadImg(e, i, true)}
                        />
                        <SearchBtn_EM
                          style={{ marginLeft: 10 }}
                          onClick={() =>
                            currentMachine[i]?.useFlag === "Y"
                              ? imageRef.current[i].click()
                              : null
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="btnWrap">
            <div className="negativeBtn" onClick={closeModal}>
              <div className="btnText">취소</div>
            </div>
            <div className="positiveBtn" onClick={onClickSave}>
              <div className="btnText">저장</div>
            </div>
          </div>
        </div>
      </div>
      <ModalPortal>
        <ImageZoom imgUrl={imgUrl} closeModal={closeZoomModal} />
      </ModalPortal>
    </FacilityRegModalWrapper>
  );
};
export default FacilityRegModal;
