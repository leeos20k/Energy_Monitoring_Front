import React from 'react';
import styled from 'styled-components';
import { palette,palette2 } from '../../libs/style/_palette';

const ButtonWrapper = styled.div`
    div{
        width               : 130px;
        height              : 40px;
        border-radius       : 5px;
        position            : relative;
        display             : flex;
        align-items         : center;
    }
    p {
        display             : inline-block;
        margin              : 0 auto;
        text-align          : center;
        color               : white;
        font-size           : 20px;
        font-family         : 'Pretendard';
        font-weight         : 800;
    }
    :hover{
        cursor              : pointer;
    }
  
    .positiveBtn{
        background-color    : ${palette.PrimaryColor}
    }
    .positiveBtn:active{
        background-color    : ${palette.SecondaryColor}

    }
    .negativeBtn{
        background-color    : ${palette.NegativeColor}
    }
    .negativeBtn:active{
        background-color    : ${palette.DarkGray}
    }
    .deleteBtn{
        background-color    : #f44336;
    }
    .deleteBtn:active{
        background-color    : #ba000d;
    }


`;
const ButtonWrapper_EM = styled.div`
    div{
        width               : 130px;
        height              : 40px;
        border-radius       : 5px;
        position            : relative;
        display             : flex;
        align-items         : center;
    }
    p {
        display             : inline-block;
        margin              : 0 auto;
        text-align          : center;
        color               : white;
        font-size           : 20px;
        font-family         : 'Pretendard';
        font-weight         : 800;
    }
    :hover{
        cursor              : pointer;
    }
  
    .positiveBtn{
        background-color    : ${palette2.PrimaryColor}
    }
    .positiveBtn:active{
        background-color    : ${palette2.SecondaryColor}

    }
    .negativeBtn{
        background-color    : ${palette2.NegativeColor}
    }
    .negativeBtn:active{
        background-color    : ${palette2.DarkGray}
    }
    .deleteBtn{
        background-color    : #f44336;
    }
    .deleteBtn:active{
        background-color    : #ba000d;
    }


`;

const ButtonMedium = ({ btnText, ...props }) => {

    return (
        <ButtonWrapper {...props}>
            {props.className === 'deleteBtn' ?
                <div className='deleteBtn'>
                    <p>{btnText}</p>
                </div>
                :
                props.className === 'positiveBtn' ?
                <div className='positiveBtn'>
                    <p>{btnText}</p>
                </div>
                :
                <div className='negativeBtn'>
                    <p>{btnText}</p>
                </div>
            }
        </ButtonWrapper>
    )
};
const ButtonMedium_EM = ({ btnText, ...props }) => {

    return (
        <ButtonWrapper_EM {...props}>
            {props.className === 'deleteBtn' ?
                <div className='deleteBtn'>
                    <p>{btnText}</p>
                </div>
                :
                props.className === 'positiveBtn' ?
                <div className='positiveBtn'>
                    <p>{btnText}</p>
                </div>
                :
                <div className='negativeBtn'>
                    <p>{btnText}</p>
                </div>
            }
        </ButtonWrapper_EM>
    )
};


export { ButtonMedium , ButtonMedium_EM};