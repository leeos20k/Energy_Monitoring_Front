import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "Elements";
import { palette,palette2 } from "Style";
import { authStore } from "Store";
import { useObserver } from "mobx-react";

const NavContainer = styled.div`
  .navWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -150px;
  }
  .navList {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display:flex;
    flex-direction: row;
    align-items :center;
    justify-content:center;
    min-width: 150px;
    height: 30px;
    border-right: 1px solid white;

  }
  li:last-child {
    border-right: none;
  }
  .activeStyle {
    display:inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 0 auto;
    color: ${palette.PrimaryColor};
    font-size: 16px;
    font-weight: 600;
    font-family: "Pretendard";
    background-color: white;
  }
  .deactiveStyle {
    display:inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 0 auto;
    color: white;
    font-size: 16px;
    font-weight: 600;
    font-family: "Pretendard";
    background-color:transparent;
  }
  .button:hover {
    cursor: pointer;
    background-color: white;
    color: ${palette.PrimaryColor};
  }
  .button:active {
    background-color: white;
    color: ${palette.SecondaryColor};
  }
  .selected {
    background-color: red;
    color: ${palette.SecondaryColor};
  }
`;
const NavContainer_EM = styled.div`
  .navWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -150px;
  }
  .navList {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display:flex;
    flex-direction: row;
    align-items :center;
    justify-content:center;
    min-width: 150px;
    height: 30px;
    border-right: 1px solid white;

  }
  li:last-child {
    border-right: none;
  }
  .activeStyle {
    display:inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 0 auto;
    color: ${palette2.PrimaryColor};
    font-size: 16px;
    font-weight: 600;
    font-family: "Pretendard";
    background-color: white;
  }
  .deactiveStyle {
    display:inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 0 auto;
    color: white;
    font-size: 16px;
    font-weight: 600;
    font-family: "Pretendard";
    background-color:transparent;
  }
  .button:hover {
    cursor: pointer;
    background-color: white;
    color: ${palette2.PrimaryColor};
  }
  .button:active {
    background-color: white;
    color: ${palette2.SecondaryColor};
  }
  .selected {
    background-color: red;
    color: ${palette2.SecondaryColor};
  }
`;
export const Navigation = ({}) => {
  return useObserver(() => (
    <NavContainer>
      <nav className="navWrap">
        <ul className="navList">
          <li>
            <NavLink
              to={"/main"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              모니터링
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/SlaveMng"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              Slave 관리
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/MasterMng"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              마스터 관리
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to={"/GroupMng"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              그룹 관리
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </NavContainer>
  ));
};

export const Navigation_EM = ({}) => {
  return useObserver(() => (
    <NavContainer_EM>
      <nav className="navWrap">
        <ul className="navList">
          <li>
            <NavLink
              to={"/main"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              모니터링
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/ProductionStatus"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              생산현황
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/FacilityMng"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              설비Item 관리
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/FacilityIPMng"}
              className={({ isActive }) => {
                return isActive ? 'activeStyle' : 'deactiveStyle';
              }}
            >
              설비그룹 관리
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavContainer_EM>
  ));
};

// export default Navigation;
