import { Button, Input, SearchBtn } from "Elements";
import Pagination from "@mui/material/Pagination";
import { Header } from "Layout";
import React from "react";
import styled from "styled-components";
import { set } from "mobx";

const SlaveMngWrapper = styled.div`
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

const SlaveMngView = ({
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
    <SlaveMngWrapper>
      <Header />
      <div className="subPageTitle">
        <div className="subPageTitleText">Slave 관리</div>
      </div>
      <div className="layer">
        <div className="inputWrap">
          <Input
            className="largeInput"
            placeholder="Slave 그룹명"
            onChange={(e) =>
              setSearchParams({ ...searchParams, slaveNm: e.target.value })
            }
            value={searchParams.slaveNm || ""}
          />
        </div>
        <SearchBtn onClick={() => onClickSearch(1)} />
      </div>
      <div className="layer">
        <Button onClick={onClickRegBtn} btnText="신규 / 수정" />
        <Button btnText="삭제" onClick={onClickDelete} />
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
              <th className="tableHead">Slave 상세명</th>
              <th className="tableHead">Unit ID</th>
              <th className="tableHead">사용여부</th>
              <th className="tableHead">Slave 그룹명</th>
              <th className="tableHead">구분</th>
              <th className="tableHead">마스터 명</th>
              <th className="tableHead">마스터 IP</th>
              <th className="tableHead">마스터 Port No</th>
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
                      id={`${i}check`}
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
      <div id="listViewPagination">
        <Pagination
          onChange={handlePageChange}
          page={searchParams?.curPage || 1}
          count={
            list === undefined
              ? 0
              : Math.ceil(list[0]?.totCnt / searchParams?.limit) || 0
          }
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </SlaveMngWrapper>
  );
};
export default SlaveMngView;
