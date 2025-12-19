import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import InitializePayment  from './Payment/initialize.jsx';
import Webhook from './Payment/webhook.jsx';
import PaymentVerify from './Payment/verify.jsx';

function App() {
  return (
    <Routes>
      <Route path="/payments" element={<InitializePayment/>} />
      <Route path="/webhook/:reference/:status" element={<Webhook/>} />
      <Route path="/verify" element={<PaymentVerify/>} />
    </Routes>
  )
}

export default App
