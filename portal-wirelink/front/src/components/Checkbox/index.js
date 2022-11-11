import React, {
  useEffect,
  useRef,
} from 'react';
import { useField } from '@unform/core';
import './styles.scss';

function Checkbox({
  name,
  options,
  ...rest
}) {
  const checkboxRef = useRef([]);
  const {
    fieldName, registerField, defaultValue = [],
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      getValue: (refs) => refs.filter((ref) => ref.checked).map((ref) => ref.value),
      clearValue: (refs) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <div className="checkboxContainer">
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id} className="checkboxLabel">
          <input
            defaultChecked={defaultValue.find((dv) => dv === option.id)}
            ref={(ref) => {
              checkboxRef.current[index] = ref;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default Checkbox;
