import { TextField } from '@mui/material';
import { useState } from 'react';

export default function WordInput({ onBlur }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setFocused(true);
    const { value } = event.target;
    if (value.length < 16) {
      setValue(value.replace(/[^a-zçA-ZÇ]+/g, '').toUpperCase());
    }
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur(value);
  };

  return (
    <TextField
      color="success"
      error={!focused && value.length === 1}
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
