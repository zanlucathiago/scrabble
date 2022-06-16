import { v4 } from 'uuid';
import { Stack } from '@mui/material';
// import { Alert, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Word from './Word';

const buildWord = () => {
  return { key: v4(), total: 0, invalid: false, validated: false };
  // return { value: '', key: v4(), total: 0, validation: null };
};

export default function Words({ onBlur }) {
  const [words, setWords] = useState([buildWord()]);

  const handleBlur = (total, index) => {
    const validWords = words
      .map((word, i) => ({
        ...word,
        total: i === index ? total : word.total,
      }))
      .filter((word) => word.total);
    const newWord = buildWord();
    // setWords([...words.map((word) => ({ ...word, total })).filter((word) => word.total), buildWord()]);
    setWords([...validWords, newWord]);
    handleForward(validWords);
    // onBlur(validWords.reduce((total, word) => total + word.total, 0));
  };

  const handleForward = (validWords) => {
    onBlur(
      validWords.some((word) => word.invalid)
        ? 0
        : validWords.reduce((total, word) => total + word.total, 0),
      validWords.filter((word) => word.validated).length
    );
  };

  // const onClickTotal = (total, index) => {
  //   setWords(words.map((word, i) => (i === index ? { ...word, total } : word)));
  // };

  // const total = words.reduce(
  //   (total, { total: wordTotal }) => total + wordTotal,
  //   0
  // );
  const handleValidate = (status, index) => {
    const validWords = words.map((word, i) => ({
      ...word,
      ...(i === index
        ? {
            validated: status === 'info',
            invalid: status === 'error',
          }
        : {}),
    }));
    setWords(validWords);
    handleForward(validWords);
  };

  return (
    <>
      {/* <Alert severity="error" variant="filled">This is an error alert — check it out!</Alert>
      <Alert severity="warning" variant="filled">This is a warning alert — check it out!</Alert>
      <Alert severity="success" variant="filled">This is a success alert — check it out!</Alert> */}
      {/* <Alert severity="info" variant="filled">This is an info alert — check it out!</Alert> */}
      <Stack
        spacing={2}
        // style={{ marginTop: '74px', marginBottom: '72px' }}
        sx={{ pt: 2, pb: 2 }}
      >
        {words.map((word, index) => (
          <Word
            key={word.key}
            onBlur={(total) => handleBlur(total, index)}
            onValidate={(status) => handleValidate(status, index)}
            // onClickTotal={(total) => onClickTotal(total, index)}
          />
        ))}
        {/* <Typography>Total: {total}</Typography> */}
        {/* <Button onClick={onReady} variant="contained">
          Finalizar
        </Button> */}
      </Stack>
    </>
  );
}
