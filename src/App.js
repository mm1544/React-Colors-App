import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {

  findPalette(id) {
    // for each one we will have a palette...
    // will return  a palette which id is equal
    // to the id that we are passing
    return seedColors.find(function(palette){
      return palette.id === id;
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>PALETTE GOES HERE</h1>} />
        {/* using routeProps !! 
        routeProps.match.params.id --> takes id from url
        */}
        <Route exact path='/palette/:id' render={routeProps => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    );
  }
}

export default App;
 