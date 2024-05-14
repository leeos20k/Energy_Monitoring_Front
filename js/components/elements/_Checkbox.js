import React from "react";
import styled from "styled-components";
import { palette } from "../../libs/style/_palette";

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  input {
    background: white;
    border-radius: 4px;
    cursor: pointer;
    height: 25px;
    width: 25px;
    outline: ${palette.PrimaryColor} solid 2px;
  }
  input[type="checkbox"] {
    -moz-appearance: none;
    -webkit-appearance: none;
    -o-appearance: none;
  }
  input[type="checkbox"]::after {
    border: solid white;
    border-width: 0 2.5px 2.5px 0;
    content: "";
    display: none;
    height: 40%;
    left: 40%;
    position: relative;
    top: 20%;
    transform: rotate(45deg);
    width: 15%;
  }
  input[type="checkbox"]:checked {
    background-color: ${palette.PrimaryColor};
    outline: none;
  }
  input[type="checkbox"]:checked::after {
    display: block;
  }
  p {
    text-align: center;
    color: #333;
    font-size: 14px;
    margin-right: 20px;
    line-height: 34px;
    font-weight: 600;
    font-family: "Pretendard";
  }
`;

const Checkbox = ({ checkboxText, checked, value, name, defaultChecked, disabled, ...props }) => {
  return (
    <CheckboxWrapper {...props}>
      <p className="checkboxLabel">{checkboxText}</p>
      <input type="checkbox" value={value} checked={checked} name={name} defaultChecked={defaultChecked} disabled={disabled} />
    </CheckboxWrapper>
  );
};

export { Checkbox };
