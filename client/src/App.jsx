import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);
  const openRegister = () => setRegisterOpen(true);
  const closeRegister = () => setRegisterOpen(false);
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-background'>
      <Navbar login={openLogin} register={openRegister} />
      <Login open={isOpen} close={closeLogin} />
      <Register open={registerOpen} close={closeRegister} />
      <div className='w-full max-w-7xl p-10'>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
