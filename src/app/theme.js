import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#b2ebf2',
            contrastText: '#000000',
        },
        primaryLight: {
            main: '#e5ffff',
            contrastText: '#000000',
        },
        primaryDark: {
            main: '#005662',
            contrastText: '#ffffff',
        },
        primaryDull: {
            main: '#81b9bf',
            contrastText: '#000000',
        },
        secondary: {
            main: '#dcedc8',
            contrastText: '#000000',
        },
        secondaryLight: {
            main: '#fffffb',
            contrastText: '#000000',
        },
        secondaryDark: {
            main: '#aabb97',
            contrastText: '#000000',
        },
    }
})

export default theme;