import React from "react";
import styled from "styled-components";
import { Input, Selectbox } from "Elements";
import CloseIcon from "Img/CloseIcon.png";

const MasterRegModalWrapper = styled.div`
  .box {
    width: 65%;
    background-color: white;
    margin: 0 auto;
    margin-top: auto;
    margin-bottom: auto;
    z-index: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .titleSection {
    width: 100%;
    height: 70px;
    background-color: #70ced3;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .form {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    overflow: scroll;
  }
  
  .layer {
    width: 100%;
    margin-bottom: 20px;
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
  .inputWrap2 {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .label {
    width: 150px;
    font-size: 18px;
    font-weight: 600;
  }

  .contentsWrap {
    flex: 1;
  }

  .cellWrapInner {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .cellWrap {
    padding: 20px;
    border: 2px solid #4fb8be;
    border-radius: 10px;
    max-height: 300px;
    overflow: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
  }
  .cell {
    width: 47%;
    margin-left: 2%;
    padding: 10px 0;
    border: 2px solid #888;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .cellText {
    color: #888;
    font-size: 24px;
    text-align: center;
  }
  .cellSelected {
    width: 47%;
    margin-left: 2%;
    padding: 10px 0;
    background-color: #4fb8be;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .cellSelectedText {
    color: white;
    font-size: 24px;
    text-align: center;
  }
  .cellDisabled {
    width: 47%;
    margin-left: 2%;
    padding: 10px 0;
    background-color: #e9e9e9;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .selectedCellWrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .showSelectedCell {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 2%;
    padding: 10px 10px;
    background-color: #4fb8be;
    border-radius: 10px;
  }
  .showSelectedCellText {
    color: white;
  }
  .removeBtn {
    background: url(${CloseIcon}) no-repeat center;
    background-size: 100%;
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .legendsWrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .legend {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .legendText {
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
  }
  .available {
    width: 20px;
    height: 20px;
    background-color: white;
    border: 1.5px solid #888;
    border-radius: 2px;
  }
  .chosen {
    width: 20px;
    height: 20px;
    background-color: #4fb8be;
    border-radius: 2px;
  }
  .disabled {
    width: 20px;
    height: 20px;
    background-color: #e9e9e9;
    border-radius: 2px;
  }
  .emptyWrap {
    margin: 0 auto;
  }
  .empty {
    text-align: center;
    color: #e9e9e9;
    font-size: 24px;
  }
  .btnWrap {
    width: 90%;
    margin: 0 auto;
    margin-top: auto;
    margin-bottom: 50px;
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
  }
  .negativeBtn {
    width: 45%;
    background-color: #888;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding: 10px 0;
  }
  .btnText {
    font-size: 28px;
    color: white;
    text-align: center;
  }
  .fullInputWrap {
    flex-grow: 1;
  }
`;

const MasterRegModal = ({
  closeModal,
  inputData,
  setInputData,
  slaveList,
  selectedList,
  getMasterInfo,
  onClickSlave,
  onClickRemove,
  onClickSave,
  checkedMaster,
}) => {
  const selectedStyle = (v) => {
    if (selectedList.includes(v)) return "cellSelected";
    else if (v.choiceFlag === 3) return "cellDisabled";
    else return "cell";
  };

  const selectedTextStyle = (v) => {
    if (selectedList.includes(v)) return "cellSelectedText";
    else if (v.choiceFlag === 3) return "cellText";
    else return "cellText";
  };

  return (
    <MasterRegModalWrapper>
      <div className="modalBg">
        <div className="box">
          <div className="titleSection">
            <div className="modalTitle">{checkedMaster ? "마스터 수정" : "마스터 등록"}</div>
          </div>
          <div className="form">
            <div className="layer">
              <div className="inputWrap">
                <div className="label">
                 마스터 명 <span>*</span>
                </div>
                <div className="fullInputWrap">
                  <Input
                    className="fullInput"
                    onChange={(e) => setInputData({ ...inputData, masterNm: e.target.value })}
                    value={inputData?.masterNm || ""}
                  />
                </div>
              </div>
              <div className="inputWrap">
                <div className="label">수집간격(초)</div>
                <div className="fullInputWrap">
                  <Input
                    className="fullInput"
                    onChange={(e)=>{setInputData({...inputData,collInterval:e.target.value.replace(/[^0-9.]/g, "")})}}
                    value={inputData?.collInterval||''}
                    />
                </div>
              </div>
            </div>
            <div className="layer">
              <div className="inputWrap">
                <div className="label">
                  IP번호 <span>*</span>
                </div>
                <div className="fullInputWrap">
                  <Input
                    className="fullInput"
                    maxLength="15"
                    onChange={(e) => setInputData({ ...inputData, masterIp: e.target.value.replace(/[^0-9.]/g, "") })}
                    value={inputData?.masterIp || ""}
                  />
                </div>
              </div>
              <div className="inputWrap">
                <div className="label">
                  Port번호 <span>*</span>
                </div>
                <div className="fullInputWrap">
                  <Input
                    className="fullInput"
                    maxLength="5"
                    onChange={(e) =>
                      setInputData({ ...inputData, masterPortNo: e.target.value.replace(/[^0-9]/g, "") })
                    }
                    value={inputData?.masterPortNo || ""}
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
                  value={inputData?.comments || ""}
                />
              </div>
            </div>
            <div className="layer">
              <div className="inputWrap2">
                <div className="label">
                  슬레이브 지정 <span>*</span>
                </div>
                <div className="contentsWrap">
                  <div className="legendsWrap">
                    <div className="legend">
                      <div className="available"></div>
                      <div className="legendText">선택가능</div>
                    </div>
                    <div className="legend">
                      <div className="chosen"></div>
                      <div className="legendText">선택됨</div>
                    </div>
                    <div className="legend">
                      <div className="disabled"></div>
                      <div className="legendText">선택불가</div>
                    </div>
                  </div>
                  <div className="cellWrap">
                    <div className="cellWrapInner">
                      {slaveList.length > 0 &&
                        slaveList.map((v, i) => (
                          <div className={selectedStyle(v)} key={i} onClick={() => onClickSlave(v)}>
                            <div className={selectedTextStyle(v)}>{v?.slaveNm || ""}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="selectedCellWrap">
                    {selectedList.length > 0 &&
                      selectedList.map((v, i) => (
                        <div className="showSelectedCell" key={i}>
                          <div className="showSelectedCellText">{v.slaveNm}</div>
                          <div className="removeBtn" onClick={() => onClickRemove(v.slaveId)} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
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
    </MasterRegModalWrapper>
  );
};
export default MasterRegModal;
