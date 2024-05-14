import { API_GET, API_POST } from 'Api';
import { useModal } from "Hooks";
import { MessageKor } from 'Message';
import { authStore } from "Store";
import { observer, useObserver } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import SlaveReg from "../s052010060";
import SlaveMngView from "./view/SlaveMngView";

const SlaveMng = observer(() => {

  const { openModal, closeModal, ModalPortal } = useModal();
  const Message = MessageKor;
  const [searchParams, setSearchParams] = useState({})
  const [list, setList] = useState([])
  const [checkList, setCheckList] = useState([])
  const [isSelectAll, setIsSelectAll] = useState(false);
  const ws = useRef(null)

  const handlePageChange = (event, page) => {
    setSearchParams({ ...searchParams, curPage: Number(page) });
    onClickSearch(page);
  }; // 페이징
  
  const checkedHandler = ({ target }) => {
    if (target.checked) {
      setCheckList(preCheckList => [...preCheckList, target.value]);
      if (list.length > 0 && Number(checkList.length) + 1 === list.length) {
        setIsSelectAll(true);
        document.getElementById('checkAll').checked = true
      }
    } else if (!target.checked && checkList.includes(target.value)) {
      setCheckList(prevCheckList => prevCheckList.filter(v => v !== target.value));
      if (list.length > 0 && Number(checkList.length) - 1 !== list.length) {
        setIsSelectAll(false);
        document.getElementById('checkAll').checked = false
      }
    }
  };

  const CheckedAllHandler = ({ target }) => {
    setIsSelectAll(!isSelectAll);
    if (target.checked) {
      const checkedAll = list.map(v => v.slaveId);
      setCheckList(checkedAll);
      for (let i = 0; i < list.length; i++) {
        document.getElementById(`${i}check`).checked = true
      }
    } else {
      setCheckList([]);
      for (let i = 0; i < list.length; i++) {
        document.getElementById(`${i}check`).checked = false
      }
    }
  }

  const initPage = async () => {
    try {
      const params = {
        orgId: authStore.orgId,
        slaveNm: '',
        slaveDetailNm:'',
        slaveTpNm: '',
        order: "ASC",
        limit: 30,
        column: "",
        curPage: 1
      }
      setSearchParams(params)
      const { data } = await API_GET(`/s052010050/slave`, params)
      setList(data?.data || [])

      console.log("data : ",data.data);
    } catch (e) {
      console.log(e)
    }
  }

  const onClickSearch = async (curPage) => {
    try {
      const { data } = await API_GET(`/s052010050/slave?curPage=${curPage}`, searchParams)
      setList(data?.data || [])
      setCheckList([]);
      for (let i = 0; i < data.data.length; i++) {
        document.getElementById(`${i}check`).checked = false
      }
      document.getElementById('checkAll').checked = false
    } catch (e) {
      console.log(e)
    }
  }

  const onClickDelete = async () => {
    if (!confirm(Message.S05_M_000005)) {
      return
    }
    if (checkList.length === 0) {
      alert(Message.S05_M_000001)
      return
    }
    try {
      const { data } = await API_POST(`/s052010050/slave`, checkList)
      if (data.message === 'Success') {
        alert(Message.S05_M_000002)
        onClickSearch()
        initPage();
      } else {
        alert(Message.S05_M_000001)
      }
    } catch (e) {
      alert(Message.S05_M_000001)
      console.log(e)
    }
  }

  const onClickRegBtn = () => {
    if (checkList.length > 1) return alert(Message.S05_M_000009)
    openModal()
  }

  useEffect(() => {
    initPage()
  }, [authStore.authenticated])

  useEffect(()=> {
    ws.current = new WebSocket("ws://localhost:8081/ws");
    ws.current.onopen = () => {
      console.log("SlaveMng WebSocket Connected");
    };
    ws.current.onclose = () => {
      console.log("SlaveMng WebSocket Disconnected");
    };
    ws.current.onmessage = (e) => {
      alert(e.data);
    };
    return () => {
      ws.current.close();
    };
  },[])

  return useObserver(() => (
    <div>
      <SlaveMngView
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onClickSearch={onClickSearch}
        onClickDelete={onClickDelete}
        list={list}
        isSelectAll={isSelectAll}
        checkedHandler={checkedHandler}
        CheckedAllHandler={CheckedAllHandler}
        onClickRegBtn={onClickRegBtn}
        handlePageChange={handlePageChange}
      />
      <ModalPortal>
        <SlaveReg closeModal={closeModal} checkedSlave={checkList[0]} onClickSearch={onClickSearch} initPage={initPage}/>
      </ModalPortal>
    </div>
  ));
});

export default SlaveMng;