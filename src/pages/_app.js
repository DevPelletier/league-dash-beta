import "@/styles/globals.scss"
import { Analytics } from '@vercel/analytics/react';
import AppBar from '../../components/Navbar';

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


export default function App({ Component, pageProps }) {
  return (<>
    <ThemeProvider theme={theme}>
      <Analytics />
      <AppBar />
      <Component {...pageProps} />
    </ThemeProvider>
  </>)
}