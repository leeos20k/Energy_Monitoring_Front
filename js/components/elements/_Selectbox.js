import React, { forwardRef } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { palette,palette2 } from "../../libs/style/_palette";
import Arrow from "Img/DownArrow.svg";
import Arrow2 from "Img/DownArrow_EM.svg";

const SelectboxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  label {
    width: 100px;
    color: #333;
    line-height: 34px;
    font-weight: 600;
    text-align: center;
    width: 100px;
    color: #333;
    line-height: 34px;
    font-family: "Pretendard";
    font-weight: 600;
    text-align: center;
  }
  select {
    border: 2px solid;
    border-color: ${palette.SecondaryColor};
    border-radius: 5px;
    outline: none;
    width: 125px;
    height: 34px;
    font-size: 14px;
    text-align: center;
    color: #333;
    font-family: "Pretendard";
    -o-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    background: url(${Arrow}) no-repeat 97% 50%/12px auto;
    background-color: white;
  }
  .veryShortSelect {
    width: 70px;
  }
  .shortSelect {
    width: 100px;
  }
  .mediumSelect {
    width: 170px;
  }
  .largeSelect {
    width: 220px;
  }
  .fullSelect {
    width: 100%;
  }
  .asterisk:after {
    content: " *";
    color: #f44336;
  }
`;


const SelectboxWrapper_EM = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  label {
    width: 100px;
    font-size : 18px;
    color: ${palette2.TextColor};
    line-height: 34px;
    font-family: "Pretendard";
    font-weight: 600;
    text-align: center;
  }
  select {
    border: 2px solid;
    border-color: ${palette2.SecondaryColor};
    border-radius: 5px;
    outline: none;
    width: 125px;
    height: 34px;
    font-size: 14px;
    text-align: center;
    color: #333;
    font-family: "Pretendard";
    -o-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    background: url(${Arrow2}) no-repeat 97% 50%/12px auto;
    background-color: white;
  }
  .veryShortSelect {
    width: 70px;
  }
  .shortSelect {
    width: 100px;
  }
  .mediumSelect {
    width: 170px;
  }
  .largeSelect {
    width: 220px;
  }
  .fullSelect {
    width: 100%;
  }
  .asterisk:after {
    content: " *";
    color: #f44336;
  }
`;

const Selectbox = forwardRef(({ label, icon, defaultValue, name, disabled, option = [], ...props }, ref) => {
  return (
    <SelectboxWrapper iconExist={!!icon} {...props}>
      {props.asterisk === "true" ? <label className="asterisk">{label}</label> : !label ? "" : <label>{label}</label>}
      {props.className === "fullSelect" ? (
        <select
          className="fullSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "largeSelect" ? (
        <select
          className="largeSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "mediumSelect" ? (
        <select
          className="mediumSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "shortSelect" ? (
        <select
          className="shortSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "veryShortSelect" ? (
        <select
          className="veryShortSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : (
        <select name={name} key={uuid()} defaultValue={defaultValue} required disabled={disabled} ref={ref}>
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      )}
    </SelectboxWrapper>
  );
});


const Selectbox_EM = forwardRef(({ label, icon, defaultValue, name, disabled, option = [], ...props }, ref) => {
  return (
    <SelectboxWrapper_EM iconExist={!!icon} {...props}>
      {props.asterisk === "true" ? <label className="asterisk">{label}</label> : !label ? "" : <label>{label}</label>}
      {props.className === "fullSelect" ? (
        <select
          className="fullSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "largeSelect" ? (
        <select
          className="largeSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "mediumSelect" ? (
        <select
          className="mediumSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "shortSelect" ? (
        <select
          className="shortSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : props.className === "veryShortSelect" ? (
        <select
          className="veryShortSelect"
          name={name}
          key={uuid()}
          defaultValue={defaultValue}
          required
          disabled={disabled}
          ref={ref}
        >
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      ) : (
        <select name={name} key={uuid()} defaultValue={defaultValue} required disabled={disabled} ref={ref}>
          {option.map((v, i) => (
            <option key={i} value={v.cdV}>
              {v.cdVNm}
            </option>
          ))}
        </select>
      )}
    </SelectboxWrapper_EM>
  );
});
export { Selectbox, Selectbox_EM };
