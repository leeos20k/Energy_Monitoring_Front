import React from "react";
import styled from "styled-components";
import { palette } from "../../libs/style/_palette";

const TankWrapper = styled.div`
  .tank {
  }

  .tankGauge {
    background-color: #62b2e4;
    /* background-color: #eb6877; */
    transform-origin: bottom;
    transform: scaleY(1); /* 초기에는 높이가 0이 되도록 설정 */
    transition: transform 0.5s ease-in-out;
  }
  .percentage {
    color: #2b2f54;
    font-size: 26px;
    font-weight: 800;
    font-family: "Pretendard";
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .percentage > span {
    font-size: 22px;
  }

  .tankNm {
    font-size: 16px;
    font-weight: 800;
    font-family: "Pretendard";
    text-align: center;
    color: #333;
    word-break: keep-all;
    display: inline-block;
  }
  .tankNm:hover {
    cursor: pointer;
  }
`;
const Tank = ({ tankNm,...props }) => {
  return (
    <TankWrapper {...props}>
      <div className="tank">
        <div className="tankGauge">
            <div className="alarmMaxLine"/>
            <div className="alarmMinLine"/>
        </div>
        <div className="percentage">
            {percentage}
        </div>
        <div className="tankNm">
          <span>{tankNm}</span>
        </div>
      </div>
    </TankWrapper>
  );
};

export { Tank };
