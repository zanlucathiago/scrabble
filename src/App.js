import { Container } from '@mui/material';
// import { Container, Typography } from '@mui/material';
import Panel from './components/Panel';

function App() {
  return (
    <Container style={{ textAlign: 'center' }}>
    {/* <Container style={{ textAlign: 'center', padding: '24px' }}> */}
      {/* <Typography color="#e8eaed" variant="h4" component="div" gutterBottom>
        Turno do Thiago
      </Typography> */}
      <Panel />
    </Container>
  );
}

export default App;
