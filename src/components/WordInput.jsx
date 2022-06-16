import { TextField } from '@mui/material';
import { useState } from 'react';

export default function WordInput({ onBlur }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length < 16) {
      setValue(value.replace(/[^a-zçA-ZÇ]+/g, '').toUpperCase());
    }
  };

  const handleBlur = () => {
    onBlur(value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <TextField
      color="success"
      onClick={handleClick}
      size="small"
      label="Palavra"
      InputProps={{ style: { width: '217px' } }}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      variant="outlined"
    />
  );
}
