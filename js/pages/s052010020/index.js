import { API_GET, API_POST } from 'Api';
import { MessageKor } from 'Message';
import { authStore } from "Store";
import React, { useEffect, useState } from "react";
import GroupRegModal from "./view/GroupRegModal";

const GroupReg = ({ closeModal, onClickSearch, checkList,refresh}) => {

  const Message = MessageKor;
  
  const [inputData, setInputData] = useState({})
  const [list, setList] = useState([])
  const [selectList, setSelectList] = useState([])

  const initPage = async () => {
    try {
      let params = { orgId: authStore.orgId, appTp: authStore.appTp, areaSeq: '' }
      if (checkList.length === 1) {
        params = { ...params, areaSeq: checkList[0] }
      }
      const { data } = await API_GET(`/s052010020/group`, params)
      if (checkList.length === 1) {
        data?.data?.map((v, i) => {
          if (v.selectedMaId === 1) {
            setInputData({ ...data?.data[i], loginId: 'DML', orgId: authStore.orgId, appTp: authStore.appTp } || {})
          }
        })
      } else {
        setInputData({ ...data?.data[0], loginId: 'DML', orgId: authStore.orgId, appTp: authStore.appTp } || {})
      }
      setList(data?.data || []);
      const arr = data?.data?.filter(v => v.selectedMaId == 1);
      setSelectList(arr);
    } catch (e) {
      alert(Message.S05_M_000001);
      closeModal();
      console.log(e);
    }
  }

  const onClickList = (v) => {
    if (v.selectedMaId === 2) {
      return
    } else {
      if (selectList.includes(v)) {
        onClickChecked(v.displayMaId);
      } else {
        onClickCheck(v);
      }
    }
  };

  const onClickCheck = (v) => {
    setSelectList([...selectList, v]);
  };

  const onClickChecked = (id) => {
    const updatedList = selectList.filter(v => v.displayMaId !== id);
    setSelectList(updatedList);
  };

  const checkParams = () => {
    if (inputData.areaNm === null || inputData.areaNm === '') {
      alert(Message.S05_M_000006)
      return false
    } else if (selectList.length === 0) {
      alert(Message.S05_M_000007)
      return false
    } else {
      return true
    }
  }

  const onClickReg = async () => {
    if (!checkParams()) {
      return
    }
    try {
      const params = {
        map: inputData,
        list: selectList,
        updateFlag: checkList.length === 1 ? 'update' : 'register'
      }
      const { data } = await API_POST(`/s052010020/group`, params)
      if (data.message === 'Success') {
        alert(Message.S05_M_000002)
        onClickSearch()
        refresh()
        closeModal()
      } else {
        alert(Message.S05_M_000001)
      }
    } catch (e) {
      alert(Message.S05_M_000001)
      console.log
    }
  }

  useEffect(() => {
    initPage()
  }, [])

  return (
    <GroupRegModal
      closeModal={closeModal}
      inputData={inputData}
      setInputData={setInputData}
      list={list}
      selectList={selectList}
      onClickSearch={onClickSearch}
      onClickList={onClickList}
      onClickChecked={onClickChecked}
      onClickReg={onClickReg}
    />
  )
};

export default GroupReg;
