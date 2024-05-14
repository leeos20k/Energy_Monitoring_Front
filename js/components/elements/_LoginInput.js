import React from 'react';
import styled from 'styled-components';
import { palette } from '../../libs/style/_palette';

const InputWrapper = styled.div`
    position        : relative;
    
    input {
        width           : 100%;
        height          : 70px;
        border          : 2px solid ${palette.PrimaryColor};
        border-radius   : 10px;
        outline         : none;
        font-size       : 20px;
        text-align      : center;
        color           : #333;
        font-family     : 'Pretendard';
    }

    input::placeholder{
        color           : #ababab;
        font-size       : 20px;
    }
   
   
    label{
        position        : absolute;
        top             : 5px;
        left            : 10px;
        color           : ${palette.PrimaryColor};
        font-size       : 14px;
        font-family     : 'Pretendard';
        font-weight     : 600;
       
    }
    .inputIcon {
        width           : 26px;
        position        : absolute;
        top             : 27px;
        right           : 10px;
        filter          : opacity(0.35);
        cursor          : pointer;
    }
    .inputIcon:active{
        filter          : opacity(0.7);

    }
    .inputIcon>img{
        width           : 100%;
    }
   
 
`;

const LoginInput = ({ label, icon, ...props }) => {
    return (
        <InputWrapper iconExist={!!icon}>
           
            <label>{label}</label>
            <input {...props} />
            <div className="inputIcon">{icon}</div>

        </InputWrapper>
    )
}
export { LoginInput };