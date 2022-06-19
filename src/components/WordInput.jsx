import CloseIcon from '@mui/icons-material/Close'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

export default function WordInput ({ autoFocus, onBlur }) {
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = event => {
    setError(false)
    const { target } = event
    if (target.value.length < 16) {
      setValue(target.value.replace(/[^a-zçA-ZÇ]+/g, '').toUpperCase())
    }
  }

  const handleBlur = () => {
    forward(false)
  }

  const forward = focus => {
    setError(value.length === 1)
    onBlur(value, focus)
  }

  const keyPress = event => {
    if ([9, 13].includes(event.keyCode)) {
      forward(true)
    }
  }

  const handleClick = () => {
    setValue('')
    onBlur('', true)
  }

  return (
    <TextField
      key={autoFocus}
      autoFocus={autoFocus}
      color='success'
      error={error}
      helperText={error && 'Palavra muito pequena'}
      onKeyDown={keyPress}
      size='small'
      label='Palavra'
      InputProps={{
        endAdornment: value.length ? (
          <InputAdornment position='end'>
            <IconButton onClick={handleClick} edge='end'>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
        style: { width: '100%' }
      }}
      onBlur={handleBlur}
      onChange={handleChange}
      style={{ width: '100%' }}
      value={value}
      variant='outlined'
    />
  )
}
