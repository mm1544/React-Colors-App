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
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    // It checks if there is anything on LocalStorage first
    // and if it's not, it loads data from seedColors
    this.state = {palettes: savedPalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    // for each one we will have a palette...
    // will return  a palette which id is equal
    // to the id that we are passing
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  }

  deletePalette(id){
    this.setState(
      st => ({palettes: st.palettes.filter(
        // filter for each palette, where the id if this palete is not equal to the id that is passed
        palette => palette.id !== id)}),
        this.syncLocalStorage
    );
  }

  savePalette(newPalette) {
    this.setState({ 
      // passing a callback fn
      palettes: [...this.state.palettes, newPalette]
    },
    // it will be called after setState is done
    this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    // save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
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
          render={(routeProps) => (
            <NewPaletteForm 
              savePalette={this.savePalette}
              // in "NewPaletteForm" need to access all the existing palettes
              palettes={this.state.palettes}
              {...routeProps}
            />
          )}
        />

        {/* routeProps has to be passed */}
        <Route 
          exact path='/' 
          render={routeProps => (
            <PaletteList 
              palettes={this.state.palettes} 
              {...routeProps}
              deletePalette={this.deletePalette}
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
 