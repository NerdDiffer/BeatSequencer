import React, { Component, PropTypes } from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BeatSequencer from './BeatSequencer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return(
      <section>
        <BeatSequencer />
      </section>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default App;
