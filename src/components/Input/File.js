import React from 'react';

const File = ({ className, setValue, value, ...props }) => {
  return <input type="file" className={`input ${className}`} {...props} />;
};

export default File;
