import { Grid, Stack } from '@mui/material';
// import { useEffect, useState } from 'react';
import Letter from './Letter';

export default function Letters({ handleClick, letters }) {
  // const [letters, setLetters] = useState([]);

  // useEffect(() => {
  //   setLetters(
  //     [...word].map((letter) => ({
  //       // multiplier: 1,
  //       value: letter,
  //     }))
  //   );
  // }, [word]);

  // const handleClickLetter = (index) => {

  // const handleClickLetter = (multiplier, index) => {
  //   const letterList = letters.map((letter, i) =>
  //     i === index ? { ...letter, multiplier } : letter
  //   );
  //   setLetters(letterList);
  // }

  return (
    <Stack direction="row" justifyContent="space-between">
      <Grid container spacing={2}>
        {letters.map((letter, index) => (
          <Letter
            key={index}
            onClick={(multiplier) => handleClick(multiplier, index)}
            score={letter.score}
            value={letter.value}
          />
        ))}
      </Grid>
    </Stack>
  );
}
