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

export default function PlayerStep({ children, score, totalScore, valid }) {
  return (
    <ThemeProvider theme={theme}>
      <StepLabel optional={<Typography variant="caption">{score}</Typography>}>
        <Badge
          badgeContent={valid ? (totalScore ? `+${totalScore}` : null) : null}
          color="info"
        >
          {children}
        </Badge>
      </StepLabel>
    </ThemeProvider>
  );
}
