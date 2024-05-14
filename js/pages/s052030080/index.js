import { authStore } from "Store";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";
import { API_GET } from "../../api";
import WaveformModal from "./view/WaveformModal";

const Waveform = observer(({ closeModal, intervalState, setIntervalState }) => {
  const today = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const yesterday =
    today.split(" ")[0] +
    " " +
    (Number(today.split(" ")[1].split(":")[0]) > 10
      ? Number(today.split(" ")[1].split(":")[0]) - 1
      : Number(today.split(" ")[1].split(":")[0]) > 0
      ? "0" + (Number(today.split(" ")[1].split(":")[0]) - 1)
      : "00") +
    ":" +
    today.split(" ")[1].split(":")[1] +
    ":" +
    today.split(" ")[1].split(":")[2];
  const optionTime =
    today.split(":")[0] +
    ":" +
    (Number(today.split(":")[1]) > 14
      ? Number(today.split(":")[1]) - 5
      : Number(today.split(":")[1]) > 4
      ? "0" + (Number(today.split(":")[1]) - 5)
      : "00") +
    ":" +
    today.split(":")[2];

  const [searchParams, setSearchParams] = useState({
    fromTm: yesterday,
    toTm: today,
    optionFromTime: optionTime,
    firstSlaveId: "",
    firstSeq: "",
    firstTp: "",
    secondSlaveId: "",
    secondSeq: "",
    secondTp: "",
    orgId: authStore.orgId,
  });
  const [slaveList, setSlaveList] = useState([]);
  const [firstSlave, setFirstSlave] = useState([]);
  const [secondSlave, setsecondSlave] = useState([]);

  const initPage = async () => {
    const { data } = await API_GET(`/s052030080/slave`, searchParams);
    
    let slaveArr = [{ cdV: "", cdVNm: "Slave선택" }];
    for (let i = 0; i < data.data.length; i++) {
      slaveArr.push({
        cdV: `${data.data[i].slaveId}/${data.data[i].seq}/${data.data[i].slaveTp}`,
        cdVNm: data.data[i].slaveNm,
      });
    }
    setSlaveList(slaveArr);
  };

  const onClickSearch = async () => {
    if (searchParams.firstSlaveId === "" || searchParams.secondSlaveId === "") {
      alert("Slave를 모두 선택 후 검색해 주세요.");
      return;
    } else if (
      searchParams.firstSlaveId === searchParams.secondSlaveId &&
      searchParams.firstSeq === searchParams.secondSeq
    ) {
      alert("같은 Slave는 비교할 수 없습니다.");
      return;
    }
    const { data } = await API_GET(`/s052030080/slave-ripple`, searchParams);
    const firstList = data.data.firstSlave;
    const secondList = data.data.secondSlave;
    if (firstList.length === 0 && secondList.length === 0) {
      alert("데이터가 없습니다.");
      return;
    }
    let lArr1st = [];
    let rArr1st = [];
    let sArr1st = [];
    let tArr1st = [];
    let lArr2nd = [];
    let rArr2nd = [];
    let sArr2nd = [];
    let tArr2nd = [];
    for (let i = 0; i < firstList.length; i++) {
      if (searchParams.firstTp === "V") {
        rArr1st.push({
          x: dayjs(firstList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: firstList[i].rValue,
        });
        sArr1st.push({
          x: dayjs(firstList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: firstList[i].sValue,
        });
        tArr1st.push({
          x: dayjs(firstList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: firstList[i].tValue,
        });
      } else {
        lArr1st.push({
          x: dayjs(firstList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: firstList[i].lValue,
        });
      }
    }
    for (let i = 0; i < secondList.length; i++) {
      if (searchParams.secondTp === "V") {
        rArr2nd.push({
          x: dayjs(secondList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: secondList[i].rValue,
        });
        sArr2nd.push({
          x: dayjs(secondList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: secondList[i].sValue,
        });
        tArr2nd.push({
          x: dayjs(secondList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: secondList[i].tValue,
        });
      } else {
        lArr2nd.push({
          x: dayjs(secondList[i].pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
          y: secondList[i].lValue,
        });
      }
    }
    setFirstSlave([lArr1st, rArr1st, sArr1st, tArr1st]);
    setsecondSlave([lArr2nd, rArr2nd, sArr2nd, tArr2nd]);
  };

  const fiveMmAgo = (date) => {
    return (
      date.split(":")[0] +
      ":" +
      (Number(date.split(":")[1]) > 14
        ? Number(date.split(":")[1]) - 5
        : Number(date.split(":")[1]) > 4
        ? "0" + (Number(date.split(":")[1]) - 5)
        : "00") +
      ":" +
      date.split(":")[2]
    );
  };

  const option = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        min: searchParams.optionFromTime,
        max: searchParams.toTm,
        type: "time",
        time: {
          unit: "minute",
          unitStepSize: 1,
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
      y: {
        min: 0,
        max: 200,
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
    },
  };
  const data1 = {
    datasets: [
      {
        label: "1번 Level",
        data: firstSlave[0],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
      },
      {
        label: "2번 Level",
        data: secondSlave[0],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
      },
    ],
  };
  const data2 = {
    datasets: [
      {
        label: "1번 Level",
        data: firstSlave[0],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
      },
      {
        label: "2번 R",
        data: secondSlave[1],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "2번 S",
        data: secondSlave[2],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "2번 T",
        data: secondSlave[3],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
    ],
  };
  const data3 = {
    datasets: [
      {
        label: "1번 R",
        data: firstSlave[1],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "1번 S",
        data: firstSlave[2],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "1번 T",
        data: firstSlave[3],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "2번 Level",
        data: secondSlave[0],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
      },
    ],
  };
  const data4 = {
    datasets: [
      {
        label: "1번 R",
        data: firstSlave[1],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "1번 S",
        data: firstSlave[2],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "1번 T",
        data: firstSlave[3],
        borderColor: "rgba(229, 62, 62, 0.2)",
        backgroundColor: "rgba(229, 62, 62, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "2번 R",
        data: secondSlave[1],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "2번 S",
        data: secondSlave[2],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
      {
        label: "2번 T",
        data: secondSlave[3],
        borderColor: "rgba(111, 98, 226, 0.2)",
        backgroundColor: "rgba(111, 98, 226, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
    ],
  };

  const onClickClose = () => {
    closeModal();
    setIntervalState(true);
  };

  useEffect(() => {
    initPage();
  }, []);

  return useObserver(() => (
    <WaveformModal
      onClickClose={onClickClose}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      slaveList={slaveList}
      onClickSearch={onClickSearch}
      fiveMmAgo={fiveMmAgo}
      option={option}
      data={
        searchParams.firstTp === "L" && searchParams.secondTp === "L"
          ? data1
          : searchParams.firstTp === "L" && searchParams.secondTp === "V"
          ? data2
          : searchParams.firstTp === "V" && searchParams.secondTp === "L"
          ? data3
          : data4
      }
    />
  ));
});

export default Waveform;
