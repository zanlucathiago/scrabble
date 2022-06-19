import { Button, Grid, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import WordInput from './WordInput'

const multipliers = [
  {
    value: 1,
    color: 'success'
  },
  {
    value: 2,
    badgeContent: '2x',
    textColor: 'white'
  },
  {
    value: 3,
    badgeContent: '3x',
    color: 'error',
    textColor: 'white'
  }
]

export default function Column ({
  autoFocus,
  handleBlur,
  onClickMultiplier,
  sum
}) {
  const [multiplier, setMultiplier] = useState(0)

  const handleClickMultiplier = () => {
    const value = multiplier === 2 ? 0 : multiplier + 1
    setMultiplier(value)
    onClickMultiplier(multipliers[value].value)
  }

  const { badgeContent, color } = multipliers[multiplier]

  return (
    <Grid container spacing={2}>
      <Grid item style={{ width: '100%' }}>
        <WordInput autoFocus={autoFocus} onBlur={handleBlur} />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={6} style={{ width: '100%' }}>
            <Stack
              spacing={2}
              justifyContent='space-around'
              style={{ height: '100%' }}
            >
              <Button
                color={color}
                disabled={!sum}
                onClick={handleClickMultiplier}
                style={{ width: '100%' }}
                variant='contained'
              >
                Bônus {badgeContent}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={6} style={{ width: '100%' }}>
            <TextField
              color='success'
              size='small'
              label='Pontos'
              style={{ width: '100%' }}
              value={sum}
              inputProps={{
                style: { textAlign: 'center' }
              }}
              InputProps={{
                readOnly: true,
                style: { width: '100%' }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
