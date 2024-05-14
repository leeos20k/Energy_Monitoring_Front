import React from 'react';
import styled from 'styled-components';
import { palette } from '../../libs/style/_palette';

const ButtonWrapper = styled.div`
    button{
        width               : 100%;
        height              : 60px;
        border-radius       : 10px;
        position            : relative;
        display             : flex;
        align-items         : center;
        background-color    : ${palette.PrimaryColor};
        border              : none;
    }
    button:active{
        background-color    : ${palette.SecondaryColor};

    }
    p {
        display             : inline-block;
        margin              : 0 auto;
        text-align          : center;
        color               : white;
        font-size           : 26px;
        font-family         : 'Pretendard';
        font-weight         : 800;
    }
    :hover{
        cursor              : pointer;
    }
    
  

`;

const LoginButton = ({ btnText, ...props }) => {

    return (
        <ButtonWrapper {...props}>
                <button>
                    <p>{btnText}</p>
                </button>
            
        </ButtonWrapper>
    )
};

export { LoginButton };