import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootNode = document.getElementById('root');
const rendering = () => {
    ReactDOM.createRoot(rootNode).render(
        <App />
    );
}
rendering();