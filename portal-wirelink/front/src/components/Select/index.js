import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Select } from 'antd';
import { useField } from '@unform/core';
import './styles.scss';

const { Option } = Select;
function SelectInput({
  name,
  label,
  placeholder,
  options,
  className,
}) {
  const selectRef = useRef(null);
  const {
    fieldName, defaultValue, registerField,
  } = useField(name);
  const [selectedValue, setSelectedValue] = useState();
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: () => selectedValue,
    });
  }, [fieldName, registerField, selectedValue]);
  function handleChange(value) {
    setSelectedValue(value);
  }
  return (
    <div className={`selectContainer ${className}`}>
      <span className="selectLabel">{label}</span>
      <Select
        ref={selectRef}
        defaultValue={defaultValue}
        onChange={(event, value) => { console.log(value); handleChange(value.value); }}
        className="select"
        placeholder={placeholder}
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        {options?.map((option) => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectInput;
