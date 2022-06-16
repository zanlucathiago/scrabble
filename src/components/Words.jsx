import { v4 } from 'uuid';
import { Stack } from '@mui/material';
import { useState } from 'react';
import Word from './Word';

const buildWord = () => {
  return { key: v4(), length: 0, total: 0, invalid: false, validated: false };
};

export default function Words({ onBlur }) {
  const [words, setWords] = useState([buildWord()]);

  const handleBlur = (total, index, length) => {
    const validWords = words
      .map((word, i) => ({
        ...word,
        ...(i === index ? { length, total } : {}),
      }))
      .filter((word) => word.length);
    const newWord = buildWord();
    setWords([...validWords, newWord]);
    handleForward(validWords);
  };

  const handleForward = (validWords) => {
    onBlur(
      validWords.some((word) => word.invalid)
        ? 0
        : validWords.reduce((total, word) => total + word.total, 0),
      validWords.filter((word) => word.validated).length
    );
  };

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
    <Stack spacing={2} sx={{ pt: 2, pb: 2 }}>
      {words.map((word, index) => (
        <Word
          key={word.key}
          onBlur={(total, length) => handleBlur(total, index, length)}
          onValidate={(status) => handleValidate(status, index)}
        />
      ))}
    </Stack>
  );
}
