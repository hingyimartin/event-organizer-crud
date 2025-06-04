import React from 'react';

const Message = ({ type, message }) => {
  return (
    <div
      className={`${
        type === 'success'
          ? 'text-green-500'
          : type === 'error'
          ? 'text-primary'
          : 'text-gray-500'
      } font-bold text-sm mt-2`}
    >
      {message}
    </div>
  );
};

export default Message;
