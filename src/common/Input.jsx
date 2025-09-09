import React from 'react';
import styles from './Input.module.css';

const Input = ({ size = '120px', ...props }) => {
  return (
    <input 
      className={styles.input}
      style={{ width: size }}
      {...props}
    />
  );
};

export default Input;