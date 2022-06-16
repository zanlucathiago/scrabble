import { Badge, Button, Grid } from '@mui/material';
import { useState } from 'react';

const multipliers = [
  {
    value: 1,
    color: 'inherit',
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

export default function Letter({ disabled, value, onClick, score }) {
  const [multiplier, setMultiplier] = useState(0);

  const handleClick = (e) => {
    e.stopPropagation();
    const value = multiplier === 2 ? 0 : multiplier + 1;
    setMultiplier(value);
    onClick(multipliers[value].value);
  };

  const { badgeContent, color, textColor } = multipliers[multiplier];

  return (
    <Grid item>
      <Badge badgeContent={badgeContent} color="success">
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '3px',
            color: textColor,
            zIndex: 1,
            fontSize: '0.7rem',
          }}
        >
          {score}
        </div>
        <Button
          color={color}
          disabled={disabled}
          onClick={handleClick}
          style={{ minWidth: '37px', width: '37px' }}
          variant="contained"
        >
          {value}
        </Button>
      </Badge>
    </Grid>
  );
}
