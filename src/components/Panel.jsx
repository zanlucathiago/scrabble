import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ChallengeButton from './ChallengeButton';
import PlayersStepper from './PlayersStepper';
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
  const [message, setMessage] = useState(0);
  const [status, setStatus] = useState(null);
  const [words, setWords] = useState([]);
  const [disableFinish, setDisableFinish] = useState(false);
  const [players, setPlayers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    setPlayers(randomize(rawPlayers));
  }, []);

  const updateScores = (player, index) => ({
    ...player,
    ...(index === currentPlayer ? { score: player.score + totalScore } : {}),
  });

  const switchPlayer = () => {
    if (status !== 'error') {
      setPlayers(players.map(updateScores));
    }
    if (status === 'info') {
      setStatus('error');
      setMessage(1);
    } else {
      setMessage(0);
      setStatus(null);
    }
    setCurrentPlayer(1 - currentPlayer);
    setTotalScore(0);
  };

  const handleBlur = (words, disableFinish, total) => {
    setWords(words);
    setDisableFinish(disableFinish);
    setTotalScore(total);
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
            <PlayersStepper
              currentPlayer={currentPlayer}
              players={players}
              status={status}
              totalScore={totalScore}
            />
          </Container>
          <Timer player={currentPlayer} />
        </Stack>
      </Paper>
      <Words
        key={currentPlayer}
        message={message}
        onBlur={handleBlur}
        alert={status}
      />
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
            value={status === 'error' ? 0 : totalScore}
            InputProps={{
              readOnly: true,
            }}
          />
          <Stack direction="row" spacing={2}>
            <ChallengeButton
              disabled={disableFinish}
              words={words}
              onValidate={setStatus}
            ></ChallengeButton>
            <Button
              disabled={disableFinish}
              variant="contained"
              onClick={switchPlayer}
              color="success"
            >
              Terminar
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
