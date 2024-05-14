import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useModal } from "Hooks";
import { Input, SearchBtn, Selectbox, TableInput, Button, Checkbox } from "Elements";
import ImageZoom from "../../s052010061";

const SlaveRegModalWrapper = styled.div`
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
  .checkTd{
    width :45px;
  }
  .checkTd div{
    justify-content :center;
  }
  .checkTd div p{
    display : none;
  }
  .smallTd{
    width :80px;
  }

  .label {
    width: 100px;
    font-size: 18px;
    font-weight: 600;
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
    background-color: #70ced3;
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
    display: flex;
    align-items: center;
  }
  .minTd,
  .maxTd {
    width: 100px;
  }
  .rightBtn {
    margin-left: auto;
  }
`;

const SlaveRegModal = ({
  closeModal,
  inputData,
  setInputData,
  currentMachine,
  setCurrentMachine,
  levelMachine,
  setLevelMachine,
  slaveTp,
  useFlag,
  imageRef,
  uploadImg,
  onClickSave,
  checkedSlave,
  checkBoxHandlerL,
  checkBoxHandlerC,
  onClickAddRowL,
  onClickAddRowC,
  onClickRemoveRowL,
  onClickRemoveRowC,
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
    <SlaveRegModalWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">{checkedSlave ? "Slave 수정" : "Slave 등록"}</div>
          </div>
          <div className="form">
            <div className="layer">
              <div className="inputWrap">
                <div className="label">Slave 그룹명</div>
                <div className="fullInputWrap">
                  <Input
                    className="fullInput"
                    onChange={(e) => setInputData({ ...inputData, slaveNm: e.target.value })}
                    value={inputData?.slaveNm || ""}
                  />
                </div>
              </div>
              <div className="inputWrap">
                <div className="label">구분</div>
                <div className="fullInputWrap">
                  <Selectbox
                    className="fullSelect"
                    option={slaveTp}
                    onChange={(e) => {
                      setInputData({ ...inputData, slaveTp: e.target.value })
                      initCheckList()
                    }}
                    defaultValue={inputData.slaveTp}
                  />
                </div>
              </div>
            </div>
            <div className="layer">
              <div className="label">비고</div>
              <div className="fullInputWrap">
                <Input
                  className="fullInput"
                  onChange={(e) => setInputData({ ...inputData, comments: e.target.value })}
                  defaultValue={inputData?.comments || ""}
                />
              </div>
            </div>
            {inputData.slaveTp === "V" ?
              <div className="layer">
                <Button btnText="행추가" className="rightBtn" onClick={onClickAddRowC} />
                <Button btnText="행삭제" className="rightBtnEnd" onClick={onClickRemoveRowC} />
              </div>
              :
              <div className="layer">
                <Button btnText="행추가" className="rightBtn" onClick={onClickAddRowL} />
                <Button btnText="행삭제" className="rightBtnEnd" onClick={onClickRemoveRowL} />
              </div>
            }
            <div className="tableWrap">
              <table>
                <thead className="tableHeadRow">
                  <tr>
                    <th className="tableHead" rowSpan={2}>
                      선택
                    </th>
                    <th className="tableHead" rowSpan={2}>
                      Slave 명
                    </th>
                    <th className="tableHead" rowSpan={2}>
                      Slave ID
                    </th>
                    <th className="tableHead" rowSpan={2}>
                      사용여부
                    </th>
                    <th className="tableHead" colSpan={2}>
                      알람값
                    </th>
                    <th className="tableHead" rowSpan={2}>
                      위험지속시간(초)
                    </th>
                    <th className="tableHead" rowSpan={2}>
                      첨부파일
                    </th>
                  </tr>
                  <tr className="theadSpan">
                    <th className="tableHead minTd">Min</th>
                    <th className="tableHead maxTd">Max</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {inputData.slaveTp === "V"
                    ? currentMachine.length > 0 &&
                    currentMachine.map((v, i) => (
                      <tr key={i}>
                        <td className="tableData checkTd">
                          <Checkbox
                            name="checkBox"
                            onChange={(e) => checkBoxHandlerC(e, i)}
                          />
                        </td>
                       
                        <td className="tableData">
                          <TableInput
                            className={currentMachine[i]?.useFlag === "Y" ? "mediumInput" : "mediumInput disabled"}
                            readOnly={currentMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...currentMachine.slice(0, i),
                                { ...currentMachine[i], slaveDetailNm: e.target.value, },
                                ...currentMachine.slice(i + 1),
                              ];
                              setCurrentMachine(newInfo);
                            }}
                            value={currentMachine[i]?.slaveDetailNm || ""}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={currentMachine[i]?.useFlag === "Y" ? "shortInput" : "shortInput disabled"}
                            readOnly={currentMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...currentMachine.slice(0, i),
                                { ...currentMachine[i], slaveDetailId: e.target.value, },
                                ...currentMachine.slice(i + 1),
                              ];
                              setCurrentMachine(newInfo);
                            }}
                            value={currentMachine[i]?.slaveDetailId || ""}
                          />
                        </td>
                        <td className="tableData">
                          <Selectbox
                            className="veryShortSelect"
                            option={useFlag}
                            onChange={(e) => {
                              let newInfo;
                              e.target.value === "Y"
                                ? (newInfo = [
                                  ...currentMachine.slice(0, i),
                                  { ...currentMachine[i], useFlag: e.target.value },
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
                          <TableInput
                            className={currentMachine[i]?.useFlag === "Y" ? "shortInput" : "shortInput disabled"}
                            readOnly={currentMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...currentMachine.slice(0, i),
                                {
                                  ...currentMachine[i],
                                  alarmMinValue: e.target.value.replace(/[^\d.-]/g, "") || null,
                                },
                                ...currentMachine.slice(i + 1),
                              ];
                              setCurrentMachine(newInfo);
                            }}
                            value={currentMachine[i].alarmMinValue}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={currentMachine[i]?.useFlag === "Y" ? "shortInput" : "shortInput disabled"}
                            readOnly={currentMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...currentMachine.slice(0, i),
                                {
                                  ...currentMachine[i],
                                  alarmMaxValue: e.target.value.replace(/[^0-9.]/g, "") || null,
                                },
                                ...currentMachine.slice(i + 1),
                              ];
                              setCurrentMachine(newInfo);
                            }}
                            value={currentMachine[i].alarmMaxValue}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={
                              currentMachine[i]?.useFlag === "Y" ? "veryShortInput" : "veryShortInput disabled"
                            }
                            readOnly={currentMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...currentMachine.slice(0, i),
                                { ...currentMachine[i], alarmTm: e.target.value.replace(/[^0-9.]/g, "") || null },
                                ...currentMachine.slice(i + 1),
                              ];
                              setCurrentMachine(newInfo);
                            }}
                            value={currentMachine[i]?.alarmTm || ""}
                          />
                        </td>
                        <td className="tableData fileTd">
                          <TableInput
                            className={currentMachine[i]?.useFlag === "Y" ? "largeInput" : "largeInput disabled"}
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
                          <SearchBtn
                            onClick={() => (currentMachine[i]?.useFlag === "Y" ? imageRef.current[i].click() : null)}
                          />
                        </td>
                      </tr>
                    ))
                    : levelMachine.length > 0 &&
                    levelMachine.map((v, i) => (
                      <tr key={i}>
                        <td className="tableData checkTd">
                          <Checkbox
                            name="checkBox"
                            onChange={(e) => checkBoxHandlerL(e, i)}
                          />
                        </td>
                     
                        <td className="tableData ">
                          <TableInput
                            className={levelMachine[i]?.useFlag === "Y" ? "mediumInput" : "mediumInput disabled"}
                            readOnly={levelMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...levelMachine.slice(0, i),
                                { ...levelMachine[i], slaveDetailNm: e.target.value },
                                ...levelMachine.slice(i + 1),
                              ];
                              setLevelMachine(newInfo);
                            }}
                            value={levelMachine[i]?.slaveDetailNm || ""}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={levelMachine[i]?.useFlag === "Y" ? "shortInput" : "shortInput disabled"}
                            readOnly={levelMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...levelMachine.slice(0, i),
                                { ...levelMachine[i], slaveDetailId: e.target.value, },
                                ...levelMachine.slice(i + 1),
                              ];
                              setLevelMachine(newInfo);
                            }}
                            value={levelMachine[i]?.slaveDetailId || ""}
                          />
                        </td>
                        <td className="tableData">
                          <Selectbox
                            className="veryShortSelect"
                            option={useFlag}
                            onChange={(e) => {
                              let newInfo;
                              e.target.value === "Y"
                                ? (newInfo = [
                                  ...levelMachine.slice(0, i),
                                  { ...levelMachine[i], useFlag: e.target.value },
                                  ...levelMachine.slice(i + 1),
                                ])
                                : (newInfo = [
                                  ...levelMachine.slice(0, i),
                                  {
                                    ...levelMachine[i],
                                    useFlag: e.target.value,
                                    alarmMinValue: null,
                                    alarmMaxValue: null,
                                    alarmTm: null,
                                    attachFile: null,
                                    attachFileNm: null,
                                  },
                                  ...levelMachine.slice(i + 1),
                                ]);
                              setLevelMachine(newInfo);
                            }}
                            defaultValue={levelMachine[i]?.useFlag}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={levelMachine[i]?.useFlag === "Y" ? "shortInput" : "shortInput disabled"}
                            readOnly={levelMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...levelMachine.slice(0, i),
                                { ...levelMachine[i], alarmMinValue: e.target.value.replace(/[^\d.-]/g, "") || null},
                                ...levelMachine.slice(i + 1),
                              ];
                              setLevelMachine(newInfo);
                            }}
                            value={levelMachine[i].alarmMinValue}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={levelMachine[i]?.useFlag === "Y" ? "shortInput" : "shortInput disabled"}
                            readOnly={levelMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...levelMachine.slice(0, i),
                                { ...levelMachine[i], alarmMaxValue: e.target.value.replace(/[^0-9.]/g, "") || null },
                                ...levelMachine.slice(i + 1),
                              ];
                              setLevelMachine(newInfo);
                            }}
                            value={levelMachine[i].alarmMaxValue}
                          />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className={levelMachine[i]?.useFlag === "Y" ? "veryShortInput" : "veryShortInput disabled"}
                            readOnly={levelMachine[i]?.useFlag === "Y" ? false : true}
                            onChange={(e) => {
                              const newInfo = [
                                ...levelMachine.slice(0, i),
                                { ...levelMachine[i], alarmTm: e.target.value.replace(/[^0-9.]/g, "") || null },
                                ...levelMachine.slice(i + 1),
                              ];
                              setLevelMachine(newInfo);
                            }}
                            value={levelMachine[i]?.alarmTm || ""}
                          />
                        </td>
                        <td className="tableData fileTd">
                          <TableInput
                            className={levelMachine[i]?.useFlag === "Y" ? "largeInput" : "largeInput disabled"}
                            onClick={() => onClickZoom(i, false)}
                            value={levelMachine[i]?.attachFileNm || ""}
                            readOnly
                          />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={(el) => (imageRef.current[i + 5] = el)}
                            onChange={(e) => uploadImg(e, i, false)}
                          />
                          <SearchBtn
                            onClick={() => (levelMachine[i]?.useFlag === "Y" ? imageRef.current[i + 5].click() : null)}
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
    </SlaveRegModalWrapper>
  );
};
export default SlaveRegModal;
