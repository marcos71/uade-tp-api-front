import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, createTheme, CssBaseline, FormControl, InputAdornment, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const theme = createTheme();

export default function NuevoCurso() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [duracion, setDuracion] = useState(0);
  const [tipo, setTipo] = useState('');
  const [costo, setCosto] = useState(0);
  const [frecuencia, setFrecuencia] = useState('Unica');
  const [desc, setDesc] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorMateria, setErrorMateria] = useState(false);
  const [errorDuracion, setErrorDuracion] = useState(false);
  const [errorCosto, setErrorCosto] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);

  const handleSave = () => {
    if (validarCampos()) {
      return;
    }
    
    navigate('/home/profesor');
  };

  const validarCampos = () => {
    const missingNombre = nombre === '';
    const missingMateria = materia === '';
    const missingCosto = costo === '';
    const missingDuracion = duracion === '';
    const missingDesc = desc === '';

    setErrorNombre(missingNombre);
    setErrorMateria(missingMateria);
    setErrorDuracion(missingDuracion);
    setErrorCosto(missingCosto);
    setErrorDesc(missingDesc);

    return missingNombre || missingMateria || missingCosto || missingDesc || missingDuracion;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" sx={{ mb: 4, mt: 1 }}>
        <Typography variant="h6" gutterBottom>
          Nuevo Curso
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Nombre del Curso"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              variant="standard"
              error={errorNombre}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Materia"
              fullWidth
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              variant="standard"
              error={errorMateria}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Duracion"
              fullWidth
              type="number"
              variant="standard"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">Hs</InputAdornment>,
              }}
              error={errorDuracion}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Costo"
              type="number"
              fullWidth
              variant="standard"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              error={errorCosto}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Frecuencia</InputLabel>
              <Select label="Frecuencia" value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)}>
                <MenuItem value={"Unica"}>Unica</MenuItem>
                <MenuItem value={"Semanal"}>Semanal</MenuItem>
                <MenuItem value={"Mensual"}>Mensual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <TextField
              required
              label="Descripcion"
              fullWidth
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              variant="standard"
              multiline
              maxRows={4}
              error={errorDesc}
            />
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={handleSave}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}