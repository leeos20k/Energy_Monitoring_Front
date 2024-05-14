import React, { useContext } from 'react';
import { RadioContext } from './_RadioGroup';
import styled from 'styled-components';

const RadioWrapper = styled.div`
    margin-right            : 15px;

    label{
        display             : flex;
        align-items         : center;
    }
    .longRadio{
        display             : flex;
        align-items         : center;
        width               : 200px;

    }
    .veryLongRadio{
        display             : flex;
        align-items         : center;
        width               : 100%;

    }
    label:hover{
        cursor            : pointer;
    }
    input[type="radio"]{
        width             : 20px;
        height            : 20px;
    }
    
    p {
        text-align        : center;
        color             : #333;
        font-size         : 14px;
        margin-left       : 10px;
        line-height       : 34px;
        font-family       : 'Pretendard';
        font-weight       : 600;
    }
    
`;

const Radio = ({ value, name, defaultChecked, disabled, ...props }) => {

    const group = useContext(RadioContext);

    return (
        <RadioWrapper>
            {props.className === 'longRadio' ?
                <label className='longRadio'>
                    <input
                        type='radio'
                        value={value}
                        name={name}
                        disabled={disabled || group.disabled}
                        checked={group.value !== undefined ? value === group.value : undefined}
                        onChange={(e) => group.onChange && group.onChange(e.target.value)}
                        defaultChecked={defaultChecked}
                    />
                    <p>{props.radioText}</p>
                </label>
                : props.className === 'veryLongRadio' ?
                    <label className='veryLongRadio'>
                        <input
                            type='radio'
                            value={value}
                            name={name}
                            disabled={disabled || group.disabled}
                            checked={group.value !== undefined ? value === group.value : undefined}
                            onChange={(e) => group.onChange && group.onChange(e.target.value)}
                            defaultChecked={defaultChecked}
                        />
                        <p>{props.radioText}</p>
                    </label>
                    : props.className === 'inputRadio' ?
                        <label className='inputRadio'>
                            <input
                                type='radio'
                                value={value}
                                name={name}
                                disabled={disabled || group.disabled}
                                checked={group.value !== undefined ? value === group.value : undefined}
                                onChange={(e) => group.onChange && group.onChange(e.target.value)}
                                defaultChecked={defaultChecked}
                            />
                            <p>{props.radioText}</p>
                        </label>
                        :
                        <label className='radioLabel'>
                            <input
                                type='radio'
                                value={value}
                                name={name}
                                disabled={disabled || group.disabled}
                                checked={group.value !== undefined ? value === group.value : undefined}
                                onChange={(e) => group.onChange && group.onChange(e.target.value)}
                                defaultChecked={defaultChecked}
                            />
                            <p>{props.radioText}</p>
                        </label>
            }
        </RadioWrapper>
    )
};

export { Radio };