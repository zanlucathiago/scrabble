import { Container, Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import FooterButtons from './FooterButtons'
import PlayersStepper from './PlayersStepper'
import Timer from './Timer'
import TotalField from './TotalField'
import Words from './Words'

const rawPlayers = [
  {
    name: 'Carolina',
    score: 0
  },
  {
    name: 'Thiago',
    score: 0
  }
]

const randomize = array => (Math.random() < 0.5 ? array : array.reverse())

export default function Panel () {
  const [message, setMessage] = useState(0)
  const [status, setStatus] = useState(null)
  const [words, setWords] = useState([])
  const [disableFinish, setDisableFinish] = useState(false)
  const [players, setPlayers] = useState([])
  const [totalScore, setTotalScore] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(0)

  useEffect(() => {
    setPlayers(randomize(rawPlayers))
  }, [])

  const updateScores = (player, index) => ({
    ...player,
    ...(index === currentPlayer ? { score: player.score + totalScore } : {})
  })

  const switchPlayer = () => {
    if (status !== 'error') {
      setPlayers(players.map(updateScores))
    }
    if (status === 'info') {
      setStatus('error')
      setMessage(1)
    } else {
      setMessage(0)
      setStatus(null)
    }
    setCurrentPlayer(1 - currentPlayer)
    setTotalScore(0)
  }

  const handleBlur = (newWords, disable, total) => {
    setWords(newWords)
    setDisableFinish(disable)
    setTotalScore(total)
  }

  return (
    <Container>
      <Paper
        sx={{ position: 'fixed', top: 0, left: 0, right: 0, p: 2 }}
        elevation={3}
        style={{ backgroundColor: '#81c784', zIndex: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PlayersStepper
              currentPlayer={currentPlayer}
              players={players}
              status={status}
              totalScore={totalScore}
            />
          </Grid>
          <Grid item xs={0} sm={0} md={4} lg={6} style={{ padding: 0 }} />
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Timer player={currentPlayer} />
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={8}
            lg={9}
            style={{ height: '58.2px' }}
          />
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ height: '56px' }} />
        </Grid>
      </Box>
      <Words
        key={currentPlayer}
        message={message}
        onBlur={handleBlur}
        alert={status}
      />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2 }}
        elevation={3}
        style={{ backgroundColor: '#81c784', zIndex: 1 }}
      >
        <Grid container spacing={2}>
          <TotalField value={status === 'error' ? 0 : totalScore} />
          <Grid item xs={0} sm={0} md={4} lg={6} style={{ padding: 0 }} />
          <FooterButtons
            turnSkipped={message}
            disabled={disableFinish}
            onClick={switchPlayer}
            onValidate={setStatus}
            words={words}
          />
        </Grid>
      </Paper>
    </Container>
  )
}
