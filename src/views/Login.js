import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import users from "../data/users.json";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {

    const [errorMail, setErrorMail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const missingEmail = email === '';
        const missingPass = pass === '';
        setErrorMail(missingEmail);
        setErrorPass(missingPass);
        if (missingEmail || missingPass) {
            return;
        }

        // Validar credenciales contra la API
        const logedUser = users.find(user => user.username === email && user.password === pass);
        // Si es un usuario valido enviarlo a su correspondiente pagina de home
        if (logedUser) {
            localStorage.setItem('logedUser', JSON.stringify(logedUser));
            if (logedUser.role === 'alumno') {
                navigate('/home/alumno', {replace: true});
            } else if (logedUser.role === 'profesor') {
                navigate('/home/profesor', {replace: true});
            }
        } else {
            // Usuario invalido, mostrar un mensaje
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                            error={errorMail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            onChange={e => setPass(e.target.value)}
                            error={errorPass}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/olvidePassword" variant="body2">
                                    Olvido su password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"No tiene una cuenta? Registrese"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}