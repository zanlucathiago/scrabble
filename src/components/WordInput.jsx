import { TextField } from '@mui/material';
import { useState } from 'react';

export default function WordInput({ onBlur }) {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setError(false);
    const { value } = event.target;
    if (value.length < 16) {
      setValue(value.replace(/[^a-zçA-ZÇ]+/g, '').toUpperCase());
    }
  };

  const handleBlur = () => {
    setError(value.length === 1);
    onBlur(value);
  };

  return (
    <TextField
      color="success"
      error={error}
      helperText={error && 'Palavra muito pequena'}
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
