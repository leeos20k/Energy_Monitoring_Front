import {Button_EM, Input_EM, SearchBtn_EM } from "Elements";
import Pagination from "@mui/material/Pagination";
import { Header_EM } from "Layout";
import React from "react";
import styled from "styled-components";

const FacilityMngWrapper = styled.div`
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
  .largeInput {
    margin-right: 15px;
  }
  .tableWrap {
    width: 95%;
    margin: 0 auto;
    height: 55vh;
  }
`;

const FacilityMngView = ({
  searchParams,
  setSearchParams,
  onClickSearch,
  onClickDelete,
  isSelectAll,
  checkedHandler,
  CheckedAllHandler,
  list,
  onClickRegBtn,
  handlePageChange,
 
}) => {
  return (
    <FacilityMngWrapper>
      <Header_EM />
      <div className="subPageTitle">
        <div className="subPageTitleText">설비Item 관리</div>
      </div>
      <div className="layer">
        <div className="InputWrap">
          <Input_EM
            className="largeInput"
            placeholder="설비Item 명"
           
          />
        </div>
        <SearchBtn_EM onClick={() => onClickSearch(1)} />
      </div>
      <div className="layer">
        <Button_EM onClick={onClickRegBtn} btnText="신규 / 수정" />
        <Button_EM btnText="삭제" onClick={onClickDelete}/>
      </div>
      <div className="tableWrap">
        <table>
          <thead className="tableHeadRow">
            <tr>
              <th className="tableHead">
                <input
                  id="checkAll"
                  type="checkbox"
                  value={isSelectAll}
                  onChange={(e) => {
                    CheckedAllHandler(e);
                  }}
                />
              </th>
              <th className="tableHead">No</th>
              <th className="tableHead">Machine 명</th>
              <th className="tableHead">Unit ID</th>
              <th className="tableHead">사용여부</th>
              <th className="tableHead">설비Item 명</th>
              <th className="tableHead">구분</th>
              <th className="tableHead">설비그룹 명</th>
              <th className="tableHead">설비그룹 IP</th>
              <th className="tableHead">설비그룹 Port No</th>
              <th className="tableHead">비고</th>
            </tr>
          </thead>
          <tbody className="tableBody">
              
              {list?.map((v, i) => (
              <tr key={i}>
                {i === 0 || v.slaveNm !== list[i - 1].slaveNm ?
                  <>
                  <td className="tableData" rowSpan={v.cnt}>
                    <input
                      // id={`${i}check`}
                      id={`check${v.slaveId}`}
                      type="checkbox"
                      value={v.slaveId}
                      onChange={(e) => {
                        checkedHandler(e);
                      }}
                    />
                    </td>
                  </>
                  :
                  ''                
                }

                <td className="tableData">{i + 1}</td>
                <td className="tableData">{v.slaveDetailNm ||""}</td>
                <td className="tableData">{v.slaveDetailId || ""}</td>
                <td className="tableData">{v.useFlag || ""}</td>

                {i === 0 || v.slaveNm !== list[i - 1].slaveNm ?
                  <>  
                    <td className="tableData" rowSpan={v.cnt}>{v.slaveNm || ""}</td>
                    <td className="tableData" rowSpan={v.cnt}>{v.slaveTpNm || ""}</td>
                    <td className="tableData" rowSpan={v.cnt}>{v.masterNm || ""}</td>
                    <td className="tableData" rowSpan={v.cnt}>{v.masterIp || ""}</td>
                    <td className="tableData" rowSpan={v.cnt}>{v.masterPortNo || ""}</td>
                    <td className="tableData" rowSpan={v.cnt}>{v.comments || ""}</td>
                  </>
                  :
                  ''  
                }     
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div id="listViewPagination">
        <Pagination
          onChange={handlePageChange}
          page={searchParams?.curPage || 1}
          count={
            list === undefined
              ? 0
              : Math.ceil(list[0]?.totCnt / searchParams?.limit) || 0
          }
          size="large"
          showFirstButton_EM
          showLastButton_EM
        />
      </div> */}
    </FacilityMngWrapper>
  );
};
export default FacilityMngView;
