import React, { createContext } from 'react';
import styled from 'styled-components';

const RadioGroupWrapper = styled.div`
    width               : 100%;
    fieldset{
        border          : none;
        display         : flex;
        align-items     : center;
    }
`;

const RadioContext = createContext({});

const RadioGroup = ({ label, children, ...props }) => {

    return (
        <RadioGroupWrapper>
            <fieldset>
                <legend>{label}</legend>
                <RadioContext.Provider value={props}>{children}</RadioContext.Provider>
            </fieldset>
        </RadioGroupWrapper>

    );
}

export { RadioGroup, RadioContext }