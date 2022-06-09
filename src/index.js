import React from "react";
import ReactDOM from "react-dom";
import AMSRouter from './router/router';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, zhCN);

const rootElement = document.getElementById("root");

ReactDOM.render(
<ThemeProvider theme={theme}>
  <AMSRouter />
</ThemeProvider>,
  rootElement
);