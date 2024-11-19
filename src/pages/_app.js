import "@/styles/globals.scss"
import { Analytics } from '@vercel/analytics/react';
import AppBar from '../../components/Navbar';
import { useEffect, useState } from 'react';

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


export default function App({ Component, pageProps }) {
  const [updated, setUpdated] = useState([]) 

  useEffect(() => {
    fetch('/updated.json')
    .then((res) => res.json())
    .then((data) => {
        setUpdated(data);
    })
  }, []);

  return (<>
    <ThemeProvider theme={theme}>
      <Analytics />
      <AppBar />
      <span className="updated">Last Updated: {updated.updated}</span>
      <Component {...pageProps} />
    </ThemeProvider>
  </>)
}