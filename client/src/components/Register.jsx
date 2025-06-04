import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';

const Register = ({ open, close }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
      <div className='bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Register</h2>

        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={formDataChaneHandler}
          className='w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='text'
          placeholder='Email'
          name='email'
          onChange={formDataChaneHandler}
          className='w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={formDataChaneHandler}
          className='w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Message type={message.type} message={message.message} />
        <div className='flex justify-end mt-4'>
          <button
            type='button'
            onClick={() => {
              close();
              setFormData({ username: '', email: '', password: '' });
              setMessage('');
            }}
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2'
          >
            Back
          </button>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
