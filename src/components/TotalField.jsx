import { Grid, TextField } from '@mui/material'

export default function TotalField ({ value }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ width: '100%' }}>
          <TextField
            color='success'
            inputProps={{
              style: { textAlign: 'center' }
            }}
            size='small'
            label='Total'
            style={{ width: '100%' }}
            value={value}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
