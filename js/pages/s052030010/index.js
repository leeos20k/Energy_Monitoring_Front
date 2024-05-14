import { API_GET } from "Api";
import { useModal, useInterval } from "Hooks";
import { MessageKor } from "Message";
import { authStore } from "Store";
import { observer, useObserver } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import ImageModal from "../s052010061";
import UserMngModal from "../s052010070";
import MainView from "./view/MainView";

const Main = observer(() => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const Message = MessageKor;
  let interval;

  const [searchParams, setSearchParams] = useState({});
  const [list, setList] = useState([]);
  const [tabFlag, setTabFlag] = useState(true);
  const [modalFlag, setModalFlag] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [slaveInfo, setSlaveInfo] = useState({});
  const [subModalFlag, setSubModalFlag] = useState(true);
  const [tpOption, setTpOption] = useState([]);
  const ws = useRef(null);
  const [loading, setLoading] = useState(false);
  const [intervalState, setIntervalState] = useState(true);

  const handlePageChange = (event, page) => {
    setSearchParams({ ...searchParams, curPage: Number(page) });
    onClickSearch(page);
  }; // 페이징

  const initPage = async () => {
    try {
      setLoading(true); // 데이터 로딩 시작
      setTabFlag(true);
      const params = {
        orgId: authStore.orgId,
        slaveTp: "",
        appTp: authStore.appTp,
        slaveNm: "",
        masterNm: "",
        areaNm: "",
        order: "ASC",
        limit: 30,
        column: "",
        curPage: 1,
      };
      setSearchParams(params);

      const { data } = await API_GET(`/s052030010/master`, params);
      const tp = await API_GET(`/s052010060/tp`);

      setList(data?.data || []);

      console.log("data", data.data);

      let defaultTpOption = [{ cdV: "", cdVNm: "구분" }];
      tp.data.data.unshift(...defaultTpOption);
      setTpOption(tp.data.data);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickSearch = async (curPage) => {
    try {
      setTabFlag(true);
      const { data } = await API_GET(
        `/s052030010/master?curPage=${curPage}`,
        searchParams
      );
      setList(data?.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickImage = async (slaveId, seq) => {
    setModalFlag(false);
    const { data } = await API_GET(
      `/s052030010/image?slaveId=${slaveId}&seq=${seq}`
    );
    setImgUrl(`${data?.data.attachFile}`);
    openModal();
  };

  const onClickAlarmCheck = async (slaveId, seq) => {
    try {
      const alarmParams = {
        userId: authStore.userId,
        slaveId: slaveId,
        seq: seq,
      };
      await API_GET(`/s052030010/updateAlarm020`, alarmParams);
      await API_GET(`/s052030010/updateAlarm030`, alarmParams);
      alert("경고가 해제되었습니다.");
      initPage();
    } catch (e) {
      console.log(e);
    }
  };

  const populateVoiceList = async (synth) => {
    try {
      const voices = await synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname === bname) return 0;
        else return +1;
      });

      return voices;
    } catch (error) {
      throw new Error("음성 목록을 가져오는 데 실패했습니다");
    }
  };

  const speak = async (textToRead, synth) => {
    const pitch = 1;
    const rate = 1;
    const targetLanguage = "ko-KR"; // Set the target language to Korean

    try {
      const voices = await populateVoiceList(synth);

      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = async () => {
          const updatedVoices = await populateVoiceList(synth);
          speak(textToRead, synth);
        };
      }

      if (synth.speaking) {
        console.error("speechSynthesis.speaking");
        return;
      }

      if (textToRead !== "") {
        const koreanVoice = voices.find(
          (voice) => voice.lang === targetLanguage
        );

        if (koreanVoice) {
          const utterThis = new SpeechSynthesisUtterance(textToRead);
          utterThis.onend = function (event) {};
          utterThis.onerror = function (event) {
            console.error("SpeechSynthesisUtterance.onerror", event);
          };

          utterThis.voice = koreanVoice;
          utterThis.pitch = pitch;
          utterThis.rate = rate;
          synth.speak(utterThis);
        } else {
          console.error("No Korean voice available.");
        }
      }
    } catch (error) {
      console.error("음성 목록을 가져오는 중 에러 발생", error);
    }
  };

  const TTS = async (list) => {
    let alarmString = "";

    //반복돌면서 첫번째 항목인지의 여부를 확인
    for (let i = 0; i < list.length; i++) {
      if (list[i].alarmConfirmFlag === "Y") {
        if (alarmString !== "") {
          alarmString = alarmString + "," + list[i].slaveDetailNm;
        } else {
          alarmString = list[i].slaveDetailNm;
        }
      }
    }

    if (alarmString !== "") {
      //알람 읽어주는 함수
      speak(`${alarmString} 에 경고가 발생했습니다.`, window.speechSynthesis);
    }
  };

  useEffect(() => {
    initPage();
  }, [authStore.authenticated]);

  ws.current = new WebSocket("ws://192.168.10.17:8081/ws");
  ws.current.onopen = () => {
    console.log("Main WebSocket Connected");
  };
  ws.current.onclose = () => {
    console.log("Main WebSocket Disconnected");
  };
  const intervalFunction = async () => {
    console.log("intervalState : ", intervalState);

    const params = {
      orgId: authStore.orgId,
      slaveTp: "",
      appTp: authStore.appTp,
      slaveNm: "",
      masterNm: "",
      areaNm: "",
      order: "ASC",
      limit: 30,
      column: "",
      curPage: 1,
    };
    const { data } = await API_GET(`/s052030010/master`, params);

    setList(data?.data || []);

    console.log("interval is running....");

    TTS(list);
  };

  return useObserver(() => (
    <>
      <MainView
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        tabFlag={tabFlag}
        onClickSearch={onClickSearch}
        list={list}
        slaveInfo={slaveInfo}
        setSlaveInfo={setSlaveInfo}
        openUserModal={openModal}
        setModalFlag={setModalFlag}
        onClickImage={onClickImage}
        subModalFlag={subModalFlag}
        setSubModalFlag={setSubModalFlag}
        adminFlag={authStore.adminFlag}
        tpOption={tpOption}
        setTabFlag={setTabFlag}
        handlePageChange={handlePageChange}
        loadingFlag={loading}
        intervalState={intervalState}
        setIntervalState={setIntervalState}
        intervalFunction={intervalFunction}
        onClickAlarmCheck={onClickAlarmCheck}
        TTS={TTS}
      />
      <ModalPortal>
        {modalFlag ? (
          <UserMngModal
            closeModal={closeModal}
            intervalState={intervalState}
            setIntervalState={setIntervalState}
          />
        ) : (
          <ImageModal
            closeModal={closeModal}
            imgUrl={imgUrl}
            intervalState={intervalState}
            setIntervalState={setIntervalState}
          />
        )}
      </ModalPortal>
    </>
  ));
});

export default Main;
