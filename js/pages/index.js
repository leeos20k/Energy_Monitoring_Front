import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./s052030010";
import MasterMng from "./s052010030";
import GroupMng from "./s052010010";
import PumpLevelGraph from "./s052030020";
import SlaveMng from "./s052010050";
import Login from "./s052020010";
import Login_EM from "./s052020011";
import Main_EM from "./s052030011";
import ProductionStatus from './s052030012';
import FacilityIPMng from "./s052010031";
import FacilityMng from "./s052010051";

const Pages = () => {
  return (
    <>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" exact={true} element={<Login />} />
            <Route path="/Main" exact={true} element={<Main />} />
            <Route path="/MasterMng" exact={true} element={<MasterMng />} />
            <Route path="/GroupMng" exact={true} element={<GroupMng />} />
            <Route path="/SlaveMng" exact={true} element={<SlaveMng />} /> */}

            <Route path="/" exact={true} element={<Login_EM />} />
            <Route path="/Main" exact={true} element={<Main_EM />} />
            <Route path="/ProductionStatus" exact={true} element={<ProductionStatus />} />
            <Route path="/FacilityIPMng" exact={true} element={<FacilityIPMng />} />
            <Route path="/FacilityMng" exact={true} element={<FacilityMng />} />

          </Routes>
        </BrowserRouter>
        <div id="root-modal" />
      </React.Fragment>
    </>
  );
};

export default Pages;
