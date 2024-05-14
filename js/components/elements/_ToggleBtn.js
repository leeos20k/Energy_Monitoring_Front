import React from 'react';
import styled from 'styled-components';
import { palette } from '../../libs/style/_palette';

const ButtonWrapper = styled.div`
    display                     : inline-block;
    width                       : 30px;
    height                      : 30px;
    border-radius               : 20px;
    font-size                   : 16px;
    color                       : #333;
    text-align                  : center;
    line-height                 : 34px;  

    :hover{
        cursor                  : pointer;
    }
    :active{
        background-color        : #e9e9e9;
        color                   : white;
    }

`;


const ToggleBtn = ({ ...props }) => {

    return (
        <ButtonWrapper {...props}>


            {props.className === 'hideBtn' ?
                <i className="fa-solid fa-chevron-up" />
                : props.className === 'showBtn' ?
                    <i className="fa-solid fa-chevron-down" />
                    : <i className="fa-solid fa-chevron-up" />
            }
        </ButtonWrapper>
    )
};

export { ToggleBtn };