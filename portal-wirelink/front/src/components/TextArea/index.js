import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import './styles.scss';

export default function Textarea({
  name, label, rows = 5, cols, cor, ...rest
}) {
  const textareaRef = useRef(null);
  const {
    fieldName, defaultValue = '', registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <div
      className={`textAreaContainer ${cor}`}
    >
      <label htmlFor={name} className="labeltTA">
        <span>{label}</span>
        <textarea
          ref={textareaRef}
          id={fieldName}
          defaultValue={defaultValue}
          rows={rows}
          cols={cols}
          className="textArea"
          {...rest}
        />
      </label>
    </div>
  );
}
