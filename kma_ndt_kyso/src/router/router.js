import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MainLayout = React.lazy(() => import('../layout/MainLayout'));

const TapRouter = () => (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<MainLayout />} />
            </Routes>
        </BrowserRouter>
    );

export default TapRouter;
