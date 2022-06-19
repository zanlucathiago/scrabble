import { Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

const secondsPerMinute = 60

const defaultTimeout = 3 * secondsPerMinute

export default function Timer ({ player }) {
  const [time, setTime] = useState(defaultTimeout)

  const onChangePlayer = () => setTime(defaultTimeout)

  useEffect(onChangePlayer, [player])

  const onTimeout = () => time && setTime(time - 1)

  const onChangeTime = () => {
    const intervalId = setInterval(onTimeout, 1000)
    return () => clearInterval(intervalId)
  }

  useEffect(onChangeTime, [onChangeTime])

  const minutes = Math.floor(time / secondsPerMinute)

  const seconds = time % secondsPerMinute

  return (
    <Stack
      alignItems='center'
      spacing={2}
      justifyContent='space-evenly'
      direction='column'
    >
      <TextField
        size='small'
        color='success'
        inputProps={{
          style: { textAlign: 'center' }
        }}
        InputProps={{
          readOnly: true
        }}
        label='Tempo'
        style={{ width: '100%' }}
        value={`${
          minutes ? `${minutes}m ${String(seconds).padStart(2, '0')}` : seconds
        }s`}
      />
    </Stack>
  )
}
