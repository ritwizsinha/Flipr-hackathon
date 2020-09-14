import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main  from './components/Main';
import {BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Main />
      </Router>
    </React.Fragment>
  );

}

export default App;
