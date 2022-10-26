import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, createTheme, CssBaseline, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Rating, Select, ThemeProvider } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import SelectFrecuencia from '../components/SelectFrecuencia';
import dataCursos from '../data/cursos.json';
import CardAlumnoCurso from '../components/CardCursoAlumno';
import CardPreviewCurso from '../components/CardPreviewCurso';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme();

export default function BuscarCursos(props) {
  const [tipoClase, setTipoClase] = useState('');
  const [ratingValue, setRatingValue] = useState('');
  const [materiaValue, setMateriaValue] = useState('');
  const [frecuenciaValue, setFrecuenciaValue] = useState('');
  const [cursos, setCursos] = useState([]);
  const { preview } = props;

  // Buscar siempre solo los cursos publicados

  const handleBuscarCursos = (e) => {
    e.preventDefault();
    console.log('BUSCAR');
    const newArray = dataCursos.filter(obj => obj.nombre.toLowerCase().includes(materiaValue.toLowerCase()));
    setCursos(newArray);
    /*
    if (tipoBusqueda === 'Materia') {
      setCursos(newArray);
    } else if (tipoBusqueda === 'Frecuencia') {
      const newArray = dataCursos.filter(obj => obj.frecuencia === frecuenciaValue);
      setCursos(newArray);
    } else if (tipoBusqueda === 'Rating') {
      // Implementar buscador por rating
    } else {
      // Implementar buscador por tipo de materia
    }
    */
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" sx={{ mb: 4, mt: 1 }}>
        <Typography variant="h6" gutterBottom>
          Buscar Cursos
        </Typography>
        <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>

          <Grid item xs={12}>
            <Paper
              component="form"
              onSubmit={handleBuscarCursos}
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              <InputBase
                value={materiaValue}
                onChange={(e) => setMateriaValue(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleBuscarCursos}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={3} sx={{ mt: 2 }}>
            <SelectFrecuencia value={frecuenciaValue} onChange={(e) => setFrecuenciaValue(e.target.value)} />
          </Grid>
          <Grid item xs={3} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-standard-label">Rating</InputLabel>
              <Select value={ratingValue} onChange={(e) => setRatingValue(e.target.value)} label="Rating">
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-standard-label">Tipo de clase</InputLabel>
              <Select value={tipoClase} onChange={(e) => setTipoClase(e.target.value)} label="Tipo de clase">
                <MenuItem value={"unica"}>Unica</MenuItem>
                <MenuItem value={"grupal"}>Grupal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box id="box2" sx={{ mt: 3, flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                  cursos.map((curso) => (
                    <Grid key={curso.nombre} item xs={12} sm={4}>
                      {preview ? <CardPreviewCurso curso={curso} /> : <CardAlumnoCurso curso={curso} contratar={true} />}
                    </Grid>
                  ))
                }
              </Grid>

            </Box>
          </Grid>


        </Grid>


      </Container>
    </ThemeProvider >
  );
}