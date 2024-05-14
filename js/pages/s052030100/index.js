import React, { useEffect, useState } from "react";
import { API_GET, API_POST } from "Api";
import { authStore } from "Store";
import ProdPlanRegModal from "./view/ProdPlanRegModal";
import { MessageKor } from 'Message';

const ProdPlanReg = ({ closeModal, intervalState, setIntervalState, initPage}) => {

  const Message = MessageKor;

  const today = new Date();
  const year = today.getFullYear();
  const [planYear, setPlanYear] = useState(year) //현재시점의 년도를 저장

  const params = {
    orgId: authStore.orgId,
    userId: authStore.userId,
    planYear: String(planYear) //현재 년도를 params의 기본값으로 설정
  };

  function isAllNullExceptKeys(item, keys) { //리스트 내부 데이터 체크 함수
    for (let key in item) {
        if (!keys.includes(key) && item[key] !== null) {
            return false;
        }
    }
    return true;
  }

  const defaultList = [ //plan010에 데이터가 없을경우 default로 화면에 띄우는 리스트
    {planYear: String(planYear), energePlanTp:'11', energePlanTpNm:'생산계획량(ton)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
    {planYear: String(planYear), energePlanTp:'21', energePlanTpNm:'가동시간(Hr)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
    {planYear: String(planYear), energePlanTp:'31', energePlanTpNm:'전력계획량(KW)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
    {planYear: String(planYear), energePlanTp:'41', energePlanTpNm:'연료계획량(m³)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
    {planYear: String(planYear), energePlanTp:'12', energePlanTpNm:'생산성(ton/Hr)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
    {planYear: String(planYear), energePlanTp:'32', energePlanTpNm:'전력원단위(KW/ton)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
    {planYear: String(planYear), energePlanTp:'42', energePlanTpNm:'연료원단위(m³/ton)', totalValue:0, janValue:0, febValue:0, marValue:0, aprValue:0, mayValue:0, junValue:0, julValue:0, augValue:0, sepValue:0, octValue:0, novValue:0, decValue:0},
  ]

  const [list, setList] = useState([]); //default리스트 혹은 쿼리결과 리스트를 모달화면에 뿌리기 위해 담아둘 list선언

  const [yearCode, setYearCode] = useState([ //모달화면의 셀렉트박스에 띄울 년도데이터
    {cdV: '2024', cdVNm:'2024'},
    {cdV: '2025', cdVNm:'2025'},
    {cdV: '2026', cdVNm:'2026'},
    {cdV: '2027', cdVNm:'2027'},
    {cdV: '2028', cdVNm:'2028'},
    {cdV: '2029', cdVNm:'2029'},
    {cdV: '2030', cdVNm:'2030'}          
  ]);
  
  const getProductionPlan = async () => { //모달에 나타낼 데이터 리스트 get
    try{
      const { data } = await API_GET(`/s052030100/productionPlan`, params); //쿼리결과 리스트(기본: 현재 년도의 데이터)
      let isAllNull = data.data.some(item => isAllNullExceptKeys(item, ['energePlanTp', 'energePlanTpNm'])); //쿼리결과 리스트가 해당 열을 제외하고 다 null = plan010에 해당년도 데이터 없음
      if(isAllNull){//데이터가 없을 경우
        setList(defaultList);//default데이터 list에 set
      }else{//데이터가 있을경우
        setList(data.data); //가져온데이터 list에 set
      }
    }catch(err){
      console.error(err);
    }
  };


  const handleInputChange = (index, month, value) => { //Input값에 변화가 감지되었을때, 기존 list의 값을 새로운 값으로 변경
    const updateList = [...list];
    function isNumberString(String) { //문자열을 판별하는 함수
      if(((/^[0-9,]*$/.test(String) == true) || (/^\d+$/.test(String) == true)) && (String != "") && (String != null)){ 
        return true //"숫자" or "숫자+," 일 때만 참
      }else{
        return false
      }
    }
    if(isNumberString(value) == true){ //실시간 Input에 담긴 데이터가 "숫자" or "숫자+," 일 때
      updateList[index][month] = parseInt(value.replace(/,/g, '')); //,가 있으면 제거한뒤(값 수정할때 , 입력안됨) 정수로 업데이트 (저장할때 정수여야 하므로)
    }else{//실시간 Input에 담긴 데이터가 "숫자" or "숫자+," 가 아닌 모든경우
      updateList[index][month] = ""; // "숫자" or "숫자+," 이외의 경우로 데이터가 담긴 경우 공백으로 업데이트
    }
    setList(updateList); //기존 list값을 새로운 값으로 변경 -> 그러면 list를 참조하는 value는 또다시 formatNumber를 거쳐서 화면에 나타나게됨 (ex: 123456789 -> "123,456,789") 
  };



  const delSaveProdPlan = async () => { //저장버튼 눌렀을 때 동작
    let isEmptyStringPresent = list.some(item => Object.values(item).some(value => value === "")); //list의 값중 하나라도 ""가 있다면 true

    if(isEmptyStringPresent){
      alert(Message.S05_M_000020);
    }
    else{//list에 적절한 데이터가 담아졌음
      try{
        const postList = list.map(item => {
          return {...item, ...params};//적절한 API 동작을 위해 list데이터 각 행에 현 시점 params데이터 추가
        });
        const delSaveProdPlan = await API_POST(`/s052030100/delSaveProductionPlan`,postList); //plan010에 저장되어있던 기존데이터를 지우고, 입력한 새 데이터를 plan010에 저장
        alert(Message.S05_M_000002);
        closeModal();
      }catch(err){
        alert(Message.S05_M_000001);
      }
    }
  }

  const openPlanTable = () => {//클릭시 현 시점 params의 planYear에 해당하는 쿼리리스트 불러오기
    try{
      getProductionPlan(); //setPlanYear를 뷰에 설정하여, 셀렉트박스가 선택될때마다 params가 해당값이 업데이트됨
    }catch(err){
      alert(Message.S05_M_000001);
    }
  }

  function formatNumber (num){
    if(num==null){
      return null
    }else if(num==""){
      return ""
    }else if(!isNaN(parseInt(num))){
      let formattedNumber = new Intl.NumberFormat('en-US').format(num);
      return String(formattedNumber);
    }else{
      return "DB 직접추가값 오류" //숫자만 기입할것
    }
  }


  useEffect(() => {//최초실행
    getProductionPlan();//쿼리리스트 불러오기
  }, []);

  return (
    <ProdPlanRegModal
      closeModal={closeModal}
      list={list} //리스트데이터 뷰에 전달
      yearCode={yearCode} //년도 객체 뷰에 전달
      planYear={planYear} //셀렉트박스 디폴트 값을 해당 년도로 설정하도록
      handleInputChange={handleInputChange} //동작감지함수
      setPlanYear={setPlanYear} //셀렉트박스 선택시 해당 선택값을 planYear로 업데이트 -> params의 planYear값도 자동 업데이트됨
      openPlanTable={openPlanTable}//클릭 시 현 시점 params의 planYear에 해당하는 쿼리리스트 불러오기
      delSaveProdPlan={delSaveProdPlan}//저장




      formatNumber={formatNumber}



    />
  );
};

export default ProdPlanReg;
