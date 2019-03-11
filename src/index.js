import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Exoplanets from './Exoplanets';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Exoplanets />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
