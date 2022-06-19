import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import { useState } from 'react';

export default function ChallengeButton({ disabled, words, onValidate }) {
  const [loading, setLoading] = useState(false);

  const handleClickValidation = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/palavras?${words
        .map((word) => `palavra=${word.toLowerCase()}`)
        .join('&')}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          const status =
            data.length === words.length
              ? data.every((word) => word.valid)
                ? 'info'
                : 'error'
              : 'warning';
          onValidate(status);
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Grid item>
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        style={{ height: '100%' }}
      >
        <LoadingButton
          color="info"
          disabled={!words.length || disabled}
          loading={loading}
          size="large"
          onClick={handleClickValidation}
          variant="contained"
        >
          Contestar
        </LoadingButton>
      </Stack>
    </Grid>
  );
}
