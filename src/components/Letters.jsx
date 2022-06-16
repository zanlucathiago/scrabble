import { Grid, Stack } from '@mui/material';
import Letter from './Letter';

export default function Letters({ handleClick, letters }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Grid container spacing={2}>
        {letters.map((letter, index) => (
          <Letter
            key={index}
            disabled={letters.length === 1}
            onClick={(multiplier) => handleClick(multiplier, index)}
            score={letter.score}
            value={letter.value}
          />
        ))}
      </Grid>
    </Stack>
  );
}
