import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import NavBar from './components/Navbar/index';
import Routing from './components/Routing/index';
import store from './store/store';
import theme from './styles/Theme';
import Alert from './components/Alert/index';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Alert />
          <Box mt={10}>
            <Routing />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
export default App;
