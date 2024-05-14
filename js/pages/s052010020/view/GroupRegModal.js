import { Input } from "Elements";
import CloseIcon from "Img/CloseIcon.png";
import React from "react";
import styled from "styled-components";

const GroupRegModalWrapper = styled.div`
  .modalBox {
    width: 40%;
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
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .cellWrap {
    padding: 20px;
    border: 2px solid #4fb8be;
    border-radius: 10px;
    max-height: 300px;
    overflow : auto;
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
`;

const GroupRegModal = ({ closeModal, inputData, setInputData, selectList, list, onClickList, onClickChecked, onClickReg }) => {

  return (
    <GroupRegModalWrapper>
      <div className="modalBg">
        <div className="modalBox">
          <div className="titleSection">
            <div className="modalTitle">그룹 등록 / 수정</div>
          </div>
          <div className="form">
            <div className="layer">
              <div className="inputWrap">
                <div className="label">그룹명</div>
                <div className="fullInputWrap">
                  <Input
                    className="fullInput"
                    onChange={e => setInputData({ ...inputData, areaNm: e.target.value })}
                    value={inputData.areaNm || ''}
                  />
                </div>
              </div>
            </div>
            <div className="layer">
              <div className="inputWrap">
                <div className="label">비고</div>
                <div className="fullInputWrap">
                  <Input className="fullInput"
                    onChange={e => setInputData({ ...inputData, comments: e.target.value })}
                    value={inputData.comments || ''}
                  />
                </div>
              </div>
            </div>
            <div className="layer">
              <div className="inputWrap">
                <div className="label">마스터 지정</div>
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
                      {list?.map((v, i) => (
                        <div
                          className={v.selectedMaId === 2 ? "cellDisabled" : selectList.includes(v) ? "cellSelected" : "cell"}
                          key={i}
                          onClick={() => onClickList(v)}
                        >
                          <div>
                            <div className={selectList.includes(v) ? "cellSelectedText" : "cellText"}>{v.masterNm || ''}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="selectedCellWrap">
                    {selectList?.map((v, i) => (
                      <div className="showSelectedCell" key={i}>
                        <div className="showSelectedCellText">{v.masterNm || ''}</div>
                        <div className="removeBtn" onClick={() => onClickChecked(v.displayMaId)} />
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
            <div className="positiveBtn" onClick={() => onClickReg()}>
              <div className="btnText">저장</div>
            </div>
          </div>
        </div>
      </div>
    </GroupRegModalWrapper>
  );
};
export default GroupRegModal;
