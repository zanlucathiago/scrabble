import { v4 } from 'uuid'
import { Alert, Box, Grid, Stack } from '@mui/material'
import { useState } from 'react'
import Word from './Word'

const buildWord = autoFocus => {
  return {
    autoFocus,
    key: v4(),
    length: 0,
    total: 0,
    word: ''
  }
}

const messages = {
  info: ['Todas as palavras são válidas! O próximo jogador perderá a vez.'],
  error: [
    'Há palavras inválidas! Você perdeu a vez.',
    'As palavras contestadas no turno anterior são válidas! Você perdeu a vez.'
  ],
  warning: ['Há palavras que precisam ser consultadas no dicionário!']
}

export default function Words ({ alert, onBlur, message }) {
  const [words, setWords] = useState([buildWord(true)])

  const handleBlur = (total, nextWord, index, focus, length) => {
    const validWords = words
      .map((word, i) => ({
        ...word,
        ...(i === index ? { length, total, word: nextWord } : {}),
        autoFocus: false
      }))
      .filter(word => word.length)
    const newWord = buildWord(focus)
    setWords([...validWords, newWord])
    handleForward(validWords)
  }

  const handleForward = validWords => {
    onBlur(
      validWords.map(word => word.word),
      validWords.some(word => word.length === 1),
      validWords.reduce((total, word) => total + word.total, 0)
    )
  }

  return (
    <Stack spacing={2} sx={{ pt: 2 }}>
      {alert && (
        <Alert variant='filled' severity={alert}>
          {messages[alert][message]}
        </Alert>
      )}
      {words.map((word, index) => (
        <Word
          key={word.key}
          autoFocus={word.autoFocus}
          onBlur={(focus, newWord, total, length) =>
            handleBlur(total, newWord, index, focus, length)
          }
        />
      ))}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8} lg={9} style={{ height: '56px' }} />
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ height: '52.5px' }}
          />
        </Grid>
      </Box>
    </Stack>
  )
}
