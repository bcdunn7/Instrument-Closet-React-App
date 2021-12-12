import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            lgiht: '#e5ffff',
            main: '#b2ebf2',
            dark: '#81b9bf',
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
            main: '#aabb97',
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
        secondaryDarker: {
            main: '#6B8054',
            contrastText: '#ffffff'
        },
        warning: {
            main: '#B6383F',
            contrastText: '#000000' 
        }
    }
})

export default theme;