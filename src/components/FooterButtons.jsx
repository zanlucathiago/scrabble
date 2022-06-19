import { Button, Grid } from '@mui/material'
import ChallengeButton from './ChallengeButton'

export default function FooterButtons ({
  disabled,
  onClick,
  onValidate,
  words,
  turnSkipped
}) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ width: '100%' }}>
          <ChallengeButton
            disabled={turnSkipped || disabled}
            words={words}
            onValidate={onValidate}
          ></ChallengeButton>
        </Grid>
        <Grid item xs={6} style={{ width: '100%' }}>
          <Button
            disabled={disabled}
            style={{ width: '100%' }}
            variant='contained'
            onClick={onClick}
            color='success'
          >
            Terminar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
