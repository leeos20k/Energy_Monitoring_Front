import React, { useEffect, useRef, useState } from "react";
import { API_GET, API_POST } from "Api";
import { useModal } from "Hooks";
import MasterRegModal from "../s052010040";
import MasterMngView from "./view/MasterMngView";
import { MessageKor } from "Message";

const MasterMng = () => {

  const Message = MessageKor;
  const { openModal, closeModal, ModalPortal } = useModal();
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useState({
    orgId: JSON.parse(sessionStorage["userInfo"] || 0)?.orgId,
    appTp: "02",
    masterNm: "",
    order: "ASC",
    limit: 30,
    column: "",
    curPage: 1,
    masterId : '',
  });
  const [checkList, setCheckList] = useState([]);
  const [slaveTp, setSlaveTp] = useState([]);
  const ws = useRef(null);

  const checkboxes = document.getElementsByName("checkBox");
  const checkAllBox = document.getElementsByName("checkAllBox");

  const checkAllBoxHandler = (e) => {
    if (e.target.checked) {
      const newList = list.map((v, i) => v.masterId);
      setCheckList(newList);
      const newSlaveTp = list.map((v, i) => v.slaveTp);
      setSlaveTp(newSlaveTp);
    } else {
      setCheckList([]);
      setSlaveTp([]);
    }
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = e.target.checked;
    }
  };

  const checkBoxHandler = (e, v) => {
    if (e.target.checked) {
      setCheckList([...checkList, v.masterId]);
      setSlaveTp([...slaveTp, v.slaveTp]);
    } else {
      const newList = checkList.filter((_v) => v.masterId !== _v);
      setCheckList(newList);
      const newSlaveTp = slaveTp.filter((_v) => v.slaveTp !== _v);
      setSlaveTp(newSlaveTp);
    }
    let checkedCnt = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) checkedCnt++;
    }
    if (!checkedCnt && list.length > 0) checkAllBox[0].checked = true;
    else checkAllBox[0].checked = false;
  };

  const handlePageChange = (event, page) => {
    setSearchParams({ ...searchParams, curPage: Number(page) });
    onClickSearch(page);
  }; // 페이징

  const getList = async () => {
    try {
      const { data } = await API_GET(`/s052010030/getMasterList`, searchParams);
      console.log(data.data);
      setList(data.data);
      initialize();
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSearch = async (curPage) => {
    try {
      const { data } = await API_GET(`/s052010030/getMasterList?curPage=${curPage}`, searchParams);
      setList(data.data);
      initialize();
    } catch (err) {
      console.error(err);
    }
  }

  const onClickReg = () => {
    if (checkList.length > 1) return alert(Message.S05_M_000009);
    openModal();
  };

  const onClickDelete = async () => {
    if (checkList.length === 0) return alert(Message.S05_M_000010);
    if (!confirm(Message.S05_M_000005)) {
      return;
    }
    try {
      const { data } = await API_POST(`/s052010030/deleteMaster`, checkList);
      if (data.status === 200) {
        alert(data.message);
        getList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initialize = () => {
    setCheckList([]);
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    checkAllBox[0].checked = false;
  };

  useEffect(() => {
    getList();
    ws.current = new WebSocket("ws://localhost:8081/ws");
    ws.current.onopen = () => {
      console.log("MasterMng WebSocket Connected");
    };
    ws.current.onclose = () => {
      console.log("MasterMng WebSocket Disconnected");
    };
    ws.current.onmessage = (e) => {
      alert(e.data);
    };
    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <>
      <MasterMngView
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        list={list}
        checkAllBoxHandler={checkAllBoxHandler}
        checkBoxHandler={checkBoxHandler}
        onClickDelete={onClickDelete}
        getList={getList}
        onClickReg={onClickReg}
        onClickSearch={onClickSearch}
        handlePageChange={handlePageChange}
      />
      <ModalPortal>
        <MasterRegModal
          closeModal={closeModal}
          getList={getList}
          checkedMaster={checkList[0]}
          slaveTpFlag={slaveTp[0]}
        />
      </ModalPortal>
    </>
  );
};

export default MasterMng;
