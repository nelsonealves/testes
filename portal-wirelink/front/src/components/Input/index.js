import React, {
  useEffect,
  useRef,
} from 'react';
import { useField } from '@unform/core';
import './styles.scss';

function Input({
  name,
  label,
  containerStyle = {},
  cor,
  ...rest
}) {
  const inputRef = useRef(null);
  const {
    fieldName, defaultValue, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <div
      style={containerStyle}
      className={`inputContainer ${cor}`}
    >
      <label htmlFor={name} className="label">
        <span>{label}</span>
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          className="input"
          {...rest}
        />
      </label>
    </div>
  );
}

export default Input;
