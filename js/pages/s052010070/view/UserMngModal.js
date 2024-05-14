import React from "react";
import styled from "styled-components";
import { Button, Input, SearchBtn, TableInput, Selectbox } from "Elements";

const MasterRegModalWrapper = styled.div`
  .box {
    width: 900px;
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
  .rightBtn {
    margin-left: auto;
  }
  .btnWrap {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
  .rightBtnEnd {
    margin-right: -15px;
  }

`;

const MasterRegModal = ({
  closeModal,
  checkAllBoxHandler,
  checkBoxHandler,
  getList,
  list,
  searchParams,
  setSearchParams,
  onClickClose,
  onClickSave,
  onClickDelete,
  onClickAddRow,
  onClickRemoveRow,
  onChangeUser,
  onChangeHpNo,
  onChangeComment,
  adminItem,
  onChangeAdminFlag,
}) => {
  return (
    <MasterRegModalWrapper>
      <div className="modalBg">
        <div className="box">
          <div className="titleSection">
            <div className="modalTitle">사용자 관리</div>
          </div>
          <div className="form">
            <div className="layer">
              <div className="inputWrap">
                <Input
                  placeholder="성명"
                  onChange={(e) => setSearchParams({ ...searchParams, userNm: e.target.value })}
                  value={searchParams?.userNm || ""}
                />
              </div>
              <SearchBtn onClick={getList} />
            </div>
            <div className="layer">
              <Button btnText="저장" onClick={onClickSave} />
              <Button btnText="삭제" onClick={onClickDelete} />
              <Button btnText="행추가" className="rightBtn" onClick={onClickAddRow} />
              <Button btnText="행삭제" className="rightBtnEnd" onClick={onClickRemoveRow} />
            </div>
            <div className="tableWrap">
              <table>
                <thead className="tableHeadRow">
                  <tr>
                    <th className="tableHead checkTd">
                      <div>
                        <input type="checkbox" name="checkAllBox" onChange={(e) => checkAllBoxHandler(e)} />
                      </div>
                    </th>
                    <th className="tableHead">No</th>
                    <th className="tableHead">성명</th>
                    <th className="tableHead">휴대폰 번호</th>
                    <th className="tableHead">Admin 여부</th>
                    <th className="tableHead">비고</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {list.length > 0 &&
                    list.map((v, i) => (
                      <tr key={i}>
                        <td className="tableData checkTd">
                          <input type="checkbox" name="checkBox" onChange={(e) => checkBoxHandler(e, v, i)} />
                        </td>
                        <td className="tableData">
                          <div>{i + 1}</div>
                        </td>
                        <td className="tableData">
                          <TableInput onChange={(e) => onChangeUser(e, i)} value={list[i]?.userNm || ""} />
                        </td>
                        <td className="tableData">
                          <TableInput 
                          className='mediumInput'
                          maxLength="13" 
                          onChange={(e) => onChangeHpNo(e, i)} value={list[i]?.hpNo || ""} />
                        </td>
                        <td className="tableData">
                          <Selectbox option={adminItem} onChange={(e) => onChangeAdminFlag(e, i)} defaultValue={list[i]?.adminFlag === null ? '' : list[i]?.adminFlag} />
                        </td>
                        <td className="tableData">
                          <TableInput
                            className="largeInput"
                            onChange={(e) => onChangeComment(e, i)}
                            value={list[i]?.comments || ""}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="btnWrap">
            <div className="negativeBtn" onClick={onClickClose}>
              <div className="btnText">닫기</div>
            </div>
          </div>
        </div>
      </div>
    </MasterRegModalWrapper>
  );
};
export default MasterRegModal;
