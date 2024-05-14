import React from "react";
import styled from "styled-components";

const ImageZoomWrapper = styled.div`
  .imageWrap {
    position: absolute;
    z-index: 12;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45vw;
    height: 45vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .imageWrap > img {
    height: 100%;
    width: 100%;
  }
  .modalCloseBtn{
    position: absolute;
    top : 30px;
    right :30px;
    z-index: 9;
  }
`;

const ImageZoom = ({ closeModal, imgUrl }) => {
  return (
    <ImageZoomWrapper>
      <div className="imageWrap">
        <img src={imgUrl} />
      </div>
      <div className="modalCloseBtn" onClick={() => closeModal()}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </ImageZoomWrapper>
  );
};

export default ImageZoom;
