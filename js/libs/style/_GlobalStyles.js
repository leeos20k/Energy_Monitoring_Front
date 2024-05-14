import { createGlobalStyle } from "styled-components";
import { palette ,palette2} from "./_palette";

const GlobalStyles = createGlobalStyle`
    * {  
        margin              :0;
        padding             :0;
    }
    html {
        scroll-behavior     :smooth;
    }
    /*
    html::-webkit-scrollbar {
        display             : none;
    } */
    body {
        -webkit-user-select : none;
        -moz-user-select    : none;
        -ms-user-select     : none;
        user-select         : none;
        font-family         : "Pretendard", "Noto Sans KR",;
        font-size           : 14px;
        color               : #262626;

 
    }
    img {
        vertical-align      : middle;
    }
    li{
        list-style          : none;
    }
    a {
        text-decoration     : none;
    }
    .clearfix:after {
        content             : "";
        display             : block;
        clear               : both;
    }

    //table common css

    .tableWrap{
        width               : 100%;
        overflow            : auto;
    }
    table {
        width               : 100%;
        text-align          : center;
        border-collapse     : separate;
        border-spacing      : 0;
    }
    thead{
        position            : sticky;
        top                 : 0;
        z-index             : 9;
    }
    .tableHeadRow {
        background-color    : #e5fbfc;
        border-bottom       : 0;
    }     
    .theadSpan > th {
        border-top          : 1px solid #136165;
    }

    .tableHead {
        color               : #136165;
        font-family         : 'Pretendard-Bold';
        font-size           : 16px;
        text-align          : center;
        padding             : 10px 0;

    }
    .tableData {
        color               : #136165;
        font-family         : 'Pretendard-Bold';
        font-size           : 16px;
        text-align          : center;
        border-bottom       : 0.5px solid ${palette.LightGray};
        padding             : 10px 0;

    }
    tr:hover:not(thead>tr,.noneDataTr){
        background-color    : lemonchiffon;
    }
    .onClickTd{
        display             : inline-block;
        color               : ${palette.PrimaryColor};
        border-bottom       : 1px solid ${palette.PrimaryColor};
    }
    .onClickTd:hover{
        cursor              : pointer;
    }
    .onClickTd:active{
        color              : ${palette.TertiaryColor};
        border-bottom       : 1px solid ${palette.TertiaryColor};
    }
    .noneData{
        height              : 45vh;
        font-size           : 24px;
        color               : rgba(0,0,0,0.3);
    }
    .noneDataShort{
        height              : 40vh;
        font-size           : 24px;
        color               : rgba(0,0,0,0.3)
    }

    .checkTd{
        width              : 80px;
    }

   //subPage style

    .subPageTitle{
        width               : 95%;
        margin              : 0 auto;
        margin-bottom       : 20px;
        
    }
    .subPageTitleText{
        border-left         : 5px solid ${palette.SecondaryColor};
        padding-left        : 10px;
        font-size           : 22px;
        font-weight         : 700;
        font-family         : 'Pretendard';
        color               : ${palette.SecondaryColor};
    }
    .subPageBtnWrap{
        width               : 300px;
        display             : flex;
        justify-content     : space-around;
        margin              : 50px auto;
    }
    #listViewPagination{
        display             : flex;
        justify-content     : center;
        align-items         : center;
        margin-top          : 20px;
    }
    
    //checkbox style
    input[type="checkbox"]{
    background              : white;
    border-radius           : 4px;
    cursor                  : pointer;
    height                  : 20px;
    width                   : 20px;
    outline                 : ${palette.PrimaryColor} solid 2px;
    }

    input[type="checkbox"] {
        -moz-appearance     : none;
        -webkit-appearance  : none;
        -o-appearance       : none;
    }
    input[type="checkbox"]::after {
        border              : solid white;
        border-width: 0 2.5px 2.5px 0;
        content             : "";
        display             : none;
        height              : 40%;
        left                : 40%;
        position            : relative;
        top                 : 20%;
        transform           : rotate(45deg);
        width               : 15%;
    }
    input[type="checkbox"]:checked {
        background-color    : ${palette.PrimaryColor};
        outline             : none;
    }
    input[type="checkbox"]:checked::after {
        display             : block;
    }
    

    //modal common css

    .modalBox{
        background-color    : white;
        border-radius       : 5px;
        box-shadow          : 5px 5px 15px rgba(0, 0, 0, 0.5);
        z-index             : 2;
        max-height          : 95vh;
        overflow            : auto;
        scroll-behavior     : smooth;
        -ms-overflow-style  : none;
    }

    /* .modalBox::-webkit-scrollbar {
        display             : none;
    } */
    .titleSection {
        width               : 100%;
        height              : 70px;
        background-color    : #70ced3;
        display             : flex;
        flex-direction      : row;
        align-items         : center;
  }
    .modalTitle{
        display             : flex;
        align-items         : center;
        justify-content     : space-between;
        font-size           : 24px;
        color               : white;
        width               : 95%;
        margin              : 0 auto;
        font-weight         : 700;
    }
    .modalCloseBtn{
        color               : white;
        font-size           : 30px;
    }
  
  
   

    //loading css

    .loading{
        height              : 45vh;
        display             : flex;
        justify-content     : center;
        align-items         : center;
    }
    

    
    
`;
const GlobalStyles2 = createGlobalStyle`
    * {  
        margin              :0;
        padding             :0;
    }
    html {
        scroll-behavior     :smooth;
    }
    /*
    html::-webkit-scrollbar {
        display             : none;
    } */
    body {
        -webkit-user-select : none;
        -moz-user-select    : none;
        -ms-user-select     : none;
        user-select         : none;
        font-family         : "Pretendard", "Noto Sans KR",;
        font-size           : 14px;
        color               : #262626;

 
    }
    img {
        vertical-align      : middle;
    }
    li{
        list-style          : none;
    }
    a {
        text-decoration     : none;
    }
    .clearfix:after {
        content             : "";
        display             : block;
        clear               : both;
    }

    //table common css

    .tableWrap{
        width               : 100%;
        overflow            : auto;
    }
    table {
        width               : 100%;
        text-align          : center;
        border-collapse     : collapse;
        border-spacing      : 0;
        table-layout        : fixed;
    }
    thead{
        position            : sticky;
        top                 : 0;
        z-index             : 9;
    }
    .tableHeadRow {
        background-color    : ${palette2.TertiaryColor};
        border-bottom       : 0;
    }     
    .theadSpan > th {
        border-top          : 1px solid ${palette2.SecondaryColor};
    }

    .tableHead {
        color               : ${palette2.SecondaryColor};
        font-family         : 'Pretendard-Bold';
        font-size           : 14px;
        text-align          : center;
        padding             : 8px 0;
        border              : 1px solid ${palette2.SecondaryColor};

    }
    .tableData {
        color               : ${palette2.SecondaryColor};
        font-family         : 'Pretendard-Bold';
        font-size           : 14px;
        text-align          : center;
        border              : 1px solid ${palette2.SecondaryColor};
        padding             : 8px 0;

    }
    tr:hover:not(thead>tr,.noneDataTr){
        background-color    : lemonchiffon;
    }
    .onClickTd{
        display             : inline-block;
        color               : ${palette2.PrimaryColor};
        border-bottom       : 1px solid ${palette2.PrimaryColor};
    }
    .onClickTd:hover{
        cursor              : pointer;
    }
    .onClickTd:active{
        color              : ${palette2.TertiaryColor};
        border-bottom       : 1px solid ${palette2.TertiaryColor};
    }
    .noneData{
        height              : 45vh;
        font-size           : 24px;
        color               : rgba(0,0,0,0.3);
    }
    .noneDataShort{
        height              : 40vh;
        font-size           : 24px;
        color               : rgba(0,0,0,0.3)
    }

    .checkTd{
        width              : 80px;
    }

   //subPage style

    .subPageTitle{
        width               : 95%;
        margin              : 0 auto;
        margin-bottom       : 20px;
        
    }
    .subPageTitleText{
        border-left         : 5px solid ${palette2.SecondaryColor};
        padding-left        : 10px;
        font-size           : 22px;
        font-weight         : 700;
        font-family         : 'Pretendard';
        color               : ${palette2.SecondaryColor};
    }
    .subPageBtnWrap{
        width               : 300px;
        display             : flex;
        justify-content     : space-around;
        margin              : 50px auto;
    }
    #listViewPagination{
        display             : flex;
        justify-content     : center;
        align-items         : center;
        margin-top          : 20px;
    }
    
    //checkbox style
    input[type="checkbox"]{
    background              : white;
    border-radius           : 4px;
    cursor                  : pointer;
    height                  : 20px;
    width                   : 20px;
    outline                 : ${palette2.PrimaryColor} solid 2px;
    }

    input[type="checkbox"] {
        -moz-appearance     : none;
        -webkit-appearance  : none;
        -o-appearance       : none;
    }
    input[type="checkbox"]::after {
        border              : solid white;
        border-width: 0 2.5px 2.5px 0;
        content             : "";
        display             : none;
        height              : 40%;
        left                : 40%;
        position            : relative;
        top                 : 20%;
        transform           : rotate(45deg);
        width               : 15%;
    }
    input[type="checkbox"]:checked {
        background-color    : ${palette2.PrimaryColor};
        outline             : none;
    }
    input[type="checkbox"]:checked::after {
        display             : block;
    }
    

    //modal common css

    .modalBox{
        background-color    : white;
        border-radius       : 5px;
        box-shadow          : 5px 5px 15px rgba(0, 0, 0, 0.5);
        z-index             : 2;
        max-height          : 95vh;
        overflow            : auto;
        scroll-behavior     : smooth;
        -ms-overflow-style  : none;
    }

    /* .modalBox::-webkit-scrollbar {
        display             : none;
    } */
    .titleSection {
        width               : 100%;
        height              : 70px;
        background-color    : ${palette2.PrimaryColor};
        display             : flex;
        flex-direction      : row;
        align-items         : center;
  }
    .modalTitle{
        display             : flex;
        align-items         : center;
        justify-content     : space-between;
        font-size           : 24px;
        color               : white;
        width               : 95%;
        margin              : 0 auto;
        font-weight         : 700;
    }
    .modalCloseBtn{
        color               : white;
        font-size           : 30px;
    }
  
  
   

    //loading css

    .loading{
        height              : 45vh;
        display             : flex;
        justify-content     : center;
        align-items         : center;
    }
    

    
    
`;


export { GlobalStyles,GlobalStyles2 };
