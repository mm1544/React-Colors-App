import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {generatePalette} from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette'
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {palettes: seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    // for each one we will have a palette...
    // will return  a palette which id is equal
    // to the id that we are passing
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState({ 
      palettes: [...this.state.palettes, newPalette]
    });
  }

  render() {
    return (
      <Switch>
        <Route 
          exact
          // order of Routes does matter; thisone might be confused 
          // with the on that has path "'/palette/:id'"
          path='/palette/new' 
          // need to pass routeProps to be able in NewPaletteForm to access "history" object
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps}/>}
        />

        {/* routeProps has to be passed */}
        <Route 
          exact path='/' 
          render={routeProps => (
            <PaletteList palettes={this.state.palettes} {...routeProps}
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
 