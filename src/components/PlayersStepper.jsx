import { Stack, Step, Stepper } from '@mui/material'
import PlayerStep from './PlayerStep'

export default function PlayersStepper ({
  currentPlayer,
  players,
  status,
  totalScore
}) {
  return (
    <Stack
      alignItems='stretch'
      justifyContent='space-around'
      style={{ height: '100%' }}
    >
      <Stepper activeStep={currentPlayer}>
        {players.map(({ name, score }, index) => (
          <Step key={name} completed={false}>
            <PlayerStep
              key={name}
              score={score}
              totalScore={totalScore}
              valid={index === currentPlayer && status !== 'error'}
            >
              {name}
            </PlayerStep>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
