import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette'
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
        {/* routeProps has to be passed */}
        <Route 
          exact path='/' 
          render={routeProps => (
            <PaletteList palettes={seedColors} {...routeProps}
            />
          )} 
        />
        {/* using routeProps !! 
        routeProps.match.params.id --> takes id from url
        */}
        <Route 
          exact 
          path='/palette/:id' 
          render={routeProps => (
            <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} 
            />
          )} 
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
 