import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
    className='w-full'
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}