import Pagination from '@mui/material/Pagination';
import { Button, Input, SearchBtn } from "Elements";
import { Header } from "Layout";
import React from "react";
import styled from "styled-components";
import GroupReg from "../../s052010020";

const GroupMngWrapper = styled.div`
  .layer {
    width: 95%;
    height: 40;
    display: flex;
    flex-direction: "row";
    align-items: "center";
    justify-content: "flex-start";
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .inputWrap {
    margin-right: 15px;
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
    height : 55vh;

  }
`;

const GroupMngView = ({
  onClickReg, closeModal, ModalPortal,
  searchParams, setSearchParams, onClickSearch,
  onClickDelete, isSelectAll, checkedHandler, CheckedAllHandler,
  list, checkList, handlePageChange,refresh
}) => {

  return (
    <GroupMngWrapper>
      <Header />
      <div className="subPageTitle">
        <div className="subPageTitleText">그룹 관리</div>
      </div>
      <div className="layer">
        <div className="inputWrap">
          <Input
            className="largeInput"
            placeholder="그룹명"
            onChange={(e) => setSearchParams({ ...searchParams, areaNm: e.target.value })}
            value={searchParams.areaNm || ''}
          />
        </div>
        <SearchBtn onClick={() => onClickSearch(1)} />
      </div>
      <div className="layer">
        <Button
          btnText="신규 / 수정"
          onClick={() => { onClickReg() }}
        />
        <Button
          btnText="삭제"
          onClick={() => onClickDelete()}
        />
      </div>
      <div className="tableWrap">
        <table>
          <thead className="tableHeadRow">
            <tr>
              <th className="tableHead checkTd">
                <input
                  id='checkAll'
                  type="checkbox"
                  value={isSelectAll}
                  onChange={(e) => { CheckedAllHandler(e) }}
                />
              </th>
              <th className="tableHead">No</th>
              <th className="tableHead">그룹명</th>
              <th className="tableHead">마스터 수</th>
              <th className="tableHead">비고</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {list?.map((v, i) => (
              <tr key={i}>
                <td className="tableData">
                  <input
                    id={`${i}check`}
                    type="checkbox"
                    value={v.areaSeq}
                    onChange={(e) => {
                      checkedHandler(e);
                    }}
                  />
                </td>
                <td className="tableData">{i + 1}</td>
                <td className="tableData">{v.areaNm || ''}</td>
                <td className="tableData">{v.masterCnt || ''}</td>
                <td className="tableData">{v.comments || ''}</td>
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
      <ModalPortal>
        <GroupReg
          closeModal={closeModal}
          onClickSearch={onClickSearch}
          checkList={checkList}
          refresh={refresh}
        />
      </ModalPortal>
    </GroupMngWrapper>
  );
};
export default GroupMngView;
