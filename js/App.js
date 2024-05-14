import React from 'react';
import Pages from 'Pages';
import styled from 'styled-components';
import { GlobalStyles ,GlobalStyles2} from 'Style';
import { authStore } from "Store";

const Container = styled.div`

`

const App = () => {
    //* 새로고침 시 초기화 */
    const initializeStore = () => {
        if(!!sessionStorage) {
            const userInfo = sessionStorage.getItem('userInfo');
            if(userInfo === null || userInfo === undefined) return false;
            authStore.setAuthInfo(JSON.parse(sessionStorage['userInfo']));
        }
    }
    
    //* 페이지 랜딩 시 초기화 */
    React.useEffect(() => {
        initializeStore();
    }, []);

    return (
        <Container>
            {/* 에너지 모니터링 프로젝트에서는 Globalstyles2 로 적용합니다. */}
            <GlobalStyles2 />
            <Pages />
            <div id='root-modal' />
        </Container>
    )
}
export default App;