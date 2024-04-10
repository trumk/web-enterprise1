import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Preview = ({value}) => {
  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
    />
  );
}