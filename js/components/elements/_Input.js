import React from "react";
import styled from "styled-components";
import { palette ,palette2} from "../../libs/style/_palette";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  input {
    border: 2px solid;
    border-color: ${palette.SecondaryColor};
    border-radius: 5px;
    outline: none;
    width: 105px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: ${palette.TextColor};
    font-family: "Pretendard";
    padding: 0 10px;
  }
  .veryShortInput {
    width: 30px;
  }
  .shortInput {
    width: 80px;
  }
  .mediumInput {
    width: 150px;
  }
  .largeInput {
    width: 200px;
  }
  .veryLargeInput {
    width: 250px;
  }
  .fullInput {
    width : 100%;
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
    line-height: 30px;
    color: #ababab;
  }
  input[type="date"]:focus:before,
  input[type="date"]:valid:before {
    display: none;
  }
  label {
    width: 100px;
    font-size : 18px;
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
    background-color: ${palette.LightGray};
  }
`;

const InputWrapper_EM = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  input {
    border: 2px solid;
    border-color: ${palette2.SecondaryColor};
    border-radius: 5px;
    outline: none;
    width: 105px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: ${palette2.TextColor};
    font-family: "Pretendard";
    padding: 0 10px;
  }
  .veryShortInput {
    width: 30px;
  }
  .shortInput {
    width: 80px;
  }
  .mediumInput {
    width: 150px;
  }
  .largeInput {
    width: 200px;
  }
  .veryLargeInput {
    width: 250px;
  }
  .fullInput {
    width : 100%;
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
    line-height: 30px;
    color: #ababab;
  }
  input[type="date"]:focus:before,
  input[type="date"]:valid:before {
    display: none;
  }
  label {
    width: 100px;
    font-size : 18px;
    color: ${palette2.TextColor};
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
    border: 2px solid ${palette2.NegativeColor};
    background-color: ${palette2.LightGray};
  }
`;

const Input = React.forwardRef(({ label, icon, ...props }, ref) => {
  return (
    <InputWrapper iconExist={!!icon}>
      {props.asterisk === "true" ? (
        <label className="asterisk">{label}</label>
      ) : !label ? (
        ""
      ) : (
        <label>{label}</label>
      )}

      {props.className === "fullInput" ? (
        <input ref={ref} className="fullInput" {...props} />
      ) : props.className === "veryLargeInput" ? (
        <input ref={ref} className="veryLargeInput" {...props} />
      ) : props.className === "largeInput" ? (
        <input ref={ref} className="largeInput" {...props} />
      ) : props.className === "mediumInput" ? (
        <input ref={ref} className="mediumInput" {...props} />
      ) : props.className === "shortInput" ? (
        <input ref={ref} className="shortInput" {...props} />
      ) : props.className === "veryShortInput" ? (
        <input ref={ref} className="veryShortInput" {...props} />
      ) : props.className === "disabled" ? (
        <input ref={ref} className="disabled" {...props} />
      ) : (
        <input ref={ref} {...props} />
      )}
      <div className="inputIcon">{icon}</div>
    </InputWrapper>
  );
});

const Input_EM = React.forwardRef(({ label, icon, ...props }, ref) => {
  return (
    <InputWrapper_EM iconExist={!!icon}>
      {props.asterisk === "true" ? (
        <label className="asterisk">{label}</label>
      ) : !label ? (
        ""
      ) : (
        <label>{label}</label>
      )}

      {props.className === "fullInput" ? (
        <input ref={ref} className="fullInput" {...props} />
      ) : props.className === "veryLargeInput" ? (
        <input ref={ref} className="veryLargeInput" {...props} />
      ) : props.className === "largeInput" ? (
        <input ref={ref} className="largeInput" {...props} />
      ) : props.className === "mediumInput" ? (
        <input ref={ref} className="mediumInput" {...props} />
      ) : props.className === "shortInput" ? (
        <input ref={ref} className="shortInput" {...props} />
      ) : props.className === "veryShortInput" ? (
        <input ref={ref} className="veryShortInput" {...props} />
      ) : props.className === "disabled" ? (
        <input ref={ref} className="disabled" {...props} />
      ) : (
        <input ref={ref} {...props} />
      )}
      <div className="inputIcon">{icon}</div>
    </InputWrapper_EM>
  );
});
export { Input , Input_EM };
