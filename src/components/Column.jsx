import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
// import { useState } from 'react';
import WordInput from './WordInput';
// import { get } from '../services/score';

const multipliers = [
  {
    value: 1,
    color: 'success',
  },
  {
    value: 2,
    badgeContent: '2x',
    textColor: 'white',
  },
  {
    value: 3,
    badgeContent: '3x',
    color: 'error',
    textColor: 'white',
  },
];

export default function Column({ handleBlur, onClickMultiplier, sum }) {
  const [multiplier, setMultiplier] = useState(0);

  const handleClickMultiplier = () => {
    const value = multiplier === 2 ? 0 : multiplier + 1;
    setMultiplier(value);
    onClickMultiplier(multipliers[value].value);
  };

  // const [wordScore, setWordScore] = useState(0);
  // const handleClickScore = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  // const handleBlurWord = (word) => {
  // const score = [...word].reduce((total, value) => total + get(value), 0);
  // setWordScore(score);
  // handleBlur(word);
  // };
  const { badgeContent, color, textColor } = multipliers[multiplier];

  return (
    <Stack
      spacing={2}
      alignItems="flex-start"
      justifyContent="space-around"
      style={{ height: '100%' }}
    >
      <WordInput onBlur={handleBlur} />
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        style={{ width: '100%' }}
      >
        <Button
          color={color}
          disabled={!sum}
          onClick={handleClickMultiplier}
          variant="contained"
        >
          Bônus {badgeContent}
        </Button>
        <TextField
          color="success"
          // onClick={handleClickScore}
          size="small"
          label="Pontos"
          value={sum}
          inputProps={{
            style: { textAlign: 'center' },
          }}
          InputProps={{
            readOnly: true,
            style: { width: '76px' },
          }}
        />
      </Stack>
    </Stack>
  );
}
