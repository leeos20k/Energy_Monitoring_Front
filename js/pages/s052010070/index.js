import React, { useEffect, useState } from "react";
import { API_GET, API_POST } from "Api";
import { authStore } from "Store";
import UserMngModal from "./view/UserMngModal";

const UserMng = ({ closeModal, intervalState, setIntervalState}) => {
  const [searchParams, setSearchParams] = useState({
    orgId: authStore.orgId,
    appTp: "02",
    userNm: "",
  });
  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const adminItem = [{ cdV: 'Y', cdVNm: 'Y' }, { cdV: '', cdVNm: 'N' }]
  const checkboxes = document.getElementsByName("checkBox");
  const checkAllBox = document.getElementsByName("checkAllBox");

  const checkAllBoxHandler = (e) => {
    if (e.target.checked) {
      const newList = list.map((v, i) => i);
      setCheckList(newList);
    } else {
      setCheckList([]);
    }
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = e.target.checked;
    }
  };

  const checkBoxHandler = (e, v, idx) => {
    if (e.target.checked) {
      setCheckList([...checkList, idx]);
    } else {
      const newList = checkList.filter((_v, _i) => idx !== _i);
      setCheckList(newList);
    }
    let checkedCnt = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) checkedCnt++;
    }
    if (!checkedCnt) checkAllBox[0].checked = true;
    else checkAllBox[0].checked = false;
  };

  const getList = async () => {
    try {
      const { data } = await API_GET(`/s052010070/getUserList`, searchParams);
      setList(data.data);
      console.log(data.data)
    } catch (err) {
      console.error(err);
    }
  };

  const onClickSave = async () => {
    if (checkList.length === 0) return alert("사용자를 선택해주세요.");
    try {
      const newList = selectedList();
      const checked = await validataion(newList);
      if (!checked) return;
      const { data } = await API_POST(`/s052010070/saveUser`, newList);
      if (data.status === 200) {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    initialize();
    getList();
  };

  const validataion = async (checkList) => {
    let checked = 0;
    for (let i = 0; i < checkList.length; i++) {
      if (!checkList[i].userNm) return alert("성명을 확인해주세요.");
      else if (checkList[i].hpNo.length > 13 || checkList[i].hpNo.length < 11)
        return alert("휴대폰 번호를 확인해주세요.");
      else checked++;
    }
    if (checked === checkList.length) return true;
  };

  const onClickDelete = async () => {
    if (checkList.length === 0) return alert("사용자를 선택해주세요.");
    const newList = selectedList();
    try {
      const { data } = await API_POST(`/s052010070/deleteUser`, newList);
      if (data.status === 200) {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
    initialize();
    getList();
  };
  const onClickAddRow = async () => {
    try {
      setList([...list, { loginId: 1, orgId: authStore.orgId, hpNo: "010-" }]);
    } catch (err) {
      console.error(err);
    }
  };
  const onClickRemoveRow = async () => {
    try {
      const newList = afterRemoveRow();
      setList(newList);
      setCheckList([]);
    } catch (err) {
      console.error(err);
    }
    initialize();
  };

  const afterRemoveRow = () => {
    const newList = [...list];
    const newCheckList = [...checkList];
    newCheckList.sort((a, b) => b - a);
    for (const idx of newCheckList) {
      newList.splice(idx, 1);
    }
    return newList;
  };

  const selectedList = () => {
    const newList = [];
    const newCheckList = [...checkList];
    newCheckList.sort((a, b) => a - b);
    for (const idx of newCheckList) {
      newList.push(list[idx]);
    }
    return newList;
  };

  const onChangeUser = (e, i) => {
    const newList = [...list.slice(0, i), { ...list[i], userNm: e.target.value }, ...list.slice(i + 1)];
    setList(newList);
  };
  const onChangeHpNo = (e, i) => {
    const newList = [
      ...list.slice(0, i),
      {
        ...list[i],
        hpNo: e.target.value
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
          .replace(/(\-{1,2})$/g, ""),
      },
      ...list.slice(i + 1),
    ];
    setList(newList);
  };

  const onChangeComment = (e, i) => {
    const newList = [...list.slice(0, i), { ...list[i], comments: e.target.value }, ...list.slice(i + 1)];
    setList(newList);
  };

  const onChangeAdminFlag = (e, i) => {
    const newList = [...list.slice(0, i), { ...list[i], adminFlag: e.target.value }, ...list.slice(i + 1)];
    setList(newList);
  };
  const onClickClose = () => {
    closeModal();
    setIntervalState(true);
  };

  const initialize = () => {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    checkAllBox[0].checked = false;
    setCheckList([]);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <UserMngModal
      closeModal={closeModal}
      checkAllBoxHandler={checkAllBoxHandler}
      checkBoxHandler={checkBoxHandler}
      getList={getList}
      list={list}
      onClickClose={onClickClose}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      onClickSave={onClickSave}
      onClickDelete={onClickDelete}
      onClickAddRow={onClickAddRow}
      onClickRemoveRow={onClickRemoveRow}
      onChangeUser={onChangeUser}
      onChangeHpNo={onChangeHpNo}
      onChangeComment={onChangeComment}
      onChangeAdminFlag={onChangeAdminFlag}
      adminItem={adminItem}
    />
  );
};

export default UserMng;
