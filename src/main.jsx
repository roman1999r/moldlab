// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {HashRouter} from 'react-router-dom';
// import App from './App';
// import './styles.css';
// import { AuthProvider } from './context/AuthContext';
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode><HashRouter><AuthProvider>
//         <App />
//     </AuthProvider></HashRouter></React.StrictMode>);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import './styles.css';
import AnalyticsTracker from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <BrowserRouter basename="/moldlab">
                {/*<AnalyticsTracker />*/}
                <LanguageProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </LanguageProvider>
            </BrowserRouter>
    </React.StrictMode>
);