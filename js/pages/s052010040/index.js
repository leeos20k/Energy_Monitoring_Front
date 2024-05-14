import React, { useEffect, useState } from "react";
import { API_GET, API_POST } from "Api";
import { authStore } from "Store";
import MasterRegModal from "./view/MasterRegModal";
import { MessageKor } from "Message";
const MasterReg = ({ closeModal, getList, checkedMaster, slaveTpFlag }) => {
  const Message = MessageKor;
  const [inputData, setInputData] = useState({
    userId: authStore.userId,
    orgId: authStore.orgId,
    appTp: "02",
    masterNm: null,
    masterIp: null,
    masterPortNo: null,
    comments: null,
  });
  const [slaveList, setSlaveList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);


  const getMasterInfo = async () => {
    const params = {
      ...inputData,
      masterId: checkedMaster || "",
      slaveTp : '',
    };
    try {
      const { data } = await API_GET(`/s052010040/getMasterDetail`, params);
      setInputData({ ...inputData, ...data.data[0][0]});
      setSlaveList(data.data[1]);
      const selectedArr = data.data[1].filter((v) => v.choiceFlag === 2);
      setSelectedList(selectedArr);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSlave = (v) => {
    if (v.choiceFlag === 3) return alert(Message.S05_M_000011);
    if (selectedList.includes(v)) {
      const newArr = selectedList.filter((_v) => v.slaveId !== _v.slaveId);
      setSelectedList(newArr);
    } else setSelectedList([...selectedList, v]);
  };

  const onClickRemove = (slaveId) => {
    const newArr = selectedList.filter((v) => v.slaveId !== slaveId);
    setSelectedList(newArr);
  };

  const onClickSave = async () => {
    const checked = await validataion();
    if (!checked) return;

    const body = {
      ...inputData,
      list: selectedList,
    };

    try {
      if (!checkedMaster) {
        const { data } = await API_POST(`/s052010040/insertMaster`, body);
        if (data?.status === 200) {
          alert(data.message);
          closeModal();
          getList();
        } else alert(Message.S05_M_000001);
      } else {
        const { data } = await API_POST(`/s052010040/updateMaster`, body);

        if (data?.status === 200) {
          alert(data.message);
          console.log(data.data);
          closeModal();
          getList();
        } else alert(Message.S05_M_000001);
      }
    } catch (err) {
      alert(Message.S05_M_000001);
      console.error(err);
    }
  };

  const validataion = async () => {
    if (!inputData.masterNm) return alert(Message.S05_M_000016);
    else if (!validateIp(inputData.masterIp))
      return alert(Message.S05_M_000017);
    else if (!inputData.masterPortNo) return alert(Message.S05_M_000018);
    // else if (selectedList.length < 1) return alert(Message.S05_M_000019);
    else return true;
  };

  const validateIp = (ip) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipRegex.test(ip)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getMasterInfo(slaveTpFlag);
  }, [checkedMaster]);

  return (
    <MasterRegModal
      closeModal={closeModal}
      inputData={inputData}
      setInputData={setInputData}
      slaveList={slaveList}
      selectedList={selectedList}
      getMasterInfo={getMasterInfo}
      onClickSlave={onClickSlave}
      onClickRemove={onClickRemove}
      onClickSave={onClickSave}
      checkedMaster={checkedMaster || null}
    />
  );
};

export default MasterReg;
