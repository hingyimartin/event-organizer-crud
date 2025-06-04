import React from 'react';

const Message = ({ type, message }) => {
  return (
    <div
      className={`${
        type === 'success'
          ? 'text-green-500'
          : type === 'error'
          ? 'text-red-500'
          : 'text-gray-500'
      } font-bold text-sm`}
    >
      {message}
    </div>
  );
};

export default Message;
