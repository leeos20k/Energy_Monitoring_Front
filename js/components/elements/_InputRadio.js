import React, { useContext } from 'react';
import { RadioContext } from './_RadioGroup';
import styled from 'styled-components';
import { palette } from '../../libs/style/_palette';


const RadioWrapper = styled.div`
    margin-right            : 15px;

    label{
        display             : flex;
        align-items         : center;
    }
    
    label:hover{
        cursor            : pointer;
    }
    
    input[type="radio"]{
        width             : 20px;
        height            : 20px;
    }
    input[type="text"]{
        border              : 2px solid;
        border-color        : ${palette.PrimaryColor};
        border-radius       : 8px;
        outline             : none;
        height              : 30px;
        font-size           : 14px;
        text-align          : center;
        color               : #333;
        font-family         : 'Pretendard';
        padding             : 0 10px;
    }
    p {
        text-align          : center;
        color               : #333;
        font-size           : 14px;
        margin-left         : 10px;
        line-height         : 34px;
        font-family         : 'Pretendard';
        font-weight         : 600;
        margin-right        : 10px;
    }
    .inputRadio>input[type='text']{
        width               : 80px;
    }
    .mediumInputRadio>input[type="text"]{
        width               : 100px;
    }
    .largeInputRadio>input[type="text"]{
        width               : 400px; 
    }
    .shortInputRadio>input[type="text"]{
        width               : 30px;
    }

`;

const InputRadio = ({ radioText,backRadioText, value, name, defaultChecked, disabled, ...props }) => {

    const group = useContext(RadioContext);

    return (
        <RadioWrapper>
            {props.className === 'mediumInputRadio' ?
                <label className='mediumInputRadio'>
                    <input
                        type='radio'
                        value={value}
                        name={name}
                        disabled={disabled || group.disabled}
                        checked={group.value !== undefined ? value === group.value : undefined}
                        onChange={(e) => group.onChange && group.onChange(e.target.value)}
                        defaultChecked={defaultChecked}
                    />
                    <p>{radioText}</p>
                    <input type='text'{...props} />
                    <p>{backRadioText}</p>

                </label>
                : props.className === 'largeInputRadio' ?
                    <label className='largeInputRadio'>
                        <input
                            type='radio'
                            value={value}
                            name={name}
                            disabled={disabled || group.disabled}
                            checked={group.value !== undefined ? value === group.value : undefined}
                            onChange={(e) => group.onChange && group.onChange(e.target.value)}
                            defaultChecked={defaultChecked}
                        />
                        <p>{radioText}</p>
                        <input type='text'{...props} />
                        <p>{backRadioText}</p>

                    </label>
                    : props.className === 'shortInputRadio' ?
                        <label className='shortInputRadio'>
                            <input
                                type='radio'
                                value={value}
                                name={name}
                                disabled={disabled || group.disabled}
                                checked={group.value !== undefined ? value === group.value : undefined}
                                onChange={(e) => group.onChange && group.onChange(e.target.value)}
                                defaultChecked={defaultChecked}
                            />
                            <p>{radioText}</p>
                            <input type='text'{...props} />
                            <p>{backRadioText}</p>

                        </label>
                        :
                        <label className='InputRadio'>
                            <input
                                type='radio'
                                value={value}
                                name={name}
                                disabled={disabled || group.disabled}
                                checked={group.value !== undefined ? value === group.value : undefined}
                                onChange={(e) => group.onChange && group.onChange(e.target.value)}
                                defaultChecked={defaultChecked}
                            />
                            <p>{radioText}</p>
                            <input type='text' {...props} />
                            <p>{backRadioText}</p>

                        </label>
            }
        </RadioWrapper>
    )
};

export { InputRadio };