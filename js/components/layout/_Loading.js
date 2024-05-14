import React from "react";
import styled from "styled-components";
import { Spinner } from "Elements";

const LoadingWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index : 12;

  .spinnerWrap {
    margin: 0 auto;
  }
`;

export const Loading = () => {
  return (
    <LoadingWrapper>
      <div className="spinnerWrap">
        <Spinner />
      </div>
    </LoadingWrapper>
  );
};
