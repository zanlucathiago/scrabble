import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Step,
  Stepper,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PlayerStep from './PlayerStep';
import Timer from './Timer';
import Words from './Words';

const rawPlayers = [
  {
    name: 'Carolina',
    score: 0,
  },
  {
    name: 'Thiago',
    score: 0,
  },
];

const randomize = (array) => (Math.random() < 0.5 ? array : array.reverse());

export default function Panel() {
  const [disableFinish, setDisableFinish] = useState(false);
  const [validated, setValidated] = useState(0);
  const [players, setPlayers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    setPlayers(randomize(rawPlayers));
  }, []);

  const updateScores = (player, index) => ({
    ...player,
    score:
      index === currentPlayer
        ? player.score + totalScore
        : player.score - validated * 10,
  });

  const switchPlayer = () => {
    setPlayers(players.map(updateScores));
    setCurrentPlayer(1 - currentPlayer);
    setTotalScore(0);
    setValidated(0);
  };

  const handleBlur = (disableFinish, total, validated) => {
    setDisableFinish(disableFinish);
    setTotalScore(total);
    setValidated(validated);
  };

  return (
    <Box
      sx={{ width: '100%' }}
      style={{ paddingTop: '74px', paddingBottom: '72px' }}
    >
      <Paper
        sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
        elevation={3}
        style={{ backgroundColor: '#81c784', zIndex: 2 }}
      >
        <Stack direction="row" sx={{ m: 2, ml: 0 }}>
          <Container size="xs">
            <Stack
              alignItems="stretch"
              justifyContent="space-around"
              style={{ height: '100%' }}
            >
              <Stepper activeStep={currentPlayer}>
                {players.map(({ name, score }, index) => (
                  <Step key={name} completed={false}>
                    <PlayerStep
                      key={name}
                      active={index === currentPlayer}
                      score={score}
                      totalScore={totalScore}
                      validated={validated}
                    >
                      {name}
                    </PlayerStep>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </Container>
          <Timer player={currentPlayer} />
        </Stack>
      </Paper>
      <Words key={currentPlayer} onBlur={handleBlur} />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
        style={{ backgroundColor: '#81c784', zIndex: 1 }}
      >
        <Stack direction="row" sx={{ p: 2 }} justifyContent="space-between">
          <TextField
            color="success"
            inputProps={{
              style: { textAlign: 'center' },
            }}
            size="small"
            label="Total"
            value={totalScore}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            disabled={disableFinish}
            variant="contained"
            onClick={switchPlayer}
            color="success"
          >
            Terminar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
