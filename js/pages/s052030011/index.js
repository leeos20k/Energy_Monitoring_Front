import { API_GET, API_POST } from "Api";
import { useModal, useInterval } from "Hooks";
import { MessageKor } from "Message";
import { authStore } from "Store";
import { observer, useObserver } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import MainView from "./view/MainView";
import dayjs from "dayjs";
import { palette2 } from "Style";

const Main_EM = observer(() => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const [energyPlList, setEnergyPlList] = useState([]);
  const [energyRsList, setEnergyRsList] = useState([]);
  const [energyRsnvList, setEnergyRsnvList] = useState([]);
  const [inputData, setInputData] = useState({});
  const [chartData, setChartData] = useState([]); //차트에 출력할 x, y 데이터를 가공한 status
  const [energyData, setEnergyData] = useState([]); //가공하지 않은 prod, vo, lng 데이터를 배열로 담은 status
  const [energyPlanLine, setEnergyPlanLine] = useState([]);
  const [workGroup, setWorkGroup] = useState({});

  const [prodAlarm, setProdAlarm] = useState(false);
  const [lngAlarm, setLngAlarm] = useState(false);
  const [pwAlarm, setPwAlarm] = useState(false);

  const [intervalState, setIntervalState] = useState(true);

  const ws = useRef(null);
  const initPage = async () => {
    try {
      const params = {
        orgId: authStore.orgId,
      };
      // const energyList = await API_GET(`/s052030011/energyList`, params);

      const energyListPL = await API_GET(`/s052030011/energyListPL`, params);
      const energyListRS = await API_GET(`/s052030011/energyListRS`, params);
      const energyListRSNV = await API_GET(`/s052030011/energyListRSNV`, params);


      const energyPlanList = await API_GET(
        `/s052030011/energyPlanList`,
        params
      );
      const energyProdList = await API_GET(
        `/s052030011/energyProdList`,
        params
      );

      const energyLngList = await API_GET(`/s052030011/energyLngList`, params);
      const energyPwList = await API_GET(`/s052030011/energyPwList`, params);
      const workGroup = await API_GET(`/s052030011/workingGroup`);

      setWorkGroup(workGroup.data.data);

      console.group("energyList");
      console.log("energyListPL : ", energyListPL.data.data);
      console.log("energyListRS : ", energyListRS.data.data);
      console.log("energyListRSNV : ", energyListRSNV.data.data);

  
      console.log("energyPlanList : ", energyPlanList.data.data[0]);
      console.log("energyProdList : ", energyProdList.data.data);
      console.log("energyLngList : ", energyLngList.data.data);
      console.log("energyPwList : ", energyPwList.data.data);
      console.log("workingGroup : ",workGroup.data.data);
      console.groupEnd();

      setEnergyPlList(energyListPL.data.data[0]);
      setEnergyRsList(energyListRS.data.data[0]);
      setInputData(energyListRS.data.data[0]);
      setEnergyRsnvList(energyListRSNV.data.data[0]);

      const prodValue = energyProdList.data.data;
      const lngValue = energyLngList.data.data;
      const pwValue = energyPwList.data.data;

      setEnergyData([prodValue, lngValue, pwValue]);

      const prodChartValue = dataToValue(energyProdList.data.data, "prodWgt");
      const lngChartValue = dataToValue(energyLngList.data.data, "lngRate");
      const pwChartValue = dataToValue(energyPwList.data.data, "vRate");

      setChartData([prodChartValue, lngChartValue, pwChartValue]);


      const prodOptions = createChartOptions(
        "prodRate",
        energyPlanList.data.data[0],
        workGroup.data.data
      );
      const lngOptions = createChartOptions(
        "lngRate",
        energyPlanList.data.data[0],
        workGroup.data.data
      );
      const pwOptions = createChartOptions(
        "voRate",
        energyPlanList.data.data[0],
        workGroup.data.data
      );
      setEnergyPlanLine([prodOptions, lngOptions, pwOptions]);
      
      // alarmCheck();
    } catch (e) {
      console.log(e);
    }
  };
  //실적 인풋 저장
  const onClickSave = async () => {
    try {

      const updateParams = [
        { slaveId: 1, seq: 1, waterValue: parseFloat(inputData.gypAWaterRate) },
        { slaveId: 1, seq: 2, waterValue: parseFloat(inputData.gypBWaterRate) },
        { slaveId: 1, seq: 3, waterValue: parseFloat(inputData.gypCWaterRate) },
        { slaveId: 1, seq: 4, waterValue: parseFloat(inputData.slagWaterRate) },
        { slaveId: 1, seq: 5, waterValue: parseFloat(inputData.fWaterRate) },
      ];
      const updateWaterAmount = await API_POST(
        `/s052030011/updateWaterAmount`,
        updateParams
      );
      console.log("수분율 로그 : ",updateWaterAmount)
      alert("수분율이 저장되었습니다.");
      initPage();
    } catch (e) {
      alert("수분율 저장을 실패했습니다.");
      console.log(e);
      initPage();
    }
  };

  //차트 데이터로 가공
  const dataToValue = (value, yField) => {
    return value.map((v) => {
      return {
        x: dayjs(v.eventAggreTenMi).format("YYYY-MM-DD HH:mm:ss"),
        y: v[yField],
      };
    });
  };

  //생산성 차트 값
  const prodData = {
    configuration: [
      {
        display: false,
      },
    ],
    datasets: [
      {
        data: chartData[0],
        borderColor: `${palette2.PrimaryColor}`,
        backgroundColor: `${palette2.TertiaryColor}`,
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 2,
      },
    ],
  };

  //연료원 단위 차트 값
  const lngData = {
    configuration: [
      {
        display: false,
      },
    ],
    datasets: [
      {
        data: chartData[1],
        borderColor: `${palette2.PrimaryColor}`,
        backgroundColor: `${palette2.TertiaryColor}`,
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 2,
      },
    ],
  };

  //전력원 단위 차트 값
  const pwData = {
    configuration: [
      {
        display: false,
      },
    ],
    datasets: [
      {
        data: chartData[2],
        borderColor: `${palette2.PrimaryColor}`,
        backgroundColor: `${palette2.TertiaryColor}`,
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 2,
      },
    ],
  };

  //알람 상태 확인 함수
  const alarmCheck = () => {
    console.log("차트데이터", chartData);
    // 차트 데이터와 기준값 비교를 위해 차트별 마지막 데이터 포인트의 y값 추출
    const lastProdData = chartData[0]?.[chartData[0].length - 1]?.y ?? 0;
    const lastLngData = chartData[1]?.[chartData[1].length - 1]?.y ?? 0;
    const lastPwData = chartData[2]?.[chartData[2].length - 1]?.y ?? 0;

    // console.log("lastProdData : ",lastProdData);
    // console.log("lastLngData : ",lastLngData);
    // console.log("lastPwData : ",lastPwData);
    // console.log("energyPlList.prodRate : ",energyPlList.prodRate);
    // console.log("energyPlList.lngRate : ",energyPlList.lngRate);
    // console.log("energyPlList.voRate : ",energyPlList.voRate);
    
    if((lastProdData < energyPlList?.prodRate) && (lastProdData != 0)){
      setProdAlarm(true);
    }
    if (lastLngData > energyPlList?.lngRate) {
      setLngAlarm(true);
    }
    if (lastPwData > energyPlList?.voRate) {
      setPwAlarm(true);
    }
    console.group("alarm 상태");
    console.log(
      "energypllist의 각 데이터",
      energyPlList?.prodRate,
      energyPlList?.lngRate,
      energyPlList?.voRate
    );
    console.log("prodAlarm", prodAlarm);
    console.log("lngAlarm", lngAlarm);
    console.log("PwAlarm", pwAlarm);
    console.groupEnd();


    if ((energyData[0]?.[energyData[0].length - 1]?.alarmConfirm === "Y") || (energyPlList?.prodRate/2 > lastProdData)) {
      setProdAlarm(false);
    }
    if ((energyData[1]?.[energyData[1].length - 1]?.alarmConfirm === "Y") || (energyPlList?.prodRate/2 > lastProdData)) {
      setLngAlarm(false);
    }
    if ((energyData[2]?.[energyData[2].length - 1]?.alarmConfirm === "Y") || (energyPlList?.prodRate/2 > lastProdData)) {
      setPwAlarm(false);
    }
  };

  const handleAlarmDismiss = async (alarmType) => {
    try {

      console.log("energyData",energyData);

      let paramDataTime = "";
      let paramSlaveId = 0;

      switch (alarmType) {
        case "prodAlarm":
          paramDataTime = dayjs(
            energyData[0]?.[energyData[0].length - 1]?.eventAggreTenMi
          ).format("YYYY-MM-DD HH:mm:ss");
          paramSlaveId = energyData[0]?.[energyData[0].length - 1]?.slaveId;

          break;
        case "lngAlarm":
          paramDataTime = dayjs(
            energyData[1]?.[energyData[1].length - 1]?.eventAggreTenMi
          ).format("YYYY-MM-DD HH:mm:ss");
          paramSlaveId = energyData[1]?.[energyData[1].length - 1]?.slaveId;

          break;
        case "pwAlarm":
          paramDataTime = dayjs(
            energyData[2]?.[energyData[2].length - 1]?.eventAggreTenMi
          ).format("YYYY-MM-DD HH:mm:ss");
          paramSlaveId = energyData[2]?.[energyData[2].length - 1]?.slaveId;

          break;
      }
      const alarmParam = {
        eventAggreTenMi: paramDataTime,
        slaveId: paramSlaveId,
        orgId: authStore.orgId,
        userId: authStore.userId,
      };
      console.log("alarmParams", alarmParam);

      const updateAlarmConfirm = await API_POST(
        `/s052030011/updateAlarmConfirm`,
        alarmParam
      );

      alert("알람이 해제되었습니다.");

      initPage();

    } catch (e) {
      alert("알람 해제에 실패했습니다.");
    }
  };

  //차트 옵션
  const createChartOptions = (chartName, energyPlanLine, workGroup) => {
    
    let shiftStartTime = new Date(
      `${workGroup.workDay}T${workGroup.shiftStartTime}`
    );
    let shiftEndTime = new Date(
      `${workGroup.workDay}T${workGroup.shiftEndTime}`
    );
    
    function formatDate(date) {
      // 연도, 월, 일, 시간, 분, 초를 가져옵니다.
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해줍니다.
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
  
      // 포맷을 합쳐서 반환합니다.
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    shiftEndTime.setSeconds(shiftEndTime.getSeconds() + 1);
    return {
      scales: {
        x: {
          min: formatDate(shiftStartTime),
          max: formatDate(shiftEndTime),
          type: "time",

          time: {
            unit: "hour",
            tooltipFormat: "HH:mm",
            displayFormats: {
              millisecond: "HH:mm:ss.SSS",
              second: "HH:mm:ss",
              minute: "HH:mm",
              hour: "HH:mm",
            },
          },
        },
        y: {
          // min: ,
          // max: ,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // 레전드 숨기기
        },
        annotation: {
          annotations: {
            line1: {
              type: "line",
              // yMin: energyPlanLine[chartName], // 차트의 이름에 따라서 energyPlanLine 객체에서 적절한 필드를 선택
              // yMax: energyPlanLine[chartName],
              yMin : energyPlanLine === undefined ? 0 : energyPlanLine[chartName],
              yMax : energyPlanLine === undefined ? 0 : energyPlanLine[chartName],
              borderColor: "red",
            },
          },
        },
      },
    };
    
  };

  useEffect(() => {
    initPage();
  }, [authStore.authenticated]);


  useEffect(() => {
    alarmCheck(); // 페이지 초기화 시에 한 번 호출하여 초기 상태를 설정.
  }, [chartData]); // chartData가 업데이트될 때마다 alarmCheck 함수를 호출.
  

  ws.current = new WebSocket("ws://150.22.10.124:8081/ws");
  ws.current.onopen = () => {
    console.log("Main WebSocket Connected");
  };
  ws.current.onclose = () => {
    console.log("Main WebSocket Disconnected");
  };


  const intervalCheck = () => {

    if(intervalState == true){
      setIntervalState(false);
    }else if(intervalState == false){
      setIntervalState(true);
    }
  }



  return useObserver(() => (
    <>
      <MainView
        initPage={initPage}
        energyPlList={energyPlList}
        energyRsList={energyRsList}
        energyRsnvList={energyRsnvList}
        onClickSave={onClickSave}
        inputData={inputData}
        setInputData={setInputData}
        prodData={prodData}
        lngData={lngData}
        pwData={pwData}
        energyPlanLine={energyPlanLine}
        workGroup={workGroup}
        handleAlarmDismiss={handleAlarmDismiss}
        prodAlarm={prodAlarm}
        lngAlarm={lngAlarm}
        pwAlarm={pwAlarm}

        intervalState={intervalState}
        intervalCheck={intervalCheck}
        

      />
    </>
  ));
});

export default Main_EM;
