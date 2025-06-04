import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ login, register }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };
  return (
    <div className='w-full flex items-center justify-between border-b p-6'>
      <Link to='/'>hmdev</Link>
      <div className='flex items-center gap-4'>
        <Link to='/'>Home</Link>
      </div>
      <div>
        {user ? (
          <div className='flex items-center gap-4'>
            {user.role === 'admin' && (
              <Link to='/event-management'>Event management</Link>
            )}
            <Link to='/me'>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
