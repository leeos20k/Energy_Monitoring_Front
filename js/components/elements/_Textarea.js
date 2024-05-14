import React from 'react';
import styled from 'styled-components';
import { palette } from '../../libs/style/_palette';

const TextareaWrapper = styled.div`
    position        : relative;
    display         : flex;
    width           : 100%;
    textarea {
        border          : 2px solid;
        border-color    : ${palette.PrimaryColor};
        border-radius   : 5px;
        outline         : none;
        padding         : 10px;
        width           : 100%;
        height          : 50px;
        font-size       : 14px;
        color           : #333;
        font-family     : 'Pretendard';
        resize          : none;
    }
    label{
        width           : 100px;
        color           : #333;
        line-height     : 34px;
        font-weight     : 600;
        text-align      : center;
        font-family     : 'Pretendard';
    }
    .textareaIcon {
        width           : 14px;
        position        : absolute;
        top             : 4px;
        right           : 0px;
        filter          : opacity(0.35);
        cursor          : pointer;
    }
    .asterisk:after{
        content         : '*';
        color           : #f44336;
    }
    .disabled{
        border          : 2px solid ${palette.DarkGray};
        opacity         : 0.5;
    }
`;

const Textarea = ({ label, icon, ...props }) => {
    return (
        <TextareaWrapper iconExist={!!icon}>
            {props.className === 'asterisk' ?
                <label className='asterisk'>{label}</label> :
                !label ?
                    '' :
                    <label>{label}</label>
            }
            {props.className === 'disabled' ?
                <textarea className='disabled'{...props} />
                :   <textarea {...props} />
            }

            <div className="textareaIcon">{icon}</div>
        </TextareaWrapper>
    )
}
export { Textarea };