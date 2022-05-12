import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './view/container/admin';
import Client from './view/container/client';
import LoginAdmin from './view/pages/admin/LoginAdmin';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path = "/admin" element = {<LoginAdmin/>}/>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Client />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
