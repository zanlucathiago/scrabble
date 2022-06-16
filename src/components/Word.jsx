import { Card, CardContent, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { get } from '../services/score';
import ChallengeButton from './ChallengeButton';
import Column from './Column';
import Letters from './Letters';

export default function Word({ onBlur, onValidate }) {
  const [word, setWord] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [sum, setSum] = useState(0);
  const [letters, setLetters] = useState([]);

  const handleBlur = (word) => {
    setWord(word);
    const letterList = [...word].map((letter) => {
      const score = get(letter);
      return {
        score,
        value: letter,
        total: score,
      };
    });
    handleForward(letterList, multiplier);
  };

  const handleForward = (letterList, wordMultiplier) => {
    setLetters(letterList);
    const newSum =
      wordMultiplier *
      (letterList.length === 1
        ? 0
        : letterList.reduce((total, letter) => total + letter.total, 0));
    setSum(newSum);
    onBlur(newSum, letterList.length);
  };
  const handleClick = (letterMultiplier, index) => {
    const letterList = letters.map((letter, i) =>
      i === index
        ? { ...letter, total: letter.score * letterMultiplier }
        : letter
    );
    handleForward(letterList, multiplier);
  };

  const handleClickMultiplier = (wordMultiplier) => {
    setMultiplier(wordMultiplier);
    handleForward(letters, wordMultiplier);
  };

  return (
    <Card style={{ backgroundColor: '#a5d6a7' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Column
              handleBlur={handleBlur}
              onClickMultiplier={handleClickMultiplier}
              sum={sum}
            />
          </Grid>
          <Grid item xs>
            <Stack
              alignItems="stretch"
              justifyContent="space-around"
              style={{ height: '100%' }}
            >
              <Letters key={word} handleClick={handleClick} letters={letters} />
            </Stack>
          </Grid>
          <ChallengeButton
            disabled={!sum}
            letters={letters}
            onValidate={onValidate}
          ></ChallengeButton>
        </Grid>
      </CardContent>
    </Card>
  );

  // function getSum(wordMultiplier, letterList) {
  //   return wordMultiplier * letterList.length === 1
  //     ? 0
  //     : letterList.reduce((total, letter) => total + letter.total, 0);
  // }
}
