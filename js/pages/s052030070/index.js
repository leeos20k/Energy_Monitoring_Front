import { authStore } from "Store";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { API_GET ,API_POST} from "../../api";
import MalfunctionStatusModal from "./view/MalfunctionStatusModal";
import { MessageKor } from 'Message';


const MalfunctionStatus = ({ closeModal, intervalState, setIntervalState }) => {
  const [searchParams, setSearchParams] = useState({
    orgId: authStore.orgId,
    slaveNm: "",
  });
  const [list, setList] = useState([]);
  const [clickFlag, setClickFlag] = useState({
    slaveId: "",
    seq: "",
    startTm: "",
    endTm: "",
  });
  const [alarmLine, setAlarmLine] = useState({
    max: "",
    min: "",
  });
  const [lGraphVal, setLGraphVal] = useState([]);
  const [vGraphVal, setVGraphVal] = useState([]);
  const [checkList, setCheckList] = useState([])
  const [isSelectAll, setIsSelectAll] = useState(false);
  const Message = MessageKor;

  const checkboxes = document.getElementsByName("checkBox");
  const checkAllBox = document.getElementsByName("checkAllBox");


  const initPage = async () => {
    const { data } = await API_GET(`/s052030070/list`, {
      orgId: authStore.orgId,
      slaveNm: "",
    });
    setList(data?.data);
  };

  const onClickSearch = async () => {
    const { data } = await API_GET(`/s052030070/list`, searchParams);
    setList(data?.data);
  };
  
  const onClickDelete = async () => {
    if (!confirm(Message.S05_M_000005)) {
      return
    }
    if (checkList.length === 0) {
      alert(Message.S05_M_000001)
      return
    }
    try {
      const newList = selectedList();
      console.log("newlist",newList);
      const { data } = await API_POST(`/s052030070/deleteAlarm`, newList);
      console.log(data);

      if (data.message === 'Success') {
        alert(Message.S05_M_000002)
        onClickSearch();
        initialize();
        initPage();
      } else {
        alert(Message.S05_M_000001)
      }
    } catch (e) {
      alert(Message.S05_M_000001)
      console.log(e)
    }
  };

 
  const checkAllBoxHandler = (e) => {
    if (e.target.checked) {
      const newList = list.map((v, i) => i);
      setCheckList(newList);
    } else {
      setCheckList([]);
    }
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = e.target.checked;
    }
  };

  const checkBoxHandler = (e, v, idx) => {
    if (e.target.checked) {
      setCheckList([...checkList, idx]);
    } else {
      const newList = checkList.filter((_v, _i) => idx !== _i);
      setCheckList(newList);
    }
    let checkedCnt = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) checkedCnt++;
    }
    if (!checkedCnt) checkAllBox[0].checked = true;
    else checkAllBox[0].checked = false;
  };
  const initialize = () => {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    checkAllBox[0].checked = false;
    setCheckList([]);
  };


  const selectedList = () => {
    const newList = [];
    const newCheckList = [...checkList];
    newCheckList.sort((a, b) => a - b);
    for (const idx of newCheckList) {
      newList.push(list[idx]);
    }
    return newList;
  };


  const onClickItem = async (id, seq, startTm, endTm, tp) => {
    if (
      clickFlag.slaveId === id &&
      clickFlag.seq === seq &&
      clickFlag.startTm === startTm &&
      clickFlag.endTm === endTm
    ) {
      setClickFlag({ slaveId: "", seq: "", startTm: "", endTm: "" });
      setLGraphVal([]);
      setVGraphVal([]);
    } else {
      setClickFlag({ slaveId: id, seq: seq, startTm: startTm, endTm: endTm });
      const { data } = await API_GET(`/s052030070/graph`, {
        slaveId: id,
        seq: seq,
        fromEventTm: startTm,
        toEventTm: endTm,
      });
      setAlarmLine({
        ...alarmLine,
        max: data.data[0].alarmMaxValue,
        min: data.data[0].alarmMinValue,
      });
      if (tp === "L") {
        let lValArr = [];
        for (let i = 0; i < data.data.length; i++) {
          lValArr.push({
            x: dayjs(data.data[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: data.data[i].lValue,
          });
        }
        setLGraphVal(lValArr);
      } else {
        let rValArr = [];
        let sValArr = [];
        let tValArr = [];
        for (let i = 0; i < data.data.length; i++) {
          rValArr.push({
            x: dayjs(data.data[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: data.data[i].rValue,
          });
          sValArr.push({
            x: dayjs(data.data[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: data.data[i].sValue,
          });
          tValArr.push({
            x: dayjs(data.data[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: data.data[i].tValue,
          });
        }
        setVGraphVal([rValArr, sValArr, tValArr]);
      }
    }
  };
  const onClickClose = () => {
    closeModal();
    setIntervalState(true);
  };

  const option = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          unitStepSize: 10,
          displayFormats: {
            hour: "mm:ss",
          },
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
          speed: 100,
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.5,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: alarmLine.min,
            yMax: alarmLine.min,
            borderColor: "rgb(28, 180, 65)",
          },
          line2: {
            type: "line",
            yMin: alarmLine.max,
            yMax: alarmLine.max,
            borderColor: "rgb(28, 180, 65)",
          },
        },
      },
    },
  };
  const dataL = {
    datasets: [
      {
        label: "Level",
        data: lGraphVal,
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
      },
    ],
  };
  const dataV = {
    datasets: [
      {
        label: "R",
        data: vGraphVal[0],
        borderColor: "rgba(128,0,0,0.4)",
        backgroundColor: "brown",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "S",
        data: vGraphVal[1],
        borderColor: "rgba(0,0,0,0.4)",
        backgroundColor: "black",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "T",
        data: vGraphVal[2],
        borderColor: "rgba(128,128,128,0.7)",
        backgroundColor: "gray",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
    ],
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <MalfunctionStatusModal
      onClickClose={onClickClose}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      onClickSearch={onClickSearch}
      onClickDelete={onClickDelete}
      list={list}
      onClickItem={onClickItem}
      clickFlag={clickFlag}
      isSelectAll={isSelectAll}
      checkBoxHandler={checkBoxHandler}
      checkAllBoxHandler={checkAllBoxHandler}
      option={option}
      dataL={dataL}
      dataV={dataV}
    />
  );
};

export default MalfunctionStatus;
