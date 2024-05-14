import React, { useEffect, useState, useRef } from "react";
import RectifierGraphModal from "./view/RectifierGraphModal";
import { API_GET } from "../../api";
import dayjs from "dayjs";

let refreshInterval;

const RectifierGraph = ({ closeModal, slaveInfo, setIntervalState }) => {
  const [realtimeStateFrom, setRealtimeStateFrom] = useState("");
  const [realtimeStateTo, setRealtimeStateTo] = useState("");
  const [slaveNm, setSlaveNm] = useState("");
  const [values, setValues] = useState([]);
  const [alarmInfo, setAlarmInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRealtimeChecked, setIsRealtimeChecked] = useState(false);
  const [modalParams, setModalParams] = useState({
    slaveDetailNm: slaveInfo.slaveDetailNm || "",
    slaveTp: slaveInfo.slaveTp || "",
    slaveTpNm: slaveInfo.slaveTpNm || "",
    rValue: slaveInfo.rValue,
    sValue: slaveInfo.sValue,
    tValue: slaveInfo.tValue,
    lValue: slaveInfo.lValue,
    pumpEventTm: slaveInfo.pumpEventTm || "",
    pumpEventTmAgo: slaveInfo.pumpEventTmAgo || "",
  });
  const [searchParams, setSearchParams] = useState({
    slaveId: slaveInfo.slaveId || "",
    seq: slaveInfo.seq || "",
    slaveTp: slaveInfo.slaveTp || "",
    fromTime: slaveInfo.pumpEventTmAgo || "",
    toTime: slaveInfo.pumpEventTm || "",
  });
  const realtimeFrom = useRef("");
  const realtimeTo = useRef("");

  const realTimeParams = useRef({
    slaveId: slaveInfo.slaveId || "",
    seq: slaveInfo.seq || "",
    fromTime: "",
    toTime: "",
  });
  const [axisYmin, setAxisYmin] = useState({
    minValue: "",
  });
  const [axisYmax, setAxisYmax] = useState({
    maxValue: "",
  });
  const handleSwitchChange = async (event) => {
    setIsRealtimeChecked(event.target.checked);
    if (event.target.checked) {
      refreshInterval = window.setInterval(async () => {
        const realtime = dayjs();
        // 10분 후의 시간을 계산
        const calculatedRealtimeTo = realtime
          .add(10, "minute")
          .format("YYYY-MM-DD HH:mm:ss");
        // 1시간 전의 시간을 계산
        const calculatedRealtimeFrom = dayjs(calculatedRealtimeTo)
          .subtract(1, "hour")
          .format("YYYY-MM-DD HH:mm:ss");

        // 계산된 값을 상태 변수에 설정
        setRealtimeStateFrom(calculatedRealtimeFrom);
        setRealtimeStateTo(calculatedRealtimeTo);

        realtimeFrom.current = calculatedRealtimeFrom;
        realtimeTo.current = calculatedRealtimeTo;

        realTimeParams.current = {
          ...searchParams,
          fromTime: calculatedRealtimeFrom,
          toTime: calculatedRealtimeTo,
        };

        try {
          const response = await API_GET(
            `/s052020020/getLevelInfo`,
            realTimeParams.current
          );
          const { data } = response.data;
          setSlaveNm(data[0][0]?.slaveNm || "");
          setAlarmInfo([data[1][0].alarmMinValue, data[1][0].alarmMaxValue]);
          const valueR = dataToValue("R", data[1]);
          const valueS = dataToValue("S", data[1]);
          const valueT = dataToValue("T", data[1]);
          const valueL = dataToValue("L", data[1]);

          setValues([valueR, valueS, valueT, valueL]);
          const ydata = await API_GET(
            `/s052030010/slaveMnMx`,
            realTimeParams.current
          );
          const axisYmin = ydata.data.data.minValue;
          const axisYmax = ydata.data.data.maxValue;
          setAxisYmin(axisYmin);
          setAxisYmax(axisYmax);

          console.log("interval is running...");
        } catch (error) {
          console.error("API 호출 중 오류 발생:", error);
        }
      }, 1000);
    } else {
      clearInterval(refreshInterval);
      console.log("stopped.");
    }
  };
  const getLevelInfo = async () => {
    try {
      setLoading(true);
      setIntervalState(false);

      const { data } = await API_GET(`/s052020020/getLevelInfo`, searchParams);
      console.log("data", data.data);

      const ydata = await API_GET(`/s052030010/slaveMnMx`, searchParams);
      const axisYmin = ydata.data.data.minValue;
      const axisYmax = ydata.data.data.maxValue;
      setAxisYmin(axisYmin);
      setAxisYmax(axisYmax);

      setSlaveNm(data.data[0][0]?.slaveNm || "");
      setAlarmInfo([
        data.data[1][0].alarmMinValue,
        data.data[1][0].alarmMaxValue,
      ]);
      const valueR = await dataToValue("R", data.data[1]);
      const valueS = await dataToValue("S", data.data[1]);
      const valueT = await dataToValue("T", data.data[1]);
      const valueL = await dataToValue("L", data.data[1]);
      setValues([valueR, valueS, valueT, valueL]);

      
        
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  const dataToValue = (line, value) => {
    switch (line) {
      case "R":
        return value.map((v) => {
          return {
            x: dayjs(v.pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: v.rValue,
          };
        });
      case "S":
        return value.map((v) => {
          return {
            x: dayjs(v.pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: v.sValue,
          };
        });
      case "T":
        return value.map((v) => {
          return {
            x: dayjs(v.pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: v.tValue,
          };
        });
      case "L":
        return value.map((v) => {
          return {
            x: dayjs(v.pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
            y: Math.min(100, Math.max(0, (v.lValue - 4) * 6.25)),
          };
        });
    }
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        min: searchParams.fromTime,
        max: searchParams.toTime,
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
        max: 100,
        ticks: {
          callback: function (value, index, values) {
            // slaveTp가 V일 때는 단위를 붙이지 않음
            if (modalParams.slaveTp === "V") {
              return value;
            }
            // 그 외의 경우에는 단위에 %를 붙임
            return value + "%";
          },
        },
      },
    },
    responsive: true,
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
            yMin: (modalParams.slaveTp === 'V') ? alarmInfo[0] : ((alarmInfo[0] - 4) * 6.25),
            yMax: (modalParams.slaveTp === 'V') ? alarmInfo[0] : ((alarmInfo[0] - 4) * 6.25),
            borderColor: "rgb(28, 180, 65)",
          },
          line2: {
            type: "line",
            yMin: (modalParams.slaveTp === 'V') ? alarmInfo[1] : ((alarmInfo[1] - 4) * 6.25),
            yMax: (modalParams.slaveTp === 'V') ? alarmInfo[1] : ((alarmInfo[1] - 4) * 6.25),
            borderColor: "rgb(28, 180, 65)",
          },
        },
      },
    },
  };
  const realtimeOption = {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        min: realtimeStateFrom,
        max: realtimeStateTo,
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
        max: 100,
        ticks: {
          callback: function (value, index, values) {
            // slaveTp가 V일 때는 단위를 붙이지 않음
            if (modalParams.slaveTp === "V") {
              return value;
            }
            // 그 외의 경우에는 단위에 %를 붙임
            return value + "%";
          },
        },
      },
    },
    responsive: true,
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
            yMin: (modalParams.slaveTp === 'V') ? alarmInfo[0] : ((alarmInfo[0] - 4) * 6.25),
            yMax: (modalParams.slaveTp === 'V') ? alarmInfo[0] : ((alarmInfo[0] - 4) * 6.25),
            borderColor: "rgb(28, 180, 65)",
          },
          line2: {
            type: "line",
            yMin: (modalParams.slaveTp === 'V') ? alarmInfo[1] : ((alarmInfo[1] - 4) * 6.25),
            yMax: (modalParams.slaveTp === 'V') ? alarmInfo[1] : ((alarmInfo[1] - 4) * 6.25),
            borderColor: "rgb(28, 180, 65)",
          },
        },
      },
    },
  };
  const data = {
    datasets: [
      {
        label: "R",
        data: values[0],
        borderColor: "#F25041",
        backgroundColor: "rgba(242, 80, 65, 0.5)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 1.5,
      },
      {
        label: "S",
        data: values[1],
        borderColor: "#2621BF",
        backgroundColor: "rgba(38, 33, 191, 0.5)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 1.5,
      },
      {
        label: "T",
        data: values[2],
        borderColor: "#F2E30F",
        backgroundColor: "rgba(242, 227, 15, 0.5)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 1.5,
      },
    ],
  };
  const dataL = {
    datasets: [
      {
        label: "L",
        data: values[3],
        borderColor: "#8552F2",
        backgroundColor: "rgba(133, 82, 242, 0.5)",
        tension: 0.1,
        pointHoverRadius: 10,
        borderWidth: 3,
      },
    ],
  };
  const onClickClose = () => {
    clearInterval(refreshInterval); // interval 중지
    closeModal();
    setIntervalState(true);
  };
  useEffect(() => {
    getLevelInfo();
  }, []);

  return (
    <RectifierGraphModal
      onClickClose={onClickClose}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      options={options}
      realtimeOption={realtimeOption}
      data={data}
      dataL={dataL}
      getLevelInfo={getLevelInfo}
      isRealtimeChecked={isRealtimeChecked}
      handleSwitchChange={handleSwitchChange}
      modalParams={modalParams}
    />
  );
};

export default RectifierGraph;
