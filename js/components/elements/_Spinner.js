import React from 'react';
import styled from 'styled-components';
import { palette } from '../../libs/style/_palette';
import SpinnerImg from 'Img/Spinner.png';


const SpinnerWrapper = styled.div`

    margin                      : 0 auto;

    .spinner{
        width                   : 70px;
        height                  : 70px;
        -webkit-animation       : spin 2s linear infinite;
        animation               : spin 2s linear infinite;
        background              : url(${SpinnerImg}) no-repeat center;
        background-size         : 100%;
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(-360deg); }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
    }
`;

const Spinner = ({ ...props }) => {

    return (
        <SpinnerWrapper {...props}>
            <div className='spinner' />
        </SpinnerWrapper>
    )
};

export { Spinner };