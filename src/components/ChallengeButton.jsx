import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Stack
} from '@mui/material'
import { useState } from 'react'

export default function ChallengeButton ({ disabled, words, onValidate }) {
  const [loading, setLoading] = useState(false)

  const handleClickValidation = () => {
    words.forEach(word => {
      window.open(`https://dicionario.priberam.org/${word.toLowerCase()}`)
    })
    setLoading(true)
  }

  const handleClose = () => {
    setLoading(false)
  }

  const handleConfirm = () => {
    handleClose()
    onValidate('info')
  }

  const handleRefute = () => {
    handleClose()
    onValidate('error')
  }

  return (
    <Grid item>
      <Dialog
        onClose={handleClose}
        open={loading}
        PaperProps={{ style: { backgroundColor: '#c8e6c9' } }}
      >
        <DialogTitle>Verifique o dicionário</DialogTitle>
        <DialogActions>
          <Stack
            direction='column'
            justifyContent='space-between'
            spacing={2}
            style={{ width: '100%' }}
          >
            <Button
              color='info'
              onClick={handleConfirm}
              style={{ width: '100%' }}
              variant='contained'
            >
              As palavras são válidas
            </Button>
            <Button
              color='error'
              onClick={handleRefute}
              style={{ width: '100%' }}
              variant='contained'
            >
              Há palavras inválidas
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <Stack
        alignItems='stretch'
        justifyContent='space-around'
        style={{ height: '100%' }}
      >
        <Button
          color='info'
          disabled={!words.length || disabled}
          onClick={handleClickValidation}
          variant='contained'
        >
          Contestar
        </Button>
      </Stack>
    </Grid>
  )
}

function wordsValidationStatus (data) {
  return data.every(word => word.valid) ? 'info' : 'error'
}
