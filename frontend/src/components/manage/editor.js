import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Editor = ({ value, onChange, className }) => {
  return (
    <ReactQuill
    className={className}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}