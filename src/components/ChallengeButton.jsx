import { LoadingButton } from '@mui/lab';
import { Grid, Stack, SvgIcon } from '@mui/material';
import { useState } from 'react';

function SuccessOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
    </SvgIcon>
  );
}

function ErrorOutlineIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </SvgIcon>
  );
}

function ReportProblemOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
    </SvgIcon>
  );
}

function InfoOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z" />
    </SvgIcon>
  );
}

const feedback = {
  info: { icon: SuccessOutlinedIcon },
  success: { icon: InfoOutlinedIcon },
  error: { icon: ErrorOutlineIcon },
  warning: { icon: ReportProblemOutlinedIcon },
};

export default function ChallengeButton({ disabled, letters, onValidate }) {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState('success');

  const handleClickValidation = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/palavras?palavra=${letters
        .map(({ value }) => value.toLowerCase())
        .join('')}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          const status = data.length
            ? data[0].valid
              ? 'info'
              : 'error'
            : 'warning';
          setValidation(status);
          onValidate(status);
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
        setValidation('warning');
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
          color={validation}
          disabled={disabled}
          endIcon={feedback[validation].icon()}
          loading={loading}
          loadingPosition="end"
          size="small"
          onClick={handleClickValidation}
          variant="contained"
        >
          Contestar
        </LoadingButton>
      </Stack>
    </Grid>
  );
}
