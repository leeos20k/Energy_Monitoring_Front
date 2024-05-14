import React from "react";
import styled from "styled-components";
import { palette,palette2 } from "../../libs/style/_palette";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  input {
    width: 50%;
    margin: 0 auto;
    border: 2px solid;
    border-color: ${palette.PrimaryColor};
    border-radius: 5px;
    outline: none;
    height: 25px;
    font-size: 14px;
    text-align: center;
    color: ${palette.TextColor};
    font-family: "Pretendard";
    padding: 0 10px;
  }
  .veryShortInput {
    width: 20%;
  }
  .shortInput {
    width: 40%;
  }
  .mediumInput {
    width: 70%;
  }
  .largeInput {
    width: 80%;
  }
  input::placeholder {
    color: #ababab;
    font-size: 14px;
  }
  input[type="date"] {
    color: ${palette.TextColor};
    font-size: 14px;
  }
  input[type="date"]::before {
    content: attr(data-placeholder);
    width: 100%;
    color: #ababab;
  }
  input[type="date"]:focus:before,
  input[type="date"]:valid:before {
    display: none;
  }
  label {
    width: 100px;
    color: ${palette.TextColor};
    line-height: 34px;
    font-family: "Pretendard";
    font-weight: 600;
    text-align: center;
  }
  .inputIcon {
    width: 20px;
    position: absolute;
    top: 6px;
    right: 5px;
    filter: opacity(0.5);
    cursor: pointer;
  }
  .asterisk:after {
    content: " *";
    color: #f44336;
  }
  .true {
    border-color: green;
    color: green;
  }
  .false {
    border-color: #f44336;
    color: #f44336;
  }
  .disabled {
    border: 2px solid ${palette.NegativeColor};
  }
`;
const InputWrapper_EM = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  input {
    width: 50%;
    margin: 0 auto;
    border: 2px solid;
    border-color: ${palette2.PrimaryColor};
    border-radius: 5px;
    outline: none;
    height: 20px;
    font-size: 14px;
    text-align: center;
    color: ${palette2.TextColor};
    font-family: "Pretendard";
    padding: 0 10px;
  }
  .veryShortInput {
    width: 20%;
  }
  .shortInput {
    width: 40%;
  }
  .mediumInput {
    width: 70%;
  }
  .largeInput {
    width: 80%;
  }
  input::placeholder {
    color: #ababab;
    font-size: 14px;
  }
  input[type="date"] {
    color: ${palette2.TextColor};
    font-size: 14px;
  }
  input[type="date"]::before {
    content: attr(data-placeholder);
    width: 100%;
    color: #ababab;
  }
  input[type="date"]:focus:before,
  input[type="date"]:valid:before {
    display: none;
  }
  label {
    width: 100px;
    color: ${palette2.TextColor};
    line-height: 30px;
    font-family: "Pretendard";
    font-weight: 600;
    text-align: center;
  }
  .inputIcon {
    width: 20px;
    position: absolute;
    top: 6px;
    right: 5px;
    filter: opacity(0.5);
    cursor: pointer;
  }
  .asterisk:after {
    content: " *";
    color: #f44336;
  }
  .true {
    border-color: green;
    color: green;
  }
  .false {
    border-color: #f44336;
    color: #f44336;
  }
  .disabled {
    border: 2px solid ${palette2.NegativeColor};
  }
`;


const TableInput = ({ label, icon, ...props }) => {
  return (
    <InputWrapper iconExist={!!icon}>
      {props.asterisk === "true" ? <label className="asterisk">{label}</label> : !label ? "" : <label>{label}</label>}

      {props.className === "LargeInput" ? (
        <input className="LargeInput" {...props} />
      ) : props.className === "mediumInput" ? (
        <input className="mediumInput" {...props} />
      ) : props.className === "shortInput" ? (
        <input className="shortInput" {...props} />
      ) : props.className === "veryShortInput" ? (
        <input className="veryShortInput" {...props} />
      ) : props.className === "disabled" ? (
        <input className="disabled" {...props} />
      ) : (
        <input {...props} />
      )}
      <div className="inputIcon">{icon}</div>
    </InputWrapper>
  );
};
const TableInput_EM = ({ label, icon, ...props }) => {
  return (
    <InputWrapper_EM iconExist={!!icon}>
      {props.asterisk === "true" ? <label className="asterisk">{label}</label> : !label ? "" : <label>{label}</label>}

      {props.className === "LargeInput" ? (
        <input className="LargeInput" {...props} />
      ) : props.className === "mediumInput" ? (
        <input className="mediumInput" {...props} />
      ) : props.className === "shortInput" ? (
        <input className="shortInput" {...props} />
      ) : props.className === "veryShortInput" ? (
        <input className="veryShortInput" {...props} />
      ) : props.className === "disabled" ? (
        <input className="disabled" {...props} />
      ) : (
        <input {...props} />
      )}
      <div className="inputIcon">{icon}</div>
    </InputWrapper_EM>
  );
};
export { TableInput,TableInput_EM };
