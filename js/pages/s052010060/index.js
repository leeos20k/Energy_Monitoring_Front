import React, { useEffect, useRef, useState } from "react";
import { API_GET, API_POST } from "Api";
import { authStore } from "Store";
import SlaveRegModal from "./view/SlaveRegModal";
import { MessageKor } from "Message";

const SlaveReg = ({ closeModal, checkedSlave, onClickSearch,initPage }) => {
  const Message = MessageKor;
  const [inputData, setInputData] = useState({
    userId: authStore.userId,
    orgId: authStore.orgId,
    slaveNm: null,
    slaveTp: "T",
    comments: null,
    appTp: "02",
  });
  const [currentMachine, setCurrentMachine] = useState([
    {
      userId: inputData?.userId,
      useFlag: "Y",
    },
  ]);
  const [levelMachine, setLevelMachine] = useState([
    {
      userId: inputData.userId,
      useFlag: "Y",
    },
  ]);
  const [checkListC, setCheckListC] = useState([]);
  const [checkListL, setCheckListL] = useState([]);

  const [slaveTp, setSlaveTp] = useState([]);

  const useFlag = [
    { cdV: "Y", cdVNm: "Y" },
    { cdV: "N", cdVNm: "N" },
  ];

  const imageRef = useRef([]);

  const checkboxes = document.getElementsByName("checkBox");

  const checkBoxHandlerL = (e, idx) => {
    console.log("levelStep1" + idx)
    if (e.target.checked) {
      setCheckListL([...checkListL, idx]);
    } else {
      const newList = checkListL.filter((v) => idx !== v);
      setCheckListL(newList);
    }
  };

  const checkBoxHandlerC = (e, idx) => {
    console.log("VoltStep1" + idx)
    if (e.target.checked) {
      setCheckListC([...checkListC, idx]);
    } else {
      const newList = checkListC.filter((v) => idx !== v);
      setCheckListC(newList);
    }
  };

  const onClickAddRowL = async () => {
    console.log("levelStep2")
    setLevelMachine([...levelMachine, {
      userId: inputData?.userId,
      useFlag: "Y",
    },]);
  };

  const onClickAddRowC = async () => {
    console.log("voltStep2")
    setCurrentMachine([...currentMachine, {
      userId: inputData?.userId,
      useFlag: "Y",
    },]);
  };

  const onClickRemoveRowL = async () => {
    console.log("levelStep3")
    const newList = afterRemoveRowL();
    setLevelMachine(newList);
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setCheckListL([]);
  };

  const onClickRemoveRowC = async () => {
    console.log("voltStep3")
    const newList = afterRemoveRowC();
    setCurrentMachine(newList);
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setCheckListC([]);
  };

  const afterRemoveRowL = () => {
    console.log("levelStep4")
    const newList = [...levelMachine];
    const newCheckList = [...checkListL];
    newCheckList.sort((a, b) => b - a);
    for (const idx of newCheckList) {
      newList.splice(idx, 1);
    }
    return newList;
  };

  const afterRemoveRowC = () => {
    console.log("voltStep4")
    const newList = [...currentMachine];
    const newCheckList = [...checkListC];
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
    setCheckListL([]);
    setCheckListC([]);
  }

  const getList = async (slaveId = null) => {
    try {
      const { data } = await API_GET(`/s052010060/getSlaveDetail`, { slaveId });
      const tp = await API_GET(`/s052010060/tp`);
      const headInfo = data.data[0][0];
      const lineInfo = data.data[1];
      // console.log("data : ",data)
      // console.log("inputData : ",inputData);
      if (headInfo) setInputData({ ...inputData, ...headInfo });
      if (lineInfo && headInfo?.slaveTp === "V") setCurrentMachine(lineInfo);
      else if (lineInfo && headInfo?.slaveTp !== "V") setLevelMachine(lineInfo);
      setSlaveTp(tp.data.data)
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSave = async () => {
    const body = {
      ...inputData,
      list: inputData.slaveTp === "V" ? currentMachine : levelMachine,
    };
    console.log("a",body);
    const checked = await validataion(body.list);
    if (!checked) return;
    try {
      if (!checkedSlave) {
        const { data } = await API_POST(`/s052010060/insertSlave`, body);
        if (data.status === 200) {
          alert(data.message);
          onClickSearch();
          initPage();
          return closeModal();
        } else {
          alert(Message.S05_M_000001);
        }
      } else {
        const { data } = await API_POST(`/s052010060/updateSlave`, body);

        if (data.status === 200) {
          alert(data.message);
          onClickSearch();
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
    if (!inputData.slaveNm) return alert(Message.S05_M_000012);
    let checked = 0;
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i].useFlag === "N") {
        checked++;
        continue;
      }
      if (checkList[i].alarmMinValue !== 0 && !checkList[i].alarmMinValue) return alert(Message.S05_M_000013);
      else if (checkList[i].alarmMaxValue !== 0 && !checkList[i].alarmMaxValue) return alert(Message.S05_M_000014);
      else if (!checkList[i].alarmTm) return alert(Message.S05_M_000015);
      else checked++;
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
    <SlaveRegModal
      closeModal={closeModal}
      inputData={inputData}
      setInputData={setInputData}
      currentMachine={currentMachine}
      setCurrentMachine={setCurrentMachine}
      levelMachine={levelMachine}
      setLevelMachine={setLevelMachine}
      slaveTp={slaveTp}
      useFlag={useFlag}
      imageRef={imageRef}
      uploadImg={uploadImg}
      onClickSave={onClickSave}
      checkedSlave={checkedSlave || null}
      checkBoxHandlerL={checkBoxHandlerL}
      checkBoxHandlerC={checkBoxHandlerC}
      onClickAddRowL={onClickAddRowL}
      onClickAddRowC={onClickAddRowC}
      onClickRemoveRowL={onClickRemoveRowL}
      onClickRemoveRowC={onClickRemoveRowC}
      initCheckList={initCheckList}
    />
  );
};

export default SlaveReg;
