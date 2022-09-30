import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import MainFeature from '../components/MainFeature';
import BuscarCursos from './BuscarCursos';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const mainFeaturedPost = {
    title: 'Una amplia seleccion de cursos',
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fblogs.nottingham.ac.uk%2Fcareers%2F2018%2F01%2F08%2Flearning-to-code-future-proof%2F&psig=AOvVaw16EQ_gUV7j-sL8NwsLyp2k&ust=1664590309843000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPDcxbW4u_oCFQAAAAAdAAAAABAS'
};

const theme = createTheme();

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logedUser = localStorage.getItem('logedUser');
        if (logedUser) {
            const parsedUser = JSON.parse(logedUser);
            if (parsedUser.role === 'alumno') {
                navigate('/home/alumno');
            } else if (parsedUser.role === 'profesor') {
                navigate('/home/profesor');
            }
        }  
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Uademy" />
                <main>
                    <MainFeature post={mainFeaturedPost} />
                    <BuscarCursos preview={true}/>
                </main>
            </Container>
        </ThemeProvider>
    );
}