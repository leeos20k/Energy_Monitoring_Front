import { authStore } from "Store";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { API_GET, API_POST } from "../../api";
import { MessageKor } from "Message";
import ProductionStatusView from "./view/ProductionStatusView";
import { useModal, useModalSub } from "Hooks";
import ProdPlanReg from "../s052030100";
import UserMng from "../s052010071";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { palette2 } from "Style";

const ProductionStatus = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const { openModalSub, closeModalSub, ModalPortalSub } = useModalSub();
  const [selectGroup, setSelectGroup] = useState([]);
  const [planList, setPlanList] = useState([]);
  const [rstList, setRstList] = useState([]);
  const [prod, setProd] = useState([]);
  const [vol, setVol] = useState([]);
  const [lng, setLng] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState("07:00:01/07:00:00");


  const today = new Date(); //현재 날짜 시간
  const Tyear = today.getFullYear(); //오늘의 연도 추출
  const Tmonth = String(today.getMonth() + 1).padStart(2, "0"); //오늘의 월 추출
  const Tday = String(today.getDate()).padStart(2, "0"); //오늘의 일 추출

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const Yyear = yesterday.getFullYear(); //어제의 연도 추출
  const Ymonth = String(yesterday.getMonth() + 1).padStart(2, "0"); //어제의 월 추출
  const Yday = String(yesterday.getDate()).padStart(2, "0"); //어제의 일 추출

  const defaultDate = `${Yyear}-${Ymonth}-${Yday}`; //디폴트날짜 = 어제

  const [date1, setDate1] = useState(defaultDate); //조회일자에 달력에 표시될 디폴트 날짜 (어제)
  const [date2, setDate2] = useState(defaultDate); //조회일자에 달력에 표시될 디폴트 날짜 (어제)

  const defaultFromTime = defaultDate; //실제 fromTime 파라미터에 담을 날짜 (어제)
  const defaultToTime = `${Tyear}-${Tmonth}-${Tday}`; //실제 toTime 파라미터에 담을 날짜 (오늘) <- 디폴트 작업조가 '전체=(어제07:00:01~오늘07:00:00)'이므로.

  const initPage = async () => {
    try {
      const params = {
        orgId: authStore.orgId,
        fromTime: defaultFromTime + " 07:00:01", //어제(07:00:01)부터
        toTime: defaultToTime + " 07:00:00", //오늘(07:00:00)까지
        shiftPart: null,
      };

      // console.log("기본 화면표시 날짜(어제) : ",date1,"~",date2)
      // console.log("기본 화면표시 작업조 : ",selectedGroup,"= 전체")
      // console.log("기본 작업조('전체' 이므로)\n파라미터:",params.fromTime,"toTime:",params.toTime,"shiftPart:",params.shiftPart);
      

      const getSelectableGroup = await API_GET(
        `/s052030012/getSelectableGroup`
      );
      const getEnergyProdListPlan = await API_GET(
        `/s052030012/getEnergyProdListPlan`,
        params
      );
      const getEnergyProdListRst = await API_GET(
        `/s052030012/getEnergyProdListRst`,
        params
      );

      setSelectGroup(getSelectableGroup.data.data);
      setPlanList(getEnergyProdListPlan.data.data);
      setRstList(getEnergyProdListRst.data.data);
      allocationGraphData(getEnergyProdListRst.data.data);

      console.log("그룹 가져오는거 : ",getSelectableGroup.data.data);
      console.log("생산현황 계획 데이터 : ",getEnergyProdListPlan.data.data);
      console.log("생산현황 rst 데이터 :  ",getEnergyProdListRst.data.data);



    } catch (err) {
      console.log("err:", err);
    }
  };

  const newConditionInquiry = async () => {
    if (Validation(date1, date2) == 1) {
      const realDate2 = new Date(date2);
      // console.log("realDate2:",realDate2)
      if (
        selectedGroup === "07:00:01/07:00:00" ||
        selectedGroup === "23:00:01/07:00:00"
      ) {
        realDate2.setDate(realDate2.getDate() + 1);
      }
      // console.log("realDate2:",realDate2)
      const year = realDate2.getFullYear();
      const month = String(realDate2.getMonth() + 1).padStart(2, "0");
      const day = String(realDate2.getDate()).padStart(2, "0");
      const date2Format = `${year}-${month}-${day}`;
      // console.log("date2Format:",date2Format);
      const splitArr = selectedGroup.split("/");
      const front = splitArr[0];
      const back = splitArr[1];

      const fromTime = date1 + " " + front;
      const toTime = date2Format + " " + back;

      let shiftPart = null;
      if (selectedGroup === "07:00:01/15:00:00") {
        shiftPart = 1;
      } else if (selectedGroup === "15:00:01/23:00:00") {
        shiftPart = 2;
      } else if (selectedGroup === "23:00:01/07:00:00") {
        shiftPart = 3;
      }

      const newParams = {
        orgId: authStore.orgId,
        fromTime: fromTime,
        toTime: toTime,
        shiftPart: shiftPart,
      };

      console.log("검색 fromTime : ", fromTime);
      console.log("검색 toTime : ", toTime);
      console.log("검색 shiftPart : ", shiftPart);

      const getEnergyProdListPlan = await API_GET(
        `/s052030012/getEnergyProdListPlan`,
        newParams
      );
      const getEnergyProdListRst = await API_GET(
        `/s052030012/getEnergyProdListRst`,
        newParams
      );
      console.log("data1:",getEnergyProdListPlan.data.data);
      console.log("data2:",getEnergyProdListRst.data.data);
      setPlanList(getEnergyProdListPlan.data.data);
      setRstList(getEnergyProdListRst.data.data);
      allocationGraphData(getEnergyProdListRst.data.data);

    }
  };

  const exportToExcel = async () => {
    if (Validation(date1, date2) == 1) {
      const realDate2 = new Date(date2);
      // console.log("realDate2:",realDate2)
      if (
        selectedGroup === "07:00:01/07:00:00" ||
        selectedGroup === "23:00:01/07:00:00"
      ) {
        realDate2.setDate(realDate2.getDate() + 1);
      }
      // console.log("realDate2:",realDate2)
      const year = realDate2.getFullYear();
      const month = String(realDate2.getMonth() + 1).padStart(2, "0");
      const day = String(realDate2.getDate()).padStart(2, "0");
      const date2Format = `${year}-${month}-${day}`;
      // console.log("date2Format:",date2Format);
      const splitArr = selectedGroup.split("/");
      const front = splitArr[0];
      const back = splitArr[1];

      const fromTime = date1 + " " + front;
      const toTime = date2Format + " " + back;

      let shiftPart = null;
      if (selectedGroup === "07:00:01/15:00:00") {
        shiftPart = 1;
      } else if (selectedGroup === "15:00:01/23:00:00") {
        shiftPart = 2;
      } else if (selectedGroup === "23:00:01/07:00:00") {
        shiftPart = 3;
      }

      const newParams = {
        orgId: authStore.orgId,
        fromTime: fromTime,
        toTime: toTime,
        shiftPart: shiftPart,
      };

      console.log("검색 fromTime : ", fromTime);
      console.log("검색 toTime : ", toTime);
      console.log("검색 shiftPart : ", shiftPart);

      const getEnergyProdListPlan = await API_GET(
        `/s052030012/getEnergyProdListPlan`,
        newParams
      );
      const getEnergyProdListRst = await API_GET(
        `/s052030012/getEnergyProdListRst`,
        newParams
      );
      // console.log("data1:",getEnergyProdListPlan.data.data);
      // console.log("data2:",getEnergyProdListRst.data.data);
      setPlanList(getEnergyProdListPlan.data.data);
      setRstList(getEnergyProdListRst.data.data);
      allocationGraphData(getEnergyProdListRst.data.data);

      const excel = await API_GET(`/s052030012/getEnergyProdExcel`, newParams);
      // console.log(excel.data.data)

      const orderedDate = excel.data.data.map((item) => ({
        작업조: item.작업조,
        "생산량(ton)": item.생산량,
        "가동시간(Hr)": item.가동시간,
        "LNG량(㎥)": item.lng량,
        "전력량(KW)": item.전력량,
        "생산성(ton/Hr)": item.생산성,
        "LNG원단위(㎥/ton)": item.lng원단위,
        "전력원단위(KW/ton)": item.전력원단위,
      }));
      // console.log(orderedDate)

      const ExcelJS = require("exceljs");

      async function createStyledExcel(orderedDate) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");
        worksheet.columns = [
          { header: "작업조", key: "작업조", width: 15 },
          { header: "생산량(ton)", key: "생산량(ton)", width: 15 },
          { header: "가동시간(Hr)", key: "가동시간(Hr)", width: 15 },
          { header: "LNG량(㎥)", key: "LNG량(㎥)", width: 15 },
          { header: "전력량(KW)", key: "전력량(KW)", width: 15 },
          { header: "생산성(ton/Hr)", key: "생산성(ton/Hr)", width: 20 },
          { header: "LNG원단위(㎥/ton)", key: "LNG원단위(㎥/ton)", width: 20 },
          {
            header: "전력원단위(KW/ton)",
            key: "전력원단위(KW/ton)",
            width: 20,
          },
        ];
        // 데이터 추가
        orderedDate.forEach((item, index) => {
          worksheet.addRow(item);
          // 첫 번째 행 배경색 설정
          if (index === 0) {
            worksheet.getRow(1).eachCell((cell) => {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFADD8E6" }, // 하늘색
              };
              cell.alignment = { vertical: "middle", horizontal: "center" };
            });
          }
        });

        // 모든 셀에 외곽선 적용
        worksheet.eachRow((row) => {
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin", color: { argb: "FF000000" } },
              left: { style: "thin", color: { argb: "FF000000" } },
              bottom: { style: "thin", color: { argb: "FF000000" } },
              right: { style: "thin", color: { argb: "FF000000" } },
            };
          });
        });

        // 파일저장
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "StyledData.xlsx");
      }

      createStyledExcel(orderedDate);
    }
  };

  const Validation = (fromDate, toDate) => {
    // console.log(fromDate,toDate)
    const comparisonDate1 = new Date(fromDate);
    const year1 = comparisonDate1.getFullYear();
    const month1 = +comparisonDate1.getMonth() + 1;
    const day1 = +comparisonDate1.getDate();
    const comparisonDate2 = new Date(toDate);
    const year2 = comparisonDate2.getFullYear();
    const month2 = +comparisonDate2.getMonth() + 1;
    const day2 = +comparisonDate2.getDate();
    // console.log(comparisonDate1,comparisonDate2)
    // console.log("comparisonDate1: ",year1,month1,day1)
    // console.log("comparisonDate2: ",year2,month2,day2)

    if (year1 != year2) {
      alert("연도를 동일하게 설정해 주세요.");
      return 0;
    } else {
      if (month1 > month2) {
        alert("유효한 월 날짜를 설정해 주세요.");
        return 0;
      } else {
        if (month1 == month2 && day1 > day2) {
          alert("유효한 일 날짜를 설정해 주세요.");
          return 0;
        } else {
          return 1;
        }
      }
    }
  }

  const allocationGraphData = (data) => {
    const prod = [
      {name:'전체', value:data?.totalProdRate},
      {name:'1조', value:data?.fstProdRate},
      {name:'2조', value:data?.sndProdRate},
      {name:'3조', value:data?.thdProdRate},
    ]
    const vol = [
      {name:'전체', value:data?.totalVoltRate},
      {name:'1조', value:data?.fstVoltRate},
      {name:'2조', value:data?.sndVoltRate},
      {name:'3조', value:data?.thdVoltRate},
    ]
    const lng = [
      {name:'전체', value:data?.totalLngRate},
      {name:'1조', value:data?.fstLngRate},
      {name:'2조', value:data?.sndLngRate},
      {name:'3조', value:data?.thdLngRate},
    ]
    setProd(prod);
    setVol(vol);
    setLng(lng);
  }


  const RegistProductionPlan = () => {
    openModal();
  };

  const UserMngment = () => {
    openModalSub();
  };

  useEffect(() => {
    initPage();
  }, [authStore.authenticated]);

  return (
    <>
      <ProductionStatusView
        RegistProductionPlan={RegistProductionPlan}
        selectGroup={selectGroup}
        planList={planList}
        rstList={rstList}
        setSelectedGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
        newConditionInquiry={newConditionInquiry}
        date1={date1}
        setDate1={setDate1}
        date2={date2}
        setDate2={setDate2}
        exportToExcel={exportToExcel}
        UserMngment={UserMngment}
        prod={prod}
        vol={vol}
        lng={lng}
        adminFlag={authStore.adminFlag}
      />
      <ModalPortal>
        <ProdPlanReg closeModal={closeModal} />
      </ModalPortal>

      <ModalPortalSub>
        <UserMng closeModalSub={closeModalSub} />
      </ModalPortalSub>
    </>
  );
};

export default ProductionStatus;
