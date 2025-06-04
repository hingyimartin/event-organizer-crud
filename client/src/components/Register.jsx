import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import registerImage from '../images/register.svg';

const Register = ({ open, close }) => {
  const [isOrganizer, setIsOrganizer] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState({
    type: '',
    message: '',
  });

  const formDataChaneHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if ((!formData.username || !formData.email) && !formData.password)
        return setMessage({ type: 'error', message: 'All fields required' });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        setMessage({
          type: 'error',
          message: 'Unexpected error',
        });
      }

      close();

      navigate('/');
    } catch (error) {
      setMessage({
        type: 'error',
        message: 'Unexpected error',
      });
    }
  };

  if (!open) return null;
  return (
    <form
      onSubmit={submitForm}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    >
      <div className='bg-white rounded-2xl w-[50%] h-[50%] flex'>
        {/* left */}
        <div className='w-1/2 h-full flex flex-col justify-between p-8'>
          <h1 className='text-2xl font-semibold text-center'>Register</h1>
          <h2 className='text-center text-4xl text-primary font-extrabold'>
            Event Organizer
          </h2>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={formDataChaneHandler}
              className='w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={formDataChaneHandler}
              className='w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={formDataChaneHandler}
              className='w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
            <div className='flex items-center gap-4'>
              <label className='text-sm'>register as</label>
              <span
                className={`font-medium ${
                  !isOrganizer
                    ? 'text-primary underline underline-offset-8'
                    : ''
                }`}
              >
                User
              </span>

              <button
                type='button'
                onClick={() => {
                  const selectedRole = !isOrganizer ? 'organizer' : 'user';
                  setIsOrganizer(!isOrganizer);
                  setFormData((prev) => ({
                    ...prev,
                    role: selectedRole,
                  }));
                }}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  isOrganizer ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform duration-300 ${
                    isOrganizer ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>

              <span
                className={`font-medium ${
                  isOrganizer ? 'text-primary underline underline-offset-8' : ''
                }`}
              >
                Organizer
              </span>
            </div>
            <Message type={message.type} message={message.message} />
          </div>
          <div className='w-full flex items-center gap-4'>
            <button
              type='button'
              onClick={() => {
                close();
                setFormData({
                  username: '',
                  email: '',
                  password: '',
                  role: '',
                });
                setIsOrganizer(false);
                setMessage('');
              }}
              className='bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg w-1/2'
            >
              Back
            </button>
            <button className='bg-primary hover:bg-accent text-white py-2 rounded-lg w-1/2'>
              Register
            </button>
          </div>
        </div>
        {/* right */}
        <div className='w-1/2 flex items-center justify-center bg-primary rounded-r-2xl'>
          <img className='w-[70%] h-[70%]' src={registerImage} alt='Register' />
        </div>
      </div>
    </form>
  );
};

export default Register;
