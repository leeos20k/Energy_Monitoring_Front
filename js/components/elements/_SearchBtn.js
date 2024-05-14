import React from "react";
import styled from 'styled-components';
import { palette,palette2 } from "../../libs/style/_palette";

const Container = styled.div`
  display                     : inline-block;
  background-color            : ${palette.PrimaryColor};
  min-width                   : 34px;
  height                      : 34px;
  border-radius               : 8px;
  font-size                   : 16px;
  color                       : white;
  text-align                  : center;
  line-height                 : 34px;
  
  :active{
    background-color          : ${palette.SecondaryColor};
  }
  
`;

const Container_EM = styled.div`
  display                     : inline-block;
  background-color            : ${palette2.PrimaryColor};
  min-width                   : 34px;
  height                      : 34px;
  border-radius               : 8px;
  font-size                   : 16px;
  color                       : white;
  text-align                  : center;
  line-height                 : 34px;
  
  :active{
    background-color          : ${palette2.SecondaryColor};
  }
  
`;

const SearchBtn = ({ ...props }) => {
  return (
    <Container {...props}>
      <i className="fa-solid fa-magnifying-glass" />
    </Container>
  )
};

const SearchBtn_EM = ({ ...props }) => {
  return (
    <Container_EM {...props}>
      <i className="fa-solid fa-magnifying-glass" />
    </Container_EM>
  )
};

export { SearchBtn,SearchBtn_EM };