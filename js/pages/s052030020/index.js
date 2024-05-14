import React, { useEffect, useState } from "react";
import PumpLevelGraphModal from "./view/PumpLevelGraphModal";
import { API_GET } from "../../api";
import dayjs from "dayjs";

const PumpLevelGraph = ({ closeModal, slaveInfo }) => {

  const today = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const yesterday = today.split(' ')[0] + ' ' + (Number(today.split(' ')[1].split(':')[0]) > 10 ? Number(today.split(' ')[1].split(':')[0]) - 1 : Number(today.split(' ')[1].split(':')[0]) > 0 ? '0' + (Number(today.split(' ')[1].split(':')[0]) - 1) : '00') + ':' + today.split(' ')[1].split(':')[1] + ':' + today.split(' ')[1].split(':')[2]
  const optionTime = today.split(':')[0] + ':' + (Number(today.split(':')[1]) > 14 ? Number(today.split(':')[1]) - 5 : Number(today.split(':')[1]) > 4 ? '0' + (Number(today.split(':')[1]) - 5) : '00') + ':' + today.split(':')[2]

  const [searchParams, setSearchParams] = useState({
    slaveId: slaveInfo.slaveId || "",
    seq: slaveInfo.seq || "",
    fromTime: yesterday,
    toTime: today,
    optionFromTime: optionTime
  });
  const [slaveNm, setSlaveNm] = useState("");
  const [values, setValues] = useState([]);
  const [alarmInfo, setAlarmInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLevelInfo = async () => {
    try {
      setLoading(true);
      const { data } = await API_GET(`/s052020020/getLevelInfo`, searchParams);
      if (data.data[1].length === 0) return alert("데이터가 없습니다.");
      setSlaveNm(data.data[0][0]?.slaveNm || "");
      setAlarmInfo([data.data[1][0].alarmMinValue, data.data[1][0].alarmMaxValue]);
      const value = await dataToValue(data.data[1]);
      setValues(value);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const dataToValue = (value) => {
    return value.map((v) => {
      return {
        x: dayjs(v.pumpEventTm).format("YYYY-MM-DD HH:mm:ss"),
        y: v.lValue,
      };
    });
  };

  const fiveMmAgo = (date) => {
    return date.split(':')[0] + ':' + (Number(date.split(':')[1]) > 14 ? Number(date.split(':')[1]) - 5 : Number(date.split(':')[1]) > 4 ? '0' + (Number(date.split(':')[1]) - 5) : '00') + ':' + date.split(':')[2]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        min: searchParams.optionFromTime,
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
        max: 500,
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
            yMin: alarmInfo[0],
            yMax: alarmInfo[0],
            borderColor: "rgb(28, 180, 65)",
          },
          line2: {
            type: "line",
            yMin: alarmInfo[1],
            yMax: alarmInfo[1],
            borderColor: "rgb(28, 180, 65)",
          },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: slaveNm,
        data: values,
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
        pointHoverRadius: 10,
      },
    ],
  };

  useEffect(() => {
    getLevelInfo();
  }, []);

  return (
    <PumpLevelGraphModal
      closeModal={closeModal}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      slaveNm={slaveNm}
      values={values}
      alarmInfo={alarmInfo}
      options={options}
      data={data}
      loading={loading}
      getLevelInfo={getLevelInfo}
      fiveMmAgo={fiveMmAgo}
    />
  );
};

export default PumpLevelGraph;
