import React from "react";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { Header_EM } from "Layout";
import { Button_EM, Input_EM, SearchBtn_EM } from "Elements";

const FacilityIPMngWrapper = styled.div`
  .layer {
    width: 95%;
    height: 40;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .rightBtn {
    margin-left: auto;
    margin-right: -15px;
  }

  .tableWrap {
    width: 95%;
    margin: 0 auto;
    height: 55vh;
  }
  .Input_EMWrap {
    margin-right: 15px;
  }
`;

const FacilityIPMngView = ({
  searchParams,
  setSearchParams,
  list,
  checkAllBoxHandler,
  checkBoxHandler,
  onClickDelete,
  onClickReg,
  getList,
  onClickSearch,
  handlePageChange
}) => {
  return (
    <FacilityIPMngWrapper>
      <Header_EM />
      <div className="subPageTitle">
        <div className="subPageTitleText">설비그룹 관리</div>
      </div>
      <div className="layer">
        <div className="Input_EMWrap">
          <Input_EM
            placeholder="설비그룹 명"
            onChange={(e) =>
              setSearchParams({ ...searchParams, masterNm: e.target.value })
            }
            value={searchParams?.masterNm || ""}
          />
        </div>
        <SearchBtn_EM onClick={() => onClickSearch(1)} />
      </div>
      <div className="layer">
        <Button_EM btnText="신규 / 수정" onClick={onClickReg} />
        <Button_EM btnText="삭제" onClick={onClickDelete} />
      </div>

      <div className="tableWrap">
        <table>
          <thead className="tableHeadRow">
            <tr>
              <th
                className="tableHead checkTd"
                onChange={(e) => checkAllBoxHandler(e)}
              >
                <input type="checkbox" name="checkAllBox" />
              </th>
              <th className="tableHead">No</th>
              <th className="tableHead">설비그룹 명</th>
              <th className="tableHead">IP 번호</th>
              <th className="tableHead">Port 번호</th>
              <th className="tableHead">설비 그룹수</th>
              <th className="tableHead">수집간격</th>
              <th className="tableHead">비고</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {list.length > 0 &&
              list.map((v, i) => (
                <tr key={i}>
                  <td className="tableData">
                    <input
                      type="checkbox"
                      name="checkBox"
                      onChange={(e) => checkBoxHandler(e, v)}
                    />
                  </td>
                  <td className="tableData">{i + 1}</td>
                  <td className="tableData">{v.masterNm}</td>
                  <td className="tableData">{v.masterIp}</td>
                  <td className="tableData">{v.masterPortNo}</td>
                  <td className="tableData">{v.slaveCnt}</td>
                  <td className="tableData">{v.collInterval}</td>
                  <td className="tableData">{v.comments}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </FacilityIPMngWrapper>
  );
};
export default FacilityIPMngView;
