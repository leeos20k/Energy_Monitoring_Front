import React from 'react';
import styled from 'styled-components';
import { palette,palette2 } from '../../libs/style/_palette';

const ButtonWrapper = styled.div`
   
    .button {
        width               : 100px;
        height              : 30px;
        border-radius       : 5px;
        margin-right        : 15px;
        background-color    : ${palette.PrimaryColor};
        display             : flex;
        justify-content     : center;
        align-items         : center;
        color               : white;
        font-size           : 14px;
        font-weight         : 600;
        font-family         : 'Pretendard';
    }
    :hover{
        cursor              : pointer;
    }
    .button:active{
        background-color    : ${palette.SecondaryColor};
    }

    .darkGrayButton{
        width               : 100px;
        height              : 30px;
        border-radius       : 5px;
        margin-right        : 15px;
        display             : flex;
        align-items         : center;
        justify-content     : center;
        color               : white;
        font-size           : 14px;
        font-weight         : 600;
        font-family         : 'Pretendard';
        background-color    : ${palette.DarkGray};
    }
    .darkGrayButton:active{
        background-color    : #333;
    }
    .blackButton{
        width               : 100px;
        height              : 30px;
        border-radius       : 5px;
        margin-right        : 15px;
        display             : flex;
        align-items         : center;
        justify-content     : center;
        color               : white;
        font-size           : 14px;
        font-weight         : 600;
        font-family         : 'Pretendard';
        background-color    : #333;
    }
    .blackButton:active{
        background-color    : black;
    }
 
`;
const ButtonWrapper_EM = styled.div`
   
    .button {
        width               : 100px;
        height              : 30px;
        border-radius       : 5px;
        margin-right        : 15px;
        background-color    : ${palette2.PrimaryColor};
        display             : flex;
        justify-content     : center;
        align-items         : center;
        color               : white;
        font-size           : 14px;
        font-weight         : 600;
        font-family         : 'Pretendard';
    }
    :hover{
        cursor              : pointer;
    }
    .button:active{
        background-color    : ${palette2.SecondaryColor};
    }

    .darkGrayButton{
        width               : 100px;
        height              : 30px;
        border-radius       : 5px;
        margin-right        : 15px;
        display             : flex;
        align-items         : center;
        justify-content     : center;
        color               : white;
        font-size           : 14px;
        font-weight         : 600;
        font-family         : 'Pretendard';
        background-color    : ${palette2.DarkGray};
    }
    .darkGrayButton:active{
        background-color    : #333;
    }
    .blackButton{
        width               : 100px;
        height              : 30px;
        border-radius       : 5px;
        margin-right        : 15px;
        display             : flex;
        align-items         : center;
        justify-content     : center;
        color               : white;
        font-size           : 14px;
        font-weight         : 600;
        font-family         : 'Pretendard';
        background-color    : #333;
    }
    .blackButton:active{
        background-color    : black;
    }
 
`;

const Button = ({ btnText,...props }) => {

    return (
        <ButtonWrapper {...props}>

            {props.className === 'darkGrayButton' ?
                <div className='darkGrayButton'>{btnText}</div>
                :
                props.className === 'blackButton' ?
                    <div className='blackButton'>{btnText}</div>
                    :
                    <div className='button'>{btnText}</div>
                    }
    
            
        </ButtonWrapper>
    )
};
const Button_EM = ({ btnText,...props }) => {

    return (
        <ButtonWrapper_EM {...props}>

            {props.className === 'darkGrayButton' ?
                <div className='darkGrayButton'>{btnText}</div>
                :
                props.className === 'blackButton' ?
                    <div className='blackButton'>{btnText}</div>
                    :
                    <div className='button'>{btnText}</div>
                    }
    
            
        </ButtonWrapper_EM>
    )
};


export { Button, Button_EM };