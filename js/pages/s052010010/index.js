import { API_GET, API_POST } from 'Api';
import { useModal } from "Hooks";
import { MessageKor } from 'Message';
import { authStore } from "Store";
import { observer, useObserver } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import GroupMngView from "./view/GroupMngView";

const GroupMng = observer(() => {

  const { openModal, closeModal, ModalPortal } = useModal();
  const Message = MessageKor;

  const [searchParams, setSearchParams] = useState({})
  const [list, setList] = useState([])
  const [checkList, setCheckList] = useState([])
  const [isSelectAll, setIsSelectAll] = useState(false)
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
      const checkedAll = list.map(v => v.areaSeq.toString());
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
        appTp: authStore.appTp,
        areaNm: '',
        areaSeq: '',
        order: "ASC",
        limit: 30,
        column: "",
        curPage: 1
      }
      setSearchParams(params)
      const { data } = await API_GET(`/s052010010/group`, params)
      setList(data?.data || [])
    } catch (e) {
      console.log(e)
    }
  }

  const onClickSearch = async (curPage) => {
    try {
      const { data } = await API_GET(`/s052010010/group?curPage=${curPage}`, searchParams)
      setList(data?.data || [])
      setCheckList([]);
      for (let i = 0; i < data?.data.length; i++) {
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
      const params = {
        list: checkList,
        orgId: authStore.orgId,
        appTp: authStore.appTp
      }
      const { data } = await API_POST(`/s052010010/group`, params)
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

  const onClickReg = async () => {
    openModal()
  }

  useEffect(() => {
    initPage()
  }, [authStore.authenticated])

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8081/ws");
    ws.current.onopen = () => {
      console.log("GroupMng WebSocket Connected");
    };
    ws.current.onclose = () => {
      console.log("GroupMng WebSocket Disconnected");
    };
    ws.current.onmessage = (e) => {
      alert(e.data);
    };
    return () => {
      ws.current.close();
    };
  }, [])

  return useObserver(() => (
    <div>
      <GroupMngView
        ModalPortal={ModalPortal}
        closeModal={closeModal}
        onClickReg={onClickReg}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onClickSearch={onClickSearch}
        onClickDelete={onClickDelete}
        list={list}
        isSelectAll={isSelectAll}
        checkedHandler={checkedHandler}
        CheckedAllHandler={CheckedAllHandler}
        checkList={checkList}
        handlePageChange={handlePageChange}
        refresh={initPage}
      />
    </div>
  ));
});

export default GroupMng;
