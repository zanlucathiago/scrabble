import { Card, CardContent, Grid, Stack } from '@mui/material'
import { useState } from 'react'
import { get } from '../services/score'
import Column from './Column'
import Letters from './Letters'

export default function Word ({ autoFocus, onBlur }) {
  const [word, setWord] = useState('')
  const [multiplier, setMultiplier] = useState(1)
  const [sum, setSum] = useState(0)
  const [letters, setLetters] = useState([])

  const handleBlur = (newWord, focus) => {
    setWord(newWord)
    const letterList = [...newWord].map(letter => {
      const score = get(letter)
      return {
        score,
        value: letter,
        total: score
      }
    })
    handleForward(letterList, multiplier, focus, newWord)
  }

  const handleForward = (letterList, wordMultiplier, focus, newWord) => {
    setLetters(letterList)
    const newSum =
      wordMultiplier *
      (letterList.length === 1
        ? 0
        : letterList.reduce((total, letter) => total + letter.total, 0))
    setSum(newSum)
    onBlur(focus, newWord, newSum, letterList.length)
  }

  const handleClick = (letterMultiplier, index) => {
    const letterList = letters.map((letter, i) =>
      i === index
        ? { ...letter, total: letter.score * letterMultiplier }
        : letter
    )
    handleForward(letterList, multiplier, false, word)
  }

  const handleClickMultiplier = wordMultiplier => {
    setMultiplier(wordMultiplier)
    handleForward(letters, wordMultiplier, false, word)
  }

  return (
    <Card style={{ backgroundColor: '#a5d6a7' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Column
              autoFocus={autoFocus}
              handleBlur={handleBlur}
              onClickMultiplier={handleClickMultiplier}
              sum={sum}
            />
          </Grid>
          <Grid item md={4} lg={6} style={{ padding: 0 }} />
          {word && (
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <Stack
                alignItems='stretch'
                justifyContent='space-around'
                style={{ height: '100%' }}
              >
                <Letters
                  key={word}
                  handleClick={handleClick}
                  letters={letters}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}
