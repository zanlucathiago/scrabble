import { Button, Grid } from '@mui/material';
import { useState } from 'react';

export default function WordTotal({ onClick, value }) {
  const [total, setTotal] = useState(1);

  const handleClick = () => {
    const multiplier = total === 3 ? 1 : total + 1;
    setTotal(multiplier);
    onClick(multiplier);
  };

  const multiplier = total * value;

  return (
    <Grid item>
      {/* <Grid key={index} item xs={6} sm={3} md={1}> */}
      <Button
        color="inherit"
        onClick={handleClick}
        value={multiplier}
        // variant="contained"
        // backSpace={() => handleBackSpace(index)}
        // innerRef={(ref) => handleRef(letter, ref)}
        // nextLetter={handleNextLetter}
        // nextWord={handleNextWord}
      >
        {total}x
      </Button>
    </Grid>
  );
}
