import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';


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
    this.renderedPaletteList = this.renderedPaletteList.bind(this);
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

  renderedPaletteList(routeP) {
    return (
      <Page>
        <PaletteList 
          palettes={this.state.palettes} 
          {...routeP}
          deletePalette={this.deletePalette}
        />
      </Page>
    );
  }

  render() {
    return (
      // All the routes will be nested inside of a route. This route will have no path (it will always "match"). Inside of "render" property it will contain "Switch" with all our Routes
      <Route render={({location}) => (
        // Switch is wrapped in TransitionGroup
        <TransitionGroup>
          {/* taking location from props and setting a key to be location.key (each location has a key) */}
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            {/*  need to pass location to Switch (for fading-out effect) */}
            <Switch location={location}>
              <Route 
                exact
                // order of Routes does matter; thisone might be confused 
                // with the on that has path "'/palette/:id'"
                path='/palette/new' 
                // need to pass routeProps to be able in NewPaletteForm to access "history" object
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm 
                      savePalette={this.savePalette}
                      // in "NewPaletteForm" need to access all the existing palettes
                      palettes={this.state.palettes}
                      {...routeProps}
                    />
                  </Page>
                )}
              />

              {/* routeProps has to be passed */}
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <Page>
                    <SingleColorPalette 
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                        )} 
                    />
                  </Page>
                )}
              />
              <Route 
                exact 
                path='/' 
                render={routeProps => (this.renderedPaletteList(routeProps))} 
              />
              {/* // using routeProps !! 
              // routeProps.match.params.id --> takes id from url
              // */}
              <Route 
                exact 
                path='/palette/:id' 
                render={routeProps => ((this.findPalette(routeProps.match.params.id)) ? (
                  <Page>
                    <Palette 
                      palette={
                        generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )} 
                    />
                  </Page>
                ): 
                // if palette-id in url is typed in incorectly
                (this.renderedPaletteList(routeProps))
                )} 
              />
              {/* for the case when some other path is entered */}
              <Route 
                render={routeProps => (this.renderedPaletteList(routeProps))} 
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
      
    );
  }
}

export default App;
 