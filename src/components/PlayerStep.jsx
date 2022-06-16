import {
  Badge,
  createTheme,
  StepLabel,
  ThemeProvider,
  Typography,
} from '@mui/material';

const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#2e7d32',
          },
        },
      },
    },
  },
});

export default function PlayerStep({
  active,
  children,
  score,
  totalScore,
  validated,
}) {
  return (
    <ThemeProvider theme={theme}>
      <StepLabel optional={<Typography variant="caption">{score}</Typography>}>
        <Badge
          badgeContent={
            active
              ? totalScore
                ? `+${totalScore}`
                : null
              : validated
              ? `-${validated * 10}`
              : null
          }
          color={active ? 'info' : 'error'}
        >
          {children}
        </Badge>
      </StepLabel>
    </ThemeProvider>
  );
}
