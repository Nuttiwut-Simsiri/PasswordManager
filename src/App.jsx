import 'react'
import { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { PasswordContextProvider } from './PasswordContext';
import { PasswordStorageProvider } from './PasswordStorageContext';
import HomePage from './pages/HomePage';
import MyPwPage from './pages/MyPwPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  
  
  return (
    <PasswordStorageProvider>
      <PasswordContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypassword" element={<MyPwPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </PasswordContextProvider>
    </PasswordStorageProvider>
  );
}