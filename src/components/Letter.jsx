import { Badge, Button, Grid } from '@mui/material';
import { useState } from 'react';

const multipliers = [
  {
    value: 0,
    color: 'inherit',
  },
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
  const [multiplier, setMultiplier] = useState(1);

  const handleClick = (e) => {
    e.stopPropagation();
    const value = multiplier === 3 ? 0 : multiplier + 1;
    setMultiplier(value);
    onClick(multipliers[value].value);
  };

  const { badgeContent, color, textColor } = multipliers[multiplier];

  return (
    <Grid item style={{ height: 52.5 }}>
      <Badge
        badgeContent={badgeContent}
        color="success"
        style={{ height: '100%' }}
      >
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
          {multiplier ? score : ''}
        </div>
        <Button
          color={color}
          disabled={disabled}
          onClick={handleClick}
          style={{ minWidth: '37px', width: '37px' }}
          variant="contained"
        >
          {multiplier ? value : ''}
        </Button>
      </Badge>
    </Grid>
  );
}
