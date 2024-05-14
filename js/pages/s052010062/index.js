import React, { useEffect, useRef, useState } from "react";
import { API_GET, API_POST } from "Api";
import { authStore } from "Store";
import FacilityRegModal from "./view/FacilityRegModal";
import { MessageKor } from "Message";

const FacilityReg = ({ closeModal, checkedSlave, onClickSearch,initPage }) => {
  const Message = MessageKor;
  const [inputData, setInputData] = useState({
    userId: authStore.userId,
    orgId: authStore.orgId,
    slaveNm: null,
    slaveTp: "O",
    comments: null,
    appTp: "04",
    startNum : null,
    cnt : null,
  });
  const [currentMachine, setCurrentMachine] = useState([
    {
      userId: inputData?.userId,
      useFlag: "Y",
    },
  ]);
  const [checkList, setCheckList] = useState([]);

  const [slaveTp, setSlaveTp] = useState([]);

  const useFlag = [
    { cdV: "Y", cdVNm: "Y" },
    { cdV: "N", cdVNm: "N" },
  ];

  const imageRef = useRef([]);

  const checkboxes = document.getElementsByName("checkBox");

  const checkBoxHandler = (e, idx) => {
    if (e.target.checked) {
      setCheckList([...checkList, idx]);
    } else {
      const newList = checkList.filter((v) => idx !== v);
      setCheckList(newList);
    }
  };

  const onClickAddRow= async () => {
    setCurrentMachine([...currentMachine, {
      userId: inputData?.userId,
      useFlag: "Y",
    },]);
  };

  const onClickRemoveRow= async () => {
    const newList = afterRemoveRow();
    setCurrentMachine(newList);
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setCheckList([]);
  };

  const afterRemoveRow= () => {
    const newList = [...currentMachine];
    const newCheckList = [...checkList];
    newCheckList.sort((a, b) => b - a);
    for (const idx of newCheckList) {
      newList.splice(idx, 1);
    }
    return newList;
  };

  const initCheckList = () => {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setCheckList([]);
  }

  const getList = async (slaveId = null) => {
    try {
      const { data } = await API_GET(`/s052010062/getSlaveDetail`, { slaveId });
      const tp = await API_GET(`/s052010060/tp`);
      const headInfo = data.data[0][0];
      const lineInfo = data.data[1];
      console.log("data : ",data)
      console.log("inputData : ",inputData);
      if (headInfo) setInputData({ ...inputData, ...headInfo });
      setCurrentMachine(lineInfo);
      setSlaveTp(tp.data.data)
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSave = async () => {
    const body = {
      ...inputData,
      list: currentMachine ,
    };
    console.log("currentMachine : ",currentMachine);
    const checked = await validataion(body.list);
    if (!checked) return;
    try {
      console.log("body : ",body)
      if (!checkedSlave) {
        const { data } = await API_POST(`/s052010062/insertSlave`, body);
        if (data.status === 200) {
          alert(data.message);
          onClickSearch();
          initPage();
          return closeModal();
        } else {
          alert(Message.S05_M_000001);
        }
      } else {
        const { data } = await API_POST(`/s052010062/updateSlave`, body);

        if (data.status === 200) {
          alert(data.message);
          onClickSearch();
          initPage();
          return closeModal();
        } else {
          alert(Message.S05_M_000001);
        }
      }
    } catch (err) {
      alert(Message.S05_M_000001);
      console.error(err);
    }
  };

  const validataion = async (checkList) => {

    console.log("checkList:",checkList)
    console.log("checkList.length:",checkList.length);

    if (!inputData.slaveNm) return alert(Message.S05_M_000012);
    
    let checked = 0;
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i].useFlag === "N") {
        checked++;
        continue;
      }
      // if (checkList[i].alarmMinValue !== 0 && !checkList[i].alarmMinValue) return alert(Message.S05_M_000013);
      // else if (checkList[i].alarmMaxValue !== 0 && !checkList[i].alarmMaxValue) return alert(Message.S05_M_000014);
      // else if (!checkList[i].alarmTm) return alert(Message.S05_M_000015);
      checked++;
    }

    
    if (checkList.length === checked) return true;
  };

  const uploadImg = (e, i, flag) => {
    if (flag) {
      if (!e.target.files) return;
      else {
        encodeFileToBase64(e.target.files[0]).then((data) => {
          const newInfo = [
            ...currentMachine.slice(0, i),
            {
              ...currentMachine[i],
              attachFile: data,
              attachFileNm: e.target.files[0]?.name || "",
            },
            ...currentMachine.slice(i + 1),
          ];
          setCurrentMachine(newInfo);
        });
      }
    } else {
      if (!e.target.files) {
        return;
      } else {
        encodeFileToBase64(e.target.files[0]).then((data) => {
          const newInfo = [
            ...levelMachine.slice(0, i),
            {
              ...levelMachine[i],
              attachFile: data,
              attachFileNm: e.target.files[0]?.name || "",
            },
            ...levelMachine.slice(i + 1),
          ];
          setLevelMachine(newInfo);
        });
      }
    }
  };

  const encodeFileToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  

  useEffect(() => {
    getList(checkedSlave);
  }, [checkedSlave]);

  return (
    <FacilityRegModal
      closeModal={closeModal}
      inputData={inputData}
      setInputData={setInputData}
      currentMachine={currentMachine}
      setCurrentMachine={setCurrentMachine}
      slaveTp={slaveTp}
      useFlag={useFlag}
      imageRef={imageRef}
      uploadImg={uploadImg}
      onClickSave={onClickSave}
      checkedSlave={checkedSlave || null}
      checkBoxHandler={checkBoxHandler}
      onClickAddRow={onClickAddRow}
      onClickRemoveRow={onClickRemoveRow}
      initCheckList={initCheckList}
    />
  );
};

export default FacilityReg;
