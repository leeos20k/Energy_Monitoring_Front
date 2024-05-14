import React, { useEffect, useState } from "react";
import UpdateWaterRateModal from "./view/UpdateWaterRateModal";
import { authStore } from "Store";
import { API_GET, API_POST } from "../../api";
import dayjs from "dayjs";
import axios from 'axios';

const UpdateWaterRate = ({ closeModal, slaveInfo }) => {

    const selectableGroup = [ //모달화면의 셀렉트박스에 띄울 근무조
    {cdV: '1조', cdVNm:'1조'},
    {cdV: '2조', cdVNm:'2조'},
    {cdV: '3조', cdVNm:'3조'}        
    ];

    const group1 = {time1:'07', time2:'08', time3:'09', time4:'10', time5:'11', time6:'12', time7:'13', time8:'14'}
    const group2 = {time1:'15', time2:'16', time3:'17', time4:'18', time5:'19', time6:'20', time7:'21', time8:'22'}
    const group3 = {time1:'23', time2:'00', time3:'01', time4:'02', time5:'03', time6:'04', time7:'05', time8:'06'}

    const [selectedGroup, setSelectedGroup] = useState("1조");
    const [groupTime, setGroupTime] = useState(group1);


    const [waterRateList,setWaterRateList] = useState([]);

    let [selectedDate, setSelectedDate] = useState();

    
    const initPage = async () => {
      const params = {
        orgId: authStore.orgId
      };

      const getSlave020WaterRate = await API_GET(
        `/s052030013/getWaterRate`,
        params
      );

      const data = getSlave020WaterRate.data.data
      const waterRate = {seq1:data.gypsumAWater, seq2:data.gypsumBWater, seq3:data.gypsumCWater, seq4:data.slagWater, seq5:data.fWater, slaveId:data.slaveId}
      // console.log("waterr",waterRate)
      
      // 길이가 8인 배열을 만들고, 각 요소를 mapA의 복사본으로 채움
      const waterRateList = Array.from({ length: 8 }, () => ({...waterRate}));
      
      setWaterRateList(waterRateList);

    }

    const changeGroup = (e) => {
      console.log("작업조:",e)
      setSelectedGroup(e);
      if(e === "1조"){
        setGroupTime(group1);
      }else if(e === "2조"){
        setGroupTime(group2);
      }else if(e === "3조"){
        setGroupTime(group3);
      }
      
    }
    const selectDate = (e) => {
      console.log("선택된 날짜:",e)
      setSelectedDate(e);
    }

    const updatePumpAggre = async () => {
      let isEmptyStringPresent = waterRateList.some(item => Object.values(item).some(value => value === "")); //waterRateList의 값중 하나라도 ""가 있다면 true

      if(selectedDate === undefined){
        alert("날짜를 선택해주세요");
      }else if(isEmptyStringPresent){
        alert("유효한 수분율을 입력해주세요 (0% ~ 100%)");
      }else{

          let list=[]
          for(let i=1; i<=(Object.keys(groupTime).length); i++){    //time1~time7
              for(let j=1; j<=5; j++){   // seq1~seq5
                let map = {}

                if((selectedGroup === "3조") && (i>=2)){
                  const realDate = new Date(selectedDate);
                  realDate.setDate(realDate.getDate() + 1);
                  const year = realDate.getFullYear();
                  const month = String(realDate.getMonth() + 1).padStart(2, "0");
                  const day = String(realDate.getDate()).padStart(2, "0");
                  const dateFormat = `${year}-${month}-${day}`;

                  map.fromTime = dateFormat+" "+groupTime[`time${i}`]+":00:01";
                  map.toTime = dateFormat+" "+groupTime[`time${i}`]+":59:59";


                }else{
                  map.fromTime = selectedDate+" "+groupTime[`time${i}`]+":00:01";
                  map.toTime = selectedDate+" "+groupTime[`time${i}`]+":59:59";
                }

                map.slaveId=waterRateList[i-1].slaveId;
                map.seq=j
                map.waterRate = map.waterRate=waterRateList[i-1][`seq${j}`];
                map.userId=authStore.userId;
                map.orgId=authStore.orgId;
                
                list.push(map);
              }
          }
          console.log("parameters : ",list)
          


          const updatePump010  = await API_POST(`/s052030013/updateWaterRate`, list);
          console.log("결과 : ",updatePump010);
          console.log("데이터 : ",updatePump010.data.status);
          if(updatePump010.data.status === 200){
            // alert("pumpUpdate 완료");

            let fromTime=null;
            let toTime=null;
            // console.log("seleced:",selectedDate)
            // const date = selectedDate;
            if(selectedGroup === "1조"){
              fromTime=selectedDate+" 07:00:01"
              toTime=selectedDate+" 15:00:00"
            }else if(selectedGroup === "2조"){
              fromTime=selectedDate+" 15:00:01"
              toTime=selectedDate+" 23:00:00"
            }else if(selectedGroup === "3조"){
              fromTime=selectedDate+" 23:00:01"

              const realDate = new Date(selectedDate);
              realDate.setDate(realDate.getDate() + 1);
              const year = realDate.getFullYear();
              const month = String(realDate.getMonth() + 1).padStart(2, "0");
              const day = String(realDate.getDate()).padStart(2, "0");
              const dateFormat = `${year}-${month}-${day}`;
              
              toTime=dateFormat+" 07:00:00"
            }

            // console.log("fromTime:",fromTime);
            // console.log("toTime:",toTime);


            const params = {
              orgId: authStore.orgId,
              fromTime: fromTime,
              toTime: toTime
            }
            
            console.log("parmas:",params);
            const updateAggre011  = await API_POST(`/s052030013/updateAggre011`, params);
            if(updateAggre011.data.status === 200){
              alert("처리 완료");
            }else{
              alert("처리 x");
            }

          }else{
            alert("처리 x");
          }
      }

    }

    const handleInputChange = (index, seq, value) => { //Input값에 변화가 감지되었을때, 기존 list의 값을 새로운 값으로 변경

      console.log("index: ",index," seq: ",seq," value: ", value);

      function inputCheck (inputData){
        // 먼저, inputData가 숫자와 '.'으로만 이루어진 문자열인지 확인
        const isNumericAndDot = /^[\d.]+$/.test(inputData);
        // 숫자로 변환, 입력이 숫자와 '.'만 포함하더라도, parseFloat는 유효한 숫자로 변환
        const number = parseFloat(inputData);
        // 숫자와 점(.)으로만 이루어진 문자열이며, 그 값이 0 이상 100 이하인지 확인
        if (isNumericAndDot && number >= 0 && number <= 100) {
          return true;
        } else {
          return false;
        }
      }

      const updateList = [...waterRateList];

      if(inputCheck(value) == true){ 
        updateList[index][seq] = value; 
      }else{
        updateList[index][seq] = ""; 
      }

      setWaterRateList(updateList); 
    };


    const batchAdjustment = () => {
      console.log("지금 적용된 리스트 : ", waterRateList);
      const updateList = JSON.parse(JSON.stringify(waterRateList));
      for(let j=1; j<=5; j++){
        const criteria = updateList[0][`seq${j}`]
        
        for(let i=0; i<updateList.length; i++){
          
          updateList[i][`seq${j}`] = criteria;

        }
      }
      console.log("일괄조정된 리스트:",updateList);
        
      setWaterRateList(updateList);
      
      

    }

   
















  useEffect(() => {
    initPage();
  }, []);

  return (
    <UpdateWaterRateModal
      closeModal={closeModal}

      selectableGroup={selectableGroup}


      selectedGroup={selectedGroup}


      setSelectedGroup={setSelectedGroup}


      changeGroup={changeGroup}
      selectDate={selectDate}

      groupTime={groupTime}


      waterRateList={waterRateList}


      updatePumpAggre={updatePumpAggre}

      handleInputChange={handleInputChange}
      batchAdjustment={batchAdjustment}
      // test={test}
    />
  );
};

export default UpdateWaterRate;
