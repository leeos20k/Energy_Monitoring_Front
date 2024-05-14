import React from "react";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { Header } from "Layout";
import { Button, Input, SearchBtn } from "Elements";

const MasterMngWrapper = styled.div`
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

  .tableHeadRow {
    background-color: #e5fbfc;
    border-bottom: 0;
    border-radius: 10px;
  }
  .tableWrap {
    width: 95%;
    margin: 0 auto;
    height: 55vh;
  }
  .inputWrap {
    margin-right: 15px;
  }
`;

const MasterMngView = ({
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
    <MasterMngWrapper>
      <Header />
      <div className="subPageTitle">
        <div className="subPageTitleText">마스터 관리</div>
      </div>
      <div className="layer">
        <div className="inputWrap">
          <Input
            placeholder="마스터 명"
            onChange={(e) =>
              setSearchParams({ ...searchParams, masterNm: e.target.value })
            }
            value={searchParams?.masterNm || ""}
          />
        </div>
        <SearchBtn onClick={() => onClickSearch(1)} />
      </div>
      <div className="layer">
        <Button btnText="신규 / 수정" onClick={onClickReg} />
        <Button btnText="삭제" onClick={onClickDelete} />
      </div>

      <div className="tableWrap">
        <table>
          <thead className="tableHeadRow">
            <tr>
              <th className="tableHead checkTd">
                <input
                  type="checkbox"
                  name="checkAllBox"
                  onChange={(e) => checkAllBoxHandler(e)}
                />
              </th>
              <th className="tableHead">No</th>
              <th className="tableHead">마스터 명</th>
              {/* <th className="tableHead">구분</th> */}
              <th className="tableHead">IP 번호</th>
              <th className="tableHead">Port 번호</th>
              <th className="tableHead">Slave 그룹수</th>
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
                  {/* <td className="tableData">{v.slaveTp === "V" ? "전류기" : "레벨기"}</td> */}
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
      <div id="listViewPagination">
        <Pagination
          onChange={handlePageChange}
          page={searchParams?.curPage || 1}
          count={list === undefined ? 0 : Math.ceil(list[0]?.totCnt / searchParams?.limit) || 0}
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </MasterMngWrapper>
  );
};
export default MasterMngView;
